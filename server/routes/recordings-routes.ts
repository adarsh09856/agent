'use strict';
/**
 * ============================================================
 * Recordings & Audio Assets Routes
 * 
 * Manages organization audio recordings (greetings, voicemails, prompts)
 * and TTS speech cache invalidation.
 * ============================================================
 */

import { Router, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { randomUUID } from 'crypto';
import { db } from '../db';
import { sql } from 'drizzle-orm';
import { authenticateToken, type AuthRequest } from '../middleware/auth';

// Ensure storage directory exists
const RECORDINGS_DIR = path.join(process.cwd(), 'public', 'recordings');
if (!fs.existsSync(RECORDINGS_DIR)) {
  fs.mkdirSync(RECORDINGS_DIR, { recursive: true });
}

// Multer storage engine
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, RECORDINGS_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || '.mp3';
    const uuid = randomUUID();
    cb(null, `rec_${uuid}${ext}`);
  },
});

const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowed = [
    'audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/wave',
    'audio/x-wav', 'audio/ogg', 'audio/m4a', 'audio/x-m4a', 'audio/mp4'
  ];
  if (allowed.includes(file.mimetype.toLowerCase()) || file.originalname.match(/\.(mp3|wav|ogg|m4a)$/i)) {
    cb(null, true);
  } else {
    cb(new Error('Only MP3, WAV, OGG, and M4A audio files are allowed.'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
});

// Self-healing database table initializations
(async () => {
  try {
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS user_audio_recordings (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR NOT NULL,
        name VARCHAR(255) NOT NULL,
        filename VARCHAR(255) NOT NULL,
        file_url TEXT NOT NULL,
        duration_seconds REAL DEFAULT 0,
        format VARCHAR(20) DEFAULT 'mp3',
        size_bytes INTEGER DEFAULT 0,
        mime_type VARCHAR(100) DEFAULT 'audio/mpeg',
        tag VARCHAR(50) DEFAULT 'general',
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS user_tts_cache (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR NOT NULL,
        phrase TEXT NOT NULL,
        voice VARCHAR(100) NOT NULL,
        provider VARCHAR(50) NOT NULL,
        file_url TEXT,
        duration_seconds REAL DEFAULT 0,
        hits INTEGER NOT NULL DEFAULT 1,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        last_used_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    console.log('[RecordingsRoutes] user_audio_recordings and user_tts_cache tables ready');
  } catch (err: any) {
    console.error('[RecordingsRoutes] Init error:', err.message);
  }
})();

export function createRecordingsRoutes(): Router {
  const router = Router();
  const auth = authenticateToken as unknown as import('express').RequestHandler;

  /**
   * GET /api/recordings
   * Returns all uploaded audio assets for the authenticated user
   */
  router.get('/api/recordings', auth, async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });

      const result = await db.execute(sql`
        SELECT 
          id,
          user_id,
          name,
          filename,
          file_url,
          duration_seconds,
          format,
          size_bytes,
          mime_type,
          tag,
          created_at,
          updated_at
        FROM user_audio_recordings
        WHERE user_id = ${userId}
        ORDER BY created_at DESC
      `);

      res.json(result.rows);
    } catch (err: any) {
      console.error('[Recordings] List error:', err);
      res.status(500).json({ error: 'Failed to fetch recordings' });
    }
  });

  /**
   * POST /api/recordings/upload
   * Uploads a new audio file and saves record
   */
  router.post('/api/recordings/upload', auth, upload.single('audio'), async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });

      if (!req.file) {
        return res.status(400).json({ error: 'No audio file provided' });
      }

      const rawName = req.body.name || req.file.originalname.replace(/\.[^/.]+$/, '');
      const tag = req.body.tag || 'general';
      const fileUrl = `/recordings/${req.file.filename}`;
      const ext = path.extname(req.file.filename).replace('.', '').toLowerCase() || 'mp3';

      const insertResult = await db.execute(sql`
        INSERT INTO user_audio_recordings (
          user_id, name, filename, file_url, format, size_bytes, mime_type, tag, duration_seconds
        ) VALUES (
          ${userId}, ${rawName}, ${req.file.filename}, ${fileUrl}, ${ext}, ${req.file.size}, ${req.file.mimetype}, ${tag}, 0
        )
        RETURNING *
      `);

      const created = insertResult.rows[0];
      res.status(201).json(created);
    } catch (err: any) {
      console.error('[Recordings] Upload error:', err);
      res.status(500).json({ error: 'Failed to save recording' });
    }
  });

  /**
   * PATCH /api/recordings/:id
   * Updates recording metadata (name, tag)
   */
  router.patch('/api/recordings/:id', auth, async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId;
      const { id } = req.params;
      const { name, tag } = req.body;

      if (!userId) return res.status(401).json({ error: 'Unauthorized' });

      const result = await db.execute(sql`
        UPDATE user_audio_recordings
        SET 
          name = COALESCE(${name}, name),
          tag = COALESCE(${tag}, tag),
          updated_at = NOW()
        WHERE id = ${id} AND user_id = ${userId}
        RETURNING *
      `);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Recording not found' });
      }

      res.json(result.rows[0]);
    } catch (err: any) {
      console.error('[Recordings] Update error:', err);
      res.status(500).json({ error: 'Failed to update recording' });
    }
  });

  /**
   * DELETE /api/recordings/:id
   * Deletes recording file and database record
   */
  router.delete('/api/recordings/:id', auth, async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId;
      const { id } = req.params;

      if (!userId) return res.status(401).json({ error: 'Unauthorized' });

      const check = await db.execute(sql`
        SELECT filename FROM user_audio_recordings
        WHERE id = ${id} AND user_id = ${userId}
      `);

      if (check.rows.length === 0) {
        return res.status(404).json({ error: 'Recording not found' });
      }

      const filename = (check.rows[0] as any).filename;
      const filePath = path.join(RECORDINGS_DIR, filename);

      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (unlinkErr) {
          console.warn('[Recordings] Unlink file warning:', unlinkErr);
        }
      }

      await db.execute(sql`
        DELETE FROM user_audio_recordings
        WHERE id = ${id} AND user_id = ${userId}
      `);

      res.json({ success: true, id });
    } catch (err: any) {
      console.error('[Recordings] Delete error:', err);
      res.status(500).json({ error: 'Failed to delete recording' });
    }
  });

  /**
   * GET /api/tts-cache
   * Returns cached speech entries for organization
   */
  router.get('/api/tts-cache', auth, async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });

      const result = await db.execute(sql`
        SELECT 
          id,
          user_id,
          phrase,
          voice,
          provider,
          file_url,
          duration_seconds,
          hits,
          created_at,
          last_used_at
        FROM user_tts_cache
        WHERE user_id = ${userId}
        ORDER BY last_used_at DESC
        LIMIT 100
      `);

      res.json(result.rows);
    } catch (err: any) {
      console.error('[Recordings] TTS Cache error:', err);
      res.status(500).json({ error: 'Failed to list TTS cache' });
    }
  });

  /**
   * POST /api/tts-cache/:id/invalidate
   * Invalidates a cached speech entry
   */
  router.post('/api/tts-cache/:id/invalidate', auth, async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId;
      const { id } = req.params;

      if (!userId) return res.status(401).json({ error: 'Unauthorized' });

      await db.execute(sql`
        DELETE FROM user_tts_cache
        WHERE id = ${id} AND user_id = ${userId}
      `);

      res.json({ success: true, invalidatedId: id });
    } catch (err: any) {
      console.error('[Recordings] Invalidate cache error:', err);
      res.status(500).json({ error: 'Failed to invalidate cache' });
    }
  });

  return router;
}

export default createRecordingsRoutes;
