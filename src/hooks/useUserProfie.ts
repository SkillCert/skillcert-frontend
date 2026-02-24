"use client";
import { useState, useEffect, useCallback } from "react";
import {
    Contract,
    TransactionBuilder,
    BASE_FEE,
    xdr,
    Address,
} from "@stellar/stellar-sdk";
import { Api, assembleTransaction, Server } from "@stellar/stellar-sdk/rpc";
import { ContractConfig } from "@/app/contract_connections/UserProfile/saveProfile";
import { getUserAddress } from "./wallet-utils";

export interface UserProfile {
    address: string;
    name: string;
    email: string;
    profession?: string;
    goals?: string;
    country: string;
}

interface UseUserProfileReturn {
    profile: UserProfile | null;
    address: string | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

// Generates initials avatar from the user's name
export function getAvatarUrl(name: string): string {
    const initials = name?.slice(0, 2).toUpperCase() || "??";
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=7E22CE&color=fff&size=128&bold=true`;
}

async function getWalletAddress(): Promise<string> {
    if (
        typeof window !== "undefined" &&
        (window as unknown as { freighter?: unknown }).freighter
    ) {
        try {
            const { address } = await (
                window as unknown as {
                    freighter: { getAddress: () => Promise<{ address: string }> };
                }
            ).freighter.getAddress();
            return address;
        } catch {
            throw new Error(
                "Failed to get wallet address. Please connect your wallet."
            );
        }
    }
    throw new Error(
        "No wallet detected. Please install and connect a Stellar wallet."
    );
}

// Reads an Option<String> (Vec of 0 or 1 elements) from contract response
function parseOptionString(val: xdr.ScVal | undefined): string | undefined {
    if (!val) return undefined;
    if (val.switch() === xdr.ScValType.scvVec()) {
        const vec = val.vec();
        if (vec && vec.length > 0) {
            return vec[0].str().toString();
        }
    }
    return undefined;
}

export async function getUserProfile(
    config: ContractConfig
): Promise<UserProfile> {
    const walletAddress = await getWalletAddress().catch(() => getUserAddress());
    console.log("Fetching profile for address:", walletAddress);

    const server = new Server(config.rpcUrl);
    const contract = new Contract(config.contractAddress);
    const account = await server.getAccount(walletAddress);

    const transaction = new TransactionBuilder(account, {
        fee: BASE_FEE,
        networkPassphrase: config.networkPassphrase,
    })
        .addOperation(
            contract.call(
                "user_management_get_profile",
                xdr.ScVal.scvAddress(new Address(walletAddress).toScAddress())
            )
        )
        .setTimeout(30)
        .build();

    const simulateResponse = await server.simulateTransaction(transaction);

    if (Api.isSimulationError(simulateResponse)) {
        throw new Error(`Simulation failed: ${simulateResponse.error}`);
    }

    // Read-only call: extract the result directly from simulation,
    // no signing or submission needed
    const resultEntries = simulateResponse.result;
    if (!resultEntries) {
        throw new Error("No result returned from contract");
    }

    const resultVal = resultEntries.retval;

    if (resultVal.switch() !== xdr.ScValType.scvMap()) {
        throw new Error("Unexpected contract return type");
    }

    const profileMap = resultVal.map() ?? [];

    const get = (key: string): xdr.ScVal | undefined =>
        profileMap.find((e) => e.key().str().toString() === key)?.val();

    // Suppress unused variable — assembleTransaction kept for parity with saveProfile pattern
    void assembleTransaction;

    return {
        address: walletAddress,
        name: get("name")?.str().toString() ?? "",
        email: get("email")?.str().toString() ?? "",
        country: get("country")?.str().toString() ?? "",
        profession: parseOptionString(get("profession")),
        goals: parseOptionString(get("goals")),
    };
}

export function useUserProfile(config?: ContractConfig): UseUserProfileReturn {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [address, setAddress] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProfile = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const walletAddress = await getWalletAddress();
            setAddress(walletAddress);

            if (!config) {
                throw new Error("Contract config is required to fetch profile");
            }

            const profileData = await getUserProfile(config);
            setProfile(profileData);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load profile");
        } finally {
            setLoading(false);
        }
    }, [config]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    return { profile, address, loading, error, refetch: fetchProfile };
}