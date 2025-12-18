import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { MessageSquare, Users, Loader2, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useStats, useHealth, useConversations, useAnalytics } from "@/hooks/useExplainerApi";

export default function ExplainerAnalytics() {
  const { data: stats, isLoading: statsLoading } = useStats();
  const { data: health, isLoading: healthLoading } = useHealth();
  const { data: conversations, isLoading: convsLoading } = useConversations();
  const { data: analytics, isLoading: analyticsLoading } = useAnalytics();
  
  const isLoading = statsLoading || healthLoading || convsLoading || analyticsLoading;
  
  const learningData = analytics?.learningData || [];
  const engagementData = analytics?.engagementData || [];
  
  const totalMessages = (stats?.totalReceived || 0) + (stats?.totalSent || 0);
  const todayMessages = (stats?.todayReceived || 0) + (stats?.todaySent || 0);
  const responseRate = stats?.totalReceived 
    ? Math.round((stats.totalSent / stats.totalReceived) * 100) 
    : 100;

  const topConversations = conversations?.slice(0, 5) || [];

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans selection:bg-primary/20 relative" data-testid="explainer-analytics-page">
      <div className="noise-overlay" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-pattern opacity-40" />
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 liquid-blob" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-secondary/10 liquid-blob" style={{ animationDelay: '-5s', animationDuration: '15s' }} />
      </div>

      <div className="relative z-10 flex h-full w-full">
        <Sidebar />
        <main className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="flex-1 p-6 overflow-y-auto overflow-x-hidden custom-scrollbar">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">Analytics & Insights</h1>
                <p className="text-sm text-muted-foreground">Message statistics and conversation trends</p>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                  <MessageSquare className="h-4 w-4 text-blue-400" />
                  <span className="text-muted-foreground">Total:</span>
                  <span className="text-white font-mono" data-testid="text-total-messages">{totalMessages}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                  <Users className="h-4 w-4 text-purple-400" />
                  <span className="text-muted-foreground">Convos:</span>
                  <span className="text-white font-mono" data-testid="text-conversations">{health?.conversations || 0}</span>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <ArrowDownLeft className="h-4 w-4 text-blue-400" />
                      <span className="text-xs text-muted-foreground">Received</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{stats?.totalReceived || 0}</p>
                    <p className="text-xs text-muted-foreground">{stats?.todayReceived || 0} today</p>
                  </Card>
                  
                  <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <ArrowUpRight className="h-4 w-4 text-purple-400" />
                      <span className="text-xs text-muted-foreground">Sent</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{stats?.totalSent || 0}</p>
                    <p className="text-xs text-muted-foreground">{stats?.todaySent || 0} today</p>
                  </Card>
                  
                  <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-green-400" />
                      <span className="text-xs text-muted-foreground">Live Clients</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{health?.liveClients || 0}</p>
                    <p className="text-xs text-muted-foreground">connected now</p>
                  </Card>
                  
                  <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="h-4 w-4 text-amber-400" />
                      <span className="text-xs text-muted-foreground">Response Rate</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{responseRate}%</p>
                    <p className="text-xs text-muted-foreground">messages answered</p>
                  </Card>
                </div>
              
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <Card className="p-6 border-white/10 bg-white/5 backdrop-blur-xl" data-testid="chart-learning-activity">
                    <h3 className="text-sm font-semibold text-white mb-6">Weekly Activity Trend</h3>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={learningData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                          <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} tickLine={false} axisLine={false} />
                          <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} tickLine={false} axisLine={false} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: 'rgba(20,20,20,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff' }}
                          />
                          <Line type="monotone" dataKey="sessions" stroke="#a855f7" strokeWidth={3} dot={false} activeDot={{ r: 6 }} name="Sessions" />
                          <Line type="monotone" dataKey="completions" stroke="#06b6d4" strokeWidth={3} dot={false} activeDot={{ r: 6 }} name="Completions" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>

                  <Card className="p-6 border-white/10 bg-white/5 backdrop-blur-xl" data-testid="chart-engagement">
                    <h3 className="text-sm font-semibold text-white mb-6">Daily Engagement Pattern</h3>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={engagementData}>
                          <defs>
                            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                          <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} tickLine={false} axisLine={false} />
                          <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} tickLine={false} axisLine={false} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: 'rgba(20,20,20,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                          />
                          <Area type="monotone" dataKey="users" stroke="#10b981" fillOpacity={1} fill="url(#colorUsers)" strokeWidth={3} name="Active Users" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2 p-6 border-white/10 bg-white/5 backdrop-blur-xl" data-testid="top-conversations">
                    <h3 className="text-sm font-semibold text-white mb-4">Top Conversations</h3>
                    <div className="space-y-4">
                      {topConversations.length === 0 ? (
                        <p className="text-muted-foreground text-sm">No conversations yet</p>
                      ) : (
                        topConversations.map((conv, i) => (
                          <div key={conv.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all group">
                            <div className="flex items-center gap-4">
                              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary font-bold">
                                {i + 1}
                              </div>
                              <div>
                                <p className="text-sm text-white font-medium group-hover:text-primary transition-colors">@{conv.username}</p>
                                <p className="text-xs text-muted-foreground">{conv.inboundCount + conv.outboundCount} total messages</p>
                              </div>
                            </div>
                            <div className="text-right flex items-center gap-6">
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Inbound</p>
                                <p className="text-sm font-bold text-blue-400">{conv.inboundCount}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Outbound</p>
                                <p className="text-sm font-bold text-purple-400">{conv.outboundCount}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </Card>

                  <Card className="p-6 border-white/10 bg-white/5 backdrop-blur-xl" data-testid="summary-stats">
                    <h3 className="text-sm font-semibold text-white mb-6">Summary</h3>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between text-xs text-muted-foreground mb-2">
                          <span>Response Rate</span>
                          <span>{responseRate}%</span>
                        </div>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500" style={{ width: `${responseRate}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-muted-foreground mb-2">
                          <span>Today vs Total</span>
                          <span>{totalMessages > 0 ? Math.round((todayMessages / totalMessages) * 100) : 0}%</span>
                        </div>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500" style={{ width: `${totalMessages > 0 ? Math.round((todayMessages / totalMessages) * 100) : 0}%` }} />
                        </div>
                      </div>
                      
                      <div className="pt-6 border-t border-white/10 mt-6">
                        <p className="text-xs text-center text-muted-foreground">
                          Total Messages: <span className="text-white font-medium">{totalMessages}</span>
                        </p>
                        <p className="text-xs text-center text-muted-foreground mt-1">
                          Active Conversations: <span className="text-white font-medium">{health?.conversations || 0}</span>
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
