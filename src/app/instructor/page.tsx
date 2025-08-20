"use client";

import { useState } from "react";
import InstructorMenu, { InstructorTab } from "./components/instructorMenu";
import Dashboard from "./components/dashboard";
import InstructorCoursesView from "./courses/instructorCoursesView";

type TabType = InstructorTab;

export default function InstructorDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");

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
        <InstructorMenu activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Content */}
        {renderTabContent()}
      </main>
    </div>
  );
}
