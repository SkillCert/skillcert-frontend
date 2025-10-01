'use client';

import ErrorTest from "@/components/ErrorTest";
import WelcomePage from "./home/page";
import { useWalletProvider } from "@/provider/walletProvider";
import { useRouter } from "next/navigation";
import NavbarMenu from "@/components/nabvarMenu";
import { NAV_TYPES } from "@/types/navbar";

export default async function Page() {
  const {isConnected} = useWalletProvider();
  const router = useRouter();

  if (isConnected) {
    return await router.push('/instructor');
  } 
     
  return (
    <div className="">
      <NavbarMenu variant={NAV_TYPES.Default}/>
      <WelcomePage />
      <ErrorTest />
    </div>
  );
}
