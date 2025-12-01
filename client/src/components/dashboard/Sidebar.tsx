import { 
  LayoutDashboard, 
  MessageSquare, 
  Activity, 
  Settings, 
  Database, 
  Zap, 
  LogOut, 
  Cpu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";

export function Sidebar() {
  const [location] = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/" },
    { icon: MessageSquare, label: "Conversations", href: "/conversations" },
    { icon: Activity, label: "Analytics", href: "/analytics" },
    { icon: Database, label: "Knowledge Base", href: "/knowledge" },
    { icon: Cpu, label: "Bot Settings", href: "/settings" },
  ];

  return (
    <div className="h-full w-64 flex flex-col border-r border-white/10 bg-sidebar/50 backdrop-blur-xl z-20">
      <div className="p-6 flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
          <Zap className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="font-display font-bold text-lg tracking-tight leading-none text-gradient">Mastermind</h1>
          <p className="text-xs text-muted-foreground font-mono">OS v2.4.0</p>
        </div>
      </div>

      <div className="flex-1 px-3 py-4 space-y-1">
        <div className="text-xs font-semibold text-muted-foreground px-3 mb-2 uppercase tracking-wider">Module: Explainer Bot</div>
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.label} href={item.href}>
              <button
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group cursor-pointer",
                  isActive 
                    ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_-5px_hsl(var(--primary)/0.3)]" 
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                {item.label}
              </button>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/5">
        <div className="bg-card/50 rounded-xl p-3 border border-white/5 mb-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium text-green-400">System Healthy</span>
          </div>
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-[85%] bg-gradient-to-r from-green-500 to-emerald-400" />
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
            <span>CPU: 12%</span>
            <span>Mem: 45%</span>
          </div>
        </div>
        <button className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-destructive transition-colors cursor-pointer">
          <LogOut className="h-3.5 w-3.5" />
          Disconnect System
        </button>
      </div>
    </div>
  );
}
