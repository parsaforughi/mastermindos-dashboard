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

export interface CollaminCampaignAnalytics {
  overview: {
    totalUploads: number;
    totalGenerations: number;
    storyDownloads: number;
    conversionRate: number;
    storyConversionRate: number;
    avgTimeOnPage: number;
    regenerationRate: number;
  };
  aiGeneration: {
    withCollamin: number;
    withoutCollamin: number;
    avgGenerationTime: number;
    successRate: number;
    failureRate: number;
    rejectedOutputs: number;
    rejectionReasons: {
      poseMismatch: number;
      lightingMismatch: number;
      artifacts: number;
    };
  };
  userBehavior: {
    funnel: {
      visitors: number;
      uploads: number;
      downloads: number;
    };
    downloadBreakdown: {
      individual: number;
      story: number;
    };
    deviceBreakdown: {
      ios: number;
      android: number;
      desktop: number;
    };
  };
  storyPerformance: {
    storyDownloads: number;
    hourlyTrend: Array<{ hour: number; downloads: number }>;
    dailyTrend: Array<{ date: string; uploads: number; generations: number; downloads: number; storyDownloads: number }>;
  };
  downloads: {
    byType: {
      withoutCollamin: number;
      withCollamin: number;
      storyComparison: number;
    };
  };
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

  async getAnalytics(): Promise<CollaminCampaignAnalytics> {
    try {
      const res = await fetch(`${COLLAMIN_API_BASE}/api/analytics`);
      if (!res.ok) {
        throw new Error("Failed to fetch analytics");
      }
      return res.json();
    } catch {
      // Return default structure on error
      return {
        overview: {
          totalUploads: 0,
          totalGenerations: 0,
          storyDownloads: 0,
          conversionRate: 0,
          storyConversionRate: 0,
          avgTimeOnPage: 0,
          regenerationRate: 0,
        },
        aiGeneration: {
          withCollamin: 0,
          withoutCollamin: 0,
          avgGenerationTime: 0,
          successRate: 0,
          failureRate: 0,
          rejectedOutputs: 0,
          rejectionReasons: {
            poseMismatch: 0,
            lightingMismatch: 0,
            artifacts: 0,
          },
        },
        userBehavior: {
          funnel: {
            visitors: 0,
            uploads: 0,
            downloads: 0,
          },
          downloadBreakdown: {
            individual: 0,
            story: 0,
          },
          deviceBreakdown: {
            ios: 0,
            android: 0,
            desktop: 0,
          },
        },
        storyPerformance: {
          storyDownloads: 0,
          hourlyTrend: [],
          dailyTrend: [],
        },
        downloads: {
          byType: {
            withoutCollamin: 0,
            withCollamin: 0,
            storyComparison: 0,
          },
        },
      };
    }
  },
};

