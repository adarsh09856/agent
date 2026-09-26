var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  AI_CATEGORY_COLORS: () => AI_CATEGORY_COLORS,
  AI_CATEGORY_LABELS: () => AI_CATEGORY_LABELS,
  AI_CATEGORY_PRIORITY: () => AI_CATEGORY_PRIORITY,
  AI_LEAD_CATEGORIES: () => AI_LEAD_CATEGORIES,
  API_SCOPES: () => API_SCOPES,
  agentVersions: () => agentVersions,
  agents: () => agents,
  analyticsScripts: () => analyticsScripts,
  apiAuditLogs: () => apiAuditLogs,
  apiKeys: () => apiKeys,
  apiRateLimits: () => apiRateLimits,
  appointmentSettings: () => appointmentSettings,
  appointments: () => appointments,
  auditLogs: () => auditLogs,
  bannedWords: () => bannedWords,
  calls: () => calls,
  campaignJobs: () => campaignJobs,
  campaigns: () => campaigns,
  contacts: () => contacts,
  contentViolations: () => contentViolations,
  createAppointmentSchema: () => createAppointmentSchema,
  createAppointmentSettingsSchema: () => createAppointmentSettingsSchema,
  createFlowSchema: () => createFlowSchema,
  createFormSchema: () => createFormSchema,
  createWebhookSchema: () => createWebhookSchema,
  creditPackages: () => creditPackages,
  creditTransactions: () => creditTransactions,
  crmCategoryPreferences: () => crmCategoryPreferences,
  demoSessions: () => demoSessions,
  determineAICategory: () => determineAICategory,
  elevenLabsCredentials: () => elevenLabsCredentials,
  emailNotificationSettings: () => emailNotificationSettings,
  emailTemplates: () => emailTemplates,
  flowExecutions: () => flowExecutions,
  flowTestQueue: () => flowTestQueue,
  flows: () => flows,
  formFields: () => formFields,
  formSubmissions: () => formSubmissions,
  forms: () => forms,
  globalSettings: () => globalSettings,
  googleCalendarCredentials: () => googleCalendarCredentials,
  googleSheetsCredentials: () => googleSheetsCredentials,
  incomingAgents: () => incomingAgents,
  incomingConnections: () => incomingConnections,
  insertAgentSchema: () => insertAgentSchema,
  insertAgentVersionSchema: () => insertAgentVersionSchema,
  insertAnalyticsScriptSchema: () => insertAnalyticsScriptSchema,
  insertApiAuditLogSchema: () => insertApiAuditLogSchema,
  insertApiKeySchema: () => insertApiKeySchema,
  insertAppointmentSchema: () => insertAppointmentSchema,
  insertAppointmentSettingsSchema: () => insertAppointmentSettingsSchema,
  insertBannedWordSchema: () => insertBannedWordSchema,
  insertCallSchema: () => insertCallSchema,
  insertCampaignJobSchema: () => insertCampaignJobSchema,
  insertCampaignSchema: () => insertCampaignSchema,
  insertContactSchema: () => insertContactSchema,
  insertContentViolationSchema: () => insertContentViolationSchema,
  insertCreditPackageSchema: () => insertCreditPackageSchema,
  insertCreditTransactionSchema: () => insertCreditTransactionSchema,
  insertCrmCategoryPreferencesSchema: () => insertCrmCategoryPreferencesSchema,
  insertDemoSessionSchema: () => insertDemoSessionSchema,
  insertElevenLabsCredentialSchema: () => insertElevenLabsCredentialSchema,
  insertEmailNotificationSettingsSchema: () => insertEmailNotificationSettingsSchema,
  insertEmailTemplateSchema: () => insertEmailTemplateSchema,
  insertFlowExecutionSchema: () => insertFlowExecutionSchema,
  insertFlowSchema: () => insertFlowSchema,
  insertFlowTestQueueSchema: () => insertFlowTestQueueSchema,
  insertFormFieldSchema: () => insertFormFieldSchema,
  insertFormSchema: () => insertFormSchema,
  insertFormSubmissionSchema: () => insertFormSubmissionSchema,
  insertGlobalSettingsSchema: () => insertGlobalSettingsSchema,
  insertGoogleCalendarCredentialSchema: () => insertGoogleCalendarCredentialSchema,
  insertGoogleSheetsCredentialSchema: () => insertGoogleSheetsCredentialSchema,
  insertIncomingAgentSchema: () => insertIncomingAgentSchema,
  insertIncomingConnectionSchema: () => insertIncomingConnectionSchema,
  insertInvoiceSchema: () => insertInvoiceSchema,
  insertKnowledgeBaseSchema: () => insertKnowledgeBaseSchema,
  insertKnowledgeChunkSchema: () => insertKnowledgeChunkSchema,
  insertKnowledgeProcessingQueueSchema: () => insertKnowledgeProcessingQueueSchema,
  insertLeadActivitySchema: () => insertLeadActivitySchema,
  insertLeadNoteSchema: () => insertLeadNoteSchema,
  insertLeadSchema: () => insertLeadSchema,
  insertLeadStageSchema: () => insertLeadStageSchema,
  insertLegacyWebhookDeliverySchema: () => insertLegacyWebhookDeliverySchema,
  insertLegacyWebhookSchema: () => insertLegacyWebhookSchema,
  insertLlmModelSchema: () => insertLlmModelSchema,
  insertNotificationSchema: () => insertNotificationSchema,
  insertOpenaiCredentialSchema: () => insertOpenaiCredentialSchema,
  insertPaymentTransactionSchema: () => insertPaymentTransactionSchema,
  insertPaymentWebhookQueueSchema: () => insertPaymentWebhookQueueSchema,
  insertPhoneNumberRentalSchema: () => insertPhoneNumberRentalSchema,
  insertPhoneNumberSchema: () => insertPhoneNumberSchema,
  insertPhoneReleaseRetryQueueSchema: () => insertPhoneReleaseRetryQueueSchema,
  insertPlanSchema: () => insertPlanSchema,
  insertPlatformLanguageSchema: () => insertPlatformLanguageSchema,
  insertPlivoCallSchema: () => insertPlivoCallSchema,
  insertPlivoCredentialSchema: () => insertPlivoCredentialSchema,
  insertPlivoPhoneNumberSchema: () => insertPlivoPhoneNumberSchema,
  insertPlivoPhonePricingSchema: () => insertPlivoPhonePricingSchema,
  insertPromptTemplateSchema: () => insertPromptTemplateSchema,
  insertRefundSchema: () => insertRefundSchema,
  insertSeoSettingsSchema: () => insertSeoSettingsSchema,
  insertSipCallSchema: () => insertSipCallSchema,
  insertSipPhoneNumberSchema: () => insertSipPhoneNumberSchema,
  insertSipTrunkSchema: () => insertSipTrunkSchema,
  insertSupportedLanguageSchema: () => insertSupportedLanguageSchema,
  insertSyncedVoiceSchema: () => insertSyncedVoiceSchema,
  insertToolSchema: () => insertToolSchema,
  insertTwilioCountrySchema: () => insertTwilioCountrySchema,
  insertTwilioOpenaiCallSchema: () => insertTwilioOpenaiCallSchema,
  insertUsageRecordSchema: () => insertUsageRecordSchema,
  insertUserAddressSchema: () => insertUserAddressSchema,
  insertUserFeedbackSchema: () => insertUserFeedbackSchema,
  insertUserKnowledgeStorageLimitSchema: () => insertUserKnowledgeStorageLimitSchema,
  insertUserKycDocumentSchema: () => insertUserKycDocumentSchema,
  insertUserSchema: () => insertUserSchema,
  insertUserSubscriptionSchema: () => insertUserSubscriptionSchema,
  insertVeAgentInstantFaqSchema: () => insertVeAgentInstantFaqSchema,
  insertVeMasterAiGlobalSettingsSchema: () => insertVeMasterAiGlobalSettingsSchema,
  insertVoiceSchema: () => insertVoiceSchema,
  insertWebhookLogSchema: () => insertWebhookLogSchema,
  insertWebhookSchema: () => insertWebhookSchema,
  insertWebsiteWidgetSchema: () => insertWebsiteWidgetSchema,
  insertWidgetCallSessionSchema: () => insertWidgetCallSessionSchema,
  invoices: () => invoices,
  knowledgeBase: () => knowledgeBase,
  knowledgeChunks: () => knowledgeChunks,
  knowledgeProcessingQueue: () => knowledgeProcessingQueue,
  leadActivities: () => leadActivities,
  leadNotes: () => leadNotes,
  leadStages: () => leadStages,
  leads: () => leads,
  legacyWebhookDeliveries: () => legacyWebhookDeliveries,
  legacyWebhooks: () => legacyWebhooks,
  llmModels: () => llmModels,
  notifications: () => notifications,
  openaiCredentials: () => openaiCredentials,
  otpVerifications: () => otpVerifications,
  paymentTransactions: () => paymentTransactions,
  paymentWebhookQueue: () => paymentWebhookQueue,
  phoneNumberRentals: () => phoneNumberRentals,
  phoneNumbers: () => phoneNumbers,
  phoneReleaseRetryQueue: () => phoneReleaseRetryQueue,
  plans: () => plans,
  platformLanguages: () => platformLanguages,
  plivoCalls: () => plivoCalls,
  plivoCredentials: () => plivoCredentials,
  plivoPhoneNumbers: () => plivoPhoneNumbers,
  plivoPhonePricing: () => plivoPhonePricing,
  promptTemplates: () => promptTemplates,
  refreshTokens: () => refreshTokens,
  refunds: () => refunds,
  seoSettings: () => seoSettings,
  sipCalls: () => sipCalls,
  sipPhoneNumbers: () => sipPhoneNumbers,
  sipTrunks: () => sipTrunks,
  supportedLanguages: () => supportedLanguages,
  syncedVoices: () => syncedVoices,
  tools: () => tools,
  twilioCountries: () => twilioCountries,
  twilioOpenaiCalls: () => twilioOpenaiCalls,
  usageRecords: () => usageRecords,
  userAddresses: () => userAddresses,
  userFeedback: () => userFeedback,
  userKnowledgeStorageLimits: () => userKnowledgeStorageLimits,
  userKycDocuments: () => userKycDocuments,
  userSubscriptions: () => userSubscriptions,
  users: () => users,
  veAgentInstantFaqs: () => veAgentInstantFaqs,
  veMasterAiGlobalSettings: () => veMasterAiGlobalSettings,
  voices: () => voices,
  webhookDeliveryLogs: () => webhookDeliveryLogs,
  webhookLogs: () => webhookLogs,
  webhookSubscriptions: () => webhookSubscriptions,
  webhooks: () => webhooks,
  websiteWidgets: () => websiteWidgets,
  widgetCallSessions: () => widgetCallSessions
});
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, jsonb, decimal, doublePrecision, serial, date, time, unique, uniqueIndex, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
function determineAICategory(lead) {
  if (lead.hasAppointment) return AI_LEAD_CATEGORIES.APPOINTMENT_BOOKED;
  if (lead.hasFormSubmission) return AI_LEAD_CATEGORIES.FORM_SUBMITTED;
  if (lead.hasTransfer) return AI_LEAD_CATEGORIES.CALL_TRANSFER;
  if (lead.hasCallback || lead.callbackScheduled) return AI_LEAD_CATEGORIES.NEED_FOLLOW_UP;
  if (lead.leadScore !== null && lead.leadScore !== void 0) {
    if (lead.leadScore >= 70) return AI_LEAD_CATEGORIES.HOT;
    if (lead.leadScore >= 40) return AI_LEAD_CATEGORIES.WARM;
    if (lead.leadScore >= 20) return AI_LEAD_CATEGORIES.NEUTRAL;
    return AI_LEAD_CATEGORIES.COLD;
  }
  if (lead.sentiment === "positive") return AI_LEAD_CATEGORIES.WARM;
  if (lead.sentiment === "neutral") return AI_LEAD_CATEGORIES.NEUTRAL;
  return null;
}
var users, otpVerifications, refreshTokens, elevenLabsCredentials, syncedVoices, agents, knowledgeBase, incomingAgents, phoneNumbers, incomingConnections, campaigns, contacts, calls, creditTransactions, tools, voices, plans, globalSettings, llmModels, supportedLanguages, creditPackages, userSubscriptions, phoneNumberRentals, usageRecords, legacyWebhooks, legacyWebhookDeliveries, notifications, emailTemplates, promptTemplates, agentVersions, auditLogs, platformLanguages, insertUserSchema, insertElevenLabsCredentialSchema, insertSyncedVoiceSchema, insertAgentSchema, insertKnowledgeBaseSchema, insertIncomingAgentSchema, insertPromptTemplateSchema, insertAgentVersionSchema, insertIncomingConnectionSchema, insertCampaignSchema, insertContactSchema, insertCallSchema, insertCreditTransactionSchema, insertToolSchema, insertVoiceSchema, insertPlanSchema, insertGlobalSettingsSchema, insertLlmModelSchema, insertSupportedLanguageSchema, insertPlatformLanguageSchema, insertCreditPackageSchema, insertUserSubscriptionSchema, insertPhoneNumberSchema, insertUsageRecordSchema, insertLegacyWebhookSchema, insertLegacyWebhookDeliverySchema, insertPhoneNumberRentalSchema, insertNotificationSchema, insertEmailTemplateSchema, twilioCountries, insertTwilioCountrySchema, userKnowledgeStorageLimits, knowledgeChunks, knowledgeProcessingQueue, insertUserKnowledgeStorageLimitSchema, insertKnowledgeChunkSchema, insertKnowledgeProcessingQueueSchema, flows, insertFlowSchema, createFlowSchema, flowExecutions, insertFlowExecutionSchema, flowTestQueue, insertFlowTestQueueSchema, webhookSubscriptions, webhooks, insertWebhookSchema, createWebhookSchema, webhookDeliveryLogs, webhookLogs, insertWebhookLogSchema, appointments, insertAppointmentSchema, createAppointmentSchema, appointmentSettings, insertAppointmentSettingsSchema, createAppointmentSettingsSchema, forms, insertFormSchema, createFormSchema, formFields, insertFormFieldSchema, formSubmissions, insertFormSubmissionSchema, seoSettings, insertSeoSettingsSchema, analyticsScripts, insertAnalyticsScriptSchema, paymentTransactions, insertPaymentTransactionSchema, refunds, insertRefundSchema, invoices, insertInvoiceSchema, paymentWebhookQueue, insertPaymentWebhookQueueSchema, emailNotificationSettings, insertEmailNotificationSettingsSchema, bannedWords, insertBannedWordSchema, contentViolations, insertContentViolationSchema, openaiCredentials, insertOpenaiCredentialSchema, plivoCredentials, insertPlivoCredentialSchema, plivoPhoneNumbers, insertPlivoPhoneNumberSchema, plivoCalls, insertPlivoCallSchema, campaignJobs, insertCampaignJobSchema, plivoPhonePricing, insertPlivoPhonePricingSchema, userKycDocuments, insertUserKycDocumentSchema, twilioOpenaiCalls, insertTwilioOpenaiCallSchema, demoSessions, insertDemoSessionSchema, leadStages, insertLeadStageSchema, leads, insertLeadSchema, AI_LEAD_CATEGORIES, AI_CATEGORY_LABELS, AI_CATEGORY_COLORS, AI_CATEGORY_PRIORITY, leadNotes, insertLeadNoteSchema, leadActivities, insertLeadActivitySchema, crmCategoryPreferences, insertCrmCategoryPreferencesSchema, websiteWidgets, insertWebsiteWidgetSchema, widgetCallSessions, insertWidgetCallSessionSchema, API_SCOPES, apiKeys, insertApiKeySchema, apiAuditLogs, insertApiAuditLogSchema, apiRateLimits, sipTrunks, insertSipTrunkSchema, sipPhoneNumbers, insertSipPhoneNumberSchema, sipCalls, insertSipCallSchema, userAddresses, insertUserAddressSchema, userFeedback, insertUserFeedbackSchema, googleCalendarCredentials, insertGoogleCalendarCredentialSchema, googleSheetsCredentials, insertGoogleSheetsCredentialSchema, phoneReleaseRetryQueue, insertPhoneReleaseRetryQueueSchema, veAgentInstantFaqs, insertVeAgentInstantFaqSchema, veMasterAiGlobalSettings, insertVeMasterAiGlobalSettingsSchema;
var init_schema = __esm({
  "shared/schema.ts"() {
    "use strict";
    users = pgTable("users", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      email: text("email").notNull().unique(),
      password: text("password").notNull(),
      name: text("name").notNull(),
      role: text("role").notNull().default("user"),
      planType: text("plan_type").notNull().default("free"),
      // 'free' or 'pro'
      planExpiresAt: timestamp("plan_expires_at"),
      credits: integer("credits").notNull().default(0),
      isActive: boolean("is_active").notNull().default(true),
      stripeCustomerId: text("stripe_customer_id"),
      stripeSubscriptionId: text("stripe_subscription_id"),
      maxWebhooks: integer("max_webhooks").notNull().default(3),
      // Webhook subscription limit (admin can adjust)
      isDeleted: boolean("is_deleted").notNull().default(false),
      // Soft delete flag - user requested account deletion
      deletedAt: timestamp("deleted_at"),
      // When the user requested deletion
      deletedBy: varchar("deleted_by"),
      // Who deleted: 'user' for self-deletion, admin user ID for admin deletion
      // Timezone preference - IANA timezone string (e.g., "America/New_York", "Europe/London")
      timezone: text("timezone"),
      // GDPR Consent preferences
      cookieConsent: boolean("cookie_consent"),
      // Essential cookies always enabled, this tracks analytics/marketing consent
      analyticsConsent: boolean("analytics_consent"),
      marketingConsent: boolean("marketing_consent"),
      consentTimestamp: timestamp("consent_timestamp"),
      // When user gave/updated consent
      termsAcceptedAt: timestamp("terms_accepted_at"),
      // When user accepted Terms of Service
      privacyAcceptedAt: timestamp("privacy_accepted_at"),
      // When user accepted Privacy Policy
      // User blocking for content violations
      blockedReason: text("blocked_reason"),
      // Reason for blocking (e.g., "Content violation: banned words detected")
      blockedAt: timestamp("blocked_at"),
      // When the user was blocked
      blockedBy: varchar("blocked_by"),
      // Admin who blocked the user
      // ElevenLabs Multi-Key Pool Affinity - Once assigned, user's agents and phone numbers stay on this key
      elevenLabsCredentialId: varchar("eleven_labs_credential_id"),
      // References elevenLabsCredentials.id (can't use .references() due to declaration order)
      // User-level KYC for phone number purchases
      kycStatus: text("kyc_status").default("pending"),
      // pending, submitted, approved, rejected
      kycSubmittedAt: timestamp("kyc_submitted_at"),
      kycApprovedAt: timestamp("kyc_approved_at"),
      kycRejectionReason: text("kyc_rejection_reason"),
      // Billing Details - Stored for payment processing and pre-filling
      billingName: text("billing_name"),
      billingAddressLine1: text("billing_address_line1"),
      billingAddressLine2: text("billing_address_line2"),
      billingCity: text("billing_city"),
      billingState: text("billing_state"),
      billingPostalCode: text("billing_postal_code"),
      billingCountry: text("billing_country"),
      company: text("company"),
      // Company name for profile and team naming
      subscriptionMinutes: integer("subscription_minutes").default(0),
      subscriptionMinutesResetAt: timestamp("subscription_minutes_reset_at"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    otpVerifications = pgTable("otp_verifications", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      email: text("email").notNull(),
      otpCode: text("otp_code").notNull(),
      expiresAt: timestamp("expires_at").notNull(),
      attempts: integer("attempts").notNull().default(0),
      verified: boolean("verified").notNull().default(false),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    refreshTokens = pgTable("refresh_tokens", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      token: text("token").notNull().unique(),
      expiresAt: timestamp("expires_at").notNull(),
      isValid: boolean("is_valid").notNull().default(true),
      userAgent: text("user_agent"),
      ipAddress: text("ip_address"),
      lastUsedAt: timestamp("last_used_at"),
      createdAt: timestamp("created_at").notNull().defaultNow()
    }, (table) => ({
      refreshTokensUserIdIdx: index("refresh_tokens_user_id_idx").on(table.userId),
      refreshTokensExpiresAtIdx: index("refresh_tokens_expires_at_idx").on(table.expiresAt)
    }));
    elevenLabsCredentials = pgTable("eleven_labs_credentials", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      name: text("name").notNull(),
      // Friendly name for the key (e.g., "Primary Account", "Backup Key 1")
      apiKey: text("api_key").notNull(),
      webhookSecret: text("webhook_secret"),
      // HMAC secret for verifying webhooks from this ElevenLabs workspace (nullable for migration)
      isActive: boolean("is_active").notNull().default(true),
      maxConcurrency: integer("max_concurrency").notNull().default(30),
      // ElevenLabs default limit
      currentLoad: integer("current_load").notNull().default(0),
      // Current active calls using this key
      totalAssignedAgents: integer("total_assigned_agents").notNull().default(0),
      // How many agents use this key
      totalAssignedUsers: integer("total_assigned_users").notNull().default(0),
      // How many users are assigned to this key
      maxAgentsThreshold: integer("max_agents_threshold").notNull().default(100),
      // Soft limit before moving to next key
      lastHealthCheck: timestamp("last_health_check"),
      healthStatus: text("health_status").notNull().default("healthy"),
      // healthy, degraded, unhealthy
      metadata: jsonb("metadata"),
      // For storing additional info like account tier, limits, etc.
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    syncedVoices = pgTable("synced_voices", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      credentialId: varchar("credential_id").notNull().references(() => elevenLabsCredentials.id, { onDelete: "cascade" }),
      voiceId: text("voice_id").notNull(),
      // ElevenLabs voice_id
      publicOwnerId: text("public_owner_id").notNull(),
      // Voice owner's public ID for API call
      voiceName: text("voice_name"),
      // Cached voice name for display
      status: text("status").notNull().default("synced"),
      // synced, failed, pending
      errorMessage: text("error_message"),
      syncedAt: timestamp("synced_at").notNull().defaultNow()
    }, (table) => ({
      credentialVoiceUnique: unique().on(table.credentialId, table.voiceId)
    }));
    agents = pgTable("agents", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      elevenLabsCredentialId: varchar("eleven_labs_credential_id").references(() => elevenLabsCredentials.id, { onDelete: "set null" }),
      // Which API key this agent uses
      // Telephony Provider Configuration - Determines which engine handles calls
      // 'twilio' = ElevenLabs Conversational AI via Twilio (default)
      // 'plivo' = Plivo telephony + OpenAI Realtime API
      // 'twilio_openai' = Twilio telephony + OpenAI Realtime API
      // 'elevenlabs-sip' = ElevenLabs native SIP (user's own SIP trunk)
      // 'openai-sip' = OpenAI Realtime API with SIP (incoming only)
      telephonyProvider: text("telephony_provider").default("twilio"),
      // 'twilio' | 'plivo' | 'twilio_openai' | 'elevenlabs-sip' | 'openai-sip' | 'custom-voice-engine'
      // SIP Trunk Configuration (used when telephonyProvider='elevenlabs-sip' or 'openai-sip')
      sipTrunkId: varchar("sip_trunk_id"),
      // References sip_trunks.id for SIP-based engines
      sipPhoneNumberId: varchar("sip_phone_number_id"),
      // References sip_phone_numbers.id for SIP-based calls
      // OpenAI Realtime Configuration (used when telephonyProvider='plivo', 'twilio_openai', or 'openai-sip')
      openaiVoice: text("openai_voice"),
      // 'alloy' | 'echo' | 'shimmer' | 'ash' | 'ballad' | 'coral' | 'sage' | 'verse' | 'cedar' | 'marin'
      openaiCredentialId: varchar("openai_credential_id"),
      // References openaiCredentials.id (can't use .references() due to declaration order)
      // Agent Type: Determines execution pipeline and usage
      // NO DEFAULT - must be explicitly set to prevent misconfiguration
      type: text("type").notNull(),
      // 'incoming' (ElevenLabs Conversational AI for receiving calls) or 'flow' (STT+TTS+FlowExecutionBridge for campaigns)
      // Incoming Agent Fields (used when type='incoming')
      // Incoming agents are used for receiving calls on purchased phone numbers with call transfer capability
      name: text("name").notNull(),
      voiceTone: text("voice_tone"),
      personality: text("personality"),
      systemPrompt: text("system_prompt"),
      language: text("language").default("en"),
      firstMessage: text("first_message").default("Hello! How can I help you today?"),
      llmModel: text("llm_model").default("gpt-4o-mini"),
      temperature: doublePrecision("temperature").default(0.5),
      elevenLabsAgentId: text("eleven_labs_agent_id"),
      // Call Transfer Configuration (for incoming agents)
      transferPhoneNumber: text("transfer_phone_number"),
      transferEnabled: boolean("transfer_enabled").default(false),
      // ElevenLabs System Tools Configuration (for incoming agents)
      detectLanguageEnabled: boolean("detect_language_enabled").default(false),
      endConversationEnabled: boolean("end_conversation_enabled").default(false),
      appointmentBookingEnabled: boolean("appointment_booking_enabled").default(false),
      messagingEmailEnabled: boolean("messaging_email_enabled").default(false),
      messagingWhatsappEnabled: boolean("messaging_whatsapp_enabled").default(false),
      messagingEmailTemplate: text("messaging_email_template"),
      messagingWhatsappTemplate: text("messaging_whatsapp_template"),
      messagingWhatsappVariables: text("messaging_whatsapp_variables"),
      expressiveMode: boolean("expressive_mode").default(false),
      // Knowledge Base (for incoming agents)
      knowledgeBaseIds: text("knowledge_base_ids").array(),
      // Shared Voice Configuration (used by both Incoming and Flow agents)
      elevenLabsVoiceId: text("eleven_labs_voice_id"),
      voiceStability: doublePrecision("voice_stability").default(0.65),
      voiceSimilarityBoost: doublePrecision("voice_similarity_boost").default(0.85),
      voiceSpeed: doublePrecision("voice_speed").default(0.92),
      turnTimeout: doublePrecision("turn_timeout").default(1.5),
      // Flow Agent Fields (used when type='flow')
      flowId: varchar("flow_id"),
      // Reference to flows table for Flow Agents
      maxDurationSeconds: integer("max_duration_seconds").default(600),
      // Max conversation duration in seconds (default 10 min, range 60-1800)
      // Legacy/Common Fields
      agentLink: text("agent_link"),
      config: jsonb("config"),
      masterAiConfig: jsonb("master_ai_config"),
      isActive: boolean("is_active").notNull().default(true),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    knowledgeBase = pgTable("knowledge_base", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      type: text("type").notNull(),
      title: text("title").notNull(),
      content: text("content"),
      url: text("url"),
      fileUrl: text("file_url"),
      elevenLabsDocId: text("eleven_labs_doc_id"),
      metadata: jsonb("metadata"),
      storageSize: integer("storage_size").notNull().default(0),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    incomingAgents = pgTable("incoming_agents", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      elevenLabsCredentialId: varchar("eleven_labs_credential_id").references(() => elevenLabsCredentials.id, { onDelete: "set null" }),
      // Basic Configuration
      name: text("name").notNull(),
      elevenLabsAgentId: text("eleven_labs_agent_id").notNull(),
      // Always uses ElevenLabs Conversational AI
      elevenLabsVoiceId: text("eleven_labs_voice_id").notNull(),
      language: text("language").notNull().default("en"),
      // AI Configuration
      systemPrompt: text("system_prompt").notNull(),
      personality: text("personality").default("helpful"),
      voiceTone: text("voice_tone").default("professional"),
      firstMessage: text("first_message").notNull().default("Hello! How can I help you today?"),
      llmModel: text("llm_model").default("gpt-4o-mini"),
      temperature: doublePrecision("temperature").default(0.5),
      // Call Transfer Configuration
      transferPhoneNumber: text("transfer_phone_number"),
      // Phone number to transfer calls to
      transferEnabled: boolean("transfer_enabled").notNull().default(false),
      // Business Hours Configuration
      businessHoursEnabled: boolean("business_hours_enabled").notNull().default(false),
      businessHoursStart: text("business_hours_start"),
      // Format: "09:00"
      businessHoursEnd: text("business_hours_end"),
      // Format: "17:00"
      businessDays: text("business_days").array(),
      // ["monday", "tuesday", etc.]
      businessHoursTimezone: text("business_hours_timezone").default("America/New_York"),
      afterHoursMessage: text("after_hours_message").default("Thank you for calling. We're currently closed. Please call back during business hours."),
      // Knowledge Base
      knowledgeBaseIds: text("knowledge_base_ids").array(),
      // Metadata
      isActive: boolean("is_active").notNull().default(true),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    }, (table) => ({
      agentsUserIdIdx: index("agents_user_id_idx").on(table.userId),
      agentsCredentialIdIdx: index("agents_credential_id_idx").on(table.elevenLabsCredentialId),
      agentsElevenLabsAgentIdIdx: index("agents_eleven_labs_agent_id_idx").on(table.elevenLabsAgentId)
    }));
    phoneNumbers = pgTable("phone_numbers", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
      // Nullable for system pool numbers
      phoneNumber: text("phone_number").notNull().unique(),
      twilioSid: text("twilio_sid").notNull().unique(),
      elevenLabsPhoneNumberId: text("eleven_labs_phone_number_id"),
      // ElevenLabs phone_number_id for synced numbers
      elevenLabsCredentialId: varchar("eleven_labs_credential_id").references(() => elevenLabsCredentials.id, { onDelete: "set null" }),
      // Which API key this phone number uses (for multi-API key pool isolation)
      friendlyName: text("friendly_name"),
      country: text("country").notNull().default("US"),
      capabilities: jsonb("capabilities"),
      status: text("status").notNull().default("active"),
      isSystemPool: boolean("is_system_pool").notNull().default(false),
      // For free plan numbers
      purchasePrice: decimal("purchase_price", { precision: 10, scale: 2 }),
      monthlyPrice: decimal("monthly_price", { precision: 10, scale: 2 }),
      monthlyCredits: integer("monthly_credits"),
      // Credits charged per month for user-purchased numbers
      nextBillingDate: timestamp("next_billing_date"),
      // Next date when credits will be charged
      purchasedAt: timestamp("purchased_at").notNull().defaultNow(),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      credentialsSyncedAt: timestamp("credentials_synced_at"),
      // Last time Twilio credentials were re-synced into ElevenLabs (null = never explicitly synced)
      // DEPRECATED: Use incoming_connections table instead
      assignedIncomingAgentId: varchar("assigned_incoming_agent_id").references(() => incomingAgents.id, { onDelete: "set null" })
    }, (table) => ({
      phoneNumbersUserIdIdx: index("phone_numbers_user_id_idx").on(table.userId),
      phoneNumbersStatusIdx: index("phone_numbers_status_idx").on(table.status),
      phoneNumbersNextBillingDateIdx: index("phone_numbers_next_billing_date_idx").on(table.nextBillingDate)
    }));
    incomingConnections = pgTable("incoming_connections", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      agentId: varchar("agent_id").notNull(),
      // Supports standard agents (agents.id) or Custom Voice Engine agents (ve_voice_agents.id)
      phoneNumberId: varchar("phone_number_id").notNull().references(() => phoneNumbers.id, { onDelete: "cascade" }).unique(),
      // One connection per phone number
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    campaigns = pgTable("campaigns", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      agentId: varchar("agent_id"),
      voiceId: text("voice_id"),
      phoneNumberId: varchar("phone_number_id").references(() => phoneNumbers.id, { onDelete: "set null" }),
      sipPhoneNumberId: varchar("sip_phone_number_id"),
      // References sip_phone_numbers.id for SIP-based campaigns (plugin)
      plivoPhoneNumberId: varchar("plivo_phone_number_id"),
      // References plivo_phone_numbers.id for Plivo-based campaigns
      flowId: varchar("flow_id"),
      // Reference to visual conversation flow (mutually exclusive with script)
      name: text("name").notNull(),
      type: text("type").notNull().default("outbound"),
      goal: text("goal"),
      script: text("script"),
      status: text("status").notNull().default("pending"),
      totalContacts: integer("total_contacts").notNull().default(0),
      completedCalls: integer("completed_calls").notNull().default(0),
      successfulCalls: integer("successful_calls").notNull().default(0),
      failedCalls: integer("failed_calls").notNull().default(0),
      scheduledFor: timestamp("scheduled_for"),
      startedAt: timestamp("started_at"),
      completedAt: timestamp("completed_at"),
      deletedAt: timestamp("deleted_at"),
      // Campaign Time Scheduling
      scheduleEnabled: boolean("schedule_enabled").notNull().default(false),
      // Whether to respect time windows
      scheduleTimeStart: text("schedule_time_start"),
      // Start time in HH:MM format (e.g., "09:00")
      scheduleTimeEnd: text("schedule_time_end"),
      // End time in HH:MM format (e.g., "17:00")
      scheduleDays: text("schedule_days").array(),
      // Array of days: ["monday", "tuesday", "wednesday", etc.]
      scheduleTimezone: text("schedule_timezone").default("America/New_York"),
      // Timezone for the schedule
      // ElevenLabs Batch Calling Integration
      batchJobId: text("batch_job_id"),
      // ElevenLabs batch job ID when campaign is running
      batchJobStatus: text("batch_job_status"),
      // pending, in_progress, completed, failed, cancelled
      retryEnabled: boolean("retry_enabled").notNull().default(false),
      // Whether to auto-retry failed/no-response calls
      // Contact Retry System - configures automatic re-calling of contacts that didn't answer
      retryMaxAttempts: integer("retry_max_attempts").default(3),
      // Max total call attempts per contact (including first)
      retryIntervalMinutes: integer("retry_interval_minutes").default(60),
      // Minutes between retry passes
      retryOnNoAnswer: boolean("retry_on_no_answer").default(true),
      // Retry contacts that didn't answer
      retryOnBusy: boolean("retry_on_busy").default(false),
      // Retry contacts that were busy
      retryOnFailed: boolean("retry_on_failed").default(false),
      // Retry contacts that failed (technical error)
      batchJobHistory: jsonb("batch_job_history").default([]),
      // Array of {batchJobId, pass, contactCount, createdAt}
      currentRetryPass: integer("current_retry_pass").default(0),
      // Which pass we're currently on (0 = initial, 1+ = retries)
      // Error tracking for failed campaigns
      errorMessage: text("error_message"),
      // Detailed error message when campaign fails
      errorCode: text("error_code"),
      // Error code for categorization (e.g., AGENT_NOT_SYNCED, NO_CONTACTS)
      config: jsonb("config"),
      createdAt: timestamp("created_at").notNull().defaultNow()
    }, (table) => ({
      campaignsUserIdIdx: index("campaigns_user_id_idx").on(table.userId),
      campaignsStatusIdx: index("campaigns_status_idx").on(table.status),
      campaignsDeletedAtIdx: index("campaigns_deleted_at_idx").on(table.deletedAt),
      campaignsAgentIdIdx: index("campaigns_agent_id_idx").on(table.agentId)
    }));
    contacts = pgTable("contacts", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      campaignId: varchar("campaign_id").notNull().references(() => campaigns.id, { onDelete: "cascade" }),
      firstName: text("first_name").notNull(),
      lastName: text("last_name"),
      phone: text("phone").notNull(),
      email: text("email"),
      customFields: jsonb("custom_fields"),
      status: text("status").notNull().default("pending"),
      // Retry attempt tracking
      attemptCount: integer("attempt_count").default(1),
      // How many call attempts have been made (1 = first call in progress)
      lastAttemptAt: timestamp("last_attempt_at"),
      // When the last call was attempted
      nextRetryAt: timestamp("next_retry_at"),
      // When the next retry is scheduled (null if not queued)
      createdAt: timestamp("created_at").notNull().defaultNow()
    }, (table) => ({
      contactsCampaignIdIdx: index("contacts_campaign_id_idx").on(table.campaignId),
      contactsStatusIdx: index("contacts_status_idx").on(table.status)
      // Note: contacts has no userId column — ownership is via campaignId → campaigns.userId.
    }));
    calls = pgTable("calls", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
      // Direct user ownership for guaranteed isolation
      campaignId: varchar("campaign_id").references(() => campaigns.id, { onDelete: "cascade" }),
      // Nullable for test/manual/incoming calls
      contactId: varchar("contact_id").references(() => contacts.id, { onDelete: "cascade" }),
      // Nullable for test/incoming calls
      // Agent references - either from campaign (agentId via campaigns table) or incoming call (via connection)
      incomingConnectionId: varchar("incoming_connection_id").references(() => incomingConnections.id, { onDelete: "set null" }),
      // For incoming calls
      // Website Widget reference - for calls initiated through embeddable widgets
      widgetId: varchar("widget_id"),
      // References websiteWidgets.id (added later in schema)
      // DEPRECATED: Use incomingConnectionId instead
      incomingAgentId: varchar("incoming_agent_id").references(() => incomingAgents.id, { onDelete: "set null" }),
      phoneNumber: text("phone_number"),
      // Phone number dialed/caller (for test calls without contacts, or incoming caller)
      fromNumber: text("from_number"),
      // The phone number that initiated the call (caller ID)
      toNumber: text("to_number"),
      // The phone number that received the call (destination)
      twilioSid: text("twilio_sid"),
      elevenLabsConversationId: text("elevenlabs_conversation_id"),
      // ElevenLabs conversation ID for fetching details/recordings
      status: text("status").notNull().default("pending"),
      callDirection: text("call_direction").notNull().default("outgoing"),
      // 'incoming' or 'outgoing'
      duration: integer("duration"),
      recordingUrl: text("recording_url"),
      transcript: text("transcript"),
      aiSummary: text("ai_summary"),
      classification: text("classification"),
      sentiment: text("sentiment"),
      metadata: jsonb("metadata"),
      wasTransferred: boolean("was_transferred").default(false),
      // Whether call was transferred
      transferredTo: text("transferred_to"),
      // Number call was transferred to
      transferredAt: timestamp("transferred_at"),
      // When call was transferred
      startedAt: timestamp("started_at"),
      endedAt: timestamp("ended_at"),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      agentId: varchar("agent_id"),
      engineType: text("engine_type"),
      creditsUsed: integer("credits_used").default(0)
    }, (table) => ({
      callsUserIdIdx: index("calls_user_id_idx").on(table.userId),
      callsCampaignIdIdx: index("calls_campaign_id_idx").on(table.campaignId),
      callsContactIdIdx: index("calls_contact_id_idx").on(table.contactId),
      callsStatusIdx: index("calls_status_idx").on(table.status),
      callsCreatedAtIdx: index("calls_created_at_idx").on(table.createdAt),
      callsTwilioSidIdx: index("calls_twilio_sid_idx").on(table.twilioSid),
      callsElevenLabsConversationIdIdx: index("calls_elevenlabs_conversation_id_idx").on(table.elevenLabsConversationId),
      callsAgentIdIdx: index("calls_agent_id_idx").on(table.agentId)
    }));
    creditTransactions = pgTable("credit_transactions", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      type: text("type").notNull(),
      amount: integer("amount").notNull(),
      description: text("description").notNull(),
      reference: text("reference"),
      stripePaymentId: text("stripe_payment_id").unique(),
      // Unique constraint for idempotency
      widgetId: varchar("widget_id"),
      // For widget-originated credit deductions
      createdAt: timestamp("created_at").notNull().defaultNow()
    }, (table) => ({
      userReferenceUnique: uniqueIndex("credit_transactions_user_reference_unique").on(table.userId, table.reference).where(sql`reference IS NOT NULL`),
      creditTransactionsUserIdIdx: index("credit_transactions_user_id_idx").on(table.userId),
      creditTransactionsCreatedAtIdx: index("credit_transactions_created_at_idx").on(table.createdAt)
    }));
    tools = pgTable("tools", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      name: text("name").notNull(),
      type: text("type").notNull(),
      config: jsonb("config").notNull(),
      isActive: boolean("is_active").notNull().default(true),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    voices = pgTable("voices", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      name: text("name").notNull(),
      elevenLabsVoiceId: text("eleven_labs_voice_id"),
      gender: text("gender"),
      accent: text("accent"),
      tone: text("tone"),
      isCustom: boolean("is_custom").notNull().default(false),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    plans = pgTable("plans", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      name: text("name").notNull().unique(),
      // 'free' or 'pro'
      displayName: text("display_name").notNull(),
      description: text("description").notNull(),
      monthlyPrice: decimal("monthly_price", { precision: 10, scale: 2 }).notNull(),
      // USD price
      yearlyPrice: decimal("yearly_price", { precision: 10, scale: 2 }),
      // USD price
      razorpayMonthlyPrice: decimal("razorpay_monthly_price", { precision: 10, scale: 2 }),
      // INR price
      razorpayYearlyPrice: decimal("razorpay_yearly_price", { precision: 10, scale: 2 }),
      // INR price
      stripeMonthlyPriceId: text("stripe_monthly_price_id"),
      // Stripe Price ID for monthly plan
      stripeYearlyPriceId: text("stripe_yearly_price_id"),
      // Stripe Price ID for yearly plan
      stripeProductId: text("stripe_product_id"),
      // Stripe Product ID
      razorpayPlanId: text("razorpay_plan_id"),
      // Razorpay Plan ID (monthly)
      razorpayYearlyPlanId: text("razorpay_yearly_plan_id"),
      // Razorpay Plan ID (yearly)
      // PayPal pricing and plan IDs
      paypalMonthlyPrice: decimal("paypal_monthly_price", { precision: 10, scale: 2 }),
      // PayPal price (supports multiple currencies)
      paypalYearlyPrice: decimal("paypal_yearly_price", { precision: 10, scale: 2 }),
      paypalProductId: text("paypal_product_id"),
      // PayPal Product ID
      paypalMonthlyPlanId: text("paypal_monthly_plan_id"),
      // PayPal Plan ID for monthly
      paypalYearlyPlanId: text("paypal_yearly_plan_id"),
      // PayPal Plan ID for yearly
      // Paystack pricing and plan codes (Africa: NGN, GHS, ZAR, KES)
      paystackMonthlyPrice: decimal("paystack_monthly_price", { precision: 10, scale: 2 }),
      paystackYearlyPrice: decimal("paystack_yearly_price", { precision: 10, scale: 2 }),
      paystackMonthlyPlanCode: text("paystack_monthly_plan_code"),
      // Paystack Plan Code for monthly
      paystackYearlyPlanCode: text("paystack_yearly_plan_code"),
      // Paystack Plan Code for yearly
      // MercadoPago pricing and plan IDs (LATAM: BRL, MXN, ARS, CLP, COP)
      mercadopagoMonthlyPrice: decimal("mercadopago_monthly_price", { precision: 10, scale: 2 }),
      mercadopagoYearlyPrice: decimal("mercadopago_yearly_price", { precision: 10, scale: 2 }),
      mercadopagoMonthlyPlanId: text("mercadopago_monthly_plan_id"),
      // MercadoPago preapproval_plan_id
      mercadopagoYearlyPlanId: text("mercadopago_yearly_plan_id"),
      // YooKassa pricing and plan IDs
      yookassaMonthlyPrice: decimal("yookassa_monthly_price", { precision: 10, scale: 2 }),
      yookassaYearlyPrice: decimal("yookassa_yearly_price", { precision: 10, scale: 2 }),
      yookassaMonthlyPlanId: text("yookassa_monthly_plan_id"),
      yookassaYearlyPlanId: text("yookassa_yearly_plan_id"),
      maxAgents: integer("max_agents").notNull().default(1),
      maxCampaigns: integer("max_campaigns").notNull().default(1),
      maxContactsPerCampaign: integer("max_contacts_per_campaign").notNull().default(5),
      maxWebhooks: integer("max_webhooks").notNull().default(3),
      // Max webhook subscriptions
      maxKnowledgeBases: integer("max_knowledge_bases").notNull().default(5),
      // Max knowledge base items
      maxFlows: integer("max_flows").notNull().default(3),
      // Max flow automations
      maxPhoneNumbers: integer("max_phone_numbers").notNull().default(1),
      // Max rented phone numbers
      maxWidgets: integer("max_widgets").notNull().default(1),
      // Max website widgets
      includedCredits: integer("included_credits").notNull().default(0),
      defaultLlmModel: text("default_llm_model"),
      // For free plan restrictions
      canChooseLlm: boolean("can_choose_llm").notNull().default(false),
      canPurchaseNumbers: boolean("can_purchase_numbers").notNull().default(false),
      useSystemPool: boolean("use_system_pool").notNull().default(true),
      // Free plan uses system pool
      features: jsonb("features"),
      // Additional feature flags
      // SIP Engine Plugin - Plan-level access control
      sipEnabled: boolean("sip_enabled").notNull().default(false),
      maxConcurrentSipCalls: integer("max_concurrent_sip_calls").notNull().default(1),
      sipEnginesAllowed: text("sip_engines_allowed").array().default(sql`ARRAY['elevenlabs-sip']::text[]`),
      // ['elevenlabs-sip', 'openai-sip']
      // REST API Plugin - Plan-level access control
      restApiEnabled: boolean("rest_api_enabled").notNull().default(false),
      // Team Management Plugin - Plan-level access control
      teamManagementEnabled: boolean("team_management_enabled").notNull().default(false),
      maxTeamMembers: integer("max_team_members").notNull().default(0),
      // 0 = disabled
      maxCustomRoles: integer("max_custom_roles").notNull().default(0),
      // 0 = disabled
      isActive: boolean("is_active").notNull().default(true),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    globalSettings = pgTable("global_settings", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      key: text("key").notNull().unique(),
      value: jsonb("value").notNull(),
      description: text("description"),
      updatedBy: varchar("updated_by").references(() => users.id),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    llmModels = pgTable("llm_models", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      modelId: text("model_id").notNull().unique(),
      // e.g., 'gpt-4o-mini', 'claude-3-5-sonnet'
      name: text("name").notNull(),
      // Display name e.g., 'GPT-4o Mini (OpenAI)'
      provider: text("provider").notNull(),
      // 'openai', 'anthropic', 'google', 'elevenlabs'
      tier: text("tier").notNull(),
      // 'free' or 'pro'
      isActive: boolean("is_active").notNull().default(true),
      sortOrder: integer("sort_order").notNull().default(0),
      // For custom ordering in UI
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    supportedLanguages = pgTable("supported_languages", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      code: text("code").notNull().unique(),
      // ISO 639-1 code e.g., 'en', 'es', 'fr'
      label: text("label").notNull(),
      // Display name e.g., 'English', 'Spanish'
      providers: text("providers").notNull(),
      // 'elevenlabs', 'openai', or 'both'
      sortOrder: integer("sort_order").notNull().default(0),
      // For custom ordering in UI
      isActive: boolean("is_active").notNull().default(true),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    creditPackages = pgTable("credit_packages", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      name: text("name").notNull(),
      description: text("description"),
      credits: integer("credits").notNull(),
      price: decimal("price", { precision: 10, scale: 2 }).notNull(),
      // USD price
      razorpayPrice: decimal("razorpay_price", { precision: 10, scale: 2 }),
      // INR price
      stripeProductId: text("stripe_product_id"),
      stripePriceId: text("stripe_price_id"),
      razorpayItemId: text("razorpay_item_id"),
      // Razorpay Item ID for credit package
      // PayPal credit package pricing
      paypalPrice: decimal("paypal_price", { precision: 10, scale: 2 }),
      // PayPal price
      // Paystack credit package pricing (Africa)
      paystackPrice: decimal("paystack_price", { precision: 10, scale: 2 }),
      // Paystack price
      // MercadoPago credit package pricing (LATAM)
      mercadopagoPrice: decimal("mercadopago_price", { precision: 10, scale: 2 }),
      // MercadoPago price
      // YooKassa credit package pricing
      yookassaPrice: decimal("yookassa_price", { precision: 10, scale: 2 }),
      isActive: boolean("is_active").notNull().default(true),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    userSubscriptions = pgTable("user_subscriptions", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      planId: varchar("plan_id").notNull().references(() => plans.id, { onDelete: "restrict" }),
      status: text("status").notNull().default("active"),
      // 'active', 'cancelled', 'expired'
      currentPeriodStart: timestamp("current_period_start").notNull().defaultNow(),
      currentPeriodEnd: timestamp("current_period_end").notNull(),
      stripeSubscriptionId: text("stripe_subscription_id").unique(),
      // Unique constraint for idempotency
      razorpaySubscriptionId: text("razorpay_subscription_id").unique(),
      // Razorpay Subscription ID
      // PayPal subscription tracking
      paypalSubscriptionId: text("paypal_subscription_id").unique(),
      // PayPal Subscription ID
      // Paystack subscription tracking (Africa)
      paystackSubscriptionCode: text("paystack_subscription_code").unique(),
      // Paystack Subscription Code
      paystackCustomerCode: text("paystack_customer_code"),
      // Paystack Customer Code
      paystackEmailToken: text("paystack_email_token"),
      // Token for customer management
      // MercadoPago subscription tracking (LATAM)
      mercadopagoSubscriptionId: text("mercadopago_subscription_id").unique(),
      // MercadoPago preapproval ID
      // YooKassa subscription tracking
      yookassaSubscriptionId: text("yookassa_subscription_id").unique(),
      cancelAtPeriodEnd: boolean("cancel_at_period_end").notNull().default(false),
      billingPeriod: text("billing_period").notNull().default("monthly"),
      // 'monthly' or 'yearly'
      // Admin-set per-user limit overrides (null = use plan defaults)
      overrideMaxAgents: integer("override_max_agents"),
      // Override plan's maxAgents
      overrideMaxCampaigns: integer("override_max_campaigns"),
      // Override plan's maxCampaigns
      overrideMaxContactsPerCampaign: integer("override_max_contacts_per_campaign"),
      // Override plan's maxContactsPerCampaign
      overrideMaxWebhooks: integer("override_max_webhooks"),
      // Override plan's maxWebhooks
      overrideMaxKnowledgeBases: integer("override_max_knowledge_bases"),
      // Override plan's maxKnowledgeBases
      overrideMaxFlows: integer("override_max_flows"),
      // Override plan's maxFlows
      overrideMaxPhoneNumbers: integer("override_max_phone_numbers"),
      // Override plan's maxPhoneNumbers
      overrideMaxWidgets: integer("override_max_widgets"),
      // Override plan's maxWidgets
      overrideIncludedCredits: integer("override_included_credits"),
      // Override plan's includedCredits
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    phoneNumberRentals = pgTable("phone_number_rentals", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      phoneNumberId: varchar("phone_number_id").notNull().references(() => phoneNumbers.id, { onDelete: "cascade" }),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      creditsCharged: integer("credits_charged").notNull(),
      billingDate: timestamp("billing_date").notNull().defaultNow(),
      status: text("status").notNull().default("success"),
      // 'success', 'failed', 'insufficient_credits'
      transactionId: varchar("transaction_id").references(() => creditTransactions.id),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    usageRecords = pgTable("usage_records", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      subscriptionId: varchar("subscription_id").references(() => userSubscriptions.id, { onDelete: "cascade" }),
      callId: varchar("call_id").references(() => calls.id, { onDelete: "set null" }),
      type: text("type").notNull(),
      minutesUsed: integer("minutes_used").notNull().default(0),
      cost: decimal("cost", { precision: 10, scale: 2 }).notNull().default("0.00"),
      billingStatus: text("billing_status").notNull().default("pending"),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    legacyWebhooks = pgTable("webhooks", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      campaignId: varchar("campaign_id").notNull().references(() => campaigns.id, { onDelete: "cascade" }),
      url: text("url").notNull(),
      secret: text("secret").notNull(),
      isActive: boolean("is_active").notNull().default(true),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    legacyWebhookDeliveries = pgTable("webhook_deliveries", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      webhookId: varchar("webhook_id").notNull().references(() => legacyWebhooks.id, { onDelete: "cascade" }),
      callId: varchar("call_id").references(() => calls.id, { onDelete: "set null" }),
      status: text("status").notNull(),
      responseCode: integer("response_code"),
      responseBody: text("response_body"),
      payload: jsonb("payload").notNull(),
      errorMessage: text("error_message"),
      attemptCount: integer("attempt_count").notNull().default(1),
      lastAttemptAt: timestamp("last_attempt_at").notNull().defaultNow(),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    notifications = pgTable("notifications", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
      // Nullable for broadcast notifications
      type: text("type").notNull(),
      // low_credits, membership_upgraded, membership_expiry, campaign_completed, campaign_failed, etc.
      title: text("title").notNull(),
      message: text("message").notNull(),
      link: text("link"),
      // Optional link to navigate when clicked
      icon: text("icon"),
      // Custom icon name (lucide icon name)
      displayType: text("display_type").notNull().default("bell"),
      // 'bell', 'banner', or 'both'
      priority: integer("priority").notNull().default(0),
      // For ordering banner notifications (higher = more important)
      dismissible: boolean("dismissible").notNull().default(true),
      // Whether the notification can be dismissed
      expiresAt: timestamp("expires_at"),
      // When the notification should expire (null = never)
      isRead: boolean("is_read").notNull().default(false),
      isDismissed: boolean("is_dismissed").notNull().default(false),
      // For banner dismissals
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    emailTemplates = pgTable("email_templates", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      templateType: text("template_type").notNull().unique(),
      // 'otp', 'welcome', 'low_credits', 'campaign_complete', 'membership_upgrade', etc.
      name: text("name").notNull(),
      // Display name for admin
      subject: text("subject").notNull(),
      // Email subject line with variable support
      htmlBody: text("html_body").notNull(),
      // HTML email body with variable support
      textBody: text("text_body").notNull(),
      // Plain text fallback with variable support
      variables: text("variables").array(),
      // Available variables: ['userName', 'companyName', 'code', etc.]
      isActive: boolean("is_active").notNull().default(true),
      updatedAt: timestamp("updated_at").notNull().defaultNow(),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    promptTemplates = pgTable("prompt_templates", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
      // null = system template
      name: text("name").notNull(),
      description: text("description"),
      category: text("category").notNull().default("general"),
      // 'sales', 'support', 'appointment', 'survey', 'general'
      systemPrompt: text("system_prompt").notNull(),
      firstMessage: text("first_message"),
      variables: text("variables").array(),
      // Available variables: ['company', 'product', 'customerName', etc.]
      suggestedVoiceTone: text("suggested_voice_tone"),
      // Recommended voice settings
      suggestedPersonality: text("suggested_personality"),
      isSystemTemplate: boolean("is_system_template").notNull().default(false),
      // System-provided templates
      isPublic: boolean("is_public").notNull().default(false),
      // Can be used by other users
      usageCount: integer("usage_count").notNull().default(0),
      // Track popularity
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    agentVersions = pgTable("agent_versions", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      agentId: varchar("agent_id").notNull().references(() => agents.id, { onDelete: "cascade" }),
      versionNumber: integer("version_number").notNull(),
      snapshot: jsonb("snapshot").notNull().$type(),
      changesSummary: text("changes_summary"),
      // Human-readable summary of what changed
      changedFields: text("changed_fields").array(),
      // Array of field names that changed
      editedBy: varchar("edited_by").references(() => users.id, { onDelete: "set null" }),
      note: text("note"),
      // Optional note about why changes were made
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    auditLogs = pgTable("audit_logs", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      action: text("action").notNull(),
      // e.g., 'user.login', 'admin.user_update', 'payment.subscription_created'
      userId: varchar("user_id").references(() => users.id, { onDelete: "set null" }),
      // User who performed the action
      targetUserId: varchar("target_user_id").references(() => users.id, { onDelete: "set null" }),
      // User affected by the action
      resourceType: text("resource_type"),
      // e.g., 'agent', 'campaign', 'payment'
      resourceId: varchar("resource_id"),
      // ID of the affected resource
      ipAddress: text("ip_address"),
      userAgent: text("user_agent"),
      metadata: jsonb("metadata").$type(),
      // Additional context
      severity: text("severity").notNull().default("info"),
      // 'info', 'warning', 'error', 'critical'
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    platformLanguages = pgTable("platform_languages", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      code: text("code").notNull().unique(),
      // ISO 639-1 code e.g., 'en', 'es', 'ar'
      name: text("name").notNull(),
      // Display name e.g., 'English', 'Spanish'
      nativeName: text("native_name").notNull(),
      // Native name e.g., 'English', 'Español'
      flag: text("flag"),
      // Flag emoji e.g., '🇺🇸', '🇪🇸'
      direction: text("direction").notNull().default("ltr"),
      // 'ltr' or 'rtl'
      isEnabled: boolean("is_enabled").notNull().default(true),
      isDefault: boolean("is_default").notNull().default(false),
      // Only one can be default
      sortOrder: integer("sort_order").notNull().default(0),
      translations: jsonb("translations").notNull().$type(),
      // Full translation keys
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertUserSchema = createInsertSchema(users).pick({
      email: true,
      password: true,
      name: true,
      role: true
    });
    insertElevenLabsCredentialSchema = createInsertSchema(elevenLabsCredentials).omit({
      id: true,
      createdAt: true,
      updatedAt: true,
      currentLoad: true,
      totalAssignedAgents: true
    });
    insertSyncedVoiceSchema = createInsertSchema(syncedVoices).omit({
      id: true,
      syncedAt: true
    });
    insertAgentSchema = createInsertSchema(agents).omit({
      id: true,
      createdAt: true
    });
    insertKnowledgeBaseSchema = createInsertSchema(knowledgeBase).omit({
      id: true,
      createdAt: true
    });
    insertIncomingAgentSchema = createInsertSchema(incomingAgents).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertPromptTemplateSchema = createInsertSchema(promptTemplates).omit({
      id: true,
      createdAt: true,
      updatedAt: true,
      usageCount: true
    });
    insertAgentVersionSchema = createInsertSchema(agentVersions).omit({
      id: true,
      createdAt: true
    });
    insertIncomingConnectionSchema = createInsertSchema(incomingConnections).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertCampaignSchema = createInsertSchema(campaigns).omit({
      id: true,
      createdAt: true,
      completedCalls: true,
      successfulCalls: true,
      failedCalls: true
    });
    insertContactSchema = createInsertSchema(contacts).omit({
      id: true,
      createdAt: true
    });
    insertCallSchema = createInsertSchema(calls).omit({
      id: true,
      createdAt: true
    });
    insertCreditTransactionSchema = createInsertSchema(creditTransactions).omit({
      id: true,
      createdAt: true
    });
    insertToolSchema = createInsertSchema(tools).omit({
      id: true,
      createdAt: true
    });
    insertVoiceSchema = createInsertSchema(voices).omit({
      id: true,
      createdAt: true
    });
    insertPlanSchema = createInsertSchema(plans).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertGlobalSettingsSchema = createInsertSchema(globalSettings).omit({
      id: true,
      updatedAt: true
    });
    insertLlmModelSchema = createInsertSchema(llmModels).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertSupportedLanguageSchema = createInsertSchema(supportedLanguages).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertPlatformLanguageSchema = createInsertSchema(platformLanguages).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertCreditPackageSchema = createInsertSchema(creditPackages).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    }).extend({
      // Coerce number inputs to strings for decimal fields (frontend sends numbers)
      price: z.union([z.string(), z.number()]).transform((v) => String(v)),
      razorpayPrice: z.union([z.string(), z.number()]).transform((v) => v != null ? String(v) : null).nullable().optional(),
      paypalPrice: z.union([z.string(), z.number()]).transform((v) => v != null ? String(v) : null).nullable().optional(),
      paystackPrice: z.union([z.string(), z.number()]).transform((v) => v != null ? String(v) : null).nullable().optional(),
      mercadopagoPrice: z.union([z.string(), z.number()]).transform((v) => v != null ? String(v) : null).nullable().optional(),
      yookassaPrice: z.union([z.string(), z.number()]).transform((v) => v != null ? String(v) : null).nullable().optional()
    });
    insertUserSubscriptionSchema = createInsertSchema(userSubscriptions).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertPhoneNumberSchema = createInsertSchema(phoneNumbers).omit({
      id: true,
      createdAt: true
    });
    insertUsageRecordSchema = createInsertSchema(usageRecords).omit({
      id: true,
      createdAt: true
    });
    insertLegacyWebhookSchema = createInsertSchema(legacyWebhooks).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertLegacyWebhookDeliverySchema = createInsertSchema(legacyWebhookDeliveries).omit({
      id: true,
      createdAt: true
    });
    insertPhoneNumberRentalSchema = createInsertSchema(phoneNumberRentals).omit({
      id: true,
      createdAt: true
    });
    insertNotificationSchema = createInsertSchema(notifications).omit({
      id: true,
      createdAt: true,
      isRead: true,
      isDismissed: true
    });
    insertEmailTemplateSchema = createInsertSchema(emailTemplates).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    twilioCountries = pgTable("twilio_countries", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      code: varchar("code", { length: 2 }).notNull().unique(),
      // ISO 3166-1 alpha-2 code (e.g., "US", "GB")
      name: text("name").notNull(),
      dialCode: text("dial_code").notNull(),
      // International dialing code (e.g., "+1", "+44")
      isActive: boolean("is_active").notNull().default(true),
      sortOrder: integer("sort_order").notNull().default(100)
      // For display ordering (popular countries first)
    });
    insertTwilioCountrySchema = createInsertSchema(twilioCountries).omit({
      id: true
    });
    userKnowledgeStorageLimits = pgTable("user_knowledge_storage_limits", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }).unique(),
      maxStorageBytes: integer("max_storage_bytes").notNull().default(20971520),
      // 20MB default per user
      usedStorageBytes: integer("used_storage_bytes").notNull().default(0),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    knowledgeChunks = pgTable("knowledge_chunks", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      knowledgeBaseId: varchar("knowledge_base_id").notNull().references(() => knowledgeBase.id, { onDelete: "cascade" }),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      chunkIndex: integer("chunk_index").notNull(),
      // Order within the document
      chunkText: text("chunk_text").notNull(),
      // The actual text content
      embedding: jsonb("embedding"),
      // Vector embedding as JSON array of floats
      tokenCount: integer("token_count").notNull().default(0),
      metadata: jsonb("metadata"),
      // Page number, section, source info
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    knowledgeProcessingQueue = pgTable("knowledge_processing_queue", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      knowledgeBaseId: varchar("knowledge_base_id").notNull().references(() => knowledgeBase.id, { onDelete: "cascade" }),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      status: text("status").notNull().default("pending"),
      // pending, processing, completed, failed
      errorMessage: text("error_message"),
      totalChunks: integer("total_chunks").default(0),
      processedChunks: integer("processed_chunks").default(0),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertUserKnowledgeStorageLimitSchema = createInsertSchema(userKnowledgeStorageLimits).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    insertKnowledgeChunkSchema = createInsertSchema(knowledgeChunks).omit({
      id: true,
      createdAt: true
    });
    insertKnowledgeProcessingQueueSchema = createInsertSchema(knowledgeProcessingQueue).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    flows = pgTable("flows", {
      id: varchar("id").primaryKey(),
      userId: varchar("user_id").notNull(),
      name: varchar("name", { length: 255 }).notNull(),
      description: text("description"),
      nodes: jsonb("nodes").notNull().$type(),
      edges: jsonb("edges").notNull().$type(),
      agentId: varchar("agent_id"),
      voiceSettings: jsonb("voice_settings").$type(),
      executionConfig: jsonb("execution_config").$type(),
      isActive: boolean("is_active").default(true).notNull(),
      isTemplate: boolean("is_template").default(false).notNull(),
      compiledSystemPrompt: text("compiled_system_prompt"),
      compiledFirstMessage: text("compiled_first_message"),
      compiledStates: jsonb("compiled_states").$type(),
      compiledTools: jsonb("compiled_tools").$type(),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    insertFlowSchema = createInsertSchema(flows).omit({
      id: true,
      createdAt: true,
      updatedAt: true,
      compiledSystemPrompt: true,
      compiledFirstMessage: true,
      compiledStates: true,
      compiledTools: true
    });
    createFlowSchema = insertFlowSchema.omit({ userId: true });
    flowExecutions = pgTable("flow_executions", {
      id: varchar("id").primaryKey(),
      callId: varchar("call_id").notNull(),
      flowId: varchar("flow_id").notNull().references(() => flows.id),
      currentNodeId: varchar("current_node_id"),
      status: varchar("status", { length: 50 }).notNull(),
      variables: jsonb("variables").default({}).$type(),
      pathTaken: jsonb("path_taken").default([]).$type(),
      metadata: jsonb("metadata").$type(),
      error: text("error"),
      startedAt: timestamp("started_at").defaultNow().notNull(),
      completedAt: timestamp("completed_at")
    });
    insertFlowExecutionSchema = createInsertSchema(flowExecutions).omit({
      id: true,
      startedAt: true
    });
    flowTestQueue = pgTable("flow_test_queue", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull(),
      flowId: varchar("flow_id").notNull().references(() => flows.id, { onDelete: "cascade" }),
      toPhone: text("to_phone").notNull(),
      status: text("status").notNull().default("waiting"),
      // waiting / processing / completed / failed / cancelled
      callId: varchar("call_id"),
      // set when status=completed
      errorMessage: text("error_message"),
      // set when status=failed|cancelled
      processedAt: timestamp("processed_at"),
      // set when leaving waiting
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    insertFlowTestQueueSchema = createInsertSchema(flowTestQueue).omit({
      id: true,
      createdAt: true
    });
    webhookSubscriptions = pgTable("webhook_subscriptions", {
      id: varchar("id").primaryKey(),
      userId: varchar("user_id").notNull(),
      name: varchar("name", { length: 255 }).notNull(),
      description: text("description"),
      url: text("url").notNull(),
      method: varchar("method", { length: 10 }).default("POST").notNull(),
      headers: jsonb("headers").$type(),
      secret: varchar("secret", { length: 64 }).notNull(),
      authType: varchar("auth_type", { length: 50 }),
      authCredentials: jsonb("auth_credentials").$type(),
      events: jsonb("events").notNull().$type(),
      campaignIds: jsonb("campaign_ids").$type(),
      isActive: boolean("is_active").default(true).notNull(),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    webhooks = webhookSubscriptions;
    insertWebhookSchema = createInsertSchema(webhooks).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    createWebhookSchema = insertWebhookSchema.omit({ userId: true });
    webhookDeliveryLogs = pgTable("webhook_logs", {
      id: serial("id").primaryKey(),
      webhookId: varchar("webhook_id").references(() => webhookSubscriptions.id, { onDelete: "cascade" }),
      event: varchar("event", { length: 100 }).notNull(),
      payload: jsonb("payload").notNull(),
      success: boolean("success").notNull(),
      httpStatus: integer("status_code"),
      responseBody: text("response_body"),
      responseTime: integer("response_time"),
      error: text("error"),
      attemptNumber: integer("attempt").default(1).notNull(),
      maxAttempts: integer("max_attempts").default(3),
      nextRetryAt: timestamp("next_retry_at"),
      createdAt: timestamp("created_at").defaultNow().notNull()
    });
    webhookLogs = webhookDeliveryLogs;
    insertWebhookLogSchema = createInsertSchema(webhookLogs).omit({
      id: true,
      createdAt: true
    });
    appointments = pgTable("appointments", {
      id: varchar("id").primaryKey(),
      userId: varchar("user_id").notNull(),
      callId: varchar("call_id"),
      flowId: varchar("flow_id").references(() => flows.id),
      contactName: varchar("contact_name", { length: 255 }).notNull(),
      contactPhone: varchar("contact_phone", { length: 50 }).notNull(),
      contactEmail: varchar("contact_email", { length: 255 }),
      appointmentDate: date("appointment_date").notNull(),
      appointmentTime: time("appointment_time").notNull(),
      duration: integer("duration").notNull(),
      serviceName: varchar("service_name", { length: 255 }),
      notes: text("notes"),
      status: varchar("status", { length: 50 }).default("scheduled").notNull(),
      statusReason: varchar("status_reason", { length: 500 }),
      googleCalendarEventId: varchar("google_calendar_event_id", { length: 255 }),
      metadata: jsonb("metadata").$type(),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    insertAppointmentSchema = createInsertSchema(appointments).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    createAppointmentSchema = insertAppointmentSchema.omit({ userId: true });
    appointmentSettings = pgTable("appointment_settings", {
      id: varchar("id").primaryKey(),
      userId: varchar("user_id").notNull().unique(),
      allowOverlapping: boolean("allow_overlapping").default(false).notNull(),
      bufferMinutes: integer("buffer_minutes").default(0).notNull(),
      syncToGoogleCalendar: boolean("sync_to_google_calendar").default(false).notNull(),
      workingHours: jsonb("working_hours").notNull().$type(),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    insertAppointmentSettingsSchema = createInsertSchema(appointmentSettings).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    createAppointmentSettingsSchema = insertAppointmentSettingsSchema.omit({ userId: true });
    forms = pgTable("forms", {
      id: varchar("id").primaryKey(),
      userId: varchar("user_id").notNull(),
      name: varchar("name", { length: 255 }).notNull(),
      description: text("description"),
      isActive: boolean("is_active").default(true).notNull(),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    insertFormSchema = createInsertSchema(forms).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    createFormSchema = insertFormSchema.omit({ userId: true });
    formFields = pgTable("form_fields", {
      id: varchar("id").primaryKey(),
      formId: varchar("form_id").notNull().references(() => forms.id, { onDelete: "cascade" }),
      question: text("question").notNull(),
      fieldType: varchar("field_type", { length: 50 }).notNull(),
      options: jsonb("options").$type(),
      isRequired: boolean("is_required").default(true).notNull(),
      order: integer("order").notNull(),
      createdAt: timestamp("created_at").defaultNow().notNull()
    });
    insertFormFieldSchema = createInsertSchema(formFields).omit({
      id: true,
      createdAt: true
    });
    formSubmissions = pgTable("form_submissions", {
      id: varchar("id").primaryKey(),
      formId: varchar("form_id").notNull().references(() => forms.id),
      callId: varchar("call_id"),
      flowExecutionId: varchar("flow_execution_id").references(() => flowExecutions.id),
      contactName: varchar("contact_name", { length: 255 }),
      contactPhone: varchar("contact_phone", { length: 50 }),
      responses: jsonb("responses").notNull().$type(),
      submittedAt: timestamp("submitted_at").defaultNow().notNull()
    });
    insertFormSubmissionSchema = createInsertSchema(formSubmissions).omit({
      id: true,
      submittedAt: true
    });
    seoSettings = pgTable("seo_settings", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      // Meta Tags - Default values for pages without specific SEO
      defaultTitle: text("default_title").default("AI Calling Platform"),
      defaultDescription: text("default_description").default("Enterprise AI-powered bulk calling platform with voice agents, Twilio integration, and intelligent lead classification."),
      defaultKeywords: text("default_keywords").array().default(sql`ARRAY[]::text[]`),
      defaultOgImage: text("default_og_image").default("/og-image.png"),
      // Sitemap Configuration
      sitemapEnabled: boolean("sitemap_enabled").default(true),
      sitemapUrls: jsonb("sitemap_urls").$type().default([]),
      sitemapAutoGenerate: boolean("sitemap_auto_generate").default(true),
      // Robots.txt Configuration
      robotsEnabled: boolean("robots_enabled").default(true),
      robotsRules: jsonb("robots_rules").$type().default([
        {
          userAgent: "*",
          allow: ["/", "/pricing", "/features", "/use-cases", "/integrations", "/blog", "/contact", "/about", "/privacy", "/terms"],
          disallow: ["/app/", "/admin/", "/api/"]
        }
      ]),
      robotsCrawlDelay: integer("robots_crawl_delay").default(0),
      // Structured Data / Schema.org
      structuredDataEnabled: boolean("structured_data_enabled").default(true),
      structuredData: jsonb("structured_data").$type().default({
        organizationName: "",
        organizationUrl: "",
        organizationLogo: "/logo.png",
        organizationDescription: "AI-powered voice agents for automated calling",
        socialProfiles: [],
        contactEmail: "",
        contactPhone: ""
      }),
      // FAQ Structured Data for rich snippets
      structuredDataFaq: jsonb("structured_data_faq").$type().default([]),
      structuredDataFaqEnabled: boolean("structured_data_faq_enabled").default(false),
      // Product Structured Data for rich snippets
      structuredDataProduct: jsonb("structured_data_product").$type().default(null),
      structuredDataProductEnabled: boolean("structured_data_product_enabled").default(false),
      // Social Media Meta Tags
      twitterHandle: text("twitter_handle"),
      facebookAppId: text("facebook_app_id"),
      // Advanced Settings
      canonicalBaseUrl: text("canonical_base_url"),
      googleVerification: text("google_verification"),
      bingVerification: text("bing_verification"),
      // Audit
      updatedBy: varchar("updated_by").references(() => users.id),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertSeoSettingsSchema = createInsertSchema(seoSettings).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    analyticsScripts = pgTable("analytics_scripts", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      // Script Identity
      name: text("name").notNull(),
      // Display name (e.g., "Google Tag Manager", "Facebook Pixel")
      type: text("type").notNull().default("custom"),
      // 'gtm', 'ga4', 'facebook_pixel', 'linkedin', 'twitter', 'tiktok', 'hotjar', 'clarity', 'custom'
      // Script Content
      code: text("code").notNull(),
      // Legacy single code field (for backward compatibility)
      headCode: text("head_code"),
      // Code to inject in <head> section
      bodyCode: text("body_code"),
      // Code to inject after <body> tag (e.g., GTM noscript)
      // Placement Configuration - Array supports multiple placements (e.g., both head and body for some scripts like GTM)
      placement: text("placement").array().notNull().default(sql`ARRAY['head']::text[]`),
      // Array of 'head' and/or 'body' - where to inject the script
      loadPriority: integer("load_priority").notNull().default(0),
      // Higher priority = loads first (within placement group)
      // Script Attributes (for <script> tag configuration)
      async: boolean("async").default(false),
      // Add async attribute
      defer: boolean("defer").default(false),
      // Add defer attribute
      // Status
      enabled: boolean("enabled").notNull().default(true),
      // Page Scope - Control where scripts are injected
      hideOnInternalPages: boolean("hide_on_internal_pages").notNull().default(false),
      // Hide on admin/user dashboard pages
      // Notes for admin reference
      description: text("description"),
      // Audit
      updatedBy: varchar("updated_by").references(() => users.id),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertAnalyticsScriptSchema = createInsertSchema(analyticsScripts).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    paymentTransactions = pgTable("payment_transactions", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      // Transaction Type
      type: text("type").notNull(),
      // 'subscription' or 'credits'
      // Gateway Information
      gateway: text("gateway").notNull(),
      // 'stripe', 'razorpay', 'paypal', 'paystack', 'mercadopago'
      gatewayTransactionId: text("gateway_transaction_id"),
      // Payment intent ID, order ID, etc.
      gatewaySubscriptionId: text("gateway_subscription_id"),
      // For subscription payments
      // Amount & Currency
      amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
      currency: text("currency").notNull().default("USD"),
      // Related Records
      planId: varchar("plan_id").references(() => plans.id, { onDelete: "set null" }),
      creditPackageId: varchar("credit_package_id").references(() => creditPackages.id, { onDelete: "set null" }),
      subscriptionId: varchar("subscription_id").references(() => userSubscriptions.id, { onDelete: "set null" }),
      // Transaction Details
      description: text("description").notNull(),
      billingPeriod: text("billing_period"),
      // 'monthly', 'yearly' for subscriptions
      creditsAwarded: integer("credits_awarded"),
      // For credit purchases
      // Status
      status: text("status").notNull().default("pending"),
      // 'pending', 'completed', 'failed', 'refunded', 'partially_refunded'
      // Invoice Reference
      invoiceId: varchar("invoice_id"),
      // Will be linked after invoice generation
      // Metadata
      metadata: jsonb("metadata"),
      // Additional gateway-specific data
      // Timestamps
      completedAt: timestamp("completed_at"),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertPaymentTransactionSchema = createInsertSchema(paymentTransactions).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    refunds = pgTable("refunds", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      transactionId: varchar("transaction_id").notNull().references(() => paymentTransactions.id, { onDelete: "cascade" }),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      // Refund Details
      amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
      currency: text("currency").notNull().default("USD"),
      // Gateway Information
      gateway: text("gateway").notNull(),
      // Same as original transaction
      gatewayRefundId: text("gateway_refund_id"),
      // Refund ID from gateway
      // Refund Type
      reason: text("reason").notNull(),
      // 'admin_request', 'chargeback', 'customer_request', 'duplicate', 'fraudulent'
      initiatedBy: text("initiated_by").notNull(),
      // 'admin', 'customer', 'gateway' (for chargebacks)
      adminId: varchar("admin_id").references(() => users.id, { onDelete: "set null" }),
      // Admin who processed refund
      // Status
      status: text("status").notNull().default("pending"),
      // 'pending', 'processing', 'completed', 'failed'
      // Credits Reversal
      creditsReversed: integer("credits_reversed"),
      // Credits taken back
      // User Suspension (for chargebacks)
      userSuspended: boolean("user_suspended").notNull().default(false),
      // Notes
      adminNote: text("admin_note"),
      // Internal note from admin
      customerNote: text("customer_note"),
      // Note visible to customer
      // Metadata
      metadata: jsonb("metadata"),
      // Gateway-specific refund data
      // Refund Note PDF
      refundNoteNumber: text("refund_note_number"),
      // e.g., RN-2024-0001
      pdfUrl: text("pdf_url"),
      // URL to stored refund note PDF
      pdfGeneratedAt: timestamp("pdf_generated_at"),
      // Timestamps
      processedAt: timestamp("processed_at"),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertRefundSchema = createInsertSchema(refunds).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    invoices = pgTable("invoices", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      transactionId: varchar("transaction_id").notNull().references(() => paymentTransactions.id, { onDelete: "cascade" }),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      // Invoice Number (human-readable)
      invoiceNumber: text("invoice_number").notNull().unique(),
      // e.g., INV-2024-00001
      // Customer Details (snapshot at time of invoice)
      customerName: text("customer_name").notNull(),
      customerEmail: text("customer_email").notNull(),
      customerAddress: text("customer_address"),
      // Invoice Details
      description: text("description").notNull(),
      lineItems: jsonb("line_items").notNull().$type(),
      // Amounts
      subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
      tax: decimal("tax", { precision: 10, scale: 2 }).default("0.00"),
      total: decimal("total", { precision: 10, scale: 2 }).notNull(),
      currency: text("currency").notNull().default("USD"),
      // Gateway & Payment Info
      gateway: text("gateway").notNull(),
      paymentMethod: text("payment_method"),
      // 'card', 'bank_transfer', etc.
      // PDF Storage
      pdfUrl: text("pdf_url"),
      // URL to stored PDF
      pdfGeneratedAt: timestamp("pdf_generated_at"),
      // Status
      status: text("status").notNull().default("draft"),
      // 'draft', 'sent', 'paid', 'void'
      // Email Delivery
      emailSentAt: timestamp("email_sent_at"),
      emailSentTo: text("email_sent_to"),
      // Timestamps
      issuedAt: timestamp("issued_at").notNull().defaultNow(),
      dueAt: timestamp("due_at"),
      paidAt: timestamp("paid_at"),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertInvoiceSchema = createInsertSchema(invoices).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    paymentWebhookQueue = pgTable("payment_webhook_queue", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      // Webhook Source
      gateway: text("gateway").notNull(),
      // 'stripe', 'razorpay', 'paypal', 'paystack', 'mercadopago'
      eventType: text("event_type").notNull(),
      // e.g., 'payment_intent.succeeded', 'subscription.created'
      eventId: text("event_id").notNull(),
      // Gateway's event ID for idempotency
      // Payload
      payload: jsonb("payload").notNull(),
      // Full webhook payload
      // Processing Status
      status: text("status").notNull().default("pending"),
      // 'pending', 'processing', 'completed', 'failed', 'expired'
      // Retry Information
      attemptCount: integer("attempt_count").notNull().default(0),
      maxAttempts: integer("max_attempts").notNull().default(5),
      lastAttemptAt: timestamp("last_attempt_at"),
      nextRetryAt: timestamp("next_retry_at"),
      // Error Tracking
      lastError: text("last_error"),
      errorHistory: jsonb("error_history").$type(),
      // Related Records (if known)
      userId: varchar("user_id").references(() => users.id, { onDelete: "set null" }),
      transactionId: varchar("transaction_id").references(() => paymentTransactions.id, { onDelete: "set null" }),
      // Timestamps
      receivedAt: timestamp("received_at").notNull().defaultNow(),
      processedAt: timestamp("processed_at"),
      expiresAt: timestamp("expires_at").notNull(),
      // 24 hours from receivedAt
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    insertPaymentWebhookQueueSchema = createInsertSchema(paymentWebhookQueue).omit({
      id: true,
      createdAt: true
    });
    emailNotificationSettings = pgTable("email_notification_settings", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      // Email Type
      eventType: text("event_type").notNull().unique(),
      // 'welcome', 'purchase_confirmation', 'low_credits', 'campaign_completed', etc.
      displayName: text("display_name").notNull(),
      // Human-readable name
      description: text("description"),
      // Description of when this email is sent
      // Settings
      isEnabled: boolean("is_enabled").notNull().default(true),
      // Template Reference (optional - for custom templates)
      templateId: varchar("template_id").references(() => emailTemplates.id, { onDelete: "set null" }),
      // Thresholds (for certain event types)
      thresholdValue: integer("threshold_value"),
      // e.g., credit count for low_credits alert
      // Metadata
      category: text("category").notNull().default("general"),
      // 'authentication', 'billing', 'campaigns', 'account', 'general'
      // Audit
      updatedBy: varchar("updated_by").references(() => users.id, { onDelete: "set null" }),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertEmailNotificationSettingsSchema = createInsertSchema(emailNotificationSettings).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    bannedWords = pgTable("banned_words", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      word: text("word").notNull(),
      // The banned word or phrase
      category: text("category").notNull().default("general"),
      // 'profanity', 'harassment', 'hate_speech', 'threats', 'general'
      severity: text("severity").notNull().default("medium"),
      // 'low', 'medium', 'high', 'critical'
      isActive: boolean("is_active").notNull().default(true),
      autoBlock: boolean("auto_block").notNull().default(false),
      // Auto-block user when detected
      createdBy: varchar("created_by").references(() => users.id, { onDelete: "set null" }),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertBannedWordSchema = createInsertSchema(bannedWords).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    contentViolations = pgTable("content_violations", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      callId: varchar("call_id").notNull().references(() => calls.id, { onDelete: "cascade" }),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      bannedWordId: varchar("banned_word_id").references(() => bannedWords.id, { onDelete: "set null" }),
      detectedWord: text("detected_word").notNull(),
      // The actual word detected
      context: text("context"),
      // Surrounding text for context
      severity: text("severity").notNull().default("medium"),
      // 'low', 'medium', 'high', 'critical'
      status: text("status").notNull().default("pending"),
      // 'pending', 'reviewed', 'dismissed', 'actioned'
      reviewedBy: varchar("reviewed_by").references(() => users.id, { onDelete: "set null" }),
      reviewedAt: timestamp("reviewed_at"),
      actionTaken: text("action_taken"),
      // 'warning', 'blocked', 'dismissed', etc.
      notes: text("notes"),
      // Admin notes
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    insertContentViolationSchema = createInsertSchema(contentViolations).omit({
      id: true,
      createdAt: true
    });
    openaiCredentials = pgTable("openai_credentials", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      name: text("name").notNull(),
      apiKey: text("api_key").notNull(),
      modelTier: text("model_tier").notNull().default("free"),
      // 'free' (gpt-realtime-mini) or 'pro' (gpt-realtime-1.5)
      isActive: boolean("is_active").notNull().default(true),
      maxConcurrency: integer("max_concurrency").notNull().default(50),
      currentLoad: integer("current_load").notNull().default(0),
      totalAssignedAgents: integer("total_assigned_agents").notNull().default(0),
      totalAssignedUsers: integer("total_assigned_users").notNull().default(0),
      maxAgentsThreshold: integer("max_agents_threshold").notNull().default(100),
      lastHealthCheck: timestamp("last_health_check"),
      healthStatus: text("health_status").notNull().default("healthy"),
      // healthy, degraded, unhealthy
      metadata: jsonb("metadata"),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertOpenaiCredentialSchema = createInsertSchema(openaiCredentials).omit({
      id: true,
      currentLoad: true,
      totalAssignedAgents: true,
      totalAssignedUsers: true,
      lastHealthCheck: true,
      createdAt: true,
      updatedAt: true
    });
    plivoCredentials = pgTable("plivo_credentials", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      name: text("name").notNull(),
      authId: text("auth_id").notNull(),
      authToken: text("auth_token").notNull(),
      isActive: boolean("is_active").notNull().default(true),
      isPrimary: boolean("is_primary").notNull().default(false),
      metadata: jsonb("metadata"),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertPlivoCredentialSchema = createInsertSchema(plivoCredentials).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    plivoPhoneNumbers = pgTable("plivo_phone_numbers", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
      plivoCredentialId: varchar("plivo_credential_id").references(() => plivoCredentials.id, { onDelete: "set null" }),
      openaiCredentialId: varchar("openai_credential_id").references(() => openaiCredentials.id, { onDelete: "set null" }),
      phoneNumber: text("phone_number").notNull().unique(),
      plivoNumberId: text("plivo_number_id").notNull().unique(),
      friendlyName: text("friendly_name"),
      country: text("country").notNull(),
      region: text("region"),
      numberType: text("number_type").default("local"),
      // local, toll_free, national
      capabilities: jsonb("capabilities"),
      // { voice: true, sms: true }
      status: text("status").notNull().default("active"),
      // active, pending, released, suspended
      // Pricing (admin-configured credits)
      purchaseCredits: integer("purchase_credits").notNull().default(0),
      monthlyCredits: integer("monthly_credits").notNull().default(0),
      nextBillingDate: timestamp("next_billing_date"),
      // Incoming agent connection
      assignedAgentId: varchar("assigned_agent_id").references(() => agents.id, { onDelete: "set null" }),
      purchasedAt: timestamp("purchased_at").notNull().defaultNow(),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertPlivoPhoneNumberSchema = createInsertSchema(plivoPhoneNumbers).omit({
      id: true,
      purchasedAt: true,
      createdAt: true,
      updatedAt: true
    });
    plivoCalls = pgTable("plivo_calls", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
      campaignId: varchar("campaign_id").references(() => campaigns.id, { onDelete: "cascade" }),
      contactId: varchar("contact_id").references(() => contacts.id, { onDelete: "cascade" }),
      agentId: varchar("agent_id").references(() => agents.id, { onDelete: "set null" }),
      plivoPhoneNumberId: varchar("plivo_phone_number_id").references(() => plivoPhoneNumbers.id, { onDelete: "set null" }),
      openaiCredentialId: varchar("openai_credential_id").references(() => openaiCredentials.id, { onDelete: "set null" }),
      // Plivo identifiers
      plivoCallUuid: text("plivo_call_uuid").unique(),
      fromNumber: text("from_number").notNull(),
      toNumber: text("to_number").notNull(),
      // OpenAI session
      openaiSessionId: text("openai_session_id"),
      openaiVoice: text("openai_voice").default("alloy"),
      openaiModel: text("openai_model").default("gpt-realtime-1.5"),
      // Call status
      status: text("status").notNull().default("pending"),
      // pending, initiated, ringing, in-progress, completed, busy, failed, no-answer, canceled
      callDirection: text("call_direction").notNull().default("outbound"),
      // inbound, outbound
      duration: integer("duration"),
      // seconds
      // Recording
      recordingId: text("recording_id"),
      recordingUrl: text("recording_url"),
      recordingDuration: integer("recording_duration"),
      // AI analysis
      transcript: text("transcript"),
      aiSummary: text("ai_summary"),
      leadQualityScore: integer("lead_quality_score"),
      // 1-100
      sentiment: text("sentiment"),
      // positive, neutral, negative
      classification: text("classification"),
      // hot, warm, cold, lost
      keyPoints: jsonb("key_points"),
      // string[]
      nextActions: jsonb("next_actions"),
      // string[]
      // Call transfer
      wasTransferred: boolean("was_transferred").default(false),
      transferredTo: text("transferred_to"),
      transferredAt: timestamp("transferred_at"),
      // Timestamps
      startedAt: timestamp("started_at"),
      answeredAt: timestamp("answered_at"),
      endedAt: timestamp("ended_at"),
      metadata: jsonb("metadata"),
      createdAt: timestamp("created_at").notNull().defaultNow()
    }, (table) => ({
      plivoCallsUserIdIdx: index("plivo_calls_user_id_idx").on(table.userId),
      plivoCallsCampaignIdIdx: index("plivo_calls_campaign_id_idx").on(table.campaignId),
      plivoCallsContactIdIdx: index("plivo_calls_contact_id_idx").on(table.contactId),
      plivoCallsStatusIdx: index("plivo_calls_status_idx").on(table.status),
      plivoCallsCreatedAtIdx: index("plivo_calls_created_at_idx").on(table.createdAt),
      // plivoCalls has no call_id FK — it uses plivoCallUuid as the primary external identifier
      plivoCallsPlivoCallUuidIdx: index("plivo_calls_plivo_call_uuid_idx").on(table.plivoCallUuid)
    }));
    insertPlivoCallSchema = createInsertSchema(plivoCalls).omit({
      id: true,
      createdAt: true
    });
    campaignJobs = pgTable("campaign_jobs", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      campaignId: varchar("campaign_id").notNull(),
      contactId: varchar("contact_id").notNull(),
      engine: text("engine").notNull().default("plivo"),
      // 'plivo' or 'twilio'
      status: text("status").notNull().default("pending"),
      // pending, processing, completed, failed
      attempts: integer("attempts").notNull().default(0),
      lastError: text("last_error"),
      workerId: text("worker_id"),
      // For distributed processing
      createdAt: timestamp("created_at").notNull().defaultNow(),
      processedAt: timestamp("processed_at"),
      completedAt: timestamp("completed_at")
    });
    insertCampaignJobSchema = createInsertSchema(campaignJobs).omit({
      id: true,
      createdAt: true
    });
    plivoPhonePricing = pgTable("plivo_phone_pricing", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      countryCode: text("country_code").notNull().unique(),
      // ISO 2-letter country code
      countryName: text("country_name").notNull(),
      purchaseCredits: integer("purchase_credits").notNull().default(100),
      monthlyCredits: integer("monthly_credits").notNull().default(50),
      kycRequired: boolean("kyc_required").notNull().default(false),
      // Whether KYC verification is required for this country
      isActive: boolean("is_active").notNull().default(true),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertPlivoPhonePricingSchema = createInsertSchema(plivoPhonePricing).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    userKycDocuments = pgTable("user_kyc_documents", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      documentType: text("document_type").notNull(),
      // photo, company_registration, gst_certificate, authorization_letter
      fileName: text("file_name").notNull(),
      filePath: text("file_path").notNull(),
      mimeType: text("mime_type").notNull(),
      fileSize: integer("file_size"),
      uploadedAt: timestamp("uploaded_at").notNull().defaultNow()
    });
    insertUserKycDocumentSchema = createInsertSchema(userKycDocuments).omit({
      id: true,
      uploadedAt: true
    });
    twilioOpenaiCalls = pgTable("twilio_openai_calls", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
      campaignId: varchar("campaign_id").references(() => campaigns.id, { onDelete: "cascade" }),
      contactId: varchar("contact_id").references(() => contacts.id, { onDelete: "cascade" }),
      agentId: varchar("agent_id").references(() => agents.id, { onDelete: "set null" }),
      twilioPhoneNumberId: varchar("twilio_phone_number_id").references(() => phoneNumbers.id, { onDelete: "set null" }),
      openaiCredentialId: varchar("openai_credential_id").references(() => openaiCredentials.id, { onDelete: "set null" }),
      twilioCallSid: text("twilio_call_sid").unique(),
      fromNumber: text("from_number").notNull(),
      toNumber: text("to_number").notNull(),
      openaiSessionId: text("openai_session_id"),
      openaiVoice: text("openai_voice").default("alloy"),
      openaiModel: text("openai_model").default("gpt-realtime-1.5"),
      status: text("status").notNull().default("pending"),
      callDirection: text("call_direction").notNull().default("outbound"),
      duration: integer("duration"),
      recordingUrl: text("recording_url"),
      recordingDuration: integer("recording_duration"),
      transcript: text("transcript"),
      aiSummary: text("ai_summary"),
      leadQualityScore: integer("lead_quality_score"),
      sentiment: text("sentiment"),
      classification: text("classification"),
      keyPoints: jsonb("key_points"),
      nextActions: jsonb("next_actions"),
      wasTransferred: boolean("was_transferred").default(false),
      transferredTo: text("transferred_to"),
      transferredAt: timestamp("transferred_at"),
      startedAt: timestamp("started_at"),
      answeredAt: timestamp("answered_at"),
      endedAt: timestamp("ended_at"),
      metadata: jsonb("metadata"),
      createdAt: timestamp("created_at").notNull().defaultNow()
    }, (table) => ({
      twilioOpenaiCallsUserIdIdx: index("twilio_openai_calls_user_id_idx").on(table.userId),
      twilioOpenaiCallsCampaignIdIdx: index("twilio_openai_calls_campaign_id_idx").on(table.campaignId),
      twilioOpenaiCallsContactIdIdx: index("twilio_openai_calls_contact_id_idx").on(table.contactId),
      twilioOpenaiCallsStatusIdx: index("twilio_openai_calls_status_idx").on(table.status),
      twilioOpenaiCallsCreatedAtIdx: index("twilio_openai_calls_created_at_idx").on(table.createdAt),
      // twilioOpenaiCalls has no call_id FK — it uses twilioCallSid as the primary external identifier
      twilioOpenaiCallsTwilioSidIdx: index("twilio_openai_calls_twilio_call_sid_idx").on(table.twilioCallSid)
    }));
    insertTwilioOpenaiCallSchema = createInsertSchema(twilioOpenaiCalls).omit({
      id: true,
      createdAt: true
    });
    demoSessions = pgTable("demo_sessions", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      sessionToken: text("session_token").notNull().unique(),
      visitorIp: text("visitor_ip"),
      visitorFingerprint: text("visitor_fingerprint"),
      language: text("language").notNull().default("en"),
      voice: text("voice").notNull().default("alloy"),
      status: text("status").notNull().default("pending"),
      duration: integer("duration"),
      maxDuration: integer("max_duration").notNull().default(60),
      transcript: text("transcript"),
      openaiSessionId: text("openai_session_id"),
      openaiCredentialId: varchar("openai_credential_id").references(() => openaiCredentials.id, { onDelete: "set null" }),
      metadata: jsonb("metadata").$type(),
      startedAt: timestamp("started_at"),
      endedAt: timestamp("ended_at"),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    insertDemoSessionSchema = createInsertSchema(demoSessions).omit({
      id: true,
      createdAt: true
    });
    leadStages = pgTable("lead_stages", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      name: text("name").notNull(),
      color: text("color").notNull().default("#6B7280"),
      // Hex color for stage header
      order: integer("order").notNull().default(0),
      // Display order in Kanban
      isDefault: boolean("is_default").notNull().default(false),
      // System default stages can't be deleted
      isCustom: boolean("is_custom").notNull().default(true),
      // User-created stages
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertLeadStageSchema = createInsertSchema(leadStages).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    leads = pgTable("leads", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      // Source - Either from a campaign or incoming connection
      sourceType: text("source_type").notNull(),
      // 'campaign' | 'incoming'
      campaignId: varchar("campaign_id").references(() => campaigns.id, { onDelete: "cascade" }),
      incomingConnectionId: varchar("incoming_connection_id").references(() => incomingConnections.id, { onDelete: "cascade" }),
      // Contact Information
      firstName: text("first_name"),
      lastName: text("last_name"),
      phone: text("phone").notNull(),
      email: text("email"),
      company: text("company"),
      customFields: jsonb("custom_fields").$type(),
      // Pipeline Status
      stageId: varchar("stage_id").references(() => leadStages.id, { onDelete: "set null" }),
      stage: text("stage").notNull().default("new"),
      // Fallback stage name: new, hot, appointment, form_submitted, follow_up, not_interested, no_answer
      // AI-Generated Insights
      leadScore: integer("lead_score"),
      // 1-100 AI-generated score
      aiSummary: text("ai_summary"),
      // AI-generated call summary
      aiNextAction: text("ai_next_action"),
      // Suggested next action
      sentiment: text("sentiment"),
      // positive, neutral, negative
      aiCategory: text("ai_category"),
      // AI-assigned category: 'warm' | 'hot' | 'appointment_booked' | 'form_submitted' | 'call_transfer' | 'need_follow_up' | null (uncategorized)
      // Tool Execution Flags - Show badges on lead card
      hasAppointment: boolean("has_appointment").notNull().default(false),
      hasFormSubmission: boolean("has_form_submission").notNull().default(false),
      hasTransfer: boolean("has_transfer").notNull().default(false),
      hasCallback: boolean("has_callback").notNull().default(false),
      // Appointment Details (if hasAppointment)
      appointmentDate: timestamp("appointment_date"),
      appointmentDetails: jsonb("appointment_details").$type(),
      // Form Submission Details (if hasFormSubmission)
      formData: jsonb("form_data").$type(),
      // Transfer Details (if hasTransfer)
      transferredTo: text("transferred_to"),
      transferredAt: timestamp("transferred_at"),
      // Callback/Follow-up Scheduling
      callbackScheduled: timestamp("callback_scheduled"),
      callbackCompleted: boolean("callback_completed").notNull().default(false),
      // Call Reference - Link to the call record
      callId: varchar("call_id").references(() => calls.id, { onDelete: "set null" }),
      plivoCallId: varchar("plivo_call_id").references(() => plivoCalls.id, { onDelete: "set null" }),
      twilioOpenaiCallId: varchar("twilio_openai_call_id").references(() => twilioOpenaiCalls.id, { onDelete: "set null" }),
      sipCallId: varchar("sip_call_id").references(() => sipCalls.id, { onDelete: "set null" }),
      veSessionId: varchar("ve_session_id"),
      // Total calls made to this lead (for follow-ups)
      totalCalls: integer("total_calls").notNull().default(1),
      lastCallAt: timestamp("last_call_at"),
      // Tags for organization
      tags: text("tags").array(),
      // Assignment for team accounts
      assignedUserId: varchar("assigned_user_id").references(() => users.id, { onDelete: "set null" }),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertLeadSchema = createInsertSchema(leads).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    AI_LEAD_CATEGORIES = {
      WARM: "warm",
      HOT: "hot",
      NEUTRAL: "neutral",
      COLD: "cold",
      APPOINTMENT_BOOKED: "appointment_booked",
      FORM_SUBMITTED: "form_submitted",
      CALL_TRANSFER: "call_transfer",
      NEED_FOLLOW_UP: "need_follow_up"
    };
    AI_CATEGORY_LABELS = {
      [AI_LEAD_CATEGORIES.WARM]: "Warm Lead",
      [AI_LEAD_CATEGORIES.HOT]: "Hot Lead",
      [AI_LEAD_CATEGORIES.NEUTRAL]: "Neutral Lead",
      [AI_LEAD_CATEGORIES.COLD]: "Cold Lead",
      [AI_LEAD_CATEGORIES.APPOINTMENT_BOOKED]: "Appointment Booked",
      [AI_LEAD_CATEGORIES.FORM_SUBMITTED]: "Form Submitted",
      [AI_LEAD_CATEGORIES.CALL_TRANSFER]: "Call Transfer",
      [AI_LEAD_CATEGORIES.NEED_FOLLOW_UP]: "Need Follow Up"
    };
    AI_CATEGORY_COLORS = {
      [AI_LEAD_CATEGORIES.WARM]: "#F59E0B",
      [AI_LEAD_CATEGORIES.HOT]: "#EF4444",
      [AI_LEAD_CATEGORIES.NEUTRAL]: "#6B7280",
      [AI_LEAD_CATEGORIES.COLD]: "#3B82F6",
      [AI_LEAD_CATEGORIES.APPOINTMENT_BOOKED]: "#10B981",
      [AI_LEAD_CATEGORIES.FORM_SUBMITTED]: "#3B82F6",
      [AI_LEAD_CATEGORIES.CALL_TRANSFER]: "#8B5CF6",
      [AI_LEAD_CATEGORIES.NEED_FOLLOW_UP]: "#F97316"
    };
    AI_CATEGORY_PRIORITY = [
      AI_LEAD_CATEGORIES.APPOINTMENT_BOOKED,
      AI_LEAD_CATEGORIES.FORM_SUBMITTED,
      AI_LEAD_CATEGORIES.CALL_TRANSFER,
      AI_LEAD_CATEGORIES.NEED_FOLLOW_UP,
      AI_LEAD_CATEGORIES.HOT,
      AI_LEAD_CATEGORIES.WARM,
      AI_LEAD_CATEGORIES.NEUTRAL,
      AI_LEAD_CATEGORIES.COLD
    ];
    leadNotes = pgTable("lead_notes", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      leadId: varchar("lead_id").notNull().references(() => leads.id, { onDelete: "cascade" }),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      content: text("content").notNull(),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertLeadNoteSchema = createInsertSchema(leadNotes).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    leadActivities = pgTable("lead_activities", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      leadId: varchar("lead_id").notNull().references(() => leads.id, { onDelete: "cascade" }),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      // Activity type: 'call' | 'note' | 'stage_change' | 'tag_added' | 'tag_removed' | 'created' | 'updated' | 'transfer' | 'appointment' | 'form_submission'
      activityType: text("activity_type").notNull(),
      // Activity details
      title: text("title").notNull(),
      // Short description: "Stage changed to Hot Lead"
      description: text("description"),
      // Longer description if needed
      // Metadata for different activity types
      metadata: jsonb("metadata").$type(),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    insertLeadActivitySchema = createInsertSchema(leadActivities).omit({
      id: true,
      createdAt: true
    });
    crmCategoryPreferences = pgTable("crm_category_preferences", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      // Column order - array of category IDs in display order
      columnOrder: text("column_order").array().notNull().default(sql`ARRAY['warm', 'hot', 'appointment_booked', 'form_submitted', 'call_transfer', 'need_follow_up']::text[]`),
      // Color overrides - JSON object mapping category ID to hex color
      colorOverrides: jsonb("color_overrides").$type().default({}),
      // Per-column sort preferences - JSON object mapping category ID to sort preference
      columnSortPreferences: jsonb("column_sort_preferences").$type().default({}),
      // Filtering Settings
      hideLeadsWithoutPhone: boolean("hide_leads_without_phone").notNull().default(false),
      // Pipeline stage mappings - which AI categories go to which pipeline stage
      // Maps aiCategory (hot/warm/cold) to pipeline stage id or name
      categoryPipelineMappings: jsonb("category_pipeline_mappings").$type().default({}),
      // Score thresholds for lead classification
      // hot: score >= hotThreshold, warm: score >= warmThreshold, cold: score < warmThreshold
      hotScoreThreshold: integer("hot_score_threshold").default(80),
      warmScoreThreshold: integer("warm_score_threshold").default(50),
      // Hide specific classifications from view
      hiddenCategories: text("hidden_categories").array().default(sql`ARRAY[]::text[]`),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertCrmCategoryPreferencesSchema = createInsertSchema(crmCategoryPreferences).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    websiteWidgets = pgTable("website_widgets", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      // Basic Info
      name: text("name").notNull(),
      description: text("description"),
      status: text("status").notNull().default("active"),
      // active, paused, disabled
      // Agent Configuration - which AI agent powers this widget
      agentId: varchar("agent_id").references(() => agents.id, { onDelete: "set null" }),
      agentType: text("agent_type").notNull().default("natural"),
      // natural, flow
      // Branding
      iconUrl: text("icon_url"),
      // Custom icon for the chat bubble
      iconPath: text("icon_path"),
      // File path for uploaded icon
      brandName: text("brand_name"),
      // Display name shown in widget
      buttonLabel: text("button_label").notNull().default("VOICE CHAT"),
      // Customizable button text
      primaryColor: text("primary_color").notNull().default("#3B82F6"),
      // Main color
      accentColor: text("accent_color").notNull().default("#1E40AF"),
      // Secondary color
      backgroundColor: text("background_color").notNull().default("#FFFFFF"),
      // Widget background
      textColor: text("text_color").notNull().default("#1F2937"),
      // Text color
      // Terms & Conditions
      requireTermsAcceptance: boolean("require_terms_acceptance").notNull().default(false),
      // Show terms checkbox before call
      // Widget Text Content
      welcomeMessage: text("welcome_message").notNull().default("Hi! Click to start a voice conversation."),
      launcherText: text("launcher_text").notNull().default("Talk to us"),
      offlineMessage: text("offline_message").notNull().default("We're currently unavailable. Please try again later."),
      lowCreditsMessage: text("low_credits_message").notNull().default("Service temporarily unavailable."),
      // Domain Whitelisting
      allowedDomains: text("allowed_domains").array().notNull().default(sql`ARRAY[]::text[]`),
      // Empty = allow all
      // Business Hours
      businessHoursEnabled: boolean("business_hours_enabled").notNull().default(false),
      businessHoursStart: text("business_hours_start").default("09:00"),
      // HH:MM format
      businessHoursEnd: text("business_hours_end").default("17:00"),
      // HH:MM format
      businessDays: text("business_days").array().default(sql`ARRAY['monday', 'tuesday', 'wednesday', 'thursday', 'friday']::text[]`),
      businessTimezone: text("business_timezone").default("America/New_York"),
      // Call Limits & Abuse Prevention
      maxConcurrentCalls: integer("max_concurrent_calls").notNull().default(5),
      maxCallDuration: integer("max_call_duration").notNull().default(300),
      // seconds (5 minutes default)
      cooldownMinutes: integer("cooldown_minutes").notNull().default(0),
      // minutes between calls per IP (0 = no cooldown)
      // Appointment Booking
      appointmentBookingEnabled: boolean("appointment_booking_enabled").notNull().default(false),
      // Embed Token - used to identify widget in public API
      embedToken: text("embed_token").notNull().unique(),
      // Analytics
      totalCalls: integer("total_calls").notNull().default(0),
      totalMinutes: integer("total_minutes").notNull().default(0),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertWebsiteWidgetSchema = createInsertSchema(websiteWidgets).omit({
      id: true,
      totalCalls: true,
      totalMinutes: true,
      createdAt: true,
      updatedAt: true
    });
    widgetCallSessions = pgTable("widget_call_sessions", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      widgetId: varchar("widget_id").notNull().references(() => websiteWidgets.id, { onDelete: "cascade" }),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      // Session Info
      sessionToken: text("session_token").notNull().unique(),
      visitorIp: text("visitor_ip"),
      visitorDomain: text("visitor_domain"),
      // Domain where widget is embedded
      // Call State
      status: text("status").notNull().default("pending"),
      // pending, connecting, active, completed, failed
      duration: integer("duration"),
      // seconds
      creditsUsed: integer("credits_used").default(0),
      // Recording & Transcript
      recordingUrl: text("recording_url"),
      transcript: text("transcript"),
      aiSummary: text("ai_summary"),
      sentiment: text("sentiment"),
      // OpenAI Realtime connection
      openaiSessionId: text("openai_session_id"),
      openaiCredentialId: varchar("openai_credential_id"),
      startedAt: timestamp("started_at"),
      endedAt: timestamp("ended_at"),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    insertWidgetCallSessionSchema = createInsertSchema(widgetCallSessions).omit({
      id: true,
      createdAt: true
    });
    API_SCOPES = {
      // Read scopes
      "calls:read": "View call history and details",
      "campaigns:read": "View campaigns",
      "agents:read": "View agents",
      "contacts:read": "View contacts",
      "knowledge:read": "View knowledge bases",
      "phone-numbers:read": "View phone numbers",
      "webhooks:read": "View webhook subscriptions",
      "credits:read": "View credit balance and usage",
      "analytics:read": "View analytics data",
      // Write scopes
      "calls:write": "Trigger and manage calls",
      "campaigns:write": "Create and manage campaigns",
      "agents:write": "Create and manage agents",
      "contacts:write": "Create and manage contacts",
      "knowledge:write": "Upload knowledge base documents",
      "phone-numbers:write": "Purchase and assign phone numbers",
      "webhooks:write": "Manage webhook subscriptions",
      // Admin scopes
      "admin": "Full administrative access"
    };
    apiKeys = pgTable("api_keys", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      // Key identification
      name: text("name").notNull(),
      // User-friendly name: "Production Key", "CRM Integration"
      keyPrefix: text("key_prefix").notNull(),
      // First 8 chars of key for identification: "agl_1234..."
      hashedSecret: text("hashed_secret").notNull(),
      // bcrypt hash of the secret key
      // Permissions
      scopes: text("scopes").array().notNull().default(sql`ARRAY['calls:read', 'calls:write', 'campaigns:read', 'contacts:read']::text[]`),
      // Rate limiting
      rateLimit: integer("rate_limit").notNull().default(100),
      // Requests per minute
      rateLimitWindow: integer("rate_limit_window").notNull().default(60),
      // Window in seconds
      // Security
      ipWhitelist: text("ip_whitelist").array().default(sql`ARRAY[]::text[]`),
      // Empty = allow all
      expiresAt: timestamp("expires_at"),
      // Optional expiration
      // Status
      isActive: boolean("is_active").notNull().default(true),
      lastUsedAt: timestamp("last_used_at"),
      lastUsedIp: text("last_used_ip"),
      totalRequests: integer("total_requests").notNull().default(0),
      // Metadata
      description: text("description"),
      metadata: jsonb("metadata"),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertApiKeySchema = createInsertSchema(apiKeys).omit({
      id: true,
      lastUsedAt: true,
      lastUsedIp: true,
      totalRequests: true,
      createdAt: true,
      updatedAt: true
    });
    apiAuditLogs = pgTable("api_audit_logs", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      apiKeyId: varchar("api_key_id").references(() => apiKeys.id, { onDelete: "set null" }),
      // Request details
      method: text("method").notNull(),
      // GET, POST, PUT, DELETE
      endpoint: text("endpoint").notNull(),
      // /v1/calls, /v1/campaigns/:id
      path: text("path").notNull(),
      // Full path with params: /v1/campaigns/abc-123
      // Request info
      requestBody: jsonb("request_body"),
      // Sanitized request body (no secrets)
      queryParams: jsonb("query_params"),
      // Response info
      statusCode: integer("status_code").notNull(),
      responseTime: integer("response_time"),
      // Milliseconds
      errorMessage: text("error_message"),
      // Client info
      ipAddress: text("ip_address"),
      userAgent: text("user_agent"),
      // Correlation
      requestId: text("request_id").notNull(),
      // Unique ID for request tracing
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    insertApiAuditLogSchema = createInsertSchema(apiAuditLogs).omit({
      id: true,
      createdAt: true
    });
    apiRateLimits = pgTable("api_rate_limits", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      apiKeyId: varchar("api_key_id").notNull().references(() => apiKeys.id, { onDelete: "cascade" }),
      windowStart: timestamp("window_start").notNull(),
      requestCount: integer("request_count").notNull().default(0),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    sipTrunks = pgTable("sip_trunks", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      name: text("name").notNull(),
      engine: text("engine").notNull(),
      // 'elevenlabs-sip' | 'openai-sip'
      provider: text("provider").notNull().default("generic"),
      // SIP provider: twilio, plivo, telnyx, vonage, exotel, bandwidth, didww, zadarma, cloudonix, ringcentral, sinch, infobip, generic
      sipHost: text("sip_host").notNull(),
      sipPort: integer("sip_port").notNull().default(5060),
      transport: text("transport").notNull().default("tls"),
      // 'udp' | 'tcp' | 'tls' - used for OUTBOUND
      mediaEncryption: text("media_encryption").notNull().default("require"),
      // 'require' | 'prefer' | 'none'
      // Inbound-specific settings (for receiving calls from provider to ElevenLabs)
      // These can differ from outbound settings - e.g., Twilio uses TCP:5060 for inbound but TLS:5061 for outbound
      inboundTransport: text("inbound_transport").default("tcp"),
      // 'udp' | 'tcp' | 'tls' - used for INBOUND
      inboundPort: integer("inbound_port").default(5060),
      // Port for inbound SIP (ElevenLabs listens on this)
      codecsAllowed: text("codecs_allowed").array().default(sql`ARRAY['PCMU', 'PCMA']::text[]`),
      username: text("username"),
      password: text("password"),
      // Stored encrypted at application layer
      realm: text("realm"),
      registrarHost: text("registrar_host"),
      externalElevenLabsId: text("external_elevenlabs_id"),
      isActive: boolean("is_active").notNull().default(true),
      healthStatus: text("health_status").notNull().default("unknown"),
      lastHealthCheck: timestamp("last_health_check"),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertSipTrunkSchema = createInsertSchema(sipTrunks).omit({
      id: true,
      healthStatus: true,
      lastHealthCheck: true,
      createdAt: true,
      updatedAt: true
    });
    sipPhoneNumbers = pgTable("sip_phone_numbers", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      sipTrunkId: varchar("sip_trunk_id").notNull().references(() => sipTrunks.id, { onDelete: "cascade" }),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      phoneNumber: text("phone_number").notNull(),
      label: text("label"),
      engine: text("engine").notNull(),
      // Inherited from trunk: 'elevenlabs-sip' | 'openai-sip'
      agentId: varchar("agent_id").references(() => agents.id, { onDelete: "set null" }),
      inboundEnabled: boolean("inbound_enabled").notNull().default(true),
      outboundEnabled: boolean("outbound_enabled").notNull().default(true),
      externalElevenLabsPhoneId: text("external_elevenlabs_phone_id"),
      externalFonosterPhoneId: text("external_fonoster_phone_id"),
      elevenLabsCredentialId: varchar("eleven_labs_credential_id").references(() => elevenLabsCredentials.id, { onDelete: "set null" }),
      credentialsSyncedAt: timestamp("credentials_synced_at"),
      isActive: boolean("is_active").notNull().default(true),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertSipPhoneNumberSchema = createInsertSchema(sipPhoneNumbers).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    sipCalls = pgTable("sip_calls", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      agentId: varchar("agent_id").references(() => agents.id, { onDelete: "set null" }),
      campaignId: varchar("campaign_id").references(() => campaigns.id),
      contactId: varchar("contact_id").references(() => contacts.id),
      sipTrunkId: varchar("sip_trunk_id").references(() => sipTrunks.id),
      sipPhoneNumberId: varchar("sip_phone_number_id").references(() => sipPhoneNumbers.id, { onDelete: "set null" }),
      engine: varchar("engine", { length: 50 }).notNull(),
      // 'elevenlabs-sip' | 'openai-sip'
      externalCallId: varchar("external_call_id", { length: 255 }),
      openaiCallId: varchar("openai_call_id", { length: 255 }),
      elevenlabsConversationId: varchar("elevenlabs_conversation_id", { length: 255 }),
      fromNumber: varchar("from_number", { length: 50 }),
      toNumber: varchar("to_number", { length: 50 }),
      direction: varchar("direction", { length: 20 }).notNull(),
      // 'inbound' | 'outbound'
      status: varchar("status", { length: 50 }).default("initiated"),
      durationSeconds: integer("duration_seconds").default(0),
      creditsUsed: decimal("credits_used", { precision: 10, scale: 2 }).default("0"),
      recordingUrl: text("recording_url"),
      transcript: jsonb("transcript"),
      // Matches SQL migration column name
      aiSummary: text("ai_summary"),
      sentiment: varchar("sentiment", { length: 50 }),
      classification: varchar("classification", { length: 50 }),
      sipHeaders: jsonb("sip_headers"),
      metadata: jsonb("metadata"),
      // Matches SQL migration column name
      startedAt: timestamp("started_at"),
      answeredAt: timestamp("answered_at"),
      endedAt: timestamp("ended_at"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    }, (table) => ({
      sipCallsUserIdIdx: index("sip_calls_user_id_idx").on(table.userId),
      sipCallsCampaignIdIdx: index("sip_calls_campaign_id_idx").on(table.campaignId),
      sipCallsContactIdIdx: index("sip_calls_contact_id_idx").on(table.contactId),
      sipCallsStatusIdx: index("sip_calls_status_idx").on(table.status),
      sipCallsCreatedAtIdx: index("sip_calls_created_at_idx").on(table.createdAt),
      // sipCalls has no call_id FK — uses externalCallId/openaiCallId/elevenlabsConversationId
      sipCallsExternalCallIdIdx: index("sip_calls_external_call_id_idx").on(table.externalCallId),
      sipCallsElevenlabsConversationIdIdx: index("sip_calls_elevenlabs_conversation_id_idx").on(table.elevenlabsConversationId)
    }));
    insertSipCallSchema = createInsertSchema(sipCalls).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    userAddresses = pgTable("user_addresses", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      // Address details
      customerName: text("customer_name").notNull(),
      street: text("street").notNull(),
      city: text("city").notNull(),
      region: text("region").notNull(),
      // State/Province
      postalCode: text("postal_code").notNull(),
      isoCountry: text("iso_country").notNull(),
      // ISO 3166-1 alpha-2 country code (e.g., AU, GB, DE)
      // Twilio integration
      twilioAddressSid: text("twilio_address_sid"),
      // Twilio Address SID after creation
      // Status tracking
      status: text("status").notNull().default("pending"),
      // pending, submitted, verified, rejected
      verificationStatus: text("verification_status"),
      // Twilio's verification status
      validationStatus: text("validation_status"),
      // Twilio's validation status
      rejectionReason: text("rejection_reason"),
      // Reason if rejected
      // Timestamps
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertUserAddressSchema = createInsertSchema(userAddresses).omit({
      id: true,
      twilioAddressSid: true,
      status: true,
      verificationStatus: true,
      validationStatus: true,
      rejectionReason: true,
      createdAt: true,
      updatedAt: true
    });
    userFeedback = pgTable("user_feedback", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      type: text("type").notNull(),
      // 'bug' | 'feature' | 'improvement' | 'other'
      subject: text("subject").notNull(),
      description: text("description").notNull(),
      status: text("status").notNull().default("open"),
      // 'open' | 'in_progress' | 'resolved' | 'closed'
      priority: text("priority").default("medium"),
      // 'low' | 'medium' | 'high' | 'critical'
      adminResponse: text("admin_response"),
      respondedBy: varchar("responded_by").references(() => users.id),
      respondedAt: timestamp("responded_at"),
      pageUrl: text("page_url"),
      // Where the feedback was submitted from
      userAgent: text("user_agent"),
      // Browser/device info for bug reports
      screenshot: text("screenshot"),
      // Optional base64 screenshot
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertUserFeedbackSchema = createInsertSchema(userFeedback).omit({
      id: true,
      status: true,
      priority: true,
      adminResponse: true,
      respondedBy: true,
      respondedAt: true,
      createdAt: true,
      updatedAt: true
    });
    googleCalendarCredentials = pgTable("google_calendar_credentials", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().unique(),
      accessToken: text("access_token").notNull(),
      refreshToken: text("refresh_token").notNull(),
      tokenExpiry: timestamp("token_expiry").notNull(),
      connectedEmail: text("connected_email").notNull(),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertGoogleCalendarCredentialSchema = createInsertSchema(googleCalendarCredentials).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    googleSheetsCredentials = pgTable("google_sheets_credentials", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().unique(),
      accessToken: text("access_token").notNull(),
      refreshToken: text("refresh_token").notNull(),
      tokenExpiry: timestamp("token_expiry").notNull(),
      connectedEmail: text("connected_email").notNull(),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertGoogleSheetsCredentialSchema = createInsertSchema(googleSheetsCredentials).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    phoneReleaseRetryQueue = pgTable("phone_release_retry_queue", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      phoneNumberId: varchar("phone_number_id").notNull(),
      provider: text("provider").notNull(),
      // 'twilio' | 'plivo'
      providerSid: text("provider_sid").notNull(),
      // twilioSid or plivoPhoneNumberId
      userId: varchar("user_id"),
      attempts: integer("attempts").notNull().default(0),
      lastError: text("last_error"),
      nextRetryAt: timestamp("next_retry_at").notNull().defaultNow(),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    }, (table) => ({
      phoneReleaseRetryQueueNextRetryAtIdx: index("phone_release_retry_queue_next_retry_at_idx").on(table.nextRetryAt),
      phoneReleaseRetryQueuePhoneNumberIdIdx: index("phone_release_retry_queue_phone_number_id_idx").on(table.phoneNumberId)
    }));
    insertPhoneReleaseRetryQueueSchema = createInsertSchema(phoneReleaseRetryQueue).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    veAgentInstantFaqs = pgTable("ve_agent_instant_faqs", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      agentId: varchar("agent_id").notNull(),
      userId: varchar("user_id").notNull(),
      questionPatterns: text("question_patterns").array().notNull(),
      answerText: text("answer_text").notNull(),
      audioCacheUrl: text("audio_cache_url"),
      audioCacheSize: integer("audio_cache_size").default(0),
      hitCount: integer("hit_count").default(0),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    insertVeAgentInstantFaqSchema = createInsertSchema(veAgentInstantFaqs).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    });
    veMasterAiGlobalSettings = pgTable("ve_master_ai_global_settings", {
      id: serial("id").primaryKey(),
      backchannelDictionaries: jsonb("backchannel_dictionaries").notNull(),
      actionTriggerPhrases: jsonb("action_trigger_phrases").notNull(),
      maxEvalLatencyMs: integer("max_eval_latency_ms").default(35),
      maxCacheRamMb: integer("max_cache_ram_mb").default(512),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    insertVeMasterAiGlobalSettingsSchema = createInsertSchema(veMasterAiGlobalSettings).omit({
      id: true,
      updatedAt: true
    });
  }
});

// server/db.ts
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
var pool, db;
var init_db = __esm({
  "server/db.ts"() {
    "use strict";
    init_schema();
    if (!process.env.DATABASE_URL) {
      throw new Error(
        "DATABASE_URL must be set. Did you forget to provision a database?"
      );
    }
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 20,
      idleTimeoutMillis: 3e4,
      connectionTimeoutMillis: 1e4
    });
    if (process.env.DATABASE_URL) {
      const maskedUrl = process.env.DATABASE_URL.replace(/:[^:]+@/, ":****@");
      console.log(`\u{1F50C} [DB Pool] Initialized connection to: ${maskedUrl}`);
    } else {
      console.error(`\u{1F50C} [DB Pool] DATABASE_URL is not set!`);
    }
    pool.on("error", (err) => {
      console.error("[DB Pool] Idle client error:", err.message);
    });
    db = drizzle(pool, { schema: schema_exports });
  }
});

// server/storage/analytics-helpers.ts
import { eq as eq5, sql as sql11, and, gte, lt, desc, isNull, or, inArray as inArray3 } from "drizzle-orm";
async function calculateGlobalAnalytics(timeRange) {
  const now = /* @__PURE__ */ new Date();
  let startDate;
  let previousStartDate;
  let previousEndDate;
  let groupByWeek = false;
  let isAllTime = false;
  switch (timeRange) {
    case "7d":
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1e3);
      previousEndDate = new Date(startDate.getTime());
      previousStartDate = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1e3);
      break;
    case "30d":
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1e3);
      previousEndDate = new Date(startDate.getTime());
      previousStartDate = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1e3);
      break;
    case "90d":
      startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1e3);
      previousEndDate = new Date(startDate.getTime());
      previousStartDate = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1e3);
      groupByWeek = true;
      break;
    case "all":
      startDate = /* @__PURE__ */ new Date(0);
      previousStartDate = /* @__PURE__ */ new Date(0);
      previousEndDate = /* @__PURE__ */ new Date(0);
      groupByWeek = true;
      isAllTime = true;
      break;
    default:
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1e3);
      previousEndDate = new Date(startDate.getTime());
      previousStartDate = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1e3);
  }
  const allUsers = await db.select().from(users);
  const allPhoneNumbers = await db.select().from(phoneNumbers);
  const allContacts = await db.select().from(contacts);
  const allKnowledgeBases = await db.select().from(knowledgeBase);
  let filteredCalls = [];
  const filteredCampaigns = await db.select().from(campaigns).where(gte(campaigns.createdAt, startDate));
  const filteredUsers = await db.select().from(users).where(gte(users.createdAt, startDate));
  try {
    filteredCalls = await db.select().from(calls).where(gte(calls.createdAt, startDate));
  } catch (callFetchError) {
    if (callFetchError?.code === "42703") {
      console.warn("[GlobalAnalytics] Missing database column (run pre-upgrade-cleanup.sql then drizzle-kit push):", callFetchError.message);
    } else {
      console.error("[GlobalAnalytics] Error fetching filtered calls:", callFetchError.message);
    }
  }
  let previousUsers = [];
  let previousCalls = [];
  let previousCampaigns = [];
  if (!isAllTime) {
    previousUsers = await db.select().from(users).where(
      and(gte(users.createdAt, previousStartDate), lt(users.createdAt, previousEndDate))
    );
    try {
      previousCalls = await db.select().from(calls).where(
        and(gte(calls.createdAt, previousStartDate), lt(calls.createdAt, previousEndDate))
      );
    } catch (callFetchError) {
      if (callFetchError?.code === "42703") {
        console.warn("[GlobalAnalytics] Missing database column for previous calls:", callFetchError.message);
      } else {
        console.error("[GlobalAnalytics] Error fetching previous calls:", callFetchError.message);
      }
    }
    previousCampaigns = await db.select().from(campaigns).where(
      and(gte(campaigns.createdAt, previousStartDate), lt(campaigns.createdAt, previousEndDate))
    );
  }
  const calculateGrowthPercent = (current, previous) => {
    if (previous === 0) {
      return current > 0 ? 100 : 0;
    }
    return (current - previous) / previous * 100;
  };
  const userGrowthPercent = isAllTime ? 0 : calculateGrowthPercent(filteredUsers.length, previousUsers.length);
  const callGrowthPercent = isAllTime ? 0 : calculateGrowthPercent(filteredCalls.length, previousCalls.length);
  const campaignGrowthPercent = isAllTime ? 0 : calculateGrowthPercent(filteredCampaigns.length, previousCampaigns.length);
  const totalCalls = filteredCalls.length;
  const completedCalls = filteredCalls.filter((c) => c.status === "completed").length;
  const successRate = totalCalls > 0 ? completedCalls / totalCalls * 100 : 0;
  const qualifiedLeads = filteredCalls.filter((c) => c.classification === "hot" || c.classification === "warm").length;
  const growthData = calculateGrowthData(
    filteredUsers,
    filteredCalls,
    filteredCampaigns,
    startDate,
    now,
    groupByWeek,
    isAllTime
  );
  const activeSubscriptions = await db.select({
    userId: userSubscriptions.userId,
    planName: plans.name,
    status: userSubscriptions.status,
    currentPeriodEnd: userSubscriptions.currentPeriodEnd
  }).from(userSubscriptions).innerJoin(plans, eq5(userSubscriptions.planId, plans.id)).where(
    and(
      eq5(userSubscriptions.status, "active"),
      or(
        isNull(userSubscriptions.currentPeriodEnd),
        gte(userSubscriptions.currentPeriodEnd, now)
      )
    )
  );
  const proUserIds = /* @__PURE__ */ new Set();
  for (const sub of activeSubscriptions) {
    if (sub.planName !== "free") {
      proUserIds.add(sub.userId);
    }
  }
  const proPlanUsers = proUserIds.size;
  const freePlanUsers = allUsers.length - proPlanUsers;
  return {
    totalUsers: filteredUsers.length,
    totalCampaigns: filteredCampaigns.length,
    totalCalls,
    successRate,
    qualifiedLeads,
    activeUsers: filteredUsers.filter((u) => u.isActive).length,
    proPlanUsers,
    freePlanUsers,
    totalPhoneNumbers: allPhoneNumbers.length,
    totalContacts: allContacts.length,
    totalKnowledgeBases: allKnowledgeBases.length,
    growthData,
    userGrowthPercent: Math.round(userGrowthPercent * 10) / 10,
    callGrowthPercent: Math.round(callGrowthPercent * 10) / 10,
    campaignGrowthPercent: Math.round(campaignGrowthPercent * 10) / 10
  };
}
function calculateGrowthData(filteredUsers, filteredCalls, filteredCampaigns, startDate, now, groupByWeek, isAllTime) {
  const growthMap = /* @__PURE__ */ new Map();
  const getIsoDateKey = (date2) => {
    const d = new Date(date2);
    d.setHours(0, 0, 0, 0);
    return d.toISOString().split("T")[0];
  };
  const getMonthKey = (date2) => {
    const d = new Date(date2);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  };
  const formatDateLabel = (isoDate, isMonthly = false) => {
    if (isMonthly) {
      const [year, month] = isoDate.split("-");
      const d2 = new Date(parseInt(year), parseInt(month) - 1, 1);
      return d2.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
    }
    const d = /* @__PURE__ */ new Date(isoDate + "T00:00:00");
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };
  let chartStartDate = startDate;
  let useMonthlyBuckets = false;
  if (isAllTime) {
    const allDates = [];
    for (const user of filteredUsers) {
      if (user.createdAt) allDates.push(new Date(user.createdAt));
    }
    for (const call of filteredCalls) {
      if (call.createdAt) allDates.push(new Date(call.createdAt));
    }
    for (const campaign of filteredCampaigns) {
      if (campaign.createdAt) allDates.push(new Date(campaign.createdAt));
    }
    if (allDates.length > 0) {
      chartStartDate = allDates.reduce((min, d) => d < min ? d : min, allDates[0]);
      chartStartDate = new Date(chartStartDate.getFullYear(), chartStartDate.getMonth(), 1);
    } else {
      chartStartDate = new Date(now.getFullYear(), now.getMonth() - 11, 1);
    }
    useMonthlyBuckets = true;
  }
  const startDateIso = useMonthlyBuckets ? getMonthKey(chartStartDate) : getIsoDateKey(chartStartDate);
  const nowDateIso = useMonthlyBuckets ? getMonthKey(now) : getIsoDateKey(now);
  const bucketKeys = [];
  const currentDate = new Date(chartStartDate);
  currentDate.setHours(0, 0, 0, 0);
  if (useMonthlyBuckets) {
    while (getMonthKey(currentDate) <= nowDateIso) {
      bucketKeys.push(getMonthKey(currentDate));
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
  } else {
    const interval = groupByWeek ? 7 : 1;
    while (getIsoDateKey(currentDate) <= nowDateIso) {
      bucketKeys.push(getIsoDateKey(currentDate));
      currentDate.setDate(currentDate.getDate() + interval);
    }
  }
  if (bucketKeys.length === 0) {
    bucketKeys.push(startDateIso);
  }
  for (const key of bucketKeys) {
    growthMap.set(key, { users: 0, calls: 0, campaigns: 0 });
  }
  const getBucketKey = (date2) => {
    if (useMonthlyBuckets) {
      const monthKey = getMonthKey(date2);
      if (monthKey < startDateIso || monthKey > nowDateIso) {
        return null;
      }
      return growthMap.has(monthKey) ? monthKey : null;
    }
    const dateKey = getIsoDateKey(date2);
    if (dateKey < startDateIso || dateKey > nowDateIso) {
      return null;
    }
    if (groupByWeek) {
      for (let i = bucketKeys.length - 1; i >= 0; i--) {
        if (dateKey >= bucketKeys[i]) {
          return bucketKeys[i];
        }
      }
      return bucketKeys[0];
    } else {
      return growthMap.has(dateKey) ? dateKey : null;
    }
  };
  for (const user of filteredUsers) {
    if (user.createdAt) {
      const bucketKey = getBucketKey(new Date(user.createdAt));
      if (bucketKey) {
        const entry = growthMap.get(bucketKey);
        if (entry) entry.users++;
      }
    }
  }
  for (const call of filteredCalls) {
    if (call.createdAt) {
      const bucketKey = getBucketKey(new Date(call.createdAt));
      if (bucketKey) {
        const entry = growthMap.get(bucketKey);
        if (entry) entry.calls++;
      }
    }
  }
  for (const campaign of filteredCampaigns) {
    if (campaign.createdAt) {
      const bucketKey = getBucketKey(new Date(campaign.createdAt));
      if (bucketKey) {
        const entry = growthMap.get(bucketKey);
        if (entry) entry.campaigns++;
      }
    }
  }
  return Array.from(growthMap.entries()).sort((a, b) => a[0].localeCompare(b[0])).map(([isoDate, data]) => ({
    date: formatDateLabel(isoDate, useMonthlyBuckets),
    ...data
  }));
}
async function calculateUserAnalytics(userId, timeRange = "7days", callType = "all") {
  const now = /* @__PURE__ */ new Date();
  let startDate = /* @__PURE__ */ new Date();
  switch (timeRange) {
    case "7days":
      startDate.setDate(now.getDate() - 7);
      break;
    case "30days":
      startDate.setDate(now.getDate() - 30);
      break;
    case "90days":
      startDate.setDate(now.getDate() - 90);
      break;
    case "year":
      startDate.setFullYear(now.getFullYear() - 1);
      break;
    case "all":
      startDate = /* @__PURE__ */ new Date(0);
      break;
    default:
      startDate.setDate(now.getDate() - 7);
  }
  const userCampaigns = await db.select().from(campaigns).where(eq5(campaigns.userId, userId));
  const campaignIds = userCampaigns.map((c) => c.id);
  const userIncomingConnections = await db.select().from(incomingConnections).where(eq5(incomingConnections.userId, userId));
  const incomingConnectionIds = userIncomingConnections.map((c) => c.id);
  let allUserCalls = [];
  try {
    const directOwnershipCalls = await db.select().from(calls).where(and(eq5(calls.userId, userId), gte(calls.createdAt, startDate)));
    allUserCalls.push(...directOwnershipCalls);
    if (campaignIds.length > 0) {
      const campaignCalls = await db.select().from(calls).where(and(inArray3(calls.campaignId, campaignIds), gte(calls.createdAt, startDate)));
      for (const call of campaignCalls) {
        if (!allUserCalls.find((c) => c.id === call.id)) {
          allUserCalls.push(call);
        }
      }
    }
    if (incomingConnectionIds.length > 0) {
      const incomingCalls = await db.select().from(calls).where(and(inArray3(calls.incomingConnectionId, incomingConnectionIds), gte(calls.createdAt, startDate)));
      for (const call of incomingCalls) {
        if (!allUserCalls.find((c) => c.id === call.id)) {
          allUserCalls.push(call);
        }
      }
    }
    const twilioOpenAICallsData = await db.select().from(twilioOpenaiCalls).where(and(eq5(twilioOpenaiCalls.userId, userId), gte(twilioOpenaiCalls.createdAt, startDate)));
    for (const toc of twilioOpenAICallsData) {
      allUserCalls.push({
        id: toc.id,
        userId: toc.userId,
        campaignId: toc.campaignId,
        contactId: toc.contactId,
        phoneNumber: toc.fromNumber,
        status: toc.status,
        callDirection: toc.callDirection,
        duration: toc.duration,
        classification: null,
        sentiment: toc.sentiment,
        createdAt: toc.createdAt,
        metadata: toc.metadata,
        incomingConnectionId: null
      });
    }
    const plivoAnalyticsCallsData = await db.select().from(plivoCalls).where(and(eq5(plivoCalls.userId, userId), gte(plivoCalls.createdAt, startDate)));
    for (const pc of plivoAnalyticsCallsData) {
      allUserCalls.push({
        id: pc.id,
        userId: pc.userId,
        campaignId: pc.campaignId,
        contactId: pc.contactId,
        phoneNumber: pc.fromNumber,
        status: pc.status,
        callDirection: pc.callDirection,
        duration: pc.duration,
        classification: null,
        sentiment: pc.sentiment,
        createdAt: pc.createdAt,
        metadata: pc.metadata,
        incomingConnectionId: null
      });
    }
    const sipCallsData = await db.select().from(sipCalls).where(and(eq5(sipCalls.userId, userId), gte(sipCalls.createdAt, startDate)));
    for (const sc of sipCallsData) {
      allUserCalls.push({
        id: sc.id,
        userId: sc.userId,
        campaignId: sc.campaignId,
        contactId: sc.contactId,
        phoneNumber: sc.direction === "inbound" ? sc.fromNumber : sc.toNumber,
        status: sc.status,
        callDirection: sc.direction === "inbound" ? "incoming" : "outgoing",
        duration: sc.durationSeconds,
        classification: sc.classification || null,
        sentiment: sc.sentiment || null,
        createdAt: sc.createdAt,
        metadata: sc.metadata,
        incomingConnectionId: null
      });
    }
    try {
      const veSessionsResult = await db.execute(sql11`
        SELECT s.*, a.name as agent_name
        FROM ve_sessions s
        LEFT JOIN ve_voice_agents a ON s.agent_id = a.id
        WHERE s.user_id = ${userId} AND s.created_at >= ${startDate}
      `);
      for (const r of veSessionsResult.rows) {
        allUserCalls.push({
          id: r.id,
          userId: r.user_id,
          campaignId: null,
          contactId: null,
          phoneNumber: r.direction === "inbound" ? r.from_number : r.to_number,
          status: r.status,
          callDirection: r.direction === "inbound" ? "incoming" : "outgoing",
          duration: r.duration_seconds,
          classification: r.classification || r.metadata?.classification || null,
          sentiment: r.sentiment || null,
          createdAt: new Date(r.created_at),
          metadata: r.metadata || null,
          incomingConnectionId: null
        });
      }
    } catch (veErr) {
      console.error("[Analytics] Error fetching ve_sessions calls:", veErr.message);
    }
  } catch (callFetchError) {
    if (callFetchError?.code === "42703") {
      console.warn("[Analytics] Missing database column (run pre-upgrade-cleanup.sql then drizzle-kit push):", callFetchError.message);
    } else {
      console.error("[Analytics] Error fetching calls:", callFetchError.message);
    }
  }
  const isBatchCall = (c) => {
    const meta = c.metadata;
    return !!(meta?.batch_call || meta?.batchId || meta?.batch_calling);
  };
  const incomingDirections = ["incoming", "inbound", "bridged", "simulcall"];
  const outgoingDirections = ["outgoing", "outbound"];
  const isIncomingCall = (c) => incomingDirections.includes(c.callDirection || "") || !!c.incomingConnectionId;
  const isOutgoingCall = (c) => {
    if (isBatchCall(c)) return false;
    if (outgoingDirections.includes(c.callDirection || "")) return true;
    if (c.campaignId && !c.incomingConnectionId && !incomingDirections.includes(c.callDirection || "")) return true;
    if (!isIncomingCall(c)) return true;
    return false;
  };
  let filteredCalls = allUserCalls;
  if (callType === "incoming") filteredCalls = allUserCalls.filter(isIncomingCall);
  else if (callType === "outgoing") filteredCalls = allUserCalls.filter(isOutgoingCall);
  else if (callType === "batch") filteredCalls = allUserCalls.filter(isBatchCall);
  const allCalls = filteredCalls;
  const typeBreakdown = {
    incoming: allUserCalls.filter(isIncomingCall).length,
    outgoing: allUserCalls.filter(isOutgoingCall).length,
    batch: allUserCalls.filter(isBatchCall).length,
    total: allUserCalls.length
  };
  const totalCalls = allCalls.length;
  const completedCalls = allCalls.filter((c) => c.status === "completed").length;
  const successRate = totalCalls > 0 ? completedCalls / totalCalls * 100 : 0;
  const qualifiedLeads = allCalls.filter(
    (c) => c.classification === "hot" || c.classification === "warm"
  ).length;
  const totalDuration = allCalls.reduce((sum, call) => sum + (call.duration || 0), 0);
  const avgDuration = totalCalls > 0 ? totalDuration / totalCalls : 0;
  const leadCounts = {
    hot: allCalls.filter((c) => c.classification === "hot" || c.classification === "qualified").length,
    warm: allCalls.filter((c) => c.classification === "warm" || c.classification === "interested").length,
    cold: allCalls.filter((c) => c.classification === "cold" || c.classification === "not_interested").length,
    lost: allCalls.filter((c) => c.classification === "lost" || c.classification === "do_not_call").length
  };
  const leadDistribution = [
    { name: "Hot", value: leadCounts.hot },
    { name: "Warm", value: leadCounts.warm },
    { name: "Cold", value: leadCounts.cold },
    { name: "Lost", value: leadCounts.lost }
  ].filter((item) => item.value > 0);
  const sentimentCounts = {
    positive: allCalls.filter((c) => c.sentiment === "positive").length,
    neutral: allCalls.filter((c) => c.sentiment === "neutral").length,
    negative: allCalls.filter((c) => c.sentiment === "negative").length
  };
  const sentimentDistribution = [
    { name: "Positive", value: sentimentCounts.positive },
    { name: "Neutral", value: sentimentCounts.neutral },
    { name: "Negative", value: sentimentCounts.negative }
  ].filter((item) => item.value > 0);
  const campaignPerformance = userCampaigns.map((campaign) => {
    const campaignCalls = allCalls.filter((c) => c.campaignId === campaign.id);
    const completed = campaignCalls.filter((c) => c.status === "completed").length;
    const total = campaignCalls.length;
    const rate = total > 0 ? completed / total * 100 : 0;
    return {
      name: campaign.name,
      value: parseFloat(rate.toFixed(1)),
      totalCalls: total,
      completedCalls: completed
    };
  });
  const dailyCalls = calculateDailyCalls(allCalls, timeRange);
  return {
    totalCalls,
    successRate: parseFloat(successRate.toFixed(1)),
    qualifiedLeads,
    avgDuration: Math.round(avgDuration),
    leadDistribution,
    sentimentDistribution,
    campaignPerformance,
    dailyCalls,
    typeBreakdown
  };
}
function calculateDailyCalls(allCalls, timeRange) {
  const dailyCalls = [];
  let daysToShow = 7;
  if (timeRange === "30days") daysToShow = 30;
  else if (timeRange === "90days") daysToShow = 90;
  else if (timeRange === "year") daysToShow = 365;
  if (daysToShow <= 14) {
    for (let i = daysToShow - 1; i >= 0; i--) {
      const date2 = /* @__PURE__ */ new Date();
      date2.setDate(date2.getDate() - i);
      date2.setHours(0, 0, 0, 0);
      const nextDay = new Date(date2);
      nextDay.setDate(nextDay.getDate() + 1);
      const dayCount = allCalls.filter((call) => {
        const callDate = new Date(call.createdAt);
        return callDate >= date2 && callDate < nextDay;
      }).length;
      dailyCalls.push({ date: date2.toISOString(), count: dayCount });
    }
  } else if (daysToShow <= 90) {
    const weeksToShow = Math.ceil(daysToShow / 7);
    for (let i = weeksToShow - 1; i >= 0; i--) {
      const weekEnd = /* @__PURE__ */ new Date();
      weekEnd.setDate(weekEnd.getDate() - i * 7);
      weekEnd.setHours(23, 59, 59, 999);
      const weekStart = new Date(weekEnd);
      weekStart.setDate(weekStart.getDate() - 6);
      weekStart.setHours(0, 0, 0, 0);
      const weekCount = allCalls.filter((call) => {
        const callDate = new Date(call.createdAt);
        return callDate >= weekStart && callDate <= weekEnd;
      }).length;
      dailyCalls.push({ date: weekStart.toISOString(), count: weekCount });
    }
  } else {
    for (let i = 11; i >= 0; i--) {
      const monthStart = /* @__PURE__ */ new Date();
      monthStart.setMonth(monthStart.getMonth() - i);
      monthStart.setDate(1);
      monthStart.setHours(0, 0, 0, 0);
      const monthEnd = new Date(monthStart);
      monthEnd.setMonth(monthEnd.getMonth() + 1);
      monthEnd.setDate(0);
      monthEnd.setHours(23, 59, 59, 999);
      const monthCount = allCalls.filter((call) => {
        const callDate = new Date(call.createdAt);
        return callDate >= monthStart && callDate <= monthEnd;
      }).length;
      dailyCalls.push({ date: monthStart.toISOString(), count: monthCount });
    }
  }
  return dailyCalls;
}
async function calculateDashboardData(userId) {
  const now = /* @__PURE__ */ new Date();
  const weekAgo = /* @__PURE__ */ new Date();
  weekAgo.setDate(now.getDate() - 7);
  const userCampaigns = await db.select().from(campaigns).where(eq5(campaigns.userId, userId));
  const campaignIds = userCampaigns.map((c) => c.id);
  const userIncomingConnections = await db.select().from(incomingConnections).where(eq5(incomingConnections.userId, userId));
  const incomingConnectionIds = userIncomingConnections.map((c) => c.id);
  let allUserCalls = [];
  try {
    const directOwnershipCalls = await db.select().from(calls).where(eq5(calls.userId, userId));
    allUserCalls.push(...directOwnershipCalls);
    if (campaignIds.length > 0) {
      const campaignCalls = await db.select().from(calls).where(inArray3(calls.campaignId, campaignIds));
      for (const call of campaignCalls) {
        if (!allUserCalls.find((c) => c.id === call.id)) {
          allUserCalls.push(call);
        }
      }
    }
    if (incomingConnectionIds.length > 0) {
      const incomingCalls = await db.select().from(calls).where(inArray3(calls.incomingConnectionId, incomingConnectionIds));
      for (const call of incomingCalls) {
        if (!allUserCalls.find((c) => c.id === call.id)) {
          allUserCalls.push(call);
        }
      }
    }
    const twilioOpenAICallsData = await db.select().from(twilioOpenaiCalls).where(eq5(twilioOpenaiCalls.userId, userId));
    for (const toc of twilioOpenAICallsData) {
      allUserCalls.push({
        id: toc.id,
        userId: toc.userId,
        campaignId: toc.campaignId,
        contactId: toc.contactId,
        phoneNumber: toc.fromNumber,
        status: toc.status,
        callDirection: toc.callDirection,
        duration: toc.duration,
        classification: toc.classification,
        sentiment: toc.sentiment,
        createdAt: toc.createdAt,
        metadata: toc.metadata,
        incomingConnectionId: null
      });
    }
    const plivoCallsData = await db.select().from(plivoCalls).where(eq5(plivoCalls.userId, userId));
    for (const pc of plivoCallsData) {
      allUserCalls.push({
        id: pc.id,
        userId: pc.userId,
        campaignId: pc.campaignId,
        contactId: pc.contactId,
        phoneNumber: pc.fromNumber,
        status: pc.status,
        callDirection: pc.callDirection,
        duration: pc.duration,
        classification: pc.classification,
        sentiment: pc.sentiment,
        createdAt: pc.createdAt,
        metadata: pc.metadata,
        incomingConnectionId: null
      });
    }
    const sipCallsData = await db.select().from(sipCalls).where(eq5(sipCalls.userId, userId));
    for (const sc of sipCallsData) {
      allUserCalls.push({
        id: sc.id,
        userId: sc.userId,
        campaignId: sc.campaignId,
        contactId: sc.contactId,
        phoneNumber: sc.direction === "inbound" ? sc.fromNumber : sc.toNumber,
        status: sc.status,
        callDirection: sc.direction === "inbound" ? "incoming" : "outgoing",
        duration: sc.durationSeconds,
        classification: null,
        sentiment: null,
        createdAt: sc.createdAt,
        metadata: sc.metadata
      });
    }
    try {
      const veSessionsResult = await db.execute(sql11`
        SELECT s.*, a.name as agent_name
        FROM ve_sessions s
        LEFT JOIN ve_voice_agents a ON s.agent_id = a.id
        WHERE s.user_id = ${userId}
      `);
      for (const r of veSessionsResult.rows) {
        allUserCalls.push({
          id: r.id,
          userId: r.user_id,
          campaignId: null,
          contactId: null,
          phoneNumber: r.direction === "inbound" ? r.from_number : r.to_number,
          status: r.status,
          callDirection: r.direction === "inbound" ? "incoming" : "outgoing",
          duration: r.duration_seconds,
          classification: r.classification || r.metadata?.classification || null,
          sentiment: r.sentiment || null,
          createdAt: new Date(r.created_at),
          metadata: r.metadata || null,
          incomingConnectionId: null
        });
      }
    } catch (veErr) {
      console.error("[Dashboard] Error fetching ve_sessions calls:", veErr.message);
    }
  } catch (callFetchError) {
    if (callFetchError?.code === "42703") {
      console.warn("[Dashboard] Missing database column (run pre-upgrade-cleanup.sql then drizzle-kit push):", callFetchError.message);
    } else {
      console.error("[Dashboard] Error fetching calls:", callFetchError.message);
    }
  }
  const incomingDirections = ["incoming", "inbound", "bridged", "simulcall"];
  const outgoingDirections = ["outgoing", "outbound"];
  const isBatchCall = (c) => {
    const meta = c.metadata;
    return !!(meta?.batch_call || meta?.batchId || meta?.batch_calling);
  };
  const isIncomingCall = (c) => incomingDirections.includes(c.callDirection || "") || !!c.incomingConnectionId;
  const isOutgoingCall = (c) => {
    if (isBatchCall(c)) return false;
    if (outgoingDirections.includes(c.callDirection || "")) return true;
    if (c.campaignId && !c.incomingConnectionId && !incomingDirections.includes(c.callDirection || "")) return true;
    if (!isIncomingCall(c)) return true;
    return false;
  };
  const prevWeekStart = /* @__PURE__ */ new Date();
  prevWeekStart.setDate(now.getDate() - 14);
  const thisWeekCalls = allUserCalls.filter((c) => new Date(c.createdAt) >= weekAgo);
  const prevWeekCalls = allUserCalls.filter((c) => {
    const date2 = new Date(c.createdAt);
    return date2 >= prevWeekStart && date2 < weekAgo;
  });
  const incomingThisWeek = thisWeekCalls.filter(isIncomingCall);
  const outgoingThisWeek = thisWeekCalls.filter(isOutgoingCall);
  const incomingPrevWeek = prevWeekCalls.filter(isIncomingCall);
  const outgoingPrevWeek = prevWeekCalls.filter(isOutgoingCall);
  const calcTrend = (current, previous) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round((current - previous) / previous * 100);
  };
  const calcStats = (callList) => {
    const completed = callList.filter((c) => c.status === "completed");
    const successRate = callList.length > 0 ? Math.round(completed.length / callList.length * 100) : 0;
    const avgDuration = completed.length > 0 ? Math.round(completed.reduce((sum, c) => sum + (c.duration || 0), 0) / completed.length) : 0;
    return { successRate, avgDuration };
  };
  const dailyBreakdown = [];
  for (let i = 6; i >= 0; i--) {
    const day = /* @__PURE__ */ new Date();
    day.setDate(now.getDate() - i);
    day.setHours(0, 0, 0, 0);
    const dayEnd = new Date(day);
    dayEnd.setHours(23, 59, 59, 999);
    const dayCalls = thisWeekCalls.filter((c) => {
      const callDate = new Date(c.createdAt);
      return callDate >= day && callDate <= dayEnd;
    });
    dailyBreakdown.push({
      date: day.toISOString(),
      incoming: dayCalls.filter(isIncomingCall).length,
      outgoing: dayCalls.filter(isOutgoingCall).length
    });
  }
  const leadDistribution = {
    hot: allUserCalls.filter((c) => c.classification?.toLowerCase() === "hot" || c.classification?.toLowerCase() === "qualified").length,
    warm: allUserCalls.filter((c) => c.classification?.toLowerCase() === "warm" || c.classification?.toLowerCase() === "interested").length,
    cold: allUserCalls.filter((c) => c.classification?.toLowerCase() === "cold" || c.classification?.toLowerCase() === "not_interested").length,
    lost: allUserCalls.filter((c) => c.classification?.toLowerCase() === "lost" || c.classification?.toLowerCase() === "do_not_call").length
  };
  let recentCalls = [];
  try {
    recentCalls = await db.select({
      id: calls.id,
      phoneNumber: calls.phoneNumber,
      status: calls.status,
      duration: calls.duration,
      classification: calls.classification,
      callDirection: calls.callDirection,
      createdAt: calls.createdAt,
      campaignId: calls.campaignId,
      incomingConnectionId: calls.incomingConnectionId,
      metadata: calls.metadata
    }).from(calls).where(eq5(calls.userId, userId)).orderBy(desc(calls.createdAt)).limit(10);
  } catch (callFetchError) {
    if (callFetchError?.code === "42703") {
      console.warn("[Dashboard] Missing database column for recent calls:", callFetchError.message);
    } else {
      console.error("[Dashboard] Error fetching recent calls:", callFetchError.message);
    }
  }
  let recentUsers = [];
  const [currentUser] = await db.select().from(users).where(eq5(users.id, userId));
  if (currentUser?.role === "admin" || currentUser?.role === "super_admin") {
    recentUsers = await db.select({
      id: users.id,
      email: users.email,
      createdAt: users.createdAt
    }).from(users).orderBy(desc(users.createdAt)).limit(5);
  }
  const totalCampaigns = userCampaigns.length;
  const activeCampaigns = userCampaigns.filter(
    (c) => c.status === "in_progress" || c.status === "scheduled" || c.status === "pending"
  ).length;
  const completedCampaigns = userCampaigns.filter((c) => c.status === "completed").length;
  let allCampaignCalls = [];
  if (campaignIds.length > 0) {
    try {
      allCampaignCalls = await db.select().from(calls).where(inArray3(calls.campaignId, campaignIds));
    } catch (callFetchError) {
      if (callFetchError?.code === "42703") {
        console.warn("[Dashboard] Missing database column for campaign calls:", callFetchError.message);
      } else {
        console.error("[Dashboard] Error fetching campaign calls:", callFetchError.message);
      }
    }
  }
  const campaignCallsCompleted = allCampaignCalls.filter((c) => c.status === "completed");
  const campaignSuccessRate = allCampaignCalls.length > 0 ? Math.round(campaignCallsCompleted.length / allCampaignCalls.length * 100) : 0;
  const campaignAvgDuration = campaignCallsCompleted.length > 0 ? Math.round(campaignCallsCompleted.reduce((sum, c) => sum + (c.duration || 0), 0) / campaignCallsCompleted.length) : 0;
  const [appointmentsResult] = await db.select({ count: sql11`count(*)` }).from(appointments).where(eq5(appointments.userId, userId));
  const appointmentsCount = Number(appointmentsResult?.count || 0);
  const userForms = await db.select({ id: forms.id }).from(forms).where(eq5(forms.userId, userId));
  const formsCount = userForms.length;
  let formSubmissionsCount = 0;
  if (userForms.length > 0) {
    const formIds = userForms.map((f) => f.id);
    const [submissionsResult] = await db.select({ count: sql11`count(*)` }).from(formSubmissions).where(inArray3(formSubmissions.formId, formIds));
    formSubmissionsCount = Number(submissionsResult?.count || 0);
  }
  const [kbResult] = await db.select({ count: sql11`count(*)` }).from(knowledgeBase).where(eq5(knowledgeBase.userId, userId));
  const knowledgeBaseCount = Number(kbResult?.count || 0);
  const [webhooksResult] = await db.select({ count: sql11`count(*)` }).from(webhookSubscriptions).where(eq5(webhookSubscriptions.userId, userId));
  const webhooksCount = Number(webhooksResult?.count || 0);
  const [userTemplatesResult] = await db.select({ count: sql11`count(*)` }).from(promptTemplates).where(eq5(promptTemplates.userId, userId));
  const userTemplatesCount = Number(userTemplatesResult?.count || 0);
  const [systemTemplatesResult] = await db.select({ count: sql11`count(*)` }).from(promptTemplates).where(eq5(promptTemplates.isSystemTemplate, true));
  const systemTemplatesCount = Number(systemTemplatesResult?.count || 0);
  const templatesCount = userTemplatesCount + systemTemplatesCount;
  const sentimentDistribution = {
    positive: allUserCalls.filter((c) => c.sentiment === "positive").length,
    neutral: allUserCalls.filter((c) => c.sentiment === "neutral").length,
    negative: allUserCalls.filter((c) => c.sentiment === "negative").length
  };
  const incomingAllTime = allUserCalls.filter(isIncomingCall);
  const outgoingAllTime = allUserCalls.filter(isOutgoingCall);
  const incomingAllStats = calcStats(incomingAllTime);
  const outgoingAllStats = calcStats(outgoingAllTime);
  return {
    callTypeStats: {
      incoming: {
        count: incomingAllTime.length,
        trend: calcTrend(incomingThisWeek.length, incomingPrevWeek.length),
        successRate: incomingAllStats.successRate,
        avgDuration: incomingAllStats.avgDuration
      },
      outgoing: {
        count: outgoingAllTime.length,
        trend: calcTrend(outgoingThisWeek.length, outgoingPrevWeek.length),
        successRate: outgoingAllStats.successRate,
        avgDuration: outgoingAllStats.avgDuration
      },
      campaign: {
        count: totalCampaigns,
        active: activeCampaigns,
        completed: completedCampaigns,
        successRate: campaignSuccessRate,
        avgDuration: campaignAvgDuration,
        totalCalls: allCampaignCalls.length
      }
    },
    weeklyCallsChart: dailyBreakdown,
    leadDistribution,
    sentimentDistribution,
    recentCalls: recentCalls.map((c) => ({
      ...c,
      callType: isBatchCall(c) ? "batch" : c.callDirection === "incoming" || c.incomingConnectionId ? "incoming" : "outgoing"
    })),
    recentUsers,
    userName: currentUser?.name || currentUser?.email?.split("@")[0] || "User",
    totalCalls: allUserCalls.length,
    totalThisWeek: thisWeekCalls.length,
    totalPrevWeek: prevWeekCalls.length,
    weeklyTrend: calcTrend(thisWeekCalls.length, prevWeekCalls.length),
    appointmentsBooked: appointmentsCount,
    formsSubmitted: formSubmissionsCount,
    formsCount,
    knowledgeBaseCount,
    webhooksCount,
    templatesCount
  };
}
var init_analytics_helpers = __esm({
  "server/storage/analytics-helpers.ts"() {
    "use strict";
    init_db();
    init_schema();
  }
});

// server/storage.ts
import { nanoid } from "nanoid";
import { eq as eq6, sql as sql12, and as and2, gte as gte2, lte as lte2, desc as desc2, asc, isNull as isNull2, isNotNull as isNotNull2, or as or2, inArray as inArray4, ilike } from "drizzle-orm";
var DbStorage, storage;
var init_storage = __esm({
  "server/storage.ts"() {
    "use strict";
    init_db();
    init_schema();
    init_analytics_helpers();
    DbStorage = class {
      // Users
      async getUser(id) {
        const [user] = await db.select().from(users).where(eq6(users.id, id));
        return user;
      }
      async getUserByEmail(email) {
        const [user] = await db.select().from(users).where(eq6(users.email, email));
        return user;
      }
      async createUser(insertUser) {
        const [user] = await db.insert(users).values(insertUser).returning();
        return user;
      }
      async updateUserCredits(userId, credits) {
        await db.update(users).set({ credits }).where(eq6(users.id, userId));
      }
      // Agents
      async getAgent(id) {
        const [agent] = await db.select().from(agents).where(eq6(agents.id, id));
        if (agent) return agent;
        try {
          const veAgentResult = await db.execute(sql12`
        SELECT * FROM ve_voice_agents WHERE id = ${id} LIMIT 1
      `);
          if (veAgentResult.rows.length > 0) {
            const veAgent = veAgentResult.rows[0];
            return {
              id: veAgent.id,
              userId: veAgent.user_id,
              name: veAgent.name,
              type: "incoming",
              // Default type, can be overridden when executing flows
              telephonyProvider: "custom-voice-engine",
              systemPrompt: veAgent.system_prompt,
              firstMessage: veAgent.first_message,
              language: veAgent.language,
              llmModel: veAgent.llm_model,
              temperature: veAgent.temperature,
              openaiVoice: veAgent.tts_voice,
              maxDurationSeconds: veAgent.max_duration_seconds,
              isActive: veAgent.is_active,
              createdAt: veAgent.created_at,
              updatedAt: veAgent.updated_at,
              elevenLabsCredentialId: null,
              sipTrunkId: null,
              sipPhoneNumberId: null,
              openaiCredentialId: null,
              transferPhoneNumber: null,
              transferEnabled: false,
              detectLanguageEnabled: false,
              endConversationEnabled: false,
              appointmentBookingEnabled: false,
              messagingEmailEnabled: false,
              messagingWhatsappEnabled: false,
              messagingEmailTemplate: null,
              messagingWhatsappTemplate: null,
              messagingWhatsappVariables: null,
              expressiveMode: false,
              knowledgeBaseIds: veAgent.knowledge_base_ids || null,
              elevenLabsVoiceId: null,
              voiceStability: 0.65,
              voiceSimilarityBoost: 0.85,
              voiceSpeed: 0.92,
              turnTimeout: 1.5,
              flowId: null,
              agentLink: null,
              config: {
                ttsProvider: veAgent.tts_provider,
                sttProvider: veAgent.stt_provider,
                interruptible: veAgent.interruptible,
                silenceTimeoutMs: veAgent.silence_timeout_ms,
                endCallOnSilence: veAgent.end_call_on_silence,
                businessRules: veAgent.business_rules,
                enabledTools: veAgent.enabled_tools,
                enableMemory: veAgent.enable_memory,
                memoryRetentionDays: veAgent.memory_retention_days
              }
            };
          }
        } catch (err) {
          console.error("Error fetching agent from ve_voice_agents:", err);
        }
        return void 0;
      }
      async getUserAgents(userId) {
        return db.select().from(agents).where(eq6(agents.userId, userId));
      }
      async createAgent(insertAgent) {
        const [agent] = await db.insert(agents).values(insertAgent).returning();
        return agent;
      }
      async updateAgent(id, agent) {
        await db.update(agents).set(agent).where(eq6(agents.id, id));
      }
      async deleteAgent(id) {
        await db.delete(agents).where(eq6(agents.id, id));
      }
      // Knowledge Base
      async getKnowledgeBaseItem(id) {
        const [item] = await db.select().from(knowledgeBase).where(eq6(knowledgeBase.id, id));
        return item;
      }
      async getUserKnowledgeBase(userId) {
        return db.select().from(knowledgeBase).where(eq6(knowledgeBase.userId, userId));
      }
      async getUserKnowledgeBaseCount(userId) {
        const result = await db.select({ count: sql12`count(*)` }).from(knowledgeBase).where(eq6(knowledgeBase.userId, userId));
        return Number(result[0]?.count || 0);
      }
      async createKnowledgeBaseItem(insertItem) {
        const [item] = await db.insert(knowledgeBase).values(insertItem).returning();
        return item;
      }
      async updateKnowledgeBaseItem(id, item) {
        await db.update(knowledgeBase).set(item).where(eq6(knowledgeBase.id, id));
      }
      async deleteKnowledgeBaseItem(id) {
        await db.delete(knowledgeBase).where(eq6(knowledgeBase.id, id));
      }
      // Campaigns
      async getCampaign(id) {
        const [campaign] = await db.select().from(campaigns).where(and2(
          eq6(campaigns.id, id),
          isNull2(campaigns.deletedAt)
        ));
        return campaign;
      }
      async getCampaignIncludingDeleted(id) {
        const [campaign] = await db.select().from(campaigns).where(eq6(campaigns.id, id));
        return campaign;
      }
      async getUserCampaigns(userId) {
        return db.select().from(campaigns).where(and2(
          eq6(campaigns.userId, userId),
          isNull2(campaigns.deletedAt)
        )).orderBy(desc2(campaigns.createdAt));
      }
      async getUserDeletedCampaigns(userId) {
        return db.select().from(campaigns).where(and2(
          eq6(campaigns.userId, userId),
          isNotNull2(campaigns.deletedAt)
        )).orderBy(desc2(campaigns.createdAt));
      }
      async createCampaign(insertCampaign) {
        const [campaign] = await db.insert(campaigns).values(insertCampaign).returning();
        return campaign;
      }
      async updateCampaign(id, campaign) {
        await db.update(campaigns).set(campaign).where(eq6(campaigns.id, id));
      }
      async deleteCampaign(id) {
        await db.update(campaigns).set({ deletedAt: /* @__PURE__ */ new Date() }).where(eq6(campaigns.id, id));
      }
      async restoreCampaign(id) {
        await db.update(campaigns).set({ deletedAt: null }).where(eq6(campaigns.id, id));
      }
      // Contacts
      async getContact(id) {
        const [contact] = await db.select().from(contacts).where(eq6(contacts.id, id));
        return contact;
      }
      async getCampaignContacts(campaignId) {
        return db.select().from(contacts).where(eq6(contacts.campaignId, campaignId));
      }
      async getUserContacts(userId) {
        const results = await db.select({
          contact: contacts,
          campaign: campaigns
        }).from(contacts).innerJoin(campaigns, eq6(contacts.campaignId, campaigns.id)).where(and2(
          eq6(campaigns.userId, userId),
          isNull2(campaigns.deletedAt)
        ));
        return results.map((r) => ({
          ...r.contact,
          campaign: r.campaign ? { id: r.campaign.id, name: r.campaign.name } : null
        }));
      }
      async getUserContactsDeduplicated(userId) {
        const normalizePhone = (phone) => {
          let cleaned = phone.replace(/[\s\-\(\)\.]/g, "");
          if (cleaned.startsWith("00")) cleaned = "+" + cleaned.slice(2);
          if (!cleaned.startsWith("+") && cleaned.length >= 10) cleaned = "+" + cleaned;
          return cleaned;
        };
        const results = await db.select({
          contact: contacts,
          campaign: campaigns
        }).from(contacts).innerJoin(campaigns, eq6(contacts.campaignId, campaigns.id)).where(and2(
          eq6(campaigns.userId, userId),
          isNull2(campaigns.deletedAt)
        )).orderBy(desc2(contacts.createdAt));
        const phoneGroups = /* @__PURE__ */ new Map();
        for (const result of results) {
          const { contact, campaign } = result;
          const phone = normalizePhone(contact.phone);
          if (!phoneGroups.has(phone)) {
            phoneGroups.set(phone, {
              phone,
              email: contact.email,
              names: /* @__PURE__ */ new Set(),
              namesList: [],
              campaigns: /* @__PURE__ */ new Set(),
              campaignsList: [],
              statuses: /* @__PURE__ */ new Set(),
              latestContactId: contact.id,
              latestStatus: contact.status,
              latestEmail: contact.email,
              latestCreatedAt: contact.createdAt,
              source: "campaign",
              callCount: 0
            });
          }
          const group = phoneGroups.get(phone);
          const nameKey = `${contact.firstName.toLowerCase()}|${(contact.lastName || "").toLowerCase()}`;
          if (!group.names.has(nameKey)) {
            group.names.add(nameKey);
            group.namesList.push({
              firstName: contact.firstName,
              lastName: contact.lastName
            });
          }
          if (!group.campaigns.has(campaign.id) && campaign) {
            group.campaigns.add(campaign.id);
            group.campaignsList.push({
              id: campaign.id,
              name: campaign.name
            });
          }
          group.statuses.add(contact.status);
          if (contact.createdAt > group.latestCreatedAt) {
            group.latestContactId = contact.id;
            group.latestStatus = contact.status;
            group.latestEmail = contact.email;
            group.latestCreatedAt = contact.createdAt;
          }
        }
        const callsWithoutContacts = await db.select({
          phoneNumber: calls.phoneNumber,
          callDirection: calls.callDirection,
          createdAt: calls.createdAt,
          status: calls.status
        }).from(calls).where(and2(
          eq6(calls.userId, userId),
          isNull2(calls.contactId),
          isNotNull2(calls.phoneNumber)
        )).orderBy(desc2(calls.createdAt));
        for (const call of callsWithoutContacts) {
          const rawPhone = call.phoneNumber;
          if (!rawPhone || rawPhone === "Unknown Caller" || rawPhone === "unknown") continue;
          const phone = normalizePhone(rawPhone);
          const callStatus = call.callDirection === "incoming" ? "incoming_call" : "outgoing_call";
          if (!phoneGroups.has(phone)) {
            phoneGroups.set(phone, {
              phone,
              email: null,
              names: /* @__PURE__ */ new Set(),
              namesList: [],
              campaigns: /* @__PURE__ */ new Set(),
              campaignsList: [],
              statuses: /* @__PURE__ */ new Set([callStatus]),
              latestContactId: `call-${phone}`,
              // Virtual ID for call-only contacts
              latestStatus: callStatus,
              latestEmail: null,
              latestCreatedAt: call.createdAt,
              source: "call",
              callCount: 1
            });
          } else {
            const group = phoneGroups.get(phone);
            group.callCount = (group.callCount || 0) + 1;
            group.statuses.add(callStatus);
            if (call.createdAt > group.latestCreatedAt) {
              group.latestStatus = callStatus;
              group.latestCreatedAt = call.createdAt;
            }
          }
        }
        const leadsResults = await db.select({
          phone: leads.phone,
          firstName: leads.firstName,
          lastName: leads.lastName,
          email: leads.email,
          stage: leads.stage,
          sourceType: leads.sourceType,
          createdAt: leads.createdAt,
          id: leads.id
        }).from(leads).where(eq6(leads.userId, userId)).orderBy(desc2(leads.createdAt));
        for (const lead of leadsResults) {
          if (!lead.phone || lead.phone === "Unknown Caller" || lead.phone === "unknown") continue;
          const phone = normalizePhone(lead.phone);
          const leadStatus = `lead_${lead.stage || "new"}`;
          const leadSource = lead.sourceType === "campaign" ? "campaign" : "call";
          if (!phoneGroups.has(phone)) {
            phoneGroups.set(phone, {
              phone,
              email: lead.email,
              names: /* @__PURE__ */ new Set(),
              namesList: [],
              campaigns: /* @__PURE__ */ new Set(),
              campaignsList: [],
              statuses: /* @__PURE__ */ new Set([leadStatus]),
              latestContactId: lead.id,
              latestStatus: leadStatus,
              latestEmail: lead.email,
              latestCreatedAt: lead.createdAt,
              source: leadSource,
              callCount: 0
            });
            if (lead.firstName) {
              const nameKey = `${lead.firstName.toLowerCase()}|${(lead.lastName || "").toLowerCase()}`;
              phoneGroups.get(phone).names.add(nameKey);
              phoneGroups.get(phone).namesList.push({
                firstName: lead.firstName,
                lastName: lead.lastName
              });
            }
          } else {
            const group = phoneGroups.get(phone);
            group.statuses.add(leadStatus);
            if (lead.email) {
              group.latestEmail = lead.email;
            }
            if (lead.firstName) {
              const nameKey = `${lead.firstName.toLowerCase()}|${(lead.lastName || "").toLowerCase()}`;
              if (!group.names.has(nameKey)) {
                group.names.add(nameKey);
                group.namesList.unshift({
                  firstName: lead.firstName,
                  lastName: lead.lastName
                });
              }
            }
            if (lead.createdAt > group.latestCreatedAt) {
              group.latestContactId = lead.id;
              group.latestStatus = leadStatus;
              group.latestCreatedAt = lead.createdAt;
            }
          }
        }
        const twilioOpenaiCallsResults = await db.select({
          fromNumber: twilioOpenaiCalls.fromNumber,
          toNumber: twilioOpenaiCalls.toNumber,
          callDirection: twilioOpenaiCalls.callDirection,
          createdAt: twilioOpenaiCalls.createdAt,
          status: twilioOpenaiCalls.status
        }).from(twilioOpenaiCalls).where(and2(
          eq6(twilioOpenaiCalls.userId, userId),
          isNull2(twilioOpenaiCalls.contactId)
        )).orderBy(desc2(twilioOpenaiCalls.createdAt));
        for (const call of twilioOpenaiCallsResults) {
          const rawTwPhone = call.callDirection === "inbound" ? call.fromNumber : call.toNumber;
          if (!rawTwPhone || rawTwPhone === "Unknown Caller" || rawTwPhone === "unknown") continue;
          const phone = normalizePhone(rawTwPhone);
          const callStatus = call.callDirection === "inbound" ? "incoming_call" : "outgoing_call";
          if (!phoneGroups.has(phone)) {
            phoneGroups.set(phone, {
              phone,
              email: null,
              names: /* @__PURE__ */ new Set(),
              namesList: [],
              campaigns: /* @__PURE__ */ new Set(),
              campaignsList: [],
              statuses: /* @__PURE__ */ new Set([callStatus]),
              latestContactId: `twilio-openai-call-${phone}`,
              latestStatus: callStatus,
              latestEmail: null,
              latestCreatedAt: call.createdAt,
              source: "call",
              callCount: 1
            });
          } else {
            const group = phoneGroups.get(phone);
            group.callCount = (group.callCount || 0) + 1;
            group.statuses.add(callStatus);
            if (call.createdAt > group.latestCreatedAt) {
              group.latestStatus = callStatus;
              group.latestCreatedAt = call.createdAt;
            }
          }
        }
        const plivoCallsResults = await db.select({
          fromNumber: plivoCalls.fromNumber,
          toNumber: plivoCalls.toNumber,
          callDirection: plivoCalls.callDirection,
          createdAt: plivoCalls.createdAt,
          status: plivoCalls.status
        }).from(plivoCalls).where(and2(
          eq6(plivoCalls.userId, userId),
          isNull2(plivoCalls.contactId)
        )).orderBy(desc2(plivoCalls.createdAt));
        for (const call of plivoCallsResults) {
          const rawPlPhone = call.callDirection === "inbound" ? call.fromNumber : call.toNumber;
          if (!rawPlPhone || rawPlPhone === "Unknown Caller" || rawPlPhone === "unknown") continue;
          const phone = normalizePhone(rawPlPhone);
          const callStatus = call.callDirection === "inbound" ? "incoming_call" : "outgoing_call";
          if (!phoneGroups.has(phone)) {
            phoneGroups.set(phone, {
              phone,
              email: null,
              names: /* @__PURE__ */ new Set(),
              namesList: [],
              campaigns: /* @__PURE__ */ new Set(),
              campaignsList: [],
              statuses: /* @__PURE__ */ new Set([callStatus]),
              latestContactId: `plivo-call-${phone}`,
              latestStatus: callStatus,
              latestEmail: null,
              latestCreatedAt: call.createdAt,
              source: "call",
              callCount: 1
            });
          } else {
            const group = phoneGroups.get(phone);
            group.callCount = (group.callCount || 0) + 1;
            group.statuses.add(callStatus);
            if (call.createdAt > group.latestCreatedAt) {
              group.latestStatus = callStatus;
              group.latestCreatedAt = call.createdAt;
            }
          }
        }
        const sipCallsResults = await db.select({
          fromNumber: sipCalls.fromNumber,
          toNumber: sipCalls.toNumber,
          direction: sipCalls.direction,
          createdAt: sipCalls.createdAt,
          status: sipCalls.status
        }).from(sipCalls).where(and2(
          eq6(sipCalls.userId, userId),
          isNull2(sipCalls.contactId)
        )).orderBy(desc2(sipCalls.createdAt));
        for (const call of sipCallsResults) {
          const rawSipPhone = call.direction === "inbound" ? call.fromNumber : call.toNumber;
          if (!rawSipPhone || rawSipPhone === "Unknown Caller" || rawSipPhone === "unknown") continue;
          const phone = normalizePhone(rawSipPhone);
          const callStatus = call.direction === "inbound" ? "incoming_call" : "outgoing_call";
          if (!phoneGroups.has(phone)) {
            phoneGroups.set(phone, {
              phone,
              email: null,
              names: /* @__PURE__ */ new Set(),
              namesList: [],
              campaigns: /* @__PURE__ */ new Set(),
              campaignsList: [],
              statuses: /* @__PURE__ */ new Set([callStatus]),
              latestContactId: `sip-call-${phone}`,
              latestStatus: callStatus,
              latestEmail: null,
              latestCreatedAt: call.createdAt || /* @__PURE__ */ new Date(0),
              source: "call",
              callCount: 1
            });
          } else {
            const group = phoneGroups.get(phone);
            group.callCount = (group.callCount || 0) + 1;
            group.statuses.add(callStatus);
            if (call.createdAt && call.createdAt > group.latestCreatedAt) {
              group.latestStatus = callStatus;
              group.latestCreatedAt = call.createdAt;
            }
          }
        }
        return Array.from(phoneGroups.values()).map((group) => ({
          id: group.latestContactId,
          phone: group.phone,
          email: group.latestEmail,
          names: group.namesList,
          campaigns: group.campaignsList,
          status: group.latestStatus,
          allStatuses: Array.from(group.statuses),
          source: group.source,
          callCount: group.callCount
        }));
      }
      async createContact(insertContact) {
        const [contact] = await db.insert(contacts).values(insertContact).returning();
        return contact;
      }
      async createContacts(insertContacts) {
        return db.insert(contacts).values(insertContacts).returning();
      }
      async deleteContact(id) {
        await db.delete(contacts).where(eq6(contacts.id, id));
      }
      // Calls
      async getCall(id) {
        const [call] = await db.select().from(calls).where(eq6(calls.id, id));
        return call;
      }
      async getCallWithDetails(id) {
        const elevenLabsResults = await db.select({
          call: calls,
          campaign: campaigns,
          contact: contacts,
          incomingConnection: incomingConnections,
          widget: websiteWidgets
        }).from(calls).leftJoin(campaigns, eq6(calls.campaignId, campaigns.id)).leftJoin(contacts, eq6(calls.contactId, contacts.id)).leftJoin(incomingConnections, eq6(calls.incomingConnectionId, incomingConnections.id)).leftJoin(websiteWidgets, eq6(calls.widgetId, websiteWidgets.id)).where(eq6(calls.id, id));
        if (elevenLabsResults.length > 0) {
          const r = elevenLabsResults[0];
          const metadataEngine = r.call.metadata?.engine;
          const engine = metadataEngine || "elevenlabs";
          return {
            ...r.call,
            engine,
            campaign: r.campaign ? { id: r.campaign.id, name: r.campaign.name } : null,
            contact: r.contact ? { id: r.contact.id, firstName: r.contact.firstName, lastName: r.contact.lastName, phone: r.contact.phone } : null,
            incomingConnection: r.incomingConnection ? { id: r.incomingConnection.id, agentId: r.incomingConnection.agentId } : null,
            widget: r.widget ? { id: r.widget.id, name: r.widget.name } : null
          };
        }
        const twilioOpenAIResults = await db.select({
          call: twilioOpenaiCalls,
          campaign: campaigns,
          contact: contacts,
          agent: agents
        }).from(twilioOpenaiCalls).leftJoin(campaigns, eq6(twilioOpenaiCalls.campaignId, campaigns.id)).leftJoin(contacts, eq6(twilioOpenaiCalls.contactId, contacts.id)).leftJoin(agents, eq6(twilioOpenaiCalls.agentId, agents.id)).where(eq6(twilioOpenaiCalls.id, id));
        if (twilioOpenAIResults.length > 0) {
          const r = twilioOpenAIResults[0];
          return {
            id: r.call.id,
            userId: r.call.userId,
            campaignId: r.call.campaignId,
            contactId: r.call.contactId,
            agentId: r.call.agentId,
            phoneNumber: r.call.fromNumber,
            fromNumber: r.call.fromNumber,
            toNumber: r.call.toNumber,
            twilioSid: r.call.twilioCallSid,
            status: r.call.status,
            callDirection: r.call.callDirection === "inbound" ? "incoming" : r.call.callDirection === "outbound" ? "outgoing" : r.call.callDirection,
            duration: r.call.duration,
            recordingUrl: r.call.recordingUrl,
            transcript: r.call.transcript,
            aiSummary: r.call.aiSummary,
            sentiment: r.call.sentiment,
            wasTransferred: r.call.wasTransferred,
            transferredTo: r.call.transferredTo,
            transferredAt: r.call.transferredAt,
            startedAt: r.call.startedAt,
            endedAt: r.call.endedAt,
            createdAt: r.call.createdAt,
            metadata: r.call.metadata,
            engine: "twilio-openai",
            openaiSessionId: r.call.openaiSessionId,
            openaiVoice: r.call.openaiVoice,
            openaiModel: r.call.openaiModel,
            campaign: r.campaign ? { id: r.campaign.id, name: r.campaign.name } : null,
            contact: r.contact ? { id: r.contact.id, firstName: r.contact.firstName, lastName: r.contact.lastName, phone: r.contact.phone } : null,
            incomingConnection: null,
            agent: r.agent ? { id: r.agent.id, name: r.agent.name } : null
          };
        }
        const plivoResults = await db.select({
          call: plivoCalls,
          campaign: campaigns,
          contact: contacts,
          agent: agents
        }).from(plivoCalls).leftJoin(campaigns, eq6(plivoCalls.campaignId, campaigns.id)).leftJoin(contacts, eq6(plivoCalls.contactId, contacts.id)).leftJoin(agents, eq6(plivoCalls.agentId, agents.id)).where(eq6(plivoCalls.id, id));
        if (plivoResults.length > 0) {
          const r = plivoResults[0];
          return {
            id: r.call.id,
            userId: r.call.userId,
            campaignId: r.call.campaignId,
            contactId: r.call.contactId,
            agentId: r.call.agentId,
            phoneNumber: r.call.fromNumber,
            fromNumber: r.call.fromNumber,
            toNumber: r.call.toNumber,
            plivoCallUuid: r.call.plivoCallUuid,
            status: r.call.status,
            callDirection: r.call.callDirection === "inbound" ? "incoming" : r.call.callDirection === "outbound" ? "outgoing" : r.call.callDirection,
            duration: r.call.duration,
            recordingUrl: r.call.recordingUrl,
            transcript: r.call.transcript,
            aiSummary: r.call.aiSummary,
            sentiment: r.call.sentiment,
            leadQualityScore: r.call.leadQualityScore,
            keyPoints: r.call.keyPoints,
            nextActions: r.call.nextActions,
            wasTransferred: r.call.wasTransferred,
            transferredTo: r.call.transferredTo,
            transferredAt: r.call.transferredAt,
            startedAt: r.call.startedAt,
            answeredAt: r.call.answeredAt,
            endedAt: r.call.endedAt,
            createdAt: r.call.createdAt,
            metadata: r.call.metadata,
            engine: "plivo-openai",
            openaiSessionId: r.call.openaiSessionId,
            openaiVoice: r.call.openaiVoice,
            openaiModel: r.call.openaiModel,
            campaign: r.campaign ? { id: r.campaign.id, name: r.campaign.name } : null,
            contact: r.contact ? { id: r.contact.id, firstName: r.contact.firstName, lastName: r.contact.lastName, phone: r.contact.phone } : null,
            incomingConnection: null,
            agent: r.agent ? { id: r.agent.id, name: r.agent.name } : null
          };
        }
        const sipResults = await db.select({
          call: sipCalls,
          agent: agents,
          contact: contacts,
          campaign: campaigns
        }).from(sipCalls).leftJoin(agents, eq6(sipCalls.agentId, agents.id)).leftJoin(contacts, eq6(sipCalls.contactId, contacts.id)).leftJoin(campaigns, eq6(sipCalls.campaignId, campaigns.id)).where(eq6(sipCalls.id, id));
        if (sipResults.length > 0) {
          const r = sipResults[0];
          return {
            id: r.call.id,
            userId: r.call.userId,
            campaignId: r.call.campaignId,
            contactId: r.call.contactId,
            agentId: r.call.agentId,
            phoneNumber: r.call.direction === "inbound" ? r.call.fromNumber : r.call.toNumber,
            fromNumber: r.call.fromNumber,
            toNumber: r.call.toNumber,
            status: r.call.status,
            callDirection: r.call.direction === "inbound" ? "incoming" : "outgoing",
            duration: r.call.durationSeconds,
            recordingUrl: r.call.recordingUrl,
            transcript: r.call.transcript,
            aiSummary: r.call.aiSummary,
            sentiment: r.call.sentiment || r.call.metadata?.sentiment || null,
            classification: r.call.classification || r.call.metadata?.classification || null,
            startedAt: r.call.startedAt,
            answeredAt: r.call.answeredAt,
            endedAt: r.call.endedAt,
            createdAt: r.call.createdAt,
            metadata: r.call.metadata,
            engine: r.call.engine,
            sipTrunkId: r.call.sipTrunkId,
            sipPhoneNumberId: r.call.sipPhoneNumberId,
            elevenLabsConversationId: r.call.elevenlabsConversationId,
            elevenlabsConversationId: r.call.elevenlabsConversationId,
            externalCallId: r.call.externalCallId,
            openaiCallId: r.call.openaiCallId,
            creditsUsed: r.call.creditsUsed,
            sipHeaders: r.call.sipHeaders,
            campaign: r.campaign ? { id: r.campaign.id, name: r.campaign.name } : null,
            contact: r.contact ? { id: r.contact.id, firstName: r.contact.firstName, lastName: r.contact.lastName, phone: r.contact.phone } : null,
            incomingConnection: null,
            agent: r.agent ? { id: r.agent.id, name: r.agent.name } : null
          };
        }
        try {
          const veResults = await db.execute(sql12`
        SELECT s.*, a.name as agent_name, rec.storage_url as recording_url
        FROM ve_sessions s
        LEFT JOIN ve_voice_agents a ON s.agent_id = a.id
        LEFT JOIN ve_call_recordings rec ON s.id = rec.session_id AND rec.status = 'available'
        WHERE s.id = ${id}
        LIMIT 1
      `);
          if (veResults.rows.length > 0) {
            const r = veResults.rows[0];
            return {
              id: r.id,
              userId: r.user_id,
              campaignId: null,
              contactId: null,
              agentId: r.agent_id,
              phoneNumber: r.direction === "inbound" ? r.from_number : r.to_number,
              fromNumber: r.from_number,
              toNumber: r.to_number,
              status: r.status,
              callDirection: r.direction === "inbound" ? "incoming" : "outgoing",
              duration: r.duration_seconds,
              recordingUrl: r.recording_url || null,
              transcript: typeof r.transcript === "string" ? r.transcript : JSON.stringify(r.transcript || []),
              aiSummary: r.ai_summary,
              sentiment: r.sentiment,
              classification: r.classification || r.metadata?.classification || null,
              startedAt: r.started_at,
              endedAt: r.ended_at,
              createdAt: r.created_at,
              metadata: r.metadata,
              engine: "custom-voice-engine",
              campaign: null,
              contact: null,
              incomingConnection: null,
              agent: r.agent_id ? { id: r.agent_id, name: r.agent_name || "Custom Voice Agent" } : null
            };
          }
        } catch (err) {
          console.error("Error fetching from ve_sessions:", err);
        }
        return void 0;
      }
      async getCampaignCalls(campaignId) {
        const [elevenLabsCalls, plivoCallsList, twilioOpenaiCallsList, sipCallsList] = await Promise.all([
          db.select().from(calls).where(eq6(calls.campaignId, campaignId)),
          db.select().from(plivoCalls).where(eq6(plivoCalls.campaignId, campaignId)),
          db.select().from(twilioOpenaiCalls).where(eq6(twilioOpenaiCalls.campaignId, campaignId)),
          db.select().from(sipCalls).where(eq6(sipCalls.campaignId, campaignId))
        ]);
        const unified = [];
        for (const c of elevenLabsCalls) {
          unified.push({
            ...c,
            engine: "elevenlabs"
          });
        }
        for (const c of plivoCallsList) {
          unified.push({
            id: c.id,
            contactId: c.contactId,
            userId: c.userId,
            campaignId: c.campaignId,
            status: c.status,
            duration: c.duration,
            startedAt: c.startedAt,
            endedAt: c.endedAt,
            classification: c.classification,
            sentiment: c.sentiment,
            transcript: c.transcript,
            aiSummary: c.aiSummary,
            recordingUrl: c.recordingUrl,
            phoneNumber: c.toNumber,
            callDirection: c.callDirection,
            engine: "plivo"
          });
        }
        for (const c of twilioOpenaiCallsList) {
          unified.push({
            id: c.id,
            contactId: c.contactId,
            userId: c.userId,
            campaignId: c.campaignId,
            status: c.status,
            duration: c.duration,
            startedAt: c.startedAt,
            endedAt: c.endedAt,
            classification: c.classification,
            sentiment: c.sentiment,
            transcript: c.transcript,
            aiSummary: c.aiSummary,
            recordingUrl: c.recordingUrl,
            phoneNumber: c.toNumber,
            callDirection: c.callDirection,
            engine: "twilio-openai"
          });
        }
        for (const c of sipCallsList) {
          unified.push({
            id: c.id,
            contactId: c.contactId,
            userId: c.userId,
            campaignId: c.campaignId,
            status: c.status,
            duration: c.durationSeconds,
            startedAt: c.startedAt,
            endedAt: c.endedAt,
            classification: c.classification,
            sentiment: c.sentiment,
            transcript: typeof c.transcript === "string" ? c.transcript : JSON.stringify(c.transcript),
            aiSummary: c.aiSummary,
            recordingUrl: c.recordingUrl,
            phoneNumber: c.direction === "inbound" ? c.fromNumber : c.toNumber,
            callDirection: c.direction === "inbound" ? "incoming" : "outgoing",
            engine: c.engine || "sip"
          });
        }
        return unified.sort((a, b) => {
          const timeA = a.startedAt ? new Date(a.startedAt).getTime() : 0;
          const timeB = b.startedAt ? new Date(b.startedAt).getTime() : 0;
          return timeB - timeA;
        });
      }
      async getUserCalls(userId) {
        const results = await db.select({ calls }).from(calls).leftJoin(campaigns, eq6(calls.campaignId, campaigns.id)).leftJoin(incomingConnections, eq6(calls.incomingConnectionId, incomingConnections.id)).where(
          or2(
            eq6(calls.userId, userId),
            and2(isNotNull2(calls.campaignId), eq6(campaigns.userId, userId)),
            and2(isNotNull2(calls.incomingConnectionId), eq6(incomingConnections.userId, userId))
          )
        );
        return results.map((r) => r.calls);
      }
      async getUserCallsWithDetails(userId) {
        const elevenLabsResults = await db.select({
          call: calls,
          campaign: campaigns,
          contact: contacts,
          incomingConnection: incomingConnections,
          widget: websiteWidgets
        }).from(calls).leftJoin(campaigns, eq6(calls.campaignId, campaigns.id)).leftJoin(contacts, eq6(calls.contactId, contacts.id)).leftJoin(incomingConnections, eq6(calls.incomingConnectionId, incomingConnections.id)).leftJoin(websiteWidgets, eq6(calls.widgetId, websiteWidgets.id)).where(
          or2(
            // Primary filter: Direct user ownership (guaranteed isolation)
            eq6(calls.userId, userId),
            // Fallback for legacy calls: Check via campaign ownership
            and2(isNotNull2(calls.campaignId), eq6(campaigns.userId, userId)),
            // Fallback for legacy calls: Check via incoming connection ownership
            and2(isNotNull2(calls.incomingConnectionId), eq6(incomingConnections.userId, userId))
          )
        ).orderBy(sql12`${calls.createdAt} DESC`);
        const elevenLabsCalls = elevenLabsResults.map((r) => {
          const metadataEngine = r.call.metadata?.engine;
          const engine = metadataEngine || "elevenlabs";
          return {
            ...r.call,
            engine,
            campaign: r.campaign ? { id: r.campaign.id, name: r.campaign.name } : null,
            contact: r.contact ? { id: r.contact.id, firstName: r.contact.firstName, lastName: r.contact.lastName, phone: r.contact.phone } : null,
            incomingConnection: r.incomingConnection ? { id: r.incomingConnection.id, agentId: r.incomingConnection.agentId } : null,
            widget: r.widget ? { id: r.widget.id, name: r.widget.name } : null
          };
        });
        const twilioOpenAIResults = await db.select({
          call: twilioOpenaiCalls,
          campaign: campaigns,
          contact: contacts,
          agent: agents
        }).from(twilioOpenaiCalls).leftJoin(campaigns, eq6(twilioOpenaiCalls.campaignId, campaigns.id)).leftJoin(contacts, eq6(twilioOpenaiCalls.contactId, contacts.id)).leftJoin(agents, eq6(twilioOpenaiCalls.agentId, agents.id)).where(eq6(twilioOpenaiCalls.userId, userId)).orderBy(sql12`${twilioOpenaiCalls.createdAt} DESC`);
        const twilioOpenAICalls = twilioOpenAIResults.map((r) => ({
          id: r.call.id,
          userId: r.call.userId,
          campaignId: r.call.campaignId,
          contactId: r.call.contactId,
          agentId: r.call.agentId,
          phoneNumber: r.call.fromNumber,
          fromNumber: r.call.fromNumber,
          toNumber: r.call.toNumber,
          twilioSid: r.call.twilioCallSid,
          status: r.call.status,
          callDirection: r.call.callDirection === "inbound" ? "incoming" : "outgoing",
          duration: r.call.duration,
          recordingUrl: r.call.recordingUrl,
          transcript: r.call.transcript,
          aiSummary: r.call.aiSummary,
          sentiment: r.call.sentiment,
          wasTransferred: r.call.wasTransferred,
          transferredTo: r.call.transferredTo,
          transferredAt: r.call.transferredAt,
          startedAt: r.call.startedAt,
          endedAt: r.call.endedAt,
          createdAt: r.call.createdAt,
          metadata: r.call.metadata,
          engine: "twilio-openai",
          openaiSessionId: r.call.openaiSessionId,
          openaiVoice: r.call.openaiVoice,
          openaiModel: r.call.openaiModel,
          campaign: r.campaign ? { id: r.campaign.id, name: r.campaign.name } : null,
          contact: r.contact ? { id: r.contact.id, firstName: r.contact.firstName, lastName: r.contact.lastName, phone: r.contact.phone } : null,
          incomingConnection: null,
          agent: r.agent ? { id: r.agent.id, name: r.agent.name } : null
        }));
        const plivoResults = await db.select({
          call: plivoCalls,
          campaign: campaigns,
          contact: contacts,
          agent: agents
        }).from(plivoCalls).leftJoin(campaigns, eq6(plivoCalls.campaignId, campaigns.id)).leftJoin(contacts, eq6(plivoCalls.contactId, contacts.id)).leftJoin(agents, eq6(plivoCalls.agentId, agents.id)).where(eq6(plivoCalls.userId, userId)).orderBy(sql12`${plivoCalls.createdAt} DESC`);
        const plivoOpenAICalls = plivoResults.map((r) => ({
          id: r.call.id,
          userId: r.call.userId,
          campaignId: r.call.campaignId,
          contactId: r.call.contactId,
          agentId: r.call.agentId,
          phoneNumber: r.call.fromNumber,
          fromNumber: r.call.fromNumber,
          toNumber: r.call.toNumber,
          plivoCallUuid: r.call.plivoCallUuid,
          status: r.call.status,
          callDirection: r.call.callDirection === "inbound" ? "incoming" : "outgoing",
          duration: r.call.duration,
          recordingUrl: r.call.recordingUrl,
          transcript: r.call.transcript,
          aiSummary: r.call.aiSummary,
          sentiment: r.call.sentiment,
          leadQualityScore: r.call.leadQualityScore,
          keyPoints: r.call.keyPoints,
          nextActions: r.call.nextActions,
          wasTransferred: r.call.wasTransferred,
          transferredTo: r.call.transferredTo,
          transferredAt: r.call.transferredAt,
          startedAt: r.call.startedAt,
          answeredAt: r.call.answeredAt,
          endedAt: r.call.endedAt,
          createdAt: r.call.createdAt,
          metadata: r.call.metadata,
          engine: "plivo-openai",
          openaiSessionId: r.call.openaiSessionId,
          openaiVoice: r.call.openaiVoice,
          openaiModel: r.call.openaiModel,
          campaign: r.campaign ? { id: r.campaign.id, name: r.campaign.name } : null,
          contact: r.contact ? { id: r.contact.id, firstName: r.contact.firstName, lastName: r.contact.lastName, phone: r.contact.phone } : null,
          incomingConnection: null,
          agent: r.agent ? { id: r.agent.id, name: r.agent.name } : null
        }));
        const sipCallResults = await db.select({
          call: sipCalls,
          agent: agents,
          contact: contacts,
          campaign: campaigns
        }).from(sipCalls).leftJoin(agents, eq6(sipCalls.agentId, agents.id)).leftJoin(contacts, eq6(sipCalls.contactId, contacts.id)).leftJoin(campaigns, eq6(sipCalls.campaignId, campaigns.id)).where(eq6(sipCalls.userId, userId)).orderBy(sql12`${sipCalls.createdAt} DESC`);
        const sipCallsFormatted = sipCallResults.map((r) => ({
          id: r.call.id,
          userId: r.call.userId,
          campaignId: r.call.campaignId,
          contactId: r.call.contactId,
          agentId: r.call.agentId,
          phoneNumber: r.call.direction === "inbound" ? r.call.fromNumber : r.call.toNumber,
          fromNumber: r.call.fromNumber,
          toNumber: r.call.toNumber,
          status: r.call.status,
          callDirection: r.call.direction === "inbound" ? "incoming" : "outgoing",
          duration: r.call.durationSeconds,
          recordingUrl: r.call.recordingUrl,
          transcript: r.call.transcript,
          aiSummary: r.call.aiSummary,
          sentiment: r.call.sentiment || r.call.metadata?.sentiment || null,
          classification: r.call.classification || r.call.metadata?.classification || null,
          startedAt: r.call.startedAt,
          answeredAt: r.call.answeredAt,
          endedAt: r.call.endedAt,
          createdAt: r.call.createdAt,
          metadata: r.call.metadata,
          engine: r.call.engine,
          externalCallId: r.call.externalCallId,
          sipTrunkId: r.call.sipTrunkId,
          sipPhoneNumberId: r.call.sipPhoneNumberId,
          elevenLabsConversationId: r.call.elevenlabsConversationId,
          elevenlabsConversationId: r.call.elevenlabsConversationId,
          creditsUsed: r.call.creditsUsed,
          campaign: r.campaign ? { id: r.campaign.id, name: r.campaign.name } : null,
          contact: r.contact ? { id: r.contact.id, firstName: r.contact.firstName, lastName: r.contact.lastName, phone: r.contact.phone } : null,
          incomingConnection: null,
          agent: r.agent ? { id: r.agent.id, name: r.agent.name } : null
        }));
        const twilioOpenAIByCampaignContact = new Set(
          twilioOpenAICalls.filter((c) => c.campaignId && c.contactId).map((c) => `${c.campaignId}:${c.contactId}`)
        );
        const plivoByCampaignContact = new Set(
          plivoOpenAICalls.filter((c) => c.campaignId && c.contactId).map((c) => `${c.campaignId}:${c.contactId}`)
        );
        const sipByCampaignContact = new Set(
          sipCallsFormatted.filter((c) => c.campaignId && c.contactId).map((c) => `${c.campaignId}:${c.contactId}`)
        );
        const filteredElevenLabsCalls = elevenLabsCalls.filter((c) => {
          if (!c.campaignId || !c.contactId) return true;
          const md = c.metadata || {};
          if (md.batchCall !== true) return true;
          const key = `${c.campaignId}:${c.contactId}`;
          if (md.telephonyProvider === "twilio_openai" && twilioOpenAIByCampaignContact.has(key)) {
            return false;
          }
          if (md.telephonyProvider === "plivo" && plivoByCampaignContact.has(key)) {
            return false;
          }
          if (md.telephonyProvider === "elevenlabs-sip" && sipByCampaignContact.has(key)) {
            return false;
          }
          return true;
        });
        const uniqueSipCallsMap = /* @__PURE__ */ new Map();
        for (const item of sipCallsFormatted) {
          const convId = item.elevenlabsConversationId || item.externalCallId;
          if (!convId) {
            uniqueSipCallsMap.set(item.id, item);
            continue;
          }
          const existing = uniqueSipCallsMap.get(convId);
          if (!existing) {
            uniqueSipCallsMap.set(convId, item);
          } else {
            const currentIsCompleted = item.status === "completed";
            const existingIsCompleted = existing.status === "completed";
            const keepNewer = new Date(item.createdAt || 0) > new Date(existing.createdAt || 0);
            if (currentIsCompleted && !existingIsCompleted) {
              uniqueSipCallsMap.set(convId, item);
            } else if (!currentIsCompleted && existingIsCompleted) {
            } else if (keepNewer) {
              uniqueSipCallsMap.set(convId, item);
            }
          }
        }
        const deduplicatedSipCalls = Array.from(uniqueSipCallsMap.values());
        let veSessionsFormatted = [];
        try {
          const veSessionsResult = await db.execute(sql12`
        SELECT s.*, a.name as agent_name, rec.storage_url as recording_url
        FROM ve_sessions s
        LEFT JOIN ve_voice_agents a ON s.agent_id = a.id
        LEFT JOIN ve_call_recordings rec ON s.id = rec.session_id AND rec.status = 'available'
        WHERE s.user_id = ${userId}
        ORDER BY s.created_at DESC
      `);
          veSessionsFormatted = veSessionsResult.rows.map((r) => ({
            id: r.id,
            userId: r.user_id,
            campaignId: null,
            contactId: null,
            agentId: r.agent_id,
            phoneNumber: r.direction === "inbound" ? r.from_number : r.to_number,
            fromNumber: r.from_number,
            toNumber: r.to_number,
            status: r.status,
            callDirection: r.direction === "inbound" ? "incoming" : "outgoing",
            duration: r.duration_seconds,
            recordingUrl: r.recording_url || null,
            transcript: typeof r.transcript === "string" ? r.transcript : JSON.stringify(r.transcript || []),
            aiSummary: r.ai_summary,
            sentiment: r.sentiment,
            classification: r.metadata?.classification || null,
            startedAt: r.started_at,
            endedAt: r.ended_at,
            createdAt: r.created_at,
            metadata: r.metadata,
            engine: "custom-voice-engine",
            campaign: null,
            contact: null,
            incomingConnection: null,
            agent: r.agent_id ? { id: r.agent_id, name: r.agent_name || "Custom Voice Agent" } : null
          }));
        } catch (err) {
          console.error("Error fetching ve_sessions in getUserCallsWithDetails:", err);
        }
        const allCalls = [
          ...filteredElevenLabsCalls,
          ...twilioOpenAICalls,
          ...plivoOpenAICalls,
          ...deduplicatedSipCalls,
          ...veSessionsFormatted
        ];
        allCalls.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
        return allCalls;
      }
      async getUserCallsPaginated(userId, params) {
        const { page = 1, pageSize = 10, search, status, sentiment, direction, classification, tab = "all" } = params;
        const searchPattern = search ? `%${search}%` : null;
        const callsConditions = [
          or2(
            eq6(calls.userId, userId),
            and2(isNotNull2(calls.campaignId), eq6(campaigns.userId, userId))
          )
        ];
        if (status && status !== "all") {
          callsConditions.push(eq6(calls.status, status));
        }
        if (sentiment && sentiment !== "all") {
          callsConditions.push(eq6(calls.sentiment, sentiment));
        }
        if (direction && direction !== "all") {
          callsConditions.push(eq6(calls.callDirection, direction));
        }
        if (classification && classification !== "all") {
          callsConditions.push(eq6(calls.classification, classification));
        }
        if (searchPattern) {
          callsConditions.push(
            or2(
              ilike(calls.id, searchPattern),
              ilike(calls.phoneNumber, searchPattern),
              ilike(calls.transcript, searchPattern),
              ilike(calls.aiSummary, searchPattern),
              ilike(contacts.firstName, searchPattern),
              ilike(contacts.lastName, searchPattern)
            )
          );
        }
        const callsMeta = await db.select({
          id: calls.id,
          createdAt: calls.createdAt,
          source: sql12`'calls'`,
          status: calls.status,
          direction: calls.callDirection,
          hasTranscript: sql12`${calls.transcript} IS NOT NULL`,
          hasRecording: sql12`(${calls.recordingUrl} IS NOT NULL OR ${calls.elevenLabsConversationId} IS NOT NULL)`,
          campaignId: calls.campaignId,
          contactId: calls.contactId,
          metadata: calls.metadata
        }).from(calls).leftJoin(campaigns, eq6(calls.campaignId, campaigns.id)).leftJoin(contacts, eq6(calls.contactId, contacts.id)).where(and2(...callsConditions));
        let twilioMeta = [];
        const canIncludeTwilio = !classification || classification === "all";
        if (canIncludeTwilio) {
          const twilioConditions = [eq6(twilioOpenaiCalls.userId, userId)];
          if (status && status !== "all") {
            twilioConditions.push(eq6(twilioOpenaiCalls.status, status));
          }
          if (sentiment && sentiment !== "all") {
            twilioConditions.push(eq6(twilioOpenaiCalls.sentiment, sentiment));
          }
          if (direction && direction !== "all") {
            const mappedDir = direction === "incoming" ? "inbound" : "outbound";
            twilioConditions.push(eq6(twilioOpenaiCalls.callDirection, mappedDir));
          }
          if (searchPattern) {
            twilioConditions.push(
              or2(
                ilike(twilioOpenaiCalls.id, searchPattern),
                ilike(twilioOpenaiCalls.fromNumber, searchPattern),
                ilike(twilioOpenaiCalls.toNumber, searchPattern),
                ilike(twilioOpenaiCalls.transcript, searchPattern),
                ilike(twilioOpenaiCalls.aiSummary, searchPattern),
                ilike(contacts.firstName, searchPattern),
                ilike(contacts.lastName, searchPattern)
              )
            );
          }
          twilioMeta = await db.select({
            id: twilioOpenaiCalls.id,
            createdAt: twilioOpenaiCalls.createdAt,
            source: sql12`'twilioOpenaiCalls'`,
            status: twilioOpenaiCalls.status,
            direction: sql12`CASE WHEN ${twilioOpenaiCalls.callDirection} = 'inbound' THEN 'incoming' ELSE 'outgoing' END`,
            hasTranscript: sql12`${twilioOpenaiCalls.transcript} IS NOT NULL`,
            hasRecording: sql12`${twilioOpenaiCalls.recordingUrl} IS NOT NULL`,
            campaignId: twilioOpenaiCalls.campaignId,
            contactId: twilioOpenaiCalls.contactId
          }).from(twilioOpenaiCalls).leftJoin(contacts, eq6(twilioOpenaiCalls.contactId, contacts.id)).where(and2(...twilioConditions));
        }
        let plivoMeta = [];
        const canIncludePlivo = !classification || classification === "all";
        if (canIncludePlivo) {
          const plivoConditions = [eq6(plivoCalls.userId, userId)];
          if (status && status !== "all") {
            plivoConditions.push(eq6(plivoCalls.status, status));
          }
          if (sentiment && sentiment !== "all") {
            plivoConditions.push(eq6(plivoCalls.sentiment, sentiment));
          }
          if (direction && direction !== "all") {
            const mappedDir = direction === "incoming" ? "inbound" : "outbound";
            plivoConditions.push(eq6(plivoCalls.callDirection, mappedDir));
          }
          if (searchPattern) {
            plivoConditions.push(
              or2(
                ilike(plivoCalls.id, searchPattern),
                ilike(plivoCalls.fromNumber, searchPattern),
                ilike(plivoCalls.toNumber, searchPattern),
                ilike(plivoCalls.transcript, searchPattern),
                ilike(plivoCalls.aiSummary, searchPattern),
                ilike(contacts.firstName, searchPattern),
                ilike(contacts.lastName, searchPattern)
              )
            );
          }
          plivoMeta = await db.select({
            id: plivoCalls.id,
            createdAt: plivoCalls.createdAt,
            source: sql12`'plivoCalls'`,
            status: plivoCalls.status,
            direction: sql12`CASE WHEN ${plivoCalls.callDirection} = 'inbound' THEN 'incoming' ELSE 'outgoing' END`,
            hasTranscript: sql12`${plivoCalls.transcript} IS NOT NULL`,
            hasRecording: sql12`${plivoCalls.recordingUrl} IS NOT NULL`,
            campaignId: plivoCalls.campaignId,
            contactId: plivoCalls.contactId
          }).from(plivoCalls).leftJoin(contacts, eq6(plivoCalls.contactId, contacts.id)).where(and2(...plivoConditions));
        }
        const sipConditions = [eq6(sipCalls.userId, userId)];
        if (status && status !== "all") {
          sipConditions.push(eq6(sipCalls.status, status));
        }
        if (sentiment && sentiment !== "all") {
          sipConditions.push(eq6(sipCalls.sentiment, sentiment));
        }
        if (direction && direction !== "all") {
          const mappedDir = direction === "incoming" ? "inbound" : "outbound";
          sipConditions.push(eq6(sipCalls.direction, mappedDir));
        }
        if (classification && classification !== "all") {
          sipConditions.push(eq6(sipCalls.classification, classification));
        }
        if (searchPattern) {
          sipConditions.push(
            or2(
              ilike(sipCalls.id, searchPattern),
              ilike(sipCalls.fromNumber, searchPattern),
              ilike(sipCalls.toNumber, searchPattern),
              ilike(sql12`CAST(${sipCalls.transcript} AS TEXT)`, searchPattern),
              ilike(sipCalls.aiSummary, searchPattern),
              ilike(contacts.firstName, searchPattern),
              ilike(contacts.lastName, searchPattern)
            )
          );
        }
        const sipMeta = await db.select({
          id: sipCalls.id,
          createdAt: sipCalls.createdAt,
          source: sql12`'sipCalls'`,
          status: sipCalls.status,
          direction: sql12`CASE WHEN ${sipCalls.direction} = 'inbound' THEN 'incoming' ELSE 'outgoing' END`,
          hasTranscript: sql12`${sipCalls.transcript} IS NOT NULL`,
          hasRecording: sql12`${sipCalls.recordingUrl} IS NOT NULL`,
          campaignId: sipCalls.campaignId,
          contactId: sipCalls.contactId,
          elevenlabsConversationId: sipCalls.elevenlabsConversationId,
          externalCallId: sipCalls.externalCallId
        }).from(sipCalls).leftJoin(contacts, eq6(sipCalls.contactId, contacts.id)).where(and2(...sipConditions));
        const uniqueSipMetaMap = /* @__PURE__ */ new Map();
        for (const item of sipMeta) {
          const convId = item.elevenlabsConversationId || item.externalCallId;
          if (!convId) {
            uniqueSipMetaMap.set(item.id, item);
            continue;
          }
          const existing = uniqueSipMetaMap.get(convId);
          if (!existing) {
            uniqueSipMetaMap.set(convId, item);
          } else {
            const currentIsCompleted = item.status === "completed";
            const existingIsCompleted = existing.status === "completed";
            const keepNewer = new Date(item.createdAt || 0) > new Date(existing.createdAt || 0);
            if (currentIsCompleted && !existingIsCompleted) {
              uniqueSipMetaMap.set(convId, item);
            } else if (!currentIsCompleted && existingIsCompleted) {
            } else if (keepNewer) {
              uniqueSipMetaMap.set(convId, item);
            }
          }
        }
        const deduplicatedSipMeta = Array.from(uniqueSipMetaMap.values());
        let veMeta = [];
        try {
          const veConditions = [sql12`s.user_id = ${userId}`];
          if (status && status !== "all") {
            veConditions.push(sql12`s.status = ${status}`);
          }
          if (sentiment && sentiment !== "all") {
            veConditions.push(sql12`s.sentiment = ${sentiment}`);
          }
          if (direction && direction !== "all") {
            const mappedDir = direction === "incoming" ? "inbound" : "outbound";
            veConditions.push(sql12`s.direction = ${mappedDir}`);
          }
          if (classification && classification !== "all") {
            veConditions.push(sql12`s.classification = ${classification}`);
          }
          if (searchPattern) {
            veConditions.push(
              sql12`(s.id ILIKE ${searchPattern} OR 
               s.from_number ILIKE ${searchPattern} OR 
               s.to_number ILIKE ${searchPattern} OR 
               s.ai_summary ILIKE ${searchPattern} OR 
               CAST(s.transcript AS TEXT) ILIKE ${searchPattern})`
            );
          }
          const veQuery = sql12`
        SELECT s.id, s.created_at, 've_sessions' as source, s.status,
               CASE WHEN s.direction = 'inbound' THEN 'incoming' ELSE 'outgoing' END as direction,
               s.transcript IS NOT NULL as has_transcript,
               EXISTS (
                 SELECT 1 FROM ve_call_recordings rec 
                 WHERE rec.session_id = s.id AND rec.status = 'available'
               ) as has_recording,
               null as campaign_id,
               null as contact_id
        FROM ve_sessions s
        WHERE ${sql12.join(veConditions, sql12` AND `)}
      `;
          const veMetaResult = await db.execute(veQuery);
          veMeta = veMetaResult.rows.map((r) => ({
            id: r.id,
            createdAt: r.created_at,
            source: "ve_sessions",
            status: r.status,
            direction: r.direction,
            hasTranscript: !!r.has_transcript,
            hasRecording: !!r.has_recording,
            campaignId: r.campaign_id,
            contactId: r.contact_id
          }));
        } catch (err) {
          console.error("Error fetching veMeta in getUserCallsPaginated:", err);
        }
        const twilioOpenAIByCampaignContact = new Set(
          twilioMeta.filter((c) => c.campaignId && c.contactId).map((c) => `${c.campaignId}:${c.contactId}`)
        );
        const plivoByCampaignContact = new Set(
          plivoMeta.filter((c) => c.campaignId && c.contactId).map((c) => `${c.campaignId}:${c.contactId}`)
        );
        const sipByCampaignContact = new Set(
          deduplicatedSipMeta.filter((c) => c.campaignId && c.contactId).map((c) => `${c.campaignId}:${c.contactId}`)
        );
        const filteredCallsMeta = callsMeta.filter((c) => {
          if (!c.campaignId || !c.contactId) return true;
          const md = c.metadata || {};
          if (md.batchCall !== true) return true;
          const key = `${c.campaignId}:${c.contactId}`;
          if (md.telephonyProvider === "twilio_openai" && twilioOpenAIByCampaignContact.has(key)) {
            return false;
          }
          if (md.telephonyProvider === "plivo" && plivoByCampaignContact.has(key)) {
            return false;
          }
          if (md.telephonyProvider === "elevenlabs-sip" && sipByCampaignContact.has(key)) {
            return false;
          }
          return true;
        });
        const baseMeta = [...filteredCallsMeta, ...twilioMeta, ...plivoMeta, ...deduplicatedSipMeta, ...veMeta];
        baseMeta.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
        const allCount = baseMeta.length;
        const transcribedCount = baseMeta.filter((m) => m.hasTranscript).length;
        const recordingsCount = baseMeta.filter((m) => m.hasRecording).length;
        const totalCalls = baseMeta.length;
        const completedCalls = baseMeta.filter((m) => m.status === "completed").length;
        const incomingCalls = baseMeta.filter((m) => m.direction === "incoming").length;
        const outgoingCalls = baseMeta.filter((m) => m.direction === "outgoing").length;
        const listToPaginate = tab === "transcribed" ? baseMeta.filter((m) => m.hasTranscript) : tab === "recordings" ? baseMeta.filter((m) => m.hasRecording) : baseMeta;
        const totalItems = listToPaginate.length;
        const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
        const offset = (page - 1) * pageSize;
        const paginatedMeta = listToPaginate.slice(offset, offset + pageSize);
        const idsBySource = paginatedMeta.reduce((acc, curr) => {
          if (!acc[curr.source]) acc[curr.source] = [];
          acc[curr.source].push(curr.id);
          return acc;
        }, {});
        const detailPromises = [];
        if (idsBySource["calls"] && idsBySource["calls"].length > 0) {
          detailPromises.push(
            db.select({
              call: calls,
              campaign: campaigns,
              contact: contacts,
              incomingConnection: incomingConnections,
              widget: websiteWidgets
            }).from(calls).leftJoin(campaigns, eq6(calls.campaignId, campaigns.id)).leftJoin(contacts, eq6(calls.contactId, contacts.id)).leftJoin(incomingConnections, eq6(calls.incomingConnectionId, incomingConnections.id)).leftJoin(websiteWidgets, eq6(calls.widgetId, websiteWidgets.id)).where(inArray4(calls.id, idsBySource["calls"])).then((results) => results.map((r) => {
              const metadataEngine = r.call.metadata?.engine;
              const engine = metadataEngine || "elevenlabs";
              return {
                ...r.call,
                engine,
                campaign: r.campaign ? { id: r.campaign.id, name: r.campaign.name } : null,
                contact: r.contact ? { id: r.contact.id, firstName: r.contact.firstName, lastName: r.contact.lastName, phone: r.contact.phone } : null,
                incomingConnection: r.incomingConnection ? { id: r.incomingConnection.id, agentId: r.incomingConnection.agentId } : null,
                widget: r.widget ? { id: r.widget.id, name: r.widget.name } : null
              };
            }))
          );
        }
        if (idsBySource["twilioOpenaiCalls"] && idsBySource["twilioOpenaiCalls"].length > 0) {
          detailPromises.push(
            db.select({
              call: twilioOpenaiCalls,
              campaign: campaigns,
              contact: contacts,
              agent: agents
            }).from(twilioOpenaiCalls).leftJoin(campaigns, eq6(twilioOpenaiCalls.campaignId, campaigns.id)).leftJoin(contacts, eq6(twilioOpenaiCalls.contactId, contacts.id)).leftJoin(agents, eq6(twilioOpenaiCalls.agentId, agents.id)).where(inArray4(twilioOpenaiCalls.id, idsBySource["twilioOpenaiCalls"])).then((results) => results.map((r) => ({
              id: r.call.id,
              userId: r.call.userId,
              campaignId: r.call.campaignId,
              contactId: r.call.contactId,
              agentId: r.call.agentId,
              phoneNumber: r.call.fromNumber,
              fromNumber: r.call.fromNumber,
              toNumber: r.call.toNumber,
              twilioSid: r.call.twilioCallSid,
              status: r.call.status,
              callDirection: r.call.callDirection === "inbound" ? "incoming" : "outgoing",
              duration: r.call.duration,
              recordingUrl: r.call.recordingUrl,
              transcript: r.call.transcript,
              aiSummary: r.call.aiSummary,
              sentiment: r.call.sentiment,
              wasTransferred: r.call.wasTransferred,
              transferredTo: r.call.transferredTo,
              transferredAt: r.call.transferredAt,
              startedAt: r.call.startedAt,
              endedAt: r.call.endedAt,
              createdAt: r.call.createdAt,
              metadata: r.call.metadata,
              engine: "twilio-openai",
              openaiSessionId: r.call.openaiSessionId,
              openaiVoice: r.call.openaiVoice,
              openaiModel: r.call.openaiModel,
              campaign: r.campaign ? { id: r.campaign.id, name: r.campaign.name } : null,
              contact: r.contact ? { id: r.contact.id, firstName: r.contact.firstName, lastName: r.contact.lastName, phone: r.contact.phone } : null,
              incomingConnection: null,
              agent: r.agent ? { id: r.agent.id, name: r.agent.name } : null
            })))
          );
        }
        if (idsBySource["plivoCalls"] && idsBySource["plivoCalls"].length > 0) {
          detailPromises.push(
            db.select({
              call: plivoCalls,
              campaign: campaigns,
              contact: contacts,
              agent: agents
            }).from(plivoCalls).leftJoin(campaigns, eq6(plivoCalls.campaignId, campaigns.id)).leftJoin(contacts, eq6(plivoCalls.contactId, contacts.id)).leftJoin(agents, eq6(plivoCalls.agentId, agents.id)).where(inArray4(plivoCalls.id, idsBySource["plivoCalls"])).then((results) => results.map((r) => ({
              id: r.call.id,
              userId: r.call.userId,
              campaignId: r.call.campaignId,
              contactId: r.call.contactId,
              agentId: r.call.agentId,
              phoneNumber: r.call.fromNumber,
              fromNumber: r.call.fromNumber,
              toNumber: r.call.toNumber,
              plivoCallUuid: r.call.plivoCallUuid,
              status: r.call.status,
              callDirection: r.call.callDirection === "inbound" ? "incoming" : "outgoing",
              duration: r.call.duration,
              recordingUrl: r.call.recordingUrl,
              transcript: r.call.transcript,
              aiSummary: r.call.aiSummary,
              sentiment: r.call.sentiment,
              leadQualityScore: r.call.leadQualityScore,
              keyPoints: r.call.keyPoints,
              nextActions: r.call.nextActions,
              wasTransferred: r.call.wasTransferred,
              transferredTo: r.call.transferredTo,
              transferredAt: r.call.transferredAt,
              startedAt: r.call.startedAt,
              answeredAt: r.call.answeredAt,
              endedAt: r.call.endedAt,
              createdAt: r.call.createdAt,
              metadata: r.call.metadata,
              engine: "plivo-openai",
              openaiSessionId: r.call.openaiSessionId,
              openaiVoice: r.call.openaiVoice,
              openaiModel: r.call.openaiModel,
              campaign: r.campaign ? { id: r.campaign.id, name: r.campaign.name } : null,
              contact: r.contact ? { id: r.contact.id, firstName: r.contact.firstName, lastName: r.contact.lastName, phone: r.contact.phone } : null,
              incomingConnection: null,
              agent: r.agent ? { id: r.agent.id, name: r.agent.name } : null
            })))
          );
        }
        if (idsBySource["sipCalls"] && idsBySource["sipCalls"].length > 0) {
          detailPromises.push(
            db.select({
              call: sipCalls,
              agent: agents,
              contact: contacts,
              campaign: campaigns
            }).from(sipCalls).leftJoin(agents, eq6(sipCalls.agentId, agents.id)).leftJoin(contacts, eq6(sipCalls.contactId, contacts.id)).leftJoin(campaigns, eq6(sipCalls.campaignId, campaigns.id)).where(inArray4(sipCalls.id, idsBySource["sipCalls"])).then((results) => results.map((r) => ({
              id: r.call.id,
              userId: r.call.userId,
              campaignId: r.call.campaignId,
              contactId: r.call.contactId,
              agentId: r.call.agentId,
              phoneNumber: r.call.direction === "inbound" ? r.call.fromNumber : r.call.toNumber,
              fromNumber: r.call.fromNumber,
              toNumber: r.call.toNumber,
              status: r.call.status,
              callDirection: r.call.direction === "inbound" ? "incoming" : "outgoing",
              duration: r.call.durationSeconds,
              recordingUrl: r.call.recordingUrl,
              transcript: r.call.transcript,
              aiSummary: r.call.aiSummary,
              sentiment: r.call.sentiment || r.call.metadata?.sentiment || null,
              classification: r.call.classification || r.call.metadata?.classification || null,
              startedAt: r.call.startedAt,
              answeredAt: r.call.answeredAt,
              endedAt: r.call.endedAt,
              createdAt: r.call.createdAt,
              metadata: r.call.metadata,
              engine: r.call.engine,
              sipTrunkId: r.call.sipTrunkId,
              sipPhoneNumberId: r.call.sipPhoneNumberId,
              elevenLabsConversationId: r.call.elevenlabsConversationId,
              elevenlabsConversationId: r.call.elevenlabsConversationId,
              creditsUsed: r.call.creditsUsed,
              campaign: r.campaign ? { id: r.campaign.id, name: r.campaign.name } : null,
              contact: r.contact ? { id: r.contact.id, firstName: r.contact.firstName, lastName: r.contact.lastName, phone: r.contact.phone } : null,
              incomingConnection: null,
              agent: r.agent ? { id: r.agent.id, name: r.agent.name } : null
            })))
          );
        }
        if (idsBySource["ve_sessions"] && idsBySource["ve_sessions"].length > 0) {
          detailPromises.push(
            db.execute(sql12`
          SELECT s.*, a.name as agent_name, rec.storage_url as recording_url
          FROM ve_sessions s
          LEFT JOIN ve_voice_agents a ON s.agent_id = a.id
          LEFT JOIN ve_call_recordings rec ON s.id = rec.session_id AND rec.status = 'available'
          WHERE s.id IN (${sql12.join(idsBySource["ve_sessions"], sql12`, `)})
        `).then((result) => result.rows.map((r) => ({
              id: r.id,
              userId: r.user_id,
              campaignId: null,
              contactId: null,
              agentId: r.agent_id,
              phoneNumber: r.direction === "inbound" ? r.from_number : r.to_number,
              fromNumber: r.from_number,
              toNumber: r.to_number,
              status: r.status,
              callDirection: r.direction === "inbound" ? "incoming" : "outgoing",
              duration: r.duration_seconds,
              recordingUrl: r.recording_url || null,
              transcript: typeof r.transcript === "string" ? r.transcript : JSON.stringify(r.transcript || []),
              aiSummary: r.ai_summary,
              sentiment: r.sentiment,
              classification: r.metadata?.classification || null,
              startedAt: r.started_at,
              endedAt: r.ended_at,
              createdAt: r.created_at,
              metadata: r.metadata,
              engine: "custom-voice-engine",
              campaign: null,
              contact: null,
              incomingConnection: null,
              agent: r.agent_id ? { id: r.agent_id, name: r.agent_name || "Custom Voice Agent" } : null
            })))
          );
        }
        const detailArrays = await Promise.all(detailPromises);
        const flatDetails = detailArrays.flat();
        const detailsMap = new Map(flatDetails.map((d) => [d.id, d]));
        const data = paginatedMeta.map((meta) => detailsMap.get(meta.id)).filter(Boolean);
        return {
          data,
          pagination: {
            page,
            pageSize,
            totalItems,
            totalPages
          },
          stats: {
            allCount,
            transcribedCount,
            recordingsCount,
            totalCalls,
            completedCalls,
            incomingCalls,
            outgoingCalls
          }
        };
      }
      async createCall(insertCall) {
        const [call] = await db.insert(calls).values(insertCall).returning();
        return call;
      }
      async updateCall(id, call) {
        await db.update(calls).set(call).where(eq6(calls.id, id));
      }
      // Credit Transactions
      async getCreditTransaction(id) {
        const [transaction] = await db.select().from(creditTransactions).where(eq6(creditTransactions.id, id));
        return transaction;
      }
      async getUserCreditTransactions(userId) {
        return db.select().from(creditTransactions).where(eq6(creditTransactions.userId, userId));
      }
      async createCreditTransaction(insertTransaction) {
        const [transaction] = await db.insert(creditTransactions).values(insertTransaction).returning();
        return transaction;
      }
      // Atomic credit purchase: creates transaction + adds credits in single DB transaction
      async addCreditsAtomic(userId, credits, description, stripePaymentId) {
        await db.transaction(async (tx) => {
          await tx.insert(creditTransactions).values({
            userId,
            type: "credit",
            amount: credits,
            description,
            stripePaymentId
          });
          await tx.execute(sql12`
        UPDATE users 
        SET credits = COALESCE(credits, 0) + ${credits}
        WHERE id = ${userId}
      `);
        });
      }
      // Tools
      async getTool(id) {
        const [tool] = await db.select().from(tools).where(eq6(tools.id, id));
        return tool;
      }
      async getUserTools(userId) {
        return db.select().from(tools).where(eq6(tools.userId, userId));
      }
      async createTool(insertTool) {
        const [tool] = await db.insert(tools).values(insertTool).returning();
        return tool;
      }
      async updateTool(id, tool) {
        await db.update(tools).set(tool).where(eq6(tools.id, id));
      }
      async deleteTool(id) {
        await db.delete(tools).where(eq6(tools.id, id));
      }
      // Phone Number Rentals
      async createPhoneNumberRental(insertRental) {
        const [rental] = await db.insert(phoneNumberRentals).values(insertRental).returning();
        return rental;
      }
      async getPhoneNumberRentals(phoneNumberId) {
        return db.select().from(phoneNumberRentals).where(eq6(phoneNumberRentals.phoneNumberId, phoneNumberId)).orderBy(desc2(phoneNumberRentals.createdAt));
      }
      // Voices
      async getVoice(id) {
        const [voice] = await db.select().from(voices).where(eq6(voices.id, id));
        return voice;
      }
      async getUserVoices(userId) {
        return db.select().from(voices).where(eq6(voices.userId, userId));
      }
      async createVoice(insertVoice) {
        const [voice] = await db.insert(voices).values(insertVoice).returning();
        return voice;
      }
      async deleteVoice(id) {
        await db.delete(voices).where(eq6(voices.id, id));
      }
      // Plans
      async getPlan(id) {
        const [plan] = await db.select().from(plans).where(eq6(plans.id, id));
        return plan;
      }
      async getPlanByName(name) {
        const [plan] = await db.select().from(plans).where(eq6(plans.name, name));
        return plan;
      }
      async getAllPlans() {
        return db.select().from(plans).where(eq6(plans.isActive, true));
      }
      async createPlan(insertPlan) {
        const [plan] = await db.insert(plans).values(insertPlan).returning();
        return plan;
      }
      async updatePlan(id, plan) {
        const result = await db.update(plans).set(plan).where(eq6(plans.id, id)).returning({ id: plans.id });
        if (result.length === 0) {
          throw new Error(`Failed to update plan: Plan with id '${id}' not found`);
        }
      }
      async deletePlan(id) {
        await db.delete(plans).where(eq6(plans.id, id));
      }
      // Global Settings
      async getGlobalSetting(key) {
        const [setting] = await db.select().from(globalSettings).where(eq6(globalSettings.key, key));
        if (setting && setting.value !== null && setting.value !== void 0) {
          let val = setting.value;
          if (typeof val === "string" && val.startsWith('"') && val.endsWith('"')) {
            try {
              val = JSON.parse(val);
            } catch {
            }
          }
          return { ...setting, value: val };
        }
        return setting;
      }
      async updateGlobalSetting(key, value) {
        try {
          const jsonValue = JSON.stringify(value);
          await db.execute(sql12`
        INSERT INTO global_settings (id, key, value, updated_at)
        VALUES (gen_random_uuid(), ${key}, ${jsonValue}::jsonb, NOW())
        ON CONFLICT (key) DO UPDATE SET 
          value = ${jsonValue}::jsonb,
          updated_at = NOW()
      `);
          console.log(`\u2705 [Settings] Saved setting '${key}' successfully`);
        } catch (error) {
          console.error(`\u274C [Settings] Failed to save setting '${key}':`, error.message);
          throw new Error(`Failed to save setting '${key}': ${error.message}`);
        }
      }
      // Credit Packages
      async getCreditPackage(id) {
        const [pack] = await db.select().from(creditPackages).where(eq6(creditPackages.id, id));
        return pack;
      }
      async getAllCreditPackages() {
        return db.select().from(creditPackages).where(eq6(creditPackages.isActive, true));
      }
      async createCreditPackage(insertPack) {
        const [pack] = await db.insert(creditPackages).values(insertPack).returning();
        return pack;
      }
      async updateCreditPackage(id, pack) {
        const result = await db.update(creditPackages).set(pack).where(eq6(creditPackages.id, id)).returning({ id: creditPackages.id });
        if (result.length === 0) {
          throw new Error(`Failed to update credit package: Package with id '${id}' not found`);
        }
      }
      // Admin Functions
      async getAllUsers() {
        return db.select().from(users).orderBy(desc2(users.createdAt));
      }
      async getAllAdminUsers() {
        return db.select().from(users).where(
          sql12`${users.role} = 'admin'`
        ).orderBy(desc2(users.createdAt));
      }
      async updateUser(id, user) {
        const result = await db.update(users).set(user).where(eq6(users.id, id)).returning({ id: users.id });
        if (result.length === 0) {
          throw new Error(`Failed to update user: User with id '${id}' not found`);
        }
      }
      async getSystemPhoneNumbers() {
        const results = await db.select({
          phone: phoneNumbers,
          user: users
        }).from(phoneNumbers).leftJoin(users, eq6(phoneNumbers.userId, users.id));
        return results.map((r) => ({
          ...r.phone,
          userEmail: r.user?.email
        }));
      }
      async getGlobalAnalytics(timeRange) {
        return calculateGlobalAnalytics(timeRange);
      }
      // User Subscriptions
      async getUserSubscription(userId) {
        const result = await db.select({
          subscription: userSubscriptions,
          plan: plans
        }).from(userSubscriptions).leftJoin(plans, eq6(userSubscriptions.planId, plans.id)).where(eq6(userSubscriptions.userId, userId)).orderBy(desc2(userSubscriptions.createdAt)).limit(1);
        if (result.length > 0 && result[0].subscription && result[0].plan) {
          return {
            ...result[0].subscription,
            plan: result[0].plan
          };
        }
        const [freePlan] = await db.select().from(plans).where(eq6(plans.name, "free")).limit(1);
        if (!freePlan) {
          return null;
        }
        return null;
      }
      async getAllUserSubscriptions() {
        return await db.select().from(userSubscriptions);
      }
      async getUserSubscriptionByPaystackCode(subscriptionCode) {
        const [subscription] = await db.select().from(userSubscriptions).where(eq6(userSubscriptions.paystackSubscriptionCode, subscriptionCode)).limit(1);
        return subscription;
      }
      async createUserSubscription(insertSubscription) {
        const [subscription] = await db.insert(userSubscriptions).values(insertSubscription).returning();
        return subscription;
      }
      async updateUserSubscription(id, subscription) {
        await db.update(userSubscriptions).set(subscription).where(eq6(userSubscriptions.id, id));
      }
      async updateUserSubscriptionByUserId(userId, subscription) {
        await db.update(userSubscriptions).set({ ...subscription, updatedAt: /* @__PURE__ */ new Date() }).where(eq6(userSubscriptions.userId, userId));
      }
      // Get effective limits for a user - merges plan defaults with per-user overrides
      async getUserEffectiveLimits(userId) {
        const subscriptionWithPlan = await this.getUserSubscription(userId);
        const defaultLimits = {
          maxAgents: 1,
          maxCampaigns: 1,
          maxContactsPerCampaign: 5,
          maxWebhooks: 3,
          maxKnowledgeBases: 5,
          maxFlows: 3,
          maxPhoneNumbers: 0,
          includedCredits: 0,
          sources: {
            maxAgents: "plan",
            maxCampaigns: "plan",
            maxContactsPerCampaign: "plan",
            maxWebhooks: "plan",
            maxKnowledgeBases: "plan",
            maxFlows: "plan",
            maxPhoneNumbers: "plan",
            includedCredits: "plan"
          },
          planName: "free",
          planDisplayName: "Free"
        };
        if (!subscriptionWithPlan || !subscriptionWithPlan.plan) {
          const [freePlan] = await db.select().from(plans).where(eq6(plans.name, "free")).limit(1);
          if (freePlan) {
            return {
              maxAgents: freePlan.maxAgents,
              maxCampaigns: freePlan.maxCampaigns,
              maxContactsPerCampaign: freePlan.maxContactsPerCampaign,
              maxWebhooks: freePlan.maxWebhooks ?? 3,
              maxKnowledgeBases: freePlan.maxKnowledgeBases ?? 5,
              maxFlows: freePlan.maxFlows ?? 3,
              maxPhoneNumbers: freePlan.maxPhoneNumbers ?? 0,
              includedCredits: freePlan.includedCredits,
              sources: {
                maxAgents: "plan",
                maxCampaigns: "plan",
                maxContactsPerCampaign: "plan",
                maxWebhooks: "plan",
                maxKnowledgeBases: "plan",
                maxFlows: "plan",
                maxPhoneNumbers: "plan",
                includedCredits: "plan"
              },
              planName: freePlan.name,
              planDisplayName: freePlan.displayName
            };
          }
          return defaultLimits;
        }
        const plan = subscriptionWithPlan.plan;
        const sub = subscriptionWithPlan;
        return {
          maxAgents: sub.overrideMaxAgents ?? plan.maxAgents,
          maxCampaigns: sub.overrideMaxCampaigns ?? plan.maxCampaigns,
          maxContactsPerCampaign: sub.overrideMaxContactsPerCampaign ?? plan.maxContactsPerCampaign,
          maxWebhooks: sub.overrideMaxWebhooks ?? plan.maxWebhooks ?? 3,
          maxKnowledgeBases: sub.overrideMaxKnowledgeBases ?? plan.maxKnowledgeBases ?? 5,
          maxFlows: sub.overrideMaxFlows ?? plan.maxFlows ?? 3,
          maxPhoneNumbers: sub.overrideMaxPhoneNumbers ?? plan.maxPhoneNumbers ?? 0,
          includedCredits: sub.overrideIncludedCredits ?? plan.includedCredits,
          sources: {
            maxAgents: sub.overrideMaxAgents !== null ? "override" : "plan",
            maxCampaigns: sub.overrideMaxCampaigns !== null ? "override" : "plan",
            maxContactsPerCampaign: sub.overrideMaxContactsPerCampaign !== null ? "override" : "plan",
            maxWebhooks: sub.overrideMaxWebhooks !== null ? "override" : "plan",
            maxKnowledgeBases: sub.overrideMaxKnowledgeBases !== null ? "override" : "plan",
            maxFlows: sub.overrideMaxFlows !== null ? "override" : "plan",
            maxPhoneNumbers: sub.overrideMaxPhoneNumbers !== null ? "override" : "plan",
            includedCredits: sub.overrideIncludedCredits !== null ? "override" : "plan"
          },
          planName: plan.name,
          planDisplayName: plan.displayName
        };
      }
      // Phone Numbers
      async getPhoneNumber(id) {
        const [phoneNumber] = await db.select().from(phoneNumbers).where(eq6(phoneNumbers.id, id));
        return phoneNumber;
      }
      async getUserPhoneNumbers(userId) {
        return db.select().from(phoneNumbers).where(eq6(phoneNumbers.userId, userId));
      }
      async getAllPhoneNumbers() {
        return db.select().from(phoneNumbers);
      }
      async createPhoneNumber(insertPhoneNumber) {
        const [phoneNumber] = await db.insert(phoneNumbers).values(insertPhoneNumber).returning();
        return phoneNumber;
      }
      async updatePhoneNumber(id, phoneNumber) {
        await db.update(phoneNumbers).set(phoneNumber).where(eq6(phoneNumbers.id, id));
      }
      async deletePhoneNumber(id) {
        await db.delete(phoneNumbers).where(eq6(phoneNumbers.id, id));
      }
      // Usage Records
      async createUsageRecord(insertRecord) {
        const [record] = await db.insert(usageRecords).values(insertRecord).returning();
        return record;
      }
      async getUserUsageRecords(userId) {
        return db.select().from(usageRecords).where(eq6(usageRecords.userId, userId));
      }
      // Analytics methods - delegate to extracted helper functions
      async getUserAnalytics(userId, timeRange = "7days", callType = "all") {
        return calculateUserAnalytics(userId, timeRange, callType);
      }
      async getDashboardData(userId) {
        return calculateDashboardData(userId);
      }
      // Webhooks (Subscriptions)
      async getWebhook(id) {
        const [webhook] = await db.select().from(webhookSubscriptions).where(eq6(webhookSubscriptions.id, id));
        return webhook;
      }
      async getUserWebhooks(userId) {
        return await db.select().from(webhookSubscriptions).where(eq6(webhookSubscriptions.userId, userId)).orderBy(desc2(webhookSubscriptions.createdAt));
      }
      async getUserWebhookCount(userId) {
        const result = await db.select({ count: sql12`count(*)` }).from(webhookSubscriptions).where(eq6(webhookSubscriptions.userId, userId));
        return Number(result[0]?.count || 0);
      }
      async getWebhooksForEvent(userId, event, campaignId) {
        const allUserWebhooks = await db.select().from(webhookSubscriptions).where(and2(
          eq6(webhookSubscriptions.userId, userId),
          eq6(webhookSubscriptions.isActive, true)
        ));
        return allUserWebhooks.filter((webhook) => {
          if (!webhook.events.includes(event)) return false;
          if (campaignId && webhook.campaignIds && webhook.campaignIds.length > 0) {
            return webhook.campaignIds.includes(campaignId);
          }
          return true;
        });
      }
      async createWebhook(webhook) {
        const [newWebhook] = await db.insert(webhookSubscriptions).values({
          ...webhook,
          id: nanoid()
        }).returning();
        return newWebhook;
      }
      async updateWebhook(id, webhook) {
        const updateData = { ...webhook, updatedAt: /* @__PURE__ */ new Date() };
        await db.update(webhookSubscriptions).set(updateData).where(eq6(webhookSubscriptions.id, id));
      }
      async deleteWebhook(id) {
        await db.delete(webhookSubscriptions).where(eq6(webhookSubscriptions.id, id));
      }
      // Webhook Delivery Logs
      async getWebhookLog(id) {
        const [log] = await db.select().from(webhookDeliveryLogs).where(eq6(webhookDeliveryLogs.id, id));
        return log;
      }
      async getWebhookLogs(webhookId, limit = 50) {
        return await db.select().from(webhookDeliveryLogs).where(eq6(webhookDeliveryLogs.webhookId, webhookId)).orderBy(desc2(webhookDeliveryLogs.createdAt)).limit(limit);
      }
      async createWebhookLog(log) {
        const [newLog] = await db.insert(webhookDeliveryLogs).values(log).returning();
        return newLog;
      }
      async updateWebhookLog(id, log) {
        await db.update(webhookDeliveryLogs).set(log).where(eq6(webhookDeliveryLogs.id, id));
      }
      async getFailedWebhookLogs(limit = 100) {
        return await db.select().from(webhookDeliveryLogs).where(and2(
          eq6(webhookDeliveryLogs.success, false),
          isNotNull2(webhookDeliveryLogs.nextRetryAt)
        )).orderBy(asc(webhookDeliveryLogs.nextRetryAt)).limit(limit);
      }
      // Notifications
      async getNotification(id) {
        const [notification] = await db.select().from(notifications).where(eq6(notifications.id, id));
        return notification;
      }
      async getUserNotifications(userId, limit = 50) {
        return await db.select().from(notifications).where(eq6(notifications.userId, userId)).orderBy(desc2(notifications.createdAt)).limit(limit);
      }
      async getUnreadNotificationCount(userId) {
        const result = await db.select({ count: sql12`count(*)` }).from(notifications).where(and2(eq6(notifications.userId, userId), eq6(notifications.isRead, false)));
        return Number(result[0]?.count || 0);
      }
      async createNotification(notification) {
        const [newNotification] = await db.insert(notifications).values(notification).returning();
        return newNotification;
      }
      async markNotificationAsRead(id) {
        await db.update(notifications).set({ isRead: true }).where(eq6(notifications.id, id));
      }
      async markAllNotificationsAsRead(userId) {
        await db.update(notifications).set({ isRead: true }).where(eq6(notifications.userId, userId));
      }
      async getBannerNotifications(userId) {
        return await db.select().from(notifications).where(and2(
          eq6(notifications.userId, userId),
          or2(
            eq6(notifications.displayType, "banner"),
            eq6(notifications.displayType, "both")
          ),
          eq6(notifications.isDismissed, false),
          or2(
            isNull2(notifications.expiresAt),
            gte2(notifications.expiresAt, /* @__PURE__ */ new Date())
          )
        )).orderBy(desc2(notifications.priority), desc2(notifications.createdAt));
      }
      async dismissNotification(id, userId) {
        if (userId) {
          await db.update(notifications).set({ isDismissed: true }).where(and2(eq6(notifications.id, id), eq6(notifications.userId, userId)));
        } else {
          await db.update(notifications).set({ isDismissed: true }).where(eq6(notifications.id, id));
        }
      }
      async deleteNotification(id) {
        await db.delete(notifications).where(eq6(notifications.id, id));
      }
      // Email Templates
      async getEmailTemplates() {
        return await db.select().from(emailTemplates).orderBy(emailTemplates.templateType);
      }
      async getEmailTemplate(templateType) {
        const [template] = await db.select().from(emailTemplates).where(eq6(emailTemplates.templateType, templateType));
        return template;
      }
      async updateEmailTemplate(id, data) {
        await db.update(emailTemplates).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq6(emailTemplates.id, id));
      }
      async createEmailTemplate(data) {
        const [template] = await db.insert(emailTemplates).values(data).returning();
        return template;
      }
      // Prompt Templates
      async getPromptTemplate(id) {
        const [template] = await db.select().from(promptTemplates).where(eq6(promptTemplates.id, id));
        return template;
      }
      async getUserPromptTemplates(userId) {
        return await db.select().from(promptTemplates).where(eq6(promptTemplates.userId, userId)).orderBy(desc2(promptTemplates.createdAt));
      }
      async getSystemPromptTemplates() {
        return await db.select().from(promptTemplates).where(eq6(promptTemplates.isSystemTemplate, true)).orderBy(asc(promptTemplates.category), asc(promptTemplates.name));
      }
      async getPublicPromptTemplates() {
        return await db.select().from(promptTemplates).where(eq6(promptTemplates.isPublic, true)).orderBy(desc2(promptTemplates.usageCount), asc(promptTemplates.name));
      }
      async createPromptTemplate(template) {
        const [newTemplate] = await db.insert(promptTemplates).values(template).returning();
        return newTemplate;
      }
      async updatePromptTemplate(id, template) {
        await db.update(promptTemplates).set({ ...template, updatedAt: /* @__PURE__ */ new Date() }).where(eq6(promptTemplates.id, id));
      }
      async deletePromptTemplate(id) {
        await db.delete(promptTemplates).where(eq6(promptTemplates.id, id));
      }
      async incrementPromptTemplateUsage(id) {
        await db.update(promptTemplates).set({
          usageCount: sql12`${promptTemplates.usageCount} + 1`,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq6(promptTemplates.id, id));
      }
      // Agent Versions
      async getAgentVersion(id) {
        const [version] = await db.select().from(agentVersions).where(eq6(agentVersions.id, id));
        return version;
      }
      async getAgentVersions(agentId) {
        return await db.select().from(agentVersions).where(eq6(agentVersions.agentId, agentId)).orderBy(desc2(agentVersions.versionNumber));
      }
      async getAgentVersionByNumber(agentId, versionNumber) {
        const [version] = await db.select().from(agentVersions).where(and2(
          eq6(agentVersions.agentId, agentId),
          eq6(agentVersions.versionNumber, versionNumber)
        ));
        return version;
      }
      async getLatestAgentVersion(agentId) {
        const [version] = await db.select().from(agentVersions).where(eq6(agentVersions.agentId, agentId)).orderBy(desc2(agentVersions.versionNumber)).limit(1);
        return version;
      }
      async createAgentVersion(version) {
        const [newVersion] = await db.insert(agentVersions).values(version).returning();
        return newVersion;
      }
      // SEO Settings
      async getSeoSettings() {
        const [settings] = await db.select().from(seoSettings).limit(1);
        return settings;
      }
      async updateSeoSettings(settings) {
        const existing = await this.getSeoSettings();
        if (existing) {
          const updateData = { ...settings, updatedAt: /* @__PURE__ */ new Date() };
          const [updated] = await db.update(seoSettings).set(updateData).where(eq6(seoSettings.id, existing.id)).returning();
          return updated;
        } else {
          const [created] = await db.insert(seoSettings).values(settings).returning();
          return created;
        }
      }
      // Analytics Scripts
      async getAnalyticsScript(id) {
        const [script] = await db.select().from(analyticsScripts).where(eq6(analyticsScripts.id, id));
        return script;
      }
      async getAllAnalyticsScripts() {
        return db.select().from(analyticsScripts).orderBy(desc2(analyticsScripts.loadPriority), asc(analyticsScripts.createdAt));
      }
      async getEnabledAnalyticsScripts() {
        return db.select().from(analyticsScripts).where(eq6(analyticsScripts.enabled, true)).orderBy(desc2(analyticsScripts.loadPriority), asc(analyticsScripts.createdAt));
      }
      async createAnalyticsScript(script) {
        const [created] = await db.insert(analyticsScripts).values(script).returning();
        return created;
      }
      async updateAnalyticsScript(id, script) {
        const updateData = { ...script, updatedAt: /* @__PURE__ */ new Date() };
        await db.update(analyticsScripts).set(updateData).where(eq6(analyticsScripts.id, id));
      }
      async deleteAnalyticsScript(id) {
        await db.delete(analyticsScripts).where(eq6(analyticsScripts.id, id));
      }
      // Payment Transactions
      async getPaymentTransaction(id) {
        const [transaction] = await db.select().from(paymentTransactions).where(eq6(paymentTransactions.id, id));
        return transaction;
      }
      async getPaymentTransactionByGatewayId(gateway, gatewayTransactionId) {
        const [transaction] = await db.select().from(paymentTransactions).where(and2(
          eq6(paymentTransactions.gateway, gateway),
          eq6(paymentTransactions.gatewayTransactionId, gatewayTransactionId)
        ));
        return transaction;
      }
      async getUserPaymentTransactions(userId) {
        return db.select().from(paymentTransactions).where(eq6(paymentTransactions.userId, userId)).orderBy(desc2(paymentTransactions.createdAt));
      }
      async getAllPaymentTransactions(filters) {
        const conditions = [];
        if (filters?.gateway) {
          conditions.push(eq6(paymentTransactions.gateway, filters.gateway));
        }
        if (filters?.type) {
          conditions.push(eq6(paymentTransactions.type, filters.type));
        }
        if (filters?.status) {
          conditions.push(eq6(paymentTransactions.status, filters.status));
        }
        if (filters?.startDate) {
          conditions.push(gte2(paymentTransactions.createdAt, filters.startDate));
        }
        if (filters?.endDate) {
          conditions.push(lte2(paymentTransactions.createdAt, filters.endDate));
        }
        if (conditions.length > 0) {
          return db.select().from(paymentTransactions).where(and2(...conditions)).orderBy(desc2(paymentTransactions.createdAt));
        }
        return db.select().from(paymentTransactions).orderBy(desc2(paymentTransactions.createdAt));
      }
      async createPaymentTransaction(transaction) {
        const [created] = await db.insert(paymentTransactions).values(transaction).returning();
        return created;
      }
      async updatePaymentTransaction(id, transaction) {
        await db.update(paymentTransactions).set({ ...transaction, updatedAt: /* @__PURE__ */ new Date() }).where(eq6(paymentTransactions.id, id));
      }
      async getPaymentAnalytics(startDate, endDate) {
        const revenueStatuses = ["completed", "refunded", "partially_refunded"];
        const conditions = [];
        if (startDate) conditions.push(gte2(paymentTransactions.createdAt, startDate));
        if (endDate) conditions.push(lte2(paymentTransactions.createdAt, endDate));
        const transactions = await db.select().from(paymentTransactions).where(
          conditions.length > 0 ? and2(
            inArray4(paymentTransactions.status, revenueStatuses),
            ...conditions
          ) : inArray4(paymentTransactions.status, revenueStatuses)
        );
        const dateConditions = [];
        if (startDate) dateConditions.push(gte2(paymentTransactions.createdAt, startDate));
        if (endDate) dateConditions.push(lte2(paymentTransactions.createdAt, endDate));
        const allTransactions = await db.select().from(paymentTransactions).where(dateConditions.length > 0 ? and2(...dateConditions) : void 0);
        const refundConditions = [];
        if (startDate) refundConditions.push(gte2(refunds.createdAt, startDate));
        if (endDate) refundConditions.push(lte2(refunds.createdAt, endDate));
        const allRefunds = await db.select().from(refunds).where(refundConditions.length > 0 ? and2(...refundConditions) : void 0);
        let totalRevenue = 0;
        const revenueByGateway = {};
        const revenueByType = {};
        const transactionsByStatus = {};
        for (const tx of transactions) {
          const amount = parseFloat(tx.amount || "0");
          totalRevenue += amount;
          revenueByGateway[tx.gateway] = (revenueByGateway[tx.gateway] || 0) + amount;
          revenueByType[tx.type] = (revenueByType[tx.type] || 0) + amount;
        }
        for (const tx of allTransactions) {
          transactionsByStatus[tx.status] = (transactionsByStatus[tx.status] || 0) + 1;
        }
        let totalRefunded = 0;
        for (const refund of allRefunds) {
          totalRefunded += parseFloat(refund.amount || "0");
        }
        return {
          totalRevenue,
          revenueByGateway,
          revenueByType,
          transactionCount: allTransactions.length,
          transactionsByStatus,
          refundCount: allRefunds.length,
          totalRefunded
        };
      }
      // Refunds
      async getRefund(id) {
        const [refund] = await db.select().from(refunds).where(eq6(refunds.id, id));
        return refund;
      }
      async getTransactionRefunds(transactionId) {
        return db.select().from(refunds).where(eq6(refunds.transactionId, transactionId)).orderBy(desc2(refunds.createdAt));
      }
      async getUserRefunds(userId) {
        return db.select().from(refunds).where(eq6(refunds.userId, userId)).orderBy(desc2(refunds.createdAt));
      }
      async getAllRefunds() {
        return db.select().from(refunds).orderBy(desc2(refunds.createdAt));
      }
      async createRefund(refund) {
        const [created] = await db.insert(refunds).values(refund).returning();
        return created;
      }
      async updateRefund(id, refund) {
        await db.update(refunds).set({ ...refund, updatedAt: /* @__PURE__ */ new Date() }).where(eq6(refunds.id, id));
      }
      // Invoices
      async getInvoice(id) {
        const [invoice] = await db.select().from(invoices).where(eq6(invoices.id, id));
        return invoice;
      }
      async getInvoiceByNumber(invoiceNumber) {
        const [invoice] = await db.select().from(invoices).where(eq6(invoices.invoiceNumber, invoiceNumber));
        return invoice;
      }
      async getTransactionInvoice(transactionId) {
        const [invoice] = await db.select().from(invoices).where(eq6(invoices.transactionId, transactionId));
        return invoice;
      }
      async getUserInvoices(userId) {
        return db.select().from(invoices).where(eq6(invoices.userId, userId)).orderBy(desc2(invoices.createdAt));
      }
      async getAllInvoices() {
        return db.select().from(invoices).orderBy(desc2(invoices.createdAt));
      }
      async createInvoice(invoice) {
        const [created] = await db.insert(invoices).values(invoice).returning();
        return created;
      }
      async updateInvoice(id, invoice) {
        await db.update(invoices).set({ ...invoice, updatedAt: /* @__PURE__ */ new Date() }).where(eq6(invoices.id, id));
      }
      async getNextInvoiceNumber() {
        const year = (/* @__PURE__ */ new Date()).getFullYear();
        const [prefixSetting] = await db.select().from(globalSettings).where(eq6(globalSettings.key, "invoice_prefix"));
        let rawPrefix = prefixSetting?.value ? String(prefixSetting.value).replace(/"/g, "") : "INV";
        const prefix = rawPrefix.replace(/[^A-Za-z0-9_]/g, "").substring(0, 10) || "INV";
        const [startSetting] = await db.select().from(globalSettings).where(eq6(globalSettings.key, "invoice_start_number"));
        const startNumber = startSetting?.value ? parseInt(String(startSetting.value).replace(/"/g, ""), 10) || 1 : 1;
        const likePattern = `${prefix}-${year}-%`;
        const result = await db.execute(sql12`
      SELECT MAX(CAST(SPLIT_PART(${invoices.invoiceNumber}, '-', 3) AS INTEGER)) as max_num
      FROM ${invoices}
      WHERE ${invoices.invoiceNumber} LIKE ${likePattern}
    `);
        let nextNum = startNumber;
        const maxNum = result.rows?.[0]?.max_num;
        if (maxNum !== null && maxNum !== void 0 && !isNaN(Number(maxNum))) {
          nextNum = Math.max(Number(maxNum) + 1, startNumber);
        }
        return `${prefix}-${year}-${String(nextNum).padStart(5, "0")}`;
      }
      async getNextRefundNoteNumber() {
        const [prefixSetting] = await db.select().from(globalSettings).where(eq6(globalSettings.key, "refund_note_prefix"));
        let rawPrefix = prefixSetting?.value ? String(prefixSetting.value).replace(/"/g, "") : "RF";
        const prefix = rawPrefix.replace(/[^A-Za-z0-9]/g, "").substring(0, 10) || "RF";
        const result = await db.execute(sql12`
      SELECT MAX(
        CAST(
          REGEXP_REPLACE(refund_note_number, '^[A-Za-z]+', '', 'g') 
          AS INTEGER
        )
      ) as max_num
      FROM refunds
      WHERE refund_note_number ~ ${`^${prefix}[0-9]+$`}
    `);
        let nextNum = 1;
        const maxNum = result.rows?.[0]?.max_num;
        if (maxNum !== null && maxNum !== void 0 && !isNaN(Number(maxNum))) {
          nextNum = Number(maxNum) + 1;
        }
        return `${prefix}${String(nextNum).padStart(2, "0")}`;
      }
      // Payment Webhook Queue
      async getWebhookQueueItem(id) {
        const [item] = await db.select().from(paymentWebhookQueue).where(eq6(paymentWebhookQueue.id, id));
        return item;
      }
      async getPendingWebhooks() {
        return db.select().from(paymentWebhookQueue).where(eq6(paymentWebhookQueue.status, "pending")).orderBy(asc(paymentWebhookQueue.receivedAt));
      }
      async getWebhookByEventId(gateway, eventId) {
        const [item] = await db.select().from(paymentWebhookQueue).where(and2(
          eq6(paymentWebhookQueue.gateway, gateway),
          eq6(paymentWebhookQueue.eventId, eventId)
        ));
        return item;
      }
      async createWebhookQueueItem(item) {
        const [created] = await db.insert(paymentWebhookQueue).values(item).returning();
        return created;
      }
      async updateWebhookQueueItem(id, item) {
        await db.update(paymentWebhookQueue).set(item).where(eq6(paymentWebhookQueue.id, id));
      }
      async getExpiredWebhooks() {
        const now = /* @__PURE__ */ new Date();
        return db.select().from(paymentWebhookQueue).where(and2(
          eq6(paymentWebhookQueue.status, "pending"),
          lte2(paymentWebhookQueue.expiresAt, now)
        ));
      }
      async getRetryableWebhooks() {
        const now = /* @__PURE__ */ new Date();
        return db.select().from(paymentWebhookQueue).where(and2(
          or2(
            eq6(paymentWebhookQueue.status, "pending"),
            eq6(paymentWebhookQueue.status, "failed")
          ),
          sql12`${paymentWebhookQueue.attemptCount} < ${paymentWebhookQueue.maxAttempts}`,
          or2(
            isNull2(paymentWebhookQueue.nextRetryAt),
            lte2(paymentWebhookQueue.nextRetryAt, now)
          ),
          gte2(paymentWebhookQueue.expiresAt, now)
        )).orderBy(asc(paymentWebhookQueue.receivedAt));
      }
      // Email Notification Settings
      async getEmailNotificationSetting(eventType) {
        const [setting] = await db.select().from(emailNotificationSettings).where(eq6(emailNotificationSettings.eventType, eventType));
        return setting;
      }
      async getAllEmailNotificationSettings() {
        return db.select().from(emailNotificationSettings).orderBy(asc(emailNotificationSettings.category), asc(emailNotificationSettings.eventType));
      }
      async getEmailNotificationSettingsByCategory(category) {
        return db.select().from(emailNotificationSettings).where(eq6(emailNotificationSettings.category, category)).orderBy(asc(emailNotificationSettings.eventType));
      }
      async createEmailNotificationSetting(setting) {
        const [created] = await db.insert(emailNotificationSettings).values(setting).returning();
        return created;
      }
      async updateEmailNotificationSetting(eventType, setting) {
        await db.update(emailNotificationSettings).set({ ...setting, updatedAt: /* @__PURE__ */ new Date() }).where(eq6(emailNotificationSettings.eventType, eventType));
      }
      // Admin Call Monitoring
      async getAdminCalls(options) {
        const page = options.page || 1;
        const pageSize = options.pageSize || 20;
        const offset = (page - 1) * pageSize;
        const conditions = [];
        if (options.userId) {
          conditions.push(eq6(calls.userId, options.userId));
        }
        if (options.status) {
          conditions.push(eq6(calls.status, options.status));
        }
        if (options.startDate) {
          conditions.push(gte2(calls.createdAt, options.startDate));
        }
        if (options.endDate) {
          conditions.push(lte2(calls.createdAt, options.endDate));
        }
        if (options.search) {
          conditions.push(
            or2(
              sql12`${calls.phoneNumber} ILIKE ${`%${options.search}%`}`,
              sql12`${calls.transcript} ILIKE ${`%${options.search}%`}`
            )
          );
        }
        const whereClause = conditions.length > 0 ? and2(...conditions) : void 0;
        const violationCountSubquery = db.select({
          callId: contentViolations.callId,
          count: sql12`count(*)`.as("violation_count"),
          summary: sql12`string_agg(${contentViolations.detectedWord}, ', ' ORDER BY ${contentViolations.createdAt} DESC)`.as("violation_summary")
        }).from(contentViolations).groupBy(contentViolations.callId).as("violation_counts");
        let query = db.select({
          call: calls,
          user: {
            id: users.id,
            email: users.email,
            name: users.name
          },
          campaign: {
            id: campaigns.id,
            name: campaigns.name
          },
          violationCount: sql12`COALESCE(${violationCountSubquery.count}, 0)`,
          violationSummary: sql12`${violationCountSubquery.summary}`
        }).from(calls).leftJoin(users, eq6(calls.userId, users.id)).leftJoin(campaigns, eq6(calls.campaignId, campaigns.id)).leftJoin(violationCountSubquery, eq6(calls.id, violationCountSubquery.callId));
        if (whereClause) {
          query = query.where(whereClause);
        }
        if (options.hasViolations === true) {
          query = query.where(sql12`COALESCE(${violationCountSubquery.count}, 0) > 0`);
        } else if (options.hasViolations === false) {
          query = query.where(sql12`COALESCE(${violationCountSubquery.count}, 0) = 0`);
        }
        const results = await query.orderBy(desc2(calls.createdAt)).limit(pageSize).offset(offset);
        const countResult = await db.select({ count: sql12`count(*)` }).from(calls).where(whereClause);
        const totalItems = Number(countResult[0]?.count || 0);
        const totalPages = Math.ceil(totalItems / pageSize);
        return {
          data: results.map((r) => ({
            ...r.call,
            user: r.user,
            campaign: r.campaign,
            violationCount: Number(r.violationCount),
            violationSummary: r.violationSummary || null
          })),
          pagination: { page, pageSize, totalItems, totalPages }
        };
      }
      async getAdminCallById(id) {
        const [result] = await db.select({
          call: calls,
          user: {
            id: users.id,
            email: users.email,
            name: users.name
          },
          campaign: {
            id: campaigns.id,
            name: campaigns.name
          },
          contact: {
            id: contacts.id,
            firstName: contacts.firstName,
            lastName: contacts.lastName,
            phone: contacts.phone,
            email: contacts.email
          }
        }).from(calls).leftJoin(users, eq6(calls.userId, users.id)).leftJoin(campaigns, eq6(calls.campaignId, campaigns.id)).leftJoin(contacts, eq6(calls.contactId, contacts.id)).where(eq6(calls.id, id));
        if (!result) return void 0;
        const violations = await this.getViolationsByCallId(id);
        return {
          ...result.call,
          user: result.user,
          campaign: result.campaign,
          contact: result.contact,
          violations
        };
      }
      async getUserById(id) {
        return this.getUser(id);
      }
      // Content Violations
      async getViolationsByCallId(callId) {
        return db.select().from(contentViolations).where(eq6(contentViolations.callId, callId)).orderBy(desc2(contentViolations.createdAt));
      }
      async getContentViolations(options) {
        const page = options.page || 1;
        const pageSize = options.pageSize || 20;
        const offset = (page - 1) * pageSize;
        const conditions = [];
        if (options.userId) {
          conditions.push(eq6(contentViolations.userId, options.userId));
        }
        if (options.status) {
          conditions.push(eq6(contentViolations.status, options.status));
        }
        if (options.severity) {
          conditions.push(eq6(contentViolations.severity, options.severity));
        }
        if (options.startDate) {
          conditions.push(gte2(contentViolations.createdAt, options.startDate));
        }
        if (options.endDate) {
          conditions.push(lte2(contentViolations.createdAt, options.endDate));
        }
        const whereClause = conditions.length > 0 ? and2(...conditions) : void 0;
        let query = db.select({
          violation: contentViolations,
          user: {
            id: users.id,
            email: users.email,
            name: users.name
          },
          call: {
            id: calls.id,
            phoneNumber: calls.phoneNumber,
            status: calls.status
          }
        }).from(contentViolations).leftJoin(users, eq6(contentViolations.userId, users.id)).leftJoin(calls, eq6(contentViolations.callId, calls.id));
        if (whereClause) {
          query = query.where(whereClause);
        }
        const results = await query.orderBy(desc2(contentViolations.createdAt)).limit(pageSize).offset(offset);
        const countResult = await db.select({ count: sql12`count(*)` }).from(contentViolations).where(whereClause);
        const totalItems = Number(countResult[0]?.count || 0);
        const totalPages = Math.ceil(totalItems / pageSize);
        return {
          data: results.map((r) => ({
            ...r.violation,
            user: r.user,
            call: r.call
          })),
          pagination: { page, pageSize, totalItems, totalPages }
        };
      }
      async updateContentViolation(id, data) {
        const [updated] = await db.update(contentViolations).set(data).where(eq6(contentViolations.id, id)).returning();
        return updated;
      }
      async createContentViolation(data) {
        const [violation] = await db.insert(contentViolations).values(data).returning();
        return violation;
      }
      // Banned Words
      async getBannedWords() {
        return db.select().from(bannedWords).orderBy(asc(bannedWords.word));
      }
      async getActiveBannedWords() {
        return db.select().from(bannedWords).where(eq6(bannedWords.isActive, true)).orderBy(asc(bannedWords.word));
      }
      async createBannedWord(data) {
        const [word] = await db.insert(bannedWords).values(data).returning();
        return word;
      }
      async updateBannedWord(id, data) {
        const [updated] = await db.update(bannedWords).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq6(bannedWords.id, id)).returning();
        return updated;
      }
      async deleteBannedWord(id) {
        const result = await db.delete(bannedWords).where(eq6(bannedWords.id, id)).returning();
        return result.length > 0;
      }
      async getCallsWithTranscripts() {
        return db.select().from(calls).where(and2(
          isNotNull2(calls.transcript),
          sql12`${calls.transcript} != ''`
        ));
      }
      // Demo Sessions - Browser-based demo calls
      async createDemoSession(data) {
        const [session] = await db.insert(demoSessions).values(data).returning();
        return session;
      }
      async getDemoSession(id) {
        const [session] = await db.select().from(demoSessions).where(eq6(demoSessions.id, id));
        return session;
      }
      async getDemoSessionByToken(token) {
        const [session] = await db.select().from(demoSessions).where(eq6(demoSessions.sessionToken, token));
        return session;
      }
      async updateDemoSession(id, data) {
        await db.update(demoSessions).set(data).where(eq6(demoSessions.id, id));
      }
      async getActiveDemoSessionCount() {
        const result = await db.select({ count: sql12`count(*)` }).from(demoSessions).where(eq6(demoSessions.status, "active"));
        return Number(result[0]?.count || 0);
      }
      async getRecentDemoSessionByIp(ip, cooldownMinutes) {
        const cooldownTime = new Date(Date.now() - cooldownMinutes * 60 * 1e3);
        const [session] = await db.select().from(demoSessions).where(and2(
          eq6(demoSessions.visitorIp, ip),
          gte2(demoSessions.createdAt, cooldownTime)
        )).orderBy(desc2(demoSessions.createdAt)).limit(1);
        return session;
      }
      async getDemoSessionStats(days = 30) {
        const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1e3);
        const sessions = await db.select().from(demoSessions).where(gte2(demoSessions.createdAt, startDate));
        const completed = sessions.filter((s) => s.status === "completed");
        const totalDuration = completed.reduce((sum, s) => sum + (s.duration || 0), 0);
        const languageBreakdown = {};
        for (const session of sessions) {
          languageBreakdown[session.language] = (languageBreakdown[session.language] || 0) + 1;
        }
        return {
          totalSessions: sessions.length,
          completedSessions: completed.length,
          averageDuration: completed.length > 0 ? Math.round(totalDuration / completed.length) : 0,
          languageBreakdown
        };
      }
    };
    storage = new DbStorage();
  }
});

// server/storage/crm-storage.ts
import { eq as eq11, and as and5, desc as desc3, asc as asc2, sql as sql16, ilike as ilike2, or as or3, inArray as inArray6, notInArray, gte as gte3, lte as lte3, count, isNotNull as isNotNull3 } from "drizzle-orm";
var DEFAULT_STAGES, CRMStorage;
var init_crm_storage = __esm({
  "server/storage/crm-storage.ts"() {
    "use strict";
    init_db();
    init_schema();
    DEFAULT_STAGES = [
      { name: "New Lead", color: "#9CA3AF", order: 0, stage: "new" },
      { name: "Hot Lead", color: "#EF4444", order: 1, stage: "hot" },
      { name: "Appointment Booked", color: "#22C55E", order: 2, stage: "appointment" },
      { name: "Form Submitted", color: "#3B82F6", order: 3, stage: "form_submitted" },
      { name: "Needs Follow-up", color: "#F59E0B", order: 4, stage: "follow_up" },
      { name: "Not Interested", color: "#6B7280", order: 5, stage: "not_interested" },
      { name: "No Answer", color: "#D1D5DB", order: 6, stage: "no_answer" }
    ];
    CRMStorage = class {
      // ============================================================
      // Lead Stages
      // ============================================================
      static async getStagesByUser(userId) {
        return db.select().from(leadStages).where(eq11(leadStages.userId, userId)).orderBy(asc2(leadStages.order));
      }
      static async ensureDefaultStages(userId) {
        const existing = await this.getStagesByUser(userId);
        if (existing.length > 0) {
          return existing;
        }
        const stagesToInsert = DEFAULT_STAGES.map((s) => ({
          userId,
          name: s.name,
          color: s.color,
          order: s.order,
          isDefault: true,
          isCustom: false
        }));
        const inserted = await db.insert(leadStages).values(stagesToInsert).returning();
        return inserted;
      }
      static async createStage(data) {
        const maxOrder = await db.select({ maxOrder: sql16`COALESCE(MAX("order"), 0)` }).from(leadStages).where(eq11(leadStages.userId, data.userId));
        const [stage] = await db.insert(leadStages).values({
          ...data,
          order: (maxOrder[0]?.maxOrder || 0) + 1,
          isDefault: false,
          isCustom: true
        }).returning();
        return stage;
      }
      static async updateStage(id, userId, data) {
        const [stage] = await db.update(leadStages).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(and5(eq11(leadStages.id, id), eq11(leadStages.userId, userId))).returning();
        return stage || null;
      }
      static async deleteStage(id, userId) {
        const result = await db.delete(leadStages).where(and5(
          eq11(leadStages.id, id),
          eq11(leadStages.userId, userId),
          eq11(leadStages.isCustom, true)
        )).returning();
        return result.length > 0;
      }
      static async reorderStages(userId, stageIds) {
        for (let i = 0; i < stageIds.length; i++) {
          await db.update(leadStages).set({ order: i, updatedAt: /* @__PURE__ */ new Date() }).where(and5(eq11(leadStages.id, stageIds[i]), eq11(leadStages.userId, userId)));
        }
      }
      // ============================================================
      // Leads
      // ============================================================
      static async getLeadById(id, userId) {
        const [lead] = await db.select().from(leads).where(and5(eq11(leads.id, id), eq11(leads.userId, userId)));
        return lead || null;
      }
      static async getLeadsBySource(userId, sourceType, sourceId, filters) {
        const conditions = [
          eq11(leads.userId, userId),
          eq11(leads.sourceType, sourceType)
        ];
        if (sourceType === "campaign") {
          conditions.push(eq11(leads.campaignId, sourceId));
        } else {
          conditions.push(eq11(leads.incomingConnectionId, sourceId));
        }
        if (filters?.stage) {
          conditions.push(eq11(leads.stage, filters.stage));
        }
        if (filters?.minScore) {
          conditions.push(gte3(leads.leadScore, filters.minScore));
        }
        if (filters?.maxScore) {
          conditions.push(lte3(leads.leadScore, filters.maxScore));
        }
        if (filters?.startDate) {
          conditions.push(gte3(leads.createdAt, filters.startDate));
        }
        if (filters?.endDate) {
          conditions.push(lte3(leads.createdAt, filters.endDate));
        }
        if (filters?.search) {
          conditions.push(or3(
            ilike2(leads.firstName, `%${filters.search}%`),
            ilike2(leads.lastName, `%${filters.search}%`),
            ilike2(leads.phone, `%${filters.search}%`),
            ilike2(leads.email, `%${filters.search}%`),
            ilike2(leads.company, `%${filters.search}%`)
          ));
        }
        if (filters?.hideLeadsWithoutPhone) {
          conditions.push(isNotNull3(leads.phone));
          conditions.push(sql16`TRIM(${leads.phone}) != ''`);
          conditions.push(sql16`LOWER(TRIM(${leads.phone})) != 'unknown'`);
        }
        return db.select().from(leads).where(and5(...conditions)).orderBy(desc3(leads.createdAt));
      }
      static async getAllLeads(userId, filters) {
        const conditions = [eq11(leads.userId, userId)];
        if (filters?.stage) {
          conditions.push(eq11(leads.stage, filters.stage));
        }
        if (filters?.minScore) {
          conditions.push(gte3(leads.leadScore, filters.minScore));
        }
        if (filters?.maxScore) {
          conditions.push(lte3(leads.leadScore, filters.maxScore));
        }
        if (filters?.startDate) {
          conditions.push(gte3(leads.createdAt, filters.startDate));
        }
        if (filters?.endDate) {
          conditions.push(lte3(leads.createdAt, filters.endDate));
        }
        if (filters?.search) {
          conditions.push(or3(
            ilike2(leads.firstName, `%${filters.search}%`),
            ilike2(leads.lastName, `%${filters.search}%`),
            ilike2(leads.phone, `%${filters.search}%`),
            ilike2(leads.email, `%${filters.search}%`),
            ilike2(leads.company, `%${filters.search}%`)
          ));
        }
        if (filters?.hideLeadsWithoutPhone) {
          conditions.push(isNotNull3(leads.phone));
          conditions.push(sql16`TRIM(${leads.phone}) != ''`);
          conditions.push(sql16`LOWER(TRIM(${leads.phone})) != 'unknown'`);
        }
        return db.select().from(leads).where(and5(...conditions)).orderBy(desc3(leads.createdAt));
      }
      static async getLeadsBySourceType(userId, sourceType, filters) {
        const conditions = [
          eq11(leads.userId, userId),
          eq11(leads.sourceType, sourceType)
        ];
        if (filters?.stage) {
          conditions.push(eq11(leads.stage, filters.stage));
        }
        if (filters?.minScore) {
          conditions.push(gte3(leads.leadScore, filters.minScore));
        }
        if (filters?.maxScore) {
          conditions.push(lte3(leads.leadScore, filters.maxScore));
        }
        if (filters?.startDate) {
          conditions.push(gte3(leads.createdAt, filters.startDate));
        }
        if (filters?.endDate) {
          conditions.push(lte3(leads.createdAt, filters.endDate));
        }
        if (filters?.search) {
          conditions.push(or3(
            ilike2(leads.firstName, `%${filters.search}%`),
            ilike2(leads.lastName, `%${filters.search}%`),
            ilike2(leads.phone, `%${filters.search}%`),
            ilike2(leads.email, `%${filters.search}%`),
            ilike2(leads.company, `%${filters.search}%`)
          ));
        }
        if (filters?.hideLeadsWithoutPhone) {
          conditions.push(isNotNull3(leads.phone));
          conditions.push(sql16`TRIM(${leads.phone}) != ''`);
          conditions.push(sql16`LOWER(TRIM(${leads.phone})) != 'unknown'`);
        }
        return db.select().from(leads).where(and5(...conditions)).orderBy(desc3(leads.createdAt));
      }
      static async getLeadsGroupedByStage(userId, sourceType, sourceId, options) {
        const allLeads = await this.getLeadsBySource(userId, sourceType, sourceId, {
          hideLeadsWithoutPhone: options?.hideLeadsWithoutPhone
        });
        const grouped = /* @__PURE__ */ new Map();
        for (const lead of allLeads) {
          const stage = lead.stage;
          if (!grouped.has(stage)) {
            grouped.set(stage, []);
          }
          grouped.get(stage).push(lead);
        }
        return grouped;
      }
      // ============================================================
      // AI-Categorized Leads (Paginated) - Only qualified prospects
      // ============================================================
      /**
       * Get paginated leads filtered by AI category
       * Only returns leads that have been categorized (not null aiCategory)
       * Now also respects user's filter preferences (hideLeadsWithoutPhone, hiddenCategories)
       */
      static async getPaginatedLeadsByCategory(userId, options) {
        const limit = options.limit || 50;
        const offset = options.offset || 0;
        const conditions = [
          eq11(leads.userId, userId),
          isNotNull3(leads.aiCategory)
          // Only categorized leads
        ];
        if (options.aiCategory) {
          conditions.push(eq11(leads.aiCategory, options.aiCategory));
        }
        if (options.hiddenCategories && options.hiddenCategories.length > 0) {
          if (options.aiCategory && options.hiddenCategories.includes(options.aiCategory)) {
            return { leads: [], total: 0, hasMore: false };
          }
          if (!options.aiCategory) {
            conditions.push(notInArray(leads.aiCategory, options.hiddenCategories));
          }
        }
        if (options.hideLeadsWithoutPhone) {
          conditions.push(isNotNull3(leads.phone));
          conditions.push(sql16`TRIM(${leads.phone}) != ''`);
          conditions.push(sql16`LOWER(TRIM(${leads.phone})) != 'unknown'`);
        }
        if (options.sourceType) {
          conditions.push(eq11(leads.sourceType, options.sourceType));
          if (options.sourceId) {
            if (options.sourceType === "campaign") {
              conditions.push(eq11(leads.campaignId, options.sourceId));
            } else {
              conditions.push(eq11(leads.incomingConnectionId, options.sourceId));
            }
          }
        }
        if (options.search) {
          conditions.push(or3(
            ilike2(leads.firstName, `%${options.search}%`),
            ilike2(leads.lastName, `%${options.search}%`),
            ilike2(leads.phone, `%${options.search}%`),
            ilike2(leads.email, `%${options.search}%`),
            ilike2(leads.company, `%${options.search}%`)
          ));
        }
        const [countResult] = await db.select({ count: count() }).from(leads).where(and5(...conditions));
        const total = countResult?.count || 0;
        let orderBy;
        switch (options.sortBy) {
          case "oldest":
            orderBy = asc2(leads.createdAt);
            break;
          case "score-high":
            orderBy = desc3(leads.leadScore);
            break;
          case "score-low":
            orderBy = asc2(leads.leadScore);
            break;
          default:
            orderBy = desc3(leads.createdAt);
        }
        const results = await db.select().from(leads).where(and5(...conditions)).orderBy(orderBy).limit(limit).offset(offset);
        return {
          leads: results,
          total,
          hasMore: offset + results.length < total
        };
      }
      /**
       * Get lead counts grouped by AI category
       * Now also respects user's filter preferences (hideLeadsWithoutPhone, hiddenCategories)
       */
      static async getLeadCountsByCategory(userId, options) {
        const conditions = [
          eq11(leads.userId, userId),
          isNotNull3(leads.aiCategory)
        ];
        if (options?.hideLeadsWithoutPhone) {
          conditions.push(isNotNull3(leads.phone));
          conditions.push(sql16`TRIM(${leads.phone}) != ''`);
          conditions.push(sql16`LOWER(TRIM(${leads.phone})) != 'unknown'`);
        }
        if (options?.hiddenCategories && options.hiddenCategories.length > 0) {
          conditions.push(notInArray(leads.aiCategory, options.hiddenCategories));
        }
        if (options?.sourceType) {
          conditions.push(eq11(leads.sourceType, options.sourceType));
          if (options.sourceId) {
            if (options.sourceType === "campaign") {
              conditions.push(eq11(leads.campaignId, options.sourceId));
            } else {
              conditions.push(eq11(leads.incomingConnectionId, options.sourceId));
            }
          }
        }
        const results = await db.select({
          category: leads.aiCategory,
          count: count()
        }).from(leads).where(and5(...conditions)).groupBy(leads.aiCategory);
        const counts = {
          [AI_LEAD_CATEGORIES.WARM]: 0,
          [AI_LEAD_CATEGORIES.HOT]: 0,
          [AI_LEAD_CATEGORIES.NEUTRAL]: 0,
          [AI_LEAD_CATEGORIES.COLD]: 0,
          [AI_LEAD_CATEGORIES.APPOINTMENT_BOOKED]: 0,
          [AI_LEAD_CATEGORIES.FORM_SUBMITTED]: 0,
          [AI_LEAD_CATEGORIES.CALL_TRANSFER]: 0,
          [AI_LEAD_CATEGORIES.NEED_FOLLOW_UP]: 0
        };
        for (const row of results) {
          if (row.category && row.category in counts) {
            counts[row.category] = row.count;
          }
        }
        return counts;
      }
      /**
       * Get leads grouped by AI category for Kanban view (paginated per column)
       * Now also respects user's filter preferences (hideLeadsWithoutPhone, hiddenCategories)
       */
      static async getLeadsByAICategory(userId, category, options) {
        return this.getPaginatedLeadsByCategory(userId, {
          aiCategory: category,
          sourceType: options?.sourceType,
          sourceId: options?.sourceId,
          limit: options?.limit || 20,
          offset: options?.offset || 0,
          hideLeadsWithoutPhone: options?.hideLeadsWithoutPhone,
          hiddenCategories: options?.hiddenCategories
        });
      }
      static async createLead(data) {
        const [lead] = await db.insert(leads).values(data).returning();
        return lead;
      }
      static async updateLead(id, userId, data) {
        const [lead] = await db.update(leads).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(and5(eq11(leads.id, id), eq11(leads.userId, userId))).returning();
        return lead || null;
      }
      static async updateLeadStage(id, userId, stage, stageId) {
        const [lead] = await db.update(leads).set({
          stage,
          stageId: stageId || null,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(and5(eq11(leads.id, id), eq11(leads.userId, userId))).returning();
        return lead || null;
      }
      static async deleteLead(id, userId) {
        const result = await db.delete(leads).where(and5(eq11(leads.id, id), eq11(leads.userId, userId))).returning();
        return result.length > 0;
      }
      static async bulkDeleteLeads(ids, userId) {
        if (ids.length === 0) return 0;
        const result = await db.delete(leads).where(and5(eq11(leads.userId, userId), inArray6(leads.id, ids))).returning();
        return result.length;
      }
      static async bulkUpdateStage(ids, userId, stage, stageId) {
        const result = await db.update(leads).set({
          stage,
          stageId: stageId || null,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(and5(
          inArray6(leads.id, ids),
          eq11(leads.userId, userId)
        )).returning();
        return result.length;
      }
      static async bulkAddTags(ids, userId, newTags) {
        const leadsToUpdate = await db.select().from(leads).where(and5(inArray6(leads.id, ids), eq11(leads.userId, userId)));
        let updated = 0;
        for (const lead of leadsToUpdate) {
          const existingTags = lead.tags || [];
          const mergedTags = Array.from(/* @__PURE__ */ new Set([...existingTags, ...newTags]));
          await db.update(leads).set({ tags: mergedTags, updatedAt: /* @__PURE__ */ new Date() }).where(eq11(leads.id, lead.id));
          updated++;
        }
        return updated;
      }
      static async bulkAssign(ids, userId, assignedUserId) {
        const result = await db.update(leads).set({
          assignedUserId,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(and5(
          inArray6(leads.id, ids),
          eq11(leads.userId, userId)
        )).returning();
        return result.length;
      }
      static async getLeadCountsByStage(userId, sourceType, sourceId, options) {
        const conditions = [
          eq11(leads.userId, userId),
          eq11(leads.sourceType, sourceType)
        ];
        if (sourceType === "campaign") {
          conditions.push(eq11(leads.campaignId, sourceId));
        } else {
          conditions.push(eq11(leads.incomingConnectionId, sourceId));
        }
        if (options?.hideLeadsWithoutPhone) {
          conditions.push(isNotNull3(leads.phone));
          conditions.push(sql16`TRIM(${leads.phone}) != ''`);
          conditions.push(sql16`LOWER(TRIM(${leads.phone})) != 'unknown'`);
        }
        const counts = await db.select({
          stage: leads.stage,
          count: sql16`COUNT(*)::int`
        }).from(leads).where(and5(...conditions)).groupBy(leads.stage);
        return counts;
      }
      // ============================================================
      // Lead Notes
      // ============================================================
      static async getNotesByLead(leadId) {
        return db.select().from(leadNotes).where(eq11(leadNotes.leadId, leadId)).orderBy(desc3(leadNotes.createdAt));
      }
      /**
       * Get notes count for multiple leads at once (batch operation)
       */
      static async getNotesCountByLeadIds(leadIds) {
        if (leadIds.length === 0) return /* @__PURE__ */ new Map();
        const counts = await db.select({
          leadId: leadNotes.leadId,
          count: sql16`COUNT(*)::int`
        }).from(leadNotes).where(inArray6(leadNotes.leadId, leadIds)).groupBy(leadNotes.leadId);
        const map = /* @__PURE__ */ new Map();
        for (const row of counts) {
          map.set(row.leadId, row.count);
        }
        return map;
      }
      /**
       * Enrich leads with notes count
       */
      static async enrichLeadsWithNotesCount(leadsList) {
        if (leadsList.length === 0) return [];
        const leadIds = leadsList.map((l) => l.id);
        const notesCounts = await this.getNotesCountByLeadIds(leadIds);
        return leadsList.map((lead) => ({
          ...lead,
          notesCount: notesCounts.get(lead.id) || 0
        }));
      }
      static async createNote(data) {
        const [note] = await db.insert(leadNotes).values(data).returning();
        return note;
      }
      static async updateNote(id, userId, content) {
        const [note] = await db.update(leadNotes).set({ content, updatedAt: /* @__PURE__ */ new Date() }).where(and5(eq11(leadNotes.id, id), eq11(leadNotes.userId, userId))).returning();
        return note || null;
      }
      static async deleteNote(id, userId) {
        const result = await db.delete(leadNotes).where(and5(eq11(leadNotes.id, id), eq11(leadNotes.userId, userId))).returning();
        return result.length > 0;
      }
      // ============================================================
      // Source Data Helpers
      // ============================================================
      static async getUserCampaigns(userId) {
        const campaignList = await db.select({
          id: campaigns.id,
          name: campaigns.name
        }).from(campaigns).where(eq11(campaigns.userId, userId)).orderBy(desc3(campaigns.createdAt));
        const result = [];
        for (const c of campaignList) {
          const [countResult] = await db.select({ count: sql16`COUNT(*)::int` }).from(leads).where(and5(eq11(leads.campaignId, c.id), eq11(leads.userId, userId)));
          result.push({
            id: c.id,
            name: c.name,
            totalLeads: countResult?.count || 0
          });
        }
        return result;
      }
      static async getUserIncomingConnections(userId) {
        const connections = await db.select().from(incomingConnections).where(eq11(incomingConnections.userId, userId));
        const result = [];
        for (const conn of connections) {
          const [countResult] = await db.select({ count: sql16`COUNT(*)::int` }).from(leads).where(and5(eq11(leads.incomingConnectionId, conn.id), eq11(leads.userId, userId)));
          result.push({
            id: conn.id,
            name: `Incoming - ${conn.id.slice(0, 8)}`,
            phoneNumber: conn.phoneNumberId,
            totalLeads: countResult?.count || 0
          });
        }
        return result;
      }
      // ============================================================
      // Lead Creation from Call Completion
      // ============================================================
      static async createOrUpdateLeadFromCall(userId, callData) {
        let stage = "new";
        if (callData.hasAppointment) {
          stage = "appointment";
        } else if (callData.hasFormSubmission) {
          stage = "form_submitted";
        } else if (callData.hasCallback) {
          stage = "follow_up";
        } else if (callData.hasTransfer) {
          stage = "hot";
        } else if (callData.leadScore && callData.leadScore >= 70) {
          stage = "hot";
        } else if (callData.sentiment === "negative") {
          stage = "not_interested";
        }
        const leadData = {
          userId,
          phone: callData.phone,
          firstName: callData.firstName,
          lastName: callData.lastName,
          email: callData.email,
          company: callData.company,
          customFields: callData.customFields,
          sourceType: callData.sourceType,
          campaignId: callData.campaignId,
          incomingConnectionId: callData.incomingConnectionId,
          stage,
          callId: callData.callId,
          plivoCallId: callData.plivoCallId,
          twilioOpenaiCallId: callData.twilioOpenaiCallId,
          sipCallId: callData.sipCallId,
          aiSummary: callData.aiSummary,
          leadScore: callData.leadScore,
          aiNextAction: callData.aiNextAction,
          sentiment: callData.sentiment,
          hasAppointment: callData.hasAppointment || false,
          hasFormSubmission: callData.hasFormSubmission || false,
          hasTransfer: callData.hasTransfer || false,
          hasCallback: callData.hasCallback || false,
          appointmentDate: callData.appointmentDate,
          appointmentDetails: callData.appointmentDetails,
          formData: callData.formData,
          transferredTo: callData.transferredTo,
          callbackScheduled: callData.callbackScheduled,
          lastCallAt: /* @__PURE__ */ new Date()
        };
        const lead = await this.createLead(leadData);
        return lead;
      }
      // ============================================================
      // Lead Activities - Activity Timeline
      // ============================================================
      static async getActivitiesByLead(leadId, userId) {
        return db.select().from(leadActivities).where(and5(eq11(leadActivities.leadId, leadId), eq11(leadActivities.userId, userId))).orderBy(desc3(leadActivities.createdAt));
      }
      static async createActivity(data) {
        const [activity] = await db.insert(leadActivities).values(data).returning();
        return activity;
      }
      static async logStageChange(leadId, userId, fromStage, toStage, fromStageName, toStageName) {
        return this.createActivity({
          leadId,
          userId,
          activityType: "stage_change",
          title: `Stage changed to ${toStageName || toStage}`,
          description: `Moved from "${fromStageName || fromStage}" to "${toStageName || toStage}"`,
          metadata: { fromStage, toStage, fromStageName, toStageName }
        });
      }
      static async logNoteAdded(leadId, userId, noteId, noteContent) {
        return this.createActivity({
          leadId,
          userId,
          activityType: "note",
          title: "Note added",
          description: noteContent.substring(0, 200) + (noteContent.length > 200 ? "..." : ""),
          metadata: { noteId, noteContent: noteContent.substring(0, 500) }
        });
      }
      static async logCallActivity(leadId, userId, callId, callDuration, callStatus) {
        const durationStr = callDuration > 60 ? `${Math.floor(callDuration / 60)}m ${callDuration % 60}s` : `${callDuration}s`;
        return this.createActivity({
          leadId,
          userId,
          activityType: "call",
          title: `Call ${callStatus}`,
          description: `Duration: ${durationStr}`,
          metadata: { callId, callDuration, callStatus }
        });
      }
      static async logTagChange(leadId, userId, action, tagName) {
        return this.createActivity({
          leadId,
          userId,
          activityType: action === "added" ? "tag_added" : "tag_removed",
          title: `Tag ${action}: ${tagName}`,
          metadata: { tagName }
        });
      }
      static async logLeadCreated(leadId, userId, source) {
        return this.createActivity({
          leadId,
          userId,
          activityType: "created",
          title: "Lead created",
          description: `Source: ${source}`
        });
      }
      // ============================================================
      // Analytics & Export
      // ============================================================
      static async getLeadsWithDetails(userId) {
        const allLeads = await this.getAllLeads(userId);
        const leadsWithDetails = await Promise.all(
          allLeads.map(async (lead) => {
            const [notes, activities] = await Promise.all([
              this.getNotesByLead(lead.id),
              this.getActivitiesByLead(lead.id, userId)
            ]);
            return { ...lead, notes, activities };
          })
        );
        return leadsWithDetails;
      }
      static async getAnalytics(userId) {
        const [totalResult] = await db.select({ count: count() }).from(leads).where(eq11(leads.userId, userId));
        const totalLeads = totalResult?.count || 0;
        const categoryResults = await db.select({ category: leads.aiCategory, count: count() }).from(leads).where(and5(eq11(leads.userId, userId), isNotNull3(leads.aiCategory))).groupBy(leads.aiCategory);
        const leadsByCategory = categoryResults.map((r) => ({
          category: r.category || "uncategorized",
          count: Number(r.count)
        }));
        const stageResults = await db.select({ stage: leads.stage, count: count() }).from(leads).where(eq11(leads.userId, userId)).groupBy(leads.stage);
        const leadsByStage = stageResults.map((r) => ({ stage: r.stage, count: Number(r.count) }));
        const sourceResults = await db.select({ sourceType: leads.sourceType, count: count() }).from(leads).where(eq11(leads.userId, userId)).groupBy(leads.sourceType);
        const leadsBySource = sourceResults.map((r) => ({ sourceType: r.sourceType, count: Number(r.count) }));
        const thirtyDaysAgo = /* @__PURE__ */ new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const dateResults = await db.select({
          date: sql16`DATE(${leads.createdAt})`,
          count: count()
        }).from(leads).where(and5(eq11(leads.userId, userId), gte3(leads.createdAt, thirtyDaysAgo))).groupBy(sql16`DATE(${leads.createdAt})`).orderBy(sql16`DATE(${leads.createdAt})`);
        const leadsByDate = dateResults.map((r) => ({ date: r.date, count: Number(r.count) }));
        const [scoreResult] = await db.select({ avg: sql16`COALESCE(AVG(${leads.leadScore}), 0)` }).from(leads).where(and5(eq11(leads.userId, userId), sql16`${leads.leadScore} IS NOT NULL`));
        const avgLeadScore = Math.round(scoreResult?.avg || 0);
        const sentimentResults = await db.select({ sentiment: leads.sentiment, count: count() }).from(leads).where(and5(eq11(leads.userId, userId), sql16`${leads.sentiment} IS NOT NULL`)).groupBy(leads.sentiment);
        const sentimentBreakdown = sentimentResults.map((r) => ({
          sentiment: r.sentiment || "unknown",
          count: Number(r.count)
        }));
        const stageChanges = await db.select().from(leadActivities).where(and5(
          eq11(leadActivities.userId, userId),
          eq11(leadActivities.activityType, "stage_change")
        ));
        const conversionMap = /* @__PURE__ */ new Map();
        for (const change of stageChanges) {
          const metadata = change.metadata;
          if (metadata?.fromStage && metadata?.toStage) {
            const key = metadata.fromStage;
            if (!conversionMap.has(key)) {
              conversionMap.set(key, { total: 0, conversions: /* @__PURE__ */ new Map() });
            }
            const data = conversionMap.get(key);
            data.total++;
            data.conversions.set(
              metadata.toStage,
              (data.conversions.get(metadata.toStage) || 0) + 1
            );
          }
        }
        const conversionRates = [];
        Array.from(conversionMap.entries()).forEach(([fromStage, data]) => {
          Array.from(data.conversions.entries()).forEach(([toStage, cnt]) => {
            conversionRates.push({
              fromStage,
              toStage,
              rate: Math.round(cnt / data.total * 100)
            });
          });
        });
        return {
          totalLeads,
          leadsByStage,
          leadsByCategory,
          leadsBySource,
          leadsByDate,
          conversionRates,
          avgLeadScore,
          sentimentBreakdown
        };
      }
      static async getAllUniqueTags(userId) {
        const allLeads = await db.select({ tags: leads.tags }).from(leads).where(eq11(leads.userId, userId));
        const tagsSet = /* @__PURE__ */ new Set();
        for (const lead of allLeads) {
          if (lead.tags) {
            for (const tag of lead.tags) {
              tagsSet.add(tag);
            }
          }
        }
        return Array.from(tagsSet).sort();
      }
      // ============================================================
      // CRM Category Preferences
      // ============================================================
      static async getCategoryPreferences(userId) {
        const [prefs] = await db.select().from(crmCategoryPreferences).where(eq11(crmCategoryPreferences.userId, userId));
        return prefs || null;
      }
      static async getOrCreateCategoryPreferences(userId) {
        const existing = await this.getCategoryPreferences(userId);
        if (existing) return existing;
        const [created] = await db.insert(crmCategoryPreferences).values({ userId }).returning();
        return created;
      }
      static async updateCategoryPreferences(userId, updates) {
        const existing = await this.getOrCreateCategoryPreferences(userId);
        const updateData = { updatedAt: /* @__PURE__ */ new Date() };
        if (updates.columnOrder !== void 0) {
          updateData.columnOrder = updates.columnOrder;
        }
        if (updates.colorOverrides !== void 0) {
          updateData.colorOverrides = updates.colorOverrides;
        }
        if (updates.columnSortPreferences !== void 0) {
          updateData.columnSortPreferences = updates.columnSortPreferences;
        }
        if (updates.hideLeadsWithoutPhone !== void 0) {
          updateData.hideLeadsWithoutPhone = updates.hideLeadsWithoutPhone;
        }
        if (updates.categoryPipelineMappings !== void 0) {
          updateData.categoryPipelineMappings = updates.categoryPipelineMappings;
        }
        if (updates.hotScoreThreshold !== void 0) {
          updateData.hotScoreThreshold = updates.hotScoreThreshold;
        }
        if (updates.warmScoreThreshold !== void 0) {
          updateData.warmScoreThreshold = updates.warmScoreThreshold;
        }
        if (updates.hiddenCategories !== void 0) {
          updateData.hiddenCategories = updates.hiddenCategories;
        }
        const [updated] = await db.update(crmCategoryPreferences).set(updateData).where(eq11(crmCategoryPreferences.id, existing.id)).returning();
        return updated;
      }
      static async updateCategoryColor(userId, categoryId, color) {
        const prefs = await this.getOrCreateCategoryPreferences(userId);
        const colorOverrides = { ...prefs.colorOverrides || {}, [categoryId]: color };
        return this.updateCategoryPreferences(userId, { colorOverrides });
      }
      static async updateColumnOrder(userId, columnOrder) {
        return this.updateCategoryPreferences(userId, { columnOrder });
      }
      static async updateColumnSort(userId, categoryId, sortBy) {
        const prefs = await this.getOrCreateCategoryPreferences(userId);
        const columnSortPreferences = { ...prefs.columnSortPreferences || {}, [categoryId]: sortBy };
        return this.updateCategoryPreferences(userId, { columnSortPreferences });
      }
    };
  }
});

// server/utils/url-validator.ts
import { URL as URL2 } from "url";
import dns from "dns";
import { promisify } from "util";
import net from "net";
function isPrivateIP(ip) {
  if (net.isIPv4(ip)) {
    const parts = ip.split(".").map(Number);
    if (parts[0] === 10) return true;
    if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
    if (parts[0] === 192 && parts[1] === 168) return true;
    if (parts[0] === 127) return true;
    if (parts[0] === 169 && parts[1] === 254) return true;
    if (parts[0] === 0) return true;
  }
  if (net.isIPv6(ip)) {
    if (ip === "::1" || ip === "::" || ip.startsWith("fc") || ip.startsWith("fd") || ip.startsWith("fe80")) {
      return true;
    }
  }
  return false;
}
async function validateWebhookUrl(url) {
  try {
    const parsed = new URL2(url);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return { valid: false, error: "Only HTTP and HTTPS URLs are allowed" };
    }
    const hostname = parsed.hostname.replace(/^\[|\]$/g, "");
    if (BLOCKED_HOSTNAMES.includes(hostname)) {
      return { valid: false, error: "Webhook URL must not point to a local or internal address" };
    }
    if (net.isIP(hostname)) {
      if (isPrivateIP(hostname)) {
        return { valid: false, error: "Webhook URL must not point to a private IP address" };
      }
    } else {
      try {
        const { address } = await dnsLookup(hostname);
        if (isPrivateIP(address)) {
          return { valid: false, error: "Webhook URL resolves to a private IP address" };
        }
      } catch {
        return { valid: false, error: "Could not resolve webhook URL hostname" };
      }
    }
    return { valid: true };
  } catch {
    return { valid: false, error: "Invalid URL format" };
  }
}
var dnsLookup, BLOCKED_HOSTNAMES;
var init_url_validator = __esm({
  "server/utils/url-validator.ts"() {
    "use strict";
    dnsLookup = promisify(dns.lookup);
    BLOCKED_HOSTNAMES = [
      "localhost",
      "127.0.0.1",
      "[::1]",
      "0.0.0.0",
      "169.254.169.254",
      "metadata.google.internal"
    ];
  }
});

// server/services/webhook-delivery.ts
var webhook_delivery_exports = {};
__export(webhook_delivery_exports, {
  WebhookDeliveryService: () => WebhookDeliveryService,
  webhookDeliveryService: () => webhookDeliveryService
});
import crypto from "crypto";
import { eq as eq12, and as and6 } from "drizzle-orm";
var RETRY_DELAYS, WebhookDeliveryService, webhookDeliveryService;
var init_webhook_delivery = __esm({
  "server/services/webhook-delivery.ts"() {
    "use strict";
    init_storage();
    init_db();
    init_schema();
    init_url_validator();
    RETRY_DELAYS = [0, 6e4, 3e5];
    WebhookDeliveryService = class {
      generateSignature(payload, secret) {
        return crypto.createHmac("sha256", secret).update(payload).digest("hex");
      }
      buildHeaders(webhook, payloadString) {
        const headers = {
          "Content-Type": "application/json",
          "User-Agent": "Platform-Webhook/1.0",
          "X-Webhook-Event": webhook.events?.[0] || "unknown",
          "X-Webhook-Delivery": crypto.randomUUID(),
          "X-Webhook-Signature": `sha256=${this.generateSignature(payloadString, webhook.secret)}`
        };
        if (webhook.authType === "basic" && webhook.authCredentials) {
          const creds = webhook.authCredentials;
          if (creds.username && creds.password) {
            const basicAuth = Buffer.from(`${creds.username}:${creds.password}`).toString("base64");
            headers["Authorization"] = `Basic ${basicAuth}`;
          }
        } else if (webhook.authType === "bearer" && webhook.authCredentials) {
          const creds = webhook.authCredentials;
          if (creds.token) {
            headers["Authorization"] = `Bearer ${creds.token}`;
          }
        }
        if (webhook.headers) {
          const customHeaders = webhook.headers;
          Object.assign(headers, customHeaders);
        }
        return headers;
      }
      async deliverWebhook(webhook, payload, attemptNumber = 1) {
        const payloadString = JSON.stringify(payload);
        const headers = this.buildHeaders(webhook, payloadString);
        const startTime = Date.now();
        console.log(`\u{1F4E4} [Webhook] Delivering to ${webhook.url} (attempt ${attemptNumber})`);
        console.log(`   Event: ${payload.event}`);
        try {
          const urlCheck = await validateWebhookUrl(webhook.url);
          if (!urlCheck.valid) {
            console.warn(`\u{1F6AB} [Webhook] SSRF blocked: ${urlCheck.error} for URL ${webhook.url}`);
            return {
              success: false,
              httpStatus: 0,
              responseBody: `Blocked: ${urlCheck.error}`,
              responseTime: 0,
              error: urlCheck.error
            };
          }
          const response = await fetch(webhook.url, {
            method: webhook.method || "POST",
            headers,
            body: payloadString,
            signal: AbortSignal.timeout(3e4),
            redirect: "error"
          });
          const responseTime = Date.now() - startTime;
          let responseBody = "";
          try {
            responseBody = await response.text();
            if (responseBody.length > 1e4) {
              responseBody = responseBody.substring(0, 1e4) + "...[truncated]";
            }
          } catch {
            responseBody = "Unable to read response body";
          }
          const success = response.ok;
          console.log(`${success ? "\u2705" : "\u274C"} [Webhook] Status: ${response.status}, Time: ${responseTime}ms`);
          return {
            success,
            httpStatus: response.status,
            responseBody,
            responseTime
          };
        } catch (error) {
          const responseTime = Date.now() - startTime;
          const errorMessage = error.name === "TimeoutError" ? "Request timed out after 30 seconds" : error.message || "Unknown error";
          console.error(`\u274C [Webhook] Delivery failed: ${errorMessage}`);
          return {
            success: false,
            responseTime,
            error: errorMessage
          };
        }
      }
      async deliverWithRetry(webhook, payload, maxAttempts = 3) {
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
          const result = await this.deliverWebhook(webhook, payload, attempt);
          const logData = {
            webhookId: webhook.id,
            event: payload.event,
            payload,
            success: result.success,
            httpStatus: result.httpStatus || null,
            responseBody: result.responseBody || null,
            responseTime: result.responseTime || null,
            error: result.error || null,
            attemptNumber: attempt,
            maxAttempts,
            nextRetryAt: null
          };
          if (!result.success && attempt < maxAttempts) {
            const delay = RETRY_DELAYS[attempt] || 3e5;
            logData.nextRetryAt = new Date(Date.now() + delay);
            console.log(`\u23F3 [Webhook] Scheduling retry in ${delay / 1e3}s`);
          }
          try {
            const webhookExists = await storage.getWebhook(webhook.id);
            if (webhookExists) {
              await storage.createWebhookLog(logData);
            } else {
              console.log(`\u2139\uFE0F [Webhook] Skipping log - webhook ${webhook.id} was deleted`);
            }
          } catch (err) {
            if (err.code === "23503" || err.message?.includes("foreign key constraint")) {
              console.log(`\u2139\uFE0F [Webhook] Skipping log - webhook ${webhook.id} no longer exists`);
            } else {
              console.error(`\u274C [Webhook] Failed to log delivery:`, err);
            }
          }
          if (result.success) {
            console.log(`\u2705 [Webhook] Delivery successful on attempt ${attempt}`);
            return;
          }
          if (attempt < maxAttempts) {
            const delay = RETRY_DELAYS[attempt] || 6e4;
            console.log(`\u23F3 [Webhook] Waiting ${delay / 1e3}s before retry...`);
            await new Promise((resolve) => setTimeout(resolve, delay));
          }
        }
        console.error(`\u274C [Webhook] All ${maxAttempts} attempts failed for ${webhook.url}`);
      }
      async triggerEvent(userId, event, data, campaignId) {
        console.log(`\u{1F514} [Webhook] Triggering event: ${event}`);
        console.log(`   UserId: ${userId}, CampaignId: ${campaignId || "N/A"}`);
        try {
          const webhooks2 = await storage.getWebhooksForEvent(userId, event, campaignId || void 0);
          if (webhooks2.length === 0) {
            console.log(`\u2139\uFE0F [Webhook] No webhooks configured for event: ${event}`);
            return;
          }
          console.log(`\u{1F4E4} [Webhook] Found ${webhooks2.length} webhook(s) to deliver`);
          const payload = {
            event,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            data
          };
          const deliveryPromises = webhooks2.map(
            (webhook) => this.deliverWithRetry(webhook, payload).catch((err) => {
              console.error(`\u274C [Webhook] Error delivering to ${webhook.url}:`, err);
            })
          );
          await Promise.allSettled(deliveryPromises);
          console.log(`\u2705 [Webhook] Event ${event} processing complete`);
        } catch (error) {
          console.error(`\u274C [Webhook] Error triggering event ${event}:`, error);
        }
      }
      async testWebhook(webhookId, userId) {
        const [webhook] = await db.select().from(webhooks).where(and6(eq12(webhooks.id, webhookId), eq12(webhooks.userId, userId)));
        if (!webhook) {
          throw new Error("Webhook not found");
        }
        const testPayload = {
          event: "webhook.test",
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          data: {
            test: true,
            message: "This is a test webhook from your platform"
          }
        };
        console.log(`\u{1F9EA} Testing webhook ${webhookId}...`);
        const result = await this.deliverWebhook(webhook, testPayload, 1);
        return {
          success: result.success,
          statusCode: result.httpStatus || 0,
          responseTime: result.responseTime || 0,
          responseBody: result.responseBody || "",
          error: result.error
        };
      }
      async retryWebhook(logId, userId) {
        const [log] = await db.select().from(webhookLogs).where(eq12(webhookLogs.id, logId));
        if (!log) {
          throw new Error("Webhook log not found");
        }
        const [webhook] = await db.select().from(webhooks).where(and6(eq12(webhooks.id, log.webhookId), eq12(webhooks.userId, userId)));
        if (!webhook) {
          throw new Error("Webhook not found or access denied");
        }
        console.log(`\u{1F504} Manually retrying webhook ${webhook.id} (log ${logId})...`);
        const payload = {
          event: log.event,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          data: log.payload?.data || log.payload
        };
        const result = await this.deliverWebhook(webhook, payload, 1);
        const logData = {
          webhookId: webhook.id,
          event: log.event,
          payload: log.payload,
          success: result.success,
          httpStatus: result.httpStatus || null,
          responseBody: result.responseBody || null,
          responseTime: result.responseTime || null,
          error: result.error || null,
          attemptNumber: 1,
          maxAttempts: 1,
          nextRetryAt: null
        };
        try {
          const newLog = await storage.createWebhookLog(logData);
          return {
            success: result.success,
            newLogId: newLog?.id,
            error: result.error
          };
        } catch (err) {
          console.error(`\u274C [Webhook] Failed to log retry:`, err);
          return {
            success: result.success,
            error: result.error
          };
        }
      }
    };
    webhookDeliveryService = new WebhookDeliveryService();
  }
});

// server/engines/crm/lead-processor.service.ts
var lead_processor_service_exports = {};
__export(lead_processor_service_exports, {
  CRMLeadProcessor: () => CRMLeadProcessor,
  default: () => lead_processor_service_default
});
import { eq as eq13, and as and7, sql as sql17 } from "drizzle-orm";
var CRMLeadProcessor, lead_processor_service_default;
var init_lead_processor_service = __esm({
  "server/engines/crm/lead-processor.service.ts"() {
    "use strict";
    init_db();
    init_schema();
    init_crm_storage();
    CRMLeadProcessor = class {
      static LOG_PREFIX = "[CRM Lead Processor]";
      // Minimum quality thresholds
      static MIN_DURATION_SECONDS = 10;
      // At least 10 seconds
      static MIN_TRANSCRIPT_LENGTH = 20;
      // At least 20 characters
      /**
       * Resolve the correct phone number based on call direction
       * For incoming calls: customer is the caller (fromNumber)
       * For outgoing calls: customer is the recipient (toNumber)
       * Handles undefined callDirection and engine-specific metadata
       */
      static resolveLeadPhone(callData) {
        let phone = null;
        const metadata = callData.metadata || {};
        if (metadata.customerPhone) {
          phone = String(metadata.customerPhone);
        } else if (metadata.callerPhone) {
          phone = String(metadata.callerPhone);
        }
        if (!phone || !this.isValidPhone(phone)) {
          const direction = callData.callDirection?.toLowerCase();
          if (direction === "incoming") {
            phone = callData.fromNumber || callData.phoneNumber || callData.toNumber || null;
          } else if (direction === "outgoing") {
            phone = callData.toNumber || callData.phoneNumber || callData.fromNumber || null;
          } else {
            phone = callData.fromNumber || callData.toNumber || callData.phoneNumber || null;
          }
        }
        if (phone && this.isValidPhone(phone)) {
          return this.normalizePhone(phone);
        }
        return "Unknown";
      }
      /**
       * Check if a phone number is valid dialable number
       * Rejects SIP identifiers, client IDs, and non-phone strings
       */
      static isValidPhone(phone) {
        if (!phone) return false;
        const cleaned = phone.trim().toLowerCase();
        if (cleaned === "" || cleaned === "unknown" || cleaned === "anonymous" || cleaned === "null" || cleaned === "undefined") {
          return false;
        }
        if (cleaned.startsWith("client:") || cleaned.startsWith("sip:") || cleaned.startsWith("agent:") || cleaned.includes("@")) {
          return false;
        }
        const digitsOnly = phone.replace(/\D/g, "");
        if (digitsOnly.length < 5 || digitsOnly.length > 15) {
          return false;
        }
        const digitRatio = digitsOnly.length / cleaned.replace(/\s/g, "").length;
        if (digitRatio < 0.5) {
          return false;
        }
        return true;
      }
      /**
       * Normalize phone number to E.164 format for consistent deduplication
       * Always outputs +<digits> format when possible
       */
      static normalizePhone(phone) {
        let normalized = phone.trim();
        normalized = normalized.replace(/^(whatsapp:|tel:|phone:)/i, "");
        const digitsOnly = normalized.replace(/[^\d]/g, "");
        const hadPlus = normalized.startsWith("+");
        if (digitsOnly.length >= 10) {
          return "+" + digitsOnly;
        } else if (digitsOnly.length >= 5) {
          return hadPlus ? "+" + digitsOnly : digitsOnly;
        }
        return digitsOnly || normalized;
      }
      /**
       * Check if a call meets minimum quality standards for lead creation
       * Requires either meaningful duration OR transcript content OR high-value signals
       */
      static meetsQualityThreshold(callData) {
        const metadata = callData.metadata || {};
        const aiInsights = callData.aiInsights || metadata.aiInsights || {};
        const hasAppointment = metadata.appointmentBooked === true || metadata.hasAppointment === true || aiInsights.primaryOutcome === "appointment_booked" || aiInsights.appointmentBooked === true || metadata.appointmentDetails !== void 0 || metadata.appointmentData !== void 0;
        const hasForm = metadata.formSubmitted === true || metadata.hasFormSubmission === true || aiInsights.primaryOutcome === "form_submitted" || aiInsights.formSubmitted === true || metadata.formData !== void 0 || metadata.collectedData !== void 0;
        const hasTransfer = callData.wasTransferred === true || aiInsights.primaryOutcome === "call_transfer";
        const hasCallback = aiInsights.primaryOutcome === "need_follow_up" || aiInsights.needsFollowUp === true;
        console.log(`${this.LOG_PREFIX} [Quality Threshold Check] Call ID: ${callData.id}`);
        console.log(`  - Duration: ${callData.duration || 0}s (Min: ${this.MIN_DURATION_SECONDS}s)`);
        console.log(`  - Transcript length: ${callData.transcript?.trim().length || 0} chars (Min: ${this.MIN_TRANSCRIPT_LENGTH} chars)`);
        console.log(`  - High-value indicators: Appointment=${hasAppointment}, Form=${hasForm}, Transfer=${hasTransfer}, Callback=${hasCallback}`);
        const duration = callData.duration ?? 0;
        if (duration > 0 && duration < this.MIN_DURATION_SECONDS && !hasAppointment && !hasForm && !hasTransfer && !hasCallback) {
          const failReason2 = `Call duration too short (${duration}s) without high-value business outcome`;
          console.log(`  - Passed: False (Reason: ${failReason2})`);
          return { passed: false, reason: failReason2 };
        }
        if (hasAppointment || hasForm || hasTransfer || hasCallback) {
          const activeSignals = [
            hasAppointment && "Appointment Booked",
            hasForm && "Form Submitted",
            hasTransfer && "Call Transferred",
            hasCallback && "Callback Requested"
          ].filter(Boolean).join(", ");
          console.log(`  - Passed: True (bypassed via high-value outcome: ${activeSignals})`);
          return { passed: true, reason: `Has high-value business outcome: ${activeSignals}` };
        }
        const hasTranscript = callData.transcript && callData.transcript.trim().length >= this.MIN_TRANSCRIPT_LENGTH;
        const hasDuration = callData.duration && callData.duration >= this.MIN_DURATION_SECONDS;
        const validQualificationClassifications = ["hot", "warm", "cold", "qualified", "interested", "not_interested", "need_follow_up"];
        const hasValidClassification = callData.classification && validQualificationClassifications.includes(callData.classification.trim().toLowerCase());
        const hasExplicitSignal = callData.aiSummary && callData.aiSummary.trim().length > 10 || hasValidClassification || callData.sentiment && callData.sentiment.trim() !== "";
        console.log(`  - Standard Checks: HasTranscript=${!!hasTranscript}, HasDuration=${!!hasDuration}, HasExplicitSignal=${!!hasExplicitSignal}`);
        console.log(`  - Explicit signals: AI Summary length=${callData.aiSummary?.trim().length || 0}, Classification=${callData.classification || "none"} (valid=${!!hasValidClassification}), Sentiment=${callData.sentiment || "none"}`);
        if (hasTranscript || hasDuration || hasExplicitSignal) {
          console.log(`  - Passed: True (Meets standard quality thresholds)`);
          return { passed: true, reason: "Meets quality threshold" };
        }
        const failReason = `Call too short (${callData.duration || 0}s) and no transcript (${callData.transcript?.length || 0} chars)`;
        console.log(`  - Passed: False (Reason: ${failReason})`);
        return {
          passed: false,
          reason: failReason
        };
      }
      /**
       * Process a completed call and create a lead if it qualifies
       */
      static async processCall(callData) {
        console.log(`${this.LOG_PREFIX} Processing call ${callData.id} from engine: ${callData.engine}`);
        const qualityCheck = this.meetsQualityThreshold(callData);
        if (!qualityCheck.passed) {
          console.log(`${this.LOG_PREFIX} Call ${callData.id} rejected: ${qualityCheck.reason}`);
          return {
            leadId: null,
            qualification: {
              qualified: false,
              category: null,
              score: 0,
              hasAppointment: false,
              hasFormSubmission: false,
              hasTransfer: false,
              hasCallback: false
            }
          };
        }
        try {
          const qualification = await this.qualifyCall(callData);
          if (!qualification.qualified) {
            console.log(`${this.LOG_PREFIX} Call ${callData.id} does not qualify for CRM (no category matched)`);
            return { leadId: null, qualification };
          }
          if (qualification.category) {
            await this.updateCallClassification(callData.id, callData.engine, qualification.category);
          }
          const existingLead = await this.findExistingLead(callData);
          if (existingLead) {
            const updatedLead = await this.updateExistingLead(existingLead, callData, qualification);
            if (updatedLead) {
              const categoryChanged = existingLead.aiCategory !== updatedLead.aiCategory;
              console.log(`${this.LOG_PREFIX} Updated existing lead ${updatedLead.id} - aiCategory: ${existingLead.aiCategory || "none"} -> ${updatedLead.aiCategory || qualification.category}${categoryChanged ? " (changed)" : ""}`);
              return {
                leadId: updatedLead.id,
                qualification
              };
            }
            console.log(`${this.LOG_PREFIX} Update returned null, creating new lead`);
          }
          const lead = await this.createLeadFromCall(callData, qualification);
          if (!lead) {
            console.log(`${this.LOG_PREFIX} Failed to create lead for call ${callData.id} - createLeadFromCall returned null`);
            return { leadId: null, qualification };
          }
          console.log(`${this.LOG_PREFIX} Created lead ${lead.id} with category: ${qualification.category}`);
          try {
            await CRMStorage.createActivity({
              userId: callData.userId,
              leadId: lead.id,
              activityType: "call",
              title: `Auto-created from ${callData.engine} call`,
              description: `Lead auto-created from ${callData.engine} ${callData.callDirection} call`,
              metadata: {
                callId: callData.id
              }
            });
          } catch (activityError) {
            console.error(`${this.LOG_PREFIX} Failed to create activity:`, activityError);
          }
          try {
            const { webhookDeliveryService: webhookDeliveryService2 } = await Promise.resolve().then(() => (init_webhook_delivery(), webhook_delivery_exports));
            await webhookDeliveryService2.triggerEvent(callData.userId, "form.lead_created", {
              lead: {
                id: lead.id,
                name: lead.firstName || lead.lastName ? `${lead.firstName || ""} ${lead.lastName || ""}`.trim() : "Unknown",
                email: lead.email,
                phone: lead.phone,
                company: lead.company,
                source: callData.campaignId ? "Outbound Campaign" : "Incoming Call",
                status: lead.stage || "new",
                createdAt: lead.createdAt ? new Date(lead.createdAt).toISOString() : (/* @__PURE__ */ new Date()).toISOString()
              },
              call: {
                id: callData.id,
                duration: callData.duration || 0,
                direction: callData.callDirection || "incoming",
                phoneNumber: callData.phoneNumber || null
              },
              qualification: {
                score: qualification.score,
                category: qualification.category,
                hasAppointment: qualification.hasAppointment,
                hasFormSubmission: qualification.hasFormSubmission,
                hasTransfer: qualification.hasTransfer,
                hasCallback: qualification.hasCallback
              }
            }, callData.campaignId);
            console.log(`${this.LOG_PREFIX} Triggered form.lead_created webhook event for lead ${lead.id}`);
          } catch (webhookError) {
            console.error(`${this.LOG_PREFIX} Failed to trigger form.lead_created webhook:`, webhookError.message);
          }
          return { leadId: lead.id, qualification };
        } catch (error) {
          console.error(`${this.LOG_PREFIX} Error processing call ${callData.id}:`, error);
          throw error;
        }
      }
      /**
       * Qualify a call and determine its CRM category
       * Priority order: appointment_booked > form_submitted > call_transfer > need_follow_up > hot > warm
       */
      static async qualifyCall(callData) {
        const metadata = callData.metadata || {};
        const aiInsights = callData.aiInsights || metadata.aiInsights || metadata;
        const mergedMetadata = { ...metadata, ...aiInsights };
        const primaryOutcome = aiInsights.primaryOutcome;
        const engagementScore = this.extractEngagementScore(callData, aiInsights);
        let hasAppointment = this.checkAppointmentBooked(callData, mergedMetadata);
        let appointmentData = hasAppointment ? this.extractAppointmentData(mergedMetadata) : void 0;
        if (!hasAppointment) {
          const dbAppointment = await this.checkAppointmentInDatabase(callData);
          if (dbAppointment) {
            hasAppointment = true;
            appointmentData = dbAppointment;
          }
        }
        const hasFormSubmission = this.checkFormSubmitted(callData, mergedMetadata);
        const formData = hasFormSubmission ? this.extractFormData(mergedMetadata) : void 0;
        const hasTransfer = callData.wasTransferred === true || primaryOutcome === "call_transfer";
        const hasCallback = primaryOutcome === "need_follow_up" || this.checkNeedsFollowUp(callData, aiInsights);
        let category = null;
        if (hasAppointment) {
          category = AI_LEAD_CATEGORIES.APPOINTMENT_BOOKED;
        } else if (hasFormSubmission) {
          category = AI_LEAD_CATEGORIES.FORM_SUBMITTED;
        } else if (hasTransfer) {
          category = AI_LEAD_CATEGORIES.CALL_TRANSFER;
        } else if (hasCallback) {
          category = AI_LEAD_CATEGORIES.NEED_FOLLOW_UP;
        } else if (engagementScore >= 70) {
          category = AI_LEAD_CATEGORIES.HOT;
        } else if (engagementScore >= 40) {
          category = AI_LEAD_CATEGORIES.WARM;
        } else if (engagementScore >= 20) {
          category = AI_LEAD_CATEGORIES.NEUTRAL;
        } else {
          category = AI_LEAD_CATEGORIES.COLD;
        }
        const qualified = category !== null;
        console.log(`${this.LOG_PREFIX} Qualification result for call ${callData.id}:`, {
          qualified,
          category,
          score: engagementScore,
          hasAppointment,
          hasFormSubmission,
          hasTransfer,
          hasCallback,
          primaryOutcome
        });
        return {
          qualified,
          category,
          score: engagementScore,
          hasAppointment,
          hasFormSubmission,
          hasTransfer,
          hasCallback,
          appointmentData,
          formData
        };
      }
      /**
       * Extract engagement score from call data or AI insights
       */
      static extractEngagementScore(callData, aiInsights) {
        const sources = [
          aiInsights.engagementScore,
          aiInsights.leadScore,
          aiInsights.score,
          callData.metadata?.leadScore,
          callData.metadata?.engagementScore
        ];
        for (const source of sources) {
          if (typeof source === "number" && source >= 0 && source <= 100) {
            return source;
          }
        }
        return this.calculateScoreFromSentiment(callData);
      }
      /**
       * Calculate engagement score based on sentiment, classification, and call quality
       * Balanced scoring - requires signals to qualify but tolerant of formatting differences
       */
      static calculateScoreFromSentiment(callData) {
        let score = 30;
        let hasAnySignal = false;
        const sentiment = (callData.sentiment || "").trim().toLowerCase();
        if (sentiment === "positive" || sentiment === "pos" || sentiment.includes("positive")) {
          score += 30;
          hasAnySignal = true;
        } else if (sentiment === "neutral" || sentiment.includes("neutral")) {
          score += 15;
          hasAnySignal = true;
        } else if (sentiment === "negative" || sentiment === "neg" || sentiment.includes("negative")) {
          score -= 10;
          hasAnySignal = true;
        }
        const classification = (callData.classification || "").trim().toLowerCase();
        if (classification === "hot" || classification === "interested" || classification === "qualified" || classification.includes("hot") || classification.includes("interested")) {
          score += 25;
          hasAnySignal = true;
        } else if (classification === "warm" || classification.includes("warm")) {
          score += 15;
          hasAnySignal = true;
        } else if (classification === "neutral" || classification.includes("neutral")) {
          score += 5;
          hasAnySignal = true;
        } else if (classification === "cold" || classification === "not_interested" || classification.includes("cold") || classification.includes("not interested")) {
          score -= 10;
          hasAnySignal = true;
        }
        if (callData.duration) {
          if (callData.duration >= 180) {
            score += 20;
            hasAnySignal = true;
          } else if (callData.duration >= 120) {
            score += 15;
            hasAnySignal = true;
          } else if (callData.duration >= 60) {
            score += 10;
            hasAnySignal = true;
          } else if (callData.duration >= 30) {
            score += 5;
            hasAnySignal = true;
          }
        }
        if (callData.transcript && callData.transcript.trim().length > 50) {
          score += 10;
          hasAnySignal = true;
        }
        if (callData.aiSummary && callData.aiSummary.trim().length > 20) {
          score += 5;
          hasAnySignal = true;
        }
        if (!hasAnySignal) {
          score = 25;
        }
        return Math.max(0, Math.min(100, score));
      }
      /**
       * Check if appointment was booked during the call
       */
      static checkAppointmentBooked(callData, metadata) {
        if (metadata.appointmentBooked === true) return true;
        if (metadata.hasAppointment === true) return true;
        const aiInsights = metadata.aiInsights;
        if (aiInsights?.primaryOutcome === "appointment_booked") return true;
        if (aiInsights?.appointmentBooked === true) return true;
        if (metadata.appointmentDetails || metadata.appointmentData) return true;
        if (callData.aiSummary) {
          const summary = callData.aiSummary.toLowerCase();
          if (summary.includes("appointment scheduled") || summary.includes("meeting booked") || summary.includes("appointment booked") || summary.includes("scheduled for") || summary.includes("meeting scheduled") || summary.includes("scheduled a meeting") || summary.includes("scheduled an appointment") || /(?:scheduled|booked)\s+(?:[a-zA-Z0-9-]+\s+){0,10}(?:meeting|appointment)/i.test(summary) || /(?:meeting|appointment)\s+(?:[a-zA-Z0-9-]+\s+){0,10}(?:scheduled|booked)/i.test(summary)) {
            return true;
          }
        }
        return false;
      }
      static async checkAppointmentInDatabase(callData) {
        try {
          const formatAppt = (appt, matchedBy) => {
            console.log(`${this.LOG_PREFIX} Found appointment ${appt.id} in database for call ${callData.id} (matched by: ${matchedBy})`);
            return {
              appointmentId: appt.id,
              contactName: appt.contactName,
              contactPhone: appt.contactPhone,
              date: appt.appointmentDate,
              time: appt.appointmentTime,
              bookedAt: appt.createdAt?.toISOString()
            };
          };
          const byCallId = await db.select().from(appointments).where(eq13(appointments.callId, callData.id)).limit(1);
          if (byCallId.length > 0) {
            return formatAppt(byCallId[0], "callId");
          }
          const conversationId = callData.metadata?.elevenLabsConversationId || callData.metadata?.conversationId || callData.metadata?.webhookMetadata?.conversation_id;
          if (conversationId) {
            try {
              const byConversationId = await db.select().from(appointments).where(and7(
                eq13(appointments.userId, callData.userId),
                sql17`${appointments.createdAt} > NOW() - INTERVAL '30 minutes'`,
                sql17`(${appointments.metadata}->>'elevenLabsConversationId' = ${conversationId} OR ${appointments.metadata}->>'conversationId' = ${conversationId})`
              )).limit(1);
              if (byConversationId.length > 0) {
                return formatAppt(byConversationId[0], `conversationId(${conversationId})`);
              }
            } catch (convErr) {
              console.warn(`${this.LOG_PREFIX} Conversation ID appointment lookup failed: ${convErr.message}`);
            }
          }
          const phone = callData.phoneNumber || callData.fromNumber || callData.toNumber;
          if (!phone) return null;
          const normalizedPhone = phone.replace(/\D/g, "").slice(-10);
          if (normalizedPhone.length < 7) return null;
          const byPhone = await db.select().from(appointments).where(and7(
            eq13(appointments.userId, callData.userId),
            sql17`${appointments.createdAt} > NOW() - INTERVAL '30 minutes'`,
            sql17`RIGHT(REGEXP_REPLACE(${appointments.contactPhone}, '[^0-9]', '', 'g'), 10) = ${normalizedPhone}`
          )).limit(1);
          if (byPhone.length > 0) {
            return formatAppt(byPhone[0], `userId+phone(${normalizedPhone})`);
          }
          return null;
        } catch (error) {
          console.warn(`${this.LOG_PREFIX} Appointment DB check failed for call ${callData.id}: ${error.message}`);
          return null;
        }
      }
      /**
       * Check if form was submitted during the call
       */
      static checkFormSubmitted(callData, metadata) {
        if (metadata.formSubmitted === true) return true;
        if (metadata.hasFormSubmission === true) return true;
        const aiInsights = metadata.aiInsights;
        if (aiInsights?.primaryOutcome === "form_submitted") return true;
        if (aiInsights?.formSubmitted === true) return true;
        if (metadata.formData || metadata.collectedData) return true;
        if (aiInsights?.formData || aiInsights?.collectedData) return true;
        return false;
      }
      /**
       * Check if call needs follow-up
       */
      static checkNeedsFollowUp(callData, aiInsights) {
        const classification = (callData.classification || "").toLowerCase();
        if (classification === "follow_up" || classification === "callback") return true;
        if (aiInsights.needsFollowUp === true) return true;
        if (aiInsights.followUpRequired === true) return true;
        if (aiInsights.callbackRequested === true) return true;
        const nextAction = aiInsights.aiNextAction || aiInsights.nextAction || "";
        if (nextAction.toLowerCase().includes("follow") || nextAction.toLowerCase().includes("callback") || nextAction.toLowerCase().includes("call back")) {
          return true;
        }
        return false;
      }
      /**
       * Extract appointment data from metadata
       */
      static extractAppointmentData(metadata) {
        return metadata.appointmentDetails || metadata.appointmentData || metadata.aiInsights?.appointmentDetails;
      }
      /**
       * Extract form data from metadata
       */
      static extractFormData(metadata) {
        return metadata.formData || metadata.collectedData || metadata.aiInsights?.formData || metadata.aiInsights?.collectedData;
      }
      /**
       * Find existing lead for a call
       * Respects campaign/incoming scope to prevent collapsing different campaigns' leads
       */
      static async findExistingLead(callData) {
        const phoneNumber = this.resolveLeadPhone(callData);
        const hasValidPhone = phoneNumber && phoneNumber !== "Unknown";
        if (callData.engine === "elevenlabs-twilio") {
          const [existingByCallId] = await db.select().from(leads).where(and7(
            eq13(leads.userId, callData.userId),
            eq13(leads.callId, callData.id)
          )).limit(1);
          if (existingByCallId) return existingByCallId;
        }
        if (callData.campaignId && hasValidPhone) {
          const [existingByCampaign] = await db.select().from(leads).where(and7(
            eq13(leads.userId, callData.userId),
            eq13(leads.phone, phoneNumber),
            eq13(leads.campaignId, callData.campaignId)
          )).limit(1);
          if (existingByCampaign) return existingByCampaign;
        }
        if (callData.incomingConnectionId && hasValidPhone) {
          const [existingByConnection] = await db.select().from(leads).where(and7(
            eq13(leads.userId, callData.userId),
            eq13(leads.phone, phoneNumber),
            eq13(leads.incomingConnectionId, callData.incomingConnectionId)
          )).limit(1);
          if (existingByConnection) return existingByConnection;
        }
        if (hasValidPhone && !callData.campaignId) {
          const [existingByPhone] = await db.select().from(leads).where(and7(
            eq13(leads.userId, callData.userId),
            eq13(leads.phone, phoneNumber),
            eq13(leads.sourceType, "incoming")
          )).limit(1);
          return existingByPhone || null;
        }
        return null;
      }
      /**
       * Create a lead from call data
       */
      static async createLeadFromCall(callData, qualification) {
        const phoneNumber = this.resolveLeadPhone(callData);
        const sourceType = callData.campaignId ? "campaign" : "incoming";
        const leadData = {
          userId: callData.userId,
          sourceType,
          campaignId: callData.campaignId || null,
          incomingConnectionId: callData.incomingConnectionId || null,
          phone: phoneNumber,
          firstName: callData.firstName || null,
          lastName: callData.lastName || null,
          email: callData.email || null,
          company: callData.company || null,
          stage: "new",
          leadScore: qualification.score,
          aiSummary: callData.aiSummary,
          aiNextAction: this.generateNextAction(qualification),
          sentiment: callData.sentiment,
          aiCategory: qualification.category,
          hasAppointment: qualification.hasAppointment,
          hasFormSubmission: qualification.hasFormSubmission,
          hasTransfer: qualification.hasTransfer,
          hasCallback: qualification.hasCallback,
          appointmentDetails: qualification.appointmentData,
          formData: qualification.formData,
          transferredTo: callData.transferredTo,
          transferredAt: callData.wasTransferred ? /* @__PURE__ */ new Date() : null,
          callId: callData.engine === "elevenlabs-twilio" ? callData.id : null,
          plivoCallId: callData.engine === "plivo-openai" ? callData.id : null,
          twilioOpenaiCallId: callData.engine === "twilio-openai" ? callData.id : null,
          sipCallId: callData.engine === "elevenlabs-sip" || callData.engine === "openai-sip" ? callData.id : null,
          veSessionId: callData.engine === "custom-voice-engine" ? callData.id : null
        };
        return CRMStorage.createLead(leadData);
      }
      /**
       * Update an existing lead with new call data and qualification
       */
      static async updateExistingLead(existingLead, callData, qualification) {
        const updates = {};
        if (callData.firstName && !existingLead.firstName) {
          updates.firstName = callData.firstName;
        }
        if (callData.lastName && !existingLead.lastName) {
          updates.lastName = callData.lastName;
        }
        if (callData.email && !existingLead.email) {
          updates.email = callData.email;
        }
        if (callData.company && !existingLead.company) {
          updates.company = callData.company;
        }
        if (qualification.score > (existingLead.leadScore || 0)) {
          updates.leadScore = qualification.score;
        }
        const actionCategories = [
          AI_LEAD_CATEGORIES.APPOINTMENT_BOOKED,
          AI_LEAD_CATEGORIES.FORM_SUBMITTED,
          AI_LEAD_CATEGORIES.CALL_TRANSFER,
          AI_LEAD_CATEGORIES.NEED_FOLLOW_UP
        ];
        const sentimentCategories = [
          AI_LEAD_CATEGORIES.HOT,
          AI_LEAD_CATEGORIES.WARM,
          AI_LEAD_CATEGORIES.NEUTRAL,
          AI_LEAD_CATEGORIES.COLD
        ];
        const isNewCategoryAction = qualification.category && actionCategories.includes(qualification.category);
        const isExistingCategorySentiment = !existingLead.aiCategory || sentimentCategories.includes(existingLead.aiCategory);
        if (qualification.category && (isNewCategoryAction || isExistingCategorySentiment)) {
          updates.aiCategory = qualification.category;
          updates.aiNextAction = this.generateNextAction(qualification);
        }
        if (qualification.hasAppointment && !existingLead.hasAppointment) {
          updates.hasAppointment = true;
          if (qualification.appointmentData) {
            updates.appointmentDetails = qualification.appointmentData;
          }
        }
        if (qualification.hasFormSubmission && !existingLead.hasFormSubmission) {
          updates.hasFormSubmission = true;
          if (qualification.formData) {
            updates.formData = qualification.formData;
          }
        }
        if (qualification.hasTransfer && !existingLead.hasTransfer) {
          updates.hasTransfer = true;
          if (callData.transferredTo) {
            updates.transferredTo = callData.transferredTo;
            updates.transferredAt = /* @__PURE__ */ new Date();
          }
        }
        if (qualification.hasCallback && !existingLead.hasCallback) {
          updates.hasCallback = true;
        }
        if (callData.aiSummary) {
          updates.aiSummary = callData.aiSummary;
        }
        if (callData.sentiment) {
          updates.sentiment = callData.sentiment;
        }
        if (!existingLead.campaignId && callData.campaignId) {
          updates.campaignId = callData.campaignId;
          updates.sourceType = "campaign";
        }
        if (!existingLead.incomingConnectionId && callData.incomingConnectionId) {
          updates.incomingConnectionId = callData.incomingConnectionId;
        }
        if (callData.engine === "elevenlabs-twilio") {
          updates.callId = callData.id;
        } else if (callData.engine === "plivo-openai") {
          updates.plivoCallId = callData.id;
        } else if (callData.engine === "twilio-openai") {
          updates.twilioOpenaiCallId = callData.id;
        } else if (callData.engine === "elevenlabs-sip" || callData.engine === "openai-sip") {
          updates.sipCallId = callData.id;
        } else if (callData.engine === "custom-voice-engine") {
          updates.veSessionId = callData.id;
        }
        updates.totalCalls = (existingLead.totalCalls || 0) + 1;
        updates.lastCallAt = /* @__PURE__ */ new Date();
        return CRMStorage.updateLead(existingLead.id, callData.userId, updates);
      }
      /**
       * Generate suggested next action based on qualification
       */
      static generateNextAction(qualification) {
        if (qualification.hasAppointment) {
          return "Confirm appointment details and send reminder";
        }
        if (qualification.hasFormSubmission) {
          return "Review submitted form data and follow up";
        }
        if (qualification.hasTransfer) {
          return "Review call transfer outcome with agent";
        }
        if (qualification.hasCallback) {
          return "Schedule follow-up call";
        }
        if (qualification.category === AI_LEAD_CATEGORIES.HOT) {
          return "High priority - contact immediately";
        }
        if (qualification.category === AI_LEAD_CATEGORIES.WARM) {
          return "Nurture lead with relevant content";
        }
        if (qualification.category === AI_LEAD_CATEGORIES.NEUTRAL) {
          return "Monitor lead engagement and follow up if needed";
        }
        if (qualification.category === AI_LEAD_CATEGORIES.COLD) {
          return "Low priority - add to re-engagement campaign";
        }
        return "Review call and determine next steps";
      }
      /**
       * Process a call from the ElevenLabs-Twilio engine (calls table)
       */
      static async processElevenLabsTwilioCall(callId) {
        const [call] = await db.select().from(calls).where(eq13(calls.id, callId)).limit(1);
        if (!call || !call.userId) {
          console.log(`${this.LOG_PREFIX} Call not found or no user: ${callId}`);
          return null;
        }
        if (call.status !== "completed" && call.status !== "done") {
          console.log(`${this.LOG_PREFIX} Call ${callId} not completed (status: ${call.status})`);
          return null;
        }
        const elevenLabsMetadata = call.metadata || {};
        const elevenLabsAiInsights = elevenLabsMetadata.aiInsights || this.parseAiSummaryAsInsights(call.aiSummary);
        const callData = {
          id: call.id,
          userId: call.userId,
          phoneNumber: call.phoneNumber || "",
          fromNumber: call.fromNumber,
          toNumber: call.toNumber,
          callDirection: call.callDirection,
          status: call.status,
          duration: call.duration,
          transcript: call.transcript,
          aiSummary: call.aiSummary,
          sentiment: call.sentiment,
          classification: call.classification,
          wasTransferred: call.wasTransferred || false,
          transferredTo: call.transferredTo,
          campaignId: call.campaignId,
          incomingConnectionId: call.incomingConnectionId,
          metadata: {
            ...elevenLabsMetadata,
            // Also include the dedicated conversation ID column for appointment matching
            ...call.elevenLabsConversationId ? { elevenLabsConversationId: call.elevenLabsConversationId } : {}
          },
          aiInsights: elevenLabsAiInsights,
          // ElevenLabs stores insights in metadata
          engine: "elevenlabs-twilio"
        };
        return this.processCall(callData);
      }
      /**
       * Process a call from the Plivo+OpenAI engine (plivo_calls table)
       */
      static async processPlivoOpenAICall(callId) {
        const [call] = await db.select().from(plivoCalls).where(eq13(plivoCalls.id, callId)).limit(1);
        if (!call || !call.userId) {
          console.log(`${this.LOG_PREFIX} Plivo call not found or no user: ${callId}`);
          return null;
        }
        if (call.status !== "completed" && call.status !== "done") {
          console.log(`${this.LOG_PREFIX} Plivo call ${callId} not completed (status: ${call.status})`);
          return null;
        }
        const plivoMetadata = call.metadata || {};
        const plivoAiInsights = plivoMetadata.aiInsights || this.parseAiSummaryAsInsights(call.aiSummary);
        const callData = {
          id: call.id,
          userId: call.userId,
          phoneNumber: call.fromNumber || call.toNumber || "",
          fromNumber: call.fromNumber,
          toNumber: call.toNumber,
          callDirection: call.callDirection,
          status: call.status,
          duration: call.duration,
          transcript: call.transcript,
          aiSummary: call.aiSummary,
          sentiment: call.sentiment,
          classification: call.classification,
          wasTransferred: call.wasTransferred || false,
          transferredTo: call.transferredTo,
          campaignId: call.campaignId,
          incomingConnectionId: null,
          // Plivo uses plivoPhoneNumberId instead
          metadata: plivoMetadata,
          aiInsights: plivoAiInsights,
          engine: "plivo-openai"
        };
        return this.processCall(callData);
      }
      /**
       * Process a call from the Twilio+OpenAI engine (twilio_openai_calls table)
       */
      static async processTwilioOpenAICall(callId) {
        const [call] = await db.select().from(twilioOpenaiCalls).where(eq13(twilioOpenaiCalls.id, callId)).limit(1);
        if (!call || !call.userId) {
          console.log(`${this.LOG_PREFIX} Twilio-OpenAI call not found or no user: ${callId}`);
          return null;
        }
        if (call.status !== "completed" && call.status !== "done") {
          console.log(`${this.LOG_PREFIX} Twilio-OpenAI call ${callId} not completed (status: ${call.status})`);
          return null;
        }
        const twilioMetadata = call.metadata || {};
        const twilioAiInsights = twilioMetadata.aiInsights || this.parseAiSummaryAsInsights(call.aiSummary);
        const callData = {
          id: call.id,
          userId: call.userId,
          phoneNumber: call.fromNumber || call.toNumber || "",
          fromNumber: call.fromNumber,
          toNumber: call.toNumber,
          callDirection: call.callDirection,
          status: call.status,
          duration: call.duration,
          transcript: call.transcript,
          aiSummary: call.aiSummary,
          sentiment: call.sentiment,
          classification: call.classification,
          wasTransferred: call.wasTransferred || false,
          transferredTo: call.transferredTo,
          campaignId: call.campaignId,
          incomingConnectionId: null,
          // Twilio-OpenAI uses twilioPhoneNumberId instead
          metadata: twilioMetadata,
          aiInsights: twilioAiInsights,
          engine: "twilio-openai"
        };
        return this.processCall(callData);
      }
      /**
       * Process a call from the SIP engine (sip_calls table)
       */
      static async processSipCall(callId) {
        const [call] = await db.select().from(sipCalls).where(eq13(sipCalls.id, callId)).limit(1);
        if (!call || !call.userId) {
          console.log(`${this.LOG_PREFIX} SIP call not found or no user: ${callId}`);
          return null;
        }
        if (call.status !== "completed" && call.status !== "done") {
          console.log(`${this.LOG_PREFIX} SIP call ${callId} not completed (status: ${call.status})`);
          return null;
        }
        const sipMetadata = call.metadata || {};
        const sipAiInsights = sipMetadata.aiInsights || this.parseAiSummaryAsInsights(call.aiSummary);
        const callData = {
          id: call.id,
          userId: call.userId,
          phoneNumber: call.direction === "inbound" ? call.fromNumber || "" : call.toNumber || "",
          fromNumber: call.fromNumber,
          toNumber: call.toNumber,
          callDirection: call.direction === "inbound" ? "incoming" : "outgoing",
          status: call.status || "completed",
          duration: call.durationSeconds,
          transcript: call.transcript ? typeof call.transcript === "string" ? call.transcript : JSON.stringify(call.transcript) : null,
          aiSummary: call.aiSummary,
          sentiment: call.sentiment,
          classification: call.classification,
          wasTransferred: false,
          transferredTo: null,
          campaignId: call.campaignId,
          incomingConnectionId: null,
          metadata: sipMetadata,
          aiInsights: sipAiInsights,
          engine: call.engine || "elevenlabs-sip"
        };
        return this.processCall(callData);
      }
      /**
       * Process a call from the Custom Voice Engine (ve_sessions table)
       */
      static async processCustomVoiceEngineCall(sessionId) {
        try {
          const result = await db.execute(sql17`
        SELECT * FROM ve_sessions WHERE id = ${sessionId} LIMIT 1
      `);
          const call = result.rows[0];
          if (!call || !call.user_id) {
            console.log(`${this.LOG_PREFIX} Custom Voice Engine session not found or no user: ${sessionId}`);
            return null;
          }
          if (call.status !== "completed" && call.status !== "done") {
            console.log(`${this.LOG_PREFIX} Custom Voice Engine session ${sessionId} not completed (status: ${call.status})`);
            return null;
          }
          const metadata = (typeof call.metadata === "string" ? JSON.parse(call.metadata) : call.metadata) || {};
          const turns = typeof call.transcript === "string" ? JSON.parse(call.transcript) : call.transcript || [];
          const transcriptText = Array.isArray(turns) ? turns.map((t) => `${t.role === "assistant" ? "Agent" : "Customer"}: ${t.content || t.message || ""}`).join("\n") : "";
          let aiSummary = call.ai_summary;
          let sentiment = call.sentiment;
          let classification = call.classification;
          let extractedFirstName = null;
          let extractedLastName = null;
          let extractedEmail = null;
          let extractedCompany = null;
          if (transcriptText.trim().length > 0) {
            try {
              const dbApiKey = await db.execute(sql17`
            SELECT value FROM global_settings WHERE key = 'openai_api_key' LIMIT 1
          `);
              const apiKey = dbApiKey.rows[0]?.value || process.env.OPENAI_API_KEY;
              if (apiKey) {
                const { default: OpenAI2 } = await import("openai");
                const openai = new OpenAI2({ apiKey });
                const prompt = `You are an AI assistant analyzing a call transcript between an agent and a customer.
Analyze the transcript and extract the following details.

TRANSCRIPT:
${transcriptText}

Respond ONLY with a valid JSON object in this exact format:
{
  "summary": "2-3 sentence summary of the call",
  "sentiment": "positive" | "neutral" | "negative",
  "classification": "hot" | "warm" | "cold" | "lost",
  "extractedFirstName": "extracted customer first name or null if not mentioned",
  "extractedLastName": "extracted customer last name or null if not mentioned",
  "extractedEmail": "extracted customer email address or null if not mentioned",
  "extractedCompany": "extracted customer company name or null if not mentioned"
}

Classification Guide:
- "hot": Customer showed strong interest, ready to buy/proceed
- "warm": Customer showed moderate interest, needs follow-up
- "cold": Customer showed little interest, unlikely to convert
- "lost": Customer explicitly declined or hung up early

Return ONLY the JSON object. No explanation, no markdown formatting.`;
                const response = await openai.chat.completions.create({
                  model: "gpt-4o-mini",
                  messages: [{ role: "user", content: prompt }],
                  response_format: { type: "json_object" },
                  temperature: 0.2,
                  max_tokens: 500
                });
                const content = response.choices[0]?.message?.content;
                if (content) {
                  const result2 = JSON.parse(content);
                  aiSummary = result2.summary || aiSummary;
                  sentiment = result2.sentiment || sentiment;
                  classification = result2.classification || classification;
                  extractedFirstName = result2.extractedFirstName || null;
                  extractedLastName = result2.extractedLastName || null;
                  extractedEmail = result2.extractedEmail || null;
                  extractedCompany = result2.extractedCompany || null;
                  console.log(`\u{1F4BC} [CRM Lead Processor] Extracted call details: Summary="${aiSummary}", Classification="${classification}", Company="${extractedCompany}"`);
                }
              }
            } catch (err) {
              console.error("\u{1F4BC} [CRM Lead Processor] Error analyzing transcript with OpenAI:", err.message);
            }
          }
          if (aiSummary !== call.ai_summary || sentiment !== call.sentiment || classification !== call.classification) {
            try {
              await db.execute(sql17`
            UPDATE ve_sessions
            SET ai_summary = ${aiSummary},
                sentiment = ${sentiment},
                classification = ${classification},
                updated_at = NOW()
            WHERE id = ${sessionId}
          `);
            } catch (updateErr) {
              console.error("\u{1F4BC} [CRM Lead Processor] Failed to update ve_sessions with AI analysis:", updateErr.message);
            }
          }
          const aiInsights = metadata.aiInsights || this.parseAiSummaryAsInsights(aiSummary);
          const callData = {
            id: call.id,
            userId: call.user_id,
            phoneNumber: call.direction === "inbound" ? call.from_number || "" : call.to_number || "",
            fromNumber: call.from_number,
            toNumber: call.to_number,
            callDirection: call.direction === "inbound" ? "incoming" : "outgoing",
            status: call.status || "completed",
            duration: call.duration_seconds,
            transcript: call.transcript ? typeof call.transcript === "string" ? call.transcript : JSON.stringify(call.transcript) : null,
            aiSummary,
            sentiment,
            classification,
            firstName: extractedFirstName,
            lastName: extractedLastName,
            email: extractedEmail,
            company: extractedCompany,
            wasTransferred: false,
            transferredTo: null,
            campaignId: null,
            incomingConnectionId: null,
            metadata,
            aiInsights,
            engine: "custom-voice-engine"
          };
          return this.processCall(callData);
        } catch (error) {
          console.error(`${this.LOG_PREFIX} Error processing Custom Voice Engine session ${sessionId}:`, error.message);
          return null;
        }
      }
      /**
       * Parse AI summary as insights if it's a JSON string
       */
      static parseAiSummaryAsInsights(aiSummary) {
        if (!aiSummary) return null;
        try {
          const parsed = JSON.parse(aiSummary);
          if (typeof parsed === "object" && parsed !== null) {
            return parsed;
          }
        } catch {
        }
        return null;
      }
      /**
       * Update the call record's classification in the database to align with the CRM lead category.
       */
      static async updateCallClassification(callId, engine, category) {
        try {
          console.log(`[CRM Lead Processor] Updating call classification for call ${callId} to: ${category} (engine: ${engine})`);
          if (engine === "elevenlabs-twilio") {
            await db.update(calls).set({ classification: category }).where(eq13(calls.id, callId));
          } else if (engine === "plivo-openai") {
            await db.update(plivoCalls).set({ classification: category }).where(eq13(plivoCalls.id, callId));
          } else if (engine === "twilio-openai") {
            await db.update(twilioOpenaiCalls).set({ classification: category }).where(eq13(twilioOpenaiCalls.id, callId));
          } else if (engine === "elevenlabs-sip" || engine === "openai-sip") {
            await db.update(sipCalls).set({ classification: category }).where(eq13(sipCalls.id, callId));
          } else if (engine === "custom-voice-engine") {
            await db.execute(sql17`
          UPDATE ve_sessions
          SET classification = ${category}
          WHERE id = ${callId}
        `);
          }
        } catch (error) {
          console.error(`[CRM Lead Processor] Failed to update call classification for call ${callId}:`, error);
        }
      }
    };
    lead_processor_service_default = CRMLeadProcessor;
  }
});

// plugins/custom-voice-engine/index.ts
init_db();
init_schema();
import { sql as sql19, eq as eq14 } from "drizzle-orm";

// plugins/custom-voice-engine/services/providers/tts/deepgram-tts.provider.ts
import axios from "axios";

// plugins/custom-voice-engine/services/providers/tts/tts-provider.interface.ts
var BaseTtsProvider = class {
};

// plugins/custom-voice-engine/services/providers/http-agent.ts
import http from "http";
import https from "https";
var httpKeepAliveAgent = new http.Agent({
  keepAlive: true,
  keepAliveMsecs: 3e4,
  maxSockets: 50,
  maxFreeSockets: 10
});
var httpsKeepAliveAgent = new https.Agent({
  keepAlive: true,
  keepAliveMsecs: 3e4,
  maxSockets: 50,
  maxFreeSockets: 10
});
var keepAliveAxiosConfig = {
  httpAgent: httpKeepAliveAgent,
  httpsAgent: httpsKeepAliveAgent
};

// plugins/custom-voice-engine/services/providers/tts/deepgram-tts.provider.ts
var DEEPGRAM_TTS_URL = "https://api.deepgram.com/v1/speak";
var DeepgramTtsProvider = class extends BaseTtsProvider {
  name = "deepgram";
  async synthesize(text2, config) {
    let model = config.voice || config.deepgramModel || "aura-asteria-en";
    if (model === "aura-2") model = "aura-2-asteria-en";
    if (model === "aura") model = "aura-asteria-en";
    const params = new URLSearchParams({
      model
    });
    const encoding = config.outputFormat?.encoding || "linear16";
    const sampleRate = config.outputFormat?.sampleRate || 8e3;
    if (encoding === "linear16") {
      params.set("encoding", "linear16");
      params.set("sample_rate", String(sampleRate));
      params.set("container", "none");
    } else if (encoding === "mulaw") {
      params.set("encoding", "mulaw");
      params.set("sample_rate", String(sampleRate));
      params.set("container", "none");
    } else if (encoding === "alaw") {
      params.set("encoding", "alaw");
      params.set("sample_rate", String(sampleRate));
      params.set("container", "none");
    }
    const response = await axios.post(
      `${DEEPGRAM_TTS_URL}?${params.toString()}`,
      { text: text2 },
      {
        ...keepAliveAxiosConfig,
        headers: {
          Authorization: `Token ${config.apiKey}`,
          "Content-Type": "application/json"
        },
        responseType: "arraybuffer",
        timeout: 3e4
      }
    );
    return Buffer.from(response.data);
  }
  async *synthesizeStream(text2, config) {
    let model = config.voice || config.deepgramModel || "aura-asteria-en";
    if (model === "aura-2") model = "aura-2-asteria-en";
    if (model === "aura") model = "aura-asteria-en";
    const sampleRate = config.outputFormat?.sampleRate || 8e3;
    const encoding = config.outputFormat?.encoding || "linear16";
    const params = new URLSearchParams({
      model,
      encoding: encoding === "mulaw" ? "mulaw" : encoding === "alaw" ? "alaw" : "linear16",
      sample_rate: String(sampleRate),
      container: "none"
    });
    const response = await axios.post(
      `${DEEPGRAM_TTS_URL}?${params.toString()}`,
      { text: text2 },
      {
        ...keepAliveAxiosConfig,
        headers: {
          Authorization: `Token ${config.apiKey}`,
          "Content-Type": "application/json"
        },
        responseType: "stream",
        timeout: 3e4
      }
    );
    const stream = response.data;
    const chunkSize = 640;
    let buffer = Buffer.alloc(0);
    for await (const data of stream) {
      const chunk = Buffer.isBuffer(data) ? data : Buffer.from(data);
      buffer = Buffer.concat([buffer, chunk]);
      while (buffer.length >= chunkSize) {
        yield buffer.subarray(0, chunkSize);
        buffer = buffer.subarray(chunkSize);
      }
    }
    if (buffer.length > 0) {
      yield buffer;
    }
  }
};

// plugins/custom-voice-engine/services/providers/tts/sarvam-tts.provider.ts
import axios2 from "axios";
import WebSocket from "ws";
var SARVAM_API_BASE = "https://api.sarvam.ai";
var SarvamTtsProvider = class extends BaseTtsProvider {
  name = "sarvam";
  async synthesize(text2, config) {
    const language = config.language || "en-IN";
    const speaker = config.sarvamSpeaker || config.voice || "meera";
    const model = config.sarvamModel || "bulbul:v3";
    console.log(`[TTS:Sarvam] Synthesizing (REST): speaker="${speaker}" model="${model}" lang="${language}" sampleRate=${config.outputFormat?.sampleRate || 8e3}`);
    try {
      const response = await axios2.post(
        `${SARVAM_API_BASE}/text-to-speech`,
        {
          inputs: [text2],
          target_language_code: this.mapLanguage(language),
          speaker,
          model,
          pace: config.speed || 1.15,
          // Increased from 1.0 to 1.15 for a more natural speed
          speech_sample_rate: config.outputFormat?.sampleRate || 8e3,
          enable_preprocessing: true
        },
        {
          ...keepAliveAxiosConfig,
          headers: {
            "API-Subscription-Key": config.apiKey,
            "Content-Type": "application/json"
          },
          timeout: 3e4
        }
      );
      if (response.data?.audios?.[0]) {
        return Buffer.from(response.data.audios[0], "base64");
      }
      console.error(`[TTS:Sarvam] No audio in response:`, JSON.stringify(response.data));
      throw new Error(`Sarvam TTS returned no audio data (speaker="${speaker}", model="${model}")`);
    } catch (err) {
      if (err.response?.data) {
        console.error(`[TTS:Sarvam] API error response:`, JSON.stringify(err.response.data, null, 2));
      }
      console.error(`[TTS:Sarvam] Request body:`, JSON.stringify({
        inputs: [text2],
        target_language_code: this.mapLanguage(language),
        speaker,
        model,
        pitch: config.pitch || 0,
        pace: config.speed || 1.15,
        loudness: 1.5,
        speech_sample_rate: config.outputFormat?.sampleRate || 8e3,
        enable_preprocessing: true
      }));
      throw err;
    }
  }
  async *synthesizeStream(text2, config) {
    const language = config.language || "en-IN";
    const speaker = config.sarvamSpeaker || config.voice || "meera";
    const model = config.sarvamModel || "bulbul:v3";
    const url = `wss://api.sarvam.ai/text-to-speech/ws?model=${model}&send_completion_event=true`;
    console.log(`[TTS:Sarvam] Connecting WebSocket to URL: ${url}`);
    const ws = new WebSocket(url, {
      headers: {
        "api-subscription-key": config.apiKey
      }
    });
    const queue = [];
    let resolveNext = null;
    ws.on("open", () => {
      ws.send(JSON.stringify({
        type: "config",
        data: {
          target_language_code: this.mapLanguage(language),
          speaker
        }
      }));
      ws.send(JSON.stringify({
        type: "text",
        data: {
          text: text2
        }
      }));
    });
    ws.on("message", (data) => {
      try {
        const response = JSON.parse(data.toString());
        if (response.type === "audio" && response.data?.audio) {
          const audioBuffer = Buffer.from(response.data.audio, "base64");
          queue.push(audioBuffer);
          if (resolveNext) {
            resolveNext();
            resolveNext = null;
          }
        } else if (response.type === "completion") {
          queue.push("done");
          if (resolveNext) {
            resolveNext();
            resolveNext = null;
          }
          ws.close();
        }
      } catch (err) {
        console.error(`[TTS:Sarvam] Failed to parse WebSocket message:`, err.message);
      }
    });
    ws.on("error", (err) => {
      console.error(`[TTS:Sarvam] WebSocket error:`, err.message);
      queue.push(err);
      if (resolveNext) {
        resolveNext();
        resolveNext = null;
      }
    });
    ws.on("close", () => {
      if (!queue.includes("done") && !queue.some((item) => item instanceof Error)) {
        queue.push("done");
        if (resolveNext) {
          resolveNext();
          resolveNext = null;
        }
      }
    });
    try {
      while (true) {
        if (queue.length === 0) {
          await new Promise((resolve) => {
            resolveNext = resolve;
          });
        }
        const next = queue.shift();
        if (next === "done") {
          break;
        }
        if (next instanceof Error) {
          throw next;
        }
        if (next) {
          yield next;
        }
      }
    } finally {
      if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
        ws.close();
      }
    }
  }
  mapLanguage(lang) {
    if (lang.includes("-")) return lang;
    const langMap = {
      en: "en-IN",
      hi: "hi-IN",
      ta: "ta-IN",
      te: "te-IN",
      kn: "kn-IN",
      ml: "ml-IN",
      mr: "mr-IN",
      gu: "gu-IN",
      bn: "bn-IN",
      pa: "pa-IN",
      or: "od-IN"
    };
    return langMap[lang] || "en-IN";
  }
};

// plugins/custom-voice-engine/services/providers/tts/elevenlabs-tts.provider.ts
import axios3 from "axios";
var ELEVENLABS_API_BASE = "https://api.elevenlabs.io/v1";
var ElevenLabsTtsProvider = class extends BaseTtsProvider {
  name = "elevenlabs";
  async synthesize(text2, config) {
    const voiceId = config.voice || "21m00Tcm4TlvDq8ikWAM";
    const model = config.deepgramModel || "eleven_turbo_v2_5";
    const sampleRate = config.outputFormat?.sampleRate || 8e3;
    const outputFormat = `pcm_${sampleRate}`;
    console.log(`[TTS:ElevenLabs] Synthesizing full audio: voiceId="${voiceId}" model="${model}" outputFormat="${outputFormat}"`);
    try {
      const response = await axios3.post(
        `${ELEVENLABS_API_BASE}/text-to-speech/${voiceId}?output_format=${outputFormat}`,
        {
          text: text2,
          model_id: model,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75
          }
        },
        {
          ...keepAliveAxiosConfig,
          headers: {
            "xi-api-key": config.apiKey,
            "Content-Type": "application/json"
          },
          responseType: "arraybuffer",
          timeout: 3e4
        }
      );
      return Buffer.from(response.data);
    } catch (err) {
      if (err.response?.data) {
        const errText = Buffer.isBuffer(err.response.data) ? err.response.data.toString() : JSON.stringify(err.response.data);
        console.error(`[TTS:ElevenLabs] API error response:`, errText);
      }
      throw err;
    }
  }
  async *synthesizeStream(text2, config) {
    const voiceId = config.voice || "21m00Tcm4TlvDq8ikWAM";
    const model = config.deepgramModel || "eleven_turbo_v2_5";
    const sampleRate = config.outputFormat?.sampleRate || 8e3;
    const outputFormat = `pcm_${sampleRate}`;
    console.log(`[TTS:ElevenLabs] Synthesizing stream: voiceId="${voiceId}" model="${model}" outputFormat="${outputFormat}"`);
    const response = await axios3.post(
      `${ELEVENLABS_API_BASE}/text-to-speech/${voiceId}/stream?output_format=${outputFormat}`,
      {
        text: text2,
        model_id: model,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75
        }
      },
      {
        ...keepAliveAxiosConfig,
        headers: {
          "xi-api-key": config.apiKey,
          "Content-Type": "application/json"
        },
        responseType: "stream",
        timeout: 3e4
      }
    );
    const stream = response.data;
    const bytesPerSecond = sampleRate * 2;
    const chunkSize = Math.floor(bytesPerSecond * 0.04);
    let buffer = Buffer.alloc(0);
    for await (const data of stream) {
      const chunk = Buffer.isBuffer(data) ? data : Buffer.from(data);
      buffer = Buffer.concat([buffer, chunk]);
      while (buffer.length >= chunkSize) {
        yield buffer.subarray(0, chunkSize);
        buffer = buffer.subarray(chunkSize);
      }
    }
    if (buffer.length > 0) {
      yield buffer;
    }
  }
};

// plugins/custom-voice-engine/services/providers/tts/cartesia-tts.provider.ts
import axios4 from "axios";
var CARTESIA_TTS_URL = "https://api.cartesia.ai/tts/bytes";
var CartesiaTtsProvider = class extends BaseTtsProvider {
  name = "cartesia";
  async synthesize(text2, config) {
    const model = config.cartesiaModel || "sonic-english";
    const voiceId = config.voice || "79a125e8-cd45-4c13-8a67-188112f4dd22";
    const sampleRate = config.outputFormat?.sampleRate || 8e3;
    console.log(`[TTS:Cartesia] Synthesizing audio: voiceId="${voiceId}" model="${model}" sampleRate=${sampleRate}`);
    try {
      const response = await axios4.post(
        CARTESIA_TTS_URL,
        {
          model_id: model,
          transcript: text2,
          voice: {
            mode: "id",
            id: voiceId
          },
          output_format: {
            container: "raw",
            encoding: "pcm_s16le",
            sample_rate: sampleRate
          }
        },
        {
          ...keepAliveAxiosConfig,
          headers: {
            "X-API-Key": config.apiKey,
            "Cartesia-Version": "2024-06-10",
            "Content-Type": "application/json"
          },
          responseType: "arraybuffer",
          timeout: 15e3
        }
      );
      return Buffer.from(response.data);
    } catch (err) {
      const errText = err.response?.data ? Buffer.isBuffer(err.response.data) ? err.response.data.toString() : JSON.stringify(err.response.data) : err.message;
      console.error(`[TTS:Cartesia] Synthesis failed:`, errText);
      throw new Error(`Cartesia TTS synthesis failed: ${err.message}`);
    }
  }
  async *synthesizeStream(text2, config) {
    const audio = await this.synthesize(text2, config);
    const chunkSize = 640;
    for (let i = 0; i < audio.length; i += chunkSize) {
      yield audio.subarray(i, Math.min(i + chunkSize, audio.length));
    }
  }
};

// plugins/custom-voice-engine/services/providers/tts/navana-tts.provider.ts
import axios5 from "axios";
var NAVANA_TTS_URL = "https://api.navana.ai/v1/tts";
var NavanaTtsProvider = class extends BaseTtsProvider {
  name = "navana";
  async synthesize(text2, config) {
    const voice = config.voice || config.navanaModel || "bodhi-indic-tts-v1";
    const language = config.language || "hi-IN";
    const sampleRate = config.outputFormat?.sampleRate || 8e3;
    console.log(`[TTS:Navana] Synthesizing audio: voice="${voice}" language="${language}" sampleRate=${sampleRate}`);
    try {
      const response = await axios5.post(
        NAVANA_TTS_URL,
        {
          text: text2,
          voice,
          language,
          sample_rate: sampleRate,
          encoding: "linear16"
        },
        {
          ...keepAliveAxiosConfig,
          headers: {
            Authorization: `Bearer ${config.apiKey}`,
            "Content-Type": "application/json"
          },
          responseType: "arraybuffer",
          timeout: 15e3
        }
      );
      return Buffer.from(response.data);
    } catch (err) {
      const errText = err.response?.data ? Buffer.isBuffer(err.response.data) ? err.response.data.toString() : JSON.stringify(err.response.data) : err.message;
      console.error(`[TTS:Navana] Synthesis failed:`, errText);
      throw new Error(`Navana AI TTS synthesis failed: ${err.message}`);
    }
  }
  async *synthesizeStream(text2, config) {
    const audio = await this.synthesize(text2, config);
    const chunkSize = 640;
    for (let i = 0; i < audio.length; i += chunkSize) {
      yield audio.subarray(i, Math.min(i + chunkSize, audio.length));
    }
  }
};

// plugins/custom-voice-engine/services/providers/tts/tts-provider.factory.ts
var providerRegistry = {
  deepgram: DeepgramTtsProvider,
  sarvam: SarvamTtsProvider,
  elevenlabs: ElevenLabsTtsProvider,
  cartesia: CartesiaTtsProvider,
  navana: NavanaTtsProvider
};
var TtsProviderFactory = class {
  static create(provider) {
    const ProviderClass = providerRegistry[provider];
    if (!ProviderClass) {
      throw new Error(`Unknown TTS provider: ${provider}. Available: ${Object.keys(providerRegistry).join(", ")}`);
    }
    return new ProviderClass();
  }
  static getAvailableProviders() {
    return Object.keys(providerRegistry);
  }
  static isAvailable(provider) {
    return provider in providerRegistry;
  }
  static register(name, providerClass) {
    providerRegistry[name] = providerClass;
    console.log(`[TTS Factory] Registered custom provider: ${name}`);
  }
};

// plugins/custom-voice-engine/services/freeswitch/esl-connection.ts
import { Socket } from "net";
import { EventEmitter } from "events";
var EslConnection = class extends EventEmitter {
  socket = null;
  config;
  connected = false;
  authenticated = false;
  reconnecting = false;
  disconnecting = false;
  expectedDiscards = 0;
  reconnectAttempts = 0;
  reconnectTimer = null;
  buffer = "";
  pendingCommands = [];
  constructor(config) {
    super();
    this.config = {
      reconnect: true,
      reconnectIntervalMs: 5e3,
      maxReconnectAttempts: 10,
      ...config
    };
  }
  /**
   * Connect to FreeSWITCH ESL
   */
  async connect() {
    return new Promise((resolve, reject) => {
      this.socket = new Socket();
      this.socket.setEncoding("utf8");
      const timeout = setTimeout(() => {
        this.off("ready", onReady);
        this.off("error", onError);
        reject(new Error(`ESL connection timeout to ${this.config.host}:${this.config.port}`));
        this.socket?.destroy();
      }, 1e4);
      const onReady = () => {
        clearTimeout(timeout);
        this.off("error", onError);
        resolve();
      };
      const onError = (err) => {
        clearTimeout(timeout);
        this.off("ready", onReady);
        reject(err);
      };
      this.once("ready", onReady);
      this.once("error", onError);
      this.socket.on("connect", () => {
        console.log(`[ESL] Socket connected to ${this.config.host}:${this.config.port}, waiting for authentication...`);
      });
      this.socket.on("data", (data) => {
        this.buffer += data;
        this.processBuffer();
      });
      this.socket.on("error", (err) => {
        console.error("[ESL] Socket error:", err.message);
        this.emit("error", err);
      });
      this.socket.on("close", () => {
        if (this.disconnecting) {
          this.connected = false;
          this.authenticated = false;
          console.log("[ESL] Connection closed (intentional)");
          this.emit("disconnect");
          return;
        }
        const wasAuthenticated = this.authenticated;
        this.connected = false;
        this.authenticated = false;
        console.log("[ESL] Connection closed");
        this.emit("disconnect");
        if (!wasAuthenticated) {
          this.emit("error", new Error(`ESL connection to ${this.config.host}:${this.config.port} closed before authentication completed \u2014 check ESL password and FreeSWITCH ESL config`));
        }
        if (this.config.reconnect && !this.reconnecting) {
          this.scheduleReconnect();
        }
      });
      this.socket.connect(this.config.port, this.config.host);
    });
  }
  /**
   * Send an API command to FreeSWITCH
   */
  async api(command) {
    return this.sendCommand(`api ${command}`);
  }
  /**
   * Send a background API command
   */
  async bgapi(command) {
    return this.sendCommand(`bgapi ${command}`);
  }
  /**
   * Execute an application on a channel
   */
  async execute(uuid, app, arg) {
    const cmd = arg ? `sendmsg ${uuid}
call-command: execute
execute-app-name: ${app}
execute-app-arg: ${arg}` : `sendmsg ${uuid}
call-command: execute
execute-app-name: ${app}`;
    return this.sendCommand(cmd);
  }
  /**
   * Originate an outbound call
   */
  async originate(dialString, destination, options = {}) {
    const vars = Object.entries(options).map(([k, v]) => `${k}=${v}`).join(",");
    const varsStr = vars ? `{${vars}}` : "";
    return this.bgapi(`originate ${varsStr}${dialString} ${destination}`);
  }
  /**
   * Start audio forking on a channel (sends audio to WebSocket)
   */
  async startAudioFork(uuid, wsUrl) {
    return this.execute(uuid, "audio_fork", wsUrl);
  }
  /**
   * Stop audio forking on a channel
   */
  async stopAudioFork(uuid) {
    return this.execute(uuid, "stop_audio_fork");
  }
  /**
   * Hang up a channel
   */
  async hangup(uuid, cause) {
    return this.api(`uuid_kill ${uuid} ${cause || "NORMAL_CLEARING"}`);
  }
  /**
   * Get channel variable
   */
  async getVariable(uuid, variable) {
    return this.api(`uuid_getvar ${uuid} ${variable}`);
  }
  /**
   * Set channel variable
   */
  async setVariable(uuid, variable, value) {
    return this.api(`uuid_setvar ${uuid} ${variable} ${value}`);
  }
  /**
   * Get active channel count
   */
  async getActiveChannelCount() {
    const result = await this.api("show calls count");
    const match = result.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }
  /**
   * Disconnect from FreeSWITCH
   */
  async disconnect() {
    this.config.reconnect = false;
    this.disconnecting = true;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.socket) {
      this.socket.destroy();
      this.socket = null;
    }
    this.connected = false;
    this.authenticated = false;
    console.log("[ESL] Disconnected");
  }
  isConnected() {
    return this.connected && this.authenticated;
  }
  // ── Private Methods ────────────────────────────────────
  async sendCommand(command) {
    if (!this.connected || !this.socket) {
      throw new Error("ESL not connected");
    }
    return new Promise((resolve, reject) => {
      this.pendingCommands.push({ resolve, reject });
      this.sendRaw(`${command}

`);
      setTimeout(() => {
        const idx = this.pendingCommands.findIndex((p) => p.resolve === resolve);
        if (idx !== -1) {
          this.pendingCommands.splice(idx, 1);
          reject(new Error(`ESL command timeout: ${command.split("\n")[0]}`));
        }
      }, 15e3);
    });
  }
  sendRaw(data) {
    if (this.socket && !this.socket.destroyed) {
      this.socket.write(data);
    }
  }
  processBuffer() {
    this.buffer = this.buffer.trimStart();
    while (true) {
      const headerEndIndex = this.buffer.indexOf("\n\n");
      if (headerEndIndex === -1) break;
      const headerPart = this.buffer.substring(0, headerEndIndex);
      const headers = {};
      const lines = headerPart.split("\n");
      for (const line of lines) {
        const colonIdx = line.indexOf(":");
        if (colonIdx > 0) {
          const key = line.substring(0, colonIdx).trim();
          const value = line.substring(colonIdx + 1).trim();
          headers[key] = decodeURIComponent(value);
        }
      }
      const contentLength = headers["Content-Length"] ? parseInt(headers["Content-Length"], 10) : 0;
      const totalMessageLength = headerEndIndex + 2 + contentLength;
      if (this.buffer.length < totalMessageLength) {
        break;
      }
      const body = this.buffer.substring(headerEndIndex + 2, headerEndIndex + 2 + contentLength);
      this.buffer = this.buffer.substring(totalMessageLength).trimStart();
      this.processMessage(headers, body);
    }
  }
  processMessage(headers, body) {
    const contentType = headers["Content-Type"];
    if (contentType === "auth/request") {
      this.sendRaw(`auth ${this.config.password}

`);
      return;
    }
    if (contentType === "api/response" || contentType === "command/reply") {
      const replyText = headers["Reply-Text"] || body.trim();
      if (!this.authenticated) {
        if (replyText.startsWith("+OK accepted")) {
          this.authenticated = true;
          this.connected = true;
          this.reconnectAttempts = 0;
          this.sendRaw("event plain CHANNEL_CREATE CHANNEL_ANSWER CHANNEL_HANGUP CHANNEL_DESTROY\n\n");
          this.sendRaw("event plain CUSTOM mod_audio_fork::play_audio\n\n");
          this.expectedDiscards = 2;
          console.log("[ESL] Authenticated successfully, waiting for subscription confirmations...");
        } else if (replyText.startsWith("-ERR")) {
          const err = new Error(`ESL authentication failed: ${replyText}`);
          this.emit("error", err);
          this.socket?.destroy();
        } else {
          const err = new Error(`ESL auth reply unexpected: ${replyText}`);
          this.emit("error", err);
          this.socket?.destroy();
        }
        return;
      }
      if (this.expectedDiscards > 0) {
        this.expectedDiscards--;
        if (this.expectedDiscards === 0) {
          console.log("[ESL] Subscription confirmations received, connection ready");
          this.emit("ready");
        }
        return;
      }
      const pending = this.pendingCommands.shift();
      if (pending) {
        if (replyText.startsWith("-ERR")) {
          pending.reject(new Error(replyText));
        } else {
          pending.resolve(body.trim() || replyText);
        }
      }
      return;
    }
    if (contentType === "text/event-plain") {
      const eventHeaders = {};
      const lines = body.split("\n");
      let eventBody = "";
      let inEventBody = false;
      for (const line of lines) {
        if (inEventBody) {
          eventBody += line + "\n";
          continue;
        }
        if (line.trim() === "") {
          inEventBody = true;
          continue;
        }
        const colonIdx = line.indexOf(":");
        if (colonIdx > 0) {
          const key = line.substring(0, colonIdx).trim();
          const value = line.substring(colonIdx + 1).trim();
          eventHeaders[key] = decodeURIComponent(value);
        }
      }
      const event = {
        eventName: eventHeaders["Event-Name"] || "UNKNOWN",
        eventSubclass: eventHeaders["Event-Subclass"],
        headers: eventHeaders,
        body: eventBody.trim() || void 0
      };
      const keyEvents = ["CHANNEL_CREATE", "CHANNEL_ANSWER", "CHANNEL_HANGUP", "CHANNEL_DESTROY"];
      if (keyEvents.includes(event.eventName)) {
        console.log(`[ESL] Received event: ${event.eventName}`);
      }
      this.emit("event", event);
      this.emit(`event:${event.eventName}`, event);
    }
  }
  scheduleReconnect() {
    if (this.reconnectAttempts >= (this.config.maxReconnectAttempts || 10)) {
      console.error("[ESL] Max reconnect attempts reached");
      this.emit("maxReconnectAttempts");
      return;
    }
    this.reconnecting = true;
    this.reconnectAttempts++;
    const delay = this.config.reconnectIntervalMs || 5e3;
    console.log(`[ESL] Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`);
    this.reconnectTimer = setTimeout(async () => {
      try {
        await this.connect();
        this.reconnecting = false;
      } catch (err) {
        console.error("[ESL] Reconnect failed:", err.message);
        this.reconnecting = false;
        this.scheduleReconnect();
      }
    }, delay);
  }
};

// plugins/custom-voice-engine/index.ts
import * as os3 from "os";

// plugins/custom-voice-engine/routes/admin-settings.routes.ts
init_db();
import { Router } from "express";
import { sql as sql2 } from "drizzle-orm";
function createAdminSettingsRouter() {
  const router = Router();
  (async () => {
    try {
      await db.execute(sql2`DROP TABLE IF EXISTS ve_sip_gateways CASCADE;`);
      console.log("[VE Admin] Deleted old ve_sip_gateways table");
    } catch (err) {
      console.error("[VE Admin] Failed to drop ve_sip_gateways table:", err.message);
    }
  })();
  router.get("/", async (_req, res) => {
    try {
      const result = await db.execute(
        sql2`SELECT * FROM ve_freeswitch_nodes ORDER BY created_at ASC`
      );
      res.json({
        success: true,
        data: {
          nodes: result.rows,
          totalNodes: result.rows.length,
          onlineNodes: result.rows.filter((n) => n.status === "online").length
        }
      });
    } catch (err) {
      console.error("[VE Admin] Error fetching settings:", err.message);
      res.status(500).json({ success: false, error: "Failed to fetch settings" });
    }
  });
  router.get("/nodes", async (_req, res) => {
    try {
      const result = await db.execute(
        sql2`SELECT * FROM ve_freeswitch_nodes ORDER BY created_at ASC`
      );
      res.json({ success: true, data: result.rows });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.post("/nodes", async (req, res) => {
    try {
      const { name, eslHost, eslPort, eslPassword, sipHost, sipPort, wsPort, maxCalls, status } = req.body;
      if (!name || !eslHost || !eslPort || !sipHost || !sipPort || !wsPort) {
        return res.status(400).json({ success: false, error: "Missing required fields" });
      }
      const result = await db.execute(sql2`
        INSERT INTO ve_freeswitch_nodes (name, esl_host, esl_port, esl_password, sip_host, sip_port, ws_port, max_calls, status)
        VALUES (${name}, ${eslHost}, ${eslPort}, ${eslPassword || "ClueCon"}, ${sipHost}, ${sipPort}, ${wsPort}, ${maxCalls || 100}, ${status || "offline"})
        RETURNING *
      `);
      res.status(201).json({ success: true, data: result.rows[0] });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.put("/nodes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { name, eslHost, eslPort, eslPassword, sipHost, sipPort, wsPort, maxCalls, status } = req.body;
      const result = await db.execute(sql2`
        UPDATE ve_freeswitch_nodes SET
          name = COALESCE(${name !== void 0 ? name : null}, name),
          esl_host = COALESCE(${eslHost !== void 0 ? eslHost : null}, esl_host),
          esl_port = COALESCE(${eslPort !== void 0 ? eslPort : null}, esl_port),
          esl_password = COALESCE(${eslPassword !== void 0 ? eslPassword : null}, esl_password),
          sip_host = COALESCE(${sipHost !== void 0 ? sipHost : null}, sip_host),
          sip_port = COALESCE(${sipPort !== void 0 ? sipPort : null}, sip_port),
          ws_port = COALESCE(${wsPort !== void 0 ? wsPort : null}, ws_port),
          max_calls = COALESCE(${maxCalls !== void 0 ? maxCalls : null}, max_calls),
          status = COALESCE(${status !== void 0 ? status : null}, status),
          updated_at = NOW()
        WHERE id = ${id}
        RETURNING *
      `);
      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, error: "Node not found" });
      }
      res.json({ success: true, data: result.rows[0] });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.delete("/nodes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await db.execute(sql2`DELETE FROM ve_freeswitch_nodes WHERE id = ${id}`);
      res.json({ success: true, message: "Node deleted" });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.get("/sip-gateways", async (req, res) => {
    try {
      const userId = req.userId;
      if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
      const result = await db.execute(sql2`
        SELECT * FROM user_sip_gateways
        WHERE user_id = ${userId}
        ORDER BY created_at ASC
      `);
      res.json({ success: true, data: result.rows });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.post("/sip-gateways", async (req, res) => {
    try {
      const userId = req.userId;
      if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
      const { name, username, password, proxy, register, callerIdInFrom } = req.body;
      if (!name || !username || !password || !proxy) {
        return res.status(400).json({ success: false, error: "Missing required fields" });
      }
      const result = await db.execute(sql2`
        INSERT INTO user_sip_gateways (user_id, name, username, password, proxy, register, caller_id_in_from)
        VALUES (${userId}, ${name}, ${username}, ${password}, ${proxy}, ${register ?? false}, ${callerIdInFrom ?? true})
        RETURNING *
      `);
      res.status(201).json({ success: true, data: result.rows[0] });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.put("/sip-gateways/:id", async (req, res) => {
    try {
      const userId = req.userId;
      if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
      const { id } = req.params;
      const { name, username, password, proxy, register, callerIdInFrom } = req.body;
      const result = await db.execute(sql2`
        UPDATE user_sip_gateways SET
          name = COALESCE(${name ?? null}, name),
          username = COALESCE(${username ?? null}, username),
          password = COALESCE(${password ?? null}, password),
          proxy = COALESCE(${proxy ?? null}, proxy),
          register = COALESCE(${register !== void 0 ? register : null}, register),
          caller_id_in_from = COALESCE(${callerIdInFrom !== void 0 ? callerIdInFrom : null}, caller_id_in_from),
          updated_at = NOW()
        WHERE id = ${id} AND user_id = ${userId}
        RETURNING *
      `);
      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, error: "Gateway not found" });
      }
      res.json({ success: true, data: result.rows[0] });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.delete("/sip-gateways/:id", async (req, res) => {
    try {
      const userId = req.userId;
      if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
      const { id } = req.params;
      await db.execute(sql2`DELETE FROM user_sip_gateways WHERE id = ${id} AND user_id = ${userId}`);
      res.json({ success: true, message: "Gateway deleted" });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.post("/sip-gateways/:id/activate", async (req, res) => {
    try {
      const userId = req.userId;
      if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
      const { id } = req.params;
      await db.execute(sql2`UPDATE user_sip_gateways SET is_active = false WHERE user_id = ${userId}`);
      const result = await db.execute(sql2`
        UPDATE user_sip_gateways SET is_active = true WHERE id = ${id} AND user_id = ${userId} RETURNING *
      `);
      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, error: "Gateway not found" });
      }
      res.json({ success: true, data: result.rows[0] });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  return router;
}

// plugins/custom-voice-engine/routes/admin-provider-keys.routes.ts
init_db();
init_schema();
import { Router as Router2 } from "express";
import { eq as eq2, inArray } from "drizzle-orm";
var SETTINGS_KEYS = {
  // Active provider selections
  sttActiveProvider: "ve_stt_active_provider",
  llmActiveProvider: "ve_llm_active_provider",
  ttsActiveProvider: "ve_tts_active_provider",
  // Allowed LLMs array (JSON array of strings)
  llmAllowedModels: "ve_llm_allowed_models",
  // Allowed providers arrays (JSON array of strings)
  sttAllowedProviders: "ve_stt_allowed_providers",
  ttsAllowedProviders: "ve_tts_allowed_providers",
  // API keys
  deepgramApiKey: "ve_deepgram_api_key",
  sarvamApiKey: "ve_sarvam_api_key",
  openrouterApiKey: "ve_openrouter_api_key",
  geminiApiKey: "ve_gemini_api_key",
  groqApiKey: "ve_groq_api_key",
  openaiApiKey: "ve_openai_api_key",
  deepseekApiKey: "ve_deepseek_api_key",
  anthropicApiKey: "ve_anthropic_api_key",
  elevenlabsApiKey: "ve_elevenlabs_api_key",
  navanaApiKey: "ve_navana_api_key",
  cartesiaApiKey: "ve_cartesia_api_key",
  callhippoApiKey: "ve_callhippo_api_key",
  telecmiAppId: "ve_telecmi_app_id",
  telecmiSecret: "ve_telecmi_secret",
  voicelinkHost: "ve_voicelink_host",
  // Models (per-provider, so switching providers doesn't lose the other's selection)
  sttDeepgramModel: "ve_stt_deepgram_model",
  sttDeepgramAllowedModels: "ve_stt_deepgram_allowed_models",
  sttSarvamModel: "ve_stt_sarvam_model",
  sttSarvamAllowedModels: "ve_stt_sarvam_allowed_models",
  llmDefaultModel: "ve_llm_default_model",
  ttsDeepgramModel: "ve_tts_deepgram_model",
  ttsDeepgramAllowedModels: "ve_tts_deepgram_allowed_models",
  ttsSarvamModel: "ve_tts_sarvam_model",
  ttsSarvamAllowedModels: "ve_tts_sarvam_allowed_models",
  ttsSarvamSpeaker: "ve_tts_sarvam_speaker",
  ttsElevenlabsModel: "ve_tts_elevenlabs_model",
  ttsElevenlabsAllowedModels: "ve_tts_elevenlabs_allowed_models",
  ttsNavanaModel: "ve_tts_navana_model",
  ttsNavanaAllowedModels: "ve_tts_navana_allowed_models",
  ttsCartesiaModel: "ve_tts_cartesia_model",
  ttsCartesiaAllowedModels: "ve_tts_cartesia_allowed_models",
  // FreeSWITCH
  freeswitchEslHost: "ve_freeswitch_esl_host",
  freeswitchEslPort: "ve_freeswitch_esl_port",
  freeswitchEslPassword: "ve_freeswitch_esl_password",
  // Plugin enabled
  pluginEnabled: "ve_plugin_enabled",
  // Master BYOK Switch
  allowUserByok: "allow_user_byok"
};
function toBool(val, defaultVal = true) {
  if (val === void 0 || val === null) return defaultVal;
  if (val === false || val === "false" || val === 0 || val === "0") return false;
  if (val === true || val === "true" || val === 1 || val === "1") return true;
  return Boolean(val);
}
function maskKey(key) {
  if (!key) return "";
  if (key.length <= 4) return "****";
  return "\u2022".repeat(Math.min(key.length - 4, 20)) + key.slice(-4);
}
function extractValue(val) {
  if (val === null || val === void 0) return null;
  if (typeof val === "string") {
    const trimmed = val.trim();
    if (trimmed.startsWith('"') && trimmed.endsWith('"') || trimmed.startsWith("'") && trimmed.endsWith("'")) {
      try {
        return JSON.parse(trimmed);
      } catch {
        return trimmed.slice(1, -1);
      }
    }
    return trimmed;
  }
  if (typeof val === "object" && val !== null) return val;
  return val;
}
function createAdminProviderKeysRouter() {
  const router = Router2();
  router.get("/", async (_req, res) => {
    try {
      const allKeys = Object.values(SETTINGS_KEYS);
      const results = await db.select().from(globalSettings).where(inArray(globalSettings.key, allKeys));
      const settingsMap = {};
      for (const row of results) {
        settingsMap[row.key] = extractValue(row.value);
      }
      const parseAllowedArray = (key, defaultArray) => {
        const val = settingsMap[key];
        if (!val) return defaultArray;
        if (Array.isArray(val)) return val;
        if (typeof val === "string") {
          try {
            const parsed = JSON.parse(val);
            if (Array.isArray(parsed)) return parsed;
            return [parsed];
          } catch (e) {
            return [val];
          }
        }
        return defaultArray;
      };
      const response = {
        stt: {
          activeProvider: settingsMap[SETTINGS_KEYS.sttActiveProvider] || "deepgram",
          allowedProviders: parseAllowedArray(SETTINGS_KEYS.sttAllowedProviders, ["deepgram"]),
          defaultModel: settingsMap[SETTINGS_KEYS.sttActiveProvider] === "sarvam" ? settingsMap[SETTINGS_KEYS.sttSarvamModel] || "saaras:v3" : settingsMap[SETTINGS_KEYS.sttDeepgramModel] || "nova-2",
          deepgramModel: settingsMap[SETTINGS_KEYS.sttDeepgramModel] || "nova-2",
          deepgramAllowedModels: parseAllowedArray(SETTINGS_KEYS.sttDeepgramAllowedModels, ["nova-2", "nova-2-phonecall"]),
          sarvamModel: settingsMap[SETTINGS_KEYS.sttSarvamModel] || "saaras:v3",
          sarvamAllowedModels: parseAllowedArray(SETTINGS_KEYS.sttSarvamAllowedModels, ["saaras:v3"]),
          providers: {
            deepgram: {
              name: "Deepgram",
              hasKey: !!settingsMap[SETTINGS_KEYS.deepgramApiKey],
              maskedKey: maskKey(settingsMap[SETTINGS_KEYS.deepgramApiKey])
            },
            sarvam: {
              name: "Sarvam AI",
              hasKey: !!settingsMap[SETTINGS_KEYS.sarvamApiKey],
              maskedKey: maskKey(settingsMap[SETTINGS_KEYS.sarvamApiKey])
            }
          }
        },
        llm: {
          activeProvider: settingsMap[SETTINGS_KEYS.llmActiveProvider] || "gemini",
          defaultModel: settingsMap[SETTINGS_KEYS.llmDefaultModel] || "gemini-2.0-flash",
          allowedModels: parseAllowedArray(SETTINGS_KEYS.llmAllowedModels, ["gemini-2.0-flash", "llama-3.3-70b-versatile", "gpt-4o-mini", "claude-3-5-sonnet", "deepseek-chat"]),
          providers: {
            gemini: {
              name: "Google Gemini",
              hasKey: !!settingsMap[SETTINGS_KEYS.geminiApiKey],
              maskedKey: maskKey(settingsMap[SETTINGS_KEYS.geminiApiKey])
            },
            groq: {
              name: "Groq",
              hasKey: !!settingsMap[SETTINGS_KEYS.groqApiKey],
              maskedKey: maskKey(settingsMap[SETTINGS_KEYS.groqApiKey])
            },
            openai: {
              name: "OpenAI",
              hasKey: !!settingsMap[SETTINGS_KEYS.openaiApiKey],
              maskedKey: maskKey(settingsMap[SETTINGS_KEYS.openaiApiKey])
            },
            deepseek: {
              name: "DeepSeek",
              hasKey: !!settingsMap[SETTINGS_KEYS.deepseekApiKey],
              maskedKey: maskKey(settingsMap[SETTINGS_KEYS.deepseekApiKey])
            },
            anthropic: {
              name: "Anthropic",
              hasKey: !!settingsMap[SETTINGS_KEYS.anthropicApiKey],
              maskedKey: maskKey(settingsMap[SETTINGS_KEYS.anthropicApiKey])
            },
            openrouter: {
              name: "OpenRouter",
              hasKey: !!settingsMap[SETTINGS_KEYS.openrouterApiKey],
              maskedKey: maskKey(settingsMap[SETTINGS_KEYS.openrouterApiKey])
            }
          }
        },
        tts: {
          activeProvider: settingsMap[SETTINGS_KEYS.ttsActiveProvider] || "deepgram",
          allowedProviders: parseAllowedArray(SETTINGS_KEYS.ttsAllowedProviders, ["deepgram"]),
          defaultModel: settingsMap[SETTINGS_KEYS.ttsActiveProvider] === "navana" ? settingsMap[SETTINGS_KEYS.ttsNavanaModel] || "bodhi-indic-tts-v1" : settingsMap[SETTINGS_KEYS.ttsActiveProvider] === "cartesia" ? settingsMap[SETTINGS_KEYS.ttsCartesiaModel] || "sonic-english" : settingsMap[SETTINGS_KEYS.ttsActiveProvider] === "sarvam" ? settingsMap[SETTINGS_KEYS.ttsSarvamModel] || "bulbul:v3" : settingsMap[SETTINGS_KEYS.ttsActiveProvider] === "elevenlabs" ? settingsMap[SETTINGS_KEYS.ttsElevenlabsModel] || "eleven_turbo_v2_5" : settingsMap[SETTINGS_KEYS.ttsDeepgramModel] || "aura-asteria-en",
          deepgramModel: settingsMap[SETTINGS_KEYS.ttsDeepgramModel] || "aura-asteria-en",
          deepgramAllowedModels: parseAllowedArray(SETTINGS_KEYS.ttsDeepgramAllowedModels, ["aura-asteria-en", "aura-luna-en"]),
          sarvamModel: settingsMap[SETTINGS_KEYS.ttsSarvamModel] || "bulbul:v3",
          sarvamAllowedModels: parseAllowedArray(SETTINGS_KEYS.ttsSarvamAllowedModels, ["bulbul:v3", "bulbul:v2"]),
          sarvamSpeaker: settingsMap[SETTINGS_KEYS.ttsSarvamSpeaker] || "neha",
          elevenlabsModel: settingsMap[SETTINGS_KEYS.ttsElevenlabsModel] || "eleven_turbo_v2_5",
          elevenlabsAllowedModels: parseAllowedArray(SETTINGS_KEYS.ttsElevenlabsAllowedModels, ["eleven_turbo_v2_5", "eleven_turbo_v2"]),
          navanaModel: settingsMap[SETTINGS_KEYS.ttsNavanaModel] || "bodhi-indic-tts-v1",
          navanaAllowedModels: parseAllowedArray(SETTINGS_KEYS.ttsNavanaAllowedModels, ["bodhi-indic-tts-v1"]),
          cartesiaModel: settingsMap[SETTINGS_KEYS.ttsCartesiaModel] || "sonic-english",
          cartesiaAllowedModels: parseAllowedArray(SETTINGS_KEYS.ttsCartesiaAllowedModels, ["sonic-english", "sonic-multilingual"]),
          providers: {
            deepgram: {
              name: "Deepgram",
              hasKey: !!settingsMap[SETTINGS_KEYS.deepgramApiKey],
              maskedKey: maskKey(settingsMap[SETTINGS_KEYS.deepgramApiKey])
            },
            sarvam: {
              name: "Sarvam AI",
              hasKey: !!settingsMap[SETTINGS_KEYS.sarvamApiKey],
              maskedKey: maskKey(settingsMap[SETTINGS_KEYS.sarvamApiKey])
            },
            elevenlabs: {
              name: "ElevenLabs",
              hasKey: !!settingsMap[SETTINGS_KEYS.elevenlabsApiKey],
              maskedKey: maskKey(settingsMap[SETTINGS_KEYS.elevenlabsApiKey])
            },
            navana: {
              name: "Navana AI (Bodhi Indic TTS)",
              hasKey: !!settingsMap[SETTINGS_KEYS.navanaApiKey],
              maskedKey: maskKey(settingsMap[SETTINGS_KEYS.navanaApiKey])
            },
            cartesia: {
              name: "Cartesia Sonic (90ms)",
              hasKey: !!settingsMap[SETTINGS_KEYS.cartesiaApiKey],
              maskedKey: maskKey(settingsMap[SETTINGS_KEYS.cartesiaApiKey])
            }
          }
        },
        freeswitch: {
          eslHost: settingsMap[SETTINGS_KEYS.freeswitchEslHost] || "127.0.0.1",
          eslPort: settingsMap[SETTINGS_KEYS.freeswitchEslPort] || 8021,
          eslPassword: settingsMap[SETTINGS_KEYS.freeswitchEslPassword] ? "\u2022\u2022\u2022\u2022\u2022\u2022" : ""
        },
        pluginEnabled: settingsMap[SETTINGS_KEYS.pluginEnabled] ?? true,
        allowUserByok: toBool(settingsMap["allow_user_byok"], true)
      };
      res.json({ success: true, data: response });
    } catch (err) {
      console.error("[VE Admin Keys] Error fetching provider keys:", err);
      res.status(500).json({ success: false, error: `Failed to fetch provider settings: ${err.message}`, stack: err.stack });
    }
  });
  router.put("/", async (req, res) => {
    try {
      const {
        sttActiveProvider,
        llmActiveProvider,
        ttsActiveProvider,
        sttAllowedProviders,
        ttsAllowedProviders,
        deepgramApiKey,
        sarvamApiKey,
        openrouterApiKey,
        geminiApiKey,
        groqApiKey,
        openaiApiKey,
        deepseekApiKey,
        anthropicApiKey,
        elevenlabsApiKey,
        navanaApiKey,
        cartesiaApiKey,
        callhippoApiKey,
        telecmiAppId,
        telecmiSecret,
        voicelinkHost,
        sttDeepgramModel,
        sttDeepgramAllowedModels,
        sttSarvamModel,
        sttSarvamAllowedModels,
        ttsDeepgramModel,
        ttsDeepgramAllowedModels,
        ttsSarvamModel,
        ttsSarvamAllowedModels,
        ttsSarvamSpeaker,
        ttsElevenlabsModel,
        ttsElevenlabsAllowedModels,
        ttsNavanaModel,
        ttsNavanaAllowedModels,
        ttsCartesiaModel,
        ttsCartesiaAllowedModels,
        llmDefaultModel,
        llmAllowedModels,
        freeswitchEslHost,
        freeswitchEslPort,
        freeswitchEslPassword,
        pluginEnabled,
        allowUserByok
      } = req.body;
      const updates = [];
      if (allowUserByok !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.allowUserByok,
          value: allowUserByok === true || allowUserByok === "true" ? "true" : "false",
          description: "Voice Engine: Master switch allowing users to bring own provider keys (BYOK)"
        });
      }
      if (sttActiveProvider !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.sttActiveProvider,
          value: sttActiveProvider,
          description: "Voice Engine: Active STT provider"
        });
      }
      if (sttAllowedProviders !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.sttAllowedProviders,
          value: JSON.stringify(sttAllowedProviders),
          description: "Voice Engine: Allowed STT providers array"
        });
      }
      if (llmActiveProvider !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.llmActiveProvider,
          value: llmActiveProvider,
          description: "Voice Engine: Active LLM provider"
        });
      }
      if (ttsActiveProvider !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.ttsActiveProvider,
          value: ttsActiveProvider,
          description: "Voice Engine: Active TTS provider"
        });
      }
      if (ttsAllowedProviders !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.ttsAllowedProviders,
          value: JSON.stringify(ttsAllowedProviders),
          description: "Voice Engine: Allowed TTS providers array"
        });
      }
      if (deepgramApiKey !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.deepgramApiKey,
          value: deepgramApiKey || "",
          description: "Voice Engine: Deepgram API key"
        });
      }
      if (sarvamApiKey !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.sarvamApiKey,
          value: sarvamApiKey || "",
          description: "Voice Engine: Sarvam AI API key"
        });
      }
      if (openrouterApiKey !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.openrouterApiKey,
          value: openrouterApiKey || "",
          description: "Voice Engine: OpenRouter API key"
        });
      }
      if (geminiApiKey !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.geminiApiKey,
          value: geminiApiKey || "",
          description: "Voice Engine: Gemini API key"
        });
      }
      if (groqApiKey !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.groqApiKey,
          value: groqApiKey || "",
          description: "Voice Engine: Groq API key"
        });
      }
      if (openaiApiKey !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.openaiApiKey,
          value: openaiApiKey || "",
          description: "Voice Engine: OpenAI API key"
        });
      }
      if (deepseekApiKey !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.deepseekApiKey,
          value: deepseekApiKey || "",
          description: "Voice Engine: DeepSeek API key"
        });
      }
      if (anthropicApiKey !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.anthropicApiKey,
          value: anthropicApiKey || "",
          description: "Voice Engine: Anthropic API key"
        });
      }
      if (elevenlabsApiKey !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.elevenlabsApiKey,
          value: elevenlabsApiKey || "",
          description: "Voice Engine: ElevenLabs API key"
        });
      }
      if (navanaApiKey !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.navanaApiKey,
          value: navanaApiKey || "",
          description: "Voice Engine: Navana AI API key"
        });
      }
      if (cartesiaApiKey !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.cartesiaApiKey,
          value: cartesiaApiKey || "",
          description: "Voice Engine: Cartesia API key"
        });
      }
      if (callhippoApiKey !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.callhippoApiKey,
          value: callhippoApiKey || "",
          description: "Voice Engine: CallHippo API key"
        });
      }
      if (telecmiAppId !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.telecmiAppId,
          value: telecmiAppId || "",
          description: "Voice Engine: TeleCMI App ID"
        });
      }
      if (telecmiSecret !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.telecmiSecret,
          value: telecmiSecret || "",
          description: "Voice Engine: TeleCMI Secret Key"
        });
      }
      if (voicelinkHost !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.voicelinkHost,
          value: voicelinkHost || "",
          description: "Voice Engine: VoiceLink SIP Host"
        });
      }
      if (sttDeepgramModel !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.sttDeepgramModel,
          value: sttDeepgramModel,
          description: "Voice Engine: STT Deepgram model"
        });
      }
      if (sttDeepgramAllowedModels !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.sttDeepgramAllowedModels,
          value: JSON.stringify(sttDeepgramAllowedModels),
          description: "Voice Engine: Allowed STT Deepgram models"
        });
      }
      if (sttSarvamModel !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.sttSarvamModel,
          value: sttSarvamModel,
          description: "Voice Engine: STT Sarvam model"
        });
      }
      if (sttSarvamAllowedModels !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.sttSarvamAllowedModels,
          value: JSON.stringify(sttSarvamAllowedModels),
          description: "Voice Engine: Allowed STT Sarvam models"
        });
      }
      if (ttsDeepgramModel !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.ttsDeepgramModel,
          value: ttsDeepgramModel,
          description: "Voice Engine: TTS Deepgram model"
        });
      }
      if (ttsDeepgramAllowedModels !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.ttsDeepgramAllowedModels,
          value: JSON.stringify(ttsDeepgramAllowedModels),
          description: "Voice Engine: Allowed TTS Deepgram models"
        });
      }
      if (ttsSarvamModel !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.ttsSarvamModel,
          value: ttsSarvamModel,
          description: "Voice Engine: TTS Sarvam model"
        });
      }
      if (ttsSarvamAllowedModels !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.ttsSarvamAllowedModels,
          value: JSON.stringify(ttsSarvamAllowedModels),
          description: "Voice Engine: Allowed TTS Sarvam models"
        });
      }
      if (ttsSarvamSpeaker !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.ttsSarvamSpeaker,
          value: ttsSarvamSpeaker,
          description: "Voice Engine: Default TTS speaker/voice for Sarvam AI"
        });
      }
      if (ttsElevenlabsModel !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.ttsElevenlabsModel,
          value: ttsElevenlabsModel,
          description: "Voice Engine: TTS ElevenLabs model"
        });
      }
      if (ttsElevenlabsAllowedModels !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.ttsElevenlabsAllowedModels,
          value: JSON.stringify(ttsElevenlabsAllowedModels),
          description: "Voice Engine: Allowed TTS ElevenLabs models"
        });
      }
      if (ttsNavanaModel !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.ttsNavanaModel,
          value: ttsNavanaModel,
          description: "Voice Engine: TTS Navana AI model"
        });
      }
      if (ttsNavanaAllowedModels !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.ttsNavanaAllowedModels,
          value: JSON.stringify(ttsNavanaAllowedModels),
          description: "Voice Engine: Allowed TTS Navana AI models"
        });
      }
      if (ttsCartesiaModel !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.ttsCartesiaModel,
          value: ttsCartesiaModel,
          description: "Voice Engine: TTS Cartesia model"
        });
      }
      if (ttsCartesiaAllowedModels !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.ttsCartesiaAllowedModels,
          value: JSON.stringify(ttsCartesiaAllowedModels),
          description: "Voice Engine: Allowed TTS Cartesia models"
        });
      }
      if (llmDefaultModel !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.llmDefaultModel,
          value: llmDefaultModel,
          description: "Voice Engine: Default LLM model"
        });
      }
      if (llmAllowedModels !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.llmAllowedModels,
          value: llmAllowedModels,
          description: "Voice Engine: Allowed LLM models array"
        });
      }
      if (freeswitchEslHost !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.freeswitchEslHost,
          value: freeswitchEslHost,
          description: "Voice Engine: FreeSWITCH ESL host"
        });
      }
      if (freeswitchEslPort !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.freeswitchEslPort,
          value: freeswitchEslPort,
          description: "Voice Engine: FreeSWITCH ESL port"
        });
      }
      if (freeswitchEslPassword !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.freeswitchEslPassword,
          value: freeswitchEslPassword || "",
          description: "Voice Engine: FreeSWITCH ESL password"
        });
      }
      if (pluginEnabled !== void 0) {
        updates.push({
          key: SETTINGS_KEYS.pluginEnabled,
          value: pluginEnabled,
          description: "Voice Engine: Plugin enabled state"
        });
      }
      if (updates.length === 0) {
        return res.status(400).json({ success: false, error: "No settings to update" });
      }
      for (const update of updates) {
        await db.insert(globalSettings).values({
          key: update.key,
          value: update.value,
          description: update.description
        }).onConflictDoUpdate({
          target: globalSettings.key,
          set: { value: update.value }
        });
      }
      res.json({
        success: true,
        message: `Updated ${updates.length} setting(s)`,
        updatedKeys: updates.map((u) => u.key)
      });
    } catch (err) {
      console.error("[VE Admin Keys] Error updating provider keys:", err.message);
      res.status(500).json({ success: false, error: "Failed to update provider settings" });
    }
  });
  router.get("/openrouter-models", async (_req, res) => {
    try {
      const [setting] = await db.select().from(globalSettings).where(eq2(globalSettings.key, SETTINGS_KEYS.openrouterApiKey)).limit(1);
      const apiKey = setting?.value;
      const headers = {
        "Content-Type": "application/json"
      };
      if (apiKey) {
        headers["Authorization"] = `Bearer ${apiKey}`;
      }
      const response = await fetch("https://openrouter.ai/api/v1/models", { headers });
      if (!response.ok) {
        return res.status(response.status).json({
          success: false,
          error: `OpenRouter returned ${response.status}`
        });
      }
      const json = await response.json();
      const sorted = (json.data || []).sort((a, b) => a.name.localeCompare(b.name));
      res.json({ success: true, data: sorted });
    } catch (err) {
      console.error("[VE Admin Keys] Error fetching OpenRouter models:", err.message);
      res.status(500).json({ success: false, error: "Failed to fetch OpenRouter models" });
    }
  });
  router.post("/test/:provider", async (req, res) => {
    try {
      const { provider } = req.params;
      let rawApiKey = req.body?.apiKey;
      if (!rawApiKey) {
        let keyName;
        switch (provider) {
          case "deepgram":
            keyName = SETTINGS_KEYS.deepgramApiKey;
            break;
          case "sarvam":
            keyName = SETTINGS_KEYS.sarvamApiKey;
            break;
          case "openrouter":
            keyName = SETTINGS_KEYS.openrouterApiKey;
            break;
          case "gemini":
            keyName = SETTINGS_KEYS.geminiApiKey;
            break;
          case "groq":
            keyName = SETTINGS_KEYS.groqApiKey;
            break;
          case "openai":
            keyName = SETTINGS_KEYS.openaiApiKey;
            break;
          case "deepseek":
            keyName = SETTINGS_KEYS.deepseekApiKey;
            break;
          case "anthropic":
            keyName = SETTINGS_KEYS.anthropicApiKey;
            break;
          case "elevenlabs":
            keyName = SETTINGS_KEYS.elevenlabsApiKey;
            break;
          case "navana":
            keyName = SETTINGS_KEYS.navanaApiKey;
            break;
          case "cartesia":
            keyName = SETTINGS_KEYS.cartesiaApiKey;
            break;
          default:
            return res.status(400).json({ success: false, error: `Unknown provider: ${provider}` });
        }
        const [setting] = await db.select().from(globalSettings).where(eq2(globalSettings.key, keyName)).limit(1);
        rawApiKey = setting?.value;
      }
      const apiKey = extractValue(rawApiKey);
      if (!apiKey || typeof apiKey === "string" && apiKey.trim().length === 0) {
        return res.json({
          success: true,
          data: {
            provider,
            connected: false,
            error: "No API key configured or provided"
          }
        });
      }
      let connected = false;
      let details = "";
      try {
        if (provider === "deepgram") {
          const response = await fetch("https://api.deepgram.com/v1/projects", {
            headers: { Authorization: `Token ${apiKey}` }
          });
          connected = response.ok;
          details = connected ? "Connected to Deepgram" : `HTTP ${response.status}`;
        } else if (provider === "sarvam") {
          connected = apiKey.length >= 10;
          details = connected ? "API key format valid" : "API key too short";
        } else if (provider === "openrouter") {
          const response = await fetch("https://openrouter.ai/api/v1/models", {
            headers: { Authorization: `Bearer ${apiKey}` }
          });
          connected = response.ok;
          details = connected ? "Connected to OpenRouter" : `HTTP ${response.status}`;
        } else if (provider === "gemini") {
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash?key=${apiKey}`);
          connected = response.ok;
          details = connected ? "Connected to Google Gemini" : `HTTP ${response.status}`;
        } else if (provider === "groq") {
          const response = await fetch("https://api.groq.com/openai/v1/models", {
            headers: { Authorization: `Bearer ${apiKey}` }
          });
          connected = response.ok;
          details = connected ? "Connected to Groq" : `HTTP ${response.status}`;
        } else if (provider === "openai") {
          const response = await fetch("https://api.openai.com/v1/models", {
            headers: { Authorization: `Bearer ${apiKey}` }
          });
          connected = response.ok;
          details = connected ? "Connected to OpenAI" : `HTTP ${response.status}`;
        } else if (provider === "deepseek") {
          const response = await fetch("https://api.deepseek.com/models", {
            headers: { Authorization: `Bearer ${apiKey}` }
          });
          connected = response.ok;
          details = connected ? "Connected to DeepSeek" : `HTTP ${response.status}`;
        } else if (provider === "anthropic") {
          const response = await fetch("https://api.anthropic.com/v1/models", {
            headers: {
              "x-api-key": apiKey,
              "anthropic-version": "2023-06-01"
            }
          });
          connected = response.ok;
          details = connected ? "Connected to Anthropic" : `HTTP ${response.status}`;
        } else if (provider === "elevenlabs") {
          const response = await fetch("https://api.elevenlabs.io/v1/voices", {
            headers: { "xi-api-key": apiKey }
          });
          connected = response.ok;
          details = connected ? "Connected to ElevenLabs" : `HTTP ${response.status}`;
        } else if (provider === "navana") {
          const response = await fetch("https://api.navana.ai/v1/voices", {
            headers: { Authorization: `Bearer ${apiKey}` }
          }).catch(() => null);
          if (response && response.ok) {
            connected = true;
            details = "Connected to Navana AI (Bodhi Indic TTS)";
          } else if (apiKey && apiKey.length >= 8) {
            connected = true;
            details = "Navana AI API key format verified";
          } else {
            connected = false;
            details = "Invalid Navana AI API key";
          }
        } else if (provider === "cartesia") {
          const response = await fetch("https://api.cartesia.ai/voices", {
            headers: {
              "X-API-Key": apiKey,
              "Cartesia-Version": "2024-06-10"
            }
          });
          connected = response.ok;
          details = connected ? "Connected to Cartesia Sonic" : `HTTP ${response.status}`;
        }
      } catch (fetchErr) {
        details = `Connection failed: ${fetchErr.message}`;
      }
      res.json({
        success: true,
        data: { provider, connected, details }
      });
    } catch (err) {
      console.error("[VE Admin Keys] Error testing provider:", err.message);
      res.status(500).json({ success: false, error: "Failed to test provider" });
    }
  });
  return router;
}

// plugins/custom-voice-engine/routes/admin-storage.routes.ts
init_db();
init_schema();
import { Router as Router3 } from "express";
import { inArray as inArray2 } from "drizzle-orm";
var STORAGE_KEYS = {
  provider: "ve_recording_storage",
  retentionDays: "ve_recording_retention_days",
  bucket: "ve_recording_s3_bucket",
  region: "ve_recording_s3_region",
  accessKey: "ve_recording_s3_access_key",
  secretKey: "ve_recording_s3_secret_key",
  endpoint: "ve_recording_s3_endpoint",
  gcsBucket: "ve_recording_gcs_bucket",
  gcsProjectId: "ve_recording_gcs_project_id",
  gcsCredentials: "ve_recording_gcs_credentials"
};
function maskKey2(key) {
  if (!key) return "";
  return "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022";
}
function isMasked(value) {
  if (typeof value !== "string") return false;
  return value.includes("\u2022\u2022\u2022\u2022") || value === "";
}
function createAdminStorageRouter() {
  const router = Router3();
  router.get("/", async (_req, res) => {
    try {
      const keys = Object.values(STORAGE_KEYS);
      const results = await db.select().from(globalSettings).where(inArray2(globalSettings.key, keys));
      const settingsMap = {};
      for (const row of results) {
        settingsMap[row.key] = row.value;
      }
      const response = {
        provider: settingsMap[STORAGE_KEYS.provider] || "local",
        retentionDays: Number(settingsMap[STORAGE_KEYS.retentionDays] ?? 30),
        bucket: settingsMap[STORAGE_KEYS.bucket] || "",
        region: settingsMap[STORAGE_KEYS.region] || "",
        accessKey: settingsMap[STORAGE_KEYS.accessKey] || "",
        secretKey: settingsMap[STORAGE_KEYS.secretKey] ? maskKey2(settingsMap[STORAGE_KEYS.secretKey]) : "",
        endpoint: settingsMap[STORAGE_KEYS.endpoint] || "",
        gcsBucket: settingsMap[STORAGE_KEYS.gcsBucket] || "",
        gcsProjectId: settingsMap[STORAGE_KEYS.gcsProjectId] || "",
        gcsCredentials: settingsMap[STORAGE_KEYS.gcsCredentials] ? maskKey2(settingsMap[STORAGE_KEYS.gcsCredentials]) : ""
      };
      res.json({ success: true, data: response });
    } catch (err) {
      console.error("[VE Admin Storage] Error fetching settings:", err.message);
      res.status(500).json({ success: false, error: "Failed to fetch storage settings" });
    }
  });
  router.post("/", async (req, res) => {
    try {
      const {
        provider,
        retentionDays,
        bucket,
        region,
        accessKey,
        secretKey,
        endpoint,
        gcsBucket,
        gcsProjectId,
        gcsCredentials
      } = req.body;
      const keys = Object.values(STORAGE_KEYS);
      const existingResults = await db.select().from(globalSettings).where(inArray2(globalSettings.key, keys));
      const existingMap = {};
      for (const row of existingResults) {
        existingMap[row.key] = row.value;
      }
      const updates = [];
      updates.push({
        key: STORAGE_KEYS.provider,
        value: provider || "local",
        description: "Voice Engine: Recording storage provider"
      });
      updates.push({
        key: STORAGE_KEYS.retentionDays,
        value: retentionDays !== void 0 ? Number(retentionDays) : 30,
        description: "Voice Engine: Recording retention days"
      });
      updates.push({
        key: STORAGE_KEYS.bucket,
        value: bucket || "",
        description: "Voice Engine: S3 bucket name"
      });
      updates.push({
        key: STORAGE_KEYS.region,
        value: region || "",
        description: "Voice Engine: S3 region"
      });
      updates.push({
        key: STORAGE_KEYS.accessKey,
        value: accessKey || "",
        description: "Voice Engine: S3 access key ID"
      });
      const resolvedSecretKey = isMasked(secretKey) ? existingMap[STORAGE_KEYS.secretKey] || "" : secretKey || "";
      updates.push({
        key: STORAGE_KEYS.secretKey,
        value: resolvedSecretKey,
        description: "Voice Engine: S3 secret access key"
      });
      updates.push({
        key: STORAGE_KEYS.endpoint,
        value: endpoint || "",
        description: "Voice Engine: S3-compatible custom endpoint"
      });
      updates.push({
        key: STORAGE_KEYS.gcsBucket,
        value: gcsBucket || "",
        description: "Voice Engine: GCS bucket name"
      });
      updates.push({
        key: STORAGE_KEYS.gcsProjectId,
        value: gcsProjectId || "",
        description: "Voice Engine: GCS project ID"
      });
      const resolvedGcsCredentials = isMasked(gcsCredentials) ? existingMap[STORAGE_KEYS.gcsCredentials] || "" : gcsCredentials || "";
      updates.push({
        key: STORAGE_KEYS.gcsCredentials,
        value: resolvedGcsCredentials,
        description: "Voice Engine: GCS service account credentials JSON"
      });
      for (const update of updates) {
        await db.insert(globalSettings).values({
          key: update.key,
          value: update.value,
          description: update.description
        }).onConflictDoUpdate({
          target: globalSettings.key,
          set: { value: update.value }
        });
      }
      res.json({ success: true, message: "Recording storage settings saved successfully" });
    } catch (err) {
      console.error("[VE Admin Storage] Error saving settings:", err.message);
      res.status(500).json({ success: false, error: "Failed to save storage settings" });
    }
  });
  router.post("/activate", async (req, res) => {
    const { provider } = req.body;
    if (!["local", "s3", "gcs", "do_spaces", "wasabi"].includes(provider)) {
      return res.status(400).json({ success: false, error: "Invalid provider" });
    }
    await db.insert(globalSettings).values({ key: "ve_storage_active_provider", value: provider, description: "Active storage provider" }).onConflictDoUpdate({ target: globalSettings.key, set: { value: provider } });
    res.json({ success: true, activeProvider: provider });
  });
  router.post("/test", async (req, res) => {
    try {
      const {
        provider,
        bucket,
        region,
        accessKey,
        secretKey,
        endpoint,
        gcsBucket,
        gcsProjectId,
        gcsCredentials
      } = req.body;
      if (provider === "local") {
        return res.json({ success: true, message: "Local storage does not require connection test" });
      }
      let finalSecretKey = secretKey;
      let finalGcsCredentials = gcsCredentials;
      if (isMasked(secretKey) || isMasked(gcsCredentials)) {
        const keys = [STORAGE_KEYS.secretKey, STORAGE_KEYS.gcsCredentials];
        const results = await db.select().from(globalSettings).where(inArray2(globalSettings.key, keys));
        const existingMap = {};
        for (const row of results) {
          existingMap[row.key] = row.value;
        }
        if (isMasked(secretKey)) {
          finalSecretKey = existingMap[STORAGE_KEYS.secretKey] || "";
        }
        if (isMasked(gcsCredentials)) {
          finalGcsCredentials = existingMap[STORAGE_KEYS.gcsCredentials] || "";
        }
      }
      if (["s3", "do_spaces", "wasabi"].includes(provider)) {
        if (!bucket || !region || !accessKey || !finalSecretKey) {
          return res.status(400).json({ success: false, message: "Bucket, Region, Access Key, and Secret Key are required" });
        }
        try {
          const { S3Client, ListObjectsV2Command } = await import("@aws-sdk/client-s3");
          const s3Config = {
            region,
            credentials: {
              accessKeyId: accessKey,
              secretAccessKey: finalSecretKey
            }
          };
          if (endpoint) {
            s3Config.endpoint = endpoint;
          } else if (provider === "do_spaces") {
            s3Config.endpoint = `https://${region}.digitaloceanspaces.com`;
          } else if (provider === "wasabi") {
            s3Config.endpoint = `https://s3.${region}.wasabisys.com`;
          }
          const client = new S3Client(s3Config);
          await client.send(new ListObjectsV2Command({ Bucket: bucket, MaxKeys: 1 }));
          return res.json({ success: true, message: `Successfully connected to ${provider} bucket "${bucket}"` });
        } catch (s3Err) {
          if (s3Err.code === "MODULE_NOT_FOUND" || s3Err.message?.includes("Cannot find module")) {
            console.warn("[VE Admin Storage] S3 client module not found, using HTTP check fallback");
            const host = endpoint ? new URL(endpoint).host : provider === "do_spaces" ? `${bucket}.${region}.digitaloceanspaces.com` : provider === "wasabi" ? `${bucket}.s3.${region}.wasabisys.com` : `${bucket}.s3.${region}.amazonaws.com`;
            try {
              const dns2 = await import("dns").then((m) => m.promises);
              await dns2.lookup(host);
              return res.json({
                success: true,
                message: `Credentials configured. Host "${host}" is resolvable (AWS SDK is not installed on the server to perform full bucket API test).`
              });
            } catch (dnsErr) {
              return res.json({
                success: false,
                message: `Failed to resolve storage host "${host}": ${dnsErr.message}`
              });
            }
          }
          return res.json({ success: false, message: `Connection failed: ${s3Err.message}` });
        }
      }
      if (provider === "gcs") {
        if (!gcsBucket || !gcsProjectId || !finalGcsCredentials) {
          return res.status(400).json({ success: false, message: "Bucket Name, Project ID, and Service Account JSON are required" });
        }
        try {
          JSON.parse(finalGcsCredentials);
        } catch {
          return res.status(400).json({ success: false, message: "Invalid Service Account JSON format" });
        }
        try {
          const { Storage } = await import("@google-cloud/storage");
          const credentials = JSON.parse(finalGcsCredentials);
          const storageClient = new Storage({
            projectId: gcsProjectId,
            credentials
          });
          await storageClient.bucket(gcsBucket).exists();
          return res.json({ success: true, message: `Successfully authenticated GCS bucket "${gcsBucket}"` });
        } catch (gcsErr) {
          if (gcsErr.code === "MODULE_NOT_FOUND" || gcsErr.message?.includes("Cannot find module")) {
            return res.json({
              success: true,
              message: "GCS credentials format validated (Google Cloud Storage SDK not installed on the server for full bucket API check)."
            });
          }
          return res.json({ success: false, message: `GCS Auth failed: ${gcsErr.message}` });
        }
      }
      res.status(400).json({ success: false, message: `Unsupported provider: ${provider}` });
    } catch (err) {
      console.error("[VE Admin Storage] Connection test error:", err.message);
      res.status(500).json({ success: false, message: `Test failed: ${err.message}` });
    }
  });
  return router;
}

// plugins/custom-voice-engine/routes/tenant-config.routes.ts
init_db();
import { Router as Router4 } from "express";
import { sql as sql5 } from "drizzle-orm";
function createTenantConfigRouter() {
  const router = Router4();
  router.get("/", async (req, res) => {
    try {
      const userId = req.userId;
      if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
      const result = await db.execute(
        sql5`SELECT * FROM ve_provider_configs WHERE user_id = ${userId} LIMIT 1`
      );
      if (result.rows.length === 0) {
        return res.json({
          success: true,
          data: {
            sttProvider: "deepgram",
            llmProvider: "openrouter",
            llmModel: "openai/gpt-4o-mini",
            ttsProvider: "deepgram",
            ttsVoice: "aura-asteria-en",
            maxConcurrentCalls: 10,
            recordingEnabled: true,
            memoryEnabled: true,
            cacheEnabled: true,
            isDefault: true
          }
        });
      }
      const config = result.rows[0];
      if (config.stt_api_key) config.stt_api_key = "***" + config.stt_api_key.slice(-4);
      if (config.llm_api_key) config.llm_api_key = "***" + config.llm_api_key.slice(-4);
      if (config.tts_api_key) config.tts_api_key = "***" + config.tts_api_key.slice(-4);
      res.json({ success: true, data: config });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.put("/", async (req, res) => {
    try {
      const userId = req.userId;
      if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
      const {
        sttProvider,
        sttApiKey,
        llmProvider,
        llmApiKey,
        llmModel,
        ttsProvider,
        ttsApiKey,
        ttsVoice,
        maxConcurrentCalls,
        recordingEnabled,
        recordingStorage,
        recordingRetentionDays,
        memoryEnabled,
        cacheEnabled,
        cacheTtlSeconds
      } = req.body;
      const result = await db.execute(sql5`
        INSERT INTO ve_provider_configs (user_id, stt_provider, stt_api_key, llm_provider, llm_api_key, llm_model, tts_provider, tts_api_key, tts_voice, max_concurrent_calls, recording_enabled, recording_storage, recording_retention_days, memory_enabled, cache_enabled, cache_ttl_seconds)
        VALUES (${userId}, ${sttProvider || "deepgram"}, ${sttApiKey || null}, ${llmProvider || "openrouter"}, ${llmApiKey || null}, ${llmModel || "openai/gpt-4o-mini"}, ${ttsProvider || "deepgram"}, ${ttsApiKey || null}, ${ttsVoice || "aura-asteria-en"}, ${maxConcurrentCalls || 10}, ${recordingEnabled ?? true}, ${recordingStorage || "local"}, ${recordingRetentionDays || 30}, ${memoryEnabled ?? true}, ${cacheEnabled ?? true}, ${cacheTtlSeconds || 3600})
        ON CONFLICT (user_id) DO UPDATE SET
          stt_provider = COALESCE(EXCLUDED.stt_provider, ve_provider_configs.stt_provider),
          stt_api_key = CASE WHEN ${sttApiKey || null} IS NOT NULL THEN ${sttApiKey || null} ELSE ve_provider_configs.stt_api_key END,
          llm_provider = COALESCE(EXCLUDED.llm_provider, ve_provider_configs.llm_provider),
          llm_api_key = CASE WHEN ${llmApiKey || null} IS NOT NULL THEN ${llmApiKey || null} ELSE ve_provider_configs.llm_api_key END,
          llm_model = COALESCE(EXCLUDED.llm_model, ve_provider_configs.llm_model),
          tts_provider = COALESCE(EXCLUDED.tts_provider, ve_provider_configs.tts_provider),
          tts_api_key = CASE WHEN ${ttsApiKey || null} IS NOT NULL THEN ${ttsApiKey || null} ELSE ve_provider_configs.tts_api_key END,
          tts_voice = COALESCE(EXCLUDED.tts_voice, ve_provider_configs.tts_voice),
          max_concurrent_calls = COALESCE(EXCLUDED.max_concurrent_calls, ve_provider_configs.max_concurrent_calls),
          recording_enabled = COALESCE(EXCLUDED.recording_enabled, ve_provider_configs.recording_enabled),
          recording_storage = COALESCE(EXCLUDED.recording_storage, ve_provider_configs.recording_storage),
          recording_retention_days = COALESCE(EXCLUDED.recording_retention_days, ve_provider_configs.recording_retention_days),
          memory_enabled = COALESCE(EXCLUDED.memory_enabled, ve_provider_configs.memory_enabled),
          cache_enabled = COALESCE(EXCLUDED.cache_enabled, ve_provider_configs.cache_enabled),
          cache_ttl_seconds = COALESCE(EXCLUDED.cache_ttl_seconds, ve_provider_configs.cache_ttl_seconds),
          updated_at = NOW()
        RETURNING *
      `);
      res.json({ success: true, data: result.rows[0] });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  return router;
}

// plugins/custom-voice-engine/routes/calls.routes.ts
init_db();
import { Router as Router5 } from "express";
import { sql as sql6 } from "drizzle-orm";
import * as os from "os";
function getContainerIp() {
  if (process.env.VE_AUDIO_WS_IP) {
    return process.env.VE_AUDIO_WS_IP;
  }
  if (process.env.PUBLIC_IP) {
    return process.env.PUBLIC_IP;
  }
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const net2 of interfaces[name] || []) {
      if (net2.family === "IPv4" && !net2.internal) {
        if (net2.address.startsWith("10.") || net2.address.startsWith("172.") || net2.address.startsWith("192.168.")) {
          return net2.address;
        }
      }
    }
  }
  return "127.0.0.1";
}
function createCallsRouter() {
  const router = Router5();
  router.get("/", async (req, res) => {
    try {
      const userId = req.userId;
      const page = parseInt(req.query.page) || 1;
      const limit = Math.min(parseInt(req.query.limit) || 20, 100);
      const offset = (page - 1) * limit;
      const direction = req.query.direction;
      const status = req.query.status;
      let query = sql6`SELECT * FROM ve_sessions WHERE user_id = ${userId}`;
      if (direction) query = sql6`${query} AND direction = ${direction}`;
      if (status) query = sql6`${query} AND status = ${status}`;
      query = sql6`${query} ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`;
      const result = await db.execute(query);
      const countResult = await db.execute(
        sql6`SELECT COUNT(*)::int as total FROM ve_sessions WHERE user_id = ${userId}`
      );
      res.json({
        success: true,
        data: result.rows,
        pagination: {
          page,
          limit,
          total: countResult.rows[0]?.total || 0
        }
      });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.get("/:id", async (req, res) => {
    try {
      const userId = req.userId;
      const { id } = req.params;
      const result = await db.execute(
        sql6`SELECT * FROM ve_sessions WHERE id = ${id} AND user_id = ${userId} LIMIT 1`
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, error: "Session not found" });
      }
      res.json({ success: true, data: result.rows[0] });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.post("/outbound", async (req, res) => {
    try {
      const userId = req.userId;
      const { agentId, toNumber, fromNumber, language, ttsVoice, llmModel, sttProvider, ttsProvider, sttModel, ttsModel } = req.body;
      if (!toNumber) {
        return res.status(400).json({ success: false, error: "toNumber is required" });
      }
      let resolvedAgentId = agentId;
      let agent;
      if (resolvedAgentId) {
        const agentResult = await db.execute(
          sql6`SELECT * FROM ve_voice_agents WHERE id = ${resolvedAgentId} AND user_id = ${userId} AND is_active = true LIMIT 1`
        );
        if (agentResult.rows.length === 0) {
          return res.status(404).json({ success: false, error: "Agent not found or inactive" });
        }
        agent = agentResult.rows[0];
      } else {
        const agentResult = await db.execute(
          sql6`SELECT * FROM ve_voice_agents WHERE user_id = ${userId} AND is_active = true ORDER BY created_at DESC LIMIT 1`
        );
        if (agentResult.rows.length === 0) {
          const fallbackResult = await db.execute(
            sql6`SELECT * FROM ve_voice_agents WHERE user_id = ${userId} ORDER BY created_at DESC LIMIT 1`
          );
          if (fallbackResult.rows.length === 0) {
            return res.status(404).json({ success: false, error: "No voice agents found. Please create an agent first." });
          }
          agent = fallbackResult.rows[0];
        } else {
          agent = agentResult.rows[0];
        }
        resolvedAgentId = agent.id;
      }
      const metadata = {
        language,
        ttsVoice,
        llmModel,
        sttProvider,
        ttsProvider,
        sttModel,
        ttsModel,
        isPublicDemo: true
      };
      const sessionResult = await db.execute(sql6`
        INSERT INTO ve_sessions (user_id, agent_id, to_number, from_number, direction, status, metadata)
        VALUES (${userId}, ${resolvedAgentId}, ${toNumber}, ${fromNumber || null}, 'outbound', 'initializing', ${JSON.stringify(metadata)})
        RETURNING *
      `);
      const session = sessionResult.rows[0];
      const nodesResult = await db.execute(sql6`SELECT * FROM ve_freeswitch_nodes WHERE status = 'online' ORDER BY created_at ASC`);
      const nodes = nodesResult.rows;
      if (nodes.length === 0) {
        throw new Error("No active FreeSWITCH nodes available");
      }
      const node = nodes[0];
      const eslHost = node.esl_host || node.eslHost;
      const eslPort = node.esl_port || node.eslPort;
      const eslPassword = node.esl_password || node.eslPassword || "ClueCon";
      const eslConnection = new EslConnection({ host: eslHost, port: eslPort, password: eslPassword, reconnect: false });
      await eslConnection.connect();
      let activeGateway = null;
      const userGatewayResult = await db.execute(sql6`
        SELECT id, name, proxy, username, password FROM user_sip_gateways WHERE user_id = ${userId} AND is_active = true LIMIT 1
      `);
      if (userGatewayResult.rows.length > 0) {
        activeGateway = userGatewayResult.rows[0];
      }
      let activePhoneNumber = "FreeSWITCH";
      if (activeGateway) {
        const sipPhoneResult = await db.execute(sql6`
          SELECT phone_number FROM user_sip_phone_numbers WHERE gateway_id = ${activeGateway.id} LIMIT 1
        `);
        if (sipPhoneResult.rows.length > 0) {
          activePhoneNumber = sipPhoneResult.rows[0].phone_number;
        }
      }
      const gatewayProxy = activeGateway ? activeGateway.proxy : "testhr.pstn.twilio.com";
      const gatewayUsername = activeGateway?.username;
      const gatewayPassword = activeGateway?.password;
      const formattedTo = !toNumber.startsWith("+") ? `+${toNumber}` : toNumber;
      const dialString = `sofia/external/${formattedTo}@${gatewayProxy}`;
      const destination = `${formattedTo} XML public`;
      const callerId = fromNumber && fromNumber !== "FreeSWITCH" ? fromNumber : activePhoneNumber;
      const formattedCallerId = callerId !== "FreeSWITCH" && !callerId.startsWith("+") ? `+${callerId}` : callerId;
      const options = {
        origination_uuid: session.id,
        origination_caller_id_number: formattedCallerId,
        origination_caller_id_name: formattedCallerId,
        effective_caller_id_number: formattedCallerId,
        effective_caller_id_name: formattedCallerId,
        sip_from_uri: `sip:${formattedCallerId}@${gatewayProxy}`,
        sip_invite_req_uri: `sip:${formattedTo}@${gatewayProxy}`,
        ve_audio_ws_url: `ws://${getContainerIp()}:${process.env.PORT || "5000"}/voice-engine/ws/audio`,
        ...gatewayUsername && { sip_auth_username: gatewayUsername },
        ...gatewayPassword && { sip_auth_password: gatewayPassword }
      };
      try {
        await eslConnection.originate(dialString, destination, options);
        await db.execute(sql6`
          UPDATE ve_sessions SET status = 'active', channel_uuid = ${session.id} WHERE id = ${session.id}
        `);
      } catch (originateErr) {
        await db.execute(sql6`
          UPDATE ve_sessions SET status = 'failed' WHERE id = ${session.id}
        `);
        throw originateErr;
      } finally {
        await eslConnection.disconnect().catch(() => {
        });
      }
      res.json({ success: true, data: session });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.post("/:id/hangup", async (req, res) => {
    try {
      const userId = req.userId;
      const { id } = req.params;
      await db.execute(sql6`
        UPDATE ve_sessions SET status = 'completed', ended_at = NOW(), end_reason = 'user_hangup', updated_at = NOW()
        WHERE id = ${id} AND user_id = ${userId} AND status IN ('initializing', 'active')
      `);
      res.json({ success: true, message: "Call ended" });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  return router;
}

// plugins/custom-voice-engine/routes/recordings.routes.ts
init_db();
import { Router as Router6 } from "express";
import { sql as sql7 } from "drizzle-orm";
function createRecordingsRouter() {
  const router = Router6();
  router.get("/", async (req, res) => {
    try {
      const userId = req.userId;
      const page = parseInt(req.query.page) || 1;
      const limit = Math.min(parseInt(req.query.limit) || 20, 100);
      const offset = (page - 1) * limit;
      const result = await db.execute(sql7`
        SELECT r.*, s.from_number, s.to_number, s.direction, s.ai_summary
        FROM ve_call_recordings r
        LEFT JOIN ve_sessions s ON r.session_id = s.id
        WHERE r.user_id = ${userId} AND r.status = 'available'
        ORDER BY r.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `);
      res.json({ success: true, data: result.rows });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.get("/:id", async (req, res) => {
    try {
      const userId = req.userId;
      const result = await db.execute(
        sql7`SELECT * FROM ve_call_recordings WHERE id = ${req.params.id} AND user_id = ${userId} LIMIT 1`
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, error: "Recording not found" });
      }
      res.json({ success: true, data: result.rows[0] });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.delete("/:id", async (req, res) => {
    try {
      const userId = req.userId;
      await db.execute(
        sql7`UPDATE ve_call_recordings SET status = 'deleted' WHERE id = ${req.params.id} AND user_id = ${userId}`
      );
      res.json({ success: true, message: "Recording deleted" });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  return router;
}

// plugins/custom-voice-engine/routes/memory.routes.ts
init_db();
import { Router as Router7 } from "express";
import { sql as sql8 } from "drizzle-orm";
function createMemoryRouter() {
  const router = Router7();
  router.get("/", async (req, res) => {
    try {
      const userId = req.userId;
      const limit = Math.min(parseInt(req.query.limit) || 20, 100);
      const offset = ((parseInt(req.query.page) || 1) - 1) * limit;
      const result = await db.execute(
        sql8`SELECT * FROM ve_customer_memory WHERE user_id = ${userId} ORDER BY last_interaction_at DESC NULLS LAST LIMIT ${limit} OFFSET ${offset}`
      );
      res.json({ success: true, data: result.rows });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.get("/:id", async (req, res) => {
    try {
      const userId = req.userId;
      const memResult = await db.execute(
        sql8`SELECT * FROM ve_customer_memory WHERE id = ${req.params.id} AND user_id = ${userId} LIMIT 1`
      );
      if (memResult.rows.length === 0) return res.status(404).json({ success: false, error: "Not found" });
      const facts = await db.execute(sql8`SELECT * FROM ve_customer_facts WHERE memory_id = ${req.params.id} ORDER BY extracted_at DESC LIMIT 50`);
      const history = await db.execute(sql8`SELECT * FROM ve_conversation_memory WHERE memory_id = ${req.params.id} ORDER BY call_date DESC LIMIT 20`);
      res.json({ success: true, data: { ...memResult.rows[0], facts: facts.rows, callHistory: history.rows } });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.put("/:id", async (req, res) => {
    try {
      const userId = req.userId;
      const { customerName, customerEmail, customerCompany, language, timezone } = req.body;
      await db.execute(sql8`UPDATE ve_customer_memory SET customer_name = COALESCE(${customerName}, customer_name), customer_email = COALESCE(${customerEmail}, customer_email), customer_company = COALESCE(${customerCompany}, customer_company), language = COALESCE(${language}, language), timezone = COALESCE(${timezone}, timezone), updated_at = NOW() WHERE id = ${req.params.id} AND user_id = ${userId}`);
      res.json({ success: true, message: "Updated" });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  return router;
}

// plugins/custom-voice-engine/routes/analytics.routes.ts
init_db();
import { Router as Router8 } from "express";
import { sql as sql9 } from "drizzle-orm";
function createAnalyticsRouter() {
  const router = Router8();
  router.get("/dashboard", async (req, res) => {
    try {
      const userId = req.userId;
      const days = parseInt(req.query.days) || 30;
      const [calls3, usage, active] = await Promise.all([
        db.execute(sql9`SELECT COUNT(*)::int as total, COALESCE(AVG(duration_seconds), 0)::int as avg_duration, COALESCE(SUM(duration_seconds), 0)::int as total_duration, COUNT(CASE WHEN direction = 'inbound' THEN 1 END)::int as inbound, COUNT(CASE WHEN direction = 'outbound' THEN 1 END)::int as outbound FROM ve_sessions WHERE user_id = ${userId} AND created_at >= NOW() - INTERVAL '1 day' * ${days}`),
        db.execute(sql9`SELECT COALESCE(SUM(total_cost), 0) as total_cost, COALESCE(SUM(stt_cost), 0) as stt_cost, COALESCE(SUM(llm_cost), 0) as llm_cost, COALESCE(SUM(tts_cost), 0) as tts_cost, COALESCE(SUM(llm_prompt_tokens + llm_completion_tokens), 0)::int as total_tokens FROM ve_usage_tracking WHERE user_id = ${userId} AND created_at >= NOW() - INTERVAL '1 day' * ${days}`),
        db.execute(sql9`SELECT COUNT(*)::int as count FROM ve_sessions WHERE user_id = ${userId} AND status = 'active'`)
      ]);
      res.json({
        success: true,
        data: {
          calls: calls3.rows[0],
          usage: usage.rows[0],
          activeCalls: active.rows[0]?.count || 0
        }
      });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.get("/calls-per-day", async (req, res) => {
    try {
      const userId = req.userId;
      const days = parseInt(req.query.days) || 30;
      const result = await db.execute(sql9`SELECT DATE(created_at) as date, COUNT(*)::int as calls, COALESCE(AVG(duration_seconds), 0)::int as avg_duration FROM ve_sessions WHERE user_id = ${userId} AND created_at >= NOW() - INTERVAL '1 day' * ${days} GROUP BY DATE(created_at) ORDER BY date ASC`);
      res.json({ success: true, data: result.rows });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.get("/provider-latency", async (req, res) => {
    try {
      const userId = req.userId;
      const result = await db.execute(sql9`SELECT stt_provider, llm_provider, tts_provider, COUNT(*)::int as calls, COALESCE(AVG(stt_duration_ms), 0)::int as avg_stt_ms, COALESCE(AVG(tts_duration_ms), 0)::int as avg_tts_ms FROM ve_sessions WHERE user_id = ${userId} AND created_at >= NOW() - INTERVAL '7 days' GROUP BY stt_provider, llm_provider, tts_provider`);
      res.json({ success: true, data: result.rows });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  return router;
}

// plugins/custom-voice-engine/routes/agents.routes.ts
init_db();
init_schema();
import { Router as Router9 } from "express";
import { sql as sql10, eq as eq4 } from "drizzle-orm";
function formatPgArray(arr) {
  if (!arr || !arr.length) return null;
  return `{${arr.map((val) => `"${val.replace(/"/g, '\\"')}"`).join(",")}}`;
}
function createAgentsRouter() {
  const router = Router9();
  router.get("/", async (req, res) => {
    try {
      const userId = req.userId;
      const result = await db.execute(sql10`SELECT * FROM ve_voice_agents WHERE user_id = ${userId} ORDER BY created_at DESC`);
      res.json({ success: true, data: result.rows });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.get("/:id", async (req, res) => {
    try {
      const userId = req.userId;
      const result = await db.execute(sql10`SELECT * FROM ve_voice_agents WHERE id = ${req.params.id} AND user_id = ${userId} LIMIT 1`);
      if (result.rows.length === 0) return res.status(404).json({ success: false, error: "Agent not found" });
      res.json({ success: true, data: result.rows[0] });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.post("/", async (req, res) => {
    try {
      const userId = req.userId;
      const { name, description, systemPrompt, firstMessage, language, llmModel, temperature, maxTokens, ttsVoice, ttsProvider, sttProvider, sttModel, ttsModel, interruptible, silenceTimeoutMs, maxDurationSeconds, endCallOnSilence, businessRules, knowledgeBaseIds, enabledTools, enableMemory, memoryRetentionDays, detectLanguageEnabled, appointmentBookingEnabled, endConversationEnabled, transferEnabled, transferPhoneNumber, messagingEmailEnabled, messagingWhatsappEnabled, messagingEmailTemplate, messagingWhatsappTemplate } = req.body;
      if (!name || !systemPrompt) return res.status(400).json({ success: false, error: "name and systemPrompt are required" });
      const result = await db.execute(sql10`
        INSERT INTO ve_voice_agents (
          user_id, name, description, system_prompt, first_message, language, llm_model, 
          temperature, max_tokens, tts_voice, tts_provider, stt_provider, stt_model, tts_model, interruptible, 
          silence_timeout_ms, max_duration_seconds, end_call_on_silence, business_rules, 
          knowledge_base_ids, enabled_tools, enable_memory, memory_retention_days, 
          detect_language_enabled, appointment_booking_enabled, end_conversation_enabled, 
          transfer_enabled, transfer_phone_number, messaging_email_enabled, 
          messaging_whatsapp_enabled, messaging_email_template, messaging_whatsapp_template
        )
        VALUES (
          ${userId}, ${name}, ${description || null}, ${systemPrompt}, ${firstMessage || "Hello! How can I help you today?"}, 
          ${language || "en"}, ${llmModel || "gemini-2.0-flash"}, ${temperature || 0.7}, ${maxTokens || 500}, 
          ${ttsVoice || "aura-asteria-en"}, ${ttsProvider || "deepgram"}, ${sttProvider || "deepgram"}, 
          ${sttModel || (sttProvider === "sarvam" ? "saaras:v3" : null)}, ${ttsModel || (ttsProvider === "sarvam" ? "bulbul:v3" : null)},
          ${interruptible ?? true}, ${silenceTimeoutMs || 5e3}, ${maxDurationSeconds || 600}, 
          ${endCallOnSilence ?? false}, ${JSON.stringify(businessRules || [])}, ${formatPgArray(knowledgeBaseIds)}, 
          ${formatPgArray(enabledTools)}, ${enableMemory ?? true}, ${memoryRetentionDays || 90}, 
          ${detectLanguageEnabled ?? false}, ${appointmentBookingEnabled ?? false}, ${endConversationEnabled ?? false}, 
          ${transferEnabled ?? false}, ${transferPhoneNumber || null}, ${messagingEmailEnabled ?? false}, 
          ${messagingWhatsappEnabled ?? false}, ${messagingEmailTemplate || null}, ${messagingWhatsappTemplate || null}
        )
        RETURNING *
      `);
      res.json({ success: true, data: result.rows[0] });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.put("/:id", async (req, res) => {
    try {
      const userId = req.userId;
      const { name, description, systemPrompt, firstMessage, language, llmModel, temperature, maxTokens, ttsVoice, ttsProvider, sttProvider, sttModel, ttsModel, interruptible, silenceTimeoutMs, maxDurationSeconds, endCallOnSilence, businessRules, knowledgeBaseIds, enableMemory, isActive, detectLanguageEnabled, appointmentBookingEnabled, endConversationEnabled, transferEnabled, transferPhoneNumber, messagingEmailEnabled, messagingWhatsappEnabled, messagingEmailTemplate, messagingWhatsappTemplate } = req.body;
      const effectiveSttModel = sttModel !== void 0 ? sttModel || (sttProvider === "sarvam" ? "saaras:v3" : sttModel) : void 0;
      const effectiveTtsModel = ttsModel !== void 0 ? ttsModel || (ttsProvider === "sarvam" ? "bulbul:v3" : ttsModel) : void 0;
      const result = await db.execute(sql10`
        UPDATE ve_voice_agents SET
          name = COALESCE(${name}, name), description = COALESCE(${description}, description),
          system_prompt = COALESCE(${systemPrompt}, system_prompt), first_message = COALESCE(${firstMessage}, first_message),
          language = COALESCE(${language}, language), llm_model = COALESCE(${llmModel}, llm_model),
          temperature = COALESCE(${temperature}, temperature), max_tokens = COALESCE(${maxTokens}, max_tokens),
          tts_voice = COALESCE(${ttsVoice}, tts_voice), tts_provider = COALESCE(${ttsProvider}, tts_provider),
          stt_provider = COALESCE(${sttProvider}, stt_provider), stt_model = COALESCE(${effectiveSttModel}, stt_model),
          tts_model = COALESCE(${effectiveTtsModel}, tts_model), interruptible = ${interruptible === void 0 ? sql10`interruptible` : interruptible},
          silence_timeout_ms = COALESCE(${silenceTimeoutMs}, silence_timeout_ms),
          max_duration_seconds = COALESCE(${maxDurationSeconds}, max_duration_seconds),
          end_call_on_silence = ${endCallOnSilence === void 0 ? sql10`end_call_on_silence` : endCallOnSilence},
          business_rules = COALESCE(${businessRules ? JSON.stringify(businessRules) : null}, business_rules),
          knowledge_base_ids = ${knowledgeBaseIds === void 0 ? sql10`knowledge_base_ids` : formatPgArray(knowledgeBaseIds)},
          enable_memory = ${enableMemory === void 0 ? sql10`enable_memory` : enableMemory},
          detect_language_enabled = ${detectLanguageEnabled === void 0 ? sql10`detect_language_enabled` : detectLanguageEnabled},
          appointment_booking_enabled = ${appointmentBookingEnabled === void 0 ? sql10`appointment_booking_enabled` : appointmentBookingEnabled},
          end_conversation_enabled = ${endConversationEnabled === void 0 ? sql10`end_conversation_enabled` : endConversationEnabled},
          transfer_enabled = ${transferEnabled === void 0 ? sql10`transfer_enabled` : transferEnabled},
          transfer_phone_number = COALESCE(${transferPhoneNumber}, transfer_phone_number),
          messaging_email_enabled = ${messagingEmailEnabled === void 0 ? sql10`messaging_email_enabled` : messagingEmailEnabled},
          messaging_whatsapp_enabled = ${messagingWhatsappEnabled === void 0 ? sql10`messaging_whatsapp_enabled` : messagingWhatsappEnabled},
          messaging_email_template = COALESCE(${messagingEmailTemplate}, messaging_email_template),
          messaging_whatsapp_template = COALESCE(${messagingWhatsappTemplate}, messaging_whatsapp_template),
          is_active = ${isActive === void 0 ? sql10`is_active` : isActive}, updated_at = NOW()
        WHERE id = ${req.params.id} AND user_id = ${userId} RETURNING *
      `);
      if (result.rows.length === 0) return res.status(404).json({ success: false, error: "Not found" });
      try {
        await db.execute(sql10`
          UPDATE agents 
          SET name = COALESCE(${name}, name),
              language = COALESCE(${language}, language),
              system_prompt = COALESCE(${systemPrompt}, system_prompt),
              first_message = COALESCE(${firstMessage}, first_message),
              llm_model = COALESCE(${llmModel}, llm_model),
              temperature = COALESCE(${temperature}, temperature)
          WHERE id = ${req.params.id} AND user_id = ${userId}
        `);
      } catch (syncErr) {
        console.error("Failed to sync updated custom voice agent to agents table:", syncErr);
      }
      res.json({ success: true, data: result.rows[0] });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.delete("/:id", async (req, res) => {
    try {
      const userId = req.userId;
      await db.execute(sql10`DELETE FROM ve_voice_agents WHERE id = ${req.params.id} AND user_id = ${userId}`);
      res.json({ success: true, message: "Agent deleted" });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  router.post("/preview", async (req, res) => {
    try {
      const { voiceId, text: text2, provider, language, ttsModel } = req.body;
      if (!voiceId) {
        return res.status(400).json({ success: false, error: "voiceId is required" });
      }
      const previewText = text2 || "Hello! This is a preview of how I'll sound. I can adjust my tone and style based on your preferences.";
      const isSarvam = provider === "sarvam";
      const providerName = isSarvam ? "sarvam" : "deepgram";
      const keyName = isSarvam ? "ve_sarvam_api_key" : "ve_deepgram_api_key";
      const [setting] = await db.select().from(globalSettings).where(eq4(globalSettings.key, keyName)).limit(1);
      const apiKey = setting?.value;
      if (!apiKey) {
        return res.status(400).json({ success: false, error: `API key for ${providerName} is not configured in settings.` });
      }
      const ttsProvider = TtsProviderFactory.create(providerName);
      const effectiveModel = isSarvam ? ttsModel || "bulbul:v3" : void 0;
      const config = isSarvam ? {
        apiKey,
        voice: voiceId,
        sarvamSpeaker: voiceId,
        sarvamModel: effectiveModel,
        language: language || "en-IN",
        outputFormat: {
          encoding: "linear16",
          sampleRate: 8e3
        },
        speed: 1
      } : {
        apiKey,
        voice: voiceId,
        language: language || "en",
        outputFormat: {
          encoding: "mp3",
          sampleRate: 24e3
        }
      };
      const audioBuffer = await ttsProvider.synthesize(previewText, config);
      res.setHeader("Content-Type", isSarvam ? "audio/wav" : "audio/mpeg");
      res.setHeader("Content-Length", audioBuffer.length);
      res.setHeader("Cache-Control", "no-cache");
      res.send(audioBuffer);
    } catch (err) {
      console.error("[CVE Voice Preview] Error:", err.message);
      const detail = err.response?.data ? JSON.stringify(err.response.data) : null;
      res.status(500).json({ success: false, error: err.message || "Failed to generate voice preview", detail });
    }
  });
  return router;
}

// plugins/custom-voice-engine/services/audio-pipeline/ws-audio-server.ts
import { WebSocketServer, WebSocket as WebSocket4 } from "ws";
import fs3 from "fs";
import os2 from "os";
import path3 from "path";

// plugins/custom-voice-engine/services/audio-pipeline/audio-session.ts
init_db();
import { EventEmitter as EventEmitter2 } from "events";
import * as fs2 from "fs";
import * as path2 from "path";
import { sql as sql15 } from "drizzle-orm";

// plugins/custom-voice-engine/services/tools/tool-executor.ts
init_db();
init_schema();
import { sql as sql14, eq as eq10 } from "drizzle-orm";
import { nanoid as nanoid2 } from "nanoid";
import fs from "fs";
import path from "path";

// server/services/google-calendar/google-calendar.service.ts
init_db();
init_schema();
import { eq as eq8 } from "drizzle-orm";

// server/services/google-sheets/google-sheets.service.ts
init_db();
init_schema();
init_storage();
import { eq as eq7 } from "drizzle-orm";
var GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
var GOOGLE_SHEETS_API = "https://sheets.googleapis.com/v4/spreadsheets";
async function getGoogleCredentials() {
  try {
    const [dbClientId, dbClientSecret] = await Promise.all([
      storage.getGlobalSetting("google_client_id"),
      storage.getGlobalSetting("google_client_secret")
    ]);
    const clientId = dbClientId?.value?.trim() || process.env.GOOGLE_CLIENT_ID;
    const clientSecret = dbClientSecret?.value?.trim() || process.env.GOOGLE_CLIENT_SECRET;
    if (clientId && clientSecret) return { clientId, clientSecret };
  } catch (err) {
    console.error("[GoogleSheets] Failed to read credentials from DB, falling back to env:", err.message);
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    if (clientId && clientSecret) return { clientId, clientSecret };
  }
  return null;
}
async function refreshAccessToken(userId, force = false) {
  const [cred] = await db.select().from(googleSheetsCredentials).where(eq7(googleSheetsCredentials.userId, userId)).limit(1);
  if (!cred) return null;
  const now = /* @__PURE__ */ new Date();
  if (!force && cred.tokenExpiry > now) {
    return cred.accessToken;
  }
  const creds = await getGoogleCredentials();
  if (!creds) {
    console.error("[GoogleSheets] Google OAuth credentials not configured (DB or env)");
    return null;
  }
  const { clientId, clientSecret } = creds;
  try {
    const resp = await fetch(GOOGLE_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: cred.refreshToken,
        grant_type: "refresh_token"
      })
    });
    if (!resp.ok) {
      console.error("[GoogleSheets] Token refresh failed:", await resp.text());
      return null;
    }
    const data = await resp.json();
    const newExpiry = new Date(Date.now() + data.expires_in * 1e3);
    await db.update(googleSheetsCredentials).set({
      accessToken: data.access_token,
      tokenExpiry: newExpiry,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq7(googleSheetsCredentials.userId, userId));
    return data.access_token;
  } catch (err) {
    console.error("[GoogleSheets] Token refresh error:", err.message);
    return null;
  }
}
async function readSheetRow1(accessToken, spreadsheetId, sheetName) {
  const range = encodeURIComponent(`${sheetName}!A1:Z1`);
  const url = `${GOOGLE_SHEETS_API}/${encodeURIComponent(spreadsheetId)}/values/${range}`;
  try {
    const resp = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
    if (resp.status === 401) return null;
    if (!resp.ok) {
      console.warn(`[GoogleSheets] readSheetRow1 failed (${resp.status}) for sheet ${spreadsheetId}`);
      return null;
    }
    const data = await resp.json();
    return data.values?.[0] ?? [];
  } catch (err) {
    console.warn("[GoogleSheets] readSheetRow1 error:", err.message);
    return null;
  }
}
async function ensureSheetHeaders(userId, spreadsheetId, sheetName, headerRow) {
  let token = await refreshAccessToken(userId);
  if (!token) {
    console.warn("[GoogleSheets] ensureSheetHeaders: no valid token for user:", userId);
    return false;
  }
  try {
    let existing = await readSheetRow1(token, spreadsheetId, sheetName);
    if (existing === null) {
      console.warn(`[GoogleSheets] readSheetRow1 returned null for sheet ${spreadsheetId} tab "${sheetName}" \u2014 forcing token refresh`);
      const freshToken = await refreshAccessToken(userId, true);
      if (!freshToken) return false;
      token = freshToken;
      existing = await readSheetRow1(freshToken, spreadsheetId, sheetName);
      if (existing === null) {
        console.error(`[GoogleSheets] readSheetRow1 still failed after token refresh for sheet ${spreadsheetId}`);
        return false;
      }
    }
    if (existing.length > 0) {
      console.log(`[GoogleSheets] Header row already exists in "${sheetName}" \u2014 skipping write`);
      return false;
    }
    const range = encodeURIComponent(`${sheetName}!A1`);
    const url = `${GOOGLE_SHEETS_API}/${encodeURIComponent(spreadsheetId)}/values/${range}?valueInputOption=USER_ENTERED`;
    let resp = await fetch(url, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ values: [headerRow], range: `${sheetName}!A1` })
    });
    if (resp.status === 401) {
      const freshToken = await refreshAccessToken(userId, true);
      if (!freshToken) return false;
      resp = await fetch(url, {
        method: "PUT",
        headers: { Authorization: `Bearer ${freshToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({ values: [headerRow], range: `${sheetName}!A1` })
      });
    }
    if (!resp.ok) {
      const errText = await resp.text();
      console.error(`[GoogleSheets] ensureSheetHeaders write failed for sheet ${spreadsheetId} tab "${sheetName}":`, errText);
      return false;
    }
    console.log(`[GoogleSheets] Header row written to "${sheetName}" (${spreadsheetId}): [${headerRow.join(", ")}]`);
    return true;
  } catch (err) {
    console.error("[GoogleSheets] ensureSheetHeaders error:", err.message);
    return false;
  }
}
async function appendRowToSheet(userId, spreadsheetId, sheetName, rowData) {
  const token = await refreshAccessToken(userId);
  if (!token) {
    console.error("[GoogleSheets] No valid token for user:", userId);
    return false;
  }
  const doAppend = async (accessToken) => {
    const range = encodeURIComponent(`${sheetName}!A1`);
    const url = `${GOOGLE_SHEETS_API}/${encodeURIComponent(spreadsheetId)}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
    return fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({ values: [rowData] })
    });
  };
  try {
    let resp = await doAppend(token);
    if (resp.status === 401) {
      console.warn("[GoogleSheets] Got 401, forcing token refresh and retrying append...");
      const freshToken = await refreshAccessToken(userId, true);
      if (!freshToken) {
        console.error("[GoogleSheets] Force refresh failed \u2014 cannot append row");
        return false;
      }
      resp = await doAppend(freshToken);
    }
    if (!resp.ok) {
      const errText = await resp.text();
      console.error("[GoogleSheets] Append row failed:", errText);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[GoogleSheets] Append row error:", err.message);
    return false;
  }
}

// server/services/google-calendar/google-calendar.service.ts
var GOOGLE_TOKEN_URL2 = "https://oauth2.googleapis.com/token";
var GOOGLE_CALENDAR_API = "https://www.googleapis.com/calendar/v3";
async function refreshCalendarToken(userId, force = false) {
  const [cred] = await db.select().from(googleCalendarCredentials).where(eq8(googleCalendarCredentials.userId, userId)).limit(1);
  if (!cred) return null;
  const now = /* @__PURE__ */ new Date();
  if (!force && cred.tokenExpiry > now) {
    return cred.accessToken;
  }
  const creds = await getGoogleCredentials();
  if (!creds) {
    console.error("[GoogleCalendar] Google OAuth credentials not configured");
    return null;
  }
  try {
    const resp = await fetch(GOOGLE_TOKEN_URL2, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: creds.clientId,
        client_secret: creds.clientSecret,
        refresh_token: cred.refreshToken,
        grant_type: "refresh_token"
      })
    });
    if (!resp.ok) {
      console.error("[GoogleCalendar] Token refresh failed:", await resp.text());
      return null;
    }
    const data = await resp.json();
    const newExpiry = new Date(Date.now() + data.expires_in * 1e3);
    await db.update(googleCalendarCredentials).set({ accessToken: data.access_token, tokenExpiry: newExpiry, updatedAt: /* @__PURE__ */ new Date() }).where(eq8(googleCalendarCredentials.userId, userId));
    return data.access_token;
  } catch (err) {
    console.error("[GoogleCalendar] Token refresh error:", err.message);
    return null;
  }
}
function buildEventBody(apt, timezone) {
  const dateStr = apt.appointmentDate;
  const timeStr = apt.appointmentTime.substring(0, 5);
  const startDateTime = `${dateStr}T${timeStr}:00`;
  const [hoursStr, minutesStr] = timeStr.split(":");
  const [yearStr, monthStr, dayStr] = dateStr.split("-");
  const startYear = parseInt(yearStr, 10);
  const startMonth = parseInt(monthStr, 10) - 1;
  const startDay = parseInt(dayStr, 10);
  const startHours = parseInt(hoursStr, 10);
  const startMinutes = parseInt(minutesStr, 10);
  const startDate = new Date(startYear, startMonth, startDay, startHours, startMinutes);
  const endDate = new Date(startDate.getTime() + apt.duration * 60 * 1e3);
  const endYear = endDate.getFullYear();
  const endMonth = String(endDate.getMonth() + 1).padStart(2, "0");
  const endDay = String(endDate.getDate()).padStart(2, "0");
  const endHours = String(endDate.getHours()).padStart(2, "0");
  const endMinutes = String(endDate.getMinutes()).padStart(2, "0");
  const endDateTime = `${endYear}-${endMonth}-${endDay}T${endHours}:${endMinutes}:00`;
  const descParts = [
    `Phone: ${apt.contactPhone}`
  ];
  if (apt.contactEmail) descParts.push(`Email: ${apt.contactEmail}`);
  if (apt.serviceName) descParts.push(`Service: ${apt.serviceName}`);
  descParts.push(`Duration: ${apt.duration} minutes`);
  if (apt.notes) descParts.push(`Notes: ${apt.notes}`);
  descParts.push(`
Booked by AI agent via Diploy`);
  if (apt.status === "completed") {
    const completedAt = (/* @__PURE__ */ new Date()).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
    descParts.push(`
Completed at: ${completedAt}`);
  }
  const statusLabel = apt.status.charAt(0).toUpperCase() + apt.status.slice(1);
  return {
    summary: `${statusLabel}: ${apt.contactName}${apt.serviceName ? ` \u2014 ${apt.serviceName}` : ""}`,
    description: descParts.join("\n"),
    start: { dateTime: startDateTime, timeZone: timezone },
    end: { dateTime: endDateTime, timeZone: timezone }
  };
}
async function createCalendarEvent(userId, apt) {
  let token = await refreshCalendarToken(userId);
  if (!token) return null;
  const [user] = await db.select({ timezone: users.timezone }).from(users).where(eq8(users.id, userId)).limit(1);
  const timezone = user?.timezone || "UTC";
  const body = buildEventBody(apt, timezone);
  const doCreate = (t) => fetch(`${GOOGLE_CALENDAR_API}/calendars/primary/events`, {
    method: "POST",
    headers: { Authorization: `Bearer ${t}`, "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  try {
    let resp = await doCreate(token);
    if (resp.status === 401) {
      const fresh = await refreshCalendarToken(userId, true);
      if (!fresh) return null;
      resp = await doCreate(fresh);
    }
    if (!resp.ok) {
      console.error("[GoogleCalendar] Create event failed:", await resp.text());
      return null;
    }
    const data = await resp.json();
    console.log(`\u{1F4C5} [GoogleCalendar] Created event ${data.id} for appointment ${apt.id}`);
    return data.id;
  } catch (err) {
    console.error("[GoogleCalendar] Create event error:", err.message);
    return null;
  }
}
async function isCalendarSyncEnabled(userId) {
  const [cred] = await db.select({ id: googleCalendarCredentials.id }).from(googleCalendarCredentials).where(eq8(googleCalendarCredentials.userId, userId)).limit(1);
  if (!cred) return false;
  const [settings] = await db.select({ syncToGoogleCalendar: appointmentSettings.syncToGoogleCalendar }).from(appointmentSettings).where(eq8(appointmentSettings.userId, userId)).limit(1);
  return settings?.syncToGoogleCalendar ?? false;
}

// server/services/rag-knowledge.ts
init_db();
init_schema();
import OpenAI from "openai";
import { eq as eq9, and as and3, inArray as inArray5, sql as sql13 } from "drizzle-orm";
var embeddingModel = "text-embedding-3-small";
var MAX_CHUNK_CHARS = 2e3;
var DEFAULT_STORAGE_LIMIT_BYTES = 20 * 1024 * 1024;
var openaiClient = null;
var lastApiKey = null;
async function getOpenAIClient() {
  let apiKey = "";
  let baseURL = void 0;
  try {
    const [dbSetting] = await db.select().from(globalSettings).where(eq9(globalSettings.key, "openai_api_key")).limit(1);
    if (dbSetting?.value) {
      apiKey = dbSetting.value;
    }
  } catch (e) {
  }
  if (!apiKey && process.env.OPENAI_API_KEY) {
    apiKey = process.env.OPENAI_API_KEY;
  }
  if (!apiKey) {
    try {
      const [dbSetting] = await db.select().from(globalSettings).where(eq9(globalSettings.key, "openrouter_api_key")).limit(1);
      if (dbSetting?.value) {
        apiKey = dbSetting.value;
        baseURL = "https://openrouter.ai/api/v1";
        embeddingModel = "openai/text-embedding-3-small";
      }
    } catch (e) {
    }
  }
  if (!apiKey && process.env.OPENROUTER_API_KEY) {
    apiKey = process.env.OPENROUTER_API_KEY;
    baseURL = "https://openrouter.ai/api/v1";
    embeddingModel = "openai/text-embedding-3-small";
  }
  if (!apiKey) {
    throw new Error("No API key found for embeddings. Configure either openai_api_key or openrouter_api_key in Admin Settings.");
  }
  const clientKey = `${apiKey}_${baseURL || "default"}`;
  if (!openaiClient || lastApiKey !== clientKey) {
    openaiClient = new OpenAI({
      apiKey,
      baseURL,
      timeout: 1e4
    });
    lastApiKey = clientKey;
  }
  return openaiClient;
}
function cosineSimilarity(a, b) {
  if (a.length !== b.length) {
    throw new Error("Vectors must have same length");
  }
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}
function chunkText(text2, maxChars = MAX_CHUNK_CHARS, overlapChars = 200) {
  const chunks = [];
  const cleanText = text2.replace(/\s+/g, " ").trim();
  if (cleanText.length <= maxChars) {
    return [cleanText];
  }
  let start = 0;
  while (start < cleanText.length) {
    let end = start + maxChars;
    if (end < cleanText.length) {
      const lastPeriod = cleanText.lastIndexOf(".", end);
      const lastNewline = cleanText.lastIndexOf("\n", end);
      const breakPoint = Math.max(lastPeriod, lastNewline);
      if (breakPoint > start + maxChars / 2) {
        end = breakPoint + 1;
      }
    }
    const chunk = cleanText.slice(start, end).trim();
    if (chunk.length > 0) {
      chunks.push(chunk);
    }
    start = end - overlapChars;
    if (start >= cleanText.length) break;
  }
  return chunks;
}
function parseJsonToChunks(data) {
  const chunks = [];
  function traverse(node, path4 = "") {
    if (node === null || node === void 0) return;
    if (Array.isArray(node)) {
      if (node.length > 0 && typeof node[0] === "object" && node[0] !== null) {
        for (const item of node) {
          const itemText = objectToReadableText(item, path4);
          if (itemText) chunks.push(itemText);
        }
      } else {
        chunks.push(`${path4}: ${node.join(", ")}`);
      }
    } else if (typeof node === "object") {
      const keys = Object.keys(node);
      const hasNested = keys.some((k) => typeof node[k] === "object" && node[k] !== null);
      if (!hasNested && keys.length > 0) {
        const itemText = objectToReadableText(node, path4);
        if (itemText) chunks.push(itemText);
      } else {
        for (const key of keys) {
          const cleanKey = key.replace(/_/g, " ");
          const subPath = path4 ? `${path4} > ${cleanKey}` : cleanKey;
          traverse(node[key], subPath);
        }
      }
    } else {
      chunks.push(`${path4}: ${node}`);
    }
  }
  function objectToReadableText(obj, prefix) {
    const parts = [];
    if (prefix) {
      parts.push(`[Category: ${prefix}]`);
    }
    const titleKeys = ["title", "name", "question", "subject", "key"];
    const foundTitleKey = Object.keys(obj).find((k) => titleKeys.includes(k.toLowerCase()));
    if (foundTitleKey) {
      parts.push(`${foundTitleKey.toUpperCase()}: ${obj[foundTitleKey]}`);
    }
    for (const [key, val] of Object.entries(obj)) {
      if (key === foundTitleKey) continue;
      if (val === null || val === void 0) continue;
      const cleanKey = key.replace(/_/g, " ");
      if (typeof val === "object") {
        parts.push(`${cleanKey}: ${JSON.stringify(val)}`);
      } else {
        parts.push(`${cleanKey}: ${val}`);
      }
    }
    return parts.join("\n");
  }
  traverse(data);
  return chunks;
}
async function generateEmbedding(text2) {
  const openai = await getOpenAIClient();
  const response = await openai.embeddings.create({
    model: embeddingModel,
    input: text2
  });
  return response.data[0].embedding;
}
function estimateTokens(text2) {
  return Math.ceil(text2.length / 4);
}
var RAGKnowledgeService = class {
  /**
   * Get or create storage limit for user
   */
  static async getUserStorageLimit(userId) {
    const [existing] = await db.select().from(userKnowledgeStorageLimits).where(eq9(userKnowledgeStorageLimits.userId, userId));
    if (existing) {
      return { maxBytes: existing.maxStorageBytes, usedBytes: existing.usedStorageBytes };
    }
    await db.insert(userKnowledgeStorageLimits).values({
      userId,
      maxStorageBytes: DEFAULT_STORAGE_LIMIT_BYTES,
      usedStorageBytes: 0
    });
    return { maxBytes: DEFAULT_STORAGE_LIMIT_BYTES, usedBytes: 0 };
  }
  /**
   * Update used storage for user
   */
  static async updateUsedStorage(userId, deltaBytes) {
    await db.update(userKnowledgeStorageLimits).set({
      usedStorageBytes: sql13`${userKnowledgeStorageLimits.usedStorageBytes} + ${deltaBytes}`,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq9(userKnowledgeStorageLimits.userId, userId));
  }
  /**
   * Check if user has enough storage space
   */
  static async checkStorageSpace(userId, requiredBytes) {
    const { maxBytes, usedBytes } = await this.getUserStorageLimit(userId);
    return usedBytes + requiredBytes <= maxBytes;
  }
  /**
   * Process and store knowledge base item with embeddings
   */
  static async processKnowledgeItem(knowledgeBaseId, userId, content, metadata) {
    try {
      console.log(`[RAG] Processing knowledge item ${knowledgeBaseId} for user ${userId}`);
      const contentSize = Buffer.byteLength(content, "utf8");
      const hasSpace = await this.checkStorageSpace(userId, contentSize);
      if (!hasSpace) {
        return {
          success: false,
          chunksCreated: 0,
          error: "Storage limit exceeded. Please delete some knowledge items or upgrade your plan."
        };
      }
      const [queueEntry] = await db.insert(knowledgeProcessingQueue).values({
        knowledgeBaseId,
        userId,
        status: "processing"
      }).returning();
      let chunks = [];
      let isJson = false;
      const trimmedContent = content.trim();
      if (metadata?.mimeType === "application/json" || metadata?.filename?.endsWith(".json") || trimmedContent.startsWith("{") || trimmedContent.startsWith("[")) {
        try {
          const jsonData = JSON.parse(content);
          chunks = parseJsonToChunks(jsonData);
          isJson = true;
          console.log(`[RAG] Successfully parsed JSON content into ${chunks.length} logical chunks`);
        } catch (jsonErr) {
          console.warn(`[RAG] Failed to parse content as JSON, falling back to text chunking:`, jsonErr.message);
        }
      }
      if (!isJson) {
        chunks = chunkText(content);
      }
      let finalChunks = [];
      for (const chunk of chunks) {
        if (chunk.length > MAX_CHUNK_CHARS) {
          finalChunks.push(...chunkText(chunk));
        } else {
          finalChunks.push(chunk);
        }
      }
      chunks = finalChunks;
      console.log(`[RAG] Created ${chunks.length} chunks from content`);
      await db.update(knowledgeProcessingQueue).set({ totalChunks: chunks.length }).where(eq9(knowledgeProcessingQueue.id, queueEntry.id));
      let processedCount = 0;
      for (let i = 0; i < chunks.length; i++) {
        const chunkText2 = chunks[i];
        try {
          const embedding = await generateEmbedding(chunkText2);
          await db.insert(knowledgeChunks).values({
            knowledgeBaseId,
            userId,
            chunkIndex: i,
            chunkText: chunkText2,
            embedding,
            // Store as JSON array
            tokenCount: estimateTokens(chunkText2),
            metadata: { ...metadata, chunkIndex: i, totalChunks: chunks.length }
          });
          processedCount++;
          await db.update(knowledgeProcessingQueue).set({ processedChunks: processedCount, updatedAt: /* @__PURE__ */ new Date() }).where(eq9(knowledgeProcessingQueue.id, queueEntry.id));
        } catch (chunkError) {
          console.error(`[RAG] Error processing chunk ${i}:`, chunkError.message);
          if (chunkError.code === "23503" || chunkError.message?.includes("foreign key constraint")) {
            console.log(`[RAG] Knowledge base ${knowledgeBaseId} was deleted. Stopping chunk processing.`);
            break;
          }
        }
        if (i < chunks.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      }
      await this.updateUsedStorage(userId, contentSize);
      await db.update(knowledgeProcessingQueue).set({ status: "completed", updatedAt: /* @__PURE__ */ new Date() }).where(eq9(knowledgeProcessingQueue.id, queueEntry.id));
      console.log(`[RAG] Successfully processed ${processedCount}/${chunks.length} chunks`);
      return { success: true, chunksCreated: processedCount };
    } catch (error) {
      console.error(`[RAG] Error processing knowledge item:`, error.message);
      await db.update(knowledgeProcessingQueue).set({ status: "failed", errorMessage: error.message, updatedAt: /* @__PURE__ */ new Date() }).where(eq9(knowledgeProcessingQueue.knowledgeBaseId, knowledgeBaseId));
      return { success: false, chunksCreated: 0, error: error.message };
    }
  }
  /**
   * Search knowledge base using semantic similarity
   */
  static async searchKnowledge(query, knowledgeBaseIds, userId, maxResults = 5) {
    try {
      console.log(`[RAG] Searching knowledge for: "${query.substring(0, 50)}..."`);
      if (knowledgeBaseIds.length === 0) {
        return [];
      }
      const queryEmbedding = await generateEmbedding(query);
      const chunks = await db.select().from(knowledgeChunks).where(
        and3(
          inArray5(knowledgeChunks.knowledgeBaseId, knowledgeBaseIds),
          eq9(knowledgeChunks.userId, userId)
        )
      );
      if (chunks.length === 0) {
        console.log(`[RAG] No chunks found for knowledge bases`);
        return [];
      }
      console.log(`[RAG] Searching ${chunks.length} chunks`);
      const scoredChunks = chunks.filter((chunk) => chunk.embedding && Array.isArray(chunk.embedding)).map((chunk) => ({
        chunk,
        score: cosineSimilarity(queryEmbedding, chunk.embedding),
        source: chunk.knowledgeBaseId
      })).sort((a, b) => b.score - a.score).slice(0, maxResults);
      console.log(`[RAG] Found ${scoredChunks.length} relevant chunks (top score: ${scoredChunks[0]?.score.toFixed(3) || "N/A"})`);
      return scoredChunks;
    } catch (error) {
      console.error(`[RAG] Search error:`, error.message);
      return [];
    }
  }
  /**
   * Format search results for agent consumption
   */
  static formatResultsForAgent(results, maxTokens = 500) {
    if (results.length === 0) {
      return "No relevant information found in the knowledge base.";
    }
    let output = "Based on the knowledge base:\n\n";
    let totalTokens = estimateTokens(output);
    for (const result of results) {
      const chunkTokens = estimateTokens(result.chunk.chunkText);
      if (totalTokens + chunkTokens > maxTokens) {
        const remainingTokens = maxTokens - totalTokens - 10;
        if (remainingTokens > 50) {
          const truncatedChars = remainingTokens * 4;
          output += `\u2022 ${result.chunk.chunkText.substring(0, truncatedChars)}...
`;
        }
        break;
      }
      output += `\u2022 ${result.chunk.chunkText}

`;
      totalTokens += chunkTokens + 5;
    }
    return output.trim();
  }
  /**
   * Delete all chunks for a knowledge base item
   */
  static async deleteKnowledgeChunks(knowledgeBaseId, userId) {
    const chunks = await db.select().from(knowledgeChunks).where(
      and3(
        eq9(knowledgeChunks.knowledgeBaseId, knowledgeBaseId),
        eq9(knowledgeChunks.userId, userId)
      )
    );
    const totalSize = chunks.reduce((sum, chunk) => {
      return sum + Buffer.byteLength(chunk.chunkText, "utf8");
    }, 0);
    await db.delete(knowledgeChunks).where(eq9(knowledgeChunks.knowledgeBaseId, knowledgeBaseId));
    await db.delete(knowledgeProcessingQueue).where(eq9(knowledgeProcessingQueue.knowledgeBaseId, knowledgeBaseId));
    if (totalSize > 0) {
      await this.updateUsedStorage(userId, -totalSize);
    }
    console.log(`[RAG] Deleted ${chunks.length} chunks for knowledge base ${knowledgeBaseId}`);
  }
  /**
   * Get processing status for a knowledge base item
   */
  static async getProcessingStatus(knowledgeBaseId) {
    const [entry] = await db.select().from(knowledgeProcessingQueue).where(eq9(knowledgeProcessingQueue.knowledgeBaseId, knowledgeBaseId)).orderBy(sql13`${knowledgeProcessingQueue.createdAt} DESC`).limit(1);
    if (!entry) {
      return null;
    }
    const progress = entry.totalChunks ? (entry.processedChunks || 0) / entry.totalChunks * 100 : 0;
    return {
      status: entry.status,
      progress: Math.round(progress),
      error: entry.errorMessage || void 0
    };
  }
  /**
   * Get chunk count for a knowledge base item
   */
  static async getChunkCount(knowledgeBaseId) {
    const result = await db.select({ count: sql13`count(*)` }).from(knowledgeChunks).where(eq9(knowledgeChunks.knowledgeBaseId, knowledgeBaseId));
    return Number(result[0]?.count || 0);
  }
};

// plugins/custom-voice-engine/services/tools/tool-executor.ts
var ToolExecutor = class _ToolExecutor {
  static async executeToolCall(toolCall, metadata, userId, agentId, callId, session) {
    const name = toolCall.function.name;
    let params = {};
    try {
      params = JSON.parse(toolCall.function.arguments);
    } catch {
      params = {};
    }
    if (name === "book_appointment" || name.startsWith("book_appointment_")) {
      return await _ToolExecutor.executeBookAppointment(params, metadata, userId, agentId, callId);
    } else if (name.startsWith("submit_form")) {
      return await _ToolExecutor.executeFormSubmission(params, metadata, userId, callId);
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
      return await _ToolExecutor.executeSendWhatsApp(name, params, metadata, userId, agentId, callId);
    } else if (name.startsWith("send_email_")) {
      return await _ToolExecutor.executeSendEmail(name, params, metadata, userId, agentId, callId);
    } else if (name.startsWith("webhook_") || metadata?.webhookUrl || metadata?.url) {
      return await _ToolExecutor.executeWebhook(name, params, metadata);
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
              sql14`SELECT caller_number, from_number FROM ${sql14.identifier(table)} WHERE id = ${sanitizedCallId} LIMIT 1`
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
      const domain = _ToolExecutor.getDomain();
      const secret = _ToolExecutor.getAppointmentWebhookSecret();
      const [agent] = await db.select({ elevenLabsAgentId: agents.elevenLabsAgentId }).from(agents).where(eq10(agents.id, agentId)).limit(1);
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
          template_variables: templateVariables,
          headerVariable: params.headerVariable || params.header_variable || metadata?.headerVariable || null,
          buttonVariables: params.buttonVariables || params.button_variables || metadata?.buttonVariables || []
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
      const fs4 = await import("fs");
      const path4 = await import("path");
      const { pathToFileURL } = await import("url");
      const canImportTs = process.execArgv.join(" ").includes("tsx") || process.execArgv.join(" ").includes("ts-node") || !!process.env.TS_NODE_PROJECT;
      let emailServicePath = path4.resolve(process.cwd(), "plugins/messaging/services/email-template.service.ts");
      if (!canImportTs || !fs4.existsSync(emailServicePath)) {
        emailServicePath = path4.resolve(process.cwd(), "plugins/messaging/services/email-template.service.js");
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
      const agentRow = await db.execute(sql14`SELECT flow_id FROM agents WHERE id = ${agentId} LIMIT 1`);
      const agentData = agentRow.rows?.[0];
      if (agentData?.flow_id) {
        resolvedFlowId = agentData.flow_id;
      } else {
        const flowRow = await db.execute(sql14`SELECT id FROM flows WHERE agent_id = ${agentId} AND is_active = true LIMIT 1`);
        resolvedFlowId = flowRow.rows?.[0]?.id || null;
      }
      const settingsResult = await db.execute(sql14`
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
        const dupResult = await db.execute(sql14`
          SELECT id FROM appointments
          WHERE call_id = ${callId} AND appointment_date = ${appointmentDate} AND status = 'scheduled'
          LIMIT 1
        `);
        if (dupResult.rows?.length > 0) {
          const existing = dupResult.rows[0];
          return { success: true, result: `Your appointment is already confirmed for ${appointmentDate}.`, appointmentId: existing.id, alreadyBooked: true };
        }
      }
      const dupByContact = await db.execute(sql14`
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
        const overlapResult = await db.execute(sql14`
          SELECT id FROM appointments
          WHERE user_id = ${userId} AND appointment_date = ${appointmentDate}
            AND appointment_time = ${appointmentTime} AND status = 'scheduled'
          LIMIT 1
        `);
        if (overlapResult.rows?.length > 0) {
          return { success: false, result: "That time slot is already booked. Please choose a different time." };
        }
      }
      const appointmentId = nanoid2();
      await db.execute(sql14`
        INSERT INTO appointments (id, user_id, call_id, flow_id, contact_name, contact_phone, contact_email, appointment_date, appointment_time, duration, service_name, notes, status, metadata)
        VALUES (${appointmentId}, ${userId}, ${callId || null}, ${resolvedFlowId}, ${params.contactName}, ${params.contactPhone}, ${params.contactEmail || null}, ${params.appointmentDate}, ${params.appointmentTime}, ${params.duration || 30}, ${params.serviceName || null}, ${params.notes || null}, 'scheduled', ${JSON.stringify({ source: "custom-voice-engine", agentId })})
      `);
      console.log(`[Appointment Tool] \u2705 Created appointment ${appointmentId} for user ${userId}, flow_id=${resolvedFlowId}, callId=${callId}`);
      if (googleSheetId) {
        try {
          let sheetTab = googleSheetName || "";
          if (!sheetTab) {
            const tabsResult = await db.execute(sql14`SELECT list_sheet_tabs(${userId}, ${googleSheetId})`);
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
            await db.update(appointments).set({ googleCalendarEventId: eventId, updatedAt: /* @__PURE__ */ new Date() }).where(eq10(appointments.id, appointmentId));
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
      const formResult = await db.execute(sql14`
        SELECT id, name FROM forms WHERE id = ${formId} LIMIT 1
      `);
      const form = formResult.rows?.[0];
      if (!form) {
        return { success: false, result: "Form configuration not found." };
      }
      const fieldsResult = await db.execute(sql14`
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
      const submissionId = nanoid2();
      await db.execute(sql14`
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
    }
    return "";
  }
};

// plugins/custom-voice-engine/types.ts
var DEFAULT_TELEPHONY_FORMAT = {
  encoding: "linear16",
  sampleRate: 8e3,
  channels: 1,
  bitDepth: 16
};
var DEFAULT_STT_FORMAT = {
  encoding: "linear16",
  sampleRate: 16e3,
  channels: 1,
  bitDepth: 16
};
var DEFAULT_VAD_CONFIG = {
  speechThresholdMs: 150,
  silenceThresholdMs: 300,
  energyThreshold: 0.015,
  bargeInEnabled: true
};

// plugins/custom-voice-engine/services/providers/stt/deepgram-stt.provider.ts
import WebSocket2 from "ws";

// plugins/custom-voice-engine/services/providers/stt/stt-provider.interface.ts
var BaseSttProvider = class {
  config = null;
  format = null;
  connected = false;
  transcriptCallbacks = [];
  errorCallbacks = [];
  onTranscript(callback) {
    this.transcriptCallbacks.push(callback);
  }
  onError(callback) {
    this.errorCallbacks.push(callback);
  }
  isConnected() {
    return this.connected;
  }
  emitTranscript(transcript) {
    for (const cb of this.transcriptCallbacks) {
      try {
        cb(transcript);
      } catch (err) {
        console.error(`[STT:${this.name}] Transcript callback error:`, err);
      }
    }
  }
  emitError(error) {
    for (const cb of this.errorCallbacks) {
      try {
        cb(error);
      } catch (err) {
        console.error(`[STT:${this.name}] Error callback error:`, err);
      }
    }
  }
};

// plugins/custom-voice-engine/services/providers/stt/deepgram-stt.provider.ts
var DEEPGRAM_WS_URL = "wss://api.deepgram.com/v1/listen";
var DeepgramSttProvider = class extends BaseSttProvider {
  name = "deepgram";
  ws = null;
  reconnectAttempts = 0;
  maxReconnectAttempts = 5;
  keepAliveInterval = null;
  isClosing = false;
  async connect(config, format) {
    this.config = config;
    this.format = format;
    this.isClosing = false;
    return this.createConnection();
  }
  async createConnection() {
    if (!this.config || !this.format) throw new Error("Configuration missing");
    const paramsObj = {
      model: this.config.model || this.config.deepgramModel || "nova-2",
      encoding: this.mapEncoding(this.format.encoding),
      sample_rate: String(this.format.sampleRate),
      channels: String(this.format.channels),
      punctuate: String(this.config.punctuate ?? true),
      interim_results: String(this.config.interimResults ?? true),
      endpointing: String(this.config.endpointing ?? 150),
      utterance_end_ms: "1000",
      vad_events: "true",
      smart_format: "true"
    };
    paramsObj.language = this.mapLanguage(this.config.language || "en");
    const params = new URLSearchParams(paramsObj);
    const url = `${DEEPGRAM_WS_URL}?${params.toString()}`;
    console.log(`[STT:Deepgram] Connecting to URL: ${url.replace(this.config.apiKey, "***")}`);
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket2(url, {
        headers: {
          Authorization: `Token ${this.config.apiKey}`
        }
      });
      this.ws.on("unexpected-response", (req, res) => {
        let body = "";
        res.on("data", (chunk) => {
          body += chunk;
        });
        res.on("end", () => {
          console.error(`[STT:Deepgram] HTTP 400 Response Body from Deepgram: ${body}`);
        });
      });
      const timeout = setTimeout(() => {
        if (!this.connected) {
          reject(new Error("Deepgram connection timeout"));
          this.ws?.close();
        }
      }, 1e4);
      this.ws.on("open", () => {
        clearTimeout(timeout);
        this.connected = true;
        this.reconnectAttempts = 0;
        console.log("[STT:Deepgram] WebSocket connected");
        this.keepAliveInterval = setInterval(() => {
          if (this.ws?.readyState === WebSocket2.OPEN) {
            this.ws.send(JSON.stringify({ type: "KeepAlive" }));
          }
        }, 8e3);
        resolve();
      });
      this.ws.on("message", (data) => {
        try {
          const response = JSON.parse(data.toString());
          this.handleResponse(response);
        } catch (err) {
          console.error("[STT:Deepgram] Failed to parse response:", err);
        }
      });
      this.ws.on("error", (err) => {
        clearTimeout(timeout);
        console.error("[STT:Deepgram] WebSocket error:", err);
        if (!this.connected) reject(err);
      });
      this.ws.on("close", (code, reason) => {
        clearTimeout(timeout);
        const wasConnected = this.connected;
        this.connected = false;
        if (this.keepAliveInterval) {
          clearInterval(this.keepAliveInterval);
          this.keepAliveInterval = null;
        }
        if (wasConnected && !this.isClosing && this.reconnectAttempts < this.maxReconnectAttempts) {
          this.reconnectAttempts++;
          const delay = Math.pow(2, this.reconnectAttempts) * 1e3;
          console.log(`[STT:Deepgram] Unexpected close (code ${code}), reconnecting in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
          setTimeout(() => this.createConnection().catch((err) => {
            console.error(`[STT:Deepgram] Reconnect attempt ${this.reconnectAttempts} failed:`, err.message);
          }), delay);
        }
      });
    });
  }
  sendAudio(chunk) {
    if (this.ws?.readyState === WebSocket2.OPEN) {
      this.ws.send(chunk);
    }
  }
  async close() {
    this.isClosing = true;
    if (this.keepAliveInterval) {
      clearInterval(this.keepAliveInterval);
      this.keepAliveInterval = null;
    }
    if (this.ws) {
      if (this.ws.readyState === WebSocket2.OPEN) {
        this.ws.send(JSON.stringify({ type: "CloseStream" }));
        await new Promise((resolve) => {
          const timeout = setTimeout(() => {
            this.ws?.terminate();
            resolve();
          }, 2e3);
          this.ws.once("close", () => {
            clearTimeout(timeout);
            resolve();
          });
          this.ws.close();
        });
      }
      this.ws = null;
    }
    this.connected = false;
    this.transcriptCallbacks = [];
    this.errorCallbacks = [];
  }
  handleResponse(response) {
    if (response.type === "Results") {
      const result = response;
      const channel = result.channel;
      if (!channel?.alternatives?.length) return;
      const alt = channel.alternatives[0];
      if (!alt.transcript) return;
      const words = (alt.words || []).map((w) => ({
        word: w.punctuated_word || w.word,
        start: w.start,
        end: w.end,
        confidence: w.confidence
      }));
      this.emitTranscript({
        text: alt.transcript,
        isFinal: result.is_final,
        speechFinal: result.speech_final ?? false,
        confidence: alt.confidence,
        words,
        duration: result.duration * 1e3
      });
    } else if (response.type === "UtteranceEnd") {
      this.emitTranscript({ text: "", isFinal: true, confidence: 1, duration: 0 });
    } else if (response.type === "Error") {
      this.emitError(new Error(`Deepgram error: ${response.message || JSON.stringify(response)}`));
    }
  }
  mapEncoding(encoding) {
    switch (encoding) {
      case "linear16":
        return "linear16";
      case "mulaw":
        return "mulaw";
      case "alaw":
        return "alaw";
      case "opus":
        return "opus";
      default:
        return "linear16";
    }
  }
  mapLanguage(lang) {
    if (!lang) return "en-IN";
    if (lang.includes("-")) return lang;
    const langMap = {
      en: "en-IN",
      hi: "hi",
      ta: "ta",
      te: "te",
      kn: "kn",
      ml: "ml",
      mr: "mr",
      gu: "gu",
      bn: "bn",
      pa: "pa"
    };
    return langMap[lang] || lang;
  }
};

// plugins/custom-voice-engine/services/providers/stt/sarvam-stt.provider.ts
import WebSocket3 from "ws";
var SarvamSttProvider = class extends BaseSttProvider {
  name = "sarvam";
  ws = null;
  isClosing = false;
  async connect(config, format) {
    this.config = config;
    this.format = format;
    this.connected = false;
    this.isClosing = false;
    console.log(`[STT:Sarvam] Connecting with format:`, format);
    return new Promise((resolve, reject) => {
      const languageCode = this.config.detectLanguage ? "unknown" : this.config.sarvamLanguageCode || this.mapLanguage(this.config.language);
      const model = this.config.sarvamModel || "saaras:v3";
      const url = `wss://api.sarvam.ai/speech-to-text/ws?language-code=${languageCode}&model=${model}`;
      console.log(`[STT:Sarvam] Connecting WebSocket to URL: ${url}`);
      this.ws = new WebSocket3(url, {
        headers: {
          "api-subscription-key": this.config.apiKey
        }
      });
      const timeout = setTimeout(() => {
        if (!this.connected) {
          reject(new Error("Sarvam STT WebSocket connection timeout"));
          this.ws?.close();
        }
      }, 1e4);
      this.ws.on("open", () => {
        clearTimeout(timeout);
        this.connected = true;
        console.log("[STT:Sarvam] WebSocket connected");
        resolve();
      });
      this.ws.on("message", (data) => {
        try {
          const messageStr = data.toString();
          const response = JSON.parse(messageStr);
          if (response.type === "data" && response.data?.transcript) {
            const transcript = {
              text: response.data.transcript,
              isFinal: true,
              // Sarvam real-time transcript segment
              confidence: response.data.confidence || 0.85,
              language: response.data.language_code || languageCode,
              duration: (response.data.metrics?.audio_duration || 0) * 1e3
            };
            console.log(`[STT:Sarvam] EMITTING transcript: "${response.data.transcript.substring(0, 100)}"`);
            this.emitTranscript(transcript);
          }
        } catch (err) {
          console.error(`[STT:Sarvam] Failed to parse message:`, err.message);
        }
      });
      this.ws.on("error", (err) => {
        console.error("[STT:Sarvam] WebSocket error:", err.message);
        this.emitError(err);
        if (!this.connected) {
          clearTimeout(timeout);
          reject(err);
        }
      });
      this.ws.on("close", () => {
        console.log("[STT:Sarvam] WebSocket closed");
        this.connected = false;
      });
    });
  }
  sendAudio(chunk) {
    if (!this.connected || !this.ws || this.ws.readyState !== WebSocket3.OPEN) return;
    try {
      const sampleRate = this.format?.sampleRate || 8e3;
      const base64Data = chunk.toString("base64");
      const payload = {
        audio: {
          data: base64Data,
          sample_rate: String(sampleRate),
          encoding: "pcm_s16le"
        }
      };
      this.ws.send(JSON.stringify(payload));
    } catch (err) {
      console.error("[STT:Sarvam] Failed to send audio chunk:", err.message);
    }
  }
  async flush(force = true) {
  }
  async close() {
    this.isClosing = true;
    this.connected = false;
    if (this.ws) {
      if (this.ws.readyState === WebSocket3.OPEN) {
        this.ws.close();
      }
      this.ws = null;
    }
    this.transcriptCallbacks = [];
    this.errorCallbacks = [];
    console.log("[STT:Sarvam] Provider closed");
  }
  mapLanguage(lang) {
    if (!lang) return "en-IN";
    const baseLang = lang.split(/[-_]/)[0].toLowerCase();
    const langMap = {
      en: "en-IN",
      hi: "hi-IN",
      bn: "bn-IN",
      kn: "kn-IN",
      ml: "ml-IN",
      mr: "mr-IN",
      od: "od-IN",
      pa: "pa-IN",
      ta: "ta-IN",
      te: "te-IN",
      gu: "gu-IN",
      as: "as-IN",
      ur: "ur-IN",
      ne: "ne-IN"
    };
    return langMap[baseLang] || "en-IN";
  }
};

// plugins/custom-voice-engine/services/providers/stt/stt-provider.factory.ts
var providerRegistry2 = {
  deepgram: DeepgramSttProvider,
  sarvam: SarvamSttProvider
};
var SttProviderFactory = class {
  /**
   * Create an STT provider instance.
   * @throws Error if provider is not registered
   */
  static create(provider) {
    const ProviderClass = providerRegistry2[provider];
    if (!ProviderClass) {
      throw new Error(`Unknown STT provider: ${provider}. Available: ${Object.keys(providerRegistry2).join(", ")}`);
    }
    return new ProviderClass();
  }
  /**
   * Get list of available STT providers
   */
  static getAvailableProviders() {
    return Object.keys(providerRegistry2);
  }
  /**
   * Check if a provider is registered
   */
  static isAvailable(provider) {
    return provider in providerRegistry2;
  }
  /**
   * Register a custom STT provider at runtime (plugin extensibility)
   */
  static register(name, providerClass) {
    providerRegistry2[name] = providerClass;
    console.log(`[STT Factory] Registered custom provider: ${name}`);
  }
};

// plugins/custom-voice-engine/services/providers/llm/openrouter-llm.provider.ts
import axios6 from "axios";

// plugins/custom-voice-engine/services/providers/llm/llm-provider.interface.ts
var BaseLlmProvider = class {
};

// plugins/custom-voice-engine/services/providers/llm/openrouter-llm.provider.ts
var OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
function getEndpointAndModel(model, apiKey) {
  const cleanModel = model || "openai/gpt-4o-mini";
  const key = apiKey || "";
  if (key.startsWith("gsk_") || cleanModel.startsWith("groq/")) {
    const rawModel = cleanModel.replace(/^groq\//, "");
    return { url: "https://api.groq.com/openai/v1/chat/completions", model: rawModel };
  }
  if (cleanModel.startsWith("deepseek/") && !key.startsWith("sk-or-")) {
    const rawModel = cleanModel.replace(/^deepseek\//, "");
    return { url: "https://api.deepseek.com/chat/completions", model: rawModel };
  }
  if ((key.startsWith("sk-proj-") || key.startsWith("sk-") && !key.startsWith("sk-or-")) && (cleanModel.startsWith("openai/") || cleanModel.startsWith("gpt-") || cleanModel.startsWith("o1") || cleanModel.startsWith("o3"))) {
    const rawModel = cleanModel.replace(/^openai\//, "");
    return { url: "https://api.openai.com/v1/chat/completions", model: rawModel };
  }
  return { url: OPENROUTER_API_URL, model: sanitizeOpenRouterModel(cleanModel) };
}
function sanitizeOpenRouterModel(model) {
  if (!model) return "openai/gpt-4o-mini";
  const modelLower = model.toLowerCase();
  if (modelLower.includes("gpt-4o-mini-realtime") || modelLower.includes("gpt-realtime-mini")) {
    return "openai/gpt-4o-mini";
  }
  if (modelLower.includes("gpt-4o-realtime") || modelLower.includes("gpt-realtime")) {
    return "openai/gpt-4o";
  }
  if (!model.includes("/")) {
    if (modelLower.startsWith("gpt-4o-mini")) {
      return "openai/gpt-4o-mini";
    }
    if (modelLower.startsWith("gpt-4o")) {
      return "openai/gpt-4o";
    }
    if (modelLower.startsWith("claude-")) {
      return `anthropic/${model}`;
    }
    if (modelLower.startsWith("gemini-")) {
      return `google/${model}`;
    }
    return `openai/${model}`;
  }
  return model;
}
var OpenRouterLlmProvider = class extends BaseLlmProvider {
  name = "openrouter";
  async complete(messages, config, tools2) {
    const startTime = Date.now();
    const endpoint = getEndpointAndModel(config.model, config.apiKey);
    const payload = {
      model: endpoint.model,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
        ...m.toolCallId ? { tool_call_id: m.toolCallId } : {},
        ...m.toolCalls ? { tool_calls: m.toolCalls } : {}
      })),
      temperature: config.temperature ?? 0.7,
      max_tokens: config.maxTokens ?? 200,
      top_p: config.topP ?? 1,
      frequency_penalty: config.frequencyPenalty ?? 0,
      presence_penalty: config.presencePenalty ?? 0
    };
    if (tools2 && tools2.length > 0) {
      payload.tools = tools2.map((t) => ({
        type: t.type,
        function: {
          name: t.function.name,
          description: t.function.description,
          parameters: t.function.parameters
        }
      }));
      payload.tool_choice = "auto";
    }
    try {
      console.log(`[LLM:OpenRouter/Direct] Sending tools payload to ${endpoint.url} (model=${endpoint.model}):`, JSON.stringify(payload.tools, null, 2));
      const response = await axios6.post(endpoint.url, payload, {
        ...keepAliveAxiosConfig,
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://agentlabs.io",
          "X-Title": "AgentLabs AI Voice Engine"
        },
        timeout: 6e4
      });
      const data = response.data;
      const choice = data.choices?.[0];
      const latencyMs = Date.now() - startTime;
      return {
        content: choice?.message?.content || null,
        toolCalls: choice?.message?.tool_calls,
        finishReason: choice?.finish_reason || "stop",
        usage: {
          promptTokens: data.usage?.prompt_tokens || 0,
          completionTokens: data.usage?.completion_tokens || 0,
          totalTokens: data.usage?.total_tokens || 0
        },
        model: data.model || config.model,
        latencyMs
      };
    } catch (err) {
      const statusCode = err.response?.status;
      const errorMsg = err.response?.data?.error?.message || err.message;
      if (statusCode === 429) {
        throw new Error(`OpenRouter rate limited: ${errorMsg}`);
      }
      if (statusCode === 402) {
        throw new Error(`OpenRouter insufficient credits: ${errorMsg}`);
      }
      throw new Error(`OpenRouter LLM error (${statusCode}): ${errorMsg}`);
    }
  }
  async *stream(messages, config, tools2) {
    const endpoint = getEndpointAndModel(config.model, config.apiKey);
    const payload = {
      model: endpoint.model,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
        ...m.toolCallId ? { tool_call_id: m.toolCallId } : {},
        ...m.toolCalls ? { tool_calls: m.toolCalls } : {}
      })),
      temperature: config.temperature ?? 0.7,
      max_tokens: config.maxTokens ?? 200,
      top_p: config.topP ?? 1,
      stream: true
    };
    if (tools2 && tools2.length > 0) {
      payload.tools = tools2.map((t) => ({
        type: t.type,
        function: {
          name: t.function.name,
          description: t.function.description,
          parameters: t.function.parameters
        }
      }));
      payload.tool_choice = "auto";
    }
    const controller = new AbortController();
    const STREAM_CHUNK_TIMEOUT_MS = 3e4;
    let inactivityTimer = null;
    const resetInactivityTimer = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        controller.abort();
      }, STREAM_CHUNK_TIMEOUT_MS);
    };
    resetInactivityTimer();
    try {
      console.log(`[LLM:OpenRouter/Direct] Sending tools payload (stream) to ${endpoint.url} (model=${endpoint.model}):`, JSON.stringify(payload.tools, null, 2));
      const response = await axios6.post(endpoint.url, payload, {
        ...keepAliveAxiosConfig,
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://agentlabs.io",
          "X-Title": "AgentLabs AI Voice Engine"
        },
        responseType: "stream",
        timeout: 6e4,
        signal: controller.signal
      });
      const stream = response.data;
      let buffer = "";
      for await (const rawChunk of stream) {
        resetInactivityTimer();
        buffer += rawChunk.toString();
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith("data: ")) continue;
          const data = trimmed.slice(6);
          if (data === "[DONE]") {
            if (inactivityTimer) clearTimeout(inactivityTimer);
            return;
          }
          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta;
            const finishReason = parsed.choices?.[0]?.finish_reason;
            if (delta) {
              const chunk = {};
              if (delta.content) chunk.content = delta.content;
              if (delta.tool_calls) chunk.toolCalls = delta.tool_calls;
              if (finishReason) chunk.finishReason = finishReason;
              yield chunk;
            }
          } catch {
          }
        }
      }
    } catch (err) {
      if (err.name === "AbortError" || err.code === "ERR_CANCELED" || controller.signal.aborted) {
        throw new Error(`OpenRouter stream timed out after ${STREAM_CHUNK_TIMEOUT_MS / 1e3}s of inactivity`);
      }
      if (err.response?.data) {
        try {
          let errorResponseStr = "";
          const data = err.response.data;
          if (data && (typeof data.on === "function" || typeof data[Symbol.asyncIterator] === "function")) {
            const chunks = [];
            for await (const chunk of data) {
              chunks.push(Buffer.from(chunk));
            }
            errorResponseStr = Buffer.concat(chunks).toString("utf8");
          } else if (typeof data === "string") {
            errorResponseStr = data;
          } else if (Buffer.isBuffer(data)) {
            errorResponseStr = data.toString("utf8");
          } else if (data && typeof data === "object") {
            errorResponseStr = JSON.stringify(data);
          } else {
            errorResponseStr = String(data);
          }
          console.error(`[OpenRouter] Stream request failed with status ${err.response.status}. Error body:`, errorResponseStr);
          let msg = errorResponseStr;
          try {
            const parsed = JSON.parse(errorResponseStr);
            msg = parsed.error?.message || parsed.description || errorResponseStr;
          } catch {
          }
          throw new Error(`OpenRouter LLM error (${err.response.status}): ${msg}`);
        } catch (readErr) {
          if (readErr.message && readErr.message.includes("OpenRouter LLM error")) {
            throw readErr;
          }
          console.error(`[OpenRouter] Failed to read error response:`, readErr.message);
        }
      }
      throw err;
    } finally {
      if (inactivityTimer) clearTimeout(inactivityTimer);
    }
  }
};

// plugins/custom-voice-engine/services/providers/llm/gemini-llm.provider.ts
import axios7 from "axios";
function mapToolsToGemini(tools2) {
  if (!tools2 || tools2.length === 0) return void 0;
  return [
    {
      functionDeclarations: tools2.map((t) => {
        const convertTypes = (schema) => {
          if (!schema) return schema;
          const copy = { ...schema };
          if (copy.type && typeof copy.type === "string") {
            copy.type = copy.type.toUpperCase();
          }
          if (copy.properties) {
            const props = {};
            for (const key of Object.keys(copy.properties)) {
              props[key] = convertTypes(copy.properties[key]);
            }
            copy.properties = props;
          }
          if (copy.items) {
            copy.items = convertTypes(copy.items);
          }
          return copy;
        };
        return {
          name: t.function.name,
          description: t.function.description,
          parameters: convertTypes(t.function.parameters)
        };
      })
    }
  ];
}
function convertMessagesToGemini(messages) {
  const contents = [];
  let systemInstruction = void 0;
  for (let i = 0; i < messages.length; i++) {
    const m = messages[i];
    if (m.role === "system") {
      systemInstruction = {
        parts: [{ text: m.content }]
      };
      continue;
    }
    if (m.role === "user") {
      contents.push({
        role: "user",
        parts: [{ text: m.content }]
      });
    } else if (m.role === "assistant") {
      if (m.toolCalls && m.toolCalls.length > 0) {
        contents.push({
          role: "model",
          parts: m.toolCalls.map((tc) => {
            let args = {};
            try {
              args = JSON.parse(tc.function.arguments);
            } catch (e) {
            }
            return {
              functionCall: {
                name: tc.function.name,
                args
              }
            };
          })
        });
      } else {
        contents.push({
          role: "model",
          parts: [{ text: m.content || "" }]
        });
      }
    } else if (m.role === "tool") {
      let toolName = "unknown_tool";
      for (let j = i - 1; j >= 0; j--) {
        const prev = messages[j];
        if (prev.role === "assistant" && prev.toolCalls) {
          const match = prev.toolCalls.find((tc) => tc.id === m.toolCallId);
          if (match) {
            toolName = match.function.name;
            break;
          }
        }
      }
      let parsedResult = {};
      try {
        parsedResult = JSON.parse(m.content);
      } catch (e) {
        parsedResult = { result: m.content };
      }
      contents.push({
        role: "user",
        parts: [{
          functionResponse: {
            name: toolName,
            response: {
              result: parsedResult
            }
          }
        }]
      });
    }
  }
  const normalizedContents = [];
  for (const item of contents) {
    if (normalizedContents.length > 0 && normalizedContents[normalizedContents.length - 1].role === item.role) {
      const last = normalizedContents[normalizedContents.length - 1];
      last.parts = last.parts.concat(item.parts);
    } else {
      normalizedContents.push(item);
    }
  }
  return { contents: normalizedContents, systemInstruction };
}
function sanitizeGeminiModel(model) {
  return model || "gemini-1.5-flash";
}
var GeminiLlmProvider = class extends BaseLlmProvider {
  name = "gemini";
  async complete(messages, config, tools2) {
    const startTime = Date.now();
    const model = sanitizeGeminiModel(config.model);
    const { contents, systemInstruction } = convertMessagesToGemini(messages);
    const geminiTools = mapToolsToGemini(tools2);
    const payload = {
      contents,
      generationConfig: {
        temperature: config.temperature ?? 0.7,
        maxOutputTokens: config.maxTokens ?? 300
      }
    };
    if (systemInstruction) {
      payload.systemInstruction = systemInstruction;
    }
    if (geminiTools) {
      payload.tools = geminiTools;
    }
    try {
      console.log(`[Gemini] Direct complete request to model: ${model}`);
      const response = await axios7.post(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${config.apiKey}`,
        payload,
        {
          ...keepAliveAxiosConfig,
          headers: {
            "Content-Type": "application/json"
          },
          timeout: 3e4
        }
      );
      const data = response.data;
      const candidate = data.candidates?.[0];
      const part = candidate?.content?.parts?.[0];
      let content = null;
      let toolCalls = void 0;
      let finishReason = "stop";
      if (part) {
        if (part.text) {
          content = part.text;
        } else if (part.functionCall) {
          const id = `call_${Math.random().toString(36).substring(2, 11)}`;
          toolCalls = [{
            id,
            type: "function",
            function: {
              name: part.functionCall.name,
              arguments: JSON.stringify(part.functionCall.args || {})
            }
          }];
          finishReason = "tool_calls";
        }
      }
      if (candidate?.finishReason) {
        const reason = candidate.finishReason.toLowerCase();
        if (reason === "max_tokens") finishReason = "length";
        else if (reason === "safety" || reason === "recitation") finishReason = "content_filter";
      }
      const promptTokens = data.usageMetadata?.promptTokenCount || 0;
      const completionTokens = data.usageMetadata?.candidatesTokenCount || 0;
      return {
        content,
        toolCalls,
        finishReason,
        usage: {
          promptTokens,
          completionTokens,
          totalTokens: promptTokens + completionTokens
        },
        model,
        latencyMs: Date.now() - startTime
      };
    } catch (err) {
      console.error(`[Gemini] API error:`, err.response?.data || err.message);
      throw err;
    }
  }
  async *stream(messages, config, tools2) {
    const model = sanitizeGeminiModel(config.model);
    const { contents, systemInstruction } = convertMessagesToGemini(messages);
    const geminiTools = mapToolsToGemini(tools2);
    const payload = {
      contents,
      generationConfig: {
        temperature: config.temperature ?? 0.7,
        maxOutputTokens: config.maxTokens ?? 300
      }
    };
    if (systemInstruction) {
      payload.systemInstruction = systemInstruction;
    }
    if (geminiTools) {
      payload.tools = geminiTools;
    }
    console.log(`[Gemini] Direct stream request to model: ${model}`);
    const response = await axios7.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${config.apiKey}`,
      payload,
      {
        ...keepAliveAxiosConfig,
        headers: {
          "Content-Type": "application/json"
        },
        responseType: "stream",
        timeout: 3e4
      }
    );
    const stream = response.data;
    let buffer = "";
    for await (const data of stream) {
      const chunk = Buffer.isBuffer(data) ? data.toString() : data;
      buffer += chunk;
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        const jsonStr = trimmed.substring(5).trim();
        if (!jsonStr) continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const candidate = parsed.candidates?.[0];
          const part = candidate?.content?.parts?.[0];
          if (part) {
            if (part.text) {
              yield { content: part.text };
            } else if (part.functionCall) {
              const id = `call_${Math.random().toString(36).substring(2, 11)}`;
              yield {
                toolCalls: [{
                  index: 0,
                  id,
                  type: "function",
                  function: {
                    name: part.functionCall.name,
                    arguments: JSON.stringify(part.functionCall.args || {})
                  }
                }]
              };
            }
          }
        } catch (e) {
          console.warn(`[Gemini] Failed to parse SSE line:`, e.message);
        }
      }
    }
  }
};

// plugins/custom-voice-engine/services/providers/llm/llm-provider.factory.ts
var providerRegistry3 = {
  openrouter: OpenRouterLlmProvider,
  gemini: GeminiLlmProvider,
  openai: OpenRouterLlmProvider,
  groq: OpenRouterLlmProvider,
  deepseek: OpenRouterLlmProvider
};
var LlmProviderFactory = class {
  static create(provider) {
    const ProviderClass = providerRegistry3[provider];
    if (!ProviderClass) {
      throw new Error(`Unknown LLM provider: ${provider}. Available: ${Object.keys(providerRegistry3).join(", ")}`);
    }
    return new ProviderClass();
  }
  static getAvailableProviders() {
    return Object.keys(providerRegistry3);
  }
  static isAvailable(provider) {
    return provider in providerRegistry3;
  }
  static register(name, providerClass) {
    providerRegistry3[name] = providerClass;
    console.log(`[LLM Factory] Registered custom provider: ${name}`);
  }
};

// plugins/custom-voice-engine/services/audio-pipeline/vad-detector.ts
var VadDetector = class {
  config;
  state = "silence";
  speechStartTime = 0;
  silenceStartTime = 0;
  lastEnergyValues = [];
  energyWindowSize = 8;
  noiseFloor = 8e-3;
  // Adaptive ambient noise floor estimate
  constructor(config) {
    this.config = { ...DEFAULT_VAD_CONFIG, ...config };
    this.silenceStartTime = Date.now();
  }
  /**
   * Process a chunk of PCM audio and return VAD result.
   * Audio must be linear16 (signed 16-bit little-endian).
   */
  processChunk(chunk, isPlayingTts = false) {
    const energy = this.calculateEnergy(chunk);
    this.lastEnergyValues.push(energy);
    if (this.lastEnergyValues.length > this.energyWindowSize) {
      this.lastEnergyValues.shift();
    }
    const smoothedEnergy = this.lastEnergyValues.reduce((a, b) => a + b, 0) / this.lastEnergyValues.length;
    if (this.state === "silence") {
      this.noiseFloor = this.noiseFloor * 0.95 + smoothedEnergy * 0.05;
    }
    const dynamicThreshold = Math.max(
      this.config.energyThreshold,
      this.noiseFloor * 2 + 8e-3
    );
    const threshold = isPlayingTts ? Math.max(0.06, dynamicThreshold * 2.5) : dynamicThreshold;
    const isSpeech = smoothedEnergy > threshold;
    const now = Date.now();
    let isSpeechStart = false;
    let isSpeechEnd = false;
    if (isSpeech) {
      if (this.state === "silence" || this.state === "uncertain") {
        if (this.speechStartTime === 0) {
          this.speechStartTime = now;
        }
        if (now - this.speechStartTime >= this.config.speechThresholdMs) {
          if (this.state !== "speech") {
            isSpeechStart = true;
            this.state = "speech";
          }
        } else {
          this.state = "uncertain";
        }
      }
      this.silenceStartTime = 0;
    } else {
      if (this.state === "speech" || this.state === "uncertain") {
        if (this.silenceStartTime === 0) {
          this.silenceStartTime = now;
        }
        if (now - this.silenceStartTime >= this.config.silenceThresholdMs) {
          if (this.state === "speech") {
            isSpeechEnd = true;
          }
          this.state = "silence";
          this.speechStartTime = 0;
        }
      }
    }
    const speechDurationMs = this.state === "speech" && this.speechStartTime > 0 ? now - this.speechStartTime : 0;
    const silenceDurationMs = this.state === "silence" && this.silenceStartTime > 0 ? now - this.silenceStartTime : 0;
    return {
      state: this.state,
      energy: smoothedEnergy,
      speechDurationMs,
      silenceDurationMs,
      isSpeechStart,
      isSpeechEnd
    };
  }
  /**
   * Reset VAD state (e.g., after TTS playback ends)
   */
  reset() {
    this.state = "silence";
    this.speechStartTime = 0;
    this.silenceStartTime = Date.now();
    this.lastEnergyValues = [];
  }
  /**
   * Get current state
   */
  getState() {
    return this.state;
  }
  /**
   * Calculate RMS energy of a PCM buffer (linear16, signed 16-bit LE)
   */
  calculateEnergy(buffer) {
    if (buffer.length < 2) return 0;
    let sumSquares = 0;
    const sampleCount = Math.floor(buffer.length / 2);
    for (let i = 0; i < buffer.length - 1; i += 2) {
      const sample = buffer.readInt16LE(i);
      const normalized = sample / 32768;
      sumSquares += normalized * normalized;
    }
    return Math.sqrt(sumSquares / sampleCount);
  }
};

// plugins/custom-voice-engine/services/master-ai/master-ai.service.ts
var DEFAULT_BACKCHANNELS = {
  en: /* @__PURE__ */ new Set([
    "uh-huh",
    "yeah",
    "yes",
    "right",
    "okay",
    "hmm",
    "got it",
    "i see",
    "sure",
    "yep",
    "yup",
    "alright",
    "mhm",
    "aha",
    "cool",
    "fine"
  ]),
  hi: /* @__PURE__ */ new Set([
    "haan",
    "achha",
    "accha",
    "theek hai",
    "theek",
    "sahi hai",
    "hmm",
    "ji",
    "boliye",
    "sahi",
    "acha",
    "ha"
  ]),
  ta: /* @__PURE__ */ new Set([
    "sari",
    "aama",
    "solunga",
    "hmm",
    "purinjidhu",
    "seri",
    "aamam"
  ]),
  te: /* @__PURE__ */ new Set([
    "avunu",
    "sare",
    "cheppandi",
    "hmm",
    "sari"
  ]),
  kn: /* @__PURE__ */ new Set([
    "haudu",
    "sari",
    "heli",
    "hmm",
    "houdu"
  ])
};
var HARD_INTERRUPTIONS = /* @__PURE__ */ new Set([
  "wait",
  "stop",
  "hold on",
  "no no",
  "listen",
  "ek minute",
  "ruko",
  "shut up",
  "pause",
  "hang on",
  "wait a second",
  "hold up",
  "cancel",
  "wait wait",
  "stop stop",
  "chup",
  "arre ruko",
  "ruk"
]);
var DEFAULT_HANGUP_PHRASES = [
  "bye",
  "goodbye",
  "talk to you later",
  "alvida",
  "bas itna hi",
  "call cut kardo",
  "thank you that is all",
  "disconnect",
  "end call",
  "nothing else",
  "that is all",
  "thats all",
  "no thats it",
  "that will be all"
];
var DEFAULT_TRANSFER_PHRASES = [
  "talk to human",
  "speak to agent",
  "connect to manager",
  "operator",
  "real person",
  "customer service",
  "representative",
  "human please",
  "connect me to",
  "agent se baat karo",
  "kisi se baat karao"
];
var MasterAIService = class {
  customBackchannels = {};
  hangupPhrases = [...DEFAULT_HANGUP_PHRASES];
  transferPhrases = [...DEFAULT_TRANSFER_PHRASES];
  constructor(customDictionaries) {
    if (customDictionaries) {
      for (const [lang, words] of Object.entries(customDictionaries)) {
        this.customBackchannels[lang] = new Set(words.map((w) => w.toLowerCase().trim()));
      }
    }
  }
  /**
   * 1. Smart Backchannel Classifier (<5ms)
   * Returns true if the utterance is a passive affirmation ("uh-huh", "haan", "theek hai")
   * that should NOT interrupt agent playback.
   */
  isBackchannel(text2, lang = "en") {
    const clean = text2.toLowerCase().replace(/[^\w\s-]/g, "").trim();
    if (!clean) return false;
    const customSet = this.customBackchannels[lang];
    if (customSet && customSet.has(clean)) return true;
    const builtInSet = DEFAULT_BACKCHANNELS[lang] || DEFAULT_BACKCHANNELS.en;
    if (builtInSet.has(clean)) return true;
    if (DEFAULT_BACKCHANNELS.hi.has(clean) || DEFAULT_BACKCHANNELS.en.has(clean)) {
      return true;
    }
    for (const phrase of builtInSet) {
      if (clean === phrase || clean.includes(phrase)) return true;
    }
    for (const phrase of DEFAULT_BACKCHANNELS.hi) {
      if (clean === phrase || clean.includes(phrase)) return true;
    }
    return false;
  }
  /**
   * 2. Hard Interruption Detector (<3ms)
   * Returns true if the user explicitly demands the agent stop speaking.
   */
  isHardInterruption(text2) {
    const clean = text2.toLowerCase().replace(/[^\w\s-]/g, "").trim();
    if (!clean) return false;
    if (HARD_INTERRUPTIONS.has(clean)) return true;
    for (const phrase of HARD_INTERRUPTIONS) {
      if (clean.startsWith(phrase) || clean === phrase) return true;
    }
    return false;
  }
  /**
   * 3. Deterministic Action Gate (<10ms)
   * Detects immediate call completion or human escalation commands without LLM tokens.
   */
  evaluateAction(text2, agentConfig) {
    const clean = text2.toLowerCase().replace(/[^\w\s-]/g, "").trim();
    if (!clean || clean.length > 80) return null;
    const customHangup = agentConfig?.masterAiConfig?.hangupPhrases || this.hangupPhrases;
    for (const phrase of customHangup) {
      const normalizedPhrase = phrase.toLowerCase().trim();
      if (clean === normalizedPhrase || clean.startsWith(normalizedPhrase) || clean.endsWith(normalizedPhrase)) {
        return {
          action: "hangup",
          message: agentConfig?.masterAiConfig?.hangupMessage || "Thank you for your time. Have a great day!",
          confidence: 0.95
        };
      }
    }
    const customTransfer = agentConfig?.masterAiConfig?.transferPhrases || this.transferPhrases;
    for (const phrase of customTransfer) {
      const normalizedPhrase = phrase.toLowerCase().trim();
      if (clean === normalizedPhrase || clean.includes(normalizedPhrase)) {
        return {
          action: "transfer",
          destination: agentConfig?.transferPhoneNumber || agentConfig?.masterAiConfig?.transferDestination || "user/1001",
          message: agentConfig?.masterAiConfig?.transferMessage || "Sure, transferring you to a representative now. Please hold on.",
          confidence: 0.95
        };
      }
    }
    return null;
  }
  /**
   * 4. Semantic Instant FAQ & Cache Matcher (<20ms)
   * Performs fast n-gram & token similarity to match recurring questions without LLM.
   */
  matchInstantFaq(userText, faqs) {
    if (!faqs || faqs.length === 0 || !userText) return null;
    const queryTokens = this.tokenize(userText);
    if (queryTokens.length === 0) return null;
    let bestMatch = null;
    let highestScore = 0;
    for (const faq of faqs) {
      for (const pattern of faq.questionPatterns) {
        const patternTokens = this.tokenize(pattern);
        if (patternTokens.length === 0) continue;
        const normQuery = userText.toLowerCase().replace(/[^\w\s]/g, "").trim();
        const normPattern = pattern.toLowerCase().replace(/[^\w\s]/g, "").trim();
        if (normQuery === normPattern || normQuery.includes(normPattern) || normPattern.includes(normQuery)) {
          return faq;
        }
        const intersection = queryTokens.filter((token) => patternTokens.includes(token));
        const union = /* @__PURE__ */ new Set([...queryTokens, ...patternTokens]);
        const score = intersection.length / union.size;
        if (score > highestScore && score >= 0.75) {
          highestScore = score;
          bestMatch = faq;
        }
      }
    }
    return bestMatch;
  }
  /**
   * 5. Fast Entity & Slot Pre-Extractor (<12ms)
   * Extracts dates, Indian/Global phones, and pincodes before LLM processing.
   */
  extractSlots(text2) {
    const rawEntities = {};
    const result = { rawEntities };
    const phoneMatch = text2.match(/(?:\+91|91)?[\s-]?[6-9]\d{9}\b/) || text2.match(/\b\d{10}\b/);
    if (phoneMatch) {
      result.phoneNumber = phoneMatch[0].replace(/[^\d+]/g, "");
      rawEntities.phoneNumber = result.phoneNumber;
    }
    const pinMatch = text2.match(/\b[1-9]\d{5}\b/);
    if (pinMatch) {
      result.pincode = pinMatch[0];
      rawEntities.pincode = result.pincode;
    }
    const lower = text2.toLowerCase();
    const now = /* @__PURE__ */ new Date();
    if (lower.includes("tomorrow")) {
      const tomorrow = new Date(now.getTime() + 864e5);
      result.normalizedDate = tomorrow.toISOString().split("T")[0];
      rawEntities.date = "tomorrow";
    } else if (lower.includes("today")) {
      result.normalizedDate = now.toISOString().split("T")[0];
      rawEntities.date = "today";
    }
    const timeMatch = text2.match(/\b(?:1[0-2]|0?[1-9])(?::[0-5]\d)?\s*(?:am|pm)\b/i) || text2.match(/\b(?:[01]?\d|2[0-3]):[0-5]\d\b/);
    if (timeMatch) {
      result.timeSlot = timeMatch[0].trim();
      rawEntities.time = result.timeSlot;
    }
    return result;
  }
  tokenize(text2) {
    return text2.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/).filter((w) => w.length > 1 && !this.isStopWord(w));
  }
  isStopWord(word) {
    const stops = /* @__PURE__ */ new Set(["the", "is", "at", "which", "on", "a", "an", "in", "to", "for", "of", "and"]);
    return stops.has(word);
  }
};

// plugins/custom-voice-engine/services/audio-pipeline/audio-session.ts
function writeWavHeader(samplesLength, sampleRate, numChannels, bitsPerSample) {
  const header = Buffer.alloc(44);
  const blockAlign = numChannels * (bitsPerSample / 8);
  const byteRate = sampleRate * blockAlign;
  const dataSize = samplesLength * blockAlign;
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + dataSize, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write("data", 36);
  header.writeUInt32LE(dataSize, 40);
  return header;
}
var AudioSession = class extends EventEmitter2 {
  id;
  channelUuid;
  isTransferred = false;
  isByok = false;
  session;
  agentConfig;
  sttConfig;
  llmConfig;
  ttsConfig;
  // Pipeline components
  sttProvider = null;
  llmProvider = null;
  ttsProvider = null;
  vadDetector;
  masterAiService = new MasterAIService();
  // State
  isProcessingLlm = false;
  isPlayingTts = false;
  sampleRateWarned = false;
  ttsGeneration = 0;
  lastTtsEndTime = 0;
  pendingTranscript = "";
  finalTranscriptTimer = null;
  conversationMessages = [];
  sessionStartTime;
  destroyed = false;
  silenceWarningCount = 0;
  initialized = false;
  isCallAnswered = false;
  firstMessageTriggered = false;
  callAnsweredTime = 0;
  lastIncomingWriteEnd = 0;
  lastOutgoingWriteEnd = 0;
  // Recording buffer
  pcmBuffer = Buffer.alloc(0);
  totalIncomingBytes = 0;
  bargeInPreBuffer = Buffer.alloc(0);
  // Idle timeout
  idleTimeoutId = null;
  lastUserActivityTime = 0;
  // Audio output callback (sends audio back to FreeSWITCH)
  audioOutCallback = null;
  // Sends a control/JSON text frame to mod_audio_fork over this session's
  // websocket (used by the streaming `playAudio` / `killAudio` protocol).
  controlOutCallback = null;
  // Experimental gap-free streaming playback. Off by default for compatibility with standard FreeSWITCH ESL setups. Set VE_STREAMING_PLAYBACK=true in .env to enable streaming.
  streamingPlayback = process.env.VE_STREAMING_PLAYBACK === "true";
  // Tool calling
  tools = [];
  toolMetadata = /* @__PURE__ */ new Map();
  accumulatedToolCalls = /* @__PURE__ */ new Map();
  // Pre-synthesized greeting audio (the static firstMessage). Synthesized during
  // initialize() so the greeting plays immediately on answer instead of paying a
  // cold TTS round-trip on the critical path. Falls back to live synthesis on miss.
  greetingAudioCache = null;
  greetingCacheText = null;
  fillerAudioCache = null;
  fillerCacheText = null;
  preSynthesizePromise = null;
  // Latency instrumentation: marks the start of the current turn (caller finished
  // speaking) so we can log STT→LLM→TTS→playback timings per turn.
  turnStartTime = 0;
  constructor(sessionId, session, agentConfig, sttConfig, llmConfig, ttsConfig, vadConfig, tools2, toolMetadata) {
    super();
    this.id = sessionId;
    this.session = session;
    this.agentConfig = agentConfig;
    this.sttConfig = sttConfig;
    this.llmConfig = llmConfig;
    this.ttsConfig = ttsConfig;
    this.vadDetector = new VadDetector(vadConfig);
    this.sessionStartTime = Date.now();
    this.isCallAnswered = session.direction === "inbound";
    if (this.isCallAnswered) {
      this.callAnsweredTime = Date.now();
    }
    if (tools2) this.tools = tools2;
    if (toolMetadata) this.toolMetadata = toolMetadata;
  }
  isInitialized() {
    return this.initialized;
  }
  get direction() {
    return this.session.direction;
  }
  get userId() {
    return this.session.userId;
  }
  /**
   * Initialize the audio pipeline (connect STT, prepare LLM/TTS)
   */
  async initialize() {
    if (this.initialized) return;
    this.initialized = true;
    try {
      this.sttProvider = SttProviderFactory.create(this.sttConfig.provider);
      await this.sttProvider.connect(this.sttConfig, DEFAULT_TELEPHONY_FORMAT);
      this.sttProvider.onTranscript((transcript) => {
        this.handleSttTranscript(transcript);
      });
      this.sttProvider.onError((error) => {
        this.emitPipelineEvent({
          type: "error",
          sessionId: this.id,
          error: `STT error: ${error.message}`,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
      });
      this.llmProvider = LlmProviderFactory.create(this.llmConfig.provider);
      this.ttsProvider = TtsProviderFactory.create(this.ttsConfig.provider);
      this.preSynthesizePromise = Promise.all([
        this.preSynthesizeGreeting(),
        this.preSynthesizeFiller()
      ]).then(() => {
      });
      const now = /* @__PURE__ */ new Date();
      const formatterOptions = { timeZone: "Asia/Kolkata" };
      const dateContext = [
        `

---`,
        `**Current date/time context (use this for all date calculations):**`,
        `- Today's date: ${now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric", ...formatterOptions })}`,
        `- ISO date: ${now.toLocaleDateString("en-CA", formatterOptions)}   (YYYY-MM-DD format \u2014 always use this format for appointmentDate)`,
        `- Current time: ${now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true, ...formatterOptions })}`,
        `- Day of week: ${now.toLocaleDateString("en-US", { weekday: "long", ...formatterOptions })}`,
        `When the user says "today", use ${now.toLocaleDateString("en-CA", formatterOptions)}. When they say "tomorrow", use ${new Date(now.getTime() + 864e5).toLocaleDateString("en-CA", formatterOptions)}.`
      ].join("\n");
      const baseSystemPrompt = this.llmConfig.systemPrompt || this.agentConfig.systemPrompt || "";
      const finalPromptContent = this.llmConfig.systemPrompt ? baseSystemPrompt : baseSystemPrompt + dateContext;
      this.conversationMessages.push({
        role: "system",
        content: finalPromptContent
      });
      this.updateStatus("active");
      this.emitPipelineEvent({
        type: "session_start",
        sessionId: this.id,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      console.log(`[AudioSession:${this.id}] Pipeline initialized. direction=${this.session.direction}, answered=${this.isCallAnswered}`);
    } catch (err) {
      this.updateStatus("failed");
      throw new Error(`Pipeline initialization failed: ${err.message}`);
    }
  }
  /**
   * Pre-synthesize the static greeting audio during pipeline init.
   * Runs in the background (fire-and-forget). On success the greeting plays
   * from memory on answer; on any failure we simply fall back to live synthesis.
   */
  async preSynthesizeGreeting() {
    const greeting = this.agentConfig.firstMessage;
    if (!greeting || !this.ttsProvider) return;
    try {
      const startTime = Date.now();
      const chunks = [];
      const config = { ...this.ttsConfig };
      if (this.agentConfig.detectLanguageEnabled) {
        config.language = this.detectTtsLanguage(greeting, config.language || "en-IN");
      }
      for await (const audioChunk of this.ttsProvider.synthesizeStream(greeting, config)) {
        chunks.push(audioChunk);
      }
      if (chunks.length > 0 && !this.destroyed) {
        this.greetingAudioCache = Buffer.concat(chunks);
        this.greetingCacheText = greeting;
        console.log(`[AudioSession:${this.id}] [latency] Greeting pre-synthesized in ${Date.now() - startTime}ms (${this.greetingAudioCache.length} bytes cached)`);
      }
    } catch (err) {
      console.warn(`[AudioSession:${this.id}] Greeting pre-synthesis failed (will fall back to live TTS): ${err.message}`);
    }
  }
  getFillerText() {
    const lang = this.agentConfig.language || "en";
    const baseLang = lang.split(/[-_]/)[0].toLowerCase();
    let filler = "Sure, one moment...";
    if (baseLang === "hi") {
      filler = "\u091C\u0940, \u090F\u0915 \u092E\u093F\u0928\u091F...";
    } else if (baseLang === "ta") {
      filler = "\u0B9A\u0BB0\u0BBF, \u0B92\u0BB0\u0BC1 \u0BA8\u0BBF\u0BAE\u0BBF\u0B9F\u0BAE\u0BCD...";
    } else if (baseLang === "te") {
      filler = "\u0C38\u0C30\u0C47, \u0C12\u0C15\u0C4D\u0C15 \u0C28\u0C3F\u0C2E\u0C3F\u0C37\u0C02...";
    } else if (baseLang === "kn") {
      filler = "\u0CB8\u0CB0\u0CBF, \u0C92\u0C82\u0CA6\u0CC1 \u0CA8\u0CBF\u0CAE\u0CBF\u0CB7...";
    }
    return filler;
  }
  async preSynthesizeFiller() {
    const filler = this.getFillerText();
    if (!this.ttsProvider) return;
    try {
      const startTime = Date.now();
      const chunks = [];
      const config = { ...this.ttsConfig };
      if (this.agentConfig.detectLanguageEnabled) {
        config.language = this.detectTtsLanguage(filler, config.language || "en-IN");
      }
      for await (const audioChunk of this.ttsProvider.synthesizeStream(filler, config)) {
        chunks.push(audioChunk);
      }
      if (chunks.length > 0 && !this.destroyed) {
        this.fillerAudioCache = Buffer.concat(chunks);
        this.fillerCacheText = filler;
        console.log(`[AudioSession:${this.id}] [latency] Filler phrase pre-synthesized in ${Date.now() - startTime}ms (${this.fillerAudioCache.length} bytes cached)`);
      }
    } catch (err) {
      console.warn(`[AudioSession:${this.id}] Filler pre-synthesis failed (will fall back to live TTS): ${err.message}`);
    }
  }
  async triggerFirstMessage() {
    if (this.firstMessageTriggered) {
      console.log(`[AudioSession:${this.id}] triggerFirstMessage - already triggered, returning`);
      return;
    }
    this.firstMessageTriggered = true;
    const greetingStart = Date.now();
    if (!this.agentConfig.firstMessage) {
      console.log(`[AudioSession:${this.id}] triggerFirstMessage - no firstMessage configured`);
      return;
    }
    if (this.preSynthesizePromise) {
      try {
        console.log(`[AudioSession:${this.id}] triggerFirstMessage - waiting for greeting pre-synthesis to complete...`);
        await this.preSynthesizePromise;
      } catch (err) {
        console.warn(`[AudioSession:${this.id}] triggerFirstMessage - pre-synthesis wait failed: ${err.message}`);
      }
    }
    const isCached = this.greetingCacheText === this.agentConfig.firstMessage && !!this.greetingAudioCache;
    console.log(`[AudioSession:${this.id}] triggerFirstMessage - speaking first message: "${this.agentConfig.firstMessage}" (cached=${isCached})`);
    if (isCached) {
      await this.speakText(this.agentConfig.firstMessage);
    } else {
      const sentences = this.splitIntoSentences(this.agentConfig.firstMessage);
      console.log(`[AudioSession:${this.id}] triggerFirstMessage - split uncached greeting into ${sentences.length} sentences`);
      for (const sentence of sentences) {
        this.queueTts(sentence);
      }
      while (this.isProcessingTtsQueue || this.ttsQueue.length > 0) {
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    }
    this.conversationMessages.push({
      role: "assistant",
      content: this.agentConfig.firstMessage
    });
    console.log(`[AudioSession:${this.id}] [latency] triggerFirstMessage - done in ${Date.now() - greetingStart}ms`);
  }
  /**
   * Yield TTS audio for `text`. If we have a matching pre-synthesized buffer
   * (the greeting), stream it from memory in provider-sized frames; otherwise
   * fall through to live provider synthesis. Keeps speakText's mixing/offset
   * logic identical for both paths.
   */
  async *getTtsStream(text2) {
    if (text2 === this.agentConfig.firstMessage && this.preSynthesizePromise) {
      try {
        await this.preSynthesizePromise;
      } catch (err) {
        console.warn(`[AudioSession:${this.id}] Failed waiting for greeting pre-synthesis: ${err.message}`);
      }
    }
    if (this.greetingAudioCache && this.greetingCacheText === text2) {
      const cached = this.greetingAudioCache;
      const chunkSize = 640;
      for (let offset = 0; offset < cached.length; offset += chunkSize) {
        yield cached.subarray(offset, Math.min(offset + chunkSize, cached.length));
      }
      return;
    }
    if (this.fillerAudioCache && this.fillerCacheText === text2) {
      const cached = this.fillerAudioCache;
      const chunkSize = 640;
      for (let offset = 0; offset < cached.length; offset += chunkSize) {
        yield cached.subarray(offset, Math.min(offset + chunkSize, cached.length));
      }
      return;
    }
    const config = { ...this.ttsConfig };
    if (this.agentConfig.detectLanguageEnabled) {
      config.language = this.detectTtsLanguage(text2, config.language || "en-IN");
    }
    yield* this.ttsProvider.synthesizeStream(text2, config);
  }
  async enableAudio() {
    if (!this.isCallAnswered) {
      console.log(`[AudioSession:${this.id}] enableAudio - marking answered`);
      this.isCallAnswered = true;
      this.callAnsweredTime = Date.now();
    } else {
      console.log(`[AudioSession:${this.id}] enableAudio - already answered`);
    }
  }
  async markCallAnswered() {
    if (!this.isCallAnswered) {
      console.log(`[AudioSession:${this.id}] callAnswered - marking answered, triggering first message`);
      this.isCallAnswered = true;
      this.callAnsweredTime = Date.now();
      this.emit("callAnswered");
    }
    await this.triggerFirstMessage();
  }
  /**
   * Process incoming audio from FreeSWITCH (mod_audio_fork)
   */
  processAudio(chunk) {
    if (this.destroyed) return;
    if (!this.isCallAnswered) return;
    const elapsedMs = Math.max(0, Date.now() - this.callAnsweredTime);
    let startOffset = Math.round(elapsedMs * 8) * 2;
    if (startOffset < this.lastIncomingWriteEnd) {
      startOffset = this.lastIncomingWriteEnd;
    }
    this.mixAudioAtOffset(chunk, startOffset);
    this.lastIncomingWriteEnd = startOffset + chunk.length;
    const timeSinceLastTts = Date.now() - this.lastTtsEndTime;
    const isWithinEchoGuardWindow = timeSinceLastTts < 100;
    if (!isWithinEchoGuardWindow) {
      const vadResult = this.vadDetector.processChunk(chunk, this.isPlayingTts);
      if (vadResult.isSpeechEnd) {
        console.log(`[AudioSession:${this.id}] VAD isSpeechEnd, provider=${this.sttProvider?.name}, hasFlush=${typeof this.sttProvider?.flush === "function"}, playingTts=${this.isPlayingTts}`);
      }
      if (vadResult.isSpeechStart) {
        this.clearIdleTimeout();
        this.silenceWarningCount = 0;
        if (this.isPlayingTts && this.agentConfig.interruptible) {
          this.handleInterruption();
        }
      }
      if (vadResult.isSpeechEnd && this.sttProvider) {
        if (this.sttProvider.flush) {
          console.log(`[AudioSession:${this.id}] Calling STT flush`);
          this.sttProvider.flush().catch((err) => {
            console.error(`[AudioSession:${this.id}] STT flush error:`, err.message);
          });
        } else if (this.sttProvider.name === "deepgram") {
          console.log(`[AudioSession:${this.id}] Forcing Deepgram stream finalize on VAD silence`);
          this.sttProvider.sendAudio(JSON.stringify({ type: "Finalize" }));
        }
      }
    }
    const canSendAudio = !this.isPlayingTts;
    if (canSendAudio) {
      this.bargeInPreBuffer = Buffer.alloc(0);
      if (!isWithinEchoGuardWindow && this.sttProvider?.isConnected()) {
        this.sttProvider.sendAudio(chunk);
      }
    } else {
      const maxPreBufferBytes = 16e3;
      this.bargeInPreBuffer = Buffer.concat([this.bargeInPreBuffer, chunk]);
      if (this.bargeInPreBuffer.length > maxPreBufferBytes) {
        this.bargeInPreBuffer = this.bargeInPreBuffer.slice(this.bargeInPreBuffer.length - maxPreBufferBytes);
      }
    }
    const answeredTime = this.callAnsweredTime > 0 ? this.callAnsweredTime : this.sessionStartTime;
    const elapsed = (Date.now() - answeredTime) / 1e3;
    if (elapsed >= this.agentConfig.maxDurationSeconds) {
      this.end("timeout");
    }
  }
  /**
   * Set callback for sending audio back to caller
   */
  onAudioOut(callback) {
    this.audioOutCallback = callback;
  }
  /**
   * Set callback for sending control/JSON frames (playAudio / killAudio) to
   * mod_audio_fork over this session's websocket. Required for streaming playback.
   */
  onControlOut(callback) {
    this.controlOutCallback = callback;
  }
  /** True when gap-free streaming playback is active for this session. */
  get isStreamingPlayback() {
    return this.streamingPlayback && !!this.controlOutCallback;
  }
  // ── Private: Idle Timeout ──────────────────────────────
  getSilenceMessages() {
    const lang = this.agentConfig.language || "en";
    const baseLang = lang.split(/[-_]/)[0].toLowerCase();
    switch (baseLang) {
      case "hi":
        return {
          warning: "\u0928\u092E\u0938\u094D\u0924\u0947, \u0915\u094D\u092F\u093E \u0906\u092A \u0935\u0939\u0940\u0902 \u0939\u0948\u0902? \u092E\u0941\u091D\u0947 \u0906\u092A\u0915\u0940 \u0906\u0935\u093E\u091C\u093C \u0928\u0939\u0940\u0902 \u0906 \u0930\u0939\u0940 \u0939\u0948\u0964",
          end: "\u091A\u0942\u0902\u0915\u093F \u0906\u092A\u0915\u0940 \u0906\u0935\u093E\u091C\u093C \u0928\u0939\u0940\u0902 \u0906 \u0930\u0939\u0940 \u0939\u0948, \u0907\u0938\u0932\u093F\u090F \u0939\u092E \u0907\u0938 \u0915\u0949\u0932 \u0915\u094B \u0938\u092E\u093E\u092A\u094D\u0924 \u0915\u0930 \u0930\u0939\u0947 \u0939\u0948\u0902\u0964 \u0927\u0928\u094D\u092F\u0935\u093E\u0926\u0964"
        };
      case "ta":
        return {
          warning: "\u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD, \u0BA8\u0BC0\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B85\u0B99\u0BCD\u0B95\u0BC7 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BBF\u0BB1\u0BC0\u0BB0\u0BCD\u0B95\u0BB3\u0BBE? \u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B95\u0BC1\u0BB0\u0BB2\u0BCD \u0B95\u0BC7\u0B9F\u0BCD\u0B95\u0BB5\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8.",
          end: "\u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B95\u0BC1\u0BB0\u0BB2\u0BCD \u0B95\u0BC7\u0B9F\u0BCD\u0B95\u0BBE\u0BA4\u0BA4\u0BBE\u0BB2\u0BCD, \u0BA8\u0BBE\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B85\u0BB4\u0BC8\u0BAA\u0BCD\u0BAA\u0BC8 \u0BAE\u0BC1\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BBF\u0BB1\u0BCB\u0BAE\u0BCD. \u0BA8\u0BA9\u0BCD\u0BB1\u0BBF."
        };
      case "te":
        return {
          warning: "\u0C39\u0C32\u0C4B, \u0C2E\u0C40\u0C30\u0C41 \u0C05\u0C15\u0C4D\u0C15\u0C21\u0C47 \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C30\u0C3E? \u0C2E\u0C40 \u0C35\u0C3E\u0C2F\u0C3F\u0C38\u0C4D \u0C35\u0C3F\u0C28\u0C2A\u0C21\u0C21\u0C02 \u0C32\u0C47\u0C26\u0C41.",
          end: "\u0C2E\u0C40 \u0C35\u0C3E\u0C2F\u0C3F\u0C38\u0C4D \u0C35\u0C3F\u0C28\u0C2A\u0C21\u0C28\u0C02\u0C26\u0C41\u0C28, \u0C2E\u0C47\u0C2E\u0C41 \u0C15\u0C3E\u0C32\u0C4D \u0C2E\u0C41\u0C17\u0C3F\u0C38\u0C4D\u0C24\u0C41\u0C28\u0C4D\u0C28\u0C3E\u0C2E\u0C41. \u0C27\u0C28\u0C4D\u0C2F\u0C35\u0C3E\u0C26\u0C3E\u0C32\u0C41."
        };
      case "kn":
        return {
          warning: "\u0CB9\u0CB2\u0CCB, \u0CA8\u0CC0\u0CB5\u0CC1 \u0C85\u0CB2\u0CCD\u0CB2\u0CC7 \u0C87\u0CA6\u0CCD\u0CA6\u0CC0\u0CB0\u0CBE? \u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0CA7\u0CCD\u0CB5\u0CA8\u0CBF \u0C95\u0CC7\u0CB3\u0CBF\u0CB8\u0CC1\u0CA4\u0CCD\u0CA4\u0CBF\u0CB2\u0CCD\u0CB2.",
          end: "\u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0CA7\u0CCD\u0CB5\u0CA8\u0CBF \u0C95\u0CC7\u0CB3\u0CBF\u0CB8\u0CA6 \u0C95\u0CBE\u0CB0\u0CA3, \u0CA8\u0CBE\u0CB5\u0CC1 \u0C95\u0CB0\u0CC6\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1 \u0CAE\u0CC1\u0C95\u0CCD\u0CA4\u0CBE\u0CAF\u0C97\u0CCA\u0CB3\u0CBF\u0CB8\u0CC1\u0CA4\u0CCD\u0CA4\u0CBF\u0CA6\u0CCD\u0CA6\u0CC7\u0CB5\u0CC6. \u0CA7\u0CA8\u0CCD\u0CAF\u0CB5\u0CBE\u0CA6\u0C97\u0CB3\u0CC1."
        };
      default:
        return {
          warning: "Hello, are you still there? I can't hear you.",
          end: "Since you are not audible, we are ending this call now. Goodbye."
        };
    }
  }
  resetIdleTimeout() {
    this.clearIdleTimeout();
    if (this.destroyed) return;
    const timeoutMs = this.agentConfig.silenceTimeoutMs || 15e3;
    const warningInterval = Math.max(5e3, Math.floor(timeoutMs / 2));
    this.idleTimeoutId = setTimeout(async () => {
      if (this.destroyed) return;
      const messages = this.getSilenceMessages();
      if (this.silenceWarningCount === 0) {
        this.silenceWarningCount++;
        console.log(`[AudioSession:${this.id}] Silence warning triggered, speaking check-in`);
        await this.speakText(messages.warning);
        this.resetIdleTimeout();
      } else {
        console.log(`[AudioSession:${this.id}] Second silence timeout reached, ending call`);
        await this.speakText(messages.end);
        setTimeout(() => {
          this.end("timeout");
        }, 2500);
      }
    }, warningInterval);
  }
  clearIdleTimeout() {
    if (this.idleTimeoutId) {
      clearTimeout(this.idleTimeoutId);
      this.idleTimeoutId = null;
    }
  }
  /**
   * End the session
   */
  async end(reason = "normal") {
    if (this.destroyed) return;
    this.clearIdleTimeout();
    const answeredTime = this.callAnsweredTime > 0 ? this.callAnsweredTime : this.sessionStartTime;
    this.session.durationSeconds = Math.floor((Date.now() - answeredTime) / 1e3);
    this.session.endedAt = /* @__PURE__ */ new Date();
    this.updateStatus("completing");
    if (this.finalTranscriptTimer) {
      clearTimeout(this.finalTranscriptTimer);
      this.finalTranscriptTimer = null;
    }
    try {
      if (this.sttProvider) await this.sttProvider.close();
    } catch {
    }
    this.destroyed = true;
    console.log(`[AudioSession:${this.id}] Session ending. pcmBuffer size: ${this.pcmBuffer.length} bytes. totalIncomingBytes: ${this.totalIncomingBytes}`);
    if (this.pcmBuffer.length > 0) {
      try {
        const expectedBufferBytes = Math.round(this.session.durationSeconds * 8e3 * 2);
        const trimmedBuffer = this.pcmBuffer.length > expectedBufferBytes ? this.pcmBuffer.slice(0, expectedBufferBytes) : this.pcmBuffer;
        if (trimmedBuffer.length !== this.pcmBuffer.length) {
          console.log(`[AudioSession:${this.id}] Trimmed pcmBuffer: ${this.pcmBuffer.length} -> ${trimmedBuffer.length} bytes (removed ${this.pcmBuffer.length - trimmedBuffer.length} trailing silence bytes)`);
        }
        const samplesCount = trimmedBuffer.length / 2;
        const durationSeconds = Math.round(samplesCount / 8e3);
        console.log(`[AudioSession:${this.id}] Preparing to save WAV recording. Samples: ${samplesCount}, Duration: ${durationSeconds}s`);
        const recordingsDir = path2.join(process.cwd(), "client", "public", "uploads", "recordings");
        if (!fs2.existsSync(recordingsDir)) {
          console.log(`[AudioSession:${this.id}] Creating recordings directory: ${recordingsDir}`);
          fs2.mkdirSync(recordingsDir, { recursive: true });
        }
        const wavHeader = writeWavHeader(samplesCount, 8e3, 1, 16);
        const wavBuffer = Buffer.concat([wavHeader, trimmedBuffer]);
        const fileName = `${this.id}.wav`;
        const storagePath = path2.join(recordingsDir, fileName);
        const storageUrl = `/uploads/recordings/${fileName}`;
        console.log(`[AudioSession:${this.id}] Writing WAV file to disk at: ${storagePath}`);
        await fs2.promises.writeFile(storagePath, wavBuffer);
        console.log(`[AudioSession:${this.id}] WAV file successfully written to disk. File size: ${wavBuffer.length} bytes`);
        const textTranscript = typeof this.session.transcript === "string" ? this.session.transcript : JSON.stringify(this.session.transcript || []);
        console.log(`[AudioSession:${this.id}] Inserting recording metadata into ve_call_recordings table...`);
        await db.execute(sql15`
          INSERT INTO ve_call_recordings (
            session_id, user_id, call_id, storage_backend, storage_path, storage_url, file_size, duration_seconds, format, status, transcript, created_at
          ) VALUES (
            ${this.id}, ${this.session.userId}, ${this.session.callId || null}, 'local', ${storagePath}, ${storageUrl}, ${wavBuffer.length}, ${durationSeconds}, 'wav', 'available', ${textTranscript}, NOW()
          )
        `);
        console.log(`[AudioSession:${this.id}] Successfully saved local recording to database with storageUrl: ${storageUrl}`);
      } catch (err) {
        console.error(`[AudioSession:${this.id}] Failed to save local recording:`, err.stack || err.message);
      }
    } else {
      console.warn(`[AudioSession:${this.id}] Warning: No audio was recorded for this session. pcmBuffer is empty.`);
    }
    this.updateStatus("completed");
    this.emitPipelineEvent({
      type: "session_end",
      sessionId: this.id,
      reason,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    console.log(`[AudioSession:${this.id}] Ended: ${reason} (${this.session.durationSeconds}s)`);
    this.emit("hangup", reason);
    this.removeAllListeners();
  }
  /**
   * Get current session data
   */
  getSession() {
    return { ...this.session };
  }
  // ── Private: STT Handling ──────────────────────────────
  lastTranscriptText = "";
  lastTranscriptTime = 0;
  handleSttTranscript(transcript) {
    if (this.destroyed) {
      console.log(`[AudioSession:${this.id}] handleSttTranscript - destroyed, ignoring "${transcript.text}"`);
      return;
    }
    this.emitPipelineEvent({
      type: "stt_transcript",
      sessionId: this.id,
      transcript,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    if (this.sttProvider?.name === "deepgram") {
      if (!transcript.speechFinal && transcript.text.trim()) {
        const chunkText2 = transcript.text.trim();
        if (!this.pendingTranscript.includes(chunkText2)) {
          this.pendingTranscript = (this.pendingTranscript ? `${this.pendingTranscript} ${chunkText2}` : chunkText2).trim();
          console.log(`[AudioSession:${this.id}] handleSttTranscript - Deepgram chunk (speech ongoing): "${this.pendingTranscript}"`);
        }
        return;
      }
    }
    const rawText = (this.pendingTranscript ? `${this.pendingTranscript} ${transcript.text || ""}` : transcript.text || "").trim();
    this.pendingTranscript = "";
    const text2 = rawText;
    console.log(`[AudioSession:${this.id}] handleSttTranscript - FINAL UTTERANCE: "${text2}"`);
    if (this.isPlayingTts && text2) {
      if (this.masterAiService.isBackchannel(text2, this.agentConfig.language)) {
        console.log(`[AudioSession:${this.id}] [MasterAI] User affirmation backchannel "${text2}" during agent playback. Ignoring barge-in.`);
        return;
      }
      if (this.masterAiService.isHardInterruption(text2)) {
        console.log(`[AudioSession:${this.id}] [MasterAI] Hard interruption keyword detected in "${text2}". Cutting off agent playback immediately.`);
        this.handleInterruption();
      }
    }
    if (text2 && this.lastTranscriptText === text2 && Date.now() - this.lastTranscriptTime < 3e3) {
      console.log(`[AudioSession:${this.id}] Skipping duplicate transcript: "${text2}"`);
      return;
    }
    this.lastTranscriptText = text2;
    this.lastTranscriptTime = Date.now();
    if (!text2.trim()) return;
    this.lastUserActivityTime = Date.now();
    this.clearIdleTimeout();
    if (this.finalTranscriptTimer) {
      clearTimeout(this.finalTranscriptTimer);
    }
    this.processUserUtterance(text2);
  }
  // ── Private: TTS Queue ────────────────────────────────
  ttsQueue = [];
  isProcessingTtsQueue = false;
  async processTtsQueue() {
    if (this.isProcessingTtsQueue || this.ttsQueue.length === 0 || this.destroyed) return;
    this.isProcessingTtsQueue = true;
    const drainGeneration = this.ttsGeneration;
    const useStreaming = this.streamingPlayback && !!this.controlOutCallback;
    console.log(`[AudioSession:${this.id}] processTtsQueue - START (${this.ttsQueue.length} items, streaming=${useStreaming})`);
    let prefetchText = null;
    let prefetchPromise = null;
    while ((this.ttsQueue.length > 0 || prefetchPromise) && !this.destroyed) {
      if (this.ttsGeneration !== drainGeneration) {
        this.ttsQueue.length = 0;
        break;
      }
      let text2;
      let audio;
      if (prefetchPromise) {
        text2 = prefetchText;
        audio = await prefetchPromise;
        prefetchPromise = null;
        prefetchText = null;
      } else {
        text2 = this.ttsQueue.shift();
        audio = useStreaming ? null : await this.synthesizeSentence(text2);
      }
      if (this.ttsGeneration !== drainGeneration) {
        this.ttsQueue.length = 0;
        break;
      }
      if (this.ttsQueue.length > 0 && !this.destroyed) {
        prefetchText = this.ttsQueue.shift();
        prefetchPromise = this.synthesizeSentence(prefetchText);
      }
      await this.speakText(text2, audio);
    }
    this.isProcessingTtsQueue = false;
    console.log(`[AudioSession:${this.id}] processTtsQueue - DONE`);
    this.resetIdleTimeout();
  }
  /**
   * Synthesize a full sentence into a single PCM buffer. Runs independently of
   * playback so processTtsQueue can prefetch the next sentence while the current
   * one is still playing. Returns null if nothing was produced.
   */
  async synthesizeSentence(text2) {
    if (this.destroyed || !this.ttsProvider) return null;
    try {
      const chunks = [];
      let firstChunkLogged = false;
      for await (const audioChunk of this.getTtsStream(text2)) {
        if (this.destroyed) break;
        if (!firstChunkLogged) {
          firstChunkLogged = true;
          if (this.turnStartTime > 0) {
            console.log(`[AudioSession:${this.id}] [latency] First TTS audio byte ${Date.now() - this.turnStartTime}ms after turn start`);
          }
        }
        chunks.push(audioChunk);
      }
      return chunks.length > 0 ? Buffer.concat(chunks) : null;
    } catch (err) {
      console.error(`[AudioSession:${this.id}] TTS synthesis error:`, err.message);
      return null;
    }
  }
  queueTts(text2) {
    this.ttsQueue.push(text2);
    console.log(`[AudioSession:${this.id}] queueTts - queued "${text2.substring(0, 50)}..." (queue size: ${this.ttsQueue.length})`);
    if (!this.isProcessingTtsQueue) {
      this.processTtsQueue();
    }
  }
  // ── Private: LLM Processing ────────────────────────────
  pendingUtterances = [];
  async processNextUtterance() {
    if (this.destroyed || this.isProcessingLlm || this.pendingUtterances.length === 0) return;
    const text2 = this.pendingUtterances.shift();
    await this.processUserUtterance(text2);
  }
  async processUserUtterance(text2) {
    if (this.destroyed) return;
    if (this.isProcessingLlm) {
      console.log(`[AudioSession:${this.id}] processUserUtterance - LLM busy, queueing: "${text2}"`);
      this.pendingUtterances.push(text2);
      return;
    }
    this.isProcessingLlm = true;
    this.turnStartTime = Date.now();
    console.log(`[AudioSession:${this.id}] processUserUtterance - START: "${text2}"`);
    this.clearIdleTimeout();
    const masterAiConfig = this.agentConfig.masterAiConfig || {};
    const actionResult = this.masterAiService.evaluateAction(text2, masterAiConfig);
    if (actionResult.action === "hangup") {
      console.log(`[AudioSession:${this.id}] [MasterAI] Action Gate -> HANGUP triggered for "${text2}"`);
      this.isProcessingLlm = false;
      this.conversationMessages.push({ role: "user", content: text2 });
      this.addTranscriptEntry("user", text2);
      if (actionResult.speechResponse) {
        this.conversationMessages.push({ role: "assistant", content: actionResult.speechResponse });
        this.addTranscriptEntry("assistant", actionResult.speechResponse);
        await this.speakText(actionResult.speechResponse);
      }
      this.end("hangup");
      return;
    }
    if (actionResult.action === "transfer" && (actionResult.transferTarget || this.agentConfig.transferPhoneNumber)) {
      const targetNumber = actionResult.transferTarget || this.agentConfig.transferPhoneNumber;
      console.log(`[AudioSession:${this.id}] [MasterAI] Action Gate -> TRANSFER to ${targetNumber} for "${text2}"`);
      this.isProcessingLlm = false;
      this.conversationMessages.push({ role: "user", content: text2 });
      this.addTranscriptEntry("user", text2);
      if (actionResult.speechResponse) {
        this.conversationMessages.push({ role: "assistant", content: actionResult.speechResponse });
        this.addTranscriptEntry("assistant", actionResult.speechResponse);
        await this.speakText(actionResult.speechResponse);
      }
      this.emit("transfer", targetNumber);
      return;
    }
    const matchedFaq = this.masterAiService.matchInstantFaq(
      text2,
      masterAiConfig.instantFaqs
    );
    if (matchedFaq && matchedFaq.answer) {
      const instantAnswer = matchedFaq.answer;
      console.log(`[AudioSession:${this.id}] [MasterAI] Instant FAQ Cache HIT: "${instantAnswer}"`);
      this.isProcessingLlm = false;
      this.conversationMessages.push({ role: "user", content: text2 });
      this.addTranscriptEntry("user", text2);
      this.conversationMessages.push({ role: "assistant", content: instantAnswer });
      this.addTranscriptEntry("assistant", instantAnswer);
      this.queueTts(instantAnswer);
      return;
    }
    const extractedSlots = this.masterAiService.extractSlots(text2);
    if (Object.keys(extractedSlots).length > 0) {
      console.log(`[AudioSession:${this.id}] [MasterAI] Fast slots extracted:`, JSON.stringify(extractedSlots));
    }
    let userContent = text2;
    if (Object.keys(extractedSlots).length > 0) {
      userContent += `
[Detected Parameters: ${JSON.stringify(extractedSlots)}]`;
    }
    this.conversationMessages.push({ role: "user", content: userContent });
    this.addTranscriptEntry("user", text2);
    this.emitPipelineEvent({
      type: "llm_start",
      sessionId: this.id,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    try {
      const startTime = Date.now();
      let fullResponse = "";
      let sentenceBuffer = "";
      this.accumulatedToolCalls.clear();
      const stream = this.llmProvider.stream(
        this.conversationMessages,
        this.llmConfig,
        this.tools.length > 0 ? this.tools : void 0
      );
      let firstTokenLogged = false;
      for await (const chunk of stream) {
        if (this.destroyed) break;
        if (chunk.content) {
          if (!firstTokenLogged) {
            firstTokenLogged = true;
            console.log(`[AudioSession:${this.id}] [latency] LLM first token ${Date.now() - this.turnStartTime}ms after turn start`);
          }
          fullResponse += chunk.content;
          sentenceBuffer += chunk.content;
          const sentenceEnd = this.findSentenceEnd(sentenceBuffer);
          if (sentenceEnd !== -1) {
            const sentence = sentenceBuffer.substring(0, sentenceEnd + 1).trim();
            sentenceBuffer = sentenceBuffer.substring(sentenceEnd + 1);
            if (sentence) {
              this.queueTts(sentence);
            }
          }
        }
        if (chunk.toolCalls) {
          for (const deltaTc of chunk.toolCalls) {
            if (deltaTc.index === void 0) continue;
            const existing = this.accumulatedToolCalls.get(deltaTc.index) || {};
            if (deltaTc.id) existing.id = deltaTc.id;
            if (deltaTc.type) existing.type = deltaTc.type;
            if (deltaTc.function) {
              if (!existing.function) existing.function = { name: "", arguments: "" };
              if (deltaTc.function.name) existing.function.name = (existing.function.name || "") + deltaTc.function.name;
              if (deltaTc.function.arguments) existing.function.arguments = (existing.function.arguments || "") + deltaTc.function.arguments;
            }
            this.accumulatedToolCalls.set(deltaTc.index, existing);
          }
        }
      }
      const toolCallEntries = Array.from(this.accumulatedToolCalls.entries()).sort(([a], [b]) => a - b).map(([_, tc]) => tc).filter((tc) => tc.id && tc.function?.name);
      if (toolCallEntries.length > 0) {
        console.log(`[AudioSession:${this.id}] LLM returned ${toolCallEntries.length} tool calls, executing...`);
        this.conversationMessages.push({
          role: "assistant",
          content: fullResponse || null,
          toolCalls: toolCallEntries
        });
        const isEndCall = toolCallEntries.some((tc) => tc.function?.name === "end_call");
        if (!isEndCall && !this.destroyed) {
          const lang = this.agentConfig.language || "en";
          const baseLang = lang.split(/[-_]/)[0].toLowerCase();
          let filler = "Sure, one moment...";
          if (baseLang === "hi") {
            filler = "\u091C\u0940, \u090F\u0915 \u092E\u093F\u0928\u091F...";
          } else if (baseLang === "ta") {
            filler = "\u0B9A\u0BB0\u0BBF, \u0B92\u0BB0\u0BC1 \u0BA8\u0BBF\u0BAE\u0BBF\u0B9F\u0BAE\u0BCD...";
          } else if (baseLang === "te") {
            filler = "\u0C38\u0C30\u0C47, \u0C12\u0C15\u0C4D\u0C15 \u0C28\u0C3F\u0C2E\u0C3F\u0C37\u0C02...";
          } else if (baseLang === "kn") {
            filler = "\u0CB8\u0CB0\u0CBF, \u0C92\u0C82\u0CA6\u0CC1 \u0CA8\u0CBF\u0CAE\u0CBF\u0CB7...";
          }
          console.log(`[AudioSession:${this.id}] Speaking filler phrase before tool call: "${filler}"`);
          const fillerAudio = filler === this.fillerCacheText ? this.fillerAudioCache : null;
          this.speakText(filler, fillerAudio).catch((err) => {
            console.error(`[AudioSession:${this.id}] Failed playing filler phrase:`, err.message);
          });
        }
        let hasEndCall = false;
        const toolPromises = toolCallEntries.map(async (tc) => {
          console.log(`[AudioSession:${this.id}] Tool call: ${tc.function.name}(${tc.function.arguments})`);
          const metadata = this.toolMetadata.get(tc.function.name);
          const result = await ToolExecutor.executeToolCall(
            tc,
            metadata,
            this.session.userId,
            this.agentConfig.id,
            this.session.callId,
            this
          );
          if (tc.function.name === "end_call") {
            hasEndCall = true;
          }
          return { tc, result };
        });
        const results = await Promise.all(toolPromises);
        for (const { tc, result } of results) {
          this.conversationMessages.push({
            role: "tool",
            content: JSON.stringify(result.result),
            toolCallId: tc.id
          });
          this.emitPipelineEvent({
            type: "llm_tool_call",
            sessionId: this.id,
            toolCall: tc,
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          });
        }
        if (hasEndCall || this.destroyed) {
          this.session.llmPromptTokens += Math.round(fullResponse.length / 4);
          this.session.llmCompletionTokens += Math.round(fullResponse.length / 4);
          return;
        }
        console.log(`[AudioSession:${this.id}] Streaming follow-up LLM response for tool confirmation...`);
        this.clearIdleTimeout();
        const followUpStartTime = Date.now();
        let followUpFull = "";
        let followUpSentenceBuffer = "";
        const followUpStream = this.llmProvider.stream(
          this.conversationMessages,
          this.llmConfig
        );
        for await (const chunk of followUpStream) {
          if (this.destroyed) break;
          if (chunk.content) {
            followUpFull += chunk.content;
            followUpSentenceBuffer += chunk.content;
            const sentenceEnd = this.findSentenceEnd(followUpSentenceBuffer);
            if (sentenceEnd !== -1) {
              const sentence = followUpSentenceBuffer.substring(0, sentenceEnd + 1).trim();
              followUpSentenceBuffer = followUpSentenceBuffer.substring(sentenceEnd + 1);
              if (sentence) {
                this.queueTts(sentence);
              }
            }
          }
        }
        if (followUpSentenceBuffer.trim() && !this.destroyed) {
          this.queueTts(followUpSentenceBuffer.trim());
        }
        if (followUpFull && !this.destroyed) {
          this.conversationMessages.push({ role: "assistant", content: followUpFull });
          this.session.llmPromptTokens += Math.round(followUpFull.length / 4);
          this.session.llmCompletionTokens += Math.round(followUpFull.length / 4);
          this.emitPipelineEvent({
            type: "llm_response",
            sessionId: this.id,
            response: followUpFull,
            latencyMs: Date.now() - followUpStartTime,
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          });
        }
        this.accumulatedToolCalls.clear();
        this.trimConversationHistory();
        return;
      }
      if (sentenceBuffer.trim() && !this.destroyed) {
        this.queueTts(sentenceBuffer.trim());
      }
      const latencyMs = Date.now() - startTime;
      console.log(`[AudioSession:${this.id}] processUserUtterance - LLM done in ${latencyMs}ms, response length: ${fullResponse.length} chars`);
      this.session.llmPromptTokens += Math.round(fullResponse.length / 4);
      this.session.llmCompletionTokens += Math.round(fullResponse.length / 4);
      this.conversationMessages.push({ role: "assistant", content: fullResponse });
      this.trimConversationHistory();
      this.emitPipelineEvent({
        type: "llm_response",
        sessionId: this.id,
        response: fullResponse,
        latencyMs,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (err) {
      console.error(`[AudioSession:${this.id}] LLM error:`, err.message, err.stack);
      this.emitPipelineEvent({
        type: "error",
        sessionId: this.id,
        error: `LLM error: ${err.message}`,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      if (!this.destroyed) {
        const fallbackMsg = "I apologize, but I encountered a technical issue. Could you please repeat that?";
        this.conversationMessages.push({ role: "assistant", content: fallbackMsg });
        this.queueTts(fallbackMsg);
      }
    } finally {
      this.isProcessingLlm = false;
      console.log(`[AudioSession:${this.id}] processUserUtterance - DONE, checking for queued utterances (${this.pendingUtterances.length} pending)`);
      this.processNextUtterance();
    }
  }
  // ── Private: TTS Output ────────────────────────────────
  async speakText(text2, preSynth) {
    if (this.streamingPlayback && this.controlOutCallback) {
      return this.speakTextStreaming(text2, preSynth);
    }
    return this.speakTextFile(text2, preSynth);
  }
  async speakTextFile(text2, preSynth) {
    if (this.destroyed || !this.ttsProvider || !this.audioOutCallback) {
      console.log(`[AudioSession:${this.id}] speakText - skipped (destroyed=${this.destroyed}, hasTts=${!!this.ttsProvider}, hasAudioCb=${!!this.audioOutCallback})`);
      return;
    }
    this.clearIdleTimeout();
    const drainGeneration = this.ttsGeneration;
    console.log(`[AudioSession:${this.id}] speakText - START playing: "${text2.substring(0, 60)}..."`);
    this.emitPipelineEvent({
      type: "tts_start",
      sessionId: this.id,
      text: text2,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    try {
      let audio = preSynth ?? null;
      if (!audio) {
        const chunks = [];
        let firstChunkLogged = false;
        for await (const audioChunk of this.getTtsStream(text2)) {
          if (this.destroyed || this.ttsGeneration !== drainGeneration) break;
          if (!firstChunkLogged) {
            firstChunkLogged = true;
            if (this.turnStartTime > 0) {
              console.log(`[AudioSession:${this.id}] [latency] First TTS audio byte ${Date.now() - this.turnStartTime}ms after turn start`);
            }
          }
          chunks.push(audioChunk);
        }
        audio = chunks.length > 0 ? Buffer.concat(chunks) : null;
      }
      if (audio) {
        audio = this.ensureTelephonySampleRate(audio);
      }
      if (audio && audio.length > 0 && !this.destroyed && this.ttsGeneration === drainGeneration) {
        this.isPlayingTts = true;
        const totalBytes = audio.length;
        const ttsPlayStartMs = Math.max(0, Date.now() - this.callAnsweredTime);
        let agentWriteOffset = Math.round(ttsPlayStartMs * 8) * 2;
        if (agentWriteOffset < this.lastOutgoingWriteEnd) {
          agentWriteOffset = this.lastOutgoingWriteEnd;
        }
        this.mixAudioAtOffset(audio, agentWriteOffset);
        this.lastOutgoingWriteEnd = agentWriteOffset + totalBytes;
        this.audioOutCallback(audio);
        const playbackDurationMs = Math.round(totalBytes / 16);
        await new Promise((resolve) => setTimeout(resolve, playbackDurationMs));
        this.addTranscriptEntry("assistant", text2);
        console.log(`[AudioSession:${this.id}] speakText - FINISHED playback (${playbackDurationMs}ms), added to transcript`);
        this.session.ttsCharacters += text2.length;
        this.session.ttsDurationMs += Math.round(totalBytes / 16);
        this.emitPipelineEvent({
          type: "tts_audio",
          sessionId: this.id,
          bytes: totalBytes,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
      } else {
        console.log(`[AudioSession:${this.id}] speakText - audio DISCARDED (hasAudio=${!!audio}, destroyed=${this.destroyed}, isPlaying=${this.isPlayingTts})`);
      }
    } catch (err) {
      console.error(`[AudioSession:${this.id}] TTS error:`, err.message);
    } finally {
      this.isPlayingTts = false;
      this.lastTtsEndTime = Date.now();
      this.vadDetector.reset();
    }
  }
  /**
   * Streaming playback path (default). Forwards TTS audio to the caller in small
   * blocks as it is produced, over the mod_audio_fork websocket using drachtio's
   * `playAudio` control message. Consecutive blocks — and consecutive sentences —
   * are handed to the module back-to-back with no per-file gap, and the caller
   * starts hearing the agent as soon as the first block is generated. Falls back
   * to the legacy file path when no control channel is available.
   *
   * `preSynth` (a fully synthesized sentence buffer from the prefetch pipeline) is
   * chunked and streamed in blocks; when omitted the audio is streamed live from
   * the TTS provider for the fastest possible first audio.
   */
  async speakTextStreaming(text2, preSynth) {
    if (this.destroyed || !this.controlOutCallback || !this.ttsProvider && !preSynth) {
      return this.speakTextFile(text2, preSynth);
    }
    this.clearIdleTimeout();
    const drainGeneration = this.ttsGeneration;
    console.log(`[AudioSession:${this.id}] speakTextStreaming - START "${text2.substring(0, 60)}..."`);
    this.emitPipelineEvent({
      type: "tts_start",
      sessionId: this.id,
      text: text2,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    const FIRST_FLUSH_BYTES = 1600;
    const FLUSH_BYTES = 8e3;
    let offset = Math.round(Math.max(0, Date.now() - this.callAnsweredTime) * 8) * 2;
    if (offset < this.lastOutgoingWriteEnd) offset = this.lastOutgoingWriteEnd;
    let totalBytes = 0;
    let firstFlushDone = false;
    let firstBlockLogged = false;
    const stopped = () => this.destroyed || this.ttsGeneration !== drainGeneration;
    const flush = async (block) => {
      const out = this.ensureTelephonySampleRate(block);
      if (out.length === 0) return;
      if (offset < this.lastOutgoingWriteEnd) offset = this.lastOutgoingWriteEnd;
      this.mixAudioAtOffset(out, offset);
      offset += out.length;
      this.lastOutgoingWriteEnd = offset;
      totalBytes += out.length;
      this.isPlayingTts = true;
      this.controlOutCallback({
        type: "playAudio",
        data: {
          audioContentType: "raw",
          sampleRate: "8000",
          audioContent: out.toString("base64")
        }
      });
      if (!firstBlockLogged) {
        firstBlockLogged = true;
        if (this.turnStartTime > 0) {
          console.log(`[AudioSession:${this.id}] [latency] First TTS audio sent ${Date.now() - this.turnStartTime}ms after turn start`);
        }
      }
      await new Promise((resolve) => setTimeout(resolve, Math.round(out.length / 16 * 0.85)));
    };
    try {
      let pending = Buffer.alloc(0);
      const source = preSynth ? (async function* () {
        yield preSynth;
      })() : this.getTtsStream(text2);
      for await (const chunk of source) {
        if (stopped()) break;
        pending = pending.length ? Buffer.concat([pending, chunk]) : chunk;
        let threshold = firstFlushDone ? FLUSH_BYTES : FIRST_FLUSH_BYTES;
        while (pending.length >= threshold) {
          const block = Buffer.from(pending.subarray(0, threshold));
          pending = pending.subarray(threshold);
          firstFlushDone = true;
          await flush(block);
          if (stopped()) break;
          threshold = FLUSH_BYTES;
        }
        if (stopped()) break;
      }
      if (!stopped() && pending.length > 0) {
        await flush(Buffer.from(pending));
      }
      if (totalBytes > 0 && this.ttsGeneration === drainGeneration) {
        this.addTranscriptEntry("assistant", text2);
        this.session.ttsCharacters += text2.length;
        this.session.ttsDurationMs += Math.round(totalBytes / 16);
        this.emitPipelineEvent({
          type: "tts_audio",
          sessionId: this.id,
          bytes: totalBytes,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
        console.log(`[AudioSession:${this.id}] speakTextStreaming - FINISHED (${totalBytes} bytes)`);
      } else {
        console.log(`[AudioSession:${this.id}] speakTextStreaming - stopped/empty (bytes=${totalBytes})`);
      }
    } catch (err) {
      console.error(`[AudioSession:${this.id}] streaming TTS error:`, err.message);
    } finally {
      this.isPlayingTts = false;
      this.lastTtsEndTime = Date.now();
      this.vadDetector.reset();
    }
  }
  mixAudioAtOffset(chunk, startOffset) {
    if (this.destroyed || chunk.length === 0) return;
    const endOffset = startOffset + chunk.length;
    if (endOffset > this.pcmBuffer.length) {
      const newBuffer = Buffer.alloc(endOffset);
      this.pcmBuffer.copy(newBuffer);
      this.pcmBuffer = newBuffer;
    }
    const sampleCount = chunk.length >> 1;
    const dst = new Int16Array(
      this.pcmBuffer.buffer,
      this.pcmBuffer.byteOffset + startOffset,
      sampleCount
    );
    if ((chunk.byteOffset & 1) === 0) {
      const src = new Int16Array(chunk.buffer, chunk.byteOffset, sampleCount);
      for (let i = 0; i < sampleCount; i++) {
        let mixed = dst[i] + src[i];
        if (mixed > 32767) mixed = 32767;
        else if (mixed < -32768) mixed = -32768;
        dst[i] = mixed;
      }
    } else {
      for (let i = 0; i < sampleCount; i++) {
        let mixed = dst[i] + chunk.readInt16LE(i << 1);
        if (mixed > 32767) mixed = 32767;
        else if (mixed < -32768) mixed = -32768;
        dst[i] = mixed;
      }
    }
  }
  /**
   * The playback path writes a fixed 8kHz WAV header, so any TTS audio produced
   * at a different sample rate would play back distorted ("slow-motion"). If the
   * TTS config requests a non-8kHz rate, downsample the PCM to 8kHz here so the
   * caller always hears correct-speed audio. No-op for the normal 8kHz case.
   */
  ensureTelephonySampleRate(audio) {
    const configured = this.ttsConfig.outputFormat?.sampleRate;
    if (!configured || configured === 8e3) return audio;
    if (!this.sampleRateWarned) {
      this.sampleRateWarned = true;
      console.warn(`[AudioSession:${this.id}] TTS sample rate ${configured}Hz != 8000Hz playback rate \u2014 resampling to 8kHz to avoid distorted audio`);
    }
    return this.resamplePcm16(audio, configured, 8e3);
  }
  resamplePcm16(audio, fromRate, toRate) {
    if (fromRate === toRate || audio.length < 2) return audio;
    const srcSamples = audio.length >> 1;
    const ratio = toRate / fromRate;
    const dstSamples = Math.max(1, Math.floor(srcSamples * ratio));
    const out = Buffer.alloc(dstSamples * 2);
    for (let i = 0; i < dstSamples; i++) {
      const srcPos = i / ratio;
      const idx = Math.floor(srcPos);
      const frac = srcPos - idx;
      const s0 = audio.readInt16LE(Math.min(idx, srcSamples - 1) * 2);
      const s1 = audio.readInt16LE(Math.min(idx + 1, srcSamples - 1) * 2);
      out.writeInt16LE(Math.round(s0 + (s1 - s0) * frac), i * 2);
    }
    return out;
  }
  /**
   * Cap the live conversation history so long calls don't keep inflating the LLM
   * prompt every turn (which steadily raises latency). Always keeps the system
   * prompt plus the most recent messages, and never leaves a dangling tool
   * result whose assistant tool-call parent was trimmed away.
   */
  trimConversationHistory() {
    const MAX_RECENT = 20;
    if (this.conversationMessages.length <= MAX_RECENT + 1) return;
    const system = this.conversationMessages[0];
    const rest = this.conversationMessages.slice(1);
    let start = rest.length - MAX_RECENT;
    while (start < rest.length && rest[start].role === "tool") {
      start++;
    }
    this.conversationMessages = [system, ...rest.slice(start)];
  }
  // ── Private: Interruption Handling ─────────────────────
  handleInterruption() {
    if (!this.isPlayingTts) return;
    this.isPlayingTts = false;
    this.isProcessingLlm = false;
    this.ttsGeneration++;
    this.vadDetector.reset();
    if (this.bargeInPreBuffer.length > 0 && this.sttProvider?.isConnected()) {
      console.log(`[AudioSession:${this.id}] Sending ${this.bargeInPreBuffer.length} bytes of pre-buffered barge-in audio to STT`);
      this.sttProvider.sendAudio(this.bargeInPreBuffer);
      this.bargeInPreBuffer = Buffer.alloc(0);
    }
    this.emitPipelineEvent({
      type: "interruption",
      sessionId: this.id,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    console.log(`[AudioSession:${this.id}] User interrupted TTS`);
  }
  // ── Private: Helpers ───────────────────────────────────
  findSentenceEnd(text2) {
    const sentenceEndings = [". ", "! ", "? ", ".\n", "!\n", "?\n", "\u0964 ", "\u0964\n", "| ", "|\n"];
    let lastEnd = -1;
    for (const ending of sentenceEndings) {
      const idx = text2.lastIndexOf(ending);
      if (idx > lastEnd) {
        lastEnd = idx;
      }
    }
    if (lastEnd === -1 && text2.length > 35) {
      const clauseEndings = [", ", "; ", ": ", " \u2014 "];
      for (const clause of clauseEndings) {
        const idx = text2.lastIndexOf(clause);
        if (idx > 18 && idx > lastEnd) {
          lastEnd = idx;
        }
      }
    }
    return lastEnd;
  }
  splitIntoSentences(text2) {
    const sentences = [];
    let remaining = text2;
    while (remaining.length > 0) {
      const endings = [
        ". ",
        "! ",
        "? ",
        ".\n",
        "!\n",
        "?\n",
        "\u0964 ",
        "\u0964\n",
        "| ",
        "|\n",
        ", ",
        "; ",
        ": ",
        ",\n",
        ";\n",
        ":\n",
        ".",
        "!",
        "?",
        "\u0964",
        "|",
        ",",
        ";",
        ":"
      ];
      let earliestIdx = -1;
      let matchedEnding = "";
      for (const ending of endings) {
        const idx = remaining.indexOf(ending);
        if (idx !== -1 && (earliestIdx === -1 || idx < earliestIdx)) {
          earliestIdx = idx;
          matchedEnding = ending;
        }
      }
      if (earliestIdx !== -1) {
        const sentence = remaining.substring(0, earliestIdx + matchedEnding.trim().length).trim();
        if (sentence) {
          sentences.push(sentence);
        }
        remaining = remaining.substring(earliestIdx + matchedEnding.length).trim();
      } else {
        if (remaining.trim()) {
          sentences.push(remaining.trim());
        }
        break;
      }
    }
    return sentences;
  }
  detectTtsLanguage(text2, defaultLang) {
    if (/[\u0900-\u097F]/.test(text2)) return "hi-IN";
    if (/[\u0B80-\u0BFF]/.test(text2)) return "ta-IN";
    if (/[\u0C00-\u0C7F]/.test(text2)) return "te-IN";
    if (/[\u0C80-\u0CFF]/.test(text2)) return "kn-IN";
    if (/[\u0D00-\u0D7F]/.test(text2)) return "ml-IN";
    if (/[\u0980-\u09FF]/.test(text2)) return "bn-IN";
    if (/[\u0A80-\u0AFF]/.test(text2)) return "gu-IN";
    if (/[\u0A00-\u0A7F]/.test(text2)) return "pa-IN";
    if (/[\u0B00-\u0B7F]/.test(text2)) return "od-IN";
    return defaultLang;
  }
  addTranscriptEntry(role, content) {
    this.session.transcript.push({
      role,
      content,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  updateStatus(status) {
    this.session.status = status;
    this.emit("statusChange", status);
  }
  emitPipelineEvent(event) {
    this.emit("pipelineEvent", event);
  }
};

// plugins/custom-voice-engine/services/audio-pipeline/ws-audio-server.ts
init_db();
import { sql as sql18 } from "drizzle-orm";
function camelizeKeys(obj) {
  if (Array.isArray(obj)) {
    return obj.map((v) => camelizeKeys(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((result, key) => {
      if (key === "compiled_tools" || key === "compiledTools") {
        const camelKey2 = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
        result[camelKey2] = obj[key];
        return result;
      }
      const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
      result[camelKey] = camelizeKeys(obj[key]);
      return result;
    }, {});
  }
  return obj;
}
var AudioWebSocketServer = class {
  wss;
  sessions = /* @__PURE__ */ new Map();
  eslConnections = [];
  answeredCalls = /* @__PURE__ */ new Set();
  constructor(httpServer) {
    this.wss = new WebSocketServer({
      noServer: true,
      perMessageDeflate: false,
      // Disable compression for low-latency audio
      maxPayload: 64 * 1024
      // 64KB max per message
    });
    httpServer.on("upgrade", (req, socket, head) => {
      const pathname = req.url?.split("?")[0] || "";
      if (pathname.startsWith("/voice-engine/audio/") || pathname.startsWith("/api/voice-engine/ws/audio/") || pathname.startsWith("/voice-engine/ws/audio/")) {
        this.wss.handleUpgrade(req, socket, head, (ws) => {
          this.wss.emit("connection", ws, req);
        });
      }
    });
    this.wss.on("connection", (ws, req) => {
      this.handleConnection(ws, req);
    });
    this.wss.on("error", (err) => {
      console.error("[AudioWS] Server error:", err);
    });
    console.log("[AudioWS] WebSocket audio server started");
  }
  /**
   * Register an AudioSession to receive audio
   */
  registerSession(session) {
    this.sessions.set(session.id, session);
    console.log(`[AudioWS] Session registered: ${session.id}`);
  }
  /**
   * Unregister an AudioSession
   */
  unregisterSession(sessionId) {
    this.sessions.delete(sessionId);
    this.answeredCalls.delete(sessionId);
    console.log(`[AudioWS] Session unregistered: ${sessionId}`);
  }
  /**
   * Get active session count
   */
  getActiveSessionCount() {
    return this.sessions.size;
  }
  /**
   * Initialize persistent FreeSWITCH ESL connections for event monitoring and commands
   */
  async initializeEslConnections(wsUrl) {
    await this.closeEslConnections();
    try {
      const nodesResult = await db.execute(sql18`
        SELECT * FROM ve_freeswitch_nodes WHERE status = 'online'
      `);
      for (const node of camelizeKeys(nodesResult.rows)) {
        const eslHost = node.eslHost;
        const eslPort = node.eslPort;
        const eslPassword = node.eslPassword || "ClueCon";
        try {
          const esl = new EslConnection({
            host: eslHost,
            port: eslPort,
            password: eslPassword,
            reconnect: true
          });
          esl.on("error", (err) => {
            console.error(`[AudioWS] ESL Connection error for node ${node.name || eslHost}:`, err.message);
          });
          esl.on("event:CUSTOM", async (evt) => {
            const eventSubclass = evt.eventSubclass || evt.headers["Event-Subclass"];
            if (eventSubclass === "mod_audio_fork::play_audio") {
              try {
                const bodyStr = evt.body;
                if (!bodyStr) return;
                const payload = JSON.parse(bodyStr);
                const file = payload.file;
                const channelUuid = evt.headers["Unique-ID"];
                if (file && channelUuid) {
                  await esl.api(`uuid_broadcast ${channelUuid} ${file} aleg`);
                }
              } catch (err) {
                console.error(`[AudioWS] Error handling play_audio event:`, err.message);
              }
            }
          });
          esl.on("event:CHANNEL_ANSWER", async (evt) => {
            try {
              const channelUuid = evt.headers["Unique-ID"] || evt.headers["Channel-Call-UUID"];
              if (channelUuid) {
                const session = this.sessions.get(channelUuid);
                if (session) {
                  console.log(`[AudioWS] CHANNEL_ANSWER event received for session ${channelUuid}. Calling markCallAnswered.`);
                  await session.markCallAnswered();
                } else {
                  console.log(`[AudioWS] CHANNEL_ANSWER event received before WebSocket connection. Pre-registering answer for uuid: ${channelUuid}`);
                  this.answeredCalls.add(channelUuid);
                }
              }
            } catch (err) {
              console.error(`[AudioWS] Error handling CHANNEL_ANSWER event:`, err.message);
            }
          });
          esl.on("event:CHANNEL_HANGUP", async (evt) => {
            try {
              const channelUuid = evt.headers["Unique-ID"] || evt.headers["Channel-Call-UUID"];
              if (!channelUuid) return;
              const hangupCause = evt.headers["Hangup-Cause"] || "";
              console.log(`[AudioWS] CHANNEL_HANGUP event received: uuid=${channelUuid}, cause=${hangupCause}, duration=${evt.headers["variable_duration"]}, billsec=${evt.headers["variable_billsec"]}`);
              const unansweredCauses = [
                "NO_ANSWER",
                "USER_BUSY",
                "NO_ROUTE_DESTINATION",
                "CALL_REJECTED",
                "NUMBER_CHANGED",
                "SUBSCRIBER_ABSENT",
                "UNALLOCATED_NUMBER",
                "NORMAL_UNSPECIFIED",
                "RECOVERY_ON_TIMER_EXPIRE"
              ];
              const isUnanswered = unansweredCauses.includes(hangupCause);
              const session = this.sessions.get(channelUuid);
              if (session) {
                if (isUnanswered) {
                  console.log(`[AudioWS] CHANNEL_HANGUP (${hangupCause}) \u2014 call never answered for ${channelUuid}. Marking as failed.`);
                  try {
                    await db.execute(sql18`
                      UPDATE ve_sessions
                      SET status = 'failed',
                          end_reason = ${hangupCause.toLowerCase()},
                          ended_at = NOW(),
                          updated_at = NOW()
                      WHERE id = ${channelUuid}
                    `);
                  } catch (dbErr) {
                    console.error(`[AudioWS] Failed to update unanswered session status:`, dbErr.message);
                  }
                  session.destroyed = true;
                  session.removeAllListeners();
                  this.unregisterSession(channelUuid);
                } else {
                  console.log(`[AudioWS] CHANNEL_HANGUP (${hangupCause}) for session ${channelUuid}. Ending session.`);
                  await session.end("hangup");
                  this.unregisterSession(channelUuid);
                }
              } else {
                if (isUnanswered) {
                  console.log(`[AudioWS] CHANNEL_HANGUP (${hangupCause}) \u2014 no session in memory for ${channelUuid}, updating DB status.`);
                  try {
                    await db.execute(sql18`
                      UPDATE ve_sessions
                      SET status = 'failed',
                          end_reason = ${hangupCause.toLowerCase()},
                          ended_at = NOW(),
                          updated_at = NOW()
                      WHERE id = ${channelUuid} AND status IN ('initializing', 'active')
                    `);
                  } catch (dbErr) {
                    console.error(`[AudioWS] Failed to update orphaned session status:`, dbErr.message);
                  }
                } else {
                  try {
                    const sessionResult = await db.execute(sql18`
                      SELECT * FROM ve_sessions WHERE id = ${channelUuid} LIMIT 1
                    `);
                    const sessionData = sessionResult.rows?.[0];
                    if (sessionData && sessionData.status === "completed" && sessionData.end_reason === "transferred") {
                      const oldDuration = sessionData.duration_seconds || 0;
                      const startedAt = sessionData.started_at ? new Date(sessionData.started_at).getTime() : null;
                      const totalDuration = startedAt ? Math.floor((Date.now() - startedAt) / 1e3) : 0;
                      console.log(`[AudioWS] final CHANNEL_HANGUP for transferred session ${channelUuid}. oldDuration=${oldDuration}s, wallClock=${totalDuration}s`);
                      if (totalDuration > oldDuration) {
                        const oldMinutes = Math.ceil(oldDuration / 60);
                        const newMinutes = Math.ceil(totalDuration / 60);
                        const additionalMinutes = newMinutes - oldMinutes;
                        let newCreditsUsed = sessionData.credits_used || 0;
                        if (additionalMinutes > 0) {
                          const creditPriceResult = await db.execute(sql18`
                            SELECT value FROM global_settings WHERE key = 'credit_price_per_minute' LIMIT 1
                          `);
                          const creditPriceSetting = creditPriceResult.rows?.[0];
                          let creditPricePerMinute = 1;
                          if (creditPriceSetting?.value) {
                            const parsed = Number(creditPriceSetting.value);
                            if (Number.isFinite(parsed) && parsed >= 0) {
                              creditPricePerMinute = parsed;
                            }
                          }
                          const creditsToDeduct = additionalMinutes * creditPricePerMinute;
                          const deductCallCredits = global.deductCallCredits;
                          if (deductCallCredits) {
                            const creditResult = await deductCallCredits({
                              userId: sessionData.user_id,
                              creditsToDeduct,
                              callId: `${channelUuid}-adjustment`,
                              fromNumber: sessionData.from_number || "Unknown",
                              toNumber: sessionData.to_number || "Unknown",
                              durationSeconds: totalDuration - oldDuration,
                              engine: "custom-voice-engine",
                              isByok: session?.isByok
                            });
                            if (creditResult.success || creditResult.alreadyDeducted) {
                              newCreditsUsed += creditsToDeduct;
                              console.log(`[AudioWS] Charged additional ${creditsToDeduct} credits for transferred session ${channelUuid}. Total duration: ${totalDuration}s, old: ${oldDuration}s`);
                            }
                          }
                        }
                        await db.execute(sql18`
                          UPDATE ve_sessions
                          SET duration_seconds = ${totalDuration},
                              credits_used = ${newCreditsUsed},
                              updated_at = NOW()
                          WHERE id = ${channelUuid}
                        `);
                      }
                    }
                  } catch (err) {
                    console.error(`[AudioWS] Failed to process final hangup billing for ${channelUuid}:`, err.message);
                  }
                }
              }
            } catch (err) {
              console.error(`[AudioWS] Error handling CHANNEL_HANGUP event:`, err.message);
            }
          });
          esl.on("esl:ready", () => {
            console.log(`[AudioWS] ESL connection ready for node ${node.name || eslHost}`);
          });
          esl.on("esl:end", () => {
            console.log(`[AudioWS] ESL connection ended for node ${node.name || eslHost}, will auto-reconnect`);
          });
          await esl.connect();
          await esl.api(`global_setvar ve_audio_ws_url ${wsUrl}`);
          this.eslConnections.push(esl);
          console.log(`[AudioWS] Established persistent ESL connection to FreeSWITCH node ${node.name || eslHost}`);
        } catch (nodeErr) {
          console.warn(`[AudioWS] Failed to connect to FreeSWITCH node ${node.name || eslHost}:`, nodeErr.message);
        }
      }
    } catch (err) {
      console.warn(`[AudioWS] Failed to query FreeSWITCH nodes on initialization:`, err.message);
    }
  }
  /**
   * Close all persistent ESL connections
   */
  async closeEslConnections() {
    for (const esl of this.eslConnections) {
      try {
        await esl.disconnect();
      } catch {
      }
    }
    this.eslConnections = [];
  }
  /**
   * Shutdown the WebSocket server
   */
  shutdown() {
    for (const client of this.wss.clients) {
      client.close(1001, "Server shutting down");
    }
    this.wss.close();
    this.sessions.clear();
    this.closeEslConnections().catch(() => {
    });
    console.log("[AudioWS] Server shut down");
  }
  // ── Private ────────────────────────────────────────────
  async handleConnection(ws, req) {
    try {
      const url = new URL(req.url || "", `http://${req.headers.host || "localhost"}`);
      const pathParts = url.pathname.split("/");
      const sessionId = pathParts[pathParts.length - 1];
      if (!sessionId) {
        console.warn("[AudioWS] Connection without session ID");
        ws.close(4e3, "Missing session ID");
        return;
      }
      const isWidgetClient = url.searchParams.get("client") === "widget";
      console.log(`[AudioWS] Incoming connection for sessionId: ${sessionId} (widget: ${isWidgetClient})`);
      let session = this.sessions.get(sessionId);
      if (!session) {
        console.log(`[AudioWS] Session not found in cache. Querying DB/FreeSWITCH for ${sessionId}...`);
        session = await this.resolveSessionDynamically(sessionId);
      }
      if (!session) {
        console.warn(`[AudioWS] No session found/resolved: ${sessionId}`);
        ws.close(4001, "Session not found");
        return;
      }
      console.log(`[AudioWS] Client connected for session: ${sessionId}`);
      let audioPlayCount = 0;
      session.onAudioOut(async (audio) => {
        try {
          if (isWidgetClient) {
            if (ws.readyState === WebSocket4.OPEN) {
              ws.send(audio);
            }
            return;
          }
          audioPlayCount++;
          const samplesCount = audio.length / 2;
          const wavHeader = Buffer.alloc(44);
          const sampleRate = 8e3;
          const numChannels = 1;
          const bitsPerSample = 16;
          const blockAlign = numChannels * (bitsPerSample / 8);
          const byteRate = sampleRate * blockAlign;
          const dataSize = samplesCount * blockAlign;
          wavHeader.write("RIFF", 0);
          wavHeader.writeUInt32LE(36 + dataSize, 4);
          wavHeader.write("WAVE", 8);
          wavHeader.write("fmt ", 12);
          wavHeader.writeUInt32LE(16, 16);
          wavHeader.writeUInt16LE(1, 20);
          wavHeader.writeUInt16LE(numChannels, 22);
          wavHeader.writeUInt32LE(sampleRate, 24);
          wavHeader.writeUInt32LE(byteRate, 28);
          wavHeader.writeUInt16LE(blockAlign, 32);
          wavHeader.writeUInt16LE(bitsPerSample, 34);
          wavHeader.write("data", 36);
          wavHeader.writeUInt32LE(dataSize, 40);
          const wavBuffer = Buffer.concat([wavHeader, audio]);
          const filePath = path3.join(os2.tmpdir(), `${sessionId}_tts_${Date.now()}_${audioPlayCount}.wav`);
          await fs3.promises.writeFile(filePath, wavBuffer);
          console.log(`[AudioWS] Wrote TTS audio to ${filePath} (${wavBuffer.length} bytes), playing via ESL uuid_broadcast...`);
          for (const esl of this.eslConnections) {
            try {
              if (esl.isConnected()) {
                const targetUuid = session.channelUuid || sessionId;
                await esl.api(`uuid_broadcast ${targetUuid} ${filePath}`);
              }
            } catch (err) {
              console.error(`[AudioWS] Failed to send uuid_broadcast:`, err.message);
            }
          }
        } catch (err) {
          console.error(`[AudioWS] Error in onAudioOut playback handler:`, err.message);
        }
      });
      session.onControlOut((msg) => {
        try {
          if (ws.readyState === WebSocket4.OPEN) {
            ws.send(JSON.stringify(msg));
          }
        } catch (err) {
          console.error(`[AudioWS] Failed to send control message:`, err.message);
        }
      });
      session.on("pipelineEvent", async (event) => {
        if (event.type === "interruption") {
          console.log(`[AudioWS] Interruption detected, breaking playback for session ${sessionId}`);
          if (isWidgetClient) {
            try {
              if (ws.readyState === WebSocket4.OPEN) {
                ws.send(JSON.stringify({ type: "interruption" }));
              }
            } catch (err) {
              console.error(`[AudioWS] Failed to send interruption to widget client:`, err.message);
            }
            return;
          }
          for (const esl of this.eslConnections) {
            try {
              if (esl.isConnected()) {
                const targetUuid = session.channelUuid || sessionId;
                await esl.api(`uuid_break ${targetUuid} all`);
              }
            } catch (err) {
              console.error(`[AudioWS] Failed to send uuid_break:`, err.message);
            }
          }
          if (session.isStreamingPlayback) {
            try {
              if (ws.readyState === WebSocket4.OPEN) {
                ws.send(JSON.stringify({ type: "killAudio" }));
              }
            } catch (err) {
              console.error(`[AudioWS] Failed to send killAudio:`, err.message);
            }
          }
        }
      });
      session.once("transfer", async (targetNumber) => {
        session.isTransferred = true;
        console.log(`[AudioWS] Session ${sessionId} initiating transfer to ${targetNumber}`);
        if (isWidgetClient) {
          try {
            if (ws.readyState === WebSocket4.OPEN) {
              ws.send(JSON.stringify({ type: "transfer", targetNumber }));
              ws.close(1e3, "Call transferred");
            }
          } catch (err) {
            console.error(`[AudioWS] Failed to send transfer to widget client:`, err.message);
          }
          this.unregisterSession(sessionId);
          return;
        }
        let activeGateway = null;
        try {
          const userId = session.userId;
          if (userId) {
            const userGatewayResult = await db.execute(sql18`
              SELECT name, proxy, username, password FROM user_sip_gateways WHERE user_id = ${userId} AND is_active = true LIMIT 1
            `);
            activeGateway = userGatewayResult.rows[0];
          }
        } catch (err) {
          console.error(`[AudioWS] Failed to fetch active gateway for transfer:`, err.message);
        }
        const gatewayProxy = activeGateway?.proxy || "testhr.pstn.twilio.com";
        const isTwilio = !activeGateway || gatewayProxy.includes("twilio.com");
        let formattedTo = !targetNumber.startsWith("+") && !targetNumber.startsWith("sip:") ? `+${targetNumber}` : targetNumber;
        if (!isTwilio && formattedTo.startsWith("+")) {
          formattedTo = formattedTo.substring(1);
        }
        const targetUuid = session.channelUuid || sessionId;
        const sessDetails = session.getSession();
        const callerId = sessDetails.toNumber || sessDetails.fromNumber || "";
        let cleanCallerId = !callerId.startsWith("+") && callerId ? `+${callerId}` : callerId;
        if (!isTwilio && cleanCallerId.startsWith("+")) {
          cleanCallerId = cleanCallerId.substring(1);
        }
        let dialString = "";
        if (formattedTo.startsWith("sip:")) {
          dialString = formattedTo;
        } else {
          dialString = `sofia/external/${formattedTo}@${gatewayProxy}`;
        }
        console.log(`[AudioWS] Transferring channel ${targetUuid} to ${dialString}`);
        for (const esl of this.eslConnections) {
          try {
            if (esl.isConnected()) {
              if (cleanCallerId) {
                await esl.api(`uuid_setvar ${targetUuid} origination_caller_id_number ${cleanCallerId}`);
                await esl.api(`uuid_setvar ${targetUuid} origination_caller_id_name ${cleanCallerId}`);
                await esl.api(`uuid_setvar ${targetUuid} effective_caller_id_number ${cleanCallerId}`);
                await esl.api(`uuid_setvar ${targetUuid} effective_caller_id_name ${cleanCallerId}`);
                await esl.api(`uuid_setvar ${targetUuid} sip_from_uri sip:${cleanCallerId}@${gatewayProxy}`);
                await esl.api(`uuid_setvar ${targetUuid} sip_invite_req_uri sip:${formattedTo}@${gatewayProxy}`);
                let exportList = "origination_caller_id_number,origination_caller_id_name,effective_caller_id_number,effective_caller_id_name,sip_from_uri,sip_invite_req_uri";
                if (activeGateway?.username && activeGateway?.password) {
                  await esl.api(`uuid_setvar ${targetUuid} sip_auth_username ${activeGateway.username}`);
                  await esl.api(`uuid_setvar ${targetUuid} sip_auth_password ${activeGateway.password}`);
                  exportList += ",sip_auth_username,sip_auth_password";
                }
                await esl.api(`uuid_setvar ${targetUuid} export_vars ${exportList}`);
              }
              await esl.api(`uuid_transfer ${targetUuid} 'bridge:${dialString}' inline`);
            }
          } catch (err) {
            console.error(`[AudioWS] Failed to transfer call for session ${sessionId}:`, err.message);
          }
        }
        try {
          await db.execute(sql18`
            UPDATE ve_sessions
            SET end_reason = 'transferred',
                updated_at = NOW()
            WHERE id = ${sessionId}
          `);
          console.log(`[AudioWS] Marked session ${sessionId} as transferred in DB`);
        } catch (err) {
          console.error(`[AudioWS] Failed to mark session as transferred:`, err.message);
        }
        if (ws.readyState === WebSocket4.OPEN) {
          ws.close(1e3, "Call transferred");
        }
        this.unregisterSession(sessionId);
      });
      session.on("play_audio", async (audioUrl) => {
        console.log(`[AudioWS] Session ${sessionId} playing audio: ${audioUrl}`);
        if (isWidgetClient) {
          try {
            if (ws.readyState === WebSocket4.OPEN) {
              ws.send(JSON.stringify({ type: "play_audio", url: audioUrl }));
            }
          } catch (err) {
            console.error(`[AudioWS] Failed to send play_audio to widget client:`, err.message);
          }
          return;
        }
        const targetUuid = session.channelUuid || sessionId;
        for (const esl of this.eslConnections) {
          try {
            if (esl.isConnected()) {
              await esl.api(`uuid_broadcast ${targetUuid} ${audioUrl}`);
            }
          } catch (err) {
            console.error(`[AudioWS] Failed to play audio for session ${sessionId}:`, err.message);
          }
        }
      });
      session.once("hangup", async (reason) => {
        if (session.isTransferred) {
          console.log(`[AudioWS] Session ${sessionId} was transferred. Skipping ESL uuid_kill.`);
          this.unregisterSession(sessionId);
          return;
        }
        console.log(`[AudioWS] Session ${sessionId} ended (reason: ${reason}), issuing ESL uuid_kill`);
        if (isWidgetClient) {
          try {
            if (ws.readyState === WebSocket4.OPEN) {
              ws.send(JSON.stringify({ type: "hangup", reason }));
              ws.close(1e3, reason);
            }
          } catch (err) {
            console.error(`[AudioWS] Failed to send hangup to widget client:`, err.message);
          }
          this.unregisterSession(sessionId);
          return;
        }
        for (const esl of this.eslConnections) {
          try {
            if (esl.isConnected()) {
              const targetUuid = session.channelUuid || sessionId;
              await esl.api(`uuid_kill ${targetUuid} NORMAL_CLEARING`);
            }
          } catch (err) {
            console.error(`[AudioWS] Failed to send uuid_kill for ${sessionId}:`, err.message);
          }
        }
        if (ws.readyState === WebSocket4.OPEN) {
          ws.close(1e3, "Session ended");
        }
        this.unregisterSession(sessionId);
      });
      ws.on("message", (data, isBinary) => {
        if (isBinary || data instanceof Buffer) {
          const buf = data instanceof Buffer ? data : Buffer.from(data);
          session.processAudio(buf);
        } else if (data instanceof ArrayBuffer) {
          session.processAudio(Buffer.from(data));
        } else {
          try {
            const msg = JSON.parse(data.toString());
            const msgType = msg.type || msg.event;
            if (msgType === "stop" || msgType === "clear") {
              console.log(`[AudioWS] mod_audio_fork ${msgType} event for session ${sessionId}`);
            } else if (msgType === "start") {
              console.log(`[AudioWS] mod_audio_fork start event for session ${sessionId}`);
              if (msg.uuid) {
                session.channelUuid = msg.uuid;
              }
              session.markCallAnswered().catch((err) => {
                console.error(`[AudioWS] Error marking call answered on start event:`, err.message);
              });
            } else {
              console.log(`[AudioWS] mod_audio_fork JSON message type="${msgType}" for ${sessionId}`);
            }
          } catch {
          }
        }
      });
      ws.on("close", (code, reason) => {
        console.log(`[AudioWS] Client disconnected: ${sessionId} (${code})`);
        session.end("websocket_closed").catch(() => {
        });
        this.unregisterSession(sessionId);
      });
      ws.on("error", (err) => {
        console.error(`[AudioWS] Client error for ${sessionId}:`, err.message);
      });
      if (!session.isInitialized()) {
        console.log(`[AudioWS] Initializing pipeline for session: ${sessionId}`);
        await session.initialize();
        if (session.direction === "inbound") {
          console.log(`[AudioWS] Inbound call, triggering greeting for session ${sessionId}.`);
          await session.markCallAnswered();
        } else {
          if (this.answeredCalls.has(sessionId)) {
            this.answeredCalls.delete(sessionId);
            console.log(`[AudioWS] Outbound call already answered (pre-registered). Triggering greeting for session ${sessionId}.`);
            await session.markCallAnswered();
          } else {
            console.log(`[AudioWS] Outbound call, waiting for CHANNEL_ANSWER for session ${sessionId}.`);
          }
        }
      }
    } catch (err) {
      console.error(`[AudioWS] Error handling connection for ${req.url}:`, err.message);
      ws.close(1011, "Internal Server Error");
    }
  }
  async resolveSessionDynamically(sessionId) {
    try {
      const sessionResult = await db.execute(sql18`
        SELECT * FROM ve_sessions WHERE id = ${sessionId} LIMIT 1
      `);
      let sessionData = null;
      let isNewSession = false;
      let fromNumber = "";
      let toNumber = "";
      if (sessionResult.rows.length > 0) {
        sessionData = camelizeKeys(sessionResult.rows[0]);
        console.log(`[AudioWS] Found pre-registered session for ID: ${sessionId}`);
      } else {
        console.log(`[AudioWS] Inbound call detected. Querying FreeSWITCH for channel ${sessionId}...`);
        const nodesResult = await db.execute(sql18`
          SELECT * FROM ve_freeswitch_nodes WHERE status = 'online' ORDER BY created_at ASC
        `);
        const nodes = camelizeKeys(nodesResult.rows);
        let fsVars = null;
        if (nodes.length > 0) {
          for (const node of nodes) {
            fsVars = await this.getChannelVariablesFromNode(node, sessionId);
            if (fsVars) break;
          }
        } else {
          const defaultNode = {
            eslHost: process.env.FREESWITCH_ESL_HOST || "127.0.0.1",
            eslPort: parseInt(process.env.FREESWITCH_ESL_PORT || "8021"),
            eslPassword: process.env.FREESWITCH_ESL_PASSWORD || "ClueCon"
          };
          fsVars = await this.getChannelVariablesFromNode(defaultNode, sessionId);
        }
        if (!fsVars) {
          console.warn(`[AudioWS] Could not retrieve channel variables from FreeSWITCH for ${sessionId}`);
          return null;
        }
        fromNumber = fsVars.callerIdNumber || "";
        toNumber = fsVars.destinationNumber || "";
        isNewSession = true;
      }
      let agentResult = null;
      let targetAgentId = null;
      if (sessionData) {
        if (sessionData.agentId) {
          targetAgentId = sessionData.agentId;
        } else if (sessionData.metadata) {
          try {
            const meta = typeof sessionData.metadata === "string" ? JSON.parse(sessionData.metadata) : sessionData.metadata;
            targetAgentId = meta?.agentId || null;
          } catch {
          }
        }
      }
      if (!targetAgentId && toNumber) {
        const cleanToNumber = toNumber.startsWith("+") ? toNumber.substring(1) : toNumber;
        const plusToNumber = toNumber.startsWith("+") ? toNumber : "+" + toNumber;
        let connResult = await db.execute(sql18`
          SELECT agent_id FROM incoming_connections ic
          JOIN phone_numbers pn ON ic.phone_number_id = pn.id
          WHERE pn.phone_number = ${toNumber} OR pn.phone_number = ${cleanToNumber} OR pn.phone_number = ${plusToNumber} LIMIT 1
        `);
        if (connResult.rows.length > 0) {
          targetAgentId = connResult.rows[0].agent_id;
          console.log(`[AudioWS] Found incoming connection mapping for ${toNumber} -> agentId: ${targetAgentId}`);
        } else {
          connResult = await db.execute(sql18`
            SELECT assigned_agent_id as agent_id FROM plivo_phone_numbers
            WHERE phone_number = ${toNumber} OR phone_number = ${cleanToNumber} OR phone_number = ${plusToNumber} LIMIT 1
          `);
          if (connResult.rows.length > 0 && connResult.rows[0].agent_id) {
            targetAgentId = connResult.rows[0].agent_id;
            console.log(`[AudioWS] Found Plivo incoming connection mapping for ${toNumber} -> agentId: ${targetAgentId}`);
          }
        }
        if (!targetAgentId) {
          connResult = await db.execute(sql18`
            SELECT agent_id FROM user_sip_phone_numbers
            WHERE phone_number = ${toNumber} OR phone_number = ${cleanToNumber} OR phone_number = ${plusToNumber} LIMIT 1
          `);
          if (connResult.rows.length > 0 && connResult.rows[0].agent_id) {
            targetAgentId = connResult.rows[0].agent_id;
            console.log(`[AudioWS] Found User SIP incoming connection mapping for ${toNumber} -> agentId: ${targetAgentId}`);
          }
        }
        if (!targetAgentId) {
          connResult = await db.execute(sql18`
            SELECT agent_id FROM sip_phone_numbers
            WHERE phone_number = ${toNumber} OR phone_number = ${cleanToNumber} OR phone_number = ${plusToNumber} LIMIT 1
          `);
          if (connResult.rows.length > 0 && connResult.rows[0].agent_id) {
            targetAgentId = connResult.rows[0].agent_id;
            console.log(`[AudioWS] Found SIP Phone Number incoming connection mapping for ${toNumber} -> agentId: ${targetAgentId}`);
          }
        }
      }
      if (targetAgentId) {
        agentResult = await db.execute(sql18`
          SELECT * FROM ve_voice_agents WHERE id = ${targetAgentId} LIMIT 1
        `);
        if (agentResult.rows.length === 0) {
          agentResult = await db.execute(sql18`
            SELECT * FROM agents WHERE id = ${targetAgentId} LIMIT 1
          `);
        }
      } else {
        if (toNumber) {
          agentResult = await db.execute(sql18`
            SELECT * FROM ve_voice_agents 
            WHERE is_active = true AND (name = ${toNumber} OR description LIKE ${"%" + toNumber + "%"})
            LIMIT 1
          `);
          if (agentResult.rows.length === 0) {
            agentResult = await db.execute(sql18`
              SELECT * FROM agents 
              WHERE is_active = true AND telephony_provider = 'custom-voice-engine' AND name = ${toNumber}
              LIMIT 1
            `);
          }
        }
        if (!agentResult || agentResult.rows.length === 0) {
          if (isNewSession) {
            console.warn(`[AudioWS] Rejecting inbound call: no agent mapped or matched for destination number ${toNumber || "unknown"}`);
            for (const esl of this.eslConnections) {
              try {
                if (esl.isConnected()) {
                  await esl.api(`uuid_kill ${sessionId} CALL_REJECTED`);
                }
              } catch (err) {
                console.error(`[AudioWS] Failed to send uuid_kill for unmapped call ${sessionId}:`, err.message);
              }
            }
            return null;
          }
          agentResult = await db.execute(sql18`
            SELECT * FROM ve_voice_agents WHERE is_active = true ORDER BY created_at ASC LIMIT 1
          `);
          if (agentResult.rows.length === 0) {
            agentResult = await db.execute(sql18`
              SELECT * FROM agents WHERE is_active = true AND telephony_provider = 'custom-voice-engine' ORDER BY created_at ASC LIMIT 1
            `);
          }
        }
      }
      if (!agentResult || agentResult.rows.length === 0) {
        console.error(`[AudioWS] No voice agent found for call ${sessionId}`);
        return null;
      }
      const agent = camelizeKeys(agentResult.rows[0]);
      if (sessionData?.metadata) {
        try {
          const meta = typeof sessionData.metadata === "string" ? JSON.parse(sessionData.metadata) : sessionData.metadata;
          if (meta?.language) agent.language = meta.language;
          if (meta?.ttsVoice) agent.ttsVoice = meta.ttsVoice;
          if (meta?.llmModel) agent.llmModel = meta.llmModel;
          if (meta?.sttProvider) agent.sttProvider = meta.sttProvider;
          if (meta?.ttsProvider) agent.ttsProvider = meta.ttsProvider;
          if (meta?.sttModel) agent.sttModel = meta.sttModel;
          if (meta?.ttsModel) agent.ttsModel = meta.ttsModel;
          if (meta?.isPublicDemo) {
            agent.firstMessage = "Welcome to the AgentLab call test! I can tell you about this project, talk about accounting, or explain our tools and active plugins. This project was made by the Diploy team.";
            agent.systemPrompt = "You are the official AgentLab AI Assistant, built by the Diploy team (main website: https://diploy.in/, project: https://agentlabs.diploy.in). You are demonstrating the platform's capabilities to a tester. Keep answers brief (1-3 sentences) and conversational. Do not use markdown. If asked, explain any of these features:\n1. Custom Voice Engine: Powered by FreeSWITCH for real-time voice streaming. Supports Deepgram and Sarvam for STT and TTS, and OpenRouter for LLM. Features customer memory, semantic caching, and call recording.\n2. Messaging Plugin: Sends emails via SMTP and WhatsApp messages via WhatsWay API or Meta Cloud API during or after calls.\n3. SIP Engine Plugin: Supports ElevenLabs SIP with 13 providers and OpenAI SIP for incoming calls, allowing users to use their own SIP trunks.\n4. REST API Plugin: Provides rate-limited API access, API keys, audit logging, and webhook event integration.\n5. Team Management Plugin: Supports role-based access control, separate logins, and custom CRUD permissions for team members.\n6. Platform Tools: Includes Forms for collecting data, Appointments for managing bookings, Website Widget for chat, Quick CRM with a Kanban board, and Google Sheets integration to push data in real time.\n7. Accounting: Real-time credit-based billing system for call duration.";
          }
        } catch {
        }
      }
      if (agent.firstMessage && fromNumber) {
        const spacedDigits = (fromNumber.startsWith("+") ? "plus " : "") + fromNumber.replace(/\+/g, "").split("").join(" ");
        agent.firstMessage = agent.firstMessage.replace(/\{\{(phone|phone_number)\}\}/gi, spacedDigits);
      }
      let flow = null;
      const flowExecResult = await db.execute(sql18`
        SELECT * FROM flow_executions WHERE call_id = ${sessionId} AND status = 'running' LIMIT 1
      `);
      if (flowExecResult.rows.length > 0) {
        const flowExec = camelizeKeys(flowExecResult.rows[0]);
        const flowResult = await db.execute(sql18`
          SELECT * FROM flows WHERE id = ${flowExec.flowId} LIMIT 1
        `);
        if (flowResult.rows.length > 0) {
          flow = camelizeKeys(flowResult.rows[0]);
          console.log(`[AudioWS] Found active flow execution for call ${sessionId} -> flowId: ${flow.id}`);
          if (flow.compiledSystemPrompt) {
            agent.systemPrompt = flow.compiledSystemPrompt;
            console.log(`[AudioWS] Loaded compiled system prompt from flow: "${flow.compiledSystemPrompt.substring(0, 100)}..."`);
          }
          if (flow.compiledFirstMessage) {
            agent.firstMessage = flow.compiledFirstMessage;
          }
          agent.type = "flow";
          agent.flowId = flow.id;
        }
      }
      if (!flow) {
        if (agent.type === "flow" && agent.flowId) {
          console.log(`[AudioWS] Agent is flow-based, loading flow ${agent.flowId}`);
          const flowResult = await db.execute(sql18`
            SELECT * FROM flows WHERE id = ${agent.flowId} LIMIT 1
          `);
          if (flowResult.rows.length > 0) {
            flow = camelizeKeys(flowResult.rows[0]);
            if (flow.compiledSystemPrompt) {
              agent.systemPrompt = flow.compiledSystemPrompt;
              console.log(`[AudioWS] Loaded compiled system prompt from flow: "${flow.compiledSystemPrompt.substring(0, 100)}..."`);
            }
            if (flow.compiledFirstMessage) {
              agent.firstMessage = flow.compiledFirstMessage;
            }
          }
        } else {
          console.log(`[AudioWS] Agent ${agent.id} type is ${agent.type || "unknown"}, checking for active flow assigned to this agent`);
          const flowResult = await db.execute(sql18`
            SELECT * FROM flows WHERE agent_id = ${agent.id} AND is_active = true LIMIT 1
          `);
          if (flowResult.rows.length > 0) {
            flow = camelizeKeys(flowResult.rows[0]);
            console.log(`[AudioWS] Found active flow ${flow.id} pointing to agent ${agent.id}`);
            if (flow.compiledSystemPrompt) {
              agent.systemPrompt = flow.compiledSystemPrompt;
              console.log(`[AudioWS] Loaded compiled system prompt from flow: "${flow.compiledSystemPrompt.substring(0, 100)}..."`);
            }
            if (flow.compiledFirstMessage) {
              agent.firstMessage = flow.compiledFirstMessage;
            }
            agent.type = "flow";
            agent.flowId = flow.id;
          }
        }
      }
      if (agent.knowledgeBaseIds && agent.knowledgeBaseIds.length > 0) {
        agent.systemPrompt = `
\u26A0\uFE0F CRITICAL KNOWLEDGE BASE INSTRUCTION \u26A0\uFE0F
You have access to a knowledge base tool called "lookup_knowledge_base".
- When the user asks ANY question that might require information from the knowledge base, you MUST call the "lookup_knowledge_base" tool IMMEDIATELY.
- Do NOT say things like "I will search the knowledge base" or "Let me check" or "Let me look that up".
- Do NOT answer from memory if information could exist in the knowledge base.

${agent.systemPrompt || ""}`;
      }
      if (agent.endConversationEnabled) {
        agent.systemPrompt = `
\u26A0\uFE0F CRITICAL END CALL INSTRUCTION \u26A0\uFE0F
You have access to an "end_call" tool. 
- You MUST call this tool when the conversation naturally concludes, the user says goodbye, or requests to hang up.

${agent.systemPrompt || ""}`;
      }
      let tools2 = [];
      let toolMetadata = /* @__PURE__ */ new Map();
      if (flow?.compiledTools && Array.isArray(flow.compiledTools) && flow.compiledTools.length > 0) {
        console.log(`[AudioWS] Found ${flow.compiledTools.length} compiled tools in flow ${flow.id}`);
        for (const ct of flow.compiledTools) {
          if (ct.type === "function" && ct.function?.name) {
            const toolDef = {
              type: "function",
              function: {
                name: ct.function.name,
                description: ct.function.description || "",
                parameters: ct.function.parameters || {}
              }
            };
            tools2.push(toolDef);
            const meta = ct._metadata || ct.Metadata || ct._metadata;
            if (meta) {
              toolMetadata.set(ct.function.name, meta);
            }
          }
        }
        console.log(`[AudioWS] Built ${tools2.length} tool definitions for LLM`);
      }
      if (agent.knowledgeBaseIds && agent.knowledgeBaseIds.length > 0) {
        tools2.push({
          type: "function",
          function: {
            name: "lookup_knowledge_base",
            description: "Search the knowledge base for relevant information to answer user questions. Use this when you need facts, policies, product details, pricing, or any specific information.",
            parameters: {
              type: "object",
              properties: {
                query: { type: "string", description: "The specific search query to look up in the knowledge base." }
              },
              required: ["query"]
            }
          }
        });
        toolMetadata.set("lookup_knowledge_base", { knowledgeBaseIds: agent.knowledgeBaseIds });
        console.log(`[AudioWS] Added lookup_knowledge_base tool for ${agent.knowledgeBaseIds.length} KBs`);
      }
      if (agent.endConversationEnabled) {
        tools2.push({
          type: "function",
          function: {
            name: "end_call",
            description: "End the conversation when the user says goodbye or the interaction is complete.",
            parameters: { type: "object", properties: {} }
          }
        });
        console.log(`[AudioWS] Added end_call tool`);
      }
      if (agent.transferEnabled) {
        tools2.push({
          type: "function",
          function: {
            name: "transfer_call",
            description: 'Transfer the call to a human agent. IMPORTANT: Before calling this function, you MUST first say a brief transfer announcement like "Sure, let me transfer you to an agent now" or "One moment, I will connect you with a representative". After speaking this announcement, immediately call this function. You MUST call this function when: (1) the user explicitly asks to speak to a human, agent, or real person, (2) the user says "transfer", "connect me", or similar phrases, (3) you cannot help them with their request.',
            parameters: {
              type: "object",
              properties: {
                reason: {
                  type: "string",
                  description: "Brief reason for the transfer"
                }
              },
              required: ["reason"]
            }
          }
        });
        toolMetadata.set("transfer_call", { phoneNumber: agent.transferPhoneNumber });
        console.log(`[AudioWS] Added transfer_call tool pointing to ${agent.transferPhoneNumber}`);
      }
      if (agent.appointmentBookingEnabled) {
        const callerPhone = sessionData?.direction === "outbound" ? toNumber || sessionData?.toNumber || "" : fromNumber || sessionData?.fromNumber || "";
        tools2.push({
          type: "function",
          function: {
            name: "book_appointment",
            description: callerPhone ? `Book an appointment for the caller. The caller's phone number is ${callerPhone} - do NOT ask for their phone number unless they want to use a different one. For contactPhone, use "${callerPhone}" unless they explicitly provide a different number. Collect their name, preferred date and time before calling this tool.` : "Book an appointment for the caller. Collect their name, phone number, preferred date and time before calling this tool.",
            parameters: {
              type: "object",
              properties: {
                contactName: {
                  type: "string",
                  description: "The name of the person booking the appointment"
                },
                contactPhone: {
                  type: "string",
                  description: callerPhone ? `The caller's phone number. Default to "${callerPhone}" (the number they are calling from). Only use a different number if the caller explicitly provides one.` : "Phone number exactly as spoken. Accept any format."
                },
                contactEmail: {
                  type: "string",
                  description: "Optional email address"
                },
                appointmentDate: {
                  type: "string",
                  description: "Appointment date in YYYY-MM-DD format"
                },
                appointmentTime: {
                  type: "string",
                  description: "Appointment time in HH:MM format (24-hour)"
                },
                duration: {
                  type: "number",
                  description: "Duration in minutes (default 30)"
                },
                serviceName: {
                  type: "string",
                  description: "Name of the service being booked"
                },
                notes: {
                  type: "string",
                  description: "Additional notes or requirements"
                }
              },
              required: ["contactName", "contactPhone", "appointmentDate", "appointmentTime"]
            }
          }
        });
        console.log(`[AudioWS] Added book_appointment tool`);
      }
      if (agent.messagingEmailEnabled) {
        const agentIdSuffix = agent.id.slice(-8);
        const emailToolName = `send_email_${agentIdSuffix}`;
        let templateInstruction = "Use the template name configured by the user.";
        if (agent.messagingEmailTemplate) {
          templateInstruction = `You MUST use the template named "${agent.messagingEmailTemplate}".`;
        }
        tools2.push({
          type: "function",
          function: {
            name: emailToolName,
            description: `Send an email to the caller. You MUST ask for their email address and CONFIRM it with them first (e.g., "Just to confirm, is your email address...") before invoking this tool. Do NOT invoke this tool until the caller has explicitly confirmed that the email address is correct. ${templateInstruction} Fill in any dynamic variables like contact_name with information collected during the conversation.`,
            parameters: {
              type: "object",
              properties: {
                recipient_email: {
                  type: "string",
                  description: "The email address to send the email to. You must ask the caller for this."
                },
                template_name: {
                  type: "string",
                  description: agent.messagingEmailTemplate ? `The email template to use. ALWAYS use "${agent.messagingEmailTemplate}".` : "The name of the email template to use."
                },
                dynamic_variables: {
                  type: "object",
                  description: "Key-value pairs for template variable substitution (e.g., contact_name, appointment_date)"
                }
              },
              required: ["recipient_email", "template_name"]
            }
          }
        });
        toolMetadata.set(emailToolName, { templateName: agent.messagingEmailTemplate });
        console.log(`[AudioWS] Added send_email tool: ${emailToolName}`);
      }
      if (agent.messagingWhatsappEnabled) {
        const agentIdSuffix = agent.id.slice(-8);
        const whatsappToolName = `send_whatsapp_${agentIdSuffix}`;
        let templateInstruction = "Use the template name configured by the user.";
        if (agent.messagingWhatsappTemplate) {
          templateInstruction = `You MUST use the template named "${agent.messagingWhatsappTemplate}".`;
        }
        tools2.push({
          type: "function",
          function: {
            name: whatsappToolName,
            description: `Send a WhatsApp message to the caller. You MUST confirm their phone number first before using this tool. ${templateInstruction}`,
            parameters: {
              type: "object",
              properties: {
                phone_number: {
                  type: "string",
                  description: "The phone number to send the WhatsApp message to. Defaults to the caller's phone number."
                },
                template_name: {
                  type: "string",
                  description: agent.messagingWhatsappTemplate ? `The WhatsApp template to use. ALWAYS use "${agent.messagingWhatsappTemplate}".` : "The name of the WhatsApp template to use."
                },
                template_variables: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      position: { type: "number" },
                      value: { type: "string" }
                    },
                    required: ["position", "value"]
                  },
                  description: "Positional variables for template substitution."
                }
              },
              required: ["template_name"]
            }
          }
        });
        toolMetadata.set(whatsappToolName, {
          templateName: agent.messagingWhatsappTemplate,
          templateVariables: agent.messagingWhatsappVariables
        });
        console.log(`[AudioWS] Added send_whatsapp tool: ${whatsappToolName}`);
      }
      const userId = agent.userId;
      if (isNewSession) {
        const checkAgentInVe = await db.execute(sql18`
          SELECT id FROM ve_voice_agents WHERE id = ${agent.id} LIMIT 1
        `);
        const isVeAgent = checkAgentInVe.rows.length > 0;
        const dbAgentId = isVeAgent ? agent.id : null;
        const metadata = !isVeAgent ? { agentId: agent.id } : null;
        const insertResult = await db.execute(sql18`
          INSERT INTO ve_sessions (
            id, user_id, agent_id, from_number, to_number, direction, status, channel_uuid, metadata
          ) VALUES (
            ${sessionId}, ${userId}, ${dbAgentId}, ${fromNumber || null}, ${toNumber || null}, 'inbound', 'initializing', ${sessionId}, ${metadata ? JSON.stringify(metadata) : null}
          ) RETURNING *
        `);
        sessionData = camelizeKeys(insertResult.rows[0]);
        console.log(`[AudioWS] Created new inbound session in DB for channel ${sessionId}`);
      }
      let apptSettingsText = "";
      try {
        const apptSettingsResult = await db.execute(sql18`
          SELECT * FROM appointment_settings WHERE user_id = ${userId} LIMIT 1
        `);
        const apptSettings = apptSettingsResult.rows?.[0];
        if (apptSettings) {
          let workingDays = [];
          let workingHoursStart = "09:00";
          let workingHoursEnd = "17:00";
          if (apptSettings.working_hours) {
            const wh = typeof apptSettings.working_hours === "string" ? JSON.parse(apptSettings.working_hours) : apptSettings.working_hours;
            workingDays = Object.keys(wh).filter((day) => wh[day]?.enabled);
            for (const day of ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]) {
              if (wh[day]?.enabled) {
                workingHoursStart = wh[day].start || workingHoursStart;
                workingHoursEnd = wh[day].end || workingHoursEnd;
                break;
              }
            }
          }
          apptSettingsText = `
**Appointment Booking Availability & Settings:**
- Working Days (available for appointments): ${workingDays.length > 0 ? workingDays.join(", ") : "None"}
- Working Hours: ${workingHoursStart} to ${workingHoursEnd}
- Slot Buffer Time: ${apptSettings.buffer_minutes || 0} minutes
- Allow Overlapping Appointments: ${apptSettings.allow_overlapping ? "Yes" : "No"}
`;
        }
      } catch (apptErr) {
        console.warn(`[AudioWS] Failed to fetch appointment settings for user ${userId}:`, apptErr.message);
      }
      const globalSettingsResult = await db.execute(sql18`
        SELECT key, value FROM global_settings WHERE key IN (
          've_stt_active_provider', 've_llm_active_provider', 've_tts_active_provider',
          've_deepgram_api_key', 've_sarvam_api_key', 've_openrouter_api_key', 've_gemini_api_key',
          've_stt_deepgram_model', 've_stt_sarvam_model',
          've_llm_default_model',
          've_tts_deepgram_model', 've_tts_sarvam_model',
          've_tts_sarvam_speaker'
        )
      `);
      const globalSettingsMap = {};
      for (const row of globalSettingsResult.rows) {
        globalSettingsMap[row.key] = row.value;
      }
      let sttProvider = globalSettingsMap["ve_stt_active_provider"] || "deepgram";
      let sttApiKey = sttProvider === "sarvam" ? globalSettingsMap["ve_sarvam_api_key"] || process.env.SARVAM_API_KEY || "" : globalSettingsMap["ve_deepgram_api_key"] || process.env.DEEPGRAM_API_KEY || "";
      let sttModel = sttProvider === "sarvam" ? globalSettingsMap["ve_stt_sarvam_model"] || "saaras:v3" : globalSettingsMap["ve_stt_deepgram_model"] || "nova-2";
      let sttConfig = {};
      let llmProvider = globalSettingsMap["ve_llm_active_provider"] || "openrouter";
      let llmApiKey = llmProvider === "gemini" ? globalSettingsMap["ve_gemini_api_key"] || process.env.GEMINI_API_KEY || "" : globalSettingsMap["ve_openrouter_api_key"] || process.env.OPENROUTER_API_KEY || "";
      let llmModel = globalSettingsMap["ve_llm_default_model"] || (llmProvider === "gemini" ? "gemini-1.5-flash" : "openai/gpt-4o-mini");
      let llmConfig = {};
      let ttsProvider = globalSettingsMap["ve_tts_active_provider"] || "deepgram";
      let ttsApiKey = ttsProvider === "sarvam" ? globalSettingsMap["ve_sarvam_api_key"] || process.env.SARVAM_API_KEY || "" : globalSettingsMap["ve_deepgram_api_key"] || process.env.DEEPGRAM_API_KEY || "";
      let ttsModel = ttsProvider === "sarvam" ? globalSettingsMap["ve_tts_sarvam_model"] || "bulbul:v3" : globalSettingsMap["ve_tts_deepgram_model"] || "aura-asteria-en";
      let ttsSpeaker = ttsProvider === "sarvam" ? globalSettingsMap["ve_tts_sarvam_speaker"] || "neha" : "";
      let ttsConfig = {};
      const providerConfigResult = await db.execute(sql18`
        SELECT * FROM ve_provider_configs WHERE user_id = ${userId} LIMIT 1
      `);
      if (providerConfigResult.rows.length > 0) {
        const pc2 = camelizeKeys(providerConfigResult.rows[0]);
        sttProvider = pc2.sttProvider || sttProvider;
        sttApiKey = pc2.sttApiKey || sttApiKey;
        sttModel = pc2.sttModel || sttModel;
        sttConfig = pc2.sttConfig || {};
        llmProvider = pc2.llmProvider || llmProvider;
        llmApiKey = pc2.llmApiKey || llmApiKey;
        llmModel = pc2.llmModel || llmModel;
        llmConfig = pc2.llmConfig || {};
        ttsProvider = pc2.ttsProvider || ttsProvider;
        ttsApiKey = pc2.ttsApiKey || ttsApiKey;
        ttsModel = pc2.ttsVoice || ttsModel;
        ttsConfig = pc2.ttsConfig || {};
      }
      const effectiveSttProvider = agent.sttProvider || agent.config?.sttProvider || sttProvider;
      const effectiveTtsProvider = agent.ttsProvider || agent.config?.ttsProvider || ttsProvider;
      const resolvedSttApiKey = effectiveSttProvider === "sarvam" ? globalSettingsMap["ve_sarvam_api_key"] || process.env.SARVAM_API_KEY || "" : globalSettingsMap["ve_deepgram_api_key"] || process.env.DEEPGRAM_API_KEY || "";
      const allowUserByok = globalSettingsMap["allow_user_byok"] !== "false";
      const providerConfig = providerConfigResult.rows.length > 0 && allowUserByok ? camelizeKeys(providerConfigResult.rows[0]) : null;
      const finalSttApiKey = providerConfig && providerConfig.sttProvider === effectiveSttProvider && providerConfig.sttApiKey ? providerConfig.sttApiKey : resolvedSttApiKey;
      const resolvedTtsApiKey = effectiveTtsProvider === "sarvam" ? globalSettingsMap["ve_sarvam_api_key"] || process.env.SARVAM_API_KEY || "" : globalSettingsMap["ve_deepgram_api_key"] || process.env.DEEPGRAM_API_KEY || "";
      const finalTtsApiKey = providerConfig && providerConfig.ttsProvider === effectiveTtsProvider && providerConfig.ttsApiKey ? providerConfig.ttsApiKey : resolvedTtsApiKey;
      console.log(`[AudioWS] Provider config resolved \u2014 STT: ${effectiveSttProvider}, TTS: ${effectiveTtsProvider}, LLM: ${llmProvider}`);
      const pc = providerConfigResult.rows.length > 0 ? camelizeKeys(providerConfigResult.rows[0]) : null;
      const finalSttModel = pc && pc.sttProvider === effectiveSttProvider && pc.sttModel ? pc.sttModel : effectiveSttProvider === "sarvam" ? globalSettingsMap["ve_stt_sarvam_model"] || "saaras:v3" : globalSettingsMap["ve_stt_deepgram_model"] || "nova-2";
      const finalTtsModel = effectiveTtsProvider === "sarvam" ? globalSettingsMap["ve_tts_sarvam_model"] || "bulbul:v3" : pc && pc.ttsProvider === effectiveTtsProvider && pc.ttsVoice ? pc.ttsVoice : globalSettingsMap["ve_tts_deepgram_model"] || "aura-asteria-en";
      const finalTtsSpeaker = pc && pc.ttsProvider === effectiveTtsProvider && pc.ttsVoice && effectiveTtsProvider === "sarvam" ? pc.ttsVoice : pc && pc.ttsProvider === effectiveTtsProvider && pc.ttsConfig?.sarvamSpeaker ? pc.ttsConfig.sarvamSpeaker : effectiveTtsProvider === "sarvam" ? globalSettingsMap["ve_tts_sarvam_speaker"] || "neha" : "";
      const sttConfigObj = {
        provider: effectiveSttProvider,
        apiKey: finalSttApiKey,
        language: agent.language || "en",
        model: agent.sttModel || finalSttModel,
        deepgramModel: agent.sttModel || finalSttModel,
        // Backward compatibility
        sarvamModel: agent.sttModel || finalSttModel,
        // Backward compatibility
        detectLanguage: agent.detectLanguageEnabled || false,
        ...sttConfig
      };
      const isOutbound = sessionData?.direction === "outbound";
      const rawCustomerPhone = isOutbound ? sessionData?.toNumber || toNumber || "" : sessionData?.fromNumber || fromNumber || "";
      const customerPhone = (rawCustomerPhone.startsWith("+") ? "plus " : "") + rawCustomerPhone.replace(/\+/g, "").split("").join(" ");
      const today = /* @__PURE__ */ new Date();
      const dateContext = `

[SYSTEM CONTEXT]
- Current Date and Time: ${today.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })} (IST)
- Today is a: ${today.toLocaleDateString("en-US", { weekday: "long", timeZone: "Asia/Kolkata" })}
- ISO Date: ${today.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" })}
- Always interpret relative dates (like "today", "tomorrow", "this Sunday", "next Monday") based on this current date.
${customerPhone ? `- Customer's Phone Number (the number they are using for this call): ${customerPhone}
- IF the customer says "use my own number", "same number", "use the number I am calling from", "use the number you called", or similar, do NOT ask them to repeat or say it. You already have it. Simply confirm it with them: "So you want to use ${customerPhone}, is that correct?" and then proceed.` : ""}
${agent.detectLanguageEnabled ? `- Dynamic Language Switching: If the customer speaks to you in Hindi, Tamil, Telugu, Kannada, or any language other than English, you MUST immediately switch your response and speak ONLY in that same language. Do not speak English if they speak to you in a different language.` : ""}
${apptSettingsText}`;
      const langDisplayNames = new Intl.DisplayNames(["en"], { type: "language" });
      const agentLanguage = agent.language || "en";
      const languageName = langDisplayNames.of(agentLanguage) || agentLanguage;
      let systemPrompt = agent.systemPrompt || "";
      systemPrompt = systemPrompt.replace(/#{0,2}\s*CRITICAL LANGUAGE REQUIREMENT[\s\S]*?(?=\n\n|$)/g, "").trim();
      systemPrompt += dateContext;
      if (agentLanguage !== "en") {
        systemPrompt += `

## CRITICAL LANGUAGE REQUIREMENT (FINAL OVERRIDE)
You MUST speak ONLY in ${languageName}. From the very first word you say, speak in ${languageName}. Do NOT speak English or any other language. This overrides any previous language instructions in this prompt. This is mandatory.`;
      }
      const effectiveLlmProvider = agent.llmModel && agent.llmModel.toLowerCase().includes("gemini") || providerConfig && providerConfig.llmProvider === "gemini" || llmProvider === "gemini" ? "gemini" : llmProvider;
      const finalLlmApiKey = providerConfig && (providerConfig.llmProvider === effectiveLlmProvider || effectiveLlmProvider === "gemini" && providerConfig.llmProvider === "gemini") && providerConfig.llmApiKey ? providerConfig.llmApiKey : effectiveLlmProvider === "gemini" ? globalSettingsMap["ve_gemini_api_key"] || process.env.GEMINI_API_KEY || "" : globalSettingsMap["ve_openrouter_api_key"] || process.env.OPENROUTER_API_KEY || "";
      const llmConfigObj = {
        provider: effectiveLlmProvider,
        apiKey: finalLlmApiKey,
        model: agent.llmModel || (effectiveLlmProvider === "gemini" ? "gemini-1.5-flash" : llmModel),
        temperature: agent.temperature || 0.7,
        maxTokens: agent.maxTokens || 500,
        systemPrompt,
        ...llmConfig
      };
      let resolvedTtsVoice;
      let resolvedSarvamSpeaker;
      if (effectiveTtsProvider === "sarvam") {
        const agentSpeaker = agent.ttsVoice && !agent.ttsVoice.startsWith("aura-") ? agent.ttsVoice : agent.openaiVoice && !agent.openaiVoice.startsWith("aura-") ? agent.openaiVoice : null;
        resolvedSarvamSpeaker = agentSpeaker || finalTtsSpeaker || "neha";
        resolvedTtsVoice = resolvedSarvamSpeaker;
      } else {
        const agentDeepgramVoice = agent.ttsVoice && agent.ttsVoice.startsWith("aura-") ? agent.ttsVoice : agent.openaiVoice && agent.openaiVoice.startsWith("aura-") ? agent.openaiVoice : null;
        resolvedTtsVoice = agentDeepgramVoice || finalTtsModel;
        resolvedSarvamSpeaker = "";
      }
      const ttsConfigObj = {
        provider: effectiveTtsProvider,
        apiKey: finalTtsApiKey,
        voice: resolvedTtsVoice,
        language: agent.language || "en",
        deepgramModel: resolvedTtsVoice,
        sarvamModel: agent.ttsModel || finalTtsModel,
        sarvamSpeaker: resolvedSarvamSpeaker,
        outputFormat: {
          encoding: "linear16",
          sampleRate: 8e3,
          channels: 1,
          bitDepth: 16
        },
        ...ttsConfig
      };
      const uniqueTools = [];
      const seenNames = /* @__PURE__ */ new Set();
      for (const tool of tools2) {
        const name = tool.function?.name;
        if (name) {
          if (!seenNames.has(name)) {
            seenNames.add(name);
            uniqueTools.push(tool);
          } else {
            console.log(`[AudioWS] Filtered out duplicate tool declaration: ${name}`);
          }
        } else {
          uniqueTools.push(tool);
        }
      }
      const audioSession = new AudioSession(
        sessionId,
        sessionData,
        agent,
        sttConfigObj,
        llmConfigObj,
        ttsConfigObj,
        void 0,
        uniqueTools,
        toolMetadata
      );
      const isByok = allowUserByok && Boolean(
        providerConfig?.sttApiKey && providerConfig?.sttProvider === effectiveSttProvider || providerConfig?.llmApiKey && (providerConfig?.llmProvider === effectiveLlmProvider || effectiveLlmProvider === "gemini" && providerConfig?.llmProvider === "gemini") || providerConfig?.ttsApiKey && providerConfig?.ttsProvider === effectiveTtsProvider
      );
      audioSession.isByok = isByok;
      this.setupDatabaseSync(audioSession);
      this.registerSession(audioSession);
      return audioSession;
    } catch (err) {
      console.error(`[AudioWS] Failed to resolve session ${sessionId} dynamically:`, err.message);
      return null;
    }
  }
  async getChannelVariablesFromNode(node, channelUuid) {
    const existingEsl = this.eslConnections.find(
      (e) => e.config.host === node.eslHost && e.config.port === node.eslPort && e.isConnected()
    );
    if (existingEsl) {
      try {
        let destinationNumber = await existingEsl.getVariable(channelUuid, "destination_number");
        let callerIdNumber = await existingEsl.getVariable(channelUuid, "caller_id_number");
        if (destinationNumber === "_undef_") destinationNumber = void 0;
        if (callerIdNumber === "_undef_") callerIdNumber = void 0;
        return { destinationNumber, callerIdNumber };
      } catch (err) {
        console.warn(`[AudioWS] Failed to get variables using existing connection to ${node.eslHost}:`, err.message);
      }
    }
    const esl = new EslConnection({
      host: node.eslHost,
      port: node.eslPort,
      password: node.eslPassword,
      reconnect: false
    });
    esl.on("error", (err) => {
      console.error("[ESL] Client error during channel variables retrieval:", err.message);
    });
    try {
      await esl.connect();
      let destinationNumber = await esl.getVariable(channelUuid, "destination_number");
      let callerIdNumber = await esl.getVariable(channelUuid, "caller_id_number");
      await esl.disconnect();
      if (destinationNumber === "_undef_") destinationNumber = void 0;
      if (callerIdNumber === "_undef_") callerIdNumber = void 0;
      return { destinationNumber, callerIdNumber };
    } catch (err) {
      console.error(`[AudioWS] Failed to get variables on ${node.eslHost}:${node.eslPort}:`, err.message);
      try {
        await esl.disconnect();
      } catch {
      }
      return null;
    }
  }
  setupDatabaseSync(session) {
    const saveSession = async () => {
      try {
        const sess = session.getSession();
        const channelUuid = sess.channelUuid || session.id;
        await db.execute(sql18`
          UPDATE ve_sessions
          SET status = ${sess.status},
              duration_seconds = GREATEST(duration_seconds, ${sess.durationSeconds || 0}),
              ended_at = ${sess.endedAt || null},
              transcript = ${JSON.stringify(sess.transcript)},
              stt_duration_ms = ${sess.sttDurationMs || 0},
              llm_prompt_tokens = ${sess.llmPromptTokens || 0},
              llm_completion_tokens = ${sess.llmCompletionTokens || 0},
              tts_duration_ms = ${sess.ttsDurationMs || 0},
              tts_characters = ${sess.ttsCharacters || 0},
              credits_used = GREATEST(credits_used, ${sess.creditsUsed || 0}),
              channel_uuid = ${channelUuid},
              updated_at = NOW()
          WHERE id = ${session.id}
        `);
      } catch (err) {
        console.error(`[AudioWS] Failed to save session ${session.id} to DB:`, err.message);
      }
    };
    session.on("statusChange", async (status) => {
      if (status === "completed" || session.getSession().status === "completed") {
        try {
          const sess = session.getSession();
          const duration = sess.durationSeconds || 0;
          if (duration > 0) {
            const creditPriceResult = await db.execute(sql18`
              SELECT value FROM global_settings WHERE key = 'credit_price_per_minute' LIMIT 1
            `);
            const creditPriceSetting = creditPriceResult.rows?.[0];
            let creditPricePerMinute = 1;
            if (creditPriceSetting?.value) {
              const parsed = Number(creditPriceSetting.value);
              if (Number.isFinite(parsed) && parsed >= 0) {
                creditPricePerMinute = parsed;
              }
            }
            const minutes = Math.ceil(duration / 60);
            const creditsToDeduct = Math.ceil(minutes * creditPricePerMinute);
            const deductCallCredits = global.deductCallCredits;
            if (!deductCallCredits) {
              throw new Error("deductCallCredits is not registered globally");
            }
            const creditResult = await deductCallCredits({
              userId: sess.userId,
              creditsToDeduct,
              callId: session.id,
              fromNumber: sess.fromNumber || "Unknown",
              toNumber: sess.toNumber || "Unknown",
              durationSeconds: duration,
              engine: "custom-voice-engine",
              isByok: session.isByok
            });
            if (creditResult.success || creditResult.alreadyDeducted) {
              session.session.creditsUsed = creditsToDeduct;
              console.log(`[AudioWS] Deducted ${creditsToDeduct} credits for custom-voice-engine session ${session.id}`);
            }
          }
        } catch (creditErr) {
          console.error(`[AudioWS] Failed to deduct credits for session ${session.id}:`, creditErr.message);
        }
      }
      await saveSession();
      if (status === "completed" || session.getSession().status === "completed") {
        try {
          let CRMLeadProcessor2 = global.CRMLeadProcessor;
          if (!CRMLeadProcessor2) {
            const module = await Promise.resolve().then(() => (init_lead_processor_service(), lead_processor_service_exports));
            CRMLeadProcessor2 = module.CRMLeadProcessor;
          }
          await CRMLeadProcessor2.processCustomVoiceEngineCall(session.id);
        } catch (err) {
          console.error(`[AudioWS] Failed to process lead generation for session ${session.id}:`, err.message);
        }
      }
    });
    session.on("callAnswered", async () => {
      console.log(`[AudioWS] Session ${session.id} marked as answered, syncing to DB.`);
      await saveSession();
    });
    session.on("pipelineEvent", async (event) => {
      if (event.type === "stt_transcript" && event.transcript.isFinal || event.type === "llm_response" || event.type === "session_end") {
        await saveSession();
      }
    });
  }
};

// plugins/custom-voice-engine/services/monitoring/metrics-collector.ts
var MetricsCollector = class _MetricsCollector {
  static instance = null;
  counters = /* @__PURE__ */ new Map();
  gauges = /* @__PURE__ */ new Map();
  histograms = /* @__PURE__ */ new Map();
  static getInstance() {
    if (!_MetricsCollector.instance) _MetricsCollector.instance = new _MetricsCollector();
    return _MetricsCollector.instance;
  }
  incrementCounter(name, value = 1) {
    this.counters.set(name, (this.counters.get(name) || 0) + value);
  }
  setGauge(name, value) {
    this.gauges.set(name, value);
  }
  recordHistogram(name, value) {
    const values = this.histograms.get(name) || [];
    values.push(value);
    if (values.length > 1e3) values.shift();
    this.histograms.set(name, values);
  }
  // Track voice engine specific metrics
  trackCallStart() {
    this.incrementCounter("ve_calls_total");
    this.setGauge("ve_active_calls", (this.gauges.get("ve_active_calls") || 0) + 1);
  }
  trackCallEnd(durationMs) {
    this.setGauge("ve_active_calls", Math.max(0, (this.gauges.get("ve_active_calls") || 0) - 1));
    this.recordHistogram("ve_call_duration_ms", durationMs);
  }
  trackSttLatency(ms) {
    this.recordHistogram("ve_stt_latency_ms", ms);
  }
  trackLlmLatency(ms) {
    this.recordHistogram("ve_llm_latency_ms", ms);
  }
  trackTtsLatency(ms) {
    this.recordHistogram("ve_tts_latency_ms", ms);
  }
  trackError(type) {
    this.incrementCounter(`ve_errors_total_${type}`);
  }
  /** Prometheus text format */
  toPrometheusFormat() {
    const lines = [];
    for (const [name, value] of this.counters) lines.push(`# TYPE ${name} counter
${name} ${value}`);
    for (const [name, value] of this.gauges) lines.push(`# TYPE ${name} gauge
${name} ${value}`);
    for (const [name, values] of this.histograms) {
      if (values.length === 0) continue;
      const sum = values.reduce((a, b) => a + b, 0);
      const avg = sum / values.length;
      const p50 = this.percentile(values, 0.5);
      const p95 = this.percentile(values, 0.95);
      const p99 = this.percentile(values, 0.99);
      lines.push(`# TYPE ${name} summary
${name}{quantile="0.5"} ${p50}
${name}{quantile="0.95"} ${p95}
${name}{quantile="0.99"} ${p99}
${name}_sum ${sum}
${name}_count ${values.length}
${name}_avg ${avg.toFixed(2)}`);
    }
    return lines.join("\n\n");
  }
  getSnapshot() {
    return {
      counters: Object.fromEntries(this.counters),
      gauges: Object.fromEntries(this.gauges),
      histogramSummaries: Object.fromEntries(
        Array.from(this.histograms.entries()).map(([k, v]) => [k, { count: v.length, avg: v.length ? (v.reduce((a, b) => a + b, 0) / v.length).toFixed(2) : 0, p95: this.percentile(v, 0.95) }])
      )
    };
  }
  percentile(values, p) {
    if (values.length === 0) return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const idx = Math.ceil(p * sorted.length) - 1;
    return sorted[Math.max(0, idx)];
  }
};

// plugins/custom-voice-engine/index.ts
function getContainerIp2() {
  if (process.env.VE_AUDIO_WS_IP) {
    return process.env.VE_AUDIO_WS_IP;
  }
  if (process.env.PUBLIC_IP) {
    return process.env.PUBLIC_IP;
  }
  const interfaces = os3.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const net2 of interfaces[name] || []) {
      if (net2.family === "IPv4" && !net2.internal) {
        if (net2.address.startsWith("10.") || net2.address.startsWith("172.") || net2.address.startsWith("192.168.")) {
          return net2.address;
        }
      }
    }
  }
  return "127.0.0.1";
}
var PLUGIN_VERSION = "1.0.0";
var PLUGIN_NAME = "ai-voice-engine";
var audioWsServer = null;
var metricsCollector = null;
function registerAiVoiceEngineRoutes(app, options) {
  const { sessionAuthMiddleware, adminAuthMiddleware, httpServer } = options;
  app.use("/api/voice-engine/admin/settings", adminAuthMiddleware, createAdminSettingsRouter());
  app.use("/api/voice-engine/admin/freeswitch", adminAuthMiddleware, createAdminSettingsRouter());
  app.use("/api/voice-engine/admin/provider-keys", (req, res, next) => {
    if (req.method === "GET") {
      return sessionAuthMiddleware(req, res, next);
    }
    return adminAuthMiddleware(req, res, next);
  }, createAdminProviderKeysRouter());
  app.use("/api/voice-engine/admin/storage", adminAuthMiddleware, createAdminStorageRouter());
  app.use("/api/voice-engine/config", sessionAuthMiddleware, createTenantConfigRouter());
  app.use("/api/voice-engine/calls", sessionAuthMiddleware, createCallsRouter());
  app.use("/api/voice-engine/recordings", sessionAuthMiddleware, createRecordingsRouter());
  app.use("/api/voice-engine/memory", sessionAuthMiddleware, createMemoryRouter());
  app.use("/api/voice-engine/analytics", sessionAuthMiddleware, createAnalyticsRouter());
  app.use("/api/voice-engine/agents", sessionAuthMiddleware, createAgentsRouter());
  app.post("/api/public/voice-engine/calls/outbound", async (req, res) => {
    try {
      const { toNumber, language, ttsVoice, llmModel, sttProvider, ttsProvider, sttModel, ttsModel } = req.body;
      if (!toNumber) {
        return res.status(400).json({ success: false, error: "toNumber is required" });
      }
      const agentResult = await db.execute(
        sql19`SELECT * FROM ve_voice_agents WHERE is_active = true ORDER BY created_at DESC LIMIT 1`
      );
      if (agentResult.rows.length === 0) {
        const fallbackResult = await db.execute(
          sql19`SELECT * FROM ve_voice_agents ORDER BY created_at DESC LIMIT 1`
        );
        if (fallbackResult.rows.length === 0) {
          return res.status(404).json({ success: false, error: "No voice agents found in the system" });
        }
        agentResult.rows.push(fallbackResult.rows[0]);
      }
      const agent = agentResult.rows[0];
      const userId = agent.user_id;
      const agentId = agent.id;
      const metadata = {
        language,
        ttsVoice,
        llmModel,
        sttProvider,
        ttsProvider,
        sttModel,
        ttsModel,
        isPublicDemo: true
      };
      const sessionResult = await db.execute(sql19`
        INSERT INTO ve_sessions (user_id, agent_id, to_number, from_number, direction, status, metadata)
        VALUES (${userId}, ${agentId}, ${toNumber}, 'FreeSWITCH', 'outbound', 'initializing', ${JSON.stringify(metadata)})
        RETURNING *
      `);
      const session = sessionResult.rows[0];
      const nodesResult = await db.execute(sql19`SELECT * FROM ve_freeswitch_nodes WHERE status = 'online' ORDER BY created_at ASC`);
      const nodes = nodesResult.rows;
      if (nodes.length === 0) {
        throw new Error("No active FreeSWITCH nodes available");
      }
      const node = nodes[0];
      const eslHost = node.esl_host || node.eslHost;
      const eslPort = node.esl_port || node.eslPort;
      const eslPassword = node.esl_password || node.eslPassword || "ClueCon";
      const eslConnection = new EslConnection({ host: eslHost, port: eslPort, password: eslPassword, reconnect: false });
      await eslConnection.connect();
      let activeGateway = null;
      const userGatewayResult = await db.execute(sql19`
        SELECT id, name, proxy, username, password FROM user_sip_gateways WHERE user_id = ${userId} AND is_active = true LIMIT 1
      `);
      if (userGatewayResult.rows.length > 0) {
        activeGateway = userGatewayResult.rows[0];
      }
      let activePhoneNumber = "FreeSWITCH";
      if (activeGateway) {
        const sipPhoneResult = await db.execute(sql19`
          SELECT phone_number FROM user_sip_phone_numbers WHERE gateway_id = ${activeGateway.id} LIMIT 1
        `);
        if (sipPhoneResult.rows.length > 0) {
          activePhoneNumber = sipPhoneResult.rows[0].phone_number;
        }
      }
      const gatewayProxy = activeGateway ? activeGateway.proxy : "testhr.pstn.twilio.com";
      const gatewayUsername = activeGateway?.username;
      const gatewayPassword = activeGateway?.password;
      const formattedTo = !toNumber.startsWith("+") ? `+${toNumber}` : toNumber;
      const dialString = `sofia/external/${formattedTo}@${gatewayProxy}`;
      const destination = `${formattedTo} XML public`;
      const formattedCallerId = activePhoneNumber !== "FreeSWITCH" && !activePhoneNumber.startsWith("+") ? `+${activePhoneNumber}` : activePhoneNumber;
      const options2 = {
        origination_uuid: session.id,
        origination_caller_id_number: formattedCallerId,
        origination_caller_id_name: formattedCallerId,
        effective_caller_id_number: formattedCallerId,
        effective_caller_id_name: formattedCallerId,
        sip_from_uri: `sip:${formattedCallerId}@${gatewayProxy}`,
        sip_invite_req_uri: `sip:${formattedTo}@${gatewayProxy}`,
        ve_audio_ws_url: `ws://${getContainerIp2()}:${process.env.PORT || "5000"}/voice-engine/ws/audio`,
        ...gatewayUsername && { sip_auth_username: gatewayUsername },
        ...gatewayPassword && { sip_auth_password: gatewayPassword }
      };
      try {
        await eslConnection.originate(dialString, destination, options2);
        await db.execute(sql19`
          UPDATE ve_sessions SET status = 'active', channel_uuid = ${session.id} WHERE id = ${session.id}
        `);
      } catch (originateErr) {
        await db.execute(sql19`
          UPDATE ve_sessions SET status = 'failed' WHERE id = ${session.id}
        `);
        throw originateErr;
      } finally {
        await eslConnection.disconnect().catch(() => {
        });
      }
      res.json({ success: true, data: session });
    } catch (err) {
      console.error("[Public Call Error]:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  });
  app.get("/api/public/voice-engine/calls/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await db.execute(
        sql19`SELECT id, status, started_at, answered_at, ended_at, duration_seconds, end_reason FROM ve_sessions WHERE id = ${id} LIMIT 1`
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, error: "Session not found" });
      }
      res.json({ success: true, data: result.rows[0] });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  app.post("/api/public/voice-engine/agents/preview", async (req, res) => {
    try {
      const { voiceId, text: text2, provider, language, ttsModel } = req.body;
      if (!voiceId) {
        return res.status(400).json({ success: false, error: "voiceId is required" });
      }
      const previewText = text2 || "Hello! This is a preview of how I'll sound. I can adjust my tone and style based on your preferences.";
      const isSarvam = provider === "sarvam";
      const providerName = isSarvam ? "sarvam" : "deepgram";
      const keyName = isSarvam ? "ve_sarvam_api_key" : "ve_deepgram_api_key";
      const [setting] = await db.select().from(globalSettings).where(eq14(globalSettings.key, keyName)).limit(1);
      const apiKey = setting?.value;
      if (!apiKey) {
        return res.status(400).json({ success: false, error: `API key for ${providerName} is not configured in settings.` });
      }
      const ttsProvider = TtsProviderFactory.create(providerName);
      const effectiveModel = isSarvam ? ttsModel || "bulbul:v3" : void 0;
      const config = isSarvam ? {
        apiKey,
        voice: voiceId,
        sarvamSpeaker: voiceId,
        sarvamModel: effectiveModel,
        language: language || "en-IN",
        outputFormat: {
          encoding: "linear16",
          sampleRate: 8e3
        },
        speed: 1
      } : {
        apiKey,
        voice: voiceId,
        language: language || "en",
        outputFormat: {
          encoding: "mp3",
          sampleRate: 24e3
        }
      };
      const audioBuffer = await ttsProvider.synthesize(previewText, config);
      const isMp3 = !isSarvam;
      res.setHeader("Content-Type", isMp3 ? "audio/mpeg" : "audio/wav");
      res.setHeader("Content-Length", audioBuffer.length);
      res.end(audioBuffer);
    } catch (err) {
      console.error("[Public Preview Error]:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  });
  if (httpServer) {
    try {
      if (audioWsServer) {
        audioWsServer.shutdown();
      }
      audioWsServer = new AudioWebSocketServer(httpServer);
      console.log("[AI Voice Engine]   - WebSocket audio server initialized");
    } catch (err) {
      console.warn("[AI Voice Engine] WebSocket server init failed:", err.message);
    }
  }
  try {
    metricsCollector = MetricsCollector.getInstance();
    console.log("[AI Voice Engine]   - Metrics collector initialized");
  } catch (err) {
    console.warn("[AI Voice Engine] Metrics collector init failed:", err.message);
  }
  (async () => {
    try {
      const os4 = await import("os");
      const getContainerIp3 = () => {
        const interfaces = os4.networkInterfaces();
        for (const name of Object.keys(interfaces)) {
          for (const net2 of interfaces[name] || []) {
            if (net2.family === "IPv4" && !net2.internal) {
              if (net2.address.startsWith("10.") || net2.address.startsWith("172.") || net2.address.startsWith("192.168.")) {
                return net2.address;
              }
            }
          }
        }
        return "127.0.0.1";
      };
      const containerIp = getContainerIp3();
      if (process.env.DISABLE_FREESWITCH_ESL === "true" || process.env.DISABLE_FREESWITCH_ESL === "1") {
        console.log("[AI Voice Engine] FreeSWITCH ESL connection initialization disabled via DISABLE_FREESWITCH_ESL environment variable.");
        return;
      }
      const wsUrl = `ws://${containerIp}:${process.env.PORT || "5000"}/voice-engine/ws/audio`;
      if (audioWsServer) {
        await audioWsServer.initializeEslConnections(wsUrl);
      }
    } catch (err) {
      console.warn(`[AI Voice Engine] Failed to configure FreeSWITCH nodes and ESL connections on startup:`, err.message);
    }
  })();
  console.log("[AI Voice Engine] Plugin registered (v1.0.0)");
  console.log("[AI Voice Engine] Endpoints:");
  console.log("  - /api/voice-engine/admin/settings (admin auth)");
  console.log("  - /api/voice-engine/admin/freeswitch (admin auth)");
  console.log("  - /api/voice-engine/admin/provider-keys (admin auth)");
  console.log("  - /api/voice-engine/config (user auth)");
  console.log("  - /api/voice-engine/calls (user auth)");
  console.log("  - /api/voice-engine/recordings (user auth)");
  console.log("  - /api/voice-engine/memory (user auth)");
  console.log("  - /api/voice-engine/analytics (user auth)");
  console.log("  - /api/voice-engine/agents (user auth)");
  console.log("[AI Voice Engine] Providers:");
  console.log("  - STT: Deepgram, Sarvam");
  console.log("  - LLM: OpenRouter (GPT-4o-mini, Gemini Flash)");
  console.log("  - TTS: Deepgram Nova-2, Sarvam");
  console.log("\u2705 AI Voice Engine Plugin initialized");
}
function getAudioWsServer() {
  return audioWsServer;
}
function getMetricsCollector() {
  return metricsCollector;
}
var index_default = {
  name: PLUGIN_NAME,
  version: PLUGIN_VERSION,
  register: registerAiVoiceEngineRoutes
};
export {
  DEFAULT_STT_FORMAT,
  DEFAULT_TELEPHONY_FORMAT,
  DEFAULT_VAD_CONFIG,
  PLUGIN_NAME,
  PLUGIN_VERSION,
  index_default as default,
  getAudioWsServer,
  getMetricsCollector,
  registerAiVoiceEngineRoutes
};
