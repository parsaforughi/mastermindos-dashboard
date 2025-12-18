import { Sidebar } from "@/components/dashboard/Sidebar";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { InboxList } from "@/components/dashboard/InboxList";
import { ActiveChat } from "@/components/dashboard/ActiveChat";
import { ControlPanel } from "@/components/dashboard/ControlPanel";
import { LiveLog } from "@/components/dashboard/LiveLog";
import { useState, useEffect } from "react";
import { useConversations } from "@/hooks/useExplainerApi";

export default function Dashboard() {
  const { data: conversations } = useConversations();
  const [activeConversationId, setActiveConversationId] = useState("");
  
  useEffect(() => {
    if (conversations && conversations.length > 0 && !activeConversationId) {
      setActiveConversationId(conversations[0].id);
    }
  }, [conversations, activeConversationId]);

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans selection:bg-primary/20 relative">
      {/* Cinematic Noise Overlay */}
      <div className="noise-overlay" />

      {/* Dynamic Background Ambient Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-pattern opacity-40" />
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Primary Blob */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 liquid-blob" 
             style={{ animationDelay: '0s' }} />
        
        {/* Secondary Blob */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-secondary/10 liquid-blob" 
             style={{ animationDelay: '-5s', animationDuration: '15s' }} />
             
        {/* Accent Blob */}
        <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] rounded-full bg-purple-500/5 liquid-blob" 
             style={{ animationDelay: '-2s', animationDuration: '20s' }} />
      </div>

      <div className="relative z-10 flex h-full w-full">
        <Sidebar />

        <main className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="flex-1 p-6 overflow-y-auto overflow-x-hidden custom-scrollbar">
            <StatsOverview />

            <div className="grid grid-cols-12 gap-4 h-[calc(100vh-240px)] min-h-[600px]">
              {/* Inbox Column */}
              <div className="col-span-12 md:col-span-3 h-full animate-in fade-in slide-in-from-left-4 duration-700 delay-100">
                <InboxList 
                  activeId={activeConversationId} 
                  onSelect={setActiveConversationId} 
                />
              </div>

              {/* Active Chat Column */}
              <div className="col-span-12 md:col-span-6 h-full animate-in fade-in zoom-in-95 duration-700 delay-200">
                <ActiveChat conversationId={activeConversationId} />
              </div>

              {/* Right Control Column */}
              <div className="col-span-12 md:col-span-3 h-full flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-700 delay-300">
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
