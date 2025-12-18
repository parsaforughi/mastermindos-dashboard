import type { Express, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

// SSE client management
const sseClients = new Set<{ res: Response; type: "messages" | "logs" }>();

let botStatus = {
  active: true,
  paused: false,
  uptime: Date.now(),
  lastReset: null as Date | null,
};

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // ============ STATS & HEALTH ============
  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getStats();
      const session = await storage.getDefaultSession();
      
      res.json({
        totalMessages: stats.totalMessages,
        totalConversations: stats.totalConversations,
        activeUsers: stats.activeUsers,
        errorCount: stats.errorCount,
        responseRate: 98.5,
        avgResponseTime: "0.8s",
        botActive: session.active,
        uptime: Math.floor((Date.now() - botStatus.uptime) / 1000),
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  app.get("/api/health", async (req, res) => {
    try {
      const systems = [
        { name: "API Gateway", status: "operational", latency: `${Math.floor(Math.random() * 30 + 10)}ms` },
        { name: "LLM Engine", status: "operational", latency: `${Math.floor(Math.random() * 100 + 100)}ms` },
        { name: "Database", status: "operational", latency: `${Math.floor(Math.random() * 20 + 5)}ms` },
        { name: "WebSocket", status: botStatus.paused ? "degraded" : "operational", latency: `${Math.floor(Math.random() * 50 + 20)}ms` },
      ];
      
      res.json({
        status: "healthy",
        systems,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch health status" });
    }
  });

  // ============ BOT CONTROL ============
  app.get("/api/bot/status", async (req, res) => {
    try {
      const session = await storage.getDefaultSession();
      res.json({
        active: session.active,
        paused: botStatus.paused,
        model: session.model,
        temperature: session.temperature,
        uptime: Math.floor((Date.now() - botStatus.uptime) / 1000),
        lastReset: botStatus.lastReset,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch bot status" });
    }
  });

  app.post("/api/bot/control", async (req, res) => {
    try {
      const { action } = req.body;
      const session = await storage.getDefaultSession();
      
      switch (action) {
        case "start":
          await storage.updateSession(session.id, { active: true });
          botStatus.paused = false;
          await storage.createLog({ sessionId: session.id, type: "system", message: "Bot started", details: "Manual start" });
          break;
        case "stop":
          await storage.updateSession(session.id, { active: false });
          await storage.createLog({ sessionId: session.id, type: "system", message: "Bot stopped", details: "Manual stop" });
          break;
        case "pause":
          botStatus.paused = true;
          await storage.createLog({ sessionId: session.id, type: "warning", message: "Bot paused", details: "Manual pause" });
          break;
        case "resume":
          botStatus.paused = false;
          await storage.createLog({ sessionId: session.id, type: "success", message: "Bot resumed", details: "Manual resume" });
          break;
        case "reset":
          botStatus.uptime = Date.now();
          botStatus.lastReset = new Date();
          botStatus.paused = false;
          await storage.updateSession(session.id, { active: true });
          await storage.createLog({ sessionId: session.id, type: "system", message: "Bot reset", details: "Force reset initiated" });
          break;
        case "clear-cache":
          await storage.createLog({ sessionId: session.id, type: "info", message: "Cache cleared", details: "Memory cache purged" });
          break;
        default:
          return res.status(400).json({ error: "Invalid action" });
      }
      
      const updatedSession = await storage.getDefaultSession();
      res.json({
        success: true,
        active: updatedSession.active,
        paused: botStatus.paused,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to control bot" });
    }
  });

  // ============ SESSIONS ============
  app.get("/api/session", async (req, res) => {
    try {
      const session = await storage.getDefaultSession();
      res.json(session);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch session" });
    }
  });

  app.post("/api/sessions", async (req, res) => {
    try {
      const { userId, model, systemPrompt, temperature } = req.body;
      const session = await storage.createSession({
        userId,
        model: model || "gpt-4o",
        systemPrompt: systemPrompt || "You are an expert educational assistant.",
        temperature: temperature || "0.7",
      });
      res.json(session);
    } catch (error) {
      res.status(500).json({ error: "Failed to create session" });
    }
  });

  app.get("/api/sessions/:id", async (req, res) => {
    try {
      const session = await storage.getSession(req.params.id);
      if (!session) return res.status(404).json({ error: "Session not found" });
      res.json(session);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch session" });
    }
  });

  app.patch("/api/sessions/:id", async (req, res) => {
    try {
      const { model, systemPrompt, temperature, active } = req.body;
      const session = await storage.updateSession(req.params.id, {
        model,
        systemPrompt,
        temperature,
        active,
      });
      
      await storage.createLog({ 
        sessionId: req.params.id, 
        type: "info", 
        message: "Session updated", 
        details: `Model: ${model || 'unchanged'}` 
      });
      
      res.json(session);
    } catch (error) {
      res.status(500).json({ error: "Failed to update session" });
    }
  });

  app.patch("/api/session", async (req, res) => {
    try {
      const session = await storage.getDefaultSession();
      const { model, systemPrompt, temperature, active } = req.body;
      const updated = await storage.updateSession(session.id, {
        model,
        systemPrompt,
        temperature,
        active,
      });
      
      await storage.createLog({ 
        sessionId: session.id, 
        type: "info", 
        message: "Session settings updated", 
        details: `Model: ${model || session.model}` 
      });
      
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update session" });
    }
  });

  // ============ CONVERSATIONS ============
  app.get("/api/conversations", async (req, res) => {
    try {
      const conversations = await storage.getAllConversations();
      res.json(conversations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch conversations" });
    }
  });

  app.post("/api/conversations", async (req, res) => {
    try {
      const session = await storage.getDefaultSession();
      const { userName } = req.body;
      const conversation = await storage.createConversation({
        sessionId: session.id,
        userName: userName || "New User",
        status: "active",
        unreadCount: 0,
      });
      
      await storage.createLog({ 
        sessionId: session.id, 
        type: "info", 
        message: "New conversation started", 
        details: `User: ${userName}` 
      });
      
      res.json(conversation);
    } catch (error) {
      res.status(500).json({ error: "Failed to create conversation" });
    }
  });

  app.get("/api/conversations/:sessionId", async (req, res) => {
    try {
      const conversations = await storage.getConversationsBySession(req.params.sessionId);
      res.json(conversations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch conversations" });
    }
  });

  app.get("/api/conversation/:id", async (req, res) => {
    try {
      const conversation = await storage.getConversation(req.params.id);
      if (!conversation) return res.status(404).json({ error: "Conversation not found" });
      res.json(conversation);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch conversation" });
    }
  });

  app.patch("/api/conversation/:id", async (req, res) => {
    try {
      const { status, unreadCount } = req.body;
      const conversation = await storage.updateConversation(req.params.id, {
        status,
        unreadCount,
      });
      res.json(conversation);
    } catch (error) {
      res.status(500).json({ error: "Failed to update conversation" });
    }
  });

  // ============ MESSAGES ============
  app.post("/api/messages", async (req, res) => {
    try {
      const { conversationId, sender, content } = req.body;
      const message = await storage.createMessage({
        conversationId,
        sender,
        content,
        status: "sent",
      });
      
      // Update conversation
      await storage.updateConversation(conversationId, {
        unreadCount: sender === "user" ? 1 : 0,
      });
      
      // Broadcast to SSE clients
      broadcastToClients("messages", "message", message);
      
      res.json(message);
    } catch (error) {
      res.status(500).json({ error: "Failed to create message" });
    }
  });

  // Alternative endpoint for events/message (for compatibility)
  app.post("/api/events/message", async (req, res) => {
    try {
      const { conversationId, sender, content, from, text } = req.body;
      const actualSender = sender || from || "user";
      const actualContent = content || text || "";
      const actualConversationId = conversationId || req.body.conversationId;
      
      if (!actualConversationId || !actualContent) {
        return res.status(400).json({ error: "Missing conversationId or content" });
      }

      const message = await storage.createMessage({
        conversationId: actualConversationId,
        sender: actualSender,
        content: actualContent,
        status: "sent",
      });
      
      // Update conversation
      await storage.updateConversation(actualConversationId, {
        unreadCount: actualSender === "user" ? 1 : 0,
      });
      
      // Broadcast to SSE clients
      broadcastToClients("messages", "message", message);
      
      res.json({ ok: true, message });
    } catch (error) {
      res.status(500).json({ error: "Failed to create message" });
    }
  });

  app.get("/api/messages/:conversationId", async (req, res) => {
    try {
      const messages = await storage.getMessagesByConversation(req.params.conversationId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  // ============ LOGS ============
  app.get("/api/logs", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const logs = await storage.getAllLogs(limit);
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch logs" });
    }
  });

  app.post("/api/logs", async (req, res) => {
    try {
      const session = await storage.getDefaultSession();
      const { type, message, details } = req.body;
      const log = await storage.createLog({
        sessionId: session.id,
        type,
        message,
        details,
      });
      
      // Broadcast to SSE clients
      broadcastToClients("logs", "log", log);
      
      res.json(log);
    } catch (error) {
      res.status(500).json({ error: "Failed to create log" });
    }
  });

  app.get("/api/logs/:sessionId", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const logs = await storage.getLogsBySession(req.params.sessionId, limit);
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch logs" });
    }
  });

  // ============ ANALYTICS ============
  app.get("/api/analytics", async (req, res) => {
    try {
      const stats = await storage.getStats();
      
      // Generate mock time-series data for charts
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      const learningData = days.map(day => ({
        day,
        sessions: Math.floor(Math.random() * 150 + 100),
        completions: Math.floor(Math.random() * 130 + 80),
      }));
      
      const engagementData = [
        { time: "00:00", users: Math.floor(Math.random() * 50 + 80) },
        { time: "04:00", users: Math.floor(Math.random() * 30 + 50) },
        { time: "08:00", users: Math.floor(Math.random() * 200 + 350) },
        { time: "12:00", users: Math.floor(Math.random() * 300 + 700) },
        { time: "16:00", users: Math.floor(Math.random() * 250 + 600) },
        { time: "20:00", users: Math.floor(Math.random() * 150 + 200) },
        { time: "23:59", users: Math.floor(Math.random() * 80 + 120) },
      ];
      
      res.json({
        totalMessages: stats.totalMessages,
        totalConversations: stats.totalConversations,
        activeUsers: stats.activeUsers,
        errorRate: stats.errorCount > 0 ? (stats.errorCount / Math.max(stats.totalMessages, 1) * 100).toFixed(2) : "0.00",
        responseRate: "98.5",
        avgResponseTime: "0.8s",
        learningData,
        engagementData,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });

  // ============ SSE ENDPOINTS ============
  app.get("/api/live-messages", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Cache-Control");

    const client = { res: res as any, type: "messages" as const };
    sseClients.add(client);

    // Send initial connection event
    res.write(`event: connected\n`);
    res.write(`data: ${JSON.stringify({ status: "connected", timestamp: new Date().toISOString() })}\n\n`);

    req.on("close", () => {
      sseClients.delete(client);
    });
  });

  app.get("/api/live-logs", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Cache-Control");

    const client = { res: res as any, type: "logs" as const };
    sseClients.add(client);

    // Send initial connection event
    res.write(`event: connected\n`);
    res.write(`data: ${JSON.stringify({ status: "connected", timestamp: new Date().toISOString() })}\n\n`);

    req.on("close", () => {
      sseClients.delete(client);
    });
  });

  // Broadcast helper functions
  function broadcastToClients(type: "messages" | "logs", event: string, data: any) {
    const message = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
    sseClients.forEach((client) => {
      if (client.type === type) {
        try {
          client.res.write(message);
        } catch (error) {
          sseClients.delete(client);
        }
      }
    });
  }

  // ============ SEED DATA (for demo) ============
  app.post("/api/seed", async (req, res) => {
    try {
      const session = await storage.getDefaultSession();
      
      // Create demo conversations
      const names = ["Alice Freeman", "Bob Smith", "Charlie Davis", "Diana Prince"];
      for (const name of names) {
        const conv = await storage.createConversation({
          sessionId: session.id,
          userName: name,
          status: "active",
          unreadCount: Math.floor(Math.random() * 3),
        });
        
        // Add messages to each conversation
        await storage.createMessage({
          conversationId: conv.id,
          sender: "user",
          content: `Hi, I have a question about ${name === "Alice Freeman" ? "pricing" : name === "Bob Smith" ? "API integration" : "features"}`,
          status: "sent",
        });
        
        await storage.createMessage({
          conversationId: conv.id,
          sender: "bot",
          content: `Hello ${name.split(" ")[0]}! I'd be happy to help you with that. What would you like to know?`,
          status: "sent",
        });
      }
      
      // Create demo logs
      const logTypes: Array<"info" | "error" | "warning" | "success" | "system"> = ["info", "error", "warning", "success", "system"];
      const logMessages = [
        { type: "system", message: "System initialized", details: "v2.4.0-stable" },
        { type: "info", message: "Incoming webhook received", details: "Source: Stripe" },
        { type: "success", message: "Message delivered", details: "Conversation #1" },
        { type: "warning", message: "Response latency high", details: "1250ms" },
        { type: "info", message: "Intent detected: PRICING_QUERY", details: "Confidence: 0.98" },
      ];
      
      for (const log of logMessages) {
        await storage.createLog({
          sessionId: session.id,
          type: log.type as any,
          message: log.message,
          details: log.details,
        });
      }
      
      res.json({ success: true, message: "Demo data seeded successfully" });
    } catch (error) {
      console.error("Seed error:", error);
      res.status(500).json({ error: "Failed to seed data" });
    }
  });

  // ============ VIRAL BOT API PROXY ============
  // Proxy requests to the Viral Bot API server (port 3000)
  const VIRAL_BOT_API_URL = process.env.VIRAL_BOT_API_URL || 'http://localhost:3000';
  
  app.get("/api/viral-bot/stats", async (req, res) => {
    try {
      const response = await fetch(`${VIRAL_BOT_API_URL}/api/stats`);
      if (!response.ok) {
        return res.status(response.status).json({ error: "Failed to fetch stats" });
      }
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Viral bot stats proxy error:", error);
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  app.get("/api/viral-bot/content", async (req, res) => {
    try {
      const response = await fetch(`${VIRAL_BOT_API_URL}/api/content`);
      if (!response.ok) {
        return res.status(response.status).json({ error: "Failed to fetch content" });
      }
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Viral bot content proxy error:", error);
      res.status(500).json({ error: "Failed to fetch content" });
    }
  });

  app.get("/api/viral-bot/analytics", async (req, res) => {
    try {
      const response = await fetch(`${VIRAL_BOT_API_URL}/api/analytics`);
      if (!response.ok) {
        return res.status(response.status).json({ error: "Failed to fetch analytics" });
      }
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Viral bot analytics proxy error:", error);
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });

  app.get("/api/viral-bot/search-logs", async (req, res) => {
    try {
      const response = await fetch(`${VIRAL_BOT_API_URL}/api/search-logs`);
      if (!response.ok) {
        return res.status(response.status).json({ error: "Failed to fetch search logs" });
      }
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Viral bot search logs proxy error:", error);
      res.status(500).json({ error: "Failed to fetch search logs" });
    }
  });

  app.get("/api/viral-bot/health", async (req, res) => {
    try {
      const response = await fetch(`${VIRAL_BOT_API_URL}/api/health`);
      if (!response.ok) {
        return res.status(response.status).json({ status: "unknown", botRunning: false });
      }
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Viral bot health proxy error:", error);
      res.json({ status: "unknown", botRunning: false });
    }
  });

  // ============ VIRAL BOT ANALYTICS (READ-ONLY) ============
  
  // POST /api/events - Receive analytics events from bots
  app.post("/api/events", async (req, res) => {
    try {
      // Verify authorization
      const authHeader = req.headers.authorization;
      const expectedKey = process.env.MASTERMIND_BOT_KEY || "";
      if (!authHeader || !authHeader.startsWith("Bearer ") || authHeader.slice(7) !== expectedKey) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const payload = req.body;
      
      // Validate required fields
      if (!payload.source || !payload.event_type || !payload.platform || !payload.telegram_id) {
        res.status(400).json({ error: "Missing required fields" });
        return;
      }

      // Store event
      await storage.createAnalyticsEvent({
        source: payload.source,
        platform: payload.platform,
        eventType: payload.event_type,
        telegramId: payload.telegram_id,
        username: payload.username || null,
        payload: payload,
      });

      res.status(201).json({ success: true });
    } catch (error) {
      console.error("Event storage error:", error);
      res.status(500).json({ error: "Failed to store event" });
    }
  });

  // GET /api/vb-telegram/overview - Global overview stats
  app.get("/api/vb-telegram/overview", async (req, res) => {
    try {
      const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
      const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;

      // Get total searches (search_started events)
      const totalSearches = await storage.getAnalyticsEventCount({
        source: "vb-telegram",
        eventType: "search_started",
        startDate,
        endDate,
      });

      // Get unique users
      const searchEvents = await storage.getAnalyticsEvents({
        source: "vb-telegram",
        eventType: "search_started",
        startDate,
        endDate,
        limit: 10000, // Get all to count unique users
      });
      const uniqueUsers = new Set(searchEvents.map(e => e.telegramId)).size;

      // Get platform distribution
      const instagramCount = await storage.getAnalyticsEventCount({
        source: "vb-telegram",
        platform: "instagram",
        eventType: "search_started",
        startDate,
        endDate,
      });
      const tiktokCount = await storage.getAnalyticsEventCount({
        source: "vb-telegram",
        platform: "tiktok",
        eventType: "search_started",
        startDate,
        endDate,
      });
      const youtubeCount = await storage.getAnalyticsEventCount({
        source: "vb-telegram",
        platform: "youtube",
        eventType: "search_started",
        startDate,
        endDate,
      });

      res.json({
        totalSearches,
        activeUsers: uniqueUsers,
        platformDistribution: {
          instagram: instagramCount,
          tiktok: tiktokCount,
          youtube: youtubeCount,
        },
      });
    } catch (error) {
      console.error("Overview error:", error);
      res.status(500).json({ error: "Failed to fetch overview" });
    }
  });

  // GET /api/vb-telegram/platforms - Per-platform stats
  app.get("/api/vb-telegram/platforms", async (req, res) => {
    try {
      const platform = req.query.platform as string | undefined;
      const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
      const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;

      const platforms = platform ? [platform] : ["instagram", "tiktok", "youtube"];
      const results: any = {};

      for (const p of platforms) {
        const searches = await storage.getAnalyticsEvents({
          source: "vb-telegram",
          platform: p,
          eventType: "search_started",
          startDate,
          endDate,
          limit: 1000,
        });

        const completed = await storage.getAnalyticsEventCount({
          source: "vb-telegram",
          platform: p,
          eventType: "search_finished",
          startDate,
          endDate,
        });

        // Get top keywords
        const keywordCounts = new Map<string, number>();
        searches.forEach(event => {
          const keyword = (event.payload as any)?.keyword || "unknown";
          keywordCounts.set(keyword, (keywordCounts.get(keyword) || 0) + 1);
        });
        const topKeywords = Array.from(keywordCounts.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10)
          .map(([keyword, count]) => ({ keyword, count }));

        // Calculate average results
        const resultsReadyEvents = await storage.getAnalyticsEvents({
          source: "vb-telegram",
          platform: p,
          eventType: "search_results_ready",
          startDate,
          endDate,
          limit: 1000,
        });
        const avgResults = resultsReadyEvents.length > 0
          ? resultsReadyEvents.reduce((sum, e) => sum + ((e.payload as any)?.totalResults || 0), 0) / resultsReadyEvents.length
          : 0;

        results[p] = {
          searches: searches.length,
          completed,
          completionRate: searches.length > 0 ? (completed / searches.length) * 100 : 0,
          topKeywords,
          avgResults: Math.round(avgResults * 100) / 100,
        };
      }

      res.json(results);
    } catch (error) {
      console.error("Platforms error:", error);
      res.status(500).json({ error: "Failed to fetch platform stats" });
    }
  });

  // GET /api/vb-telegram/users - User activity
  app.get("/api/vb-telegram/users", async (req, res) => {
    try {
      const telegramId = req.query.telegramId ? parseInt(req.query.telegramId as string) : undefined;
      const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
      const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;

      if (telegramId) {
        // Get user-specific events
        const events = await storage.getAnalyticsEvents({
          source: "vb-telegram",
          telegramId,
          startDate,
          endDate,
          limit: 1000,
        });

        // Group by search session (search_started to search_finished/cancelled)
        const sessions: any[] = [];
        let currentSession: any = null;

        events.forEach(event => {
          if (event.eventType === "search_started") {
            currentSession = {
              id: event.id,
              platform: event.platform,
              keyword: (event.payload as any)?.keyword,
              language: (event.payload as any)?.language,
              minViews: (event.payload as any)?.minViews,
              startedAt: event.createdAt,
              events: [event],
            };
          } else if (currentSession) {
            currentSession.events.push(event);
            if (event.eventType === "search_finished" || event.eventType === "search_cancelled") {
              sessions.push(currentSession);
              currentSession = null;
            }
          }
        });

        res.json({ userId: telegramId, sessions });
      } else {
        // Get all users with activity
        const allEvents = await storage.getAnalyticsEvents({
          source: "vb-telegram",
          eventType: "search_started",
          startDate,
          endDate,
          limit: 10000,
        });

        const userMap = new Map<number, any>();
        allEvents.forEach(event => {
          if (!userMap.has(event.telegramId)) {
            userMap.set(event.telegramId, {
              telegramId: event.telegramId,
              username: event.username,
              searchCount: 0,
              platforms: new Set(),
            });
          }
          const user = userMap.get(event.telegramId)!;
          user.searchCount++;
          user.platforms.add(event.platform);
        });

        const users = Array.from(userMap.values()).map(u => ({
          ...u,
          platforms: Array.from(u.platforms),
        }));

        res.json(users);
      }
    } catch (error) {
      console.error("Users error:", error);
      res.status(500).json({ error: "Failed to fetch user data" });
    }
  });

  // GET /api/vb-telegram/searches - Search history
  app.get("/api/vb-telegram/searches", async (req, res) => {
    try {
      const platform = req.query.platform as string | undefined;
      const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
      const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;

      const events = await storage.getAnalyticsEvents({
        source: "vb-telegram",
        platform,
        eventType: "search_started",
        startDate,
        endDate,
        limit,
      });

      const searches = events.map(event => ({
        id: event.id,
        telegramId: event.telegramId,
        username: event.username,
        platform: event.platform,
        keyword: (event.payload as any)?.keyword,
        language: (event.payload as any)?.language,
        minViews: (event.payload as any)?.minViews,
        timestamp: event.createdAt,
        payload: event.payload,
      }));

      res.json(searches);
    } catch (error) {
      console.error("Searches error:", error);
      res.status(500).json({ error: "Failed to fetch searches" });
    }
  });

  // GET /api/vb-telegram/usage - API usage and cost estimates
  app.get("/api/vb-telegram/usage", async (req, res) => {
    try {
      const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
      const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;

      // Count searches per platform (each search = 1 API call)
      const instagramSearches = await storage.getAnalyticsEventCount({
        source: "vb-telegram",
        platform: "instagram",
        eventType: "search_started",
        startDate,
        endDate,
      });
      const tiktokSearches = await storage.getAnalyticsEventCount({
        source: "vb-telegram",
        platform: "tiktok",
        eventType: "search_started",
        startDate,
        endDate,
      });
      const youtubeSearches = await storage.getAnalyticsEventCount({
        source: "vb-telegram",
        platform: "youtube",
        eventType: "search_started",
        startDate,
        endDate,
      });

      // Estimate costs (placeholder values - adjust based on actual Apify pricing)
      // Instagram: typically ~$0.001-0.01 per search
      // TikTok: varies
      // YouTube: varies
      const instagramCost = instagramSearches * 0.005; // Placeholder
      const tiktokCost = tiktokSearches * 0.002; // Placeholder
      const youtubeCost = youtubeSearches * 0.005; // Placeholder

      res.json({
        platformUsage: {
          instagram: { searches: instagramSearches, estimatedCost: instagramCost },
          tiktok: { searches: tiktokSearches, estimatedCost: tiktokCost },
          youtube: { searches: youtubeSearches, estimatedCost: youtubeCost },
        },
        totalSearches: instagramSearches + tiktokSearches + youtubeSearches,
        totalEstimatedCost: instagramCost + tiktokCost + youtubeCost,
      });
    } catch (error) {
      console.error("Usage error:", error);
      res.status(500).json({ error: "Failed to fetch usage stats" });
    }
  });

  return httpServer;
}
