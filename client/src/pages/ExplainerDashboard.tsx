import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, BookOpen, MessageSquare, BarChart3, Users } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const statsData = [
  { label: "Active Students", value: "1,245", icon: Users, color: "text-purple-400" },
  { label: "Learning Modules", value: "48", icon: BookOpen, color: "text-pink-400" },
  { label: "Q&A Sessions", value: "3,820", icon: MessageSquare, color: "text-cyan-400" },
  { label: "Comprehension Rate", value: "92.3%", icon: Brain, color: "text-green-400" },
];

const learningData = [
  { day: "Mon", sessions: 145, completions: 134 },
  { day: "Tue", sessions: 189, completions: 172 },
  { day: "Wed", sessions: 167, completions: 152 },
  { day: "Thu", sessions: 203, completions: 195 },
  { day: "Fri", sessions: 234, completions: 218 },
  { day: "Sat", sessions: 167, completions: 145 },
  { day: "Sun", sessions: 123, completions: 108 },
];

const modulesData = [
  { name: "Mathematics", students: 845, completion: "87%", rating: "4.8" },
  { name: "Physics", students: 623, completion: "79%", rating: "4.6" },
  { name: "Chemistry", students: 512, completion: "84%", rating: "4.7" },
  { name: "Biology", students: 734, completion: "91%", rating: "4.9" },
];

export default function ExplainerDashboard() {
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
              <h1 className="text-3xl font-bold text-white mb-1">Explainer Dashboard</h1>
              <p className="text-sm text-muted-foreground">Adaptive learning assistant with multi-modal explanation capabilities</p>
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

            {/* Learning Analytics & Modules */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-sm font-semibold text-white mb-4">Learning Activity</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={learningData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
                    <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)' }} />
                    <Line type="monotone" dataKey="sessions" stroke="#a855f7" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="completions" stroke="#06b6d4" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-sm font-semibold text-white mb-4">Top Learning Modules</h3>
                <div className="space-y-3">
                  {modulesData.map((module) => (
                    <div key={module.name} className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                      <div>
                        <p className="text-sm text-white font-medium">{module.name}</p>
                        <p className="text-xs text-muted-foreground">{module.students} students</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-green-400">{module.completion}</p>
                        <p className="text-xs text-yellow-400">★ {module.rating}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
