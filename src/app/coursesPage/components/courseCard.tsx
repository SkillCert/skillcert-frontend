"use client";
import { CourseCardProps, CourseCategory } from "@/lib/interface";
import { Star, Clock } from "lucide-react";
import { useState } from "react";
import { grantAccess } from "../../../../contract_connections/CourseRegistry/grantAccess";

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const [userAddress] = useState("0x1234567890123456789012345678901234567890");
  const getCategoryColor = (category: CourseCategory): string => {
    switch (category) {
      case "Web Development":
        return "bg-blue-600";
      case "Data Science":
        return "bg-green-600";
      case "Design & UI/UX":
        return "bg-purple-600";
      case "DevOps & Cloud":
        return "bg-orange-600";
      default:
        return "bg-gray-600";
    }
  };

  const handleEnroll = async (courseId: number) => {
    try {
      const result = await grantAccess({
        course_id: courseId.toString(),
        user: userAddress,
      });

      if (result.success) {
        alert("Enrollment successful!");
      } else {
        alert(`Enrollment failed: ${result.error}`);
      }
    } catch (error) {
      console.error("Enrollment error:", error);
      alert(
        error instanceof Error
          ? `Enrollment failed: ${error.message}`
          : "Enrollment failed due to an unexpected error."
      );
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-500  flex flex-col justify-between  rounded-xl  shadow-lg transition-all duration-1000 hover:shadow-xl">
      <div>
        <div className="bg-gray-300 h-32 sm:h-[200px] flex items-center justify-center rounded-t-xl  relative">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-400 rounded-lg flex items-center justify-center">
            <div className="w-6 h-4 sm:w-8 sm:h-6 bg-gray-500 rounded"></div>
          </div>
          <span
            className={`absolute top-2 right-2 sm:top-3 sm:right-3 ${getCategoryColor(
              course.category
            )} text-white px-2 py-1 rounded text-xs font-medium`}
          >
            {course.category}
          </span>
        </div>

        <div className="flex flex-col justify-between pt-3 px-3 text-white">
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-2 line-clamp-2">
              {course.name}
            </h3>

            <div className="flex items-center mb-2">
              <Star className="w-4 h-4 text-yellow-500 fill-current flex-shrink-0" />
              <span className="ml-1 text-xs sm:text-sm truncate">
                {course.rating} ({course.students} students)
              </span>
            </div>

            <p className="text-gray-300 text-xs sm:text-sm  sm:mb-4 line-clamp-3">
              {course.description}
            </p>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4  rounded-b-2xl">
        <div className="flex flex-wrap gap-[6px] sm:gap-2 mb-3 sm:mb-4">
          <div className="bg-gray-900 text-cyan-400 border border-cyan-400 px-3 py-1 rounded-full font-bold text-[14px] whitespace-nowrap">
            {course.level}
          </div>
          <div className=" border bg-gray-900 text-pink-600 border-pink-600 flex items-center gap-[5px] font-bold px-3 py-1 rounded-full text-[14px] whitespace-nowrap">
            <Clock size={14} className=" font-black" />
            <p>{course.duration}</p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-500">
          <span className="text-base sm:text-lg text-white font-bold mt-2">
            {course.price.toFixed(2)} XLM
          </span>
          <button
            className="bg-pink-800 text-white px-3 py-2 sm:px-4 rounded-full font-medium transition-colors text-xs sm:text-sm mt-2"
            onClick={() => handleEnroll(course.id)}
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
