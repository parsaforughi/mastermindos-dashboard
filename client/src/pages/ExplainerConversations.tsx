import { Sidebar } from "@/components/dashboard/Sidebar";
import { InboxList } from "@/components/dashboard/InboxList";
import { ActiveChat } from "@/components/dashboard/ActiveChat";
import { useState, useEffect } from "react";
import { useConversations } from "@/hooks/useExplainerApi";

export default function ExplainerConversations() {
  const { data: conversations } = useConversations();
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (conversations && conversations.length > 0 && !activeId) {
      setActiveId(conversations[0].id);
    }
  }, [conversations, activeId]);

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans selection:bg-primary/20 relative" data-testid="explainer-conversations-page">
      <div className="noise-overlay" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-pattern opacity-40" />
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 liquid-blob" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-secondary/10 liquid-blob" style={{ animationDelay: '-5s', animationDuration: '15s' }} />
      </div>

      <div className="relative z-10 flex h-full w-full">
        <Sidebar />
        <main className="flex-1 flex h-full overflow-hidden p-4 gap-4">
          <div className="w-80 shrink-0 h-full">
            <InboxList activeId={activeId} onSelect={setActiveId} />
          </div>
          <div className="flex-1 h-full">
            <ActiveChat conversationId={activeId} />
          </div>
        </main>
      </div>
    </div>
  );
}
