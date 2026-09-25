/**
 * ============================================================
 * © 2025 Diploy — a brand of Bisht Technologies Private Limited
 * Original Author: BTPL Engineering Team
 * Website: https://diploy.in
 * Contact: cs@diploy.in
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
import { useTranslation } from "react-i18next";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, CreditCard, Settings, BarChart, Phone, Package, Bell, ListOrdered, Loader2, CheckCircle2, XCircle, ContactRound, DollarSign, RefreshCw, Server, Receipt, Mail, MessageSquare, Headphones, ShieldAlert, Brain, Power, Mic, Sparkles, Building2, ChevronLeft, ChevronRight, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import UserManagement from "@/components/admin/UserManagement";
import PlanManagement from "@/components/admin/PlanManagement";
import LLMModelsManagement from "@/components/admin/LLMModelsManagement";
import CreditPackages from "@/components/admin/CreditPackages";
import SettingsPage from "@/components/admin/SettingsPage";
import Analytics from "@/components/admin/Analytics";
import PhoneNumbers from "@/components/admin/PhoneNumbers";
import Notifications from "@/components/admin/Notifications";
import BatchJobsMonitor from "@/components/admin/BatchJobsMonitor";
import AllContactsAdmin from "@/components/admin/AllContactsAdmin";
import PaymentsSettings from "@/components/admin/PaymentsSettings";
import TransactionsManagement from "@/components/admin/TransactionsManagement";
import CreditBackfillManagement from "@/components/admin/CreditBackfillManagement";
import EmailSettingsManagement from "@/components/admin/EmailSettingsManagement";
import CallMonitoring from "@/components/admin/CallMonitoring";
import BannedWordsManagement from "@/components/admin/BannedWordsManagement";
import OpenAIPoolManagement from "@/components/admin/OpenAIPoolManagement";
import PlivoSettings from "@/components/admin/PlivoSettings";
import VoiceEngineSettings from "@/components/admin/VoiceEngineSettings";
import { Badge } from "@/components/ui/badge";
import { Suspense } from "react";
import { usePluginRegistry } from "@/contexts/plugin-registry";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { AuthStorage } from "@/lib/auth-storage";
import { useToast } from "@/hooks/use-toast";
import { usePluginStatus } from "@/hooks/use-plugin-status";

interface ConnectionStatus {
  connected: boolean;
  error?: string;
  accountName?: string;
  accountStatus?: string;
  voiceCount?: number;
  details?: string;
}

export default function AdminDashboard() {
  const { t } = useTranslation();
  const [location] = useLocation();
  const [activeTab, setActiveTab] = useState("analytics");
  const [twilioStatus, setTwilioStatus] = useState<ConnectionStatus | null>(null);
  const [freeswitchStatus, setFreeswitchStatus] = useState<ConnectionStatus | null>(null);
  const [deepgramStatus, setDeepgramStatus] = useState<ConnectionStatus | null>(null);
  const [geminiStatus, setGeminiStatus] = useState<ConnectionStatus | null>(null);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const { isTeamManagementPluginEnabled, isCustomVoiceEngineEnabled } = usePluginStatus();
  const pluginRegistry = usePluginRegistry();
  const adminMenuItems = pluginRegistry.getAdminMenuItems();
  const adminSettingsTabs = pluginRegistry.getAdminSettingsTabs();

  // Fetch application version
  const { data: versionData } = useQuery<{ version: string }>({
    queryKey: ["/api/system/version"],
    staleTime: Infinity,
  });

  // Get analytics summary
  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ["/api/admin/analytics"],
  });

  // Get global settings to check configuration
  // Auto-refresh every 60 minutes and on window focus to keep connection status current
  const { data: settings, isLoading: settingsLoading, refetch: refetchSettings, isFetching } = useQuery({
    queryKey: ["/api/admin/settings"],
    queryFn: async () => {
      const response = await apiRequest("GET", `/api/admin/settings?t=${Date.now()}`);
      if (!response.ok) {
        throw new Error(t("adminDashboard.errors.fetchSettingsFailed"));
      }
      return response.json();
    },
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    refetchInterval: 60 * 60 * 1000, // 60 minutes
    staleTime: 0,
  });

  // Promise chain for serialized connection checks - ensures every trigger runs in order
  const checkChainRef = useRef<Promise<void>>(Promise.resolve());
  const wasFetchingRef = useRef(false);
  const hasCheckedRef = useRef(false);

  // Scroll state for admin tabs
  const tabsScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check scroll state
  const checkScrollState = () => {
    const container = tabsScrollRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 1);
    }
  };

  // Scroll handlers
  const scrollLeft = () => {
    const container = tabsScrollRef.current;
    if (container) {
      container.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = tabsScrollRef.current;
    if (container) {
      container.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  // Check scroll state on mount, resize, and when admin menu items change
  useEffect(() => {
    checkScrollState();
    window.addEventListener('resize', checkScrollState);
    return () => window.removeEventListener('resize', checkScrollState);
  }, [(Array.isArray(adminMenuItems) ? adminMenuItems : []).length]);

  // Perform the actual connection test - internal function
  const performConnectionCheck = async (settingsToUse: any): Promise<void> => {
    setCheckingStatus(true);
    
    try {
      // Test Twilio connection
      if (settingsToUse?.twilio_configured) {
        try {
          const twilioResponse = await apiRequest("POST", "/api/admin/test-connection/twilio");
          const twilioResult = await twilioResponse.json();
          setTwilioStatus(twilioResult as ConnectionStatus);
        } catch (err) {
          setTwilioStatus({ connected: false, error: err instanceof Error ? err.message : "Twilio test failed" });
        }
      } else {
        setTwilioStatus({ connected: false, error: "Twilio not configured" });
      }

      // Test FreeSWITCH Voice Engine
      try {
        const fsResponse = await apiRequest("POST", "/api/admin/test-connection/freeswitch");
        const fsResult = await fsResponse.json();
        setFreeswitchStatus(fsResult as ConnectionStatus);
      } catch (err) {
        setFreeswitchStatus({ connected: false, error: "FreeSWITCH test failed" });
      }

      // Test Deepgram STT / TTS
      try {
        const dgResponse = await apiRequest("POST", "/api/admin/test-connection/deepgram");
        const dgResult = await dgResponse.json();
        setDeepgramStatus(dgResult as ConnectionStatus);
      } catch (err) {
        setDeepgramStatus({ connected: false, error: "Deepgram test failed" });
      }

      // Test Google Gemini LLM
      try {
        const geminiResponse = await apiRequest("POST", "/api/admin/test-connection/gemini");
        const geminiResult = await geminiResponse.json();
        setGeminiStatus(geminiResult as ConnectionStatus);
      } catch (err) {
        setGeminiStatus({ connected: false, error: "Gemini test failed" });
      }
    } catch (error) {
      console.error('Error checking API connections:', error);
      setTwilioStatus({ connected: false, error: "Check failed" });
      setFreeswitchStatus({ connected: false, error: "Check failed" });
      setDeepgramStatus({ connected: false, error: "Check failed" });
      setGeminiStatus({ connected: false, error: "Check failed" });
    } finally {
      setCheckingStatus(false);
    }
  };

  // Queue a connection check - chains onto existing promise to ensure serial execution
  const checkAPIConnections = (currentSettings?: any) => {
    const settingsToUse = currentSettings || settings;
    if (!settingsToUse) return;
    
    // Chain this check onto the existing promise chain
    checkChainRef.current = checkChainRef.current
      .then(() => performConnectionCheck(settingsToUse))
      .catch((err) => {
        console.error('Connection check chain error:', err);
        // Reset error states on chain failure
        setTwilioStatus({ connected: false, error: "Check failed" });
        setFreeswitchStatus({ connected: false, error: "Check failed" });
        setDeepgramStatus({ connected: false, error: "Check failed" });
        setGeminiStatus({ connected: false, error: "Check failed" });
        setCheckingStatus(false);
      });
  };

  // Manual refresh handler for recovery
  const handleManualRefresh = async () => {
    await refetchSettings();
  };

  // Force refresh connection status when navigating to /admin
  useEffect(() => {
    if (location?.startsWith('/admin')) {
      refetchSettings();
    }
  }, [location]);

  // Check connections when settings fetch completes (for route navigation, 60-min interval, and window focus)
  useEffect(() => {
    if (wasFetchingRef.current && !isFetching && settings) {
      // Fetch just completed, check connections with fresh data
      checkAPIConnections(settings);
    }
    wasFetchingRef.current = isFetching;
  }, [isFetching, settings]);

  // Initial check when settings first loads
  useEffect(() => {
    if (settings && !hasCheckedRef.current) {
      hasCheckedRef.current = true;
      checkAPIConnections(settings);
    }
    // Reset flag if settings becomes unavailable (e.g., after error)
    if (!settings) {
      hasCheckedRef.current = false;
    }
  }, [settings]);

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold">{t("adminDashboard.title")}</h1>
          <p className="text-muted-foreground mt-1 md:mt-2 text-sm md:text-base">
            {t("adminDashboard.subtitle")}
          </p>
        </div>
        <div className="flex items-center gap-2 md:gap-3 flex-wrap">
              <div 
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                  twilioStatus?.connected 
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800' 
                    : 'bg-slate-50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-700'
                }`}
                data-testid={twilioStatus?.connected ? "status-twilio-connected" : "status-twilio-disconnected"}
                title={twilioStatus?.error || undefined}
              >
                <div className={`p-1 rounded-full ${
                  twilioStatus?.connected 
                    ? 'bg-emerald-500' 
                    : 'bg-slate-400'
                }`}>
                  <Phone className="h-3 w-3 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className={`text-xs font-medium ${
                    twilioStatus?.connected 
                      ? 'text-emerald-700 dark:text-emerald-400' 
                      : 'text-slate-600 dark:text-slate-400'
                  }`}>
                    Twilio
                  </span>
                  <span className={`text-[10px] ${
                    twilioStatus?.connected 
                      ? 'text-emerald-600/70 dark:text-emerald-500/70' 
                      : 'text-slate-500 dark:text-slate-500'
                  }`}>
                    {twilioStatus?.connected ? t("adminDashboard.status.connected") : t("adminDashboard.status.notConnected")}
                  </span>
                </div>
              </div>
              
              {/* FreeSWITCH Voice Engine Status Indicator */}
              <div 
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                  freeswitchStatus?.connected 
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800' 
                    : 'bg-slate-50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-700'
                }`}
                data-testid={freeswitchStatus?.connected ? "status-freeswitch-connected" : "status-freeswitch-disconnected"}
                title={freeswitchStatus?.error || freeswitchStatus?.details || undefined}
              >
                <div className={`p-1 rounded-full ${
                  freeswitchStatus?.connected 
                    ? 'bg-emerald-500' 
                    : 'bg-slate-400'
                }`}>
                  <Server className="h-3 w-3 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className={`text-xs font-medium ${
                    freeswitchStatus?.connected 
                      ? 'text-emerald-700 dark:text-emerald-400' 
                      : 'text-slate-600 dark:text-slate-400'
                  }`}>
                    FreeSWITCH
                  </span>
                  <span className={`text-[10px] ${
                    freeswitchStatus?.connected 
                      ? 'text-emerald-600/70 dark:text-emerald-500/70' 
                      : 'text-slate-500 dark:text-slate-500'
                  }`}>
                    {freeswitchStatus?.connected ? (freeswitchStatus.details || "Online") : "Offline"}
                  </span>
                </div>
              </div>

              {/* Deepgram STT / TTS Status Indicator */}
              <div 
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                  deepgramStatus?.connected 
                    ? 'bg-teal-50 dark:bg-teal-950/30 border-teal-200 dark:border-teal-800' 
                    : 'bg-slate-50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-700'
                }`}
                data-testid={deepgramStatus?.connected ? "status-deepgram-connected" : "status-deepgram-disconnected"}
                title={deepgramStatus?.error || deepgramStatus?.details || undefined}
              >
                <div className={`p-1 rounded-full ${
                  deepgramStatus?.connected 
                    ? 'bg-teal-500' 
                    : 'bg-slate-400'
                }`}>
                  <Mic className="h-3 w-3 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className={`text-xs font-medium ${
                    deepgramStatus?.connected 
                      ? 'text-teal-700 dark:text-teal-400' 
                      : 'text-slate-600 dark:text-slate-400'
                  }`}>
                    Deepgram
                  </span>
                  <span className={`text-[10px] ${
                    deepgramStatus?.connected 
                      ? 'text-teal-600/70 dark:text-teal-500/70' 
                      : 'text-slate-500 dark:text-slate-500'
                  }`}>
                    {deepgramStatus?.connected ? "Nova-2 / Aura" : "Not Connected"}
                  </span>
                </div>
              </div>

              {/* Google Gemini LLM Status Indicator */}
              <div 
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                  geminiStatus?.connected 
                    ? 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800' 
                    : 'bg-slate-50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-700'
                }`}
                data-testid={geminiStatus?.connected ? "status-gemini-connected" : "status-gemini-disconnected"}
                title={geminiStatus?.error || geminiStatus?.details || undefined}
              >
                <div className={`p-1 rounded-full ${
                  geminiStatus?.connected 
                    ? 'bg-indigo-500' 
                    : 'bg-slate-400'
                }`}>
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className={`text-xs font-medium ${
                    geminiStatus?.connected 
                      ? 'text-indigo-700 dark:text-indigo-400' 
                      : 'text-slate-600 dark:text-slate-400'
                  }`}>
                    Google Gemini
                  </span>
                  <span className={`text-[10px] ${
                    geminiStatus?.connected 
                      ? 'text-indigo-600/70 dark:text-indigo-500/70' 
                      : 'text-slate-500 dark:text-slate-500'
                  }`}>
                    {geminiStatus?.connected ? "Flash 2.0 / 1.5" : "Not Connected"}
                  </span>
                </div>
              </div>

              {/* Version Badge */}
              <div 
                className="flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800"
                data-testid="status-version"
                title={t("adminDashboard.status.versionTitle")}
              >
                <div className="p-1 rounded-full bg-blue-500">
                  <Power className="h-3 w-3 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-blue-700 dark:text-blue-400">
                    {t("adminDashboard.status.version")}
                  </span>
                  <span className="text-[10px] text-blue-600/70 dark:text-blue-500/70">
                    v{versionData?.version || '1.0.0'}
                  </span>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleManualRefresh}
                disabled={checkingStatus || isFetching}
                title={checkingStatus ? t("adminDashboard.status.refreshing") : t("adminDashboard.status.refresh")}
                data-testid="button-refresh-status"
              >
                <RefreshCw className={`h-4 w-4 ${checkingStatus || isFetching ? 'animate-spin' : ''}`} />
              </Button>
        </div>
      </div>

      {/* Main Admin Tabs - Menu first */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="relative flex items-center -mx-4 md:-mx-8">
          {/* Left scroll arrow */}
          {canScrollLeft && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 z-10 rounded-full bg-background/80 backdrop-blur-sm shadow-md border"
              onClick={scrollLeft}
              data-testid="button-scroll-tabs-left"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
          
          <div 
            ref={tabsScrollRef}
            className="overflow-x-auto flex-1 px-4 md:px-8 pb-2 scrollbar-thin"
            onScroll={checkScrollState}
          >
            <TabsList className="flex gap-1 h-auto w-max min-w-full">
            <TabsTrigger value="analytics" className="text-xs md:text-sm whitespace-nowrap" data-testid="tab-analytics">
              <BarChart className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">{t("adminDashboard.tabs.analytics")}</span>
              <span className="sm:hidden">{t("adminDashboard.tabs.stats")}</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="text-xs md:text-sm whitespace-nowrap" data-testid="tab-users">
              <Users className="h-4 w-4 mr-1 md:mr-2" />
              {t("adminDashboard.tabs.users")}
            </TabsTrigger>
            <TabsTrigger value="contacts" className="text-xs md:text-sm whitespace-nowrap" data-testid="tab-contacts">
              <ContactRound className="h-4 w-4 mr-1 md:mr-2" />
              {t("adminDashboard.tabs.contacts")}
            </TabsTrigger>
            <TabsTrigger value="billing" className="text-xs md:text-sm whitespace-nowrap" data-testid="tab-billing">
              <CreditCard className="h-4 w-4 mr-1 md:mr-2" />
              {t("adminDashboard.tabs.billing")}
            </TabsTrigger>
            <TabsTrigger value="phones" className="text-xs md:text-sm whitespace-nowrap" data-testid="tab-phones">
              <Phone className="h-4 w-4 mr-1 md:mr-2" />
              {t("adminDashboard.tabs.phones")}
            </TabsTrigger>
            <TabsTrigger value="queue" className="text-xs md:text-sm whitespace-nowrap" data-testid="tab-batch-jobs">
              <ListOrdered className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">{t("adminDashboard.tabs.batchJobs")}</span>
              <span className="sm:hidden">{t("adminDashboard.tabs.jobs")}</span>
            </TabsTrigger>
            <TabsTrigger value="calls" className="text-xs md:text-sm whitespace-nowrap" data-testid="tab-calls">
              <Headphones className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">{t("adminDashboard.tabs.callMonitoring")}</span>
              <span className="sm:hidden">{t("adminDashboard.tabs.calls")}</span>
            </TabsTrigger>
            <TabsTrigger value="communications" className="text-xs md:text-sm whitespace-nowrap" data-testid="tab-communications">
              <MessageSquare className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">{t("adminDashboard.tabs.communications")}</span>
              <span className="sm:hidden">{t("adminDashboard.tabs.comms")}</span>
            </TabsTrigger>
            <TabsTrigger value="voice-ai" className="text-xs md:text-sm whitespace-nowrap" data-testid="tab-voice-ai">
              <Brain className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">{t("adminDashboard.tabs.voiceAI")}</span>
              <span className="sm:hidden">{t("adminDashboard.tabs.voice")}</span>
            </TabsTrigger>
            {isCustomVoiceEngineEnabled && (
              <TabsTrigger value="voice-engine-settings" className="text-xs md:text-sm whitespace-nowrap" data-testid="tab-voice-engine-settings">
                <Volume2 className="h-4 w-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">{t("adminDashboard.tabs.voiceEngine")}</span>
                <span className="sm:hidden">{t("adminDashboard.tabs.ve")}</span>
              </TabsTrigger>
            )}
            {(Array.isArray(adminMenuItems) ? adminMenuItems : []).map((item) => (
              <TabsTrigger key={item.id} value={item.id} className="text-xs md:text-sm whitespace-nowrap" data-testid={`tab-${item.id}`}>
                {item.icon === 'Users' && <Building2 className="h-4 w-4 mr-1 md:mr-2" />}
                {item.icon === 'Server' && <Server className="h-4 w-4 mr-1 md:mr-2" />}
                {item.label}
              </TabsTrigger>
            ))}
            <TabsTrigger value="settings" className="text-xs md:text-sm whitespace-nowrap" data-testid="tab-settings">
              <Settings className="h-4 w-4 mr-1 md:mr-2" />
              {t("adminDashboard.tabs.settings")}
            </TabsTrigger>
          </TabsList>
          </div>
          
          {/* Right scroll arrow */}
          {canScrollRight && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 z-10 rounded-full bg-background/80 backdrop-blur-sm shadow-md border"
              onClick={scrollRight}
              data-testid="button-scroll-tabs-right"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        <TabsContent value="analytics" className="space-y-4">
          <Analytics />
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <UserManagement />
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4">
          <AllContactsAdmin />
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <BillingPanel />
        </TabsContent>

        <TabsContent value="phones" className="space-y-4">
          <PhoneNumbers />
        </TabsContent>

        <TabsContent value="queue" className="space-y-4">
          <BatchJobsMonitor />
        </TabsContent>

        <TabsContent value="calls" className="space-y-4">
          <CallsPanel />
        </TabsContent>

        <TabsContent value="communications" className="space-y-4">
          <CommunicationsPanel />
        </TabsContent>

        <TabsContent value="voice-ai" className="space-y-4">
          <VoiceAIPanel />
        </TabsContent>

        {isCustomVoiceEngineEnabled && (
          <TabsContent value="voice-engine-settings" className="space-y-4">
            <VoiceEngineSettings />
          </TabsContent>
        )}

        {(Array.isArray(adminMenuItems) ? adminMenuItems : []).map((item) => (
          <TabsContent key={item.id} value={item.id} className="space-y-4">
            <Suspense fallback={<div className="flex items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
              <item.component />
            </Suspense>
          </TabsContent>
        ))}

        <TabsContent value="settings" className="space-y-4">
          <SettingsPage onSwitchTab={setActiveTab} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function BillingPanel() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [activeSubTab, setActiveSubTab] = useState("plans");

  const { data: globalSettingsData, isLoading: settingsLoading } = useQuery<{ credits_required?: boolean }>({
    queryKey: ["/api/admin/settings"],
  });
  const creditsRequired = globalSettingsData?.credits_required ?? true;

  const toggleCreditsMutation = useMutation({
    mutationFn: async (enabled: boolean) => {
      const res = await apiRequest("PATCH", "/api/admin/settings/credits_required", { value: enabled });
      if (!res.ok) throw new Error("Failed to update credit enforcement setting");
      return enabled;
    },
    onSuccess: (enabled) => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/settings"] });
      toast({
        title: "Credit Setting Updated",
        description: enabled
          ? "Credits are now required for voice calls."
          : "Credits bypassed! Voice calls are now uncapped/unlimited (BYOK mode).",
      });
    },
    onError: (err: any) => {
      toast({ title: "Failed to update setting", description: err.message, variant: "destructive" });
    },
  });
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{t("adminDashboard.billing.title")}</h2>
        <p className="text-muted-foreground">
          {t("adminDashboard.billing.description")}
        </p>
      </div>

      {/* Master Calling Credits Bypass Switch */}
      <Card className="border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20">
        <CardHeader className="py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Power className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <CardTitle className="text-base font-semibold">Voice Call Credits Enforcement</CardTitle>
                <Badge variant={creditsRequired ? "default" : "secondary"} className={creditsRequired ? "bg-amber-600 hover:bg-amber-700" : "bg-emerald-600 text-white hover:bg-emerald-700"}>
                  {creditsRequired ? "Pay-Per-Minute" : "Unlimited / BYOK Mode"}
                </Badge>
              </div>
              <CardDescription className="text-xs">
                {creditsRequired
                  ? "Credits are deducted per minute for all phone calls. Calls fail if user balance reaches 0."
                  : "Credit deductions and balance checks are bypassed. Users can make unlimited calls using their own provider keys (Vapi model)."}
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <Label htmlFor="credits-required-switch" className="text-sm font-medium">
                {creditsRequired ? "Enforced" : "Bypassed"}
              </Label>
              <Switch
                id="credits-required-switch"
                checked={creditsRequired}
                onCheckedChange={(checked) => toggleCreditsMutation.mutate(checked)}
                disabled={toggleCreditsMutation.isPending || settingsLoading}
                data-testid="switch-credits-required"
              />
            </div>
          </div>
        </CardHeader>
      </Card>
      
      <Tabs value={activeSubTab} onValueChange={setActiveSubTab}>
        <TabsList>
          <TabsTrigger value="plans" data-testid="subtab-plans">
            <Package className="h-4 w-4 mr-2" />
            {t("adminDashboard.billing.tabs.plans")}
          </TabsTrigger>
          <TabsTrigger value="credits" data-testid="subtab-credits">
            <CreditCard className="h-4 w-4 mr-2" />
            {t("adminDashboard.billing.tabs.credits")}
          </TabsTrigger>
          <TabsTrigger value="transactions" data-testid="subtab-transactions">
            <Receipt className="h-4 w-4 mr-2" />
            {t("adminDashboard.billing.tabs.transactions")}
          </TabsTrigger>
          <TabsTrigger value="backfill" data-testid="subtab-credit-backfill">
            <RefreshCw className="h-4 w-4 mr-2" />
            {t("adminDashboard.billing.tabs.backfill")}
          </TabsTrigger>
          <TabsTrigger value="payments" data-testid="subtab-payments">
            <DollarSign className="h-4 w-4 mr-2" />
            {t("adminDashboard.billing.tabs.payments")}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="plans" className="mt-6 space-y-4">
          <PlanManagement />
          <LLMModelsManagement />
        </TabsContent>
        
        <TabsContent value="credits" className="mt-6">
          <CreditPackages />
        </TabsContent>
        
        <TabsContent value="transactions" className="mt-6">
          <TransactionsManagement />
        </TabsContent>

        <TabsContent value="backfill" className="mt-6">
          <CreditBackfillManagement />
        </TabsContent>
        
        <TabsContent value="payments" className="mt-6">
          <PaymentsSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CallsPanel() {
  const { t } = useTranslation();
  const [activeSubTab, setActiveSubTab] = useState("monitoring");
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{t("adminDashboard.calls.title")}</h2>
        <p className="text-muted-foreground">
          {t("adminDashboard.calls.description")}
        </p>
      </div>
      
      <Tabs value={activeSubTab} onValueChange={setActiveSubTab}>
        <TabsList>
          <TabsTrigger value="monitoring" data-testid="subtab-call-monitoring">
            <Headphones className="h-4 w-4 mr-2" />
            {t("adminDashboard.calls.tabs.monitoring")}
          </TabsTrigger>
          <TabsTrigger value="banned-words" data-testid="subtab-banned-words">
            <ShieldAlert className="h-4 w-4 mr-2" />
            {t("adminDashboard.calls.tabs.bannedWords")}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="monitoring" className="mt-6">
          <CallMonitoring />
        </TabsContent>
        
        <TabsContent value="banned-words" className="mt-6">
          <BannedWordsManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CommunicationsPanel() {
  const { t } = useTranslation();
  const [activeSubTab, setActiveSubTab] = useState("email-settings");
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{t("adminDashboard.communications.title")}</h2>
        <p className="text-muted-foreground">
          {t("adminDashboard.communications.description")}
        </p>
      </div>
      
      <Tabs value={activeSubTab} onValueChange={setActiveSubTab}>
        <TabsList>
          <TabsTrigger value="email-settings" data-testid="subtab-email-settings">
            <Mail className="h-4 w-4 mr-2" />
            {t("adminDashboard.communications.tabs.emailSettings")}
          </TabsTrigger>
          <TabsTrigger value="notifications" data-testid="subtab-notifications">
            <Bell className="h-4 w-4 mr-2" />
            {t("adminDashboard.communications.tabs.notifications")}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="email-settings" className="mt-6">
          <EmailSettingsManagement />
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-6">
          <Notifications />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface VoiceEngineSettings {
  plivo_openai_engine_enabled: boolean;
  twilio_openai_engine_enabled: boolean;
  twilio_kyc_required: boolean;
  plivo_kyc_required: boolean;
}

function VoiceAIPanel() {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const { data: voiceEngineSettings, isLoading: settingsLoading } = useQuery<VoiceEngineSettings>({
    queryKey: ["/api/settings/voice-engine"],
  });

  const updatePlivoEngineSetting = useMutation({
    mutationFn: async (enabled: boolean) => {
      const res = await apiRequest("PATCH", "/api/admin/settings/plivo_openai_engine_enabled", { value: enabled });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || t("adminDashboard.voiceAI.toasts.updateFailed"));
      }
      return { enabled, engine: "plivo" };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/settings/voice-engine"] });
      toast({ 
        title: t("adminDashboard.voiceAI.toasts.titleUpdated"),
        description: data.enabled 
          ? t("adminDashboard.voiceAI.toasts.plivoEnabled")
          : t("adminDashboard.voiceAI.toasts.plivoDisabled")
      });
    },
    onError: (error: any) => {
      toast({
        title: t("adminDashboard.voiceAI.toasts.updateFailed"),
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const updateTwilioOpenaiEngineSetting = useMutation({
    mutationFn: async (enabled: boolean) => {
      const res = await apiRequest("PATCH", "/api/admin/settings/twilio_openai_engine_enabled", { value: enabled });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || t("adminDashboard.voiceAI.toasts.updateFailed"));
      }
      return { enabled, engine: "twilio_openai" };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/settings/voice-engine"] });
      toast({ 
        title: t("adminDashboard.voiceAI.toasts.titleUpdated"),
        description: data.enabled 
          ? t("adminDashboard.voiceAI.toasts.twilioEnabled")
          : t("adminDashboard.voiceAI.toasts.twilioDisabled")
      });
    },
    onError: (error: any) => {
      toast({
        title: t("adminDashboard.voiceAI.toasts.updateFailed"),
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const isPlivoEngineEnabled = voiceEngineSettings?.plivo_openai_engine_enabled ?? false;
  const isTwilioOpenaiEngineEnabled = voiceEngineSettings?.twilio_openai_engine_enabled ?? false;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{t("adminDashboard.voiceAI.title")}</h2>
        <p className="text-muted-foreground">
          {t("adminDashboard.voiceAI.description")}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-indigo-200 dark:border-indigo-800 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 md:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
                  <Server className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">Master AI Engine (FreeSWITCH Core)</CardTitle>
                  <CardDescription>
                    Self-hosted SIP PBX with Deepgram Aura, Sarvam AI, and Gemini Flash LLM. Zero third-party telephony markups.
                  </CardDescription>
                </div>
              </div>
              <Badge className="bg-emerald-600 text-white hover:bg-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                Active Core
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0 text-sm text-muted-foreground flex flex-wrap gap-4">
            <div><strong>Audio Routing:</strong> FreeSWITCH ESL Port 8021</div>
            <div><strong>Native STT:</strong> Deepgram Nova-2 / Sarvam Saaras</div>
            <div><strong>Native TTS:</strong> Deepgram Aura / Sarvam Bulbul</div>
            <div><strong>BYOT Trunks:</strong> Telnyx, Airtel, Tata, Twilio BYOC</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Power className="h-5 w-5" />
                <div>
                  <CardTitle className="text-lg">{t("adminDashboard.voiceAI.twilioOpenAI.title")}</CardTitle>
                  <CardDescription>
                    {t("adminDashboard.voiceAI.twilioOpenAI.description")}
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {settingsLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                ) : (
                  <>
                    <Label htmlFor="twilio-openai-toggle" className="text-sm text-muted-foreground">
                      {isTwilioOpenaiEngineEnabled ? t("common.enabled") : t("common.disabled")}
                    </Label>
                    <Switch
                      id="twilio-openai-toggle"
                      checked={isTwilioOpenaiEngineEnabled}
                      onCheckedChange={(checked) => updateTwilioOpenaiEngineSetting.mutate(checked)}
                      disabled={updateTwilioOpenaiEngineSetting.isPending}
                      data-testid="switch-twilio-openai-engine"
                    />
                  </>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground">
              {t("adminDashboard.voiceAI.twilioOpenAI.note")}
            </p>
            {isTwilioOpenaiEngineEnabled && (
              <div className="mt-3 flex items-center gap-2">
                <Badge variant="secondary" className="text-green-600 border-green-600">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  {t("common.active")}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Power className="h-5 w-5" />
                <div>
                  <CardTitle className="text-lg">{t("adminDashboard.voiceAI.plivoOpenAI.title")}</CardTitle>
                  <CardDescription>
                    {t("adminDashboard.voiceAI.plivoOpenAI.description")}
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {settingsLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                ) : (
                  <>
                    <Label htmlFor="plivo-openai-toggle" className="text-sm text-muted-foreground">
                      {isPlivoEngineEnabled ? t("common.enabled") : t("common.disabled")}
                    </Label>
                    <Switch
                      id="plivo-openai-toggle"
                      checked={isPlivoEngineEnabled}
                      onCheckedChange={(checked) => updatePlivoEngineSetting.mutate(checked)}
                      disabled={updatePlivoEngineSetting.isPending}
                      data-testid="switch-plivo-openai-engine"
                    />
                  </>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground">
              {t("adminDashboard.voiceAI.plivoOpenAI.note")}
            </p>
            {isPlivoEngineEnabled && (
              <div className="mt-3 flex items-center gap-2">
                <Badge variant="secondary" className="text-green-600 border-green-600">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  {t("common.active")}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        <OpenAIPoolManagement />
        <PlivoSettings />
      </div>
    </div>
  );
}