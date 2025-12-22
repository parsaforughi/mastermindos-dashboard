import { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Menu, X } from "lucide-react";
import { API_CONFIG } from "@/lib/apiConfig";

const API_URL = API_CONFIG.AFFILIATE_BOT_API || "http://localhost:3001";

interface Stats {
  totalConversations: number;
  totalReceived: number;
  totalSent: number;
  todayReceived: number;
  todaySent: number;
  botStatus: {
    running: boolean;
    paused: boolean;
  };
}

export default function AffiliateBotDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_URL}/api/stats`);
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans selection:bg-primary/20 relative">
      <div className="noise-overlay" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-pattern opacity-40" />
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 liquid-blob" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-secondary/10 liquid-blob" style={{ animationDelay: '-5s', animationDuration: '15s' }} />
      </div>

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
            <h2 className="text-lg font-bold text-white">Affiliate Bot</h2>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex-1 p-3 md:p-6 overflow-y-auto overflow-x-hidden custom-scrollbar flex flex-col gap-4 md:gap-6">
            <div className="flex-col gap-1 hidden md:flex">
              <h1 className="text-3xl font-bold text-white">Affiliate Bot Dashboard</h1>
              <p className="text-sm text-muted-foreground">Real-time Instagram DM monitoring and control</p>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-lg text-muted-foreground">Loading...</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <div className="glass-panel rounded-2xl p-4 md:p-6">
                  <div className="text-sm text-muted-foreground mb-2">Total Conversations</div>
                  <div className="text-3xl font-bold text-white">{stats?.totalConversations || 0}</div>
                </div>

                <div className="glass-panel rounded-2xl p-4 md:p-6">
                  <div className="text-sm text-muted-foreground mb-2">Messages Today</div>
                  <div className="text-3xl font-bold text-white">
                    {(stats?.todayReceived || 0) + (stats?.todaySent || 0)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    {stats?.todayReceived || 0} received • {stats?.todaySent || 0} sent
                  </div>
                </div>

                <div className="glass-panel rounded-2xl p-4 md:p-6">
                  <div className="text-sm text-muted-foreground mb-2">Total Messages</div>
                  <div className="text-3xl font-bold text-white">
                    {(stats?.totalReceived || 0) + (stats?.totalSent || 0)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    {stats?.totalReceived || 0} received • {stats?.totalSent || 0} sent
                  </div>
                </div>

                <div className="glass-panel rounded-2xl p-4 md:p-6">
                  <div className="text-sm text-muted-foreground mb-2">Bot Status</div>
                  <div className="text-3xl font-bold">
                    {stats?.botStatus.paused ? (
                      <span className="text-yellow-400">Paused</span>
                    ) : stats?.botStatus.running ? (
                      <span className="text-green-400">Running</span>
                    ) : (
                      <span className="text-red-400">Stopped</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 md:mt-6">
              <div className="glass-panel rounded-2xl p-4 md:p-6">
                <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="/dashboard/affiliate-bot/conversations"
                    className="px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 rounded-lg transition"
                  >
                    View Conversations
                  </a>
                  <a
                    href="/dashboard/affiliate-bot/logs"
                    className="px-4 py-2 bg-secondary/20 hover:bg-secondary/30 text-secondary border border-secondary/30 rounded-lg transition"
                  >
                    View Logs
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

