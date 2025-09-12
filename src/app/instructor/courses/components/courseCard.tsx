import { CourseCardProps } from "@/lib/interface";
import {
  Star,
  Clock,
  Users,
  DollarSign,
  BookOpen,
  MoreVertical,
} from "lucide-react";
import Image from "next/image";

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl overflow-hidden">
      <div className="bg-gray-300 h-40 flex items-center justify-center relative">
        {course.img ? (
          <Image
            src={course.img}
            alt={course.name || 'Course image'}
            fill
            className="object-cover rounded-t-xl"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-400 rounded-lg flex items-center justify-center">
            <div className="w-8 h-6 bg-gray-500 rounded"></div>
          </div>
        )}

        <div className="absolute top-3 right-3">
          <button className="text-gray-600 hover:text-gray-800">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-6 bg-gray-900">
        <h3 className="text-lg font-bold text-white mb-2">{course.name}</h3>

        <p className="text-gray-300 text-sm mb-3 line-clamp-2">
          {course.description}
        </p>

        <div className="flex flex-wrap gap-2 my-6">
          <span className="border border-gray-400  bg-blue-900 text-gray-300 px-3 py-1 rounded-full text-xs font-medium">
            {course.status}
          </span>
          <span className="text-white border border-gray-500 px-3 py-1 rounded-full text-xs font-medium ">
            {course.category}
          </span>
          <span className="border border-gray-400 text-gray-300 px-3 py-1 rounded-full text-xs font-medium">
            {course.level}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <DollarSign className="w-4 h-4" />
            <span>{course.price ? (typeof course.price === 'number' ? course.price.toFixed(2) : course.price) : 'Free'} USD</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <Users className="w-4 h-4" />
            <span>{course.students} Students</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <Star className="w-4 h-4" />
            <span>-- Avg. Rating</span>
          </div>
        </div>

        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 mt-4">
          <BookOpen className="w-4 h-4" />
          Go to Content
        </button>
      </div>
    </div>
  );
}
