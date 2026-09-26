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

import { useState } from "react";
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
  Check,
  ExternalLink,
  RefreshCw,
  Zap,
  Globe,
  Loader2,
  Search,
  ShoppingCart,
  CheckCircle2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { UnifiedTelephonyDialog } from "@/components/telephony/UnifiedTelephonyDialog";

// ─── Interfaces ─────────────────────────────────────────────────────────────

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

interface ConnectedPhoneNumber {
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

interface Agent {
  id: string;
  name: string;
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
  const [editPhoneTarget, setEditPhoneTarget] = useState<ConnectedPhoneNumber | null>(null);
  const [deletePhoneTarget, setDeletePhoneTarget] = useState<ConnectedPhoneNumber | null>(null);

  // Add Phone form state
  const [phoneInput, setPhoneInput] = useState("");
  const [labelInput, setLabelInput] = useState("");
  const [selectedGatewayId, setSelectedGatewayId] = useState<string>("none");
  const [selectedAgentId, setSelectedAgentId] = useState<string>("none");

  // Buy Inventory tab state inside add phone dialog
  const [phoneDialogTab, setPhoneDialogTab] = useState<"manual" | "inventory">("manual");
  const [searchCountry, setSearchCountry] = useState("US");
  const [searchNumberType, setSearchNumberType] = useState<"local" | "toll-free">("local");
  const [searchContains, setSearchContains] = useState("");
  const [searchResults, setSearchResults] = useState<AvailableNumber[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [buyingNumber, setBuyingNumber] = useState<string | null>(null);

  // ── Queries ──
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

  const {
    data: phonesData,
    isLoading: phonesLoading,
    refetch: refetchPhones,
  } = useQuery<{ success: boolean; data: ConnectedPhoneNumber[] }>({
    queryKey: ["/api/user/sip-phone-numbers"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/user/sip-phone-numbers");
      return res.json();
    },
  });
  const phones = phonesData?.data || [];

  const { data: agents = [] } = useQuery<Agent[]>({
    queryKey: ["/api/agents"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/agents");
      return res.json();
    },
  });

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

  const savePhoneMutation = useMutation({
    mutationFn: async (payload: { phoneNumber: string; label?: string; gatewayId?: string; agentId?: string }) => {
      if (editPhoneTarget) {
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
      setSelectedGatewayId("none");
      setSelectedAgentId("none");
      toast({
        title: editPhoneTarget ? "Phone Number Updated" : "Phone Number Connected",
        description: editPhoneTarget
          ? "Phone number configuration has been updated."
          : "Your phone number is connected and ready to route calls.",
      });
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message || "Failed to save phone number", variant: "destructive" });
    },
  });

  const updatePhoneAgentMutation = useMutation({
    mutationFn: async ({ phoneId, agentId }: { phoneId: string; agentId: string | null }) => {
      const res = await apiRequest("PUT", `/api/user/sip-phone-numbers/${phoneId}`, {
        agentId: agentId === "none" ? null : agentId,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user/sip-phone-numbers"] });
      toast({ title: "Inbound Routing Updated", description: "Phone number is assigned to the selected AI Agent." });
    },
    onError: (err: any) => {
      toast({ title: "Routing Failed", description: err.message, variant: "destructive" });
    },
  });

  const togglePhoneStatusMutation = useMutation({
    mutationFn: async ({ phoneId, isActive }: { phoneId: string; isActive: boolean }) => {
      const res = await apiRequest("PUT", `/api/user/sip-phone-numbers/${phoneId}`, {
        isActive,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user/sip-phone-numbers"] });
    },
    onError: (err: any) => {
      toast({ title: "Status Update Failed", description: err.message, variant: "destructive" });
    },
  });

  const deletePhoneMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("DELETE", `/api/user/sip-phone-numbers/${id}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user/sip-phone-numbers"] });
      queryClient.invalidateQueries({ queryKey: ["/api/telephony-configs"] });
      setDeletePhoneTarget(null);
      toast({ title: "Phone Number Released", description: "The phone number has been removed from your account." });
    },
    onError: (err: any) => {
      toast({ title: "Release Failed", description: err.message, variant: "destructive" });
    },
  });

  // Search inventory numbers (Twilio/Plivo)
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

  // Buy number from inventory
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

      // Also register into sip phone numbers for unified view
      try {
        await apiRequest("POST", "/api/user/sip-phone-numbers", {
          phoneNumber: number.phoneNumber,
          label: number.friendlyName,
        });
      } catch (e) {
        // already handled by hook
      }

      queryClient.invalidateQueries({ queryKey: ["/api/user/sip-phone-numbers"] });
      queryClient.invalidateQueries({ queryKey: ["/api/telephony-configs"] });
      setAddPhoneOpen(false);
      toast({
        title: "Number Acquired",
        description: `${number.phoneNumber} has been purchased and connected to your account.`,
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
    setPhoneDialogTab("manual");
    setAddPhoneOpen(true);
  };

  const openEditPhoneModal = (phone: ConnectedPhoneNumber) => {
    setEditPhoneTarget(phone);
    setPhoneInput(phone.phone_number);
    setLabelInput(phone.label || "");
    setSelectedGatewayId(phone.gateway_id ? String(phone.gateway_id) : "none");
    setSelectedAgentId(phone.agent_id ? String(phone.agent_id) : "none");
    setPhoneDialogTab("manual");
    setAddPhoneOpen(true);
  };

  const handleSavePhoneForm = () => {
    if (!phoneInput.trim()) {
      toast({ title: "Phone number required", description: "Please enter a valid phone number in E.164 format.", variant: "destructive" });
      return;
    }
    savePhoneMutation.mutate({
      phoneNumber: phoneInput.trim(),
      label: labelInput.trim() || undefined,
      gatewayId: selectedGatewayId,
      agentId: selectedAgentId,
    });
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
              refetchPhones();
            }}
            disabled={configsLoading || phonesLoading}
            title="Refresh configurations and phone numbers"
          >
            <RefreshCw className={`h-4 w-4 ${(configsLoading || phonesLoading) ? "animate-spin" : ""}`} />
          </Button>
          <Button
            variant="outline"
            onClick={openAddPhoneModal}
            className="font-medium gap-1.5"
            data-testid="button-connect-phone-number"
          >
            <Phone className="h-4 w-4" />
            + Connect Phone Number
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

      {/* ── Connected Phone Numbers Section (Single Unified Model) ── */}
      <div className="space-y-4 pt-6 border-t border-border/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Phone className="h-5 w-5 text-emerald-600" />
              Connected Phone Numbers & Inbound AI Routing
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Route inbound phone numbers to your AI Agents with 1-click real-time binding across all telephony carriers.
            </p>
          </div>
          <Button
            size="sm"
            onClick={openAddPhoneModal}
            className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm gap-1.5 self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" />
            + Connect Phone Number
          </Button>
        </div>

        {phonesLoading ? (
          <div className="grid gap-2">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-4 animate-pulse">
                <div className="h-4 bg-muted rounded w-1/3 mb-2" />
                <div className="h-4 bg-muted rounded w-1/4" />
              </Card>
            ))}
          </div>
        ) : phones.length === 0 ? (
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
                {phones.map((phone) => {
                  const currentAgent = agents.find((a) => a.id === phone.agent_id);

                  return (
                    <TableRow key={phone.id} className="hover:bg-muted/30 transition-colors">
                      {/* Phone Number */}
                      <TableCell className="font-mono font-medium text-sm">
                        <div className="flex items-center gap-2">
                          <Phone className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                          <span>{phone.phone_number}</span>
                          <button
                            type="button"
                            onClick={() => copyText(phone.phone_number, "Phone number")}
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

                      {/* Gateway / Configuration */}
                      <TableCell>
                        {phone.gateway_name ? (
                          <Badge variant="outline" className="font-mono text-xs gap-1 border-border/80">
                            <Server className="h-3 w-3 text-primary" />
                            {phone.gateway_name}
                          </Badge>
                        ) : (
                          <span className="text-xs text-muted-foreground italic">Direct / Default</span>
                        )}
                      </TableCell>

                      {/* 1-Click Inbound AI Agent Selector */}
                      <TableCell>
                        <Select
                          value={phone.agent_id || "none"}
                          onValueChange={(val) => {
                            updatePhoneAgentMutation.mutate({
                              phoneId: phone.id,
                              agentId: val === "none" ? null : val,
                            });
                          }}
                        >
                          <SelectTrigger className="w-[200px] h-8 text-xs bg-background">
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
                        <div className="flex items-center justify-center gap-2">
                          <Switch
                            checked={phone.is_active}
                            onCheckedChange={(checked) =>
                              togglePhoneStatusMutation.mutate({ phoneId: phone.id, isActive: checked })
                            }
                            title={phone.is_active ? "Active" : "Inactive"}
                          />
                          <span className="text-xs text-muted-foreground">
                            {phone.is_active ? "Active" : "Paused"}
                          </span>
                        </div>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditPhoneModal(phone)}
                            title="Edit label & gateway"
                            className="h-8 px-2"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeletePhoneTarget(phone)}
                            title="Release phone number"
                            className="h-8 px-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
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
          refetchPhones();
        }}
      />

      {/* ── Dialog 2: Connect Phone Number (Unified Modal) ── */}
      <Dialog open={addPhoneOpen} onOpenChange={setAddPhoneOpen}>
        <DialogContent className="sm:max-w-[540px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-emerald-600" />
              {editPhoneTarget ? "Edit Phone Number" : "Connect Phone Number"}
            </DialogTitle>
            <DialogDescription>
              {editPhoneTarget
                ? "Update your phone number's friendly label and associated carrier trunk."
                : "Attach an existing carrier phone number or search available numbers from inventory."}
            </DialogDescription>
          </DialogHeader>

          {!editPhoneTarget && (
            <div className="flex border-b border-border/80 mb-2">
              <button
                type="button"
                onClick={() => setPhoneDialogTab("manual")}
                className={`py-2 px-4 text-xs font-semibold border-b-2 -mb-px transition-colors ${
                  phoneDialogTab === "manual"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Connect Carrier DID / SIP
              </button>
              <button
                type="button"
                onClick={() => setPhoneDialogTab("inventory")}
                className={`py-2 px-4 text-xs font-semibold border-b-2 -mb-px transition-colors ${
                  phoneDialogTab === "inventory"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Search & Buy Inventory
              </button>
            </div>
          )}

          {phoneDialogTab === "manual" ? (
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
                  disabled={!!editPhoneTarget}
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
                  onClick={handleSavePhoneForm}
                  disabled={savePhoneMutation.isPending}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  {savePhoneMutation.isPending && <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />}
                  {editPhoneTarget ? "Update Number" : "Connect Number"}
                </Button>
              </DialogFooter>
            </div>
          ) : (
            /* Search & Buy Inventory Tab */
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

              {/* Search Results list */}
              <div className="max-h-[260px] overflow-y-auto space-y-2 border border-border/80 rounded-lg p-2 bg-muted/20">
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

      {/* ── Dialog 3: Delete Telephony Configuration Confirmation (Dograh Parity) ── */}
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

      {/* ── Dialog 4: Release Phone Number Confirmation ── */}
      <AlertDialog
        open={!!deletePhoneTarget}
        onOpenChange={(open) => !open && setDeletePhoneTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Release phone number?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to release {deletePhoneTarget?.phone_number}? Inbound calls to this number will no longer be routed to your AI Agents.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletePhoneTarget && deletePhoneMutation.mutate(deletePhoneTarget.id)}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              Release Number
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
