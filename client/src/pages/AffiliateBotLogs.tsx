import { useState, useEffect, useRef } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Menu, X } from "lucide-react";
import { Link } from "wouter";
import { API_CONFIG } from "@/lib/apiConfig";

const API_URL = API_CONFIG.AFFILIATE_BOT_API || "http://localhost:3001";

interface LogEntry {
  id: string;
  level: "info" | "warn" | "error";
  message: string;
  source: string;
  timestamp: string;
}

export default function AffiliateBotLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const eventSource = new EventSource(`${API_URL}/api/sse/logs`);

    eventSource.addEventListener("log", (event) => {
      const logEntry = JSON.parse(event.data);
      setLogs((prev) => {
        const newLogs = [logEntry, ...prev];
        return newLogs.slice(0, 500);
      });
    });

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "error":
        return "text-red-400";
      case "warn":
        return "text-yellow-400";
      default:
        return "text-muted-foreground";
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString();
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
            <h2 className="text-lg font-bold text-white">Logs</h2>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-3 md:p-6 border-b border-white/5">
              <div className="flex justify-between items-center">
                <div className="flex-col gap-1 hidden md:flex">
                  <h1 className="text-3xl font-bold text-white">Live Logs</h1>
                  <p className="text-sm text-muted-foreground">Real-time bot activity logs</p>
                </div>
                <Link href="/dashboard/affiliate-bot">
                  <a className="text-primary hover:text-primary/80 text-sm">← Back to Dashboard</a>
                </Link>
              </div>
              <div className="text-sm text-muted-foreground mt-2">{logs.length} log entries</div>
            </div>

            <div className="flex-1 overflow-y-auto bg-background/50 p-4">
              <div className="max-w-7xl mx-auto font-mono text-sm">
                {logs.length === 0 ? (
                  <div className="text-muted-foreground text-center py-12">
                    Waiting for logs... (logs will appear here in real-time)
                  </div>
                ) : (
                  <div className="space-y-1">
                    {logs.map((log) => (
                      <div
                        key={log.id}
                        className="flex gap-4 py-1 hover:bg-white/5 px-2 rounded"
                      >
                        <span className="text-muted-foreground w-24 flex-shrink-0">
                          {formatTime(log.timestamp)}
                        </span>
                        <span className={`w-16 flex-shrink-0 ${getLevelColor(log.level)}`}>
                          [{log.level.toUpperCase()}]
                        </span>
                        <span className="text-muted-foreground w-20 flex-shrink-0">
                          {log.source}:
                        </span>
                        <span className="text-white/80 flex-1">{log.message}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div ref={logsEndRef} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

