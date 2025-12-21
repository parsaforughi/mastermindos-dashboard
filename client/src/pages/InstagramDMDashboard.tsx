import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Users, Activity, TrendingUp, MessageSquare, Loader2, Play, Pause, Square } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useInstagramDMStats, useInstagramDMCampaigns } from "@/hooks/useInstagramDmApi";
import { Link } from "wouter";

export default function InstagramDMDashboard() {
  const { data: stats, isLoading: statsLoading } = useInstagramDMStats();
  const { data: campaigns, isLoading: campaignsLoading } = useInstagramDMCampaigns();

  const statsData = [
    { 
      label: "Total Campaigns", 
      value: stats?.campaigns?.total?.toLocaleString() || "0", 
      icon: Send, 
      color: "text-green-400" 
    },
    { 
      label: "Active Campaigns", 
      value: stats?.campaigns?.active?.toLocaleString() || "0", 
      icon: Play, 
      color: "text-blue-400" 
    },
    { 
      label: "Total Sent", 
      value: stats?.metrics?.totalSent?.toLocaleString() || "0", 
      icon: MessageSquare, 
      color: "text-cyan-400" 
    },
    { 
      label: "Success Rate", 
      value: `${stats?.metrics?.successRate || "0"}%`, 
      icon: TrendingUp, 
      color: "text-purple-400" 
    },
  ];

  const campaignData = campaigns?.slice(0, 7).map((campaign, index) => ({
    name: campaign.name.substring(0, 10),
    sent: campaign.sentRows,
    failed: campaign.failedRows,
  })) || [];

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
              <h1 className="text-3xl font-bold text-white mb-1">Instagram DM Bot</h1>
              <p className="text-sm text-muted-foreground">Bulk DM campaigns with Google Sheets integration</p>
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
                {campaignData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={campaignData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
                      <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
                      <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)' }} />
                      <Bar dataKey="sent" fill="#10b981" name="Sent" />
                      <Bar dataKey="failed" fill="#ef4444" name="Failed" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-[250px] text-muted-foreground">
                    No campaign data available
                  </div>
                )}
              </Card>

              <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-sm font-semibold text-white mb-4">Active Campaigns</h3>
                {campaignsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-muted-foreground">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-2 px-2">Campaign</th>
                          <th className="text-center py-2 px-2">Status</th>
                          <th className="text-right py-2 px-2">Sent</th>
                          <th className="text-right py-2 px-2">Failed</th>
                        </tr>
                      </thead>
                      <tbody>
                        {campaigns && campaigns.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="py-4 text-center text-muted-foreground">No campaigns available</td>
                          </tr>
                        ) : (
                          campaigns?.slice(0, 10).map((campaign) => (
                            <tr key={campaign.id} className="border-b border-white/5 hover:bg-white/5">
                              <td className="py-2 px-2 text-white">
                                <Link href={`/dashboard/instagram-dm/campaigns`} className="hover:underline">
                                  {campaign.name}
                                </Link>
                              </td>
                              <td className="py-2 px-2 text-center">
                                <Badge 
                                  variant={
                                    campaign.status === 'active' ? "default" : 
                                    campaign.status === 'paused' ? "secondary" : 
                                    "outline"
                                  } 
                                  className="text-[10px]"
                                >
                                  {campaign.status}
                                </Badge>
                              </td>
                              <td className="py-2 px-2 text-right text-green-400">{campaign.sentRows}</td>
                              <td className="py-2 px-2 text-right text-red-400">{campaign.failedRows}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </Card>
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-muted-foreground">Total Accounts</p>
                  <Users className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-2xl font-bold text-white">{stats?.accounts?.total || 0}</p>
                <p className="text-xs text-muted-foreground mt-1">{stats?.accounts?.active || 0} active</p>
              </Card>

              <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-muted-foreground">Total Failed</p>
                  <Activity className="w-4 h-4 text-red-400" />
                </div>
                <p className="text-2xl font-bold text-white">{stats?.metrics?.totalFailed || 0}</p>
                <p className="text-xs text-muted-foreground mt-1">Failed DMs</p>
              </Card>

              <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-muted-foreground">Blocked</p>
                  <Square className="w-4 h-4 text-orange-400" />
                </div>
                <p className="text-2xl font-bold text-white">{stats?.metrics?.totalBlocked || 0}</p>
                <p className="text-xs text-muted-foreground mt-1">Blocked accounts</p>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}







