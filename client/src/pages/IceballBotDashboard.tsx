import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertCircle, CheckCircle, Zap } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const statsData = [
  { label: "Images Today", value: "342", icon: TrendingUp, color: "text-cyan-400" },
  { label: "This Week", value: "2,145", icon: TrendingUp, color: "text-blue-400" },
  { label: "All Time", value: "45,820", icon: TrendingUp, color: "text-purple-400" },
  { label: "Success Rate", value: "96.8%", icon: CheckCircle, color: "text-green-400" },
];

const apiUsageData = [
  { day: "Mon", calls: 324 },
  { day: "Tue", calls: 412 },
  { day: "Wed", calls: 289 },
  { day: "Thu", calls: 498 },
  { day: "Fri", calls: 567 },
  { day: "Sat", calls: 412 },
  { day: "Sun", calls: 234 },
];

const inputLog = [
  { id: "U001", input: "Image", model: "Gemini V2", timestamp: "14:32" },
  { id: "U002", input: "Image", model: "Gemini V2", timestamp: "14:28" },
  { id: "U003", input: "Image", model: "Gemini V1", timestamp: "14:15" },
];

const outputLog = [
  { id: 1, resolution: "1920x1080", time: "2.3s", status: "Success" },
  { id: 2, resolution: "1280x720", time: "1.8s", status: "Success" },
  { id: 3, resolution: "3840x2160", time: "4.1s", status: "Success" },
];

export default function IceballBotDashboard() {
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
              <h1 className="text-3xl font-bold text-white mb-1">Iceball Bot Dashboard</h1>
              <p className="text-sm text-muted-foreground">Image processing and Gemini API analytics</p>
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

            {/* Gemini API Usage */}
            <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl mb-6">
              <h3 className="text-sm font-semibold text-white mb-4">Gemini API Usage</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Calls Today</p>
                  <p className="text-xl font-bold text-cyan-400">342</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Last 7 Days</p>
                  <p className="text-xl font-bold text-blue-400">2,276</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Est. Cost</p>
                  <p className="text-xl font-bold text-green-400">$12.43</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Rate Limit</p>
                  <p className="text-xl font-bold text-yellow-400">85%</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={apiUsageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
                  <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)' }} />
                  <Line type="monotone" dataKey="calls" stroke="#06b6d4" strokeWidth={2} dot={{ fill: '#06b6d4' }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Input & Output Logs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-sm font-semibold text-white mb-4">Input Log</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-muted-foreground">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 px-2">User ID</th>
                        <th className="text-left py-2 px-2">Input</th>
                        <th className="text-left py-2 px-2">Model</th>
                        <th className="text-left py-2 px-2">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inputLog.map((row) => (
                        <tr key={row.id} className="border-b border-white/5 hover:bg-white/5">
                          <td className="py-2 px-2 text-white">{row.id}</td>
                          <td className="py-2 px-2">{row.input}</td>
                          <td className="py-2 px-2">{row.model}</td>
                          <td className="py-2 px-2">{row.timestamp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-sm font-semibold text-white mb-4">Output Log</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-muted-foreground">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 px-2">Resolution</th>
                        <th className="text-left py-2 px-2">Time</th>
                        <th className="text-left py-2 px-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {outputLog.map((row) => (
                        <tr key={row.id} className="border-b border-white/5 hover:bg-white/5">
                          <td className="py-2 px-2 text-white">{row.resolution}</td>
                          <td className="py-2 px-2">{row.time}</td>
                          <td className="py-2 px-2">
                            <Badge variant="default" className="text-[10px]">{row.status}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                    <span className="text-white font-semibold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Upload Errors</span>
                    <span className="text-red-400 font-semibold">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gemini Errors</span>
                    <span className="text-yellow-400 font-semibold">3</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/10">
                    <span className="text-muted-foreground">Error Rate</span>
                    <span className="text-orange-400 font-semibold">1.2%</span>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  System Performance
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg Processing Time</span>
                    <span className="text-white font-semibold">2.8s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Server Status</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Healthy</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Uptime</span>
                    <span className="text-white font-semibold">49 days</span>
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
