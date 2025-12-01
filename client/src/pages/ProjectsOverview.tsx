import { 
  MessageSquare, 
  Zap, 
  Send, 
  TrendingUp, 
  Plus, 
  Bot, 
  Smartphone, 
  Globe, 
  MoreVertical,
  Cpu,
  Network,
  Command,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const projects = [
  { 
    id: "ice-ball", 
    name: "Ice Ball", 
    type: "Game Bot", 
    icon: Globe,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    stats: { users: "12.5k", activity: "High" },
    status: "active",
    description: "Autonomous gaming agent managing economy and player interactions."
  },
  { 
    id: "explainer", 
    name: "Explainer", 
    type: "Education AI", 
    icon: Zap,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    stats: { users: "843", activity: "Moderate" },
    status: "active",
    description: "Adaptive learning assistant with multi-modal explanation capabilities."
  },
  { 
    id: "auto-dm", 
    name: "Auto DM", 
    type: "Marketing Automation", 
    icon: Send,
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    stats: { users: "2.1M", activity: "Extreme" },
    status: "active",
    description: "High-volume direct messaging neural network for campaign scaling."
  },
  { 
    id: "viral-bot", 
    name: "Viral TelegramBot", 
    type: "Social Growth", 
    icon: Smartphone,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    stats: { users: "450k", activity: "High" },
    status: "maintenance",
    description: "Trend analysis and viral content propagation engine."
  }
];

function HolographicCard({ project, index }: { project: any, index: number }) {
  return (
    <Link href={`/bot/${project.id}`}>
      <div 
        className="group relative h-[320px] perspective-1000 cursor-pointer"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-3xl transform transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-2 border border-white/10 group-hover:border-primary/50 shadow-2xl backdrop-blur-xl overflow-hidden">
          {/* Scanning Line Effect */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-50 animate-scan pointer-events-none z-20" />
          
          {/* Animated Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black,transparent)] opacity-30 group-hover:opacity-50 transition-opacity" />

          <div className="p-6 h-full flex flex-col relative z-10">
            {/* Top Bar */}
            <div className="flex justify-between items-start mb-6">
              <div className={cn(
                "h-14 w-14 rounded-2xl flex items-center justify-center border transition-all duration-500 group-hover:shadow-[0_0_30px_-5px_currentColor]",
                project.bg, project.border, project.color
              )}>
                <project.icon className="w-7 h-7" />
              </div>
              <div className="flex items-center gap-2">
                 <div className={cn(
                   "w-2 h-2 rounded-full shadow-[0_0_8px]", 
                   project.status === 'active' ? "bg-green-500 shadow-green-500" : "bg-yellow-500 shadow-yellow-500"
                 )} />
                 <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{project.status}</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-2">
              <h3 className="text-2xl font-display font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all">
                {project.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 group-hover:text-white/70 transition-colors">
                {project.description}
              </p>
            </div>

            {/* Tech Stats */}
            <div className="grid grid-cols-2 gap-2 mt-6 pt-6 border-t border-white/5">
               <div className="bg-black/20 rounded-lg p-2 border border-white/5 group-hover:border-primary/30 transition-colors">
                 <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Users</div>
                 <div className="font-mono font-bold text-lg text-white">{project.stats.users}</div>
               </div>
               <div className="bg-black/20 rounded-lg p-2 border border-white/5 group-hover:border-primary/30 transition-colors">
                 <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Load</div>
                 <div className={cn("font-mono font-bold text-lg flex items-center gap-2", project.stats.activity === 'Extreme' ? 'text-red-400' : 'text-green-400')}>
                   {project.stats.activity}
                   <Activity className="w-3 h-3 animate-pulse" />
                 </div>
               </div>
            </div>
          </div>

          {/* Hover Glow */}
          <div className={cn(
            "absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none",
            project.color.replace('text-', 'bg-')
          )} />
        </div>
      </div>
    </Link>
  );
}

export default function ProjectsOverview() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#050508] text-foreground overflow-x-hidden font-sans selection:bg-primary/20 relative perspective-1000">
      {/* Deep Space Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(120,119,198,0.1),transparent_50%)]" />
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
      </div>
      
      <div className="noise-overlay" />

      <div className="relative z-10 max-w-7xl mx-auto p-8 flex flex-col min-h-screen">
        {/* Cinematic Header */}
        <header className="relative py-12 mb-12 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-1000">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-primary mb-6 hover:bg-white/10 transition-colors cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            NEURAL INTERFACE v2.4.0 CONNECTED
          </div>
          
          <h1 className="text-6xl md:text-7xl font-display font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 mb-4 drop-shadow-2xl">
            MASTERMIND OS
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Centralized command cortex for autonomous agents. Monitor neural pathways, deployment status, and resource allocation in real-time.
          </p>
        </header>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
           <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center hover:bg-white/[0.04] transition-colors">
              <div className="text-muted-foreground text-xs uppercase tracking-widest mb-1">Total Nodes</div>
              <div className="text-2xl font-mono font-bold text-white">04</div>
           </div>
           <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center hover:bg-white/[0.04] transition-colors">
              <div className="text-muted-foreground text-xs uppercase tracking-widest mb-1">Network Load</div>
              <div className="text-2xl font-mono font-bold text-green-400 flex items-center gap-2">
                42% <Activity className="w-4 h-4" />
              </div>
           </div>
           <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center hover:bg-white/[0.04] transition-colors">
              <div className="text-muted-foreground text-xs uppercase tracking-widest mb-1">Uptime</div>
              <div className="text-2xl font-mono font-bold text-blue-400">99.9%</div>
           </div>
           <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center hover:bg-white/[0.04] transition-colors">
              <div className="text-muted-foreground text-xs uppercase tracking-widest mb-1">Security</div>
              <div className="text-2xl font-mono font-bold text-purple-400">SECURE</div>
           </div>
        </div>

        {/* Projects Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8 animate-in fade-in duration-700 delay-300">
             <h2 className="text-xl font-semibold flex items-center gap-3">
               <Command className="w-5 h-5 text-primary" />
               <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Active Modules</span>
             </h2>
             <div className="h-[1px] flex-1 mx-6 bg-gradient-to-r from-white/10 to-transparent" />
             <Button className="bg-white text-black hover:bg-white/90 shadow-[0_0_20px_-5px_white] font-semibold gap-2 transition-transform hover:scale-105 active:scale-95">
               <Plus className="w-4 h-4" />
               Initialize Node
             </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 pb-20">
            {projects.map((project, i) => (
              <HolographicCard key={project.id} project={project} index={i} />
            ))}
            
            {/* Add New Placeholder */}
            <button className="group relative h-[320px] rounded-3xl border border-dashed border-white/10 hover:border-primary/30 bg-white/[0.01] hover:bg-primary/[0.02] transition-all duration-300 flex flex-col items-center justify-center gap-6 cursor-pointer overflow-hidden animate-in fade-in slide-in-from-bottom-12 delay-500 fill-mode-backwards">
               <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] group-hover:animate-shimmer" />
               
               <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500 z-10 border border-white/5 group-hover:border-primary/30 shadow-xl">
                 <Network className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
               </div>
               <div className="text-center z-10">
                 <h3 className="font-display font-bold text-xl text-muted-foreground group-hover:text-primary transition-colors mb-1">Deploy Agent</h3>
                 <p className="text-xs text-muted-foreground/50 font-mono">Configure new neural pathway</p>
               </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
