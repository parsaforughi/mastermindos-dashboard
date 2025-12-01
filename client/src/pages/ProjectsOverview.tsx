import { 
  MessageSquare, 
  Zap, 
  Send, 
  TrendingUp, 
  Plus, 
  Bot, 
  Smartphone, 
  Globe, 
  MoreVertical 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

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
    status: "active"
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
    status: "active"
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
    status: "active"
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
    status: "maintenance"
  }
];

export default function ProjectsOverview() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground overflow-x-hidden font-sans selection:bg-primary/20 relative">
      <div className="noise-overlay" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-pattern opacity-30" />
      
      {/* Ambient Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[20%] w-[60%] h-[60%] rounded-full bg-primary/5 liquid-blob" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-3xl tracking-tight text-gradient">Mastermind OS</h1>
              <p className="text-muted-foreground font-mono text-sm">Central Command • v2.4.0</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Systems Operational
             </div>
             <div className="h-8 w-8 rounded-full bg-white/10 border border-white/10" />
          </div>
        </header>

        {/* Controls */}
        <div className="flex items-center justify-between mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            Active Neural Modules
          </h2>
          <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 gap-2">
            <Plus className="w-4 h-4" />
            Deploy New Bot
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          {projects.map((project, i) => (
            <Link key={project.id} href={`/bot/${project.id}`}>
              <div 
                className="glass-panel-interactive p-6 rounded-2xl h-64 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Hover Gradient */}
                <div className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br from-transparent via-transparent",
                  project.color.replace('text-', 'to-')
                )} />

                <div className="flex justify-between items-start relative z-10">
                  <div className={cn("p-3 rounded-xl border backdrop-blur-md shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3", project.bg, project.border, project.color)}>
                    <project.icon className="w-6 h-6" />
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground -mt-2 -mr-2">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4 relative z-10">
                  <div>
                    <h3 className="text-2xl font-display font-bold tracking-tight group-hover:text-white transition-colors">{project.name}</h3>
                    <p className="text-sm text-muted-foreground font-medium">{project.type}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Active Users</div>
                      <div className="font-mono font-bold text-lg">{project.stats.users}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Activity</div>
                      <div className={cn("font-mono font-bold text-lg flex items-center gap-1", project.stats.activity === 'Extreme' ? 'text-red-400' : 'text-green-400')}>
                        {project.stats.activity}
                        <TrendingUp className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className={cn(
                  "absolute top-6 right-6 w-2 h-2 rounded-full shadow-[0_0_10px]",
                  project.status === 'active' ? 'bg-green-500 shadow-green-500/50' : 'bg-yellow-500 shadow-yellow-500/50'
                )} />
              </div>
            </Link>
          ))}

          {/* Add New Placeholder */}
          <button className="glass-panel p-6 rounded-2xl h-64 flex flex-col items-center justify-center gap-4 border-dashed border-white/20 hover:border-primary/50 hover:bg-primary/5 transition-all group">
            <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary" />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-muted-foreground group-hover:text-primary transition-colors">Add Project</h3>
              <p className="text-xs text-muted-foreground/60">Connect a new bot instance</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
