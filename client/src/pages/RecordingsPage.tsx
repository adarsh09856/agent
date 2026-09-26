import React, { useState, useRef } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
  Upload, 
  Play, 
  Pause, 
  Trash2, 
  Volume2, 
  RefreshCw, 
  Search, 
  Copy, 
  Check, 
  FileAudio, 
  Radio, 
  Sparkles, 
  Clock, 
  Tag, 
  Download,
  Database,
  Info
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface RecordingItem {
  id: number;
  name: string;
  filename: string;
  file_url: string;
  duration_seconds: number;
  format: string;
  size_bytes: number;
  mime_type: string;
  tag: string;
  created_at: string;
}

interface TtsCacheItem {
  id: number;
  phrase: string;
  voice: string;
  provider: string;
  file_url: string;
  duration_seconds: number;
  hits: number;
  created_at: string;
  last_used_at: string;
}

export default function RecordingsPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("recordings");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tagFilter, setTagFilter] = useState("all");
  
  // Audio playback state
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Upload Form state
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadName, setUploadName] = useState("");
  const [uploadTag, setUploadTag] = useState("greeting");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Queries
  const { data: recordings = [], isLoading: recordingsLoading } = useQuery<RecordingItem[]>({
    queryKey: ["/api/recordings"],
  });

  const { data: ttsCache = [], isLoading: cacheLoading } = useQuery<TtsCacheItem[]>({
    queryKey: ["/api/tts-cache"],
  });

  // Mutations
  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch("/api/recordings/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to upload recording");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/recordings"] });
      setIsUploadOpen(false);
      setUploadFile(null);
      setUploadName("");
      setUploadTag("greeting");
      toast({
        title: "Recording uploaded",
        description: "Audio asset is now available across your voice agents.",
      });
    },
    onError: (err: any) => {
      toast({
        title: "Upload failed",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/recordings/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/recordings"] });
      toast({
        title: "Recording deleted",
        description: "Audio file removed from your account.",
      });
    },
  });

  const invalidateCacheMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("POST", `/api/tts-cache/${id}/invalidate`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tts-cache"] });
      toast({
        title: "Cache invalidated",
        description: "Fresh audio will be synthesized on the next conversational request.",
      });
    },
  });

  // Audio playback handler
  const handleTogglePlay = (id: string, url: string) => {
    if (playingId === id) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPlayingId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(url);
      audioRef.current = audio;
      setPlayingId(id);
      audio.play().catch(() => {
        toast({
          title: "Playback failed",
          description: "Could not play audio file.",
          variant: "destructive",
        });
        setPlayingId(null);
      });
      audio.onended = () => {
        setPlayingId(null);
      };
    }
  };

  const handleCopyTag = (rec: RecordingItem) => {
    const textToCopy = `@${rec.name.toLowerCase().replace(/[^a-z0-9_]/g, '_')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(rec.id);
    setTimeout(() => setCopiedId(null), 2000);
    toast({
      title: "Copied reference tag",
      description: `Use "${textToCopy}" in your agent prompt to trigger this audio.`,
    });
  };

  const handleStartUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) {
      toast({
        title: "No file selected",
        description: "Please choose an audio file to upload.",
        variant: "destructive",
      });
      return;
    }
    const formData = new FormData();
    formData.append("audio", uploadFile);
    formData.append("name", uploadName || uploadFile.name.replace(/\.[^/.]+$/, ""));
    formData.append("tag", uploadTag);
    uploadMutation.mutate(formData);
  };

  // Filtered recordings
  const filteredRecordings = recordings.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.filename.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = tagFilter === "all" || item.tag === tagFilter;
    return matchesSearch && matchesTag;
  });

  const formatFileSize = (bytes: number) => {
    if (!bytes) return "0 B";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-bold tracking-tight">Recordings & Audio Assets</h1>
            <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-300">
              Audio Core
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm max-w-2xl">
            Upload custom audio greetings, hold music, and voicemail drops. Insert them anywhere in your AI agent prompts using{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-primary font-semibold">@recording_name</code>.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            onClick={() => setIsUploadOpen(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Recording
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="recordings" className="flex items-center gap-2">
            <FileAudio className="w-4 h-4 text-emerald-500" />
            <span>Uploaded Assets</span>
            <Badge variant="secondary" className="ml-1 text-[11px] px-1.5 py-0">
              {recordings.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="tts-cache" className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-blue-500" />
            <span>TTS Speech Cache</span>
            <Badge variant="secondary" className="ml-1 text-[11px] px-1.5 py-0">
              {ttsCache.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Uploaded Recordings */}
        <TabsContent value="recordings" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-lg">Audio Library</CardTitle>
                  <CardDescription>
                    Shared audio files available for agent prompts, call transfers, and tool execution wait loops.
                  </CardDescription>
                </div>
                {/* Search & Tag Filter */}
                <div className="flex items-center gap-2">
                  <div className="relative w-48 sm:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search audio..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 h-9 text-xs"
                    />
                  </div>
                  <Select value={tagFilter} onValueChange={setTagFilter}>
                    <SelectTrigger className="w-36 h-9 text-xs">
                      <SelectValue placeholder="Filter tag" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Tags</SelectItem>
                      <SelectItem value="greeting">Greetings</SelectItem>
                      <SelectItem value="voicemail">Voicemail</SelectItem>
                      <SelectItem value="hold">Hold Music</SelectItem>
                      <SelectItem value="tool_wait">Wait Message</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {recordingsLoading ? (
                <div className="py-12 flex flex-col items-center justify-center text-muted-foreground gap-3">
                  <RefreshCw className="w-6 h-6 animate-spin text-primary" />
                  <p className="text-sm">Loading audio assets...</p>
                </div>
              ) : filteredRecordings.length === 0 ? (
                <div className="py-16 text-center border-2 border-dashed rounded-lg">
                  <FileAudio className="w-10 h-10 mx-auto text-muted-foreground/60 mb-3" />
                  <h3 className="font-semibold text-base mb-1">No audio recordings found</h3>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto mb-4">
                    {searchQuery || tagFilter !== "all" 
                      ? "No recordings match your search filter criteria."
                      : "Upload your first audio file to use as pre-recorded greetings or voicemail messages."}
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsUploadOpen(true)}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Audio
                  </Button>
                </div>
              ) : (
                <div className="divide-y border rounded-lg overflow-hidden">
                  {filteredRecordings.map((rec) => (
                    <div 
                      key={rec.id} 
                      className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/40 transition-colors"
                    >
                      <div className="flex items-center gap-3.5">
                        <Button
                          size="icon"
                          variant={playingId === `rec_${rec.id}` ? "default" : "outline"}
                          className="h-10 w-10 shrink-0 rounded-full"
                          onClick={() => handleTogglePlay(`rec_${rec.id}`, rec.file_url)}
                        >
                          {playingId === `rec_${rec.id}` ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4 ml-0.5" />
                          )}
                        </Button>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm">{rec.name}</span>
                            <Badge variant="secondary" className="text-[10px] uppercase font-mono py-0 px-1.5">
                              {rec.format}
                            </Badge>
                            <Badge variant="outline" className="text-[10px] capitalize py-0 px-1.5 text-muted-foreground">
                              {rec.tag}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                            <span>{formatFileSize(rec.size_bytes)}</span>
                            <span>•</span>
                            <span className="font-mono text-[11px]">{rec.filename}</span>
                            <span>•</span>
                            <span>{new Date(rec.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs font-mono"
                          onClick={() => handleCopyTag(rec)}
                          title="Copy @tag for prompt"
                        >
                          {copiedId === rec.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 mr-1" />
                              @{rec.name.toLowerCase().replace(/[^a-z0-9_]/g, '_')}
                            </>
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          asChild
                        >
                          <a href={rec.file_url} download={rec.filename} title="Download Audio">
                            <Download className="w-4 h-4" />
                          </a>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => {
                            if (confirm(`Delete recording "${rec.name}"?`)) {
                              deleteMutation.mutate(rec.id);
                            }
                          }}
                          title="Delete Recording"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: TTS Cache */}
        <TabsContent value="tts-cache" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Database className="w-5 h-5 text-blue-500" />
                    Cached Speech Phrases
                  </CardTitle>
                  <CardDescription>
                    Speech reused across your agents. Pre-cached responses return in under 10ms with zero TTS provider latency.
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => queryClient.invalidateQueries({ queryKey: ["/api/tts-cache"] })}
                  className="h-8 text-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                  Refresh Cache
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {cacheLoading ? (
                <div className="py-12 flex flex-col items-center justify-center text-muted-foreground gap-3">
                  <RefreshCw className="w-6 h-6 animate-spin text-primary" />
                  <p className="text-sm">Loading TTS cache entries...</p>
                </div>
              ) : ttsCache.length === 0 ? (
                <div className="py-16 text-center border-2 border-dashed rounded-lg">
                  <Radio className="w-10 h-10 mx-auto text-muted-foreground/60 mb-3" />
                  <h3 className="font-semibold text-base mb-1">TTS Cache is empty</h3>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto mb-2">
                    When callers ask common questions, the synthesized speech is automatically cached here for sub-10ms instant replay on subsequent calls.
                  </p>
                </div>
              ) : (
                <div className="divide-y border rounded-lg overflow-hidden">
                  {ttsCache.map((item) => (
                    <div 
                      key={item.id} 
                      className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/40 transition-colors"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        {item.file_url ? (
                          <Button
                            size="icon"
                            variant={playingId === `cache_${item.id}` ? "default" : "outline"}
                            className="h-9 w-9 shrink-0 rounded-full"
                            onClick={() => handleTogglePlay(`cache_${item.id}`, item.file_url)}
                          >
                            {playingId === `cache_${item.id}` ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4 ml-0.5" />
                            )}
                          </Button>
                        ) : (
                          <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                            <Radio className="w-4 h-4" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-medium text-sm truncate max-w-lg">
                            "{item.phrase}"
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-[10px] uppercase font-mono py-0 px-1.5">
                              {item.provider}
                            </Badge>
                            <Badge variant="secondary" className="text-[10px] py-0 px-1.5">
                              {item.voice}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {item.hits} {item.hits === 1 ? 'hit' : 'hits'}
                            </span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">
                              Last used {new Date(item.last_used_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs text-muted-foreground hover:text-foreground"
                          onClick={() => invalidateCacheMutation.mutate(item.id)}
                          disabled={invalidateCacheMutation.isPending}
                        >
                          <RefreshCw className="w-3 h-3 mr-1" />
                          Invalidate
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Upload Dialog */}
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={handleStartUpload}>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                Upload Audio Recording
              </DialogTitle>
              <DialogDescription>
                Upload an audio file (MP3, WAV, M4A, max 15MB) to use in your voice agents.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="audio-file" className="text-xs font-semibold">Audio File *</Label>
                <Input
                  id="audio-file"
                  type="file"
                  accept="audio/mp3,audio/wav,audio/mpeg,audio/m4a,audio/ogg"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setUploadFile(file);
                    if (file && !uploadName) {
                      setUploadName(file.name.replace(/\.[^/.]+$/, ""));
                    }
                  }}
                  className="cursor-pointer file:cursor-pointer"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="audio-name" className="text-xs font-semibold">Recording Label *</Label>
                <Input
                  id="audio-name"
                  placeholder="e.g. Welcome Greeting, Office Hold Music"
                  value={uploadName}
                  onChange={(e) => setUploadName(e.target.value)}
                  required
                />
                <p className="text-[11px] text-muted-foreground">
                  Reference tag will be: <code className="bg-muted px-1 rounded">@{uploadName.toLowerCase().replace(/[^a-z0-9_]/g, '_') || 'recording_name'}</code>
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="audio-tag" className="text-xs font-semibold">Category</Label>
                <Select value={uploadTag} onValueChange={setUploadTag}>
                  <SelectTrigger id="audio-tag">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="greeting">Initial Greeting</SelectItem>
                    <SelectItem value="voicemail">Voicemail Drop</SelectItem>
                    <SelectItem value="hold">Hold Music</SelectItem>
                    <SelectItem value="tool_wait">Wait / Transition Message</SelectItem>
                    <SelectItem value="general">General Audio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsUploadOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={uploadMutation.isPending || !uploadFile}
              >
                {uploadMutation.isPending ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
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
