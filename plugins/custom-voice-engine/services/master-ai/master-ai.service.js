/**
 * Master AI Engine (Compiled JS Mirror)
 */
const DEFAULT_BACKCHANNELS = {
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
  customBackchannels = {};
  hangupPhrases = [...DEFAULT_HANGUP_PHRASES];
  transferPhrases = [...DEFAULT_TRANSFER_PHRASES];

  constructor(customDictionaries) {
    if (customDictionaries) {
      for (const [lang, words] of Object.entries(customDictionaries)) {
        this.customBackchannels[lang] = new Set(words.map(w => w.toLowerCase().trim()));
      }
    }
  }

  isBackchannel(text, lang = 'en') {
    const clean = text.toLowerCase().replace(/[^\w\s-]/g, '').trim();
    if (!clean) return false;

    const customSet = this.customBackchannels[lang];
    if (customSet && customSet.has(clean)) return true;

    const builtInSet = DEFAULT_BACKCHANNELS[lang] || DEFAULT_BACKCHANNELS.en;
    if (builtInSet.has(clean)) return true;

    if (DEFAULT_BACKCHANNELS.hi.has(clean) || DEFAULT_BACKCHANNELS.en.has(clean)) {
      return true;
    }

    for (const phrase of builtInSet) {
      if (clean === phrase || clean.includes(phrase)) return true;
    }
    for (const phrase of DEFAULT_BACKCHANNELS.hi) {
      if (clean === phrase || clean.includes(phrase)) return true;
    }

    return false;
  }

  isHardInterruption(text) {
    const clean = text.toLowerCase().replace(/[^\w\s-]/g, '').trim();
    if (!clean) return false;

    if (HARD_INTERRUPTIONS.has(clean)) return true;

    for (const phrase of HARD_INTERRUPTIONS) {
      if (clean.startsWith(phrase) || clean === phrase) return true;
    }

    return false;
  }

  evaluateAction(text, agentConfig) {
    const clean = text.toLowerCase().replace(/[^\w\s-]/g, '').trim();
    if (!clean || clean.length > 80) return null;

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

  matchInstantFaq(userText, faqs) {
    if (!faqs || faqs.length === 0 || !userText) return null;

    const queryTokens = this.tokenize(userText);
    if (queryTokens.length === 0) return null;

    let bestMatch = null;
    let highestScore = 0;

    for (const faq of faqs) {
      for (const pattern of faq.questionPatterns) {
        const patternTokens = this.tokenize(pattern);
        if (patternTokens.length === 0) continue;

        const normQuery = userText.toLowerCase().replace(/[^\w\s]/g, '').trim();
        const normPattern = pattern.toLowerCase().replace(/[^\w\s]/g, '').trim();
        if (normQuery === normPattern || normQuery.includes(normPattern) || normPattern.includes(normQuery)) {
          return faq;
        }

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

  extractSlots(text) {
    const rawEntities = {};
    const result = { rawEntities };

    const phoneMatch = text.match(/(?:\+91|91)?[\s-]?[6-9]\d{9}\b/) || text.match(/\b\d{10}\b/);
    if (phoneMatch) {
      result.phoneNumber = phoneMatch[0].replace(/[^\d+]/g, '');
      rawEntities.phoneNumber = result.phoneNumber;
    }

    const pinMatch = text.match(/\b[1-9]\d{5}\b/);
    if (pinMatch) {
      result.pincode = pinMatch[0];
      rawEntities.pincode = result.pincode;
    }

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

    const timeMatch = text.match(/\b(?:1[0-2]|0?[1-9])(?::[0-5]\d)?\s*(?:am|pm)\b/i) || text.match(/\b(?:[01]?\d|2[0-3]):[0-5]\d\b/);
    if (timeMatch) {
      result.timeSlot = timeMatch[0].trim();
      rawEntities.time = result.timeSlot;
    }

    return result;
  }

  tokenize(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 1 && !this.isStopWord(w));
  }

  isStopWord(word) {
    const stops = new Set(['the', 'is', 'at', 'which', 'on', 'a', 'an', 'in', 'to', 'for', 'of', 'and']);
    return stops.has(word);
  }
}
