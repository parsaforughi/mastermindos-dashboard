import { Sidebar } from "@/components/dashboard/Sidebar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Cpu, Shield, Zap, Save, RefreshCcw } from "lucide-react";

export default function Settings() {
  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans selection:bg-primary/20 relative">
      <div className="noise-overlay" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-pattern opacity-40" />

      <div className="relative z-10 flex h-full w-full">
        <Sidebar />

        <main className="flex-1 flex flex-col h-full overflow-hidden p-6 overflow-y-auto custom-scrollbar">
          <header className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <h1 className="text-3xl font-display font-bold text-gradient">System Settings</h1>
            <p className="text-muted-foreground mt-1">Configure bot parameters and security protocols</p>
          </header>

          <div className="max-w-4xl space-y-8 pb-10">
            {/* Model Configuration */}
            <section className="glass-panel p-6 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10 text-primary"><Cpu className="w-5 h-5" /></div>
                <h2 className="text-lg font-semibold">Model Configuration</h2>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Model Version</Label>
                    <select className="w-full h-10 rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm focus:ring-1 focus:ring-primary">
                      <option>GPT-4o (Latest)</option>
                      <option>GPT-4 Turbo</option>
                      <option>Claude 3.5 Sonnet</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Context Window</Label>
                    <Input value="128k Tokens" disabled className="bg-white/5 border-white/5 text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label>Temperature (Creativity)</Label>
                    <span className="text-xs font-mono text-primary">0.7</span>
                  </div>
                  <Slider defaultValue={[70]} max={100} step={1} className="py-4" />
                </div>
              </div>
            </section>

            {/* Safety & Security */}
            <section className="glass-panel p-6 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
               <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-red-500/10 text-red-400"><Shield className="w-5 h-5" /></div>
                <h2 className="text-lg font-semibold">Safety & Guardrails</h2>
              </div>

              <div className="space-y-5">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                  <div className="space-y-0.5">
                    <div className="font-medium text-sm">PII Redaction</div>
                    <div className="text-xs text-muted-foreground">Automatically mask emails and phone numbers</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                  <div className="space-y-0.5">
                    <div className="font-medium text-sm">Content Moderation</div>
                    <div className="text-xs text-muted-foreground">Block harmful or unsafe outputs</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                 <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                  <div className="space-y-0.5">
                    <div className="font-medium text-sm">Rate Limiting</div>
                    <div className="text-xs text-muted-foreground">Prevent abuse from single IP sources</div>
                  </div>
                  <Switch />
                </div>
              </div>
            </section>

            {/* Actions */}
            <div className="flex gap-4 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
              <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 px-8 gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground gap-2">
                <RefreshCcw className="w-4 h-4" />
                Reset to Defaults
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
