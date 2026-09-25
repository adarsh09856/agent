import { db } from "../db";
import { sql } from "drizzle-orm";
import twilio from "twilio";
import { decryptCredential } from "./credential-crypto";
import { getTwilioClient } from "./twilio-connector";

/**
 * Universal Twilio Client Resolver
 * 1. Checks user_provider_credentials for user's own Account SID + Auth Token
 * 2. If not found or verified, falls back to admin global credentials
 */
export async function getUserTwilioClient(userId: string) {
  try {
    const result = await db.execute(sql`
      SELECT account_id, api_key, is_verified
      FROM user_provider_credentials
      WHERE user_id = ${userId} AND provider = 'twilio' LIMIT 1
    `);

    if (result.rows.length > 0) {
      const row = result.rows[0] as any;
      const accountSid = decryptCredential(row.account_id);
      const authToken = decryptCredential(row.api_key);

      if (accountSid && authToken) {
        return twilio(accountSid, authToken, { accountSid });
      }
    }
  } catch (err: any) {
    console.warn(`[UserProviderClient] Failed to load user credentials for user ${userId}, falling back to admin:`, err.message);
  }

  // Fallback to platform admin Twilio client
  return getTwilioClient();
}

/**
 * Check if the administrator allows user BYOK globally
 */
export async function isByokAllowed(): Promise<boolean> {
  try {
    const result = await db.execute(sql`
      SELECT value FROM global_settings WHERE key = 'allow_user_byok' LIMIT 1
    `);
    if (!result.rows || result.rows.length === 0) {
      return true; // default true if setting does not exist yet
    }
    let val: any = result.rows[0]?.value;
    if (typeof val === 'string') {
      try { val = JSON.parse(val); } catch (e) {}
    }
    if (val === 'false' || val === false) {
      return false;
    }
    return true; // default true
  } catch (err: any) {
    return true;
  }
}

/**
 * Universal API Key Resolver for STT, LLM, or TTS
 */
export async function getUserProviderKey(userId: string, provider: string): Promise<string | null> {
  // Check if admin allows BYOK
  const allowed = await isByokAllowed();
  if (!allowed) {
    console.log(`[UserProviderClient] Admin has disabled BYOK globally. Bypassing user key for ${provider}.`);
    return null;
  }

  try {
    const result = await db.execute(sql`
      SELECT api_key
      FROM user_provider_credentials
      WHERE user_id = ${userId} AND provider = ${provider} LIMIT 1
    `);

    if (result.rows.length > 0) {
      const row = result.rows[0] as any;
      const key = decryptCredential(row.api_key);
      if (key) return key;
    }
  } catch (err: any) {
    console.warn(`[UserProviderClient] Failed to load ${provider} key for user ${userId}:`, err.message);
  }

  return null;
}

/**
 * Dual-Key Resolver: Resolves key and indicates if call is BYOK ($0 credits) or Platform Admin (deduct credits)
 */
export async function resolveProviderCredential(
  userId: string,
  provider: string,
  agentByokKey?: string | null
): Promise<{ apiKey: string | null; isByok: boolean }> {
  const allowed = await isByokAllowed();

  if (allowed) {
    // 1. Check Agent-level BYOK key
    if (agentByokKey && agentByokKey.trim()) {
      return { apiKey: agentByokKey.trim(), isByok: true };
    }

    // 2. Check User Workspace-level BYOK key
    const userKey = await getUserProviderKey(userId, provider);
    if (userKey && userKey.trim()) {
      return { apiKey: userKey.trim(), isByok: true };
    }
  } else {
    console.log(`[UserProviderClient] BYOK is disabled by admin. Enforcing platform keys for ${provider}.`);
  }

  // 3. Fallback to Admin Platform Key (from ve_provider_configs or environment)
  try {
    const adminConfig = await db.execute(sql`
      SELECT stt_api_key, llm_api_key, tts_api_key
      FROM ve_provider_configs
      WHERE user_id = 'admin' OR user_id = 'system'
      ORDER BY updated_at DESC LIMIT 1
    `);

    if (adminConfig.rows.length > 0) {
      const row = adminConfig.rows[0] as any;
      if (provider === 'deepgram' && (row.stt_api_key || row.tts_api_key)) {
        return { apiKey: row.stt_api_key || row.tts_api_key, isByok: false };
      }
      if ((provider === 'gemini' || provider === 'openai' || provider === 'openrouter') && row.llm_api_key) {
        return { apiKey: row.llm_api_key, isByok: false };
      }
    }
  } catch { /* ignore */ }

  // Fallback to environment variables
  let envKey: string | undefined;
  if (provider === 'deepgram') envKey = process.env.DEEPGRAM_API_KEY;
  else if (provider === 'gemini') envKey = process.env.GEMINI_API_KEY;
  else if (provider === 'openai') envKey = process.env.OPENAI_API_KEY;
  else if (provider === 'openrouter') envKey = process.env.OPENROUTER_API_KEY;
  else if (provider === 'sarvam') envKey = process.env.SARVAM_API_KEY;

  return { apiKey: envKey || null, isByok: false };
}
