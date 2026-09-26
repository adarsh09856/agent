'use strict';
/**
 * Model Configurations Routes
 * 
 * Manages tenant-level AI Model & Voice Engine configurations:
 * - Managed Platform Mode (Groq + Cartesia/Navana + Deepgram)
 * - BYOK Pipeline Mode (Custom LLM, TTS, STT, Embeddings keys)
 * - Realtime Speech-to-Speech Mode (OpenAI Realtime / Gemini Live)
 * - Real Upstream API Key verification against provider endpoints.
 */

import { Router, Response } from 'express';
import { db } from '../db';
import { sql } from 'drizzle-orm';
import { authenticateToken, type AuthRequest } from '../middleware/auth';

// Ensure table exists on first load
(async () => {
  try {
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS user_model_configurations (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR NOT NULL UNIQUE,
        active_mode TEXT NOT NULL DEFAULT 'managed',
        managed_config JSONB NOT NULL DEFAULT '{}'::jsonb,
        pipeline_config JSONB NOT NULL DEFAULT '{}'::jsonb,
        realtime_config JSONB NOT NULL DEFAULT '{}'::jsonb,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);
    console.log('[ModelConfigs] user_model_configurations table ready');
  } catch (err: any) {
    console.error('[ModelConfigs] Init error:', err.message);
  }
})();

export function createModelConfigurationsRoutes(): Router {
  const router = Router();
  const auth = authenticateToken as unknown as import('express').RequestHandler;

  /**
   * GET /api/model-configurations
   * Returns current user's model configuration
   */
  router.get('/api/model-configurations', auth, async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });

      const result = await db.execute(sql`
        SELECT * FROM user_model_configurations WHERE user_id = ${userId} LIMIT 1
      `);

      if ((result.rows as any[]).length === 0) {
        return res.json({
          success: true,
          data: {
            active_mode: 'managed',
            managed_config: {
              voiceId: 'sonic-katie',
              speed: 1.0,
              language: 'multi',
              temperature: 0.7,
              maxTokens: 300,
              fallbackEnabled: true,
            },
            pipeline_config: {
              llmProvider: 'groq',
              llmApiKey: '',
              llmModel: 'llama-3.3-70b-versatile',
              ttsProvider: 'cartesia',
              ttsApiKey: '',
              ttsVoiceId: 'sonic-katie',
              sttProvider: 'deepgram',
              sttApiKey: '',
              sttModel: 'nova-2-phonecall',
              embeddingProvider: 'openai',
              embeddingApiKey: '',
            },
            realtime_config: {
              provider: 'openai',
              apiKey: '',
              model: 'gpt-4o-realtime-preview',
              voice: 'alloy',
              temperature: 0.8,
              vadThreshold: 0.5,
              silenceDurationMs: 500,
            }
          }
        });
      }

      const row: any = result.rows[0];
      res.json({
        success: true,
        data: {
          active_mode: row.active_mode,
          managed_config: row.managed_config,
          pipeline_config: row.pipeline_config,
          realtime_config: row.realtime_config,
          updated_at: row.updated_at,
        }
      });
    } catch (err: any) {
      console.error('[ModelConfigs] GET error:', err.message);
      res.status(500).json({ error: 'Failed to fetch model configuration' });
    }
  });

  /**
   * PUT /api/model-configurations
   * Saves or updates current user's model configuration
   */
  router.put('/api/model-configurations', auth, async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });

      const { active_mode, managed_config, pipeline_config, realtime_config } = req.body;

      const result = await db.execute(sql`
        INSERT INTO user_model_configurations (user_id, active_mode, managed_config, pipeline_config, realtime_config, updated_at)
        VALUES (
          ${userId},
          ${active_mode || 'managed'},
          ${JSON.stringify(managed_config || {})}::jsonb,
          ${JSON.stringify(pipeline_config || {})}::jsonb,
          ${JSON.stringify(realtime_config || {})}::jsonb,
          NOW()
        )
        ON CONFLICT (user_id) DO UPDATE SET
          active_mode = EXCLUDED.active_mode,
          managed_config = EXCLUDED.managed_config,
          pipeline_config = EXCLUDED.pipeline_config,
          realtime_config = EXCLUDED.realtime_config,
          updated_at = NOW()
        RETURNING *
      `);

      res.json({ success: true, data: result.rows[0] });
    } catch (err: any) {
      console.error('[ModelConfigs] PUT error:', err.message);
      res.status(500).json({ error: 'Failed to save model configuration' });
    }
  });

  /**
   * POST /api/model-configurations/test-key
   * Real upstream verification of provider API keys
   */
  router.post('/api/model-configurations/test-key', auth, async (req: AuthRequest, res: Response) => {
    try {
      const { provider, apiKey } = req.body;

      if (!apiKey || typeof apiKey !== 'string' || apiKey.trim() === '') {
        return res.status(400).json({ success: false, error: 'API key is required' });
      }

      const key = apiKey.trim();
      let testUrl = '';
      let headers: Record<string, string> = {};

      switch (provider?.toLowerCase()) {
        case 'groq':
          testUrl = 'https://api.groq.com/openai/v1/models';
          headers = { Authorization: `Bearer ${key}` };
          break;
        case 'openai':
          testUrl = 'https://api.openai.com/v1/models';
          headers = { Authorization: `Bearer ${key}` };
          break;
        case 'anthropic':
          testUrl = 'https://api.anthropic.com/v1/models';
          headers = { 'x-api-key': key, 'anthropic-version': '2023-06-01' };
          break;
        case 'deepgram':
          testUrl = 'https://api.deepgram.com/v1/projects';
          headers = { Authorization: `Token ${key}` };
          break;
        case 'cartesia':
          testUrl = 'https://api.cartesia.ai/voices';
          headers = { 'X-API-Key': key, 'Cartesia-Version': '2024-06-10' };
          break;
        case 'elevenlabs':
          testUrl = 'https://api.elevenlabs.io/v1/user';
          headers = { 'xi-api-key': key };
          break;
        case 'cerebras':
          testUrl = 'https://api.cerebras.ai/v1/models';
          headers = { Authorization: `Bearer ${key}` };
          break;
        case 'deepseek':
          testUrl = 'https://api.deepseek.com/models';
          headers = { Authorization: `Bearer ${key}` };
          break;
        default:
          return res.status(400).json({ success: false, error: `Unsupported provider: ${provider}` });
      }

      // Execute real fetch with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      try {
        const upstreamRes = await fetch(testUrl, {
          method: 'GET',
          headers,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (upstreamRes.ok) {
          return res.json({
            success: true,
            status: upstreamRes.status,
            message: `Key verified successfully with ${provider}!`,
          });
        } else {
          const errText = await upstreamRes.text().catch(() => '');
          return res.status(400).json({
            success: false,
            status: upstreamRes.status,
            error: `Provider rejected key (HTTP ${upstreamRes.status}): ${errText.slice(0, 150)}`,
          });
        }
      } catch (fetchErr: any) {
        clearTimeout(timeoutId);
        if (fetchErr.name === 'AbortError') {
          return res.status(504).json({ success: false, error: `Connection to ${provider} timed out.` });
        }
        return res.status(502).json({ success: false, error: `Failed to connect to ${provider}: ${fetchErr.message}` });
      }
    } catch (err: any) {
      console.error('[ModelConfigs] Test key error:', err.message);
      res.status(500).json({ success: false, error: 'Internal server error while testing key' });
    }
  });

  return router;
}
