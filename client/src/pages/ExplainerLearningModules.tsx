import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const modules = [
  { id: "M001", title: "Neural Network Architecture", explanation: "Deep learning fundamentals with practical implementations", views: 2450, rating: 4.8 },
  { id: "M002", title: "Computer Vision Basics", explanation: "Image processing and CNN models", views: 1890, rating: 4.6 },
  { id: "M003", title: "Natural Language Processing", explanation: "Text analysis and transformer models", views: 3120, rating: 4.9 },
  { id: "M004", title: "Reinforcement Learning", explanation: "Agent-based learning systems", views: 1540, rating: 4.7 },
  { id: "M005", title: "Time Series Analysis", explanation: "Sequential data and forecasting", views: 892, rating: 4.5 },
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
                <Card key={module.id} className="p-4 border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">{module.title}</h3>
                      <p className="text-xs text-muted-foreground">{module.explanation}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-muted-foreground">{module.views.toLocaleString()} views</span>
                      <span className="text-yellow-400">★ {module.rating}</span>
                    </div>
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
