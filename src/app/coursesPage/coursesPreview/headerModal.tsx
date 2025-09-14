"use client";

import React, { useState } from "react";
import { X, ArrowRight } from "lucide-react";

interface HeaderModalProps {
  onClose?: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export default function HeaderModal({
  onClose,
  activeTab = "Resume",
  onTabChange,
}: HeaderModalProps) {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const tabs = [
    { name: "Resume", label: "Resume" },
    { name: "Content", label: "Content" },
    { name: "Teacher", label: "Teacher" },
    { name: "Reviews", label: "Reviews" },
  ];

  const handleTabClick = (tabName: string) => {
    setCurrentTab(tabName);
    onTabChange?.(tabName);
  };

  return (
    <div className="bg-slate-900 text-white">
      <div className="relative p-6 pb-4">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-slate-800 rounded-lg transition-colors duration-200"
          aria-label="Close modal"
        >
          <X size={20} className="text-gray-400 hover:text-white" />
        </button>

        <div className="flex flex-col items-start text-left ml-5">
          <h1
            className="text-white mb-2 font-poppins"
            style={{
              width: "277px",
              height: "60px",
              fontWeight: 500,
              fontSize: "40px",
              lineHeight: "100%",
              letterSpacing: "0%",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
            }}
          >
            Course Name
          </h1>
          <p
            className="text-gray-400 font-poppins"
            style={{
              fontWeight: 400,
              fontSize: "24px",
              lineHeight: "100%",
              letterSpacing: "0%",
              textAlign: "left",
            }}
          >
            Course Description
          </p>
        </div>
      </div>

      <div className="px-6">
        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "#C084FC",
            transform: "rotate(0.2deg)",
            transformOrigin: "left center",
          }}
        ></div>
      </div>

      <div className="px-6 py-6 flex justify-center">
        <div
          style={{
            width: "800px",
            height: "80px",
            backgroundColor: "#1F2937",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 24px",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => handleTabClick(tab.name)}
              className={`
                  flex items-center justify-center gap-2 transition-all duration-200 ease-in-out
                  mx-2 font-poppins
                  ${currentTab === tab.name ? "text-white" : "hover:text-white"}
                `}
              style={{
                width: "176px",
                height: "50px",
                borderRadius: "25px",
                backgroundColor:
                  currentTab === tab.name ? "#A855F7" : "transparent",
                color: currentTab === tab.name ? "white" : "#9333EA",
                fontWeight: 500,
                fontSize: "20px",
                lineHeight: "100%",
                letterSpacing: "0%",
                textAlign: "center",
              }}
            >
              <span>{tab.label}</span>
              {currentTab !== tab.name && (
                <ArrowRight size={14} className="opacity-60" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
