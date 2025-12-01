import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const engagementData = [
  { day: "Mon", users: 1200, interactions: 4500 },
  { day: "Tue", users: 1450, interactions: 5200 },
  { day: "Wed", users: 1680, interactions: 6100 },
  { day: "Thu", users: 1950, interactions: 7200 },
  { day: "Fri", users: 2300, interactions: 8500 },
  { day: "Sat", users: 2100, interactions: 7800 },
  { day: "Sun", users: 1800, interactions: 6500 },
];

export default function VIPUserEngagement() {
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
              <h1 className="text-3xl font-bold text-white mb-1">User Engagement</h1>
              <p className="text-sm text-muted-foreground">Track user activity and interactions</p>
            </div>

            <Card className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
              <h3 className="text-sm font-semibold text-white mb-4">Weekly Activity</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
                  <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)' }} />
                  <Line type="monotone" dataKey="users" stroke="#06b6d4" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="interactions" stroke="#a855f7" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
