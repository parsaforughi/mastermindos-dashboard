import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useVipRewards } from "@/hooks/useVipApi";

export default function VIPRewards() {
  const { data: rewards = [], isLoading } = useVipRewards();
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
              <h1 className="text-3xl font-bold text-white mb-1">Rewards</h1>
              <p className="text-sm text-muted-foreground">Unlock exclusive rewards</p>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {rewards.length === 0 ? (
                  <Card className="p-8 border-white/10 bg-white/5 backdrop-blur-xl text-center col-span-2">
                    <p className="text-muted-foreground">No rewards available</p>
                  </Card>
                ) : (
                  rewards.map((reward) => (
                    <Card key={reward.id} className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-medium text-white">{reward.title}</h3>
                        <span className="text-xs text-yellow-400 font-semibold">{reward.category}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{reward.description}</p>
                      <p className="text-lg font-bold text-white">{reward.pointsRequired} Points</p>
                    </Card>
                  ))
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
