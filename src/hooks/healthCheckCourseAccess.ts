import SorobanClient from "@stellar/stellar-sdk";

export async function healthCheckCourseAccess(): Promise<string> {
  const rpcUrl = process.env.NEXT_PUBLIC_SOROBAN_RPC_URL;
  const contractId = process.env.NEXT_PUBLIC_COURSE_ACCESS_CONTRACT_ID;

  if (!rpcUrl) throw new Error("Missing NEXT_PUBLIC_SOROBAN_RPC_URL environment variable.");
  if (!contractId) throw new Error("Missing NEXT_PUBLIC_COURSE_ACCESS_CONTRACT_ID environment variable.");

  const server = new SorobanClient.Server(rpcUrl);
  try {
    const result = await server.getContractValue(
      contractId,
      "health_check",
      []
    );
    if (result === "hello") return "hello";
    throw new Error("Unexpected health check response");
  } catch (err) {
    throw new Error("Health check failed: " + (err as Error).message);
  }
}
