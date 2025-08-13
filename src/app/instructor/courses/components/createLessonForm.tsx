"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function CreateLessonForm() {
  const [formData, setFormData] = useState({
    lessonName: "",
    duration: "",
    description: "",
    lessonType: "Video",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const lessonTypes = ["Video", "Audio", "Document", "Quiz", "Assignment"];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="bg-slate-900 min-h-screen p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-white text-xl font-medium mb-8">Create Lesson</h1>

        <div className="space-y-6">
          {/* Lesson Name */}
          <div>
            <label className="block text-white text-sm font-medium mb-3">
              Lesson Name
            </label>
            <input
              type="text"
              placeholder="Place holder"
              value={formData.lessonName}
              onChange={(e) => handleInputChange("lessonName", e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-white text-sm font-medium mb-3">
              Duration
            </label>
            <input
              type="text"
              placeholder="Place holder"
              value={formData.duration}
              onChange={(e) => handleInputChange("duration", e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-white text-sm font-medium mb-3">
              Description
            </label>
            <textarea
              placeholder="Place holder"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={4}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 resize-none"
            />
          </div>

          {/* Lesson Type */}
          <div>
            <label className="block text-white text-sm font-medium mb-3">
              Lesson Type
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white text-left focus:outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 flex items-center justify-between"
              >
                <span>{formData.lessonType}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-10">
                  {lessonTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        handleInputChange("lessonType", type);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left text-white hover:bg-slate-700 first:rounded-t-lg last:rounded-b-lg transition-colors"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
