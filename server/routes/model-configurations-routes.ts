'use strict';
/**
 * Model Configurations Routes
 * 
 * Manages tenant-level AI Model & Voice Engine configurations:
 * - Managed Platform Mode (17 models across Google DeepMind, Groq, DeepSeek, Anthropic, OpenAI, Cerebras, Sarvam)
 * - BYOK Modular Pipeline Mode (Custom LLM, TTS, STT, Embeddings keys)
 * - Realtime Speech-to-Speech Mode (OpenAI Realtime / Gemini Live WebSockets)
 * - Upstream API Key verification against provider endpoints.
 * - Dual-sync to ve_provider_configs for audio engine harmony.
 * - Resolved runtime endpoint (/api/model-configurations/resolved) for zero-latency execution.
 */

import { Router, Response } from 'express';
import { db } from '../db';
import { sql } from 'drizzle-orm';
import { authenticateToken, type AuthRequest } from '../middleware/auth';

// Ensure user_model_configurations table exists on first load
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
   * Helper: Get platform root setting from ve_settings or plugin_settings
   */
  async function getPlatformSetting(key: string): Promise<string | null> {
    try {
      const res = await db.execute(sql`
        SELECT value FROM ve_settings WHERE key = ${key} LIMIT 1
      `);
      if ((res.rows as any[]).length > 0 && (res.rows[0] as any).value) {
        return (res.rows[0] as any).value;
      }
    } catch {
      // Ignore if table does not exist
    }
    return process.env[key.toUpperCase()] || null;
  }

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
              llmModel: 'gemini-2.0-flash',
              voiceId: 'sonic-katie',
              speed: 1.0,
              language: 'multi',
              temperature: 0.7,
              maxTokens: 300,
              fallbackEnabled: true,
            },
            pipeline_config: {
              llmProvider: 'gemini',
              llmApiKey: '',
              llmModel: 'gemini-2.0-flash',
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
              provider: 'gemini',
              apiKey: '',
              model: 'gemini-2.0-flash-exp',
              voice: 'Puck',
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
   * GET /api/model-configurations/resolved
   * Returns effective runtime configuration for execution engines.
   * Resolves whether user is in Managed Mode (with platform credentials) or BYOK (with user keys).
   */
  router.get('/api/model-configurations/resolved', auth, async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });

      // 1. Fetch user's saved configuration
      const userRes = await db.execute(sql`
        SELECT * FROM user_model_configurations WHERE user_id = ${userId} LIMIT 1
      `);
      const userConfig = (userRes.rows as any[])[0] || null;

      // 2. Check if master BYOK is permitted platform-wide
      const allowByokSetting = await getPlatformSetting('ve_allow_user_byok');
      const isByokAllowed = allowByokSetting !== 'false';

      let effectiveMode = userConfig?.active_mode || 'managed';
      if (!isByokAllowed && effectiveMode !== 'managed') {
        effectiveMode = 'managed';
      }

      const managedCfg = userConfig?.managed_config || {};
      const pipelineCfg = userConfig?.pipeline_config || {};
      const realtimeCfg = userConfig?.realtime_config || {};

      let resolved: any = {
        effectiveMode,
        isByokAllowed,
      };

      if (effectiveMode === 'managed') {
        // Platform Managed Mode: resolve default brain, STT, TTS
        const defaultLlm = managedCfg.llmModel || (await getPlatformSetting('ve_managed_default_llm')) || 'gemini-2.0-flash';
        const defaultStt = (await getPlatformSetting('ve_managed_default_stt')) || 'deepgram';
        const defaultTts = (await getPlatformSetting('ve_managed_default_tts')) || 'cartesia';
        const defaultTtsVoice = managedCfg.voiceId || (await getPlatformSetting('ve_managed_default_tts_voice')) || 'sonic-katie';

        resolved.llm = {
          provider: defaultLlm.includes('gemini') ? 'gemini'
            : defaultLlm.includes('llama') && !defaultLlm.includes('cerebras') ? 'groq'
            : defaultLlm.includes('deepseek') ? 'deepseek'
            : defaultLlm.includes('claude') ? 'anthropic'
            : defaultLlm.includes('cerebras') ? 'cerebras'
            : defaultLlm.includes('sarvam') ? 'sarvam'
            : 'openai',
          model: defaultLlm,
          temperature: managedCfg.temperature ?? 0.7,
          maxTokens: managedCfg.maxTokens ?? 300,
          isManaged: true,
        };

        resolved.stt = {
          provider: defaultStt,
          model: defaultStt === 'sarvam' ? 'saaras:v1' : 'nova-2-phonecall',
          isManaged: true,
        };

        resolved.tts = {
          provider: defaultTtsVoice.startsWith('sonic-') ? 'cartesia'
            : defaultTtsVoice.startsWith('bodhi-') || defaultTtsVoice.startsWith('navana-') ? 'navana'
            : defaultTtsVoice.startsWith('bulbul') || defaultTtsVoice === 'neha' || defaultTtsVoice === 'shubh' ? 'sarvam'
            : defaultTtsVoice.startsWith('aura-') ? 'deepgram'
            : defaultTtsVoice.startsWith('21m') || defaultTtsVoice.startsWith('eleven_') ? 'elevenlabs'
            : defaultTts,
          voiceId: defaultTtsVoice,
          speed: managedCfg.speed ?? 1.0,
          isManaged: true,
        };
      } else if (effectiveMode === 'byok-pipeline') {
        // BYOK Modular Pipeline
        resolved.llm = {
          provider: pipelineCfg.llmProvider || 'gemini',
          model: pipelineCfg.llmModel || 'gemini-2.0-flash',
          apiKey: pipelineCfg.llmApiKey || null,
          isManaged: false,
        };
        resolved.stt = {
          provider: pipelineCfg.sttProvider || 'deepgram',
          model: pipelineCfg.sttModel || 'nova-2-phonecall',
          apiKey: pipelineCfg.sttApiKey || null,
          isManaged: false,
        };
        resolved.tts = {
          provider: pipelineCfg.ttsProvider || 'cartesia',
          voiceId: pipelineCfg.ttsVoiceId || 'sonic-katie',
          apiKey: pipelineCfg.ttsApiKey || null,
          isManaged: false,
        };
      } else if (effectiveMode === 'byok-realtime') {
        // BYOK Realtime Speech-to-Speech
        resolved.sts = {
          provider: realtimeCfg.provider || 'gemini',
          model: realtimeCfg.model || 'gemini-2.0-flash-exp',
          voice: realtimeCfg.voice || 'Puck',
          apiKey: realtimeCfg.apiKey || null,
          vadThreshold: realtimeCfg.vadThreshold ?? 0.5,
          silenceDurationMs: realtimeCfg.silenceDurationMs ?? 500,
          isManaged: false,
        };
      }

      res.json({ success: true, data: resolved });
    } catch (err: any) {
      console.error('[ModelConfigs] Resolved error:', err.message);
      res.status(500).json({ error: 'Failed to resolve runtime configuration' });
    }
  });

  /**
   * PUT /api/model-configurations
   * Saves or updates current user's model configuration and dual-syncs to ve_provider_configs
   */
  router.put('/api/model-configurations', auth, async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });

      const { active_mode, managed_config, pipeline_config, realtime_config } = req.body;

      // 1. Persist to user_model_configurations
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

      // 2. Dual-Sync to ve_provider_configs for audio pipeline compatibility
      try {
        if (active_mode === 'byok-pipeline' && pipeline_config) {
          await db.execute(sql`
            INSERT INTO ve_provider_configs (
              user_id, 
              stt_provider, stt_api_key, 
              llm_provider, llm_api_key, llm_model, 
              tts_provider, tts_api_key, tts_voice, 
              updated_at
            )
            VALUES (
              ${userId},
              ${pipeline_config.sttProvider || 'deepgram'},
              ${pipeline_config.sttApiKey || null},
              ${pipeline_config.llmProvider || 'gemini'},
              ${pipeline_config.llmApiKey || null},
              ${pipeline_config.llmModel || 'gemini-2.0-flash'},
              ${pipeline_config.ttsProvider || 'cartesia'},
              ${pipeline_config.ttsApiKey || null},
              ${pipeline_config.ttsVoiceId || 'sonic-katie'},
              NOW()
            )
            ON CONFLICT (user_id) DO UPDATE SET
              stt_provider = COALESCE(EXCLUDED.stt_provider, ve_provider_configs.stt_provider),
              stt_api_key = CASE WHEN ${pipeline_config.sttApiKey || null} IS NOT NULL THEN ${pipeline_config.sttApiKey || null} ELSE ve_provider_configs.stt_api_key END,
              llm_provider = COALESCE(EXCLUDED.llm_provider, ve_provider_configs.llm_provider),
              llm_api_key = CASE WHEN ${pipeline_config.llmApiKey || null} IS NOT NULL THEN ${pipeline_config.llmApiKey || null} ELSE ve_provider_configs.llm_api_key END,
              llm_model = COALESCE(EXCLUDED.llm_model, ve_provider_configs.llm_model),
              tts_provider = COALESCE(EXCLUDED.tts_provider, ve_provider_configs.tts_provider),
              tts_api_key = CASE WHEN ${pipeline_config.ttsApiKey || null} IS NOT NULL THEN ${pipeline_config.ttsApiKey || null} ELSE ve_provider_configs.tts_api_key END,
              tts_voice = COALESCE(EXCLUDED.tts_voice, ve_provider_configs.tts_voice),
              updated_at = NOW()
          `);
        } else if (active_mode === 'byok-realtime' && realtime_config) {
          await db.execute(sql`
            INSERT INTO ve_provider_configs (
              user_id, 
              llm_provider, llm_api_key, llm_model, 
              tts_voice, 
              updated_at
            )
            VALUES (
              ${userId},
              ${realtime_config.provider || 'gemini'},
              ${realtime_config.apiKey || null},
              ${realtime_config.model || 'gemini-2.0-flash-exp'},
              ${realtime_config.voice || 'Puck'},
              NOW()
            )
            ON CONFLICT (user_id) DO UPDATE SET
              llm_provider = COALESCE(EXCLUDED.llm_provider, ve_provider_configs.llm_provider),
              llm_api_key = CASE WHEN ${realtime_config.apiKey || null} IS NOT NULL THEN ${realtime_config.apiKey || null} ELSE ve_provider_configs.llm_api_key END,
              llm_model = COALESCE(EXCLUDED.llm_model, ve_provider_configs.llm_model),
              tts_voice = COALESCE(EXCLUDED.tts_voice, ve_provider_configs.tts_voice),
              updated_at = NOW()
          `);
        } else if (active_mode === 'managed' && managed_config) {
          await db.execute(sql`
            INSERT INTO ve_provider_configs (
              user_id,
              llm_model,
              tts_voice,
              updated_at
            )
            VALUES (
              ${userId},
              ${managed_config.llmModel || 'gemini-2.0-flash'},
              ${managed_config.voiceId || 'sonic-katie'},
              NOW()
            )
            ON CONFLICT (user_id) DO UPDATE SET
              llm_model = COALESCE(EXCLUDED.llm_model, ve_provider_configs.llm_model),
              tts_voice = COALESCE(EXCLUDED.tts_voice, ve_provider_configs.tts_voice),
              updated_at = NOW()
          `);
        }
      } catch (syncErr: any) {
        console.warn('[ModelConfigs] Dual-sync warning to ve_provider_configs:', syncErr.message);
      }

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
        case 'gemini':
        case 'google':
          testUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash?key=${key}`;
          headers = {};
          break;
        case 'openrouter':
          testUrl = 'https://openrouter.ai/api/v1/models';
          headers = { Authorization: `Bearer ${key}` };
          break;
        case 'sarvam':
          testUrl = 'https://api.sarvam.ai/models';
          headers = { 'api-subscription-key': key };
          break;
        case 'navana':
          testUrl = 'https://api.navana.ai/v1/models';
          headers = { Authorization: `Bearer ${key}`, 'x-api-key': key };
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
