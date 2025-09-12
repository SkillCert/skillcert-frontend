// Re-export all types from the centralized types directory
export * from '../types';

// Legacy data - keeping for backward compatibility
export const levels = ["Beginner", "Intermediate", "Advanced"] as const;
export const categories = [
  "Web Development",
  "Data Science",
  "Design & UI/UX",
  "DevOps & Cloud",
] as const;

// Sample data for development
export const instructorCoursesData = [
  {
    id: 1,
    name: "React Fundamentals",
    category: "Web Development" as const,
    level: "Beginner" as const,
    status: "Published" as const,
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
    category: "Web Development" as const,
    level: "Advanced" as const,
    status: "Draft" as const,
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
    category: "Data Science" as const,
    level: "Intermediate" as const,
    status: "Published" as const,
    rating: 4.6,
    students: 2100,
    description:
      "Master Python programming for data analysis, visualization, and machine learning applications.",
    duration: "10 weeks",
    price: 520.3,
    img: "/images/not-found.jpg",
  },
];
