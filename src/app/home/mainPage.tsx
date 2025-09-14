"use client";

import { BookOpen, Library, Star, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function MainPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold text-white mb-2">
            Welcome Back, Jhon Doe!
          </h1>
          <p className="text-white text-lg">
            Continue your learning journey and track your progress
          </p>
        </div>

        {/* Action Cards and Statistics */}
        <div className="flex gap-36">
          {/* Action Cards */}
          <div className="flex gap-8 flex-shrink-0">
            {/* My Learning Button */}
            <button className="bg-gray-900 border border-gray-600 hover:border-gray-500 transition-colors cursor-pointer rounded-lg p-2 flex flex-col items-center justify-center h-40 w-40">
              <BookOpen className="w-24 h-24 text-white mb-2" />
              <span className="text-sm font-semibold text-white text-center leading-tight">
                My learning
              </span>
            </button>

            {/* Course Catalog Button */}
            <button className="bg-gray-900 border border-gray-600 hover:border-gray-500 transition-colors cursor-pointer rounded-lg p-2 flex flex-col items-center justify-center h-40 w-40">
              <Library className="w-24 h-24 text-white mb-2" />
              <span className="text-sm font-semibold text-white text-center leading-tight">
                Course Catalog
              </span>
            </button>
          </div>

          {/* Statistics Section */}
          <Card className="bg-gray-900 border-gray-600 h-40 flex-1">
            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Certificates */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-pink-400" />
                    <span className="text-white">Certificates</span>
                  </div>
                  <span className="text-2xl font-bold text-white">0</span>
                </div>

                {/* Enrolled Courses */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-pink-400" />
                    <span className="text-white">Enrolled Courses</span>
                  </div>
                  <span className="text-2xl font-bold text-white">0</span>
                </div>

                {/* Learning Hours */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-pink-400" />
                    <span className="text-white">Learning Hours</span>
                  </div>
                  <span className="text-2xl font-bold text-white">0</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
