import { API_CONFIG } from "./apiConfig";

// Use dashboard server proxy routes (which forward to viral bot API)
// If VIRAL_BOT_API env var is set, use it directly; otherwise use relative path to dashboard server
const VIRAL_BOT_API_BASE = API_CONFIG.VIRAL_BOT_API || "/api/viral-bot";

export interface ViralBotHealth {
  status: string;
  botRunning: boolean;
}

export interface ViralBotStats {
  totalMessages: number;
  totalUsers: number;
  activeChannels: number;
  viralScore: number;
}

export interface ViralBotContent {
  id: string;
  type: string;
  content: string;
  shares: number;
  views: number;
  createdAt: string;
}

export interface ViralBotAnalytics {
  dailyData: Array<{ day: string; searches: number; engagement: number; virality: number }>;
  categoryDistribution: Record<string, number>;
  languageDistribution: Record<string, number>;
  platformDistribution: Record<string, number>;
}

export interface ViralBotSearchLog {
  id: string;
  userId: number;
  platform: string;
  category: string;
  language: string;
  minViews: number;
  resultsCount: number;
  timestamp: string;
  status: string;
}

export const viralBotApi = {
  async getHealth(): Promise<ViralBotHealth> {
    const res = await fetch(`${VIRAL_BOT_API_BASE}/health`);
    if (!res.ok) {
      // Return default if endpoint doesn't exist
      return { status: "unknown", botRunning: false };
    }
    return res.json();
  },

  async getStats(): Promise<ViralBotStats> {
    const res = await fetch(`${VIRAL_BOT_API_BASE}/stats`);
    if (!res.ok) {
      // Return default stats if endpoint doesn't exist
      return {
        totalMessages: 0,
        totalUsers: 0,
        activeChannels: 0,
        viralScore: 0,
      };
    }
    return res.json();
  },

  async getContent(): Promise<ViralBotContent[]> {
    const res = await fetch(`${VIRAL_BOT_API_BASE}/content`);
    if (!res.ok) {
      return [];
    }
    return res.json();
  },

  async getAnalytics(): Promise<ViralBotAnalytics> {
    const res = await fetch(`${VIRAL_BOT_API_BASE}/analytics`);
    if (!res.ok) {
      return {
        dailyData: [],
        categoryDistribution: {},
        languageDistribution: {},
        platformDistribution: {}
      };
    }
    return res.json();
  },

  async getSearchLogs(): Promise<ViralBotSearchLog[]> {
    const res = await fetch(`${VIRAL_BOT_API_BASE}/search-logs`);
    if (!res.ok) {
      return [];
    }
    return res.json();
  },

  createLogsStream(): EventSource {
    return new EventSource(`${VIRAL_BOT_API_BASE}/logs`);
  },
};







