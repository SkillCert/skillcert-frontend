"use client";

import { CheckCircle, XCircle, Loader2, Award, RotateCcw, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useClaimCertificate } from "@/hooks/useClaimCertificate";

interface ClaimCertificateProps {
    /** The ID of the course the user just completed */
    courseId: string;
    /** Display name of the course (for the UI) */
    courseName?: string;
}

// ---------------------------------------------------------------------------
// Sub-components for each transaction state
// ---------------------------------------------------------------------------

function PendingState() {
    return (
        <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div className="relative">
                <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                </div>
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-yellow-500 animate-pulse" />
            </div>
            <div>
                <p className="text-white font-semibold text-lg">Awaiting confirmation</p>
                <p className="text-gray-400 text-sm mt-1">
                    Please sign the transaction in Freighter and wait for blockchain
                    confirmation. Do not close this window.
                </p>
            </div>
        </div>
    );
}

function SuccessState({
    certificateId,
    transactionHash,
    onReset,
}: {
    certificateId: string | null;
    transactionHash: string | null;
    onReset: () => void;
}) {
    const explorerUrl = transactionHash
        ? `https://stellar.expert/explorer/testnet/tx/${transactionHash}`
        : null;

    return (
        <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-400" />
            </div>

            <div>
                <p className="text-white font-semibold text-lg">Certificate claimed!</p>
                <p className="text-gray-400 text-sm mt-1">
                    Your certificate has been recorded on the Stellar blockchain.
                </p>
            </div>

            {certificateId && (
                <div className="w-full bg-gray-800/60 rounded-lg px-4 py-3 text-left border border-gray-700">
                    <p className="text-xs text-gray-500 mb-1">Certificate ID</p>
                    <p className="text-purple-300 text-sm font-mono break-all">
                        {certificateId}
                    </p>
                </div>
            )}

            {transactionHash && (
                <div className="w-full bg-gray-800/60 rounded-lg px-4 py-3 text-left border border-gray-700">
                    <p className="text-xs text-gray-500 mb-1">Transaction Hash</p>
                    <p className="text-gray-300 text-xs font-mono break-all">
                        {transactionHash}
                    </p>
                </div>
            )}

            <div className="flex gap-3 mt-2 flex-wrap justify-center">
                {explorerUrl && (
                    <a
                        href={explorerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                    >
                        View on Explorer
                        <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                )}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onReset}
                    className="text-gray-400 hover:text-white"
                >
                    <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                    Dismiss
                </Button>
            </div>
        </div>
    );
}

function ErrorState({
    error,
    onRetry,
    onReset,
    courseId,
}: {
    error: string;
    onRetry: (courseId: string) => void;
    onReset: () => void;
    courseId: string;
}) {
    return (
        <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
                <XCircle className="w-8 h-8 text-red-400" />
            </div>

            <div>
                <p className="text-white font-semibold text-lg">Transaction failed</p>
                <p className="text-red-300 text-sm mt-1 max-w-xs mx-auto">{error}</p>
            </div>

            <div className="flex gap-3 mt-2">
                <Button
                    onClick={() => onRetry(courseId)}
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6"
                    size="sm"
                >
                    <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                    Try again
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onReset}
                    className="text-gray-400 hover:text-white"
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

/**
 * ClaimCertificate displays the certificate claiming flow for a completed
 * course. It cycles through idle → pending → success | error states, showing
 * an appropriate UI for each.
 *
 * @example
 * <ClaimCertificate courseId="course-001" courseName="Blockchain 101" />
 */
export default function ClaimCertificate({
    courseId,
    courseName,
}: ClaimCertificateProps) {
    const { claim, reset, status, transactionHash, certificateId, error } =
        useClaimCertificate();

    return (
        <Card
            id="claim-certificate"
            className="bg-[#1F2937] border border-gray-700 shadow-lg"
        >
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-white text-lg">
                    <Award className="w-5 h-5 text-purple-400" />
                    Claim Your Certificate
                </CardTitle>
                {courseName && (
                    <p className="text-gray-400 text-sm">{courseName}</p>
                )}
            </CardHeader>

            <CardContent>
                {status === "idle" && (
                    <div className="flex flex-col gap-4">
                        <p className="text-gray-300 text-sm">
                            Congratulations on completing the course! Claim your certificate
                            on the Stellar blockchain. You will need to sign a transaction
                            with your Freighter wallet.
                        </p>
                        <Button
                            id="claim-certificate-button"
                            onClick={() => claim(courseId)}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium transition-all duration-200 active:scale-95"
                        >
                            <Award className="w-4 h-4 mr-2" />
                            Claim Certificate
                        </Button>
                    </div>
                )}

                {status === "pending" && <PendingState />}

                {status === "success" && (
                    <SuccessState
                        certificateId={certificateId}
                        transactionHash={transactionHash}
                        onReset={reset}
                    />
                )}

                {status === "error" && (
                    <ErrorState
                        error={error ?? "An unexpected error occurred."}
                        onRetry={claim}
                        onReset={reset}
                        courseId={courseId}
                    />
                )}
            </CardContent>
        </Card>
    );
}
