import { Play, Pause, RotateCcw, RefreshCw, Trash2, Power, Loader2, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useHealth, useStats } from "@/hooks/useExplainerApi";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function ControlPanel() {
  const { data: health, isLoading: healthLoading } = useHealth();
  const { data: stats, isLoading: statsLoading } = useStats();
  const { toast } = useToast();
  const [botActive, setBotActive] = useState(true);

  const isLoading = healthLoading || statsLoading;
  const isConnected = health?.status === 'ok';

  const handleToggle = (checked: boolean) => {
    setBotActive(checked);
    toast({
      title: checked ? "Bot Enabled" : "Bot Paused",
      description: checked ? "Bot is now responding to messages" : "Bot responses are paused",
    });
  };

  const handleAction = (action: string) => {
    toast({
      title: "Action Triggered",
      description: `${action} command sent to bot`,
    });
  };

  return (
    <div className="glass-panel rounded-2xl p-5 h-full flex flex-col" data-testid="control-panel">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-semibold text-lg">Control Center</h2>
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        ) : (
          <div className="flex items-center gap-2">
            <Wifi className={cn("h-4 w-4", isConnected ? "text-green-500" : "text-red-500")} />
            <div className={cn("h-2 w-2 rounded-full shadow-[0_0_10px]", isConnected ? "bg-green-500 shadow-green-500/50" : "bg-red-500 shadow-red-500/50")} />
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
          <div className="space-y-0.5">
            <Label className="text-base">Bot Status</Label>
            <p className="text-xs text-muted-foreground">Toggle bot responses</p>
          </div>
          <Switch 
            checked={botActive}
            onCheckedChange={handleToggle}
            className="data-[state=checked]:bg-green-500"
            data-testid="switch-bot-status"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className={cn("h-20 flex flex-col gap-2 border-white/10 hover:bg-primary/20 hover:text-primary hover:border-primary/50 transition-all", !botActive && "bg-yellow-500/10 border-yellow-500/50 text-yellow-500")}
            onClick={() => handleToggle(!botActive)}
            data-testid="button-pause-resume"
          >
            {botActive ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            <span className="text-xs font-medium">{botActive ? "Pause" : "Resume"}</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-20 flex flex-col gap-2 border-white/10 hover:bg-red-500/20 hover:text-red-500 hover:border-red-500/50 transition-all"
            onClick={() => handleAction("Force Reset")}
            data-testid="button-force-reset"
          >
            <Power className="h-6 w-6" />
            <span className="text-xs font-medium">Force Reset</span>
          </Button>
        </div>

        <div className="space-y-3 pt-2">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Maintenance</Label>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 h-10 border border-transparent hover:border-white/10 hover:bg-white/5"
            onClick={() => handleAction("Reset Session")}
            data-testid="button-reset-session"
          >
            <RotateCcw className="h-4 w-4 text-blue-400" />
            <span className="text-sm">Reset Active Session</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 h-10 border border-transparent hover:border-white/10 hover:bg-white/5"
            data-testid="button-reload-prompt"
          >
            <RefreshCw className="h-4 w-4 text-purple-400" />
            <span className="text-sm">Reload Prompt Context</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 h-10 border border-transparent hover:border-white/10 hover:bg-white/5"
            onClick={() => handleAction("Clear Cache")}
            data-testid="button-clear-cache"
          >
            <Trash2 className="h-4 w-4 text-orange-400" />
            <span className="text-sm">Clear Cache Memory</span>
          </Button>
        </div>

        <div className="pt-4 border-t border-white/10">
           <div className="p-3 rounded-lg bg-black/40 border border-white/5 font-mono text-[10px] text-muted-foreground break-all">
             api_status: <span className={isConnected ? "text-green-400" : "text-red-400"}>{health?.status || 'disconnected'}</span>
             <br />
             conversations: <span className="text-primary">{health?.conversations || 0}</span>
             <br />
             live_clients: <span className="text-purple-400">{health?.liveClients || 0}</span>
             <br />
             total_messages: <span className="text-blue-400">{(stats?.totalReceived || 0) + (stats?.totalSent || 0)}</span>
           </div>
        </div>
      </div>
    </div>
  );
}
