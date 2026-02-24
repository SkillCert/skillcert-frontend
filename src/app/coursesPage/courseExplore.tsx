"use client";
import React, { useState, useMemo, useEffect, useRef, use } from "react";
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
  const [coursesData, setCoursesData] = useState<Course[]>([])
  const PAGE_SIZE = 10
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState(true)
  const [initialLoading, setInitialLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const observerRef = useRef<HTMLDivElement | null>(null)




  // function to fetch courses
  const fetchCourses = async (pageNumber: number) => {
    try {
      if (pageNumber === 1) {
        setInitialLoading(true)
      } else {
        setLoadingMore(true)
      }

      setError(null)

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/courses?page=${pageNumber}&limit=${PAGE_SIZE}`
      )

      if (!res.ok) throw new Error("Failed to fetch courses")

      const data: Course[] = await res.json()

      if (data.length < PAGE_SIZE) {
        setHasMore(false)
      }

      setCoursesData(prev => {
        const existingIds = new Set(prev.map(c => c.id))
        const filtered = data.filter(c => !existingIds.has(c.id))
        return [...prev, ...filtered]
      })

    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("Something went wrong")
      }
    } finally {
      setInitialLoading(false)
      setLoadingMore(false)
    }
  }


  // Initial + Pagination Fetch
  useEffect(() => {
    fetchCourses(page)
  }, [page])




  //  filter logic
  const filteredCourses = useMemo((): Course[] => {
    return coursesData.filter((course: Course) => {
      const matchesSearch: boolean =
        (course.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
        (course.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false);

      const matchesCategory: boolean =
        selectedCategories.length === 0 || (course.category ? selectedCategories.includes(course.category) : false);

      const matchesLevel: boolean =
        selectedLevels.length === 0 || (course.level ? selectedLevels.includes(course.level) : false);

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchTerm, selectedCategories, selectedLevels, coursesData]);



  const handleCategoryChange = (category: CourseCategory): void => {
    setSelectedCategories((prev: CourseCategory[]) =>
      prev.includes(category)
        ? prev.filter((c: CourseCategory) => c !== category)
        : [...prev, category]
    );
  };

  const handleLevelChange = (level: CourseLevel): void => {
    setSelectedLevels((prev: CourseLevel[]) =>
      prev.includes(level)
        ? prev.filter((l: CourseLevel) => l !== level)
        : [...prev, level]
    );
  };

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(event.target.value);
  };

  const toggleMobileFilters = (): void => {
    setShowMobileFilters(!showMobileFilters);
  };



  // this useEffect loads more course once the sentinel div comes into view
  useEffect(() => {
    if (!hasMore || loadingMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage(prev => prev + 1)
        }
      },
      { threshold: 1 }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current)
      }
    }
  }, [hasMore, loadingMore])


  return (
    <main className="min-h-screen bg-gray-900 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-purple-400">
            Explore courses
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <CreateCourse />
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none w-full sm:w-80"
              />
            </div>
          </div>
        </div>

        <div className="lg:hidden mb-4">
          <button
            onClick={toggleMobileFilters}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-700 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            {(selectedCategories.length > 0 || selectedLevels.length > 0) && (
              <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                {selectedCategories.length + selectedLevels.length}
              </span>
            )}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div
            className={`
            ${showMobileFilters ? "block" : "hidden"} lg:block
            fixed lg:relative inset-0 lg:inset-auto z-50 lg:z-auto
            bg-gray-900 lg:bg-transparent p-4 lg:p-0
            overflow-y-auto lg:overflow-visible
          `}
          >
            <div className="w-full lg:w-64 bg-gray-800 rounded-lg p-4 sm:p-6 h-fit">
              <div className="flex justify-between items-center mb-4 lg:hidden">
                <h2 className="text-white font-semibold">Filters</h2>
                <button
                  onClick={toggleMobileFilters}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h2 className="text-white font-semibold mb-4 hidden lg:block">
                Filters
              </h2>

              <div className="mb-6">
                <h3 className="text-white font-medium mb-3">Categories</h3>
                <div className="space-y-2 sm:space-y-3">
                  {categories.map((category: CourseCategory) => (
                    <label
                      key={category}
                      className="flex items-center cursor-pointer group"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                          className="w-5 h-5 appearance-none bg-transparent border-2 border-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 checked:bg-purple-600 checked:border-purple-600"
                        />
                        {selectedCategories.includes(category) && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <svg
                              className="w-4 h-4 text-white absolute top-[3px]"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      <span className="ml-3 mt-[-7px] text-sm sm:text-base text-white transition-colors">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-white font-medium mb-3">Level</h3>
                <div className="space-y-2 sm:space-y-3">
                  {levels.map((level: CourseLevel) => (
                    <label
                      key={level}
                      className="flex items-center cursor-pointer group"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={selectedLevels.includes(level)}
                          onChange={() => handleLevelChange(level)}
                          className="w-5 h-5 appearance-none bg-transparent border-2 border-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 checked:bg-purple-600 checked:border-purple-600"
                        />
                        {selectedLevels.includes(level) && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <svg
                              className="w-4 h-4 text-white absolute top-[3px]"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      <span className="ml-3 mt-[-7px] text-sm sm:text-base text-white transition-colors">
                        {level}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {(selectedCategories.length > 0 || selectedLevels.length > 0) && (
                <div className="mt-6 pt-4 border-t border-gray-700">
                  <button
                    onClick={() => {
                      setSelectedCategories([]);
                      setSelectedLevels([]);
                    }}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {showMobileFilters && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={toggleMobileFilters}
            />
          )}

          <div className="flex-1 min-w-0">
            {initialLoading ? (
              <div className="text-center text-gray-400 py-8 flex flex-col items-center justify-center gap-4 ">
                <span>Loading courses...</span>
                <Loader />
              </div>)
              : error ?
                <div className=" w-full h-screen flex items-center justify-center " >
                  <p className="text-xl font-semibold text-red-600 " > {error} </p>
                </div>
                :
                !initialLoading && filteredCourses.length === 0 ? (
                  <div className="text-center text-gray-400 py-8 sm:py-12">
                    <p className="text-lg sm:text-xl">
                      No courses found matching your criteria.
                    </p>
                    <p className="mt-2 text-sm sm:text-base">
                      Try adjusting your filters or search term.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2  gap-4 sm:gap-6">
                    {filteredCourses.map((course: Course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}

                  </div>
                )}

            {!initialLoading && loadingMore && (
              <div className="text-center text-gray-400 py-6">
                <Loader />
              </div>
            )}

            {hasMore && (
              <div ref={observerRef} className="h-10" />
            )}

            {!initialLoading && !loadingMore && (
              <div className="mt-6  text-gray-400 text-sm flex items-center justify-center ">
                Showing {filteredCourses.length} of {coursesData.length} courses
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CourseExplore;




const Loader = () => {
  return (
    <>
      <span className="inline-flex space-x-1 ml-1">
        <span className={`w-2 h-2  rounded-full animate-bounce [animation-delay:-0.3s] bg-purple-400 `} ></span>
        <span className={`w-2 h-2 rounded-full animate-bounce [animation-delay:-0.15s] bg-purple-400 `} ></span>
        <span className={`w-2 h-2  rounded-full animate-bounce bg-purple-400 `} ></span>
      </span>
    </>
  )
}