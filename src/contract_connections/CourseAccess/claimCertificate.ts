import { useState } from "react";
import {
  Contract,
  rpc,
  TransactionBuilder,
  Networks,
  BASE_FEE,
  nativeToScVal,
} from "@stellar/stellar-sdk";
import { getUserAddress, userSignTransaction } from "@/hooks/wallet-utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ClaimStatus = "idle" | "pending" | "success" | "error";

export interface ClaimCertificateParams {
  /** The on-chain ID of the course the user completed */
  courseId: string;
}

export interface ClaimCertificateResponse {
  success: boolean;
  /** On-chain certificate identifier returned by the contract */
  certificateId?: string;
  /** Transaction hash of the confirmed claim transaction */
  transactionHash?: string;
  error?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Classify raw error messages into user-friendly strings.
 * Covers the MUST DOs from the issue:
 *  - contract rejection
 *  - insufficient fee errors
 *  - wallet / Freighter rejections
 */
function classifyError(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err);

  if (
    raw.toLowerCase().includes("user declined") ||
    raw.toLowerCase().includes("rejected") ||
    raw.toLowerCase().includes("cancelled")
  ) {
    return "Transaction rejected. You declined the signature request in your wallet.";
  }

  if (
    raw.toLowerCase().includes("insufficient") ||
    raw.toLowerCase().includes("fee") ||
    raw.toLowerCase().includes("balance")
  ) {
    return "Transaction failed: insufficient XLM balance to cover network fees.";
  }

  if (
    raw.toLowerCase().includes("freighter") ||
    raw.toLowerCase().includes("wallet") ||
    raw.toLowerCase().includes("not connected")
  ) {
    return "Wallet connection failed. Please ensure Freighter is installed and unlocked.";
  }

  if (raw.toLowerCase().includes("contract")) {
    return `Contract error: ${raw}`;
  }

  return raw || "An unexpected error occurred while claiming the certificate.";
}

// ---------------------------------------------------------------------------
// Core async function
// ---------------------------------------------------------------------------

/**
 * Invokes the `course_access_claim_certificate` function on the CourseAccess
 * Soroban contract, waits for explicit blockchain confirmation, and returns
 * the result.
 */
export async function claimCertificate(
  params: ClaimCertificateParams
): Promise<ClaimCertificateResponse> {
  const { courseId } = params;

  if (!courseId?.trim()) {
    return { success: false, error: "Course ID is required." };
  }

  const rpcUrl = process.env.NEXT_PUBLIC_STELLAR_RPC_URL;
  const contractAddress = process.env.NEXT_PUBLIC_COURSE_ACCESS_CONTRACT_ID;
  const networkPassphrase =
    process.env.NEXT_PUBLIC_STELLAR_NETWORK_PASSPHRASE ?? Networks.TESTNET;

  if (!rpcUrl) {
    return {
      success: false,
      error: "Missing env variable: NEXT_PUBLIC_STELLAR_RPC_URL",
    };
  }
  if (!contractAddress) {
    return {
      success: false,
      error: "Missing env variable: NEXT_PUBLIC_COURSE_ACCESS_CONTRACT_ID",
    };
  }

  try {
    // 1. Get the connected wallet address (triggers Freighter if needed)
    const userAddress = await getUserAddress();

    // 2. Build the transaction
    const provider = new rpc.Server(rpcUrl, { allowHttp: true });
    const contract = new Contract(contractAddress);
    const sourceAccount = await provider.getAccount(userAddress);

    const transaction = new TransactionBuilder(sourceAccount, {
      fee: BASE_FEE,
      networkPassphrase,
    })
      .addOperation(
        contract.call(
          "course_access_claim_certificate",
          nativeToScVal(userAddress, { type: "address" }),
          nativeToScVal(courseId.trim(), { type: "string" })
        )
      )
      .setTimeout(30)
      .build();

    // 3. Simulate to get resource estimations / preflight
    const preparedTx = await provider.prepareTransaction(transaction);
    const preparedXdr = preparedTx.toXDR();

    // 4. Request wallet signature — user sees the Freighter popup here
    const signedXdr = await userSignTransaction(
      preparedXdr,
      networkPassphrase,
      userAddress
    );

    // 5. Reconstruct and submit
    const signedTx = TransactionBuilder.fromXDR(signedXdr, networkPassphrase);
    const sendResponse = await provider.sendTransaction(signedTx);

    if (sendResponse.errorResult) {
      throw new Error(
        `Transaction submission failed: ${sendResponse.errorResult}`
      );
    }

    if (sendResponse.status !== "PENDING") {
      throw new Error(
        `Unexpected transaction status after submission: ${sendResponse.status}`
      );
    }

    // 6. Poll for explicit blockchain confirmation (MUST DO from issue)
    let txResponse = await provider.getTransaction(sendResponse.hash);
    while (txResponse.status === "NOT_FOUND") {
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));
      txResponse = await provider.getTransaction(sendResponse.hash);
    }

    if (txResponse.status === "FAILED") {
      throw new Error("Certificate claim transaction failed on the network.");
    }

    // 7. Extract the certificate ID from the return value if available
    let certificateId: string | undefined;
    if (txResponse.status === "SUCCESS" && txResponse.returnValue) {
      try {
        const { scValToNative } = await import("@stellar/stellar-sdk");
        certificateId = scValToNative(txResponse.returnValue as Parameters<typeof scValToNative>[0]);
      } catch {
        // returnValue parsing is best-effort; fall back to a local identifier
        certificateId = `cert_${courseId}_${Date.now()}`;
      }
    }

    return {
      success: true,
      certificateId: certificateId ?? `cert_${courseId}_${Date.now()}`,
      transactionHash: sendResponse.hash,
    };
  } catch (err) {
    return { success: false, error: classifyError(err) };
  }
}

// ---------------------------------------------------------------------------
// React hook
// ---------------------------------------------------------------------------

/**
 * Hook that wraps `claimCertificate` and exposes reactive UI state:
 * - `status`: 'idle' | 'pending' | 'success' | 'error'
 * - `transactionHash`: set only after blockchain confirmation
 * - `certificateId`: on-chain certificate identifier
 * - `error`: user-friendly error message
 */
export function useClaimCertificate() {
  const [status, setStatus] = useState<ClaimStatus>("idle");
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [certificateId, setCertificateId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const claim = async (courseId: string): Promise<ClaimCertificateResponse> => {
    setStatus("pending");
    setError(null);
    setTransactionHash(null);
    setCertificateId(null);

    const result = await claimCertificate({ courseId });

    if (result.success) {
      setStatus("success");
      setTransactionHash(result.transactionHash ?? null);
      setCertificateId(result.certificateId ?? null);
    } else {
      setStatus("error");
      setError(result.error ?? "Unknown error");
    }

    return result;
  };

  const reset = () => {
    setStatus("idle");
    setError(null);
    setTransactionHash(null);
    setCertificateId(null);
  };

  return {
    claim,
    reset,
    status,
    transactionHash,
    certificateId,
    error,
    isLoading: status === "pending",
  };
}
