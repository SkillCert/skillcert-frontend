import { useState, useCallback } from "react";

interface Course {
  id: string;
  title: string;
  description: string;
  creator: string;
  price: number;
  category: string;
  language: string;
  thumbnail_url: string;
  published: boolean;
}

interface GetCoursesByInstructorResponse {
  success: boolean;
  courses?: Course[];
  error?: string;
}

export async function getCoursesByInstructor(
  instructorAddress: string
): Promise<GetCoursesByInstructorResponse> {
  if (!instructorAddress.trim()) {
    return { success: false, error: "Instructor address cannot be empty" };
  }

  try {
    // In a real implementation, this would call the actual contract
    const courses = await simulateContractCall(instructorAddress);
    return {
      success: true,
      courses,
    };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown error occurred";
    return { success: false, error: message };
  }
}

/**
 * This would be replaced with the actual contract call in production
 */
async function simulateContractCall(
  instructorAddress: string
): Promise<Course[]> {
  await new Promise((r) => setTimeout(r, 800));

  if (instructorAddress === "0x0000000000000000000000000000000000000000") {
    return [];
  }

  // Sample data
  return [
    {
      id: "course-001",
      title: "Introduction to Blockchain Development",
      description: "Learn the fundamentals of blockchain development",
      creator: instructorAddress,
      price: 0.05,
      category: "Development",
      language: "English",
      thumbnail_url: "https://example.com/thumbnail1.jpg",
      published: true,
    },
    {
      id: "course-002",
      title: "Smart Contract Programming",
      description: "Advanced techniques for smart contract development",
      creator: instructorAddress,
      price: 0.08,
      category: "Development",
      language: "English",
      thumbnail_url: "https://example.com/thumbnail2.jpg",
      published: true,
    },
  ];
}

export function useGetCoursesByInstructor() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[] | null>(null);

  const execute = useCallback(async (instructorAddress: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getCoursesByInstructor(instructorAddress);

      if (response.success && response.courses) {
        setCourses(response.courses);
        return response.courses;
      } else {
        setError(response.error || "Failed to retrieve courses");
        return [];
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(message);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { execute, isLoading, error, courses };
}
