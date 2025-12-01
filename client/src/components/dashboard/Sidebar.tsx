import { 
  LayoutDashboard, 
  MessageSquare, 
  Activity, 
  Settings, 
  Database, 
  Zap, 
  LogOut, 
  Cpu,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: "Overview", active: true },
    { icon: MessageSquare, label: "Conversations", active: false },
    { icon: Activity, label: "Analytics", active: false },
    { icon: Database, label: "Knowledge Base", active: false },
    { icon: Cpu, label: "Bot Settings", active: false },
    { icon: Settings, label: "System", active: false },
  ];

  return (
    <motion.div 
      className={cn(
        "h-[96vh] my-auto ml-4 rounded-3xl flex flex-col bg-sidebar/80 backdrop-blur-2xl border border-white/10 shadow-2xl z-20 transition-all duration-300 ease-in-out relative overflow-hidden",
        isCollapsed ? "w-20" : "w-64"
      )}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute right-3 top-6 text-muted-foreground hover:text-white transition-colors z-50"
      >
        <Menu className="h-4 w-4" />
      </button>

      {/* Logo Section */}
      <div className={cn("p-6 flex items-center gap-3 transition-all", isCollapsed ? "justify-center px-2" : "")}>
        <motion.div 
          className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_20px_-5px_hsl(var(--primary))]"
          whileHover={{ scale: 1.05, rotate: 5 }}
        >
          <Zap className="h-6 w-6 text-white fill-white" />
        </motion.div>
        {!isCollapsed && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="font-display font-bold text-xl tracking-tight leading-none text-gradient">Mastermind</h1>
            <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest mt-1">v2.4.0</p>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 px-3 py-8 space-y-2">
        {!isCollapsed && <div className="text-[10px] font-bold text-muted-foreground/50 px-4 mb-4 uppercase tracking-widest">Main Module</div>}
        
        {navItems.map((item) => (
          <motion.button
            key={item.label}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden",
              item.active 
                ? "text-white" 
                : "text-muted-foreground hover:text-white"
            )}
          >
            {/* Active Background Gradient */}
            {item.active && (
              <motion.div 
                layoutId="activeNav"
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent border-l-2 border-primary"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}

            <item.icon className={cn("h-5 w-5 z-10 transition-colors", item.active ? "text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]" : "text-muted-foreground group-hover:text-white")} />
            
            {!isCollapsed && (
              <span className="z-10">{item.label}</span>
            )}
            
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
          </motion.button>
        ))}
      </div>

      {/* Footer / System Status */}
      <div className="p-4 mt-auto">
        <div className={cn(
          "bg-card/40 backdrop-blur-md rounded-2xl border border-white/5 overflow-hidden transition-all",
          isCollapsed ? "p-2" : "p-4"
        )}>
          {!isCollapsed ? (
            <>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_hsl(142,76%,36%)]" />
                <span className="text-xs font-medium text-green-400">System Healthy</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>CPU Load</span>
                  <span className="text-white">12%</span>
                </div>
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-400" 
                    animate={{ width: ["12%", "35%", "20%"] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </div>
              </div>
            </>
          ) : (
             <div className="flex justify-center">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_hsl(142,76%,36%)]" />
             </div>
          )}
        </div>
        
        {!isCollapsed && (
          <button className="w-full flex items-center justify-center gap-2 mt-4 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-destructive transition-colors opacity-60 hover:opacity-100">
            <LogOut className="h-3.5 w-3.5" />
            Disconnect
          </button>
        )}
      </div>
    </motion.div>
  );
}
