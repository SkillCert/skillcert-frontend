"use client";
import type React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Search,
  GraduationCap,
  Bell,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { requestAccess, getAddress } from "@stellar/freighter-api";
import { toast } from "sonner";
import { Brand } from "../../public/images";
import { useWalletProvider } from "@/provider/walletProvider";
import { NAV_TYPES, NavType } from "@/types/navbar";

const defaultUserInfo = {
  name: "Legend4tech",
  email: "Legend4tech1@gmail.com",
  userId: "001",
};

const dropdownMenu = [
  {
    title: "Settings",
    icon: <Settings className="w-4 h-4 group-hover:text-pink-500" />,
    href: "/settings",
  },
  {
    title: "Instructor Panel",
    icon: <GraduationCap className="w-4 h-4 group-hover:text-pink-500" />,
    href: "/instructor-panel",
  },
  {
    title: "Disconnect",
    icon: <LogOut className="w-4 h-4 group-hover:text-pink-500" />,
    href: "/logout",
  },
] as const;

interface NavbarMenuProps {
  variant?: NavType;
  userInfo?: {
    name: string;
    email: string;
    userId: string;
  };
}

export default function NavbarMenu({
  variant = NAV_TYPES.Default,
  userInfo = defaultUserInfo,
}: NavbarMenuProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentMode, setCurrentMode] = useState(variant);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletId, setWalletId] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const path = usePathname();

  const { isConnected, connect, disconnect, address, isLoading } =
    useWalletProvider();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  // useEffect(() => {
  //   checkWalletConnection();
  // }, []);

  // const checkWalletConnection = async () => {
  //   try {
  //     const connected = await isConnected();
  //     if (connected.isConnected) {
  //       const address = await getAddress();
  //       if (address.address) {
  //         setWalletConnected(true);
  //         setWalletId(
  //           `${address.address.slice(0, 6)}...${address.address.slice(-6)}`
  //         );
  //         setCurrentMode("withUser");
  //       }
  //     }
  //   } catch {
  //     // Handle wallet connection error silently
  //   }
  // };

  const handleConnect = async () => {
    if (isConnected) {
      toast.success("Wallet Already Connected", {
        description: "Your wallet is already connected.",
      });
      await router.push("/instructor");
      return;
    }
    try {
      setIsConnecting(true);
      await connect();
      toast.success("Wallet Connected", {
        description: "Successfully connected to your Stellar wallet!",
      });
    } catch (error) {
      let errorMessage = "An error occurred while connecting to the wallet.";
      const msg = (error as any)?.message;
      if (msg === "User closed wallet extension") {
        errorMessage =
          "Wallet connection was cancelled. Please try again when ready.";
      } else if (typeof msg === "string" && msg.includes("User rejected")) {
        errorMessage =
          "Connection was rejected. Please approve the connection to continue.";
      }
      toast.error("Connection Error", {
        description: errorMessage,
      });
    } finally {
      setIsConnecting(false);
    }

    // setIsConnecting(true);

    // const connectionTimeout = setTimeout(() => {
    //   setIsConnecting(false);
    //   toast.error("Connection Timeout", {
    //     description: "Wallet connection timed out. Please try again.",
    //   });
    // }, 30000);

    // try {
    //   const connected = await isConnected();

    //   if (!connected.isConnected) {
    //     clearTimeout(connectionTimeout);
    //     setIsConnecting(false);
    //     toast.error("Wallet Not Found", {
    //       description: "Please install Freighter wallet extension to connect.",
    //     });
    //     return;
    //   }

    //   const accessPromise = requestAccess();
    //   const timeoutPromise = new Promise((_, reject) => {
    //     setTimeout(
    //       () => reject(new Error("User closed wallet extension")),
    //       15000
    //     );
    //   });

    //   const accessResult = await Promise.race([accessPromise, timeoutPromise]);

    //   clearTimeout(connectionTimeout);

    //   if ((accessResult as any).error) {
    //     setIsConnecting(false);
    //     toast.error("Connection Failed", {
    //       description: "Failed to connect wallet. Please try again.",
    //     });
    //     return;
    //   }

    //   if ((accessResult as any).address) {
    //     setWalletConnected(true);
    //     setWalletId(
    //       `${(accessResult as any).address.slice(0, 6)}...${(
    //         accessResult as any
    //       ).address.slice(-6)}`
    //     );
    //     setCurrentMode("withUser");

    //     toast.success("Wallet Connected", {
    //       description: "Successfully connected to your Stellar wallet!",
    //     });
    //   }
    // } catch (error) {
    //   clearTimeout(connectionTimeout);

    //   let errorMessage = "An error occurred while connecting to the wallet.";

    //   const msg = (error as any)?.message;
    //   if (msg === "User closed wallet extension") {
    //     errorMessage =
    //       "Wallet connection was cancelled. Please try again when ready.";
    //   } else if (typeof msg === "string" && msg.includes("User rejected")) {
    //     errorMessage =
    //       "Connection was rejected. Please approve the connection to continue.";
    //   }

    //   toast.error("Connection Error", {
    //     description: errorMessage,
    //   });
    // } finally {
    //   setIsConnecting(false);
    // }
  };

  const handleDisconnect = () => {
    setWalletConnected(false);
    setWalletId("");
    setCurrentMode("default");
    setShowDropdown(false);

    toast.success("Wallet Disconnected", {
      description: "Your wallet has been disconnected successfully.",
    });
  };

  const handleDropdownItemClick = (href: string) => {
    if (href === "/logout") {
      handleDisconnect();
    } else {
      router.push(href);
    }
  };

  const displayUserInfo = walletConnected
    ? {
        ...userInfo,
        userId: walletId,
      }
    : userInfo;

  switch (variant) {
    case NAV_TYPES.Default:
      return (
        <div
          className={`fixed top-0 z-[1000] py-6 w-full flex items-center justify-center 
                transition-all duration-300 
                ${
                  scrolled
                    ? "bg-gray-950/10 backdrop-blur-lg h-16 py-2"
                    : "bg-transparent h-32 "
                }`}
        >
          <nav className="flex justify-between items-center min-w-[1200px] ">
            <Image src={Brand} alt="brand" className="w-[150px] " />
            <div className="flex items-center gap-[35px]">
              <ul className="flex items-center gap-[35px] text-gray-100">
                <li>About</li>
                <li>Contact</li>
              </ul>
              <Button
                className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600
                  text-white font-bold rounded-[8px] text-sm shadow-lg hover:shadow-xl
                  transition-all duration-300 transform hover:scale-105"
                size="lg"
                onClick={() => {
                  // if (isConnected) {
                  //   router.push("/dashboard");
                  // } else {
                  handleConnect();
                  // }
                }}
              >
                {isConnected ? "Go to Dashboard" : "Get started"}
              </Button>
            </div>
          </nav>
        </div>
      );
    case NAV_TYPES.Connected:
      return (
        <nav className="bg-[#1F2937] px-6 py-4">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/nabvar-logo.png"
                    alt="Skillcert Logo"
                    width={100}
                    height={100}
                  />
                </Link>
              </div>
              <Link href="/coursesPage" className="text-white/80 text-sm">
                <span>Explore</span>
              </Link>
            </div>
            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <Input
                  type="search"
                  placeholder=""
                  className="w-full border-2 border-white rounded-full px-4 py-2 text-white placeholder:text-white/50 focus:border-red-400 bg-transparent"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                <Search
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
                    isSearchFocused ? "text-red-400" : "text-white"
                  }`}
                />
              </div>
            </div>

            {currentMode === "default" ? (
              <DefaultNavigation
                onConnect={handleConnect}
                isConnecting={isConnecting}
              />
            ) : (
              <UserNavigation
                userInfo={displayUserInfo}
                showDropdown={showDropdown}
                setShowDropdown={setShowDropdown}
                onDropdownItemClick={handleDropdownItemClick}
                dropdownRef={dropdownRef}
              />
            )}
          </div>
        </nav>
      );
  }

}

function DefaultNavigation({
  onConnect,
  isConnecting,
}: {
  onConnect: () => void;
  isConnecting: boolean;
}) {
  return (
    <div className="flex items-center gap-6">
      <Link
        href="/"
        className="text-white/80 hover:text-white transition-colors"
      >
        Home
      </Link>
      <a href="#" className="text-white/80 hover:text-white transition-colors">
        Contact
      </a>
      <Button
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full disabled:opacity-50"
        onClick={onConnect}
        disabled={isConnecting}
      >
        {isConnecting ? "Connecting..." : "Connect"}
      </Button>
    </div>
  );
}

function UserNavigation({
  userInfo,
  showDropdown,
  setShowDropdown,
  onDropdownItemClick,
  dropdownRef,
}: {
  userInfo: any;
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
  onDropdownItemClick: (href: string) => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="flex items-center gap-4">
      <button className="p-2 text-white/80 hover:text-white transition-colors">
        <GraduationCap className="w-6 h-6" />
      </button>
      <button className="p-2 text-white/80 hover:text-white transition-colors">
        <Bell className="w-6 h-6" />
      </button>

      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center gap-2 bg-purple-600 border border-white rounded-full px-3 py-2 hover:bg-purple-700 transition-colors"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span className="text-white text-sm bg-[#1F2937] px-2 py-1 rounded-full">
            {userInfo?.userId}
          </span>
          <div className="w-6 h-6 bg-purple-600 border-2 border-white rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        </button>

        {showDropdown && (
          <UserDropdown
            userInfo={userInfo}
            onItemClick={onDropdownItemClick}
            setShowDropdown={setShowDropdown}
          />
        )}
      </div>
    </div>
  );
}

function UserDropdown({
  userInfo,
  onItemClick,
  setShowDropdown,
}: {
  userInfo: any;
  onItemClick: (href: string) => void;
  setShowDropdown: (show: boolean) => void;
}) {
  return (
    <div
      className="px-6 py-4 absolute right-0 mt-2 w-64 bg-[#020618] rounded-lg shadow-lg z-50"
      onMouseLeave={() => setShowDropdown(false)}
    >
      <div className="pb-2 border-b border-white flex flex-col gap-2 justify-end items-end">
        <div className="font-semibold text-white">{userInfo?.name}</div>
        <div className="text-sm text-white/70">{userInfo?.email}</div>
      </div>

      <div className="py-2 flex flex-col gap-2">
        {dropdownMenu.map((item) => (
          <button
            key={item.title}
            className="w-full flex items-center gap-3 px-4 py-1 text-white bg-[#111827] hover:text-pink-500 hover:border-pink-500 border border-transparent transition-all duration-200 group rounded-md"
            onClick={() => onItemClick(item.href)}
          >
            {item.icon}
            <span>{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
