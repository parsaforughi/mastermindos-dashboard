import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Users, Activity, TrendingUp, MessageSquare, Loader2 } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useAutoDMStats, useAutoDMConversations } from "@/hooks/useAutoDmApi";

export default function AutoDMDashboard() {
  const { data: stats, isLoading: statsLoading } = useAutoDMStats();
  const { data: conversationsData, isLoading: conversationsLoading } = useAutoDMConversations();

  const statsData = [
    { label: "Total Conversations", value: stats?.totalConversations?.toLocaleString() || "0", icon: Send, color: "text-green-400" },
    { label: "Active Conversations", value: stats?.activeConversations?.toLocaleString() || "0", icon: Users, color: "text-blue-400" },
    { label: "Total Messages", value: stats?.totalMessages?.toLocaleString() || "0", icon: MessageSquare, color: "text-cyan-400" },
    { label: "Messages Today", value: stats?.messagesToday?.toLocaleString() || "0", icon: TrendingUp, color: "text-purple-400" },
  ];

const campaignData = [
  { day: "Mon", sent: 245000, delivered: 238000, clicked: 18900 },
  { day: "Tue", sent: 312000, delivered: 302000, clicked: 22800 },
  { day: "Wed", sent: 289000, delivered: 278000, clicked: 21340 },
  { day: "Thu", sent: 405000, delivered: 392000, clicked: 28900 },
  { day: "Fri", sent: 380000, delivered: 365000, clicked: 26100 },
  { day: "Sat", sent: 267000, delivered: 258000, clicked: 19340 },
  { day: "Sun", sent: 198000, delivered: 189000, clicked: 13230 },
];

  // Use conversations as campaigns data
  const conversations = conversationsData?.conversations || [];
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
              <h1 className="text-3xl font-bold text-white mb-1">Auto DM Dashboard</h1>
              <p className="text-sm text-muted-foreground">High-volume direct messaging neural network for campaign scaling</p>
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

            {/* Campaign Analytics & Active Campaigns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-sm font-semibold text-white mb-4">Campaign Performance</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={campaignData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
                    <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)' }} />
                    <Bar dataKey="delivered" fill="#10b981" />
                    <Bar dataKey="clicked" fill="#06b6d4" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-sm font-semibold text-white mb-4">Active Conversations</h3>
                {conversationsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-muted-foreground">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-2 px-2">Username</th>
                          <th className="text-center py-2 px-2">Status</th>
                          <th className="text-right py-2 px-2">Messages</th>
                          <th className="text-right py-2 px-2">Last Activity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {conversations.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="py-4 text-center text-muted-foreground">No conversations available</td>
                          </tr>
                        ) : (
                          conversations.slice(0, 10).map((conv) => (
                            <tr key={conv.id} className="border-b border-white/5 hover:bg-white/5">
                              <td className="py-2 px-2 text-white">{conv.username || conv.id}</td>
                              <td className="py-2 px-2 text-center">
                                <Badge variant={conv.status === 'active' ? "default" : "secondary"} className="text-[10px]">
                                  {conv.status}
                                </Badge>
                              </td>
                              <td className="py-2 px-2 text-right">{conv.messageCount || 0}</td>
                              <td className="py-2 px-2 text-right text-muted-foreground">
                                {new Date(conv.lastMessageAt).toLocaleDateString()}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
