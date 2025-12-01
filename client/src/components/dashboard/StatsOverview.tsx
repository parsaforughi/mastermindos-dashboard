import { MOCK_STATS } from "@/lib/mockData";
import { MessageSquare, Users, Zap, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { time: "10:00", messages: 24 },
  { time: "11:00", messages: 45 },
  { time: "12:00", messages: 89 },
  { time: "13:00", messages: 65 },
  { time: "14:00", messages: 112 },
  { time: "15:00", messages: 95 },
  { time: "16:00", messages: 145 },
];

function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  trend, 
  trendUp,
  colorClass = "text-primary"
}: { 
  icon: any, 
  label: string, 
  value: string | number, 
  trend?: string, 
  trendUp?: boolean,
  colorClass?: string
}) {
  return (
    <div className="glass-panel rounded-2xl p-5 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon className="h-16 w-16" />
      </div>
      
      <div className="flex flex-col gap-4 relative z-10">
        <div className={`p-3 rounded-xl bg-white/5 w-fit border border-white/10 ${colorClass}`}>
          <Icon className="h-5 w-5" />
        </div>
        
        <div>
          <h3 className="text-2xl font-display font-bold tracking-tight">{value}</h3>
          <p className="text-sm text-muted-foreground font-medium">{label}</p>
        </div>
        
        {trend && (
          <div className={`text-xs font-medium flex items-center gap-1 ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
            {trendUp ? '↑' : '↓'} {trend} vs yesterday
          </div>
        )}
      </div>
    </div>
  );
}

export function StatsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard 
        icon={MessageSquare} 
        label="Total Messages" 
        value={MOCK_STATS.totalMessages.toLocaleString()} 
        trend="12%" 
        trendUp={true}
        colorClass="text-blue-400"
      />
      <StatCard 
        icon={Users} 
        label="Active Users" 
        value={MOCK_STATS.activeUsers} 
        trend="5%" 
        trendUp={true}
        colorClass="text-purple-400"
      />
      <StatCard 
        icon={Zap} 
        label="Response Rate" 
        value={`${MOCK_STATS.responseRate}%`} 
        trend="0.2%" 
        trendUp={false}
        colorClass="text-yellow-400"
      />
      
      <div className="glass-panel rounded-2xl p-5 lg:col-span-1 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Avg Latency</span>
            </div>
            <span className="text-lg font-bold font-mono text-green-400">{MOCK_STATS.avgResponseTime}</span>
        </div>
        
        <div className="h-24 w-full -ml-4">
            <ResponsiveContainer width="110%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <Area 
                        type="monotone" 
                        dataKey="messages" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorMessages)" 
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
