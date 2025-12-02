import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { ControlPanel } from "@/components/dashboard/ControlPanel";
import { LiveLog } from "@/components/dashboard/LiveLog";
import { HealthMonitor } from "@/components/dashboard/HealthMonitor";
import { ActiveChat } from "@/components/dashboard/ActiveChat";
import { MOCK_CONVERSATIONS } from "@/lib/mockData";
import { Menu, X } from "lucide-react";

export default function ExplainerDashboard() {
  // Use the first conversation for the dashboard preview
  const previewConversationId = MOCK_CONVERSATIONS[0]?.id || "1";
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>
        
        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <>
            <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
            <div className="fixed left-0 top-0 h-full z-40 md:hidden">
              <Sidebar />
            </div>
          </>
        )}

        <main className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Mobile Header */}
          <div className="md:hidden p-4 border-b border-white/5 bg-white/[0.02] backdrop-blur-xl flex items-center justify-between sticky top-0 z-20">
            <h2 className="text-lg font-bold text-white">Dashboard</h2>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              data-testid="button-toggle-sidebar"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex-1 p-3 md:p-6 overflow-y-auto overflow-x-hidden custom-scrollbar flex flex-col gap-4 md:gap-6">
            <div className="flex-col gap-1 hidden md:flex">
              <h1 className="text-3xl font-bold text-white">Explainer Dashboard</h1>
              <p className="text-sm text-muted-foreground">Real-time monitoring and control center</p>
            </div>

            {/* 1. Stats & Analytics */}
            <section>
              <StatsOverview />
            </section>

            {/* Layout: Desktop (3-6-3 grid) → Tablet (stacked) → Mobile (full width) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 md:gap-6 h-auto lg:h-[600px] lg:min-h-[500px]">
              {/* Left Column: Control & Health (Hidden on Mobile, 2 cols on Tablet) */}
              <div className="hidden md:flex md:col-span-1 lg:col-span-3 flex-col gap-3 md:gap-6 h-full">
                {/* 4. Bot Control Panel */}
                <div className="flex-1 min-h-0">
                  <ControlPanel />
                </div>
                {/* 6. Error Tracking & Health Monitoring */}
                <div className="flex-1 min-h-0">
                  <HealthMonitor />
                </div>
              </div>

              {/* Center Column: Real-time Messages (Full on Mobile, Tablet) */}
              <div className="col-span-1 md:col-span-2 lg:col-span-6 h-[400px] md:h-[500px] lg:h-full">
                <div className="h-full glass-panel rounded-2xl overflow-hidden flex flex-col">
                   <div className="p-3 md:p-4 border-b border-white/5 bg-white/5 flex justify-between items-center">
                      <h3 className="font-display font-semibold text-sm md:text-base">Live Conversation</h3>
                      <span className="text-[9px] md:text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-500/30 animate-pulse">
                        MONITORING
                      </span>
                   </div>
                   <div className="flex-1 min-h-0">
                      {/* 1. Real-time messages & 2. Chat Viewer (Preview) */}
                      <ActiveChat conversationId={previewConversationId} />
                   </div>
                </div>
              </div>

              {/* Right Column: Logs (Hidden on Mobile & Tablet) */}
              <div className="hidden lg:block lg:col-span-3 h-full">
                {/* 5. Log Stream */}
                <LiveLog />
              </div>
            </div>

            {/* Mobile: Logs Below Chat */}
            <div className="md:hidden">
              <LiveLog />
            </div>

            {/* Tablet: Control & Health Below */}
            <div className="hidden md:grid md:grid-cols-2 lg:hidden gap-3 md:gap-6">
              <ControlPanel />
              <HealthMonitor />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
