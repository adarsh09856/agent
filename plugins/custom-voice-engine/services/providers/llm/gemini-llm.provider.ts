/**
 * ============================================================
 * Google Gemini LLM Provider (Direct API)
 * ============================================================
 */

import axios from 'axios';
import type { LlmConfig, LlmMessage, LlmResponse, LlmStreamChunk, LlmToolDefinition, LlmToolCall } from '../../types';
import { BaseLlmProvider } from './llm-provider.interface';
import { keepAliveAxiosConfig } from '../http-agent';

// Map OpenAI/standard tools to Gemini tools format
function mapToolsToGemini(tools: LlmToolDefinition[] | undefined) {
  if (!tools || tools.length === 0) return undefined;
  return [
    {
      functionDeclarations: tools.map(t => {
        const convertTypes = (schema: any): any => {
          if (!schema) return schema;
          const copy = { ...schema };
          if (copy.type && typeof copy.type === 'string') {
            copy.type = copy.type.toUpperCase();
          }
          if (copy.properties) {
            const props: any = {};
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

// Convert history
function convertMessagesToGemini(messages: LlmMessage[]) {
  const contents: any[] = [];
  let systemInstruction: any = undefined;

  for (let i = 0; i < messages.length; i++) {
    const m = messages[i];
    if (m.role === 'system') {
      systemInstruction = {
        parts: [{ text: m.content }]
      };
      continue;
    }

    if (m.role === 'user') {
      contents.push({
        role: 'user',
        parts: [{ text: m.content }]
      });
    } else if (m.role === 'assistant') {
      if (m.toolCalls && m.toolCalls.length > 0) {
        contents.push({
          role: 'model',
          parts: m.toolCalls.map(tc => {
            let args = {};
            try {
              args = JSON.parse(tc.function.arguments);
            } catch (e) {}
            return {
              functionCall: {
                name: tc.function.name,
                args: args
              }
            };
          })
        });
      } else {
        contents.push({
          role: 'model',
          parts: [{ text: m.content || "" }]
        });
      }
    } else if (m.role === 'tool') {
      let toolName = 'unknown_tool';
      for (let j = i - 1; j >= 0; j--) {
        const prev = messages[j];
        if (prev.role === 'assistant' && prev.toolCalls) {
          const match = prev.toolCalls.find(tc => tc.id === m.toolCallId);
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
        role: 'user',
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

  // Ensure roles alternate user/model/user/model as Gemini requires.
  // If we have back-to-back user messages, merge them.
  const normalizedContents: any[] = [];
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

function sanitizeGeminiModel(model: string | undefined): string {
  return model || 'gemini-1.5-flash';
}

export class GeminiLlmProvider extends BaseLlmProvider {
  readonly name = 'gemini' as const;

  async complete(
    messages: LlmMessage[],
    config: LlmConfig,
    tools?: LlmToolDefinition[]
  ): Promise<LlmResponse> {
    const startTime = Date.now();
    const model = sanitizeGeminiModel(config.model);
    const { contents, systemInstruction } = convertMessagesToGemini(messages);
    const geminiTools = mapToolsToGemini(tools);

    const payload: Record<string, unknown> = {
      contents,
      generationConfig: {
        temperature: config.temperature ?? 0.7,
        maxOutputTokens: config.maxTokens ?? 300,
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
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${config.apiKey}`,
        payload,
        {
          ...keepAliveAxiosConfig,
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        }
      );

      const data = response.data;
      const candidate = data.candidates?.[0];
      const part = candidate?.content?.parts?.[0];
      
      let content: string | null = null;
      let toolCalls: LlmToolCall[] | undefined = undefined;
      let finishReason: LlmResponse['finishReason'] = 'stop';

      if (part) {
        if (part.text) {
          content = part.text;
        } else if (part.functionCall) {
          // Gemini returns functionCall. Map to LlmToolCall
          const id = `call_${Math.random().toString(36).substring(2, 11)}`;
          toolCalls = [{
            id,
            type: 'function',
            function: {
              name: part.functionCall.name,
              arguments: JSON.stringify(part.functionCall.args || {})
            }
          }];
          finishReason = 'tool_calls';
        }
      }

      if (candidate?.finishReason) {
        const reason = candidate.finishReason.toLowerCase();
        if (reason === 'max_tokens') finishReason = 'length';
        else if (reason === 'safety' || reason === 'recitation') finishReason = 'content_filter';
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
          totalTokens: promptTokens + completionTokens,
        },
        model,
        latencyMs: Date.now() - startTime,
      };
    } catch (err: any) {
      console.error(`[Gemini] API error:`, err.response?.data || err.message);
      throw err;
    }
  }

  async *stream(
    messages: LlmMessage[],
    config: LlmConfig,
    tools?: LlmToolDefinition[]
  ): AsyncIterable<LlmStreamChunk> {
    const model = sanitizeGeminiModel(config.model);
    const { contents, systemInstruction } = convertMessagesToGemini(messages);
    const geminiTools = mapToolsToGemini(tools);

    const payload: Record<string, unknown> = {
      contents,
      generationConfig: {
        temperature: config.temperature ?? 0.7,
        maxOutputTokens: config.maxTokens ?? 300,
      }
    };

    if (systemInstruction) {
      payload.systemInstruction = systemInstruction;
    }
    if (geminiTools) {
      payload.tools = geminiTools;
    }

    console.log(`[Gemini] Direct stream request to model: ${model}`);
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${config.apiKey}`,
      payload,
      {
        ...keepAliveAxiosConfig,
        headers: {
          'Content-Type': 'application/json',
        },
        responseType: 'stream',
        timeout: 30000,
      }
    );

    const stream = response.data as NodeJS.ReadableStream;
    let buffer = '';

    for await (const data of stream) {
      const chunk = Buffer.isBuffer(data) ? data.toString() : data;
      buffer += chunk;

      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith('data:')) continue;

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
                  type: 'function',
                  function: {
                    name: part.functionCall.name,
                    arguments: JSON.stringify(part.functionCall.args || {})
                  }
                }]
              };
            }
          }
        } catch (e: any) {
          console.warn(`[Gemini] Failed to parse SSE line:`, e.message);
        }
      }
    }
  }
}
