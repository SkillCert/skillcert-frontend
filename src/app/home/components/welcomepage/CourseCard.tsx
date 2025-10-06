"use client";

import React from "react";
import { Clock, Users, ArrowRight } from "lucide-react";
import { useEnrollInCourse } from "@/hooks/use-enroll-in-course";

export interface CourseCardProps {
  course: {
    id: string;
    title: string;
    instructor: string;
    duration: string;
    students: number;
    price: string;
  };
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { enroll, isEnrolling } = useEnrollInCourse();

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl">
      <div className="h-28 sm:h-32 md:h-36 bg-gradient-to-r from-purple-700 to-pink-700"></div>
      <div className=" p-4 sm:p-5">
        <h3 className="text-xl font-bold text-white mb-3">{course.title}</h3>

        <p className="text-gray-400 mb-2 text-sm">By {course.instructor}</p>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 text-gray-400 text-xs sm:text-sm">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{course.students}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="text-lg sm:text-xl font-bold text-white">
            {course.price}
          </span>
          <button
            className="bg-gradient-to-r from-purple-700 to-pink-700 text-white px-3 sm:px-4 py-2 rounded-[12px] text-sm font-semibold flex items-center justify-center gap-2 group w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={() => enroll(course.id)}
            disabled={isEnrolling}
            aria-label={isEnrolling ? "Enrolling" : `Enroll in ${course.title}`}
          >
            {isEnrolling ? "Enrolling..." : "Enroll Now"}
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;


