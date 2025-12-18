import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@shared/schema";
import { eq, desc, sql, count, and, gte, lte } from "drizzle-orm";
import { config } from "dotenv";
import { resolve } from "path";

// Load .env file from project root (only in development)
// In production, environment variables are set directly
// Use process.cwd() which works in both ESM and CommonJS contexts
if (process.env.NODE_ENV !== "production") {
  try {
    config({ path: resolve(process.cwd(), ".env") });
  } catch (error) {
    // Silently fail if .env file doesn't exist (e.g., in production)
  }
}

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.warn("WARNING: DATABASE_URL not set. Database operations will fail.");
}

// Validate DATABASE_URL format for Neon
let sqlClient;
try {
  if (databaseUrl && databaseUrl.startsWith("postgresql://")) {
    sqlClient = neon(databaseUrl);
  } else {
    console.warn("WARNING: Invalid DATABASE_URL format. Using empty string (operations will fail).");
    sqlClient = neon("");
  }
} catch (error) {
  console.error("ERROR: Failed to initialize database client:", error);
  sqlClient = neon("");
}

export const db = drizzle(sqlClient, { schema });

export interface IStorage {
  // Users
  getUser(id: string): Promise<schema.User | undefined>;
  getUserByUsername(username: string): Promise<schema.User | undefined>;
  createUser(user: schema.InsertUser): Promise<schema.User>;

  // Sessions
  createSession(session: schema.InsertSession): Promise<schema.Session>;
  getSession(id: string): Promise<schema.Session | undefined>;
  getDefaultSession(): Promise<schema.Session>;
  updateSession(id: string, data: Partial<schema.Session>): Promise<schema.Session>;
  getSessionsByUser(userId: string): Promise<schema.Session[]>;

  // Conversations
  createConversation(conv: schema.InsertConversation): Promise<schema.Conversation>;
  getConversation(id: string): Promise<schema.Conversation | undefined>;
  getAllConversations(): Promise<schema.Conversation[]>;
  getConversationsBySession(sessionId: string): Promise<schema.Conversation[]>;
  updateConversation(id: string, data: Partial<schema.Conversation>): Promise<schema.Conversation>;
  getConversationCount(): Promise<number>;

  // Messages
  createMessage(msg: schema.InsertMessage): Promise<schema.Message>;
  getMessagesByConversation(conversationId: string): Promise<schema.Message[]>;
  getMessageCount(): Promise<number>;
  getRecentMessages(limit: number): Promise<schema.Message[]>;

  // Logs
  createLog(log: schema.InsertLog): Promise<schema.Log>;
  getLogsBySession(sessionId: string, limit?: number): Promise<schema.Log[]>;
  getAllLogs(limit?: number): Promise<schema.Log[]>;

  // Stats
  getStats(): Promise<{
    totalMessages: number;
    totalConversations: number;
    activeUsers: number;
    errorCount: number;
  }>;

  // Analytics Events
  createAnalyticsEvent(event: schema.InsertAnalyticsEvent): Promise<schema.AnalyticsEvent>;
  getAnalyticsEvents(filters?: {
    source?: string;
    platform?: string;
    eventType?: string;
    telegramId?: number;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
  }): Promise<schema.AnalyticsEvent[]>;
  getAnalyticsEventCount(filters?: {
    source?: string;
    platform?: string;
    eventType?: string;
    startDate?: Date;
    endDate?: Date;
  }): Promise<number>;
}

export class DrizzleStorage implements IStorage {
  async getUser(id: string): Promise<schema.User | undefined> {
    const result = await db.query.users.findFirst({
      where: eq(schema.users.id, id),
    });
    return result;
  }

  async getUserByUsername(username: string): Promise<schema.User | undefined> {
    const result = await db.query.users.findFirst({
      where: eq(schema.users.username, username),
    });
    return result;
  }

  async createUser(user: schema.InsertUser): Promise<schema.User> {
    const [result] = await db.insert(schema.users).values(user).returning();
    return result;
  }

  async createSession(session: schema.InsertSession): Promise<schema.Session> {
    const [result] = await db.insert(schema.sessions).values(session).returning();
    return result;
  }

  async getSession(id: string): Promise<schema.Session | undefined> {
    const result = await db.query.sessions.findFirst({
      where: eq(schema.sessions.id, id),
    });
    return result;
  }

  async getDefaultSession(): Promise<schema.Session> {
    let session = await db.query.sessions.findFirst({
      orderBy: desc(schema.sessions.createdAt),
    });
    
    if (!session) {
      [session] = await db.insert(schema.sessions).values({
        userId: "default",
        model: "gpt-4o",
        systemPrompt: "You are an expert educational assistant designed to explain complex topics in simple terms.",
        temperature: "0.7",
        active: true,
      }).returning();
    }
    
    return session;
  }

  async updateSession(id: string, data: Partial<schema.Session>): Promise<schema.Session> {
    const [result] = await db
      .update(schema.sessions)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.sessions.id, id))
      .returning();
    return result;
  }

  async getSessionsByUser(userId: string): Promise<schema.Session[]> {
    const results = await db.query.sessions.findMany({
      where: eq(schema.sessions.userId, userId),
    });
    return results;
  }

  async createConversation(conv: schema.InsertConversation): Promise<schema.Conversation> {
    const [result] = await db.insert(schema.conversations).values(conv).returning();
    return result;
  }

  async getConversation(id: string): Promise<schema.Conversation | undefined> {
    const result = await db.query.conversations.findFirst({
      where: eq(schema.conversations.id, id),
    });
    return result;
  }

  async getAllConversations(): Promise<schema.Conversation[]> {
    const results = await db.query.conversations.findMany({
      orderBy: desc(schema.conversations.updatedAt),
    });
    return results;
  }

  async getConversationsBySession(sessionId: string): Promise<schema.Conversation[]> {
    const results = await db.query.conversations.findMany({
      where: eq(schema.conversations.sessionId, sessionId),
      orderBy: desc(schema.conversations.updatedAt),
    });
    return results;
  }

  async updateConversation(id: string, data: Partial<schema.Conversation>): Promise<schema.Conversation> {
    const [result] = await db
      .update(schema.conversations)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.conversations.id, id))
      .returning();
    return result;
  }

  async getConversationCount(): Promise<number> {
    const result = await db.select({ count: count() }).from(schema.conversations);
    return result[0]?.count || 0;
  }

  async createMessage(msg: schema.InsertMessage): Promise<schema.Message> {
    const [result] = await db.insert(schema.messages).values(msg).returning();
    return result;
  }

  async getMessagesByConversation(conversationId: string): Promise<schema.Message[]> {
    const results = await db.query.messages.findMany({
      where: eq(schema.messages.conversationId, conversationId),
      orderBy: schema.messages.createdAt,
    });
    return results;
  }

  async getMessageCount(): Promise<number> {
    const result = await db.select({ count: count() }).from(schema.messages);
    return result[0]?.count || 0;
  }

  async getRecentMessages(limit: number): Promise<schema.Message[]> {
    const results = await db.query.messages.findMany({
      orderBy: desc(schema.messages.createdAt),
      limit,
    });
    return results;
  }

  async createLog(log: schema.InsertLog): Promise<schema.Log> {
    const [result] = await db.insert(schema.logs).values(log).returning();
    return result;
  }

  async getLogsBySession(sessionId: string, limit = 50): Promise<schema.Log[]> {
    const results = await db.query.logs.findMany({
      where: eq(schema.logs.sessionId, sessionId),
      orderBy: desc(schema.logs.createdAt),
      limit,
    });
    return results;
  }

  async getAllLogs(limit = 50): Promise<schema.Log[]> {
    const results = await db.query.logs.findMany({
      orderBy: desc(schema.logs.createdAt),
      limit,
    });
    return results;
  }

  async getStats(): Promise<{
    totalMessages: number;
    totalConversations: number;
    activeUsers: number;
    errorCount: number;
  }> {
    const [messageResult] = await db.select({ count: count() }).from(schema.messages);
    const [convResult] = await db.select({ count: count() }).from(schema.conversations);
    const [errorResult] = await db
      .select({ count: count() })
      .from(schema.logs)
      .where(eq(schema.logs.type, "error"));

    return {
      totalMessages: messageResult?.count || 0,
      totalConversations: convResult?.count || 0,
      activeUsers: convResult?.count || 0,
      errorCount: errorResult?.count || 0,
    };
  }

  async createAnalyticsEvent(event: schema.InsertAnalyticsEvent): Promise<schema.AnalyticsEvent> {
    const [result] = await db.insert(schema.analyticsEvents).values(event).returning();
    return result;
  }

  async getAnalyticsEvents(filters?: {
    source?: string;
    platform?: string;
    eventType?: string;
    telegramId?: number;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
  }): Promise<schema.AnalyticsEvent[]> {
    const conditions = [];
    if (filters?.source) {
      conditions.push(eq(schema.analyticsEvents.source, filters.source));
    }
    if (filters?.platform) {
      conditions.push(eq(schema.analyticsEvents.platform, filters.platform));
    }
    if (filters?.eventType) {
      conditions.push(eq(schema.analyticsEvents.eventType, filters.eventType));
    }
    if (filters?.telegramId) {
      conditions.push(eq(schema.analyticsEvents.telegramId, filters.telegramId));
    }
    if (filters?.startDate) {
      conditions.push(gte(schema.analyticsEvents.createdAt, filters.startDate));
    }
    if (filters?.endDate) {
      conditions.push(lte(schema.analyticsEvents.createdAt, filters.endDate));
    }

    let query = db.select().from(schema.analyticsEvents);
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    query = query.orderBy(desc(schema.analyticsEvents.createdAt));
    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    return await query;
  }

  async getAnalyticsEventCount(filters?: {
    source?: string;
    platform?: string;
    eventType?: string;
    startDate?: Date;
    endDate?: Date;
  }): Promise<number> {
    const conditions = [];
    if (filters?.source) {
      conditions.push(eq(schema.analyticsEvents.source, filters.source));
    }
    if (filters?.platform) {
      conditions.push(eq(schema.analyticsEvents.platform, filters.platform));
    }
    if (filters?.eventType) {
      conditions.push(eq(schema.analyticsEvents.eventType, filters.eventType));
    }
    if (filters?.startDate) {
      conditions.push(gte(schema.analyticsEvents.createdAt, filters.startDate));
    }
    if (filters?.endDate) {
      conditions.push(lte(schema.analyticsEvents.createdAt, filters.endDate));
    }

    let query = db.select({ count: count() }).from(schema.analyticsEvents);
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const result = await query;
    return result[0]?.count || 0;
  }
}

export const storage = new DrizzleStorage();
