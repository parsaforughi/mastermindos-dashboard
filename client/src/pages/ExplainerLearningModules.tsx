import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const modules = [
  { id: "M001", title: "Data Structures Fundamentals", status: "completed", progress: 100 },
  { id: "M002", title: "Algorithm Optimization", status: "in-progress", progress: 65 },
  { id: "M003", title: "Web Development Basics", status: "in-progress", progress: 42 },
  { id: "M004", title: "Advanced Concepts", status: "upcoming", progress: 0 },
];

export default function ExplainerLearningModules() {
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
              <h1 className="text-3xl font-bold text-white mb-1">Learning Modules</h1>
              <p className="text-sm text-muted-foreground">Your educational content modules</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {modules.map((module) => (
                <Card key={module.id} className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-white">{module.title}</h3>
                    <Badge variant={module.status === 'completed' ? 'default' : module.status === 'in-progress' ? 'secondary' : 'outline'} className="text-[10px]">
                      {module.status}
                    </Badge>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${module.progress}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{module.progress}% Complete</p>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
