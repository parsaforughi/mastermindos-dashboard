import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Bot, Terminal, Fingerprint, Save, RefreshCw, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useSession, useUpdateSession, useBotControl, useSeedData } from "@/hooks/useExplainerApi";
import { useToast } from "@/hooks/use-toast";

export default function ExplainerSettings() {
  const { data: session, isLoading } = useSession();
  const updateSession = useUpdateSession();
  const botControl = useBotControl();
  const seedData = useSeedData();
  const { toast } = useToast();

  const [model, setModel] = useState("gpt-4o");
  const [temperature, setTemperature] = useState("0.7");
  const [systemPrompt, setSystemPrompt] = useState("");

  useEffect(() => {
    if (session) {
      setModel(session.model || "gpt-4o");
      setTemperature(session.temperature || "0.7");
      setSystemPrompt(session.systemPrompt || "");
    }
  }, [session]);

  const handleSave = () => {
    updateSession.mutate(
      { model, temperature, systemPrompt },
      {
        onSuccess: () => {
          toast({
            title: "Settings Saved",
            description: "Bot configuration has been updated successfully.",
          });
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to save settings. Please try again.",
            variant: "destructive",
          });
        },
      }
    );
  };

  const handleReset = () => {
    botControl.mutate("reset", {
      onSuccess: () => {
        toast({
          title: "Session Reset",
          description: "Bot session has been reset successfully.",
        });
      },
    });
  };

  const handleSeedData = () => {
    seedData.mutate(undefined, {
      onSuccess: () => {
        toast({
          title: "Demo Data Seeded",
          description: "Sample conversations and logs have been added.",
        });
      },
    });
  };

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans selection:bg-primary/20 relative" data-testid="explainer-settings-page">
      <div className="noise-overlay" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-pattern opacity-40" />
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 liquid-blob" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-secondary/10 liquid-blob" style={{ animationDelay: '-5s', animationDuration: '15s' }} />
      </div>

      <div className="relative z-10 flex h-full w-full">
        <Sidebar />
        <main className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="flex-1 p-6 overflow-y-auto overflow-x-hidden custom-scrollbar">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">Bot Configuration</h1>
                <p className="text-sm text-muted-foreground">Manage AI model parameters and system behaviors</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="gap-2 border-white/10"
                  onClick={handleSeedData}
                  disabled={seedData.isPending}
                  data-testid="button-seed-data"
                >
                  {seedData.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                  Seed Demo Data
                </Button>
                <Button 
                  className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleSave}
                  disabled={updateSession.isPending}
                  data-testid="button-save-settings"
                >
                  {updateSession.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Changes
                </Button>
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                <div className="lg:col-span-2 space-y-6">
                  
                  <Card className="p-6 border-white/10 bg-white/5 backdrop-blur-xl" data-testid="card-model-settings">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-500">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">Model Settings</h3>
                        <p className="text-xs text-muted-foreground">Select the underlying AI engine</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-xs uppercase tracking-wider text-muted-foreground">AI Model</Label>
                        <Select value={model} onValueChange={setModel}>
                          <SelectTrigger className="bg-black/20 border-white/10 text-white h-10" data-testid="select-model">
                            <SelectValue placeholder="Select Model" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gpt-4o">GPT-4o (Recommended)</SelectItem>
                            <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                            <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                            <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                            <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-[10px] text-muted-foreground">
                          Current model version: <span className="font-mono text-blue-400">v2024-05-13</span>
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs uppercase tracking-wider text-muted-foreground">Temperature</Label>
                        <div className="flex items-center gap-4">
                          <Input 
                            type="range" 
                            min="0" 
                            max="2" 
                            step="0.1" 
                            value={temperature}
                            onChange={(e) => setTemperature(e.target.value)}
                            className="flex-1 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                            data-testid="input-temperature"
                          />
                          <span className="w-12 text-right font-mono text-sm text-white" data-testid="text-temperature-value">{temperature}</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground">Controls randomness (0 = deterministic, 2 = creative)</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 border-white/10 bg-white/5 backdrop-blur-xl flex flex-col h-[500px]" data-testid="card-system-prompt">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-500">
                          <Terminal className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">System Prompt</h3>
                          <p className="text-xs text-muted-foreground">Core behavioral instructions</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-white/10 text-muted-foreground font-mono" data-testid="badge-char-count">
                        {systemPrompt.length} chars
                      </Badge>
                    </div>

                    <Textarea 
                      value={systemPrompt}
                      onChange={(e) => setSystemPrompt(e.target.value)}
                      className="flex-1 bg-black/40 border-white/10 font-mono text-sm text-white/90 leading-relaxed resize-none p-4 focus-visible:ring-primary/50" 
                      spellCheck={false}
                      placeholder="Enter the system prompt that defines how the bot should behave..."
                      data-testid="textarea-system-prompt"
                    />
                  </Card>
                </div>

                <div className="space-y-6">
                  
                  <Card className="p-6 border-white/10 bg-white/5 backdrop-blur-xl" data-testid="card-session-control">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                        <Fingerprint className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">Session Control</h3>
                        <p className="text-xs text-muted-foreground">Manage active session context</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-xs uppercase tracking-wider text-muted-foreground">Current Session ID</Label>
                        <div className="flex gap-2">
                          <Input 
                            value={session?.id || ""}
                            readOnly
                            className="bg-black/20 border-white/10 font-mono text-sm text-yellow-400"
                            data-testid="input-session-id"
                          />
                          <Button 
                            size="icon" 
                            variant="outline" 
                            className="shrink-0 border-white/10 hover:bg-white/5" 
                            title="Generate New Session"
                            onClick={handleReset}
                            disabled={botControl.isPending}
                            data-testid="button-regenerate-session"
                          >
                            {botControl.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/5 space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Model</span>
                          <span className="text-white font-mono" data-testid="text-current-model">{session?.model || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Last Active</span>
                          <span className="text-white font-mono" data-testid="text-last-active">
                            {session?.updatedAt ? new Date(session.updatedAt).toLocaleTimeString() : 'N/A'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Status</span>
                          <Badge 
                            className={session?.active ? "bg-green-500/20 text-green-400 border-0 hover:bg-green-500/30" : "bg-red-500/20 text-red-400 border-0"}
                            data-testid="badge-session-status"
                          >
                            {session?.active ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                      </div>

                      <Button 
                        variant="destructive" 
                        className="w-full mt-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20"
                        onClick={handleReset}
                        disabled={botControl.isPending}
                        data-testid="button-clear-session"
                      >
                        {botControl.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                        Clear Session Context
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-6 border-white/10 bg-white/5 backdrop-blur-xl" data-testid="card-output-preferences">
                    <h3 className="text-sm font-semibold text-white mb-4">Output Preferences</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Audience Level</Label>
                        <Select defaultValue="student">
                          <SelectTrigger className="bg-black/20 border-white/10 h-9" data-testid="select-audience-level">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="academic">Academic</SelectItem>
                            <SelectItem value="professional">Professional</SelectItem>
                            <SelectItem value="student">Student</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-3 pt-2">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-white/20 bg-white/5 checked:bg-primary checked:border-primary transition-colors" data-testid="checkbox-include-examples" />
                          <span className="text-sm text-muted-foreground group-hover:text-white transition-colors">Include Examples</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-white/20 bg-white/5 checked:bg-primary checked:border-primary transition-colors" data-testid="checkbox-add-references" />
                          <span className="text-sm text-muted-foreground group-hover:text-white transition-colors">Add References</span>
                        </label>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
