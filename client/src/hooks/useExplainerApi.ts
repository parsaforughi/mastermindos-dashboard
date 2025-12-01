import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api, { 
  Stats, 
  BotStatus, 
  HealthStatus, 
  Analytics, 
  Session, 
  Conversation, 
  Message, 
  Log 
} from "@/lib/api";

export function useStats() {
  return useQuery<Stats>({
    queryKey: ["stats"],
    queryFn: api.getStats,
    refetchInterval: 5000,
  });
}

export function useBotStatus() {
  return useQuery<BotStatus>({
    queryKey: ["botStatus"],
    queryFn: api.getBotStatus,
    refetchInterval: 3000,
  });
}

export function useHealth() {
  return useQuery<HealthStatus>({
    queryKey: ["health"],
    queryFn: api.getHealth,
    refetchInterval: 10000,
  });
}

export function useAnalytics() {
  return useQuery<Analytics>({
    queryKey: ["analytics"],
    queryFn: api.getAnalytics,
    refetchInterval: 30000,
  });
}

export function useSession() {
  return useQuery<Session>({
    queryKey: ["session"],
    queryFn: api.getSession,
  });
}

export function useUpdateSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Session>) => api.updateSession(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
      queryClient.invalidateQueries({ queryKey: ["botStatus"] });
    },
  });
}

export function useConversations() {
  return useQuery<Conversation[]>({
    queryKey: ["conversations"],
    queryFn: api.getConversations,
    refetchInterval: 5000,
  });
}

export function useMessages(conversationId: string) {
  return useQuery<Message[]>({
    queryKey: ["messages", conversationId],
    queryFn: () => api.getMessages(conversationId),
    enabled: !!conversationId,
    refetchInterval: 3000,
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ conversationId, sender, content }: { conversationId: string; sender: "user" | "bot"; content: string }) =>
      api.sendMessage(conversationId, sender, content),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["messages", variables.conversationId] });
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });
}

export function useLogs(limit = 50) {
  return useQuery<Log[]>({
    queryKey: ["logs", limit],
    queryFn: () => api.getLogs(limit),
    refetchInterval: 3000,
  });
}

export function useBotControl() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (action: "start" | "stop" | "pause" | "resume" | "reset" | "clear-cache") =>
      api.controlBot(action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["botStatus"] });
      queryClient.invalidateQueries({ queryKey: ["session"] });
      queryClient.invalidateQueries({ queryKey: ["logs"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });
}

export function useSeedData() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.seedData,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}

export function useCreateConversation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userName: string) => api.createConversation(userName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });
}
