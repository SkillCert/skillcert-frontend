import * as StellarSdk from '@stellar/stellar-sdk';
import { Contract, Networks, TransactionBuilder, BASE_FEE } from '@stellar/stellar-sdk';
import { Server } from '@stellar/stellar-sdk/rpc';
import { useState } from 'react';

interface DeleteCourseResult {
  success: boolean;
  error?: string;
  transactionId?: string;
}

type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

// Environment configuration
const getContractConfig = () => {
  return {
    contractAddress: process.env.NEXT_PUBLIC_COURSE_REGISTRY_CONTRACT || '',
    networkRpc: process.env.NEXT_PUBLIC_STELLAR_RPC || '',
    networkPassphrase: process.env.NEXT_PUBLIC_NETWORK_PASSPHRASE || Networks.TESTNET,
  };
};

// Initialize Stellar Server
const initializeStellarServer = (rpcUrl: string) => {
  return new Server(rpcUrl);
};

// Get wallet connection (assumes Freighter or similar wallet)
const getWalletConnection = async () => {
  if (typeof window === 'undefined' || !window.freighter) {
    throw new Error('Freighter wallet not found. Please install Freighter wallet extension.');
  }

  const isAllowed = await window.freighter.isAllowed();
  if (!isAllowed) {
    await window.freighter.requestAccess();
  }

  const publicKey = await window.freighter.getPublicKey();
  if (!publicKey) {
    throw new Error('Wallet not connected. Please connect your wallet first.');
  }

  return {
    publicKey,
    signTransaction: window.freighter.signTransaction,
  };
};

// Validate course ID
const validateCourseId = (courseId: string): string | null => {
  if (!courseId || courseId.trim() === '') {
    return 'Course ID cannot be empty';
  }
  if (courseId.length < 1) {
    return 'Invalid course ID format';
  }
  return null;
};

const courseIdToScVal = (courseId: string): StellarSdk.xdr.ScVal => {
  return StellarSdk.nativeToScVal(courseId, { type: 'string' });
};

const parseSorobanResult = (result: any): Result<void, string> => {
  try {
    if (result && result.returnValue) {
      const scVal = result.returnValue;
      
      if (scVal.switch().name === 'scvVoid') {
        return { ok: true, value: undefined };
      }
      
      if (scVal.switch().name === 'scvInstance') {
        const errorStr = StellarSdk.scValToNative(scVal);
        return { ok: false, error: errorStr || 'Unknown contract error' };
      }
    }
    
    return { ok: true, value: undefined };
  } catch {
    return { ok: false, error: 'Failed to parse contract result' };
  }
};

// Stellar/Soroban contract interaction
const callDeleteCourseContract = async (courseId: string): Promise<Result<string, string>> => {
  const config = getContractConfig();
  
  if (!config.contractAddress) {
    return { ok: false, error: 'Contract address not configured' };
  }

  try {
    // Initialize Stellar server
    const server = initializeStellarServer(config.networkRpc);
    
    // Get wallet connection
    const wallet = await getWalletConnection();
    
    // Load account from blockchain
    const account = await server.getAccount(wallet.publicKey);
    
    // Create contract instance
    const contract = new Contract(config.contractAddress);
    
    // Build the contract call operation
    const operation = contract.call(
      'course_registry_delete_course',
      courseIdToScVal(courseId)
    );

    // Build transaction
    const transaction = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: config.networkPassphrase,
    })
      .addOperation(operation)
      .setTimeout(30)
      .build();

    // Simulate transaction
    const simulation = await server.simulateTransaction(transaction);
    
    if (StellarSdk.rpc.Api.isSimulationError(simulation)) {
      const errorMsg = simulation.error || 'Simulation failed';
      
      if (errorMsg.includes('Course not found')) {
        return { ok: false, error: 'Course not found' };
      }
      if (errorMsg.includes('Unauthorized') || errorMsg.includes('not the creator')) {
        return { ok: false, error: 'Unauthorized: You are not the course creator' };
      }
      
      return { ok: false, error: `Contract error: ${errorMsg}` };
    }

    // Prepare transaction for signing
    const preparedTransaction = StellarSdk.rpc.assembleTransaction(
      transaction,
      simulation
    ).build();

    // Sign transaction with wallet
    const signedTransactionXdr = await wallet.signTransaction(
      preparedTransaction.toXDR(),
      {
        networkPassphrase: config.networkPassphrase,
        accountToSign: wallet.publicKey,
      }
    );

    // Submit transaction
    const signedTransaction = StellarSdk.TransactionBuilder.fromXDR(
      signedTransactionXdr,
      config.networkPassphrase
    );
    
    const result = await server.sendTransaction(signedTransaction);
    
    if (result.status === 'ERROR') {
      return { ok: false, error: result.errorResult?.toString() || 'Transaction failed' };
    }

    // Wait for transaction confirmation
    if (result.status === 'PENDING') {
      let getTransactionResponse = await server.getTransaction(result.hash);
      
      // Poll for transaction completion
      while (getTransactionResponse.status === 'NOT_FOUND') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        getTransactionResponse = await server.getTransaction(result.hash);
      }

      if (getTransactionResponse.status === 'SUCCESS') {
        // Parse the contract result
        const contractResult = parseSorobanResult(getTransactionResponse);
        if (contractResult.ok) {
          return { ok: true, value: result.hash };
        } else {
          return { ok: false, error: contractResult.error };
        }
      } else {
        return { ok: false, error: 'Transaction failed to complete' };
      }
    }

    return { ok: true, value: result.hash };

  } catch (error) {
    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('Freighter')) {
        return { ok: false, error: 'Wallet connection error. Please ensure Freighter is installed and connected.' };
      }
      if (error.message.includes('network') || error.message.includes('fetch')) {
        return { ok: false, error: 'Network error: Unable to connect to Stellar network' };
      }
      if (error.message.includes('timeout')) {
        return { ok: false, error: 'Transaction timeout: Please try again' };
      }
      
      return { ok: false, error: error.message };
    }
    
    return { ok: false, error: 'Unknown error occurred during contract interaction' };
  }
};

/**
 * Deletes a course and all its associated modules from the CourseRegistry contract
 * @param courseId - The ID of the course to delete
 * @returns Promise<DeleteCourseResult> - Result object with success status and optional error
 */
export const deleteCourse = async (courseId: string): Promise<DeleteCourseResult> => {
  try {
    // Validate input
    const validationError = validateCourseId(courseId);
    if (validationError) {
      return {
        success: false,
        error: validationError,
      };
    }

    // Call the smart contract function
    const result = await callDeleteCourseContract(courseId);
    
    if (!result.ok) {
      return {
        success: false,
        error: result.error,
      };
    }

    return {
      success: true,
      transactionId: result.value,
    };

  } catch {
    return {
      success: false,
      error: 'An unexpected error occurred while deleting the course',
    };
  }
};

/**
 * React hook for deleting a course with state management
 */
export const useDeleteCourse = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteCourse = async (courseId: string): Promise<boolean> => {
    setIsDeleting(true);
    setError(null);

    try {
      const result = await deleteCourse(courseId);
      
      if (result.success) {
        // Emit custom event for other components to listen
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('course_deleted', { 
            detail: { courseId, transactionId: result.transactionId } 
          }));
          
          // Also emit events that the smart contract would emit
          window.dispatchEvent(new CustomEvent('course_deleted_blockchain', {
            detail: { course_id: courseId, transaction_hash: result.transactionId }
          }));
          
          window.dispatchEvent(new CustomEvent('modules_deleted_blockchain', {
            detail: { course_id: courseId, transaction_hash: result.transactionId }
          }));
        }
        return true;
      } else {
        setError(result.error || 'Failed to delete course');
        return false;
      }
    } catch {
      setError('An unexpected error occurred');
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteCourse: handleDeleteCourse,
    isDeleting,
    error,
    clearError: () => setError(null),
  };
};

// Add TypeScript declarations for Freighter wallet
declare global {
  interface Window {
    freighter?: {
      isConnected: () => Promise<boolean>;
      isAllowed: () => Promise<boolean>;
      requestAccess: () => Promise<void>;
      getPublicKey: () => Promise<string>;
      signTransaction: (xdr: string, opts?: any) => Promise<string>;
    };
  }
}

// Named export for direct function use
export { deleteCourse as deleteCourseFunction };

// Default export for the hook
export default useDeleteCourse;