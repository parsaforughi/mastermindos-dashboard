import { API_CONFIG } from "./apiConfig";

const ICEBALL_TREND_API_BASE = "/api/iceball-trend";

export interface IceballHealth {
  status: string;
  online?: boolean;
}

export interface IceballStats {
  totalGenerations: number;
  successfulGenerations: number;
  failedGenerations?: number;
  averageProcessingTime: number;
  todayGenerations?: number;
  last24Hours?: number;
}

export interface IceballGeneration {
  id: string;
  status: "pending" | "processing" | "completed" | "failed";
  imageUrl?: string;
  originalImageUrl?: string;
  createdAt: string;
  processingTime?: number;
  error?: string;
}

export const iceballApi = {
  async getHealth(): Promise<IceballHealth> {
    const res = await fetch(`${ICEBALL_TREND_API_BASE}/health`);
    if (!res.ok) {
      return { status: "unknown", online: false };
    }
    return res.json();
  },

  async getStats(): Promise<IceballStats> {
    const res = await fetch(`${ICEBALL_TREND_API_BASE}/stats`);
    if (!res.ok) {
      return {
        totalGenerations: 0,
        successfulGenerations: 0,
        failedGenerations: 0,
        averageProcessingTime: 0,
        todayGenerations: 0,
        last24Hours: 0,
      };
    }
    return res.json();
  },

  async getGenerations(limit: number = 50): Promise<IceballGeneration[]> {
    const res = await fetch(`${ICEBALL_TREND_API_BASE}/generations?limit=${limit}`);
    if (!res.ok) {
      return [];
    }
    return res.json();
  },

  async generateImage(imageFile: File): Promise<Blob> {
    // Direct call to Iceball Trend Generator API
    const ICEBALL_TREND_DIRECT_URL = API_CONFIG.ICEBALL_API || 'https://iceball-trend-generator.onrender.com';
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await fetch(`${ICEBALL_TREND_DIRECT_URL}/api/generate`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Failed to generate image");
    return res.blob();
  },
};














