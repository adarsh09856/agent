import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ClipboardList, 
  Calendar, 
  Webhook, 
  Globe, 
  Key, 
  Users, 
  Mail, 
  ContactRound, 
  Link as LinkIcon, 
  TableProperties, 
  ExternalLink, 
  Unlink, 
  Loader2, 
  Wrench,
  Plus,
  Search,
  Sparkles,
  PhoneForwarded,
  Bot,
  PhoneOff,
  Server,
  ArrowRight,
  Trash2,
  RotateCcw,
  RefreshCw
} from "lucide-react";
import { usePluginStatus } from "@/hooks/use-plugin-status";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface ToolCard {
  id: string;
  title: string;
  description: string;
  icon: typeof ClipboardList;
  iconColor: string;
  iconBg: string;
  url: string;
  pluginRequired?: string;
}

interface CustomTool {
  id: string;
  name: string;
  type: string;
  config: any;
  is_active: boolean;
  created_at: string;
}

function GoogleSheetsCardActions() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [connecting, setConnecting] = useState(false);

  const { data: status, isLoading } = useQuery<{ connected: boolean; email?: string }>({
    queryKey: ["/api/integrations/google/status"],
    retry: false,
  });

  const disconnectMutation = useMutation({
    mutationFn: () => apiRequest("DELETE", "/api/integrations/google/disconnect"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/integrations/google/status"] });
      toast({ title: t('toolsPage.googleAccountDisconnected', 'Google account disconnected') });
    },
    onError: () => {
      toast({ title: t('toolsPage.failedToDisconnect', 'Failed to disconnect'), variant: "destructive" });
    },
  });

  const handleConnect = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setConnecting(true);
    try {
      const res = await apiRequest("GET", "/api/integrations/google/auth");
      const body = await res.json();
      window.location.href = body.url;
    } catch (err: any) {
      const errData = err?.data ?? err?.response;
      const description = errData?.errorCode === "not_configured"
        ? t('toolsPage.googleOAuthNotConfigured', 'Google OAuth credentials are not configured. Please add them in Admin > Settings.')
        : errData?.error || undefined;
      toast({ title: t('toolsPage.googleConnectionFailed', 'Google connection failed'), description, variant: "destructive" });
      setConnecting(false);
    }
  };

  const handleDisconnect = (e: React.MouseEvent) => {
    e.stopPropagation();
    disconnectMutation.mutate();
  };

  if (isLoading) {
    return <Loader2 className="w-3.5 h-3.5 animate-spin text-muted-foreground" />;
  }

  if (status?.connected) {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="default" className="text-xs" data-testid="badge-google-sheets-status">
          {t('toolsPage.connected', 'Connected')}
        </Badge>
        {status.email && (
          <span className="text-xs text-green-600 dark:text-green-400 truncate max-w-[160px]" data-testid="text-google-sheets-email">
            {status.email}
          </span>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="h-6 px-2 text-xs text-muted-foreground"
          onClick={handleDisconnect}
          disabled={disconnectMutation.isPending}
          data-testid="button-disconnect-google"
        >
          <Unlink className="w-3 h-3 mr-1" />
          {t('toolsPage.disconnect', 'Disconnect')}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Badge variant="outline" className="text-xs text-muted-foreground" data-testid="badge-google-sheets-status">
        {t('toolsPage.notConnected', 'Not connected')}
      </Badge>
      <Button
        size="sm"
        variant="outline"
        className="h-7 text-xs"
        onClick={handleConnect}
        disabled={connecting}
        data-testid="button-connect-google"
      >
        <ExternalLink className="w-3 h-3 mr-1" />
        {connecting ? t('toolsPage.redirecting', 'Redirecting...') : t('toolsPage.connect', 'Connect')}
      </Button>
    </div>
  );
}

export default function ToolsPage() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const { isPluginEnabled } = usePluginStatus();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<string>("function-tools");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // New Tool Form state
  const [newToolName, setNewToolName] = useState("");
  const [newToolType, setNewToolType] = useState("http_api");
  const [newToolDesc, setNewToolDesc] = useState("");

  // Queries for Custom Function Tools
  const { data: tools = [], isLoading: toolsLoading } = useQuery<CustomTool[]>({
    queryKey: ["/api/tools"],
  });

  // Create Tool Mutation
  const createMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/tools", {
        name: newToolName,
        type: newToolType,
        config: {
          description: newToolDesc,
          method: newToolType === "http_api" ? "GET" : undefined,
          timeout: 5000,
        },
      });
      return await res.json();
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/tools"] });
      setIsCreateOpen(false);
      setNewToolName("");
      setNewToolDesc("");
      toast({
        title: "Tool created",
        description: `Configure settings for "${data.name}".`,
      });
      if (data?.id) {
        setLocation(`/app/tools/${data.id}`);
      }
    },
    onError: (err: any) => {
      toast({
        title: "Failed to create tool",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  // Archive / Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/tools/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tools"] });
      toast({ title: "Tool archived" });
    },
  });

  // Restore Mutation
  const unarchiveMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("POST", `/api/tools/${id}/unarchive`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tools"] });
      toast({ title: "Tool restored" });
    },
  });

  // Static integrations list
  const allIntegrations: ToolCard[] = useMemo(() => [
    {
      id: "forms",
      title: t('toolsPage.tools.forms.title', 'Forms'),
      description: t('toolsPage.tools.forms.description', 'Create and manage forms to collect data from your contacts and leads.'),
      icon: ClipboardList,
      iconColor: "text-cyan-600 dark:text-cyan-400",
      iconBg: "bg-cyan-500/10 dark:bg-cyan-500/20",
      url: "/app/flows/forms",
    },
    {
      id: "appointments",
      title: t('toolsPage.tools.appointments.title', 'Appointments'),
      description: t('toolsPage.tools.appointments.description', 'Manage appointment bookings from your AI agents and forms.'),
      icon: Calendar,
      iconColor: "text-rose-600 dark:text-rose-400",
      iconBg: "bg-rose-500/10 dark:bg-rose-500/20",
      url: "/app/flows/appointments",
    },
    {
      id: "webhooks",
      title: t('toolsPage.tools.webhooks.title', 'Webhooks'),
      description: t('toolsPage.tools.webhooks.description', 'Configure webhook endpoints to receive real-time event notifications.'),
      icon: Webhook,
      iconColor: "text-violet-600 dark:text-violet-400",
      iconBg: "bg-violet-500/10 dark:bg-violet-500/20",
      url: "/app/flows/webhooks",
    },
    {
      id: "widget",
      title: t('toolsPage.tools.widget.title', 'Website Widget'),
      description: t('toolsPage.tools.widget.description', 'Embed an AI chat widget on your website for visitor engagement.'),
      icon: Globe,
      iconColor: "text-sky-600 dark:text-sky-400",
      iconBg: "bg-sky-500/10 dark:bg-sky-500/20",
      url: "/app/tools/widgets",
    },
    {
      id: "crm",
      title: t('toolsPage.tools.crm.title', 'Quick CRM'),
      description: t('toolsPage.tools.crm.description', 'Organize and manage your leads with a kanban board and contact filters.'),
      icon: ContactRound,
      iconColor: "text-cyan-600 dark:text-cyan-400",
      iconBg: "bg-cyan-500/10 dark:bg-cyan-500/20",
      url: "/app/crm",
    },
    {
      id: "incoming-connections",
      title: t('toolsPage.tools.incomingConnections.title', 'Incoming Connections'),
      description: t('toolsPage.tools.incomingConnections.description', 'Manage incoming call routing and connect callers to your AI agents.'),
      icon: LinkIcon,
      iconColor: "text-amber-600 dark:text-amber-400",
      iconBg: "bg-amber-500/10 dark:bg-amber-500/20",
      url: "/app/incoming-connections",
    },
    {
      id: "developer",
      title: t('toolsPage.tools.developer.title', 'Developer / API Keys'),
      description: t('toolsPage.tools.developer.description', 'Manage API keys and access REST API documentation.'),
      icon: Key,
      iconColor: "text-amber-600 dark:text-amber-400",
      iconBg: "bg-amber-500/10 dark:bg-amber-500/20",
      url: "/app/settings?tab=developer",
      pluginRequired: "rest-api",
    },
    {
      id: "team",
      title: t('toolsPage.tools.team.title', 'Team Management'),
      description: t('toolsPage.tools.team.description', 'Invite team members, assign roles, and manage permissions.'),
      icon: Users,
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-500/10 dark:bg-blue-500/20",
      url: "/app/settings?tab=team",
      pluginRequired: "team-management",
    },
    {
      id: "messaging",
      title: t('toolsPage.tools.messaging.title', 'WhatsApp & Email'),
      description: t('toolsPage.tools.messaging.description', 'Configure WhatsApp Business and email messaging for your agents.'),
      icon: Mail,
      iconColor: "text-emerald-600 dark:text-emerald-400",
      iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
      url: "/app/settings?tab=messaging",
      pluginRequired: "messaging",
    },
    {
      id: "google-sheets",
      title: t('toolsPage.tools.googleSheets.title', 'Google Sheets'),
      description: t('toolsPage.tools.googleSheets.description', 'Push appointment and form data to Google Sheets in real time.'),
      icon: TableProperties,
      iconColor: "text-green-600 dark:text-green-400",
      iconBg: "bg-green-500/10 dark:bg-green-500/20",
      url: "/app/tools",
    },
  ], [t]);

  const visibleIntegrations = allIntegrations.filter((tool) => {
    if (!tool.pluginRequired) return true;
    return isPluginEnabled?.(tool.pluginRequired) ?? false;
  });

  const getToolTypeIcon = (toolType: string) => {
    switch (toolType) {
      case "http_api": return <Globe className="w-4 h-4 text-emerald-500" />;
      case "transfer_call": return <PhoneForwarded className="w-4 h-4 text-blue-500" />;
      case "transfer_agent": return <Bot className="w-4 h-4 text-purple-500" />;
      case "end_call": return <PhoneOff className="w-4 h-4 text-rose-500" />;
      case "mcp": return <Server className="w-4 h-4 text-amber-500" />;
      default: return <Sparkles className="w-4 h-4 text-primary" />;
    }
  };

  const filteredTools = tools.filter((tool) => {
    const matchesSearch = 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tool.config?.description || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || tool.type === filterType;
    return matchesSearch && matchesType;
  });

  const activeTools = filteredTools.filter((t) => t.is_active !== false);
  const archivedTools = filteredTools.filter((t) => t.is_active === false);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-bold tracking-tight">Tools & Integrations</h1>
            <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
              Agent Capabilities
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm max-w-2xl">
            Configure reusable function calling tools for your conversational voice bots and connect third-party platform integrations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            onClick={() => setIsCreateOpen(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Function Tool
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="function-tools" className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-primary" />
            <span>Agent Tools</span>
            <Badge variant="secondary" className="ml-1 text-[11px] px-1.5 py-0">
              {activeTools.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-sky-500" />
            <span>Platform Services</span>
            <Badge variant="secondary" className="ml-1 text-[11px] px-1.5 py-0">
              {visibleIntegrations.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Agent Function Tools (Dograh Parity) */}
        <TabsContent value="function-tools" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-lg">Agent Function Tools</CardTitle>
                  <CardDescription className="text-xs">
                    External REST APIs, telephony call forwarding, and sub-agent transfers callable by AI bots.
                  </CardDescription>
                </div>
                {/* Search & Filter */}
                <div className="flex items-center gap-2">
                  <div className="relative w-48 sm:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search tools..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 h-9 text-xs"
                    />
                  </div>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-36 h-9 text-xs">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="http_api">HTTP API</SelectItem>
                      <SelectItem value="transfer_call">Transfer Call</SelectItem>
                      <SelectItem value="transfer_agent">Transfer Agent</SelectItem>
                      <SelectItem value="end_call">End Call</SelectItem>
                      <SelectItem value="mcp">MCP Server</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {toolsLoading ? (
                <div className="py-12 flex flex-col items-center justify-center text-muted-foreground gap-3">
                  <RefreshCw className="w-6 h-6 animate-spin text-primary" />
                  <p className="text-sm">Loading tools...</p>
                </div>
              ) : activeTools.length === 0 ? (
                <div className="py-16 text-center border-2 border-dashed rounded-lg">
                  <Wrench className="w-10 h-10 mx-auto text-muted-foreground/60 mb-3" />
                  <h3 className="font-semibold text-base mb-1">No function tools configured</h3>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto mb-4">
                    Create your first function tool (such as an order lookup API or call transfer) to attach to your AI voice agents.
                  </p>
                  <Button size="sm" onClick={() => setIsCreateOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Tool
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activeTools.map((tool) => (
                    <Card 
                      key={tool.id} 
                      className="group hover:border-primary/50 transition-all hover:shadow-sm cursor-pointer relative"
                      onClick={() => setLocation(`/app/tools/${tool.id}`)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="flex items-center gap-1 text-[11px] font-mono uppercase">
                            {getToolTypeIcon(tool.type)}
                            <span>{tool.type.replace('_', ' ')}</span>
                          </Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm(`Archive tool "${tool.name}"?`)) {
                                deleteMutation.mutate(tool.id);
                              }
                            }}
                            title="Archive Tool"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                        <CardTitle className="text-base font-semibold group-hover:text-primary transition-colors mt-2">
                          {tool.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-xs text-muted-foreground line-clamp-2 min-h-[32px]">
                          {tool.config?.description || "No prompt description specified."}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-2.5">
                          <span className="font-mono text-[11px]">
                            {tool.type === "http_api" ? (tool.config?.method || "GET") : "Action"}
                          </span>
                          <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-primary font-medium">
                            Configure <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Archived Tools Section */}
              {archivedTools.length > 0 && (
                <div className="border-t pt-6 space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Archived Tools ({archivedTools.length})
                  </h4>
                  <div className="divide-y border rounded-lg overflow-hidden bg-muted/20">
                    {archivedTools.map((tool) => (
                      <div key={tool.id} className="p-3 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2.5">
                          {getToolTypeIcon(tool.type)}
                          <div>
                            <span className="font-medium text-xs text-muted-foreground line-through">
                              {tool.name}
                            </span>
                            <span className="text-[11px] text-muted-foreground ml-2">
                              ({tool.type.replace('_', ' ')})
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => unarchiveMutation.mutate(tool.id)}
                        >
                          <RotateCcw className="w-3 h-3 mr-1" />
                          Restore
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Platform Integrations */}
        <TabsContent value="integrations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleIntegrations.map((tool) => {
              const Icon = tool.icon;
              return (
                <Card 
                  key={tool.id} 
                  className="hover:border-primary/50 transition-colors cursor-pointer group"
                  onClick={() => {
                    if (tool.id !== "google-sheets") {
                      setLocation(tool.url);
                    }
                  }}
                  data-testid={`card-tool-${tool.id}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${tool.iconBg}`}>
                        <Icon className={`w-6 h-6 ${tool.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors" data-testid={`text-tool-title-${tool.id}`}>
                          {tool.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2" data-testid={`text-tool-desc-${tool.id}`}>
                          {tool.description}
                        </p>
                        {tool.id === "google-sheets" && (
                          <div className="mt-3">
                            <GoogleSheetsCardActions />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Tool Modal */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={(e) => { e.preventDefault(); createMutation.mutate(); }}>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary" />
                Create New Function Tool
              </DialogTitle>
              <DialogDescription className="text-xs">
                Create a tool definition for your AI agents to execute during phone calls.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="create-tool-name" className="text-xs font-semibold">Tool Identifier *</Label>
                <Input
                  id="create-tool-name"
                  placeholder="e.g. check_balance, transfer_to_agent"
                  value={newToolName}
                  onChange={(e) => setNewToolName(e.target.value)}
                  className="font-mono text-xs"
                  required
                />
                <p className="text-[11px] text-muted-foreground">
                  Alphanumeric snake_case identifier used in model function definitions.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="create-tool-type" className="text-xs font-semibold">Tool Type *</Label>
                <Select value={newToolType} onValueChange={setNewToolType}>
                  <SelectTrigger id="create-tool-type" className="text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="http_api">External HTTP / REST API</SelectItem>
                    <SelectItem value="transfer_call">Transfer Phone Call (PSTN/SIP)</SelectItem>
                    <SelectItem value="transfer_agent">Transfer to Another Voice Agent</SelectItem>
                    <SelectItem value="end_call">End Call with Polite Goodbye</SelectItem>
                    <SelectItem value="mcp">Model Context Protocol (MCP)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="create-tool-desc" className="text-xs font-semibold">Prompt Description</Label>
                <Input
                  id="create-tool-desc"
                  placeholder="e.g. Fetches current customer account balance by ID"
                  value={newToolDesc}
                  onChange={(e) => setNewToolDesc(e.target.value)}
                  className="text-xs"
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" size="sm" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={createMutation.isPending || !newToolName}>
                {createMutation.isPending ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5 mr-1.5" />
                    Create & Configure
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
