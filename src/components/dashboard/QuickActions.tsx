import React from "react";

export const links = [
  {
    label: "Create New Course",
    href: "/dashboard/create-course",
  },
  {
    label: "Update Course Content",
    href: "/dashboard/update-course",
  },
  {
    label: "Respond to Messages",
    href: "/dashboard/respond-to-messages",
  },
  {
    label: "Manage Students",
    href: "/dashboard/manage-students",
  },
  {
    label: "View Analytics",
    href: "/dashboard/view-analytics",
  },
];

const QuickActions: React.FC = () => (
  <div className="w-full">
    <h3 className="text-lg font-bold text-purple-700 mb-3">Quick Actions</h3>
    <div className="bg-[#23283b] p-6 flex flex-col items-center gap-4">
      {links.map((link, idx) => (
        <button
          key={idx}
          className="md:w-[80%] w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-full font-semibold transition"
        >
          {link.label}
        </button>
      ))}
    </div>
  </div>
);

export default QuickActions;
