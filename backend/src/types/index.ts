/**
 * Shared API response wrapper.
 * T is the shape of the data payload.
 */
export interface ApiResponse<T = unknown> {
  data: T;
  success: boolean;
  message?: string;
}

/** A health-check response. */
export interface HealthResponse {
  status: 'ok';
  timestamp: string;
  uptime: number;
  version: string;
}

/** A generic message item (e.g. for a hello/greeting endpoint). */
export interface MessageResponse {
  message: string;
}

/** A user record. */
export interface User {
  id: number;
  name: string;
  email: string;
}

/** Request body for creating a user. */
export interface CreateUserRequest {
  name: string;
  email: string;
}
