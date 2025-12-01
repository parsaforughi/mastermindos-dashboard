import { 
  LayoutDashboard, 
  MessageSquare, 
  Activity, 
  Settings, 
  Database, 
  Zap, 
  LogOut, 
  Cpu,
  ChevronLeft,
  Globe,
  Send,
  Smartphone
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation, useRoute } from "wouter";

const PROJECT_ICONS: Record<string, any> = {
  "ice-ball": Globe,
  "explainer": Zap,
  "auto-dm": Send,
  "viral-bot": Smartphone
};

const PROJECT_NAMES: Record<string, string> = {
  "ice-ball": "Ice Ball",
  "explainer": "Explainer",
  "auto-dm": "Auto DM",
  "viral-bot": "Viral Bot"
};

export function Sidebar() {
  const [location] = useLocation();
  // We need to extract the botId from the path to build correct links
  // Path format: /bot/:id/page
  const pathParts = location.split('/');
  const botId = pathParts[1] === 'bot' ? pathParts[2] : 'explainer'; // Default or fallback

  const ProjectIcon = PROJECT_ICONS[botId] || Zap;
  const projectName = PROJECT_NAMES[botId] || "Unknown Bot";

  const navItems = [
    { icon: LayoutDashboard, label: "Overview", href: `/bot/${botId}` },
    { icon: MessageSquare, label: "Conversations", href: `/bot/${botId}/conversations` },
    { icon: Activity, label: "Analytics", href: `/bot/${botId}/analytics` },
    { icon: Database, label: "Knowledge Base", href: `/bot/${botId}/knowledge` },
    { icon: Cpu, label: "Bot Settings", href: `/bot/${botId}/settings` },
  ];

  return (
    <div className="h-full w-64 flex flex-col border-r border-white/10 bg-sidebar/50 backdrop-blur-xl z-20 transition-all duration-300">
      {/* Header - Context Switching */}
      <div className="p-4 border-b border-white/5">
        <Link href="/">
          <button className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary mb-4 transition-colors pl-1 group">
            <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </button>
        </Link>
        
        <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/5">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
            <ProjectIcon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-sm tracking-tight leading-none text-white">{projectName}</h1>
            <p className="text-[10px] text-muted-foreground font-mono mt-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Online
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-3 py-4 space-y-1">
        <div className="text-xs font-semibold text-muted-foreground px-3 mb-2 uppercase tracking-wider flex items-center justify-between">
          <span>Module Control</span>
          <span className="text-[10px] opacity-50 font-mono">v2.4</span>
        </div>
        {navItems.map((item) => {
          const isActive = location === item.href || (item.href !== `/bot/${botId}` && location.startsWith(item.href));
          return (
            <Link key={item.label} href={item.href}>
              <button
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group cursor-pointer relative overflow-hidden",
                  isActive 
                    ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_-5px_hsl(var(--primary)/0.3)]" 
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />}
                <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                {item.label}
              </button>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/5">
        <div className="bg-card/50 rounded-xl p-3 border border-white/5 mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground">Resource Usage</span>
            <Activity className="w-3 h-3 text-primary" />
          </div>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                <span>CPU</span>
                <span>34%</span>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[34%] bg-primary" />
              </div>
            </div>
            <div>
               <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                <span>RAM</span>
                <span>1.2GB</span>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[65%] bg-secondary" />
              </div>
            </div>
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
