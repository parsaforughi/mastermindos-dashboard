import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Trophy, Zap, TrendingUp } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const statsData = [
  { label: "Active VIP Users", value: "2,847", icon: Users, color: "text-cyan-400" },
  { label: "Missions Completed", value: "12,405", icon: Trophy, color: "text-yellow-400" },
  { label: "Stamps Count", value: "34,821", icon: Zap, color: "text-purple-400" },
  { label: "Rewards Distributed", value: "$48,203", icon: TrendingUp, color: "text-green-400" },
];

const missionsData = [
  { name: "Daily Quest", active: true, completed: 1245, rate: "87%", avgTime: "2.3h", reward: "$5" },
  { name: "Weekly Challenge", active: true, completed: 823, rate: "72%", avgTime: "8.5h", reward: "$15" },
  { name: "Monthly Event", active: true, completed: 342, rate: "56%", avgTime: "24h", reward: "$50" },
  { name: "Seasonal Pass", active: false, completed: 127, rate: "42%", avgTime: "72h", reward: "$100" },
];

const vipUsers = [
  { id: "U001", points: 4520, missions: 12, stamps: 48, lastActivity: "2m ago" },
  { id: "U002", points: 3840, missions: 8, stamps: 32, lastActivity: "15m ago" },
  { id: "U003", points: 5120, missions: 15, stamps: 56, lastActivity: "1h ago" },
  { id: "U004", points: 2980, missions: 6, stamps: 24, lastActivity: "3h ago" },
];

const notificationData = [
  { day: "Mon", sent: 450, views: 380, clicks: 145 },
  { day: "Tue", sent: 520, views: 420, clicks: 168 },
  { day: "Wed", sent: 480, views: 390, clicks: 152 },
  { day: "Thu", sent: 610, views: 510, clicks: 198 },
  { day: "Fri", sent: 580, views: 470, clicks: 185 },
];

export default function VIPPassportDashboard() {
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
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-muted-foreground">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 px-3">Mission</th>
                      <th className="text-center py-2 px-3">Active</th>
                      <th className="text-center py-2 px-3">Completed</th>
                      <th className="text-center py-2 px-3">Rate</th>
                      <th className="text-center py-2 px-3">Avg Time</th>
                      <th className="text-right py-2 px-3">Reward</th>
                    </tr>
                  </thead>
                  <tbody>
                    {missionsData.map((mission) => (
                      <tr key={mission.name} className="border-b border-white/5 hover:bg-white/5">
                        <td className="py-2 px-3 text-white">{mission.name}</td>
                        <td className="py-2 px-3 text-center">
                          <Badge variant={mission.active ? "default" : "secondary"} className="text-[10px]">
                            {mission.active ? "Active" : "Inactive"}
                          </Badge>
                        </td>
                        <td className="py-2 px-3 text-center">{mission.completed.toLocaleString()}</td>
                        <td className="py-2 px-3 text-center text-green-400">{mission.rate}</td>
                        <td className="py-2 px-3 text-center">{mission.avgTime}</td>
                        <td className="py-2 px-3 text-right font-semibold text-white">{mission.reward}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
                      {vipUsers.map((user) => (
                        <tr key={user.id} className="border-b border-white/5 hover:bg-white/5">
                          <td className="py-2 px-2 text-white">{user.id}</td>
                          <td className="py-2 px-2 text-center text-yellow-400 font-semibold">{user.points}</td>
                          <td className="py-2 px-2 text-center">{user.missions}</td>
                          <td className="py-2 px-2 text-center">{user.stamps}</td>
                        </tr>
                      ))}
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
