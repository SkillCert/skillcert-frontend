"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function NotFound() {
  const router = useRouter();
  return (
    <main className="min-h-screen flex flex-col justify-between bg-transparent">
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
        <h1 className="text-8xl font-bold text-purple-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="mb-6 text-gray-300 max-w-md">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="inline-flex   px-6 py-4 bg-purple-600 hover:text-purple-200 text-white rounded-lg items-center justify-center font-medium hover:bg-purple-600/90 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
        >
          Return Back
        </Button>
        <Link
          href="/"
          className="inline-block hover:text-purple-200 mt-5   px-6 py-3  text-white rounded-full font-medium  transition-colors focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
        >
          Go to Homepage
        </Link>
      </section>
    </main>
  );
}
