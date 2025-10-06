"use client";
import React from "react";
import Link from "next/link";
import Container from "@/components/container/Container";
import CourseCard from "./CourseCard";

interface Course {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  students: number;
  price: string;
}

const courses: Course[] = [
  {
    id: "1",
    title: "Advanced React Development",
    instructor: "Jhon Miller",
    duration: "12 weeks",
    students: 134,
    price: "120 XLM",
  },
  {
    id: "2",
    title: "Machine Learning Fundamentals",
    instructor: "Jhon Miller",
    duration: "12 weeks",
    students: 134,
    price: "120 XLM",
  },
  {
    id: "3",
    title: "UI/UX Design Mastery",
    instructor: "Jhon Miller",
    duration: "12 weeks",
    students: 134,
    price: "120 XLM",
  },
];

const CourseExplorationSection: React.FC = () => {
  return (
    <section className="bg-gray-900 py-12 sm:py-16 lg:py-20">
      <Container alt>
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Featured Courses
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Discover our most popular courses designed to accelerate your career
            growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        <div className="text-center pt-[30px]">
          <Link
            href="/coursesPage"
            className="inline-block w-full sm:w-auto bg-gradient-to-r from-[#9333EA] to-[#FB64B6] text-white px-6 md:px-8 py-3 rounded-[16px] border border-white font-semibold text-base md:text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            aria-label="Explore all courses in the app"
          >
            Explore all courses in the app
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default CourseExplorationSection;
