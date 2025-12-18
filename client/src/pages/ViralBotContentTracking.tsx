import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useViralBotContent } from "@/hooks/useViralBotApi";
import { Loader2 } from "lucide-react";

export default function ViralBotContentTracking() {
  const { data: content = [], isLoading } = useViralBotContent();
  
  const contentLog = content.map(item => ({
    id: item.id,
    title: item.content || 'Unknown',
    category: item.type || 'Unknown',
    views: item.views || 0,
    engagement: item.views > 0 ? `${Math.min(100, (item.views / 100).toFixed(1))}%` : "0%",
    status: item.views > 50 ? 'viral' : item.views > 20 ? 'trending' : 'normal' as 'viral' | 'trending' | 'normal'
  }));

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans selection:bg-primary/20 relative">
      <div className="noise-overlay" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-pattern opacity-40" />
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 liquid-blob" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-secondary/10 liquid-blob" style={{ animationDelay: '-5s', animationDuration: '15s' }} />
        <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] rounded-full bg-purple-500/5 liquid-blob" style={{ animationDelay: '-2s', animationDuration: '20s' }} />
      </div>

      <div className="relative z-10 flex h-full w-full">
        <Sidebar />
        <main className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="flex-1 p-6 overflow-y-auto overflow-x-hidden custom-scrollbar">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-white mb-1">Content Tracking</h1>
              <p className="text-sm text-muted-foreground">Monitor trending content across platforms</p>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
            <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-muted-foreground">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4">Content</th>
                      <th className="text-center py-3 px-4">Category</th>
                      <th className="text-right py-3 px-4">Views</th>
                      <th className="text-right py-3 px-4">Engagement</th>
                      <th className="text-center py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contentLog.map((content) => (
                      <tr key={content.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="py-3 px-4 text-white font-medium">{content.title}</td>
                        <td className="py-3 px-4 text-center">{content.category}</td>
                        <td className="py-3 px-4 text-right">{(content.views / 1000).toFixed(0)}K</td>
                        <td className="py-3 px-4 text-right text-green-400">{content.engagement}</td>
                        <td className="py-3 px-4 text-center">
                          <Badge variant={content.status === 'viral' ? 'default' : content.status === 'trending' ? 'secondary' : 'outline'} className="text-[10px]">
                            {content.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
