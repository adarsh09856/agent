/**
 * ============================================================
 * Admin Settings Routes
 *
 * Admin panel routes for managing voice engine global settings,
 * FreeSWITCH nodes, and provider configurations.
 * ============================================================
 */

import { Router, Request, Response } from 'express';
import { db } from '../../../server/db';
import { sql, eq } from 'drizzle-orm';

export function createAdminSettingsRouter(): Router {
  const router = Router();

  // Drop ve_sip_gateways table on startup
  (async () => {
    try {
      await db.execute(sql`DROP TABLE IF EXISTS ve_sip_gateways CASCADE;`);
      console.log('[VE Admin] Deleted old ve_sip_gateways table');
    } catch (err: any) {
      console.error('[VE Admin] Failed to drop ve_sip_gateways table:', err.message);
    }
  })();

  // ── Global Settings ──────────────────────────────────

  /** GET /api/voice-engine/admin/settings */
  router.get('/', async (_req: Request, res: Response) => {
    try {
      const result = await db.execute(
        sql`SELECT * FROM ve_freeswitch_nodes ORDER BY created_at ASC`
      );

      res.json({
        success: true,
        data: {
          nodes: result.rows,
          totalNodes: result.rows.length,
          onlineNodes: (result.rows as any[]).filter((n: any) => n.status === 'online').length,
        },
      });
    } catch (err: any) {
      console.error('[VE Admin] Error fetching settings:', err.message);
      res.status(500).json({ success: false, error: 'Failed to fetch settings' });
    }
  });

  // ── FreeSWITCH Node Management ───────────────────────

  /** GET /api/voice-engine/admin/settings/nodes */
  router.get('/nodes', async (_req: Request, res: Response) => {
    try {
      const result = await db.execute(
        sql`SELECT * FROM ve_freeswitch_nodes ORDER BY created_at ASC`
      );
      res.json({ success: true, data: result.rows });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  /** POST /api/voice-engine/admin/settings/nodes */
  router.post('/nodes', async (req: Request, res: Response) => {
    try {
      const { name, eslHost, eslPort, eslPassword, sipHost, sipPort, wsPort, maxCalls, status } = req.body;

      if (!name || !eslHost || !eslPort || !sipHost || !sipPort || !wsPort) {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
      }

      const result = await db.execute(sql`
        INSERT INTO ve_freeswitch_nodes (name, esl_host, esl_port, esl_password, sip_host, sip_port, ws_port, max_calls, status)
        VALUES (${name}, ${eslHost}, ${eslPort}, ${eslPassword || 'ClueCon'}, ${sipHost}, ${sipPort}, ${wsPort}, ${maxCalls || 100}, ${status || 'offline'})
        RETURNING *
      `);

      res.status(201).json({ success: true, data: result.rows[0] });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  /** PUT /api/voice-engine/admin/settings/nodes/:id */
  router.put('/nodes/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, eslHost, eslPort, eslPassword, sipHost, sipPort, wsPort, maxCalls, status } = req.body;

      const result = await db.execute(sql`
        UPDATE ve_freeswitch_nodes SET
          name = COALESCE(${name !== undefined ? name : null}, name),
          esl_host = COALESCE(${eslHost !== undefined ? eslHost : null}, esl_host),
          esl_port = COALESCE(${eslPort !== undefined ? eslPort : null}, esl_port),
          esl_password = COALESCE(${eslPassword !== undefined ? eslPassword : null}, esl_password),
          sip_host = COALESCE(${sipHost !== undefined ? sipHost : null}, sip_host),
          sip_port = COALESCE(${sipPort !== undefined ? sipPort : null}, sip_port),
          ws_port = COALESCE(${wsPort !== undefined ? wsPort : null}, ws_port),
          max_calls = COALESCE(${maxCalls !== undefined ? maxCalls : null}, max_calls),
          status = COALESCE(${status !== undefined ? status : null}, status),
          updated_at = NOW()
        WHERE id = ${id}
        RETURNING *
      `);

      if ((result.rows as any[]).length === 0) {
        return res.status(404).json({ success: false, error: 'Node not found' });
      }

      res.json({ success: true, data: result.rows[0] });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  /** DELETE /api/voice-engine/admin/settings/nodes/:id */
  router.delete('/nodes/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await db.execute(sql`DELETE FROM ve_freeswitch_nodes WHERE id = ${id}`);
      res.json({ success: true, message: 'Node deleted' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // ── SIP Gateway Management ───────────────────────────

  /** GET /api/voice-engine/admin/settings/sip-gateways */
  router.get('/sip-gateways', async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;
      if (!userId) return res.status(401).json({ success: false, error: 'Unauthorized' });

      const result = await db.execute(sql`
        SELECT * FROM user_sip_gateways
        WHERE user_id = ${userId}
        ORDER BY created_at ASC
      `);
      res.json({ success: true, data: result.rows });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  /** POST /api/voice-engine/admin/settings/sip-gateways */
  router.post('/sip-gateways', async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;
      if (!userId) return res.status(401).json({ success: false, error: 'Unauthorized' });

      const { name, username, password, proxy, register, callerIdInFrom } = req.body;

      if (!name || !username || !password || !proxy) {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
      }

      const result = await db.execute(sql`
        INSERT INTO user_sip_gateways (user_id, name, username, password, proxy, register, caller_id_in_from)
        VALUES (${userId}, ${name}, ${username}, ${password}, ${proxy}, ${register ?? false}, ${callerIdInFrom ?? true})
        RETURNING *
      `);

      res.status(201).json({ success: true, data: result.rows[0] });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  /** PUT /api/voice-engine/admin/settings/sip-gateways/:id */
  router.put('/sip-gateways/:id', async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;
      if (!userId) return res.status(401).json({ success: false, error: 'Unauthorized' });

      const { id } = req.params;
      const { name, username, password, proxy, register, callerIdInFrom } = req.body;

      const result = await db.execute(sql`
        UPDATE user_sip_gateways SET
          name = COALESCE(${name ?? null}, name),
          username = COALESCE(${username ?? null}, username),
          password = COALESCE(${password ?? null}, password),
          proxy = COALESCE(${proxy ?? null}, proxy),
          register = COALESCE(${register !== undefined ? register : null}, register),
          caller_id_in_from = COALESCE(${callerIdInFrom !== undefined ? callerIdInFrom : null}, caller_id_in_from),
          updated_at = NOW()
        WHERE id = ${id} AND user_id = ${userId}
        RETURNING *
      `);

      if ((result.rows as any[]).length === 0) {
        return res.status(404).json({ success: false, error: 'Gateway not found' });
      }

      res.json({ success: true, data: result.rows[0] });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  /** DELETE /api/voice-engine/admin/settings/sip-gateways/:id */
  router.delete('/sip-gateways/:id', async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;
      if (!userId) return res.status(401).json({ success: false, error: 'Unauthorized' });

      const { id } = req.params;
      await db.execute(sql`DELETE FROM user_sip_gateways WHERE id = ${id} AND user_id = ${userId}`);
      res.json({ success: true, message: 'Gateway deleted' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  /** POST /api/voice-engine/admin/settings/sip-gateways/:id/activate */
  router.post('/sip-gateways/:id/activate', async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;
      if (!userId) return res.status(401).json({ success: false, error: 'Unauthorized' });

      const { id } = req.params;

      // Deactivate all gateways for this user
      await db.execute(sql`UPDATE user_sip_gateways SET is_active = false WHERE user_id = ${userId}`);

      // Activate selected gateway
      const result = await db.execute(sql`
        UPDATE user_sip_gateways SET is_active = true WHERE id = ${id} AND user_id = ${userId} RETURNING *
      `);

      if ((result.rows as any[]).length === 0) {
        return res.status(404).json({ success: false, error: 'Gateway not found' });
      }

      res.json({ success: true, data: result.rows[0] });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  return router;
}
