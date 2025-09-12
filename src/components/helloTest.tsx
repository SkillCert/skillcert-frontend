"use client";
import React, { useEffect, useState } from "react";

function HelloTest() {
  const [value, setValue] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchValue() {
      try {
        setLoading(true);
        setValue("1");
      } catch {
        // Handle error silently in test component
      } finally {
        setLoading(false);
      }
    }

    fetchValue();
  });
  if (loading) return <div>Loading...</div>;
  return (
    <div className="border border-[#c6c6c6] rounded-sm py-2 px-5 font-normal">
      {value}
    </div>
  );
}

export default HelloTest;
