import { Activity, Server, Globe, Wifi, Loader2, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useHealth, useStats } from "@/hooks/useExplainerApi";

export function HealthMonitor() {
  const { data: health, isLoading: healthLoading } = useHealth();
  const { data: stats, isLoading: statsLoading } = useStats();

  const isLoading = healthLoading || statsLoading;
  const isHealthy = health?.status === 'ok';

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
            isHealthy ? "text-green-400" : "text-yellow-400"
          )}>
            <span className={cn(
              "h-1.5 w-1.5 rounded-full animate-pulse",
              isHealthy ? "bg-green-500" : "bg-yellow-500"
            )} />
            {isHealthy ? "All Systems Live" : "Checking..."}
          </span>
        )}
      </div>

      <div className="space-y-3">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div 
              className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group"
              data-testid="health-system-api"
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "h-8 w-8 rounded-lg flex items-center justify-center border",
                  isHealthy ? "bg-green-500/10 border-green-500/20 text-green-500" : "bg-yellow-500/10 border-yellow-500/20 text-yellow-500"
                )}>
                  <Globe className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-medium text-white">API Status</div>
                  <div className="text-[10px] text-muted-foreground">{health?.status || 'checking'}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono text-green-400">
                  {health?.timestamp ? new Date(health.timestamp).toLocaleTimeString() : '--'}
                </div>
              </div>
            </div>

            <div 
              className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group"
              data-testid="health-system-conversations"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg flex items-center justify-center border bg-blue-500/10 border-blue-500/20 text-blue-500">
                  <Server className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-medium text-white">Conversations</div>
                  <div className="text-[10px] text-muted-foreground">Active sessions</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-mono font-bold text-blue-400">
                  {health?.conversations || 0}
                </div>
              </div>
            </div>

            <div 
              className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group"
              data-testid="health-system-clients"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg flex items-center justify-center border bg-purple-500/10 border-purple-500/20 text-purple-500">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-medium text-white">Live Clients</div>
                  <div className="text-[10px] text-muted-foreground">Connected dashboards</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-mono font-bold text-purple-400">
                  {health?.liveClients || 0}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-auto pt-4">
        <div className={cn(
          "p-3 rounded-xl flex items-start gap-3",
          isHealthy ? "bg-green-500/10 border border-green-500/20" : "bg-yellow-500/10 border border-yellow-500/20"
        )}>
          <Activity className={cn("h-4 w-4 shrink-0 mt-0.5", isHealthy ? "text-green-400" : "text-yellow-400")} />
          <div>
            <div className={cn("text-xs font-semibold mb-0.5", isHealthy ? "text-green-400" : "text-yellow-400")}>
              {isHealthy ? "All Systems Healthy" : "Connecting..."}
            </div>
            <p className={cn("text-[10px] leading-relaxed", isHealthy ? "text-green-300/70" : "text-yellow-300/70")}>
              {isHealthy 
                ? `${(stats?.totalReceived || 0) + (stats?.totalSent || 0)} total messages processed`
                : "Establishing connection to Explainer API..."
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
