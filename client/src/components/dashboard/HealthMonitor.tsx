import { Activity, CheckCircle2, AlertTriangle, Server, Globe, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";

export function HealthMonitor() {
  const systems = [
    { name: "API Gateway", status: "operational", latency: "24ms", icon: Globe },
    { name: "LLM Engine", status: "operational", latency: "145ms", icon: Server },
    { name: "Database", status: "operational", latency: "12ms", icon: Server },
    { name: "WebSocket", status: "degraded", latency: "850ms", icon: Wifi },
  ];

  return (
    <div className="glass-panel rounded-2xl p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-semibold text-lg flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          System Health
        </h2>
        <span className="text-[10px] uppercase tracking-wider font-mono text-green-400 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
          All Systems Live
        </span>
      </div>

      <div className="space-y-3">
        {systems.map((sys) => (
          <div key={sys.name} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
            <div className="flex items-center gap-3">
              <div className={cn(
                "h-8 w-8 rounded-lg flex items-center justify-center border",
                sys.status === 'operational' ? "bg-green-500/10 border-green-500/20 text-green-500" : "bg-yellow-500/10 border-yellow-500/20 text-yellow-500"
              )}>
                <sys.icon className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-medium text-white">{sys.name}</div>
                <div className="text-[10px] text-muted-foreground">{sys.status}</div>
              </div>
            </div>
            <div className="text-right">
              <div className={cn(
                "text-xs font-mono",
                parseInt(sys.latency) > 200 ? "text-yellow-400" : "text-green-400"
              )}>
                {sys.latency}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-4">
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
          <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-semibold text-red-400 mb-0.5">Error Rate Spike</div>
            <p className="text-[10px] text-red-300/70 leading-relaxed">
              Detected unusual error rate in WebSocket connections (Error 1006) starting at 14:30 UTC.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
