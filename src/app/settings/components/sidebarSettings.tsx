"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface SidebarItem {
  name: string;
  href: string;
  icon?: ReactNode;
}

interface SidebarSettingsProps {
  className?: string;
}

export default function SidebarSettings({ className }: SidebarSettingsProps) {
  const pathname = usePathname();

  const menuItems: SidebarItem[] = [
    { name: "My Profile", href: "/settings/profile" },
    { name: "Password", href: "/settings/password" },
    { name: "Settings", href: "/settings/preferences" },
  ];

  const isActive = (href: string) => {
    if (href === "/settings") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className={cn("w-64 bg-[#1F2937] p-6 min-h-screen", className)}>
      <div className="mb-8 text-center">
        <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
        <div className="text-[#9333EA] text-lg font-medium pb-2 border-b border-purple-400/30">
          User name
        </div>
      </div>

      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  "block px-4 py-3 text-lg text-center font-medium transition-colors rounded-md",
                  isActive(item.href)
                    ? "text-[#9333EA] bg-purple-400/10"
                    : "text-[#9333EA] hover:text-purple-300 hover:bg-purple-400/5"
                )}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
