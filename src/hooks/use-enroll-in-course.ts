"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";
import { grantAccess } from "../../contract_connections/CourseRegistry/grantAccess";
import { getUserAddress } from "./wallet-utils";

export function useEnrollInCourse() {
  const [isEnrolling, setIsEnrolling] = useState(false);

  const enroll = useCallback(async (courseId: string) => {
    if (!courseId) {
      toast.error("Invalid course.");
      return;
    }
    setIsEnrolling(true);
    try {
      const user = await getUserAddress();
      const result = await grantAccess({ course_id: courseId, user });
      if (result.success) {
        toast.success("Enrollment successful!");
      } else {
        toast.error(result.error ?? "Enrollment failed");
      }
    } catch {
      toast.error("An unexpected error occurred while enrolling.");
    } finally {
      setIsEnrolling(false);
    }
  }, []);

  return { enroll, isEnrolling };
}


