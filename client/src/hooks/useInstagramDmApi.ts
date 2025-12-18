import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { instagramDmApi, type InstagramDMCampaign, type InstagramDMAccount, type InstagramDMStats, type CampaignLog, type GoogleAuthStatus } from "@/lib/instagramDmApi";

export function useInstagramDMHealth() {
  return useQuery({
    queryKey: ["instagram-dm", "health"],
    queryFn: () => instagramDmApi.getHealth(),
    refetchInterval: 10000,
  });
}

export function useInstagramDMStats() {
  return useQuery<InstagramDMStats>({
    queryKey: ["instagram-dm", "stats"],
    queryFn: () => instagramDmApi.getStats(),
    refetchInterval: 5000,
  });
}

export function useInstagramDMCampaigns() {
  return useQuery<InstagramDMCampaign[]>({
    queryKey: ["instagram-dm", "campaigns"],
    queryFn: () => instagramDmApi.getCampaigns(),
    refetchInterval: 5000,
  });
}

export function useInstagramDMCampaign(id: string) {
  return useQuery<InstagramDMCampaign>({
    queryKey: ["instagram-dm", "campaign", id],
    queryFn: () => instagramDmApi.getCampaign(id),
    enabled: !!id,
    refetchInterval: 3000,
  });
}

export function useInstagramDMAccounts() {
  return useQuery<InstagramDMAccount[]>({
    queryKey: ["instagram-dm", "accounts"],
    queryFn: () => instagramDmApi.getAccounts(),
    refetchInterval: 5000,
  });
}

export function useInstagramDMAccount(id: string) {
  return useQuery<InstagramDMAccount>({
    queryKey: ["instagram-dm", "account", id],
    queryFn: () => instagramDmApi.getAccount(id),
    enabled: !!id,
  });
}

export function useInstagramDMLogs(campaignId?: string) {
  return useQuery<{ logs: CampaignLog[]; total: number; limit: number; offset: number }>({
    queryKey: ["instagram-dm", "logs", campaignId],
    queryFn: () => instagramDmApi.getLogs(campaignId),
    refetchInterval: 3000,
  });
}

// Google OAuth
export function useGoogleAuthStatus() {
  return useQuery<GoogleAuthStatus>({
    queryKey: ["instagram-dm", "google-auth", "status"],
    queryFn: () => instagramDmApi.getGoogleAuthStatus(),
    refetchInterval: 5000,
  });
}

export function useGoogleAuthUrl() {
  return useQuery<{ authUrl: string }>({
    queryKey: ["instagram-dm", "google-auth", "url"],
    queryFn: () => instagramDmApi.getGoogleAuthUrl(),
    enabled: false, // Only fetch when explicitly called
  });
}

export function useRevokeGoogleAuth() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => instagramDmApi.revokeGoogleAuth(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instagram-dm", "google-auth"] });
    },
  });
}

// Mutations
export function useCreateInstagramDMCampaign() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<InstagramDMCampaign>) => instagramDmApi.createCampaign(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instagram-dm", "campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["instagram-dm", "stats"] });
    },
  });
}

export function useUpdateInstagramDMCampaign() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InstagramDMCampaign> }) =>
      instagramDmApi.updateCampaign(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["instagram-dm", "campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["instagram-dm", "campaign", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["instagram-dm", "stats"] });
    },
  });
}

export function useDeleteInstagramDMCampaign() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => instagramDmApi.deleteCampaign(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instagram-dm", "campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["instagram-dm", "stats"] });
    },
  });
}

export function useStartInstagramDMCampaign() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => instagramDmApi.startCampaign(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["instagram-dm", "campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["instagram-dm", "campaign", id] });
      queryClient.invalidateQueries({ queryKey: ["instagram-dm", "stats"] });
    },
  });
}

export function useStopInstagramDMCampaign() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => instagramDmApi.stopCampaign(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["instagram-dm", "campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["instagram-dm", "campaign", id] });
      queryClient.invalidateQueries({ queryKey: ["instagram-dm", "stats"] });
    },
  });
}

export function usePauseInstagramDMCampaign() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => instagramDmApi.pauseCampaign(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["instagram-dm", "campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["instagram-dm", "campaign", id] });
      queryClient.invalidateQueries({ queryKey: ["instagram-dm", "stats"] });
    },
  });
}

export function useResumeInstagramDMCampaign() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => instagramDmApi.resumeCampaign(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["instagram-dm", "campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["instagram-dm", "campaign", id] });
      queryClient.invalidateQueries({ queryKey: ["instagram-dm", "stats"] });
    },
  });
}

export function useCreateInstagramDMAccount() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<InstagramDMAccount & { cookies: string }>) => instagramDmApi.createAccount(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instagram-dm", "accounts"] });
      queryClient.invalidateQueries({ queryKey: ["instagram-dm", "stats"] });
    },
  });
}

export function useUpdateInstagramDMAccount() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InstagramDMAccount> }) =>
      instagramDmApi.updateAccount(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instagram-dm", "accounts"] });
      queryClient.invalidateQueries({ queryKey: ["instagram-dm", "stats"] });
    },
  });
}

export function useDeleteInstagramDMAccount() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => instagramDmApi.deleteAccount(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instagram-dm", "accounts"] });
      queryClient.invalidateQueries({ queryKey: ["instagram-dm", "stats"] });
    },
  });
}
