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

interface listUserCoursesResponse {
  success: boolean;
  user?: string;
  courses?: Course[];
  error?: string;
}

export async function listUserCourses(
  user: string
): Promise<listUserCoursesResponse> {
  if (!user.trim()) {
    return {
      success: false,
      error: "User ID cannot be empty.",
    };
  }
  try {
    const courses = await simulateContractCall(user);
    return {
      success: true,
      user,
      courses,
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

async function simulateContractCall(user: string): Promise<Course[]> {
  await new Promise((r) => setTimeout(r, 800));

  if (user === "0x0000000000000000000000000000000000000000") {
    return [];
  }

  return [
    {
      id: "course-001",
      title: "Mastering Machine Learning with Python",
      description:
        "Dive into the world of machine learning with this comprehensive course",
      creator: "John Doe",
      price: 0.2,
      category: "Data Science",
      language: "Spanish",
      thumbnail_url: "https://example.com/thumbnail2.png",
      published: true,
    },
    {
      id: "course-002",
      title: "Web Development with React and Node.js",
      description:
        "Build scalable and efficient web applications with this hands-on course",
      creator: "Jane Smith",
      price: 0.15,
      category: "Web Development",
      language: "French",
      thumbnail_url: "https://example.com/thumbnail3.jpg",
      published: true,
    },
  ];
}

export function useListUserCourses() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);

  const execute = useCallback(async (user: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await listUserCourses(user);
      if (response.success && response.courses) {
        setCourses(response.courses);
        return response.courses;
      } else {
        setError(response.error || "Unknown error occurred");
        return [];
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    courses,
    execute,
  };
}
