'use strict';
/**
 * ============================================================
 * Tools & Webhooks Management Routes
 * 
 * Provides full CRUD for AI Agent function tools:
 * HTTP API, Transfer Call, Transfer Agent, End Call, and MCP connectors.
 * Includes a real-time live execution test runner.
 * ============================================================
 */

import { Router, Response } from 'express';
import axios from 'axios';
import { db } from '../db';
import { sql } from 'drizzle-orm';
import { authenticateToken, type AuthRequest } from '../middleware/auth';

// Ensure tools table exists with required fields
(async () => {
  try {
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS tools (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id VARCHAR NOT NULL,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        config JSONB NOT NULL DEFAULT '{}'::jsonb,
        is_active BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);
    console.log('[ToolsRoutes] tools table ready');
  } catch (err: any) {
    console.error('[ToolsRoutes] Init error:', err.message);
  }
})();

export function createToolsRoutes(): Router {
  const router = Router();
  const auth = authenticateToken as unknown as import('express').RequestHandler;

  /**
   * GET /api/tools
   * Lists all tools for the current user
   */
  router.get('/api/tools', auth, async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });

      const status = req.query.status as string; // 'active', 'archived', 'all'
      let filter = sql`user_id = ${userId}`;
      if (status === 'active') {
        filter = sql`user_id = ${userId} AND is_active = true`;
      } else if (status === 'archived') {
        filter = sql`user_id = ${userId} AND is_active = false`;
      }

      const result = await db.execute(sql`
        SELECT 
          id,
          user_id,
          name,
          type,
          config,
          is_active,
          created_at
        FROM tools
        WHERE ${filter}
        ORDER BY created_at DESC
      `);

      res.json(result.rows);
    } catch (err: any) {
      console.error('[Tools] List error:', err);
      res.status(500).json({ error: 'Failed to fetch tools' });
    }
  });

  /**
   * GET /api/tools/:id
   * Returns a single tool by ID
   */
  router.get('/api/tools/:id', auth, async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId;
      const { id } = req.params;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });

      const result = await db.execute(sql`
        SELECT * FROM tools
        WHERE id = ${id} AND user_id = ${userId}
      `);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Tool not found' });
      }

      res.json(result.rows[0]);
    } catch (err: any) {
      console.error('[Tools] Get error:', err);
      res.status(500).json({ error: 'Failed to fetch tool' });
    }
  });

  /**
   * POST /api/tools
   * Creates a new function tool
   */
  router.post('/api/tools', auth, async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });

      const { name, type, config } = req.body;
      if (!name || !type) {
        return res.status(400).json({ error: 'Name and type are required' });
      }

      const result = await db.execute(sql`
        INSERT INTO tools (user_id, name, type, config, is_active)
        VALUES (
          ${userId}, 
          ${name}, 
          ${type}, 
          ${JSON.stringify(config || {})}::jsonb, 
          true
        )
        RETURNING *
      `);

      res.status(201).json(result.rows[0]);
    } catch (err: any) {
      console.error('[Tools] Create error:', err);
      res.status(500).json({ error: 'Failed to create tool' });
    }
  });

  /**
   * PUT /api/tools/:id
   * Updates an existing tool
   */
  router.put('/api/tools/:id', auth, async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId;
      const { id } = req.params;
      const { name, type, config, is_active } = req.body;

      if (!userId) return res.status(401).json({ error: 'Unauthorized' });

      const result = await db.execute(sql`
        UPDATE tools
        SET 
          name = COALESCE(${name}, name),
          type = COALESCE(${type}, type),
          config = COALESCE(${JSON.stringify(config)}::jsonb, config),
          is_active = COALESCE(${is_active}, is_active)
        WHERE id = ${id} AND user_id = ${userId}
        RETURNING *
      `);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Tool not found' });
      }

      res.json(result.rows[0]);
    } catch (err: any) {
      console.error('[Tools] Update error:', err);
      res.status(500).json({ error: 'Failed to update tool' });
    }
  });

  /**
   * DELETE /api/tools/:id
   * Soft-archives a tool (sets is_active = false)
   */
  router.delete('/api/tools/:id', auth, async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId;
      const { id } = req.params;
      const hard = req.query.hard === 'true';

      if (!userId) return res.status(401).json({ error: 'Unauthorized' });

      if (hard) {
        await db.execute(sql`DELETE FROM tools WHERE id = ${id} AND user_id = ${userId}`);
      } else {
        await db.execute(sql`UPDATE tools SET is_active = false WHERE id = ${id} AND user_id = ${userId}`);
      }

      res.json({ success: true, id, archived: !hard });
    } catch (err: any) {
      console.error('[Tools] Delete error:', err);
      res.status(500).json({ error: 'Failed to delete tool' });
    }
  });

  /**
   * POST /api/tools/:id/unarchive
   * Restores an archived tool
   */
  router.post('/api/tools/:id/unarchive', auth, async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId;
      const { id } = req.params;

      if (!userId) return res.status(401).json({ error: 'Unauthorized' });

      const result = await db.execute(sql`
        UPDATE tools
        SET is_active = true
        WHERE id = ${id} AND user_id = ${userId}
        RETURNING *
      `);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Tool not found' });
      }

      res.json(result.rows[0]);
    } catch (err: any) {
      console.error('[Tools] Unarchive error:', err);
      res.status(500).json({ error: 'Failed to unarchive tool' });
    }
  });

  /**
   * POST /api/tools/test
   * Live HTTP tool test execution harness
   */
  router.post('/api/tools/test', auth, async (req: AuthRequest, res: Response) => {
    const startTime = Date.now();
    try {
      const { method = 'GET', url, headers = {}, params = {}, body, timeout = 5000 } = req.body;

      if (!url) {
        return res.status(400).json({ error: 'URL is required' });
      }

      // Substitute URL path variables if any, e.g. {id} -> value
      let resolvedUrl = url;
      if (params && typeof params === 'object') {
        Object.entries(params).forEach(([key, val]) => {
          resolvedUrl = resolvedUrl.replace(new RegExp(`{${key}}`, 'g'), encodeURIComponent(String(val)));
        });
      }

      // Convert custom headers array or object to clean headers record
      const cleanHeaders: Record<string, string> = {};
      if (Array.isArray(headers)) {
        headers.forEach((h: any) => {
          if (h.key && h.key.trim()) cleanHeaders[h.key.trim()] = h.value || '';
        });
      } else if (typeof headers === 'object' && headers !== null) {
        Object.assign(cleanHeaders, headers);
      }

      // Execute real HTTP request
      const response = await axios({
        method: method.toLowerCase(),
        url: resolvedUrl,
        headers: {
          'User-Agent': 'KodeWaves-VoiceAgent/1.0',
          'Accept': 'application/json, text/plain, */*',
          ...cleanHeaders,
        },
        params: method.toUpperCase() === 'GET' ? params : undefined,
        data: ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase()) ? body : undefined,
        timeout: Math.min(Number(timeout) || 5000, 15000), // Max 15s
        validateStatus: () => true, // Don't throw on 4xx/5xx so user can inspect response
      });

      const latencyMs = Date.now() - startTime;

      res.json({
        success: response.status >= 200 && response.status < 400,
        status: response.status,
        statusText: response.statusText,
        latencyMs,
        headers: response.headers,
        data: response.data,
      });
    } catch (err: any) {
      const latencyMs = Date.now() - startTime;
      console.error('[Tools] Test execution failed:', err.message);
      res.status(500).json({
        success: false,
        error: err.message,
        latencyMs,
        details: err.response?.data || null,
      });
    }
  });

  return router;
}

export default createToolsRoutes;
