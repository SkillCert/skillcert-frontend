/* eslint-disable @typescript-eslint/no-explicit-any */
import SorobanClient from "@stellar/stellar-sdk";

// Define the expected output structure
export interface CourseUser {
  address: string;
}

export interface CourseUsers {
  course: string; // course ID
  users: CourseUser[];
}

export async function listCourseAccess(
  courseId: string
): Promise<CourseUsers | null> {
  if (!courseId) throw new Error("Course ID is required");

  const rpcUrl = process.env.NEXT_PUBLIC_SOROBAN_RPC_URL;
  const contractId = process.env.NEXT_PUBLIC_COURSE_ACCESS_CONTRACT_ID;

  if (!rpcUrl) {
    console.error("Missing NEXT_PUBLIC_SOROBAN_RPC_URL environment variable.");
    return null;
  }
  if (!contractId) {
    console.error(
      "Missing NEXT_PUBLIC_COURSE_ACCESS_CONTRACT_ID environment variable."
    );
    return null;
  }

  try {
    const server = new SorobanClient.Server(rpcUrl);

    const result = await server.getContractValue(
      contractId,
      "course_access_list_course_access",
      [courseId]
    );

    // Handle the expected structure
    if (!result || typeof result !== "object") {
      console.error("Unexpected contract result shape:", result);
      return null;
    }

    // Validate the result structure
    if (!result.course || !Array.isArray(result.users)) {
      console.error("Invalid CourseUsers structure:", result);
      return null;
    }

    return {
      course: result.course,
      users: result.users.map((user: any) => ({
        address: typeof user === "string" ? user : user.address,
      })),
    };
  } catch (error: any) {
    // Handle the specific "User Courses Not Found" error
    if (error instanceof Error) {
      if (error.message.includes("User Courses Not Found")) {
        console.log("No users have access to this course yet.");
        return {
          course: courseId,
          users: [],
        };
      }
      console.error(
        "Error fetching course access from contract:",
        error.message
      );
    } else {
      console.error(
        "Unknown error fetching course access from contract:",
        error
      );
    }
    return null;
  }
}
