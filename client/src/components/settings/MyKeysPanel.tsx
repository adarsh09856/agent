import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  KeyRound,
  CheckCircle2,
  Loader2,
  RefreshCw,
  Phone,
  Brain,
  Volume2,
  Lock,
  Sparkles,
  Layers,
  AlertCircle,
} from "lucide-react";

interface ProviderCredentialInfo {
  provider: string;
  accountId?: string | null;
  apiKey?: string | null;
  hasKey: boolean;
  hasAccountId: boolean;
  isVerified: boolean;
  updatedAt?: string;
}

export function MyKeysPanel() {
  const { toast } = useToast();

  // Queries
  const { data: credsData, isLoading: credsLoading } = useQuery<{
    success: boolean;
    data: Record<string, ProviderCredentialInfo>;
    byokAllowed?: boolean;
  }>({
    queryKey: ["/api/user/provider-credentials"],
  });

  const { data: voiceEngineSettings } = useQuery<{
    allow_user_byok?: boolean;
    credits_required?: boolean;
  }>({
    queryKey: ["/api/settings/voice-engine"],
  });

  const credentials = credsData?.data || {};
  // BYOK is allowed only if both or either doesn't say false
  const isByokAllowed = credsData?.byokAllowed !== false && voiceEngineSettings?.allow_user_byok !== false;

  // Form states
  const [twilioSid, setTwilioSid] = useState("");
  const [twilioToken, setTwilioToken] = useState("");
  const [deepgramKey, setDeepgramKey] = useState("");
  const [geminiKey, setGeminiKey] = useState("");
  const [openaiKey, setOpenaiKey] = useState("");
  const [openrouterKey, setOpenrouterKey] = useState("");

  // Mutations
  const saveMutation = useMutation({
    mutationFn: async (payload: { provider: string; accountId?: string; apiKey?: string }) => {
      const res = await apiRequest("POST", "/api/user/provider-credentials", payload);
      return res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/user/provider-credentials"] });
      toast({
        title: "Credentials Saved",
        description: `Your ${variables.provider.toUpperCase()} credentials have been securely stored.`,
      });
      if (variables.provider === "twilio") {
        setTwilioSid("");
        setTwilioToken("");
      } else if (variables.provider === "deepgram") {
        setDeepgramKey("");
      } else if (variables.provider === "gemini") {
        setGeminiKey("");
      } else if (variables.provider === "openai") {
        setOpenaiKey("");
      } else if (variables.provider === "openrouter") {
        setOpenrouterKey("");
      }
    },
    onError: (err: any) => {
      toast({
        title: "Save Failed",
        description: err.message || "Failed to save credentials",
        variant: "destructive",
      });
    },
  });

  const verifyMutation = useMutation({
    mutationFn: async (provider: string) => {
      const res = await apiRequest("POST", "/api/user/provider-credentials/verify", { provider });
      return res.json();
    },
    onSuccess: (data, provider) => {
      queryClient.invalidateQueries({ queryKey: ["/api/user/provider-credentials"] });
      toast({
        title: "Connection Verified",
        description: `${provider.toUpperCase()} credentials are valid and active!`,
      });
    },
    onError: (err: any, provider) => {
      toast({
        title: "Verification Failed",
        description: err.message || `Could not verify ${provider.toUpperCase()} credentials`,
        variant: "destructive",
      });
    },
  });

  const syncNumbersMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/user/provider-credentials/sync-numbers", { provider: "twilio" });
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/user/sip-phone-numbers"] });
      toast({
        title: "Numbers Synced",
        description: data.message || "Phone numbers have been imported to your account.",
      });
    },
    onError: (err: any) => {
      toast({
        title: "Sync Failed",
        description: err.message || "Failed to sync numbers from Twilio",
        variant: "destructive",
      });
    },
  });

  if (credsLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const twilioCred = credentials["twilio"];
  const deepgramCred = credentials["deepgram"];
  const geminiCred = credentials["gemini"];
  const openaiCred = credentials["openai"];
  const openrouterCred = credentials["openrouter"];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <KeyRound className="h-5 w-5 text-primary" />
            My Keys (Bring Your Own Keys & Providers)
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Connect your own AI brain, voice synthesis, and telephony provider accounts. Your keys are encrypted with AES-256 and used exclusively for your calls.
          </p>
        </div>
        <div>
          {isByokAllowed ? (
            <Badge variant="outline" className="border-emerald-300 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300">
              <Sparkles className="h-3 w-3 mr-1" /> BYOK Allowed ($0 platform deduction)
            </Badge>
          ) : (
            <Badge variant="outline" className="border-amber-300 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300">
              <Lock className="h-3 w-3 mr-1" /> Platform-Managed Enforcement
            </Badge>
          )}
        </div>
      </div>

      {/* Admin BYOK Disabled Notice Banner */}
      {!isByokAllowed && (
        <div className="rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 p-4 text-amber-900 dark:text-amber-200 flex items-start gap-3 shadow-sm">
          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
          <div className="space-y-1">
            <h4 className="font-semibold text-sm">Custom BYOK Disabled by Administrator Policy</h4>
            <p className="text-xs leading-relaxed opacity-90">
              The platform administrator has configured high-performance platform-managed routing for all speech, intelligence, and telephony pipelines. Custom provider credentials are currently locked. Calls automatically deduct from your monthly subscription minutes quota or wallet credits.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Google Gemini Card */}
        <Card className="border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-500" />
                <CardTitle className="text-base">Google Gemini (LLM Brain)</CardTitle>
              </div>
              {geminiCred?.isVerified ? (
                <Badge variant="outline" className="text-emerald-600 border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30">
                  <CheckCircle2 className="h-3 w-3 mr-1" /> Connected
                </Badge>
              ) : geminiCred?.hasKey ? (
                <Badge variant="secondary">Saved (Unverified)</Badge>
              ) : (
                <Badge variant="outline">Not Set</Badge>
              )}
            </div>
            <CardDescription className="text-xs">
              Powers low-latency AI reasoning for your voice agents (Gemini Flash 2.0 / Flash Lite).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {geminiCred?.hasKey && (
              <div className="text-xs font-mono bg-muted p-2 rounded flex items-center justify-between">
                <span>Active Key: {geminiCred.apiKey}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 px-2 text-xs"
                  onClick={() => verifyMutation.mutate("gemini")}
                  disabled={verifyMutation.isPending || !isByokAllowed}
                >
                  {verifyMutation.isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : "Test Key"}
                </Button>
              </div>
            )}
            <div className="space-y-2">
              <Label className="text-xs">Update Gemini API Key</Label>
              <Input
                type="password"
                placeholder={isByokAllowed ? "AIzaSy..." : "Disabled by administrator"}
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                disabled={!isByokAllowed}
              />
            </div>
            <Button
              size="sm"
              onClick={() => saveMutation.mutate({ provider: "gemini", apiKey: geminiKey })}
              disabled={!isByokAllowed || !geminiKey.trim() || saveMutation.isPending}
              className="w-full"
            >
              {saveMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Save Gemini Key
            </Button>
          </CardContent>
        </Card>

        {/* Deepgram Card */}
        <Card className="border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="h-5 w-5 text-emerald-500" />
                <CardTitle className="text-base">Deepgram (STT + TTS Aura)</CardTitle>
              </div>
              {deepgramCred?.isVerified ? (
                <Badge variant="outline" className="text-emerald-600 border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30">
                  <CheckCircle2 className="h-3 w-3 mr-1" /> Connected
                </Badge>
              ) : deepgramCred?.hasKey ? (
                <Badge variant="secondary">Saved (Unverified)</Badge>
              ) : (
                <Badge variant="outline">Not Set</Badge>
              )}
            </div>
            <CardDescription className="text-xs">
              Powers real-time speech transcription (Nova-2) and human-like voice synthesis (Aura).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {deepgramCred?.hasKey && (
              <div className="text-xs font-mono bg-muted p-2 rounded flex items-center justify-between">
                <span>Active Key: {deepgramCred.apiKey}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 px-2 text-xs"
                  onClick={() => verifyMutation.mutate("deepgram")}
                  disabled={verifyMutation.isPending || !isByokAllowed}
                >
                  {verifyMutation.isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : "Test Key"}
                </Button>
              </div>
            )}
            <div className="space-y-2">
              <Label className="text-xs">Update Deepgram API Key</Label>
              <Input
                type="password"
                placeholder={isByokAllowed ? "dg_..." : "Disabled by administrator"}
                value={deepgramKey}
                onChange={(e) => setDeepgramKey(e.target.value)}
                disabled={!isByokAllowed}
              />
            </div>
            <Button
              size="sm"
              onClick={() => saveMutation.mutate({ provider: "deepgram", apiKey: deepgramKey })}
              disabled={!isByokAllowed || !deepgramKey.trim() || saveMutation.isPending}
              className="w-full"
            >
              {saveMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Save Deepgram Key
            </Button>
          </CardContent>
        </Card>

        {/* OpenAI Card */}
        <Card className="border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-500" />
                <CardTitle className="text-base">OpenAI (GPT-4o & Mini)</CardTitle>
              </div>
              {openaiCred?.isVerified ? (
                <Badge variant="outline" className="text-emerald-600 border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30">
                  <CheckCircle2 className="h-3 w-3 mr-1" /> Connected
                </Badge>
              ) : openaiCred?.hasKey ? (
                <Badge variant="secondary">Saved (Unverified)</Badge>
              ) : (
                <Badge variant="outline">Not Set</Badge>
              )}
            </div>
            <CardDescription className="text-xs">
              Powers GPT-4o, GPT-4o-mini, and advanced contextual instruction-following models.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {openaiCred?.hasKey && (
              <div className="text-xs font-mono bg-muted p-2 rounded flex items-center justify-between">
                <span>Active Key: {openaiCred.apiKey}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 px-2 text-xs"
                  onClick={() => verifyMutation.mutate("openai")}
                  disabled={verifyMutation.isPending || !isByokAllowed}
                >
                  {verifyMutation.isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : "Test Key"}
                </Button>
              </div>
            )}
            <div className="space-y-2">
              <Label className="text-xs">Update OpenAI API Key</Label>
              <Input
                type="password"
                placeholder={isByokAllowed ? "sk-proj-..." : "Disabled by administrator"}
                value={openaiKey}
                onChange={(e) => setOpenaiKey(e.target.value)}
                disabled={!isByokAllowed}
              />
            </div>
            <Button
              size="sm"
              onClick={() => saveMutation.mutate({ provider: "openai", apiKey: openaiKey })}
              disabled={!isByokAllowed || !openaiKey.trim() || saveMutation.isPending}
              className="w-full"
            >
              {saveMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Save OpenAI Key
            </Button>
          </CardContent>
        </Card>

        {/* OpenRouter Card */}
        <Card className="border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-purple-500" />
                <CardTitle className="text-base">OpenRouter (DeepSeek, Llama, Claude)</CardTitle>
              </div>
              {openrouterCred?.isVerified ? (
                <Badge variant="outline" className="text-emerald-600 border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30">
                  <CheckCircle2 className="h-3 w-3 mr-1" /> Connected
                </Badge>
              ) : openrouterCred?.hasKey ? (
                <Badge variant="secondary">Saved (Unverified)</Badge>
              ) : (
                <Badge variant="outline">Not Set</Badge>
              )}
            </div>
            <CardDescription className="text-xs">
              Access DeepSeek R1/V3, Llama 3.3 70B, Claude 3.5 Sonnet, and hundreds of uncapped models.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {openrouterCred?.hasKey && (
              <div className="text-xs font-mono bg-muted p-2 rounded flex items-center justify-between">
                <span>Active Key: {openrouterCred.apiKey}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 px-2 text-xs"
                  onClick={() => verifyMutation.mutate("openrouter")}
                  disabled={verifyMutation.isPending || !isByokAllowed}
                >
                  {verifyMutation.isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : "Test Key"}
                </Button>
              </div>
            )}
            <div className="space-y-2">
              <Label className="text-xs">Update OpenRouter API Key</Label>
              <Input
                type="password"
                placeholder={isByokAllowed ? "sk-or-v1-..." : "Disabled by administrator"}
                value={openrouterKey}
                onChange={(e) => setOpenrouterKey(e.target.value)}
                disabled={!isByokAllowed}
              />
            </div>
            <Button
              size="sm"
              onClick={() => saveMutation.mutate({ provider: "openrouter", apiKey: openrouterKey })}
              disabled={!isByokAllowed || !openrouterKey.trim() || saveMutation.isPending}
              className="w-full"
            >
              {saveMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Save OpenRouter Key
            </Button>
          </CardContent>
        </Card>

        {/* Twilio Telephony Card */}
        <Card className="border-border md:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-red-500" />
                <CardTitle className="text-base">Twilio Telephony (Bring Your Own Numbers)</CardTitle>
              </div>
              {twilioCred?.isVerified ? (
                <Badge variant="outline" className="text-emerald-600 border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30">
                  <CheckCircle2 className="h-3 w-3 mr-1" /> Connected
                </Badge>
              ) : twilioCred?.hasKey ? (
                <Badge variant="secondary">Saved (Unverified)</Badge>
              ) : (
                <Badge variant="outline">Not Set</Badge>
              )}
            </div>
            <CardDescription className="text-xs">
              Link your Twilio account to auto-import your phone numbers and dial outbound campaigns with your own carrier balance.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {twilioCred?.hasKey && (
              <div className="text-xs font-mono bg-muted p-2 rounded flex items-center justify-between flex-wrap gap-2">
                <span>Account SID: {twilioCred.accountId}</span>
                <span>Auth Token: {twilioCred.apiKey}</span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs"
                    onClick={() => verifyMutation.mutate("twilio")}
                    disabled={verifyMutation.isPending || !isByokAllowed}
                  >
                    {verifyMutation.isPending ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : null}
                    Verify Twilio
                  </Button>
                  <Button
                    size="sm"
                    className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => syncNumbersMutation.mutate()}
                    disabled={syncNumbersMutation.isPending || !isByokAllowed}
                  >
                    {syncNumbersMutation.isPending ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <RefreshCw className="h-3 w-3 mr-1" />}
                    Sync My Numbers
                  </Button>
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs">Twilio Account SID</Label>
                <Input
                  placeholder={isByokAllowed ? "AC..." : "Disabled by administrator"}
                  value={twilioSid}
                  onChange={(e) => setTwilioSid(e.target.value)}
                  disabled={!isByokAllowed}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Twilio Auth Token</Label>
                <Input
                  type="password"
                  placeholder={isByokAllowed ? "Auth Token" : "Disabled by administrator"}
                  value={twilioToken}
                  onChange={(e) => setTwilioToken(e.target.value)}
                  disabled={!isByokAllowed}
                />
              </div>
            </div>
            <Button
              size="sm"
              onClick={() => saveMutation.mutate({ provider: "twilio", accountId: twilioSid, apiKey: twilioToken })}
              disabled={!isByokAllowed || (!twilioSid.trim() && !twilioToken.trim()) || saveMutation.isPending}
            >
              {saveMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Save Twilio Credentials
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
