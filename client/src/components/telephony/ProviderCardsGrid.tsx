import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Copy, Pencil, Trash2, Plus, Server, Phone, CheckCircle2, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

export interface TelephonyConfigItem {
  id: string | number;
  name: string;
  provider: string;
  is_default_outbound?: boolean;
  is_active?: boolean;
  phone_number_count?: number;
  credentials?: Record<string, any>;
}

interface ProviderCardsGridProps {
  items: TelephonyConfigItem[];
  onAddConfig: () => void;
  onEditConfig: (item: TelephonyConfigItem) => void;
  onDeleteConfig: (item: TelephonyConfigItem) => void;
  onSetDefault: (item: TelephonyConfigItem) => void;
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

export default function ProviderCardsGrid({
  items,
  onAddConfig,
  onEditConfig,
  onDeleteConfig,
  onSetDefault,
}: ProviderCardsGridProps) {
  const { toast } = useToast();

  const copyConfigId = (id: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(String(id));
    toast({ title: "Configuration ID copied", description: `ID ${id} copied to clipboard.` });
  };

  if (!items || items.length === 0) {
    return (
      <Card className="border-dashed border-2 border-border/80 bg-card/50 my-4">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <Server className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-lg">No telephony configurations yet</CardTitle>
          <CardDescription className="text-xs">
            Connect one or more provider accounts (Twilio, Exotel, Plivo, Asterisk, or Indian SIP) to make and receive calls.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center pb-6">
          <Button onClick={onAddConfig} className="gap-2">
            <Plus className="h-4 w-4" /> Add configuration
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 my-4">
      {items.map((item) => {
        const badgeColor = PROVIDER_COLORS[item.provider] || "bg-secondary text-secondary-foreground";
        const count = item.phone_number_count ?? 1;

        return (
          <Card
            key={item.id}
            className="group relative border border-border/70 hover:border-primary/50 transition-all bg-card/90 shadow-sm hover:shadow"
          >
            <CardContent className="p-4 space-y-3">
              {/* Header: Name + Badges */}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-sm truncate text-foreground" title={item.name}>
                      {item.name}
                    </h3>
                    <Badge variant="outline" className={`text-[10px] uppercase font-mono px-1.5 py-0 border ${badgeColor}`}>
                      {item.provider}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <Phone className="h-3 w-3" />
                    <span>
                      {count} phone {count === 1 ? "number" : "numbers"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {item.is_default_outbound ? (
                    <Badge className="gap-1 bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-[11px] font-medium">
                      <Star className="h-3 w-3 fill-current" />
                      Default
                    </Badge>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-amber-500"
                      onClick={() => onSetDefault(item)}
                      title="Set as default for outbound calls"
                    >
                      <Star className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Status and Config ID */}
              <div className="flex items-center justify-between pt-1 border-t border-border/40 text-xs">
                <button
                  type="button"
                  onClick={(e) => copyConfigId(item.id, e)}
                  className="font-mono text-[11px] text-muted-foreground hover:text-foreground inline-flex items-center gap-1 group/btn"
                  title="Click to copy Configuration ID"
                >
                  <span>ID: {item.id}</span>
                  <Copy className="h-3 w-3 opacity-60 group-hover/btn:opacity-100" />
                </button>

                <div className="flex items-center gap-1">
                  <Link href={`/app/telephony-configurations/${item.id}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                      title="Manage trunks and assigned numbers"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Manage
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                    onClick={() => onEditConfig(item)}
                  >
                    <Pencil className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs text-destructive hover:bg-destructive/10"
                    onClick={() => onDeleteConfig(item)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
