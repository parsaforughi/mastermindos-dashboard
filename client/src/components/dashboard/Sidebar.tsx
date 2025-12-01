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
        "h-[96vh] my-auto ml-4 rounded-3xl flex flex-col bg-sidebar/60 backdrop-blur-xl border border-white/10 shadow-2xl z-20 transition-all duration-300 ease-in-out relative overflow-hidden ring-1 ring-white/5",
        isCollapsed ? "w-20" : "w-64"
      )}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Soft colorful gradient blob at top */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/30 rounded-full blur-3xl pointer-events-none" />

      {/* Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute right-3 top-6 text-muted-foreground hover:text-white transition-colors z-50 p-1 hover:bg-white/10 rounded-lg"
      >
        <Menu className="h-4 w-4" />
      </button>

      {/* Logo Section */}
      <div className={cn("p-6 flex items-center gap-3 transition-all relative z-10", isCollapsed ? "justify-center px-2" : "")}>
        <motion.div 
          className="h-10 w-10 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_15px_-3px_hsl(var(--primary))]"
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
        >
          <Zap className="h-5 w-5 text-white fill-white" />
        </motion.div>
        {!isCollapsed && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="font-display font-bold text-xl tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Mastermind</h1>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 px-3 py-8 space-y-2 relative z-10">
        
        {navItems.map((item) => (
          <motion.button
            key={item.label}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden",
              item.active 
                ? "text-white shadow-lg shadow-primary/20" 
                : "text-muted-foreground hover:text-white"
            )}
          >
            {/* Active Background */}
            {item.active && (
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40 rounded-xl border border-white/10" />
            )}

            {/* Hover Effect */}
            {!item.active && (
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity" />
            )}

            <item.icon className={cn("h-5 w-5 z-10 transition-transform group-hover:scale-110", item.active ? "text-white" : "text-muted-foreground group-hover:text-white")} />
            
            {!isCollapsed && (
              <span className="z-10 font-medium tracking-wide">{item.label}</span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 mt-auto relative z-10">
        <div className={cn(
          "bg-black/20 backdrop-blur-md rounded-2xl border border-white/5 overflow-hidden transition-all",
          isCollapsed ? "p-2" : "p-4"
        )}>
          {!isCollapsed ? (
            <>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_hsl(142,76%,56%)]" />
                <span className="text-xs font-bold text-green-400 uppercase tracking-wider">System Online</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-300" 
                  animate={{ width: ["30%", "60%", "45%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </>
          ) : (
             <div className="flex justify-center">
                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
             </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
