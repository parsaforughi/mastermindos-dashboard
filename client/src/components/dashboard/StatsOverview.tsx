import { MOCK_STATS } from "@/lib/mockData";
import { MessageSquare, Users, Zap, Clock, TrendingUp, Activity } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import { cn } from "@/lib/utils";

const data = [
  { time: "10:00", messages: 24, latency: 120 },
  { time: "11:00", messages: 45, latency: 135 },
  { time: "12:00", messages: 89, latency: 180 },
  { time: "13:00", messages: 65, latency: 110 },
  { time: "14:00", messages: 112, latency: 95 },
  { time: "15:00", messages: 95, latency: 140 },
  { time: "16:00", messages: 145, latency: 160 },
];

function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  trend, 
  trendUp,
  colorClass = "text-primary",
  gradientFrom,
  gradientTo
}: { 
  icon: any, 
  label: string, 
  value: string | number, 
  trend?: string, 
  trendUp?: boolean,
  colorClass?: string,
  gradientFrom: string,
  gradientTo: string
}) {
  return (
    <div className="glass-panel-interactive rounded-2xl p-5 relative overflow-hidden group h-full">
      {/* Ambient Glow on Hover */}
      <div className={cn(
        "absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-30 transition-opacity duration-500",
        gradientFrom
      )} />
      
      <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
        <Icon className="h-24 w-24" />
      </div>
      
      <div className="flex flex-col gap-4 relative z-10">
        <div className={cn(
          "p-3 rounded-xl w-fit border transition-all duration-300 shadow-lg",
          "bg-white/5 border-white/10 group-hover:border-white/20 group-hover:scale-110",
          colorClass
        )}>
          <Icon className="h-5 w-5" />
        </div>
        
        <div>
          <h3 className="text-3xl font-display font-bold tracking-tight text-foreground/90 group-hover:text-white transition-colors">
            {value}
          </h3>
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider text-[10px] mt-1">{label}</p>
        </div>
        
        {trend && (
          <div className={cn(
            "text-xs font-medium flex items-center gap-1.5 px-2 py-1 rounded-md w-fit backdrop-blur-sm",
            trendUp ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-rose-400 bg-rose-500/10 border border-rose-500/20'
          )}>
            <TrendingUp className={cn("h-3 w-3", !trendUp && "rotate-180")} />
            {trend} vs yesterday
          </div>
        )}
      </div>
    </div>
  );
}

export function StatsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-0">
        <StatCard 
          icon={MessageSquare} 
          label="Total Messages" 
          value={MOCK_STATS.totalMessages.toLocaleString()} 
          trend="12%" 
          trendUp={true}
          colorClass="text-blue-400"
          gradientFrom="bg-blue-500"
          gradientTo="bg-cyan-500"
        />
      </div>
      
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
        <StatCard 
          icon={Users} 
          label="Active Users" 
          value={MOCK_STATS.activeUsers} 
          trend="5%" 
          trendUp={true}
          colorClass="text-purple-400"
          gradientFrom="bg-purple-500"
          gradientTo="bg-pink-500"
        />
      </div>
      
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
        <StatCard 
          icon={Zap} 
          label="Response Rate" 
          value={`${MOCK_STATS.responseRate}%`} 
          trend="0.2%" 
          trendUp={false}
          colorClass="text-amber-400"
          gradientFrom="bg-amber-500"
          gradientTo="bg-orange-500"
        />
      </div>
      
      <div className="glass-panel-interactive rounded-2xl p-5 lg:col-span-1 flex flex-col justify-between animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300 group">
        <div className="flex items-center justify-between mb-2 relative z-10">
            <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                   <Activity className="h-4 w-4" />
                </div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Latency</span>
            </div>
            <span className="text-lg font-bold font-mono text-emerald-400 shadow-[0_0_15px_-5px_rgba(52,211,153,0.5)]">{MOCK_STATS.avgResponseTime}</span>
        </div>
        
        <div className="h-24 w-full -ml-4 relative z-0 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
            <ResponsiveContainer width="110%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#34d399" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <Area 
                        type="monotone" 
                        dataKey="latency" 
                        stroke="#34d399" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorLatency)" 
                        animationDuration={2000}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
