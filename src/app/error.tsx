"use client";

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-slate-900 ">
      
      {/* Main Error */}
      <div className="h-screen flex flex-col items-center justify-center">

        {/* Error Header */}
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-4xl text-white mr-2">500 |</h1>
          <p className="text-lg text-white">Internal Server Error</p>
        </div>

        {/* Error Message */}
        <p className="text-sm text-white">
          We’re having trouble right now. Please refresh the page or try again
          later.
        </p>
      </div>
    </div>
  );
}
