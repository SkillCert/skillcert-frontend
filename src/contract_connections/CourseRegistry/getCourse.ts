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
    throw new Error("Missing NEXT_PUBLIC_SOROBAN_RPC_URL environment variable.");
  }
  if (!contractId) {
    throw new Error("Missing NEXT_PUBLIC_COURSE_REGISTRY_CONTRACT_ID environment variable.");
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
      throw new Error("Unexpected contract result shape");
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
      throw new Error(`Error fetching course from contract: ${error.message}`);
    } else {
      throw new Error("Unknown error fetching course from contract");
    }
  }
}
