import { useState, useCallback } from "react";

interface RevokeAccessResponse {
  success: boolean;
  error?: string;
}
export async function revokeCourseAccess(
  user: string,
  courseId: string
): Promise<RevokeAccessResponse> {
  if (!user.trim() || !courseId.trim()) {
    return {
      success: false,
      error: "User ID and Course ID cannot be empty.",
    };
  }
  try {
    await simulateContractCall(user, courseId);
    return {
      success: true,
    };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown error occurred";
    return {
      success: false,
      error: message,
    };
  }
}

async function simulateContractCall(
  user: string,
  courseId: string
): Promise<RevokeAccessResponse> {
  await new Promise((r) => setTimeout(r, 800));

  if (
    user === "0x0000000000000000000000000000000000000000" ||
    courseId === "0x0000000000000000000000000000000000000000"
  ) {
    return { success: false, error: "Invalid user or course ID." };
  }
  return { success: true };
}

export function useRevokeCourseAccess() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RevokeAccessResponse | null>(null);

  const execute = useCallback(async (user: string, courseId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await revokeCourseAccess(user, courseId);
      setResult(response);
      if (!response.success) {
        setError(response.error || "Failed to revoke access.");
      }
      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(message);
      setResult({ success: false, error: message });
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, result, execute };
}
