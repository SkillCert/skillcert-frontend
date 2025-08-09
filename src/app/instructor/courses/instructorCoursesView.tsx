"use client";
import React from "react";
import CourseCard from "./components/courseCard";
import { instructorCoursesData } from "@/lib/interface";
import { Button } from "@/components/ui/button";
import { CirclePlus, ListFilter } from "lucide-react";

export default function InstructorCoursesView() {
  return (
    <main className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-lg">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-semibold text-white">My Courses</h2>
            <div className="flex gap-5">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>
                  <ListFilter className="w-4 h-4" />
                </span>
                <select className="bg-gray-800 text-white border border-gray-700 rounded px-3 py-1 text-sm focus:outline-none focus:border-purple-500">
                  <option>Recently Updated</option>
                  <option>Name</option>
                  <option>Students</option>
                  <option>Rating</option>
                </select>
              </div>
              <Button
                variant="default"
                className="bg-purple-600 rounded-lg hover:bg-purple-700"
              >
                <CirclePlus className="h-4 w-4" />
                Create Course
              </Button>
            </div>
          </div>

          {instructorCoursesData.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No courses yet
              </h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Start creating your first course to share your knowledge with
                students around the world.
              </p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Create Your First Course
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {instructorCoursesData.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
