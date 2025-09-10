"use client";
import Image from "next/image";
import circlePlay from "@/../public/images/CircledPlay.png";
import { useState } from "react";
import ContentModal from "./coursesPreview/components/contentModal";

export const CoursesOverview = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="py-24 flex flex-col items-center justify-center gap-12 bg-gray-900 px-4">
      <div className="space-y-12 w-full max-w-7xl  flex flex-col justify-center ">
        <h1 className="text-purple-400 text-back text-3xl sm:text-5xl font-medium">
          My courses
        </h1>
        <div className=" grid  grid-cols-1 justify-items-center	 lg:grid-cols-2 gap-x-5  gap-y-5  w-full">
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#9D174D] text-white font-normal rounded-[25px] px-8 py-3 hover:bg-[#8B155C] transition-colors"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "16px",
              lineHeight: "100%",
            }}
          >
            Preview Course Content
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10"
            >
              ×
            </button>
            <ContentModal />
          </div>
        </div>
      )}
    </section>
  );
};
// interface CourseCardProps {
//   courseName: string;
//   lessonsCompleted: number;
//   nextLesson: string;
//   level: string;
//   imageUrl: string;
// } this interface can be used to type props when needed

const CourseCard = () => {
  return (
    <div className="border border-gray-400   rounded-2xl  bg-gray-800 flex flex-col sm:flex-row max-w-xl overflow-hidden hover:shadow-lg hover:shadow-[#ffffff]/20 transition-shadow duration-300 ease-in-out">
      <div className="bg-white sm:w-[200px] sm:h-full h-48 w-full"></div>
      <div className="py-4 sm:py-2.5 px-5   justify-between flex-col ">
        <div className="px-2.5 space-y-1.5">
          <p className="sm:text-4xl font-medium">Course Name</p>
          <p className="text-gray-400  font-normal text-base ">
            2/10 lessons completed
          </p>
        </div>
        <div className="pl-2.5 flex justify-between  gap-12 pt-1.5 pb-4 sm:pb-0">
          <div className="space-y-2.5">
            <p className="text-base font-bold ">
              Next Lesson: <span className="font-normal">Lesson Name</span>
            </p>
            <div className="border border-cyan-400 px-2.5 py-1 text-cyan-400 font-semibold rounded-full bg-gray-900 w-fit">
              Level
            </div>
          </div>
          <div className="">
            <Image
              src={circlePlay.src}
              alt="play icon"
              width={96}
              height={96}
              className="md:w-24 md:h-24 w-20 h-20 object-contain hover:scale-110 transition-transform duration-300 ease-in-out"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
