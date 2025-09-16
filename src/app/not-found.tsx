import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-transparent">
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
        <h1 className="text-8xl font-bold text-green mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="mb-6 text-gray-600 max-w-md">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-purple-600  px-6 py-3 bg-green text-white rounded-full font-medium hover:bg-green/90 transition-colors focus:outline-none focus:ring-2 focus:ring-green focus:ring-offset-2"
        >
          Go to Homepage
        </Link>
      </section>
    </main>
  );
}
