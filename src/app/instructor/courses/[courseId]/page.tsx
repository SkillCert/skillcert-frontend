"use client";

import Button from "@/components/button";
import Image from "next/image";
import { useState } from "react";
import CourseModules from "./components/courseModules";

type StatItem = {
  id: number;
  title: string;
  value: number;
  unit?: string;
};

const data: StatItem[] = [
  { id: 1, title: "Students", value: 1247 },
  { id: 2, title: "Rating", value: 4.8 },
  { id: 3, title: "Revenue", value: 124687.53, unit: "USD" },
  { id: 4, title: "Completion rate", value: 64, unit: "%" },
];

type TabType = "courseContents" | "students";

export default function CourseMainView() {
  const [activeTab, setActiveTab] = useState<TabType>("courseContents");

  const tabs = [
    {
      id: "courseContents" as TabType,
      label: "Course Content",
    },
    {
      id: "students" as TabType,
      label: "Students",
    },
  ];

  const TabContent = () => {
    switch (activeTab) {
      case "courseContents":
        return <CourseModules />;
      case "students":
        return <div>Students Content</div>;
      default:
        return <div>Course Content</div>;
    }
  };

  return (
    <main className="py-8 px-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-14">
        <div className="flex flex-col items-start gap-4 mb-4 md:mb-0">
          <h2 className="text-4xl font-semibold text-white">
            Complete React Development Course
          </h2>
          <span className="bg-purple-600 text-gray-300 px-3 py-1 rounded-md text-xs font-medium">
            Published
          </span>
        </div>

        <Button
          className="bg-purple-600 rounded-lg hover:bg-purple-700 focus:ring-purple-500 w-full md:w-auto mt-4 md:mt-0"
          variant="primary"
          size="small"
        >
          <Image
            src="/Eye.svg"
            alt="eye-icon"
            className="mr-2"
            width={15}
            height={15}
          />
          Publish Course
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((stats) => (
          <div key={stats.id} className="border p-4 rounded-lg mb-6">
            <div className="flex flex-col gap-3 items-start">
              <span className="text-white text-base">{stats.title}</span>
              <span className="text-white text-3xl font-semibold flex items-center">
                {stats.unit === "USD" ? (
                  <div className="flex items-center">
                    {stats.value} {stats.unit}
                  </div>
                ) : stats.unit === "%" ? (
                  `${stats.value}%`
                ) : (
                  stats.value
                )}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-5 mt-10">
        <div className="">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
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
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {TabContent()}
    </main>
  );
}
