import { API_CONFIG } from './apiConfig';

const BASE_URL = API_CONFIG.INSTAGRAM_DM_API || 'http://localhost:8080/api';

export interface InstagramDMCampaign {
  id: string;
  name: string;
  googleSheetId: string;
  sheetName: string;
  instagramAccountId: string;
  messageTemplate: string;
  status: 'active' | 'paused' | 'stopped' | 'completed';
  createdAt: string;
  updatedAt: string;
  startTime?: string;
  endTime?: string;
  dailyWindows?: Array<{ start: string; end: string }>;
  totalRows: number;
  sentRows: number;
  failedRows: number;
  blockedRows: number;
}

export interface InstagramDMAccount {
  id: string;
  username: string;
  isActive: boolean;
  proxy?: string;
  warmupDay: number;
  dmsSentToday: number;
  dmsSentThisHour: number;
  lastDmSentAt?: string;
  createdAt: string;
  lastUsed?: string;
}

export interface InstagramDMStats {
  campaigns: {
    total: number;
    active: number;
    paused: number;
    stopped: number;
    completed: number;
  };
  accounts: {
    total: number;
    active: number;
  };
  metrics: {
    totalSent: number;
    totalFailed: number;
    totalBlocked: number;
    successRate: string;
  };
}

export interface CampaignLog {
  id: string;
  campaignId: string;
  type: 'info' | 'success' | 'error' | 'warning';
  message: string;
  details?: Record<string, unknown>;
  timestamp: string;
}

export interface GoogleAuthStatus {
  authenticated: boolean;
  email: string | null;
}

class InstagramDMApi {
  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Health
  async getHealth() {
    return this.fetch<{ status: string; timestamp: string; activeCampaigns: number }>('/health');
  }

  // Stats
  async getStats() {
    return this.fetch<InstagramDMStats>('/stats');
  }

  // Campaigns
  async getCampaigns() {
    return this.fetch<InstagramDMCampaign[]>('/campaigns');
  }

  async getCampaign(id: string) {
    return this.fetch<InstagramDMCampaign>(`/campaigns/${id}`);
  }

  async createCampaign(data: Partial<InstagramDMCampaign>) {
    return this.fetch<InstagramDMCampaign>('/campaigns', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCampaign(id: string, data: Partial<InstagramDMCampaign>) {
    return this.fetch<InstagramDMCampaign>(`/campaigns/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteCampaign(id: string) {
    return this.fetch<{ success: boolean }>(`/campaigns/${id}`, {
      method: 'DELETE',
    });
  }

  async startCampaign(id: string) {
    return this.fetch<{ success: boolean; message: string }>(`/campaigns/${id}/start`, {
      method: 'POST',
    });
  }

  async stopCampaign(id: string) {
    return this.fetch<{ success: boolean; message: string }>(`/campaigns/${id}/stop`, {
      method: 'POST',
    });
  }

  async pauseCampaign(id: string) {
    return this.fetch<{ success: boolean; message: string }>(`/campaigns/${id}/pause`, {
      method: 'POST',
    });
  }

  async resumeCampaign(id: string) {
    return this.fetch<{ success: boolean; message: string }>(`/campaigns/${id}/resume`, {
      method: 'POST',
    });
  }

  // Accounts
  async getAccounts() {
    return this.fetch<InstagramDMAccount[]>('/accounts');
  }

  async getAccount(id: string) {
    return this.fetch<InstagramDMAccount>(`/accounts/${id}`);
  }

  async createAccount(data: Partial<InstagramDMAccount & { cookies: string }>) {
    return this.fetch<InstagramDMAccount>('/accounts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateAccount(id: string, data: Partial<InstagramDMAccount>) {
    return this.fetch<InstagramDMAccount>(`/accounts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteAccount(id: string) {
    return this.fetch<{ success: boolean }>(`/accounts/${id}`, {
      method: 'DELETE',
    });
  }

  // Logs
  async getLogs(campaignId?: string, limit = 100, offset = 0) {
    if (campaignId) {
      return this.fetch<{ logs: CampaignLog[]; total: number; limit: number; offset: number }>(
        `/logs/campaign/${campaignId}?limit=${limit}&offset=${offset}`
      );
    }
    return this.fetch<{ logs: CampaignLog[]; total: number; limit: number; offset: number }>(
      `/logs?limit=${limit}&offset=${offset}`
    );
  }

  // Google OAuth
  async getGoogleAuthUrl() {
    return this.fetch<{ authUrl: string }>('/google/auth/url');
  }

  async getGoogleAuthStatus() {
    return this.fetch<GoogleAuthStatus>('/google/auth/status');
  }

  async revokeGoogleAuth() {
    return this.fetch<{ success: boolean; message: string }>('/google/auth/revoke', {
      method: 'POST',
    });
  }
}

export const instagramDmApi = new InstagramDMApi();
