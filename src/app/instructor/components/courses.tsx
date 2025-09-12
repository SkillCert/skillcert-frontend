import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import React from "react";
import Image from "next/image";

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  studentsCount: number;
  createdAt: Date;
  updatedAt: Date;
  status: "draft" | "published" | "archived";
}

interface CoursesProps {
  courses?: Course[];
  isLoading?: boolean;
  onCreateCourse: () => void | Promise<void>;
  className?: string;
}

const Courses: React.FC<CoursesProps> = ({
  courses = [],
  isLoading = false,
  onCreateCourse,
  className = "",
}) => {

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <p className="text-white">Loading courses...</p>
      </main>
    );
  }

  const EmptyState = () => (
    <div className="rounded-lg border bg-[#111827] border-[#1F2937]">
      <div className="flex flex-col items-center justify-center py-16 lg:py-24 px-4 text-center">
        <div className="mb-6">
          <Image
            src="/openbookgrey.svg"
            alt="No courses created yet"
            width={60}
            height={60}
            className="w-16 h-16"
          />
        </div>
        <h3 className="mb-2 text-lg font-semibold">No courses created</h3>
        <p className="mb-6 text-center text-[#D1D5DB]">
          Share your expertise with the world by creating your first course
        </p>

        <Button
          variant="default"
          className="bg-purple-600 rounded-lg hover:bg-purple-700"
        >
          <CirclePlus className="h-4 w-4 mr-2" />
          Create Course
        </Button>
      </div>
    </div>
  );

  const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
    <div className="rounded-lg p-6 transition-all duration-200 hover:shadow-lg cursor-pointer border bg-[#1a1a2e] border-[#374151]">
      <div className="w-full h-32 rounded-md mb-4 flex items-center justify-center bg-[#374151]">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-[#a1a1aa]"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21,15 16,10 5,21" />
        </svg>
      </div>

      <h3 className="text-lg font-semibold mb-2 text-white">{course.title}</h3>
      <p className="text-sm mb-3 line-clamp-2 text-[#a1a1aa]">
        {course.description}
      </p>

      <div className="flex items-center justify-between text-sm text-[#71717a]">
        <span>{course.studentsCount} students</span>
        <span>{new Date(course.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );

  return (
    <main className={`min-h-screen px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto py-8 lg:py-12">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            My courses
          </h1>

          <Button
            variant="default"
            className="bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            <CirclePlus className="h-4 w-4 mr-2" />
            Create Course
          </Button>
        </header>

        <div className="border-b my-8 border-[#374151]"></div>
        {courses.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Courses;
