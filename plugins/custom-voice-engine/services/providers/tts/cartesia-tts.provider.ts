/**
 * ============================================================
 * Cartesia Sonic TTS Provider
 *
 * Text-to-Speech using Cartesia's ultra-low latency Sonic API (<90ms).
 * Streams raw linear PCM audio at 8kHz / 16kHz for telephony.
 * ============================================================
 */

import axios from 'axios';
import type { TtsConfig } from '../../../types';
import { BaseTtsProvider } from './tts-provider.interface';
import { keepAliveAxiosConfig } from '../http-agent';

const CARTESIA_TTS_URL = 'https://api.cartesia.ai/tts/bytes';

export class CartesiaTtsProvider extends BaseTtsProvider {
  readonly name = 'cartesia' as const;

  async synthesize(text: string, config: TtsConfig): Promise<Buffer> {
    const model = config.cartesiaModel || 'sonic-english';
    const voiceId = config.voice || '79a125e8-cd45-4c13-8a67-188112f4dd22'; // Barbershop default
    const sampleRate = config.outputFormat?.sampleRate || 8000;

    console.log(`[TTS:Cartesia] Synthesizing audio: voiceId="${voiceId}" model="${model}" sampleRate=${sampleRate}`);

    try {
      const response = await axios.post(
        CARTESIA_TTS_URL,
        {
          model_id: model,
          transcript: text,
          voice: {
            mode: 'id',
            id: voiceId,
          },
          output_format: {
            container: 'raw',
            encoding: 'pcm_s16le',
            sample_rate: sampleRate,
          },
        },
        {
          ...keepAliveAxiosConfig,
          headers: {
            'X-API-Key': config.apiKey,
            'Cartesia-Version': '2024-06-10',
            'Content-Type': 'application/json',
          },
          responseType: 'arraybuffer',
          timeout: 15000,
        }
      );

      return Buffer.from(response.data);
    } catch (err: any) {
      const errText = err.response?.data
        ? Buffer.isBuffer(err.response.data)
          ? err.response.data.toString()
          : JSON.stringify(err.response.data)
        : err.message;
      console.error(`[TTS:Cartesia] Synthesis failed:`, errText);
      throw new Error(`Cartesia TTS synthesis failed: ${err.message}`);
    }
  }

  async *synthesizeStream(text: string, config: TtsConfig): AsyncIterable<Buffer> {
    const audio = await this.synthesize(text, config);
    const chunkSize = 640; // 40ms of 8kHz 16-bit mono PCM
    for (let i = 0; i < audio.length; i += chunkSize) {
      yield audio.subarray(i, Math.min(i + chunkSize, audio.length));
    }
  }
}
