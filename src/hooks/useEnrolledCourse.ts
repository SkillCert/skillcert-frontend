"use client";
import { listUserCourses } from "@/contract_connections/CourseAccess/listUserCourses";
import { useState, useEffect, useCallback } from "react";
import { getUserAddress } from "./wallet-utils";

export interface EnrolledCourse {
    students: number;
    duration: string;
    instructor: string;
    id: string;
    title: string;
    description: string;
    creator: string;
    price: number;
    category: string;
    language: string;
    thumbnail_url: string;
    published: boolean;
    progress?: number;
}

interface UseEnrolledCoursesReturn {
    courses: EnrolledCourse[];
    loading: boolean;
    error: string | null;
    address: string | null;
    refetch: () => void;
}

export function useEnrolledCourses(): UseEnrolledCoursesReturn {
    const [courses, setCourses] = useState<EnrolledCourse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [address, setAddress] = useState<string | null>(null);

    const fetchCourses = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const userAddress = await getUserAddress();
            setAddress(userAddress);

            const result = await listUserCourses(userAddress);

            if (result.success && result.courses) {
                // Normalise: the contract returns price as a number (XLM)
                const normalised: EnrolledCourse[] = result.courses.map((c) => ({
                    ...c,
                    students: c.students ?? 0,
                    duration: c.duration ?? "",
                    instructor: c.instructor ?? "",
                    progress: c.progress ?? 0,
                }));
                setCourses(normalised);
            } else {
                setError(result.error ?? "Failed to load courses");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unexpected error");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    return { courses, loading, error, address, refetch: fetchCourses };
}