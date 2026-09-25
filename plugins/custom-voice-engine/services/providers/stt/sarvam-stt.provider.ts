/**
 * ============================================================
 * Sarvam AI STT Provider
 *
 * Streaming Speech-to-Text using Sarvam AI's WebSocket API.
 * Supports Indian languages and multilingual transcription.
 * ============================================================
 */

import WebSocket from 'ws';
import type { SttConfig, SttTranscript, AudioFormat } from '../../../types';
import { BaseSttProvider } from './stt-provider.interface';

export class SarvamSttProvider extends BaseSttProvider {
  readonly name = 'sarvam' as const;
  private ws: WebSocket | null = null;
  private isClosing = false;

  async connect(config: SttConfig, format: AudioFormat): Promise<void> {
    this.config = config;
    this.format = format;
    this.connected = false;
    this.isClosing = false;

    console.log(`[STT:Sarvam] Connecting with format:`, format);

    return new Promise<void>((resolve, reject) => {
      const languageCode = this.config!.detectLanguage
        ? 'unknown'
        : (this.config!.sarvamLanguageCode || this.mapLanguage(this.config!.language));
      const model = this.config!.sarvamModel || 'saaras:v3';

      // Connect to the Sarvam Speech-to-Text WebSocket endpoint
      const url = `wss://api.sarvam.ai/speech-to-text/ws?language-code=${languageCode}&model=${model}`;
      console.log(`[STT:Sarvam] Connecting WebSocket to URL: ${url}`);

      this.ws = new WebSocket(url, {
        headers: {
          'api-subscription-key': this.config!.apiKey,
        },
      });

      const timeout = setTimeout(() => {
        if (!this.connected) {
          reject(new Error('Sarvam STT WebSocket connection timeout'));
          this.ws?.close();
        }
      }, 10000);

      this.ws.on('open', () => {
        clearTimeout(timeout);
        this.connected = true;
        console.log('[STT:Sarvam] WebSocket connected');
        resolve();
      });

      this.ws.on('message', (data: WebSocket.Data) => {
        try {
          const messageStr = data.toString();
          const response = JSON.parse(messageStr);
          if (response.type === 'data' && response.data?.transcript) {
            const transcript: SttTranscript = {
              text: response.data.transcript,
              isFinal: true, // Sarvam real-time transcript segment
              confidence: response.data.confidence || 0.85,
              language: response.data.language_code || languageCode,
              duration: (response.data.metrics?.audio_duration || 0) * 1000,
            };
            console.log(`[STT:Sarvam] EMITTING transcript: "${response.data.transcript.substring(0, 100)}"`);
            this.emitTranscript(transcript);
          }
        } catch (err: any) {
          console.error(`[STT:Sarvam] Failed to parse message:`, err.message);
        }
      });

      this.ws.on('error', (err) => {
        console.error('[STT:Sarvam] WebSocket error:', err.message);
        this.emitError(err);
        if (!this.connected) {
          clearTimeout(timeout);
          reject(err);
        }
      });

      this.ws.on('close', () => {
        console.log('[STT:Sarvam] WebSocket closed');
        this.connected = false;
      });
    });
  }

  sendAudio(chunk: Buffer): void {
    if (!this.connected || !this.ws || this.ws.readyState !== WebSocket.OPEN) return;
    try {
      const sampleRate = this.format?.sampleRate || 8000;
      const base64Data = chunk.toString('base64');
      const payload = {
        audio: {
          data: base64Data,
          sample_rate: String(sampleRate),
          encoding: 'pcm_s16le',
        },
      };
      this.ws.send(JSON.stringify(payload));
    } catch (err: any) {
      console.error('[STT:Sarvam] Failed to send audio chunk:', err.message);
    }
  }

  async flush(force = true): Promise<void> {
    // No-op for WebSocket streaming
  }

  async close(): Promise<void> {
    this.isClosing = true;
    this.connected = false;
    if (this.ws) {
      if (this.ws.readyState === WebSocket.OPEN) {
        this.ws.close();
      }
      this.ws = null;
    }
    this.transcriptCallbacks = [];
    this.errorCallbacks = [];
    console.log('[STT:Sarvam] Provider closed');
  }

  private mapLanguage(lang: string | undefined): string {
    if (!lang) return 'en-IN';
    
    // Normalize input (e.g., 'en-US' -> 'en', 'hi_IN' -> 'hi')
    const baseLang = lang.split(/[-_]/)[0].toLowerCase();

    const langMap: Record<string, string> = {
      en: 'en-IN',
      hi: 'hi-IN',
      bn: 'bn-IN',
      kn: 'kn-IN',
      ml: 'ml-IN',
      mr: 'mr-IN',
      od: 'od-IN',
      pa: 'pa-IN',
      ta: 'ta-IN',
      te: 'te-IN',
      gu: 'gu-IN',
      as: 'as-IN',
      ur: 'ur-IN',
      ne: 'ne-IN',
    };

    return langMap[baseLang] || 'en-IN';
  }
}
