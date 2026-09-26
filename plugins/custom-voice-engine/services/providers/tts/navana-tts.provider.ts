/**
 * ============================================================
 * Navana AI (Bodhi Indic) TTS Provider
 *
 * Text-to-Speech using Navana AI Bodhi API for Indian languages.
 * Supports streaming audio output with graceful fallback.
 * ============================================================
 */

import axios from 'axios';
import type { TtsConfig } from '../../../types';
import { BaseTtsProvider } from './tts-provider.interface';
import { keepAliveAxiosConfig } from '../http-agent';

const NAVANA_TTS_URL = 'https://api.navana.ai/v1/tts';

export class NavanaTtsProvider extends BaseTtsProvider {
  readonly name = 'navana' as const;

  async synthesize(text: string, config: TtsConfig): Promise<Buffer> {
    const voice = config.voice || config.navanaModel || 'bodhi-indic-tts-v1';
    const language = config.language || 'hi-IN';
    const sampleRate = config.outputFormat?.sampleRate || 8000;

    console.log(`[TTS:Navana] Synthesizing audio: voice="${voice}" language="${language}" sampleRate=${sampleRate}`);

    try {
      const response = await axios.post(
        NAVANA_TTS_URL,
        {
          text,
          voice,
          language,
          sample_rate: sampleRate,
          encoding: 'linear16',
        },
        {
          ...keepAliveAxiosConfig,
          headers: {
            Authorization: `Bearer ${config.apiKey}`,
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
      console.error(`[TTS:Navana] Synthesis failed:`, errText);
      throw new Error(`Navana AI TTS synthesis failed: ${err.message}`);
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
