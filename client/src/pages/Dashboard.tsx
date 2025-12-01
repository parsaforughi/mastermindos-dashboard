import { Sidebar } from "@/components/dashboard/Sidebar";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { InboxList } from "@/components/dashboard/InboxList";
import { ActiveChat } from "@/components/dashboard/ActiveChat";
import { ControlPanel } from "@/components/dashboard/ControlPanel";
import { LiveLog } from "@/components/dashboard/LiveLog";
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

        <main className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="flex-1 p-6 overflow-y-auto overflow-x-hidden custom-scrollbar">
            <StatsOverview />

            <div className="grid grid-cols-12 gap-4 h-[calc(100vh-240px)] min-h-[600px]">
              {/* Inbox Column */}
              <div className="col-span-12 md:col-span-3 h-full">
                <InboxList 
                  activeId={activeConversationId} 
                  onSelect={setActiveConversationId} 
                />
              </div>

              {/* Active Chat Column */}
              <div className="col-span-12 md:col-span-6 h-full">
                <ActiveChat conversationId={activeConversationId} />
              </div>

              {/* Right Control Column */}
              <div className="col-span-12 md:col-span-3 h-full flex flex-col gap-4">
                <div className="h-[45%]">
                    <ControlPanel />
                </div>
                <div className="h-[55%]">
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
