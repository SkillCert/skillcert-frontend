"use client";
import { useState } from "react";

export default function CreateLessonModal() {
  const [lessonType, setLessonType] = useState("Video");
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-[#0f172a] p-8 rounded-lg w-full max-w-lg shadow-lg">
        <h2 className="text-2xl font-bold text-purple-600 mb-6">
          Add New Lesson
        </h2>

        <div className="mb-5">
          <label className="block text-white text-lg mb-4">Lesson Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full px-4 py-2 rounded-full border border-purple-500 bg-gray-800 text-white text-sm placeholder:text-white/80 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div className="mb-5">
          <label className="block text-white text-lg mb-3">Lesson Type</label>
          <div className="flex space-x-6 text-white px-5">
            {["Video", "Text", "Quiz", "Assignment"].map((type) => (
              <label
                key={type}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="lessonType"
                  value={type}
                  checked={lessonType === type}
                  onChange={() => setLessonType(type)}
                  className="appearance-none accent-purple-500 h-5 w-5 bg-transparent border-2 border-white rounded-full focus:bg-purple-800"
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <label className="block text-white text-lg mb-4">
            Duration (Optional)
          </label>
          <input
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="e.g. 10:30"
            className="w-full px-4 py-2 rounded-full border border-purple-500 bg-gray-800 text-white text-sm placeholder:text-white/80 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <p className="text-xs text-white mt-1">
            Estimated time to complete this lesson.
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <div className="flex space-x-4">
            <button className="bg-pink-800 hover:bg-pink-900 text-white py-2 px-10 rounded-full text-sm">
              Cancel
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-5 rounded-full text-sm">
              Create Lesson
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
