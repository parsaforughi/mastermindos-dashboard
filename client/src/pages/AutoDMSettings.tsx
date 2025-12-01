import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AutoDMSettings() {
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
              <h1 className="text-3xl font-bold text-white mb-1">Campaign Settings</h1>
              <p className="text-sm text-muted-foreground">Configure campaign parameters</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-2xl">
              <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-sm font-semibold text-white mb-4">Message Settings</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Send Time</label>
                    <input type="time" className="w-full mt-1 px-3 py-2 rounded bg-white/5 border border-white/10 text-white text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Max Daily Messages</label>
                    <input type="number" defaultValue="5000" className="w-full mt-1 px-3 py-2 rounded bg-white/5 border border-white/10 text-white text-sm" />
                  </div>
                </div>
              </Card>

              <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-sm font-semibold text-white mb-4">Compliance</h3>
                <div className="space-y-3">
                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="text-xs text-muted-foreground">Respect Unsubscribe Requests</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="text-xs text-muted-foreground">GDPR Compliance</span>
                    </label>
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-6">
              <Button className="bg-primary/80 hover:bg-primary">Save Settings</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
