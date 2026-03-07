import type { AuthUser } from "@/context/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export interface AuthTokenResponse {
  token: string;
  user: AuthUser;
}

export interface AuthErrorResponse {
  message: string;
  code?: string;
}

/**
 * Get JWT token for wallet verification
 * Backend validates wallet ID and returns token + user info
 */
export async function getAuthToken(
  walletId: string
): Promise<AuthTokenResponse> {
  const response = await fetch(`${API_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ walletId }),
    credentials: "include",
  });

  if (!response.ok) {
    const error = (await response.json()) as AuthErrorResponse;
    throw new Error(error.message || "Failed to get authentication token");
  }

  return response.json();
}

/**
 * Verify current token is valid
 */
export async function verifyToken(token: string): Promise<AuthUser> {
  const response = await fetch(`${API_URL}/auth/verify`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token verification failed");
  }

  return response.json();
}

/**
 * Attach token to API requests
 */
export function getAuthHeaders(token: string | null): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}
