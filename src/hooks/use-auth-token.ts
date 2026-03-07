"use client";

import { useAuth } from "@/context/AuthContext";

/**
 * Hook to get auth token for API requests
 * Returns token and a function to attach it to fetch headers
 */
export function useAuthToken() {
  const { token } = useAuth();

  const getAuthHeaders = (): Record<string, string> => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  };

  return { token, getAuthHeaders };
}
