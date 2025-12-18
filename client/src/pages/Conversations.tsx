import { Sidebar } from "@/components/dashboard/Sidebar";
import { InboxList } from "@/components/dashboard/InboxList";
import { ActiveChat } from "@/components/dashboard/ActiveChat";
import { useState, useEffect } from "react";
import { useConversations } from "@/hooks/useExplainerApi";

export default function Conversations() {
  const { data: conversations } = useConversations();
  const [activeConversationId, setActiveConversationId] = useState("");
  
  useEffect(() => {
    if (conversations && conversations.length > 0 && !activeConversationId) {
      setActiveConversationId(conversations[0].id);
    }
  }, [conversations, activeConversationId]);

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans selection:bg-primary/20 relative">
      <div className="noise-overlay" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-pattern opacity-40" />

      <div className="relative z-10 flex h-full w-full">
        <Sidebar />

        <main className="flex-1 flex flex-col h-full overflow-hidden p-6">
           <div className="h-full grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-4 lg:col-span-3 h-full animate-in fade-in slide-in-from-left-4 duration-500">
                <InboxList 
                  activeId={activeConversationId} 
                  onSelect={setActiveConversationId} 
                />
              </div>
              <div className="col-span-12 md:col-span-8 lg:col-span-9 h-full animate-in fade-in slide-in-from-right-4 duration-500 delay-100">
                <ActiveChat conversationId={activeConversationId} />
              </div>
           </div>
        </main>
      </div>
    </div>
  );
}
