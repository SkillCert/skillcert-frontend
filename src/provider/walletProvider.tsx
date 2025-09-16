"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {useWallet} from "@/hooks/use-wallet";
import type {UseWalletReturn} from "@/types";
type WalletBase = Omit<UseWalletReturn, "connect" | "disconnect">;

interface WalletContextType extends WalletBase {
  isConnected: boolean;
  address: string | null;
  isLoading: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({children}: WalletProviderProps) {
  const wallet = useWallet();
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkInitialConnection = async () => {
    try {
      const connected = await wallet.checkConnection();
      setIsConnected(connected);
      if (connected) {
        const userAddress = await wallet.getUserAddress();
        setAddress(userAddress);
      }
    } catch (error) {
      console.error("Failed to check initial connection:", error);
    }
  };

  useEffect(() => {
    checkInitialConnection();
  }, []);

  const connect = async () => {
    setIsLoading(true);
    try {
      const connected = await wallet.checkConnection();
      if (!connected) {
        await wallet.retrievePublicKey();
      }
      const userAddress = await wallet.getUserAddress();
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
  };

  const value: WalletContextType = {
    ...wallet,
    isConnected,
    address,
    isLoading,
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
