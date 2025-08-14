"use client";

import { useState } from "react";
import { BarChart3, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseNavbarProps {
  activeTab?: "overview" | "courses";
  onTabChange?: (tab: "overview" | "courses") => void;
}

export default function CourseNavbar({
  activeTab: initialActiveTab = "courses",
  onTabChange,
}: CourseNavbarProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "courses">(
    initialActiveTab
  );

  const handleTabChange = (tab: "overview" | "courses") => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {/* Overview Tab */}
          <button
            onClick={() => handleTabChange("overview")}
            className={cn(
              "flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors",
              activeTab === "overview"
                ? "border-purple-400 text-purple-400"
                : "border-transparent text-white hover:text-gray-300"
            )}
          >
            <BarChart3 className="w-5 h-5" />
            Overview
          </button>

          {/* My Courses Tab */}
          <button
            onClick={() => handleTabChange("courses")}
            className={cn(
              "flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors",
              activeTab === "courses"
                ? "border-purple-400 text-purple-400"
                : "border-transparent text-white hover:text-gray-300"
            )}
          >
            <BookOpen className="w-5 h-5" />
            My courses (0)
          </button>
        </div>
      </div>
    </nav>
  );
}