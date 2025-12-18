import { API_CONFIG } from "./apiConfig";

const COLLAMIN_API_BASE = API_CONFIG.COLLAMIN_API;

export interface CollaminHealth {
  status: string;
  service: string;
}

export interface CollaminStats {
  totalGenerations: number;
  successfulGenerations: number;
  failedGenerations: number;
  averageProcessingTime: number;
  storyImagesGenerated: number;
}

export interface CollaminGeneration {
  id: string;
  status: "pending" | "processing" | "completed" | "failed";
  createdAt: string;
  storyImageUrl?: string;
}

export const collaminApi = {
  async getHealth(): Promise<CollaminHealth> {
    try {
      const res = await fetch(`${COLLAMIN_API_BASE}/api/health`);
      if (!res.ok) {
        return { status: "unknown", service: "collamin-shelftalker" };
      }
      return res.json();
    } catch {
      return { status: "unknown", service: "collamin-shelftalker" };
    }
  },

  async getStats(): Promise<CollaminStats> {
    try {
      const res = await fetch(`${COLLAMIN_API_BASE}/api/stats`);
      if (!res.ok) {
        return {
          totalGenerations: 0,
          successfulGenerations: 0,
          failedGenerations: 0,
          averageProcessingTime: 0,
          storyImagesGenerated: 0,
        };
      }
      return res.json();
    } catch {
      return {
        totalGenerations: 0,
        successfulGenerations: 0,
        failedGenerations: 0,
        averageProcessingTime: 0,
        storyImagesGenerated: 0,
      };
    }
  },

  async generateImage(imageFile: File): Promise<{
    originalImage: string;
    futureWithoutCollamin: string;
    futureWithCollamin: string;
    storyComparison: string;
  }> {
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await fetch(`${COLLAMIN_API_BASE}/api/generate`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to generate image");
    }

    return res.json();
  },
};

