import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff, ExternalLink, KeyRound, Server, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

export type TelephonyProviderType =
  | "ari"
  | "cloudonix"
  | "exotel"
  | "plivo"
  | "telnyx"
  | "twilio"
  | "vobiz"
  | "vonage"
  | "sip";

export interface UnifiedTelephonyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  existingConfig?: any | null;
  onSaved?: () => void;
}

const PROVIDERS = [
  { id: "ari", name: "Asterisk ARI", docsUrl: "https://docs.dograh.com/integrations/telephony/asterisk-ari" },
  { id: "cloudonix", name: "Cloudonix", docsUrl: "https://docs.dograh.com/integrations/telephony/cloudonix" },
  { id: "exotel", name: "Exotel", docsUrl: "https://docs.dograh.com/integrations/telephony/exotel" },
  { id: "plivo", name: "Plivo", docsUrl: "https://docs.dograh.com/integrations/telephony/plivo" },
  { id: "telnyx", name: "Telnyx", docsUrl: "https://docs.dograh.com/integrations/telephony/telnyx" },
  { id: "twilio", name: "Twilio", docsUrl: "https://docs.dograh.com/integrations/telephony/twilio" },
  { id: "vobiz", name: "Vobiz", docsUrl: "https://docs.dograh.com/integrations/telephony/vobiz" },
  { id: "vonage", name: "Vonage", docsUrl: "https://docs.dograh.com/integrations/telephony/vonage" },
  { id: "sip", name: "Indian Carrier / Custom SIP", docsUrl: "https://docs.dograh.com/integrations/telephony/sip" },
];

const SIP_PRESETS: Record<string, { name: string; proxy: string; port: number }> = {
  tata: { name: "Tata Tele Business", proxy: "sip.tatatelebusiness.com", port: 5060 },
  airtel: { name: "Airtel IQ", proxy: "sip.airtel.in", port: 5060 },
  callhippo: { name: "CallHippo India", proxy: "sip.callhippo.com", port: 5060 },
  telecmi: { name: "TeleCMI India", proxy: "sip.telecmi.com", port: 5060 },
  voicelink: { name: "VoiceLink Universal", proxy: "sip.voicelink.cloud", port: 5060 },
  jio: { name: "Jio Enterprise SIP", proxy: "sip.jio.com", port: 5060 },
  custom: { name: "Custom SIP", proxy: "", port: 5060 },
};

export function UnifiedTelephonyDialog({
  open,
  onOpenChange,
  existingConfig,
  onSaved,
}: UnifiedTelephonyDialogProps) {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Common Header State
  const [name, setName] = useState("");
  const [provider, setProvider] = useState<TelephonyProviderType>("ari");
  const [isDefaultOutbound, setIsDefaultOutbound] = useState(false);

  // Asterisk ARI State
  const [ariEndpoint, setAriEndpoint] = useState("");
  const [ariUsername, setAriUsername] = useState("");
  const [ariPassword, setAriPassword] = useState("");
  const [ariWsClientName, setAriWsClientName] = useState("");
  const [ariDialStringTemplate, setAriDialStringTemplate] = useState("PJSIP/{number}");

  // Cloudonix State
  const [cloudonixBearerToken, setCloudonixBearerToken] = useState("");
  const [cloudonixDomainName, setCloudonixDomainName] = useState("");
  const [cloudonixApplicationName, setCloudonixApplicationName] = useState("");

  // Exotel State
  const [exotelAccountSid, setExotelAccountSid] = useState("");
  const [exotelApiKey, setExotelApiKey] = useState("");
  const [exotelApiToken, setExotelApiToken] = useState("");
  const [exotelApiBaseUrl, setExotelApiBaseUrl] = useState("https://api.in.exotel.com");

  // Telnyx State
  const [telnyxApiKey, setTelnyxApiKey] = useState("");
  const [telnyxCallControlAppId, setTelnyxCallControlAppId] = useState("");
  const [telnyxWebhookPublicKey, setTelnyxWebhookPublicKey] = useState("");

  // Twilio State
  const [twilioAccountSid, setTwilioAccountSid] = useState("");
  const [twilioAuthToken, setTwilioAuthToken] = useState("");

  // Plivo State
  const [plivoAuthId, setPlivoAuthId] = useState("");
  const [plivoAuthToken, setPlivoAuthToken] = useState("");
  const [plivoApplicationId, setPlivoApplicationId] = useState("");

  // Vobiz State
  const [vobizAccountId, setVobizAccountId] = useState("");
  const [vobizAuthToken, setVobizAuthToken] = useState("");
  const [vobizApplicationId, setVobizApplicationId] = useState("");

  // Vonage State
  const [vonageApplicationId, setVonageApplicationId] = useState("");
  const [vonagePrivateKey, setVonagePrivateKey] = useState("");
  const [vonageApiKey, setVonageApiKey] = useState("");
  const [vonageApiSecret, setVonageApiSecret] = useState("");
  const [vonageSignatureSecret, setVonageSignatureSecret] = useState("");

  // Indian Carrier / SIP State
  const [sipPreset, setSipPreset] = useState("tata");
  const [sipProxy, setSipProxy] = useState("sip.tatatelebusiness.com");
  const [sipPort, setSipPort] = useState(5060);
  const [sipUsername, setSipUsername] = useState("");
  const [sipPassword, setSipPassword] = useState("");
  const [sipRegister, setSipRegister] = useState(true);

  // Initialize or populate from existingConfig
  useEffect(() => {
    if (!open) return;
    setShowPassword(false);
    if (existingConfig) {
      setName(existingConfig.name || "");
      setProvider(existingConfig.provider || "ari");
      setIsDefaultOutbound(Boolean(existingConfig.is_default_outbound));
      const creds = existingConfig.credentials || {};
      
      // Load specific provider creds
      if (existingConfig.provider === "ari") {
        setAriEndpoint(creds.ari_endpoint || "");
        setAriUsername(creds.app_name || "");
        setAriPassword(creds.app_password || "");
        setAriWsClientName(creds.ws_client_name || "");
        setAriDialStringTemplate(creds.dial_string_template || "PJSIP/{number}");
      } else if (existingConfig.provider === "cloudonix") {
        setCloudonixBearerToken(creds.bearer_token || "");
        setCloudonixDomainName(creds.domain_name || "");
        setCloudonixApplicationName(creds.application_name || "");
      } else if (existingConfig.provider === "exotel") {
        setExotelAccountSid(creds.account_sid || "");
        setExotelApiKey(creds.api_key || "");
        setExotelApiToken(creds.api_token || "");
        setExotelApiBaseUrl(creds.api_base_url || "https://api.in.exotel.com");
      } else if (existingConfig.provider === "telnyx") {
        setTelnyxApiKey(creds.api_key || "");
        setTelnyxCallControlAppId(creds.connection_id || "");
        setTelnyxWebhookPublicKey(creds.webhook_public_key || "");
      } else if (existingConfig.provider === "twilio") {
        setTwilioAccountSid(creds.account_sid || "");
        setTwilioAuthToken(creds.auth_token || "");
      } else if (existingConfig.provider === "plivo") {
        setPlivoAuthId(creds.auth_id || "");
        setPlivoAuthToken(creds.auth_token || "");
        setPlivoApplicationId(creds.application_id || "");
      } else if (existingConfig.provider === "vobiz") {
        setVobizAccountId(creds.account_id || "");
        setVobizAuthToken(creds.auth_token || "");
        setVobizApplicationId(creds.application_id || "");
      } else if (existingConfig.provider === "vonage") {
        setVonageApplicationId(creds.application_id || "");
        setVonagePrivateKey(creds.private_key || "");
        setVonageApiKey(creds.api_key || "");
        setVonageApiSecret(creds.api_secret || "");
        setVonageSignatureSecret(creds.signature_secret || "");
      } else if (existingConfig.provider === "sip") {
        setSipProxy(creds.proxy || "");
        setSipUsername(creds.username || "");
        setSipPassword(creds.password || "");
        setSipRegister(creds.register ?? true);
      }
    } else {
      setName("");
      setIsDefaultOutbound(false);
    }
  }, [open, existingConfig]);

  const handleSipPresetChange = (presetKey: string) => {
    setSipPreset(presetKey);
    const p = SIP_PRESETS[presetKey];
    if (p) {
      if (p.proxy) setSipProxy(p.proxy);
      setSipPort(p.port);
    }
  };

  const currentProviderInfo = PROVIDERS.find(p => p.id === provider);

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast({
        title: "Name is required",
        description: "Please enter a friendly name for this configuration.",
        variant: "destructive",
      });
      return;
    }

    let credentials: Record<string, any> = {};

    switch (provider) {
      case "ari":
        if (!ariEndpoint.trim() || !ariUsername.trim()) {
          toast({ title: "ARI endpoint and username are required", variant: "destructive" });
          return;
        }
        credentials = {
          ari_endpoint: ariEndpoint.trim(),
          app_name: ariUsername.trim(),
          app_password: ariPassword,
          ws_client_name: ariWsClientName.trim(),
          dial_string_template: ariDialStringTemplate.trim(),
        };
        break;

      case "cloudonix":
        if (!cloudonixBearerToken.trim() || !cloudonixDomainName.trim()) {
          toast({ title: "Bearer token and domain name are required", variant: "destructive" });
          return;
        }
        credentials = {
          bearer_token: cloudonixBearerToken.trim(),
          domain_name: cloudonixDomainName.trim(),
          application_name: cloudonixApplicationName.trim(),
        };
        break;

      case "exotel":
        if (!exotelAccountSid.trim() || !exotelApiKey.trim() || !exotelApiToken.trim()) {
          toast({ title: "Account SID, API Key, and Token are required", variant: "destructive" });
          return;
        }
        credentials = {
          account_sid: exotelAccountSid.trim(),
          api_key: exotelApiKey.trim(),
          api_token: exotelApiToken.trim(),
          api_base_url: exotelApiBaseUrl.trim(),
        };
        break;

      case "telnyx":
        if (!telnyxApiKey.trim()) {
          toast({ title: "Telnyx API key is required", variant: "destructive" });
          return;
        }
        credentials = {
          api_key: telnyxApiKey.trim(),
          connection_id: telnyxCallControlAppId.trim(),
          webhook_public_key: telnyxWebhookPublicKey.trim(),
        };
        break;

      case "twilio":
        if (!twilioAccountSid.trim() || !twilioAuthToken.trim()) {
          toast({ title: "Twilio Account SID and Auth Token are required", variant: "destructive" });
          return;
        }
        credentials = {
          account_sid: twilioAccountSid.trim(),
          auth_token: twilioAuthToken.trim(),
        };
        break;

      case "plivo":
        if (!plivoAuthId.trim() || !plivoAuthToken.trim()) {
          toast({ title: "Plivo Auth ID and Auth Token are required", variant: "destructive" });
          return;
        }
        credentials = {
          auth_id: plivoAuthId.trim(),
          auth_token: plivoAuthToken.trim(),
          application_id: plivoApplicationId.trim(),
        };
        break;

      case "vobiz":
        if (!vobizAccountId.trim() || !vobizAuthToken.trim()) {
          toast({ title: "Vobiz Account ID and Auth Token are required", variant: "destructive" });
          return;
        }
        credentials = {
          account_id: vobizAccountId.trim(),
          auth_token: vobizAuthToken.trim(),
          application_id: vobizApplicationId.trim(),
        };
        break;

      case "vonage":
        if (!vonageApplicationId.trim() || !vonageApiKey.trim()) {
          toast({ title: "Vonage Application ID and API Key are required", variant: "destructive" });
          return;
        }
        credentials = {
          application_id: vonageApplicationId.trim(),
          private_key: vonagePrivateKey.trim(),
          api_key: vonageApiKey.trim(),
          api_secret: vonageApiSecret.trim(),
          signature_secret: vonageSignatureSecret.trim(),
        };
        break;

      case "sip":
        if (!sipProxy.trim()) {
          toast({ title: "SIP proxy/domain is required", variant: "destructive" });
          return;
        }
        credentials = {
          proxy: sipProxy.trim(),
          port: sipPort,
          username: sipUsername.trim(),
          password: sipPassword,
          register: sipRegister,
        };
        break;
    }

    setSubmitting(true);
    try {
      if (existingConfig?.id) {
        await apiRequest("PUT", `/api/telephony-configs/${existingConfig.id}`, {
          name: name.trim(),
          provider,
          credentials,
          is_default_outbound: isDefaultOutbound,
        });
        toast({ title: "Configuration Updated", description: `${name} has been updated successfully.` });
      } else {
        // Also save to user SIP gateways for unified backward compatibility
        await apiRequest("POST", "/api/user/sip-gateways", {
          name: name.trim(),
          proxy: credentials.proxy || credentials.ari_endpoint || credentials.domain_name || `${provider}.carrier.cloud`,
          username: credentials.account_sid || credentials.auth_id || credentials.app_name || credentials.username || name.trim(),
          password: credentials.auth_token || credentials.app_password || credentials.api_key || credentials.password || "secret",
          register: provider === "sip" ? sipRegister : false,
          caller_id_in_from: true,
        });
        toast({ title: "Configuration Created", description: `${name} has been connected successfully.` });
      }

      queryClient.invalidateQueries({ queryKey: ["/api/user/sip-gateways"] });
      queryClient.invalidateQueries({ queryKey: ["/api/user/sip-phone-numbers"] });
      queryClient.invalidateQueries({ queryKey: ["/api/telephony-configs"] });
      if (onSaved) onSaved();
      onOpenChange(false);
    } catch (err: any) {
      toast({
        title: "Failed to save configuration",
        description: err.message || "An error occurred while connecting provider.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto bg-card text-card-foreground border-border/80">
        <DialogHeader className="space-y-1.5 pb-2 border-b border-border/40">
          <DialogTitle className="text-xl font-bold">
            {existingConfig ? "Edit telephony configuration" : "Add telephony configuration"}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Connect a telephony provider account. Phone numbers are added after the configuration is created.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {/* 1. Name */}
          <div className="space-y-1.5">
            <Label htmlFor="cfg-name" className="text-sm font-semibold">
              Name
            </Label>
            <Input
              id="cfg-name"
              placeholder="e.g. Twilio US prod"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background text-sm"
            />
          </div>

          {/* 2. Provider Selector */}
          <div className="space-y-1.5">
            <Label htmlFor="cfg-provider" className="text-sm font-semibold">
              Provider
            </Label>
            <Select
              value={provider}
              onValueChange={(val) => setProvider(val as TelephonyProviderType)}
              disabled={Boolean(existingConfig)}
            >
              <SelectTrigger id="cfg-provider" className="bg-background text-sm font-medium">
                <SelectValue placeholder="Select a provider" />
              </SelectTrigger>
              <SelectContent>
                {PROVIDERS.map((p) => (
                  <SelectItem key={p.id} value={p.id} className="text-sm">
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {currentProviderInfo?.docsUrl && (
              <a
                href={currentProviderInfo.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline pt-0.5"
              >
                {currentProviderInfo.name} docs <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>

          {/* 3. Outbound Default Switch */}
          <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/20 p-3">
            <div className="space-y-0.5 pr-4">
              <Label className="text-sm font-medium">Set as default for outbound calls</Label>
              <p className="text-xs text-muted-foreground">
                Used by test calls and campaigns when no specific config is selected. Your organization has no default yet.
              </p>
            </div>
            <Switch checked={isDefaultOutbound} onCheckedChange={setIsDefaultOutbound} />
          </div>

          {/* ── Dynamic Provider Specific Form ────────────────────────── */}

          {/* A. Asterisk ARI */}
          {provider === "ari" && (
            <div className="space-y-3 pt-1 border-t border-border/40">
              <div className="space-y-1">
                <Label htmlFor="ari-endpoint" className="text-sm font-medium">
                  ARI Endpoint
                </Label>
                <Input
                  id="ari-endpoint"
                  placeholder="http://asterisk.example.com:8088"
                  value={ariEndpoint}
                  onChange={(e) => setAriEndpoint(e.target.value)}
                  className="bg-background text-sm"
                />
                <p className="text-xs text-muted-foreground">ARI base URL (e.g., http://asterisk.example.com:8088)</p>
              </div>

              <div className="space-y-1">
                <Label htmlFor="ari-user" className="text-sm font-medium">
                  ARI Username
                </Label>
                <Input
                  id="ari-user"
                  placeholder="asterisk_user"
                  value={ariUsername}
                  onChange={(e) => setAriUsername(e.target.value)}
                  className="bg-background text-sm"
                />
                <p className="text-xs text-muted-foreground">ARI username, matching the section name in ari.conf</p>
              </div>

              <div className="space-y-1">
                <Label htmlFor="ari-pass" className="text-sm font-medium">
                  ARI Password
                </Label>
                <div className="relative">
                  <Input
                    id="ari-pass"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••••••"
                    value={ariPassword}
                    onChange={(e) => setAriPassword(e.target.value)}
                    className="bg-background text-sm pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="ari-ws" className="text-sm font-medium">
                  websocket_client.conf Name
                </Label>
                <Input
                  id="ari-ws"
                  placeholder="default_ws"
                  value={ariWsClientName}
                  onChange={(e) => setAriWsClientName(e.target.value)}
                  className="bg-background text-sm"
                />
                <p className="text-xs text-muted-foreground">websocket_client.conf connection name for externalMedia</p>
              </div>

              <div className="space-y-1">
                <Label htmlFor="ari-dial" className="text-sm font-medium">
                  Dial String Template <span className="text-xs text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="ari-dial"
                  placeholder="PJSIP/{number}"
                  value={ariDialStringTemplate}
                  onChange={(e) => setAriDialStringTemplate(e.target.value)}
                  className="bg-background text-sm font-mono"
                />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  How a dialed number reaches your trunk. {`{number}`} is replaced with the number being called. Use PJSIP/{`{number}`}@my-trunk to dial a trunk directly, or Local/{`{number}`}@from-internal to let your dialplan choose one.
                </p>
              </div>

              <div className="pt-1">
                <Label className="text-xs text-muted-foreground font-semibold">From Extensions</Label>
                <p className="text-xs text-muted-foreground">
                  Phone numbers are managed separately on the configuration page. SIP extensions/numbers for outbound calls.
                </p>
              </div>
            </div>
          )}

          {/* B. Cloudonix */}
          {provider === "cloudonix" && (
            <div className="space-y-3 pt-1 border-t border-border/40">
              <div className="space-y-1">
                <Label htmlFor="c-token" className="text-sm font-medium">
                  Bearer Token
                </Label>
                <div className="relative">
                  <Input
                    id="c-token"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••••••"
                    value={cloudonixBearerToken}
                    onChange={(e) => setCloudonixBearerToken(e.target.value)}
                    className="bg-background text-sm pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Cloudonix API Bearer Token</p>
              </div>

              <div className="space-y-1">
                <Label htmlFor="c-domain" className="text-sm font-medium">
                  Domain Name
                </Label>
                <Input
                  id="c-domain"
                  placeholder="acme.cloudonix.net"
                  value={cloudonixDomainName}
                  onChange={(e) => setCloudonixDomainName(e.target.value)}
                  className="bg-background text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Your Cloudonix domain (for example, acme.cloudonix.net). Dograh fetches and stores its UUID automatically.
                </p>
              </div>

              <div className="space-y-1">
                <Label htmlFor="c-app" className="text-sm font-medium">
                  Application Name <span className="text-xs text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="c-app"
                  placeholder="voice-app"
                  value={cloudonixApplicationName}
                  onChange={(e) => setCloudonixApplicationName(e.target.value)}
                  className="bg-background text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Cloudonix Voice Application name whose url is updated when inbound workflows are attached to numbers on this domain. Leave blank and we will auto-create one for you on save.
                </p>
              </div>

              <div className="pt-1">
                <Label className="text-xs text-muted-foreground font-semibold">Phone Numbers</Label>
                <p className="text-xs text-muted-foreground">
                  Phone numbers are managed separately on the configuration page.
                </p>
              </div>
            </div>
          )}

          {/* C. Exotel (India) */}
          {provider === "exotel" && (
            <div className="space-y-3 pt-1 border-t border-border/40">
              <div className="space-y-1">
                <Label htmlFor="exo-sid" className="text-sm font-medium">
                  Account SID
                </Label>
                <Input
                  id="exo-sid"
                  placeholder="Exotel Account SID"
                  value={exotelAccountSid}
                  onChange={(e) => setExotelAccountSid(e.target.value)}
                  className="bg-background text-sm"
                />
                <p className="text-xs text-muted-foreground">Exotel Account SID used in API paths and inbound matching</p>
              </div>

              <div className="space-y-1">
                <Label htmlFor="exo-key" className="text-sm font-medium">
                  API Key
                </Label>
                <Input
                  id="exo-key"
                  placeholder="API Key"
                  value={exotelApiKey}
                  onChange={(e) => setExotelApiKey(e.target.value)}
                  className="bg-background text-sm"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="exo-token" className="text-sm font-medium">
                  API Token
                </Label>
                <div className="relative">
                  <Input
                    id="exo-token"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••••••"
                    value={exotelApiToken}
                    onChange={(e) => setExotelApiToken(e.target.value)}
                    className="bg-background text-sm pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="exo-url" className="text-sm font-medium">
                  API Base URL <span className="text-xs text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="exo-url"
                  placeholder="https://api.in.exotel.com"
                  value={exotelApiBaseUrl}
                  onChange={(e) => setExotelApiBaseUrl(e.target.value)}
                  className="bg-background text-sm font-mono"
                />
                <p className="text-xs text-muted-foreground">
                  Defaults to https://api.in.exotel.com. Use https://api.exotel.com for non-India accounts.
                </p>
              </div>
            </div>
          )}

          {/* D. Telnyx */}
          {provider === "telnyx" && (
            <div className="space-y-3 pt-1 border-t border-border/40">
              <div className="space-y-1">
                <Label htmlFor="t-key" className="text-sm font-medium">
                  API Key
                </Label>
                <div className="relative">
                  <Input
                    id="t-key"
                    type={showPassword ? "text" : "password"}
                    placeholder="KEY••••••••••••••••"
                    value={telnyxApiKey}
                    onChange={(e) => setTelnyxApiKey(e.target.value)}
                    className="bg-background text-sm pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="t-app" className="text-sm font-medium">
                  Call Control App ID <span className="text-xs text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="t-app"
                  placeholder="connection_id"
                  value={telnyxCallControlAppId}
                  onChange={(e) => setTelnyxCallControlAppId(e.target.value)}
                  className="bg-background text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Telnyx Call Control Application ID (connection_id). Leave blank and we will auto-create one for you on save.
                </p>
              </div>

              <div className="space-y-1">
                <Label htmlFor="t-pubkey" className="text-sm font-medium">
                  Webhook Public Key <span className="text-xs text-muted-foreground">(optional)</span>
                </Label>
                <Textarea
                  id="t-pubkey"
                  rows={2}
                  placeholder="Public key from Mission Control Portal"
                  value={telnyxWebhookPublicKey}
                  onChange={(e) => setTelnyxWebhookPublicKey(e.target.value)}
                  className="bg-background text-xs font-mono"
                />
                <p className="text-xs text-muted-foreground">
                  Public key from Mission Control Portal → Keys & Credentials → Public Key. Used to verify Telnyx webhook signatures. Without it, webhooks from Telnyx will be rejected.
                </p>
              </div>

              <div className="pt-1">
                <Label className="text-xs text-muted-foreground font-semibold">Phone Numbers</Label>
                <p className="text-xs text-muted-foreground">
                  Phone numbers are managed separately on the configuration page. E.164-formatted Telnyx phone numbers.
                </p>
              </div>
            </div>
          )}

          {/* E. Vobiz */}
          {provider === "vobiz" && (
            <div className="space-y-3 pt-1 border-t border-border/40">
              <div className="space-y-1">
                <Label htmlFor="vb-acc" className="text-sm font-medium">
                  Account ID
                </Label>
                <Input
                  id="vb-acc"
                  placeholder="MA_SYQRLN1K"
                  value={vobizAccountId}
                  onChange={(e) => setVobizAccountId(e.target.value)}
                  className="bg-background text-sm"
                />
                <p className="text-xs text-muted-foreground">Vobiz Account ID (e.g., MA_SYQRLN1K)</p>
              </div>

              <div className="space-y-1">
                <Label htmlFor="vb-token" className="text-sm font-medium">
                  Auth Token
                </Label>
                <div className="relative">
                  <Input
                    id="vb-token"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••••••"
                    value={vobizAuthToken}
                    onChange={(e) => setVobizAuthToken(e.target.value)}
                    className="bg-background text-sm pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="vb-app" className="text-sm font-medium">
                  Application ID <span className="text-xs text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="vb-app"
                  placeholder="Application ID"
                  value={vobizApplicationId}
                  onChange={(e) => setVobizApplicationId(e.target.value)}
                  className="bg-background text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Vobiz Application ID whose answer_url is updated when inbound workflows are attached to numbers on this account. Leave blank and we will auto-create one for you on save.
                </p>
              </div>

              <div className="pt-1">
                <Label className="text-xs text-muted-foreground font-semibold">Phone Numbers</Label>
                <p className="text-xs text-muted-foreground">
                  Phone numbers are managed separately on the configuration page. E.164-formatted phone numbers without + prefix.
                </p>
              </div>
            </div>
          )}

          {/* F. Twilio */}
          {provider === "twilio" && (
            <div className="space-y-3 pt-1 border-t border-border/40">
              <div className="space-y-1">
                <Label htmlFor="tw-sid" className="text-sm font-medium">
                  Twilio Account SID
                </Label>
                <Input
                  id="tw-sid"
                  placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  value={twilioAccountSid}
                  onChange={(e) => setTwilioAccountSid(e.target.value)}
                  className="bg-background text-sm font-mono"
                />
                <p className="text-xs text-muted-foreground">Found on your Twilio Console dashboard</p>
              </div>

              <div className="space-y-1">
                <Label htmlFor="tw-token" className="text-sm font-medium">
                  Twilio Auth Token
                </Label>
                <div className="relative">
                  <Input
                    id="tw-token"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••••••"
                    value={twilioAuthToken}
                    onChange={(e) => setTwilioAuthToken(e.target.value)}
                    className="bg-background text-sm pr-10 font-mono"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* G. Plivo */}
          {provider === "plivo" && (
            <div className="space-y-3 pt-1 border-t border-border/40">
              <div className="space-y-1">
                <Label htmlFor="pl-id" className="text-sm font-medium">
                  Plivo Auth ID
                </Label>
                <Input
                  id="pl-id"
                  placeholder="MAMXXXXXXXXXXXXXXXXX"
                  value={plivoAuthId}
                  onChange={(e) => setPlivoAuthId(e.target.value)}
                  className="bg-background text-sm font-mono"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="pl-token" className="text-sm font-medium">
                  Plivo Auth Token
                </Label>
                <div className="relative">
                  <Input
                    id="pl-token"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••••••"
                    value={plivoAuthToken}
                    onChange={(e) => setPlivoAuthToken(e.target.value)}
                    className="bg-background text-sm pr-10 font-mono"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="pl-app" className="text-sm font-medium">
                  Application ID <span className="text-xs text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="pl-app"
                  placeholder="Plivo App ID"
                  value={plivoApplicationId}
                  onChange={(e) => setPlivoApplicationId(e.target.value)}
                  className="bg-background text-sm"
                />
              </div>
            </div>
          )}

          {/* H. Vonage */}
          {provider === "vonage" && (
            <div className="space-y-3 pt-1 border-t border-border/40">
              <div className="space-y-1">
                <Label htmlFor="vn-app" className="text-sm font-medium">
                  Application ID
                </Label>
                <Input
                  id="vn-app"
                  placeholder="Vonage Application ID"
                  value={vonageApplicationId}
                  onChange={(e) => setVonageApplicationId(e.target.value)}
                  className="bg-background text-sm"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="vn-key" className="text-sm font-medium">
                  API Key
                </Label>
                <Input
                  id="vn-key"
                  placeholder="Vonage API Key"
                  value={vonageApiKey}
                  onChange={(e) => setVonageApiKey(e.target.value)}
                  className="bg-background text-sm"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="vn-sec" className="text-sm font-medium">
                  API Secret
                </Label>
                <Input
                  id="vn-sec"
                  type="password"
                  placeholder="••••••••••••••••"
                  value={vonageApiSecret}
                  onChange={(e) => setVonageApiSecret(e.target.value)}
                  className="bg-background text-sm"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="vn-sig" className="text-sm font-medium">
                  Signature Secret
                </Label>
                <Input
                  id="vn-sig"
                  type="password"
                  placeholder="••••••••••••••••"
                  value={vonageSignatureSecret}
                  onChange={(e) => setVonageSignatureSecret(e.target.value)}
                  className="bg-background text-sm"
                />
                <p className="text-xs text-muted-foreground">Used for validating incoming signed webhooks</p>
              </div>

              <div className="space-y-1">
                <Label htmlFor="vn-priv" className="text-sm font-medium">
                  RSA Private Key
                </Label>
                <Textarea
                  id="vn-priv"
                  rows={3}
                  placeholder="-----BEGIN RSA PRIVATE KEY-----"
                  value={vonagePrivateKey}
                  onChange={(e) => setVonagePrivateKey(e.target.value)}
                  className="bg-background text-xs font-mono"
                />
              </div>
            </div>
          )}

          {/* I. Indian Carrier & Custom SIP */}
          {provider === "sip" && (
            <div className="space-y-3 pt-1 border-t border-border/40">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Carrier Preset</Label>
                <Select value={sipPreset} onValueChange={handleSipPresetChange}>
                  <SelectTrigger className="bg-background text-sm">
                    <SelectValue placeholder="Select preset" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(SIP_PRESETS).map(([k, v]) => (
                      <SelectItem key={k} value={k} className="text-sm">
                        {v.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2 space-y-1">
                  <Label htmlFor="sip-host" className="text-sm font-medium">
                    SIP Proxy / Host
                  </Label>
                  <Input
                    id="sip-host"
                    placeholder="sip.tatatelebusiness.com"
                    value={sipProxy}
                    onChange={(e) => setSipProxy(e.target.value)}
                    className="bg-background text-sm font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="sip-port" className="text-sm font-medium">
                    Port
                  </Label>
                  <Input
                    id="sip-port"
                    type="number"
                    value={sipPort}
                    onChange={(e) => setSipPort(Number(e.target.value))}
                    className="bg-background text-sm font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="sip-user" className="text-sm font-medium">
                  SIP Username / Auth ID
                </Label>
                <Input
                  id="sip-user"
                  placeholder="Trunk Username"
                  value={sipUsername}
                  onChange={(e) => setSipUsername(e.target.value)}
                  className="bg-background text-sm"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="sip-pass" className="text-sm font-medium">
                  SIP Password
                </Label>
                <div className="relative">
                  <Input
                    id="sip-pass"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••••••"
                    value={sipPassword}
                    onChange={(e) => setSipPassword(e.target.value)}
                    className="bg-background text-sm pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between rounded border border-border/40 p-2.5 bg-muted/10">
                <div className="space-y-0.5">
                  <Label className="text-xs font-medium">Register with Carrier</Label>
                  <p className="text-[11px] text-muted-foreground">Send SIP REGISTER packets to trunk</p>
                </div>
                <Switch checked={sipRegister} onCheckedChange={setSipRegister} />
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 pt-4 border-t border-border/40 sm:justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={submitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={submitting} className="font-semibold">
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                Saving...
              </>
            ) : existingConfig ? (
              "Save changes"
            ) : (
              "Create"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UnifiedTelephonyDialog;
