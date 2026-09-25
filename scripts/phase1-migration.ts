import { db } from '../server/db';
import { sql } from 'drizzle-orm';

async function runPhase1Migration() {
  console.log('Running Phase 1 Database Migrations...');
  
  // 1. Global Governance Setting for Admin BYOK Master Switch
  await db.execute(sql`
    INSERT INTO global_settings (key, value, description)
    VALUES 
      ('allow_user_byok', 'true', 'Master switch: Allow users to provide their own BYOK API keys or force platform keys'),
      ('credits_required', 'true', 'Require active subscription or credit balance to make/receive calls')
    ON CONFLICT (key) DO UPDATE SET description = EXCLUDED.description;
  `);
  console.log('✔ global_settings updated with allow_user_byok');

  // 2. User Subscription Minutes Tracking
  await db.execute(sql`
    ALTER TABLE users ADD COLUMN IF NOT EXISTS subscription_minutes INT DEFAULT 0;
    ALTER TABLE users ADD COLUMN IF NOT EXISTS subscription_minutes_reset_at TIMESTAMP WITH TIME ZONE;
  `);
  console.log('✔ users table updated with subscription_minutes');

  // 3. Master AI Agent Configuration
  await db.execute(sql`
    ALTER TABLE agents ADD COLUMN IF NOT EXISTS master_ai_config JSONB DEFAULT '{
      "enabled": true,
      "keySource": "byok",
      "backchannelFilterEnabled": true,
      "interruptionSensitivity": "medium",
      "autoHangupEnabled": true,
      "hangupPhrases": ["bye", "goodbye", "thank you that is all", "alvida", "call cut kardo"],
      "hangupMessage": "Thank you for calling. Have a great day!",
      "autoTransferEnabled": false,
      "transferPhrases": ["talk to human", "speak to agent", "connect to manager", "operator"],
      "transferDestination": "",
      "transferMessage": "Sure, transferring you to a representative now. Please hold on.",
      "slotExtractionEnabled": true
    }'::jsonb;
  `);
  console.log('✔ agents table updated with master_ai_config');

  // 4. Instant FAQ Table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS ve_agent_instant_faqs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      agent_id VARCHAR(255) NOT NULL,
      user_id VARCHAR(255) NOT NULL,
      question_patterns TEXT[] NOT NULL,
      answer_text TEXT NOT NULL,
      audio_cache_url TEXT,
      audio_cache_size INT DEFAULT 0,
      hit_count INT DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);
  console.log('✔ ve_agent_instant_faqs table verified/created');

  // 5. Master AI Global Dictionaries Table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS ve_master_ai_global_settings (
      id SERIAL PRIMARY KEY,
      backchannel_dictionaries JSONB NOT NULL DEFAULT '{
        "en": ["uh-huh", "yeah", "yes", "right", "okay", "hmm", "got it", "i see", "sure"],
        "hi": ["haan", "achha", "theek hai", "sahi hai", "hmm", "ji", "boliye", "accha"],
        "ta": ["sari", "aama", "solunga", "hmm", "purinjidhu"],
        "te": ["avunu", "sare", "cheppandi", "hmm"],
        "kn": ["haudu", "sari", "heli", "hmm"]
      }'::jsonb,
      action_trigger_phrases JSONB NOT NULL DEFAULT '{
        "hangup": ["bye", "goodbye", "talk to you later", "alvida", "bas itna hi", "call cut kardo"],
        "transfer": ["talk to human", "agent please", "speak to manager", "operator", "real person"]
      }'::jsonb,
      max_eval_latency_ms INT DEFAULT 35,
      max_cache_ram_mb INT DEFAULT 512,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);
  console.log('✔ ve_master_ai_global_settings table verified/created');

  console.log('Phase 1 Migration Succeeded!');
  process.exit(0);
}

runPhase1Migration().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
