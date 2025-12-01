import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";

export default function ViralBotNetworkMap() {
  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans selection:bg-primary/20 relative">
      <div className="noise-overlay" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-pattern opacity-40" />
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 liquid-blob" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-secondary/10 liquid-blob" style={{ animationDelay: '-5s', animationDuration: '15s' }} />
        <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] rounded-full bg-purple-500/5 liquid-blob" style={{ animationDelay: '-2s', animationDuration: '20s' }} />
      </div>

      <div className="relative z-10 flex h-full w-full">
        <Sidebar />
        <main className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="flex-1 p-6 overflow-y-auto overflow-x-hidden custom-scrollbar">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-white mb-1">Network Map</h1>
              <p className="text-sm text-muted-foreground">Content distribution and virality pathways</p>
            </div>

            <Card className="border-white/10 bg-white/5 backdrop-blur-xl p-8 h-[calc(100vh-200px)] flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🌐</div>
                <p className="text-muted-foreground">Network visualization coming soon</p>
                <p className="text-sm text-muted-foreground mt-2">Real-time content propagation map</p>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
