import { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Menu, X } from "lucide-react";
import { Link } from "wouter";

interface Conversation {
  id: string;
  username: string;
  name: string | null;
  bio: string | null;
  lastMessage: string;
  lastMessageAt: string;
  inboundCount: number;
  outboundCount: number;
  totalMessages: number;
  hasUnread: boolean;
}

export default function AffiliateBotConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await fetch("/api/conversations");
        const data = await res.json();
        setConversations(data);
      } catch (err) {
        console.error("Failed to fetch conversations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
    const interval = setInterval(fetchConversations, 3000);

    const eventSource = new EventSource("/api/sse/live-messages");
    eventSource.addEventListener("message", () => {
      fetchConversations();
    });

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      clearInterval(interval);
      eventSource.close();
    };
  }, []);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans selection:bg-primary/20 relative">
      <div className="noise-overlay" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-pattern opacity-40" />

      <div className="relative z-10 flex h-full w-full">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {sidebarOpen && (
          <>
            <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
            <div className="fixed left-0 top-0 h-full z-40 md:hidden">
              <Sidebar />
            </div>
          </>
        )}

        <main className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="md:hidden p-4 border-b border-white/5 bg-white/[0.02] backdrop-blur-xl flex items-center justify-between sticky top-0 z-20">
            <h2 className="text-lg font-bold text-white">Conversations</h2>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex-1 p-3 md:p-6 overflow-y-auto overflow-x-hidden custom-scrollbar flex flex-col gap-4 md:gap-6">
            <div className="flex justify-between items-center">
              <div className="flex-col gap-1 hidden md:flex">
                <h1 className="text-3xl font-bold text-white">Conversations</h1>
                <p className="text-sm text-muted-foreground">All Instagram conversations</p>
              </div>
              <Link href="/dashboard/affiliate-bot">
                <a className="text-primary hover:text-primary/80 text-sm">← Back to Dashboard</a>
              </Link>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-lg text-muted-foreground">Loading conversations...</div>
              </div>
            ) : conversations.length === 0 ? (
              <div className="glass-panel rounded-2xl p-8 text-center text-muted-foreground">
                No conversations yet
              </div>
            ) : (
              <div className="glass-panel rounded-2xl overflow-hidden">
                <div className="divide-y divide-white/5">
                  {conversations.map((conv) => (
                    <Link key={conv.id} href={`/dashboard/affiliate-bot/conversations/${encodeURIComponent(conv.id)}`}>
                      <a className="block hover:bg-white/5 transition p-4 md:p-6 cursor-pointer">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="font-semibold text-lg text-white">
                                {conv.name || conv.username}
                              </div>
                              {conv.hasUnread && (
                                <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full border border-primary/30">
                                  New
                                </span>
                              )}
                            </div>
                            {conv.bio && (
                              <div className="text-sm text-muted-foreground mb-2">@{conv.username}</div>
                            )}
                            <div className="text-white/80 mb-2 line-clamp-2">
                              {conv.lastMessage || "No messages yet"}
                            </div>
                            <div className="flex gap-4 text-sm text-muted-foreground">
                              <span>{conv.inboundCount} received</span>
                              <span>{conv.outboundCount} sent</span>
                              <span>{conv.totalMessages} total</span>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground ml-4">
                            {formatTime(conv.lastMessageAt)}
                          </div>
                        </div>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

