/** Generic API response envelope from the backend. */
export interface ApiResponse<T = unknown> {
  data: T;
  success: boolean;
  message?: string;
}

/** Health-check response. */
export interface HealthResponse {
  status: 'ok';
  timestamp: string;
  uptime: number;
  version: string;
}

/** A user record. */
export interface User {
  id: number;
  name: string;
  email: string;
}
