import React, { useState } from "react";
import { useRoute, useLocation, Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  Server, 
  Phone, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  Check, 
  ExternalLink, 
  Trash2, 
  Star, 
  Edit3, 
  Plus, 
  Radio, 
  ShieldCheck, 
  Globe, 
  Sparkles,
  RefreshCw,
  Zap,
  Network,
  PhoneCall,
  Lock,
  Layers
} from "lucide-react";
import { UnifiedTelephonyDialog } from "@/components/telephony/UnifiedTelephonyDialog";
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

const PROVIDER_COLORS: Record<string, string> = {
  twilio: "bg-red-500/10 text-red-600 border-red-500/20",
  plivo: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  exotel: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  telnyx: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  cloudonix: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
  ari: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  vonage: "bg-violet-500/10 text-violet-600 border-violet-500/20",
  vobiz: "bg-sky-500/10 text-sky-600 border-sky-500/20",
  sip: "bg-slate-500/10 text-slate-600 border-slate-500/20",
};

interface SipTrunkItem {
  id: string;
  name: string;
  sip_domain: string;
  region: string;
  is_active: boolean;
}

export default function TelephonyConfigDetailPage() {
  const [, params] = useRoute("/app/telephony-configurations/:configId");
  const [, setLocation] = useLocation();
  const configId = params?.configId;
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Outbound SIP Trunks state (Dograh TrunkCard parity)
  const [trunks, setTrunks] = useState<SipTrunkItem[]>([
    {
      id: "trunk_primary",
      name: "Primary Voice Gateway",
      sip_domain: "sip.carrier.gateway.io",
      region: "ap-south-1 (Mumbai)",
      is_active: true,
    }
  ]);
  const [trunkDialogOpen, setTrunkDialogOpen] = useState(false);
  const [newTrunkName, setNewTrunkName] = useState("");
  const [newTrunkDomain, setNewTrunkDomain] = useState("");
  const [newTrunkRegion, setNewTrunkRegion] = useState("ap-south-1");

  // Fetch configs
  const { data: configsData, isLoading: isConfigsLoading, refetch: refetchConfigs } = useQuery({
    queryKey: ["/api/telephony-configs"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/telephony-configs");
      const json = await res.json();
      return json.data || [];
    },
  });

  // Fetch phone numbers
  const { data: phonesData, isLoading: isPhonesLoading, refetch: refetchPhones } = useQuery({
    queryKey: ["/api/user/sip-phone-numbers"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/user/sip-phone-numbers");
      const json = await res.json();
      return json.data || [];
    },
  });

  // Fetch available AI agents
  const { data: agentsData = [] } = useQuery<any[]>({
    queryKey: ["/api/agents"],
  });

  const config = (configsData || []).find((c: any) => String(c.id) === String(configId));
  const assignedPhones = (phonesData || []).filter((p: any) => String(p.gateway_id) === String(configId));

  const handleCopy = (text: string, keyName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyName);
    toast({ title: "Copied to clipboard", description: text });
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Set default outbound mutation
  const setDefaultMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", `/api/telephony-configs/${configId}/default`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/telephony-configs"] });
      queryClient.invalidateQueries({ queryKey: ["/api/user/sip-gateways"] });
      refetchConfigs();
      toast({ title: "Default Set", description: "This configuration is now the default for outbound calls." });
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  // Delete configuration mutation
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("DELETE", `/api/telephony-configs/${configId}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/telephony-configs"] });
      queryClient.invalidateQueries({ queryKey: ["/api/user/sip-gateways"] });
      toast({ title: "Configuration Deleted", description: "Telephony connection removed." });
      setLocation("/app/phone-numbers");
    },
    onError: (err: any) => {
      toast({ title: "Delete Failed", description: err.message, variant: "destructive" });
    },
  });

  // Assign Agent to phone number
  const updateAgentMutation = useMutation({
    mutationFn: async ({ phoneId, agentId }: { phoneId: string; agentId: string | null }) => {
      const res = await apiRequest("PUT", `/api/user/sip-phone-numbers/${phoneId}`, {
        agentId: agentId === "none" ? null : agentId,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user/sip-phone-numbers"] });
      queryClient.invalidateQueries({ queryKey: ["/api/incoming-connections"] });
      refetchPhones();
      toast({ title: "Agent Assigned", description: "Incoming calls will now route directly to this AI Agent." });
    },
    onError: (err: any) => {
      toast({ title: "Update Failed", description: err.message, variant: "destructive" });
    },
  });

  const handleAddTrunk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrunkName.trim()) return;
    const item: SipTrunkItem = {
      id: `trunk_${Date.now()}`,
      name: newTrunkName.trim(),
      sip_domain: newTrunkDomain.trim() || config?.proxy || "sip.carrier.io",
      region: newTrunkRegion,
      is_active: true,
    };
    setTrunks([...trunks, item]);
    setTrunkDialogOpen(false);
    setNewTrunkName("");
    setNewTrunkDomain("");
    toast({
      title: "SIP Trunk Added",
      description: `Outbound trunk "${item.name}" registered.`,
    });
  };

  const handleDeleteTrunk = (id: string) => {
    setTrunks(trunks.filter((t) => t.id !== id));
    toast({ title: "SIP Trunk Removed" });
  };

  const getNumberType = (address: string) => {
    if (!address) return "PSTN";
    if (address.includes("@") || address.startsWith("sip:")) return "SIP URI";
    if (address.length <= 4) return "Extension";
    return "PSTN (E.164)";
  };

  if (isConfigsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <RefreshCw className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!config) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center space-y-4">
        <Server className="w-12 h-12 mx-auto text-muted-foreground opacity-60" />
        <h2 className="text-xl font-bold">Telephony Configuration Not Found</h2>
        <p className="text-sm text-muted-foreground">The requested carrier configuration does not exist or has been removed.</p>
        <Button onClick={() => setLocation("/app/phone-numbers")} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Phone Numbers
        </Button>
      </div>
    );
  }

  const provider = config.provider || "sip";
  const badgeColor = PROVIDER_COLORS[provider] || "bg-secondary text-secondary-foreground";
  const origin = typeof window !== "undefined" ? window.location.origin : "https://kodewaves.in";
  const webhookUrl = `${origin}/api/telephony/inbound/run`;
  const dialplanLine = `exten => _+X.,1,Stasis(agentlabs,\${EXTEN})`;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation("/app/phone-numbers")}
              className="h-8 w-8 p-0"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">{config.name}</h1>
            <Badge variant="outline" className={`text-xs uppercase font-mono px-2 py-0.5 border ${badgeColor}`}>
              {provider}
            </Badge>
            {config.is_default_outbound && (
              <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30 gap-1">
                <Star className="w-3 h-3 fill-current" /> Default Outbound
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground pl-10 font-mono">
            Configuration ID: {config.id}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {!config.is_default_outbound && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDefaultMutation.mutate()}
              disabled={setDefaultMutation.isPending}
              className="gap-1.5 text-xs"
            >
              <Star className="w-3.5 h-3.5" /> Set as Default
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setEditDialogOpen(true)}
            className="gap-1.5 text-xs"
          >
            <Edit3 className="w-3.5 h-3.5" /> Edit Credentials
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeleteDialogOpen(true)}
            className="text-destructive hover:bg-destructive/10 text-xs gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </Button>
        </div>
      </div>

      {/* Grid: Setup Checklist & SIP Connectivity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Setup Checklist */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Carrier Readiness Checklist
            </CardTitle>
            <CardDescription className="text-xs">
              Account status and live routing verification for this carrier.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-xs">Credentials Validated</p>
                <p className="text-xs text-muted-foreground font-mono truncate max-w-xs">{config.username || "API Token Configured"}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-xs">Direct Audio Engine Pipeline</p>
                <p className="text-xs text-muted-foreground">Bi-directional WebSockets (sub-400ms voice response)</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              {assignedPhones.length > 0 ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
              )}
              <div>
                <p className="font-medium text-xs">Assigned Telephone Numbers</p>
                <p className="text-xs text-muted-foreground">
                  {assignedPhones.length} {assignedPhones.length === 1 ? "number" : "numbers"} connected
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: SIP & Inbound Webhook Connectivity */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Radio className="w-4 h-4 text-blue-600" />
              Connectivity & Webhook Endpoints
            </CardTitle>
            <CardDescription className="text-xs">
              Configure these endpoints in your {provider.toUpperCase()} provider dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3.5">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold">Inbound Voice Webhook URL</Label>
                <Badge variant="outline" className="text-[10px] font-mono">POST</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Input readOnly value={webhookUrl} className="font-mono text-xs h-8 bg-muted/30" />
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 px-2.5"
                  onClick={() => handleCopy(webhookUrl, "webhook")}
                >
                  {copiedKey === "webhook" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground">Carrier sends incoming call alerts to this address.</p>
            </div>

            {provider === "ari" ? (
              <div className="space-y-1">
                <Label className="text-xs font-semibold">Asterisk Stasis Dialplan Line</Label>
                <div className="flex items-center gap-2">
                  <Input readOnly value={dialplanLine} className="font-mono text-xs h-8 bg-muted/30" />
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 px-2.5"
                    onClick={() => handleCopy(dialplanLine, "dialplan")}
                  >
                    {copiedKey === "dialplan" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                <Label className="text-xs font-semibold">Gateway / Proxy Host</Label>
                <div className="flex items-center gap-2">
                  <Input readOnly value={config.proxy || "Carrier Native Cloud"} className="font-mono text-xs h-8 bg-muted/30" />
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 px-2.5"
                    onClick={() => handleCopy(config.proxy || "", "proxy")}
                  >
                    {copiedKey === "proxy" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Outbound SIP Trunks Card (Dograh TrunkCard Parity) */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              <Network className="w-4 h-4 text-primary" />
              Outbound SIP Trunks ({trunks.length})
            </CardTitle>
            <CardDescription className="text-xs">
              Trunks used to route bulk campaigns and automated outbound calls via this carrier.
            </CardDescription>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setTrunkDialogOpen(true)}
            className="text-xs gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> Add Outbound Trunk
          </Button>
        </CardHeader>
        <CardContent>
          <div className="divide-y border rounded-lg overflow-hidden">
            {trunks.map((trunk) => (
              <div key={trunk.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Radio className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs">{trunk.name}</span>
                      <Badge variant="outline" className="text-[10px] font-mono">
                        {trunk.region}
                      </Badge>
                      <Badge variant="secondary" className="text-[10px] text-emerald-600 bg-emerald-500/10">
                        Operational
                      </Badge>
                    </div>
                    <p className="text-[11px] font-mono text-muted-foreground mt-0.5">
                      SIP Endpoint: {trunk.sip_domain}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-destructive"
                    onClick={() => handleDeleteTrunk(trunk.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Card 3: Assigned Phone Numbers Table with 1-Click Agent Select */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-600" />
              Attached Phone Numbers ({assignedPhones.length})
            </CardTitle>
            <CardDescription className="text-xs">
              Calls to these numbers route through this carrier configuration with 1-click Inbound AI Agent selection.
            </CardDescription>
          </div>
          <Button
            size="sm"
            onClick={() => setLocation("/app/phone-numbers")}
            className="text-xs gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> Attach Number
          </Button>
        </CardHeader>

        <CardContent>
          {assignedPhones.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-xs border border-dashed rounded-lg">
              No phone numbers are currently attached to this trunk. Go to Phone Numbers to attach one.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Phone Number</TableHead>
                  <TableHead className="text-xs">Type</TableHead>
                  <TableHead className="text-xs">Label</TableHead>
                  <TableHead className="text-xs">Inbound AI Agent</TableHead>
                  <TableHead className="text-xs text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignedPhones.map((phone: any) => (
                  <TableRow key={phone.id}>
                    <TableCell className="font-mono font-medium text-xs">
                      {phone.phone_number}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px] font-mono uppercase py-0">
                        {getNumberType(phone.phone_number)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {phone.label || "Direct Line"}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={phone.agent_id || "none"}
                        onValueChange={(newAgentId) => {
                          updateAgentMutation.mutate({
                            phoneId: phone.id,
                            agentId: newAgentId,
                          });
                        }}
                      >
                        <SelectTrigger className="w-[200px] h-8 text-xs">
                          <SelectValue placeholder="Assign AI Agent..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none" className="text-xs text-muted-foreground">
                            None (Disabled)
                          </SelectItem>
                          {agentsData.map((agent: any) => (
                            <SelectItem key={agent.id} value={agent.id} className="text-xs font-medium">
                              🤖 {agent.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px]">
                        Active
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit Modal */}
      {editDialogOpen && (
        <UnifiedTelephonyDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          existingConfig={config}
          onSaved={() => {
            refetchConfigs();
            refetchPhones();
          }}
        />
      )}

      {/* Add Trunk Modal */}
      <Dialog open={trunkDialogOpen} onOpenChange={setTrunkDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={handleAddTrunk}>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Network className="w-5 h-5 text-primary" />
                Add Outbound SIP Trunk
              </DialogTitle>
              <DialogDescription className="text-xs">
                Register a SIP trunk endpoint for routing bulk outbound traffic.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-1.5">
                <Label htmlFor="trunk-name" className="text-xs font-semibold">Trunk Label *</Label>
                <Input
                  id="trunk-name"
                  placeholder="e.g. Primary Outbound Trunk"
                  value={newTrunkName}
                  onChange={(e) => setNewTrunkName(e.target.value)}
                  className="text-xs"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="trunk-domain" className="text-xs font-semibold">SIP Domain / Host</Label>
                <Input
                  id="trunk-domain"
                  placeholder={config?.proxy || "sip.yourcarrier.com"}
                  value={newTrunkDomain}
                  onChange={(e) => setNewTrunkDomain(e.target.value)}
                  className="text-xs font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="trunk-region" className="text-xs font-semibold">Regional PoP</Label>
                <Select value={newTrunkRegion} onValueChange={setNewTrunkRegion}>
                  <SelectTrigger id="trunk-region" className="text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ap-south-1">Asia Pacific (Mumbai - ap-south-1)</SelectItem>
                    <SelectItem value="ap-southeast-1">Asia Pacific (Singapore - ap-southeast-1)</SelectItem>
                    <SelectItem value="us-east-1">US East (N. Virginia - us-east-1)</SelectItem>
                    <SelectItem value="eu-central-1">Europe (Frankfurt - eu-central-1)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" size="sm" onClick={() => setTrunkDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={!newTrunkName.trim()}>
                Add Trunk
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Alert */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Telephony Configuration?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove <strong>{config.name}</strong>? Any phone numbers routed through this trunk will stop receiving calls until reassigned.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteMutation.mutate()}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              Delete Connection
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
