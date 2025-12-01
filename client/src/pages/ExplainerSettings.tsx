import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ExplainerSettings() {
  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans selection:bg-primary/20 relative">
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
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-white mb-1">Settings</h1>
              <p className="text-sm text-muted-foreground">Configure your explainer preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-2xl">
              <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-sm font-semibold text-white mb-4">Explanation Style</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Audience Level</label>
                    <select className="w-full mt-1 px-3 py-2 rounded bg-white/5 border border-white/10 text-white text-sm">
                      <option>Academic</option>
                      <option>Professional</option>
                      <option>Student</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Format Preference</label>
                    <select className="w-full mt-1 px-3 py-2 rounded bg-white/5 border border-white/10 text-white text-sm">
                      <option>Text + Diagrams</option>
                      <option>Code Examples</option>
                      <option>Visual Only</option>
                    </select>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-sm font-semibold text-white mb-4">Output</h3>
                <div className="space-y-3">
                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="text-xs text-muted-foreground">Include Examples</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="text-xs text-muted-foreground">Add References</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-xs text-muted-foreground">Include Animations</span>
                    </label>
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-6 space-y-2">
              <Button className="bg-primary/80 hover:bg-primary">Save Preferences</Button>
              <Button variant="outline" className="w-full">Reset to Defaults</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
