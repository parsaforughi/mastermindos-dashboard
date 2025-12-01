import { MOCK_LOGS, LogEntry } from "@/lib/mockData";
import { Terminal, AlertCircle, Info, CheckCircle2, Clock } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const LogIcon = ({ type }: { type: LogEntry['type'] }) => {
  switch (type) {
    case 'error': return <AlertCircle className="h-3 w-3 text-red-500" />;
    case 'warning': return <AlertCircle className="h-3 w-3 text-yellow-500" />;
    case 'success': return <CheckCircle2 className="h-3 w-3 text-green-500" />;
    case 'system': return <Terminal className="h-3 w-3 text-blue-500" />;
    default: return <Info className="h-3 w-3 text-muted-foreground" />;
  }
};

export function LiveLog() {
  const [logs, setLogs] = useState<LogEntry[]>(MOCK_LOGS);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll and simulate logs
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    
    const interval = setInterval(() => {
      const types: LogEntry['type'][] = ['info', 'success', 'warning', 'system'];
      const newLog: LogEntry = {
        id: Date.now().toString(),
        timestamp: new Date(),
        type: types[Math.floor(Math.random() * types.length)],
        message: `System event simulated #${Math.floor(Math.random() * 1000)}`,
        details: 'Background process'
      };
      setLogs(prev => [...prev.slice(-50), newLog]); // Keep last 50
    }, 5000);

    return () => clearInterval(interval);
  }, [logs]);

  return (
    <div className="glass-panel rounded-2xl h-full flex flex-col overflow-hidden bg-black/40 font-mono text-xs">
      <div className="p-3 border-b border-white/5 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="font-semibold text-muted-foreground">System Logs</span>
        </div>
        <div className="flex gap-1.5">
            <div className="h-2 w-2 rounded-full bg-red-500/20 border border-red-500/50" />
            <div className="h-2 w-2 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
            <div className="h-2 w-2 rounded-full bg-green-500/20 border border-green-500/50" />
        </div>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
        {logs.map((log) => (
          <div key={log.id} className="flex gap-2 hover:bg-white/5 p-1 rounded transition-colors group">
             <span className="text-muted-foreground/50 shrink-0 w-16">
               {log.timestamp.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
             </span>
             <div className="mt-0.5 shrink-0">
                <LogIcon type={log.type} />
             </div>
             <div className="flex-1 break-all">
                <span className={cn(
                  "font-medium mr-2",
                  log.type === 'error' && "text-red-400",
                  log.type === 'warning' && "text-yellow-400",
                  log.type === 'success' && "text-green-400",
                  log.type === 'system' && "text-blue-400",
                  log.type === 'info' && "text-foreground/90",
                )}>
                  {log.message}
                </span>
                {log.details && (
                  <span className="text-muted-foreground/60 text-[10px] group-hover:text-muted-foreground transition-colors">
                    // {log.details}
                  </span>
                )}
             </div>
          </div>
        ))}
        <div className="animate-pulse text-primary">_</div>
      </div>
    </div>
  );
}
