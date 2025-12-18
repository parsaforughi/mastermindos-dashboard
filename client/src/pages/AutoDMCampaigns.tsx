import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { useAutoDMConversations } from "@/hooks/useAutoDmApi";

export default function AutoDMCampaigns() {
  const { data: conversationsData, isLoading } = useAutoDMConversations();
  const conversations = conversationsData?.conversations || [];
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
              <h1 className="text-3xl font-bold text-white mb-1">Campaigns</h1>
              <p className="text-sm text-muted-foreground">Manage your DM campaigns</p>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {conversations.length === 0 ? (
                  <Card className="p-8 border-white/10 bg-white/5 backdrop-blur-xl text-center">
                    <p className="text-muted-foreground">No conversations available</p>
                  </Card>
                ) : (
                  conversations.map((conv) => (
                    <Card key={conv.id} className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-white">{conv.username || conv.id}</h3>
                        <Badge variant={conv.status === 'active' ? 'default' : 'secondary'} className="text-[10px]">
                          {conv.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-xs text-muted-foreground">Messages</p>
                          <p className="text-white font-medium">{conv.messageCount || 0}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Last Activity</p>
                          <p className="text-white font-medium">{new Date(conv.lastMessageAt).toLocaleDateString()}</p>
                        </div>
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
