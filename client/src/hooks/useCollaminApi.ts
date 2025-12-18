import { useQuery, useMutation } from "@tanstack/react-query";
import { collaminApi, CollaminHealth, CollaminStats, CollaminCampaignAnalytics } from "@/lib/collaminApi";

export function useCollaminHealth() {
  return useQuery<CollaminHealth>({
    queryKey: ["collamin", "health"],
    queryFn: () => collaminApi.getHealth(),
    refetchInterval: 10000,
  });
}

export function useCollaminStats() {
  return useQuery<CollaminStats>({
    queryKey: ["collamin", "stats"],
    queryFn: () => collaminApi.getStats(),
    refetchInterval: 10000,
  });
}

export function useCollaminAnalytics() {
  return useQuery<CollaminCampaignAnalytics>({
    queryKey: ["collamin", "analytics"],
    queryFn: () => collaminApi.getAnalytics(),
    refetchInterval: 10000,
  });
}

export function useGenerateCollaminImage() {
  return useMutation({
    mutationFn: (imageFile: File) => collaminApi.generateImage(imageFile),
  });
}

