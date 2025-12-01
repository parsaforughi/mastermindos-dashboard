import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

const qaData = [
  { id: 1, question: "What is machine learning?", answers: 234, views: 1200 },
  { id: 2, question: "Explain neural networks", answers: 189, views: 890 },
  { id: 3, question: "How does backpropagation work?", answers: 145, views: 670 },
  { id: 4, question: "Define deep learning concepts", answers: 98, views: 450 },
];

export default function ExplainerQA() {
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
              <h1 className="text-3xl font-bold text-white mb-1">Q&A Session</h1>
              <p className="text-sm text-muted-foreground">Popular questions from your audience</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {qaData.map((item) => (
                <Card key={item.id} className="p-4 border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <MessageCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-medium text-white mb-2">{item.question}</h3>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span>{item.answers} answers</span>
                        <span>•</span>
                        <span>{item.views} views</span>
                      </div>
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
