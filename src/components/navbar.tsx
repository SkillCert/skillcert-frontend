"use client";
import { Search, GraduationCap, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { WalletConnect } from "@/components/WalletConnect";

interface NavbarProps {
  variant?: "navbar1" | "navbar2";
}

export function Navbar({ variant = "navbar1" }: NavbarProps) {
  return (
    <nav className="bg-gray-800 px-6 py-4">
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/nabvar-logo.svg"
              alt="Skillcert Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="text-2xl font-medium text-purple-400">
              Skillcert
            </span>
          </div>
          <span className="text-white/80 text-sm">Explore</span>
        </div>

        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Input
              type="search"
              placeholder=""
              className="w-full border-2 border-pink-900 rounded-full px-4 py-2 text-white placeholder:text-white/50 focus:border-pink-800"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-pink-900" />
          </div>
        </div>

        {variant === "navbar1" ? (
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/80 hover:text-white transition-colors">
              Home
            </a>
            <a href="#" className="text-white/80 hover:text-white transition-colors">
              Contact
            </a>
            {/* WalletConnect handles all states: not installed, loading, connected */}
            <WalletConnect />
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <button className="p-2 text-white/80 hover:text-white transition-colors">
              <GraduationCap className="w-6 h-6" />
            </button>
            <button className="p-2 text-white/80 hover:text-white transition-colors">
              <Bell className="w-6 h-6" />
            </button>
            <button className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors">
              <User className="w-5 h-5 text-white" />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
