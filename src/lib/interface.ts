import { JSX } from "react";

export interface WelcomePageBlockProps {
  icon: JSX.Element;
  text: string;
  figure: number;
}

export interface featuredCourseProps {
  id: number;
  title: string;
  description: string;
  img: string;
}

export const levels: CourseLevel[] = ["Beginner", "Intermediate", "Advanced"];
type CourseCategory =
  | "Web Development"
  | "Data Science"
  | "Design & UI/UX"
  | "DevOps & Cloud";
type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

interface Course {
  id?: number;
  name: string;
  category?: CourseCategory;
  level?: CourseLevel;
  rating?: number;
  students?: number;
  description?: string;
  duration?: string;
  price?: number;
  img?: string;
  status?: CourseStatus;
}

export const categories: CourseCategory[] = [
  "Web Development",
  "Data Science",
  "Design & UI/UX",
  "DevOps & Cloud",
];

type CourseStatus = "Published" | "Draft";
export const instructorCoursesData: Course[] = [
  {
    id: 1,
    name: "React Fundamentals",
    category: "Web Development",
    level: "Beginner",
    status: "Published",
    rating: 4.7,
    students: 1250,
    description:
      "Learn the basics of React including components, state, and props. Perfect for beginners starting their journey.",
    duration: "8 weeks",
    price: 340.56,
    img: "/images/not-found.jpg",
  },
  {
    id: 2,
    name: "Advanced JavaScript",
    category: "Web Development",
    level: "Advanced",
    status: "Draft",
    rating: 4.8,
    students: 890,
    description:
      "Deep dive into advanced JavaScript concepts including closures, prototypes, and async programming.",
    duration: "6 weeks",
    price: 450.75,
    img: "/images/not-found.jpg",
  },

  {
    id: 3,
    name: "Python for Data Science",
    category: "Data Science",
    level: "Intermediate",
    status: "Published",
    rating: 4.6,
    students: 2100,
    description:
      "Master Python programming for data analysis, visualization, and machine learning applications.",
    duration: "10 weeks",
    price: 520.3,
    img: "/images/not-found.jpg",
  },
];
interface CourseCardProps {
  course: Course;
}

interface FilterState {
  searchTerm: string;
  selectedCategories: CourseCategory[];
  selectedLevels: CourseLevel[];
}

export type {
  CourseCardProps,
  CourseCategory,
  CourseLevel,
  Course,
  FilterState,
};
