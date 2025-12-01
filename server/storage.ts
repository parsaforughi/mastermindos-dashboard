import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@shared/schema";
import { eq, desc } from "drizzle-orm";

const sql = neon(process.env.DATABASE_URL || "");
export const db = drizzle(sql, { schema });

export interface IStorage {
  // Users
  getUser(id: string): Promise<schema.User | undefined>;
  getUserByUsername(username: string): Promise<schema.User | undefined>;
  createUser(user: schema.InsertUser): Promise<schema.User>;

  // Sessions
  createSession(session: schema.InsertSession): Promise<schema.Session>;
  getSession(id: string): Promise<schema.Session | undefined>;
  updateSession(id: string, data: Partial<schema.Session>): Promise<schema.Session>;
  getSessionsByUser(userId: string): Promise<schema.Session[]>;

  // Conversations
  createConversation(conv: schema.InsertConversation): Promise<schema.Conversation>;
  getConversation(id: string): Promise<schema.Conversation | undefined>;
  getConversationsBySession(sessionId: string): Promise<schema.Conversation[]>;
  updateConversation(id: string, data: Partial<schema.Conversation>): Promise<schema.Conversation>;

  // Messages
  createMessage(msg: schema.InsertMessage): Promise<schema.Message>;
  getMessagesByConversation(conversationId: string): Promise<schema.Message[]>;

  // Logs
  createLog(log: schema.InsertLog): Promise<schema.Log>;
  getLogsBySession(sessionId: string, limit?: number): Promise<schema.Log[]>;
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
}

export const storage = new DrizzleStorage();
