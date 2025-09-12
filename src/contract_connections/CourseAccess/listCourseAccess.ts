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
    throw new Error("Missing NEXT_PUBLIC_SOROBAN_RPC_URL environment variable.");
  }
  
  if (!contractId) {
    throw new Error("Missing NEXT_PUBLIC_COURSE_ACCESS_CONTRACT_ID environment variable.");
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
      throw new Error("Unexpected contract result shape");
    }

    // Validate the result structure
    if (!result.course || !Array.isArray(result.users)) {
      throw new Error("Invalid CourseUsers structure");
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
        return {
          course: courseId,
          users: [],
        };
      }
      throw new Error(`Error fetching course access from contract: ${error.message}`);
    } else {
      throw new Error("Unknown error fetching course access from contract");
    }
    return null;
  }
}
