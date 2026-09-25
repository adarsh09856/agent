/**
 * ============================================================
 * © 2026 KodeWaves. All rights reserved.
 * Platform: Native Master AI Engine v5.4.5
 * Voice Library: Deepgram Aura, Sarvam AI, OpenAI, ElevenLabs
 * ============================================================
 */
import { useState, useRef, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Play, Mic, Square, Sparkles, Volume2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from 'react-i18next';
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OpenAIVoicePreviewButton from "@/components/OpenAIVoicePreviewButton";

interface AccountVoice {
  voice_id: string;
  name: string;
  category?: string;
  labels?: Record<string, string>;
  preview_url?: string;
}

interface NativeVoiceInfo {
  id: string;
  name: string;
  provider: 'deepgram' | 'sarvam' | 'openai';
  description: string;
  gender: string;
  language: string;
  accent: string;
  style: string;
  sampleText: string;
}

const DEEPGRAM_AURA_VOICES: NativeVoiceInfo[] = [
  { id: 'aura-asteria-en', name: 'Asteria', provider: 'deepgram', description: 'Confident, conversational, natural American female voice. Sub-200ms latency, ideal for customer service and inbound sales.', gender: 'Female', language: 'English (US)', accent: 'American', style: 'Conversational & Confident', sampleText: 'Hello! Thank you for calling. How can I help you today?' },
  { id: 'aura-luna-en', name: 'Luna', provider: 'deepgram', description: 'Warm, empathetic, and friendly American female tone. Perfect for healthcare clinics, support, and concierge.', gender: 'Female', language: 'English (US)', accent: 'American', style: 'Warm & Empathetic', sampleText: 'Hi there, I would be happy to help you schedule your appointment.' },
  { id: 'aura-stella-en', name: 'Stella', provider: 'deepgram', description: 'Articulate, polished, and professional female voice for corporate reception, finance, and executive dispatch.', gender: 'Female', language: 'English (US)', accent: 'American', style: 'Professional & Polished', sampleText: 'Welcome to our executive concierge. Please tell me which department you wish to reach.' },
  { id: 'aura-athena-en', name: 'Athena', provider: 'deepgram', description: 'Sophisticated British female voice with authoritative, formal pronunciation.', gender: 'Female', language: 'English (UK)', accent: 'British', style: 'Sophisticated & Formal', sampleText: 'Good day. Thank you for connecting with our advisory team.' },
  { id: 'aura-hera-en', name: 'Hera', provider: 'deepgram', description: 'Expressive, spirited female voice with dynamic inflection and upbeat cadence.', gender: 'Female', language: 'English (US)', accent: 'American', style: 'Expressive & Upbeat', sampleText: 'Hey there! Great to speak with you today. What can I get started for you?' },
  { id: 'aura-orion-en', name: 'Orion', provider: 'deepgram', description: 'Approachable, clear American male voice with steady conversational pacing.', gender: 'Male', language: 'English (US)', accent: 'American', style: 'Clear & Trustworthy', sampleText: 'Hello! I am your AI assistant. How can I make your day easier?' },
  { id: 'aura-arcas-en', name: 'Arcas', provider: 'deepgram', description: 'Natural, grounded male voice suitable for technical support, troubleshooting, and field logistics.', gender: 'Male', language: 'English (US)', accent: 'American', style: 'Grounded & Natural', sampleText: 'Hi, I can assist you with your account and troubleshooting questions right now.' },
  { id: 'aura-perseus-en', name: 'Perseus', provider: 'deepgram', description: 'Casual, relaxed, friendly male voice for informal check-ins, reminders, and feedback surveys.', gender: 'Male', language: 'English (US)', accent: 'American', style: 'Casual & Friendly', sampleText: 'Hey, thanks for picking up! Just checking in with a quick question for you.' },
  { id: 'aura-angus-en', name: 'Angus', provider: 'deepgram', description: 'Charming Irish male voice with warm, friendly inflection.', gender: 'Male', language: 'English (Ireland)', accent: 'Irish', style: 'Charming & Warm', sampleText: 'Top of the morning to you! How may I assist you today?' },
  { id: 'aura-orpheus-en', name: 'Orpheus', provider: 'deepgram', description: 'Deep, resonant, confident American male voice for executive briefings and high-trust consultations.', gender: 'Male', language: 'English (US)', accent: 'American', style: 'Resonant & Authoritative', sampleText: 'Welcome. I am ready to review your project details and discuss next steps.' },
  { id: 'aura-helios-en', name: 'Helios', provider: 'deepgram', description: 'Calm, refined British male voice suitable for luxury hospitality, consulting, and real estate.', gender: 'Male', language: 'English (UK)', accent: 'British', style: 'Calm & Refined', sampleText: 'Good afternoon. It is a pleasure to assist you with your inquiry today.' },
  { id: 'aura-zeus-en', name: 'Zeus', provider: 'deepgram', description: 'Commanding, deep male voice with substantial gravitas and memorable presence.', gender: 'Male', language: 'English (US)', accent: 'American', style: 'Commanding & Deep', sampleText: 'Greetings. Your inquiry has been routed to our senior automated team.' },
];

const SARVAM_VOICES: NativeVoiceInfo[] = [
  { id: 'bulbul:v1', name: 'Bulbul (Female)', provider: 'sarvam', description: 'Natural Indian female voice supporting Hindi, English, and Hinglish. Ideal for Indian customer service and sales.', gender: 'Female', language: 'Hindi / Hinglish / English', accent: 'Indian', style: 'Natural & Conversational', sampleText: 'Namaste! Main aapki kis prakaar sahayata kar sakti hoon? Thank you for calling.' },
  { id: 'meera:v1', name: 'Meera (Female)', provider: 'sarvam', description: 'Melodious, polite Hindi female voice tailored for patient care, clinics, and front-desk booking.', gender: 'Female', language: 'Hindi / English', accent: 'Indian', style: 'Polite & Melodious', sampleText: 'Namaskar, clinic mein aapka swagat hai. Kya main aapka appointment book kar doon?' },
  { id: 'pavithra:v1', name: 'Pavithra (Female)', provider: 'sarvam', description: 'Articulate South Indian voice with native Tamil and Indian English clarity.', gender: 'Female', language: 'Tamil / Indian English', accent: 'South Indian', style: 'Clear & Expressive', sampleText: 'Vanakkam! Ungaluku enna udhavi thevai padugiradhu? How may I help you today?' },
  { id: 'arvind:v1', name: 'Arvind (Male)', provider: 'sarvam', description: 'Professional Indian male voice with clean diction for business, banking, and order dispatch.', gender: 'Male', language: 'Hindi / Indian English', accent: 'Indian', style: 'Professional & Clear', sampleText: 'Namaste ji. Aapka order successfully confirm ho chuka hai. Anything else I can help with?' },
  { id: 'amartya:v1', name: 'Amartya (Male)', provider: 'sarvam', description: 'Warm, friendly Indian male voice supporting Bengali, Hindi, and Indian English.', gender: 'Male', language: 'Bengali / Hindi / English', accent: 'Indian', style: 'Warm & Friendly', sampleText: 'Nomoshkar! Apnar call er jonno dhonyobad. I am here to help you.' },
];

interface OpenAIVoiceInfo {
  id: string;
  name: string;
  description: string;
  gender: string;
  style: string;
}

const OPENAI_VOICES: OpenAIVoiceInfo[] = [
  { id: 'alloy', name: 'Alloy', description: 'Neutral, versatile voice suitable for a wide range of applications', gender: 'Neutral', style: 'Balanced' },
  { id: 'echo', name: 'Echo', description: 'Warm, engaging voice with a friendly tone', gender: 'Male', style: 'Warm' },
  { id: 'shimmer', name: 'Shimmer', description: 'Expressive, dynamic voice with clear articulation', gender: 'Female', style: 'Expressive' },
  { id: 'ash', name: 'Ash', description: 'Calm, professional voice ideal for business contexts', gender: 'Male', style: 'Professional' },
  { id: 'ballad', name: 'Ballad', description: 'Smooth, melodic voice with a soothing quality', gender: 'Female', style: 'Melodic' },
  { id: 'coral', name: 'Coral', description: 'Bright, energetic voice with an upbeat tone', gender: 'Female', style: 'Energetic' },
  { id: 'sage', name: 'Sage', description: 'Wise, authoritative voice conveying expertise', gender: 'Male', style: 'Authoritative' },
  { id: 'verse', name: 'Verse', description: 'Articulate, clear voice perfect for narration', gender: 'Neutral', style: 'Narrative' },
  { id: 'cedar', name: 'Cedar', description: 'Deep, resonant voice with a grounded presence', gender: 'Male', style: 'Deep' },
  { id: 'marin', name: 'Marin', description: 'Fresh, youthful voice with modern appeal', gender: 'Female', style: 'Youthful' },
];

export default function Voices() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("deepgram");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Query ElevenLabs voices only if activeTab is elevenlabs
  const { data: accountVoices, isLoading: isElevenLoading } = useQuery<AccountVoice[]>({
    queryKey: ["/api/elevenlabs/voices"],
    staleTime: 60000,
    enabled: activeTab === "elevenlabs",
    retry: false,
  });

  const filteredDeepgramVoices = useMemo(() => {
    if (!debouncedSearch) return DEEPGRAM_AURA_VOICES;
    const q = debouncedSearch.toLowerCase();
    return DEEPGRAM_AURA_VOICES.filter(v =>
      v.name.toLowerCase().includes(q) ||
      v.description.toLowerCase().includes(q) ||
      v.style.toLowerCase().includes(q) ||
      v.gender.toLowerCase().includes(q)
    );
  }, [debouncedSearch]);

  const filteredSarvamVoices = useMemo(() => {
    if (!debouncedSearch) return SARVAM_VOICES;
    const q = debouncedSearch.toLowerCase();
    return SARVAM_VOICES.filter(v =>
      v.name.toLowerCase().includes(q) ||
      v.description.toLowerCase().includes(q) ||
      v.language.toLowerCase().includes(q) ||
      v.gender.toLowerCase().includes(q)
    );
  }, [debouncedSearch]);

  const filteredOpenAIVoices = useMemo(() => {
    if (!debouncedSearch) return OPENAI_VOICES;
    const q = debouncedSearch.toLowerCase();
    return OPENAI_VOICES.filter(v =>
      v.name.toLowerCase().includes(q) ||
      v.description.toLowerCase().includes(q) ||
      v.style.toLowerCase().includes(q) ||
      v.gender.toLowerCase().includes(q)
    );
  }, [debouncedSearch]);

  const filteredElevenVoices = useMemo(() => {
    if (!accountVoices) return [];
    if (!debouncedSearch) return accountVoices;
    const q = debouncedSearch.toLowerCase();
    return accountVoices.filter(v =>
      v.name.toLowerCase().includes(q) ||
      v.labels?.language?.toLowerCase().includes(q) ||
      v.labels?.gender?.toLowerCase().includes(q) ||
      v.labels?.accent?.toLowerCase().includes(q) ||
      v.category?.toLowerCase().includes(q)
    );
  }, [accountVoices, debouncedSearch]);

  const handlePlayPreview = (voiceId: string, previewUrl?: string, sampleText?: string) => {
    if (playingVoice === voiceId) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setPlayingVoice(null);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    if (previewUrl) {
      const audio = new Audio(previewUrl);
      audioRef.current = audio;
      audio.play().catch(() => {});
      setPlayingVoice(voiceId);
      audio.onended = () => {
        setPlayingVoice(null);
        audioRef.current = null;
      };
    } else if ('speechSynthesis' in window && sampleText) {
      const utterance = new SpeechSynthesisUtterance(sampleText);
      utterance.rate = 1.0;
      utterance.onend = () => setPlayingVoice(null);
      utterance.onerror = () => setPlayingVoice(null);
      setPlayingVoice(voiceId);
      window.speechSynthesis.speak(utterance);
    }
  };

  const getTotalVoiceCount = () => {
    if (activeTab === "deepgram") return DEEPGRAM_AURA_VOICES.length;
    if (activeTab === "sarvam") return SARVAM_VOICES.length;
    if (activeTab === "openai") return OPENAI_VOICES.length;
    return accountVoices?.length || 0;
  };

  const getFilteredCount = () => {
    if (activeTab === "deepgram") return filteredDeepgramVoices.length;
    if (activeTab === "sarvam") return filteredSarvamVoices.length;
    if (activeTab === "openai") return filteredOpenAIVoices.length;
    return filteredElevenVoices.length;
  };

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 via-purple-50/50 to-pink-50 dark:from-indigo-950/40 dark:via-purple-900/30 dark:to-pink-950/40 border border-indigo-100 dark:border-indigo-900/50 p-6 md:p-8">
        <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-700/20 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.5))]" />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Mic className="h-7 w-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">Voice Library</h1>
                <Badge variant="outline" className="bg-indigo-500/10 text-indigo-600 border-indigo-200 text-xs">
                  Native Master AI Engine
                </Badge>
              </div>
              <p className="text-muted-foreground mt-0.5">
                Browse and audition low-latency, natural voice synthesizers for your conversational agents.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-muted/60 p-1">
          <TabsTrigger value="deepgram" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" /> Deepgram Aura ({DEEPGRAM_AURA_VOICES.length})
          </TabsTrigger>
          <TabsTrigger value="sarvam" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
            <Globe className="h-3.5 w-3.5 mr-1.5" /> Sarvam AI ({SARVAM_VOICES.length})
          </TabsTrigger>
          <TabsTrigger value="openai">
            OpenAI ({OPENAI_VOICES.length})
          </TabsTrigger>
          <TabsTrigger value="elevenlabs">
            ElevenLabs ({accountVoices?.length || 0})
          </TabsTrigger>
        </TabsList>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search voices by name, accent, style..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              {debouncedSearch
                ? `Showing ${getFilteredCount()} of ${getTotalVoiceCount()} voices`
                : `${getTotalVoiceCount()} voices ready`}
            </div>
          </div>
        </div>

        {/* Deepgram Aura Tab (Default) */}
        <TabsContent value="deepgram" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredDeepgramVoices.map((voice) => (
              <Card
                key={voice.id}
                className="p-4 hover-elevate relative overflow-visible border-indigo-200 dark:border-indigo-800/50"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-t-lg" />
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate mb-1 text-base">{voice.name}</h3>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <Badge variant="secondary" className="text-xs bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border-indigo-200">
                        {voice.gender}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {voice.accent}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant={playingVoice === voice.id ? "default" : "ghost"}
                    size="icon"
                    onClick={() => handlePlayPreview(voice.id, undefined, voice.sampleText)}
                    title="Audition voice"
                    className="shrink-0"
                  >
                    {playingVoice === voice.id ? (
                      <Square className="h-4 w-4 text-indigo-600 animate-pulse" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground line-clamp-3 mb-3">
                  {voice.description}
                </p>

                <div className="flex items-center justify-between text-xs pt-2 border-t text-muted-foreground">
                  <span className="font-mono text-[11px] text-indigo-600 dark:text-indigo-400">aura-1</span>
                  <span>{voice.style}</span>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Sarvam AI Tab */}
        <TabsContent value="sarvam" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredSarvamVoices.map((voice) => (
              <Card
                key={voice.id}
                className="p-4 hover-elevate relative overflow-visible border-emerald-200 dark:border-emerald-800/50"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 rounded-t-lg" />
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate mb-1 text-base">{voice.name}</h3>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <Badge variant="secondary" className="text-xs bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200">
                        {voice.gender}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {voice.accent}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant={playingVoice === voice.id ? "default" : "ghost"}
                    size="icon"
                    onClick={() => handlePlayPreview(voice.id, undefined, voice.sampleText)}
                    title="Audition voice"
                    className="shrink-0"
                  >
                    {playingVoice === voice.id ? (
                      <Square className="h-4 w-4 text-emerald-600 animate-pulse" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground line-clamp-3 mb-3">
                  {voice.description}
                </p>

                <div className="flex items-center justify-between text-xs pt-2 border-t text-muted-foreground">
                  <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400">{voice.id}</span>
                  <span className="truncate max-w-[140px]">{voice.language}</span>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* OpenAI Tab */}
        <TabsContent value="openai" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredOpenAIVoices.map((voice) => (
              <Card
                key={voice.id}
                className="p-4 hover-elevate relative overflow-visible border-violet-200 dark:border-violet-800/50"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-400 via-purple-500 to-violet-400 rounded-t-lg" />
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate mb-1 text-base">{voice.name}</h3>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <Badge variant="secondary" className="text-xs">
                        {voice.gender}
                      </Badge>
                      <Badge variant="outline" className="text-xs capitalize">
                        {voice.style}
                      </Badge>
                    </div>
                  </div>
                  <OpenAIVoicePreviewButton
                    voiceId={voice.id}
                    voiceName={voice.name}
                  />
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2">
                  {voice.description}
                </p>

                <div className="mt-3">
                  <Badge className="text-xs bg-gradient-to-r from-violet-500 to-purple-500 text-white border-0">
                    OpenAI Realtime / TTS
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ElevenLabs Tab (Optional / Legacy) */}
        <TabsContent value="elevenlabs" className="space-y-4">
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-200">ElevenLabs Account Voices</h4>
              <p className="text-xs text-muted-foreground">
                External voices from your connected ElevenLabs account. For zero-fee and sub-200ms calling, consider using <strong>Deepgram Aura</strong> or <strong>Sarvam AI</strong>.
              </p>
            </div>
          </div>

          {isElevenLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="p-4">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </Card>
              ))}
            </div>
          ) : filteredElevenVoices.length === 0 ? (
            <Card className="p-12 text-center">
              <Volume2 className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
              <h3 className="text-base font-semibold mb-1">No ElevenLabs Voices Configured</h3>
              <p className="text-xs text-muted-foreground max-w-md mx-auto">
                To import ElevenLabs voices, provide your API key in Settings &gt; My Keys or use Native Deepgram Aura voices for instantaneous reflex latency.
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredElevenVoices.map((voice) => (
                <Card
                  key={voice.voice_id}
                  className="p-4 hover-elevate relative overflow-visible border-green-200 dark:border-green-800/50"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 rounded-t-lg" />
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate mb-1">{voice.name}</h3>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {voice.labels?.gender && (
                          <Badge variant="outline" className="text-xs capitalize">{voice.labels.gender}</Badge>
                        )}
                        {voice.labels?.accent && (
                          <Badge variant="secondary" className="text-xs capitalize">{voice.labels.accent}</Badge>
                        )}
                      </div>
                    </div>
                    {voice.preview_url && (
                      <Button
                        variant={playingVoice === voice.voice_id ? "default" : "ghost"}
                        size="icon"
                        onClick={() => handlePlayPreview(voice.voice_id, voice.preview_url)}
                      >
                        {playingVoice === voice.voice_id ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
