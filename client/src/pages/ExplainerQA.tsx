import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle } from "lucide-react";

const qaData = [
  { id: 1, question: "How do transformer models work?", category: "Advanced ML", helpful: 892, difficulty: "Hard" },
  { id: 2, question: "What's the difference between supervised and unsupervised learning?", category: "Fundamentals", helpful: 1234, difficulty: "Easy" },
  { id: 3, question: "Explain gradient descent optimization", category: "Mathematics", helpful: 567, difficulty: "Medium" },
  { id: 4, question: "What are attention mechanisms?", category: "Advanced ML", helpful: 743, difficulty: "Hard" },
  { id: 5, question: "How does backpropagation reduce error?", category: "Core Concepts", helpful: 654, difficulty: "Medium" },
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
                      <div className="flex flex-wrap gap-2 items-center">
                        <Badge variant="outline" className="text-[10px]">{item.category}</Badge>
                        <Badge variant="outline" className={`text-[10px] ${item.difficulty === 'Easy' ? 'text-green-400' : item.difficulty === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>
                          {item.difficulty}
                        </Badge>
                        <span className="text-xs text-muted-foreground ml-auto">{item.helpful} found helpful</span>
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
