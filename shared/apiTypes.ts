/**
 * Shared API Types
 * 
 * Common type definitions used across all API clients and dashboard components
 */

// Common API Response Types
export interface ApiHealthResponse {
  status: string;
  timestamp?: string;
  db?: string;
  [key: string]: any;
}

export interface ApiStatsResponse {
  totalMessages?: number;
  totalConversations?: number;
  activeUsers?: number;
  activeConversations?: number;
  messagesToday?: number;
  errorCount?: number;
  [key: string]: any;
}

export interface ApiErrorResponse {
  error: string;
  message?: string;
  details?: any;
}

// SSE Event Types
export interface SSEEvent {
  type: string;
  data: any;
  timestamp?: string;
}

// Common Pagination
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Common Filter/Sort
export interface FilterParams {
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  [key: string]: any;
}













