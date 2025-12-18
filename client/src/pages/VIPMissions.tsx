import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { useVipMissions, useStartMission } from "@/hooks/useVipApi";

export default function VIPMissions() {
  const { data: missions = [], isLoading } = useVipMissions();
  const startMission = useStartMission();
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
              <h1 className="text-3xl font-bold text-white mb-1">Missions</h1>
              <p className="text-sm text-muted-foreground">Complete missions to earn rewards</p>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {missions.length === 0 ? (
                  <Card className="p-8 border-white/10 bg-white/5 backdrop-blur-xl text-center">
                    <p className="text-muted-foreground">No missions available</p>
                  </Card>
                ) : (
                  missions.map((mission) => (
                    <Card key={mission.id} className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-white">{mission.title}</h3>
                        <Badge variant={mission.status === 'completed' ? 'default' : mission.status === 'active' ? 'secondary' : 'outline'} className="text-[10px]">
                          {mission.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-[10px]">{mission.type}</Badge>
                        </div>
                        <p className="text-sm font-semibold text-yellow-400">+{mission.points} XP</p>
                      </div>
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
