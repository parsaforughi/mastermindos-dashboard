import { useConversations, useCreateConversation } from "@/hooks/useExplainerApi";
import { Circle, Clock, Search, Plus, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function InboxList({ 
  activeId, 
  onSelect 
}: { 
  activeId: string, 
  onSelect: (id: string) => void 
}) {
  const { data: conversations, isLoading } = useConversations();
  const createConversation = useCreateConversation();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations?.filter(conv => 
    conv.userName.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const newCount = conversations?.filter(c => c.unreadCount > 0).length || 0;

  const handleNewConversation = () => {
    const name = `User ${Math.floor(Math.random() * 1000)}`;
    createConversation.mutate(name, {
      onSuccess: (newConv) => {
        onSelect(newConv.id);
      }
    });
  };

  return (
    <div className="glass-panel rounded-2xl h-full flex flex-col overflow-hidden" data-testid="inbox-list">
      <div className="p-4 border-b border-white/5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-semibold">Inbox</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium" data-testid="inbox-new-count">
              {newCount} new
            </span>
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-6 w-6"
              onClick={handleNewConversation}
              disabled={createConversation.isPending}
              data-testid="button-new-conversation"
            >
              {createConversation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search conversations..." 
            className="pl-9 bg-black/20 border-white/10 focus-visible:ring-primary/50 h-9 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="input-search-conversations"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            {searchQuery ? "No conversations found" : "No conversations yet"}
          </div>
        ) : (
          filteredConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => onSelect(conv.id)}
              data-testid={`conversation-item-${conv.id}`}
              className={cn(
                "w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all group relative overflow-hidden",
                activeId === conv.id 
                  ? "bg-primary/10 border border-primary/20 shadow-[0_0_15px_-5px_hsl(var(--primary)/0.2)]" 
                  : "hover:bg-white/5 border border-transparent"
              )}
            >
              {activeId === conv.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
              )}

              <div className="relative">
                <div className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold border border-white/10",
                  activeId === conv.id ? "bg-primary text-white shadow-lg shadow-primary/40" : "bg-white/5 text-muted-foreground"
                )}>
                  {conv.userName.charAt(0)}
                </div>
                {conv.status === 'active' && (
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-black rounded-full" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className={cn("font-medium text-sm truncate", activeId === conv.id ? "text-white" : "text-foreground")}>
                    {conv.userName}
                  </span>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                    {new Date(conv.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className={cn("text-xs truncate", activeId === conv.id ? "text-primary-foreground/80" : "text-muted-foreground")}>
                  {conv.status === 'active' ? 'Active conversation' : 'Idle'}
                </p>
              </div>

              {conv.unreadCount > 0 && (
                <div className="h-5 min-w-[20px] px-1.5 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-primary/40">
                  {conv.unreadCount}
                </div>
              )}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
