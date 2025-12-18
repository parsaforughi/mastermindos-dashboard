import { API_CONFIG } from "./apiConfig";

const EXPLAINER_API_BASE = API_CONFIG.EXPLAINER_API;

export interface ExplainerConversation {
  id: string;
  userId: string;
  username: string;
  lastMessageAt: string;
  inboundCount: number;
  outboundCount: number;
}

export interface ExplainerMessage {
  id: string;
  conversationId: string;
  from: "user" | "bot";
  text: string;
  createdAt: string;
}

export interface ExplainerStats {
  totalReceived: number;
  totalSent: number;
  todayReceived: number;
  todaySent: number;
}

export interface ExplainerHealth {
  status: string;
  timestamp: string;
  conversations: number;
  liveClients: number;
}

export interface ExplainerLog {
  id: string;
  source: string;
  message: string;
  timestamp: string;
}

export const explainerApi = {
  async getHealth(): Promise<ExplainerHealth> {
    const res = await fetch(`${EXPLAINER_API_BASE}/health`);
    if (!res.ok) throw new Error("Failed to fetch health");
    return res.json();
  },

  async getStats(): Promise<ExplainerStats> {
    const res = await fetch(`${EXPLAINER_API_BASE}/stats`);
    if (!res.ok) throw new Error("Failed to fetch stats");
    return res.json();
  },

  async getConversations(): Promise<ExplainerConversation[]> {
    const res = await fetch(`${EXPLAINER_API_BASE}/conversations`);
    if (!res.ok) throw new Error("Failed to fetch conversations");
    return res.json();
  },

  async getMessages(conversationId: string): Promise<ExplainerMessage[]> {
    const res = await fetch(`${EXPLAINER_API_BASE}/messages?conversationId=${encodeURIComponent(conversationId)}`);
    if (!res.ok) throw new Error("Failed to fetch messages");
    return res.json();
  },

  async sendMessage(conversationId: string, text: string, from: "user" | "bot" = "bot"): Promise<{ ok: boolean }> {
    const res = await fetch(`${EXPLAINER_API_BASE}/events/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conversationId,
        id: `msg_${Date.now()}`,
        from,
        text,
        createdAt: new Date().toISOString(),
      }),
    });
    if (!res.ok) throw new Error("Failed to send message");
    return res.json();
  },

  createLiveMessagesStream(): EventSource {
    return new EventSource(`${EXPLAINER_API_BASE}/live-messages`);
  },

  createLogsStream(): EventSource {
    return new EventSource(`${EXPLAINER_API_BASE}/logs`);
  },

  async getAnalytics(): Promise<{ learningData: Array<{ day: string; sessions: number; completions: number }>; engagementData: Array<{ time: string; users: number }> }> {
    const res = await fetch(`${EXPLAINER_API_BASE}/analytics`);
    if (!res.ok) throw new Error("Failed to fetch analytics");
    return res.json();
  },
};
