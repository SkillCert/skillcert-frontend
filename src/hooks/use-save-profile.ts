"use client";

import { useState } from "react";

import { checkConnection, retrievePublicKey } from "./wallet-utils";
import type {
  ProfileData,
  ContractResult,
  UseSaveProfileReturn,
} from "@/types";
import { saveProfile } from "./profile-service";

/**
 * Custom React hook for managing teacher profile registration on the Stellar blockchain.
 *
 * Provides a complete interface for saving teacher profile data to a Soroban smart contract,
 * including wallet connection management, transaction signing via Freighter wallet, and
 * comprehensive state management for loading, error, and success states.
 *
 * @returns {UseSaveProfileReturn} Hook interface with saveProfile function and state management
 */
export function useSaveProfile(): UseSaveProfileReturn {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  const handleSaveProfile = async (
    profileData: ProfileData
  ): Promise<ContractResult | null> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    setTransactionHash(null);

    try {
      const result = await saveProfile(profileData);

      if (result && result.success) {
        setSuccess(true);
        setTransactionHash(result.hash);
        return result;
      } else {
        throw new Error("Failed to save profile to blockchain");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    saveProfile: handleSaveProfile,
    isLoading,
    error,
    success,
    transactionHash,
    checkConnection,
    retrievePublicKey,
  };
}
