import { MOCK_MESSAGES, Message } from "@/lib/mockData";
import { Send, Paperclip, MoreVertical, Smile, Bot, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";

export function ActiveChat({ conversationId }: { conversationId: string }) {
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [inputText, setInputText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Filter messages for this conversation
  const activeMessages = messages.filter(m => m.conversationId === conversationId);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeMessages, conversationId]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      conversationId,
      sender: 'user',
      content: inputText,
      timestamp: new Date(),
      status: 'sending'
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText("");

    // Simulate bot response
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        conversationId,
        sender: 'bot',
        content: "I've received your request. Processing analysis now...",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1500);
  };

  return (
    <div className="glass-panel rounded-2xl h-full flex flex-col overflow-hidden relative">
        {/* Header */}
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/20">
            <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <div>
                    <h3 className="font-display font-semibold text-sm">Live Session</h3>
                    <p className="text-xs text-muted-foreground font-mono">ID: {conversationId}</p>
                </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                <MoreVertical className="h-4 w-4" />
            </Button>
        </div>

        {/* Chat Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
            {activeMessages.map((msg) => {
                const isBot = msg.sender === 'bot';
                return (
                    <div key={msg.id} className={cn("flex gap-3 max-w-[85%]", isBot ? "mr-auto" : "ml-auto flex-row-reverse")}>
                        <div className={cn(
                            "h-8 w-8 rounded-lg flex items-center justify-center shrink-0 shadow-lg",
                            isBot ? "bg-primary/20 border border-primary/30 text-primary" : "bg-secondary/20 border border-secondary/30 text-secondary"
                        )}>
                            {isBot ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                        </div>
                        
                        <div className="space-y-1">
                            <div className={cn(
                                "p-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                                isBot 
                                    ? "bg-card border border-white/5 rounded-tl-none text-foreground" 
                                    : "bg-primary/10 border border-primary/20 rounded-tr-none text-primary-foreground"
                            )}>
                                {msg.content}
                            </div>
                            <span className="text-[10px] text-muted-foreground block px-1">
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>
                )
            })}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-black/20 border-t border-white/5">
            <div className="flex items-center gap-2 bg-card/50 border border-white/10 rounded-xl p-1 pr-2 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary shrink-0 rounded-lg">
                    <Paperclip className="h-4 w-4" />
                </Button>
                <Input 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="border-0 bg-transparent focus-visible:ring-0 h-9 text-sm placeholder:text-muted-foreground/50 shadow-none"
                    placeholder="Type a message to simulate user input..."
                />
                <Button 
                    onClick={handleSend}
                    size="icon" 
                    className="h-8 w-8 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 rounded-lg shrink-0"
                >
                    <Send className="h-4 w-4" />
                </Button>
            </div>
        </div>
    </div>
  );
}
