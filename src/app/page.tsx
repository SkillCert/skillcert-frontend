"use client";

import ErrorTest from "@/components/ErrorTest";
import WelcomePage from "./home/page";
import { useWalletProvider } from "@/provider/walletProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import NavbarMenu from "@/components/nabvarMenu";
import { NAV_TYPES } from "@/types/navbar";

export default function Page() {
  const { isConnected } = useWalletProvider();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      router.push("/instructor");
    }
  }, [isConnected, router]);

  return (
    <div className="">
      <NavbarMenu variant={NAV_TYPES.Default} />
      <WelcomePage />
      <ErrorTest />
    </div>
  );
}