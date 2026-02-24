"use client";
import { Play, ImageIcon, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/footer";
// import ContentModal from "../coursesPage/coursesPreview/components/contentModal";
import { useEnrolledCourses } from "@/hooks/useEnrolledCourse";

// ---------------------------------------------------------------------------
// Skeleton — matches the existing Card layout
// ---------------------------------------------------------------------------
function CourseCardSkeleton() {
  return (
    <Card className="bg-[#1F2937] border-0 shadow-lg overflow-hidden animate-pulse">
      <CardContent className="p-0">
        <div className="flex items-stretch">
          <div className="w-32 h-40 bg-gray-700 flex-shrink-0" />
          <div className="flex-1 p-4 pr-2 space-y-3">
            <div className="h-6 w-3/4 rounded bg-gray-600" />
            <div className="h-4 w-full rounded bg-gray-600" />
            <div className="h-4 w-1/2 rounded bg-gray-600" />
            <div className="h-6 w-20 rounded-full bg-gray-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Error banner
// ---------------------------------------------------------------------------
function ErrorBanner({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex items-center gap-3 bg-red-900/30 border border-red-700/50 rounded-xl px-4 py-3 text-red-300 text-sm mb-6">
      <AlertCircle className="w-4 h-4 flex-shrink-0" />
      <span className="flex-1">{message}</span>
      <button
        onClick={onRetry}
        className="flex items-center gap-1.5 text-red-300 hover:text-white transition-colors"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        Retry
      </button>
    </div>
  );
}

export default function MyCourses() {
  const { courses, loading, error, refetch } = useEnrolledCourses();

  return (
    <div className="bg-slate-900 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-purple-400 mb-10">
          My courses
        </h1>

        {/* <ContentModal /> */}

        {error && <ErrorBanner message={error} onRetry={refetch} />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {loading ? (
            <>
              <CourseCardSkeleton />
              <CourseCardSkeleton />
              <CourseCardSkeleton />
              <CourseCardSkeleton />
            </>
          ) : courses.length === 0 && !error ? (
            <div className="col-span-2 text-center text-gray-400 py-12">
              <p className="text-lg">You haven&apos;t enrolled in any courses yet.</p>
              <p className="mt-2 text-sm">Head to Explore to find something great.</p>
            </div>
          ) : (
            courses.map((course, index) => (
              <Card
                key={course.id ?? index}
                className="bg-[#1F2937] border-0 shadow-lg overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="flex items-stretch">
                    {course.thumbnail_url ? (
                      <img
                        src={course.thumbnail_url}
                        alt={course.title}
                        className="w-32 h-40 object-cover flex-shrink-0"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <ImageIcon className="w-32 h-40 object-cover bg-gray-100 flex-shrink-0" />
                    )}

                    <div className="flex-1 p-4 pr-2">
                      <h3 className="font-semibold text-gray-100 text-2xl mb-1">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {course.description}
                      </p>
                      <p className="text-xs text-gray-200 mb-2">
                        <span className="font-medium">By:</span>{" "}
                        {course.creator || "Unknown"}
                      </p>
                      <Badge
                        variant="secondary"
                        className="bg-[#121B2B] text-[#297ea8] border-[#297ea8] hover:bg-blue-100 text-xs px-3 py-1"
                      >
                        {course.category || "General"}
                      </Badge>
                    </div>

                    <div className="p-4 pl-2 flex items-end">
                      <Button
                        size="icon"
                        className="bg-purple-600 hover:bg-purple-700 rounded-full w-14 h-14 shadow-lg"
                      >
                        <Play className="w-4 h-4 fill-white ml-0.5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}