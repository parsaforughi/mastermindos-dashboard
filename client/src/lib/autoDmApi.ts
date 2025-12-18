import { API_CONFIG } from "./apiConfig";

const AUTO_DM_API_BASE = API_CONFIG.AUTO_DM_API;

export interface AutoDMHealth {
  status: string;
  uptime?: number;
  timestamp?: number;
}

export interface AutoDMStats {
  totalMessages: number;
  totalConversations: number;
  activeConversations: number;
  messagesToday: number;
}

export interface AutoDMConversation {
  id: string;
  username: string;
  lastMessageAt: string;
  messageCount: number;
  status: string;
}

export interface AutoDMMessage {
  id: string;
  conversationId: string;
  from: string;
  to?: string;
  text: string;
  timestamp: number;
  direction: "in" | "out";
  status: string;
}

export const autoDmApi = {
  async getHealth(): Promise<AutoDMHealth> {
    const res = await fetch(`${AUTO_DM_API_BASE}/health`);
    if (!res.ok) throw new Error("Failed to fetch Auto DM health");
    return res.json();
  },

  async getStats(): Promise<AutoDMStats> {
    const res = await fetch(`${AUTO_DM_API_BASE}/stats`);
    if (!res.ok) throw new Error("Failed to fetch Auto DM stats");
    return res.json();
  },

  async getConversations(): Promise<{ conversations: AutoDMConversation[] }> {
    const res = await fetch(`${AUTO_DM_API_BASE}/conversations`);
    if (!res.ok) throw new Error("Failed to fetch conversations");
    return res.json();
  },

  async getConversation(id: string): Promise<{ conversation: AutoDMConversation; messages: AutoDMMessage[] }> {
    const res = await fetch(`${AUTO_DM_API_BASE}/conversations/${id}`);
    if (!res.ok) throw new Error("Failed to fetch conversation");
    return res.json();
  },

  async getMessages(conversationId?: string): Promise<{ messages: AutoDMMessage[] }> {
    const url = conversationId 
      ? `${AUTO_DM_API_BASE}/messages?conversationId=${encodeURIComponent(conversationId)}`
      : `${AUTO_DM_API_BASE}/messages`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch messages");
    return res.json();
  },

  async sendMessage(conversationId: string, from: string, text: string, direction: "in" | "out" = "out"): Promise<{ message: AutoDMMessage }> {
    const res = await fetch(`${AUTO_DM_API_BASE}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversationId, from, text, direction }),
    });
    if (!res.ok) throw new Error("Failed to send message");
    return res.json();
  },
};













