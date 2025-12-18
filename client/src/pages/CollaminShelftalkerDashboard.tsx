import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertCircle, CheckCircle, Zap, Loader2, Image as ImageIcon, Sparkles } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useCollaminStats, useCollaminHealth } from "@/hooks/useCollaminApi";

export default function CollaminShelftalkerDashboard() {
  const { data: stats, isLoading } = useCollaminStats();
  const { data: health } = useCollaminHealth();
  
  const statsData = [
    { label: "Total Generations", value: stats?.totalGenerations?.toLocaleString() || "0", icon: TrendingUp, color: "text-cyan-400" },
    { label: "Successful", value: stats?.successfulGenerations?.toLocaleString() || "0", icon: CheckCircle, color: "text-green-400" },
    { label: "Success Rate", value: stats?.totalGenerations ? `${Math.round((stats.successfulGenerations / stats.totalGenerations) * 100)}%` : "0%", icon: Zap, color: "text-blue-400" },
    { label: "Story Images", value: stats?.storyImagesGenerated?.toLocaleString() || "0", icon: ImageIcon, color: "text-purple-400" },
  ];

  // Generate mock API usage data (can be replaced with real endpoint if available)
  const apiUsageData = [
    { day: "Mon", calls: 245, storyImages: 189 },
    { day: "Tue", calls: 312, storyImages: 267 },
    { day: "Wed", calls: 278, storyImages: 234 },
    { day: "Thu", calls: 389, storyImages: 345 },
    { day: "Fri", calls: 421, storyImages: 378 },
    { day: "Sat", calls: 356, storyImages: 298 },
    { day: "Sun", calls: 289, storyImages: 245 },
  ];

  const successRate = stats?.totalGenerations 
    ? Math.round((stats.successfulGenerations / stats.totalGenerations) * 100) 
    : 0;
  const failureRate = stats?.totalGenerations 
    ? Math.round((stats.failedGenerations / stats.totalGenerations) * 100) 
    : 0;

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
              <h1 className="text-3xl font-bold text-white mb-1">Collamin Shelftalker Dashboard</h1>
              <p className="text-sm text-muted-foreground">20-year aging simulation and story image generation analytics</p>
            </div>

            {/* Stats Overview */}
            {isLoading ? (
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

            {/* Gemini API Usage */}
            <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl mb-6">
              <h3 className="text-sm font-semibold text-white mb-4">Gemini API Usage</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Calls Today</p>
                  <p className="text-xl font-bold text-cyan-400">421</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Last 7 Days</p>
                  <p className="text-xl font-bold text-blue-400">2,290</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Est. Cost</p>
                  <p className="text-xl font-bold text-green-400">$8.76</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Rate Limit</p>
                  <p className="text-xl font-bold text-yellow-400">78%</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={apiUsageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
                  <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)' }} />
                  <Line type="monotone" dataKey="calls" stroke="#06b6d4" strokeWidth={2} dot={{ fill: '#06b6d4' }} name="API Calls" />
                  <Line type="monotone" dataKey="storyImages" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6' }} name="Story Images" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Generation Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-sm font-semibold text-white mb-4">Generation Breakdown</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={[
                    { name: "Success", value: stats?.successfulGenerations || 0, fill: "#10b981" },
                    { name: "Failed", value: stats?.failedGenerations || 0, fill: "#ef4444" },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
                    <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)' }} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-sm font-semibold text-white mb-4">Performance Metrics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Avg Processing Time</span>
                      <span className="text-sm font-semibold text-white">
                        {stats?.averageProcessingTime ? `${stats.averageProcessingTime.toFixed(1)}s` : "0s"}
                      </span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-2">
                      <div 
                        className="bg-cyan-400 h-2 rounded-full" 
                        style={{ width: `${Math.min((stats?.averageProcessingTime || 0) / 10 * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Success Rate</span>
                      <span className="text-sm font-semibold text-green-400">{successRate}%</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-2">
                      <div 
                        className="bg-green-400 h-2 rounded-full" 
                        style={{ width: `${successRate}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Failure Rate</span>
                      <span className="text-sm font-semibold text-red-400">{failureRate}%</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-2">
                      <div 
                        className="bg-red-400 h-2 rounded-full" 
                        style={{ width: `${failureRate}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Error Monitor & System Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-sm font-semibold text-white mb-4">Error Monitor</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Processing Fails</span>
                    <span className="text-white font-semibold">{stats?.failedGenerations || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Upload Errors</span>
                    <span className="text-red-400 font-semibold">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gemini API Errors</span>
                    <span className="text-yellow-400 font-semibold">0</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/10">
                    <span className="text-muted-foreground">Error Rate</span>
                    <span className="text-orange-400 font-semibold">{failureRate}%</span>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${health?.status === 'ok' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                  System Performance
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg Processing Time</span>
                    <span className="text-white font-semibold">
                      {stats?.averageProcessingTime ? `${stats.averageProcessingTime.toFixed(1)}s` : "0s"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Server Status</span>
                    <Badge className={`${health?.status === 'ok' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                      {health?.status === 'ok' ? 'Healthy' : 'Unknown'}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service</span>
                    <span className="text-white font-semibold">{health?.service || 'collamin-shelftalker'}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

