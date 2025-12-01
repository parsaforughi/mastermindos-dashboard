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
  Activity,
  Shield,
  Database,
  Target,
  Brain,
  Mail,
  Snowflake,
  Crown
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
    icon: Snowflake,
    color: "text-cyan-400",
    gradient: "from-cyan-400 to-blue-600",
    stats: { users: "12.5k", activity: "High" },
    status: "active",
    description: "Autonomous gaming agent managing economy and player interactions."
  },
  { 
    id: "explainer", 
    name: "Explainer", 
    type: "Education AI", 
    icon: Brain,
    color: "text-purple-400",
    gradient: "from-purple-400 to-pink-600",
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
    gradient: "from-green-400 to-emerald-600",
    stats: { users: "2.1M", activity: "Extreme" },
    status: "active",
    description: "High-volume direct messaging neural network for campaign scaling."
  },
  { 
    id: "viral-bot", 
    name: "Viral TB", 
    type: "Social Growth", 
    icon: TrendingUp,
    color: "text-pink-400",
    gradient: "from-pink-400 to-rose-600",
    stats: { users: "582.3k", activity: "Extreme" },
    status: "active",
    description: "Viral content tracking and analytics dashboard.",
    isDashboard: true,
    href: "/dashboard/viral-bot"
  },
  { 
    id: "iceball-dashboard", 
    name: "Iceball", 
    type: "Analytics", 
    icon: Snowflake,
    color: "text-cyan-400",
    gradient: "from-cyan-400 to-blue-600",
    stats: { users: "45.8k", activity: "High" },
    status: "active",
    description: "Image processing and Gemini API analytics dashboard.",
    isDashboard: true,
    href: "/dashboard/iceball-bot"
  },
  { 
    id: "vip-passport", 
    name: "VIP Passport", 
    type: "Engagement", 
    icon: Crown,
    color: "text-amber-400",
    gradient: "from-amber-400 to-orange-600",
    stats: { users: "2.8k", activity: "Moderate" },
    status: "active",
    description: "VIP missions, rewards, and user engagement platform.",
    isDashboard: true,
    href: "/dashboard/vip-passport"
  }
];

function OrbitalNode({ project, index, total, radius = 280 }: { project: any, index: number, total: number, radius?: number }) {
  // Calculate position on the circle with 45 degree offset to avoid cardinal directions
  const angle = (index / total) * 2 * Math.PI + (Math.PI / 4);
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return (
    <div 
      className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center group z-20"
      style={{ 
        transform: `translate(${x}px, ${y}px)`,
      }}
    >
      {/* Connecting Line to Core */}
      <div 
        className="absolute top-1/2 left-1/2 h-[1px] bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 origin-left -z-10"
        style={{ 
          width: `${radius}px`,
          transform: `rotate(${angle * (180/Math.PI) + 180}deg)`,
          left: '0',
          top: '0'
        }}
      />

      <Link href={project.isDashboard ? project.href : `/bot/${project.id}`}>
        <div className="relative cursor-pointer group perspective-1000">
          {/* Floating Animation Container */}
          <div className="animate-float" style={{ animationDelay: `${index * 1}s` }}>
             
            {/* The Planet Node */}
            <div className="relative w-32 h-32">
                {/* Glow Effect */}
                <div className={cn(
                  "absolute inset-0 rounded-full blur-[30px] opacity-20 group-hover:opacity-60 transition-opacity duration-500",
                  project.color.replace('text-', 'bg-')
                )} />
                
                {/* Core Circle */}
                <div className="absolute inset-0 rounded-full bg-black/80 border border-white/10 backdrop-blur-xl flex flex-col items-center justify-center gap-2 group-hover:scale-110 transition-transform duration-500 shadow-2xl overflow-hidden">
                   <div className={cn(
                     "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br",
                     project.gradient
                   )} />
                   
                   <project.icon className={cn("w-8 h-8 transition-all duration-500", project.color)} />
                   <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">{project.name}</span>
                   
                   {/* Status Ring */}
                   <div className={cn(
                     "absolute inset-0 border-2 rounded-full border-transparent group-hover:border-t-white/50 transition-all duration-1000 animate-spin-slow",
                   )} />
                </div>
            </div>

            {/* Info Tooltip Card - Appears on Hover */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto transform translate-y-2 group-hover:translate-y-0 z-30">
               <div className="glass-panel p-4 rounded-xl border-l-4 border-l-primary">
                  <h4 className="font-bold text-white mb-1">{project.name}</h4>
                  <p className="text-xs text-muted-foreground mb-3">{project.description}</p>
                  <div className="flex justify-between items-center text-[10px] font-mono uppercase text-white/60">
                     <span>Users: {project.stats.users}</span>
                     <span className={cn(
                       "px-1.5 py-0.5 rounded bg-white/5",
                       project.status === 'active' ? 'text-green-400' : 'text-yellow-400'
                     )}>{project.status}</span>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </Link>
    </div>
  );
}

export default function ProjectsOverview() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="h-screen w-full bg-[#030305] text-foreground overflow-hidden font-sans selection:bg-primary/20 relative perspective-1000 flex items-center justify-center">
      {/* Cinematic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.05),transparent_70%)]" />
         {/* Starfield */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>
      
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        
        {/* Header Overlay */}
        <div className="absolute top-6 left-0 w-full text-center z-50 pointer-events-none">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-white/10 backdrop-blur-md mb-3 animate-in fade-in slide-in-from-top-8 duration-1000">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-mono text-primary-foreground/80 tracking-widest">SYSTEM ONLINE</span>
           </div>
           <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 animate-in fade-in zoom-in-95 duration-1000 delay-200">
             MASTERMIND <span className="text-primary">OS</span>
           </h1>
        </div>

        {/* The Core System */}
        <div className="relative w-[800px] h-[800px] flex items-center justify-center mt-32">
           
           {/* Orbital Rings */}
           <div className="absolute inset-0 rounded-full border border-white/[0.03] animate-orbit-reverse" style={{ animationDuration: '120s' }} />
           <div className="absolute inset-[100px] rounded-full border border-white/[0.05] animate-orbit" style={{ animationDuration: '80s' }} />
           <div className="absolute inset-[200px] rounded-full border border-dashed border-white/[0.08] animate-orbit-reverse" style={{ animationDuration: '60s' }} />
           
           {/* Central Sun/Core */}
           <div className="relative z-10 animate-pulse-core group cursor-default">
              <div className="w-40 h-40 rounded-full bg-black border border-primary/50 shadow-[0_0_100px_-20px_hsl(var(--primary)/0.5)] flex items-center justify-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-900/20 animate-pulse" />
                 <Cpu className="w-16 h-16 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                 
                 {/* Inner Spinning Data Ring */}
                 <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-primary/60 border-b-primary/60 animate-spin" style={{ animationDuration: '10s' }} />
              </div>
              
              {/* Core Label */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center w-40">
                 <div className="text-xs font-mono text-primary/80 tracking-[0.2em]">SEYLANE AI</div>
                 <div className="text-[10px] text-muted-foreground">Processing Nodes</div>
              </div>
           </div>

           {/* Orbiting Project Nodes */}
           <div className="absolute inset-0 animate-in fade-in duration-1000 delay-500">
              {projects.map((project, i) => (
                <OrbitalNode 
                  key={project.id} 
                  project={project} 
                  index={i} 
                  total={projects.length} 
                />
              ))}
              
              {/* Add New Node Button (As a satellite) */}
              <div className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center" style={{ transform: 'translate(0px, 280px)' }}>
                 <button className="relative group animate-float" style={{ animationDelay: '2s' }}>
                    <div className="w-16 h-16 rounded-full bg-black/50 border border-dashed border-white/20 hover:border-primary hover:bg-primary/10 transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
                       <Plus className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-muted-foreground uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Initialize Node</span>
                 </button>
              </div>
           </div>

        </div>

        {/* Footer Stats */}
        <div className="absolute bottom-12 w-full px-12 flex justify-between items-end text-muted-foreground/50 font-mono text-[10px] uppercase tracking-widest animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700">
           <div className="flex gap-8">
              <div>
                <span className="block text-white/20 mb-1">Memory Load</span>
                <div className="h-1 w-32 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-[45%] bg-primary/50 animate-pulse" />
                </div>
              </div>
              <div>
                <span className="block text-white/20 mb-1">Network Latency</span>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  12ms
                </div>
              </div>
           </div>
           <div>
              SECURE CONNECTION • ENCRYPTED
           </div>
        </div>

      </div>
    </div>
  );
}
