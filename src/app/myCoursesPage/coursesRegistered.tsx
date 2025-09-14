"use client";
import { Search, Star, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { grantAccess } from "../../../contract_connections/CourseRegistry/grantAccess";

interface Course {
  id: number;
  name: string;
  description: string;
  rating: number;
  students: number;
  level: string;
  duration: string;
  price: string;
  category: string;
}

import { Course } from "@/types";

export default function CoursesRegistered() {
  const [userAddress] = useState("0x1234567890123456789012345678901234567890");
  const courses: Course[] = [
    {
      id: 1,
      name: "Course Name",
      description:
        "Description of the course text. In this space users will see a brief annotation about course content.",
      rating: 4.7,
      students: 100,
      level: "Beginner",
      duration: "8 weeks",
      price: "340.56 XLM",
      category: "Web Development",
    },
    {
      id: 2,
      name: "Course Name",
      description:
        "Description of the course text. In this space users will see a brief annotation about course content.",
      rating: 4.7,
      students: 100,
      level: "Beginner",
      duration: "8 weeks",
      price: "340.56 XLM",
      category: "Web Development",
    },
    {
      id: 3,
      name: "Course Name",
      description:
        "Description of the course text. In this space users will see a brief annotation about course content.",
      rating: 4.7,
      students: 100,
      level: "Beginner",
      duration: "8 weeks",
      price: "340.56 XLM",
      category: "Web Development",
    },
    {
      id: 4,
      name: "Course Name",
      description:
        "Description of the course text. In this space users will see a brief annotation about course content.",
      rating: 4.7,
      students: 100,
      level: "Beginner",
      duration: "8 weeks",
      price: "340.56 XLM",
      category: "Web Development",
    },
    {
      id: 5,
      name: "Course Name",
      description:
        "Description of the course text. In this space users will see a brief annotation about course content.",
      rating: 4.7,
      students: 100,
      level: "Beginner",
      duration: "8 weeks",
      price: "340.56 XLM",
      category: "Web Development",
    },
    {
      id: 6,
      name: "Course Name",
      description:
        "Description of the course text. In this space users will see a brief annotation about course content.",
      rating: 4.7,
      students: 100,
      level: "Beginner",
      duration: "8 weeks",
      price: "340.56 XLM",
      category: "Web Development",
    },
  ];

  const handleEnroll = async (courseId: number) => {
    const result = await grantAccess({
      course_id: courseId.toString(),
      user: userAddress,
    });
    if (result.success) {
      alert("Enrollment successful!");
    } else {
      alert(`Enrollment failed: ${result.error}`);
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold text-purple-400 mb-8">
            ¡Hello, Alex Johnson!
          </h1>

          <div className="mb-12">
            <h2 className="text-white text-xl mb-4">Search courses</h2>
            <div className="flex items-center gap-4 mb-6 w-full">
              <div className="relative w-[90%]">
                <Input
                  type="text"
                  placeholder="Search"
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-400 pr-12 h-12 rounded-full"
                />
              </div>

              <Search className="w-12 h-12 text-purple-600 hover:text-purple-700" />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-white text-2xl font-semibold mb-6">
            Your Courses
          </h2>

          <div className="mb-8">
            <Input
              type="text"
              placeholder="Search"
              className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-400 max-w-xs h-10 rounded-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card
                key={course.id}
                className="bg-white border-0 shadow-lg overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <ImageIcon className="w-16 h-16 text-gray-400" />
                    </div>
                    <Badge className="absolute top-3 right-3 bg-purple-600 hover:bg-purple-700 text-white">
                      {course.category}
                    </Badge>
                  </div>

                  <div className="p-4 bg-slate-800 text-white">
                    <h3 className="font-semibold text-lg mb-2">
                      {course.name}
                    </h3>

                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{course.rating}</span>
                      </div>
                      <span className="text-sm text-gray-400">
                        ({course.students} students)
                      </span>
                    </div>

                    <p className="text-sm text-gray-300 mb-3 line-clamp-3">
                      {course.description}
                    </p>

                    <div className="flex gap-2 mb-4">
                      <Badge
                        variant="outline"
                        className="text-xs border-purple-400 text-purple-400"
                      >
                        {course.level}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-xs border-pink-400 text-pink-400"
                      >
                        {course.duration}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">
                        {course.price}
                      </span>
                      <Button
                        className="bg-pink-600 hover:bg-pink-700 text-white px-6"
                        onClick={() =>
                          handleEnroll(
                            typeof course.id === "string"
                              ? parseInt(course.id, 10)
                              : course.id
                          )
                        }
                      >
                        Enroll Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
