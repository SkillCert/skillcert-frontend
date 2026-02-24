"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface CourseDetail {
  id: string;
  title: string;
  description: string;
}

const CourseDetailPage = () => {
  const params = useParams();
  const id = params?.id as string | undefined;

  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError(null);
        setNotFound(false);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`
        );

        if (res.status === 404) {
          setNotFound(true);
          return;
        }

        if (!res.ok) {
          throw new Error("Failed to fetch course");
        }

        const data: CourseDetail = await res.json();
        setCourse(data);
      } catch (err) {
        console.error(err);
        setError("Something went wrong while loading the course.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);



  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p>Loading course...</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p>Course not found.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-3">
      <h1 className="text-2xl font-bold">{course?.title}</h1>
      <p className="text-gray-400">{course?.description}</p>
    </div>
  );
};

export default CourseDetailPage;