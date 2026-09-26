/**
 * ============================================================
 * © 2026 KodeWaves. All rights reserved.
 * Original Author: BTPL Engineering Team
 * Website: https://kodewaves.in
 * Contact: support@kodewaves.in
 *
 * Distributed under the Envato / CodeCanyon License Agreement.
 * Licensed to the purchaser for use as defined by the
 * Envato Market (CodeCanyon) Regular or Extended License.
 *
 * You are NOT permitted to redistribute, resell, sublicense,
 * or share this source code, in whole or in part.
 * Respect the author's rights and Envato licensing terms.
 * ============================================================
 */
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useCallback } from "react";
import { Save, Loader2, AlertCircle, RefreshCw, CheckCircle2, XCircle, Phone, Mic, Pencil, Key, ShieldAlert, Sheet, Copy, ExternalLink, Brain } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { useTranslation } from "react-i18next";
import BrandingSettings from "./BrandingSettings";
import SMTPSettings from "./SMTPSettings";

interface Settings {
  default_llm_free: string;
  pro_plan_bonus_credits: number;
  credit_price_per_minute: number;
  min_credit_purchase: number;
  twilio_account_sid: string;
  twilio_auth_token: string;
  twilio_configured: boolean;
  elevenlabs_configured: boolean;
  openai_api_key: string;
  openai_configured: boolean;
  google_oauth_configured: boolean;
  google_client_id_display: string;
  google_client_id_from_env: boolean;
  invoice_prefix: string;
  invoice_start_number: number;
  system_timezone?: string;
}

const TIMEZONE_OPTIONS = [
  { value: "UTC", label: "UTC (Coordinated Universal Time)", region: "Universal" },
  // Americas
  { value: "America/New_York", label: "Eastern Time (US & Canada)", region: "Americas" },
  { value: "America/Chicago", label: "Central Time (US & Canada)", region: "Americas" },
  { value: "America/Denver", label: "Mountain Time (US & Canada)", region: "Americas" },
  { value: "America/Los_Angeles", label: "Pacific Time (US & Canada)", region: "Americas" },
  { value: "America/Anchorage", label: "Alaska", region: "Americas" },
  { value: "America/Toronto", label: "Toronto", region: "Americas" },
  { value: "America/Vancouver", label: "Vancouver", region: "Americas" },
  { value: "America/Mexico_City", label: "Mexico City", region: "Americas" },
  { value: "America/Sao_Paulo", label: "São Paulo", region: "Americas" },
  { value: "America/Buenos_Aires", label: "Buenos Aires", region: "Americas" },
  { value: "America/Lima", label: "Lima", region: "Americas" },
  { value: "America/Bogota", label: "Bogota", region: "Americas" },
  // Europe
  { value: "Europe/London", label: "London", region: "Europe" },
  { value: "Europe/Paris", label: "Paris", region: "Europe" },
  { value: "Europe/Berlin", label: "Berlin", region: "Europe" },
  { value: "Europe/Madrid", label: "Madrid", region: "Europe" },
  { value: "Europe/Rome", label: "Rome", region: "Europe" },
  { value: "Europe/Amsterdam", label: "Amsterdam", region: "Europe" },
  { value: "Europe/Stockholm", label: "Stockholm", region: "Europe" },
  { value: "Europe/Warsaw", label: "Warsaw", region: "Europe" },
  { value: "Europe/Moscow", label: "Moscow", region: "Europe" },
  { value: "Europe/Istanbul", label: "Istanbul", region: "Europe" },
  // Asia
  { value: "Asia/Dubai", label: "Dubai", region: "Asia" },
  { value: "Asia/Kolkata", label: "India (Mumbai, Delhi, Kolkata)", region: "Asia" },
  { value: "Asia/Bangkok", label: "Bangkok", region: "Asia" },
  { value: "Asia/Singapore", label: "Singapore", region: "Asia" },
  { value: "Asia/Hong_Kong", label: "Hong Kong", region: "Asia" },
  { value: "Asia/Shanghai", label: "Shanghai", region: "Asia" },
  { value: "Asia/Tokyo", label: "Tokyo", region: "Asia" },
  { value: "Asia/Seoul", label: "Seoul", region: "Asia" },
  { value: "Asia/Jakarta", label: "Jakarta", region: "Asia" },
  { value: "Asia/Manila", label: "Manila", region: "Asia" },
  // Africa
  { value: "Africa/Cairo", label: "Cairo", region: "Africa" },
  { value: "Africa/Lagos", label: "Lagos", region: "Africa" },
  { value: "Africa/Johannesburg", label: "Johannesburg", region: "Africa" },
  { value: "Africa/Nairobi", label: "Nairobi", region: "Africa" },
  // Oceania
  { value: "Australia/Sydney", label: "Sydney", region: "Oceania" },
  { value: "Australia/Melbourne", label: "Melbourne", region: "Oceania" },
  { value: "Australia/Perth", label: "Perth", region: "Oceania" },
  { value: "Pacific/Auckland", label: "Auckland", region: "Oceania" },
  { value: "Pacific/Honolulu", label: "Hawaii", region: "Oceania" },
];

const groupedTimezones = TIMEZONE_OPTIONS.reduce((acc, tz) => {
  if (!acc[tz.region]) acc[tz.region] = [];
  acc[tz.region].push(tz);
  return acc;
}, {} as Record<string, typeof TIMEZONE_OPTIONS>);

interface ConnectionStatus {
  connected: boolean;
  error?: string;
  details?: string;
  loading?: boolean;
}

interface GlobalSettingsProps {
  onSwitchTab?: (tab: string) => void;
}

/**
 * Sanitize error messages to prevent displaying raw HTML or overly technical errors
 * Returns a clean, user-friendly error message
 */
function sanitizeErrorMessage(error: string | undefined, fallbackMessage: string): string | undefined {
  if (!error) return undefined;
  
  // Detect HTML content (like 502 Bad Gateway pages)
  if (error.includes('<html') || error.includes('<!DOCTYPE') || error.includes('<head>') || error.includes('<body>')) {
    return 'Service temporarily unavailable. Please check your server configuration.';
  }
  
  // Detect JSON parsing errors (indicates server returned non-JSON)
  if (error.includes('Unexpected token') || error.includes('JSON')) {
    return 'Service temporarily unavailable. Please check your server configuration.';
  }
  
  // Detect network/connection errors
  if (error.includes('Failed to fetch') || error.includes('NetworkError') || error.includes('ECONNREFUSED')) {
    return 'Unable to connect to server. Please check if the service is running.';
  }
  
  // If error is too long (likely contains debug info), truncate it
  if (error.length > 200) {
    return fallbackMessage;
  }
  
  return error;
}

export default function GlobalSettings({ onSwitchTab }: GlobalSettingsProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<Settings>>({});
  const [hasChanges, setHasChanges] = useState(false);
  
  const [googleClientId, setGoogleClientId] = useState("");
  const [googleClientSecret, setGoogleClientSecret] = useState("");
  const [googleSaving, setGoogleSaving] = useState(false);

  const { data: voiceEngineKeys, isLoading: isVoiceEngineLoading, refetch: refetchVoiceEngine } = useQuery<{ success: boolean; data: any }>({
    queryKey: ["/api/voice-engine/admin/provider-keys"],
    staleTime: 30000,
  });

  const { data: nodesData, isLoading: isNodesLoading, refetch: refetchNodes } = useQuery<{ success: boolean; data: any[] }>({
    queryKey: ["/api/voice-engine/admin/settings/nodes"],
    staleTime: 30000,
  });

  const { data: settings, isLoading, isError: settingsError } = useQuery<Settings>({
    queryKey: ["/api/admin/settings"]
  });

  // KYC Settings Query
  interface VoiceEngineSettings {
    plivo_openai_engine_enabled: boolean;
    twilio_openai_engine_enabled: boolean;
    twilio_kyc_required: boolean;
    plivo_kyc_required: boolean;
  }
  
  const { data: voiceEngineSettings, isLoading: kycSettingsLoading } = useQuery<VoiceEngineSettings>({
    queryKey: ["/api/settings/voice-engine"],
  });

  const isTwilioKycRequired = voiceEngineSettings?.twilio_kyc_required ?? false;
  const isPlivoKycRequired = voiceEngineSettings?.plivo_kyc_required ?? false;

  const updateKycSetting = useMutation({
    mutationFn: async ({ key, enabled }: { key: 'twilio_kyc_required' | 'plivo_kyc_required', enabled: boolean }) => {
      const res = await apiRequest("PATCH", `/api/admin/settings/${key}`, { value: enabled });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to update setting");
      }
      return { key, enabled };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/settings/voice-engine"] });
      const providerName = data.key === 'twilio_kyc_required' ? 'Twilio' : 'Plivo';
      toast({
        title: t("admin.settings.kyc.updated"),
        description: t("admin.settings.kyc.updatedDesc", {
          status: data.enabled ? t("admin.settings.kyc.required") : t("admin.settings.kyc.notRequired"),
          provider: providerName
        })
      });
    },
    onError: (error: any) => {
      toast({
        title: t("admin.settings.kyc.updateFailed"),
        description: error.message,
        variant: "destructive"
      });
    }
    });

  const refreshAllStatus = useCallback(() => {
    refetchVoiceEngine();
    refetchNodes();
    queryClient.invalidateQueries({ queryKey: ["/api/admin/settings"] });
  }, [refetchVoiceEngine, refetchNodes]);

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const updateSetting = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: any }) => {
      return apiRequest("PATCH", `/api/admin/settings/${key}`, { value });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/settings"] });
    },
    onError: (error: any) => {
      toast({
        title: t("admin.settings.updateFailed"),
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const handleChange = (key: keyof Settings, value: any) => {
    setFormData({
      ...formData,
      [key]: value
    });
    setHasChanges(true);
  };

  const handleSave = async () => {
    const promises = Object.keys(formData).map((key) => {
      if (key !== 'twilio_configured' && key !== 'elevenlabs_configured' && key !== 'openai_configured') {
        const typedKey = key as keyof Settings;
        if (formData[typedKey] !== settings?.[typedKey]) {
          return updateSetting.mutateAsync({
            key,
            value: formData[typedKey]
          });
        }
      }
      return Promise.resolve();
    });

    try {
      await Promise.all(promises);
      toast({ title: t("admin.settings.settingsUpdated") });
      setHasChanges(false);
    } catch (error) {
    }
  };

  const handleSaveGoogleOAuth = async () => {
    if (!googleClientId && !googleClientSecret) {
      toast({ title: "No changes to save", variant: "destructive" });
      return;
    }
    setGoogleSaving(true);
    try {
      const tasks: Promise<any>[] = [];
      if (googleClientId.trim()) {
        tasks.push(apiRequest("PATCH", "/api/admin/settings/google_client_id", { value: googleClientId.trim() }));
      }
      if (googleClientSecret.trim()) {
        tasks.push(apiRequest("PATCH", "/api/admin/settings/google_client_secret", { value: googleClientSecret.trim() }));
      }
      await Promise.all(tasks);
      queryClient.invalidateQueries({ queryKey: ["/api/admin/settings"] });
      setGoogleClientId("");
      setGoogleClientSecret("");
      toast({ title: t("admin.settings.googleOAuth.saved") || "Google OAuth credentials saved" });
    } catch (err: any) {
      toast({ title: t("admin.settings.googleOAuth.saveFailed") || "Failed to save Google OAuth credentials", description: err?.message, variant: "destructive" });
    } finally {
      setGoogleSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const isAnyLoading = isVoiceEngineLoading || isNodesLoading;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold">{t("admin.settings.title")}</h2>
          <p className="text-muted-foreground">
            {t("admin.settings.description")}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={refreshAllStatus}
          disabled={isAnyLoading}
          data-testid="button-refresh-connections"
        >
          {isAnyLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-2" />
          )}
          {t("admin.settings.connectionStatus.refreshAll") || "Refresh Status"}
        </Button>
      </div>

      {/* Connection Status Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Cloud Engine SIP Telephony Core */}
        <Card className="relative overflow-hidden border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-transparent">
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl bg-emerald-500/20" />
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20">
                  <Phone className="h-6 w-6 text-emerald-500" />
                </div>
                <div>
                  <CardTitle className="text-lg">Cloud Engine Telephony & SIP</CardTitle>
                  <CardDescription className="text-sm">High-Concurrency SIP & WebSockets</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full font-medium text-sm bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/30">
                <CheckCircle2 className="h-4 w-4" />
                <span>Operational</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground flex-1">
                Direct cloud carrier streaming (CallHippo, TeleCMI, VoiceLink, Exotel, Twilio) with sub-100ms real-time audio.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSwitchTab?.("voice-engine-settings")}
                className="shrink-0 whitespace-nowrap"
              >
                <Phone className="h-4 w-4 mr-1.5" />
                Manage
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Master AI Speech Pool */}
        <Card className="relative overflow-hidden border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-transparent">
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl bg-emerald-500/20" />
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20">
                  <Mic className="h-6 w-6 text-emerald-500" />
                </div>
                <div>
                  <CardTitle className="text-lg">Master AI Speech Pool</CardTitle>
                  <CardDescription className="text-sm">STT & TTS Multi-Engine</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full font-medium text-sm bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/30">
                <CheckCircle2 className="h-4 w-4" />
                <span>Active</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground flex-1">
                Deepgram Nova-2 streaming STT and Sarvam AI Indian languages neural synthesis.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSwitchTab?.("voice-engine-settings")}
                className="shrink-0 whitespace-nowrap"
              >
                <Mic className="h-4 w-4 mr-1.5" />
                Configure
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Master AI LLM Intelligence */}
        <Card className="relative overflow-hidden border-2 border-indigo-500/30 bg-gradient-to-br from-indigo-500/5 to-transparent">
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl bg-indigo-500/20" />
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-indigo-500/10 ring-1 ring-indigo-500/20">
                  <Brain className="h-6 w-6 text-indigo-500" />
                </div>
                <div>
                  <CardTitle className="text-lg">Master AI LLM Pool</CardTitle>
                  <CardDescription className="text-sm">Gemini, Groq, OpenAI & DeepSeek</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full font-medium text-sm bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 ring-1 ring-indigo-500/30">
                <CheckCircle2 className="h-4 w-4" />
                <span>Ready</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground flex-1">
                Ultra-low latency conversational intelligence matrix with tenant BYOK governance.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSwitchTab?.("voice-engine-settings")}
                className="shrink-0 whitespace-nowrap"
              >
                <Brain className="h-4 w-4 mr-1.5" />
                Manage
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 1. Branding Settings */}
      <BrandingSettings />

      {/* 4. Google OAuth Credentials */}
      <Card id="google-oauth-credentials">
        <CardHeader>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <Sheet className="h-5 w-5 text-muted-foreground" />
              <div>
                <CardTitle>{t("admin.settings.googleOAuth.title")}</CardTitle>
                <CardDescription>
                  {t("admin.settings.googleOAuth.description")}
                </CardDescription>
              </div>
            </div>
            {settings?.google_oauth_configured && (
              <div className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/30">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>{t("admin.settings.googleOAuth.configured")}</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Setup guide — redirect URI that must be added in Google Cloud Console */}
          <div className="rounded-md border bg-muted/40 p-3 space-y-2">
            <p className="text-xs font-medium text-foreground">{t("admin.settings.googleOAuth.setupGuide")}</p>
            <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
              <li>
                {t("admin.settings.googleOAuth.guideStep1")}{" "}
                <a
                  href="https://console.cloud.google.com/apis/credentials"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {t("admin.settings.googleOAuth.guideStep1Link")} <ExternalLink className="h-3 w-3" />
                </a>
                {" "}{t("admin.settings.googleOAuth.guideStep1End")}
              </li>
              <li>{t("admin.settings.googleOAuth.guideStep2")}</li>
              <li>{t("admin.settings.googleOAuth.guideStep3")}</li>
            </ol>
            <div className="flex items-center gap-2 mt-1">
              <code className="flex-1 text-xs bg-background border rounded px-2 py-1 font-mono text-foreground truncate" data-testid="text-redirect-uri">
                {typeof window !== "undefined" ? `${window.location.origin}/app/google-callback` : "/app/google-callback"}
              </code>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  const uri = `${window.location.origin}/app/google-callback`;
                  navigator.clipboard.writeText(uri).then(() =>
                    toast({ title: t("admin.settings.googleOAuth.copyRedirectUri") })
                  );
                }}
                data-testid="button-copy-redirect-uri"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <div className="flex items-center">
              <Label>{t("admin.settings.googleOAuth.clientId")}</Label>
              <InfoTooltip content={t("admin.settings.googleOAuth.clientIdTooltip")} />
            </div>
            <Input
              type="text"
              value={googleClientId}
              onChange={(e) => setGoogleClientId(e.target.value)}
              placeholder={
                settings?.google_oauth_configured
                  ? (settings?.google_client_id_from_env ? t("admin.settings.googleOAuth.clientIdEnv") : t("admin.settings.googleOAuth.clientIdUpdate"))
                  : t("admin.settings.googleOAuth.clientIdPlaceholder")
              }
              data-testid="input-google-client-id"
            />
            {settings?.google_client_id_display && !settings?.google_client_id_from_env && (
              <p className="text-xs text-muted-foreground mt-1">
                {t("admin.settings.googleOAuth.currentClientId", { id: settings.google_client_id_display })}
              </p>
            )}
            {settings?.google_client_id_from_env && (
              <p className="text-xs text-muted-foreground mt-1">
                {t("admin.settings.googleOAuth.envOverride")}
              </p>
            )}
          </div>
          <div>
            <div className="flex items-center">
              <Label>{t("admin.settings.googleOAuth.clientSecret")}</Label>
              <InfoTooltip content={t("admin.settings.googleOAuth.clientSecretTooltip")} />
            </div>
            <Input
              type="password"
              value={googleClientSecret}
              onChange={(e) => setGoogleClientSecret(e.target.value)}
              placeholder={
                settings?.google_oauth_configured
                  ? (settings?.google_client_id_from_env ? t("admin.settings.googleOAuth.clientIdEnv") : t("admin.settings.googleOAuth.clientIdUpdate"))
                  : t("admin.settings.googleOAuth.clientSecretPlaceholder")
              }
              data-testid="input-google-client-secret"
            />
          </div>
          {!settings?.google_oauth_configured && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                {t("admin.settings.googleOAuth.notConfigured")}
              </AlertDescription>
            </Alert>
          )}
          <div className="flex justify-end">
            <Button
              onClick={handleSaveGoogleOAuth}
              disabled={(!googleClientId.trim() && !googleClientSecret.trim()) || googleSaving}
              data-testid="button-save-google-oauth"
            >
              {googleSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("admin.settings.saving")}
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {t("admin.settings.googleOAuth.saveButton")}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 5. SMTP Email Settings */}
      <SMTPSettings />

      {/* 5-8. Plan Settings, Pricing, System Resources, System Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 5. Plan Settings */}
        <Card>
          <CardHeader>
            <CardTitle>{t("admin.settings.planSettings.title")}</CardTitle>
            <CardDescription>
              {t("admin.settings.planSettings.description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center">
                <Label>{t("admin.settings.planSettings.defaultLlm")}</Label>
                <InfoTooltip content={t("admin.settings.planSettings.defaultLlmTooltip")} />
              </div>
              <Input
                value={formData.default_llm_free || ""}
                onChange={(e) => handleChange("default_llm_free", e.target.value)}
                placeholder={t("admin.settings.planSettings.defaultLlmPlaceholder")}
                data-testid="input-default-llm"
              />
            </div>
            <div>
              <div className="flex items-center">
                <Label>{t("admin.settings.planSettings.bonusCredits")}</Label>
                <InfoTooltip content={t("admin.settings.planSettings.bonusCreditsTooltip")} />
              </div>
              <Input
                type="number"
                value={formData.pro_plan_bonus_credits || 0}
                onChange={(e) => handleChange("pro_plan_bonus_credits", parseInt(e.target.value) || 0)}
                data-testid="input-bonus-credits"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {t("admin.settings.planSettings.bonusCreditsHint")}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 6. Pricing Settings - only Credit Price, Phone Monthly Cost, Min Purchase */}
        <Card>
          <CardHeader>
            <CardTitle>{t("admin.settings.pricing.title")}</CardTitle>
            <CardDescription>
              {t("admin.settings.pricing.description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center">
                <Label>{t("admin.settings.pricing.creditPrice")}</Label>
                <InfoTooltip content={t("admin.settings.pricing.creditPriceTooltip")} />
              </div>
              <Input
                type="number"
                step="0.01"
                value={formData.credit_price_per_minute || 0}
                onChange={(e) => handleChange("credit_price_per_minute", parseFloat(e.target.value) || 0)}
                data-testid="input-credit-price"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {t("admin.settings.pricing.creditPriceHint")}
              </p>
            </div>
            <div>
              <div className="flex items-center">
                <Label>{t("admin.settings.pricing.minPurchase")}</Label>
                <InfoTooltip content={t("admin.settings.pricing.minPurchaseTooltip")} />
              </div>
              <Input
                type="number"
                value={formData.min_credit_purchase || 10}
                onChange={(e) => handleChange("min_credit_purchase", parseInt(e.target.value) || 10)}
                data-testid="input-min-purchase"
              />
            </div>
          </CardContent>
        </Card>

        {/* 7. Invoice Settings */}
        <Card>
          <CardHeader>
            <CardTitle>{t("admin.settings.invoice.title")}</CardTitle>
            <CardDescription>
              {t("admin.settings.invoice.description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center">
                <Label>{t("admin.settings.invoice.prefix")}</Label>
                <InfoTooltip content={t("admin.settings.invoice.prefixTooltip")} />
              </div>
              <Input
                value={formData.invoice_prefix || "INV"}
                onChange={(e) => handleChange("invoice_prefix", e.target.value.toUpperCase())}
                placeholder="INV"
                data-testid="input-invoice-prefix"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {t("admin.settings.invoice.prefixHint")}
              </p>
            </div>
            <div>
              <div className="flex items-center">
                <Label>{t("admin.settings.invoice.startNumber")}</Label>
                <InfoTooltip content={t("admin.settings.invoice.startNumberTooltip")} />
              </div>
              <Input
                type="number"
                min="1"
                value={formData.invoice_start_number || 1}
                onChange={(e) => handleChange("invoice_start_number", parseInt(e.target.value) || 1)}
                data-testid="input-invoice-start"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {t("admin.settings.invoice.startNumberHint")}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 8. KYC Verification Requirements */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <ShieldAlert className="h-5 w-5" />
              <div>
                <CardTitle className="text-lg">{t("admin.settings.kyc.title")}</CardTitle>
                <CardDescription>
                  {t("admin.settings.kyc.description")}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{t("admin.settings.kyc.twilio")}</p>
                <p className="text-xs text-muted-foreground">
                  {t("admin.settings.kyc.twilioDesc")}
                </p>
              </div>
              {kycSettingsLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              ) : (
                <div className="flex items-center gap-3">
                  <Label htmlFor="twilio-kyc-toggle" className="text-sm text-muted-foreground">
                    {isTwilioKycRequired ? t("admin.settings.kyc.required") : t("admin.settings.kyc.notRequired")}
                  </Label>
                  <Switch
                    id="twilio-kyc-toggle"
                    checked={isTwilioKycRequired}
                    onCheckedChange={(checked) => updateKycSetting.mutate({ key: 'twilio_kyc_required', enabled: checked })}
                    disabled={updateKycSetting.isPending}
                    data-testid="switch-twilio-kyc-required"
                  />
                </div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{t("admin.settings.kyc.plivo")}</p>
                <p className="text-xs text-muted-foreground">
                  {t("admin.settings.kyc.plivoDesc")}
                </p>
              </div>
              {kycSettingsLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              ) : (
                <div className="flex items-center gap-3">
                  <Label htmlFor="plivo-kyc-toggle" className="text-sm text-muted-foreground">
                    {isPlivoKycRequired ? t("admin.settings.kyc.required") : t("admin.settings.kyc.notRequired")}
                  </Label>
                  <Switch
                    id="plivo-kyc-toggle"
                    checked={isPlivoKycRequired}
                    onCheckedChange={(checked) => updateKycSetting.mutate({ key: 'plivo_kyc_required', enabled: checked })}
                    disabled={updateKycSetting.isPending}
                    data-testid="switch-plivo-kyc-required"
                  />
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {t("admin.settings.kyc.hint")}
            </p>
          </CardContent>
        </Card>

        {/* 9. Regional Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Regional Settings</CardTitle>
            <CardDescription>
              Configure regional preferences and the default timezone for the platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="system-timezone">System Timezone</Label>
              <Select
                value={formData.system_timezone || "UTC"}
                onValueChange={(value) => handleChange("system_timezone", value)}
              >
                <SelectTrigger id="system-timezone" className="w-full" data-testid="select-system-timezone">
                  <SelectValue placeholder="Select platform timezone" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(groupedTimezones).map(([region, timezones]) => (
                    <div key={region}>
                      <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground bg-muted/50">
                        {region}
                      </div>
                      {timezones.map((tz) => (
                        <SelectItem key={tz.value} value={tz.value} data-testid={`system-timezone-${tz.value}`}>
                          {tz.label}
                        </SelectItem>
                      ))}
                    </div>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                All call dates, summaries, and campaigns will format their timestamps using this timezone.
              </p>
            </div>
          </CardContent>
        </Card>

      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={!hasChanges || updateSetting.isPending}
          data-testid="button-save-settings"
        >
          {updateSetting.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t("admin.settings.saving")}
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              {t("admin.settings.saveSettings")}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

