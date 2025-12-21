import { useQuery, useMutation } from "@tanstack/react-query";
import { iceballApi, IceballHealth, IceballStats } from "@/lib/iceballApi";

export function useIceballHealth() {
  return useQuery<IceballHealth>({
    queryKey: ["iceball", "health"],
    queryFn: () => iceballApi.getHealth(),
    refetchInterval: 10000,
  });
}

export function useIceballStats() {
  return useQuery<IceballStats>({
    queryKey: ["iceball", "stats"],
    queryFn: () => iceballApi.getStats(),
    refetchInterval: 10000,
  });
}

export function useGenerateIceballImage() {
  return useMutation({
    mutationFn: (imageFile: File) => iceballApi.generateImage(imageFile),
  });
}














