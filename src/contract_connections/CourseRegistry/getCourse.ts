import SorobanClient from "@stellar/stellar-sdk";

export interface Course {
  id: string;
  title: string;
  description?: string;
  creator: string;
  price?: string;
  category?: string;
  language?: string;
  thumbnail_url?: string;
  published: boolean;
}

export async function getCourse(courseId: string): Promise<Course | null> {
  if (!courseId) throw new Error("Course ID is required");

  const rpcUrl = process.env.NEXT_PUBLIC_SOROBAN_RPC_URL;
  const contractId = process.env.NEXT_PUBLIC_COURSE_REGISTRY_CONTRACT_ID;

  if (!rpcUrl) {
    console.error("Missing NEXT_PUBLIC_SOROBAN_RPC_URL environment variable.");
    return null;
  }
  if (!contractId) {
    console.error(
      "Missing NEXT_PUBLIC_COURSE_REGISTRY_CONTRACT_ID environment variable."
    );
    return null;
  }

  try {
    const server = new SorobanClient.Server(rpcUrl);

    const result = await server.getContractValue(
      contractId,
      "course_registry_get_course",
      [courseId]
    );

    if (
      !result ||
      typeof result.title !== "string" ||
      typeof result.creator !== "string" ||
      typeof result.published !== "boolean"
    ) {
      console.error("Unexpected contract result shape:", result);
      return null;
    }

    return {
      id: courseId,
      title: result.title,
      description: result.description ?? "",
      creator: result.creator,
      price: result.price ?? "",
      category: result.category ?? "",
      language: result.language ?? "",
      thumbnail_url: result.thumbnail_url ?? "",
      published: result.published,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error instanceof Error) {
      console.error("Error fetching course from contract:", error.message);
    } else {
      console.error("Unknown error fetching course from contract:", error);
    }
    return null;
  }
}
