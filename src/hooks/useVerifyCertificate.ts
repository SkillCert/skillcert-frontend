"use client";

import { useState, useCallback } from "react";
import { verifyCertificate } from "@/contract_connections/CourseAccess/verifyCertificate";
import type {
    Certificate,
    VerifyCertificateResponse,
} from "@/types";
import type { VerifyCertificateParams } from "@/contract_connections/CourseAccess/verifyCertificate";

/**
 * Hook that wraps `verifyCertificate` and exposes reactive UI state.
 */
export function useVerifyCertificate() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [certificate, setCertificate] = useState<Certificate | null>(null);

    const verify = useCallback(
        async (
            params: VerifyCertificateParams
        ): Promise<VerifyCertificateResponse> => {
            setIsLoading(true);
            setError(null);
            setIsValid(null);
            setCertificate(null);

            const result = await verifyCertificate(params);

            if (result.success) {
                setIsValid(result.isValid ?? false);
                setCertificate(result.certificate ?? null);
            } else {
                setError(result.error ?? "Verification failed.");
            }

            setIsLoading(false);
            return result;
        },
        []
    );

    const reset = useCallback(() => {
        setError(null);
        setIsValid(null);
        setCertificate(null);
    }, []);

    return {
        verify,
        reset,
        isLoading,
        error,
        isValid,
        certificate,
    };
}
