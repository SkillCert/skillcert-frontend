"use client";
import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import CourseCard from "./components/courseCard";
import { Course } from "@/lib/interface";

const coursesData: Course[] = [
  {
    id: 1,
    name: "React Fundamentals",
    category: "Web Development",
    level: "Beginner",
    rating: 4.7,
    students: 1250,
    description:
      "Learn the basics of React including components, state, and props. Perfect for beginners starting their journey.",
    duration: "8 weeks",
    price: 340.56,
  },
  {
    id: 2,
    name: "Advanced JavaScript",
    category: "Web Development",
    level: "Advanced",
    rating: 4.8,
    students: 890,
    description:
      "Deep dive into advanced JavaScript concepts including closures, prototypes, and async programming.",
    duration: "6 weeks",
    price: 450.75,
  },
  {
    id: 3,
    name: "Python for Data Science",
    category: "Data Science",
    level: "Intermediate",
    rating: 4.6,
    students: 2100,
    description:
      "Master Python programming for data analysis, visualization, and machine learning applications.",
    duration: "10 weeks",
    price: 520.3,
  },
  {
    id: 4,
    name: "UI/UX Design Basics",
    category: "Design & UI/UX",
    level: "Beginner",
    rating: 4.5,
    students: 1580,
    description:
      "Learn the fundamentals of user interface and user experience design principles and tools.",
    duration: "7 weeks",
    price: 380.9,
  },
  {
    id: 5,
    name: "Node.js Backend Development",
    category: "Web Development",
    level: "Intermediate",
    rating: 4.7,
    students: 940,
    description: "Build scalable backend applications using Node.js, Express, and MongoDB.",
    duration: "9 weeks",
    price: 410.25,
  },
  {
    id: 6,
    name: "Machine Learning Fundamentals",
    category: "Data Science",
    level: "Advanced",
    rating: 4.9,
    students: 750,
    description:
      "Introduction to machine learning algorithms, neural networks, and practical applications.",
    duration: "12 weeks",
    price: 680.5,
  },
  {
    id: 7,
    name: "Web Design with CSS",
    category: "Design & UI/UX",
    level: "Beginner",
    rating: 4.4,
    students: 1890,
    description: "Master CSS for creating beautiful, responsive web designs from scratch.",
    duration: "5 weeks",
    price: 290.4,
  },
  {
    id: 8,
    name: "DevOps and Cloud Computing",
    category: "DevOps & Cloud",
    level: "Advanced",
    rating: 4.6,
    students: 620,
    description: "Learn DevOps practices, containerization, and cloud deployment strategies.",
    duration: "11 weeks",
    price: 590.8,
  },
  {
    id: 9,
    name: "Data Visualization with D3.js",
    category: "Data Science",
    level: "Intermediate",
    rating: 4.3,
    students: 445,
    description:
      "Create interactive and compelling data visualizations using D3.js library and modern web standards.",
    duration: "6 weeks",
    price: 395.6,
  },
];

const SearchCourses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredCourses = useMemo((): Course[] => {
    if (!searchTerm.trim()) {
      return coursesData;
    }

    return coursesData.filter((course: Course) => {
      const matchesSearch: boolean =
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    });
  }, [searchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  return (
    <main className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-[1544px] mx-auto">
        <div className="text-center max-w-[1199px] mx-auto">
          <h1 className="text-4xl text-left sm:text-4xl font-poppins font-medium text-white mb-8">
            Search courses
          </h1>

          <div className="flex items-center gap-2 w-full">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full bg-gray-800 text-white px-6 py-4 rounded-full border border-gray-700 focus:border-purple-500 focus:outline-none text-lg"
            />
            <div className="p-2">
              <Search className="w-12 h-12 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="border-b-2 border-purple-400 w-full h-12 my-4"></div>

        <div className="mb-8 max-w-[1379px] mx-auto">
          <h2 className="text-5xl sm:text-3xl font-medium font-poppins text-white mb-8">
            All Courses
          </h2>

          {filteredCourses.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              <p className="text-xl">
                No courses found matching your search.
              </p>
              <p className="mt-2">
                Try searching with different keywords.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course: Course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main >
  );
};

export default SearchCourses;