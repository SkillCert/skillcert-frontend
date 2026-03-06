"use client";

import { useState } from "react";
import { claimCertificate } from "@/contract_connections/CourseAccess/claimCertificate";
import type { ClaimStatus, ClaimCertificateResponse } from "@/types";

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
