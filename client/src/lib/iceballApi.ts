import { API_CONFIG } from "./apiConfig";

const ICEBALL_API_BASE = API_CONFIG.ICEBALL_API;

export interface IceballHealth {
  status: string;
}

export interface IceballStats {
  totalGenerations: number;
  successfulGenerations: number;
  averageProcessingTime: number;
}

export interface IceballGeneration {
  id: string;
  status: "pending" | "processing" | "completed" | "failed";
  imageUrl?: string;
  createdAt: string;
}

export const iceballApi = {
  async getHealth(): Promise<IceballHealth> {
    const res = await fetch(`${ICEBALL_API_BASE}/health`);
    if (!res.ok) {
      return { status: "unknown" };
    }
    return res.json();
  },

  async getStats(): Promise<IceballStats> {
    const res = await fetch(`${ICEBALL_API_BASE}/stats`);
    if (!res.ok) {
      return {
        totalGenerations: 0,
        successfulGenerations: 0,
        averageProcessingTime: 0,
      };
    }
    return res.json();
  },

  async generateImage(imageFile: File): Promise<Blob> {
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await fetch(`${ICEBALL_API_BASE}/generate`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Failed to generate image");
    return res.blob();
  },
};













