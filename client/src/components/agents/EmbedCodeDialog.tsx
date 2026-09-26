import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Copy, Check, Globe, Code, Sparkles, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmbedCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agent: {
    id: string | number;
    name: string;
    language?: string | null;
  } | null;
}

export function EmbedCodeDialog({ open, onOpenChange, agent }: EmbedCodeDialogProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [widgetPosition, setWidgetPosition] = useState<"bottom-right" | "bottom-left">("bottom-right");
  const [primaryColor, setPrimaryColor] = useState("#4F46E5");
  const [buttonText, setButtonText] = useState("Talk to AI");
  const [widgetTitle, setWidgetTitle] = useState(agent?.name || "AI Voice Assistant");

  if (!agent) return null;

  const origin = typeof window !== "undefined" ? window.location.origin : "https://kodewaves.in";

  const embedScript = `<!-- KodeWaves AI Voice Agent Web Widget -->
<script
  src="${origin}/widget/embed.js"
  data-agent-id="${agent.id}"
  data-title="${widgetTitle || agent.name}"
  data-color="${primaryColor}"
  data-position="${widgetPosition}"
  data-button-text="${buttonText}"
  defer
></script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    toast({
      title: "Embed snippet copied",
      description: "Paste this snippet before the </body> tag of your website.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Embed Voice Agent on Website
          </DialogTitle>
          <DialogDescription className="text-xs">
            Deploy <span className="font-semibold text-foreground">{agent.name}</span> directly on your website so visitors can talk to your AI agent in 1 click.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Customization Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Launcher Button Text</Label>
              <Input
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                placeholder="e.g. Talk to Sales, Speak with AI"
                className="h-8 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Brand Primary Color</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-8 h-8 rounded border cursor-pointer p-0.5"
                />
                <Input
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="h-8 text-xs font-mono"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Screen Position</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant={widgetPosition === "bottom-right" ? "default" : "outline"}
                size="sm"
                className="h-8 text-xs"
                onClick={() => setWidgetPosition("bottom-right")}
              >
                Bottom Right Corner
              </Button>
              <Button
                type="button"
                variant={widgetPosition === "bottom-left" ? "default" : "outline"}
                size="sm"
                className="h-8 text-xs"
                onClick={() => setWidgetPosition("bottom-left")}
              >
                Bottom Left Corner
              </Button>
            </div>
          </div>

          {/* Snippet Code Box */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-muted-foreground" />
                HTML Embed Code
              </Label>
              <Badge variant="outline" className="text-[10px]">
                Zero dependencies • WebRTC Audio
              </Badge>
            </div>

            <div className="relative group">
              <pre className="bg-slate-950 text-slate-100 p-3 rounded-lg text-xs font-mono overflow-x-auto max-h-40 border border-border/40">
                <code>{embedScript}</code>
              </pre>
              <Button
                size="sm"
                variant="secondary"
                className="absolute top-2 right-2 h-7 text-xs font-sans opacity-90 group-hover:opacity-100 transition-opacity"
                onClick={handleCopy}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 mr-1" />
                    Copy Code
                  </>
                )}
              </Button>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Works on WordPress, Shopify, Webflow, React, Next.js, and static HTML websites.
            </p>
          </div>
        </div>

        <DialogFooter className="flex sm:justify-between items-center">
          <span className="text-[11px] text-muted-foreground flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Real-time in-browser WebRTC audio streaming
          </span>
          <Button size="sm" onClick={() => onOpenChange(false)}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EmbedCodeDialog;
