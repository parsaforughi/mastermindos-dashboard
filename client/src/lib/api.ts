const API_BASE = "/api";

async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  
  return response.json();
}

// Types
export interface Session {
  id: string;
  userId: string;
  model: string;
  systemPrompt: string;
  temperature: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Conversation {
  id: string;
  sessionId: string;
  userName: string;
  status: string;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  sender: "user" | "bot";
  content: string;
  status: string;
  createdAt: string;
}

export interface Log {
  id: string;
  sessionId: string;
  type: "info" | "error" | "warning" | "success" | "system";
  message: string;
  details?: string;
  createdAt: string;
}

export interface Stats {
  totalMessages: number;
  totalConversations: number;
  activeUsers: number;
  errorCount: number;
  responseRate: number;
  avgResponseTime: string;
  botActive: boolean;
  uptime: number;
}

export interface BotStatus {
  active: boolean;
  paused: boolean;
  model: string;
  temperature: string;
  uptime: number;
  lastReset: string | null;
}

export interface HealthStatus {
  status: string;
  systems: Array<{
    name: string;
    status: string;
    latency: string;
  }>;
  timestamp: string;
}

export interface Analytics {
  totalMessages: number;
  totalConversations: number;
  activeUsers: number;
  errorRate: string;
  responseRate: string;
  avgResponseTime: string;
  learningData: Array<{ day: string; sessions: number; completions: number }>;
  engagementData: Array<{ time: string; users: number }>;
}

// API Functions
export const api = {
  // Stats & Health
  getStats: () => apiFetch<Stats>("/stats"),
  getHealth: () => apiFetch<HealthStatus>("/health"),
  getAnalytics: () => apiFetch<Analytics>("/analytics"),
  
  // Bot Control
  getBotStatus: () => apiFetch<BotStatus>("/bot/status"),
  controlBot: (action: "start" | "stop" | "pause" | "resume" | "reset" | "clear-cache") => 
    apiFetch<{ success: boolean; active: boolean; paused: boolean }>("/bot/control", {
      method: "POST",
      body: JSON.stringify({ action }),
    }),
  
  // Sessions
  getSession: () => apiFetch<Session>("/session"),
  updateSession: (data: Partial<Session>) => 
    apiFetch<Session>("/session", {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  
  // Conversations
  getConversations: () => apiFetch<Conversation[]>("/conversations"),
  getConversation: (id: string) => apiFetch<Conversation>(`/conversation/${id}`),
  createConversation: (userName: string) => 
    apiFetch<Conversation>("/conversations", {
      method: "POST",
      body: JSON.stringify({ userName }),
    }),
  updateConversation: (id: string, data: Partial<Conversation>) =>
    apiFetch<Conversation>(`/conversation/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  
  // Messages
  getMessages: (conversationId: string) => apiFetch<Message[]>(`/messages/${conversationId}`),
  sendMessage: (conversationId: string, sender: "user" | "bot", content: string) =>
    apiFetch<Message>("/messages", {
      method: "POST",
      body: JSON.stringify({ conversationId, sender, content }),
    }),
  
  // Logs
  getLogs: (limit = 50) => apiFetch<Log[]>(`/logs?limit=${limit}`),
  createLog: (type: Log["type"], message: string, details?: string) =>
    apiFetch<Log>("/logs", {
      method: "POST",
      body: JSON.stringify({ type, message, details }),
    }),
  
  // Seed demo data
  seedData: () => apiFetch<{ success: boolean; message: string }>("/seed", { method: "POST" }),
};

export default api;
