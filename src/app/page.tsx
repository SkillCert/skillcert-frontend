'use client';

import ErrorTest from "@/components/ErrorTest";
import WelcomePage from "./home/page";
import { useWalletProvider } from "@/provider/walletProvider";
import { useRouter } from "next/navigation";

export default async function Page() {
  const {isConnected} = useWalletProvider();
  const router = useRouter();

  if (isConnected) {
    return await router.push('/instructor');
  } 
     
  return (
    <div className="">
      <WelcomePage />
      <ErrorTest />
    </div>
  );
}
