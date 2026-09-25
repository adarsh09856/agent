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
} from "lucide-react";

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
  { id: "telnyx", name: "Telnyx", proxy: "sip.telnyx.com", register: true },
  { id: "twilio", name: "Twilio BYOC", proxy: "sip.twilio.com", register: false },
  { id: "tata", name: "Tata Tele", proxy: "sip.tatatelebusiness.com", register: true },
  { id: "airtel", name: "Airtel IQ", proxy: "sip.airtel.in", register: true },
  { id: "zadarma", name: "Zadarma", proxy: "sip.zadarma.com", register: true },
  { id: "voipms", name: "VoipMS", proxy: "newyork.voip.ms", register: true },
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

  // In-modal all-in-one SIP trunk credential state
  const [phoneTrunkMode, setPhoneTrunkMode] = useState<"existing" | "new">("new");
  const [phoneGwPreset, setPhoneGwPreset] = useState("telnyx");
  const [phoneGwName, setPhoneGwName] = useState("Telnyx Primary");
  const [phoneGwProxy, setPhoneGwProxy] = useState("sip.telnyx.com");
  const [phoneGwUsername, setPhoneGwUsername] = useState("");
  const [phoneGwPassword, setPhoneGwPassword] = useState("");
  const [phoneGwRegister, setPhoneGwRegister] = useState(true);
  const [isSubmittingAllInOne, setIsSubmittingAllInOne] = useState(false);

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

  const applyPreset = (presetId: string) => {
    setPhoneGwPreset(presetId);
    const p = SIP_PRESETS.find(x => x.id === presetId);
    if (p) {
      if (p.id !== "custom") {
        setPhoneGwName(`${p.name} Trunk`);
      }
      setPhoneGwProxy(p.proxy);
      setPhoneGwRegister(p.register);
    }
  };

  // ── Gateway mutations ──
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
    setPhoneTrunkMode(gateways.length > 0 ? "existing" : "new");
    setPhoneGatewayId(gateways.find(g => g.is_active)?.id || (gateways[0]?.id) || "none");
    setPhoneAgentId("none");
    applyPreset("telnyx");
    setPhoneGwUsername("");
    setPhoneGwPassword("");
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
    if (!editingPhone && !phoneNumber.trim()) {
      toast({ title: "Validation error", description: "Phone number is required.", variant: "destructive" });
      return;
    }

    if (editingPhone) {
      savePhoneMutation.mutate({
        phoneNumber: phoneNumber.trim(),
        label: phoneLabel.trim() || undefined,
        gatewayId: phoneGatewayId,
        agentId: phoneAgentId,
      });
      return;
    }

    // Creating new phone number
    if (phoneTrunkMode === "new") {
      if (!phoneGwName.trim() || !phoneGwUsername.trim() || !phoneGwPassword.trim() || !phoneGwProxy.trim()) {
        toast({
          title: "Validation error",
          description: "All SIP trunk credentials (Trunk Name, Username, Password, Proxy Host) are required.",
          variant: "destructive",
        });
        return;
      }

      setIsSubmittingAllInOne(true);
      try {
        // 1. Create the SIP Gateway
        const gwRes = await apiRequest("POST", "/api/user/sip-gateways", {
          name: phoneGwName.trim(),
          username: phoneGwUsername.trim(),
          password: phoneGwPassword.trim(),
          proxy: phoneGwProxy.trim(),
          register: phoneGwRegister,
          callerIdInFrom: true,
        });
        const gwJson = await gwRes.json();
        const createdGwId = gwJson?.data?.id;

        // 2. Activate it
        if (createdGwId) {
          await apiRequest("POST", `/api/user/sip-gateways/${createdGwId}/activate`).catch(() => {});
        }

        // 3. Create phone number linked to new gateway
        await apiRequest("POST", "/api/user/sip-phone-numbers", {
          phoneNumber: phoneNumber.trim(),
          label: phoneLabel.trim() || undefined,
          gatewayId: createdGwId || null,
          agentId: phoneAgentId === "none" ? null : phoneAgentId,
        });

        // 4. Invalidate and close
        queryClient.invalidateQueries({ queryKey: ["/api/user/sip-gateways"] });
        queryClient.invalidateQueries({ queryKey: ["/api/user/sip-phone-numbers"] });
        setPhoneDialogOpen(false);
        toast({
          title: "Phone Number & SIP Trunk Connected!",
          description: `${phoneNumber.trim()} is now active on FreeSWITCH linked to ${phoneGwName.trim()}.`,
        });
      } catch (err: any) {
        toast({
          title: "Connection Failed",
          description: err.message || "Failed to create SIP trunk and phone number",
          variant: "destructive",
        });
      } finally {
        setIsSubmittingAllInOne(false);
      }
    } else {
      // Existing gateway
      savePhoneMutation.mutate({
        phoneNumber: phoneNumber.trim(),
        label: phoneLabel.trim() || undefined,
        gatewayId: phoneGatewayId,
        agentId: phoneAgentId,
      });
    }
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
              <h2 className="text-lg font-semibold">SIP Gateways & Wholesale Trunks</h2>
              <p className="text-sm text-muted-foreground">Your wholesale SIP credentials (Telnyx, Twilio BYOC, Tata, Airtel, DIDLogic, VoipMS) routed through FreeSWITCH</p>
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
              Add your wholesale SIP trunk credentials (Telnyx, Twilio BYOC, Tata, Airtel, DIDLogic, VoipMS) to route inbound and outbound calls through FreeSWITCH.
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-sm">
              <Phone className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Phone Numbers (DIDs)</h2>
              <p className="text-sm text-muted-foreground">Phone numbers (DIDs) routed through your SIP trunk credentials to AI agents</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetchPhones()}
              disabled={phonesLoading}
            >
              <RefreshCw className={`h-4 w-4 ${phonesLoading ? "animate-spin" : ""}`} />
            </Button>
            <Button size="sm" id="add-phone-number-btn" onClick={openAddPhone} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Plus className="h-4 w-4 mr-1.5" />
              Connect Phone Number
            </Button>
          </div>
        </div>

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
              Connect your phone numbers (DIDs) directly with your SIP credentials to route incoming and outgoing calls through FreeSWITCH.
            </p>
            <Button onClick={openAddPhone} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Connect Phone Number
            </Button>
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

                {phone.agent_id ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                    <User className="h-3.5 w-3.5 flex-shrink-0 text-teal-500" />
                    <span className="truncate">
                      Agent: <span className="font-medium text-foreground">{agents.find(a => a.id === phone.agent_id)?.name || "Assigned"}</span>
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                    <User className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
                    <span>No agent assigned</span>
                  </div>
                )}

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
            <DialogTitle>{editingGateway ? "Edit SIP Gateway Credentials" : "Add Wholesale SIP Trunk / Gateway"}</DialogTitle>
            <DialogDescription>
              Enter your wholesale SIP trunk credentials (username, password, proxy host) from your VoIP provider (Telnyx, Twilio BYOC, Tata, Airtel, Zadarma, VoipMS).
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
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

      {/* ══ All-in-One Phone Number & Credentials Dialog ════════════════════════════════════ */}
      <Dialog open={phoneDialogOpen} onOpenChange={open => { if (!open) { setPhoneDialogOpen(false); setEditingPhone(null); setPhoneNumber(""); setPhoneLabel(""); setPhoneGatewayId("none"); setPhoneAgentId("none"); } }}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPhone ? "Edit Phone Number" : "Connect Phone Number"}</DialogTitle>
            <DialogDescription>
              {editingPhone
                ? "Update the label, linked trunk, or assigned AI agent for this phone number."
                : "Connect your phone number (DID) with your wholesale SIP credentials to route calls to FreeSWITCH."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Phone Number (only for add) */}
            {!editingPhone && (
              <div className="space-y-1.5">
                <Label htmlFor="phone-number">Phone Number <span className="text-destructive">*</span></Label>
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
                placeholder="e.g. Main Sales Line, Support Hotline"
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

            {/* SIP Credentials Section */}
            {!editingPhone ? (
              <div className="rounded-xl border p-4 bg-muted/20 space-y-3 mt-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold flex items-center gap-1.5">
                    <KeyRound className="h-4 w-4 text-emerald-600" />
                    SIP Trunk & Carrier Credentials
                  </Label>
                  {gateways.length > 0 && (
                    <div className="flex items-center gap-1 bg-muted p-1 rounded-lg text-xs">
                      <button
                        type="button"
                        onClick={() => setPhoneTrunkMode("existing")}
                        className={`px-2.5 py-1 rounded font-medium transition-all ${phoneTrunkMode === "existing" ? "bg-background shadow-xs text-foreground" : "text-muted-foreground"}`}
                      >
                        Saved Trunk
                      </button>
                      <button
                        type="button"
                        onClick={() => setPhoneTrunkMode("new")}
                        className={`px-2.5 py-1 rounded font-medium transition-all ${phoneTrunkMode === "new" ? "bg-background shadow-xs text-foreground" : "text-muted-foreground"}`}
                      >
                        + New Trunk
                      </button>
                    </div>
                  )}
                </div>

                {phoneTrunkMode === "existing" && gateways.length > 0 ? (
                  <div className="space-y-2 pt-1">
                    <Label className="text-xs">Select Connected SIP Trunk</Label>
                    <Select value={phoneGatewayId} onValueChange={setPhoneGatewayId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gateway" />
                      </SelectTrigger>
                      <SelectContent>
                        {gateways.map(gw => (
                          <SelectItem key={gw.id} value={gw.id}>
                            {gw.name} ({gw.proxy}) {gw.is_active ? "★ Active" : ""}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <div className="space-y-3 pt-1">
                    <div>
                      <Label className="text-xs mb-1.5 block">Quick Carrier Preset</Label>
                      <div className="flex flex-wrap gap-1.5">
                        {SIP_PRESETS.map(p => (
                          <Button
                            key={p.id}
                            type="button"
                            size="sm"
                            variant={phoneGwPreset === p.id ? "default" : "outline"}
                            className="h-7 text-xs px-2.5"
                            onClick={() => applyPreset(p.id)}
                          >
                            {p.name}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="new-gw-name" className="text-xs">Trunk Label <span className="text-destructive">*</span></Label>
                        <Input
                          id="new-gw-name"
                          placeholder="e.g. Telnyx Trunk"
                          value={phoneGwName}
                          onChange={e => setPhoneGwName(e.target.value)}
                          className="h-8 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="new-gw-proxy" className="text-xs">SIP Host / Proxy <span className="text-destructive">*</span></Label>
                        <Input
                          id="new-gw-proxy"
                          placeholder="sip.telnyx.com"
                          value={phoneGwProxy}
                          onChange={e => setPhoneGwProxy(e.target.value)}
                          className="h-8 text-xs font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="new-gw-user" className="text-xs">SIP Username <span className="text-destructive">*</span></Label>
                        <Input
                          id="new-gw-user"
                          placeholder="SIP username or Auth ID"
                          value={phoneGwUsername}
                          onChange={e => setPhoneGwUsername(e.target.value)}
                          className="h-8 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="new-gw-pass" className="text-xs">SIP Password <span className="text-destructive">*</span></Label>
                        <Input
                          id="new-gw-pass"
                          type="password"
                          placeholder="SIP secret / password"
                          value={phoneGwPassword}
                          onChange={e => setPhoneGwPassword(e.target.value)}
                          className="h-8 text-xs"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs text-muted-foreground">Register with carrier (SIP REGISTER)</span>
                      <Switch
                        checked={phoneGwRegister}
                        onCheckedChange={setPhoneGwRegister}
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* When editing phone, just choose trunk */
              <div className="space-y-1.5">
                <Label>Link to SIP Gateway / Trunk</Label>
                <Select value={phoneGatewayId} onValueChange={setPhoneGatewayId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gateway" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">— No gateway —</SelectItem>
                    {gateways.map(gw => (
                      <SelectItem key={gw.id} value={gw.id}>
                        {gw.name} ({gw.proxy})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
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
              disabled={isSubmittingAllInOne || savePhoneMutation.isPending}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {(isSubmittingAllInOne || savePhoneMutation.isPending) && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {editingPhone ? "Save Changes" : "Connect Phone Number"}
            </Button>
          </DialogFooter>
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

    </div>
  );
}
