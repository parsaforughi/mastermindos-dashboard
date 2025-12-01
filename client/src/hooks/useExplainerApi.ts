import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  explainerApi, 
  ExplainerConversation, 
  ExplainerMessage, 
  ExplainerStats, 
  ExplainerHealth,
  ExplainerLog 
} from "@/lib/explainerApi";
import { useEffect, useState, useCallback } from "react";

export function useStats() {
  return useQuery<ExplainerStats>({
    queryKey: ["explainer", "stats"],
    queryFn: () => explainerApi.getStats(),
    refetchInterval: 5000,
  });
}

export function useHealth() {
  return useQuery<ExplainerHealth>({
    queryKey: ["explainer", "health"],
    queryFn: () => explainerApi.getHealth(),
    refetchInterval: 10000,
  });
}

export function useConversations() {
  return useQuery<ExplainerConversation[]>({
    queryKey: ["explainer", "conversations"],
    queryFn: () => explainerApi.getConversations(),
    refetchInterval: 5000,
  });
}

export function useMessages(conversationId: string) {
  return useQuery<ExplainerMessage[]>({
    queryKey: ["explainer", "messages", conversationId],
    queryFn: () => explainerApi.getMessages(conversationId),
    enabled: !!conversationId,
    refetchInterval: 3000,
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ conversationId, content, from }: { conversationId: string; content: string; from?: "user" | "bot" }) =>
      explainerApi.sendMessage(conversationId, content, from || "bot"),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["explainer", "messages", variables.conversationId] });
      queryClient.invalidateQueries({ queryKey: ["explainer", "conversations"] });
      queryClient.invalidateQueries({ queryKey: ["explainer", "stats"] });
    },
  });
}

export function useLiveMessages(onMessage: (message: ExplainerMessage) => void) {
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const eventSource = explainerApi.createLiveMessagesStream();

    eventSource.addEventListener("connected", () => {
      setConnected(true);
      setError(null);
    });

    eventSource.addEventListener("message", (event) => {
      try {
        const eventData = JSON.parse(event.data);
        if (eventData.type === "message" && eventData.message) {
          onMessage(eventData.message);
        }
      } catch (e) {
        console.error("Failed to parse SSE message:", e);
      }
    });

    eventSource.addEventListener("error", () => {
      setConnected(false);
      setError("Connection lost");
    });

    return () => {
      eventSource.close();
    };
  }, [onMessage]);

  return { connected, error };
}

export function useLiveLogs() {
  const [logs, setLogs] = useState<ExplainerLog[]>([]);
  const [connected, setConnected] = useState(false);

  const addLog = useCallback((log: ExplainerLog) => {
    setLogs((prev) => [log, ...prev].slice(0, 100));
  }, []);

  useEffect(() => {
    const eventSource = explainerApi.createLogsStream();

    eventSource.onopen = () => {
      setConnected(true);
    };

    eventSource.onmessage = (event) => {
      try {
        const log = JSON.parse(event.data) as ExplainerLog;
        addLog(log);
      } catch (e) {
        console.error("Failed to parse log:", e);
      }
    };

    eventSource.onerror = () => {
      setConnected(false);
    };

    return () => {
      eventSource.close();
    };
  }, [addLog]);

  return { logs, connected };
}

export { 
  ExplainerConversation, 
  ExplainerMessage, 
  ExplainerStats, 
  ExplainerHealth, 
  ExplainerLog 
} from "@/lib/explainerApi";
