"use client";

import { useWeb3 } from "@/context/Web3Context";
import { Button } from "@/components/ui/button";
import { Loader2, Wallet, LogOut, AlertTriangle } from "lucide-react";

/**
 * WalletConnect
 *
 * Handles all wallet UI states:
 * - Freighter not installed → prompt to install
 * - Not connected         → "Connect Wallet" button
 * - Loading               → spinner
 * - Connected             → truncated address + disconnect
 */
export function WalletConnect() {
  const { isInstalled, isConnected, isLoading, address, connect, disconnect } =
    useWeb3();

  const truncateAddress = (addr: string) =>
    `${addr.slice(0, 4)}...${addr.slice(-4)}`;

  // Freighter is not installed
  if (!isInstalled) {
    return (
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-yellow-400" />
        <a
          href="https://www.freighter.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow-400 hover:text-yellow-300 text-sm underline transition-colors"
        >
          Install Freighter Wallet
        </a>
      </div>
    );
  }

  // Connected state
  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-purple-900/50 border border-purple-600 rounded-full px-3 py-1.5">
          <Wallet className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-purple-200 text-sm font-mono">
            {truncateAddress(address)}
          </span>
        </div>
        <button
          onClick={disconnect}
          className="p-1.5 text-white/50 hover:text-red-400 transition-colors"
          title="Disconnect wallet"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // Not connected
  return (
    <Button
      onClick={connect}
      disabled={isLoading}
      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Connecting...
        </>
      ) : (
        "Connect Wallet"
      )}
    </Button>
  );
}