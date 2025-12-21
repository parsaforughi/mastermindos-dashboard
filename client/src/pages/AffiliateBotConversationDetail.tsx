import { useState, useEffect, useRef } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Menu, X } from "lucide-react";
import { Link, useRoute } from "wouter";

const API_URL = "http://localhost:3001";

interface Message {
  id: string;
  conversationId: string;
  from: "user" | "bot";
  text: string;
  createdAt: string;
}

interface Conversation {
  id: string;
  username: string;
  name: string | null;
  bio: string | null;
  messages: Message[];
  inboundCount: number;
  outboundCount: number;
  totalMessages: number;
}

export default function AffiliateBotConversationDetail() {
  const [match, params] = useRoute<{ id: string }>("/dashboard/affiliate-bot/conversations/:id");
  const conversationId = params?.id ? decodeURIComponent(params.id) : "";
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.messages]);

  useEffect(() => {
    if (!conversationId) return;

    const fetchConversation = async () => {
      try {
        const res = await fetch(`${API_URL}/api/conversations/${encodeURIComponent(conversationId)}`);
        if (!res.ok) {
          throw new Error("Conversation not found");
        }
        const data = await res.json();
        setConversation(data);
      } catch (err) {
        console.error("Failed to fetch conversation:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchConversation();
    const interval = setInterval(fetchConversation, 2000);

    const eventSource = new EventSource(`${API_URL}/api/sse/live-messages`);
    eventSource.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      if (data.message && data.message.conversationId === conversationId) {
        fetchConversation();
      }
    });

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      clearInterval(interval);
      eventSource.close();
    };
  }, [conversationId]);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (!match || !conversationId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-muted-foreground">Invalid conversation</div>
      </div>
    );
  }

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
            <h2 className="text-lg font-bold text-white">Conversation</h2>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="glass-panel border-b border-white/5 p-4">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div>
                  <Link href="/dashboard/affiliate-bot/conversations">
                    <a className="text-primary hover:text-primary/80 mb-2 inline-block text-sm">
                      ← Back to Conversations
                    </a>
                  </Link>
                  <h1 className="text-2xl font-bold text-white">
                    {loading ? "Loading..." : conversation?.name || conversation?.username || "Conversation"}
                  </h1>
                  {conversation?.bio && (
                    <div className="text-sm text-muted-foreground mt-1">@{conversation.username}</div>
                  )}
                </div>
                {conversation && (
                  <div className="text-sm text-muted-foreground">
                    {conversation.inboundCount} received • {conversation.outboundCount} sent
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-lg text-muted-foreground">Loading conversation...</div>
                </div>
              ) : !conversation ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-lg text-muted-foreground">Conversation not found</div>
                </div>
              ) : conversation.messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-muted-foreground py-12">
                    No messages in this conversation yet
                  </div>
                </div>
              ) : (
                <div className="max-w-4xl mx-auto space-y-4">
                  {conversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.from === "bot" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          message.from === "bot"
                            ? "bg-primary/30 text-white border border-primary/30"
                            : "bg-white/10 text-white border border-white/10"
                        }`}
                      >
                        <div className="whitespace-pre-wrap break-words">{message.text}</div>
                        <div
                          className={`text-xs mt-2 ${
                            message.from === "bot" ? "text-primary/70" : "text-muted-foreground"
                          }`}
                        >
                          {formatTime(message.createdAt)}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

