"use client";

import React from "react";
import { BarChart3, BookOpen } from "lucide-react";

export type InstructorTab = "dashboard" | "courses";

interface InstructorMenuProps {
  activeTab: InstructorTab;
  onTabChange: (tab: InstructorTab) => void;
}

export default function InstructorMenu({
  activeTab,
  onTabChange,
}: InstructorMenuProps) {
  const tabs = [
    { id: "dashboard" as const, label: "Overview", icon: BarChart3 },
    { id: "courses" as const, label: "Courses", icon: BookOpen },
  ];

  return (
    <div className="mb-8">
      <div className="border-b border-gray-700">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                      flex items-center gap-4 py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200
                      ${
                        isActive
                          ? "border-purple-500 text-purple-400"
                          : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300"
                      }
                    `}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
