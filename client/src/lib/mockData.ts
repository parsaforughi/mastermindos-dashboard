import { User, Bot, AlertCircle, CheckCircle2, Clock, MessageSquare, Zap, Terminal, Search, Settings, Power, RefreshCw, Trash2 } from "lucide-react";

export interface Message {
  id: string;
  conversationId: string;
  sender: 'user' | 'bot';
  content: string;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'error';
}

export interface Conversation {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  lastMessage: string;
  unreadCount: number;
  status: 'active' | 'idle' | 'archived';
  updatedAt: Date;
}

export interface LogEntry {
  id: string;
  timestamp: Date;
  type: 'info' | 'error' | 'warning' | 'success' | 'system';
  message: string;
  details?: string;
}

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    userId: 'u1',
    userName: 'Alice Freeman',
    lastMessage: 'How does the pricing tier work?',
    unreadCount: 2,
    status: 'active',
    updatedAt: new Date(Date.now() - 1000 * 60 * 2),
  },
  {
    id: '2',
    userId: 'u2',
    userName: 'Bob Smith',
    lastMessage: 'I need help connecting the API.',
    unreadCount: 0,
    status: 'idle',
    updatedAt: new Date(Date.now() - 1000 * 60 * 60),
  },
  {
    id: '3',
    userId: 'u3',
    userName: 'Charlie Davis',
    lastMessage: 'Thanks, that clarified everything!',
    unreadCount: 0,
    status: 'archived',
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: '4',
    userId: 'u4',
    userName: 'Diana Prince',
    lastMessage: 'Is there a trial period?',
    unreadCount: 1,
    status: 'active',
    updatedAt: new Date(Date.now() - 1000 * 60 * 5),
  },
];

export const MOCK_MESSAGES: Message[] = [
  {
    id: 'm1',
    conversationId: '1',
    sender: 'user',
    content: 'Hi, I am looking at the enterprise plan.',
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
  },
  {
    id: 'm2',
    conversationId: '1',
    sender: 'bot',
    content: 'Hello Alice! I can certainly explain the enterprise plan details. What specific features are you interested in?',
    timestamp: new Date(Date.now() - 1000 * 60 * 9),
  },
  {
    id: 'm3',
    conversationId: '1',
    sender: 'user',
    content: 'How does the pricing tier work?',
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
  },
];

export const MOCK_LOGS: LogEntry[] = [
  { id: 'l1', timestamp: new Date(), type: 'system', message: 'System initialized', details: 'v2.4.0-stable' },
  { id: 'l2', timestamp: new Date(Date.now() - 5000), type: 'info', message: 'Incoming webhook received', details: 'Source: Stripe' },
  { id: 'l3', timestamp: new Date(Date.now() - 12000), type: 'success', message: 'Message delivered', details: 'Conversation #1' },
  { id: 'l4', timestamp: new Date(Date.now() - 25000), type: 'warning', message: 'Response latency high', details: '1250ms' },
  { id: 'l5', timestamp: new Date(Date.now() - 40000), type: 'info', message: 'Intent detected: PRICING_QUERY', details: 'Confidence: 0.98' },
  { id: 'l6', timestamp: new Date(Date.now() - 60000), type: 'error', message: 'Failed to sync user context', details: 'TimeoutError' },
];

export const MOCK_STATS = {
  totalMessages: 14205,
  dailyMessages: 342,
  responseRate: 98.5,
  avgResponseTime: '0.8s',
  activeUsers: 124,
  errorRate: 0.4,
};
