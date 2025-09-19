"use client";

import { useState } from "react";

export default function ErrorTest() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error("Test error!");
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
        <button
          onClick={() => setShouldThrow(true)}
          className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
        >
          🧪 Test Error
        </button>
      </div>
    </div>
  );
}
