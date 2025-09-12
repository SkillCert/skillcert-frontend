"use client";
import { useState } from "react";

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    alert("Profile saved successfully!");
  };

  return (
    <div
      className="min-h-screen bg-gray-900 p-8"
      style={{ backgroundColor: "#111827" }}
    >
      {/* the styling of this div can be changed from max-w-4xl so it fits in the layout properly  */}
      <div className="max-w-4xl mx-auto">
        <h1
          className="text-4xl font-bold text-center mb-12"
          style={{ color: "#9333EA" }}
        >
          My Profile
        </h1>

        <div className="w-full h-px bg-gray-700 mb-12"></div>

        <div className="mb-8">
          <h2
            className="text-xl font-semibold mb-6"
            style={{ color: "#9333EA" }}
          >
            Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-6 py-4 rounded-full bg-gray-800 border- border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                style={{
                  backgroundColor: "#1F2937",
                  borderColor: "#4B5563",
                }}
              />
            </div>

            <div>
              <input
                type="text"
                name="lastname"
                placeholder="Lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                className="w-full px-6 py-4 rounded-full bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                style={{
                  backgroundColor: "#1F2937",
                  borderColor: "#4B5563",
                }}
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2
            className="text-xl font-semibold mb-6"
            style={{ color: "#9333EA" }}
          >
            Description
          </h2>

          <textarea
            name="description"
            placeholder="Enter your description here..."
            value={formData.description}
            onChange={handleInputChange}
            rows={8}
            className="w-full px-6 py-4 rounded-3xl bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            style={{
              backgroundColor: "#1F2937",
              borderColor: "#4B5563",
            }}
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-8 py-3 rounded-full text-white font-semibold hover:opacity-90 transition-opacity duration-200"
            style={{ backgroundColor: "#9333EA" }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}