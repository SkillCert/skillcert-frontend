"use client";

import {
  checkConnection,
  retrievePublicKey,
  getUserAddress,
  userSignTransaction,
} from "./wallet-utils";
import type { UseWalletReturn } from "@/types";

/**
 * Custom React hook for managing Stellar wallet interactions via Freighter.
 *
 * Provides wallet connection management, address retrieval, and transaction signing
 * capabilities for Stellar blockchain interactions.
 *
 * @returns {UseWalletReturn} Hook interface with wallet management functions
 */
export function useWallet(): UseWalletReturn {
  return {
    checkConnection,
    retrievePublicKey,
    getUserAddress,
    signTransaction: userSignTransaction,
  };
}
