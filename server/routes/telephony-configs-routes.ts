'use strict';
/**
 * Telephony Configurations Routes
 * 
 * Provides unified CRUD endpoints for carrier configurations:
 * Asterisk ARI, Cloudonix, Exotel, Plivo, Telnyx, Twilio, Vobiz, Vonage, and Indian SIP trunks.
 * Backed by the user_sip_gateways table with unified provider metadata.
 */

import { Router, Response } from 'express';
import { db } from '../db';
import { sql } from 'drizzle-orm';
import { authenticateToken, type AuthRequest } from '../middleware/auth';

export function createTelephonyConfigsRoutes(): Router {
  const router = Router();
  const auth = authenticateToken as unknown as import('express').RequestHandler;

  /**
   * GET /api/telephony-configs
   * Returns all connected telephony carrier configurations for the authenticated user.
   */
  router.get('/api/telephony-configs', auth, async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });

      const result = await db.execute(sql`
        SELECT 
          g.id,
          g.name,
          g.proxy,
          g.username,
          g.register,
          g.caller_id_in_from,
          g.is_active,
          g.created_at,
          g.updated_at,
          COUNT(p.id)::int as phone_number_count
        FROM user_sip_gateways g
        LEFT JOIN user_sip_phone_numbers p ON p.gateway_id = g.id
        WHERE g.user_id = ${userId}
        GROUP BY g.id
        ORDER BY g.created_at DESC
      `);

      // Infer provider type from proxy or name
      const configs = result.rows.map((row: any) => {
        let provider = 'sip';
        const proxyLower = (row.proxy || '').toLowerCase();
        const nameLower = (row.name || '').toLowerCase();

        if (proxyLower.includes('twilio') || nameLower.includes('twilio')) provider = 'twilio';
        else if (proxyLower.includes('plivo') || nameLower.includes('plivo')) provider = 'plivo';
        else if (proxyLower.includes('exotel') || nameLower.includes('exotel')) provider = 'exotel';
        else if (proxyLower.includes('telnyx') || nameLower.includes('telnyx')) provider = 'telnyx';
        else if (proxyLower.includes('cloudonix') || nameLower.includes('cloudonix')) provider = 'cloudonix';
        else if (proxyLower.includes('vonage') || proxyLower.includes('nexmo') || nameLower.includes('vonage')) provider = 'vonage';
        else if (proxyLower.includes('vobiz') || nameLower.includes('vobiz')) provider = 'vobiz';
        else if (proxyLower.includes('ari') || proxyLower.includes('8088') || nameLower.includes('asterisk')) provider = 'ari';

        return {
          id: row.id,
          name: row.name,
          provider,
          proxy: row.proxy,
          username: row.username,
          is_default_outbound: Boolean(row.is_active),
          phone_number_count: row.phone_number_count || 0,
          created_at: row.created_at,
          updated_at: row.updated_at,
        };
      });

      res.json({ success: true, data: configs });
    } catch (err: any) {
      console.error('[TelephonyConfigs] GET error:', err.message);
      res.status(500).json({ error: 'Failed to fetch telephony configurations' });
    }
  });

  /**
   * POST /api/telephony-configs
   * Creates a new carrier configuration
   */
  router.post('/api/telephony-configs', auth, async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });

      const { name, provider, credentials, is_default_outbound } = req.body;
      if (!name) return res.status(400).json({ error: 'Name is required' });

      const proxy = credentials?.proxy || credentials?.ari_endpoint || credentials?.domain_name || `${provider || 'carrier'}.cloud.internal`;
      const username = credentials?.account_sid || credentials?.auth_id || credentials?.username || credentials?.api_key || name.trim();
      const password = credentials?.auth_token || credentials?.api_secret || credentials?.password || credentials?.app_password || 'configured';

      if (is_default_outbound) {
        // Clear existing default
        await db.execute(sql`
          UPDATE user_sip_gateways SET is_active = false WHERE user_id = ${userId}
        `);
      }

      const result = await db.execute(sql`
        INSERT INTO user_sip_gateways (user_id, name, username, password, proxy, register, caller_id_in_from, is_active)
        VALUES (${userId}, ${name}, ${username}, ${password}, ${proxy}, ${credentials?.register ?? false}, true, ${Boolean(is_default_outbound)})
        RETURNING *
      `);

      res.status(201).json({ success: true, data: result.rows[0] });
    } catch (err: any) {
      console.error('[TelephonyConfigs] POST error:', err.message);
      res.status(500).json({ error: 'Failed to create telephony configuration' });
    }
  });

  /**
   * PUT /api/telephony-configs/:id
   * Updates an existing carrier configuration
   */
  router.put('/api/telephony-configs/:id', auth, async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });

      const { id } = req.params;
      const { name, provider, credentials, is_default_outbound } = req.body;

      const existing = await db.execute(sql`
        SELECT id FROM user_sip_gateways WHERE id = ${id} AND user_id = ${userId}
      `);
      if ((existing.rows as any[]).length === 0) {
        return res.status(404).json({ error: 'Configuration not found' });
      }

      if (is_default_outbound) {
        await db.execute(sql`
          UPDATE user_sip_gateways SET is_active = false WHERE user_id = ${userId}
        `);
      }

      const proxy = credentials?.proxy || credentials?.ari_endpoint || credentials?.domain_name;
      const username = credentials?.account_sid || credentials?.auth_id || credentials?.username;
      const password = credentials?.auth_token || credentials?.password || credentials?.app_password;

      const result = await db.execute(sql`
        UPDATE user_sip_gateways SET
          name       = COALESCE(${name ?? null}, name),
          proxy      = COALESCE(${proxy ?? null}, proxy),
          username   = COALESCE(${username ?? null}, username),
          password   = COALESCE(${password ?? null}, password),
          is_active  = COALESCE(${is_default_outbound !== undefined ? is_default_outbound : null}, is_active),
          updated_at = NOW()
        WHERE id = ${id} AND user_id = ${userId}
        RETURNING *
      `);

      res.json({ success: true, data: result.rows[0] });
    } catch (err: any) {
      console.error('[TelephonyConfigs] PUT error:', err.message);
      res.status(500).json({ error: 'Failed to update telephony configuration' });
    }
  });

  /**
   * DELETE /api/telephony-configs/:id
   * Deletes a carrier configuration
   */
  router.delete('/api/telephony-configs/:id', auth, async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });

      const { id } = req.params;

      await db.execute(sql`
        DELETE FROM user_sip_gateways WHERE id = ${id} AND user_id = ${userId}
      `);

      res.json({ success: true, message: 'Configuration deleted successfully' });
    } catch (err: any) {
      console.error('[TelephonyConfigs] DELETE error:', err.message);
      res.status(500).json({ error: 'Failed to delete telephony configuration' });
    }
  });

  /**
   * POST /api/telephony-configs/:id/default
   * Sets a configuration as the default for outbound calls
   */
  router.post('/api/telephony-configs/:id/default', auth, async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });

      const { id } = req.params;

      await db.execute(sql`
        UPDATE user_sip_gateways SET is_active = false WHERE user_id = ${userId}
      `);

      await db.execute(sql`
        UPDATE user_sip_gateways SET is_active = true WHERE id = ${id} AND user_id = ${userId}
      `);

      res.json({ success: true, message: 'Default outbound configuration updated' });
    } catch (err: any) {
      console.error('[TelephonyConfigs] POST default error:', err.message);
      res.status(500).json({ error: 'Failed to set default configuration' });
    }
  });

  return router;
}
