"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { isConnected as freighterIsConnected } from "@stellar/freighter-api";
import { useWallet } from "@/hooks/use-wallet";
import type { UseWalletReturn } from "@/types";

type WalletBase = Omit<UseWalletReturn, "connect" | "disconnect">;

interface WalletContextType extends WalletBase {
  isInstalled: boolean;
  isConnected: boolean;
  address: string | null;
  isLoading: boolean;
  network: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  const wallet = useWallet();
  const [isInstalled, setIsInstalled] = useState(true); // optimistic — assume installed until proven otherwise
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [network, setNetwork] = useState<string | null>(null);

  // Detect Freighter by actually calling the API.
  // If it times out or errors with "no response", extension is absent.
  const detectAndCheckConnection = useCallback(async () => {
    try {
      // Race the API call against a 2s timeout
      const result = await Promise.race([
        freighterIsConnected(),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), 2000)
        ),
      ]);

      // If we get here, extension is installed
      setIsInstalled(true);

      if (!result.error && result.isConnected) {
        // Already approved — restore the address silently
        const userAddress = await wallet.getUserAddress();
        setAddress(userAddress);
        setIsConnected(true);
      }
    } catch {
      // Timed out or errored — Freighter not installed
      setIsInstalled(false);
    }
  }, [wallet]);

  useEffect(() => {
    detectAndCheckConnection();
  }, []);

  // Listen for account / network changes from Freighter
  useEffect(() => {
    const handleAccountChange = async () => {
      try {
        const userAddress = await wallet.getUserAddress();
        setAddress(userAddress);
        setIsConnected(true);
      } catch {
        setAddress(null);
        setIsConnected(false);
      }
    };

    const handleNetworkChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ network: string }>;
      setNetwork(customEvent.detail?.network ?? null);
    };

    window.addEventListener("freighter#accountChanged", handleAccountChange);
    window.addEventListener("freighter#networkChanged", handleNetworkChange);

    return () => {
      window.removeEventListener("freighter#accountChanged", handleAccountChange);
      window.removeEventListener("freighter#networkChanged", handleNetworkChange);
    };
  }, [wallet]);

  const connect = async () => {
    if (!isInstalled) {
      window.open("https://www.freighter.app/", "_blank");
      return;
    }

    setIsLoading(true);
    try {
      // retrievePublicKey() triggers the Freighter popup + returns address directly
      const userAddress = await wallet.retrievePublicKey();
      setAddress(userAddress);
      setIsConnected(true);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = () => {
    setIsConnected(false);
    setAddress(null);
    setNetwork(null);
  };

  const value: WalletContextType = {
    ...wallet,
    isInstalled,
    isConnected,
    address,
    isLoading,
    network,
    connect,
    disconnect,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

export function useWalletProvider(): WalletContextType {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWalletProvider must be used within a WalletProvider");
  }
  return context;
}