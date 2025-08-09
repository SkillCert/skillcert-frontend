"use client";

import { useState } from "react";
import { BarChart3, BookOpen } from "lucide-react";
import Dashboard from "./components/dashboard";
import InstructorCoursesView from "./courses/instructorCoursesView";

type TabType = "dashboard" | "courses";

export default function InstructorDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");

  const tabs = [
    {
      id: "dashboard" as TabType,
      label: "Overview",
      icon: BarChart3,
    },
    {
      id: "courses" as TabType,
      label: "Courses",
      icon: BookOpen,
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "courses":
        return <InstructorCoursesView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="w-full bg-[#020618] mx-auto text-white">
      <main className="px-8 pb-8 pt-6">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-700">
            <nav className="flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
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

        {/* Tab Content */}
        {renderTabContent()}
      </main>
    </div>
  );
}
