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

import { useState, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import {
  Plus,
  Phone,
  Server,
  Star,
  Copy,
  Pencil,
  Trash2,
  ChevronRight,
  Bot,
  RefreshCw,
  Search,
  ShoppingCart,
  ShieldCheck,
  KeyRound,
  Loader2,
  Globe,
  Radio,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { UnifiedTelephonyDialog } from "@/components/telephony/UnifiedTelephonyDialog";

// ─── Types ──────────────────────────────────────────────────────────────────

interface TelephonyConfig {
  id: string | number;
  name: string;
  provider: string;
  proxy?: string;
  username?: string;
  is_default_outbound?: boolean;
  phone_number_count?: number;
  is_active?: boolean;
  created_at?: string;
}

interface SipPhoneNumber {
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

interface TwilioPhoneNumber {
  id: string;
  phoneNumber: string;
  twilioSid: string;
  friendlyName?: string;
  country: string;
  status: string;
  isSystemPool?: boolean;
  purchasedAt?: string;
  createdAt?: string;
}

interface IncomingConnectionItem {
  id: string;
  agentId: string;
  phoneNumberId: string;
  agent?: {
    id: string;
    name: string;
    telephonyProvider?: string;
  };
}

interface Agent {
  id: string;
  name: string;
  telephonyProvider?: string;
}

interface UnifiedPhoneNumber {
  id: string;
  source: "sip" | "twilio";
  phoneNumber: string;
  label: string | null;
  gatewayName: string;
  provider: string;
  agentId: string | null;
  isActive: boolean;
  connectionId?: string;
  raw: any;
}

interface AvailableNumber {
  phoneNumber: string;
  friendlyName: string;
  locality?: string;
  region?: string;
  type?: string;
}

const PROVIDER_COLORS: Record<string, string> = {
  twilio: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  plivo: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  exotel: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
  telnyx: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  cloudonix: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  ari: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  vonage: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  vobiz: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
  sip: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
};

export default function PhoneNumbers() {
  const { toast } = useToast();

  // Dialog states
  const [createConfigOpen, setCreateConfigOpen] = useState(false);
  const [editConfigTarget, setEditConfigTarget] = useState<TelephonyConfig | null>(null);
  const [deleteConfigTarget, setDeleteConfigTarget] = useState<TelephonyConfig | null>(null);

  const [addPhoneOpen, setAddPhoneOpen] = useState(false);
  const [editPhoneTarget, setEditPhoneTarget] = useState<UnifiedPhoneNumber | null>(null);
  const [deletePhoneTarget, setDeletePhoneTarget] = useState<UnifiedPhoneNumber | null>(null);

  // Tab mode in Add Phone modal
  const [phoneDialogTab, setPhoneDialogTab] = useState<"sip" | "twilio-import" | "inventory">("sip");

  // Connect SIP form
  const [phoneInput, setPhoneInput] = useState("");
  const [labelInput, setLabelInput] = useState("");
  const [selectedGatewayId, setSelectedGatewayId] = useState<string>("none");
  const [selectedAgentId, setSelectedAgentId] = useState<string>("none");

  // Twilio Import form
  const [importTwilioNumber, setImportTwilioNumber] = useState("");
  const [importTwilioSid, setImportTwilioSid] = useState("");
  const [importTwilioToken, setImportTwilioToken] = useState("");
  const [importTwilioLabel, setImportTwilioLabel] = useState("");
  const [importTwilioAgentId, setImportTwilioAgentId] = useState("none");
  const [isImportingTwilio, setIsImportingTwilio] = useState(false);

  // Inventory search
  const [searchCountry, setSearchCountry] = useState("US");
  const [searchNumberType, setSearchNumberType] = useState<"local" | "toll-free">("local");
  const [searchContains, setSearchContains] = useState("");
  const [searchResults, setSearchResults] = useState<AvailableNumber[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [buyingNumber, setBuyingNumber] = useState<string | null>(null);

  // ── Queries ──
  // 1. Telephony Configurations
  const {
    data: configsData,
    isLoading: configsLoading,
    refetch: refetchConfigs,
  } = useQuery<{ success: boolean; data: TelephonyConfig[] }>({
    queryKey: ["/api/telephony-configs"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/telephony-configs");
      return res.json();
    },
  });
  const configs = configsData?.data || [];

  // 2. SIP Phone numbers
  const {
    data: sipPhonesData,
    isLoading: sipPhonesLoading,
    refetch: refetchSipPhones,
  } = useQuery<{ success: boolean; data: SipPhoneNumber[] }>({
    queryKey: ["/api/user/sip-phone-numbers"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/user/sip-phone-numbers");
      return res.json();
    },
  });
  const sipPhones = sipPhonesData?.data || [];

  // 3. Twilio Platform Phone numbers
  const {
    data: twilioPhones = [],
    isLoading: twilioPhonesLoading,
    refetch: refetchTwilioPhones,
  } = useQuery<TwilioPhoneNumber[]>({
    queryKey: ["/api/phone-numbers"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/phone-numbers");
      return res.json();
    },
  });

  // 4. Incoming Connections (Twilio number to Agent mappings)
  const {
    data: incomingConnectionsData,
    refetch: refetchConnections,
  } = useQuery<{ connections: IncomingConnectionItem[]; allConnections?: IncomingConnectionItem[] }>({
    queryKey: ["/api/incoming-connections"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/incoming-connections");
      return res.json();
    },
  });
  const incomingConnectionsList = incomingConnectionsData?.connections || incomingConnectionsData?.allConnections || [];

  // 5. Available AI Agents (Both standard and Custom Voice agents)
  const { data: agents = [] } = useQuery<Agent[]>({
    queryKey: ["/api/agents"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/agents");
      return res.json();
    },
  });

  // ── Merge All Phone Numbers into One Unified List ──
  const unifiedPhoneNumbers = useMemo<UnifiedPhoneNumber[]>(() => {
    const list: UnifiedPhoneNumber[] = [];

    // 1. Add SIP phone numbers
    for (const sp of sipPhones) {
      list.push({
        id: sp.id,
        source: "sip",
        phoneNumber: sp.phone_number,
        label: sp.label,
        gatewayName: sp.gateway_name || "SIP Trunk",
        provider: "sip",
        agentId: sp.agent_id,
        isActive: sp.is_active,
        raw: sp,
      });
    }

    // 2. Add Twilio platform phone numbers
    for (const tp of twilioPhones) {
      if (tp.isSystemPool) continue;
      const conn = incomingConnectionsList.find((c: any) => c.phoneNumberId === tp.id);
      list.push({
        id: tp.id,
        source: "twilio",
        phoneNumber: tp.phoneNumber,
        label: tp.friendlyName || null,
        gatewayName: "Twilio Carrier Account",
        provider: "twilio",
        agentId: conn?.agentId || null,
        connectionId: conn?.id,
        isActive: tp.status === "active",
        raw: tp,
      });
    }

    return list;
  }, [sipPhones, twilioPhones, incomingConnectionsList]);

  // ── Mutations ──
  const setDefaultConfigMutation = useMutation({
    mutationFn: async (configId: string | number) => {
      const res = await apiRequest("POST", `/api/telephony-configs/${configId}/default`);
      return res.json();
    },
    onSuccess: (_, configId) => {
      queryClient.invalidateQueries({ queryKey: ["/api/telephony-configs"] });
      const target = configs.find((c) => String(c.id) === String(configId));
      toast({
        title: "Default Outbound Configured",
        description: `${target?.name || "Configuration"} is now the default for outbound calls.`,
      });
    },
    onError: (err: any) => {
      toast({ title: "Failed to set default", description: err.message, variant: "destructive" });
    },
  });

  const deleteConfigMutation = useMutation({
    mutationFn: async (configId: string | number) => {
      const res = await apiRequest("DELETE", `/api/telephony-configs/${configId}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/telephony-configs"] });
      queryClient.invalidateQueries({ queryKey: ["/api/user/sip-phone-numbers"] });
      setDeleteConfigTarget(null);
      toast({ title: "Configuration Deleted", description: "Telephony carrier configuration removed." });
    },
    onError: (err: any) => {
      toast({ title: "Delete Failed", description: err.message, variant: "destructive" });
    },
  });

  // Assign Inbound AI Agent to ANY phone number (SIP or Twilio)
  const assignAgentMutation = useMutation({
    mutationFn: async ({ phone, agentId }: { phone: UnifiedPhoneNumber; agentId: string | null }) => {
      if (phone.source === "sip") {
        const res = await apiRequest("PUT", `/api/user/sip-phone-numbers/${phone.id}`, {
          agentId: agentId === "none" ? null : agentId,
        });
        return res.json();
      } else {
        // Twilio phone number
        if (agentId === "none" || !agentId) {
          if (phone.connectionId) {
            const res = await apiRequest("DELETE", `/api/incoming-connections/${phone.connectionId}`);
            return res.json();
          }
          return { success: true };
        } else {
          const res = await apiRequest("POST", "/api/incoming-connections", {
            agentId,
            phoneNumberId: phone.id,
          });
          return res.json();
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/phone-numbers"] });
      queryClient.invalidateQueries({ queryKey: ["/api/incoming-connections"] });
      queryClient.invalidateQueries({ queryKey: ["/api/user/sip-phone-numbers"] });
      toast({
        title: "Inbound Routing Updated",
        description: "Phone number is assigned to the selected AI Agent.",
      });
    },
    onError: (err: any) => {
      toast({
        title: "Routing Update Failed",
        description: err.message || "Failed to update inbound routing.",
        variant: "destructive",
      });
    },
  });

  // Disconnect Phone Number (Safely unlinks from AgentLabs WITHOUT deleting from Twilio!)
  const deleteUnifiedPhoneMutation = useMutation({
    mutationFn: async (phone: UnifiedPhoneNumber) => {
      if (phone.source === "sip") {
        const res = await apiRequest("DELETE", `/api/user/sip-phone-numbers/${phone.id}`);
        return res.json();
      } else {
        // Twilio number - safely unlinks without releasing from Twilio
        const res = await apiRequest("DELETE", `/api/phone-numbers/${phone.id}`);
        return res.json();
      }
    },
    onSuccess: (_, phone) => {
      queryClient.invalidateQueries({ queryKey: ["/api/phone-numbers"] });
      queryClient.invalidateQueries({ queryKey: ["/api/incoming-connections"] });
      queryClient.invalidateQueries({ queryKey: ["/api/user/sip-phone-numbers"] });
      queryClient.invalidateQueries({ queryKey: ["/api/telephony-configs"] });
      setDeletePhoneTarget(null);
      toast({
        title: "Phone Number Disconnected",
        description: `${phone.phoneNumber} unlinked from AgentLabs (remains safely active in your carrier account).`,
      });
    },
    onError: (err: any) => {
      toast({
        title: "Disconnection Failed",
        description: err.message || "Could not disconnect phone number.",
        variant: "destructive",
      });
    },
  });

  // Connect / Save SIP Phone number
  const saveSipPhoneMutation = useMutation({
    mutationFn: async (payload: { phoneNumber: string; label?: string; gatewayId?: string; agentId?: string }) => {
      if (editPhoneTarget && editPhoneTarget.source === "sip") {
        const res = await apiRequest("PUT", `/api/user/sip-phone-numbers/${editPhoneTarget.id}`, {
          label: payload.label || null,
          gatewayId: payload.gatewayId === "none" ? null : payload.gatewayId,
          agentId: payload.agentId === "none" ? null : payload.agentId,
        });
        return res.json();
      } else {
        const res = await apiRequest("POST", "/api/user/sip-phone-numbers", {
          phoneNumber: payload.phoneNumber,
          label: payload.label || null,
          gatewayId: payload.gatewayId === "none" ? null : payload.gatewayId,
          agentId: payload.agentId === "none" ? null : payload.agentId,
        });
        return res.json();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user/sip-phone-numbers"] });
      queryClient.invalidateQueries({ queryKey: ["/api/telephony-configs"] });
      setAddPhoneOpen(false);
      setEditPhoneTarget(null);
      setPhoneInput("");
      setLabelInput("");
      toast({
        title: "Phone Number Saved",
        description: "Your carrier phone number has been configured.",
      });
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message || "Failed to save phone number", variant: "destructive" });
    },
  });

  // Import Twilio Number
  const handleImportTwilio = async () => {
    if (!importTwilioNumber.trim() || !importTwilioSid.trim() || !importTwilioToken.trim()) {
      toast({
        title: "Validation Error",
        description: "Phone Number, Twilio Account SID, and Auth Token are all required.",
        variant: "destructive",
      });
      return;
    }

    setIsImportingTwilio(true);
    try {
      const res = await apiRequest("POST", "/api/phone-numbers/import-twilio", {
        phoneNumber: importTwilioNumber.trim(),
        accountSid: importTwilioSid.trim(),
        authToken: importTwilioToken.trim(),
        label: importTwilioLabel.trim() || undefined,
        agentId: importTwilioAgentId === "none" ? undefined : importTwilioAgentId,
        smsEnabled: true,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to import number from Twilio");
      }

      queryClient.invalidateQueries({ queryKey: ["/api/phone-numbers"] });
      queryClient.invalidateQueries({ queryKey: ["/api/incoming-connections"] });
      queryClient.invalidateQueries({ queryKey: ["/api/telephony-configs"] });

      setAddPhoneOpen(false);
      setImportTwilioNumber("");
      setImportTwilioSid("");
      setImportTwilioToken("");
      setImportTwilioLabel("");
      toast({
        title: "Twilio Number Connected",
        description: `${importTwilioNumber} successfully imported from your Twilio account!`,
      });
    } catch (err: any) {
      toast({
        title: "Import Failed",
        description: err.message || "Failed to import number from Twilio",
        variant: "destructive",
      });
    } finally {
      setIsImportingTwilio(false);
    }
  };

  // Search inventory
  const handleSearchInventory = async () => {
    setIsSearching(true);
    setSearchResults([]);
    try {
      const params = new URLSearchParams();
      params.append("country", searchCountry);
      params.append("numberType", searchNumberType);
      if (searchContains) params.append("contains", searchContains);

      const res = await fetch(`/api/phone-numbers/search?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to search phone numbers");
      const data = await res.json();
      setSearchResults(Array.isArray(data) ? data : []);
    } catch (err: any) {
      toast({ title: "Search Failed", description: err.message, variant: "destructive" });
    } finally {
      setIsSearching(false);
    }
  };

  // Buy inventory number
  const handleBuyNumber = async (number: AvailableNumber) => {
    setBuyingNumber(number.phoneNumber);
    try {
      const res = await apiRequest("POST", "/api/phone-numbers/buy", {
        phoneNumber: number.phoneNumber,
        friendlyName: number.friendlyName,
        country: searchCountry,
        numberType: number.type || searchNumberType,
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || "Failed to purchase number");
      }

      queryClient.invalidateQueries({ queryKey: ["/api/phone-numbers"] });
      queryClient.invalidateQueries({ queryKey: ["/api/incoming-connections"] });
      queryClient.invalidateQueries({ queryKey: ["/api/telephony-configs"] });
      setAddPhoneOpen(false);
      toast({
        title: "Number Purchased",
        description: `${number.phoneNumber} is now connected to your account.`,
      });
    } catch (err: any) {
      toast({ title: "Purchase Failed", description: err.message, variant: "destructive" });
    } finally {
      setBuyingNumber(null);
    }
  };

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: `${label} copied`, description: text });
  };

  const openAddPhoneModal = () => {
    setEditPhoneTarget(null);
    setPhoneInput("");
    setLabelInput("");
    setSelectedGatewayId(configs[0] ? String(configs[0].id) : "none");
    setSelectedAgentId("none");
    setPhoneDialogTab("sip");
    setAddPhoneOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-7xl">
      {/* ── Page Header (Dograh Style) ── */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-border/60">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Telephony configurations</h1>
          <p className="text-muted-foreground mt-1 max-w-2xl text-sm leading-relaxed">
            Connect one or more telephony provider accounts. Each campaign uses one configuration; inbound calls are routed to the right agent by configuration ID.
          </p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              refetchConfigs();
              refetchSipPhones();
              refetchTwilioPhones();
              refetchConnections();
            }}
            disabled={configsLoading || sipPhonesLoading || twilioPhonesLoading}
            title="Refresh configurations and phone numbers"
          >
            <RefreshCw className={`h-4 w-4 ${(configsLoading || sipPhonesLoading || twilioPhonesLoading) ? "animate-spin" : ""}`} />
          </Button>
          <Button
            variant="outline"
            onClick={openAddPhoneModal}
            className="font-medium gap-1.5"
            data-testid="button-connect-phone-number"
          >
            <Phone className="h-4 w-4" />
            Connect Phone Number
          </Button>
          <Button
            onClick={() => {
              setEditConfigTarget(null);
              setCreateConfigOpen(true);
            }}
            className="font-medium gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
            data-testid="button-add-configuration"
          >
            <Plus className="h-4 w-4" />
            Add configuration
          </Button>
        </div>
      </div>

      {/* ── Telephony Configurations List (Dograh 1:1 Parity) ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Server className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold tracking-tight">Provider Accounts & Trunks</h2>
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            {configs.length} {configs.length === 1 ? "configuration" : "configurations"}
          </span>
        </div>

        {configsLoading ? (
          <div className="grid gap-3">
            {[1, 2].map((i) => (
              <Card key={i} className="p-5 animate-pulse">
                <div className="h-5 bg-muted rounded w-1/4 mb-2" />
                <div className="h-4 bg-muted rounded w-1/3" />
              </Card>
            ))}
          </div>
        ) : configs.length === 0 ? (
          <Card className="border-dashed border-2 border-border/80 bg-card/40">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-2">
                <Server className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">No telephony configurations yet</CardTitle>
              <CardDescription className="text-sm max-w-md mx-auto">
                Add one to enable outbound calls and receive inbound calls. Connect Twilio, Exotel, Plivo, Telnyx, Asterisk, or Indian SIP trunks.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-6">
              <Button
                onClick={() => {
                  setEditConfigTarget(null);
                  setCreateConfigOpen(true);
                }}
                className="gap-2"
              >
                <Plus className="h-4 w-4" /> Add configuration
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3">
            {configs.map((item) => {
              const badgeClass = PROVIDER_COLORS[item.provider] || "bg-secondary text-secondary-foreground";
              const count = item.phone_number_count || 0;

              return (
                <Card
                  key={item.id}
                  className="border border-border/70 hover:border-primary/40 transition-all bg-card/90 shadow-sm"
                >
                  <CardContent className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center">
                    <Link
                      href={`/app/telephony-configurations/${item.id}`}
                      className="flex flex-1 items-center gap-4 min-w-0"
                    >
                      <div className="flex flex-col gap-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-base truncate text-foreground hover:underline">
                            {item.name}
                          </span>
                          <Badge variant="outline" className={`text-[10px] uppercase font-mono px-2 py-0 border ${badgeClass}`}>
                            {item.provider}
                          </Badge>
                          {item.is_default_outbound && (
                            <Badge className="gap-1 bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-xs font-medium">
                              <Star className="h-3 w-3 fill-current" />
                              Default
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {count} phone {count === 1 ? "number" : "numbers"}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            copyText(String(item.id), "Configuration ID");
                          }}
                          title="Click to copy Configuration ID"
                          className="inline-flex items-center gap-1.5 self-start rounded font-mono text-xs text-muted-foreground hover:text-foreground mt-0.5"
                        >
                          <span className="truncate">Configuration ID: {item.id}</span>
                          <Copy className="h-3 w-3 shrink-0 opacity-70" />
                        </button>
                      </div>
                    </Link>

                    <div className="flex w-full flex-wrap items-center justify-end gap-1.5 sm:w-auto sm:flex-nowrap">
                      {!item.is_default_outbound && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDefaultConfigMutation.mutate(item.id)}
                          disabled={setDefaultConfigMutation.isPending}
                          title="Set as default outbound carrier"
                          className="text-xs"
                        >
                          <Star className="h-4 w-4 mr-1 text-muted-foreground hover:text-amber-500" />
                          Set as default
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditConfigTarget(item);
                          setCreateConfigOpen(true);
                        }}
                        title="Edit configuration"
                      >
                        <Pencil className="h-4 w-4 mr-1" />
                        <span className="text-xs">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteConfigTarget(item)}
                        title="Delete configuration"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          href={`/app/telephony-configurations/${item.id}`}
                          aria-label={`Manage phone numbers for ${item.name}`}
                          className="font-medium gap-1"
                        >
                          Manage Phone Numbers
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Connected Phone Numbers Section (Single Unified Model: Twilio + SIP) ── */}
      <div className="space-y-4 pt-6 border-t border-border/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Phone className="h-5 w-5 text-emerald-600" />
              Connected Phone Numbers & Inbound AI Routing
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Route inbound phone numbers to your AI Agents with 1-click real-time binding across all your connected telephony carriers.
            </p>
          </div>
          <Button
            size="sm"
            onClick={openAddPhoneModal}
            className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm gap-1.5 self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" />
            Connect Phone Number
          </Button>
        </div>

        {sipPhonesLoading || twilioPhonesLoading ? (
          <div className="grid gap-2">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-4 animate-pulse">
                <div className="h-4 bg-muted rounded w-1/3 mb-2" />
                <div className="h-4 bg-muted rounded w-1/4" />
              </Card>
            ))}
          </div>
        ) : unifiedPhoneNumbers.length === 0 ? (
          <Card className="border-dashed border-2 border-border/80 bg-card/30 p-10 text-center">
            <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
              <Phone className="h-7 w-7 text-emerald-600" />
            </div>
            <h3 className="text-base font-semibold mb-1">No Phone Numbers Connected Yet</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
              Attach your carrier phone numbers (Indian SIP, Twilio, Exotel, Plivo, Telnyx) and route live inbound calls directly to your conversational AI Agents.
            </p>
            <Button onClick={openAddPhoneModal} className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
              <Plus className="h-4 w-4" />
              Connect Your First Phone Number
            </Button>
          </Card>
        ) : (
          <div className="rounded-xl border border-border/80 bg-card overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow>
                  <TableHead className="font-semibold">Phone Number</TableHead>
                  <TableHead className="font-semibold">Friendly Label</TableHead>
                  <TableHead className="font-semibold">Carrier / Gateway</TableHead>
                  <TableHead className="font-semibold">Inbound AI Agent</TableHead>
                  <TableHead className="font-semibold text-center">Status</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {unifiedPhoneNumbers.map((phone) => {
                  const badgeClass = PROVIDER_COLORS[phone.provider] || "bg-secondary text-secondary-foreground";

                  return (
                    <TableRow key={`${phone.source}-${phone.id}`} className="hover:bg-muted/30 transition-colors">
                      {/* Phone Number */}
                      <TableCell className="font-mono font-medium text-sm">
                        <div className="flex items-center gap-2">
                          <Phone className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                          <span>{phone.phoneNumber}</span>
                          <button
                            type="button"
                            onClick={() => copyText(phone.phoneNumber, "Phone number")}
                            className="text-muted-foreground hover:text-foreground opacity-60 hover:opacity-100"
                            title="Copy number"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                        </div>
                      </TableCell>

                      {/* Label */}
                      <TableCell className="text-sm text-muted-foreground">
                        {phone.label || <span className="italic text-muted-foreground/60">—</span>}
                      </TableCell>

                      {/* Gateway / Carrier */}
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <Badge variant="outline" className={`text-[10px] uppercase font-mono px-1.5 py-0 border ${badgeClass}`}>
                            {phone.provider}
                          </Badge>
                          <span className="text-xs text-muted-foreground truncate max-w-[140px]">
                            {phone.gatewayName}
                          </span>
                        </div>
                      </TableCell>

                      {/* 1-Click Inbound AI Agent Selector */}
                      <TableCell>
                        <Select
                          value={phone.agentId || "none"}
                          onValueChange={(val) => {
                            assignAgentMutation.mutate({
                              phone,
                              agentId: val,
                            });
                          }}
                        >
                          <SelectTrigger className="w-[210px] h-8 text-xs bg-background">
                            <SelectValue placeholder="Select Agent" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">
                              <span className="text-muted-foreground">Unassigned (No Agent)</span>
                            </SelectItem>
                            {agents.map((agent) => (
                              <SelectItem key={agent.id} value={agent.id}>
                                <div className="flex items-center gap-1.5">
                                  <Bot className="h-3.5 w-3.5 text-primary shrink-0" />
                                  <span className="truncate">{agent.name}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>

                      {/* Active Status */}
                      <TableCell className="text-center">
                        <Badge variant={phone.isActive ? "default" : "secondary"} className="text-[11px]">
                          {phone.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeletePhoneTarget(phone)}
                          title="Disconnect phone number from AgentLabs"
                          className="h-8 px-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* ── Dialog 1: Unified Telephony Configuration Dialog ── */}
      <UnifiedTelephonyDialog
        open={createConfigOpen}
        onOpenChange={setCreateConfigOpen}
        existingConfig={editConfigTarget}
        onSaved={() => {
          refetchConfigs();
          refetchSipPhones();
          refetchTwilioPhones();
          refetchConnections();
        }}
      />

      {/* ── Dialog 2: Connect Phone Number (Unified Modal) ── */}
      <Dialog open={addPhoneOpen} onOpenChange={setAddPhoneOpen}>
        <DialogContent className="sm:max-w-[560px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-emerald-600" />
              Connect Phone Number
            </DialogTitle>
            <DialogDescription>
              Attach a phone number to your telephony account to start making and receiving AI voice calls.
            </DialogDescription>
          </DialogHeader>

          {/* Dialog Tabs */}
          <div className="flex border-b border-border/80 mb-2">
            <button
              type="button"
              onClick={() => setPhoneDialogTab("sip")}
              className={`py-2 px-3 text-xs font-semibold border-b-2 -mb-px transition-colors ${
                phoneDialogTab === "sip"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Connect DID / Carrier SIP
            </button>
            <button
              type="button"
              onClick={() => setPhoneDialogTab("twilio-import")}
              className={`py-2 px-3 text-xs font-semibold border-b-2 -mb-px transition-colors ${
                phoneDialogTab === "twilio-import"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Import Twilio Number
            </button>
            <button
              type="button"
              onClick={() => setPhoneDialogTab("inventory")}
              className={`py-2 px-3 text-xs font-semibold border-b-2 -mb-px transition-colors ${
                phoneDialogTab === "inventory"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Search & Buy Inventory
            </button>
          </div>

          {/* TAB 1: Connect DID / SIP Number */}
          {phoneDialogTab === "sip" && (
            <div className="space-y-4 py-2">
              <div className="space-y-1.5">
                <Label htmlFor="input-phone" className="text-xs font-medium">
                  Phone Number (E.164 format) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="input-phone"
                  placeholder="+919876543210 or +12025550123"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  className="font-mono text-sm"
                />
                <p className="text-[11px] text-muted-foreground">
                  Include country code with leading + (e.g. +91 for India, +1 for US/Canada).
                </p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="input-label" className="text-xs font-medium">
                  Friendly Label <span className="text-muted-foreground">(Optional)</span>
                </Label>
                <Input
                  id="input-label"
                  placeholder="e.g. Sales Inbound Mumbai, Support Toll-Free"
                  value={labelInput}
                  onChange={(e) => setLabelInput(e.target.value)}
                  className="text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Telephony Carrier Configuration</Label>
                <Select value={selectedGatewayId} onValueChange={setSelectedGatewayId}>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Select Telephony Configuration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">
                      <span className="text-muted-foreground">None (Direct Inbound)</span>
                    </SelectItem>
                    {configs.map((config) => (
                      <SelectItem key={config.id} value={String(config.id)}>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px] uppercase font-mono px-1 py-0">
                            {config.provider}
                          </Badge>
                          <span>{config.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Assign Inbound AI Agent</Label>
                <Select value={selectedAgentId} onValueChange={setSelectedAgentId}>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Select Agent to receive calls" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">
                      <span className="text-muted-foreground">Unassigned (Route later)</span>
                    </SelectItem>
                    {agents.map((agent) => (
                      <SelectItem key={agent.id} value={agent.id}>
                        <div className="flex items-center gap-2">
                          <Bot className="h-3.5 w-3.5 text-primary" />
                          <span>{agent.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter className="pt-2">
                <Button variant="outline" onClick={() => setAddPhoneOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (!phoneInput.trim()) {
                      toast({ title: "Phone number required", variant: "destructive" });
                      return;
                    }
                    saveSipPhoneMutation.mutate({
                      phoneNumber: phoneInput.trim(),
                      label: labelInput.trim() || undefined,
                      gatewayId: selectedGatewayId,
                      agentId: selectedAgentId,
                    });
                  }}
                  disabled={saveSipPhoneMutation.isPending}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  {saveSipPhoneMutation.isPending && <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />}
                  Connect Number
                </Button>
              </DialogFooter>
            </div>
          )}

          {/* TAB 2: Import Twilio Number */}
          {phoneDialogTab === "twilio-import" && (
            <div className="space-y-4 py-2">
              <div className="rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground space-y-1">
                <p className="font-semibold text-foreground flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  Safe Twilio Connection
                </p>
                <p>
                  Importing connects your number to AgentLabs webhooks. Your number always remains safely in your Twilio account and is never removed from Twilio.
                </p>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Twilio Phone Number (E.164) *</Label>
                <Input
                  placeholder="+12025550123"
                  value={importTwilioNumber}
                  onChange={(e) => setImportTwilioNumber(e.target.value)}
                  className="font-mono text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs font-medium">Twilio Account SID *</Label>
                  <Input
                    placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    value={importTwilioSid}
                    onChange={(e) => setImportTwilioSid(e.target.value)}
                    className="font-mono text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-medium">Twilio Auth Token *</Label>
                  <Input
                    type="password"
                    placeholder="••••••••••••••••••••••••••••••••"
                    value={importTwilioToken}
                    onChange={(e) => setImportTwilioToken(e.target.value)}
                    className="font-mono text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Friendly Label (Optional)</Label>
                <Input
                  placeholder="e.g. Inbound Twilio US"
                  value={importTwilioLabel}
                  onChange={(e) => setImportTwilioLabel(e.target.value)}
                  className="text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Assign Inbound AI Agent</Label>
                <Select value={importTwilioAgentId} onValueChange={setImportTwilioAgentId}>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Select Agent to receive calls" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">
                      <span className="text-muted-foreground">Unassigned (Route later)</span>
                    </SelectItem>
                    {agents.map((agent) => (
                      <SelectItem key={agent.id} value={agent.id}>
                        <div className="flex items-center gap-2">
                          <Bot className="h-3.5 w-3.5 text-primary" />
                          <span>{agent.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter className="pt-2">
                <Button variant="outline" onClick={() => setAddPhoneOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleImportTwilio}
                  disabled={isImportingTwilio}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  {isImportingTwilio && <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />}
                  Import & Connect
                </Button>
              </DialogFooter>
            </div>
          )}

          {/* TAB 3: Search & Buy Inventory */}
          {phoneDialogTab === "inventory" && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs font-medium">Country</Label>
                  <Select value={searchCountry} onValueChange={setSearchCountry}>
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US">United States (+1)</SelectItem>
                      <SelectItem value="GB">United Kingdom (+44)</SelectItem>
                      <SelectItem value="CA">Canada (+1)</SelectItem>
                      <SelectItem value="AU">Australia (+61)</SelectItem>
                      <SelectItem value="IN">India (+91)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-medium">Number Type</Label>
                  <Select
                    value={searchNumberType}
                    onValueChange={(val: any) => setSearchNumberType(val)}
                  >
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">Local</SelectItem>
                      <SelectItem value="toll-free">Toll-Free</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Area code or digits (optional)"
                  value={searchContains}
                  onChange={(e) => setSearchContains(e.target.value)}
                  className="text-sm font-mono"
                />
                <Button onClick={handleSearchInventory} disabled={isSearching} className="gap-1.5 shrink-0">
                  {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                  Search
                </Button>
              </div>

              <div className="max-h-[240px] overflow-y-auto space-y-2 border border-border/80 rounded-lg p-2 bg-muted/20">
                {isSearching ? (
                  <div className="py-8 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    Searching carrier pool...
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="py-8 text-center text-xs text-muted-foreground">
                    Click "Search" to view available inventory numbers.
                  </div>
                ) : (
                  searchResults.map((num) => (
                    <div
                      key={num.phoneNumber}
                      className="flex items-center justify-between p-2.5 bg-background rounded-lg border border-border/60 hover:border-primary/50 transition-colors"
                    >
                      <div>
                        <div className="font-mono text-sm font-semibold">{num.phoneNumber}</div>
                        <div className="text-[11px] text-muted-foreground">
                          {num.locality || num.region || num.friendlyName || "Direct Carrier"}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleBuyNumber(num)}
                        disabled={buyingNumber === num.phoneNumber}
                        className="h-8 gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        {buyingNumber === num.phoneNumber ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <ShoppingCart className="h-3.5 w-3.5" />
                        )}
                        Buy & Connect
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ── Dialog 3: Delete Configuration Confirmation ── */}
      <AlertDialog
        open={!!deleteConfigTarget}
        onOpenChange={(open) => !open && setDeleteConfigTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete configuration?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteConfigTarget?.name} and all of its associated phone number mappings will be removed. Any campaigns referencing this configuration will need to be reassigned.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteConfigTarget && deleteConfigMutation.mutate(deleteConfigTarget.id)}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              Delete Configuration
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ── Dialog 4: Disconnect Phone Number Confirmation (Twilio Safeguard) ── */}
      <AlertDialog
        open={!!deletePhoneTarget}
        onOpenChange={(open) => !open && setDeletePhoneTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disconnect Phone Number?</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                Are you sure you want to disconnect <span className="font-mono font-semibold">{deletePhoneTarget?.phoneNumber}</span> from AgentLabs?
              </p>
              <p className="text-xs text-muted-foreground bg-muted/60 p-2.5 rounded-lg border border-border/60">
                <strong className="text-emerald-600 dark:text-emerald-400">✓ Safe Disconnection:</strong> This will unlink the phone number from AgentLabs. The number will <strong>NOT</strong> be deleted from your Twilio or carrier account.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletePhoneTarget && deleteUnifiedPhoneMutation.mutate(deletePhoneTarget)}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              Disconnect Number
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
