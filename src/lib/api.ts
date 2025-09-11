const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

interface FetchOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
}

interface ApiError {
  status: number;
  message: string;
}

export async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { method = "GET", body, headers = {} } = options;

  if (!BASE_URL) {
    throw {
      status: 500,
      message: "Missing BASE_URL configuration",
    } as ApiError;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include", // if using cookies/session
  });

  if (!response.ok) {
    let errorMessage = "API request failed";

    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // fallback if no JSON body
    }

    // ✅ throw structured error instead of plain Error
    throw { status: response.status, message: errorMessage } as ApiError;
  }

  return response.json();
}
