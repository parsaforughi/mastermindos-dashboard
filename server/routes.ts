import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Sessions endpoints
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
      res.json(session);
    } catch (error) {
      res.status(500).json({ error: "Failed to update session" });
    }
  });

  // Conversations endpoints
  app.post("/api/conversations", async (req, res) => {
    try {
      const { sessionId, userName } = req.body;
      const conversation = await storage.createConversation({
        sessionId,
        userName,
        status: "active",
        unreadCount: 0,
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

  // Messages endpoints
  app.post("/api/messages", async (req, res) => {
    try {
      const { conversationId, sender, content } = req.body;
      const message = await storage.createMessage({
        conversationId,
        sender,
        content,
        status: "sent",
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

  // Logs endpoints
  app.post("/api/logs", async (req, res) => {
    try {
      const { sessionId, type, message, details } = req.body;
      const log = await storage.createLog({
        sessionId,
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

  return httpServer;
}
