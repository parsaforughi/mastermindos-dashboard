import { Sidebar } from "@/components/dashboard/Sidebar";
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { Activity, TrendingUp, Users, Zap, Globe, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const dailyData = [
  { day: "Mon", users: 120, messages: 1400 },
  { day: "Tue", users: 132, messages: 1600 },
  { day: "Wed", users: 101, messages: 900 },
  { day: "Thu", users: 134, messages: 1200 },
  { day: "Fri", users: 190, messages: 2100 },
  { day: "Sat", users: 230, messages: 2800 },
  { day: "Sun", users: 210, messages: 2500 },
];

const latencyData = Array.from({ length: 20 }, (_, i) => ({
  time: i,
  value: Math.floor(Math.random() * 100) + 50
}));

function MetricCard({ title, value, sub, icon: Icon, color }: any) {
  return (
    <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
      <div className={cn("absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-all duration-500 scale-150", color)}>
        <Icon className="w-24 h-24" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className={cn("p-2 rounded-lg bg-white/5 border border-white/10", color)}>
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{title}</span>
        </div>
        <div className="text-3xl font-display font-bold mb-1">{value}</div>
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <TrendingUp className="w-3 h-3 text-green-400" />
          {sub}
        </div>
      </div>
    </div>
  );
}

export default function Analytics() {
  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans selection:bg-primary/20 relative">
      <div className="noise-overlay" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-pattern opacity-40" />

      <div className="relative z-10 flex h-full w-full">
        <Sidebar />

        <main className="flex-1 flex flex-col h-full overflow-hidden p-6 overflow-y-auto custom-scrollbar">
          <header className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <h1 className="text-3xl font-display font-bold text-gradient">System Analytics</h1>
            <p className="text-muted-foreground mt-1">Real-time performance metrics and usage insights</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
            <MetricCard title="Total Traffic" value="1.2M" sub="+12% vs last week" icon={Globe} color="text-blue-400" />
            <MetricCard title="Active Sessions" value="843" sub="+5% vs last hour" icon={Users} color="text-purple-400" />
            <MetricCard title="Avg Response" value="124ms" sub="-12ms improvement" icon={Zap} color="text-yellow-400" />
            <MetricCard title="Uptime" value="99.99%" sub="System healthy" icon={Activity} color="text-green-400" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-96 mb-8">
            <div className="lg:col-span-2 glass-panel p-6 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                Traffic Volume
              </h3>
              <ResponsiveContainer width="100%" height="85%">
                <AreaChart data={dailyData}>
                  <defs>
                    <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="day" stroke="rgba(255,255,255,0.2)" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.2)" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="messages" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorMessages)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="glass-panel p-6 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
               <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-400" />
                Latency (ms)
              </h3>
              <ResponsiveContainer width="100%" height="85%">
                <BarChart data={latencyData}>
                  <Bar dataKey="value" fill="rgba(52, 211, 153, 0.5)" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
