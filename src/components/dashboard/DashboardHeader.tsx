import React from "react";

interface DashboardHeaderProps {
  userName: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName }) => (
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto text-center sm:text-left">
      <div className="w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] rounded-full bg-gray-300 mb-2 sm:mb-0 mx-auto sm:mx-0 flex-shrink-0" />

      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-purple-600">
          Welcome back, {userName}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-purple-600 font-semibold mt-1">
          Here&apos;s what&apos;s happening with your courses today
        </p>
      </div>
    </div>

    <div className="flex justify-center md:block mt-2 md:mt-0 w-full md:w-auto flex-shrink-0">
      <button className="bg-purple-600 hover:bg-purple-400 text-white text-base px-6 py-2 rounded-full font-semibold transition w-full max-w-xs md:w-auto md:max-w-none">
        Create Course
      </button>
    </div>
  </div>
);

export default DashboardHeader;
