import { useState, useCallback } from "react";
import {
    Contract,
    rpc,
    TransactionBuilder,
    Networks,
    BASE_FEE,
    nativeToScVal,
    scValToNative,
} from "@stellar/stellar-sdk";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CertificateData {
    /** On-chain certificate ID */
    certificateId: string;
    /** Stellar address of the certificate owner */
    owner: string;
    /** Course ID associated with the certificate */
    courseId: string;
    /** Unix timestamp (seconds) when the certificate was issued */
    issuedAt: number;
    /** Whether the certificate is currently valid on-chain */
    isValid: boolean;
}

export interface VerifyCertificateResponse {
    success: boolean;
    certificate?: CertificateData;
    /** Raw verification result — true means the certificate is valid on-chain */
    isValid?: boolean;
    error?: string;
}

export interface VerifyCertificateParams {
    /** The on-chain certificate ID to verify */
    certificateId: string;
    /** The Stellar address of the supposed certificate owner */
    ownerAddress: string;
}

// ---------------------------------------------------------------------------
// Core async function
// ---------------------------------------------------------------------------

/**
 * Reads from the `course_access_verify_certificate` view function on the
 * CourseAccess Soroban contract using a simulated (read-only) transaction.
 *
 * No wallet signature is required — this is a pure read operation.
 */
export async function verifyCertificate(
    params: VerifyCertificateParams
): Promise<VerifyCertificateResponse> {
    const { certificateId, ownerAddress } = params;

    if (!certificateId?.trim()) {
        return { success: false, error: "Certificate ID is required." };
    }
    if (!ownerAddress?.trim()) {
        return { success: false, error: "Owner address is required." };
    }

    const rpcUrl = process.env.NEXT_PUBLIC_STELLAR_RPC_URL;
    const contractAddress = process.env.NEXT_PUBLIC_COURSE_ACCESS_CONTRACT_ID;
    const networkPassphrase =
        process.env.NEXT_PUBLIC_STELLAR_NETWORK_PASSPHRASE ?? Networks.TESTNET;

    if (!rpcUrl) {
        return {
            success: false,
            error: "Missing env variable: NEXT_PUBLIC_STELLAR_RPC_URL",
        };
    }
    if (!contractAddress) {
        return {
            success: false,
            error: "Missing env variable: NEXT_PUBLIC_COURSE_ACCESS_CONTRACT_ID",
        };
    }

    try {
        const provider = new rpc.Server(rpcUrl, { allowHttp: true });
        const contract = new Contract(contractAddress);

        // Use a zero-account keypair as the source for the simulation —
        // verification is read-only so no real signer is needed.
        const sourceAccount = await provider.getAccount(ownerAddress);

        const transaction = new TransactionBuilder(sourceAccount, {
            fee: BASE_FEE,
            networkPassphrase,
        })
            .addOperation(
                contract.call(
                    "course_access_verify_certificate",
                    nativeToScVal(ownerAddress.trim(), { type: "address" }),
                    nativeToScVal(certificateId.trim(), { type: "string" })
                )
            )
            .setTimeout(30)
            .build();

        // Simulate only — no submission, no signature required
        const simulationResponse = await provider.simulateTransaction(transaction);

        if (rpc.Api.isSimulationError(simulationResponse)) {
            // A simulation error may indicate the certificate was not found
            const errMsg = simulationResponse.error ?? "";
            if (
                errMsg.toLowerCase().includes("not found") ||
                errMsg.toLowerCase().includes("does not exist")
            ) {
                return {
                    success: true,
                    isValid: false,
                    certificate: undefined,
                };
            }
            throw new Error(`Simulation failed: ${errMsg}`);
        }

        // Parse the returned ScVal
        const returnValue = (simulationResponse as rpc.Api.SimulateTransactionSuccessResponse)
            .result?.retval;

        if (!returnValue) {
            return { success: true, isValid: false };
        }

        const native = scValToNative(returnValue);

        // The contract is expected to return a map/struct with the certificate data.
        // We defensively parse it to cover variations in the on-chain schema.
        if (typeof native === "boolean") {
            return { success: true, isValid: native };
        }

        if (native && typeof native === "object") {
            const cert = native as Record<string, unknown>;
            return {
                success: true,
                isValid: !!cert.is_valid,
                certificate: {
                    certificateId: String(cert.certificate_id ?? certificateId),
                    owner: String(cert.owner ?? ownerAddress),
                    courseId: String(cert.course_id ?? ""),
                    issuedAt: Number(cert.issued_at ?? 0),
                    isValid: !!cert.is_valid,
                },
            };
        }

        return { success: true, isValid: false };
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);

        if (
            message.toLowerCase().includes("not found") ||
            message.toLowerCase().includes("does not exist")
        ) {
            return { success: true, isValid: false };
        }

        return { success: false, error: message };
    }
}

// ---------------------------------------------------------------------------
// React hook
// ---------------------------------------------------------------------------

/**
 * Hook that wraps `verifyCertificate` and exposes reactive UI state.
 */
export function useVerifyCertificate() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [certificate, setCertificate] = useState<CertificateData | null>(null);

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
