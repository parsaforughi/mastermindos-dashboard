import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { autoDmApi, AutoDMHealth, AutoDMStats, AutoDMConversation, AutoDMMessage } from "@/lib/autoDmApi";

export function useAutoDMHealth() {
  return useQuery<AutoDMHealth>({
    queryKey: ["auto-dm", "health"],
    queryFn: () => autoDmApi.getHealth(),
    refetchInterval: 10000,
  });
}

export function useAutoDMStats() {
  return useQuery<AutoDMStats>({
    queryKey: ["auto-dm", "stats"],
    queryFn: () => autoDmApi.getStats(),
    refetchInterval: 5000,
  });
}

export function useAutoDMConversations() {
  return useQuery<{ conversations: AutoDMConversation[] }>({
    queryKey: ["auto-dm", "conversations"],
    queryFn: () => autoDmApi.getConversations(),
    refetchInterval: 5000,
  });
}

export function useAutoDMConversation(id: string) {
  return useQuery<{ conversation: AutoDMConversation; messages: AutoDMMessage[] }>({
    queryKey: ["auto-dm", "conversation", id],
    queryFn: () => autoDmApi.getConversation(id),
    enabled: !!id,
    refetchInterval: 3000,
  });
}

export function useAutoDMMessages(conversationId?: string) {
  return useQuery<{ messages: AutoDMMessage[] }>({
    queryKey: ["auto-dm", "messages", conversationId],
    queryFn: () => autoDmApi.getMessages(conversationId),
    enabled: !!conversationId,
    refetchInterval: 3000,
  });
}

export function useSendAutoDMMessage() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ conversationId, from, text, direction }: { 
      conversationId: string; 
      from: string; 
      text: string; 
      direction?: "in" | "out" 
    }) =>
      autoDmApi.sendMessage(conversationId, from, text, direction),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["auto-dm", "messages", variables.conversationId] });
      queryClient.invalidateQueries({ queryKey: ["auto-dm", "conversations"] });
      queryClient.invalidateQueries({ queryKey: ["auto-dm", "stats"] });
    },
  });
}













