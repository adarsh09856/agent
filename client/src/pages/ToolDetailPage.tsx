import React, { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
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
  ArrowLeft, 
  Save, 
  FlaskConical, 
  Code, 
  Trash2, 
  Plus, 
  X, 
  Play, 
  RefreshCw, 
  Check, 
  Globe, 
  PhoneForwarded, 
  Bot, 
  PhoneOff, 
  Server,
  Clock,
  Sparkles,
  HelpCircle,
  RotateCcw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ToolParam {
  name: string;
  type: string;
  description: string;
  required: boolean;
}

interface KeyVal {
  key: string;
  value: string;
}

export default function ToolDetailPage() {
  const [, params] = useRoute("/app/tools/:toolId");
  const toolId = params?.toolId;
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Dialog states
  const [showTestModal, setShowTestModal] = useState(false);
  const [showJsonModal, setShowJsonModal] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [type, setType] = useState("http_api");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  // HTTP API specific
  const [httpMethod, setHttpMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState<KeyVal[]>([]);
  const [parameters, setParameters] = useState<ToolParam[]>([]);
  const [presetParams, setPresetParams] = useState<KeyVal[]>([]);
  const [bodyTemplate, setBodyTemplate] = useState("");
  const [timeoutMs, setTimeoutMs] = useState(5000);
  const [waitMessage, setWaitMessage] = useState("");

  // Transfer Call specific
  const [transferMode, setTransferMode] = useState<"static" | "dynamic">("static");
  const [transferDestination, setTransferDestination] = useState("");

  // Transfer Agent specific
  const [targetAgentId, setTargetAgentId] = useState("");
  const [transferAgentPhrase, setTransferAgentPhrase] = useState("");

  // End Call specific
  const [goodbyeMessage, setGoodbyeMessage] = useState("");
  const [captureReason, setCaptureReason] = useState(true);
  const [reasonPrompt, setReasonPrompt] = useState("");

  // MCP specific
  const [mcpServerUrl, setMcpServerUrl] = useState("");
  const [mcpToolFilter, setMcpToolFilter] = useState("");

  // Test Modal states
  const [testParams, setTestParams] = useState<Record<string, string>>({});
  const [testResult, setTestResult] = useState<any>(null);
  const [isTesting, setIsTesting] = useState(false);

  // Fetch Tool Data
  const { data: tool, isLoading: toolLoading, error: toolError } = useQuery<any>({
    queryKey: [`/api/tools/${toolId}`],
    enabled: !!toolId && toolId !== "new",
  });

  // Fetch available agents (for Transfer Agent tool)
  const { data: agents = [] } = useQuery<any[]>({
    queryKey: ["/api/agents"],
  });

  // Sync state when tool loads
  useEffect(() => {
    if (tool) {
      setName(tool.name || "");
      setType(tool.type || "http_api");
      setIsActive(tool.is_active !== false);
      const cfg = tool.config || {};
      setDescription(cfg.description || "");
      setHttpMethod(cfg.method || "GET");
      setUrl(cfg.url || "");
      setHeaders(cfg.headers || []);
      setParameters(cfg.parameters || []);
      setPresetParams(cfg.preset_parameters || []);
      setBodyTemplate(cfg.body_template ? (typeof cfg.body_template === "string" ? cfg.body_template : JSON.stringify(cfg.body_template, null, 2)) : "");
      setTimeoutMs(cfg.timeout || 5000);
      setWaitMessage(cfg.wait_message || "");
      setTransferMode(cfg.transfer_mode || "static");
      setTransferDestination(cfg.destination || "");
      setTargetAgentId(cfg.target_agent_id || "");
      setTransferAgentPhrase(cfg.transfer_phrase || "");
      setGoodbyeMessage(cfg.goodbye_message || "");
      setCaptureReason(cfg.capture_reason !== false);
      setReasonPrompt(cfg.reason_prompt || "");
      setMcpServerUrl(cfg.server_url || "");
      setMcpToolFilter(cfg.tool_filter || "");
    }
  }, [tool]);

  // Save Mutation
  const saveMutation = useMutation({
    mutationFn: async () => {
      const configPayload: any = {
        description,
        wait_message: waitMessage,
      };

      if (type === "http_api") {
        configPayload.method = httpMethod;
        configPayload.url = url;
        configPayload.headers = headers;
        configPayload.parameters = parameters;
        configPayload.preset_parameters = presetParams;
        configPayload.timeout = Number(timeoutMs) || 5000;
        try {
          configPayload.body_template = bodyTemplate ? JSON.parse(bodyTemplate) : undefined;
        } catch {
          configPayload.body_template = bodyTemplate;
        }
      } else if (type === "transfer_call") {
        configPayload.transfer_mode = transferMode;
        configPayload.destination = transferDestination;
      } else if (type === "transfer_agent") {
        configPayload.target_agent_id = targetAgentId;
        configPayload.transfer_phrase = transferAgentPhrase;
      } else if (type === "end_call") {
        configPayload.goodbye_message = goodbyeMessage;
        configPayload.capture_reason = captureReason;
        configPayload.reason_prompt = reasonPrompt;
      } else if (type === "mcp") {
        configPayload.server_url = mcpServerUrl;
        configPayload.tool_filter = mcpToolFilter;
      }

      const payload = {
        name,
        type,
        is_active: isActive,
        config: configPayload,
      };

      if (toolId && toolId !== "new") {
        return await apiRequest("PUT", `/api/tools/${toolId}`, payload);
      } else {
        return await apiRequest("POST", "/api/tools", payload);
      }
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/tools"] });
      queryClient.invalidateQueries({ queryKey: [`/api/tools/${toolId}`] });
      toast({
        title: "Tool saved successfully",
        description: `"${name}" is ready for voice agent execution.`,
      });
      if (toolId === "new" && data?.id) {
        setLocation(`/app/tools/${data.id}`);
      }
    },
    onError: (err: any) => {
      toast({
        title: "Failed to save tool",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  // Archive / Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", `/api/tools/${toolId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tools"] });
      toast({
        title: "Tool archived",
        description: "The tool has been moved to archives.",
      });
      setLocation("/app/tools");
    },
  });

  // Test Runner handler
  const handleRunTest = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await apiRequest("POST", "/api/tools/test", {
        method: httpMethod,
        url,
        headers,
        params: testParams,
        body: bodyTemplate ? JSON.parse(bodyTemplate) : undefined,
        timeout: timeoutMs,
      });
      const data = await res.json();
      setTestResult(data);
    } catch (err: any) {
      setTestResult({
        success: false,
        error: err.message,
      });
    } finally {
      setIsTesting(false);
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case "http_api": return <Globe className="w-4 h-4 text-emerald-500" />;
      case "transfer_call": return <PhoneForwarded className="w-4 h-4 text-blue-500" />;
      case "transfer_agent": return <Bot className="w-4 h-4 text-purple-500" />;
      case "end_call": return <PhoneOff className="w-4 h-4 text-rose-500" />;
      case "mcp": return <Server className="w-4 h-4 text-amber-500" />;
      default: return <Sparkles className="w-4 h-4 text-primary" />;
    }
  };

  if (toolLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center gap-3">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading tool configuration...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setLocation("/app/tools")}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">
                {name || (toolId === "new" ? "New Function Tool" : "Tool Editor")}
              </h1>
              <Badge variant="outline" className="flex items-center gap-1 text-xs uppercase font-mono py-0.5">
                {getTypeIcon()}
                <span>{type.replace('_', ' ')}</span>
              </Badge>
              {!isActive && (
                <Badge variant="secondary" className="text-xs text-muted-foreground">
                  Archived
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Function calling tool executable by conversational voice agents in real time.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {type === "http_api" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // Initialize test params from parameters schema
                const initial: Record<string, string> = {};
                parameters.forEach((p) => {
                  initial[p.name] = "";
                });
                setTestParams(initial);
                setTestResult(null);
                setShowTestModal(true);
              }}
              className="text-xs"
            >
              <FlaskConical className="w-4 h-4 mr-1.5 text-emerald-600 dark:text-emerald-400" />
              Live Test
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowJsonModal(true)}
            className="text-xs"
          >
            <Code className="w-4 h-4 mr-1.5" />
            View JSON
          </Button>

          {toolId !== "new" && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                if (confirm(`Archive tool "${name}"?`)) {
                  deleteMutation.mutate();
                }
              }}
              className="text-muted-foreground hover:text-destructive"
              title="Archive Tool"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}

          <Button
            onClick={() => saveMutation.mutate()}
            disabled={saveMutation.isPending || !name}
            className="text-xs shadow-sm"
          >
            {saveMutation.isPending ? (
              <RefreshCw className="w-4 h-4 mr-1.5 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-1.5" />
            )}
            Save Tool
          </Button>
        </div>
      </div>

      {/* Main Settings Form */}
      <div className="space-y-6">
        {/* Core Metadata Card */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Tool Identity & Behavior</CardTitle>
            <CardDescription className="text-xs">
              Define the name and semantic instructions for the LLM to understand when to invoke this tool.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tool-name" className="text-xs font-semibold">Tool Name *</Label>
                <Input
                  id="tool-name"
                  placeholder="e.g. check_order_status, book_appointment"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="font-mono text-sm"
                  required
                />
                <p className="text-[11px] text-muted-foreground">
                  Use snake_case with letters, numbers, and underscores.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tool-type" className="text-xs font-semibold">Tool Category *</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger id="tool-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="http_api">External HTTP / REST API</SelectItem>
                    <SelectItem value="transfer_call">Transfer Phone Call (PSTN/SIP)</SelectItem>
                    <SelectItem value="transfer_agent">Transfer to Another Agent</SelectItem>
                    <SelectItem value="end_call">End Call with Goodbye</SelectItem>
                    <SelectItem value="mcp">Model Context Protocol (MCP)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tool-desc" className="text-xs font-semibold">
                Prompt Description (Visible to LLM) *
              </Label>
              <Textarea
                id="tool-desc"
                placeholder="Instruct the AI when and why to trigger this tool. E.g.: 'Call this tool when the customer provides their order number to fetch the current tracking status.'"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="text-xs"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tool-wait" className="text-xs font-semibold">
                Spoken Wait Message (Optional)
              </Label>
              <Input
                id="tool-wait"
                placeholder="e.g. Please hold on while I check your order details..."
                value={waitMessage}
                onChange={(e) => setWaitMessage(e.target.value)}
                className="text-xs"
              />
              <p className="text-[11px] text-muted-foreground">
                Spoken naturally to the caller while this tool executes in the background.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* TYPE 1: HTTP API Editor */}
        {type === "http_api" && (
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <Globe className="w-4 h-4 text-emerald-500" />
                  HTTP Endpoint Request
                </CardTitle>
                <CardDescription className="text-xs">
                  Configure the target REST URL, method, and execution timeout.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="w-full sm:w-32">
                    <Select value={httpMethod} onValueChange={setHttpMethod}>
                      <SelectTrigger className="font-semibold text-xs h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GET">GET</SelectItem>
                        <SelectItem value="POST">POST</SelectItem>
                        <SelectItem value="PUT">PUT</SelectItem>
                        <SelectItem value="PATCH">PATCH</SelectItem>
                        <SelectItem value="DELETE">DELETE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex-1">
                    <Input
                      placeholder="https://api.yourcompany.com/v1/orders/{order_id}"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="font-mono text-xs h-9"
                    />
                  </div>

                  <div className="w-full sm:w-36">
                    <div className="flex items-center gap-1.5 border rounded-md px-2 h-9">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                      <Input
                        type="number"
                        value={timeoutMs}
                        onChange={(e) => setTimeoutMs(Number(e.target.value))}
                        className="border-0 p-0 text-xs h-auto w-16"
                      />
                      <span className="text-[11px] text-muted-foreground">ms</span>
                    </div>
                  </div>
                </div>

                {/* Custom Headers */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-semibold">Custom Headers</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => setHeaders([...headers, { key: "", value: "" }])}
                    >
                      <Plus className="w-3 h-3 mr-1" /> Add Header
                    </Button>
                  </div>
                  {headers.length === 0 ? (
                    <p className="text-xs text-muted-foreground italic">No custom headers configured.</p>
                  ) : (
                    <div className="space-y-2">
                      {headers.map((h, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Input
                            placeholder="Header name (e.g. Authorization)"
                            value={h.key}
                            onChange={(e) => {
                              const updated = [...headers];
                              updated[idx].key = e.target.value;
                              setHeaders(updated);
                            }}
                            className="font-mono text-xs h-8 flex-1"
                          />
                          <Input
                            placeholder="Header value (e.g. Bearer token)"
                            value={h.value}
                            onChange={(e) => {
                              const updated = [...headers];
                              updated[idx].value = e.target.value;
                              setHeaders(updated);
                            }}
                            className="font-mono text-xs h-8 flex-1"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => setHeaders(headers.filter((_, i) => i !== idx))}
                          >
                            <X className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Input Parameters Table */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Input Parameters (Schema)</CardTitle>
                    <CardDescription className="text-xs">
                      Extracted by the AI model from conversation context and sent to this tool.
                    </CardDescription>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => setParameters([
                      ...parameters, 
                      { name: "", type: "string", description: "", required: true }
                    ])}
                  >
                    <Plus className="w-3 h-3 mr-1" /> Add Parameter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {parameters.length === 0 ? (
                  <p className="text-xs text-muted-foreground italic py-3 text-center border-2 border-dashed rounded">
                    No input parameters defined. The LLM will execute this tool with no arguments.
                  </p>
                ) : (
                  <div className="divide-y border rounded-md overflow-hidden">
                    <div className="grid grid-cols-12 gap-2 bg-muted/50 p-2 text-[11px] font-semibold text-muted-foreground">
                      <div className="col-span-3">NAME</div>
                      <div className="col-span-2">TYPE</div>
                      <div className="col-span-5">DESCRIPTION (FOR LLM)</div>
                      <div className="col-span-1 text-center">REQ</div>
                      <div className="col-span-1"></div>
                    </div>
                    {parameters.map((param, idx) => (
                      <div key={idx} className="grid grid-cols-12 gap-2 p-2 items-center text-xs">
                        <div className="col-span-3">
                          <Input
                            placeholder="param_name"
                            value={param.name}
                            onChange={(e) => {
                              const updated = [...parameters];
                              updated[idx].name = e.target.value;
                              setParameters(updated);
                            }}
                            className="font-mono text-xs h-8"
                          />
                        </div>
                        <div className="col-span-2">
                          <Select 
                            value={param.type} 
                            onValueChange={(val) => {
                              const updated = [...parameters];
                              updated[idx].type = val;
                              setParameters(updated);
                            }}
                          >
                            <SelectTrigger className="h-8 text-xs font-mono">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="string">string</SelectItem>
                              <SelectItem value="number">number</SelectItem>
                              <SelectItem value="boolean">boolean</SelectItem>
                              <SelectItem value="object">object</SelectItem>
                              <SelectItem value="array">array</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-5">
                          <Input
                            placeholder="Describe what this parameter is"
                            value={param.description}
                            onChange={(e) => {
                              const updated = [...parameters];
                              updated[idx].description = e.target.value;
                              setParameters(updated);
                            }}
                            className="text-xs h-8"
                          />
                        </div>
                        <div className="col-span-1 flex justify-center">
                          <Switch
                            checked={param.required}
                            onCheckedChange={(checked) => {
                              const updated = [...parameters];
                              updated[idx].required = checked;
                              setParameters(updated);
                            }}
                          />
                        </div>
                        <div className="col-span-1 flex justify-end">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground hover:text-destructive"
                            onClick={() => setParameters(parameters.filter((_, i) => i !== idx))}
                          >
                            <X className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Request Body Template */}
            {['POST', 'PUT', 'PATCH'].includes(httpMethod) && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Request Body Template (JSON)</CardTitle>
                  <CardDescription className="text-xs">
                    Define the payload structure. Use parameters as placeholders: <code className="bg-muted px-1 rounded">{"{order_id}"}</code>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder={`{\n  "order_id": "{order_id}",\n  "status": "lookup"\n}`}
                    value={bodyTemplate}
                    onChange={(e) => setBodyTemplate(e.target.value)}
                    rows={4}
                    className="font-mono text-xs"
                  />
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* TYPE 2: Transfer Call Editor */}
        {type === "transfer_call" && (
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <PhoneForwarded className="w-4 h-4 text-blue-500" />
                Live Call Transfer Settings
              </CardTitle>
              <CardDescription className="text-xs">
                Forward the active telephone call to a real human agent, supervisor, or external call center.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-semibold">Transfer Routing Mode</Label>
                <div className="grid grid-cols-2 gap-3 max-w-md">
                  <Button
                    type="button"
                    variant={transferMode === "static" ? "default" : "outline"}
                    className="text-xs"
                    onClick={() => setTransferMode("static")}
                  >
                    Fixed Phone Number
                  </Button>
                  <Button
                    type="button"
                    variant={transferMode === "dynamic" ? "default" : "outline"}
                    className="text-xs"
                    onClick={() => setTransferMode("dynamic")}
                  >
                    Dynamic Context
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="transfer-dest" className="text-xs font-semibold">
                  {transferMode === "static" ? "Destination Phone Number (E.164)" : "Context Variable Name"}
                </Label>
                <Input
                  id="transfer-dest"
                  placeholder={transferMode === "static" ? "+918047192000 or +14155550199" : "{{supervisor_phone}}"}
                  value={transferDestination}
                  onChange={(e) => setTransferDestination(e.target.value)}
                  className="font-mono text-xs"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* TYPE 3: Transfer Agent Editor */}
        {type === "transfer_agent" && (
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <Bot className="w-4 h-4 text-purple-500" />
                Transfer to Another Voice Agent
              </CardTitle>
              <CardDescription className="text-xs">
                Cascade the conversation to a specialized secondary agent (e.g. Sales bot transferring to Support bot).
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="target-agent" className="text-xs font-semibold">Target Voice Agent</Label>
                <Select value={targetAgentId} onValueChange={setTargetAgentId}>
                  <SelectTrigger id="target-agent">
                    <SelectValue placeholder="Select target agent" />
                  </SelectTrigger>
                  <SelectContent>
                    {agents.map((ag: any) => (
                      <SelectItem key={ag.id} value={String(ag.id)}>
                        {ag.name} ({ag.language || 'en-US'})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="agent-phrase" className="text-xs font-semibold">Transition Spoken Phrase</Label>
                <Input
                  id="agent-phrase"
                  placeholder="e.g. Let me connect you with our billing specialist right now..."
                  value={transferAgentPhrase}
                  onChange={(e) => setTransferAgentPhrase(e.target.value)}
                  className="text-xs"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* TYPE 4: End Call Editor */}
        {type === "end_call" && (
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <PhoneOff className="w-4 h-4 text-rose-500" />
                End Call Termination Settings
              </CardTitle>
              <CardDescription className="text-xs">
                Instruct the AI agent on how to terminate the telephone call politely and classify call outcomes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="goodbye-msg" className="text-xs font-semibold">Goodbye Spoken Message</Label>
                <Input
                  id="goodbye-msg"
                  placeholder="e.g. Thank you for calling KodeWaves! Have a wonderful day. Goodbye."
                  value={goodbyeMessage}
                  onChange={(e) => setGoodbyeMessage(e.target.value)}
                  className="text-xs"
                />
              </div>

              <div className="flex items-center justify-between border p-3 rounded-md">
                <div>
                  <Label className="text-xs font-semibold">Capture Termination Reason</Label>
                  <p className="text-[11px] text-muted-foreground">
                    Logs why the call ended (e.g. inquiry solved, customer unavailable, callback requested).
                  </p>
                </div>
                <Switch checked={captureReason} onCheckedChange={setCaptureReason} />
              </div>

              {captureReason && (
                <div className="space-y-2">
                  <Label htmlFor="reason-prompt" className="text-xs font-semibold">Classification Categories</Label>
                  <Input
                    id="reason-prompt"
                    placeholder="e.g. resolved, scheduled_appointment, uninterested, wrong_number"
                    value={reasonPrompt}
                    onChange={(e) => setReasonPrompt(e.target.value)}
                    className="text-xs font-mono"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* TYPE 5: MCP Connector Editor */}
        {type === "mcp" && (
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <Server className="w-4 h-4 text-amber-500" />
                Model Context Protocol (MCP) Server
              </CardTitle>
              <CardDescription className="text-xs">
                Connect external streamable HTTP MCP servers to automatically discover and expose remote function tools.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mcp-url" className="text-xs font-semibold">MCP Server Streamable URL</Label>
                <Input
                  id="mcp-url"
                  placeholder="https://mcp.yourdomain.com/sse or /tools"
                  value={mcpServerUrl}
                  onChange={(e) => setMcpServerUrl(e.target.value)}
                  className="font-mono text-xs"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mcp-filter" className="text-xs font-semibold">Tool Name Whitelist Filter (Optional)</Label>
                <Input
                  id="mcp-filter"
                  placeholder="comma-separated tool names, e.g. search_database, send_sms"
                  value={mcpToolFilter}
                  onChange={(e) => setMcpToolFilter(e.target.value)}
                  className="font-mono text-xs"
                />
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* MODAL 1: Live HTTP Test Harness Modal */}
      <Dialog open={showTestModal} onOpenChange={setShowTestModal}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-emerald-500" />
              Live Tool Test Sandbox
            </DialogTitle>
            <DialogDescription className="text-xs">
              Test execution against your endpoint without initiating a live telephone call.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="flex items-center gap-2 text-xs font-mono bg-muted p-2 rounded">
              <Badge variant="secondary" className="font-bold">{httpMethod}</Badge>
              <span className="truncate">{url || "No URL configured"}</span>
            </div>

            {/* Test Parameter Inputs */}
            {parameters.length > 0 && (
              <div className="space-y-2">
                <Label className="text-xs font-semibold">Test Parameter Values</Label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {parameters.map((p) => (
                    <div key={p.name} className="flex items-center gap-2">
                      <span className="font-mono text-xs w-28 truncate" title={p.name}>{p.name}:</span>
                      <Input
                        placeholder={`Value for ${p.name} (${p.type})`}
                        value={testParams[p.name] || ""}
                        onChange={(e) => setTestParams({ ...testParams, [p.name]: e.target.value })}
                        className="text-xs h-8 flex-1"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Execution Result */}
            {testResult && (
              <div className="space-y-2 border-t pt-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Response:</span>
                    <Badge variant={testResult.success ? "default" : "destructive"} className="text-[11px]">
                      {testResult.status || (testResult.success ? "200 OK" : "ERROR")}
                    </Badge>
                  </div>
                  {testResult.latencyMs !== undefined && (
                    <span className="text-muted-foreground font-mono text-[11px]">
                      Latency: {testResult.latencyMs}ms
                    </span>
                  )}
                </div>

                <div className="bg-slate-950 text-slate-100 rounded p-2.5 max-h-48 overflow-y-auto font-mono text-[11px]">
                  <pre>{JSON.stringify(testResult.data || testResult.error || testResult, null, 2)}</pre>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setShowTestModal(false)}>
              Close
            </Button>
            <Button size="sm" onClick={handleRunTest} disabled={isTesting || !url}>
              {isTesting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  Sending Request...
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 mr-1.5" />
                  Send Test Request
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL 2: View JSON Schema Modal */}
      <Dialog open={showJsonModal} onOpenChange={setShowJsonModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              <Code className="w-5 h-5 text-primary" />
              Tool JSON Definition
            </DialogTitle>
            <DialogDescription className="text-xs">
              Raw JSON definition passed to the LLM during conversation sessions.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-slate-950 text-slate-100 rounded p-3 font-mono text-[11px] max-h-80 overflow-y-auto">
            <pre>
              {JSON.stringify({
                name,
                type,
                description,
                parameters: {
                  type: "object",
                  properties: parameters.reduce((acc: any, p) => {
                    acc[p.name] = { type: p.type, description: p.description };
                    return acc;
                  }, {}),
                  required: parameters.filter(p => p.required).map(p => p.name),
                },
              }, null, 2)}
            </pre>
          </div>
          <DialogFooter>
            <Button size="sm" onClick={() => setShowJsonModal(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
