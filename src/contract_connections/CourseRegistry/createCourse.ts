import { useState } from "react";
import * as StellarSdk from "@stellar/stellar-sdk";
import * as freighterApi from "@stellar/freighter-api";

// Import specific types from Stellar SDK
type StellarAccount = StellarSdk.Account;
type StellarTransaction = StellarSdk.Transaction;

// Type definitions for API compatibility
interface SimulationResponse {
  error?: string;
  results?: unknown[];
  cost?: unknown;
  latestLedger?: number;
}

interface SimulationErrorResponse {
  error: string;
}

interface SubmitResponse {
  status: 'PENDING' | 'DUPLICATE' | 'TRY_AGAIN_LATER' | 'ERROR';
  hash: string;
  errorResult?: {
    result: () => string;
  };
}

interface GetTransactionResponse {
  status: 'NOT_FOUND' | 'SUCCESS' | 'FAILED';
  returnValue?: unknown;
}

interface SorobanServer {
  getAccount: (publicKey: string) => Promise<StellarAccount>;
  simulateTransaction: (transaction: StellarTransaction) => Promise<SimulationResponse>;
  sendTransaction: (transaction: StellarTransaction) => Promise<SubmitResponse>;
  getTransaction: (hash: string) => Promise<GetTransactionResponse>;
}

interface SorobanApiCompat {
  Server: new (rpcUrl: string) => SorobanServer;
  Api: {
    isSimulationError: (response: SimulationResponse) => response is SimulationErrorResponse;
    GetTransactionStatus: {
      NOT_FOUND: 'NOT_FOUND';
      FAILED: 'FAILED';
      SUCCESS: 'SUCCESS';
    };
  };
  assembleTransaction: (transaction: StellarTransaction, simulationResponse: SimulationResponse) => StellarTransaction;
}

// API compatibility layer
const SorobanRpc = ((StellarSdk as Record<string, unknown>).SorobanRpc || (StellarSdk as Record<string, unknown>).Soroban) as SorobanApiCompat;

// Types for the contract interaction
export interface CreateCourseParams {
  title: string;
  description: string;
  price: number;
  category: string;
  level: string;
  duration: string;
}

export interface CreateCourseResponse {
  success: boolean;
  courseId?: string;
  transactionHash?: string;
  error?: string;
}

// Wallet connection utility
async function connectWallet(): Promise<string> {
  try {
    if (!(await freighterApi.isConnected())) {
      await freighterApi.requestAccess();
    }
    // Handle different API versions - Freighter API returns different formats
    const getPublicKeyFn = (freighterApi as Record<string, unknown>).getPublicKey as () => Promise<string | { publicKey: string }>;
    const publicKeyResult = await getPublicKeyFn();
    return typeof publicKeyResult === "string"
      ? publicKeyResult
      : publicKeyResult.publicKey;
  } catch {
    throw new Error(
      "Failed to connect wallet. Please ensure Freighter is installed and unlocked."
    );
  }
}

// Contract interaction hook
export function useCreateCourse() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCourse = async (
    params: CreateCourseParams
  ): Promise<CreateCourseResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      // Validation
      if (!params.title?.trim()) {
        throw new Error("Course title is required");
      }
      if (!params.description?.trim()) {
        throw new Error("Course description is required");
      }
      if (params.price <= 0) {
        throw new Error("Course price must be greater than zero");
      }

      // Get environment variables
      const contractAddress =
        process.env.NEXT_PUBLIC_COURSE_REGISTRY_CONTRACT_ADDRESS;
      const rpcUrl = process.env.NEXT_PUBLIC_STELLAR_RPC_URL;
      const networkPassphrase =
        process.env.NEXT_PUBLIC_STELLAR_NETWORK_PASSPHRASE;

      if (!contractAddress) {
        throw new Error(
          "Contract address not configured in environment variables"
        );
      }
      if (!rpcUrl) {
        throw new Error("RPC URL not configured in environment variables");
      }
      if (!networkPassphrase) {
        throw new Error(
          "Network passphrase not configured in environment variables"
        );
      }

      // Connect wallet and get user public key
      const userPublicKey = await connectWallet();

      // Initialize Soroban server and contract
      const server = new SorobanRpc.Server(rpcUrl);
      const contract = new StellarSdk.Contract(contractAddress);

      // Get the user's account to build the transaction
      const sourceAccount = await server.getAccount(userPublicKey);

      // Convert parameters to Soroban native values
      const titleValue = StellarSdk.nativeToScVal(params.title, {
        type: "string",
      });
      const descriptionValue = StellarSdk.nativeToScVal(params.description, {
        type: "string",
      });
      const priceValue = StellarSdk.nativeToScVal(params.price, {
        type: "u64",
      });
      const categoryValue = StellarSdk.nativeToScVal(params.category, {
        type: "string",
      });
      const levelValue = StellarSdk.nativeToScVal(params.level, {
        type: "string",
      });
      const durationValue = StellarSdk.nativeToScVal(params.duration, {
        type: "string",
      });

      // Build the transaction
      const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase,
      })
        .addOperation(
          contract.call(
            "course_registry_create_course",
            titleValue,
            descriptionValue,
            priceValue,
            categoryValue,
            levelValue,
            durationValue
          )
        )
        .setTimeout(30)
        .build();

      // Simulate the transaction to get resource fees
      const simulationResponse = await server.simulateTransaction(transaction);

      if (SorobanRpc.Api.isSimulationError(simulationResponse)) {
        throw new Error(`Simulation failed: ${simulationResponse.error}`);
      }

      // Prepare the transaction with simulation results
      const preparedTransaction = SorobanRpc.assembleTransaction(
        transaction,
        simulationResponse
      );

      // Sign the transaction using Freighter
      const signedXDR = await freighterApi.signTransaction(
        preparedTransaction.toXDR(),
        {
          networkPassphrase,
        }
      );

      // Create transaction from signed XDR
      const signedXdrString = typeof signedXDR === "string" ? signedXDR : (signedXDR as { signedTxXdr: string }).signedTxXdr;
      const signedTransaction = StellarSdk.TransactionBuilder.fromXDR(
        signedXdrString,
        networkPassphrase
      );

      // Submit the transaction
      const submitResponse = await server.sendTransaction(signedTransaction as StellarTransaction);

      if (submitResponse.status === "ERROR") {
        throw new Error(
          `Transaction failed: ${submitResponse.errorResult?.result()}`
        );
      }

      // Wait for transaction confirmation
      let getResponse = await server.getTransaction(submitResponse.hash);

      while (
        getResponse.status ===
        SorobanRpc.Api.GetTransactionStatus.NOT_FOUND
      ) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        getResponse = await server.getTransaction(submitResponse.hash);
      }

      if (
        getResponse.status ===
        SorobanRpc.Api.GetTransactionStatus.FAILED
      ) {
        throw new Error("Transaction failed on the network");
      }

      // Extract course ID from transaction result
      let courseId: string | undefined;

      if (
        getResponse.status ===
          SorobanRpc.Api.GetTransactionStatus.SUCCESS &&
        getResponse.returnValue
      ) {
        try {
          courseId = StellarSdk.scValToNative(getResponse.returnValue as StellarSdk.xdr.ScVal);
        } catch {
          // Failed to extract course ID, will use fallback
        }
      }

      return {
        success: true,
        courseId: courseId || `course_${Date.now()}`,
        transactionHash: submitResponse.hash,
      };
    } catch (err) {
      let errorMessage = "Failed to create course";

      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "string") {
        errorMessage = err;
      }

      // Handle specific contract errors
      if (errorMessage.includes("duplicate")) {
        errorMessage = "A course with this title already exists";
      } else if (errorMessage.includes("price")) {
        errorMessage = "Invalid price value";
      } else if (
        errorMessage.includes("wallet") ||
        errorMessage.includes("Freighter")
      ) {
        errorMessage =
          "Wallet connection failed. Please ensure Freighter is installed and unlocked.";
      }

      setError(errorMessage);

      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createCourse,
    isLoading,
    error,
  };
}

// Direct function for non-hook usage
export async function createCourse(
  params: CreateCourseParams
): Promise<CreateCourseResponse> {
  try {
    // Validation
    if (!params.title?.trim()) {
      throw new Error("Course title is required");
    }
    if (!params.description?.trim()) {
      throw new Error("Course description is required");
    }
    if (params.price <= 0) {
      throw new Error("Course price must be greater than zero");
    }

    // Get environment variables
    const contractAddress =
      process.env.NEXT_PUBLIC_COURSE_REGISTRY_CONTRACT_ADDRESS;
    const rpcUrl = process.env.NEXT_PUBLIC_STELLAR_RPC_URL;
    const networkPassphrase =
      process.env.NEXT_PUBLIC_STELLAR_NETWORK_PASSPHRASE;

    if (!contractAddress) {
      throw new Error(
        "Contract address not configured in environment variables"
      );
    }
    if (!rpcUrl) {
      throw new Error("RPC URL not configured in environment variables");
    }
    if (!networkPassphrase) {
      throw new Error(
        "Network passphrase not configured in environment variables"
      );
    }

    // Connect wallet and get user public key
    const userPublicKey = await connectWallet();

    // Initialize Soroban server and contract
    const server = new SorobanRpc.Server(rpcUrl);
    const contract = new StellarSdk.Contract(contractAddress);

    // Get the user's account to build the transaction
    const sourceAccount = await server.getAccount(userPublicKey);

    // Convert parameters to Soroban native values
    const titleValue = StellarSdk.nativeToScVal(params.title, {
      type: "string",
    });
    const descriptionValue = StellarSdk.nativeToScVal(params.description, {
      type: "string",
    });
    const priceValue = StellarSdk.nativeToScVal(params.price, { type: "u64" });
    const categoryValue = StellarSdk.nativeToScVal(params.category, {
      type: "string",
    });
    const levelValue = StellarSdk.nativeToScVal(params.level, {
      type: "string",
    });
    const durationValue = StellarSdk.nativeToScVal(params.duration, {
      type: "string",
    });

    // Build the transaction
    const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase,
    })
      .addOperation(
        contract.call(
          "course_registry_create_course",
          titleValue,
          descriptionValue,
          priceValue,
          categoryValue,
          levelValue,
          durationValue
        )
      )
      .setTimeout(30)
      .build();

    // Simulate the transaction to get resource fees
    const simulationResponse = await server.simulateTransaction(transaction);

    if (SorobanRpc.Api.isSimulationError(simulationResponse)) {
      throw new Error(`Simulation failed: ${simulationResponse.error}`);
    }

    // Prepare the transaction with simulation results
    const preparedTransaction = SorobanRpc.assembleTransaction(
      transaction,
      simulationResponse
    );

    // Sign the transaction using Freighter
    const signedXDR = await freighterApi.signTransaction(
      preparedTransaction.toXDR(),
      {
        networkPassphrase,
      }
    );

    // Create transaction from signed XDR
    const signedXdrString = typeof signedXDR === "string" ? signedXDR : (signedXDR as { signedTxXdr: string }).signedTxXdr;
    const signedTransaction = StellarSdk.TransactionBuilder.fromXDR(
      signedXdrString,
      networkPassphrase
    );

    // Submit the transaction
    const submitResponse = await server.sendTransaction(signedTransaction as StellarTransaction);

    if (submitResponse.status === "ERROR") {
      throw new Error(
        `Transaction failed: ${submitResponse.errorResult?.result()}`
      );
    }

    // Wait for transaction confirmation
    let getResponse = await server.getTransaction(submitResponse.hash);

    while (
      getResponse.status ===
      SorobanRpc.Api.GetTransactionStatus.NOT_FOUND
    ) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      getResponse = await server.getTransaction(submitResponse.hash);
    }

    if (
      getResponse.status === SorobanRpc.Api.GetTransactionStatus.FAILED
    ) {
      throw new Error("Transaction failed on the network");
    }

    // Extract course ID from transaction result
    let courseId: string | undefined;

    if (
      getResponse.status ===
        SorobanRpc.Api.GetTransactionStatus.SUCCESS &&
      getResponse.returnValue
    ) {
      try {
        courseId = StellarSdk.scValToNative(getResponse.returnValue as StellarSdk.xdr.ScVal);
      } catch {
        // Failed to extract course ID, will use fallback
      }
    }

    return {
      success: true,
      courseId: courseId || `course_${Date.now()}`,
      transactionHash: submitResponse.hash,
    };
  } catch (err) {
    let errorMessage = "Failed to create course";

    if (err instanceof Error) {
      errorMessage = err.message;
    } else if (typeof err === "string") {
      errorMessage = err;
    }

    // Handle specific contract errors
    if (errorMessage.includes("duplicate")) {
      errorMessage = "A course with this title already exists";
    } else if (errorMessage.includes("price")) {
      errorMessage = "Invalid price value";
    } else if (
      errorMessage.includes("wallet") ||
      errorMessage.includes("Freighter")
    ) {
      errorMessage =
        "Wallet connection failed. Please ensure Freighter is installed and unlocked.";
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
}