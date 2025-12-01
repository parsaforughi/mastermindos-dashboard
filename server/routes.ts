import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

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
      
      res.json(message);
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

  return httpServer;
}
