"use client";

/**
 * Web3Context
 *
 * Central context for Web3/Stellar wallet state across the app.
 * Built on top of WalletProvider — import `useWeb3` anywhere inside
 * <Web3Provider> to access wallet state and actions.
 */

export { WalletProvider as Web3Provider, useWalletProvider as useWeb3 } from "@/provider/walletProvider";