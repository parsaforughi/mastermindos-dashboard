import { Activity, AlertTriangle, Server, Globe, Wifi, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useHealth, useStats } from "@/hooks/useExplainerApi";

const iconMap: Record<string, any> = {
  "API Gateway": Globe,
  "LLM Engine": Server,
  "Database": Server,
  "WebSocket": Wifi,
};

export function HealthMonitor() {
  const { data: health, isLoading: healthLoading } = useHealth();
  const { data: stats, isLoading: statsLoading } = useStats();

  const isLoading = healthLoading || statsLoading;
  const systems = health?.systems || [];
  const allOperational = systems.every(s => s.status === 'operational');

  return (
    <div className="glass-panel rounded-2xl p-5 h-full flex flex-col" data-testid="health-monitor">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-semibold text-lg flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          System Health
        </h2>
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        ) : (
          <span className={cn(
            "text-[10px] uppercase tracking-wider font-mono flex items-center gap-1.5",
            allOperational ? "text-green-400" : "text-yellow-400"
          )}>
            <span className={cn(
              "h-1.5 w-1.5 rounded-full animate-pulse",
              allOperational ? "bg-green-500" : "bg-yellow-500"
            )} />
            {allOperational ? "All Systems Live" : "Degraded"}
          </span>
        )}
      </div>

      <div className="space-y-3">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          systems.map((sys) => {
            const Icon = iconMap[sys.name] || Server;
            return (
              <div 
                key={sys.name} 
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group"
                data-testid={`health-system-${sys.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "h-8 w-8 rounded-lg flex items-center justify-center border",
                    sys.status === 'operational' ? "bg-green-500/10 border-green-500/20 text-green-500" : "bg-yellow-500/10 border-yellow-500/20 text-yellow-500"
                  )}>
                    <Icon className="h-4 w-4" />
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
            );
          })
        )}
      </div>

      <div className="mt-auto pt-4">
        {(stats?.errorCount || 0) > 0 ? (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
            <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-red-400 mb-0.5">Error Rate Spike</div>
              <p className="text-[10px] text-red-300/70 leading-relaxed">
                Detected {stats?.errorCount} errors in recent activity. Check logs for details.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 flex items-start gap-3">
            <Activity className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-green-400 mb-0.5">All Systems Healthy</div>
              <p className="text-[10px] text-green-300/70 leading-relaxed">
                No errors detected. System is running optimally.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
