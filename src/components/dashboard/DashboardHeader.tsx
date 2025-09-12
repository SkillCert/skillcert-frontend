import React from "react";

interface DashboardHeaderProps {
  userName: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName }) => (
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
    <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto text-center md:text-left">
      <div className="w-[110px] h-[110px] rounded-full bg-gray-300 mb-2 md:mb-0 mx-auto md:mx-0" />
      <div>
        <h1 className="text-2xl md:text-[56px] font-bold text-purple-600">
          Welcome back, {userName}
        </h1>
        <p className="text-[28px] text-purple-600 font-semibold mt-1">
          Here&apos;s what&apos;s happening with your courses today
        </p>
      </div>
    </div>
    <div className="flex justify-center md:block mt-4 md:mt-0 w-full md:w-auto">
      <button className="bg-purple-600 hover:bg-purple-400 text-white text-base px-6 py-2 rounded-full font-semibold transition w-full md:w-auto">
        Create Course
      </button>
    </div>
  </div>
);

export default DashboardHeader;
