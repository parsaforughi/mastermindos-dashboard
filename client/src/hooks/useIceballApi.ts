import { useQuery, useMutation } from "@tanstack/react-query";
import { iceballApi, type IceballHealth, type IceballStats, type IceballGeneration } from "@/lib/iceballApi";

export function useIceballHealth() {
  return useQuery<IceballHealth>({
    queryKey: ["iceball-trend", "health"],
    queryFn: () => iceballApi.getHealth(),
    refetchInterval: 30000,
  });
}

export function useIceballStats() {
  return useQuery<IceballStats>({
    queryKey: ["iceball-trend", "stats"],
    queryFn: () => iceballApi.getStats(),
    refetchInterval: 5000, // Refresh every 5 seconds instead of 10
    staleTime: 0, // Always consider data stale
    cacheTime: 0, // Don't cache
  });
}

export function useIceballGenerations(limit: number = 50) {
  return useQuery<IceballGeneration[]>({
    queryKey: ["iceball-trend", "generations", limit],
    queryFn: () => iceballApi.getGenerations(limit),
    refetchInterval: 15000,
  });
}

export function useGenerateIceballImage() {
  return useMutation({
    mutationFn: (imageFile: File) => iceballApi.generateImage(imageFile),
  });
}














