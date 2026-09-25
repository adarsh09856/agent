import { db } from "../../../../server/db.js";
import { sql, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import fs from "fs";
import path from "path";
import { appointments, agents } from "../../../../shared/schema.js";
import { isCalendarSyncEnabled, createCalendarEvent } from "../../../../server/services/google-calendar/google-calendar.service.js";
import { appendRowToSheet, ensureSheetHeaders } from "../../../../server/services/google-sheets/google-sheets.service.js";
import { RAGKnowledgeService } from "../../../../server/services/rag-knowledge.js";
class ToolExecutor {
  static async executeToolCall(toolCall, metadata, userId, agentId, callId, session) {
    const name = toolCall.function.name;
    let params = {};
    try {
      params = JSON.parse(toolCall.function.arguments);
    } catch {
      params = {};
    }
    if (name === "book_appointment" || name.startsWith("book_appointment_")) {
      return await ToolExecutor.executeBookAppointment(params, metadata, userId, agentId, callId);
    } else if (name.startsWith("submit_form")) {
      return await ToolExecutor.executeFormSubmission(params, metadata, userId, callId);
    } else if (name === "lookup_knowledge_base" || name === "query_knowledge_base") {
      const kbIds = metadata?.knowledgeBaseIds || [];
      if (!kbIds.length) return { success: false, result: "No knowledge base configured." };
      if (!params.query) return { success: false, result: "Query is required." };
      try {
        const results = await RAGKnowledgeService.searchKnowledge(params.query, kbIds, userId);
        const formattedResponse = RAGKnowledgeService.formatResultsForAgent(results, 400);
        return { success: true, result: formattedResponse || "No relevant information found in the knowledge base." };
      } catch (err) {
        console.error("[ToolExecutor] Knowledge base error:", err);
        return { success: false, result: "Unable to search knowledge base at this time." };
      }
    } else if (name.startsWith("send_whatsapp_")) {
      return await ToolExecutor.executeSendWhatsApp(name, params, metadata, userId, agentId, callId);
    } else if (name.startsWith("send_email_")) {
      return await ToolExecutor.executeSendEmail(name, params, metadata, userId, agentId, callId);
    } else if (name.startsWith("webhook_") || metadata?.webhookUrl || metadata?.url) {
      return await ToolExecutor.executeWebhook(name, params, metadata);
    } else if (name === "end_call") {
      setImmediate(() => {
        session.end("hangup").catch(() => {
        });
      });
      return { success: true, result: "Ending call" };
    } else if (name === "transfer_call" || name.startsWith("transfer_")) {
      const targetNumber = params.destination || params.phoneNumber || metadata?.phoneNumber || "";
      if (!targetNumber) {
        return { success: false, result: "No transfer destination specified." };
      }
      setImmediate(() => {
        session.emit("transfer", targetNumber);
      });
      return { success: true, result: `Initiated transfer to ${targetNumber}` };
    } else if (name === "play_audio" || name.startsWith("play_audio_")) {
      const audioUrl = params.audioUrl || params.audio_url || metadata?.audioUrl || "";
      if (!audioUrl) {
        return { success: false, result: "No audio URL specified." };
      }
      setImmediate(() => {
        session.emit("play_audio", audioUrl);
      });
      return { success: true, result: "Playing audio" };
    } else {
      console.log(`[ToolExecutor] Unknown tool: ${name}`);
      return { success: true, result: "Tool executed" };
    }
  }
  static async executeWebhook(name, params, metadata) {
    try {
      const webhookUrl = metadata?.webhookUrl || metadata?.url || "";
      if (!webhookUrl) {
        console.warn(`[ToolExecutor] Webhook tool ${name} missing URL in metadata`);
        return { success: false, result: "Webhook URL is not configured." };
      }
      const webhookMethod = metadata?.webhookMethod || metadata?.method || "POST";
      const headers = metadata?.headers || metadata?.webhookHeaders || {};
      console.log(`[ToolExecutor] Executing Webhook: ${webhookMethod} ${webhookUrl}`);
      let payload = { ...params };
      const fetchOptions = {
        method: webhookMethod.toUpperCase(),
        headers: {
          "Content-Type": "application/json",
          ...headers
        }
      };
      if (["POST", "PUT", "PATCH"].includes(webhookMethod.toUpperCase())) {
        fetchOptions.body = JSON.stringify(payload);
      }
      const response = await fetch(webhookUrl, fetchOptions);
      if (!response.ok) {
        throw new Error(`Webhook returned status ${response.status}`);
      }
      let responseData;
      try {
        responseData = await response.json();
      } catch {
        responseData = await response.text();
      }
      console.log(`[ToolExecutor] Webhook response received successfully`);
      return { success: true, result: responseData || "Webhook executed successfully." };
    } catch (err) {
      console.error(`[ToolExecutor] Webhook error for ${name}:`, err.message);
      return { success: false, result: `Failed to execute webhook: ${err.message}` };
    }
  }
  static async executeSendWhatsApp(name, params, metadata, userId, agentId, callId) {
    try {
      let phoneNumber = params.phone_number || params.phoneNumber || "";
      const template = params.template_name || params.templateName || metadata?.templateName || "hello_world";
      const lang = metadata?.language || "en_US";
      if (!phoneNumber && callId) {
        try {
          const sanitizedCallId = callId.replace(/[^a-zA-Z0-9_-]/g, "");
          const callTables = ["calls", "twilio_openai_calls", "plivo_calls", "sip_calls"];
          for (const table of callTables) {
            const rows = await db.execute(
              sql`SELECT caller_number, from_number FROM ${sql.identifier(table)} WHERE id = ${sanitizedCallId} LIMIT 1`
            );
            const row = (Array.isArray(rows) ? rows : rows.rows || [])[0];
            if (row?.caller_number || row?.from_number) {
              phoneNumber = row.caller_number || row.from_number;
              console.log(`[ToolExecutor] Resolved caller phone from ${table}: ${phoneNumber}`);
              break;
            }
          }
        } catch (e) {
          console.warn(`[ToolExecutor] Could not resolve caller phone:`, e.message);
        }
      }
      if (phoneNumber) {
        let cleanPhone = phoneNumber.toLowerCase().replace(/\s+/g, "");
        if (cleanPhone.startsWith("plus")) {
          cleanPhone = "+" + cleanPhone.substring(4);
        }
        cleanPhone = cleanPhone.replace(/[^\d+]/g, "");
        phoneNumber = cleanPhone;
      }
      console.log(`[ToolExecutor] Sending WhatsApp: template="${template}" to="${phoneNumber}"`);
      if (!phoneNumber) {
        return {
          success: false,
          result: "Please provide the phone number to send the WhatsApp message to."
        };
      }
      let templateVariables = params.template_variables || params.templateVariables || [];
      if (templateVariables.length === 0) {
        const variableEntries = [];
        for (const [key, value] of Object.entries(params)) {
          const match = key.match(/^variable_(\d+)$/);
          if (match && value) {
            variableEntries.push({ position: parseInt(match[1], 10), value: String(value) });
          }
        }
        if (variableEntries.length > 0) {
          variableEntries.sort((a, b) => a.position - b.position);
          templateVariables = variableEntries.map((v) => ({ position: v.position, value: v.value }));
        }
      }
      const metadataVariables = metadata?.templateVariables;
      if (templateVariables.length === 0 && metadataVariables && metadataVariables.length > 0) {
        templateVariables = metadataVariables.map((tv) => {
          let value = tv.value || "";
          if (tv.source && tv.source !== "custom") {
            const sourceKey = tv.source;
            if (params[sourceKey]) {
              value = String(params[sourceKey]);
            } else if (sourceKey === "system__caller_id" && phoneNumber) {
              value = phoneNumber;
            }
          }
          return { position: tv.position, value };
        });
      }
      const domain = ToolExecutor.getDomain();
      const secret = ToolExecutor.getAppointmentWebhookSecret();
      const [agent] = await db.select({ elevenLabsAgentId: agents.elevenLabsAgentId }).from(agents).where(eq(agents.id, agentId)).limit(1);
      const elAgentId = agent?.elevenLabsAgentId || agentId;
      const queryParams = callId ? `?callId=${encodeURIComponent(callId)}` : "";
      const webhookUrl = `${domain}/api/webhooks/messaging/send-whatsapp/${secret}/${elAgentId}${queryParams}`;
      console.log(`[ToolExecutor] Calling WhatsApp webhook: ${webhookUrl}`);
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_number: phoneNumber,
          template_name: template,
          language: lang,
          template_variables: templateVariables
        })
      });
      if (!response.ok) {
        throw new Error(`Webhook returned status ${response.status}`);
      }
      const data = await response.json();
      console.log(`[ToolExecutor] WhatsApp send result:`, data.success ? "sent" : data.error);
      return {
        success: data.success,
        result: data.success ? `WhatsApp message sent successfully to ${phoneNumber} using template "${template}".` : `Failed to send WhatsApp message: ${data.message || data.error || "Unknown error"}`
      };
    } catch (error) {
      console.error(`[ToolExecutor] WhatsApp error:`, error.message);
      return {
        success: false,
        result: `Unable to send WhatsApp message: ${error.message}`
      };
    }
  }
  static async executeSendEmail(name, params, metadata, userId, agentId, callId) {
    try {
      const recipientEmail = params.recipient_email || params.recipientEmail || metadata?.recipientEmail;
      const template = params.template_name || params.templateName || metadata?.templateName || "default";
      console.log(`[ToolExecutor] Sending email: template="${template}" to="${recipientEmail}"`);
      if (!recipientEmail) {
        return {
          success: false,
          result: "Please provide the recipient email address before sending the email."
        };
      }
      const fs = await import("fs");
      const path = await import("path");
      const { pathToFileURL } = await import("url");
      const canImportTs = process.execArgv.join(" ").includes("tsx") || process.execArgv.join(" ").includes("ts-node") || !!process.env.TS_NODE_PROJECT;
      let emailServicePath = path.resolve(process.cwd(), "plugins/messaging/services/email-template.service.ts");
      if (!canImportTs || !fs.existsSync(emailServicePath)) {
        emailServicePath = path.resolve(process.cwd(), "plugins/messaging/services/email-template.service.js");
      }
      const { EmailTemplateService } = await import(pathToFileURL(emailServicePath).href);
      const emailService = new EmailTemplateService();
      const dynamicVars = params.dynamic_variables || params.dynamicVariables || {};
      const result = await emailService.sendEmailByName(
        userId,
        template,
        recipientEmail,
        dynamicVars,
        { callId: callId || "", agentId }
      );
      console.log(`[ToolExecutor] Email send result:`, result.success ? "sent" : result.error);
      return {
        success: result.success,
        result: result.success ? `Email sent successfully to ${recipientEmail} using template "${template}".` : `Failed to send email: ${result.error || "Unknown error"}`
      };
    } catch (error) {
      console.error(`[ToolExecutor] Email error:`, error.message);
      return {
        success: false,
        result: `Unable to send email at this time: ${error.message}`
      };
    }
  }
  static async executeBookAppointment(params, metadata, userId, agentId, callId) {
    try {
      const googleSheetId = metadata?.googleSheetId;
      const googleSheetName = metadata?.googleSheetName;
      console.log(`[Appointment Tool] metadata:`, JSON.stringify(metadata));
      console.log(`[Appointment Tool] googleSheetId:`, googleSheetId, `googleSheetName:`, googleSheetName);
      console.log(`[Appointment Tool] Booking:`, JSON.stringify(params));
      if (!params.contactName || !params.contactPhone || !params.appointmentDate || !params.appointmentTime) {
        return { success: false, result: "Please provide name, phone, date and time for the appointment." };
      }
      let resolvedFlowId = null;
      const agentRow = await db.execute(sql`SELECT flow_id FROM agents WHERE id = ${agentId} LIMIT 1`);
      const agentData = agentRow.rows?.[0];
      if (agentData?.flow_id) {
        resolvedFlowId = agentData.flow_id;
      } else {
        const flowRow = await db.execute(sql`SELECT id FROM flows WHERE agent_id = ${agentId} AND is_active = true LIMIT 1`);
        resolvedFlowId = flowRow.rows?.[0]?.id || null;
      }
      const settingsResult = await db.execute(sql`
        SELECT * FROM appointment_settings WHERE user_id = ${userId} LIMIT 1
      `);
      const settings = settingsResult.rows?.[0];
      const defaultWorkingHours = {
        monday: { start: "09:00", end: "17:00", enabled: true },
        tuesday: { start: "09:00", end: "17:00", enabled: true },
        wednesday: { start: "09:00", end: "17:00", enabled: true },
        thursday: { start: "09:00", end: "17:00", enabled: true },
        friday: { start: "09:00", end: "17:00", enabled: true },
        saturday: { start: "09:00", end: "17:00", enabled: false },
        sunday: { start: "09:00", end: "17:00", enabled: false }
      };
      const appointmentDate = params.appointmentDate;
      const appointmentTime = params.appointmentTime;
      const parsedDate = /* @__PURE__ */ new Date(appointmentDate + "T12:00:00");
      if (!isNaN(parsedDate.getTime())) {
        const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        const dayOfWeek = parsedDate.getDay();
        const dayName = dayNames[dayOfWeek];
        let daySettings = defaultWorkingHours[dayName];
        if (settings?.working_hours) {
          const wh = typeof settings.working_hours === "string" ? JSON.parse(settings.working_hours) : settings.working_hours;
          if (wh[dayName]) {
            daySettings = { ...daySettings, ...wh[dayName] };
          }
        }
        if (!daySettings.enabled) {
          const capitalizedDay = dayName.charAt(0).toUpperCase() + dayName.slice(1);
          return { success: false, result: `We're not available on ${capitalizedDay}s. Please choose a different day.` };
        }
        const parseTimeToMinutes = (timeStr) => {
          const parts = timeStr.split(":");
          return parseInt(parts[0], 10) * 60 + parseInt(parts[1] || "0", 10);
        };
        const requestedMinutes = parseTimeToMinutes(appointmentTime);
        const startMinutes = parseTimeToMinutes(daySettings.start || "09:00");
        const endMinutes = parseTimeToMinutes(daySettings.end || "17:00");
        const duration = params.duration || 30;
        const appointmentEndMinutes = requestedMinutes + duration;
        if (requestedMinutes < startMinutes || appointmentEndMinutes > endMinutes) {
          const capitalizedDay = dayName.charAt(0).toUpperCase() + dayName.slice(1);
          return {
            success: false,
            result: `${appointmentTime} is outside our available hours on ${capitalizedDay}. We're available from ${daySettings.start} to ${daySettings.end}.`
          };
        }
      }
      if (callId) {
        const dupResult = await db.execute(sql`
          SELECT id FROM appointments
          WHERE call_id = ${callId} AND appointment_date = ${appointmentDate} AND status = 'scheduled'
          LIMIT 1
        `);
        if (dupResult.rows?.length > 0) {
          const existing = dupResult.rows[0];
          return { success: true, result: `Your appointment is already confirmed for ${appointmentDate}.`, appointmentId: existing.id, alreadyBooked: true };
        }
      }
      const dupByContact = await db.execute(sql`
        SELECT id FROM appointments
        WHERE user_id = ${userId} AND contact_phone = ${params.contactPhone}
          AND appointment_date = ${appointmentDate} AND appointment_time = ${appointmentTime}
          AND status = 'scheduled'
        LIMIT 1
      `);
      if (dupByContact.rows?.length > 0) {
        const existing = dupByContact.rows[0];
        return { success: true, result: `Your appointment is confirmed for ${appointmentDate} at ${appointmentTime}.`, appointmentId: existing.id, alreadyBooked: true };
      }
      if (settings && !settings.allow_overlapping) {
        const overlapResult = await db.execute(sql`
          SELECT id FROM appointments
          WHERE user_id = ${userId} AND appointment_date = ${appointmentDate}
            AND appointment_time = ${appointmentTime} AND status = 'scheduled'
          LIMIT 1
        `);
        if (overlapResult.rows?.length > 0) {
          return { success: false, result: "That time slot is already booked. Please choose a different time." };
        }
      }
      const appointmentId = nanoid();
      await db.execute(sql`
        INSERT INTO appointments (id, user_id, call_id, flow_id, contact_name, contact_phone, contact_email, appointment_date, appointment_time, duration, service_name, notes, status, metadata)
        VALUES (${appointmentId}, ${userId}, ${callId || null}, ${resolvedFlowId}, ${params.contactName}, ${params.contactPhone}, ${params.contactEmail || null}, ${params.appointmentDate}, ${params.appointmentTime}, ${params.duration || 30}, ${params.serviceName || null}, ${params.notes || null}, 'scheduled', ${JSON.stringify({ source: "custom-voice-engine", agentId })})
      `);
      console.log(`[Appointment Tool] \u2705 Created appointment ${appointmentId} for user ${userId}, flow_id=${resolvedFlowId}, callId=${callId}`);
      if (googleSheetId) {
        try {
          let sheetTab = googleSheetName || "";
          if (!sheetTab) {
            const tabsResult = await db.execute(sql`SELECT list_sheet_tabs(${userId}, ${googleSheetId})`);
            sheetTab = tabsResult.rows?.[0]?.list_sheet_tabs?.[0]?.title || "Sheet1";
          }
          const row = [
            String(params.contactName || ""),
            String(params.contactPhone || ""),
            String(appointmentDate || ""),
            String(appointmentTime || ""),
            String(params.duration || 30),
            String(params.serviceName || ""),
            String(callId || ""),
            (/* @__PURE__ */ new Date()).toISOString()
          ];
          const pushed = await appendRowToSheet(userId, googleSheetId, sheetTab, row);
          if (pushed) {
            console.log(`[Appointment Tool] \u2705 Successfully pushed appointment row to Google Sheet ${googleSheetId} tab "${sheetTab}"`);
          } else {
            console.warn(`[Appointment Tool] \u26A0\uFE0F Google Sheets push returned false for sheet ${googleSheetId} tab "${sheetTab}"`);
          }
        } catch (sheetErr) {
          console.error(`[Appointment Tool] Google Sheets push failed (non-fatal):`, sheetErr.message);
        }
      }
      try {
        const syncEnabled = await isCalendarSyncEnabled(userId);
        if (syncEnabled) {
          const calendarApt = {
            id: appointmentId,
            contactName: params.contactName,
            contactPhone: params.contactPhone,
            contactEmail: params.contactEmail || null,
            appointmentDate,
            appointmentTime,
            duration: params.duration || 30,
            serviceName: params.serviceName || null,
            notes: params.notes || null,
            status: "scheduled"
          };
          const eventId = await createCalendarEvent(userId, calendarApt);
          if (eventId) {
            await db.update(appointments).set({ googleCalendarEventId: eventId, updatedAt: /* @__PURE__ */ new Date() }).where(eq(appointments.id, appointmentId));
            console.log(`\u{1F4C5} [GoogleCalendar] Auto-synced appointment ${appointmentId} \u2192 event ${eventId}`);
          }
        }
      } catch (calErr) {
        console.error(`\u{1F4C5} [GoogleCalendar] Auto-sync error for ${appointmentId}:`, calErr.message);
      }
      return { success: true, result: `Appointment booked for ${params.contactName} on ${appointmentDate} at ${appointmentTime}`, appointmentId };
    } catch (error) {
      console.error(`[Appointment Tool] Error:`, error.message, error.stack);
      return { success: false, result: "Unable to book appointment at this time. Please try again." };
    }
  }
  static async executeFormSubmission(params, metadata, userId, callId) {
    try {
      const googleSheetId = metadata?.googleSheetId;
      const googleSheetName = metadata?.googleSheetName;
      const formId = metadata?.formId;
      if (!formId) {
        console.error(`[Form Tool] Missing formId in metadata`);
        return { success: false, result: "Form configuration not found." };
      }
      console.log(`[Form Tool] Submitting to form ${formId}:`, JSON.stringify(params));
      const formResult = await db.execute(sql`
        SELECT id, name FROM forms WHERE id = ${formId} LIMIT 1
      `);
      const form = formResult.rows?.[0];
      if (!form) {
        return { success: false, result: "Form configuration not found." };
      }
      const fieldsResult = await db.execute(sql`
        SELECT id, question, field_type, is_required FROM form_fields WHERE form_id = ${formId} ORDER BY "order" ASC
      `);
      const formFieldRows = fieldsResult.rows || [];
      const responses = [];
      for (const field of formFieldRows) {
        const fieldKey = `field_${field.id.replace(/-/g, "_")}`;
        const answer = params[fieldKey] ?? params[field.id] ?? params[field.question] ?? null;
        if (answer !== null && answer !== void 0) {
          responses.push({
            fieldId: field.id,
            question: field.question,
            answer: String(answer)
          });
        }
      }
      if (responses.length === 0 && metadata?.fields) {
        for (const f of metadata.fields) {
          const key = f.name || f.id || f;
          const answer = params[key];
          if (answer !== null && answer !== void 0) {
            responses.push({
              fieldId: key,
              question: f.description || f.label || key,
              answer: String(answer)
            });
          }
        }
      }
      const submissionId = nanoid();
      await db.execute(sql`
        INSERT INTO form_submissions (id, form_id, call_id, contact_name, contact_phone, responses)
        VALUES (${submissionId}, ${formId}, ${callId || null}, ${params.contactName || params.fullName || null}, ${params.contactPhone || params.phone || null}, ${JSON.stringify(responses)})
      `);
      console.log(`[Form Tool] Created submission ${submissionId} with ${responses.length} responses`);
      if (googleSheetId) {
        try {
          const sheetTab = googleSheetName || "Sheet1";
          const headerRow = [
            "Contact Name",
            "Contact Phone",
            ...responses.map((r) => r.question || r.fieldId || ""),
            "Call ID",
            "Submitted At"
          ];
          try {
            await ensureSheetHeaders(userId, googleSheetId, sheetTab, headerRow);
          } catch (headerErr) {
            console.warn(`[Form Tool] Safety-net header write failed (non-fatal):`, headerErr.message);
          }
          const answerValues = responses.map((r) => r.answer ?? "");
          const sheetRow = [
            params.contactName || params.fullName || null,
            params.contactPhone || params.phone || null,
            ...answerValues,
            callId || null,
            (/* @__PURE__ */ new Date()).toISOString()
          ];
          const pushed = await appendRowToSheet(userId, googleSheetId, sheetTab, sheetRow);
          if (pushed) {
            console.log(`[Form Tool] \u2705 Appended row to Google Sheet "${sheetTab}" (${googleSheetId})`);
          } else {
            console.error(`[Form Tool] \u26A0\uFE0F Google Sheets append FAILED for sheet ${googleSheetId} tab "${sheetTab}"`);
          }
        } catch (sheetErr) {
          console.error(`[Form Tool] Google Sheets push failed (non-fatal):`, sheetErr.message);
        }
      }
      return { success: true, result: `Form submitted successfully.`, submissionId };
    } catch (error) {
      console.error(`[Form Tool] Error:`, error.message, error.stack);
      return { success: false, result: "Unable to submit form at this time. Please try again." };
    }
  }
  static getDomain() {
    let domain = "";
    const isProduction = process.env.NODE_ENV === "production";
    if (!isProduction && process.env.DEV_DOMAIN) {
      domain = process.env.DEV_DOMAIN;
    }
    if (!domain && process.env.APP_DOMAIN) {
      domain = process.env.APP_DOMAIN;
    }
    if (!domain && process.env.BASE_URL) {
      domain = process.env.BASE_URL;
    }
    if (!domain && process.env.APP_URL) {
      domain = process.env.APP_URL;
    }
    if (!domain) {
      domain = "http://localhost:5000";
    }
    if (!domain.startsWith("http://") && !domain.startsWith("https://")) {
      domain = "https://" + domain;
    }
    return domain;
  }
  static getAppointmentWebhookSecret() {
    if (process.env.APPOINTMENT_WEBHOOK_SECRET) {
      return process.env.APPOINTMENT_WEBHOOK_SECRET;
    }
    try {
      const PERSISTED_SECRET_PATH = path.join(process.cwd(), ".appointment-webhook-secret");
      if (fs.existsSync(PERSISTED_SECRET_PATH)) {
        return fs.readFileSync(PERSISTED_SECRET_PATH, "utf-8").trim();
      }
    } catch (err) {
      // ignore read errors
    }
    return "";
  }
}
export {
  ToolExecutor
};
