import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Trophy, Zap, TrendingUp, Loader2 } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useVipDashboard, useVipMissions, useVipStats } from "@/hooks/useVipApi";

export default function VIPPassportDashboard() {
  const { data: dashboard, isLoading: dashboardLoading } = useVipDashboard();
  const { data: missions = [], isLoading: missionsLoading } = useVipMissions();
  const { data: stats, isLoading: statsLoading } = useVipStats();

  const statsData = [
    { label: "Active VIP Users", value: stats?.activeUsers?.toLocaleString() || "0", icon: Users, color: "text-cyan-400" },
    { label: "Missions Completed", value: stats?.missionsCompleted?.toLocaleString() || "0", icon: Trophy, color: "text-yellow-400" },
    { label: "Total Points", value: stats?.totalPoints?.toLocaleString() || "0", icon: Zap, color: "text-purple-400" },
    { label: "Rewards Distributed", value: stats?.rewardsRedeemed?.toLocaleString() || "0", icon: TrendingUp, color: "text-green-400" },
  ];

  // Chart data - can be enhanced with real analytics endpoint if available
  const notificationData = [
    { day: "Mon", sent: 450, views: 380, clicks: 145 },
    { day: "Tue", sent: 520, views: 420, clicks: 168 },
    { day: "Wed", sent: 480, views: 390, clicks: 152 },
    { day: "Thu", sent: 610, views: 510, clicks: 198 },
    { day: "Fri", sent: 580, views: 470, clicks: 185 },
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
              <h1 className="text-3xl font-bold text-white mb-1">VIP Passport Dashboard</h1>
              <p className="text-sm text-muted-foreground">Missions, rewards, and user engagement analytics</p>
            </div>

            {/* Main Stats */}
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

            {/* Missions Overview */}
            <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl mb-6">
              <h3 className="text-sm font-semibold text-white mb-4">Missions Overview</h3>
              {missionsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-muted-foreground">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 px-3">Mission</th>
                        <th className="text-center py-2 px-3">Status</th>
                        <th className="text-center py-2 px-3">Points</th>
                        <th className="text-center py-2 px-3">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {missions.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="py-4 text-center text-muted-foreground">No missions available</td>
                        </tr>
                      ) : (
                        missions.map((mission) => (
                          <tr key={mission.id} className="border-b border-white/5 hover:bg-white/5">
                            <td className="py-2 px-3 text-white">{mission.title}</td>
                            <td className="py-2 px-3 text-center">
                              <Badge variant={mission.status === "active" ? "default" : "secondary"} className="text-[10px]">
                                {mission.status}
                              </Badge>
                            </td>
                            <td className="py-2 px-3 text-center">{mission.points}</td>
                            <td className="py-2 px-3 text-center">{mission.type}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>

            {/* Notification Analytics & VIP Users */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-sm font-semibold text-white mb-4">Notification Analytics</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={notificationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
                    <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)' }} />
                    <Line type="monotone" dataKey="views" stroke="#06b6d4" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="clicks" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-sm font-semibold text-white mb-4">VIP User Activity</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-muted-foreground">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 px-2">User ID</th>
                        <th className="text-center py-2 px-2">Points</th>
                        <th className="text-center py-2 px-2">Missions</th>
                        <th className="text-center py-2 px-2">Stamps</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboard?.user ? (
                        <tr className="border-b border-white/5 hover:bg-white/5">
                          <td className="py-2 px-2 text-white">{dashboard.user.username || dashboard.user.telegramId}</td>
                          <td className="py-2 px-2 text-center text-yellow-400 font-semibold">{dashboard.user.points}</td>
                          <td className="py-2 px-2 text-center">{dashboard.missions?.length || 0}</td>
                          <td className="py-2 px-2 text-center">{dashboard.user.level}</td>
                        </tr>
                      ) : (
                        <tr>
                          <td colSpan={4} className="py-4 text-center text-muted-foreground">No user data available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            {/* System Health */}
            <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                System Health
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Database</p>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-[10px]">Healthy</Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">API State</p>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-[10px]">Running</Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Error Logs</p>
                  <p className="text-white font-semibold">2</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Avg Response</p>
                  <p className="text-white font-semibold">48ms</p>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
