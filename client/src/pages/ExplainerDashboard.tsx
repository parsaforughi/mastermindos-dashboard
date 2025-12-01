import { Sidebar } from "@/components/dashboard/Sidebar";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { ControlPanel } from "@/components/dashboard/ControlPanel";
import { LiveLog } from "@/components/dashboard/LiveLog";
import { HealthMonitor } from "@/components/dashboard/HealthMonitor";
import { ActiveChat } from "@/components/dashboard/ActiveChat";
import { MOCK_CONVERSATIONS } from "@/lib/mockData";

export default function ExplainerDashboard() {
  // Use the first conversation for the dashboard preview
  const previewConversationId = MOCK_CONVERSATIONS[0]?.id || "1";

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
          <div className="flex-1 p-6 overflow-y-auto overflow-x-hidden custom-scrollbar flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-bold text-white">Explainer Dashboard</h1>
              <p className="text-sm text-muted-foreground">Real-time monitoring and control center</p>
            </div>

            {/* 1. Stats & Analytics */}
            <section>
              <StatsOverview />
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[600px] min-h-[500px]">
              {/* Left Column: Control & Health */}
              <div className="lg:col-span-3 flex flex-col gap-6 h-full">
                {/* 4. Bot Control Panel */}
                <div className="flex-1 min-h-0">
                  <ControlPanel />
                </div>
                {/* 6. Error Tracking & Health Monitoring */}
                <div className="flex-1 min-h-0">
                  <HealthMonitor />
                </div>
              </div>

              {/* Center Column: Real-time Messages */}
              <div className="lg:col-span-6 h-full">
                <div className="h-full glass-panel rounded-2xl overflow-hidden flex flex-col">
                   <div className="p-4 border-b border-white/5 bg-white/5 flex justify-between items-center">
                      <h3 className="font-display font-semibold">Live Conversation Stream</h3>
                      <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-500/30 animate-pulse">
                        MONITORING
                      </span>
                   </div>
                   <div className="flex-1 min-h-0">
                      {/* 1. Real-time messages & 2. Chat Viewer (Preview) */}
                      <ActiveChat conversationId={previewConversationId} />
                   </div>
                </div>
              </div>

              {/* Right Column: Logs */}
              <div className="lg:col-span-3 h-full">
                {/* 5. Log Stream */}
                <LiveLog />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
