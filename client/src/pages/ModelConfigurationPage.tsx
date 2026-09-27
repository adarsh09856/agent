import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Sparkles, 
  KeyRound, 
  Zap, 
  Cpu, 
  Mic, 
  Volume2, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  Play, 
  Square, 
  Save, 
  Radio, 
  ExternalLink,
  ShieldCheck,
  Activity,
  Globe,
  RotateCcw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ManagedConfig {
  llmModel: string;
  voiceId: string;
  speed: number;
  language: string;
  temperature: number;
  maxTokens: number;
  fallbackEnabled: boolean;
}

interface ByokPipelineConfig {
  llmProvider: string;
  llmApiKey: string;
  llmModel: string;
  ttsProvider: string;
  ttsApiKey: string;
  ttsVoiceId: string;
  sttProvider: string;
  sttApiKey: string;
  sttModel: string;
  embeddingProvider: string;
  embeddingApiKey: string;
}

interface ByokRealtimeConfig {
  provider: string;
  apiKey: string;
  model: string;
  voice: string;
  temperature: number;
  vadThreshold: number;
  silenceDurationMs: number;
}

const MANAGED_LLM_MODELS = [
  { 
    id: "gemini-2.0-flash", 
    name: "Google Gemini 2.0 Flash", 
    provider: "Google DeepMind", 
    latency: "180ms", 
    context: "1M tokens", 
    tag: "Recommended • Realtime Dialog", 
    badgeVariant: "default" as const,
    description: "Ultra-low latency multimodal model purpose-built for natural, human-like voice telephony conversations with sub-200ms TTFT."
  },
  { 
    id: "gemini-2.0-flash-lite", 
    name: "Google Gemini 2.0 Flash-Lite", 
    provider: "Google DeepMind", 
    latency: "140ms", 
    context: "1M tokens", 
    tag: "Fastest • High Concurrency", 
    badgeVariant: "secondary" as const,
    description: "Optimized for maximum throughput, instant sub-150ms first-byte responses, and massive outbound campaigns."
  },
  { 
    id: "gemini-2.5-flash", 
    name: "Google Gemini 2.5 Flash", 
    provider: "Google DeepMind", 
    latency: "190ms", 
    context: "1M tokens", 
    tag: "Next-Gen Reasoning & Speed", 
    badgeVariant: "secondary" as const,
    description: "Next-generation flagship Flash model with enhanced reasoning and multi-step tool-calling capabilities."
  },
  { 
    id: "gemini-2.5-flash-lite", 
    name: "Google Gemini 2.5 Flash-Lite", 
    provider: "Google DeepMind", 
    latency: "130ms", 
    context: "1M tokens", 
    tag: "Ultra-Lightweight • Cost Efficient", 
    badgeVariant: "secondary" as const,
    description: "Ultra-fast, lowest-cost next-gen model built for high-throughput concurrency and high-volume outbound campaigns."
  },
  { 
    id: "gemini-1.5-pro", 
    name: "Google Gemini 1.5 Pro", 
    provider: "Google DeepMind", 
    latency: "320ms", 
    context: "2M tokens", 
    tag: "Deep Context & Complex Workflows", 
    badgeVariant: "outline" as const,
    description: "Massive context window ideal for deep document understanding, complex financial negotiations, and multi-step workflows."
  },
  { 
    id: "llama-3.3-70b-versatile", 
    name: "Groq Llama 3.3 70B", 
    provider: "Groq LPU", 
    latency: "160ms", 
    context: "128k tokens", 
    tag: "Instant LPU Speed", 
    badgeVariant: "secondary" as const,
    description: "Blazing fast open-weights LLM running on Groq LPUs for rapid turns and predictable latency."
  },
  { 
    id: "gpt-4o-mini", 
    name: "OpenAI GPT-4o-mini", 
    provider: "OpenAI", 
    latency: "250ms", 
    context: "128k tokens", 
    tag: "Balanced Enterprise", 
    badgeVariant: "secondary" as const,
    description: "Dependable standard enterprise reasoning across diverse customer support inquiries."
  },
];

const LLM_MODEL_PRESETS: Record<string, { id: string; label: string }[]> = {
  gemini: [
    { id: "gemini-2.0-flash", label: "Gemini 2.0 Flash (Recommended)" },
    { id: "gemini-2.0-flash-lite", label: "Gemini 2.0 Flash-Lite" },
    { id: "gemini-2.5-flash", label: "Gemini 2.5 Flash" },
    { id: "gemini-2.5-flash-lite", label: "Gemini 2.5 Flash-Lite" },
    { id: "gemini-1.5-flash", label: "Gemini 1.5 Flash" },
    { id: "gemini-1.5-pro", label: "Gemini 1.5 Pro" },
    { id: "gemini-2.0-pro", label: "Gemini 2.0 Pro" },
  ],
  groq: [
    { id: "llama-3.3-70b-versatile", label: "Llama 3.3 70B" },
    { id: "llama-3.1-8b-instant", label: "Llama 3.1 8B" },
    { id: "mixtral-8x7b-32768", label: "Mixtral 8x7B" },
  ],
  openai: [
    { id: "gpt-4o-mini", label: "GPT-4o Mini" },
    { id: "gpt-4o", label: "GPT-4o" },
    { id: "gpt-4-turbo", label: "GPT-4 Turbo" },
  ],
  anthropic: [
    { id: "claude-3-5-sonnet-latest", label: "Claude 3.5 Sonnet" },
    { id: "claude-3-5-haiku-latest", label: "Claude 3.5 Haiku" },
  ],
  deepseek: [
    { id: "deepseek-chat", label: "DeepSeek V3" },
    { id: "deepseek-reasoner", label: "DeepSeek R1" },
  ],
  cerebras: [
    { id: "llama3.1-70b", label: "Cerebras Llama 3.1 70B" },
    { id: "llama3.1-8b", label: "Cerebras Llama 3.1 8B" },
  ],
};

const REALTIME_VOICES: Record<string, { id: string; name: string; desc: string }[]> = {
  gemini: [
    { id: "Puck", name: "Puck", desc: "Engaging & Friendly Male" },
    { id: "Charon", name: "Charon", desc: "Deep & Grounded Male" },
    { id: "Kore", name: "Kore", desc: "Calm & Natural Female" },
    { id: "Fenrir", name: "Fenrir", desc: "Authoritative & Confident Male" },
    { id: "Aoede", name: "Aoede", desc: "Expressive & Melodic Female" },
  ],
  openai: [
    { id: "alloy", name: "Alloy", desc: "Balanced & Clear Neutral" },
    { id: "echo", name: "Echo", desc: "Warm & Conversational Male" },
    { id: "shimmer", name: "Shimmer", desc: "Expressive & Bright Female" },
    { id: "ash", name: "Ash", desc: "Professional & Smooth Male" },
    { id: "ballad", name: "Ballad", desc: "Melodic & Warm Tone" },
    { id: "coral", name: "Coral", desc: "Energetic & Approachable" },
    { id: "sage", name: "Sage", desc: "Wise & Calming Tone" },
    { id: "verse", name: "Verse", desc: "Articulate & Dynamic" },
  ],
};

const CURATED_VOICES = [
  { id: "sonic-katie", name: "Cartesia Sonic - Katie (American Female)", latency: "90ms", lang: "English (US)", tag: "Ultra Low Latency" },
  { id: "sonic-barbershop", name: "Cartesia Sonic - British Executive (Male)", latency: "85ms", lang: "English (UK)", tag: "Sub-90ms" },
  { id: "bodhi-aarav", name: "Navana Bodhi - Aarav (Conversational Hindi)", latency: "110ms", lang: "Hindi / Hinglish", tag: "Native Indic" },
  { id: "bodhi-diya", name: "Navana Bodhi - Diya (Professional Hindi)", latency: "115ms", lang: "Hindi / English", tag: "Native Indic" },
  { id: "bodhi-karthik", name: "Navana Bodhi - Karthik (Fluent Tamil)", latency: "120ms", lang: "Tamil", tag: "Native Indic" },
  { id: "bodhi-sravani", name: "Navana Bodhi - Sravani (Clear Telugu)", latency: "120ms", lang: "Telugu", tag: "Native Indic" },
  { id: "bulbul:v1", name: "Sarvam Bulbul - Natural Hindi", latency: "130ms", lang: "Hindi / Hinglish", tag: "Indic Conversational" },
  { id: "aura-asteria-en", name: "Deepgram Aura - Asteria (American Female)", latency: "180ms", lang: "English (US)", tag: "Telephony Optimized" },
  { id: "aura-orion-en", name: "Deepgram Aura - Orion (American Male)", latency: "180ms", lang: "English (US)", tag: "Telephony Optimized" },
  { id: "21m00Tcm4TlvDq8ikWAM", name: "ElevenLabs - Rachel (Turbo v2.5)", latency: "195ms", lang: "English (US)", tag: "Studio Quality" },
];

export default function ModelConfigurationPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<"managed" | "byok-pipeline" | "byok-realtime">("managed");
  const [isPlayingSample, setIsPlayingSample] = useState<string | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // Managed Mode State
  const [managedConfig, setManagedConfig] = useState<ManagedConfig>({
    llmModel: "gemini-2.0-flash",
    voiceId: "sonic-katie",
    speed: 1.0,
    language: "multi",
    temperature: 0.7,
    maxTokens: 300,
    fallbackEnabled: true,
  });

  // BYOK Pipeline Mode State
  const [pipelineConfig, setPipelineConfig] = useState<ByokPipelineConfig>({
    llmProvider: "gemini",
    llmApiKey: "",
    llmModel: "gemini-2.0-flash",
    ttsProvider: "cartesia",
    ttsApiKey: "",
    ttsVoiceId: "sonic-katie",
    sttProvider: "deepgram",
    sttApiKey: "",
    sttModel: "nova-2-phonecall",
    embeddingProvider: "openai",
    embeddingApiKey: "",
  });

  // BYOK Realtime Mode State
  const [realtimeConfig, setRealtimeConfig] = useState<ByokRealtimeConfig>({
    provider: "gemini",
    apiKey: "",
    model: "gemini-2.0-flash-exp",
    voice: "Puck",
    temperature: 0.8,
    vadThreshold: 0.5,
    silenceDurationMs: 500,
  });

  // Query saved configuration from backend
  const { data: serverConfig, isLoading: isConfigLoading } = useQuery({
    queryKey: ["/api/model-configurations"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/model-configurations");
      const json = await res.json();
      return json.data;
    },
  });

  // Sync state from server on load
  useEffect(() => {
    if (serverConfig) {
      if (serverConfig.active_mode) setActiveTab(serverConfig.active_mode);
      if (serverConfig.managed_config && Object.keys(serverConfig.managed_config).length > 0) {
        setManagedConfig({
          llmModel: "gemini-2.0-flash",
          ...serverConfig.managed_config,
        });
      }
      if (serverConfig.pipeline_config && Object.keys(serverConfig.pipeline_config).length > 0) {
        setPipelineConfig(serverConfig.pipeline_config);
      }
      if (serverConfig.realtime_config && Object.keys(serverConfig.realtime_config).length > 0) {
        setRealtimeConfig(serverConfig.realtime_config);
      }
    }
  }, [serverConfig]);

  // Mutation to persist configuration to PostgreSQL
  const saveMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("PUT", "/api/model-configurations", {
        active_mode: activeTab,
        managed_config: managedConfig,
        pipeline_config: pipelineConfig,
        realtime_config: realtimeConfig,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/model-configurations"] });
      // Keep localStorage as local fast cache
      localStorage.setItem("agentlabs_model_config_managed", JSON.stringify(managedConfig));
      localStorage.setItem("agentlabs_model_config_pipeline", JSON.stringify(pipelineConfig));
      localStorage.setItem("agentlabs_model_config_realtime", JSON.stringify(realtimeConfig));
      localStorage.setItem("agentlabs_model_active_mode", activeTab);

      toast({
        title: "Configuration Saved Successfully",
        description: `Active AI Engine set to ${
          activeTab === "managed" 
            ? "Managed Platform Mode" 
            : activeTab === "byok-pipeline" 
            ? "BYOK Modular Pipeline" 
            : "Realtime Speech-to-Speech"
        } and synced to database.`,
      });
    },
    onError: (err: any) => {
      toast({
        title: "Save Failed",
        description: err.message || "Failed to persist configuration to server.",
        variant: "destructive",
      });
    },
  });

  const handleSaveAll = () => {
    saveMutation.mutate();
  };

  const [testingKeyFor, setTestingKeyFor] = useState<string | null>(null);

  const handleTestKey = async (providerName: string, keyVal: string) => {
    if (!keyVal || keyVal.trim() === "") {
      toast({
        title: "Key Required",
        description: `Please enter an API key for ${providerName} before testing.`,
        variant: "destructive",
      });
      return;
    }

    setTestingKeyFor(providerName);
    try {
      const res = await apiRequest("POST", "/api/model-configurations/test-key", {
        provider: providerName,
        apiKey: keyVal.trim(),
      });
      const data = await res.json();

      if (data.success) {
        toast({
          title: "API Key Verified",
          description: data.message || `Successfully authenticated with ${providerName}!`,
        });
      } else {
        toast({
          title: "Verification Failed",
          description: data.error || `Invalid credentials for ${providerName}`,
          variant: "destructive",
        });
      }
    } catch (err: any) {
      toast({
        title: "Connection Error",
        description: err.message || `Failed to connect to ${providerName} verification service.`,
        variant: "destructive",
      });
    } finally {
      setTestingKeyFor(null);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">AI Models & Voice Engines</h1>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              v2.0 Dual-Mode
            </Badge>
          </div>
          <p className="text-muted-foreground mt-1">
            Configure real-time conversational LLMs, ultra-low latency TTS synthesizers, STT transcribers, or bring your own API keys.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setManagedConfig({
                llmModel: "gemini-2.0-flash",
                voiceId: "sonic-katie",
                speed: 1.0,
                language: "multi",
                temperature: 0.7,
                maxTokens: 300,
                fallbackEnabled: true,
              });
              setPipelineConfig({
                llmProvider: "gemini",
                llmApiKey: "",
                llmModel: "gemini-2.0-flash",
                ttsProvider: "cartesia",
                ttsApiKey: "",
                ttsVoiceId: "sonic-katie",
                sttProvider: "deepgram",
                sttApiKey: "",
                sttModel: "nova-2-phonecall",
                embeddingProvider: "openai",
                embeddingApiKey: "",
              });
              setRealtimeConfig({
                provider: "gemini",
                apiKey: "",
                model: "gemini-2.0-flash-exp",
                voice: "Puck",
                temperature: 0.8,
                vadThreshold: 0.5,
                silenceDurationMs: 500,
              });
              toast({
                title: "Reset to Gemini Recommended Defaults",
                description: "All tabs reset to Google Gemini 2.0 Flash defaults. Click 'Save Configuration' to persist to your account.",
              });
            }}
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset to Recommended Defaults
          </Button>
          <Button onClick={handleSaveAll} className="gap-2">
            <Save className="w-4 h-4" />
            Save Configuration
          </Button>
        </div>
      </div>

      {/* Highlights Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 bg-muted/30 border-muted">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Pipeline Latency</p>
              <p className="text-sm font-semibold">Sub-500ms End-to-End</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-muted/30 border-muted">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Telephony Audio</p>
              <p className="text-sm font-semibold">Direct WebSocket (Zero FreeSWITCH)</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-muted/30 border-muted">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-lg">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Indic & Global</p>
              <p className="text-sm font-semibold">Hindi, Tamil, Telugu + 30 Languages</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as any)} className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full max-w-xl h-12">
          <TabsTrigger value="managed" className="gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Managed Mode
          </TabsTrigger>
          <TabsTrigger value="byok-pipeline" className="gap-2 text-sm">
            <Layers className="w-4 h-4 text-blue-500" />
            BYOK Pipeline
          </TabsTrigger>
          <TabsTrigger value="byok-realtime" className="gap-2 text-sm">
            <Activity className="w-4 h-4 text-purple-500" />
            Speech-to-Speech
          </TabsTrigger>
        </TabsList>

        {/* ========================================================================= */}
        {/* TAB 1: MANAGED PLATFORM MODE */}
        {/* ========================================================================= */}
        <TabsContent value="managed" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    Managed Platform AI
                    <Badge variant="secondary" className="font-normal text-xs">Zero Setup</Badge>
                  </CardTitle>
                  <CardDescription className="mt-1">
                    KodeWaves manages industry-leading voice LLMs (Google Gemini 2.0 Flash, Groq Llama 3.3 70B &amp; GPT-4o-mini), high-speed STT, and voice infrastructure. Calls are billed on per-minute wallet usage with zero API key configuration needed.
                  </CardDescription>
                </div>
                <div className="hidden sm:block">
                  <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white">Active Default</Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* 1. Managed Conversational LLM Engine Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-primary" />
                    Select Primary Conversational LLM Engine (Brain)
                  </Label>
                  <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
                    Platform Included
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {MANAGED_LLM_MODELS.map((model) => {
                    const isSelected = (managedConfig.llmModel || "gemini-2.0-flash") === model.id;
                    return (
                      <div
                        key={model.id}
                        onClick={() => setManagedConfig({ ...managedConfig, llmModel: model.id })}
                        className={`p-3.5 rounded-lg border cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? "border-primary bg-primary/5 shadow-sm ring-2 ring-primary/50"
                            : "border-border hover:border-border/80 hover:bg-muted/40"
                        }`}
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-1">
                            <div className="flex items-center gap-1.5 font-medium text-sm">
                              <span>{model.name}</span>
                              {isSelected && <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />}
                            </div>
                            <Badge variant={model.badgeVariant} className="text-[10px] whitespace-nowrap">
                              {model.tag}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {model.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-2.5 mt-2 border-t border-border/50">
                          <span>{model.provider}</span>
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0 font-mono">
                            {model.latency}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. Curated Voice Selection */}
              <div className="space-y-3 pt-2 border-t">
                <Label className="text-sm font-semibold flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-emerald-500" />
                  Select Curated High-Speed Voice (TTS Voice Output)
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {CURATED_VOICES.map((v) => {
                    const isSelected = managedConfig.voiceId === v.id;
                    return (
                      <div
                        key={v.id}
                        onClick={() => setManagedConfig({ ...managedConfig, voiceId: v.id })}
                        className={`p-3.5 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/40"
                            : "border-border hover:border-border/80 hover:bg-muted/40"
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{v.name}</span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-primary" />}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{v.lang}</span>
                            <span>•</span>
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                              {v.latency}
                            </Badge>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-[10px]">
                          {v.tag}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Speed & Language Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-medium">Speech Speed: {managedConfig.speed.toFixed(1)}x</Label>
                    <div className="flex gap-1.5">
                      {[0.8, 1.0, 1.2].map((s) => (
                        <Button
                          key={s}
                          type="button"
                          variant={managedConfig.speed === s ? "default" : "outline"}
                          size="sm"
                          className="h-6 text-xs px-2"
                          onClick={() => setManagedConfig({ ...managedConfig, speed: s })}
                        >
                          {s}x
                        </Button>
                      ))}
                    </div>
                  </div>
                  <Slider
                    min={0.6}
                    max={1.6}
                    step={0.1}
                    value={[managedConfig.speed]}
                    onValueChange={(val) => setManagedConfig({ ...managedConfig, speed: val[0] })}
                  />
                  <p className="text-xs text-muted-foreground">
                    1.0x is natural conversation speed. Use 1.1x–1.2x for faster outbound campaigns.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Primary Language</Label>
                  <Select
                    value={managedConfig.language}
                    onValueChange={(val) => setManagedConfig({ ...managedConfig, language: val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="multi">Multilingual (Auto-Detect English & Indic)</SelectItem>
                      <SelectItem value="en-US">English (United States)</SelectItem>
                      <SelectItem value="en-IN">English (India)</SelectItem>
                      <SelectItem value="en-GB">English (United Kingdom)</SelectItem>
                      <SelectItem value="hi-IN">Hindi (हिंदी)</SelectItem>
                      <SelectItem value="ta-IN">Tamil (தமிழ்)</SelectItem>
                      <SelectItem value="te-IN">Telugu (తెలుగు)</SelectItem>
                      <SelectItem value="mr-IN">Marathi (मराठी)</SelectItem>
                      <SelectItem value="bn-IN">Bengali (বাংলা)</SelectItem>
                      <SelectItem value="es-ES">Spanish (Español)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Auto-detect smoothly switches between languages without dropped audio.
                  </p>
                </div>
              </div>

              {/* Automatic Fallback Switch */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <p className="text-sm font-medium">Automatic Multi-Provider High Availability</p>
                  <p className="text-xs text-muted-foreground">
                    Automatically failover between Google Gemini, Groq, and OpenAI if upstream experiences rate limits or latency spikes.
                  </p>
                </div>
                <Switch
                  checked={managedConfig.fallbackEnabled}
                  onCheckedChange={(checked) => setManagedConfig({ ...managedConfig, fallbackEnabled: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ========================================================================= */}
        {/* TAB 2: BYOK MODULAR PIPELINE MODE */}
        {/* ========================================================================= */}
        <TabsContent value="byok-pipeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-blue-500" />
                BYOK Modular Pipeline (STT + LLM + TTS)
              </CardTitle>
              <CardDescription>
                Plug in your own API keys. Platform executes the pipeline without token markup. You are billed only for telephony minutes.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* 1. Large Language Model */}
              <div className="p-4 rounded-lg border bg-muted/20 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-sm">1. Large Language Model (LLM)</span>
                  </div>
                  <Badge variant="outline">Brain</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Provider</Label>
                    <Select
                      value={pipelineConfig.llmProvider}
                      onValueChange={(val) => {
                        const presets = LLM_MODEL_PRESETS[val];
                        const defaultModel = presets && presets[0] ? presets[0].id : "";
                        setPipelineConfig({
                          ...pipelineConfig,
                          llmProvider: val,
                          llmModel: defaultModel || pipelineConfig.llmModel,
                        });
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gemini">Google Gemini (Recommended • Flash 2.0)</SelectItem>
                        <SelectItem value="groq">Groq (Ultra-Fast &lt;180ms)</SelectItem>
                        <SelectItem value="openai">OpenAI (GPT-4o / Mini)</SelectItem>
                        <SelectItem value="anthropic">Anthropic Claude (Sonnet / Haiku)</SelectItem>
                        <SelectItem value="deepseek">DeepSeek (V3 / R1)</SelectItem>
                        <SelectItem value="cerebras">Cerebras (LPU Speed)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs">Model Name</Label>
                    <Input
                      value={pipelineConfig.llmModel}
                      onChange={(e) => setPipelineConfig({ ...pipelineConfig, llmModel: e.target.value })}
                      placeholder="e.g. gemini-2.0-flash, llama-3.3-70b-versatile"
                    />
                    {LLM_MODEL_PRESETS[pipelineConfig.llmProvider] && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {LLM_MODEL_PRESETS[pipelineConfig.llmProvider].map((preset) => (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => setPipelineConfig({ ...pipelineConfig, llmModel: preset.id })}
                            className={`text-[10px] px-1.5 py-0.5 rounded border transition-colors ${
                              pipelineConfig.llmModel === preset.id
                                ? "bg-primary text-primary-foreground border-primary font-medium"
                                : "bg-muted/50 hover:bg-muted text-muted-foreground border-border"
                            }`}
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <Label className="text-xs">API Key</Label>
                      <button
                        type="button"
                        onClick={() => handleTestKey(pipelineConfig.llmProvider, pipelineConfig.llmApiKey)}
                        className="text-[11px] text-primary hover:underline"
                      >
                        Test Key
                      </button>
                    </div>
                    <Input
                      type="password"
                      value={pipelineConfig.llmApiKey}
                      onChange={(e) => setPipelineConfig({ ...pipelineConfig, llmApiKey: e.target.value })}
                      placeholder="Enter provider API key"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Text-to-Speech (TTS) */}
              <div className="p-4 rounded-lg border bg-muted/20 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-emerald-500" />
                    <span className="font-semibold text-sm">2. Text-to-Speech (TTS Synthesizer)</span>
                  </div>
                  <Badge variant="outline">Voice Output</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Provider</Label>
                    <Select
                      value={pipelineConfig.ttsProvider}
                      onValueChange={(val) => setPipelineConfig({ ...pipelineConfig, ttsProvider: val })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cartesia">Cartesia Sonic (90ms PCM)</SelectItem>
                        <SelectItem value="navana">Navana Indic Bodhi</SelectItem>
                        <SelectItem value="elevenlabs">ElevenLabs Turbo v2.5</SelectItem>
                        <SelectItem value="sarvam">Sarvam Bulbul</SelectItem>
                        <SelectItem value="deepgram">Deepgram Aura</SelectItem>

                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs">Voice ID / Token</Label>
                    <Input
                      value={pipelineConfig.ttsVoiceId}
                      onChange={(e) => setPipelineConfig({ ...pipelineConfig, ttsVoiceId: e.target.value })}
                      placeholder="e.g. sonic-katie, 21m00Tcm4TlvDq8ikWAM"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <Label className="text-xs">API Key</Label>
                      <button
                        type="button"
                        onClick={() => handleTestKey(pipelineConfig.ttsProvider, pipelineConfig.ttsApiKey)}
                        className="text-[11px] text-primary hover:underline"
                      >
                        Test Key
                      </button>
                    </div>
                    <Input
                      type="password"
                      value={pipelineConfig.ttsApiKey}
                      onChange={(e) => setPipelineConfig({ ...pipelineConfig, ttsApiKey: e.target.value })}
                      placeholder="Enter provider API key"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Speech-to-Text (STT) */}
              <div className="p-4 rounded-lg border bg-muted/20 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mic className="w-4 h-4 text-purple-500" />
                    <span className="font-semibold text-sm">3. Speech-to-Text (STT Transcriber)</span>
                  </div>
                  <Badge variant="outline">Ear Input</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Provider</Label>
                    <Select
                      value={pipelineConfig.sttProvider}
                      onValueChange={(val) => setPipelineConfig({ ...pipelineConfig, sttProvider: val })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="deepgram">Deepgram Nova-2 / Nova-3 (Telephony)</SelectItem>
                        <SelectItem value="sarvam">Sarvam AI Saaras (Indic Real-Time)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs">STT Model</Label>
                    <Input
                      value={pipelineConfig.sttModel}
                      onChange={(e) => setPipelineConfig({ ...pipelineConfig, sttModel: e.target.value })}
                      placeholder="e.g. nova-2-phonecall"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <Label className="text-xs">API Key</Label>
                      <button
                        type="button"
                        onClick={() => handleTestKey(pipelineConfig.sttProvider, pipelineConfig.sttApiKey)}
                        className="text-[11px] text-primary hover:underline"
                      >
                        Test Key
                      </button>
                    </div>
                    <Input
                      type="password"
                      value={pipelineConfig.sttApiKey}
                      onChange={(e) => setPipelineConfig({ ...pipelineConfig, sttApiKey: e.target.value })}
                      placeholder="Enter provider API key"
                    />
                  </div>
                </div>
              </div>

              {/* 4. RAG Knowledge Base Embeddings */}
              <div className="p-4 rounded-lg border bg-muted/20 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span className="font-semibold text-sm">4. Knowledge Base Vector Embeddings</span>
                  </div>
                  <Badge variant="outline">RAG Search</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Embedding Provider</Label>
                    <Select
                      value={pipelineConfig.embeddingProvider}
                      onValueChange={(val) => setPipelineConfig({ ...pipelineConfig, embeddingProvider: val })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="openai">OpenAI (text-embedding-3-small)</SelectItem>
                        <SelectItem value="cohere">Cohere Embed v3</SelectItem>
                        <SelectItem value="local">Self-Hosted BGE (Platform Default)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs">API Key (Optional if using Platform Default)</Label>
                    <Input
                      type="password"
                      value={pipelineConfig.embeddingApiKey}
                      onChange={(e) => setPipelineConfig({ ...pipelineConfig, embeddingApiKey: e.target.value })}
                      placeholder="sk-••••••••••••••••"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ========================================================================= */}
        {/* TAB 3: BYOK REALTIME SPEECH-TO-SPEECH */}
        {/* ========================================================================= */}
        <TabsContent value="byok-realtime" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-500" />
                Realtime Speech-to-Speech (End-to-End WebSocket)
              </CardTitle>
              <CardDescription>
                Direct audio-to-audio neural streaming without intermediate text transcription steps. Sub-300ms natural conversational latency.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Realtime Provider</Label>
                  <Select
                    value={realtimeConfig.provider}
                    onValueChange={(val) => {
                      const defaultModel = val === "gemini" ? "gemini-2.0-flash-exp" : "gpt-4o-realtime-preview";
                      const defaultVoice = val === "gemini" ? "Puck" : "alloy";
                      setRealtimeConfig({
                        ...realtimeConfig,
                        provider: val,
                        model: defaultModel,
                        voice: defaultVoice,
                      });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gemini">Google Gemini Live Multimodal (Recommended)</SelectItem>
                      <SelectItem value="openai">OpenAI Realtime API</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Model</Label>
                  <Select
                    value={realtimeConfig.model}
                    onValueChange={(val) => setRealtimeConfig({ ...realtimeConfig, model: val })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {realtimeConfig.provider === "gemini" ? (
                        <>
                          <SelectItem value="gemini-2.0-flash-exp">
                            gemini-2.0-flash-exp (Gemini Live Audio • Recommended)
                          </SelectItem>
                          <SelectItem value="gemini-2.0-flash-realtime">
                            gemini-2.0-flash-realtime (Low Latency Audio Stream)
                          </SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="gpt-4o-realtime-preview">
                            gpt-4o-realtime-preview (OpenAI Full Realtime)
                          </SelectItem>
                          <SelectItem value="gpt-4o-mini-realtime-preview">
                            gpt-4o-mini-realtime-preview (OpenAI Lightweight)
                          </SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-medium">API Key</Label>
                    <button
                      type="button"
                      onClick={() => handleTestKey(realtimeConfig.provider, realtimeConfig.apiKey)}
                      className="text-xs text-primary hover:underline"
                    >
                      Verify Key
                    </button>
                  </div>
                  <Input
                    type="password"
                    value={realtimeConfig.apiKey}
                    onChange={(e) => setRealtimeConfig({ ...realtimeConfig, apiKey: e.target.value })}
                    placeholder="Enter API key"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Voice Character</Label>
                  <Select
                    value={realtimeConfig.voice}
                    onValueChange={(val) => setRealtimeConfig({ ...realtimeConfig, voice: val })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(REALTIME_VOICES[realtimeConfig.provider] || REALTIME_VOICES.gemini).map((v) => (
                        <SelectItem key={v.id} value={v.id}>
                          <span className="font-medium">{v.name}</span>
                          <span className="text-muted-foreground ml-2 text-xs">({v.desc})</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* VAD Settings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Voice Activity Detection (VAD) Sensitivity</Label>
                  <Slider
                    min={0.1}
                    max={0.9}
                    step={0.05}
                    value={[realtimeConfig.vadThreshold]}
                    onValueChange={(val) => setRealtimeConfig({ ...realtimeConfig, vadThreshold: val[0] })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Current: {realtimeConfig.vadThreshold}. Higher values reduce accidental interruptions in noisy environments.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Silence Turn Detection Delay</Label>
                  <Select
                    value={String(realtimeConfig.silenceDurationMs)}
                    onValueChange={(val) => setRealtimeConfig({ ...realtimeConfig, silenceDurationMs: Number(val) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="300">300ms (Fast Interruption)</SelectItem>
                      <SelectItem value="500">500ms (Balanced Natural Conversation)</SelectItem>
                      <SelectItem value="750">750ms (Patient Listener)</SelectItem>
                      <SelectItem value="1000">1000ms (Slow Thoughtful)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Duration of silence required before AI begins speaking.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
