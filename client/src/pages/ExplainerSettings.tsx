import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Bot, Terminal, Fingerprint, Save, RefreshCw } from "lucide-react";
import { useState } from "react";

export default function ExplainerSettings() {
  const [sessionId, setSessionId] = useState("sess_8f3a29b1c");
  const [systemPrompt, setSystemPrompt] = useState(`You are an expert educational assistant designed to explain complex topics in simple, easy-to-understand terms. 
  
Your goal is to:
1. Analyze the user's request
2. Break down complex concepts into fundamental parts
3. Use analogies and real-world examples
4. Adjust complexity based on the user's feedback`);

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans selection:bg-primary/20 relative">
      {/* Background effects */}
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
              <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column - Core Settings */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Model Configuration */}
                <Card className="p-6 border-white/10 bg-white/5 backdrop-blur-xl">
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
                      <Select defaultValue="gpt-4o">
                        <SelectTrigger className="bg-black/20 border-white/10 text-white h-10">
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
                          defaultValue="0.7"
                          className="flex-1 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="w-12 text-right font-mono text-sm text-white">0.7</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">Controls randomness (0 = deterministic, 2 = creative)</p>
                    </div>
                  </div>
                </Card>

                {/* System Prompt */}
                <Card className="p-6 border-white/10 bg-white/5 backdrop-blur-xl flex flex-col h-[500px]">
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
                    <Badge variant="outline" className="border-white/10 text-muted-foreground font-mono">
                      {systemPrompt.length} chars
                    </Badge>
                  </div>

                  <Textarea 
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    className="flex-1 bg-black/40 border-white/10 font-mono text-sm text-white/90 leading-relaxed resize-none p-4 focus-visible:ring-primary/50" 
                    spellCheck={false}
                  />
                </Card>
              </div>

              {/* Right Column - Session & Meta */}
              <div className="space-y-6">
                
                {/* Session Management */}
                <Card className="p-6 border-white/10 bg-white/5 backdrop-blur-xl">
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
                          value={sessionId}
                          onChange={(e) => setSessionId(e.target.value)}
                          className="bg-black/20 border-white/10 font-mono text-sm text-yellow-400"
                        />
                        <Button size="icon" variant="outline" className="shrink-0 border-white/10 hover:bg-white/5" title="Generate New ID">
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/5 space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Context Length</span>
                        <span className="text-white font-mono">4,238 tokens</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Last Active</span>
                        <span className="text-white font-mono">2m ago</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Status</span>
                        <Badge className="bg-green-500/20 text-green-400 border-0 hover:bg-green-500/30">Active</Badge>
                      </div>
                    </div>

                    <Button variant="destructive" className="w-full mt-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20">
                      Clear Session Context
                    </Button>
                  </div>
                </Card>

                {/* Legacy Settings (Simplified) */}
                <Card className="p-6 border-white/10 bg-white/5 backdrop-blur-xl">
                  <h3 className="text-sm font-semibold text-white mb-4">Output Preferences</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">Audience Level</Label>
                      <Select defaultValue="student">
                        <SelectTrigger className="bg-black/20 border-white/10 h-9">
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
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-white/20 bg-white/5 checked:bg-primary checked:border-primary transition-colors" />
                        <span className="text-sm text-muted-foreground group-hover:text-white transition-colors">Include Examples</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-white/20 bg-white/5 checked:bg-primary checked:border-primary transition-colors" />
                        <span className="text-sm text-muted-foreground group-hover:text-white transition-colors">Add References</span>
                      </label>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
