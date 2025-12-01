import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";

const audienceStats = [
  { metric: "Total Subscribers", value: "24,500", change: "+12%" },
  { metric: "Active Users", value: "18,300", change: "+8%" },
  { metric: "Engagement Rate", value: "6.8%", change: "+2.3%" },
  { metric: "Unsubscribe Rate", value: "0.5%", change: "-0.2%" },
];

export default function AutoDMAudience() {
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
              <h1 className="text-3xl font-bold text-white mb-1">Audience</h1>
              <p className="text-sm text-muted-foreground">Audience demographics and statistics</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {audienceStats.map((stat, idx) => (
                <Card key={idx} className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                  <p className="text-xs text-muted-foreground mb-2">{stat.metric}</p>
                  <div className="flex items-end justify-between">
                    <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                    <span className="text-sm text-green-400">{stat.change}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
