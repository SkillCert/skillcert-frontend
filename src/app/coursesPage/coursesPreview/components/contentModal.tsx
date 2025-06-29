import React from "react";

const modules = [
  { name: "Module name", duration: "2 weeks", lessons: 8 },
  { name: "Module name", duration: "2 weeks", lessons: 8 },
  { name: "Module name", duration: "2 weeks", lessons: 8 },
  { name: "Module name", duration: "2 weeks", lessons: 8 },
  { name: "Module name", duration: "2 weeks", lessons: 8 },
  { name: "Module name", duration: "2 weeks", lessons: 8 },
];

export default function ContentModal() {
  return (
    <div
      className="bg-[#151a23] p-8 rounded-lg min-w-[700px]"
      style={{ minHeight: 400 }}
    >
      <h2
        className="text-white mb-8"
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: 28,
          fontWeight: 500,
        }}
      >
        Course Content
      </h2>
      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
        {modules.map((mod, idx) => (
          <div
            key={idx}
            className="border border-[#ff4fbb] rounded-md px-6 py-4 flex flex-col justify-between min-h-[90px]"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-white text-lg font-semibold">
                {mod.name}
              </span>
              <span className="text-white text-base font-normal">
                {mod.duration}
              </span>
            </div>
            <span className="text-white text-sm font-normal">
              {mod.lessons} lessons
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
