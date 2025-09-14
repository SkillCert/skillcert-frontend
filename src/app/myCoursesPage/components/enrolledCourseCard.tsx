import React from "react";

export type EnrolledCourseCardProps = {
  courseName: string;
  totalHours: number | string;
  lessonsCompleted: number;
  totalLessons: number;
  level: string;
  nextLessonName: string;
  onContinue?: () => void;
  onBookmarkToggle?: () => void;
  bookmarked?: boolean;
  className?: string;
};

export default function EnrolledCourseCard({
  courseName,
  totalHours,
  lessonsCompleted,
  totalLessons,
  level,
  nextLessonName,
  onContinue,
  onBookmarkToggle,
  bookmarked = false,
  className = "",
}: EnrolledCourseCardProps) {
  return (
    <section
      className={`relative rounded-3xl bg-[#2B2E34]/90 p-3 sm:p-4 ${className}`}
      aria-label={`enrolled-course-card ${courseName}`}
    >
      <div className="relative flex overflow-hidden rounded-3xl bg-[#0E1321]">
        <div
          aria-hidden
          className="w-24 shrink-0 rounded-l-3xl bg-gradient-to-b from-[#F2A7E2] via-[#F07ED6] to-[#B24CF2]"
        />

        <div className="relative flex-1 p-6 sm:p-7 md:p-8">
          <button
            type="button"
            aria-label={bookmarked ? "Quitar de guardados" : "Guardar curso"}
            onClick={onBookmarkToggle}
            className="absolute right-4 top-4 rounded-full p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9B5CF6]/70"
          >
            {bookmarked ? (
              <StarSolid className="h-5 w-5 text-[#9B5CF6]" />
            ) : (
              <StarOutline className="h-5 w-5 text-[#9B5CF6]" />
            )}
          </button>

          <h3 className="text-[22px] font-extrabold leading-tight tracking-tight text-white md:text-2xl">
            {courseName}
          </h3>

          <div className="mt-4 flex flex-wrap gap-3">
            <Pill>
              <ClockIcon className="mr-2 h-4 w-4" />
              <span className="align-middle">{totalHours} hours</span>
            </Pill>

            <Pill>
              <BookIcon className="mr-2 h-4 w-4" />
              <span className="align-middle">
                {lessonsCompleted}/{totalLessons} lessons
              </span>
            </Pill>

            <Pill>
              <span className="align-middle">{level}</span>
            </Pill>
          </div>

          <p className="mt-4 text-[18px] leading-7 text-white">
            <span className="font-semibold">Next Lesson:</span>{" "}
            <span className="italic opacity-90">{nextLessonName}</span>
          </p>

          <div className="mt-6">
            <button
              type="button"
              onClick={onContinue}
              className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#8A2BE2] to-[#6F2CF5] px-5 py-2.5 text-base font-semibold text-white shadow-md transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9B5CF6]/70 active:translate-y-px"
            >
              Continue
              <span className="grid place-items-center rounded-full bg-white/20 p-[6px]">
                <ArrowRight className="h-3.5 w-3.5 text-white" />
              </span>
            </button>
          </div>

          <div className="pointer-events-none absolute inset-2 rounded-3xl ring-1 ring-white/5" />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-6 bottom-3 h-4 rounded-b-3xl bg-black/35 blur"
        />
      </div>
    </section>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#8D5BFF] bg-[#0E1321] px-3.5 py-1.5 text-sm text-[#D7D8FF] shadow-[inset_0_0_0_9999px_rgba(255,255,255,0.02)]">
      {children}
    </span>
  );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="9" strokeWidth="1.5" className="opacity-90" />
      <path
        d="M12 7v5l3 2"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-90"
      />
    </svg>
  );
}

function BookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M4.5 5.25h8.75A2.75 2.75 0 0 1 16 8v11.25H7.25A2.75 2.75 0 0 1 4.5 16.5V5.25z"
        strokeWidth="1.5"
        className="opacity-90"
      />
      <path
        d="M16 8h1.75A2.75 2.75 0 0 1 20.5 10.75v8.5H9.75A2.75 2.75 0 0 0 7 22"
        strokeWidth="1.5"
        className="opacity-50"
      />
    </svg>
  );
}

function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path d="M7.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586L7.293 4.707a1 1 0 010-1.414z" />
    </svg>
  );
}

function StarOutline(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M12 17.27 6.18 20l1.12-6.54L2 9.27l6.59-.96L12 2l3.41 6.31 6.59.96-4.8 4.19L17.82 20 12 17.27z"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarSolid(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 17.27 17.82 20l-1.12-6.54 4.8-4.19-6.59-.96L12 2 8.59 8.31 2 9.27l4.8 4.19L5.18 20 12 17.27z" />
    </svg>
  );
}
