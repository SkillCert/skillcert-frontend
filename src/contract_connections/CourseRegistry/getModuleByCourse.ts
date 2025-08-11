import { useState, useCallback } from "react";

interface Module {
  id: string;
  course_id: string;
  position: number;
  title: string;
  created_at: number;
}

interface GetModuleByCourseResponse {
  success: boolean;
  course_id?: string;
  modules?: Module[];
  error?: string;
}

export async function getModuleByCourse(
  courseId: string
): Promise<GetModuleByCourseResponse> {
  if (!courseId.trim()) {
    return {
      success: false,
      error: "Course ID cannot be empty.",
    };
  }
  try {
    const modules = await simulateContractCall(courseId);
    return {
      success: true,
      course_id: courseId,
      modules,
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

async function simulateContractCall(courseId: string): Promise<Module[]> {
  await new Promise((r) => setTimeout(r, 800));

  if (courseId === "non_existent") {
    return [];
  }

  return [
    {
      id: "module-001",
      course_id: courseId,
      position: 1,
      title: "Introduction to the Course",
      created_at: Date.now(),
    },
    {
      id: "module-002",
      course_id: courseId,
      position: 2,
      title: "Advanced Topics",
      created_at: Date.now(),
    },
  ];
}

export function useGetModuleByCourse() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GetModuleByCourseResponse | null>(null);

  const execute = useCallback(async (courseId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getModuleByCourse(courseId);
      setResult(response);
      if (!response.success) {
        setError(response.error || "Failed to retrieve modules.");
      }
      return response.modules;
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