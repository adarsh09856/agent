/**
 * ============================================================
 * ElevenLabs TTS Provider
 *
 * Text-to-Speech using ElevenLabs' streaming API.
 * Supports ultra-low latency playback suitable for real-time
 * dynamic telephony.
 * ============================================================
 */

import axios from 'axios';
import type { TtsConfig } from '../../../types';
import { BaseTtsProvider } from './tts-provider.interface';
import { keepAliveAxiosConfig } from '../http-agent';

const ELEVENLABS_API_BASE = 'https://api.elevenlabs.io/v1';

export class ElevenLabsTtsProvider extends BaseTtsProvider {
  readonly name = 'elevenlabs' as const;

  async synthesize(text: string, config: TtsConfig): Promise<Buffer> {
    const voiceId = config.voice || '21m00Tcm4TlvDq8ikWAM'; // Rachel default
    const model = config.deepgramModel || 'eleven_turbo_v2_5'; // hijack deepgramModel field or use turbo default
    const sampleRate = config.outputFormat?.sampleRate || 8000;

    // Map output format to ElevenLabs format query parameter
    // e.g. pcm_8000, pcm_16000, pcm_22050, pcm_24000, pcm_44100
    const outputFormat = `pcm_${sampleRate}`;

    console.log(`[TTS:ElevenLabs] Synthesizing full audio: voiceId="${voiceId}" model="${model}" outputFormat="${outputFormat}"`);

    try {
      const response = await axios.post(
        `${ELEVENLABS_API_BASE}/text-to-speech/${voiceId}?output_format=${outputFormat}`,
        {
          text,
          model_id: model,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        },
        {
          ...keepAliveAxiosConfig,
          headers: {
            'xi-api-key': config.apiKey,
            'Content-Type': 'application/json',
          },
          responseType: 'arraybuffer',
          timeout: 30000,
        }
      );

      return Buffer.from(response.data);
    } catch (err: any) {
      if (err.response?.data) {
        const errText = Buffer.isBuffer(err.response.data)
          ? err.response.data.toString()
          : JSON.stringify(err.response.data);
        console.error(`[TTS:ElevenLabs] API error response:`, errText);
      }
      throw err;
    }
  }

  async *synthesizeStream(text: string, config: TtsConfig): AsyncIterable<Buffer> {
    const voiceId = config.voice || '21m00Tcm4TlvDq8ikWAM';
    const model = config.deepgramModel || 'eleven_turbo_v2_5';
    const sampleRate = config.outputFormat?.sampleRate || 8000;
    const outputFormat = `pcm_${sampleRate}`;

    console.log(`[TTS:ElevenLabs] Synthesizing stream: voiceId="${voiceId}" model="${model}" outputFormat="${outputFormat}"`);

    const response = await axios.post(
      `${ELEVENLABS_API_BASE}/text-to-speech/${voiceId}/stream?output_format=${outputFormat}`,
      {
        text,
        model_id: model,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      },
      {
        ...keepAliveAxiosConfig,
        headers: {
          'xi-api-key': config.apiKey,
          'Content-Type': 'application/json',
        },
        responseType: 'stream',
        timeout: 30000,
      }
    );

    const stream = response.data as NodeJS.ReadableStream;
    // For 8kHz 16-bit mono PCM: 1 sec = 16000 bytes. 40ms chunk = 640 bytes.
    // For 16kHz 16-bit mono PCM: 1 sec = 32000 bytes. 40ms chunk = 1280 bytes.
    const bytesPerSecond = sampleRate * 2;
    const chunkSize = Math.floor(bytesPerSecond * 0.04); // 40ms chunk size

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
}
