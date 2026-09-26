/**
 * UserSipGatewaysTab
 *
 * Shown as a tab in /app/phone-numbers.
 * Allows each user to manage their own SIP gateways (credentials)
 * and manually add custom phone numbers linked to those gateways.
 */

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Server,
  Plus,
  Trash2,
  Edit,
  Phone,
  CheckCircle,
  Circle,
  Loader2,
  RefreshCw,
  Shield,
  Globe,
  KeyRound,
  Zap,
  User,
  Eye,
  EyeOff,
} from "lucide-react";
import UnifiedTelephonyDialog from "@/components/telephony/UnifiedTelephonyDialog";
import ProviderCardsGrid, { TelephonyConfigItem } from "@/components/telephony/ProviderCardsGrid";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Agent {
  id: string;
  name: string;
}

interface UserSipGateway {
  id: string;
  name: string;
  username: string;
  password: string;
  proxy: string;
  register: boolean;
  caller_id_in_from: boolean;
  is_active: boolean;
  created_at: string;
}

interface UserSipPhoneNumber {
  id: string;
  phone_number: string;
  label: string | null;
  gateway_id: string | null;
  gateway_name: string | null;
  gateway_proxy: string | null;
  agent_id: string | null;
  is_active: boolean;
  created_at: string;
}

// ─── Empty Gateway Form ───────────────────────────────────────────────────────

const emptyGatewayForm = () => ({
  name: "",
  username: "",
  password: "",
  proxy: "",
  register: false,
  callerIdInFrom: true,
});

// ─── Component ────────────────────────────────────────────────────────────────

const SIP_PRESETS = [
  { id: "callhippo", name: "CallHippo India", proxy: "sip.callhippo.com", register: true },
  { id: "telecmi", name: "TeleCMI India", proxy: "sip.telecmi.com", register: true },
  { id: "exotel", name: "Exotel India", proxy: "sip.exotel.com", register: true },
  { id: "voicelink", name: "VoiceLink Universal", proxy: "sip.voicelink.cloud", register: true },
  { id: "tata", name: "Tata Tele", proxy: "sip.tatatelebusiness.com", register: true },
  { id: "airtel", name: "Airtel IQ", proxy: "sip.airtel.in", register: true },
  { id: "twilio", name: "Twilio BYOC", proxy: "sip.twilio.com", register: false },
  { id: "plivo", name: "Plivo Direct", proxy: "sip.plivo.com", register: true },
  { id: "telnyx", name: "Telnyx", proxy: "sip.telnyx.com", register: true },
  { id: "custom", name: "Custom SIP", proxy: "", register: true },
];

export default function UserSipGatewaysTab() {
  const { toast } = useToast();

  // ── Gateway dialogs ──
  const [gatewayDialogOpen, setGatewayDialogOpen] = useState(false);
  const [editingGateway, setEditingGateway] = useState<UserSipGateway | null>(null);
  const [gatewayDeleteTarget, setGatewayDeleteTarget] = useState<UserSipGateway | null>(null);
  const [gwForm, setGwForm] = useState(emptyGatewayForm());

  // ── Phone number dialogs ──
  const [phoneDialogOpen, setPhoneDialogOpen] = useState(false);
  const [editingPhone, setEditingPhone] = useState<UserSipPhoneNumber | null>(null);
  const [phoneDeleteTarget, setPhoneDeleteTarget] = useState<UserSipPhoneNumber | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneLabel, setPhoneLabel] = useState("");
  const [phoneGatewayId, setPhoneGatewayId] = useState<string>("none");
  const [phoneAgentId, setPhoneAgentId] = useState<string>("none");

  // ── Dograh Unified Telephony Configuration State ──
  const [unifiedDialogOpen, setUnifiedDialogOpen] = useState(false);
  const [editingConfig, setEditingConfig] = useState<TelephonyConfigItem | null>(null);
  const [defaultOutboundId, setDefaultOutboundId] = useState<string | number | null>(null);

  // ── Unified Carrier / DID Connection State ──
  const [twilioImportOpen, setTwilioImportOpen] = useState(false);
  const [importCarrierTab, setImportCarrierTab] = useState<'twilio' | 'sip'>('twilio');
  const [twilioPhone, setTwilioPhone] = useState("");
  const [twilioAccountSid, setTwilioAccountSid] = useState("");
  const [twilioAuthToken, setTwilioAuthToken] = useState("");
  const [twilioLabel, setTwilioLabel] = useState("");
  const [twilioSmsEnabled, setTwilioSmsEnabled] = useState(true);
  const [twilioAgentId, setTwilioAgentId] = useState<string>("none");
  const [showTwilioToken, setShowTwilioToken] = useState(false);

  // SIP / Indian Carrier Quick Connect State
  const [sipPresetSelected, setSipPresetSelected] = useState('callhippo');
  const [sipCarrierPhone, setSipCarrierPhone] = useState('');
  const [sipCarrierName, setSipCarrierName] = useState('CallHippo India');
  const [sipCarrierProxy, setSipCarrierProxy] = useState('sip.callhippo.com');
  const [sipCarrierUsername, setSipCarrierUsername] = useState('');
  const [sipCarrierPassword, setSipCarrierPassword] = useState('');
  const [sipCarrierPort, setSipCarrierPort] = useState(5060);
  const [sipCarrierAgentId, setSipCarrierAgentId] = useState('none');
  const [sipCarrierRegister, setSipCarrierRegister] = useState(true);
  const [showSipPassword, setShowSipPassword] = useState(false);
  const [sipConnecting, setSipConnecting] = useState(false);

  // ── Queries ──
  const { data: gatewaysData, isLoading: gatewaysLoading, refetch: refetchGateways } = useQuery<{ success: boolean; data: UserSipGateway[] }>({
    queryKey: ["/api/user/sip-gateways"],
  });
  const gateways = gatewaysData?.data || [];

  const { data: phonesData, isLoading: phonesLoading, refetch: refetchPhones } = useQuery<{ success: boolean; data: UserSipPhoneNumber[] }>({
    queryKey: ["/api/user/sip-phone-numbers"],
  });
  const phones = phonesData?.data || [];

  const { data: agentsData } = useQuery<Agent[]>({
    queryKey: ["/api/agents"],
  });
  const agents = agentsData || [];

  // ── Twilio Import Mutation ──
  const importTwilioMutation = useMutation({
    mutationFn: async (payload: {
      phoneNumber: string;
      accountSid: string;
      authToken: string;
      label?: string;
      smsEnabled: boolean;
      agentId?: string;
    }) => {
      const res = await apiRequest("POST", "/api/phone-numbers/import-twilio", payload);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to import number from Twilio");
      }
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/phone-numbers"] });
      queryClient.invalidateQueries({ queryKey: ["/api/user/sip-phone-numbers"] });
      refetchPhones();
      setTwilioImportOpen(false);
      setTwilioPhone("");
      setTwilioAccountSid("");
      setTwilioAuthToken("");
      setTwilioLabel("");
      setTwilioSmsEnabled(true);
      setTwilioAgentId("none");
      toast({
        title: "Number imported successfully!",
        description: data.message || "Your Twilio phone number is now connected.",
      });
    },
    onError: (err: any) => {
      toast({
        title: "Import Failed",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  const handleConnectSipCarrier = async () => {
    if (!sipCarrierPhone.trim() || !sipCarrierProxy.trim() || !sipCarrierUsername.trim()) {
      toast({
        title: "Validation Error",
        description: "Phone Number, SIP Server/Proxy, and Username are required.",
        variant: "destructive"
      });
      return;
    }

    setSipConnecting(true);
    try {
      const gwRes = await apiRequest("POST", "/api/user/sip-gateways", {
        name: sipCarrierName || `${sipCarrierPhone} Gateway`,
        proxy: sipCarrierProxy.trim(),
        username: sipCarrierUsername.trim(),
        password: sipCarrierPassword.trim(),
        port: sipCarrierPort || 5060,
        register: sipCarrierRegister,
        callerIdInFrom: true,
      });
      const gwData = await gwRes.json();
      const gatewayId = gwData.data?.id;

      await apiRequest("POST", "/api/user/sip-phone-numbers", {
        phoneNumber: sipCarrierPhone.trim(),
        label: `${sipCarrierName} Line`,
        gatewayId: gatewayId || null,
        agentId: sipCarrierAgentId !== "none" ? sipCarrierAgentId : null,
      });

      queryClient.invalidateQueries({ queryKey: ["/api/user/sip-gateways"] });
      queryClient.invalidateQueries({ queryKey: ["/api/user/sip-phone-numbers"] });
      refetchGateways();
      refetchPhones();

      setTwilioImportOpen(false);
      setSipCarrierPhone("");
      setSipCarrierUsername("");
      setSipCarrierPassword("");
      toast({
        title: "Carrier Connected Successfully!",
        description: `${sipCarrierName} configured and phone number ${sipCarrierPhone} attached.`,
      });
    } catch (err: any) {
      toast({
        title: "Connection Failed",
        description: err.message || "Failed to configure SIP carrier",
        variant: "destructive"
      });
    } finally {
      setSipConnecting(false);
    }
  };

  // Quick 1-click Inbound AI Agent assigner
  const handleQuickAgentAssign = async (phone: UserSipPhoneNumber, newAgentId: string) => {
    try {
      await apiRequest("PUT", `/api/user/sip-phone-numbers/${phone.id}`, {
        phoneNumber: phone.phone_number,
        label: phone.label,
        gatewayId: phone.gateway_id,
        agentId: newAgentId === "none" ? null : newAgentId,
        isActive: phone.is_active,
      });

      if (newAgentId !== "none") {
        try {
          await apiRequest("POST", "/api/incoming-connections", {
            phoneNumberId: phone.id,
            agentId: newAgentId,
          });
        } catch (e) {
          // ignore if already linked
        }
      }

      toast({
        title: "Agent Updated",
        description: newAgentId === "none" ? `Unassigned agent from ${phone.phone_number}` : `Bound Inbound AI Agent to ${phone.phone_number}`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/user/sip-phone-numbers"] });
      refetchPhones();
    } catch (err: any) {
      toast({
        title: "Failed to update agent",
        description: err.message || "Could not rebind AI Agent",
        variant: "destructive",
      });
    }
  };

  // Config items mapped for ProviderCardsGrid
  const configItems: TelephonyConfigItem[] = (gateways || []).map((gw: any) => {
    let providerType = "sip";
    const lowerName = (gw.name || "").toLowerCase();
    const lowerProxy = (gw.proxy || "").toLowerCase();
    if (lowerName.includes("twilio") || lowerProxy.includes("twilio")) providerType = "twilio";
    else if (lowerName.includes("plivo") || lowerProxy.includes("plivo")) providerType = "plivo";
    else if (lowerName.includes("exotel") || lowerProxy.includes("exotel")) providerType = "exotel";
    else if (lowerName.includes("telnyx") || lowerProxy.includes("telnyx")) providerType = "telnyx";
    else if (lowerName.includes("cloudonix") || lowerProxy.includes("cloudonix")) providerType = "cloudonix";
    else if (lowerName.includes("ari") || lowerName.includes("asterisk")) providerType = "ari";
    else if (lowerName.includes("vonage") || lowerProxy.includes("vonage")) providerType = "vonage";
    else if (lowerName.includes("vobiz") || lowerProxy.includes("vobiz")) providerType = "vobiz";

    const numCount = (phones || []).filter((p: any) => p.gateway_id === gw.id).length;

    return {
      id: gw.id,
      name: gw.name,
      provider: providerType,
      is_default_outbound: defaultOutboundId === gw.id,
      is_active: gw.is_active ?? true,
      phone_number_count: numCount,
      credentials: gw,
    };
  });

  const saveGatewayMutation = useMutation({
    mutationFn: async (payload: typeof gwForm) => {
      if (editingGateway) {
        const res = await apiRequest("PUT", `/api/user/sip-gateways/${editingGateway.id}`, payload);
        return res.json();
      } else {
        const res = await apiRequest("POST", "/api/user/sip-gateways", payload);
        return res.json();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user/sip-gateways"] });
      setGatewayDialogOpen(false);
      setEditingGateway(null);
      setGwForm(emptyGatewayForm());
      toast({
        title: editingGateway ? "Gateway updated" : "Gateway added",
        description: editingGateway
          ? "Your Custom Voice Engine gateway has been updated."
          : "Your new Custom Voice Engine gateway has been added.",
      });
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message || "Failed to save gateway", variant: "destructive" });
    },
  });

  const deleteGatewayMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("DELETE", `/api/user/sip-gateways/${id}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user/sip-gateways"] });
      queryClient.invalidateQueries({ queryKey: ["/api/user/sip-phone-numbers"] });
      setGatewayDeleteTarget(null);
      toast({ title: "Gateway deleted" });
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const activateGatewayMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("POST", `/api/user/sip-gateways/${id}/activate`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user/sip-gateways"] });
      toast({ title: "Gateway activated", description: "This gateway is now your active Custom Voice Engine gateway." });
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  // ── Phone mutations ──
  const savePhoneMutation = useMutation({
    mutationFn: async (payload: { phoneNumber: string; label?: string; gatewayId?: string; agentId?: string }) => {
      if (editingPhone) {
        const res = await apiRequest("PUT", `/api/user/sip-phone-numbers/${editingPhone.id}`, {
          label: payload.label,
          gatewayId: payload.gatewayId === "none" ? null : payload.gatewayId,
          agentId: payload.agentId === "none" ? null : payload.agentId,
        });
        return res.json();
      } else {
        const res = await apiRequest("POST", "/api/user/sip-phone-numbers", {
          phoneNumber: payload.phoneNumber,
          label: payload.label,
          gatewayId: payload.gatewayId === "none" ? null : payload.gatewayId,
          agentId: payload.agentId === "none" ? null : payload.agentId,
        });
        return res.json();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user/sip-phone-numbers"] });
      setPhoneDialogOpen(false);
      setEditingPhone(null);
      setPhoneNumber("");
      setPhoneLabel("");
      setPhoneGatewayId("none");
      setPhoneAgentId("none");
      toast({
        title: editingPhone ? "Phone number updated" : "Phone number imported",
        description: editingPhone
          ? "Phone number details have been updated."
          : "Your phone number has been imported.",
      });
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message || "Failed to save phone number", variant: "destructive" });
    },
  });

  const deletePhoneMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("DELETE", `/api/user/sip-phone-numbers/${id}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user/sip-phone-numbers"] });
      setPhoneDeleteTarget(null);
      toast({ title: "Phone number removed" });
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  // ── Handlers ──
  const openAddGateway = () => {
    setEditingGateway(null);
    setGwForm(emptyGatewayForm());
    setGatewayDialogOpen(true);
  };

  const openEditGateway = (gw: UserSipGateway) => {
    setEditingGateway(gw);
    setGwForm({
      name: gw.name,
      username: gw.username,
      password: gw.password,
      proxy: gw.proxy,
      register: gw.register,
      callerIdInFrom: gw.caller_id_in_from,
    });
    setGatewayDialogOpen(true);
  };

  const openAddPhone = () => {
    setEditingPhone(null);
    setPhoneNumber("");
    setPhoneLabel("");
    setPhoneGatewayId(gateways.find(g => g.is_active)?.id || (gateways[0]?.id) || "none");
    setPhoneAgentId("none");
    setPhoneDialogOpen(true);
  };

  const openEditPhone = (phone: UserSipPhoneNumber) => {
    setEditingPhone(phone);
    setPhoneNumber(phone.phone_number);
    setPhoneLabel(phone.label || "");
    
    // Fallback to 'none' if the linked gateway is deleted or not in the user's list
    const hasGateway = gateways.some(g => g.id === phone.gateway_id);
    setPhoneGatewayId(hasGateway ? (phone.gateway_id || "none") : "none");
    
    setPhoneAgentId(phone.agent_id || "none");
    setPhoneDialogOpen(true);
  };

  const handleSaveGateway = () => {
    if (!gwForm.name.trim() || !gwForm.username.trim() || !gwForm.password.trim() || !gwForm.proxy.trim()) {
      toast({ title: "Validation error", description: "Name, Username, Password, and Proxy are all required.", variant: "destructive" });
      return;
    }
    saveGatewayMutation.mutate(gwForm);
  };

  const handleSavePhone = async () => {
    if (!phoneNumber.trim()) {
      toast({ title: "Validation error", description: "Phone number is required.", variant: "destructive" });
      return;
    }

    savePhoneMutation.mutate({
      phoneNumber: phoneNumber.trim(),
      label: phoneLabel.trim() || undefined,
      gatewayId: phoneGatewayId,
      agentId: phoneAgentId,
    });
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="space-y-8">

      {/* ── SIP Gateways Section ─────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-sm">
              <Server className="h-4.5 w-4.5 text-white h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">SIP Gateways & Carrier Trunks</h2>
              <p className="text-sm text-muted-foreground">Your carrier SIP credentials (CallHippo, TeleCMI, VoiceLink, Exotel, Twilio BYOC, Tata, Airtel) routed directly through Cloud Streaming Engine (Zero PBX)</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetchGateways()}
              disabled={gatewaysLoading}
            >
              <RefreshCw className={`h-4 w-4 ${gatewaysLoading ? "animate-spin" : ""}`} />
            </Button>
            <Button size="sm" id="add-sip-gateway-btn" onClick={openAddGateway}>
              <Plus className="h-4 w-4 mr-1.5" />
              Add SIP Gateway / Trunk
            </Button>
          </div>
        </div>

        {gatewaysLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2].map(i => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="h-5 bg-muted rounded w-1/2 mb-3" />
                <div className="h-4 bg-muted rounded w-full mb-2" />
                <div className="h-4 bg-muted rounded w-3/4" />
              </Card>
            ))}
          </div>
        ) : gateways.length === 0 ? (
          <Card className="p-10 text-center border-dashed">
            <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 flex items-center justify-center">
              <Server className="h-7 w-7 text-indigo-500 dark:text-indigo-400" />
            </div>
            <h3 className="text-base font-semibold mb-1">No SIP Gateways Connected Yet</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-sm mx-auto">
              Add your carrier SIP trunk credentials (CallHippo, TeleCMI, VoiceLink, Exotel, Twilio, Tata, Airtel) to route inbound and outbound calls with sub-100ms real-time audio.
            </p>
            <Button onClick={openAddGateway}>
              <Plus className="h-4 w-4 mr-2" />
              Add SIP Gateway Credentials
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {gateways.map(gw => (
              <Card
                key={gw.id}
                className={`p-5 relative transition-all duration-200 ${gw.is_active ? "ring-2 ring-indigo-500/60 shadow-indigo-100 dark:shadow-indigo-900/20 shadow-md" : ""}`}
              >
                {/* Active ribbon */}
                {gw.is_active && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-2 py-0.5 gap-1">
                      <Zap className="h-3 w-3" />
                      Active
                    </Badge>
                  </div>
                )}

                <div className="mb-3 pr-20">
                  <h3 className="font-semibold text-base truncate">{gw.name}</h3>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5 truncate">{gw.proxy}</p>
                </div>

                <div className="space-y-1.5 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <KeyRound className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="font-mono truncate">{gw.username}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Globe className="h-3.5 w-3.5 flex-shrink-0" />
                    <span>{gw.register ? "SIP Registration" : "IP Authentication"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Shield className="h-3.5 w-3.5 flex-shrink-0" />
                    <span>Caller-ID in From: {gw.caller_id_in_from ? "Yes" : "No"}</span>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t flex gap-2">
                  {!gw.is_active && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-indigo-600 border-indigo-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                      onClick={() => {
                        activateGatewayMutation.mutate(gw.id);
                      }}
                      disabled={activateGatewayMutation.isPending}
                    >
                      {activateGatewayMutation.isPending ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <CheckCircle className="h-3.5 w-3.5 mr-1" />
                      )}
                      Set Active
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditGateway(gw)}
                  >
                    <Edit className="h-3.5 w-3.5 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => setGatewayDeleteTarget(gw)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* ── Wholesale SIP Phone Numbers Section ─────────────── */}
      <section className="space-y-4">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-border/40">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Telephony Configurations & Phone Numbers
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Connect carrier accounts (Twilio, Exotel, Plivo, Telnyx, Cloudonix, Asterisk, and Indian SIP) with 1-click Inbound AI Agent routing.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                refetchGateways();
                refetchPhones();
              }}
              disabled={phonesLoading}
              title="Refresh"
            >
              <RefreshCw className={`h-4 w-4 ${phonesLoading ? "animate-spin" : ""}`} />
            </Button>
            <Button
              size="sm"
              id="add-telephony-config-btn"
              onClick={() => {
                setEditingConfig(null);
                setUnifiedDialogOpen(true);
              }}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm"
            >
              <Plus className="h-4 w-4 mr-1.5" />
              Add Configuration
            </Button>
            <Button
              size="sm"
              id="add-phone-number-btn"
              onClick={openAddPhone}
              variant="outline"
              className="border-border/80 font-medium"
            >
              <Phone className="h-4 w-4 mr-1.5" />
              Add Phone Number
            </Button>
          </div>
        </div>

        {/* Dograh Top Provider Cards Grid */}
        <ProviderCardsGrid
          items={configItems}
          onAddConfig={() => {
            setEditingConfig(null);
            setUnifiedDialogOpen(true);
          }}
          onEditConfig={(item) => {
            setEditingConfig(item);
            setUnifiedDialogOpen(true);
          }}
          onDeleteConfig={(item) => {
            setGatewayDeleteTarget(item.credentials as UserSipGateway);
          }}
          onSetDefault={(item) => {
            setDefaultOutboundId(item.id);
            toast({
              title: "Default Outbound Configured",
              description: `${item.name} set as default for outbound calls.`,
            });
          }}
        />

        {phonesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2].map(i => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="h-5 bg-muted rounded w-1/2 mb-3" />
                <div className="h-4 bg-muted rounded w-full mb-2" />
              </Card>
            ))}
          </div>
        ) : phones.length === 0 ? (
          <Card className="p-10 text-center border-dashed">
            <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-900/40 dark:to-emerald-900/40 flex items-center justify-center">
              <Phone className="h-7 w-7 text-teal-500 dark:text-teal-400" />
            </div>
            <h3 className="text-base font-semibold mb-1">No Phone Numbers Connected Yet</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-sm mx-auto">
              Connect your Indian & Global SIP phone numbers (CallHippo, TeleCMI, Exotel, VoiceLink) or import directly from Twilio.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Button onClick={openAddPhone} className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-sm">
                <Plus className="h-4 w-4 mr-2" />
                Connect Carrier / SIP Number
              </Button>
              <Button onClick={() => setTwilioImportOpen(true)} variant="outline">
                <KeyRound className="h-4 w-4 mr-2" />
                Connect Carrier / Twilio / SIP
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {phones.map(phone => (
              <Card key={phone.id} className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold font-mono text-base truncate">{phone.phone_number}</h3>
                    {phone.label && (
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">{phone.label}</p>
                    )}
                  </div>
                  <Badge variant={phone.is_active ? "default" : "secondary"} className="ml-2 flex-shrink-0">
                    {phone.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>

                {phone.gateway_name ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Server className="h-3.5 w-3.5 flex-shrink-0 text-indigo-500" />
                    <span className="truncate">
                      Via <span className="font-medium text-foreground">{phone.gateway_name}</span>
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Circle className="h-3.5 w-3.5 flex-shrink-0" />
                    <span>No gateway linked</span>
                  </div>
                )}

                <div className="mt-3 pt-2.5 border-t border-border/50">
                  <Label className="text-[11px] font-semibold text-muted-foreground uppercase flex items-center gap-1.5 mb-1.5">
                    <User className="h-3 w-3 text-primary" />
                    Inbound AI Agent (1-Click Rebind)
                  </Label>
                  <Select
                    value={phone.agent_id || "none"}
                    onValueChange={(val) => handleQuickAgentAssign(phone, val)}
                  >
                    <SelectTrigger className="h-8 text-xs bg-background border-border/80 font-medium">
                      <SelectValue placeholder="Assign AI Agent" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none" className="text-xs text-muted-foreground">-- None (Unassigned) --</SelectItem>
                      {agents.map((a) => (
                        <SelectItem key={a.id} value={a.id} className="text-xs font-medium">
                          🤖 {a.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4 mt-4 border-t flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => openEditPhone(phone)}
                  >
                    <Edit className="h-3.5 w-3.5 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => setPhoneDeleteTarget(phone)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* ══ Gateway Add/Edit Dialog ══════════════════════════════════════════ */}
      <Dialog open={gatewayDialogOpen} onOpenChange={open => { if (!open) { setGatewayDialogOpen(false); setEditingGateway(null); setGwForm(emptyGatewayForm()); } }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingGateway ? "Edit SIP Gateway Credentials" : "Add Carrier SIP Trunk / Gateway"}</DialogTitle>
            <DialogDescription>
              Enter your carrier SIP trunk credentials (username, password, proxy host) from your VoIP provider (CallHippo, TeleCMI, Exotel, VoiceLink, Twilio BYOC, Tata, Airtel, Telnyx).
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Quick Carrier Preset */}
            {!editingGateway && (
              <div>
                <Label className="text-xs mb-1.5 block font-medium">Quick Carrier Preset</Label>
                <div className="flex flex-wrap gap-1.5">
                  {SIP_PRESETS.map(p => (
                    <Button
                      key={p.id}
                      type="button"
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs px-2.5"
                      onClick={() => {
                        setGwForm(f => ({
                          ...f,
                          name: p.name !== "Custom SIP" ? `${p.name} Trunk` : f.name,
                          proxy: p.proxy,
                          register: p.register,
                        }));
                      }}
                    >
                      {p.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Name */}
            <div className="space-y-1.5">
              <Label htmlFor="gw-name">Gateway Name <span className="text-destructive">*</span></Label>
              <Input
                id="gw-name"
                placeholder="e.g. My Telnyx Gateway"
                value={gwForm.name}
                onChange={e => setGwForm(f => ({ ...f, name: e.target.value }))}
              />
            </div>

            {/* Username */}
            <div className="space-y-1.5">
              <Label htmlFor="gw-username">SIP Username <span className="text-destructive">*</span></Label>
              <Input
                id="gw-username"
                placeholder="e.g. john@sip.example.com"
                value={gwForm.username}
                onChange={e => setGwForm(f => ({ ...f, username: e.target.value }))}
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label htmlFor="gw-password">SIP Password <span className="text-destructive">*</span></Label>
              <Input
                id="gw-password"
                type="password"
                placeholder="••••••••"
                value={gwForm.password}
                onChange={e => setGwForm(f => ({ ...f, password: e.target.value }))}
              />
            </div>

            {/* Proxy */}
            <div className="space-y-1.5">
              <Label htmlFor="gw-proxy">Proxy / SIP Host <span className="text-destructive">*</span></Label>
              <Input
                id="gw-proxy"
                placeholder="e.g. sip.telnyx.com"
                value={gwForm.proxy}
                onChange={e => setGwForm(f => ({ ...f, proxy: e.target.value }))}
              />
              <p className="text-xs text-muted-foreground">The SIP server hostname or IP address.</p>
            </div>

            {/* Register */}
            <div className="flex items-center justify-between rounded-lg border p-3.5">
              <div>
                <p className="text-sm font-medium">SIP Registration</p>
                <p className="text-xs text-muted-foreground">Enable if your provider requires SIP REGISTER (most do)</p>
              </div>
              <Switch
                checked={gwForm.register}
                onCheckedChange={v => setGwForm(f => ({ ...f, register: v }))}
              />
            </div>

            {/* Caller ID in From */}
            <div className="flex items-center justify-between rounded-lg border p-3.5">
              <div>
                <p className="text-sm font-medium">Caller-ID in From Header</p>
                <p className="text-xs text-muted-foreground">Include phone number in SIP From header</p>
              </div>
              <Switch
                checked={gwForm.callerIdInFrom}
                onCheckedChange={v => setGwForm(f => ({ ...f, callerIdInFrom: v }))}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => { setGatewayDialogOpen(false); setEditingGateway(null); setGwForm(emptyGatewayForm()); }}>
              Cancel
            </Button>
            <Button onClick={handleSaveGateway} disabled={saveGatewayMutation.isPending}>
              {saveGatewayMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {editingGateway ? "Save Changes" : "Add Gateway"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ══ Connect / Edit SIP Phone Number Dialog ════════════════════════════════════ */}
      <Dialog open={phoneDialogOpen} onOpenChange={open => { if (!open) { setPhoneDialogOpen(false); setEditingPhone(null); setPhoneNumber(""); setPhoneLabel(""); setPhoneGatewayId("none"); setPhoneAgentId("none"); } }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-emerald-600" />
              {editingPhone ? "Edit SIP Phone Number" : "Connect SIP Phone Number"}
            </DialogTitle>
            <DialogDescription>
              {editingPhone
                ? "Update the label, linked trunk, or assigned AI agent for this phone number."
                : "Connect a direct inward dialing (DID) number and route inbound calls to your AI voice agents."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Phone Number (only for add) */}
            {!editingPhone && (
              <div className="space-y-1.5">
                <Label htmlFor="phone-number">Phone Number (DID) <span className="text-destructive">*</span></Label>
                <Input
                  id="phone-number"
                  placeholder="+12025550199 or +919876543210"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground">Enter your DID in international E.164 format (with country code).</p>
              </div>
            )}

            {/* Label */}
            <div className="space-y-1.5">
              <Label htmlFor="phone-label">Label (optional)</Label>
              <Input
                id="phone-label"
                placeholder="e.g. Inbound Sales Line, Support Hotline"
                value={phoneLabel}
                onChange={e => setPhoneLabel(e.target.value)}
              />
            </div>

            {/* Agent link */}
            <div className="space-y-1.5">
              <Label>Assign to AI Voice Agent</Label>
              <Select value={phoneAgentId} onValueChange={setPhoneAgentId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an AI agent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">— No agent (Inbound unassigned) —</SelectItem>
                  {agents.map(agent => (
                    <SelectItem key={agent.id} value={agent.id}>
                      {agent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">The AI Voice Agent that answers inbound calls to this number.</p>
            </div>

            {/* Link to SIP Gateway / Trunk */}
            <div className="space-y-1.5">
              <Label>Linked SIP Trunk / Carrier</Label>
              <Select value={phoneGatewayId} onValueChange={setPhoneGatewayId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gateway" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">— Default / Direct Cloud Engine (Pipecat) —</SelectItem>
                  {gateways.map(gw => (
                    <SelectItem key={gw.id} value={gw.id}>
                      {gw.name} ({gw.proxy}) {gw.is_active ? "★ Active" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Select the SIP Gateway configured in the SIP Gateways tab below.</p>
            </div>
          </div>

          <DialogFooter className="gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => { setPhoneDialogOpen(false); setEditingPhone(null); setPhoneNumber(""); setPhoneLabel(""); setPhoneGatewayId("none"); setPhoneAgentId("none"); }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSavePhone}
              disabled={savePhoneMutation.isPending}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {savePhoneMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {editingPhone ? "Save Changes" : "Connect Phone Number"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ══ Unified Carrier & DID Connection Dialog ══════════════════════════════════ */}
      <Dialog open={twilioImportOpen} onOpenChange={setTwilioImportOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-foreground">Connect Carrier & Phone Number</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Connect phone numbers via Twilio API or Indian & Global SIP Trunks (CallHippo, TeleCMI, Exotel, VoiceLink).
            </DialogDescription>
          </DialogHeader>

          <Tabs value={importCarrierTab} onValueChange={(v: any) => setImportCarrierTab(v)} className="w-full pt-1">
            <TabsList className="grid grid-cols-2 w-full mb-4">
              <TabsTrigger value="twilio" className="text-xs sm:text-sm">
                <KeyRound className="h-3.5 w-3.5 mr-1.5 text-indigo-500" />
                Twilio DID
              </TabsTrigger>
              <TabsTrigger value="sip" className="text-xs sm:text-sm">
                <Server className="h-3.5 w-3.5 mr-1.5 text-emerald-500" />
                Indian Carrier / SIP Trunk
              </TabsTrigger>
            </TabsList>

            {/* Twilio Carrier Tab */}
            <TabsContent value="twilio" className="space-y-4 pt-1">
              <div className="space-y-1.5">
                <Label htmlFor="twilio-phone" className="text-sm font-medium">
                  Phone Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="twilio-phone"
                  placeholder="+1234567890"
                  value={twilioPhone}
                  onChange={e => setTwilioPhone(e.target.value)}
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground">
                  Enter your Twilio phone number in E.164 format (e.g., +1234567890)
                </p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="twilio-sid" className="text-sm font-medium">
                  Twilio Account SID <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="twilio-sid"
                  placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  value={twilioAccountSid}
                  onChange={e => setTwilioAccountSid(e.target.value)}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Find this in your Twilio Console dashboard
                </p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="twilio-token" className="text-sm font-medium">
                  Twilio Auth Token <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="twilio-token"
                    type={showTwilioToken ? "text" : "password"}
                    placeholder="••••••••••••••••••••••••••••••••"
                    value={twilioAuthToken}
                    onChange={e => setTwilioAuthToken(e.target.value)}
                    className="font-mono text-sm pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground"
                    onClick={() => setShowTwilioToken(!showTwilioToken)}
                  >
                    {showTwilioToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your Twilio Auth Token for API authentication
                </p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="twilio-label" className="text-sm font-medium">
                  Label (optional)
                </Label>
                <Input
                  id="twilio-label"
                  placeholder="e.g. Sales Line, Support Hotline"
                  value={twilioLabel}
                  onChange={e => setTwilioLabel(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="space-y-0.5">
                  <Label htmlFor="twilio-sms" className="text-sm font-medium">SMS Enabled</Label>
                  <p className="text-xs text-muted-foreground">Allow this number to send and receive SMS messages</p>
                </div>
                <Switch
                  id="twilio-sms"
                  checked={twilioSmsEnabled}
                  onCheckedChange={setTwilioSmsEnabled}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Assign to AI Voice Agent</Label>
                <Select value={twilioAgentId} onValueChange={setTwilioAgentId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an agent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">— No agent (Inbound unassigned) —</SelectItem>
                    {agents.map(agent => (
                      <SelectItem key={agent.id} value={agent.id}>
                        {agent.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter className="gap-2 pt-3 sm:justify-end">
                <Button variant="outline" onClick={() => setTwilioImportOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (!twilioPhone.trim() || !twilioAccountSid.trim() || !twilioAuthToken.trim()) {
                      toast({
                        title: "Validation Error",
                        description: "Phone Number, Twilio Account SID, and Twilio Auth Token are required.",
                        variant: "destructive"
                      });
                      return;
                    }
                    importTwilioMutation.mutate({
                      phoneNumber: twilioPhone.trim(),
                      accountSid: twilioAccountSid.trim(),
                      authToken: twilioAuthToken.trim(),
                      label: twilioLabel.trim() || undefined,
                      smsEnabled: twilioSmsEnabled,
                      agentId: twilioAgentId !== "none" ? twilioAgentId : undefined,
                    });
                  }}
                  disabled={importTwilioMutation.isPending}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
                >
                  {importTwilioMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Connect Twilio Number
                </Button>
              </DialogFooter>
            </TabsContent>

            {/* Indian Carrier / SIP Tab */}
            <TabsContent value="sip" className="space-y-4 pt-1">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Carrier Preset</Label>
                <Select
                  value={sipPresetSelected}
                  onValueChange={presetId => {
                    setSipPresetSelected(presetId);
                    const preset = SIP_PRESETS.find(p => p.id === presetId);
                    if (preset) {
                      setSipCarrierName(preset.name);
                      setSipCarrierProxy(preset.proxy);
                      setSipCarrierRegister(preset.register);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose Carrier" />
                  </SelectTrigger>
                  <SelectContent>
                    {SIP_PRESETS.map(preset => (
                      <SelectItem key={preset.id} value={preset.id}>
                        {preset.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Select your carrier to auto-populate default SIP settings</p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="sip-phone" className="text-sm font-medium">
                  Phone Number / DID <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="sip-phone"
                  placeholder="+919876543210 or 08045678900"
                  value={sipCarrierPhone}
                  onChange={e => setSipCarrierPhone(e.target.value)}
                  className="font-mono"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2 space-y-1.5">
                  <Label htmlFor="sip-proxy" className="text-sm font-medium">
                    SIP Proxy / Host <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="sip-proxy"
                    placeholder="sip.carrier.com"
                    value={sipCarrierProxy}
                    onChange={e => setSipCarrierProxy(e.target.value)}
                    className="font-mono text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sip-port" className="text-sm font-medium">Port</Label>
                  <Input
                    id="sip-port"
                    type="number"
                    value={sipCarrierPort}
                    onChange={e => setSipCarrierPort(Number(e.target.value) || 5060)}
                    className="font-mono text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="sip-user" className="text-sm font-medium">
                    SIP Username <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="sip-user"
                    placeholder="Username or Extension"
                    value={sipCarrierUsername}
                    onChange={e => setSipCarrierUsername(e.target.value)}
                    className="font-mono text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sip-pass" className="text-sm font-medium">SIP Password</Label>
                  <div className="relative">
                    <Input
                      id="sip-pass"
                      type={showSipPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={sipCarrierPassword}
                      onChange={e => setSipCarrierPassword(e.target.value)}
                      className="font-mono text-sm pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground"
                      onClick={() => setShowSipPassword(!showSipPassword)}
                    >
                      {showSipPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="space-y-0.5">
                  <Label htmlFor="sip-reg" className="text-sm font-medium">SIP Registration</Label>
                  <p className="text-xs text-muted-foreground">Register gateway with carrier for inbound calls</p>
                </div>
                <Switch
                  id="sip-reg"
                  checked={sipCarrierRegister}
                  onCheckedChange={setSipCarrierRegister}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Assign to AI Voice Agent</Label>
                <Select value={sipCarrierAgentId} onValueChange={setSipCarrierAgentId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an agent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">— No agent (Inbound unassigned) —</SelectItem>
                    {agents.map(agent => (
                      <SelectItem key={agent.id} value={agent.id}>
                        {agent.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter className="gap-2 pt-3 sm:justify-end">
                <Button variant="outline" onClick={() => setTwilioImportOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleConnectSipCarrier}
                  disabled={sipConnecting}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
                >
                  {sipConnecting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Connect Carrier Number
                </Button>
              </DialogFooter>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* ══ Gateway Delete Confirmation ══════════════════════════════════════ */}
      <AlertDialog open={!!gatewayDeleteTarget} onOpenChange={open => { if (!open) setGatewayDeleteTarget(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Gateway</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{gatewayDeleteTarget?.name}</strong>? Phone numbers linked to this gateway will be unlinked. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
              onClick={() => {
                gatewayDeleteTarget && deleteGatewayMutation.mutate(gatewayDeleteTarget.id);
              }}
              disabled={deleteGatewayMutation.isPending}
            >
              {deleteGatewayMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Delete Gateway
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ══ Phone Delete Confirmation ════════════════════════════════════════ */}
      <AlertDialog open={!!phoneDeleteTarget} onOpenChange={open => { if (!open) setPhoneDeleteTarget(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Phone Number</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove <strong>{phoneDeleteTarget?.phone_number}</strong> from your account? This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
              onClick={() => {
                phoneDeleteTarget && deletePhoneMutation.mutate(phoneDeleteTarget.id);
              }}
              disabled={deletePhoneMutation.isPending}
            >
              {deletePhoneMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ══ Dograh Unified Telephony Dialog ════════════════════════════════ */}
      <UnifiedTelephonyDialog
        open={unifiedDialogOpen}
        onOpenChange={setUnifiedDialogOpen}
        existingConfig={editingConfig}
        onSaved={() => {
          refetchGateways();
          refetchPhones();
        }}
      />

    </div>
  );
}
