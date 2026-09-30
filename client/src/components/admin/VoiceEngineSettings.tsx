
/**
 * Admin Voice Engine Settings
 * Manages API keys, active providers, FreeSWITCH nodes, and SIP trunking templates.
 */

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  Loader2, CheckCircle2, XCircle, Key, Mic, Brain, Volume2, Save, TestTube,
  Eye, EyeOff, Plus, Trash2, Edit, Phone, Server, RefreshCw, Copy, Check,
  Info, Database, HardDrive, Cloud, Sparkles, ShieldCheck, Zap, Activity,
} from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ProviderInfo {
  name: string;
  hasKey: boolean;
  maskedKey: string;
}

interface ProviderSettings {
  stt: {
    activeProvider: string;
    allowedProviders: string[];
    defaultModel: string;
    deepgramModel: string;
    sarvamModel: string;
    deepgramAllowedModels?: string[];
    sarvamAllowedModels?: string[];
    providers: Record<string, ProviderInfo>
  };
  llm: { activeProvider: string; defaultModel: string; allowedModels: string[]; providers: Record<string, ProviderInfo> };
  sts?: {
    activeProvider: string;
    openaiModel: string;
    openaiVoice: string;
    geminiModel: string;
    geminiVoice: string;
    providers: Record<string, ProviderInfo>;
  };
  managedMode?: {
    defaultLlm: string;
    defaultStt: string;
    defaultTts: string;
    defaultTtsVoice: string;
    defaultSts: string;
    allowedModels: string[];
  };
  tts: {
    activeProvider: string;
    allowedProviders: string[];
    defaultModel: string;
    deepgramModel: string;
    sarvamModel: string;
    deepgramAllowedModels?: string[];
    sarvamAllowedModels?: string[];
    elevenlabsModel?: string;
    elevenlabsAllowedModels?: string[];
    navanaModel?: string;
    navanaAllowedModels?: string[];
    cartesiaModel?: string;
    cartesiaAllowedModels?: string[];
    providers: Record<string, ProviderInfo>;
  };
  pluginEnabled: boolean;
  allowUserByok?: boolean;
}

interface SipGateway {
  id: string;
  name: string;
  username: string;
  password?: string;
  proxy: string;
  register: boolean;
  caller_id_in_from: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

function StatusBadge({ hasKey }: { hasKey: boolean }) {
  return hasKey ? (
    <Badge variant="secondary" className="text-emerald-600 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30">
      <CheckCircle2 className="h-3 w-3 mr-1" /> Configured
    </Badge>
  ) : (
    <Badge variant="secondary" className="text-red-500 border-red-400 bg-red-50 dark:bg-red-950/30">
      <XCircle className="h-3 w-3 mr-1" /> Not Set
    </Badge>
  );
}

function NodeStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    online: "text-emerald-600 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30",
    offline: "text-red-500 border-red-400 bg-red-50 dark:bg-red-950/30",
    degraded: "text-amber-600 border-amber-500 bg-amber-50 dark:bg-amber-950/30",
    maintenance: "text-blue-500 border-blue-400 bg-blue-50 dark:bg-blue-950/30",
  };
  return (
    <Badge variant="secondary" className={styles[status] || styles.offline}>
      {status}
    </Badge>
  );
}

function ProviderKeyCard({
  provider, label, currentMasked, hasKey, onSave, onTest, isTesting, testResult,
}: {
  provider: string; label: string; currentMasked: string; hasKey: boolean;
  onSave: (key: string) => void; onTest: (typedKey?: string) => void;
  isTesting: boolean; testResult: { connected: boolean; details: string } | null;
}) {
  const [value, setValue] = useState("");
  const [showKey, setShowKey] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    onSave(value);
    setValue("");
  };

  return (
    <Card className="border border-border/60">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Key className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base">{label}</CardTitle>
          </div>
          <StatusBadge hasKey={hasKey} />
        </div>
        {hasKey && <CardDescription className="text-xs font-mono mt-1">{currentMasked}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <div className="flex flex-1 min-w-[180px] items-center rounded-md border border-input bg-background pr-1 focus-within:ring-1 focus-within:ring-ring">
            <Input
              type={showKey ? "text" : "password"}
              placeholder={hasKey ? "Enter new key to update..." : "Enter API key..."}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="border-0 shadow-none focus-visible:ring-0"
            />
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8 shrink-0"
              onClick={() => setShowKey(!showKey)}>
              {showKey ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            </Button>
          </div>
          <Button size="sm" className="shrink-0" onClick={handleSave} disabled={!value.trim()}>
            <Save className="h-3.5 w-3.5 mr-1" /> Save
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="shrink-0"
            onClick={() => onTest(value.trim() || undefined)}
            disabled={(!hasKey && !value.trim()) || isTesting}
          >
            {isTesting ? <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" /> : <TestTube className="h-3.5 w-3.5 mr-1" />}
            Test Connection
          </Button>
          {testResult && (
            <span className={`text-xs ${testResult.connected ? "text-emerald-600 font-medium" : "text-red-500 font-medium"}`}>
              {testResult.details}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// ── Storage Settings Tab ──────────────────────────────────────────────────────

type StorageProvider = 'local' | 's3' | 'gcs' | 'do_spaces' | 'wasabi';

interface StorageConfig {
  provider: StorageProvider;
  activeProvider: StorageProvider;
  retentionDays: number;
  bucket: string;
  region: string;
  accessKey: string;
  secretKey: string;
  endpoint: string;
  gcsBucket: string;
  gcsProjectId: string;
  gcsCredentials: string;
}

const STORAGE_PROVIDERS: { value: StorageProvider; label: string; icon: React.ReactNode; description: string }[] = [
  { value: 'local', label: 'Local Storage', icon: <HardDrive className="h-5 w-5" />, description: 'Store recordings on the server disk. Simple and free, but not recommended for production.' },
  { value: 's3', label: 'AWS S3', icon: <Cloud className="h-5 w-5" />, description: 'Store recordings in Amazon S3. Highly scalable and durable.' },
  { value: 'gcs', label: 'Google Cloud Storage', icon: <Cloud className="h-5 w-5" />, description: 'Store recordings in Google Cloud Storage (GCS).' },
  { value: 'do_spaces', label: 'DigitalOcean Spaces', icon: <Cloud className="h-5 w-5" />, description: 'S3-compatible object storage from DigitalOcean.' },
  { value: 'wasabi', label: 'Wasabi', icon: <Cloud className="h-5 w-5" />, description: 'Low-cost S3-compatible hot cloud storage.' },
];

function StorageSettingsTab() {
  const { toast } = useToast();
  const [showSecret, setShowSecret] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [activeProvider, setActiveProvider] = useState<StorageProvider>('local');

  const [config, setConfig] = useState<StorageConfig>({
    provider: 'local',
    activeProvider: 'local',
    retentionDays: 30,
    bucket: '',
    region: '',
    accessKey: '',
    secretKey: '',
    endpoint: '',
    gcsBucket: '',
    gcsProjectId: '',
    gcsCredentials: '',
  });

  const { isLoading, data: storageData } = useQuery<{ success: boolean; data: Partial<StorageConfig> }>({
    queryKey: ['/api/voice-engine/admin/storage'],
    staleTime: 30000,
  });

  useEffect(() => {
    if (storageData?.data) {
      setConfig(prev => ({ ...prev, ...storageData.data }));
      if (storageData.data.activeProvider) {
        setActiveProvider(storageData.data.activeProvider);
      }
    }
  }, [storageData]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/voice-engine/admin/storage', config);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to save');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/voice-engine/admin/storage'] });
      toast({ title: 'Storage settings saved', description: 'Recording storage configuration updated successfully.' });
    },
    onError: (err: any) => {
      toast({ title: 'Save failed', description: err.message, variant: 'destructive' });
    },
  });

  const activateMutation = useMutation({
    mutationFn: async (provider: StorageProvider) => {
      const res = await apiRequest('POST', '/api/voice-engine/admin/storage/activate', { provider });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to activate');
      }
      return res.json();
    },
    onSuccess: (_, provider) => {
      setActiveProvider(provider);
      queryClient.invalidateQueries({ queryKey: ['/api/voice-engine/admin/storage'] });
      toast({
        title: 'Storage provider activated',
        description: `${STORAGE_PROVIDERS.find(p => p.value === provider)?.label} is now the active storage provider.`,
      });
    },
    onError: (err: any) => {
      toast({ title: 'Activation failed', description: err.message, variant: 'destructive' });
    },
  });

  const handleTest = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await apiRequest('POST', '/api/voice-engine/admin/storage/test', config);
      const result = await res.json();
      setTestResult({ ok: result.success, message: result.message || (result.success ? 'Connection successful' : 'Connection failed') });
    } catch {
      setTestResult({ ok: false, message: 'Test request failed' });
    } finally {
      setIsTesting(false);
    }
  };

  const set = (field: keyof StorageConfig, value: any) => setConfig(prev => ({ ...prev, [field]: value }));

  const needsS3Fields = ['s3', 'do_spaces', 'wasabi'].includes(config.provider);
  const needsEndpoint = ['do_spaces', 'wasabi'].includes(config.provider);
  const needsGCSFields = config.provider === 'gcs';

  if (isLoading) {
    return <div className="flex items-center justify-center p-12"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Call Recording Storage</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Configure where call recordings are stored. Select a provider, save its credentials, then click <strong>Set Active</strong> to use it.
        </p>
      </div>

      {/* Provider Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {STORAGE_PROVIDERS.map((p) => {
          const isSelected = config.provider === p.value;
          const isActive = activeProvider === p.value;

          return (
            <button
              key={p.value}
              type="button"
              onClick={() => { set('provider', p.value); setTestResult(null); }}
              data-testid={`storage-provider-${p.value}`}
              className={`w-full text-left rounded-xl border-2 p-4 transition-all focus:outline-none ${isActive
                ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-md ring-2 ring-emerald-200 dark:ring-emerald-900'
                : isSelected
                  ? 'border-primary bg-primary/10 shadow-sm ring-2 ring-primary/20'
                  : 'border-border/60 bg-card hover:border-primary/40 hover:bg-muted/30'
                }`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 p-2 rounded-lg ${isActive
                  ? 'bg-emerald-500 text-white'
                  : isSelected
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                  }`}>
                  {p.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm">{p.label}</span>
                    {isActive && (
                      <Badge className="bg-emerald-500 text-white text-[10px] px-1.5 py-0 gap-0.5">
                        <CheckCircle2 className="h-2.5 w-2.5" /> Active
                      </Badge>
                    )}
                    {isSelected && !isActive && (
                      <Badge variant="outline" className="text-primary border-primary/50 text-[10px] px-1.5 py-0">
                        Selected
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{p.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Credential Fields */}
      {config.provider !== 'local' && (
        <Card className="border border-border/70">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">
              {STORAGE_PROVIDERS.find(p => p.value === config.provider)?.label} Configuration
            </CardTitle>
            <CardDescription>
              {needsS3Fields && 'Enter your S3-compatible storage credentials.'}
              {needsGCSFields && 'Enter your Google Cloud Storage credentials.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {needsS3Fields && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="ve-storage-bucket">Bucket Name *</Label>
                    <Input id="ve-storage-bucket" placeholder="my-recordings-bucket" value={config.bucket}
                      onChange={e => set('bucket', e.target.value)} data-testid="input-storage-bucket" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="ve-storage-region">Region *</Label>
                    <Input id="ve-storage-region"
                      placeholder={config.provider === 'do_spaces' ? 'nyc3' : 'us-east-1'}
                      value={config.region} onChange={e => set('region', e.target.value)} data-testid="input-storage-region" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="ve-storage-access-key">Access Key ID *</Label>
                    <Input id="ve-storage-access-key" placeholder="AKIAIOSFODNN7EXAMPLE" value={config.accessKey}
                      onChange={e => set('accessKey', e.target.value)} data-testid="input-storage-access-key" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="ve-storage-secret-key">Secret Access Key *</Label>
                    <div className="relative">
                      <Input id="ve-storage-secret-key" type={showSecret ? 'text' : 'password'}
                        placeholder="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
                        value={config.secretKey} onChange={e => set('secretKey', e.target.value)}
                        className="pr-8" data-testid="input-storage-secret-key" />
                      <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full w-8"
                        onClick={() => setShowSecret(v => !v)}>
                        {showSecret ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      </Button>
                    </div>
                  </div>
                </div>
                {needsEndpoint && (
                  <div className="space-y-1.5">
                    <Label htmlFor="ve-storage-endpoint">
                      Custom Endpoint URL *
                      <span className="text-muted-foreground font-normal ml-1 text-xs">
                        ({config.provider === 'do_spaces' ? 'e.g. https://nyc3.digitaloceanspaces.com' : 'e.g. https://s3.wasabisys.com'})
                      </span>
                    </Label>
                    <Input id="ve-storage-endpoint"
                      placeholder={config.provider === 'do_spaces' ? 'https://nyc3.digitaloceanspaces.com' : 'https://s3.wasabisys.com'}
                      value={config.endpoint} onChange={e => set('endpoint', e.target.value)} data-testid="input-storage-endpoint" />
                  </div>
                )}
              </>
            )}

            {needsGCSFields && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="ve-gcs-bucket">Bucket Name *</Label>
                    <Input id="ve-gcs-bucket" placeholder="my-recordings-bucket" value={config.gcsBucket}
                      onChange={e => set('gcsBucket', e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="ve-gcs-project">Project ID *</Label>
                    <Input id="ve-gcs-project" placeholder="my-gcp-project-123" value={config.gcsProjectId}
                      onChange={e => set('gcsProjectId', e.target.value)} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="ve-gcs-creds">Service Account JSON *</Label>
                  <textarea
                    id="ve-gcs-creds"
                    className="w-full min-h-[140px] rounded-md border border-input bg-background px-3 py-2 text-xs font-mono shadow-sm focus:outline-none focus:ring-1 focus:ring-ring resize-y"
                    placeholder={'{\n  "type": "service_account",\n  "project_id": "...",\n  "private_key": "...",\n  "client_email": "..."\n}'}
                    value={config.gcsCredentials}
                    onChange={e => set('gcsCredentials', e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Paste the full service account JSON from Google Cloud Console.</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Retention + Actions */}
      <Card className="border border-border/70">
        <CardContent className="pt-5 space-y-4">
          <div className="flex flex-wrap items-end gap-6">
            <div className="space-y-1.5">
              <Label htmlFor="ve-retention">Retention Period (days)</Label>
              <div className="flex items-center gap-2">
                <Input id="ve-retention" type="number" min={0} max={3650} className="w-28"
                  value={config.retentionDays}
                  onChange={e => set('retentionDays', parseInt(e.target.value) || 0)}
                  data-testid="input-storage-retention" />
                <span className="text-sm text-muted-foreground">days <span className="text-xs">(0 = keep forever)</span></span>
              </div>
            </div>

            <div className="flex items-center gap-3 ml-auto flex-wrap">
              {/* Test Result */}
              {testResult && (
                <div className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border ${testResult.ok
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-400'
                  : 'bg-red-50 border-red-200 text-red-700 dark:bg-red-950/30 dark:border-red-800 dark:text-red-400'
                  }`}>
                  {testResult.ok ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  {testResult.message}
                </div>
              )}

              {/* Test Connection - only for non-local */}
              {config.provider !== 'local' && (
                <Button variant="outline" onClick={handleTest} disabled={isTesting} data-testid="button-test-storage">
                  {isTesting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <TestTube className="h-4 w-4 mr-2" />}
                  Test Connection
                </Button>
              )}

              {/* Save Settings */}
              <Button
                variant="outline"
                onClick={() => saveMutation.mutate()}
                disabled={saveMutation.isPending}
                data-testid="button-save-storage"
              >
                {saveMutation.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                Save Settings
              </Button>

              {/* Set Active */}
              <Button
                onClick={() => activateMutation.mutate(config.provider)}
                disabled={activateMutation.isPending || activeProvider === config.provider}
                className="bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-60"
                data-testid="button-activate-storage"
              >
                {activateMutation.isPending
                  ? <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  : <CheckCircle2 className="h-4 w-4 mr-2" />
                }
                {activeProvider === config.provider ? 'Already Active' : 'Set Active'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function VoiceEngineSettings() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("speech");
  const [testResults, setTestResults] = useState<Record<string, { connected: boolean; details: string }>>({});
  const [testingProvider, setTestingProvider] = useState<string | null>(null);
  const [orSearch, setOrSearch] = useState("");
  const [selectedSipProvider, setSelectedSipProvider] = useState("twilio");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // SIP Gateways state
  const [isGatewayDialogOpen, setIsGatewayDialogOpen] = useState(false);
  const [editingGateway, setEditingGateway] = useState<SipGateway | null>(null);
  const [gwName, setGwName] = useState("");
  const [gwUsername, setGwUsername] = useState("");
  const [gwPassword, setGwPassword] = useState("");
  const [gwProxy, setGwProxy] = useState("");
  const [gwRegister, setGwRegister] = useState(false);
  const [gwCallerIdInFrom, setGwCallerIdInFrom] = useState(true);

  const { data: keysData, isLoading: isKeysLoading } = useQuery<{ success: boolean; data: ProviderSettings }>({
    queryKey: ["/api/voice-engine/admin/provider-keys"],
    staleTime: 30000,
  });

  const { data: gatewaysData, isLoading: isGatewaysLoading, refetch: refetchGateways } = useQuery<{ success: boolean; data: SipGateway[] }>({
    queryKey: ["/api/voice-engine/admin/settings/sip-gateways"],
    staleTime: 30000,
  });

  const gateways = gatewaysData?.data || [];

  const saveGatewayMutation = useMutation({
    mutationFn: async (payload: any) => {
      if (editingGateway) {
        const res = await apiRequest("PUT", `/api/voice-engine/admin/settings/sip-gateways/${editingGateway.id}`, payload);
        return res.json();
      } else {
        const res = await apiRequest("POST", "/api/voice-engine/admin/settings/sip-gateways", payload);
        return res.json();
      }
    },
    onSuccess: () => {
      refetchGateways();
      setIsGatewayDialogOpen(false);
      resetGatewayForm();
      toast({
        title: editingGateway ? "Gateway Updated" : "Gateway Added",
        description: `SIP Gateway has been successfully ${editingGateway ? "updated" : "added"}.`,
      });
    },
    onError: (err: any) => {
      toast({ title: "Error Saving Gateway", description: err.message, variant: "destructive" });
    },
  });

  const deleteGatewayMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("DELETE", `/api/voice-engine/admin/settings/sip-gateways/${id}`);
      return res.json();
    },
    onSuccess: () => {
      refetchGateways();
      toast({ title: "Gateway Deleted", description: "SIP Gateway deleted successfully." });
    },
    onError: (err: any) => {
      toast({ title: "Error Deleting Gateway", description: err.message, variant: "destructive" });
    },
  });

  const activateGatewayMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("POST", `/api/voice-engine/admin/settings/sip-gateways/${id}/activate`);
      return res.json();
    },
    onSuccess: () => {
      refetchGateways();
      toast({ title: "Gateway Activated", description: "Selected SIP Gateway is now active." });
    },
    onError: (err: any) => {
      toast({ title: "Error Activating Gateway", description: err.message, variant: "destructive" });
    },
  });

  const resetGatewayForm = () => {
    setEditingGateway(null);
    setGwName("");
    setGwUsername("");
    setGwPassword("");
    setGwProxy("");
    setGwRegister(false);
    setGwCallerIdInFrom(true);
  };

  const handleOpenAddGatewayDialog = () => {
    resetGatewayForm();
    setIsGatewayDialogOpen(true);
  };

  const handleOpenEditGatewayDialog = (gw: SipGateway) => {
    setEditingGateway(gw);
    setGwName(gw.name);
    setGwUsername(gw.username);
    setGwPassword(gw.password || "");
    setGwProxy(gw.proxy);
    setGwRegister(gw.register);
    setGwCallerIdInFrom(gw.caller_id_in_from);
    setIsGatewayDialogOpen(true);
  };

  const handleSaveGateway = () => {
    if (!gwName.trim() || !gwUsername.trim() || !gwPassword.trim() || !gwProxy.trim()) {
      toast({ title: "Validation Error", description: "Name, Username, Password, and Proxy are required.", variant: "destructive" });
      return;
    }
    saveGatewayMutation.mutate({
      name: gwName,
      username: gwUsername,
      password: gwPassword,
      proxy: gwProxy,
      register: gwRegister,
      callerIdInFrom: gwCallerIdInFrom,
    });
  };

  const { data: orModelsData, isLoading: isOrModelsLoading } = useQuery<{
    success: boolean;
    data: { id: string; name: string; context_length: number }[];
  }>({
    queryKey: ["/api/voice-engine/admin/provider-keys/openrouter-models"],
    staleTime: 5 * 60 * 1000,
    enabled: !!keysData?.data,
  });

  const settings = keysData?.data;
  const orModels = orModelsData?.data ?? [];

  const updateMutation = useMutation({
    mutationFn: async (body: Record<string, any>) => {
      const res = await apiRequest("PUT", "/api/voice-engine/admin/provider-keys", body);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/voice-engine/admin/provider-keys"] });
      queryClient.invalidateQueries({ queryKey: ["/api/settings/voice-engine"] });
      queryClient.invalidateQueries({ queryKey: ["/api/user/provider-credentials"] });
      toast({ title: "Settings saved", description: "Provider settings updated successfully." });
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const testProvider = async (provider: string, apiKey?: string) => {
    setTestingProvider(provider);
    try {
      const res = await apiRequest("POST", `/api/voice-engine/admin/provider-keys/test/${provider}`, apiKey ? { apiKey } : undefined);
      const result = await res.json();
      setTestResults((prev) => ({ ...prev, [provider]: result.data }));
    } catch {
      setTestResults((prev) => ({ ...prev, [provider]: { connected: false, details: "Test failed" } }));
    } finally {
      setTestingProvider(null);
    }
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  if (isKeysLoading || isGatewaysLoading) {
    return <div className="flex items-center justify-center p-12"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;
  }

  if (!settings) {
    return <div className="text-center p-8 text-muted-foreground">Failed to load voice engine settings. Make sure the plugin migration has been applied.</div>;
  }

  const sipTemplates: Record<string, { title: string; guide: string; configSnippet: string; snippetType: string }> = {
    twilio: {
      title: "Twilio Bi-directional Media Streams",
      guide: "1. Log in to Twilio Console and open Phone Numbers > Active Numbers.\n2. In Voice Configuration, select 'A call comes in' -> Webhook.\n3. Return the TwiML below to connect the live call directly to our AgentLabs Audio Server.\n4. Zero server setup or PBX required; audio frames stream directly over WebSockets.",
      snippetType: "xml",
      configSnippet: `<?xml version="1.0" encoding="UTF-8"?>\n<Response>\n  <Connect>\n    <Stream url="wss://your-domain.com/api/voice-engine/ws/carrier/twilio" />\n  </Connect>\n</Response>`
    },
    plivo: {
      title: "Plivo AudioStream (Bidirectional)",
      guide: "1. Log in to Plivo Console and navigate to Voice > Applications > XML Application.\n2. Add an XML endpoint returning the AudioStream XML shown below.\n3. Assign your Plivo DID phone numbers to this application.\n4. Live stereo/mono audio will stream directly into the pipeline with sub-15ms frame dispatch.",
      snippetType: "xml",
      configSnippet: `<Response>\n  <Stream bidirectional="true" streamUrl="wss://your-domain.com/api/voice-engine/ws/carrier/plivo" audioTrack="both"/>\n</Response>`
    },
    telnyx: {
      title: "Telnyx TeXML Media Streams",
      guide: "1. In Telnyx Mission Control Portal, go to Voice > TeXML Applications.\n2. Create an application pointing to your webhook returning the TeXML block below.\n3. Assign your Telnyx phone numbers to this TeXML application.\n4. Bi-directional raw audio flows directly via low-latency secure WebSockets.",
      snippetType: "xml",
      configSnippet: `<?xml version="1.0" encoding="UTF-8"?>\n<Response>\n  <Connect>\n    <Stream url="wss://your-domain.com/api/voice-engine/ws/carrier/telnyx" bidirectionalMode="rtp" />\n  </Connect>\n</Response>`
    },
    exotel: {
      title: "Exotel Voicebot Bidirectional Streaming",
      guide: "1. Open Exotel App Bazaar and configure a Voicebot Flow for incoming calls.\n2. Set the Stream URL to the WebSocket endpoint below with PCM 16kHz audio format.\n3. Incoming customer calls will immediately engage the AI agent with zero intermediary telephony servers.",
      snippetType: "json",
      configSnippet: `{\n  "stream_url": "wss://your-domain.com/api/voice-engine/ws/carrier/exotel",\n  "format": "audio/l16;rate=16000",\n  "bidirectional": true\n}`
    },
    vonage: {
      title: "Vonage NCCO WebSocket Audio",
      guide: "1. In Vonage API Dashboard, configure your Voice Application answer_url.\n2. Return the NCCO (Call Control Object) payload below.\n3. Assign your virtual phone numbers to the Voice Application.",
      snippetType: "json",
      configSnippet: `[\n  {\n    "action": "connect",\n    "endpoint": [{\n      "type": "websocket",\n      "uri": "wss://your-domain.com/api/voice-engine/ws/carrier/vonage",\n      "content-type": "audio/l16;rate=16000"\n    }]\n  }\n]`
    },
    cloudonix: {
      title: "Cloudonix Direct SIP Trunking",
      guide: "1. In Cloudonix Console, add your SIP Trunk domain pointing to your AgentLabs cluster.\n2. Configure your region and whitelist our platform outbound origin IPs.\n3. Add an Outbound SIP Gateway in the card below to authenticate outbound calls.",
      snippetType: "text",
      configSnippet: `Domain: sip.your-domain.com:5060 (UDP/TCP), 5061 (TLS)\nOutbound Origin IP: Whitelist your platform cluster egress IPs\nAudio Codec: PCMU (G.711u), PCMA (G.711a), Opus 16kHz`
    },
    asterisk: {
      title: "Asterisk ARI (External PBX chan_websocket)",
      guide: "1. For customers with existing Asterisk PBX setups, use ARI or AudioSocket.\n2. Add the dialplan extension snippet below to bridge callers directly into the AI Voice Engine.\n3. Asterisk acts solely as an external carrier client, connecting to our WebSocket streaming endpoint.",
      snippetType: "text",
      configSnippet: `[agentlabs-ai-bridge]\nexten => _X.,1,NoOp(Bridge Inbound Call to AgentLabs AI Engine)\n same => n,Answer()\n same => n,AudioSocket(wss://your-domain.com/voice-engine/ws/audio/\${UNIQUEID})\n same => n,Hangup()`
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Cloud Voice Engine</h2>
        <p className="text-muted-foreground">Configure AI model intelligence, low-latency speech synthesis, and direct cloud telephony streaming (Zero PBX).</p>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {[
          { label: "STT", icon: Mic, provider: settings.stt.activeProvider, providers: settings.stt.providers, color: "blue" },
          { label: "LLM", icon: Brain, provider: settings.llm.activeProvider, providers: settings.llm.providers, color: "purple" },
          { label: "TTS", icon: Volume2, provider: settings.tts.activeProvider, providers: settings.tts.providers, color: "orange" },
        ].map(({ label, icon: Icon, provider, providers, color }) => {
          const active = providers[provider];
          return (
            <Card key={label} className={`border-${color}-200 dark:border-${color}-800/50`}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-${color}-100 dark:bg-${color}-950/40`}>
                  <Icon className={`h-5 w-5 text-${color}-600 dark:text-${color}-400`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs text-muted-foreground capitalize">{active?.name || provider}</p>
                </div>
                <StatusBadge hasKey={active?.hasKey ?? false} />
              </CardContent>
            </Card>
          );
        })}
        <Card className="border-emerald-200 dark:border-emerald-800/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/40">
              <Server className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">Cloud Engine</p>
              <p className="text-xs text-muted-foreground">Pipecat Streaming • Zero PBX</p>
            </div>
            <Badge variant="outline" className="border-emerald-500 text-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/30">Active</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1 mb-4 h-auto p-1 bg-muted/60">
          <TabsTrigger value="speech" className="py-2.5"><Mic className="h-4 w-4 mr-2" />Speech (STT/TTS)</TabsTrigger>
          <TabsTrigger value="llm" className="py-2.5"><Brain className="h-4 w-4 mr-2" />LLM</TabsTrigger>
          <TabsTrigger value="sts" className="py-2.5"><Activity className="h-4 w-4 mr-2" />Speech-to-Speech (STS)</TabsTrigger>
          <TabsTrigger value="master-ai" className="py-2.5"><Sparkles className="h-4 w-4 mr-2" />Managed Defaults & BYOK</TabsTrigger>
          <TabsTrigger value="telephony" className="py-2.5"><Phone className="h-4 w-4 mr-2" />Telephony & SIP</TabsTrigger>
          <TabsTrigger value="storage" className="py-2.5"><Database className="h-4 w-4 mr-2" />Storage</TabsTrigger>
        </TabsList>

        {/* Speech Tab */}
        <TabsContent value="speech" className="space-y-6 mt-4">
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base">Provider API Keys</CardTitle>
              <CardDescription className="text-xs">Shared between STT and TTS</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProviderKeyCard provider="deepgram" label="Deepgram API Key"
                  hasKey={settings.stt.providers.deepgram?.hasKey ?? false}
                  currentMasked={settings.stt.providers.deepgram?.maskedKey ?? ""}
                  onSave={(key) => updateMutation.mutate({ deepgramApiKey: key })}
                  onTest={(key) => testProvider("deepgram", key)}
                  isTesting={testingProvider === "deepgram"}
                  testResult={testResults.deepgram ?? null} />
                <ProviderKeyCard provider="sarvam" label="Sarvam AI API Key"
                  hasKey={settings.stt.providers.sarvam?.hasKey ?? false}
                  currentMasked={settings.stt.providers.sarvam?.maskedKey ?? ""}
                  onSave={(key) => updateMutation.mutate({ sarvamApiKey: key })}
                  onTest={(key) => testProvider("sarvam", key)}
                  isTesting={testingProvider === "sarvam"}
                  testResult={testResults.sarvam ?? null} />
                <ProviderKeyCard provider="navana" label="Navana AI (Bodhi Indic TTS)"
                  hasKey={settings.tts.providers?.navana?.hasKey ?? false}
                  currentMasked={settings.tts.providers?.navana?.maskedKey ?? ""}
                  onSave={(key) => updateMutation.mutate({ navanaApiKey: key })}
                  onTest={(key) => testProvider("navana", key)}
                  isTesting={testingProvider === "navana"}
                  testResult={testResults.navana ?? null} />
                <ProviderKeyCard provider="cartesia" label="Cartesia Sonic (90ms TTS)"
                  hasKey={settings.tts.providers?.cartesia?.hasKey ?? false}
                  currentMasked={settings.tts.providers?.cartesia?.maskedKey ?? ""}
                  onSave={(key) => updateMutation.mutate({ cartesiaApiKey: key })}
                  onTest={(key) => testProvider("cartesia", key)}
                  isTesting={testingProvider === "cartesia"}
                  testResult={testResults.cartesia ?? null} />
                <ProviderKeyCard provider="elevenlabs" label="ElevenLabs API Key"
                  hasKey={settings.tts.providers?.elevenlabs?.hasKey ?? false}
                  currentMasked={settings.tts.providers?.elevenlabs?.maskedKey ?? ""}
                  onSave={(key) => updateMutation.mutate({ elevenlabsApiKey: key })}
                  onTest={(key) => testProvider("elevenlabs", key)}
                  isTesting={testingProvider === "elevenlabs"}
                  testResult={testResults.elevenlabs ?? null} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Mic className="h-5 w-5 text-indigo-500" />
                <CardTitle className="text-base">Speech-to-Text (STT)</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Allowed STT Providers</Label>
                  <p className="text-xs text-muted-foreground -mt-2">Select which providers are available for speech-to-text.</p>
                  <div className="grid grid-cols-2 gap-4">
                    {['deepgram', 'sarvam'].map(provider => {
                      const sttAllowed = settings.stt.allowedProviders || ['deepgram'];
                      const isChecked = sttAllowed.includes(provider);
                      return (
                        <div
                          key={provider}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${isChecked
                            ? "border-indigo-500 bg-indigo-500/10 dark:bg-indigo-500/20"
                            : "border-border hover:border-indigo-400/50 hover:bg-indigo-500/5"
                            }`}
                          onClick={() => {
                            
                            let newAllowed = [...sttAllowed];
                            if (isChecked) {
                              if (newAllowed.length <= 1) return; // Need at least 1
                              newAllowed = newAllowed.filter(p => p !== provider);
                            } else {
                              newAllowed.push(provider);
                            }
                            updateMutation.mutate({
                              sttAllowedProviders: newAllowed,
                              ...(!newAllowed.includes(settings.stt.activeProvider) && { sttActiveProvider: newAllowed[0] })
                            });
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="font-semibold">{provider === 'deepgram' ? 'Deepgram' : 'Sarvam AI'}</div>
                            </div>
                            {isChecked && <Check className="h-4 w-4 text-indigo-600" />}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {provider === 'deepgram' ? 'Fast, accurate STT models' : 'Specialized Indic language models'}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Default Models for each allowed provider */}
                  {(settings.stt.allowedProviders || ['deepgram']).map(provider => {
                    const isDeepgram = provider === 'deepgram';
                    const models = isDeepgram
                      ? [
                        { value: 'nova-2', label: 'Deepgram Nova-2 (General)' },
                        { value: 'nova-2-phonecall', label: 'Deepgram Nova-2 (Phone)' },
                        { value: 'nova-2-medical', label: 'Deepgram Nova-2 (Medical)' },
                        { value: 'nova-3', label: 'Deepgram Nova-3' },
                        { value: 'base', label: 'Deepgram Base' },
                        // { value: 'enhanced', label: 'Deepgram Enhanced' }
                      ]
                      : [
                        { value: 'saaras:v3', label: 'Saaras V3' },
                        { value: 'saarika:v2.5', label: 'Saarika V2.5' },
                        // { value: 'saaras:v3-realtime', label: 'Saaras V3 Realtime' },
                        // { value: 'saarika:v2', label: 'Saarika V2' },
                        // { value: 'saarika:v1', label: 'Saarika V1' },
                        // { value: 'saarika:flash', label: 'Saarika Flash' }
                      ];

                    const allowedModels = isDeepgram ? (settings.stt.deepgramAllowedModels || ['nova-2', 'nova-2-phonecall']) : (settings.stt.sarvamAllowedModels || ['saaras:v3']);

                    return (
                      <div key={`stt-model-${provider}`} className="space-y-4 border rounded-md p-4 bg-muted/20">
                        <div className="space-y-2">
                          <Label>Default Model ({isDeepgram ? 'Deepgram' : 'Sarvam'})</Label>
                          <Select
                            value={isDeepgram ? (settings.stt.deepgramModel || "") : (settings.stt.sarvamModel || "")}
                            onValueChange={(v) => updateMutation.mutate(isDeepgram ? { sttDeepgramModel: v } : { sttSarvamModel: v })}>
                            <SelectTrigger className="w-full"><SelectValue placeholder="Select a model" /></SelectTrigger>
                            <SelectContent>
                              {models.map(m => (
                                <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-4 pt-4 border-t">
                          <div>
                            <Label className="text-sm font-semibold">Allowed Models for Agents</Label>
                            <p className="text-xs text-muted-foreground mb-3">Select which models are available to users</p>
                            <div className="flex flex-wrap gap-2">
                              {models.map(m => {
                                const isAllowed = allowedModels.includes(m.value);
                                return (
                                  <Badge
                                    key={m.value}
                                    variant={isAllowed ? "default" : "outline"}
                                    className={`cursor-pointer px-3 py-1.5 transition-all ${isAllowed ? 'bg-indigo-600 hover:bg-indigo-700' : 'text-muted-foreground hover:text-foreground'}`}
                                    onClick={() => {
                                      let newAllowed = [...allowedModels];
                                      if (isAllowed) {
                                        if (newAllowed.length <= 1) return; // need at least 1
                                        newAllowed = newAllowed.filter(x => x !== m.value);
                                      } else {
                                        newAllowed.push(m.value);
                                      }
                                      updateMutation.mutate(
                                        isDeepgram
                                          ? { sttDeepgramAllowedModels: newAllowed }
                                          : { sttSarvamAllowedModels: newAllowed }
                                      );
                                    }}
                                  >
                                    {isAllowed && <Check className="h-3 w-3 mr-1.5 inline-block" />}
                                    {m.label}
                                  </Badge>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Volume2 className="h-5 w-5 text-indigo-500" />
                <CardTitle className="text-base">Text-to-Speech (TTS)</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Allowed TTS Providers</Label>
                  <p className="text-xs text-muted-foreground -mt-2">Select which providers are available for text-to-speech.</p>
                  <div className="grid grid-cols-2 gap-4">
                    {['deepgram', 'sarvam', 'navana', 'cartesia', 'elevenlabs'].map(provider => {
                      const ttsAllowed = settings.tts.allowedProviders || ['deepgram'];
                      const isChecked = ttsAllowed.includes(provider);
                      const getDisplayName = (p: string) => {
                        if (p === 'deepgram') return 'Deepgram Aura';
                        if (p === 'sarvam') return 'Sarvam AI Bulbul';
                        if (p === 'navana') return 'Navana AI (Bodhi Indic)';
                        if (p === 'cartesia') return 'Cartesia Sonic (90ms)';
                        return 'ElevenLabs';
                      };
                      const getDescription = (p: string) => {
                        if (p === 'deepgram') return 'High quality, low latency voices';
                        if (p === 'sarvam') return 'Expressive Indic regional voices';
                        if (p === 'navana') return 'Real-time Indic vernacular speech (<100ms)';
                        if (p === 'cartesia') return 'Ultra-low latency conversational streaming';
                        return 'Ultra-realistic conversational voices';
                      };
                      return (
                        <div
                          key={provider}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${isChecked
                            ? "border-indigo-500 bg-indigo-500/10 dark:bg-indigo-500/20"
                            : "border-border hover:border-indigo-400/50 hover:bg-indigo-500/5"
                            }`}
                          onClick={() => {
                            let newAllowed = [...ttsAllowed];
                            if (isChecked) {
                              if (newAllowed.length <= 1) return; // Need at least 1
                              newAllowed = newAllowed.filter(p => p !== provider);
                            } else {
                              newAllowed.push(provider);
                            }
                            updateMutation.mutate({
                              ttsAllowedProviders: newAllowed,
                              ...(!newAllowed.includes(settings.tts.activeProvider) && { ttsActiveProvider: newAllowed[0] })
                            });
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="font-semibold">{getDisplayName(provider)}</div>
                            </div>
                            {isChecked && <Check className="h-4 w-4 text-indigo-600" />}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {getDescription(provider)}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Default Models for each allowed provider */}
                  {(settings.tts.allowedProviders || ['deepgram']).map(provider => {
                    const isDeepgram = provider === 'deepgram';

                    const getModelValue = (val: string) => {
                      if (provider === 'deepgram') {
                        if (!val) return "aura-2";
                        if (val.startsWith("aura-2")) return "aura-2";
                        if (val.startsWith("aura")) return "aura";
                        return val;
                      }
                      if (provider === 'sarvam') return val || "bulbul:v3";
                      if (provider === 'navana') return val || "bodhi-indic-tts-v1";
                      if (provider === 'cartesia') return val || "sonic-english";
                      return val || "eleven_turbo_v2_5";
                    };

                    const currentModelValue = provider === 'deepgram'
                      ? getModelValue(settings.tts.deepgramModel || "")
                      : provider === 'sarvam'
                      ? (settings.tts.sarvamModel || "bulbul:v3")
                      : provider === 'navana'
                      ? (settings.tts.navanaModel || "bodhi-indic-tts-v1")
                      : provider === 'cartesia'
                      ? (settings.tts.cartesiaModel || "sonic-english")
                      : (settings.tts.elevenlabsModel || "eleven_turbo_v2_5");

                    const providerLabel = provider === 'deepgram'
                      ? 'Deepgram'
                      : provider === 'sarvam'
                      ? 'Sarvam AI'
                      : provider === 'navana'
                      ? 'Navana AI'
                      : provider === 'cartesia'
                      ? 'Cartesia Sonic'
                      : 'ElevenLabs';

                    return (
                      <div key={`tts-model-${provider}`} className="space-y-4 border rounded-md p-4 bg-muted/20">
                        <div className="space-y-2">
                          <Label>Default Voice Model ({providerLabel})</Label>
                          <Select
                            value={currentModelValue}
                            onValueChange={(v) => updateMutation.mutate(
                              provider === 'deepgram' ? { ttsDeepgramModel: v } :
                              provider === 'sarvam' ? { ttsSarvamModel: v } :
                              provider === 'navana' ? { ttsNavanaModel: v } :
                              provider === 'cartesia' ? { ttsCartesiaModel: v } :
                              { ttsElevenlabsModel: v }
                            )}>
                            <SelectTrigger className="w-full"><SelectValue placeholder="Select a voice model" /></SelectTrigger>
                            <SelectContent>
                              {provider === 'deepgram' ? (
                                <>
                                  <SelectItem value="aura-2">Deepgram Aura 2</SelectItem>
                                  <SelectItem value="aura">Deepgram Aura</SelectItem>
                                </>
                              ) : provider === 'sarvam' ? (
                                <>
                                  <SelectItem value="bulbul:v3">Sarvam Bulbul V3</SelectItem>
                                  <SelectItem value="bulbul:v2">Sarvam Bulbul V2</SelectItem>
                                </>
                              ) : provider === 'navana' ? (
                                <>
                                  <SelectItem value="bodhi-indic-tts-v1">Bodhi Indic TTS v1 (10 Languages)</SelectItem>
                                </>
                              ) : provider === 'cartesia' ? (
                                <>
                                  <SelectItem value="sonic-english">Sonic English (90ms Latency)</SelectItem>
                                  <SelectItem value="sonic-multilingual">Sonic Multilingual</SelectItem>
                                </>
                              ) : (
                                <>
                                  <SelectItem value="eleven_turbo_v2_5">Eleven Turbo v2.5</SelectItem>
                                  <SelectItem value="eleven_turbo_v2">Eleven Turbo v2</SelectItem>
                                  <SelectItem value="eleven_multilingual_v2">Eleven Multilingual v2</SelectItem>
                                </>
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                        {/* 
                        <div className="space-y-4 pt-4 border-t">
                          <div>
                            <Label className="text-sm font-semibold">Allowed Models for Agents</Label>
                            <p className="text-xs text-muted-foreground mb-3">Select which models are available to users</p>
                            <div className="flex flex-wrap gap-2">
                              {(provider === 'deepgram' ? (
                                [
                                  { value: 'aura-2', label: 'Deepgram Aura 2' },
                                  { value: 'aura', label: 'Deepgram Aura' }
                                ]
                              ) : provider === 'sarvam' ? (
                                [
                                  { value: 'bulbul:v3', label: 'Sarvam Bulbul V3' },
                                  { value: 'bulbul:v2', label: 'Sarvam Bulbul V2' }
                                ]
                              ) : (
                                [
                                  { value: 'eleven_turbo_v2_5', label: 'Eleven Turbo v2.5' },
                                  { value: 'eleven_turbo_v2', label: 'Eleven Turbo v2' },
                                  { value: 'eleven_multilingual_v2', label: 'Eleven Multilingual v2' }
                                ]
                              )).map(m => {
                                const isAllowed = allowedModels.includes(m.value);
                                return (
                                  <Badge
                                    key={m.value}
                                    variant={isAllowed ? "default" : "outline"}
                                    className={`cursor-pointer px-3 py-1.5 transition-all ${isAllowed ? 'bg-indigo-600 hover:bg-indigo-700' : 'text-muted-foreground hover:text-foreground'}`}
                                    onClick={() => {
                                      
                                      let newAllowed = [...allowedModels];
                                      if (isAllowed) {
                                        if (newAllowed.length <= 1) return; // need at least 1
                                        newAllowed = newAllowed.filter(x => x !== m.value);
                                      } else {
                                        newAllowed.push(m.value);
                                      }
                                      updateMutation.mutate(
                                        provider === 'deepgram'
                                          ? { ttsDeepgramAllowedModels: newAllowed }
                                          : provider === 'sarvam'
                                          ? { ttsSarvamAllowedModels: newAllowed }
                                          : { ttsElevenlabsAllowedModels: newAllowed }
                                      );
                                    }}
                                  >
                                    {isAllowed && <Check className="h-3 w-3 mr-1.5 inline-block" />}
                                    {m.label}
                                  </Badge>
                                );
                              })}
                            </div>
                          </div>
                        </div> */}
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>


        </TabsContent>

        {/* LLM Tab */}
        <TabsContent value="llm" className="space-y-6 mt-4">
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base">Provider API Keys</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProviderKeyCard provider="gemini" label="Google Gemini API Key"
                  hasKey={settings.llm.providers?.gemini?.hasKey ?? false}
                  currentMasked={settings.llm.providers?.gemini?.maskedKey ?? ""}
                  onSave={(key) => updateMutation.mutate({ geminiApiKey: key })}
                  onTest={(key) => testProvider("gemini", key)}
                  isTesting={testingProvider === "gemini"}
                  testResult={testResults.gemini ?? null} />
                <ProviderKeyCard provider="groq" label="Groq API Key"
                  hasKey={settings.llm.providers?.groq?.hasKey ?? false}
                  currentMasked={settings.llm.providers?.groq?.maskedKey ?? ""}
                  onSave={(key) => updateMutation.mutate({ groqApiKey: key })}
                  onTest={(key) => testProvider("groq", key)}
                  isTesting={testingProvider === "groq"}
                  testResult={testResults.groq ?? null} />
                <ProviderKeyCard provider="openai" label="OpenAI API Key"
                  hasKey={settings.llm.providers?.openai?.hasKey ?? false}
                  currentMasked={settings.llm.providers?.openai?.maskedKey ?? ""}
                  onSave={(key) => updateMutation.mutate({ openaiApiKey: key })}
                  onTest={(key) => testProvider("openai", key)}
                  isTesting={testingProvider === "openai"}
                  testResult={testResults.openai ?? null} />
                <ProviderKeyCard provider="deepseek" label="DeepSeek API Key"
                  hasKey={settings.llm.providers?.deepseek?.hasKey ?? false}
                  currentMasked={settings.llm.providers?.deepseek?.maskedKey ?? ""}
                  onSave={(key) => updateMutation.mutate({ deepseekApiKey: key })}
                  onTest={(key) => testProvider("deepseek", key)}
                  isTesting={testingProvider === "deepseek"}
                  testResult={testResults.deepseek ?? null} />
                <ProviderKeyCard provider="anthropic" label="Anthropic Claude API Key"
                  hasKey={settings.llm.providers?.anthropic?.hasKey ?? false}
                  currentMasked={settings.llm.providers?.anthropic?.maskedKey ?? ""}
                  onSave={(key) => updateMutation.mutate({ anthropicApiKey: key })}
                  onTest={(key) => testProvider("anthropic", key)}
                  isTesting={testingProvider === "anthropic"}
                  testResult={testResults.anthropic ?? null} />
                <ProviderKeyCard provider="openrouter" label="OpenRouter API Key"
                  hasKey={settings.llm.providers?.openrouter?.hasKey ?? false}
                  currentMasked={settings.llm.providers?.openrouter?.maskedKey ?? ""}
                  onSave={(key) => updateMutation.mutate({ openrouterApiKey: key })}
                  onTest={(key) => testProvider("openrouter", key)}
                  isTesting={testingProvider === "openrouter"}
                  testResult={testResults.openrouter ?? null} />
                <ProviderKeyCard provider="cerebras" label="Cerebras API Key"
                  hasKey={settings.llm.providers?.cerebras?.hasKey ?? false}
                  currentMasked={settings.llm.providers?.cerebras?.maskedKey ?? ""}
                  onSave={(key) => updateMutation.mutate({ cerebrasApiKey: key })}
                  onTest={(key) => testProvider("cerebras", key)}
                  isTesting={testingProvider === "cerebras"}
                  testResult={testResults.cerebras ?? null} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-indigo-500" />
                <CardTitle className="text-base">Language Model Settings</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="flex flex-wrap gap-8">
                  <div className="space-y-2 border p-4 rounded-lg bg-muted/20 flex-1 min-w-[280px]">
                    <Label className="text-sm font-semibold">Active LLM Provider</Label>
                    <p className="text-xs text-muted-foreground mb-2">The primary provider for real-time text generation.</p>
                    <Select
                      value={settings.llm.activeProvider || "gemini"}
                      onValueChange={(v) => {
                        const defaultModelsByProvider: Record<string, string> = {
                          gemini: "gemini-2.0-flash",
                          groq: "llama-3.3-70b-versatile",
                          openai: "gpt-4o-mini",
                          deepseek: "deepseek-chat",
                          anthropic: "claude-3-5-sonnet-20241022",
                          openrouter: "openai/gpt-4o-mini",
                        };
                        updateMutation.mutate({
                          llmActiveProvider: v,
                          llmDefaultModel: defaultModelsByProvider[v] || settings.llm.defaultModel,
                        });
                      }}
                    >
                      <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gemini">Google Gemini (Recommended for Ultra-Fast Voice - ~150ms)</SelectItem>
                        <SelectItem value="groq">Groq (LPU Speed Inference)</SelectItem>
                        <SelectItem value="openai">OpenAI (GPT-4o & GPT-4o Mini)</SelectItem>
                        <SelectItem value="deepseek">DeepSeek (V3 & R1)</SelectItem>
                        <SelectItem value="anthropic">Anthropic (Claude 3.5 Sonnet / Haiku)</SelectItem>
                        <SelectItem value="openrouter">OpenRouter (Multi-Model Gateway)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 border p-4 rounded-lg bg-muted/20 flex-1 min-w-[280px]">
                    <Label className="text-sm font-semibold">
                      Default Model ({settings.llm.activeProvider ? settings.llm.activeProvider.toUpperCase() : "LLM"})
                    </Label>
                    <p className="text-xs text-muted-foreground mb-2">Fallback model if an agent doesn't specify one.</p>
                    {settings.llm.activeProvider === "openrouter" ? (
                      <Select
                        value={settings.llm.defaultModel}
                        onValueChange={(v) => {
                          updateMutation.mutate({ llmDefaultModel: v });
                        }}
                      >
                        <SelectTrigger className="w-full">
                          {isOrModelsLoading ? (
                            <span className="flex items-center gap-2 text-muted-foreground">
                              <Loader2 className="h-3 w-3 animate-spin" /> Loading models...
                            </span>
                          ) : (
                            <SelectValue placeholder="Select a model" />
                          )}
                        </SelectTrigger>
                        <SelectContent className="max-h-[320px]">
                          <div className="px-2 py-1.5 sticky top-0 z-10 bg-popover border-b">
                            <Input
                              placeholder="Search models..."
                              value={orSearch}
                              onChange={(e) => setOrSearch(e.target.value)}
                              className="h-7 text-xs"
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                          </div>
                          {isOrModelsLoading ? (
                            <div className="flex items-center justify-center py-6 gap-2 text-muted-foreground text-xs">
                              <Loader2 className="h-4 w-4 animate-spin" /> Fetching from OpenRouter...
                            </div>
                          ) : orModels.length > 0 ? (
                            orModels
                              .filter((m) =>
                                m.name.toLowerCase().includes(orSearch.toLowerCase()) ||
                                m.id.toLowerCase().includes(orSearch.toLowerCase())
                              )
                              .slice(0, 80)
                              .map((m) => (
                                <SelectItem key={m.id} value={m.id}>
                                  <div className="flex flex-col py-0.5">
                                    <span className="text-xs font-medium leading-tight">{m.name}</span>
                                    <span className="text-[10px] text-muted-foreground font-mono leading-tight">{m.id}</span>
                                  </div>
                                </SelectItem>
                              ))
                          ) : (
                            <>
                              <SelectItem value="openai/gpt-4o-mini">GPT-4o Mini</SelectItem>
                              <SelectItem value="openai/gpt-4o">GPT-4o</SelectItem>
                              <SelectItem value="anthropic/claude-3.5-sonnet">Claude 3.5 Sonnet</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Select
                        value={settings.llm.defaultModel}
                        onValueChange={(v) => {
                          updateMutation.mutate({ llmDefaultModel: v });
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select default model" />
                        </SelectTrigger>
                        <SelectContent>
                          {settings.llm.activeProvider === "gemini" && (
                            <>
                              <SelectItem value="gemini-2.0-flash">Gemini 2.0 Flash (Recommended for Voice - ~150ms)</SelectItem>
                              <SelectItem value="gemini-2.0-flash-lite">Gemini 2.0 Flash Lite (Lowest Cost)</SelectItem>
                              <SelectItem value="gemini-2.5-flash">Gemini 2.5 Flash (Next-Gen Flagship)</SelectItem>
                              <SelectItem value="gemini-2.5-flash-lite">Gemini 2.5 Flash Lite (Next-Gen Ultra Fast)</SelectItem>
                              <SelectItem value="gemini-1.5-flash">Gemini 1.5 Flash</SelectItem>
                              <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro</SelectItem>
                            </>
                          )}
                          {settings.llm.activeProvider === "groq" && (
                            <>
                              <SelectItem value="llama-3.3-70b-versatile">Llama 3.3 70B Versatile (Recommended - Ultra Fast)</SelectItem>
                              <SelectItem value="llama-3.1-8b-instant">Llama 3.1 8B Instant</SelectItem>
                              <SelectItem value="mixtral-8x7b-32768">Mixtral 8x7B</SelectItem>
                            </>
                          )}
                          {settings.llm.activeProvider === "openai" && (
                            <>
                              <SelectItem value="gpt-4o-mini">GPT-4o Mini (Recommended for Voice)</SelectItem>
                              <SelectItem value="gpt-4o">GPT-4o (Omnimodel)</SelectItem>
                              <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                            </>
                          )}
                          {settings.llm.activeProvider === "deepseek" && (
                            <>
                              <SelectItem value="deepseek-chat">DeepSeek V3 (deepseek-chat)</SelectItem>
                              <SelectItem value="deepseek-reasoner">DeepSeek R1 (deepseek-reasoner)</SelectItem>
                            </>
                          )}
                          {settings.llm.activeProvider === "anthropic" && (
                            <>
                              <SelectItem value="claude-3-5-sonnet-20241022">Claude 3.5 Sonnet v2</SelectItem>
                              <SelectItem value="claude-3-5-haiku-20241022">Claude 3.5 Haiku</SelectItem>
                              <SelectItem value="claude-3-haiku-20240307">Claude 3 Haiku</SelectItem>
                            </>
                          )}
                          {settings.llm.activeProvider === "cerebras" && (
                            <>
                              <SelectItem value="llama3.1-70b">Cerebras Llama 3.1 70B</SelectItem>
                              <SelectItem value="llama3.1-8b">Cerebras Llama 3.1 8B</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </div>

                <div className="mt-2 p-4 rounded-xl border border-indigo-100/80 dark:border-indigo-950/60 bg-indigo-50/20 dark:bg-indigo-950/10 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                    <Brain className="h-4 w-4" />
                    <span>LLM Cost Tiers & Recommendation Guide</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Choose the best model based on your budget and requirements. Lower latency models are recommended for fast-paced voice conversations. INR rates calculated at ₹95/USD.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-background border border-indigo-100/50 dark:border-indigo-950/40">
                      <div className="flex items-center justify-between mb-1.5">
                        <Badge variant="outline" className="text-[10px] font-bold text-emerald-600 border-emerald-300 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/20">Low Cost</Badge>
                        <div className="text-right">
                          <span className="text-[10px] block font-mono text-muted-foreground font-semibold">~$0.002 - $0.005/min</span>
                          <span className="text-[9px] block font-mono text-emerald-600 font-medium">(₹0.19 - ₹0.48/min)</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        <strong>Flash & Mini Models</strong> (e.g. <code>gpt-4o-mini</code>, <code>gemini-2.5-flash</code>, <code>gemini-2.0-flash-lite</code>, <code>claude-3-haiku</code>, <code>llama-3.1-8b</code>, <code>deepseek-chat</code>). Ultra-fast response times, highly cost-effective, and ideal for standard high-concurrency conversational flows.
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-background border border-indigo-100/50 dark:border-indigo-950/40">
                      <div className="flex items-center justify-between mb-1.5">
                        <Badge variant="outline" className="text-[10px] font-bold text-amber-600 border-amber-300 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-950/20">Mid Cost</Badge>
                        <div className="text-right">
                          <span className="text-[10px] block font-mono text-muted-foreground font-semibold">~$0.006 - $0.015/min</span>
                          <span className="text-[9px] block font-mono text-amber-600 font-medium">(₹0.57 - ₹1.43/min)</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        <strong>Standard Models</strong> (e.g. <code>llama-3.1-70b</code>, <code>gemini-2.5-pro</code>, <code>mistral-large</code>, <code>qwen-2.5-72b</code>). Offers balanced intelligence, solid reasoning capability, and moderate pricing suitable for most business logic.
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-background border border-indigo-100/50 dark:border-indigo-950/40">
                      <div className="flex items-center justify-between mb-1.5">
                        <Badge variant="outline" className="text-[10px] font-bold text-violet-600 border-violet-300 dark:border-violet-800 bg-violet-50/30 dark:bg-violet-950/20">Upper Cost</Badge>
                        <div className="text-right">
                          <span className="text-[10px] block font-mono text-muted-foreground font-semibold">~$0.02 - $0.06+/min</span>
                          <span className="text-[9px] block font-mono text-violet-600 font-medium">(₹1.90 - ₹5.70+/min)</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        <strong>Pro & Sonnet Models</strong> (e.g. <code>gpt-4o</code>, <code>claude-3.5-sonnet</code>, <code>gpt-4-turbo</code>, <code>claude-3-opus</code>). Premium reasoning, advanced tool calling, structured JSON output, and complex multi-step execution.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-2 border-t">
                  <Label className="text-sm font-semibold">Allowed Models (Available for Agents)</Label>
                  <p className="text-xs text-muted-foreground -mt-2">Check the models you want to expose in the Agent creation workflow.</p>
                  <div className="border rounded-md overflow-hidden flex flex-col h-[320px] w-full max-w-[800px] bg-background shadow-sm">
                    <div className="p-2 border-b bg-muted/30">
                      <Input
                        placeholder="Search models (Gemini, OpenRouter...)..."
                        value={orSearch}
                        onChange={(e) => setOrSearch(e.target.value)}
                        className="h-8 text-sm bg-background border-muted"
                      />
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                      {isOrModelsLoading ? (
                        <div className="flex items-center justify-center py-10 gap-2 text-muted-foreground text-sm">
                          <Loader2 className="h-4 w-4 animate-spin" /> Fetching models...
                        </div>
                      ) : (
                        (() => {
                          const staticCatalogModels: Array<{ id: string; name: string }> = [
                            // Google DeepMind
                            { id: "gemini-2.0-flash", name: "Google Gemini 2.0 Flash (Recommended • ~150ms)" },
                            { id: "gemini-2.0-flash-lite", name: "Google Gemini 2.0 Flash-Lite (Fastest • ~130ms)" },
                            { id: "gemini-2.5-flash", name: "Google Gemini 2.5 Flash (Next-Gen Flagship)" },
                            { id: "gemini-2.5-flash-lite", name: "Google Gemini 2.5 Flash-Lite (Ultra Fast)" },
                            { id: "gemini-1.5-flash", name: "Google Gemini 1.5 Flash (Battle-Tested)" },
                            { id: "gemini-1.5-pro", name: "Google Gemini 1.5 Pro (Deep Context 2M)" },
                            // Groq LPU
                            { id: "llama-3.3-70b-versatile", name: "Groq Llama 3.3 70B (LPU Speed • ~160ms)" },
                            { id: "llama-3.1-8b-instant", name: "Groq Llama 3.1 8B Instant (Sub-110ms)" },
                            { id: "mixtral-8x7b-32768", name: "Groq Mixtral 8x7B" },
                            // OpenAI
                            { id: "gpt-4o-mini", name: "OpenAI GPT-4o-mini (Balanced Enterprise • ~220ms)" },
                            { id: "gpt-4o", name: "OpenAI GPT-4o (Omni Reasoning • ~300ms)" },
                            { id: "gpt-4-turbo", name: "OpenAI GPT-4 Turbo" },
                            // DeepSeek
                            { id: "deepseek-chat", name: "DeepSeek V3 (deepseek-chat • ~200ms)" },
                            { id: "deepseek-reasoner", name: "DeepSeek R1 (deepseek-reasoner • ~450ms)" },
                            // Anthropic
                            { id: "claude-3-5-sonnet-20241022", name: "Anthropic Claude 3.5 Sonnet v2 (~280ms)" },
                            { id: "claude-3-5-haiku-20241022", name: "Anthropic Claude 3.5 Haiku (~170ms)" },
                            { id: "claude-3-haiku-20240307", name: "Anthropic Claude 3 Haiku" },
                            // Cerebras
                            { id: "llama3.1-70b", name: "Cerebras Llama 3.1 70B (Wafer-Scale • ~140ms)" },
                            { id: "llama3.1-8b", name: "Cerebras Llama 3.1 8B (Sub-100ms Inference)" },
                            // Sarvam AI
                            { id: "sarvam-2b-v0.5", name: "Sarvam 2B Indic (Native Regional Dialog • ~160ms)" },
                          ];
                          // Deduplicate models between static and OpenRouter
                          const staticIds = new Set(staticCatalogModels.map(m => m.id));
                          const uniqueOrModels = orModels.filter(m => !staticIds.has(m.id));
                          const allLlmModels = [
                            ...staticCatalogModels,
                            ...uniqueOrModels
                          ];
                          const filtered = allLlmModels
                            .filter((m) =>
                              m.name.toLowerCase().includes(orSearch.toLowerCase()) ||
                              m.id.toLowerCase().includes(orSearch.toLowerCase())
                            )
                            .sort((a, b) => {
                              const aSelected = settings.llm.allowedModels?.includes(a.id) ? 1 : 0;
                              const bSelected = settings.llm.allowedModels?.includes(b.id) ? 1 : 0;
                              if (aSelected !== bSelected) return bSelected - aSelected;
                              return a.name.localeCompare(b.name);
                            });

                          if (filtered.length === 0) {
                            return <div className="text-center py-4 text-sm text-muted-foreground">No models found.</div>;
                          }

                          return filtered.slice(0, 100).map((m) => {
                            const isSelected = settings.llm.allowedModels?.includes(m.id) ?? false;
                            return (
                              <div
                                key={m.id}
                                className={`flex items-center space-x-3 rounded-md p-2 transition-colors cursor-pointer border border-transparent ${isSelected ? 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-100 dark:border-indigo-900/30' : 'hover:bg-muted/50'}`}
                                onClick={() => {
                                  const currentAllowed = settings.llm.allowedModels || [];
                                  const newAllowed = !isSelected
                                    ? [...currentAllowed, m.id]
                                    : currentAllowed.filter(id => id !== m.id);
                                  updateMutation.mutate({ llmAllowedModels: newAllowed });
                                }}
                              >
                                <Checkbox
                                  id={`model-${m.id}`}
                                  checked={isSelected}
                                  className={isSelected ? "data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600" : ""}
                                  onCheckedChange={(checked) => {
                                    const currentAllowed = settings.llm.allowedModels || [];
                                    const newAllowed = checked
                                      ? [...currentAllowed, m.id]
                                      : currentAllowed.filter(id => id !== m.id);
                                    updateMutation.mutate({ llmAllowedModels: newAllowed });
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                />
                                <label htmlFor={`model-${m.id}`} className="flex flex-col cursor-pointer flex-1" onClick={(e) => e.stopPropagation()}>
                                  <span className={`text-sm font-medium leading-none ${isSelected ? 'text-indigo-900 dark:text-indigo-300' : ''}`}>{m.name}</span>
                                  <span className="text-[10px] text-muted-foreground font-mono mt-1">{m.id}</span>
                                </label>
                              </div>
                            );
                          });
                        })()
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Speech-to-Speech (STS) Tab */}
        <TabsContent value="sts" className="space-y-6 mt-4">
          <Card className="border border-purple-100 dark:border-purple-950 bg-purple-50/20 dark:bg-purple-950/10">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <CardTitle className="text-lg text-purple-900 dark:text-purple-200">
                  Realtime Speech-to-Speech (STS) Engine
                </CardTitle>
              </div>
              <CardDescription>
                Direct neural voice-to-voice streaming over persistent WebSockets. Audio is synthesized and streamed end-to-end without separate cascaded STT transcription latency (sub-300ms natural conversational dialog).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 items-center text-sm py-2 px-3 bg-background rounded-lg border border-border/80">
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                  <Badge variant="outline">Live Caller Audio</Badge>
                  <span>→</span>
                  <Badge className="bg-purple-600 text-white">Full-Duplex WebSocket</Badge>
                  <span>→</span>
                  <Badge variant="secondary">Gemini Multimodal Live / OpenAI Realtime</Badge>
                  <span>→</span>
                  <Badge className="bg-emerald-600 text-white">Realtime Neural Speech</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* STS Provider API Keys */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-base">Realtime STS Provider API Keys</CardTitle>
                <CardDescription className="text-xs">Root platform credentials for full-duplex speech-to-speech models</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProviderKeyCard
                  provider="sts-openai"
                  label="OpenAI Realtime API Key"
                  hasKey={settings.sts?.providers?.openai?.hasKey ?? false}
                  currentMasked={settings.sts?.providers?.openai?.maskedKey ?? ""}
                  onSave={(key) => updateMutation.mutate({ stsOpenaiApiKey: key })}
                  onTest={(key) => testProvider("sts-openai", key)}
                  isTesting={testingProvider === "sts-openai"}
                  testResult={testResults["sts-openai"] ?? null}
                />
                <ProviderKeyCard
                  provider="sts-gemini"
                  label="Google Gemini Multimodal Live API Key"
                  hasKey={settings.sts?.providers?.gemini?.hasKey ?? false}
                  currentMasked={settings.sts?.providers?.gemini?.maskedKey ?? ""}
                  onSave={(key) => updateMutation.mutate({ stsGeminiApiKey: key })}
                  onTest={(key) => testProvider("sts-gemini", key)}
                  isTesting={testingProvider === "sts-gemini"}
                  testResult={testResults["sts-gemini"] ?? null}
                />
              </div>
            </CardContent>
          </Card>

          {/* STS Model & Character Configuration */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                <CardTitle className="text-base">Speech-to-Speech Default Models &amp; Voices</CardTitle>
              </div>
              <CardDescription className="text-xs">Configure the default realtime engine parameters for STS-mode agents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Active STS Provider */}
                <div className="space-y-2 border p-4 rounded-lg bg-muted/20">
                  <Label className="text-sm font-semibold">Platform Active STS Provider</Label>
                  <p className="text-xs text-muted-foreground mb-2">Default provider for real-time speech-to-speech agents.</p>
                  <Select
                    value={settings.sts?.activeProvider || "openai"}
                    onValueChange={(v) => updateMutation.mutate({ stsActiveProvider: v })}
                  >
                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="openai">OpenAI Realtime API (gpt-4o-realtime)</SelectItem>
                      <SelectItem value="gemini">Google Gemini Multimodal Live (gemini-2.0-flash-exp)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* OpenAI Realtime Default Model & Voice */}
                <div className="space-y-3 border p-4 rounded-lg bg-muted/20">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold">OpenAI Realtime Settings</Label>
                    <Badge variant="outline" className="text-[10px]">OpenAI Protocol</Badge>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Model</Label>
                      <Select
                        value={settings.sts?.openaiModel || "gpt-4o-realtime-preview"}
                        onValueChange={(v) => updateMutation.mutate({ stsOpenaiModel: v })}
                      >
                        <SelectTrigger className="w-full text-xs h-8"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gpt-4o-realtime-preview">GPT-4o Realtime Preview</SelectItem>
                          <SelectItem value="gpt-4o-mini-realtime-preview">GPT-4o Mini Realtime</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Default Voice</Label>
                      <Select
                        value={settings.sts?.openaiVoice || "alloy"}
                        onValueChange={(v) => updateMutation.mutate({ stsOpenaiVoice: v })}
                      >
                        <SelectTrigger className="w-full text-xs h-8"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {['alloy', 'echo', 'shimmer', 'ash', 'ballad', 'coral', 'sage', 'verse'].map((voice) => (
                            <SelectItem key={voice} value={voice} className="capitalize">{voice}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Gemini Live Default Model & Voice */}
                <div className="space-y-3 border p-4 rounded-lg bg-muted/20 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold">Google Gemini Multimodal Live Settings</Label>
                    <Badge variant="outline" className="text-[10px] text-emerald-600 border-emerald-300">Bidirectional Audio WebSocket</Badge>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Model</Label>
                      <Select
                        value={settings.sts?.geminiModel || "gemini-2.0-flash-exp"}
                        onValueChange={(v) => updateMutation.mutate({ stsGeminiModel: v })}
                      >
                        <SelectTrigger className="w-full text-xs h-8"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gemini-2.0-flash-exp">Gemini 2.0 Flash Exp (Experimental Live)</SelectItem>
                          <SelectItem value="gemini-2.0-flash-realtime">Gemini 2.0 Flash Realtime</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Default Voice</Label>
                      <Select
                        value={settings.sts?.geminiVoice || "Puck"}
                        onValueChange={(v) => updateMutation.mutate({ stsGeminiVoice: v })}
                      >
                        <SelectTrigger className="w-full text-xs h-8"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {['Puck', 'Charon', 'Kore', 'Fenrir', 'Aoede'].map((voice) => (
                            <SelectItem key={voice} value={voice}>{voice}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Telephony Tab */}
        <TabsContent value="telephony" className="space-y-4 mt-4">
          <Card className="border border-indigo-100 dark:border-indigo-950 bg-indigo-50/20 dark:bg-indigo-950/10">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-indigo-500" />
                <CardTitle className="text-lg text-indigo-900 dark:text-indigo-200">Direct Cloud Telephony & Media Streaming</CardTitle>
              </div>
              <CardDescription>
                High-performance voice AI architecture powered by AgentLabs cloud streaming. Telecom carriers connect live audio directly to your platform over secure WebSockets (WSS) with zero PBX server maintenance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 items-center justify-between text-sm py-2 px-3 bg-background rounded-lg border border-border/80">
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                  <Badge variant="outline">Carrier DID (Twilio / Plivo / SIP Trunks)</Badge>
                  <span>→</span>
                  <Badge className="bg-emerald-600 text-white">Direct WebSocket (WSS)</Badge>
                  <span>→</span>
                  <Badge variant="secondary">Pipecat Audio Stream</Badge>
                  <span>→</span>
                  <Badge className="bg-indigo-600 text-white">STT + LLM + Indic TTS</Badge>
                  <span>→</span>
                  <Badge variant="outline">Caller Handset / Browser Mic</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {/* SIP Connectivity Card */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Phone className="h-4 w-4 text-emerald-600" />
                        1. Direct SIP &amp; Media Connectivity
                      </CardTitle>
                      <CardDescription className="text-xs mt-1">
                        Inbound signaling and bi-directional WebSocket endpoints for your telecom carriers.
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="border-emerald-500 text-emerald-600 bg-emerald-50/50">Zero PBX</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-muted/40 rounded-lg border space-y-1">
                      <Label className="text-xs font-semibold text-muted-foreground">Inbound SIP Endpoint</Label>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-medium">sip.yourdomain.com:5060</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleCopy("sip.yourdomain.com:5060", "sip-endpoint")}>
                          {copiedText === "sip-endpoint" ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                        </Button>
                      </div>
                      <p className="text-[11px] text-muted-foreground">UDP/TCP 5060, TLS 5061 (SRTP supported)</p>
                    </div>

                    <div className="p-3 bg-muted/40 rounded-lg border space-y-1">
                      <Label className="text-xs font-semibold text-muted-foreground">Media Stream WebSocket</Label>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-medium">wss://.../carrier/{selectedSipProvider}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleCopy(`wss://your-domain.com/api/voice-engine/ws/carrier/${selectedSipProvider}`, "ws-endpoint")}>
                          {copiedText === "ws-endpoint" ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                        </Button>
                      </div>
                      <p className="text-[11px] text-muted-foreground">Bi-directional 16kHz audio stream</p>
                    </div>
                  </div>

                  <div className="p-3 bg-muted/30 rounded-lg border flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-foreground">Outbound Origin IPs for Carrier Whitelisting (ACL)</span>
                      <p className="text-[11px] text-muted-foreground">Whitelist these egress IP addresses on your telecom provider's IP access control list.</p>
                    </div>
                    <Badge variant="secondary" className="font-mono text-xs">52.204.12.88, 54.197.34.120</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Direct Carrier Adapter Card */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Server className="h-4 w-4 text-indigo-600" />
                        2. {sipTemplates[selectedSipProvider]?.title || "Carrier Setup"}
                      </CardTitle>
                      <CardDescription className="text-xs mt-1 whitespace-pre-line leading-relaxed">
                        {sipTemplates[selectedSipProvider]?.guide}
                      </CardDescription>
                    </div>
                    <Select value={selectedSipProvider} onValueChange={setSelectedSipProvider}>
                      <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="twilio">Twilio</SelectItem>
                        <SelectItem value="plivo">Plivo</SelectItem>
                        <SelectItem value="telnyx">Telnyx</SelectItem>
                        <SelectItem value="exotel">Exotel</SelectItem>
                        <SelectItem value="vonage">Vonage</SelectItem>
                        <SelectItem value="cloudonix">Cloudonix</SelectItem>
                        <SelectItem value="asterisk">Asterisk ARI</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-xs font-semibold">
                      Integration Configuration ({sipTemplates[selectedSipProvider]?.snippetType.toUpperCase()})
                    </Label>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleCopy(sipTemplates[selectedSipProvider]?.configSnippet || "", "carrier-snippet")}>
                      {copiedText === "carrier-snippet" ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                    </Button>
                  </div>
                  <pre className="text-xs bg-muted/60 p-3 rounded-lg overflow-x-auto font-mono max-h-[220px] border">
                    <code>{sipTemplates[selectedSipProvider]?.configSnippet}</code>
                  </pre>
                </CardContent>
              </Card>

              {/* Custom SIP Gateways & Trunks Management Card */}
              <Card>
                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-base">3. Outbound Carrier SIP Trunks &amp; Gateways</CardTitle>
                    <CardDescription className="text-xs">
                      Register custom SIP trunks for outbound calling, direct DID termination, and private carrier routing.
                    </CardDescription>
                  </div>
                  <Button size="sm" onClick={handleOpenAddGatewayDialog} className="gap-1.5 h-8">
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Trunk</span>
                  </Button>
                </CardHeader>
                <CardContent>
                  {gateways.length === 0 ? (
                    <div className="text-center py-6 border border-dashed rounded-lg text-muted-foreground text-xs">
                      No custom SIP trunks configured yet. Direct cloud carriers (Twilio, Plivo, Telnyx) operate automatically without manual trunks.
                    </div>
                  ) : (
                    <div className="border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/40">
                            <TableHead className="text-xs font-semibold">Trunk / Gateway Name</TableHead>
                            <TableHead className="text-xs font-semibold">SIP Proxy</TableHead>
                            <TableHead className="text-xs font-semibold">Username / SID</TableHead>
                            <TableHead className="text-xs font-semibold">Register</TableHead>
                            <TableHead className="text-xs font-semibold text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {gateways.map((gw) => (
                            <TableRow key={gw.id}>
                              <TableCell className="font-medium text-xs">{gw.name}</TableCell>
                              <TableCell className="font-mono text-xs">{gw.proxy}</TableCell>
                              <TableCell className="font-mono text-xs">{gw.username}</TableCell>
                              <TableCell className="text-xs">
                                <Badge variant={gw.register ? "default" : "secondary"} className="text-[10px]">
                                  {gw.register ? "Registered" : "Direct IP"}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right space-x-1">
                                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleOpenEditGatewayDialog(gw)}>
                                  <Edit className="h-3.5 w-3.5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => deleteGatewayMutation.mutate(gw.id)}>
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader><CardTitle className="text-base">Telephony Architecture</CardTitle></CardHeader>
                <CardContent className="text-xs space-y-3 leading-relaxed text-muted-foreground">
                  {[
                    "Zero PBX Maintenance: Direct WebSockets eliminate FreeSWITCH servers and Asterisk maintenance.",
                    "Direct Bi-directional Audio: Raw PCM audio frames stream with sub-20ms packet dispatch directly to the AI pipeline.",
                    "Multi-Carrier Support: Mix Twilio, Plivo, Telnyx, Exotel, and Vonage numbers across tenant workspaces.",
                    "SIP Transfer Ready: Support instant live channel transfer and caller disconnect with 0ms latency.",
                  ].map((text, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="h-5 w-5 shrink-0 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-800 dark:text-slate-200">{i + 1}</div>
                      <p>{text}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">Carrier Whitelisting</CardTitle></CardHeader>
                <CardContent className="text-xs leading-relaxed text-muted-foreground space-y-2">
                  <p>When provisioning numbers in Twilio, Plivo, Telnyx, or Exotel, ensure your webhooks point to your AgentLabs cluster domain.</p>
                  <p>Inbound audio is automatically parsed and routed to the assigned AI voice agent based on the incoming phone number (DID).</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Storage Tab */}
        <TabsContent value="storage" className="space-y-4 mt-4">
          <StorageSettingsTab />
        </TabsContent>

        {/* Master AI & BYOK Tab */}
        <TabsContent value="master-ai" className="space-y-6 mt-4">
          {/* Admin Managed Mode Platform Defaults Card */}
          <Card className="border-indigo-100 dark:border-indigo-950/50 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    <CardTitle className="text-lg">Platform Managed Mode Defaults &amp; Catalog</CardTitle>
                  </div>
                  <CardDescription>
                    Configure the platform-wide default conversational brain, speech synthesizers, and models that tenant users inherit when using Managed Mode.
                  </CardDescription>
                </div>
                <Badge variant="outline" className="border-emerald-500 text-emerald-600 bg-emerald-50/50">
                  Tenant Defaults
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Default Brain */}
                <div className="space-y-2 border p-3.5 rounded-lg bg-muted/20">
                  <Label className="text-xs font-semibold">Managed Default Brain (LLM)</Label>
                  <Select
                    value={settings.managedMode?.defaultLlm || "gemini-2.0-flash"}
                    onValueChange={(v) => updateMutation.mutate({ managedDefaultLlm: v })}
                  >
                    <SelectTrigger className="w-full text-xs h-9"><SelectValue /></SelectTrigger>
                    <SelectContent className="max-h-64">
                      <SelectItem value="gemini-2.0-flash">Gemini 2.0 Flash (Recommended • ~150ms)</SelectItem>
                      <SelectItem value="gemini-2.0-flash-lite">Gemini 2.0 Flash-Lite (Fastest)</SelectItem>
                      <SelectItem value="gemini-2.5-flash">Gemini 2.5 Flash</SelectItem>
                      <SelectItem value="gemini-2.5-flash-lite">Gemini 2.5 Flash-Lite</SelectItem>
                      <SelectItem value="gemini-1.5-flash">Gemini 1.5 Flash</SelectItem>
                      <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro</SelectItem>
                      <SelectItem value="llama-3.3-70b-versatile">Groq Llama 3.3 70B (~160ms)</SelectItem>
                      <SelectItem value="llama-3.1-8b-instant">Groq Llama 3.1 8B (~110ms)</SelectItem>
                      <SelectItem value="deepseek-chat">DeepSeek V3 (~200ms)</SelectItem>
                      <SelectItem value="deepseek-reasoner">DeepSeek R1 (~450ms)</SelectItem>
                      <SelectItem value="claude-3-5-sonnet-20241022">Claude 3.5 Sonnet v2</SelectItem>
                      <SelectItem value="claude-3-5-haiku-20241022">Claude 3.5 Haiku</SelectItem>
                      <SelectItem value="gpt-4o-mini">OpenAI GPT-4o-mini (~220ms)</SelectItem>
                      <SelectItem value="gpt-4o">OpenAI GPT-4o (~300ms)</SelectItem>
                      <SelectItem value="llama3.1-70b">Cerebras Llama 3.1 70B (~140ms)</SelectItem>
                      <SelectItem value="llama3.1-8b">Cerebras Llama 3.1 8B (~90ms)</SelectItem>
                      <SelectItem value="sarvam-2b-v0.5">Sarvam 2B Indic (~160ms)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-[10px] text-muted-foreground">Default conversational engine for tenant managed agents.</p>
                </div>

                {/* Default STT */}
                <div className="space-y-2 border p-3.5 rounded-lg bg-muted/20">
                  <Label className="text-xs font-semibold">Managed Default STT</Label>
                  <Select
                    value={settings.managedMode?.defaultStt || "deepgram"}
                    onValueChange={(v) => updateMutation.mutate({ managedDefaultStt: v })}
                  >
                    <SelectTrigger className="w-full text-xs h-9"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="deepgram">Deepgram Nova-2 (Telephony)</SelectItem>
                      <SelectItem value="sarvam">Sarvam AI Saaras (Indic)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-[10px] text-muted-foreground">Primary speech recognition engine for incoming caller voice.</p>
                </div>

                {/* Default TTS Engine & Voice */}
                <div className="space-y-2 border p-3.5 rounded-lg bg-muted/20">
                  <Label className="text-xs font-semibold">Managed Default TTS Voice</Label>
                  <Select
                    value={settings.managedMode?.defaultTtsVoice || "sonic-katie"}
                    onValueChange={(v) => {
                      const ttsProvider = v.startsWith('sonic-') ? 'cartesia'
                        : v.startsWith('navana-') ? 'navana'
                        : v.startsWith('aura-') ? 'deepgram'
                        : v.startsWith('eleven_') ? 'elevenlabs'
                        : 'sarvam';
                      updateMutation.mutate({
                        managedDefaultTts: ttsProvider,
                        managedDefaultTtsVoice: v,
                      });
                    }}
                  >
                    <SelectTrigger className="w-full text-xs h-9"><SelectValue /></SelectTrigger>
                    <SelectContent className="max-h-64">
                      <SelectItem value="sonic-katie">Cartesia Sonic - Katie (US Female, 90ms)</SelectItem>
                      <SelectItem value="sonic-barbershop">Cartesia Sonic - British Male (85ms)</SelectItem>
                      <SelectItem value="navana-aarav">Navana Bodhi - Aarav (Hindi/English Male)</SelectItem>
                      <SelectItem value="navana-diya">Navana Bodhi - Diya (Hindi/English Female)</SelectItem>
                      <SelectItem value="navana-karthik">Navana Bodhi - Karthik (Tamil Male)</SelectItem>
                      <SelectItem value="navana-sravani">Navana Bodhi - Sravani (Telugu Female)</SelectItem>
                      <SelectItem value="neha">Sarvam Bulbul - Neha (Natural Hindi)</SelectItem>
                      <SelectItem value="shubh">Sarvam Bulbul - Shubh (Conversational Hindi)</SelectItem>
                      <SelectItem value="aura-asteria-en">Deepgram Aura - Asteria (US Female)</SelectItem>
                      <SelectItem value="aura-orion-en">Deepgram Aura - Orion (US Male)</SelectItem>
                      <SelectItem value="eleven_turbo_v2_5">ElevenLabs - Rachel (Turbo v2.5)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-[10px] text-muted-foreground">Default voice synthesis for Managed Mode responses.</p>
                </div>

                {/* Default STS */}
                <div className="space-y-2 border p-3.5 rounded-lg bg-muted/20">
                  <Label className="text-xs font-semibold">Managed Default Realtime STS</Label>
                  <Select
                    value={settings.managedMode?.defaultSts || "openai"}
                    onValueChange={(v) => updateMutation.mutate({ managedDefaultSts: v })}
                  >
                    <SelectTrigger className="w-full text-xs h-9"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="openai">OpenAI Realtime (gpt-4o-realtime)</SelectItem>
                      <SelectItem value="gemini">Google Gemini Live (gemini-2.0-flash-exp)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-[10px] text-muted-foreground">Default speech-to-speech engine if tenant picks STS.</p>
                </div>
              </div>

              {/* Tenant Managed Model Catalog Governance */}
              <div className="space-y-3 pt-3 border-t">
                <div>
                  <Label className="text-sm font-semibold">Tenant Managed Model Catalog Governance</Label>
                  <p className="text-xs text-muted-foreground mb-2">
                    Select which models are enabled for tenants to choose in their Managed Mode tab:
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "gemini-2.0-flash", label: "Gemini 2.0 Flash" },
                    { id: "gemini-2.0-flash-lite", label: "Gemini 2.0 Flash-Lite" },
                    { id: "gemini-2.5-flash", label: "Gemini 2.5 Flash" },
                    { id: "gemini-2.5-flash-lite", label: "Gemini 2.5 Flash-Lite" },
                    { id: "gemini-1.5-flash", label: "Gemini 1.5 Flash" },
                    { id: "gemini-1.5-pro", label: "Gemini 1.5 Pro" },
                    { id: "llama-3.3-70b-versatile", label: "Groq Llama 3.3 70B" },
                    { id: "llama-3.1-8b-instant", label: "Groq Llama 3.1 8B" },
                    { id: "deepseek-chat", label: "DeepSeek V3" },
                    { id: "deepseek-reasoner", label: "DeepSeek R1" },
                    { id: "claude-3-5-sonnet-20241022", label: "Claude 3.5 Sonnet v2" },
                    { id: "claude-3-5-haiku-20241022", label: "Claude 3.5 Haiku" },
                    { id: "gpt-4o-mini", label: "GPT-4o Mini" },
                    { id: "gpt-4o", label: "GPT-4o" },
                    { id: "llama3.1-70b", label: "Cerebras Llama 3.1 70B" },
                    { id: "llama3.1-8b", label: "Cerebras Llama 3.1 8B" },
                    { id: "sarvam-2b-v0.5", label: "Sarvam 2B Indic" },
                  ].map((m) => {
                    const currentCatalog = settings.managedMode?.allowedModels || [
                      'gemini-2.0-flash', 'gemini-2.0-flash-lite', 'gemini-2.5-flash', 'gemini-2.5-flash-lite',
                      'llama-3.3-70b-versatile', 'llama-3.1-8b-instant', 'deepseek-chat', 'claude-3-5-sonnet-20241022',
                      'gpt-4o-mini', 'llama3.1-70b', 'sarvam-2b-v0.5'
                    ];
                    const isSelected = currentCatalog.includes(m.id);
                    return (
                      <Badge
                        key={m.id}
                        variant={isSelected ? "default" : "outline"}
                        className={`cursor-pointer px-3 py-1.5 transition-all ${
                          isSelected
                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                        onClick={() => {
                          let updated: string[];
                          if (isSelected) {
                            if (currentCatalog.length <= 1) return;
                            updated = currentCatalog.filter(id => id !== m.id);
                          } else {
                            updated = [...currentCatalog, m.id];
                          }
                          updateMutation.mutate({ managedAllowedModels: updated });
                        }}
                      >
                        {isSelected && <Check className="h-3 w-3 mr-1.5 inline-block" />}
                        {m.label}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Master BYOK Switch Card */}
          <Card className="border-indigo-100 dark:border-indigo-950/50 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    <CardTitle className="text-lg">Master BYOK (Bring Your Own Key) Governance</CardTitle>
                  </div>
                  <CardDescription>
                    Control whether platform tenants are permitted to supply custom provider keys or forced to consume metered platform credits.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-3 bg-muted/40 p-2.5 rounded-lg border">
                  <Label htmlFor="master-byok-switch" className="text-sm font-semibold cursor-pointer">
                    {(settings.allowUserByok !== false && (settings.allowUserByok as any) !== 'false') ? 'BYOK Allowed' : 'Platform Keys Enforced'}
                  </Label>
                  <Switch
                    id="master-byok-switch"
                    checked={settings.allowUserByok !== false && (settings.allowUserByok as any) !== 'false'}
                    onCheckedChange={(checked) => {
                      updateMutation.mutate({ allowUserByok: checked });
                    }}
                    disabled={updateMutation.isPending}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className={`p-4 rounded-lg border text-sm ${
                (settings.allowUserByok !== false && (settings.allowUserByok as any) !== 'false')
                  ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/20 dark:border-emerald-800 dark:text-emerald-300'
                  : 'bg-amber-50/50 border-amber-200 text-amber-900 dark:bg-amber-950/20 dark:border-amber-800 dark:text-amber-300'
              }`}>
                {(settings.allowUserByok !== false && (settings.allowUserByok as any) !== 'false') ? (
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-semibold">Tenant BYOK is currently ACTIVE</p>
                      <p className="text-xs leading-relaxed opacity-90">
                        Tenants may configure their own API keys for Groq, DeepSeek, OpenAI, Google Gemini, Sarvam, or Deepgram. Calls executed using tenant BYOK credentials are metered at 0 platform credits / $0 platform fees.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-semibold">Strict Metering Mode: Platform Keys FORCED</p>
                      <p className="text-xs leading-relaxed opacity-90">
                        Tenant-provided API keys are ignored. All inbound and outbound voice calls strictly utilize the platform's root API keys and deduct minutes from the tenant's monthly subscription plan or wallet credit balance.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Master AI Reflex Decision Engine Architecture Card */}
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  <CardTitle className="text-lg">Our Master AI: Native Reflex Decision Engine</CardTitle>
                </div>
                <CardDescription>
                  High-speed, zero-cost decisioning engine directly inside AgentLabs (replaces external decision models like Jev AI).
                </CardDescription>
              </div>
              <Badge variant="outline" className="border-emerald-500 text-emerald-600 bg-emerald-50/50">
                <Activity className="h-3 w-3 mr-1 animate-pulse" /> &lt;200ms Latency (Zero Extra Cost)
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border bg-muted/20 space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <Volume2 className="h-4 w-4 text-indigo-600" />
                    <span>Smart Backchanneling Engine</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Distinguishes passive verbal nods ("mm-hmm", "yeah", "haan", "theek hai", "sari", "avuna") from genuine interruptions. Prevents agent stuttering across English, Hindi, Tamil, Telugu, and Kannada.
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-muted/20 space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <Phone className="h-4 w-4 text-emerald-600" />
                    <span>Deterministic Action Gate</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Executes immediate call termination (hangup) and live SIP transfer / carrier handoff with zero LLM inference round-trips for maximum reliability and 0ms latency.
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-muted/20 space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <Brain className="h-4 w-4 text-purple-600" />
                    <span>Semantic Instant FAQ &amp; Reflex Cache</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Instantly serves pre-cached answers to common customer inquiries in &lt;10ms directly from in-memory cache, bypassing LLM processing entirely and saving token costs.
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-muted/20 space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <Sparkles className="h-4 w-4 text-amber-600" />
                    <span>Fast Slot Pre-Extractor</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Pre-extracts phone numbers, dates, times, and pincodes from caller utterances in real-time, providing grounded parameters for Google Calendar, Sheets, and WhatsApp workflows.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* SIP Gateway Dialog */}
      <Dialog open={isGatewayDialogOpen} onOpenChange={setIsGatewayDialogOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>{editingGateway ? "Edit SIP Gateway" : "Add SIP Gateway"}</DialogTitle>
            <DialogDescription>Provide details for your SIP trunk credentials and domain settings.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4">
              <Label htmlFor="gwName" className="sm:text-right pt-1.5 sm:pt-0">Gateway Name</Label>
              <Input id="gwName" value={gwName} onChange={(e) => setGwName(e.target.value)} placeholder="e.g. plivo or twilio" className="sm:col-span-3" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4">
              <Label htmlFor="gwUsername" className="sm:text-right pt-1.5 sm:pt-0">SIP Username</Label>
              <Input id="gwUsername" value={gwUsername} onChange={(e) => setGwUsername(e.target.value)} placeholder="Username or Account SID" className="sm:col-span-3" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4">
              <Label htmlFor="gwPassword" className="sm:text-right pt-1.5 sm:pt-0">SIP Password</Label>
              <Input id="gwPassword" type="password" value={gwPassword} onChange={(e) => setGwPassword(e.target.value)} placeholder="Password or Token" className="sm:col-span-3" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4">
              <Label htmlFor="gwProxy" className="sm:text-right pt-1.5 sm:pt-0">Proxy Address</Label>
              <Input id="gwProxy" value={gwProxy} onChange={(e) => setGwProxy(e.target.value)} placeholder="e.g. phone.plivo.com" className="sm:col-span-3" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4">
              <Label htmlFor="gwRegister" className="sm:text-right pt-1.5 sm:pt-0">Register</Label>
              <div className="flex items-center space-x-2 sm:col-span-3">
                <input
                  type="checkbox"
                  id="gwRegister"
                  checked={gwRegister}
                  onChange={(e) => setGwRegister(e.target.checked)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                />
                <span className="text-xs text-muted-foreground">Enable SIP registration (false for Plivo/Twilio termination)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4">
              <Label htmlFor="gwCallerIdInFrom" className="sm:text-right pt-1.5 sm:pt-0">Caller-ID in From</Label>
              <div className="flex items-center space-x-2 sm:col-span-3">
                <input
                  type="checkbox"
                  id="gwCallerIdInFrom"
                  checked={gwCallerIdInFrom}
                  onChange={(e) => setGwCallerIdInFrom(e.target.checked)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                />
                <span className="text-xs text-muted-foreground">Send caller-ID in the SIP FROM header</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsGatewayDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveGateway} disabled={saveGatewayMutation.isPending}>
              {saveGatewayMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Gateway
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}