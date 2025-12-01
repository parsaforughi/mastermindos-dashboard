import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database } from "lucide-react";

const knowledgeBase = [
  { id: "KB001", title: "Loss Functions Reference", author: "ML Team", lastUpdated: "2 hours ago", access: "Public" },
  { id: "KB002", title: "GPU Optimization Techniques", author: "Systems", lastUpdated: "1 day ago", access: "Public" },
  { id: "KB003", title: "Model Architecture Blueprints", author: "Research", lastUpdated: "3 days ago", access: "Team Only" },
  { id: "KB004", title: "Hyperparameter Tuning Guide", author: "Experts", lastUpdated: "1 week ago", access: "Public" },
  { id: "KB005", title: "Dataset Preprocessing Standards", author: "Data Team", lastUpdated: "2 weeks ago", access: "Team Only" },
];

export default function ExplainerKnowledge() {
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
              <h1 className="text-3xl font-bold text-white mb-1">Knowledge Base</h1>
              <p className="text-sm text-muted-foreground">Organized educational resources</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {knowledgeBase.map((kb) => (
                <Card key={kb.id} className="p-4 border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <Database className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-white">{kb.title}</h3>
                        <Badge variant="outline" className="text-[10px]">{kb.access}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">by {kb.author}</p>
                      <p className="text-[10px] text-muted-foreground">Updated {kb.lastUpdated}</p>
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
