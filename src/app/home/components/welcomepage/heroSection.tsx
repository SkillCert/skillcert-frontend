"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { waves } from "../../../../../public/images";
import { Wallet } from "lucide-react";
import { getAvatarUrl, useUserProfile } from "@/hooks/useUserProfie";

const contractConfig = {
  contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? "",
  networkPassphrase: process.env.NEXT_PUBLIC_NETWORK_PASSPHRASE ?? "",
  rpcUrl: process.env.NEXT_PUBLIC_SOROBAN_RPC_URL ?? "",
};

export default function HeroSection() {
  const { profile, address, loading } = useUserProfile(contractConfig);

  const shortAddress = address
    ? `${address.slice(0, 6)}…${address.slice(-4)}`
    : null;

  const avatarSrc = profile?.name ? getAvatarUrl(profile.name) : null;

  return (
    <section
      className="relative min-h-screen flex overflow-hidden
      bg-[linear-gradient(to_right,#1F2937,#59168B,#9333EA,#59168B,#1F2937)]"
    >
      <div className="absolute inset-0 background z-20"></div>
      <div className="relative flex flex-col items-center text-center px-4 mt-[200px] max-w-4xl mx-auto z-30">

        {/* ── User greeting ─────────────────────────────────────────── */}
        {loading ? (
          <div className="flex flex-col items-center gap-3 mb-6">
            <div className="w-20 h-20 rounded-full bg-white/10 animate-pulse" />
            <div className="h-10 w-72 rounded-md bg-white/10 animate-pulse" />
            <div className="h-4 w-44 rounded-md bg-white/10 animate-pulse" />
          </div>
        ) : profile && profile.name ? (
          <div className="flex flex-col items-center gap-3 mb-6">
            <div className="w-20 h-20 rounded-full ring-2 ring-purple-400/60 overflow-hidden bg-gray-700">
              {avatarSrc && (
                <Image
                  src={avatarSrc}
                  alt={profile.name}
                  width={80}
                  height={80}
                  unoptimized
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <h1 className="flex flex-col gap-2 md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              <span>Welcome back,</span>
              <span className="bg-gradient-to-r from-cyan-400 to-purple-300 bg-clip-text text-transparent">
                {profile.name} 👋
              </span>
            </h1>

            {/* Wallet address + profession */}
            {shortAddress && (
              <p className="flex items-center gap-1.5 text-white/60 text-sm">
                <Wallet className="w-3.5 h-3.5" />
                {shortAddress}
                {profile.profession && (
                  <span className="ml-2 text-purple-300">
                    · {profile.profession}
                  </span>
                )}
                {profile.country && (
                  <span className="ml-2 text-white/40">
                    · {profile.country}
                  </span>
                )}
              </p>
            )}
          </div>
        ) : (
          // Static headline for guests / wallet not connected
          <h1 className="flex flex-col gap-4 md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span>Master Skills That</span>
            <span className="bg-gradient-to-r from-cyan-400 to-purple-300 bg-clip-text text-transparent">
              Define Your Future
            </span>
          </h1>
        )}

        <p className="text-[1rem] text-white mb-8 max-w-2xl mx-auto leading-relaxed">
          Unlock your potential with cutting-edge online courses designed by
          industry experts. Transform your career with hands-on learning
          experiences.
        </p>

        <Button
          className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600
            text-white font-bold px-6 py-6 rounded-[12px] text-lg shadow-lg hover:shadow-xl
            transition-all duration-300 transform hover:scale-105"
          size="lg"
        >
          Start Learning Today
          <Image
            src="/next-page.svg"
            alt="Next Page"
            width={20}
            height={20}
            className="ml-2"
          />
        </Button>
      </div>

      <div className="absolute bottom-0 w-full z-10">
        <Image src={waves} alt="wave" className="w-full" priority />
      </div>
    </section>
  );
}
