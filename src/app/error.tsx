"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  // Log error for debugging in development
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.error("Error caught:", error);
  }
  const router = useRouter();
  return (
    <div className="min-h-screen bg-slate-900 ">
      <div className="h-screen max-w-2xl mx-auto p-4 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-4xl text-white mr-2">500 |</h1>
          <p className="text-lg text-white">Internal Server Error</p>
        </div>

        <p className="text-sm text-white">
          We’re having trouble right now. Please refresh the page or try again
          later.
        </p>
        <div className="flex lg:flex-row flex-col max-w-md my-4  gap-4">
          <Button variant="destructive" onClick={reset}>
            Try Again
          </Button>
          <Button variant="secondary" onClick={() => router.back()}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
