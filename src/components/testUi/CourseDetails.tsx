import React, { useEffect, useState } from "react";
import {
  getCourse,
  Course,
} from "../../contract_connections/CourseRegistry/getCourse";

interface CourseDetailsProps {
  courseId: string;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ courseId }) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getCourse(courseId);
        setCourse(data);
      } catch (err: any) {
        setError(err.message || "Failed to load course.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!course) return <div>No course found.</div>;

  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <p>Creator: {course.creator}</p>
      <p>Price: {course.price}</p>
      <p>Category: {course.category}</p>
      <p>Language: {course.language}</p>
      <p>Published: {course.published ? "Yes" : "No"}</p>
    </div>
  );
};

export default CourseDetails;
