import { useLiveLogs } from "@/hooks/useExplainerApi";
import { Terminal, Info, Loader2, Wifi, WifiOff } from "lucide-react";
import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export function LiveLog() {
  const { logs, connected } = useLiveLogs();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="glass-panel rounded-2xl h-full flex flex-col overflow-hidden bg-black/40 font-mono text-xs" data-testid="live-log">
      <div className="p-3 border-b border-white/5 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="font-semibold text-muted-foreground">Live Logs</span>
        </div>
        <div className="flex items-center gap-2">
          {connected ? (
            <div className="flex items-center gap-1.5 text-green-400">
              <Wifi className="h-3 w-3" />
              <span className="text-[10px]">Connected</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-yellow-400">
              <WifiOff className="h-3 w-3" />
              <span className="text-[10px]">Connecting...</span>
            </div>
          )}
          <div className="flex gap-1.5">
            <div className="h-2 w-2 rounded-full bg-red-500/20 border border-red-500/50" />
            <div className="h-2 w-2 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
            <div className={cn("h-2 w-2 rounded-full", connected ? "bg-green-500 border border-green-500/50" : "bg-green-500/20 border border-green-500/50")} />
          </div>
        </div>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
        {!connected && logs.length === 0 ? (
          <div className="flex items-center justify-center py-4 gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <span className="text-muted-foreground">Connecting to log stream...</span>
          </div>
        ) : logs.length === 0 ? (
          <div className="text-muted-foreground text-center py-4">
            Waiting for logs... Activity will appear here in real-time.
          </div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="flex gap-2 hover:bg-white/5 p-1 rounded transition-colors group" data-testid={`log-entry-${log.id}`}>
               <span className="text-muted-foreground/50 shrink-0 w-16">
                 {new Date(log.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
               </span>
               <div className="mt-0.5 shrink-0">
                  <Info className="h-3 w-3 text-blue-400" />
               </div>
               <div className="flex-1 break-all">
                  <span className="text-blue-400 font-medium mr-2">
                    [{log.source}]
                  </span>
                  <span className="text-foreground/90">
                    {log.message}
                  </span>
               </div>
            </div>
          ))
        )}
        <div className="animate-pulse text-primary">_</div>
      </div>
    </div>
  );
}
