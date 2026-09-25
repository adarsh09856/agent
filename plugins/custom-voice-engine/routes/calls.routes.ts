/**
 * ============================================================
 * Calls Routes — Initiate and manage voice calls
 * ============================================================
 */

import { Router, Request, Response } from 'express';
import { db } from '../../../server/db';
import { sql } from 'drizzle-orm';
import { EslConnection } from '../services/freeswitch/esl-connection';
import * as os from 'os';

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

export function createCallsRouter(): Router {
  const router = Router();

  /** GET /api/voice-engine/calls — List call sessions */
  router.get('/', async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;
      const page = parseInt(req.query.page as string) || 1;
      const limit = Math.min(parseInt(req.query.limit as string) || 20, 100);
      const offset = (page - 1) * limit;
      const direction = req.query.direction as string;
      const status = req.query.status as string;

      let query = sql`SELECT * FROM ve_sessions WHERE user_id = ${userId}`;
      if (direction) query = sql`${query} AND direction = ${direction}`;
      if (status) query = sql`${query} AND status = ${status}`;
      query = sql`${query} ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`;

      const result = await db.execute(query);

      const countResult = await db.execute(
        sql`SELECT COUNT(*)::int as total FROM ve_sessions WHERE user_id = ${userId}`
      );

      res.json({
        success: true,
        data: result.rows,
        pagination: {
          page,
          limit,
          total: (countResult.rows[0] as any)?.total || 0,
        },
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  /** GET /api/voice-engine/calls/:id — Get call session details */
  router.get('/:id', async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;
      const { id } = req.params;

      const result = await db.execute(
        sql`SELECT * FROM ve_sessions WHERE id = ${id} AND user_id = ${userId} LIMIT 1`
      );

      if ((result.rows as any[]).length === 0) {
        return res.status(404).json({ success: false, error: 'Session not found' });
      }

      res.json({ success: true, data: result.rows[0] });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  /** POST /api/voice-engine/calls/outbound — Initiate outbound call */
  router.post('/outbound', async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;
      const { agentId, toNumber, fromNumber, language, ttsVoice, llmModel, sttProvider, ttsProvider, sttModel, ttsModel } = req.body;

      if (!toNumber) {
        return res.status(400).json({ success: false, error: 'toNumber is required' });
      }

      let resolvedAgentId = agentId;
      let agent;

      if (resolvedAgentId) {
        // Verify agent belongs to user
        const agentResult = await db.execute(
          sql`SELECT * FROM ve_voice_agents WHERE id = ${resolvedAgentId} AND user_id = ${userId} AND is_active = true LIMIT 1`
        );
        if (agentResult.rows.length === 0) {
          return res.status(404).json({ success: false, error: 'Agent not found or inactive' });
        }
        agent = agentResult.rows[0];
      } else {
        // Automatically find first active agent for this user
        const agentResult = await db.execute(
          sql`SELECT * FROM ve_voice_agents WHERE user_id = ${userId} AND is_active = true ORDER BY created_at DESC LIMIT 1`
        );
        if (agentResult.rows.length === 0) {
          // Fallback to first agent overall for the user
          const fallbackResult = await db.execute(
            sql`SELECT * FROM ve_voice_agents WHERE user_id = ${userId} ORDER BY created_at DESC LIMIT 1`
          );
          if (fallbackResult.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'No voice agents found. Please create an agent first.' });
          }
          agent = fallbackResult.rows[0];
        } else {
          agent = agentResult.rows[0];
        }
        resolvedAgentId = agent.id;
      }

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
        VALUES (${userId}, ${resolvedAgentId}, ${toNumber}, ${fromNumber || null}, 'outbound', 'initializing', ${JSON.stringify(metadata)})
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
      const callerId = (fromNumber && fromNumber !== 'FreeSWITCH') ? fromNumber : activePhoneNumber;
      const formattedCallerId = (callerId !== 'FreeSWITCH' && !callerId.startsWith('+')) ? `+${callerId}` : callerId;

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
      res.status(500).json({ success: false, error: err.message });
    }
  });

  /** POST /api/voice-engine/calls/:id/hangup — End a call */
  router.post('/:id/hangup', async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;
      const { id } = req.params;

      await db.execute(sql`
        UPDATE ve_sessions SET status = 'completed', ended_at = NOW(), end_reason = 'user_hangup', updated_at = NOW()
        WHERE id = ${id} AND user_id = ${userId} AND status IN ('initializing', 'active')
      `);

      res.json({ success: true, message: 'Call ended' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  return router;
}
