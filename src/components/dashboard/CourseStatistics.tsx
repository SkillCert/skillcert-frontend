import React from "react";

const categories = [
  {
    label: "Enrolment",
    value: 100,
  },
  {
    label: "Revenue",
    value: 100,
  },
  {
    label: "Ratings",
    value: 100,
  },
];

const CourseStatistics: React.FC = () => (
  <div>
    <h3 className="text-lg font-bold text-purple-400 mb-3">
      Course Statistics
    </h3>
    <div className="flex gap-3 mb-4">
      {categories.map((category, idx) => (
        <button
          key={idx}
          className="bg-pink-600 text-white px-4 py-1 rounded-full text-xs font-semibold"
        >
          {category.label}
        </button>
      ))}
    </div>
    <div className="bg-[#23283b] flex items-center justify-center h-56 text-white text-2xl font-semibold">
      Information
    </div>
  </div>
);

export default CourseStatistics;
