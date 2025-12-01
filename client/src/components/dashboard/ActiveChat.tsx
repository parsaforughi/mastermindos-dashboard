import { useMessages, useSendMessage } from "@/hooks/useExplainerApi";
import { Send, Paperclip, MoreVertical, Smile, Bot, User, Sparkles, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";

function TypewriterText({ text, onComplete }: { text: string, onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayedText("");
    
    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayedText((prev) => prev + text.charAt(indexRef.current));
        indexRef.current++;
      } else {
        clearInterval(interval);
        onComplete?.();
      }
    }, 20);

    return () => clearInterval(interval);
  }, [text, onComplete]);

  return <span>{displayedText}</span>;
}

export function ActiveChat({ conversationId }: { conversationId: string }) {
  const { data: messages, isLoading } = useMessages(conversationId);
  const sendMessage = useSendMessage();
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, conversationId, isTyping]);

  const handleSend = async () => {
    if (!inputText.trim() || !conversationId) return;
    
    const content = inputText;
    setInputText("");
    setIsTyping(true);

    await sendMessage.mutateAsync({
      conversationId,
      sender: 'user',
      content,
    });

    setTimeout(async () => {
      await sendMessage.mutateAsync({
        conversationId,
        sender: 'bot',
        content: "I've analyzed your request. Based on the current parameters, I recommend proceeding with the enterprise integration tier. This will maximize your throughput efficiency by approximately 45%.",
      });
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="glass-panel rounded-2xl h-full flex flex-col overflow-hidden relative border-white/10" data-testid="active-chat">
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02] backdrop-blur-md z-10">
            <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse-glow" />
                  <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
                </div>
                <div>
                    <h3 className="font-display font-semibold text-sm tracking-wide flex items-center gap-2">
                      Live Session 
                      <span className="px-1.5 py-0.5 rounded bg-primary/10 text-[10px] text-primary border border-primary/20 font-mono">ACTIVE</span>
                    </h3>
                    <p className="text-xs text-muted-foreground font-mono opacity-70">ID: {conversationId || 'N/A'}</p>
                </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-full transition-colors" data-testid="button-chat-menu">
                <MoreVertical className="h-4 w-4" />
            </Button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6 bg-gradient-to-b from-transparent to-black/20">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : !conversationId ? (
              <div className="flex items-center justify-center py-8 text-muted-foreground text-sm">
                Select a conversation to view messages
              </div>
            ) : messages?.length === 0 ? (
              <div className="flex items-center justify-center py-8 text-muted-foreground text-sm">
                No messages yet. Start the conversation!
              </div>
            ) : (
              messages?.map((msg, idx) => {
                const isBot = msg.sender === 'bot';
                const isLastBotMessage = isBot && idx === (messages?.length || 0) - 1;
                
                return (
                    <div key={msg.id} className={cn("flex gap-4 max-w-[85%] group animate-in slide-in-from-bottom-2 duration-500 fill-mode-backwards", isBot ? "mr-auto" : "ml-auto flex-row-reverse")} data-testid={`message-${msg.id}`}>
                        <div className={cn(
                            "h-9 w-9 rounded-xl flex items-center justify-center shrink-0 shadow-[0_0_15px_-3px_rgba(0,0,0,0.3)] transition-all duration-300",
                            isBot 
                              ? "bg-primary/10 border border-primary/30 text-primary group-hover:scale-110 group-hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.5)]" 
                              : "bg-white/5 border border-white/10 text-foreground group-hover:scale-110"
                        )}>
                            {isBot ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                        </div>
                        
                        <div className="space-y-1.5">
                            <div className={cn(
                                "p-4 rounded-2xl text-sm leading-relaxed backdrop-blur-md transition-all duration-300",
                                isBot 
                                    ? "bg-white/[0.03] border border-white/10 rounded-tl-none text-foreground/90 shadow-lg" 
                                    : "bg-primary/20 border border-primary/20 rounded-tr-none text-primary-foreground shadow-[0_4px_20px_-5px_hsl(var(--primary)/0.2)]"
                            )}>
                                {isLastBotMessage ? (
                                  <div className="relative">
                                    <TypewriterText text={msg.content} />
                                    <span className="inline-block w-1.5 h-4 ml-0.5 bg-primary animate-pulse align-middle" />
                                  </div>
                                ) : (
                                  msg.content
                                )}
                            </div>
                            <span className="text-[10px] text-muted-foreground/60 font-mono block px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {isBot ? 'AI Model v2.4' : 'User Client'}
                            </span>
                        </div>
                    </div>
                )
              })
            )}
            
            {isTyping && (
              <div className="flex gap-4 mr-auto animate-in fade-in duration-300">
                 <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/30 text-primary flex items-center justify-center shrink-0">
                    <Bot className="h-5 w-5" />
                 </div>
                 <div className="p-4 rounded-2xl rounded-tl-none bg-white/[0.03] border border-white/10 flex items-center gap-1">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="h-1.5 w-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="h-1.5 w-1.5 bg-primary rounded-full animate-bounce" />
                 </div>
              </div>
            )}
        </div>

        <div className="p-4 bg-white/[0.01] backdrop-blur-xl border-t border-white/5">
            <div className="flex items-center gap-2 bg-white/[0.03] border border-white/10 rounded-xl p-1.5 pr-2 focus-within:bg-white/[0.05] focus-within:border-primary/30 focus-within:ring-1 focus-within:ring-primary/30 transition-all duration-300 shadow-lg">
                <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-primary hover:bg-white/5 shrink-0 rounded-lg transition-colors" data-testid="button-attach">
                    <Paperclip className="h-4 w-4" />
                </Button>
                
                <Input 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="border-0 bg-transparent focus-visible:ring-0 h-10 text-sm placeholder:text-muted-foreground/40 shadow-none font-medium"
                    placeholder="Enter command or message..."
                    disabled={!conversationId || sendMessage.isPending}
                    data-testid="input-message"
                />
                
                <div className="flex items-center gap-1">
                  <Button 
                      variant="ghost"
                      size="icon" 
                      className="h-9 w-9 text-muted-foreground hover:text-primary hover:bg-white/5 rounded-lg shrink-0 transition-colors"
                      data-testid="button-sparkle"
                  >
                      <Sparkles className="h-4 w-4" />
                  </Button>
                  <Button 
                      onClick={handleSend}
                      size="icon" 
                      className="h-9 w-9 bg-gradient-to-br from-primary to-purple-600 hover:to-purple-500 text-white shadow-[0_0_20px_-5px_hsl(var(--primary)/0.5)] rounded-lg shrink-0 transition-all hover:scale-105 active:scale-95"
                      disabled={!conversationId || sendMessage.isPending || !inputText.trim()}
                      data-testid="button-send"
                  >
                      {sendMessage.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                  </Button>
                </div>
            </div>
        </div>
    </div>
  );
}
