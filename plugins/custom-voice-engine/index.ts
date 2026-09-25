/**
 * ============================================================
 * AI Voice Engine Plugin — Main Entry Point
 *
 * Self-hosted AI voice processing engine powered by FreeSWITCH.
 * Provides real-time voice streaming with pluggable STT/LLM/TTS
 * providers and customer memory system.
 *
 * Architecture:
 *   SIP Provider → FreeSWITCH → mod_audio_fork → WebSocket →
 *   AI Gateway → STT → Conversation Engine → LLM → TTS →
 *   FreeSWITCH → Caller
 *
 * Installation:
 * 1. Place in plugins/ai-voice-engine/
 * 2. Run database migration (migrations/001_voice_engine_tables.sql)
 * 3. Configure provider API keys in admin panel
 * 4. Deploy FreeSWITCH with mod_audio_fork
 * ============================================================
 */

import { Router, type Express, type RequestHandler } from 'express';
import type { Server as HttpServer } from 'http';
import { db } from '../../server/db';
import { sql, eq } from 'drizzle-orm';
import { globalSettings } from '../../shared/schema';
import { TtsProviderFactory } from './services/providers/tts/tts-provider.factory';
import { EslConnection } from './services/freeswitch/esl-connection';
import * as os from 'os';

// Route imports
import { createAdminSettingsRouter } from './routes/admin-settings.routes';
import { createAdminProviderKeysRouter } from './routes/admin-provider-keys.routes';
import { createAdminStorageRouter } from './routes/admin-storage.routes';
import { createTenantConfigRouter } from './routes/tenant-config.routes';
import { createCallsRouter } from './routes/calls.routes';
import { createRecordingsRouter } from './routes/recordings.routes';
import { createMemoryRouter } from './routes/memory.routes';
import { createAnalyticsRouter } from './routes/analytics.routes';
import { createAgentsRouter } from './routes/agents.routes';

// Service imports
import { AudioWebSocketServer } from './services/audio-pipeline/ws-audio-server';
import { MetricsCollector } from './services/monitoring/metrics-collector';

function getContainerIp(): string {
  if (process.env.VE_AUDIO_WS_IP) {
    return process.env.VE_AUDIO_WS_IP;
  }
  if (process.env.PUBLIC_IP) {
    return process.env.PUBLIC_IP;
  }
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name] || []) {
      if (net.family === 'IPv4' && !net.internal) {
        if (net.address.startsWith('10.') || net.address.startsWith('172.') || net.address.startsWith('192.168.')) {
          return net.address;
        }
      }
    }
  }
  return '127.0.0.1';
}

export * from './types';

export const PLUGIN_VERSION = '1.0.0';
export const PLUGIN_NAME = 'ai-voice-engine';

interface PluginLoaderOptions {
  sessionAuthMiddleware: RequestHandler;
  adminAuthMiddleware: RequestHandler;
  httpServer?: HttpServer;
}

// Singleton references for cleanup
let audioWsServer: AudioWebSocketServer | null = null;
let metricsCollector: MetricsCollector | null = null;

/**
 * Main plugin registration function — called by the plugin loader.
 * Mounts all API routes and initializes the audio WebSocket server.
 */
export function registerAiVoiceEngineRoutes(
  app: Express,
  options: PluginLoaderOptions
): void {
  const { sessionAuthMiddleware, adminAuthMiddleware, httpServer } = options;

  // ── Admin Routes (require admin auth) ────────────────────
  app.use('/api/voice-engine/admin/settings', adminAuthMiddleware, createAdminSettingsRouter());
  app.use('/api/voice-engine/admin/freeswitch', adminAuthMiddleware, createAdminSettingsRouter());
  app.use('/api/voice-engine/admin/provider-keys', (req, res, next) => {
    if (req.method === 'GET') {
      return sessionAuthMiddleware(req, res, next);
    }
    return adminAuthMiddleware(req, res, next);
  }, createAdminProviderKeysRouter());
  app.use('/api/voice-engine/admin/storage', adminAuthMiddleware, createAdminStorageRouter());

  // ── User Routes (require session auth) ───────────────────
  app.use('/api/voice-engine/config', sessionAuthMiddleware, createTenantConfigRouter());
  app.use('/api/voice-engine/calls', sessionAuthMiddleware, createCallsRouter());
  app.use('/api/voice-engine/recordings', sessionAuthMiddleware, createRecordingsRouter());
  app.use('/api/voice-engine/memory', sessionAuthMiddleware, createMemoryRouter());
  app.use('/api/voice-engine/analytics', sessionAuthMiddleware, createAnalyticsRouter());
  app.use('/api/voice-engine/agents', sessionAuthMiddleware, createAgentsRouter());

  // ── Public Routes (require no auth) ──────────────────────
  app.post('/api/public/voice-engine/calls/outbound', async (req, res) => {
    try {
      const { toNumber, language, ttsVoice, llmModel, sttProvider, ttsProvider, sttModel, ttsModel } = req.body;

      if (!toNumber) {
        return res.status(400).json({ success: false, error: 'toNumber is required' });
      }

      // Find first active agent in the system
      const agentResult = await db.execute(
        sql`SELECT * FROM ve_voice_agents WHERE is_active = true ORDER BY created_at DESC LIMIT 1`
      );

      if (agentResult.rows.length === 0) {
        // Fallback to first agent regardless of is_active
        const fallbackResult = await db.execute(
          sql`SELECT * FROM ve_voice_agents ORDER BY created_at DESC LIMIT 1`
        );
        if (fallbackResult.rows.length === 0) {
          return res.status(404).json({ success: false, error: 'No voice agents found in the system' });
        }
        agentResult.rows.push(fallbackResult.rows[0]);
      }

      const agent = agentResult.rows[0] as any;
      const userId = agent.user_id;
      const agentId = agent.id;

      const metadata = {
        language,
        ttsVoice,
        llmModel,
        sttProvider,
        ttsProvider,
        sttModel,
        ttsModel,
        isPublicDemo: true
      };

      // Create session
      const sessionResult = await db.execute(sql`
        INSERT INTO ve_sessions (user_id, agent_id, to_number, from_number, direction, status, metadata)
        VALUES (${userId}, ${agentId}, ${toNumber}, 'FreeSWITCH', 'outbound', 'initializing', ${JSON.stringify(metadata)})
        RETURNING *
      `);

      const session = (sessionResult.rows as any[])[0];

      // Trigger FreeSWITCH originate via ESL
      const nodesResult = await db.execute(sql`SELECT * FROM ve_freeswitch_nodes WHERE status = 'online' ORDER BY created_at ASC`);
      const nodes = nodesResult.rows as any[];
      if (nodes.length === 0) {
        throw new Error('No active FreeSWITCH nodes available');
      }

      const node = nodes[0];
      const eslHost = node.esl_host || node.eslHost;
      const eslPort = node.esl_port || node.eslPort;
      const eslPassword = node.esl_password || node.eslPassword || 'ClueCon';

      const eslConnection = new EslConnection({ host: eslHost, port: eslPort, password: eslPassword, reconnect: false });
      await eslConnection.connect();

      // Resolve Gateway
      let activeGateway: any = null;
      const userGatewayResult = await db.execute(sql`
        SELECT id, name, proxy, username, password FROM user_sip_gateways WHERE user_id = ${userId} AND is_active = true LIMIT 1
      `);
      if (userGatewayResult.rows.length > 0) {
        activeGateway = userGatewayResult.rows[0];
      }

      let activePhoneNumber = 'FreeSWITCH';
      if (activeGateway) {
        const sipPhoneResult = await db.execute(sql`
          SELECT phone_number FROM user_sip_phone_numbers WHERE gateway_id = ${activeGateway.id} LIMIT 1
        `);
        if (sipPhoneResult.rows.length > 0) {
          activePhoneNumber = sipPhoneResult.rows[0].phone_number;
        }
      }

      const gatewayProxy = activeGateway ? activeGateway.proxy : 'testhr.pstn.twilio.com';
      const gatewayUsername = activeGateway?.username;
      const gatewayPassword = activeGateway?.password;

      const formattedTo = !toNumber.startsWith('+') ? `+${toNumber}` : toNumber;
      const dialString = `sofia/external/${formattedTo}@${gatewayProxy}`;
      const destination = `${formattedTo} XML public`;
      const formattedCallerId = activePhoneNumber !== 'FreeSWITCH' && !activePhoneNumber.startsWith('+') ? `+${activePhoneNumber}` : activePhoneNumber;

      const options = {
        origination_uuid: session.id,
        origination_caller_id_number: formattedCallerId,
        origination_caller_id_name: formattedCallerId,
        effective_caller_id_number: formattedCallerId,
        effective_caller_id_name: formattedCallerId,
        sip_from_uri: `sip:${formattedCallerId}@${gatewayProxy}`,
        sip_invite_req_uri: `sip:${formattedTo}@${gatewayProxy}`,
        ve_audio_ws_url: `ws://${getContainerIp()}:${process.env.PORT || '5000'}/voice-engine/ws/audio`,
        ...(gatewayUsername && { sip_auth_username: gatewayUsername }),
        ...(gatewayPassword && { sip_auth_password: gatewayPassword }),
      };

      try {
        await eslConnection.originate(dialString, destination, options);
        await db.execute(sql`
          UPDATE ve_sessions SET status = 'active', channel_uuid = ${session.id} WHERE id = ${session.id}
        `);
      } catch (originateErr: any) {
        await db.execute(sql`
          UPDATE ve_sessions SET status = 'failed' WHERE id = ${session.id}
        `);
        throw originateErr;
      } finally {
        await eslConnection.disconnect().catch(() => {});
      }

      res.json({ success: true, data: session });
    } catch (err: any) {
      console.error('[Public Call Error]:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.get('/api/public/voice-engine/calls/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await db.execute(
        sql`SELECT id, status, started_at, answered_at, ended_at, duration_seconds, end_reason FROM ve_sessions WHERE id = ${id} LIMIT 1`
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, error: 'Session not found' });
      }
      res.json({ success: true, data: result.rows[0] });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.post('/api/public/voice-engine/agents/preview', async (req, res) => {
    try {
      const { voiceId, text, provider, language, ttsModel } = req.body;
      if (!voiceId) {
        return res.status(400).json({ success: false, error: 'voiceId is required' });
      }

      const previewText = text || "Hello! This is a preview of how I'll sound. I can adjust my tone and style based on your preferences.";

      const isSarvam = provider === 'sarvam';
      const providerName = isSarvam ? 'sarvam' : 'deepgram';

      const keyName = isSarvam ? 've_sarvam_api_key' : 've_deepgram_api_key';
      const [setting] = await db
        .select()
        .from(globalSettings)
        .where(eq(globalSettings.key, keyName))
        .limit(1);

      const apiKey = setting?.value as string | null;
      if (!apiKey) {
        return res.status(400).json({ success: false, error: `API key for ${providerName} is not configured in settings.` });
      }

      const ttsProvider = TtsProviderFactory.create(providerName);

      const effectiveModel = isSarvam ? (ttsModel || 'bulbul:v3') : undefined;
      const config: any = isSarvam
        ? {
            apiKey,
            voice: voiceId,
            sarvamSpeaker: voiceId,
            sarvamModel: effectiveModel,
            language: language || 'en-IN',
            outputFormat: {
              encoding: 'linear16',
              sampleRate: 8000,
            },
            speed: 1.0,
          }
        : {
            apiKey,
            voice: voiceId,
            language: language || 'en',
            outputFormat: {
              encoding: 'mp3',
              sampleRate: 24000,
            },
          };

      const audioBuffer = await ttsProvider.synthesize(previewText, config);
      
      const isMp3 = !isSarvam;
      res.setHeader('Content-Type', isMp3 ? 'audio/mpeg' : 'audio/wav');
      res.setHeader('Content-Length', audioBuffer.length);
      res.end(audioBuffer);
    } catch (err: any) {
      console.error('[Public Preview Error]:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // ── Initialize Audio WebSocket Server ────────────────────
  if (httpServer) {
    try {
      if (audioWsServer) {
        audioWsServer.shutdown();
      }
      audioWsServer = new AudioWebSocketServer(httpServer);
      console.log('[AI Voice Engine]   - WebSocket audio server initialized');
    } catch (err: any) {
      console.warn('[AI Voice Engine] WebSocket server init failed:', err.message);
    }
  }

  // ── Initialize Metrics Collector ─────────────────────────
  try {
    metricsCollector = MetricsCollector.getInstance();
    console.log('[AI Voice Engine]   - Metrics collector initialized');
  } catch (err: any) {
    console.warn('[AI Voice Engine] Metrics collector init failed:', err.message);
  }

  // ── Set Dynamic WebSocket IP and initialize persistent ESL connections ──
  (async () => {
    try {
      const os = await import('os');

      const getContainerIp = () => {
        const interfaces = os.networkInterfaces();
        for (const name of Object.keys(interfaces)) {
          for (const net of interfaces[name] || []) {
            if (net.family === 'IPv4' && !net.internal) {
              if (net.address.startsWith('10.') || net.address.startsWith('172.') || net.address.startsWith('192.168.')) {
                return net.address;
              }
            }
          }
        }
        return '127.0.0.1';
      };

      const containerIp = getContainerIp();
      // On host-based non-docker setups, containerIp will be 127.0.0.1. We still want to initialize ESL.
      // if (containerIp === '127.0.0.1') return;

      if (process.env.DISABLE_FREESWITCH_ESL === 'true' || process.env.DISABLE_FREESWITCH_ESL === '1') {
        console.log('[AI Voice Engine] FreeSWITCH ESL connection initialization disabled via DISABLE_FREESWITCH_ESL environment variable.');
        return;
      }

      const wsUrl = `ws://${containerIp}:${process.env.PORT || '5000'}/voice-engine/ws/audio`;

      if (audioWsServer) {
        await audioWsServer.initializeEslConnections(wsUrl);
      }
    } catch (err: any) {
      console.warn(`[AI Voice Engine] Failed to configure FreeSWITCH nodes and ESL connections on startup:`, err.message);
    }
  })();

  // ── Log registration ────────────────────────────────────
  console.log('[AI Voice Engine] Plugin registered (v1.0.0)');
  console.log('[AI Voice Engine] Endpoints:');
  console.log('  - /api/voice-engine/admin/settings (admin auth)');
  console.log('  - /api/voice-engine/admin/freeswitch (admin auth)');
  console.log('  - /api/voice-engine/admin/provider-keys (admin auth)');
  console.log('  - /api/voice-engine/config (user auth)');
  console.log('  - /api/voice-engine/calls (user auth)');
  console.log('  - /api/voice-engine/recordings (user auth)');
  console.log('  - /api/voice-engine/memory (user auth)');
  console.log('  - /api/voice-engine/analytics (user auth)');
  console.log('  - /api/voice-engine/agents (user auth)');
  console.log('[AI Voice Engine] Providers:');
  console.log('  - STT: Deepgram, Sarvam');
  console.log('  - LLM: OpenRouter (GPT-4o-mini, Gemini Flash)');
  console.log('  - TTS: Deepgram Nova-2, Sarvam');
  console.log('✅ AI Voice Engine Plugin initialized');
}

/**
 * Get the audio WebSocket server instance
 */
export function getAudioWsServer(): AudioWebSocketServer | null {
  return audioWsServer;
}

/**
 * Get the metrics collector instance
 */
export function getMetricsCollector(): MetricsCollector | null {
  return metricsCollector;
}

export default {
  name: PLUGIN_NAME,
  version: PLUGIN_VERSION,
  register: registerAiVoiceEngineRoutes,
};
