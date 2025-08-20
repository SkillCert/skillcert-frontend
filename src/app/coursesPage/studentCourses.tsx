interface Course {
  id: string
  name: string
  duration: string
  progress: string
  level: string
  nextLesson: string
}
//mock data
const courses: Course[] = [
  {
    id: "c1",
    name: "React Foundations",
    duration: "2 hours",
    progress: "2/16 lessons",
    level: "Beginner",
    nextLesson: "Components & Props",
  },
  {
    id: "c2",
    name: "TypeScript Essentials",
    duration: "3 hours",
    progress: "5/20 lessons",
    level: "Intermediate",
    nextLesson: "Advanced Types",
  },
  {
    id: "c3",
    name: "UI Patterns in Next.js",
    duration: "4 hours",
    progress: "1/12 lessons",
    level: "Advanced",
    nextLesson: "Server Components",
  },
]

function CourseCard({ course }: { course: Course }) {
  return (
    <article
      className="relative bg-gray-900 border border-white/5 rounded-2xl shadow-lg transition-all duration-200 hover:ring-1 hover:ring-white/10 hover:-translate-y-0.5 overflow-hidden"
      aria-labelledby={`course-${course.id}-title`}
    >
      {/* Gradient strip on the left */}
      <div className="absolute left-0 top-0 bottom-0 w-14 md:w-[72px] bg-gradient-to-b from-pink-700 via-purple-400 to-purple-600" />

      {/* Content area */}
      <div className="ml-14 md:ml-[72px] p-4 md:p-5 flex flex-col h-full">
        {/* Course name */}
        <h2 id={`course-${course.id}-title`} className="text-sm md:text-base font-semibold text-white mb-3">
          {course.name}
        </h2>

        {/* Metadata badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span
            className="text-[11px] md:text-xs px-2 py-1 rounded-full bg-white/10 text-white/80"
            aria-label={`Duration: ${course.duration}`}
          >
            ⏱ {course.duration}
          </span>
          <span
            className="text-[11px] md:text-xs px-2 py-1 rounded-full bg-white/10 text-white/80"
            aria-label={`Progress: ${course.progress}`}
          >
            📚 {course.progress}
          </span>
          <span
            className="text-[11px] md:text-xs px-2 py-1 rounded-full bg-white/10 text-white/80"
            aria-label={`Level: ${course.level}`}
          >
            🧩 {course.level}
          </span>
        </div>

        {/* Next lessonn */}
        <div className="mb-4 flex-grow">
          <span className="text-white/70 text-xs md:text-sm">Next Lesson: </span>
          <span className="text-white/90 text-xs md:text-sm italic">{course.nextLesson}</span>
        </div>


        {/* Continue button */}
        <div className="flex justify-end">
          <button
            className="bg-purple-600 hover:bg-purple-400 text-white text-xs md:text-sm px-4 py-1.5 rounded-full transition-colors duration-200 flex items-center gap-2"
            aria-label={`Continue ${course.name}`}
          >
            Continue
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white/40 rounded-full" />
          </button>
        </div>
      </div>
    </article>
  )
}

export default function StudentCourses() {
  return (
    <div className="min-h-screen bg-gray-950 text-white/90 pt-10">

      <div className="border border-white/5 rounded-lg max-w-6xl mx-auto px-6 lg:px-8 py-10">

        {/* Page title */}
        <h1 className="text-3xl md:text-4xl font-semibold text-white mb-8 md:mb-10">My courses</h1>

        {/* Courses grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  )
}
