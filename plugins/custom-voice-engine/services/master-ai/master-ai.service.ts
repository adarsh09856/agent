/**
 * ============================================================
 * Master AI Engine (System 1 Reflex & Decision Service)
 * 
 * Provides sub-15ms local decision making on the VPS:
 * 1. Smart Backchannel & Barge-in Discrimination (<5ms)
 * 2. Deterministic Action Gate (Instant Hangup / SIP Transfer <10ms)
 * 3. Semantic Instant FAQ & Cache Matcher (<20ms, 0-token answers)
 * 4. Fast Entity & Slot Pre-Extractor (Dates, Times, Phones)
 * ============================================================
 */

export interface CallActionDecision {
  action: 'hangup' | 'transfer' | 'repeat' | 'ignore';
  destination?: string;
  message?: string;
  confidence: number;
}

export interface AgentInstantFaqItem {
  id: string;
  questionPatterns: string[];
  answerText: string;
  audioCacheUrl?: string | null;
}

export interface ExtractedSlots {
  phoneNumber?: string;
  pincode?: string;
  normalizedDate?: string;
  timeSlot?: string;
  rawEntities: Record<string, string>;
}

// Built-in multi-lingual backchannel dictionaries
const DEFAULT_BACKCHANNELS: Record<string, Set<string>> = {
  en: new Set([
    'uh-huh', 'yeah', 'yes', 'right', 'okay', 'hmm', 'got it', 'i see',
    'sure', 'yep', 'yup', 'alright', 'mhm', 'aha', 'cool', 'fine'
  ]),
  hi: new Set([
    'haan', 'achha', 'accha', 'theek hai', 'theek', 'sahi hai', 'hmm',
    'ji', 'boliye', 'sahi', 'acha', 'ha'
  ]),
  ta: new Set([
    'sari', 'aama', 'solunga', 'hmm', 'purinjidhu', 'seri', 'aamam'
  ]),
  te: new Set([
    'avunu', 'sare', 'cheppandi', 'hmm', 'sari'
  ]),
  kn: new Set([
    'haudu', 'sari', 'heli', 'hmm', 'houdu'
  ]),
};

const HARD_INTERRUPTIONS = new Set([
  'wait', 'stop', 'hold on', 'no no', 'listen', 'ek minute', 'ruko',
  'shut up', 'pause', 'hang on', 'wait a second', 'hold up', 'cancel',
  'wait wait', 'stop stop', 'chup', 'arre ruko', 'ruk'
]);

const DEFAULT_HANGUP_PHRASES = [
  'bye', 'goodbye', 'talk to you later', 'alvida', 'bas itna hi',
  'call cut kardo', 'thank you that is all', 'disconnect', 'end call',
  'nothing else', 'that is all', 'thats all', 'no thats it', 'that will be all'
];

const DEFAULT_TRANSFER_PHRASES = [
  'talk to human', 'speak to agent', 'connect to manager', 'operator',
  'real person', 'customer service', 'representative', 'human please',
  'connect me to', 'agent se baat karo', 'kisi se baat karao'
];

export class MasterAIService {
  private customBackchannels: Record<string, Set<string>> = {};
  private hangupPhrases: string[] = [...DEFAULT_HANGUP_PHRASES];
  private transferPhrases: string[] = [...DEFAULT_TRANSFER_PHRASES];

  constructor(customDictionaries?: Record<string, string[]>) {
    if (customDictionaries) {
      for (const [lang, words] of Object.entries(customDictionaries)) {
        this.customBackchannels[lang] = new Set(words.map(w => w.toLowerCase().trim()));
      }
    }
  }

  /**
   * 1. Smart Backchannel Classifier (<5ms)
   * Returns true if the utterance is a passive affirmation ("uh-huh", "haan", "theek hai")
   * that should NOT interrupt agent playback.
   */
  isBackchannel(text: string, lang: string = 'en'): boolean {
    const clean = text.toLowerCase().replace(/[^\w\s-]/g, '').trim();
    if (!clean) return false;

    // Check custom language dictionaries first
    const customSet = this.customBackchannels[lang];
    if (customSet && customSet.has(clean)) return true;

    // Check built-in language dictionary
    const builtInSet = DEFAULT_BACKCHANNELS[lang] || DEFAULT_BACKCHANNELS.en;
    if (builtInSet.has(clean)) return true;

    // Also check cross-language common sets (for Hinglish / Indic callers)
    if (DEFAULT_BACKCHANNELS.hi.has(clean) || DEFAULT_BACKCHANNELS.en.has(clean)) {
      return true;
    }

    // Support compound and conversational backchannels (e.g. "haan theek hai", "theek hai ji")
    for (const phrase of builtInSet) {
      if (clean === phrase || clean.includes(phrase)) return true;
    }
    for (const phrase of DEFAULT_BACKCHANNELS.hi) {
      if (clean === phrase || clean.includes(phrase)) return true;
    }

    return false;
  }

  /**
   * 2. Hard Interruption Detector (<3ms)
   * Returns true if the user explicitly demands the agent stop speaking.
   */
  isHardInterruption(text: string): boolean {
    const clean = text.toLowerCase().replace(/[^\w\s-]/g, '').trim();
    if (!clean) return false;

    if (HARD_INTERRUPTIONS.has(clean)) return true;

    for (const phrase of HARD_INTERRUPTIONS) {
      if (clean.startsWith(phrase) || clean === phrase) return true;
    }

    return false;
  }

  /**
   * 3. Deterministic Action Gate (<10ms)
   * Detects immediate call completion or human escalation commands without LLM tokens.
   */
  evaluateAction(text: string, agentConfig?: any): CallActionDecision | null {
    const clean = text.toLowerCase().replace(/[^\w\s-]/g, '').trim();
    if (!clean || clean.length > 80) return null; // Actions are typically short phrases

    // Check Hangup Triggers
    const customHangup = agentConfig?.masterAiConfig?.hangupPhrases || this.hangupPhrases;
    for (const phrase of customHangup) {
      const normalizedPhrase = phrase.toLowerCase().trim();
      if (clean === normalizedPhrase || clean.startsWith(normalizedPhrase) || clean.endsWith(normalizedPhrase)) {
        return {
          action: 'hangup',
          message: agentConfig?.masterAiConfig?.hangupMessage || "Thank you for your time. Have a great day!",
          confidence: 0.95
        };
      }
    }

    // Check Transfer Triggers
    const customTransfer = agentConfig?.masterAiConfig?.transferPhrases || this.transferPhrases;
    for (const phrase of customTransfer) {
      const normalizedPhrase = phrase.toLowerCase().trim();
      if (clean === normalizedPhrase || clean.includes(normalizedPhrase)) {
        return {
          action: 'transfer',
          destination: agentConfig?.transferPhoneNumber || agentConfig?.masterAiConfig?.transferDestination || 'user/1001',
          message: agentConfig?.masterAiConfig?.transferMessage || "Sure, transferring you to a representative now. Please hold on.",
          confidence: 0.95
        };
      }
    }

    return null;
  }

  /**
   * 4. Semantic Instant FAQ & Cache Matcher (<20ms)
   * Performs fast n-gram & token similarity to match recurring questions without LLM.
   */
  matchInstantFaq(userText: string, faqs: AgentInstantFaqItem[]): AgentInstantFaqItem | null {
    if (!faqs || faqs.length === 0 || !userText) return null;

    const queryTokens = this.tokenize(userText);
    if (queryTokens.length === 0) return null;

    let bestMatch: AgentInstantFaqItem | null = null;
    let highestScore = 0;

    for (const faq of faqs) {
      for (const pattern of faq.questionPatterns) {
        const patternTokens = this.tokenize(pattern);
        if (patternTokens.length === 0) continue;

        // Exact normalized match
        const normQuery = userText.toLowerCase().replace(/[^\w\s]/g, '').trim();
        const normPattern = pattern.toLowerCase().replace(/[^\w\s]/g, '').trim();
        if (normQuery === normPattern || normQuery.includes(normPattern) || normPattern.includes(normQuery)) {
          return faq;
        }

        // Jaccard similarity over word tokens
        const intersection = queryTokens.filter(token => patternTokens.includes(token));
        const union = new Set([...queryTokens, ...patternTokens]);
        const score = intersection.length / union.size;

        if (score > highestScore && score >= 0.75) {
          highestScore = score;
          bestMatch = faq;
        }
      }
    }

    return bestMatch;
  }

  /**
   * 5. Fast Entity & Slot Pre-Extractor (<12ms)
   * Extracts dates, Indian/Global phones, and pincodes before LLM processing.
   */
  extractSlots(text: string): ExtractedSlots {
    const rawEntities: Record<string, string> = {};
    const result: ExtractedSlots = { rawEntities };

    // 10-digit Indian phone or international
    const phoneMatch = text.match(/(?:\+91|91)?[\s-]?[6-9]\d{9}\b/) || text.match(/\b\d{10}\b/);
    if (phoneMatch) {
      result.phoneNumber = phoneMatch[0].replace(/[^\d+]/g, '');
      rawEntities.phoneNumber = result.phoneNumber;
    }

    // 6-digit Indian PIN Code
    const pinMatch = text.match(/\b[1-9]\d{5}\b/);
    if (pinMatch) {
      result.pincode = pinMatch[0];
      rawEntities.pincode = result.pincode;
    }

    // Common relative date expressions
    const lower = text.toLowerCase();
    const now = new Date();
    if (lower.includes('tomorrow')) {
      const tomorrow = new Date(now.getTime() + 86400000);
      result.normalizedDate = tomorrow.toISOString().split('T')[0];
      rawEntities.date = 'tomorrow';
    } else if (lower.includes('today')) {
      result.normalizedDate = now.toISOString().split('T')[0];
      rawEntities.date = 'today';
    }

    // Simple time extraction (e.g. "4 pm", "16:00", "3:30")
    const timeMatch = text.match(/\b(?:1[0-2]|0?[1-9])(?::[0-5]\d)?\s*(?:am|pm)\b/i) || text.match(/\b(?:[01]?\d|2[0-3]):[0-5]\d\b/);
    if (timeMatch) {
      result.timeSlot = timeMatch[0].trim();
      rawEntities.time = result.timeSlot;
    }

    return result;
  }

  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 1 && !this.isStopWord(w));
  }

  private isStopWord(word: string): boolean {
    const stops = new Set(['the', 'is', 'at', 'which', 'on', 'a', 'an', 'in', 'to', 'for', 'of', 'and']);
    return stops.has(word);
  }
}
