import axios from "axios";
import { BaseLlmProvider } from "./llm-provider.interface.js";
import { keepAliveAxiosConfig } from "../http-agent.js";
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

function getEndpointAndModel(model, apiKey) {
  const cleanModel = model || "openai/gpt-4o-mini";
  const key = apiKey || "";

  if (key.startsWith("gsk_") || cleanModel.startsWith("groq/")) {
    return { url: "https://api.groq.com/openai/v1/chat/completions", model: cleanModel.replace(/^groq\//, "") };
  }
  if (cleanModel.startsWith("deepseek/") && !key.startsWith("sk-or-")) {
    return { url: "https://api.deepseek.com/chat/completions", model: cleanModel.replace(/^deepseek\//, "") };
  }
  if ((key.startsWith("sk-proj-") || (key.startsWith("sk-") && !key.startsWith("sk-or-"))) && (cleanModel.startsWith("openai/") || cleanModel.startsWith("gpt-") || cleanModel.startsWith("o1") || cleanModel.startsWith("o3"))) {
    return { url: "https://api.openai.com/v1/chat/completions", model: cleanModel.replace(/^openai\//, "") };
  }
  return { url: OPENROUTER_API_URL, model: cleanModel };
}

class OpenRouterLlmProvider extends BaseLlmProvider {
  name = "openrouter";
  async complete(messages, config, tools) {
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
      max_tokens: config.maxTokens ?? 500,
      top_p: config.topP ?? 1,
      frequency_penalty: config.frequencyPenalty ?? 0,
      presence_penalty: config.presencePenalty ?? 0
    };
    if (tools && tools.length > 0) {
      payload.tools = tools.map((t) => ({
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
      const response = await axios.post(endpoint.url, payload, {
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
  async *stream(messages, config, tools) {
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
      max_tokens: config.maxTokens ?? 500,
      top_p: config.topP ?? 1,
      stream: true
    };
    if (tools && tools.length > 0) {
      payload.tools = tools.map((t) => ({
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
      const response = await axios.post(endpoint.url, payload, {
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
          console.error("[OpenRouter] Stream request failed with status", err.response.status, "Error body:", errorResponseStr);
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
          console.error("[OpenRouter] Failed to read error response:", readErr.message);
        }
      }
      throw err;
    } finally {
      if (inactivityTimer) clearTimeout(inactivityTimer);
    }
  }
}
export {
  OpenRouterLlmProvider
};
