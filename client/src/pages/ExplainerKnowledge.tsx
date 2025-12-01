import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { Database } from "lucide-react";

const knowledgeBase = [
  { id: "KB001", title: "Algorithms Encyclopedia", entries: 234, lastUpdated: "2 days ago" },
  { id: "KB002", title: "Data Structures Reference", entries: 189, lastUpdated: "5 days ago" },
  { id: "KB003", title: "System Design Patterns", entries: 156, lastUpdated: "1 week ago" },
  { id: "KB004", title: "Best Practices Guide", entries: 142, lastUpdated: "10 days ago" },
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {knowledgeBase.map((kb) => (
                <Card key={kb.id} className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                  <div className="flex items-start gap-3">
                    <Database className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-medium text-white mb-1">{kb.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{kb.entries} entries</p>
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
