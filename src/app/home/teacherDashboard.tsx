"use client";

import React from "react";
import { Users, BookOpen, DollarSign, BarChart } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import TopCourses from "@/components/dashboard/TopCourses";
import CourseStatistics from "@/components/dashboard/CourseStatistics";
import QuickActions from "@/components/dashboard/QuickActions";

const TeacherDashboard = () => {
  return (
    <div className="container min-h-screen w-full px-4 sm:px-6 lg:px-8 py-8 mx-auto">
      <DashboardHeader userName="Alex Johnson" />

      <DashboardMetrics
        metrics={[
          {
            icon: (<Users color="#be185d" size={50} />) as React.ReactElement,
            label: "Total Students",
            value: "1000+",
          },
          {
            icon: (
              <BookOpen color="#be185d" size={50} />
            ) as React.ReactElement,
            label: "Total Courses",
            value: "6",
          },
          {
            icon: (
              <DollarSign color="#be185d" size={50} />
            ) as React.ReactElement,
            label: "Total Revenue",
            value: "$12 580",
          },
          {
            icon: (
              <BarChart color="#be185d" size={50} />
            ) as React.ReactElement,
            label: "Completion Rate",
            value: "78%",
          },
        ]}
      />

      <TopCourses
        courses={[
          {
            name: "Course Name",
            rating: 4.7,
            students: 100,
            description:
              "Description of the course text. In this space users will see a brief orientation about course content.",
            price: "340.56 XLM",
            category: "Category",
            level: "Level",
            duration: "3 weeks",
          },
          {
            name: "Course Name",
            rating: 4.7,
            students: 100,
            description:
              "Description of the course text. In this space users will see a brief orientation about course content.",
            price: "340.56 XLM",
            category: "Category",
            level: "Level",
            duration: "3 weeks",
          },
          {
            name: "Course Name",
            rating: 4.7,
            students: 100,
            description:
              "Description of the course text. In this space users will see a brief orientation about course content.",
            price: "340.56 XLM",
            category: "Category",
            level: "Level",
            duration: "3 weeks",
          },
        ]}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mx-auto mt-8">
        <CourseStatistics />
        <QuickActions />
      </div>
    </div>
  );
};

export default TeacherDashboard;
