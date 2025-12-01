import { Sidebar } from "@/components/dashboard/Sidebar";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { InboxList } from "@/components/dashboard/InboxList";
import { ActiveChat } from "@/components/dashboard/ActiveChat";
import { ControlPanel } from "@/components/dashboard/ControlPanel";
import { LiveLog } from "@/components/dashboard/LiveLog";
import { Character } from "@/components/dashboard/Character";
import { useState } from "react";

export default function Dashboard() {
  const [activeConversationId, setActiveConversationId] = useState("1");

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans selection:bg-primary/20 relative">
      {/* Background Ambient Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-pattern opacity-50" />
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/5 blur-[120px]" />
      </div>

      <div className="relative z-10 flex h-full w-full">
        <Sidebar />

        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
          {/* Header Bar */}
          <div className="h-16 w-full border-b border-white/5 bg-background/50 backdrop-blur-sm flex items-center justify-between px-6 shrink-0">
             <div className="flex items-center gap-4">
                <h2 className="text-lg font-medium text-foreground">Dashboard Overview</h2>
                <div className="h-4 w-[1px] bg-white/10" />
                <span className="text-xs text-muted-foreground font-mono">Connected to: Explainer_Bot_01</span>
             </div>
             <div className="flex items-center gap-3">
                <div className="text-xs font-medium text-muted-foreground">Server Status:</div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                   <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                   <span className="text-[10px] font-bold text-green-500">ONLINE</span>
                </div>
             </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto overflow-x-hidden custom-scrollbar">
            {/* Top Row: Stats & Character */}
            <div className="grid grid-cols-12 gap-6 mb-6">
               <div className="col-span-12 lg:col-span-8">
                  <StatsOverview />
               </div>
               <div className="col-span-12 lg:col-span-4 relative">
                  <div className="glass-panel rounded-3xl h-full min-h-[250px] overflow-hidden relative group">
                     <div className="absolute top-4 left-4 z-20 text-xs font-mono text-muted-foreground">AI_COMPANION_VIEW</div>
                     <Character />
                     
                     {/* Decorative Corner Lines */}
                     <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-primary/30 rounded-tl-3xl" />
                     <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-primary/30 rounded-br-3xl" />
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-12 gap-6 h-[calc(100vh-450px)] min-h-[600px]">
              {/* Inbox Column */}
              <div className="col-span-12 md:col-span-3 h-full">
                <InboxList 
                  activeId={activeConversationId} 
                  onSelect={setActiveConversationId} 
                />
              </div>

              {/* Active Chat Column */}
              <div className="col-span-12 md:col-span-5 h-full">
                <ActiveChat conversationId={activeConversationId} />
              </div>

              {/* Right Control Column */}
              <div className="col-span-12 md:col-span-4 h-full flex flex-col gap-6">
                <div className="flex-1 min-h-[300px]">
                    <ControlPanel />
                </div>
                <div className="h-[250px] shrink-0">
                    <LiveLog />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
