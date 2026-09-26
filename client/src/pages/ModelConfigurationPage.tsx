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
  Globe
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ManagedConfig {
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
    voiceId: "sonic-katie",
    speed: 1.0,
    language: "multi",
    temperature: 0.7,
    maxTokens: 300,
    fallbackEnabled: true,
  });

  // BYOK Pipeline Mode State
  const [pipelineConfig, setPipelineConfig] = useState<ByokPipelineConfig>({
    llmProvider: "groq",
    llmApiKey: "",
    llmModel: "llama-3.3-70b-versatile",
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
    provider: "openai",
    apiKey: "",
    model: "gpt-4o-realtime-preview",
    voice: "alloy",
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
        setManagedConfig(serverConfig.managed_config);
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

        <div className="flex items-center gap-3">
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
                    KodeWaves manages LLMs (Groq Llama 3.3 70B & GPT-4o-mini), high-speed STT, and voice infrastructure. Calls are billed on per-minute wallet usage.
                  </CardDescription>
                </div>
                <div className="hidden sm:block">
                  <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white">Active Default</Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Curated Voice Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Select Curated High-Speed Voice</Label>
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
                    Automatically failover from Groq to OpenAI if upstream experiences rate limits or latency spikes.
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
                      onValueChange={(val) => setPipelineConfig({ ...pipelineConfig, llmProvider: val })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="groq">Groq (Ultra-Fast &lt;180ms)</SelectItem>
                        <SelectItem value="openai">OpenAI</SelectItem>
                        <SelectItem value="anthropic">Anthropic Claude</SelectItem>
                        <SelectItem value="deepseek">DeepSeek</SelectItem>
                        <SelectItem value="cerebras">Cerebras</SelectItem>
                        <SelectItem value="gemini">Google Gemini</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs">Model Name</Label>
                    <Input
                      value={pipelineConfig.llmModel}
                      onChange={(e) => setPipelineConfig({ ...pipelineConfig, llmModel: e.target.value })}
                      placeholder="e.g. llama-3.3-70b-versatile, gpt-4o-mini"
                    />
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
                        <SelectItem value="openai">OpenAI TTS</SelectItem>
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
                        <SelectItem value="deepgram">Deepgram Nova-2 (Telephony)</SelectItem>
                        <SelectItem value="cartesia">Cartesia Ink</SelectItem>
                        <SelectItem value="navana">Navana Indic Speech</SelectItem>
                        <SelectItem value="openai">OpenAI Whisper</SelectItem>
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
                    onValueChange={(val) => setRealtimeConfig({ ...realtimeConfig, provider: val })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="openai">OpenAI Realtime API</SelectItem>
                      <SelectItem value="gemini">Google Gemini Live Multimodal</SelectItem>
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
                      <SelectItem value="gpt-4o-realtime-preview">gpt-4o-realtime-preview</SelectItem>
                      <SelectItem value="gpt-4o-mini-realtime-preview">gpt-4o-mini-realtime-preview</SelectItem>
                      <SelectItem value="gemini-2.0-flash-exp">gemini-2.0-flash-exp</SelectItem>
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
                    placeholder="sk-••••••••••••••••••••••••"
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
                      <SelectItem value="alloy">Alloy (Balanced & Clear)</SelectItem>
                      <SelectItem value="echo">Echo (Warm Male)</SelectItem>
                      <SelectItem value="shimmer">Shimmer (Expressive Female)</SelectItem>
                      <SelectItem value="ash">Ash (Professional Male)</SelectItem>
                      <SelectItem value="ballad">Ballad (Melodic)</SelectItem>
                      <SelectItem value="coral">Coral (Energetic)</SelectItem>
                      <SelectItem value="sage">Sage (Wise & Calming)</SelectItem>
                      <SelectItem value="verse">Verse (Articulate)</SelectItem>
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
