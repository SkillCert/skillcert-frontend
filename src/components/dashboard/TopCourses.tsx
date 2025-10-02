import React from "react";
import { Star, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Course {
  name: string;
  rating: number;
  students: number;
  description: string;
  price: string;
  category: string;
  level: string;
  duration: string;
  imageUrl?: string;
}

interface TopCoursesProps {
  courses: Course[];
}

const TopCourses: React.FC<TopCoursesProps> = ({ courses }) => (
  <div className="w-full px-4 sm:px-0 mb-10 mx-auto">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold text-purple-600">Your Top Courses</h2>
      <Link
        href="/courses"
        className="text-xs uppercase tracking-wide text-purple-600 hover:text-purple-400 font-semibold flex items-center gap-1"
      >
        All Courses <ArrowRight className="w-4 h-4" />
      </Link>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course, idx) => (
        <div
          key={idx}
          className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg flex flex-col border border-gray-700 cursor-pointer"
        >
          <div className="relative h-[200px] w-full overflow-hidden rounded-t-2xl bg-[#181e2a]">
            <span className="absolute top-3 right-3 bg-purple-700 text-xs text-white px-4 py-1 rounded-full font-semibold z-10">
              {course.category}
            </span>
            <Image
              src={course.imageUrl || "/images/not-found.jpg"}
              alt={course.name}
              className="w-full h-full object-cover"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
          </div>
          <div className="bg-[#23283b] p-5 flex-1 flex flex-col border-t border-gray-700">
            <div className="font-bold text-white text-2xl sm:text-3xl mb-1 leading-tight">
              {course.name}
            </div>
            <div className="flex items-center text-yellow-400 text-sm mb-1">
              <Star className="w-4 h-4 mr-1" fill="#facc15" /> {course.rating}{" "}
              <span className="text-gray-400 ml-2">
                ({course.students} students)
              </span>
            </div>
            <div className="text-gray-300 text-xs mb-3 leading-snug">
              {course.description}
            </div>
            <div className="flex flex-wrap gap-3 mb-4">
              {" "}
              <span className="border bg-gray-900 border-cyan-400 text-cyan-300 font-bold text-sm px-4 py-1 rounded-full flex items-center min-h-[38px]">
                {" "}
                {course.level}
              </span>
              <span className="border bg-gray-900 border-pink-600 text-pink-500 font-bold text-sm px-4 py-1 rounded-full flex items-center min-h-[38px]">
                {" "}
                <Clock className="w-4 h-4 mr-1 text-pink-600" />{" "}
                {course.duration}
              </span>
            </div>
            <div className="border-t border-gray-700 pt-4 flex flex-wrap items-center justify-between gap-3 mt-auto">
              {" "}
              <span className="font-bold text-white text-lg">
                {course.price}
              </span>
              <button className="bg-pink-700 hover:bg-pink-800 text-white text-sm px-5 py-2 rounded-full font-semibold transition">
                {" "}
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TopCourses;
