import {
    Contract,
    rpc,
    TransactionBuilder,
    Networks,
    BASE_FEE,
    nativeToScVal,
    scValToNative,
} from "@stellar/stellar-sdk";
import type { VerifyCertificateResponse } from "@/types";

// ---------------------------------------------------------------------------
// Local params type (not shared — specific to this function's signature)
// ---------------------------------------------------------------------------

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

        // Use the owner account as source for the simulation —
        // verification is read-only so no signature is needed.
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
                return { success: true, isValid: false, certificate: undefined };
            }
            throw new Error(`Simulation failed: ${errMsg}`);
        }

        // Parse the returned ScVal
        const returnValue = (
            simulationResponse as rpc.Api.SimulateTransactionSuccessResponse
        ).result?.retval;

        if (!returnValue) {
            return { success: true, isValid: false };
        }

        const native = scValToNative(returnValue);

        // The contract is expected to return a map/struct with certificate data.
        // Defensively parse it to cover variations in the on-chain schema.
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
