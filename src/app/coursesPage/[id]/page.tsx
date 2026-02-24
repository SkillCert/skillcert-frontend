"use client"


import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface CourseDetail {
    id: string;
    title: string;
    description: string;
}

const CourseDetailPage = () => {
    const params = useParams();
    const { id } = params;
    const [course, setCourse] = useState<CourseDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`);
                if (res.status === 404) {
                    setError(true);
                    return;
                }
                const data = await res.json();
                setCourse(data);
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id]);

    if (loading) return (
        <div className=" w-full h-screen flex items-center justify-center" >
            <p>Loading course...</p>
        </div>
    );


    if (error || !course) return
    (
        <div className=" w-full h-screen flex items-center justify-center" ><p>Course not found.</p></div>
    );

    return (
        <div className="course-detail w-full h-screen flex items-center justify-center flex-col gap-3 ">
            <h1>{course.title}</h1>
            <p>{course.description}</p>
        </div>
    );
};

export default CourseDetailPage;