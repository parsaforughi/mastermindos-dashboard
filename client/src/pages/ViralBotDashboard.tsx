import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const statsData = [
  { label: "Total Searches Today", value: "2,450", icon: TrendingUp, color: "text-green-400" },
  { label: "Searches Last 7 Days", value: "15,820", icon: TrendingUp, color: "text-blue-400" },
  { label: "Total Searches All Time", value: "582,340", icon: TrendingUp, color: "text-purple-400" },
  { label: "Success Rate", value: "94.2%", icon: CheckCircle, color: "text-cyan-400" },
];

const categoriesData = [
  { name: "Entertainment", count: 245 },
  { name: "Politics", count: 189 },
  { name: "Sports", count: 156 },
  { name: "Technology", count: 134 },
  { name: "Other", count: 98 },
];

const languageData = [
  { name: "Persian", value: 45 },
  { name: "English", value: 30 },
  { name: "Arabic", value: 15 },
  { name: "Mixed", value: 10 },
];

const requestsLog = [
  { id: "U001", category: "Entertainment", language: "Persian", minViews: 1000, time: "14:32", resultCount: 12, status: "Success" },
  { id: "U002", category: "Sports", language: "English", minViews: 500, time: "14:28", resultCount: 8, status: "Success" },
  { id: "U003", category: "Politics", language: "Persian", minViews: 2000, time: "14:15", resultCount: 5, status: "Failed" },
  { id: "U004", category: "Technology", language: "Mixed", minViews: 750, time: "14:08", resultCount: 15, status: "Success" },
];

export default function ViralBotDashboard() {
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
              <h1 className="text-3xl font-bold text-white mb-1">Viral Bot Dashboard</h1>
              <p className="text-sm text-muted-foreground">Real-time viral content tracking and analytics</p>
            </div>

            {/* Stats Overview */}
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

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              {/* Popular Categories */}
              <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-sm font-semibold text-white mb-4">Popular Categories</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={categoriesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
                    <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)' }} />
                    <Bar dataKey="count" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              {/* Language Distribution */}
              <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-sm font-semibold text-white mb-4">Language Distribution</h3>
                <div className="space-y-3">
                  {languageData.map((lang) => (
                    <div key={lang.name}>
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>{lang.name}</span>
                        <span>{lang.value}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-secondary" style={{ width: `${lang.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Requests Log */}
            <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl mb-6">
              <h3 className="text-sm font-semibold text-white mb-4">Requests Log</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-muted-foreground">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 px-3">User ID</th>
                      <th className="text-left py-2 px-3">Category</th>
                      <th className="text-left py-2 px-3">Language</th>
                      <th className="text-right py-2 px-3">Min Views</th>
                      <th className="text-left py-2 px-3">Time</th>
                      <th className="text-center py-2 px-3">Results</th>
                      <th className="text-center py-2 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requestsLog.map((row) => (
                      <tr key={row.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="py-2 px-3 text-white">{row.id}</td>
                        <td className="py-2 px-3">{row.category}</td>
                        <td className="py-2 px-3">{row.language}</td>
                        <td className="py-2 px-3 text-right">{row.minViews.toLocaleString()}</td>
                        <td className="py-2 px-3">{row.time}</td>
                        <td className="py-2 px-3 text-center">{row.resultCount}</td>
                        <td className="py-2 px-3 text-center">
                          <Badge variant={row.status === "Success" ? "default" : "destructive"} className="text-[10px]">
                            {row.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Results Summary & API Health */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Results Summary */}
              <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-sm font-semibold text-white mb-4">Results Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg Viral Views</span>
                    <span className="text-white font-semibold">45.2K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Posts Delivered</span>
                    <span className="text-white font-semibold">8,432</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Failed Fetch Count</span>
                    <span className="text-red-400 font-semibold">127</span>
                  </div>
                </div>
              </Card>

              {/* API Health */}
              <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  API Health
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Scraper Status</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Running</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Error Rate</span>
                    <span className="text-white font-semibold">0.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Timeout Count</span>
                    <span className="text-yellow-400 font-semibold">3</span>
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
