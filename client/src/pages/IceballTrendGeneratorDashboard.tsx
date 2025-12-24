import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertCircle, CheckCircle, Zap, Loader2, Image as ImageIcon, Clock, Users, Activity } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useIceballStats, useIceballGenerations, useIceballHealth } from "@/hooks/useIceballApi";
import { formatDistanceToNow } from "date-fns";

export default function IceballTrendGeneratorDashboard() {
  const { data: stats, isLoading: statsLoading } = useIceballStats();
  const { data: generations, isLoading: generationsLoading } = useIceballGenerations(100);
  const { data: health } = useIceballHealth();
  
  const statsData = [
    { 
      label: "Total Generations", 
      value: stats?.totalGenerations?.toLocaleString() || "0", 
      icon: TrendingUp, 
      color: "text-cyan-400" 
    },
    { 
      label: "Successful", 
      value: stats?.successfulGenerations?.toLocaleString() || "0", 
      icon: CheckCircle, 
      color: "text-green-400" 
    },
    { 
      label: "Success Rate", 
      value: stats?.totalGenerations 
        ? `${Math.round((stats.successfulGenerations / stats.totalGenerations) * 100)}%` 
        : "0%", 
      icon: Activity, 
      color: "text-blue-400" 
    },
    { 
      label: "Avg Processing", 
      value: stats?.averageProcessingTime 
        ? `${stats.averageProcessingTime.toFixed(1)}s` 
        : "0s", 
      icon: Zap, 
      color: "text-purple-400" 
    },
  ];

  // Calculate today's generations
  const todayGenerations = stats?.todayGenerations || 0;
  const last24Hours = stats?.last24Hours || 0;

  // Generate daily trend data (last 7 days)
  const dailyTrendData = [
    { day: "Mon", generations: 45 },
    { day: "Tue", generations: 62 },
    { day: "Wed", generations: 38 },
    { day: "Thu", generations: 71 },
    { day: "Fri", generations: 89 },
    { day: "Sat", generations: 56 },
    { day: "Sun", generations: 42 },
  ];

  // Status distribution
  const statusData = [
    { name: "Completed", value: stats?.successfulGenerations || 0, color: "#10b981" },
    { name: "Failed", value: stats?.failedGenerations || 0, color: "#ef4444" },
  ];

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans selection:bg-primary/20 relative">
      <div className="noise-overlay" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-pattern opacity-40" />
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 liquid-blob" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-secondary/10 liquid-blob" style={{ animationDelay: '-5s', animationDuration: '15s' }} />
        <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] rounded-full bg-purple-500/5 liquid-blob" style={{ animationDelay: '-2s', animationDuration: '20s' }} />
      </div>

      <div className="relative z-10 flex h-full w-full">
        <Sidebar />
        <main className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="flex-1 p-6 overflow-y-auto overflow-x-hidden custom-scrollbar">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-1">Iceball Trend Generator</h1>
                  <p className="text-sm text-muted-foreground">Winter portrait generation with NanoBanana API</p>
                </div>
                <div className="flex items-center gap-2">
                  {health?.online ? (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                      Online
                    </Badge>
                  ) : (
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                      <span className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                      Offline
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Overview */}
            {statsLoading ? (
              <div className="flex items-center justify-center py-20 mb-6">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {statsData.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <Card key={stat.label} className="p-4 border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                          <p className="text-2xl font-bold text-white">{stat.value}</p>
                        </div>
                        <Icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Today's Generations</p>
                    <p className="text-2xl font-bold text-cyan-400">{todayGenerations}</p>
                  </div>
                  <Clock className="w-5 h-5 text-cyan-400" />
                </div>
              </Card>
              <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Last 24 Hours</p>
                    <p className="text-2xl font-bold text-blue-400">{last24Hours}</p>
                  </div>
                  <Activity className="w-5 h-5 text-blue-400" />
                </div>
              </Card>
              <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Failed Generations</p>
                    <p className="text-2xl font-bold text-red-400">{stats?.failedGenerations || 0}</p>
                  </div>
                  <AlertCircle className="w-5 h-5 text-red-400" />
                </div>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              {/* Daily Trend */}
              <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-sm font-semibold text-white mb-4">Daily Generation Trend</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={dailyTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
                    <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)' }} />
                    <Line type="monotone" dataKey="generations" stroke="#06b6d4" strokeWidth={2} dot={{ fill: '#06b6d4' }} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              {/* Status Distribution */}
              <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-sm font-semibold text-white mb-4">Status Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)' }} />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Recent Generations */}
            <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
              <h3 className="text-sm font-semibold text-white mb-4">Recent Generations</h3>
              {generationsLoading ? (
                <div className="flex items-center justify-center py-10">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : generations && generations.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-muted-foreground">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 px-2">ID</th>
                        <th className="text-left py-2 px-2">Status</th>
                        <th className="text-left py-2 px-2">Processing Time</th>
                        <th className="text-left py-2 px-2">Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {generations.slice(0, 20).map((gen) => (
                        <tr key={gen.id} className="border-b border-white/5 hover:bg-white/5">
                          <td className="py-2 px-2 text-white font-mono text-[10px]">{gen.id.slice(0, 8)}...</td>
                          <td className="py-2 px-2">
                            <Badge 
                              variant={gen.status === 'completed' ? 'default' : gen.status === 'failed' ? 'destructive' : 'secondary'}
                              className="text-[10px]"
                            >
                              {gen.status}
                            </Badge>
                          </td>
                          <td className="py-2 px-2">
                            {gen.processingTime ? `${gen.processingTime.toFixed(1)}s` : '-'}
                          </td>
                          <td className="py-2 px-2">
                            {gen.createdAt ? formatDistanceToNow(new Date(gen.createdAt), { addSuffix: true }) : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No generations yet</p>
                </div>
              )}
            </Card>

            {/* System Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
              <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${health?.online ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                  System Status
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">API Status</span>
                    <Badge className={health?.online ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}>
                      {health?.online ? "Online" : "Offline"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg Processing Time</span>
                    <span className="text-white font-semibold">
                      {stats?.averageProcessingTime ? `${stats.averageProcessingTime.toFixed(1)}s` : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Success Rate</span>
                    <span className="text-white font-semibold">
                      {stats?.totalGenerations 
                        ? `${Math.round((stats.successfulGenerations / stats.totalGenerations) * 100)}%` 
                        : "0%"}
                    </span>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-sm font-semibold text-white mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <a 
                    href="https://iceball-trend-generator.onrender.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-2 bg-primary/20 hover:bg-primary/30 border border-primary/30 rounded-lg text-sm text-white transition-colors"
                  >
                    Open Generator →
                  </a>
                  <a 
                    href="https://github.com/parsaforughi/iceball-trend-generator" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white transition-colors"
                  >
                    View on GitHub →
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

