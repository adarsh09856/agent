/**
 * ============================================================
 * OpenRouter LLM Provider
 *
 * LLM adapter for OpenRouter API, which provides access to
 * GPT-4o-mini, Gemini Flash, Claude, and many other models
 * through a unified API.
 *
 * OpenRouter uses the OpenAI-compatible API format.
 * ============================================================
 */

import axios from 'axios';
import type { LlmConfig, LlmMessage, LlmResponse, LlmStreamChunk, LlmToolDefinition } from '../../types';
import { BaseLlmProvider } from './llm-provider.interface';
import { keepAliveAxiosConfig } from '../http-agent';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export function getEndpointAndModel(model: string | undefined, apiKey?: string): { url: string; model: string } {
  const cleanModel = model || 'openai/gpt-4o-mini';
  const key = apiKey || '';

  // Direct Groq key or Groq model with Groq key
  if (key.startsWith('gsk_') || cleanModel.startsWith('groq/')) {
    const rawModel = cleanModel.replace(/^groq\//, '');
    return { url: 'https://api.groq.com/openai/v1/chat/completions', model: rawModel };
  }

  // Direct DeepSeek
  if (cleanModel.startsWith('deepseek/') && !key.startsWith('sk-or-')) {
    const rawModel = cleanModel.replace(/^deepseek\//, '');
    return { url: 'https://api.deepseek.com/chat/completions', model: rawModel };
  }

  // Direct OpenAI
  if ((key.startsWith('sk-proj-') || (key.startsWith('sk-') && !key.startsWith('sk-or-'))) && (cleanModel.startsWith('openai/') || cleanModel.startsWith('gpt-') || cleanModel.startsWith('o1') || cleanModel.startsWith('o3'))) {
    const rawModel = cleanModel.replace(/^openai\//, '');
    return { url: 'https://api.openai.com/v1/chat/completions', model: rawModel };
  }

  // Default to OpenRouter with sanitized model
  return { url: OPENROUTER_API_URL, model: sanitizeOpenRouterModel(cleanModel) };
}

function sanitizeOpenRouterModel(model: string | undefined): string {
  if (!model) return 'openai/gpt-4o-mini';
  const modelLower = model.toLowerCase();
  
  if (modelLower.includes('gpt-4o-mini-realtime') || modelLower.includes('gpt-realtime-mini')) {
    return 'openai/gpt-4o-mini';
  }
  if (modelLower.includes('gpt-4o-realtime') || modelLower.includes('gpt-realtime')) {
    return 'openai/gpt-4o';
  }
  
  if (!model.includes('/')) {
    if (modelLower.startsWith('gpt-4o-mini')) {
      return 'openai/gpt-4o-mini';
    }
    if (modelLower.startsWith('gpt-4o')) {
      return 'openai/gpt-4o';
    }
    if (modelLower.startsWith('claude-')) {
      return `anthropic/${model}`;
    }
    if (modelLower.startsWith('gemini-')) {
      return `google/${model}`;
    }
    return `openai/${model}`;
  }
  return model;
}

export class OpenRouterLlmProvider extends BaseLlmProvider {
  readonly name = 'openrouter' as const;

  async complete(
    messages: LlmMessage[],
    config: LlmConfig,
    tools?: LlmToolDefinition[]
  ): Promise<LlmResponse> {
    const startTime = Date.now();
    const endpoint = getEndpointAndModel(config.model, config.apiKey);

    const payload: Record<string, unknown> = {
      model: endpoint.model,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
        ...(m.toolCallId ? { tool_call_id: m.toolCallId } : {}),
        ...(m.toolCalls ? { tool_calls: m.toolCalls } : {}),
      })),
      temperature: config.temperature ?? 0.7,
      max_tokens: config.maxTokens ?? 200,
      top_p: config.topP ?? 1.0,
      frequency_penalty: config.frequencyPenalty ?? 0,
      presence_penalty: config.presencePenalty ?? 0,
    };

    if (tools && tools.length > 0) {
      payload.tools = tools.map((t) => ({
        type: t.type,
        function: {
          name: t.function.name,
          description: t.function.description,
          parameters: t.function.parameters,
        },
      }));
      payload.tool_choice = 'auto';
    }

    try {
      console.log(`[LLM:OpenRouter/Direct] Sending tools payload to ${endpoint.url} (model=${endpoint.model}):`, JSON.stringify(payload.tools, null, 2));
      const response = await axios.post(endpoint.url, payload, {
        ...keepAliveAxiosConfig,
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://agentlabs.io',
          'X-Title': 'AgentLabs AI Voice Engine',
        },
        timeout: 60000,
      });

      const data = response.data;
      const choice = data.choices?.[0];
      const latencyMs = Date.now() - startTime;

      return {
        content: choice?.message?.content || null,
        toolCalls: choice?.message?.tool_calls,
        finishReason: choice?.finish_reason || 'stop',
        usage: {
          promptTokens: data.usage?.prompt_tokens || 0,
          completionTokens: data.usage?.completion_tokens || 0,
          totalTokens: data.usage?.total_tokens || 0,
        },
        model: data.model || config.model,
        latencyMs,
      };
    } catch (err: any) {
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

  async *stream(
    messages: LlmMessage[],
    config: LlmConfig,
    tools?: LlmToolDefinition[]
  ): AsyncIterable<LlmStreamChunk> {
    const endpoint = getEndpointAndModel(config.model, config.apiKey);
    const payload: Record<string, unknown> = {
      model: endpoint.model,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
        ...(m.toolCallId ? { tool_call_id: m.toolCallId } : {}),
        ...(m.toolCalls ? { tool_calls: m.toolCalls } : {}),
      })),
      temperature: config.temperature ?? 0.7,
      max_tokens: config.maxTokens ?? 200,
      top_p: config.topP ?? 1.0,
      stream: true,
    };

    if (tools && tools.length > 0) {
      payload.tools = tools.map((t) => ({
        type: t.type,
        function: {
          name: t.function.name,
          description: t.function.description,
          parameters: t.function.parameters,
        },
      }));
      payload.tool_choice = 'auto';
    }

    // AbortController lets us cancel the request if the stream stalls
    const controller = new AbortController();

    // Per-chunk inactivity timeout: if no data arrives for 30s, abort
    const STREAM_CHUNK_TIMEOUT_MS = 30_000;
    let inactivityTimer: ReturnType<typeof setTimeout> | null = null;
    const resetInactivityTimer = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        controller.abort();
      }, STREAM_CHUNK_TIMEOUT_MS);
    };

    resetInactivityTimer(); // Start the clock before we even get the first byte

    try {
      console.log(`[LLM:OpenRouter/Direct] Sending tools payload (stream) to ${endpoint.url} (model=${endpoint.model}):`, JSON.stringify(payload.tools, null, 2));
      const response = await axios.post(endpoint.url, payload, {
        ...keepAliveAxiosConfig,
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://agentlabs.io',
          'X-Title': 'AgentLabs AI Voice Engine',
        },
        responseType: 'stream',
        timeout: 60000,
        signal: controller.signal,
      });

      const stream = response.data as NodeJS.ReadableStream;
      let buffer = '';

      for await (const rawChunk of stream) {
        resetInactivityTimer(); // Reset on every received chunk
        buffer += rawChunk.toString();

        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Keep incomplete line in buffer

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith('data: ')) continue;

          const data = trimmed.slice(6); // Remove 'data: ' prefix
          if (data === '[DONE]') {
            if (inactivityTimer) clearTimeout(inactivityTimer);
            return;
          }

          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta;
            const finishReason = parsed.choices?.[0]?.finish_reason;

            if (delta) {
              const chunk: LlmStreamChunk = {};
              if (delta.content) chunk.content = delta.content;
              if (delta.tool_calls) chunk.toolCalls = delta.tool_calls;
              if (finishReason) chunk.finishReason = finishReason;
              yield chunk;
            }
          } catch {
            // Skip malformed SSE chunks
          }
        }
      }
    } catch (err: any) {
      if (err.name === 'AbortError' || err.code === 'ERR_CANCELED' || controller.signal.aborted) {
        throw new Error(`OpenRouter stream timed out after ${STREAM_CHUNK_TIMEOUT_MS / 1000}s of inactivity`);
      }
      if (err.response?.data) {
        try {
          let errorResponseStr = '';
          const data = err.response.data;
          if (data && (typeof data.on === 'function' || typeof data[Symbol.asyncIterator] === 'function')) {
            const chunks: Buffer[] = [];
            for await (const chunk of data) {
              chunks.push(Buffer.from(chunk));
            }
            errorResponseStr = Buffer.concat(chunks).toString('utf8');
          } else if (typeof data === 'string') {
            errorResponseStr = data;
          } else if (Buffer.isBuffer(data)) {
            errorResponseStr = data.toString('utf8');
          } else if (data && typeof data === 'object') {
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
            // Not JSON
          }
          throw new Error(`OpenRouter LLM error (${err.response.status}): ${msg}`);
        } catch (readErr: any) {
          if (readErr.message && readErr.message.includes('OpenRouter LLM error')) {
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
}
