import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertCircle, CheckCircle, Zap, Loader2, Image as ImageIcon, Sparkles, Upload, Download, Users, BarChart3, Smartphone, Monitor, Tablet, Shield, Settings, Power, Clock } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { useCollaminStats, useCollaminHealth, useCollaminAnalytics } from "@/hooks/useCollaminApi";

export default function CollaminShelftalkerDashboard() {
  const { data: stats, isLoading: statsLoading } = useCollaminStats();
  const { data: health } = useCollaminHealth();
  const { data: analytics, isLoading: analyticsLoading } = useCollaminAnalytics();
  
  const isLoading = statsLoading || analyticsLoading;
  
  // 1) OVERVIEW KPI Cards
  const overviewKPIs = [
    { 
      label: "Total Uploads", 
      value: analytics?.overview?.totalUploads?.toLocaleString() || "0", 
      icon: Upload, 
      color: "text-teal-400" 
    },
    { 
      label: "Total Generations", 
      value: analytics?.overview?.totalGenerations?.toLocaleString() || "0", 
      icon: TrendingUp, 
      color: "text-cyan-400" 
    },
    { 
      label: "Story Downloads", 
      value: analytics?.overview?.storyDownloads?.toLocaleString() || "0", 
      icon: Download, 
      color: "text-emerald-400" 
    },
    { 
      label: "Conversion Rate", 
      value: analytics?.overview?.conversionRate ? `${analytics.overview.conversionRate.toFixed(1)}%` : "0%", 
      icon: BarChart3, 
      color: "text-blue-400" 
    },
    { 
      label: "Avg Time on Page", 
      value: analytics?.overview?.avgTimeOnPage ? `${analytics.overview.avgTimeOnPage.toFixed(0)}s` : "0s", 
      icon: Clock, 
      color: "text-purple-400" 
    },
    { 
      label: "Regeneration Rate", 
      value: analytics?.overview?.regenerationRate ? `${analytics.overview.regenerationRate.toFixed(1)}%` : "0%", 
      icon: Zap, 
      color: "text-yellow-400" 
    },
  ];

  // Device colors for pie chart
  const DEVICE_COLORS = {
    ios: "#10b981",
    android: "#3b82f6",
    desktop: "#8b5cf6",
  };

  // Download type colors
  const DOWNLOAD_COLORS = {
    withoutCollamin: "#06b6d4",
    withCollamin: "#8b5cf6",
    storyComparison: "#10b981",
  };

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
              <h1 className="text-3xl font-bold text-white mb-1">Collamin ShelfTalker Campaign</h1>
              <p className="text-sm text-muted-foreground">Medical-grade analytics for "20 Years Later" campaign</p>
            </div>

            {/* 1) OVERVIEW - KPI Cards */}
            {isLoading ? (
              <div className="flex items-center justify-center py-20 mb-6">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
                  {overviewKPIs.map((kpi) => {
                    const Icon = kpi.icon;
                    return (
                      <Card key={kpi.label} className="p-4 border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-xs text-muted-foreground mb-1">{kpi.label}</p>
                            <p className="text-2xl font-bold text-white">{kpi.value}</p>
                          </div>
                          <Icon className={`w-5 h-5 ${kpi.color} flex-shrink-0 ml-2`} />
                        </div>
                      </Card>
                    );
                  })}
                </div>

                {/* 2) AI GENERATION ANALYTICS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                  <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                    <h3 className="text-sm font-semibold text-white mb-4">AI Generation Quality</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">With Collamin</p>
                          <p className="text-xl font-bold text-emerald-400">{analytics?.aiGeneration?.withCollamin || 0}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Without Collamin</p>
                          <p className="text-xl font-bold text-cyan-400">{analytics?.aiGeneration?.withoutCollamin || 0}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Avg Generation Time</p>
                        <p className="text-lg font-semibold text-white">{analytics?.aiGeneration?.avgGenerationTime?.toFixed(1) || 0}s</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/10">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Success Rate</p>
                          <p className="text-lg font-semibold text-green-400">{analytics?.aiGeneration?.successRate || 0}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Failure Rate</p>
                          <p className="text-lg font-semibold text-red-400">{analytics?.aiGeneration?.failureRate || 0}%</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">Rejected Outputs</p>
                        <p className="text-lg font-semibold text-orange-400">{analytics?.aiGeneration?.rejectedOutputs || 0}</p>
                        <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                          <div className="flex justify-between">
                            <span>Pose Mismatch:</span>
                            <span className="text-white">{analytics?.aiGeneration?.rejectionReasons?.poseMismatch || 0}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Lighting Mismatch:</span>
                            <span className="text-white">{analytics?.aiGeneration?.rejectionReasons?.lightingMismatch || 0}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Artifacts:</span>
                            <span className="text-white">{analytics?.aiGeneration?.rejectionReasons?.artifacts || 0}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                    <h3 className="text-sm font-semibold text-white mb-4">Generation Performance</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={[
                        { name: "Success", value: analytics?.aiGeneration?.successRate || 0, fill: "#10b981" },
                        { name: "Failed", value: analytics?.aiGeneration?.failureRate || 0, fill: "#ef4444" },
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
                        <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)' }} />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>
                </div>

                {/* 3) USER BEHAVIOR */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                  <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                    <h3 className="text-sm font-semibold text-white mb-4">User Funnel</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Visitors</span>
                        <span className="text-white font-semibold text-lg">{analytics?.userBehavior?.funnel?.visitors || 0}</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-400" style={{ width: '100%' }} />
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-muted-foreground">Uploads</span>
                        <span className="text-white font-semibold text-lg">{analytics?.userBehavior?.funnel?.uploads || 0}</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-400" 
                          style={{ width: `${analytics?.userBehavior?.funnel?.visitors ? (analytics.userBehavior.funnel.uploads / analytics.userBehavior.funnel.visitors * 100) : 0}%` }} 
                        />
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-muted-foreground">Downloads</span>
                        <span className="text-white font-semibold text-lg">{analytics?.userBehavior?.funnel?.downloads || 0}</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-400" 
                          style={{ width: `${analytics?.userBehavior?.funnel?.uploads ? (analytics.userBehavior.funnel.downloads / analytics.userBehavior.funnel.uploads * 100) : 0}%` }} 
                        />
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                    <h3 className="text-sm font-semibold text-white mb-4">Download Breakdown</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-muted-foreground">Individual Images</span>
                          <span className="text-white font-semibold">{analytics?.userBehavior?.downloadBreakdown?.individual || 0}</span>
                        </div>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-cyan-400" 
                            style={{ width: `${analytics?.userBehavior?.funnel?.downloads ? (analytics.userBehavior.downloadBreakdown.individual / analytics.userBehavior.funnel.downloads * 100) : 0}%` }} 
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-muted-foreground">Story-Ready Images</span>
                          <span className="text-white font-semibold">{analytics?.userBehavior?.downloadBreakdown?.story || 0}</span>
                        </div>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-400" 
                            style={{ width: `${analytics?.userBehavior?.funnel?.downloads ? (analytics.userBehavior.downloadBreakdown.story / analytics.userBehavior.funnel.downloads * 100) : 0}%` }} 
                          />
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                    <h3 className="text-sm font-semibold text-white mb-4">Device Breakdown</h3>
                    <ResponsiveContainer width="100%" height={180}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: "iOS", value: analytics?.userBehavior?.deviceBreakdown?.ios || 0 },
                            { name: "Android", value: analytics?.userBehavior?.deviceBreakdown?.android || 0 },
                            { name: "Desktop", value: analytics?.userBehavior?.deviceBreakdown?.desktop || 0 },
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={(entry) => `${entry.name}: ${entry.value}`}
                          outerRadius={60}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          <Cell fill={DEVICE_COLORS.ios} />
                          <Cell fill={DEVICE_COLORS.android} />
                          <Cell fill={DEVICE_COLORS.desktop} />
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </Card>
                </div>

                {/* 4) STORY PERFORMANCE */}
                <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl mb-6">
                  <h3 className="text-sm font-semibold text-white mb-4">Story Performance (Proxy Metrics)</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Story-Ready Image Downloads</p>
                      <p className="text-3xl font-bold text-emerald-400">{analytics?.storyPerformance?.storyDownloads || 0}</p>
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={analytics?.storyPerformance?.dailyTrend || []}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '10px' }} />
                          <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '10px' }} />
                          <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)' }} />
                          <Line type="monotone" dataKey="storyDownloads" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 3 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Peak Download Hours (Last 24h)</p>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={analytics?.storyPerformance?.hourlyTrend || []}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis dataKey="hour" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '10px' }} />
                          <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '10px' }} />
                          <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)' }} />
                          <Bar dataKey="downloads" fill="#10b981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </Card>

                {/* 5) BRAND SAFETY & QUALITY */}
                <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl mb-6">
                  <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Brand Safety & Quality Control
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Rejected Generations</p>
                      <p className="text-2xl font-bold text-orange-400">{analytics?.aiGeneration?.rejectedOutputs || 0}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {analytics?.overview?.totalGenerations 
                          ? `${((analytics.aiGeneration?.rejectedOutputs || 0) / analytics.overview.totalGenerations * 100).toFixed(1)}% of total`
                          : "0% of total"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Quality Score</p>
                      <p className="text-2xl font-bold text-emerald-400">
                        {analytics?.overview?.totalGenerations && analytics?.aiGeneration?.rejectedOutputs
                          ? (100 - ((analytics.aiGeneration.rejectedOutputs / analytics.overview.totalGenerations) * 100)).toFixed(1)
                          : "100.0"}%
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Acceptance rate</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Manual Review Queue</p>
                      <p className="text-2xl font-bold text-yellow-400">0</p>
                      <p className="text-xs text-muted-foreground mt-1">Pending reviews</p>
                    </div>
                  </div>
                </Card>

                {/* 6) ADMIN CONTROLS (Read-only for now) */}
                <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl mb-6">
                  <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Campaign Controls
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                      <div>
                        <p className="text-xs text-muted-foreground">Campaign Status</p>
                        <p className="text-sm font-semibold text-white">Active</p>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <Power className="w-3 h-3 mr-1" />
                        ON
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                      <div>
                        <p className="text-xs text-muted-foreground">Daily Generation Limit</p>
                        <p className="text-sm font-semibold text-white">Unlimited</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                      <div>
                        <p className="text-xs text-muted-foreground">Story Output</p>
                        <p className="text-sm font-semibold text-white">Enabled</p>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">ON</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                      <div>
                        <p className="text-xs text-muted-foreground">Prompt Version</p>
                        <p className="text-sm font-semibold text-white">v2.1.0</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

