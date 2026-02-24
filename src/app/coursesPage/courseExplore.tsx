"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { Search, Filter, X } from "lucide-react";
import CourseCard from "./components/courseCard";
import CreateCourse from "./components/createCourse";
import { levels } from "@/lib/interface";
import { categories } from "@/lib/interface";
import { Course, CourseLevel, CourseCategory } from "@/lib/interface";

const CourseExplore: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<CourseCategory[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<CourseLevel[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const [coursesData, setCoursesData] = useState<Course[]>([]);
  const PAGE_SIZE = 10;
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);

  /**
   * Fetches courses based on the page number.
   * - Page 1 → triggers full-page loading state
   * - Page > 1 → triggers pagination loading state
   */
  const fetchCourses = async (pageNumber: number) => {
    try {
      if (pageNumber === 1) {
        setInitialLoading(true);
      } else {
        setLoadingMore(true);
      }

      setError(null);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/courses?page=${pageNumber}&limit=${PAGE_SIZE}`
      );

      if (!res.ok) throw new Error("Failed to fetch courses");

      const data: Course[] = await res.json();

      /**
       * If fewer than PAGE_SIZE returned,
       * there are no more pages available.
       */
      if (data.length < PAGE_SIZE) {
        setHasMore(false);
      }

      /**
       * Prevent duplicate entries:
       * Only append courses that do not already exist in state.
       */
      setCoursesData((prev) => {
        const existingIds = new Set(prev.map((c) => c.id));
        const filtered = data.filter((c) => !existingIds.has(c.id));
        return [...prev, ...filtered];
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setInitialLoading(false);
      setLoadingMore(false);
    }
  };

  /**
   * Fetch on page change.
   * This drives both initial load and pagination.
   */
  useEffect(() => {
    fetchCourses(page);
  }, [page]);

  /**
   * Filters based on:
   * - Search term
   * - Selected categories
   * - Selected levels
   */
  const filteredCourses = useMemo((): Course[] => {
    return coursesData.filter((course: Course) => {
      const matchesSearch =
        (course.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
        (course.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false);

      const matchesCategory =
        selectedCategories.length === 0 ||
        (course.category ? selectedCategories.includes(course.category) : false);

      const matchesLevel =
        selectedLevels.length === 0 ||
        (course.level ? selectedLevels.includes(course.level) : false);

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchTerm, selectedCategories, selectedLevels, coursesData]);

  /**
   * Using IntersectionObserver to detect when the sentinel div
   * enters the viewport and increments page number.
   *
   * Guard conditions:
   * - Do nothing if no more pages
   * - Do nothing if already loading
   */
  useEffect(() => {
    if (!hasMore || loadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore, loadingMore]);

  /**
   * =========================
   * HANDLERS
   * =========================
   */
  const handleCategoryChange = (category: CourseCategory): void => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleLevelChange = (level: CourseLevel): void => {
    setSelectedLevels((prev) =>
      prev.includes(level)
        ? prev.filter((l) => l !== level)
        : [...prev, level]
    );
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  const toggleMobileFilters = (): void => {
    setShowMobileFilters(!showMobileFilters);
  };


  return (
    <main className="min-h-screen bg-gray-900 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Initial Loading State */}
        {initialLoading ? (
          <div className="text-center text-gray-400 py-8 flex flex-col items-center gap-4  ">
            <span>Loading courses...</span>
            <Loader />
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            No courses found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {filteredCourses.map((course: Course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}

        {/* Pagination Loader (appears below existing courses) */}
        {!initialLoading && loadingMore && (
          <div className="text-center text-gray-400 py-6">
            <Loader />
          </div>
        )}

        {/* Infinite Scroll Sentinel */}
        {hasMore && <div ref={observerRef} className="h-10" />}

        {/* Footer Info */}
        {!initialLoading && !loadingMore && (
          <div className="mt-6 text-gray-400 text-sm text-center">
            Showing {filteredCourses.length} of {coursesData.length} courses
          </div>
        )}
      </div>
    </main>
  );
};

export default CourseExplore;

/**
 * Simple animated loader used for both
 * initial loading and pagination loading.
 */
const Loader = () => {
  return (
    <span className="inline-flex space-x-1">
      <span className="w-2 h-2 rounded-full animate-bounce bg-purple-400 [animation-delay:-0.3s]" />
      <span className="w-2 h-2 rounded-full animate-bounce bg-purple-400 [animation-delay:-0.15s]" />
      <span className="w-2 h-2 rounded-full animate-bounce bg-purple-400" />
    </span>
  );
};