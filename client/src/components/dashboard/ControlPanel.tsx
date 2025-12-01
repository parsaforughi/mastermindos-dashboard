import { Play, Pause, RotateCcw, RefreshCw, Trash2, Power, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useBotStatus, useBotControl, useSession } from "@/hooks/useExplainerApi";
import { useToast } from "@/hooks/use-toast";

export function ControlPanel() {
  const { data: botStatus, isLoading } = useBotStatus();
  const { data: session } = useSession();
  const botControl = useBotControl();
  const { toast } = useToast();

  const handleControl = (action: "start" | "stop" | "pause" | "resume" | "reset" | "clear-cache") => {
    botControl.mutate(action, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: `Bot ${action} command executed successfully`,
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: `Failed to ${action} bot`,
          variant: "destructive",
        });
      }
    });
  };

  const botActive = session?.active ?? true;
  const isPaused = botStatus?.paused ?? false;

  return (
    <div className="glass-panel rounded-2xl p-5 h-full flex flex-col" data-testid="control-panel">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-semibold text-lg">Control Center</h2>
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        ) : (
          <div className={cn("h-2 w-2 rounded-full shadow-[0_0_10px]", botActive && !isPaused ? "bg-green-500 shadow-green-500/50" : isPaused ? "bg-yellow-500 shadow-yellow-500/50" : "bg-red-500 shadow-red-500/50")} />
        )}
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
          <div className="space-y-0.5">
            <Label className="text-base">Bot Status</Label>
            <p className="text-xs text-muted-foreground">Global system override</p>
          </div>
          <Switch 
            checked={botActive}
            onCheckedChange={(checked) => handleControl(checked ? "start" : "stop")}
            className="data-[state=checked]:bg-green-500"
            disabled={botControl.isPending}
            data-testid="switch-bot-status"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className={cn("h-20 flex flex-col gap-2 border-white/10 hover:bg-primary/20 hover:text-primary hover:border-primary/50 transition-all", isPaused && "bg-yellow-500/10 border-yellow-500/50 text-yellow-500")}
            onClick={() => handleControl(isPaused ? "resume" : "pause")}
            disabled={botControl.isPending}
            data-testid="button-pause-resume"
          >
            {botControl.isPending ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : isPaused ? (
              <Play className="h-6 w-6" />
            ) : (
              <Pause className="h-6 w-6" />
            )}
            <span className="text-xs font-medium">{isPaused ? "Resume" : "Pause"}</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-20 flex flex-col gap-2 border-white/10 hover:bg-red-500/20 hover:text-red-500 hover:border-red-500/50 transition-all"
            onClick={() => handleControl("reset")}
            disabled={botControl.isPending}
            data-testid="button-force-reset"
          >
            {botControl.isPending ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <Power className="h-6 w-6" />
            )}
            <span className="text-xs font-medium">Force Reset</span>
          </Button>
        </div>

        <div className="space-y-3 pt-2">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Maintenance</Label>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 h-10 border border-transparent hover:border-white/10 hover:bg-white/5"
            onClick={() => handleControl("reset")}
            disabled={botControl.isPending}
            data-testid="button-reset-session"
          >
            <RotateCcw className="h-4 w-4 text-blue-400" />
            <span className="text-sm">Reset Active Session</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 h-10 border border-transparent hover:border-white/10 hover:bg-white/5"
            disabled={botControl.isPending}
            data-testid="button-reload-prompt"
          >
            <RefreshCw className="h-4 w-4 text-purple-400" />
            <span className="text-sm">Reload Prompt Context</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 h-10 border border-transparent hover:border-white/10 hover:bg-white/5"
            onClick={() => handleControl("clear-cache")}
            disabled={botControl.isPending}
            data-testid="button-clear-cache"
          >
            <Trash2 className="h-4 w-4 text-orange-400" />
            <span className="text-sm">Clear Cache Memory</span>
          </Button>
        </div>

        <div className="pt-4 border-t border-white/10">
           <div className="p-3 rounded-lg bg-black/40 border border-white/5 font-mono text-[10px] text-muted-foreground break-all">
             current_model: <span className="text-primary">{session?.model || 'loading...'}</span>
             <br />
             uptime: <span className="text-green-400">{botStatus?.uptime ? `${Math.floor(botStatus.uptime / 60)}m ${botStatus.uptime % 60}s` : '0s'}</span>
           </div>
        </div>
      </div>
    </div>
  );
}
