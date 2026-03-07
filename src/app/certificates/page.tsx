"use client";

import dynamic from "next/dynamic";
import { Award, ShieldCheck } from "lucide-react";
import Footer from "@/components/footer";

// Lazy-load certificate components — they depend on Stellar SDK
const VerifyCertificate = dynamic(
    () => import("@/components/certificate/VerifyCertificate"),
    { ssr: false }
);

import NavbarMenu from "@/components/nabvarMenu";
import { NAV_TYPES } from "@/types/navbar";

export default function CertificatesPage() {
    return (
        <div className="bg-slate-900 min-h-screen">
            <NavbarMenu variant={NAV_TYPES.Connected} />
            <div className="max-w-3xl mx-auto px-6 py-12">
                {/* Page header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-2">
                        <Award className="w-8 h-8 text-purple-400" />
                        <h1 className="text-3xl font-semibold text-purple-400">
                            Certificates
                        </h1>
                    </div>
                    <p className="text-gray-400 text-sm max-w-xl">
                        All certificates earned on SkillCert are issued directly on the
                        Stellar blockchain. You can claim a certificate after completing a
                        course, and anyone can verify its authenticity below.
                    </p>
                </div>

                {/* How-it-works strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                    <StepCard
                        step={1}
                        title="Complete a course"
                        description="Finish all modules and lessons in an enrolled course."
                    />
                    <StepCard
                        step={2}
                        title="Claim on-chain"
                        description='Go to "My Courses", find the completed course and click "Claim Certificate".'
                    />
                    <StepCard
                        step={3}
                        title="Verify anytime"
                        description="Share your Certificate ID. Anyone can verify it here, no account needed."
                    />
                </div>

                {/* Verify section */}
                <section aria-labelledby="verify-cert-heading">
                    <div className="flex items-center gap-2 mb-4">
                        <ShieldCheck className="w-5 h-5 text-purple-400" />
                        <h2
                            id="verify-cert-heading"
                            className="text-xl font-semibold text-white"
                        >
                            Verify a Certificate
                        </h2>
                    </div>
                    <VerifyCertificate />
                </section>
            </div>

            <Footer />
        </div>
    );
}

// ---------------------------------------------------------------------------
// Helper components
// ---------------------------------------------------------------------------

function StepCard({
    step,
    title,
    description,
}: {
    step: number;
    title: string;
    description: string;
}) {
    return (
        <div className="bg-[#1F2937] rounded-xl p-5 border border-gray-700/50">
            <div className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center mb-3">
                <span className="text-purple-400 font-bold text-sm">{step}</span>
            </div>
            <h3 className="text-white font-semibold text-sm mb-1">{title}</h3>
            <p className="text-gray-400 text-xs leading-relaxed">{description}</p>
        </div>
    );
}
