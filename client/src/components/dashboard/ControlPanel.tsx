import { Play, Pause, RotateCcw, RefreshCw, Trash2, Power, Zap, Radio } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function ControlPanel() {
  const [botActive, setBotActive] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel rounded-3xl p-6 h-full flex flex-col relative overflow-hidden"
    >
      {/* Background Tech Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <h2 className="font-display font-semibold text-lg flex items-center gap-2">
          <Radio className="h-4 w-4 text-primary animate-pulse" />
          Control Center
        </h2>
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground border border-white/10 px-2 py-1 rounded-full bg-black/20">
           <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
           LIVE
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        {/* Main Status Toggle - Redesigned */}
        <div className="relative p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent border border-white/5">
          <div className="bg-black/40 rounded-xl p-4 flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center transition-colors",
                  botActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                )}>
                   <Power className="h-5 w-5" />
                </div>
                <div>
                   <Label className="text-base font-medium block">System Power</Label>
                   <span className={cn("text-xs font-mono uppercase", botActive ? "text-green-400" : "text-red-400")}>
                      {botActive ? "Operational" : "Offline"}
                   </span>
                </div>
             </div>
             <Switch 
                checked={botActive}
                onCheckedChange={setBotActive}
                className="data-[state=checked]:bg-green-500 scale-125"
              />
          </div>
        </div>

        {/* Action Grid - Futuristic Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsPaused(!isPaused)}
            className={cn(
              "h-24 rounded-2xl border flex flex-col items-center justify-center gap-3 transition-all duration-300 relative overflow-hidden group",
              isPaused 
                ? "bg-yellow-500/10 border-yellow-500/50 text-yellow-400" 
                : "bg-white/5 border-white/10 text-foreground hover:border-primary/50 hover:text-primary"
            )}
          >
            <div className={cn(
              "h-10 w-10 rounded-full flex items-center justify-center border transition-all",
              isPaused ? "border-yellow-500 bg-yellow-500/20" : "border-white/10 bg-white/5 group-hover:border-primary group-hover:bg-primary/20"
            )}>
               {isPaused ? <Play className="h-5 w-5 fill-current" /> : <Pause className="h-5 w-5 fill-current" />}
            </div>
            <span className="text-xs font-bold uppercase tracking-wider">{isPaused ? "Resume" : "Pause Bot"}</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 50, 50, 0.1)" }}
            whileTap={{ scale: 0.98 }}
            className="h-24 rounded-2xl border border-white/10 bg-white/5 flex flex-col items-center justify-center gap-3 text-foreground hover:border-red-500/50 hover:text-red-500 transition-all duration-300 group"
          >
            <div className="h-10 w-10 rounded-full flex items-center justify-center border border-white/10 bg-white/5 group-hover:border-red-500 group-hover:bg-red-500/20 transition-all">
               <Zap className="h-5 w-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider">Emergency Stop</span>
          </motion.button>
        </div>

        {/* Quick Actions List */}
        <div className="space-y-3 pt-2">
          <Label className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1">System Maintenance</Label>
          
          {[
            { icon: RotateCcw, label: "Reset Session", color: "text-blue-400" },
            { icon: RefreshCw, label: "Reload Context", color: "text-purple-400" },
            { icon: Trash2, label: "Flush Cache", color: "text-orange-400" }
          ].map((action, i) => (
            <motion.button
              key={action.label}
              whileHover={{ x: 4, backgroundColor: "rgba(255,255,255,0.05)" }}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/[0.02] group transition-colors hover:border-white/10"
            >
              <div className="flex items-center gap-3">
                <action.icon className={cn("h-4 w-4", action.color)} />
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{action.label}</span>
              </div>
              <div className="h-1.5 w-1.5 rounded-full bg-white/20 group-hover:bg-primary transition-colors" />
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
