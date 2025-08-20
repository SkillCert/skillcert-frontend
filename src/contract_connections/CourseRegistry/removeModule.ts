import { useState, useCallback } from "react";

interface RemoveModuleResponse {
  success: boolean;
  error?: string;
}

export async function removeModule(module_id: string): Promise<RemoveModuleResponse> {
  if (!module_id.trim()) {
    return { success: false, error: "Module ID cannot be empty" };
  }

  try {
    const response = await simulateContractCall(module_id);
    return response.success
      ? { success: true }
      : { success: false, error: response.error };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error occurred";
    return { success: false, error: message };
  }
}

async function simulateContractCall(module_id: string): Promise<RemoveModuleResponse> {
  await new Promise((r) => setTimeout(r, 500));
  if (module_id === "non_existent") {
    return { success: false, error: "Module not found" };
  }
  return { success: true };
}

export function useRemoveModule() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RemoveModuleResponse | null>(null);

  const execute = useCallback(async (module_id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await removeModule(module_id);
      setResult(res);
      if (!res.success) {
        setError(res.error || "Failed to remove module");
      }
      return res;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error occurred";
      setError(message);
      setResult({ success: false, error: message });
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { execute, isLoading, error, result };
}