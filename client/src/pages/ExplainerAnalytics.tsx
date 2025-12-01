import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { Brain, BookOpen, MessageSquare, Users } from "lucide-react";

const learningData = [
  { day: "Mon", sessions: 145, completions: 134 },
  { day: "Tue", sessions: 189, completions: 172 },
  { day: "Wed", sessions: 167, completions: 152 },
  { day: "Thu", sessions: 203, completions: 195 },
  { day: "Fri", sessions: 234, completions: 218 },
  { day: "Sat", sessions: 167, completions: 145 },
  { day: "Sun", sessions: 123, completions: 108 },
];

const engagementData = [
  { time: "00:00", users: 120 },
  { time: "04:00", users: 80 },
  { time: "08:00", users: 450 },
  { time: "12:00", users: 980 },
  { time: "16:00", users: 850 },
  { time: "20:00", users: 340 },
  { time: "23:59", users: 190 },
];

const modulesData = [
  { name: "Mathematics", students: 845, completion: "87%", rating: "4.8" },
  { name: "Physics", students: 623, completion: "79%", rating: "4.6" },
  { name: "Chemistry", students: 512, completion: "84%", rating: "4.7" },
  { name: "Biology", students: 734, completion: "91%", rating: "4.9" },
];

export default function ExplainerAnalytics() {
  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans selection:bg-primary/20 relative">
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
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-white mb-1">Analytics & Insights</h1>
              <p className="text-sm text-muted-foreground">Detailed performance metrics and learning trends</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card className="p-6 border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-sm font-semibold text-white mb-6">Learning Activity Trend</h3>
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
                      <Line type="monotone" dataKey="sessions" stroke="#a855f7" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="completions" stroke="#06b6d4" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-6 border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-sm font-semibold text-white mb-6">Real-time Engagement</h3>
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
                      <Area type="monotone" dataKey="users" stroke="#10b981" fillOpacity={1} fill="url(#colorUsers)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 p-6 border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-sm font-semibold text-white mb-4">Module Performance</h3>
                <div className="space-y-4">
                  {modulesData.map((module, i) => (
                    <div key={module.name} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary font-bold">
                          {i + 1}
                        </div>
                        <div>
                          <p className="text-sm text-white font-medium group-hover:text-primary transition-colors">{module.name}</p>
                          <p className="text-xs text-muted-foreground">{module.students.toLocaleString()} active students</p>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-6">
                        <div>
                           <p className="text-xs text-muted-foreground mb-1">Completion</p>
                           <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                             <div className="h-full bg-blue-500" style={{ width: module.completion }} />
                           </div>
                        </div>
                        <div>
                           <p className="text-xs text-muted-foreground mb-1">Rating</p>
                           <p className="text-sm font-bold text-yellow-400">★ {module.rating}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-sm font-semibold text-white mb-6">Audience Demographics</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-2">
                      <span>Students</span>
                      <span>65%</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 w-[65%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-2">
                      <span>Professionals</span>
                      <span>25%</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-pink-500 w-[25%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-2">
                      <span>Researchers</span>
                      <span>10%</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500 w-[10%]" />
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-white/10 mt-6">
                    <p className="text-xs text-center text-muted-foreground">
                      Most active region: <span className="text-white font-medium">North America</span>
                    </p>
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
