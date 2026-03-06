"use client";

import { useState } from "react";
import { Search, CheckCircle, XCircle, Loader2, ShieldCheck, ShieldOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useVerifyCertificate } from "@/hooks/useVerifyCertificate";
import type { Certificate } from "@/types";

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function CertificateCard({ certificate }: { certificate: Certificate }) {
    const issuedDate = certificate.issuedAt
        ? new Date(certificate.issuedAt * 1000).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : "Unknown";

    return (
        <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2 text-green-400 font-semibold">
                <ShieldCheck className="w-5 h-5" />
                <span>Certificate is valid</span>
            </div>

            <div className="bg-gray-800/60 rounded-lg border border-green-700/30 p-4 space-y-3">
                <DataRow label="Certificate ID" value={certificate.certificateId} mono />
                <DataRow label="Owner" value={certificate.owner} mono />
                <DataRow label="Course ID" value={certificate.courseId} />
                <DataRow label="Issued on" value={issuedDate} />
            </div>
        </div>
    );
}

function DataRow({
    label,
    value,
    mono = false,
}: {
    label: string;
    value: string;
    mono?: boolean;
}) {
    return (
        <div>
            <p className="text-xs text-gray-500 mb-0.5">{label}</p>
            <p
                className={`text-sm text-gray-200 break-all ${mono ? "font-mono" : ""}`}
            >
                {value}
            </p>
        </div>
    );
}

function InvalidState() {
    return (
        <div className="flex items-center gap-2 mt-4 text-red-400 font-medium">
            <ShieldOff className="w-5 h-5" />
            <span>No valid certificate found for these details.</span>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

/**
 * VerifyCertificate allows users to check whether a certificate is valid on
 * the Stellar blockchain by entering a Certificate ID and owner address.
 *
 * @example
 * <VerifyCertificate />
 *
 * // Pre-fill fields for a specific certificate:
 * <VerifyCertificate
 *   defaultCertificateId="cert_course-001_123"
 *   defaultOwnerAddress="GXXXXX..."
 * />
 */
export default function VerifyCertificate({
    defaultCertificateId = "",
    defaultOwnerAddress = "",
}: {
    defaultCertificateId?: string;
    defaultOwnerAddress?: string;
}) {
    const [certId, setCertId] = useState(defaultCertificateId);
    const [ownerAddr, setOwnerAddr] = useState(defaultOwnerAddress);

    const { verify, reset, isLoading, error, isValid, certificate } =
        useVerifyCertificate();

    const handleVerify = () => {
        if (!certId.trim() || !ownerAddr.trim()) return;
        verify({ certificateId: certId.trim(), ownerAddress: ownerAddr.trim() });
    };

    const handleReset = () => {
        reset();
    };

    const hasResult = isValid !== null;

    return (
        <Card
            id="verify-certificate"
            className="bg-[#1F2937] border border-gray-700 shadow-lg"
        >
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-white text-lg">
                    <ShieldCheck className="w-5 h-5 text-purple-400" />
                    Verify Certificate
                </CardTitle>
                <p className="text-gray-400 text-sm">
                    Enter a certificate ID and owner address to verify its authenticity
                    on the blockchain.
                </p>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Inputs */}
                <div className="space-y-3">
                    <div>
                        <label
                            htmlFor="cert-id-input"
                            className="block text-sm font-medium text-gray-300 mb-1"
                        >
                            Certificate ID
                        </label>
                        <Input
                            id="cert-id-input"
                            type="text"
                            placeholder="e.g. cert_course-001_1234567890"
                            value={certId}
                            onChange={(e) => {
                                setCertId(e.target.value);
                                if (hasResult) handleReset();
                            }}
                            className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 focus-visible:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="owner-addr-input"
                            className="block text-sm font-medium text-gray-300 mb-1"
                        >
                            Owner Address
                        </label>
                        <Input
                            id="owner-addr-input"
                            type="text"
                            placeholder="e.g. GABC…XYZ (Stellar public key)"
                            value={ownerAddr}
                            onChange={(e) => {
                                setOwnerAddr(e.target.value);
                                if (hasResult) handleReset();
                            }}
                            className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 focus-visible:ring-purple-500"
                        />
                    </div>
                </div>

                {/* Action button */}
                <Button
                    id="verify-certificate-button"
                    onClick={handleVerify}
                    disabled={isLoading || !certId.trim() || !ownerAddr.trim()}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Verifying…
                        </>
                    ) : (
                        <>
                            <Search className="w-4 h-4 mr-2" />
                            Verify Certificate
                        </>
                    )}
                </Button>

                {/* Error from hook (RPC / env issues) */}
                {error && (
                    <div className="flex items-start gap-2 bg-red-900/30 border border-red-700/50 rounded-lg px-4 py-3 text-red-300 text-sm">
                        <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Results */}
                {hasResult && !error && (
                    <>
                        {isValid && certificate ? (
                            <CertificateCard certificate={certificate} />
                        ) : isValid && !certificate ? (
                            // isValid true but no detailed data returned
                            <div className="flex items-center gap-2 mt-4 text-green-400 font-medium">
                                <CheckCircle className="w-5 h-5" />
                                <span>Certificate is valid on the blockchain.</span>
                            </div>
                        ) : (
                            <InvalidState />
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    );
}
