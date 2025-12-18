import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { vipApi, VIPDashboard, VIPMission, VIPReward, VIPStats } from "@/lib/vipApi";

export function useVipHealth() {
  return useQuery({
    queryKey: ["vip", "health"],
    queryFn: () => vipApi.getHealth(),
    refetchInterval: 10000,
  });
}

export function useVipDashboard(userId?: string) {
  return useQuery<VIPDashboard>({
    queryKey: ["vip", "dashboard", userId],
    queryFn: () => vipApi.getDashboard(userId),
    refetchInterval: 5000,
  });
}

export function useVipMissions(userId?: string) {
  return useQuery<VIPMission[]>({
    queryKey: ["vip", "missions", userId],
    queryFn: () => vipApi.getMissions(userId),
    refetchInterval: 5000,
  });
}

export function useVipRewards() {
  return useQuery<VIPReward[]>({
    queryKey: ["vip", "rewards"],
    queryFn: () => vipApi.getRewards(),
    refetchInterval: 10000,
  });
}

export function useVipStats() {
  return useQuery<VIPStats>({
    queryKey: ["vip", "stats"],
    queryFn: () => vipApi.getStats(),
    refetchInterval: 10000,
  });
}

export function useStartMission() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ missionId, userId }: { missionId: number; userId?: string }) =>
      vipApi.startMission(missionId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vip", "missions"] });
      queryClient.invalidateQueries({ queryKey: ["vip", "dashboard"] });
    },
  });
}













