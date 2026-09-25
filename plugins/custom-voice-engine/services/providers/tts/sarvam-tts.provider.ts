/**
 * ============================================================
 * Sarvam AI TTS Provider
 *
 * Text-to-Speech using Sarvam AI's API.
 * Supports Indian languages with multiple speaker voices.
 * ============================================================
 */

import axios from 'axios';
import WebSocket from 'ws';
import type { TtsConfig } from '../../../types';
import { BaseTtsProvider } from './tts-provider.interface';
import { keepAliveAxiosConfig } from '../http-agent';

const SARVAM_API_BASE = 'https://api.sarvam.ai';

export class SarvamTtsProvider extends BaseTtsProvider {
  readonly name = 'sarvam' as const;

  async synthesize(text: string, config: TtsConfig): Promise<Buffer> {
    const language = config.language || 'en-IN';
    const speaker = config.sarvamSpeaker || config.voice || 'meera';
    const model = config.sarvamModel || 'bulbul:v3';

    console.log(`[TTS:Sarvam] Synthesizing (REST): speaker="${speaker}" model="${model}" lang="${language}" sampleRate=${config.outputFormat?.sampleRate || 8000}`);

    try {
      const response = await axios.post(
        `${SARVAM_API_BASE}/text-to-speech`,
        {
          inputs: [text],
          target_language_code: this.mapLanguage(language)!,
          speaker,
          model,
          pace: config.speed || 1.15, // Increased from 1.0 to 1.15 for a more natural speed
          speech_sample_rate: config.outputFormat?.sampleRate || 8000,
          enable_preprocessing: true,
        },
        {
          ...keepAliveAxiosConfig,
          headers: {
            'API-Subscription-Key': config.apiKey,
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        }
      );

      if (response.data?.audios?.[0]) {
        return Buffer.from(response.data.audios[0], 'base64');
      }

      console.error(`[TTS:Sarvam] No audio in response:`, JSON.stringify(response.data));
      throw new Error(`Sarvam TTS returned no audio data (speaker="${speaker}", model="${model}")`);
    } catch (err: any) {
      if (err.response?.data) {
        console.error(`[TTS:Sarvam] API error response:`, JSON.stringify(err.response.data, null, 2));
      }
      console.error(`[TTS:Sarvam] Request body:`, JSON.stringify({
        inputs: [text],
        target_language_code: this.mapLanguage(language),
        speaker,
        model,
        pitch: config.pitch || 0,
        pace: config.speed || 1.15,
        loudness: 1.5,
        speech_sample_rate: config.outputFormat?.sampleRate || 8000,
        enable_preprocessing: true,
      }));
      throw err;
    }
  }

  async *synthesizeStream(text: string, config: TtsConfig): AsyncIterable<Buffer> {
    const language = config.language || 'en-IN';
    const speaker = config.sarvamSpeaker || config.voice || 'meera';
    const model = config.sarvamModel || 'bulbul:v3';

    // Establish WebSocket connection for real-time streaming
    const url = `wss://api.sarvam.ai/text-to-speech/ws?model=${model}&send_completion_event=true`;
    console.log(`[TTS:Sarvam] Connecting WebSocket to URL: ${url}`);

    const ws = new WebSocket(url, {
      headers: {
        'api-subscription-key': config.apiKey,
      },
    });

    const queue: (Buffer | Error | 'done')[] = [];
    let resolveNext: (() => void) | null = null;

    ws.on('open', () => {
      // 1. Send the configuration payload
      ws.send(JSON.stringify({
        type: 'config',
        data: {
          target_language_code: this.mapLanguage(language),
          speaker,
        },
      }));

      // 2. Send the text to be synthesized
      ws.send(JSON.stringify({
        type: 'text',
        data: {
          text,
        },
      }));
    });

    ws.on('message', (data: WebSocket.Data) => {
      try {
        const response = JSON.parse(data.toString());
        if (response.type === 'audio' && response.data?.audio) {
          const audioBuffer = Buffer.from(response.data.audio, 'base64');
          queue.push(audioBuffer);
          if (resolveNext) {
            resolveNext();
            resolveNext = null;
          }
        } else if (response.type === 'completion') {
          queue.push('done');
          if (resolveNext) {
            resolveNext();
            resolveNext = null;
          }
          ws.close();
        }
      } catch (err: any) {
        console.error(`[TTS:Sarvam] Failed to parse WebSocket message:`, err.message);
      }
    });

    ws.on('error', (err) => {
      console.error(`[TTS:Sarvam] WebSocket error:`, err.message);
      queue.push(err);
      if (resolveNext) {
        resolveNext();
        resolveNext = null;
      }
    });

    ws.on('close', () => {
      if (!queue.includes('done') && !queue.some(item => item instanceof Error)) {
        queue.push('done');
        if (resolveNext) {
          resolveNext();
          resolveNext = null;
        }
      }
    });

    try {
      while (true) {
        if (queue.length === 0) {
          await new Promise<void>((resolve) => {
            resolveNext = resolve;
          });
        }

        const next = queue.shift();
        if (next === 'done') {
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

  private mapLanguage(lang: string): string {
    // If already a full code, return as-is
    if (lang.includes('-')) return lang;

    const langMap: Record<string, string> = {
      en: 'en-IN',
      hi: 'hi-IN',
      ta: 'ta-IN',
      te: 'te-IN',
      kn: 'kn-IN',
      ml: 'ml-IN',
      mr: 'mr-IN',
      gu: 'gu-IN',
      bn: 'bn-IN',
      pa: 'pa-IN',
      or: 'od-IN',
    };
    return langMap[lang] || 'en-IN';
  }
}
