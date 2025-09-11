"use client";
import { useState } from "react";
import { ArrowRightSvg } from "../../../../public/svg/generalSvg";

export const CourseSideBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="fixed top-6 left-4 z-50 md:hidden bg-gray-800 p-2 rounded"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open sidebar"
      >
        <span className="block w-6 h-0.5 bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-white"></span>
      </button>

      <aside
        className={`
          fixed sm:static top-0 left-0 h-full w-4/5 max-w-xs bg-gray-800 z-40 transform transition-transform duration-300
          md:static md:translate-x-0 md:w-[37.4%] md:max-w-xl md:h-[calc(100vh-6.25rem)]
          ${open ? "translate-x-0" : "-translate-x-full"} 
        `}
      >
        <div className="flex flex-col  justify-center items-center w-full py-3 px-2.5 border-b-4 border-b-gray-900 ">
          <div>
            <p className="2xl:text-[2.5rem] font-medium text-purple-600 ">
              Course Name
            </p>
            <p className="text-purple-600 text-xl font-medium">8/12 lessons</p>
          </div>
        </div>
        <div className="flex  w-full  pt-5 pb-3 border-b-4 border-b-gray-900">
          <button className="flex items-center justify-center  gap-2  w-[85%] text-purple-600  hover:text-purple-700 transition-colors duration-300">
            <span>Course Home</span>
            <ArrowRightSvg />
          </button>
        </div>
        <div className="flex flex-col w-full ">
          <p className="lg:text-4xl text-2xl  font-medium text-purple-600 text-center w-[80%] pl-2.5 pt-3 pb-2.5 ">
            Course content
          </p>
          <nav className="flex items-center justify-center">
            <ul className="space-y-4 flex flex-col items-center">
              <li className="lg:text-3xl font-light text-white list-disc py-3.5 px-3">
                Course Section
              </li>
              <li className="lg:text-3xl font-light text-white list-disc py-3.5 px-3">
                Course Section
              </li>
              <li className="lg:text-3xl font-light text-white list-disc py-3.5 px-3">
                Course Section
              </li>
              <li className="lg:text-3xl font-light text-white list-disc py-3.5 px-3">
                Course Section
              </li>
              <li className="lg:text-3xl font-light text-white list-disc py-3.5 px-3">
                Course Section
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};
