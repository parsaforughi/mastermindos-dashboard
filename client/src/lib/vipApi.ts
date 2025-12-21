import { API_CONFIG } from "./apiConfig";

const VIP_API_BASE = API_CONFIG.VIP_API;

export interface VIPUser {
  id: number;
  telegramId: string;
  username: string;
  points: number;
  level: number;
  createdAt: string;
}

export interface VIPMission {
  id: number;
  title: string;
  description: string;
  points: number;
  type: string;
  status: string;
  completedAt?: string;
}

export interface VIPReward {
  id: number;
  title: string;
  description: string;
  pointsRequired: number;
  category: string;
}

export interface VIPDashboard {
  user: VIPUser;
  totalPoints: number;
  missions: VIPMission[];
  rewards: VIPReward[];
  recentActivity: any[];
}

export interface VIPStats {
  totalUsers: number;
  activeUsers: number;
  totalPoints: number;
  missionsCompleted: number;
  rewardsRedeemed: number;
}

export const vipApi = {
  async getHealth(): Promise<{ status: string; db?: string }> {
    const res = await fetch(`${VIP_API_BASE}/health`);
    if (!res.ok) throw new Error("Failed to fetch VIP health");
    return res.json();
  },

  async getDashboard(userId?: string): Promise<VIPDashboard> {
    const url = userId ? `${VIP_API_BASE}/dashboard?userId=${userId}` : `${VIP_API_BASE}/dashboard`;
    const res = await fetch(url, {
      headers: {
        // Add auth token if needed
        // "Authorization": `Bearer ${token}`
      },
    });
    if (!res.ok) throw new Error("Failed to fetch VIP dashboard");
    return res.json();
  },

  async getMissions(userId?: string): Promise<VIPMission[]> {
    const url = userId ? `${VIP_API_BASE}/missions?userId=${userId}` : `${VIP_API_BASE}/missions`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch missions");
    return res.json();
  },

  async startMission(missionId: number, userId?: string): Promise<any> {
    const res = await fetch(`${VIP_API_BASE}/missions/${missionId}/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    if (!res.ok) throw new Error("Failed to start mission");
    return res.json();
  },

  async getRewards(): Promise<VIPReward[]> {
    const res = await fetch(`${VIP_API_BASE}/purchases`);
    if (!res.ok) throw new Error("Failed to fetch rewards");
    return res.json();
  },

  async getStats(): Promise<VIPStats> {
    // This endpoint may need to be created
    const res = await fetch(`${VIP_API_BASE}/stats`);
    if (!res.ok) {
      // Return mock stats if endpoint doesn't exist
      return {
        totalUsers: 0,
        activeUsers: 0,
        totalPoints: 0,
        missionsCompleted: 0,
        rewardsRedeemed: 0,
      };
    }
    return res.json();
  },
};














