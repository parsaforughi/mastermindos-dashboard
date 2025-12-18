import { useQuery } from "@tanstack/react-query";
import { viralBotApi, ViralBotHealth, ViralBotStats, ViralBotContent } from "@/lib/viralBotApi";

export function useViralBotHealth() {
  return useQuery<ViralBotHealth>({
    queryKey: ["viral-bot", "health"],
    queryFn: () => viralBotApi.getHealth(),
    refetchInterval: 10000,
  });
}

export function useViralBotStats() {
  return useQuery<ViralBotStats>({
    queryKey: ["viral-bot", "stats"],
    queryFn: () => viralBotApi.getStats(),
    refetchInterval: 5000,
  });
}

export function useViralBotContent() {
  return useQuery<ViralBotContent[]>({
    queryKey: ["viral-bot", "content"],
    queryFn: () => viralBotApi.getContent(),
    refetchInterval: 10000,
  });
}

export function useViralBotAnalytics() {
  return useQuery({
    queryKey: ["viral-bot", "analytics"],
    queryFn: () => viralBotApi.getAnalytics(),
    refetchInterval: 30000,
  });
}

export function useViralBotSearchLogs() {
  return useQuery({
    queryKey: ["viral-bot", "search-logs"],
    queryFn: () => viralBotApi.getSearchLogs(),
    refetchInterval: 10000,
  });
}







