import { Router, Response } from "express";
import { RouteContext, AuthRequest } from "./common";
import { sql } from "drizzle-orm";
import twilio from "twilio";
import { encryptCredential, decryptCredential, maskKey } from "../services/credential-crypto";
import { isByokAllowed } from "../services/user-provider-client";

export function createUserProviderCredentialsRoutes(ctx: RouteContext): Router {
  const router = Router();
  const { db, authenticateToken } = ctx;

  // Auto-create table if not exists
  (async () => {
    try {
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS user_provider_credentials (
          id           VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
          user_id      VARCHAR NOT NULL,
          provider     VARCHAR NOT NULL,
          account_id   TEXT,
          api_key      TEXT,
          is_verified  BOOLEAN DEFAULT false,
          created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          UNIQUE(user_id, provider)
        );
      `);
      console.log('✅ [UserProviderCredentials] Table verified/created');
    } catch (err: any) {
      console.error('❌ [UserProviderCredentials] Table init error:', err.message);
    }
  })();

  /**
   * GET /api/user/provider-credentials
   * Returns all credentials for current user with masked secrets
   */
  router.get("/api/user/provider-credentials", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId!;
      const byokAllowed = await isByokAllowed();
      const result = await db.execute(sql`
        SELECT provider, account_id, api_key, is_verified, updated_at
        FROM user_provider_credentials
        WHERE user_id = ${userId}
      `);

      const credentials: Record<string, any> = {};
      for (const row of result.rows as any[]) {
        const rawKey = decryptCredential(row.api_key);
        const rawAccountId = decryptCredential(row.account_id);
        credentials[row.provider] = {
          provider: row.provider,
          accountId: row.account_id ? maskKey(rawAccountId) : null,
          apiKey: row.api_key ? maskKey(rawKey) : null,
          hasKey: !!row.api_key,
          hasAccountId: !!row.account_id,
          isVerified: row.is_verified,
          updatedAt: row.updated_at,
        };
      }

      res.json({ success: true, data: credentials, byokAllowed });
    } catch (err: any) {
      console.error('[UserProviderCredentials] GET error:', err.message);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  /**
   * POST /api/user/provider-credentials
   * Saves or updates a provider's credentials for the user
   */
  router.post("/api/user/provider-credentials", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId!;
      const { provider, accountId, apiKey } = req.body;

      if (req.userRole !== 'admin') {
        const allowed = await isByokAllowed();
        if (!allowed) {
          return res.status(403).json({
            success: false,
            error: "Custom BYOK keys are currently disabled by platform policy. Platform-managed high performance routing and credit metering are enforced."
          });
        }
      }

      if (!provider) {
        return res.status(400).json({ success: false, error: "Provider is required" });
      }

      const encryptedAccountId = accountId ? encryptCredential(accountId.trim()) : null;
      const encryptedApiKey = apiKey ? encryptCredential(apiKey.trim()) : null;

      await db.execute(sql`
        INSERT INTO user_provider_credentials (user_id, provider, account_id, api_key, is_verified, updated_at)
        VALUES (${userId}, ${provider}, ${encryptedAccountId}, ${encryptedApiKey}, false, NOW())
        ON CONFLICT (user_id, provider) DO UPDATE SET
          account_id = COALESCE(EXCLUDED.account_id, user_provider_credentials.account_id),
          api_key = COALESCE(EXCLUDED.api_key, user_provider_credentials.api_key),
          is_verified = false,
          updated_at = NOW()
      `);

      // Dual-Sync to ve_provider_configs for Custom Voice Engine plugin harmony
      if (provider === 'deepgram' && apiKey) {
        await db.execute(sql`
          INSERT INTO ve_provider_configs (user_id, stt_provider, stt_api_key, tts_provider, tts_api_key, updated_at)
          VALUES (${userId}, 'deepgram', ${apiKey.trim()}, 'deepgram', ${apiKey.trim()}, NOW())
          ON CONFLICT (user_id) DO UPDATE SET
            stt_api_key = ${apiKey.trim()},
            tts_api_key = ${apiKey.trim()},
            updated_at = NOW()
        `);
      } else if (provider === 'gemini' && apiKey) {
        await db.execute(sql`
          INSERT INTO ve_provider_configs (user_id, llm_provider, llm_api_key, updated_at)
          VALUES (${userId}, 'gemini', ${apiKey.trim()}, NOW())
          ON CONFLICT (user_id) DO UPDATE SET
            llm_provider = 'gemini',
            llm_api_key = ${apiKey.trim()},
            updated_at = NOW()
        `);
      } else if (provider === 'openrouter' && apiKey) {
        await db.execute(sql`
          INSERT INTO ve_provider_configs (user_id, llm_provider, llm_api_key, updated_at)
          VALUES (${userId}, 'openrouter', ${apiKey.trim()}, NOW())
          ON CONFLICT (user_id) DO UPDATE SET
            llm_provider = 'openrouter',
            llm_api_key = ${apiKey.trim()},
            updated_at = NOW()
        `);
      } else if (provider === 'openai' && apiKey) {
        await db.execute(sql`
          INSERT INTO ve_provider_configs (user_id, llm_provider, llm_api_key, updated_at)
          VALUES (${userId}, 'openai', ${apiKey.trim()}, NOW())
          ON CONFLICT (user_id) DO UPDATE SET
            llm_provider = 'openai',
            llm_api_key = ${apiKey.trim()},
            updated_at = NOW()
        `);
      }

      res.json({ success: true, message: `${provider} credentials saved successfully` });
    } catch (err: any) {
      console.error('[UserProviderCredentials] POST error:', err.message);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  /**
   * POST /api/user/provider-credentials/verify
   * Tests connectivity with the third-party provider API
   */
  router.post("/api/user/provider-credentials/verify", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId!;
      const { provider } = req.body;

      const result = await db.execute(sql`
        SELECT account_id, api_key FROM user_provider_credentials
        WHERE user_id = ${userId} AND provider = ${provider} LIMIT 1
      `);

      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, error: "Credentials not configured for this provider" });
      }

      const row = result.rows[0] as any;
      const accountId = decryptCredential(row.account_id);
      const apiKey = decryptCredential(row.api_key);

      let verified = false;
      let verifyMessage = "Connected successfully";

      if (provider === 'twilio') {
        if (!accountId || !apiKey) {
          return res.status(400).json({ success: false, error: "Account SID and Auth Token required" });
        }
        const client = twilio(accountId, apiKey);
        await client.api.v2010.accounts(accountId).fetch();
        verified = true;
      } else if (provider === 'deepgram') {
        if (!apiKey) {
          return res.status(400).json({ success: false, error: "Deepgram API key required" });
        }
        const dgRes = await fetch("https://api.deepgram.com/v1/projects", {
          headers: { Authorization: `Token ${apiKey}` },
        });
        if (!dgRes.ok) {
          throw new Error(`Deepgram API returned ${dgRes.status}: ${dgRes.statusText}`);
        }
        verified = true;
      } else if (provider === 'gemini') {
        if (!apiKey) {
          return res.status(400).json({ success: false, error: "Gemini API key required" });
        }
        const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        if (!geminiRes.ok) {
          throw new Error(`Gemini API returned ${geminiRes.status}: ${geminiRes.statusText}`);
        }
        verified = true;
      } else if (provider === 'openrouter') {
        if (!apiKey) {
          return res.status(400).json({ success: false, error: "OpenRouter API key required" });
        }
        const orRes = await fetch("https://openrouter.ai/api/v1/auth/key", {
          headers: { Authorization: `Bearer ${apiKey}` },
        });
        if (!orRes.ok) {
          throw new Error(`OpenRouter API returned ${orRes.status}: ${orRes.statusText}`);
        }
        verified = true;
      } else if (provider === 'openai') {
        if (!apiKey) {
          return res.status(400).json({ success: false, error: "OpenAI API key required" });
        }
        const oaiRes = await fetch("https://api.openai.com/v1/models", {
          headers: { Authorization: `Bearer ${apiKey}` },
        });
        if (!oaiRes.ok) {
          throw new Error(`OpenAI API returned ${oaiRes.status}: ${oaiRes.statusText}`);
        }
        verified = true;
      } else {
        // Generic acknowledgment
        verified = true;
      }

      if (verified) {
        await db.execute(sql`
          UPDATE user_provider_credentials
          SET is_verified = true, updated_at = NOW()
          WHERE user_id = ${userId} AND provider = ${provider}
        `);
      }

      res.json({ success: true, verified, message: verifyMessage });
    } catch (err: any) {
      console.error('[UserProviderCredentials] Verify error:', err.message);
      res.status(400).json({ success: false, error: err.message || "Failed to verify credentials" });
    }
  });

  /**
   * POST /api/user/provider-credentials/sync-numbers
   * Auto-imports phone numbers from the user's provider account into user_sip_phone_numbers
   */
  router.post("/api/user/provider-credentials/sync-numbers", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId!;
      const { provider } = req.body;

      if (provider !== 'twilio') {
        return res.status(400).json({ success: false, error: "Only Twilio number sync is currently supported" });
      }

      const result = await db.execute(sql`
        SELECT account_id, api_key FROM user_provider_credentials
        WHERE user_id = ${userId} AND provider = 'twilio' LIMIT 1
      `);

      if (result.rows.length === 0) {
        return res.status(400).json({ success: false, error: "Twilio credentials not configured" });
      }

      const row = result.rows[0] as any;
      const accountId = decryptCredential(row.account_id);
      const apiKey = decryptCredential(row.api_key);

      const client = twilio(accountId, apiKey);
      const numbers = await client.incomingPhoneNumbers.list({ limit: 50 });

      let importedCount = 0;
      for (const num of numbers) {
        const existing = await db.execute(sql`
          SELECT id FROM user_sip_phone_numbers WHERE user_id = ${userId} AND phone_number = ${num.phoneNumber} LIMIT 1
        `);
        if (existing.rows.length === 0) {
          await db.execute(sql`
            INSERT INTO user_sip_phone_numbers (user_id, phone_number, label, is_active)
            VALUES (${userId}, ${num.phoneNumber}, ${num.friendlyName || 'Twilio Number'}, true)
          `);
        } else {
          await db.execute(sql`
            UPDATE user_sip_phone_numbers SET is_active = true, updated_at = NOW()
            WHERE id = ${(existing.rows[0] as any).id}
          `);
        }
        importedCount++;
      }

      res.json({
        success: true,
        message: `Successfully synced ${importedCount} phone numbers from Twilio`,
        count: importedCount,
      });
    } catch (err: any) {
      console.error('[UserProviderCredentials] Sync error:', err.message);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  /**
   * DELETE /api/user/provider-credentials/:provider
   */
  router.delete("/api/user/provider-credentials/:provider", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId!;
      const { provider } = req.params;

      await db.execute(sql`
        DELETE FROM user_provider_credentials
        WHERE user_id = ${userId} AND provider = ${provider}
      `);

      res.json({ success: true, message: `${provider} credentials removed` });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  return router;
}
