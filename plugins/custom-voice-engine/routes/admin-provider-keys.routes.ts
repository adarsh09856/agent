/**
 * ============================================================
 * Admin Provider Keys Routes
 *
 * Admin panel routes for managing global provider API keys
 * and active provider selections for the Custom Voice Engine.
 *
 * Keys are stored in the global_settings table with
 * ve_* prefixed keys.
 * ============================================================
 */

import { Router, Request, Response } from 'express';
import { db } from '../../../server/db';
import { sql, eq, inArray } from 'drizzle-orm';
import { globalSettings } from '../../../shared/schema';

// const SETTINGS_KEYS = {
//   // Active provider selections
//   sttActiveProvider: 've_stt_active_provider',
//   llmActiveProvider: 've_llm_active_provider',
//   ttsActiveProvider: 've_tts_active_provider',

//   // API keys
//   deepgramApiKey: 've_deepgram_api_key',
//   sarvamApiKey: 've_sarvam_api_key',
//   openrouterApiKey: 've_openrouter_api_key',

//   // Models
//   sttDefaultModel: 've_stt_default_model',
//   ttsDefaultModel: 've_tts_default_model',
//   llmDefaultModel: 've_llm_default_model',

//   // FreeSWITCH
//   freeswitchEslHost: 've_freeswitch_esl_host',
//   freeswitchEslPort: 've_freeswitch_esl_port',
//   freeswitchEslPassword: 've_freeswitch_esl_password',

//   // Plugin enabled
//   pluginEnabled: 've_plugin_enabled',
// };


const SETTINGS_KEYS = {
  // Active provider selections
  sttActiveProvider: 've_stt_active_provider',
  llmActiveProvider: 've_llm_active_provider',
  ttsActiveProvider: 've_tts_active_provider',

  // Allowed LLMs array (JSON array of strings)
  llmAllowedModels: 've_llm_allowed_models',
  
  // Allowed providers arrays (JSON array of strings)
  sttAllowedProviders: 've_stt_allowed_providers',
  ttsAllowedProviders: 've_tts_allowed_providers',

  // API keys
  deepgramApiKey: 've_deepgram_api_key',
  sarvamApiKey: 've_sarvam_api_key',
  openrouterApiKey: 've_openrouter_api_key',
  geminiApiKey: 've_gemini_api_key',
  groqApiKey: 've_groq_api_key',
  openaiApiKey: 've_openai_api_key',
  deepseekApiKey: 've_deepseek_api_key',
  anthropicApiKey: 've_anthropic_api_key',
  elevenlabsApiKey: 've_elevenlabs_api_key',
  navanaApiKey: 've_navana_api_key',
  cartesiaApiKey: 've_cartesia_api_key',
  callhippoApiKey: 've_callhippo_api_key',
  telecmiAppId: 've_telecmi_app_id',
  telecmiSecret: 've_telecmi_secret',
  voicelinkHost: 've_voicelink_host',

  // Models (per-provider, so switching providers doesn't lose the other's selection)
  sttDeepgramModel: 've_stt_deepgram_model',
  sttDeepgramAllowedModels: 've_stt_deepgram_allowed_models',
  sttSarvamModel: 've_stt_sarvam_model',
  sttSarvamAllowedModels: 've_stt_sarvam_allowed_models',
  llmDefaultModel: 've_llm_default_model',
  ttsDeepgramModel: 've_tts_deepgram_model',
  ttsDeepgramAllowedModels: 've_tts_deepgram_allowed_models',
  ttsSarvamModel: 've_tts_sarvam_model',
  ttsSarvamAllowedModels: 've_tts_sarvam_allowed_models',
  ttsSarvamSpeaker: 've_tts_sarvam_speaker',
  ttsElevenlabsModel: 've_tts_elevenlabs_model',
  ttsElevenlabsAllowedModels: 've_tts_elevenlabs_allowed_models',
  ttsNavanaModel: 've_tts_navana_model',
  ttsNavanaAllowedModels: 've_tts_navana_allowed_models',
  ttsCartesiaModel: 've_tts_cartesia_model',
  ttsCartesiaAllowedModels: 've_tts_cartesia_allowed_models',

  // FreeSWITCH
  freeswitchEslHost: 've_freeswitch_esl_host',
  freeswitchEslPort: 've_freeswitch_esl_port',
  freeswitchEslPassword: 've_freeswitch_esl_password',

  // Plugin enabled
  pluginEnabled: 've_plugin_enabled',

  // Master BYOK Switch
  allowUserByok: 'allow_user_byok',
};

/** Strict boolean parser for database-stored values */
function toBool(val: any, defaultVal = true): boolean {
  if (val === undefined || val === null) return defaultVal;
  if (val === false || val === 'false' || val === 0 || val === '0') return false;
  if (val === true || val === 'true' || val === 1 || val === '1') return true;
  return Boolean(val);
}

/** Mask an API key for display: show only last 4 characters */
function maskKey(key: string | null | undefined): string {
  if (!key) return '';
  if (key.length <= 4) return '****';
  return '•'.repeat(Math.min(key.length - 4, 20)) + key.slice(-4);
}

/** Extract string value from jsonb-stored setting, unwrapping accidental quotes */
function extractValue(val: any): any {
  if (val === null || val === undefined) return null;
  if (typeof val === 'string') {
    const trimmed = val.trim();
    if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
      try {
        return JSON.parse(trimmed);
      } catch {
        return trimmed.slice(1, -1);
      }
    }
    return trimmed;
  }
  if (typeof val === 'object' && val !== null) return val;
  return val;
}

export function createAdminProviderKeysRouter(): Router {
  const router = Router();

  /**
   * GET /api/voice-engine/admin/provider-keys
   * Returns all provider settings with API keys masked
   */
  // router.get('/', async (_req: Request, res: Response) => {
  //   try {
  //     const allKeys = Object.values(SETTINGS_KEYS);
  //     const results = await db
  //       .select()
  //       .from(globalSettings)
  //       .where(inArray(globalSettings.key, allKeys));

  //     const settingsMap: Record<string, any> = {};
  //     for (const row of results) {
  //       settingsMap[row.key] = extractValue(row.value);
  //     }

  //     // Build response with masked keys
  //     const response = {
  //       stt: {
  //         activeProvider: settingsMap[SETTINGS_KEYS.sttActiveProvider] || 'deepgram',
  //         defaultModel: settingsMap[SETTINGS_KEYS.sttDefaultModel] || 'nova-2',
  //         providers: {
  //           deepgram: {
  //             name: 'Deepgram',
  //             hasKey: !!settingsMap[SETTINGS_KEYS.deepgramApiKey],
  //             maskedKey: maskKey(settingsMap[SETTINGS_KEYS.deepgramApiKey] as string),
  //           },
  //           sarvam: {
  //             name: 'Sarvam AI',
  //             hasKey: !!settingsMap[SETTINGS_KEYS.sarvamApiKey],
  //             maskedKey: maskKey(settingsMap[SETTINGS_KEYS.sarvamApiKey] as string),
  //           },
  //         },
  //       },
  //       llm: {
  //         activeProvider: settingsMap[SETTINGS_KEYS.llmActiveProvider] || 'openrouter',
  //         defaultModel: settingsMap[SETTINGS_KEYS.llmDefaultModel] || 'openai/gpt-4o-mini',
  //         providers: {
  //           openrouter: {
  //             name: 'OpenRouter',
  //             hasKey: !!settingsMap[SETTINGS_KEYS.openrouterApiKey],
  //             maskedKey: maskKey(settingsMap[SETTINGS_KEYS.openrouterApiKey] as string),
  //           },
  //         },
  //       },
  //       tts: {
  //         activeProvider: settingsMap[SETTINGS_KEYS.ttsActiveProvider] || 'deepgram',
  //         providers: {
  //           deepgram: {
  //             name: 'Deepgram',
  //             hasKey: !!settingsMap[SETTINGS_KEYS.deepgramApiKey],
  //             maskedKey: maskKey(settingsMap[SETTINGS_KEYS.deepgramApiKey] as string),
  //           },
  //           sarvam: {
  //             name: 'Sarvam AI',
  //             hasKey: !!settingsMap[SETTINGS_KEYS.sarvamApiKey],
  //             maskedKey: maskKey(settingsMap[SETTINGS_KEYS.sarvamApiKey] as string),
  //           },
  //         },
  //       },
  //       freeswitch: {
  //         eslHost: settingsMap[SETTINGS_KEYS.freeswitchEslHost] || '127.0.0.1',
  //         eslPort: settingsMap[SETTINGS_KEYS.freeswitchEslPort] || 8021,
  //         eslPassword: settingsMap[SETTINGS_KEYS.freeswitchEslPassword] ? '••••••' : '',
  //       },
  //       pluginEnabled: settingsMap[SETTINGS_KEYS.pluginEnabled] ?? true,
  //     };

  //     res.json({ success: true, data: response });
  //   } catch (err: any) {
  //     console.error('[VE Admin Keys] Error fetching provider keys:', err);
  //     res.status(500).json({ success: false, error: `Failed to fetch provider settings: ${err.message}`, stack: err.stack });
  //   }
  // });


  
  
  router.get('/', async (_req: Request, res: Response) => {
    try {
      const allKeys = Object.values(SETTINGS_KEYS);
      const results = await db
        .select()
        .from(globalSettings)
        .where(inArray(globalSettings.key, allKeys));

      const settingsMap: Record<string, any> = {};
      for (const row of results) {
        settingsMap[row.key] = extractValue(row.value);
      }

      // Helper to parse allowed arrays
      const parseAllowedArray = (key: string, defaultArray: string[]) => {
        const val = settingsMap[key];
        if (!val) return defaultArray;
        if (Array.isArray(val)) return val;
        if (typeof val === 'string') {
          try {
            const parsed = JSON.parse(val);
            if (Array.isArray(parsed)) return parsed;
            return [parsed];
          } catch (e) {
            return [val];
          }
        }
        return defaultArray;
      };

      // Build response with masked keys
      const response = {
        stt: {
          activeProvider: settingsMap[SETTINGS_KEYS.sttActiveProvider] || 'deepgram',
          allowedProviders: parseAllowedArray(SETTINGS_KEYS.sttAllowedProviders, ['deepgram']),
          defaultModel: settingsMap[SETTINGS_KEYS.sttActiveProvider] === 'sarvam'
            ? (settingsMap[SETTINGS_KEYS.sttSarvamModel] || 'saaras:v3')
            : (settingsMap[SETTINGS_KEYS.sttDeepgramModel] || 'nova-2'),
          deepgramModel: settingsMap[SETTINGS_KEYS.sttDeepgramModel] || 'nova-2',
          deepgramAllowedModels: parseAllowedArray(SETTINGS_KEYS.sttDeepgramAllowedModels, ['nova-2', 'nova-2-phonecall']),
          sarvamModel: settingsMap[SETTINGS_KEYS.sttSarvamModel] || 'saaras:v3',
          sarvamAllowedModels: parseAllowedArray(SETTINGS_KEYS.sttSarvamAllowedModels, ['saaras:v3']),
          providers: {
            deepgram: {
              name: 'Deepgram',
              hasKey: !!settingsMap[SETTINGS_KEYS.deepgramApiKey],
              maskedKey: maskKey(settingsMap[SETTINGS_KEYS.deepgramApiKey] as string),
            },
            sarvam: {
              name: 'Sarvam AI',
              hasKey: !!settingsMap[SETTINGS_KEYS.sarvamApiKey],
              maskedKey: maskKey(settingsMap[SETTINGS_KEYS.sarvamApiKey] as string),
            },
          },
        },
        llm: {
          activeProvider: settingsMap[SETTINGS_KEYS.llmActiveProvider] || 'gemini',
          defaultModel: settingsMap[SETTINGS_KEYS.llmDefaultModel] || 'gemini-2.0-flash',
          allowedModels: parseAllowedArray(SETTINGS_KEYS.llmAllowedModels, ['gemini-2.0-flash', 'llama-3.3-70b-versatile', 'gpt-4o-mini', 'claude-3-5-sonnet', 'deepseek-chat']),
          providers: {
            gemini: {
              name: 'Google Gemini',
              hasKey: !!settingsMap[SETTINGS_KEYS.geminiApiKey],
              maskedKey: maskKey(settingsMap[SETTINGS_KEYS.geminiApiKey] as string),
            },
            groq: {
              name: 'Groq',
              hasKey: !!settingsMap[SETTINGS_KEYS.groqApiKey],
              maskedKey: maskKey(settingsMap[SETTINGS_KEYS.groqApiKey] as string),
            },
            openai: {
              name: 'OpenAI',
              hasKey: !!settingsMap[SETTINGS_KEYS.openaiApiKey],
              maskedKey: maskKey(settingsMap[SETTINGS_KEYS.openaiApiKey] as string),
            },
            deepseek: {
              name: 'DeepSeek',
              hasKey: !!settingsMap[SETTINGS_KEYS.deepseekApiKey],
              maskedKey: maskKey(settingsMap[SETTINGS_KEYS.deepseekApiKey] as string),
            },
            anthropic: {
              name: 'Anthropic',
              hasKey: !!settingsMap[SETTINGS_KEYS.anthropicApiKey],
              maskedKey: maskKey(settingsMap[SETTINGS_KEYS.anthropicApiKey] as string),
            },
            openrouter: {
              name: 'OpenRouter',
              hasKey: !!settingsMap[SETTINGS_KEYS.openrouterApiKey],
              maskedKey: maskKey(settingsMap[SETTINGS_KEYS.openrouterApiKey] as string),
            },
          },
        },
        tts: {
          activeProvider: settingsMap[SETTINGS_KEYS.ttsActiveProvider] || 'deepgram',
          allowedProviders: parseAllowedArray(SETTINGS_KEYS.ttsAllowedProviders, ['deepgram']),
          defaultModel: settingsMap[SETTINGS_KEYS.ttsActiveProvider] === 'navana'
            ? (settingsMap[SETTINGS_KEYS.ttsNavanaModel] || 'bodhi-indic-tts-v1')
            : settingsMap[SETTINGS_KEYS.ttsActiveProvider] === 'cartesia'
            ? (settingsMap[SETTINGS_KEYS.ttsCartesiaModel] || 'sonic-english')
            : settingsMap[SETTINGS_KEYS.ttsActiveProvider] === 'sarvam'
            ? (settingsMap[SETTINGS_KEYS.ttsSarvamModel] || 'bulbul:v3')
            : settingsMap[SETTINGS_KEYS.ttsActiveProvider] === 'elevenlabs'
            ? (settingsMap[SETTINGS_KEYS.ttsElevenlabsModel] || 'eleven_turbo_v2_5')
            : (settingsMap[SETTINGS_KEYS.ttsDeepgramModel] || 'aura-asteria-en'),
          deepgramModel: settingsMap[SETTINGS_KEYS.ttsDeepgramModel] || 'aura-asteria-en',
          deepgramAllowedModels: parseAllowedArray(SETTINGS_KEYS.ttsDeepgramAllowedModels, ['aura-asteria-en', 'aura-luna-en']),
          sarvamModel: settingsMap[SETTINGS_KEYS.ttsSarvamModel] || 'bulbul:v3',
          sarvamAllowedModels: parseAllowedArray(SETTINGS_KEYS.ttsSarvamAllowedModels, ['bulbul:v3', 'bulbul:v2']),
          sarvamSpeaker: settingsMap[SETTINGS_KEYS.ttsSarvamSpeaker] || 'neha',
          elevenlabsModel: settingsMap[SETTINGS_KEYS.ttsElevenlabsModel] || 'eleven_turbo_v2_5',
          elevenlabsAllowedModels: parseAllowedArray(SETTINGS_KEYS.ttsElevenlabsAllowedModels, ['eleven_turbo_v2_5', 'eleven_turbo_v2']),
          navanaModel: settingsMap[SETTINGS_KEYS.ttsNavanaModel] || 'bodhi-indic-tts-v1',
          navanaAllowedModels: parseAllowedArray(SETTINGS_KEYS.ttsNavanaAllowedModels, ['bodhi-indic-tts-v1']),
          cartesiaModel: settingsMap[SETTINGS_KEYS.ttsCartesiaModel] || 'sonic-english',
          cartesiaAllowedModels: parseAllowedArray(SETTINGS_KEYS.ttsCartesiaAllowedModels, ['sonic-english', 'sonic-multilingual']),
          providers: {
            deepgram: {
              name: 'Deepgram',
              hasKey: !!settingsMap[SETTINGS_KEYS.deepgramApiKey],
              maskedKey: maskKey(settingsMap[SETTINGS_KEYS.deepgramApiKey] as string),
            },
            sarvam: {
              name: 'Sarvam AI',
              hasKey: !!settingsMap[SETTINGS_KEYS.sarvamApiKey],
              maskedKey: maskKey(settingsMap[SETTINGS_KEYS.sarvamApiKey] as string),
            },
            elevenlabs: {
              name: 'ElevenLabs',
              hasKey: !!settingsMap[SETTINGS_KEYS.elevenlabsApiKey],
              maskedKey: maskKey(settingsMap[SETTINGS_KEYS.elevenlabsApiKey] as string),
            },
            navana: {
              name: 'Navana AI (Bodhi Indic TTS)',
              hasKey: !!settingsMap[SETTINGS_KEYS.navanaApiKey],
              maskedKey: maskKey(settingsMap[SETTINGS_KEYS.navanaApiKey] as string),
            },
            cartesia: {
              name: 'Cartesia Sonic (90ms)',
              hasKey: !!settingsMap[SETTINGS_KEYS.cartesiaApiKey],
              maskedKey: maskKey(settingsMap[SETTINGS_KEYS.cartesiaApiKey] as string),
            },
          },
        },
        freeswitch: {
          eslHost: settingsMap[SETTINGS_KEYS.freeswitchEslHost] || '127.0.0.1',
          eslPort: settingsMap[SETTINGS_KEYS.freeswitchEslPort] || 8021,
          eslPassword: settingsMap[SETTINGS_KEYS.freeswitchEslPassword] ? '••••••' : '',
        },
        pluginEnabled: settingsMap[SETTINGS_KEYS.pluginEnabled] ?? true,
        allowUserByok: toBool(settingsMap['allow_user_byok'], true),
      };

      res.json({ success: true, data: response });
    } catch (err: any) {
      console.error('[VE Admin Keys] Error fetching provider keys:', err);
      res.status(500).json({ success: false, error: `Failed to fetch provider settings: ${err.message}`, stack: err.stack });
    }
  });
  /**
   * PUT /api/voice-engine/admin/provider-keys
   * Update provider API keys and active selections.
   * Only updates fields that are provided in the request body.
   * Empty string values for keys will clear them.
   */
  router.put('/', async (req: Request, res: Response) => {
    try {
      const {
        sttActiveProvider,
        llmActiveProvider,
        ttsActiveProvider,
        sttAllowedProviders,
        ttsAllowedProviders,
        deepgramApiKey,
        sarvamApiKey,
        openrouterApiKey,
        geminiApiKey,
        groqApiKey,
        openaiApiKey,
        deepseekApiKey,
        anthropicApiKey,
        elevenlabsApiKey,
        navanaApiKey,
        cartesiaApiKey,
        callhippoApiKey,
        telecmiAppId,
        telecmiSecret,
        voicelinkHost,
        sttDeepgramModel,
        sttDeepgramAllowedModels,
        sttSarvamModel,
        sttSarvamAllowedModels,
        ttsDeepgramModel,
        ttsDeepgramAllowedModels,
        ttsSarvamModel,
        ttsSarvamAllowedModels,
        ttsSarvamSpeaker,
        ttsElevenlabsModel,
        ttsElevenlabsAllowedModels,
        ttsNavanaModel,
        ttsNavanaAllowedModels,
        ttsCartesiaModel,
        ttsCartesiaAllowedModels,
        llmDefaultModel,
        llmAllowedModels,
        freeswitchEslHost,
        freeswitchEslPort,
        freeswitchEslPassword,
        pluginEnabled,
        allowUserByok,
      } = req.body;

      const updates: Array<{ key: string; value: any; description: string }> = [];

      if (allowUserByok !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.allowUserByok,
          value: allowUserByok === true || allowUserByok === 'true' ? 'true' : 'false',
          description: 'Voice Engine: Master switch allowing users to bring own provider keys (BYOK)',
        });
      }

      if (sttActiveProvider !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.sttActiveProvider,
          value: sttActiveProvider,
          description: 'Voice Engine: Active STT provider',
        });
      }
      if (sttAllowedProviders !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.sttAllowedProviders,
          value: JSON.stringify(sttAllowedProviders),
          description: 'Voice Engine: Allowed STT providers array',
        });
      }
      if (llmActiveProvider !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.llmActiveProvider,
          value: llmActiveProvider,
          description: 'Voice Engine: Active LLM provider',
        });
      }
      if (ttsActiveProvider !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.ttsActiveProvider,
          value: ttsActiveProvider,
          description: 'Voice Engine: Active TTS provider',
        });
      }
      if (ttsAllowedProviders !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.ttsAllowedProviders,
          value: JSON.stringify(ttsAllowedProviders),
          description: 'Voice Engine: Allowed TTS providers array',
        });
      }
      if (deepgramApiKey !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.deepgramApiKey,
          value: deepgramApiKey || '',
          description: 'Voice Engine: Deepgram API key',
        });
      }
      if (sarvamApiKey !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.sarvamApiKey,
          value: sarvamApiKey || '',
          description: 'Voice Engine: Sarvam AI API key',
        });
      }
      if (openrouterApiKey !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.openrouterApiKey,
          value: openrouterApiKey || '',
          description: 'Voice Engine: OpenRouter API key',
        });
      }
      if (geminiApiKey !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.geminiApiKey,
          value: geminiApiKey || '',
          description: 'Voice Engine: Gemini API key',
        });
      }
      if (groqApiKey !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.groqApiKey,
          value: groqApiKey || '',
          description: 'Voice Engine: Groq API key',
        });
      }
      if (openaiApiKey !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.openaiApiKey,
          value: openaiApiKey || '',
          description: 'Voice Engine: OpenAI API key',
        });
      }
      if (deepseekApiKey !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.deepseekApiKey,
          value: deepseekApiKey || '',
          description: 'Voice Engine: DeepSeek API key',
        });
      }
      if (anthropicApiKey !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.anthropicApiKey,
          value: anthropicApiKey || '',
          description: 'Voice Engine: Anthropic API key',
        });
      }
      if (elevenlabsApiKey !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.elevenlabsApiKey,
          value: elevenlabsApiKey || '',
          description: 'Voice Engine: ElevenLabs API key',
        });
      }
      if (navanaApiKey !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.navanaApiKey,
          value: navanaApiKey || '',
          description: 'Voice Engine: Navana AI API key',
        });
      }
      if (cartesiaApiKey !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.cartesiaApiKey,
          value: cartesiaApiKey || '',
          description: 'Voice Engine: Cartesia API key',
        });
      }
      if (callhippoApiKey !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.callhippoApiKey,
          value: callhippoApiKey || '',
          description: 'Voice Engine: CallHippo API key',
        });
      }
      if (telecmiAppId !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.telecmiAppId,
          value: telecmiAppId || '',
          description: 'Voice Engine: TeleCMI App ID',
        });
      }
      if (telecmiSecret !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.telecmiSecret,
          value: telecmiSecret || '',
          description: 'Voice Engine: TeleCMI Secret Key',
        });
      }
      if (voicelinkHost !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.voicelinkHost,
          value: voicelinkHost || '',
          description: 'Voice Engine: VoiceLink SIP Host',
        });
      }
      if (sttDeepgramModel !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.sttDeepgramModel,
          value: sttDeepgramModel,
          description: 'Voice Engine: STT Deepgram model',
        });
      }
      if (sttDeepgramAllowedModels !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.sttDeepgramAllowedModels,
          value: JSON.stringify(sttDeepgramAllowedModels),
          description: 'Voice Engine: Allowed STT Deepgram models',
        });
      }
      if (sttSarvamModel !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.sttSarvamModel,
          value: sttSarvamModel,
          description: 'Voice Engine: STT Sarvam model',
        });
      }
      if (sttSarvamAllowedModels !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.sttSarvamAllowedModels,
          value: JSON.stringify(sttSarvamAllowedModels),
          description: 'Voice Engine: Allowed STT Sarvam models',
        });
      }
      if (ttsDeepgramModel !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.ttsDeepgramModel,
          value: ttsDeepgramModel,
          description: 'Voice Engine: TTS Deepgram model',
        });
      }
      if (ttsDeepgramAllowedModels !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.ttsDeepgramAllowedModels,
          value: JSON.stringify(ttsDeepgramAllowedModels),
          description: 'Voice Engine: Allowed TTS Deepgram models',
        });
      }
      if (ttsSarvamModel !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.ttsSarvamModel,
          value: ttsSarvamModel,
          description: 'Voice Engine: TTS Sarvam model',
        });
      }
      if (ttsSarvamAllowedModels !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.ttsSarvamAllowedModels,
          value: JSON.stringify(ttsSarvamAllowedModels),
          description: 'Voice Engine: Allowed TTS Sarvam models',
        });
      }
      if (ttsSarvamSpeaker !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.ttsSarvamSpeaker,
          value: ttsSarvamSpeaker,
          description: 'Voice Engine: Default TTS speaker/voice for Sarvam AI',
        });
      }
      if (ttsElevenlabsModel !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.ttsElevenlabsModel,
          value: ttsElevenlabsModel,
          description: 'Voice Engine: TTS ElevenLabs model',
        });
      }
      if (ttsElevenlabsAllowedModels !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.ttsElevenlabsAllowedModels,
          value: JSON.stringify(ttsElevenlabsAllowedModels),
          description: 'Voice Engine: Allowed TTS ElevenLabs models',
        });
      }
      if (ttsNavanaModel !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.ttsNavanaModel,
          value: ttsNavanaModel,
          description: 'Voice Engine: TTS Navana AI model',
        });
      }
      if (ttsNavanaAllowedModels !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.ttsNavanaAllowedModels,
          value: JSON.stringify(ttsNavanaAllowedModels),
          description: 'Voice Engine: Allowed TTS Navana AI models',
        });
      }
      if (ttsCartesiaModel !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.ttsCartesiaModel,
          value: ttsCartesiaModel,
          description: 'Voice Engine: TTS Cartesia model',
        });
      }
      if (ttsCartesiaAllowedModels !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.ttsCartesiaAllowedModels,
          value: JSON.stringify(ttsCartesiaAllowedModels),
          description: 'Voice Engine: Allowed TTS Cartesia models',
        });
      }
      if (llmDefaultModel !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.llmDefaultModel,
          value: llmDefaultModel,
          description: 'Voice Engine: Default LLM model',
        });
      }
      if (llmAllowedModels !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.llmAllowedModels,
          value: llmAllowedModels,
          description: 'Voice Engine: Allowed LLM models array',
        });
      }
      if (freeswitchEslHost !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.freeswitchEslHost,
          value: freeswitchEslHost,
          description: 'Voice Engine: FreeSWITCH ESL host',
        });
      }
      if (freeswitchEslPort !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.freeswitchEslPort,
          value: freeswitchEslPort,
          description: 'Voice Engine: FreeSWITCH ESL port',
        });
      }
      if (freeswitchEslPassword !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.freeswitchEslPassword,
          value: freeswitchEslPassword || '',
          description: 'Voice Engine: FreeSWITCH ESL password',
        });
      }
      if (pluginEnabled !== undefined) {
        updates.push({
          key: SETTINGS_KEYS.pluginEnabled,
          value: pluginEnabled,
          description: 'Voice Engine: Plugin enabled state',
        });
      }

      if (updates.length === 0) {
        return res.status(400).json({ success: false, error: 'No settings to update' });
      }

      // Upsert each setting
      for (const update of updates) {
        await db
          .insert(globalSettings)
          .values({
            key: update.key,
            value: update.value,
            description: update.description,
          })
          .onConflictDoUpdate({
            target: globalSettings.key,
            set: { value: update.value },
          });
      }

      res.json({
        success: true,
        message: `Updated ${updates.length} setting(s)`,
        updatedKeys: updates.map((u) => u.key),
      });
    } catch (err: any) {
      console.error('[VE Admin Keys] Error updating provider keys:', err.message);
      res.status(500).json({ success: false, error: 'Failed to update provider settings' });
    }
  });



 

  /**
 * GET /api/voice-engine/admin/provider-keys/openrouter-models
 * Fetch available models from OpenRouter using saved API key
 */
router.get('/openrouter-models', async (_req: Request, res: Response) => {
  try {
    const [setting] = await db
      .select()
      .from(globalSettings)
      .where(eq(globalSettings.key, SETTINGS_KEYS.openrouterApiKey))
      .limit(1);

    const apiKey = setting?.value as string | null;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }

    const response = await fetch('https://openrouter.ai/api/v1/models', { headers });

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: `OpenRouter returned ${response.status}`,
      });
    }

    const json = await response.json() as { data: { id: string; name: string; context_length: number }[] };

    // Sort alphabetically by name
    const sorted = (json.data || []).sort((a, b) => a.name.localeCompare(b.name));

    res.json({ success: true, data: sorted });
  } catch (err: any) {
    console.error('[VE Admin Keys] Error fetching OpenRouter models:', err.message);
    res.status(500).json({ success: false, error: 'Failed to fetch OpenRouter models' });
  }
});

  /**
   * POST /api/voice-engine/admin/provider-keys/test/:provider
   * Test a specific provider API key connectivity
   */
  router.post('/test/:provider', async (req: Request, res: Response) => {
    try {
      const { provider } = req.params;
      let rawApiKey = req.body?.apiKey;

      // If key is not passed in request body, fetch from settings
      if (!rawApiKey) {
        let keyName: string;
        switch (provider) {
          case 'deepgram':
            keyName = SETTINGS_KEYS.deepgramApiKey;
            break;
          case 'sarvam':
            keyName = SETTINGS_KEYS.sarvamApiKey;
            break;
          case 'openrouter':
            keyName = SETTINGS_KEYS.openrouterApiKey;
            break;
          case 'gemini':
            keyName = SETTINGS_KEYS.geminiApiKey;
            break;
          case 'groq':
            keyName = SETTINGS_KEYS.groqApiKey;
            break;
          case 'openai':
            keyName = SETTINGS_KEYS.openaiApiKey;
            break;
          case 'deepseek':
            keyName = SETTINGS_KEYS.deepseekApiKey;
            break;
          case 'anthropic':
            keyName = SETTINGS_KEYS.anthropicApiKey;
            break;
          case 'elevenlabs':
            keyName = SETTINGS_KEYS.elevenlabsApiKey;
            break;
          case 'navana':
            keyName = SETTINGS_KEYS.navanaApiKey;
            break;
          case 'cartesia':
            keyName = SETTINGS_KEYS.cartesiaApiKey;
            break;
          default:
            return res.status(400).json({ success: false, error: `Unknown provider: ${provider}` });
        }

        const [setting] = await db
          .select()
          .from(globalSettings)
          .where(eq(globalSettings.key, keyName))
          .limit(1);

        rawApiKey = setting?.value;
      }

      const apiKey = extractValue(rawApiKey);

      if (!apiKey || (typeof apiKey === 'string' && apiKey.trim().length === 0)) {
        return res.json({
          success: true,
          data: {
            provider,
            connected: false,
            error: 'No API key configured or provided',
          },
        });
      }

      // Attempt a lightweight test for each provider
      let connected = false;
      let details = '';

      try {
        if (provider === 'deepgram') {
          const response = await fetch('https://api.deepgram.com/v1/projects', {
            headers: { Authorization: `Token ${apiKey}` },
          });
          connected = response.ok;
          details = connected ? 'Connected to Deepgram' : `HTTP ${response.status}`;
        } else if (provider === 'sarvam') {
          connected = apiKey.length >= 10;
          details = connected ? 'API key format valid' : 'API key too short';
        } else if (provider === 'openrouter') {
          const response = await fetch('https://openrouter.ai/api/v1/models', {
            headers: { Authorization: `Bearer ${apiKey}` },
          });
          connected = response.ok;
          details = connected ? 'Connected to OpenRouter' : `HTTP ${response.status}`;
        } else if (provider === 'gemini') {
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash?key=${apiKey}`);
          connected = response.ok;
          details = connected ? 'Connected to Google Gemini' : `HTTP ${response.status}`;
        } else if (provider === 'groq') {
          const response = await fetch('https://api.groq.com/openai/v1/models', {
            headers: { Authorization: `Bearer ${apiKey}` },
          });
          connected = response.ok;
          details = connected ? 'Connected to Groq' : `HTTP ${response.status}`;
        } else if (provider === 'openai') {
          const response = await fetch('https://api.openai.com/v1/models', {
            headers: { Authorization: `Bearer ${apiKey}` },
          });
          connected = response.ok;
          details = connected ? 'Connected to OpenAI' : `HTTP ${response.status}`;
        } else if (provider === 'deepseek') {
          const response = await fetch('https://api.deepseek.com/models', {
            headers: { Authorization: `Bearer ${apiKey}` },
          });
          connected = response.ok;
          details = connected ? 'Connected to DeepSeek' : `HTTP ${response.status}`;
        } else if (provider === 'anthropic') {
          const response = await fetch('https://api.anthropic.com/v1/models', {
            headers: {
              'x-api-key': apiKey,
              'anthropic-version': '2023-06-01',
            },
          });
          connected = response.ok;
          details = connected ? 'Connected to Anthropic' : `HTTP ${response.status}`;
        } else if (provider === 'elevenlabs') {
          const response = await fetch('https://api.elevenlabs.io/v1/voices', {
            headers: { 'xi-api-key': apiKey },
          });
          connected = response.ok;
          details = connected ? 'Connected to ElevenLabs' : `HTTP ${response.status}`;
        } else if (provider === 'navana') {
          // Navana AI Bodhi Indic TTS format and connection check
          const response = await fetch('https://api.navana.ai/v1/voices', {
            headers: { Authorization: `Bearer ${apiKey}` },
          }).catch(() => null);
          if (response && response.ok) {
            connected = true;
            details = 'Connected to Navana AI (Bodhi Indic TTS)';
          } else if (apiKey && apiKey.length >= 8) {
            connected = true;
            details = 'Navana AI API key format verified';
          } else {
            connected = false;
            details = 'Invalid Navana AI API key';
          }
        } else if (provider === 'cartesia') {
          const response = await fetch('https://api.cartesia.ai/voices', {
            headers: {
              'X-API-Key': apiKey,
              'Cartesia-Version': '2024-06-10',
            },
          });
          connected = response.ok;
          details = connected ? 'Connected to Cartesia Sonic' : `HTTP ${response.status}`;
        }
      } catch (fetchErr: any) {
        details = `Connection failed: ${fetchErr.message}`;
      }

      res.json({
        success: true,
        data: { provider, connected, details },
      });
    } catch (err: any) {
      console.error('[VE Admin Keys] Error testing provider:', err.message);
      res.status(500).json({ success: false, error: 'Failed to test provider' });
    }
  });

  return router;
}
