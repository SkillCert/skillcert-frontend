"use client";

import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PrimaryButton } from "@/components/ui/primaryButton";
import {
  useCreateCourse,
  type CreateCourseParams,
} from "../../../contract_connections/CourseRegistry/createCourse";

export default function CreateCourse() {
  const { createCourse, isLoading, error } = useCreateCourse();
  const [formData, setFormData] = useState<CreateCourseParams>({
    title: "",
    description: "",
    price: 0,
    category: "",
    level: "",
    duration: "",
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInputChange = (
    field: keyof CreateCourseParams,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "price" ? parseFloat(value) || 0 : value,
    }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSuccessMessage(null);

  try {
    const result = await createCourse(formData);

    if (result.success) {
      setSuccessMessage(
        `Course created successfully! Course ID: ${result.courseId}`
      );
      setFormData({
        title: "",
        description: "",
        price: 0,
        category: "",
        level: "",
        duration: "",
      });
    } else {
      // In case the hook itself returns an error structure
      alert(`Failed to create course: ${result.error || "Unknown error"}`);
    }
  } catch (err) {
    // If the call throws instead of returning { success: false }
    console.error("Error creating course:", err);
    alert(
      "An unexpected error occurred while creating the course. Please try again."
    );
  }
};


  return (
    <Dialog>
      <DialogTrigger>Create Course</DialogTrigger>
      <DialogContent className="bg-gray-950 border-none sm:rounded-2xl gap-[26px]">
        <DialogHeader>
          <DialogTitle className="text-semibold text-[20px] text-white">
            Create New Course
          </DialogTitle>
          <DialogDescription className="!-mt-0.5 text-base text-gray-300">
            Fill in the details to create your new course
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="bg-red-900/50 border border-red-500 rounded-md p-3">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {successMessage && (
          <div className="bg-green-900/50 border border-green-500 rounded-md p-3">
            <p className="text-green-400 text-sm">{successMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2.5">
            <Label
              htmlFor="course-name"
              className="text-base font-bold text-white"
            >
              Course Name <span className="text-red-400">*</span>
            </Label>
            <Input
              id="course-name"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="e.g. Complete Web Development Bootcamp"
              className="border-none bg-gray-900 p-2.5 px-4 h-10 text-white placeholder:text-gray-400"
              required
            />
          </div>

          <div className="space-y-2.5">
            <Label
              htmlFor="course-description"
              className="text-base font-bold text-white"
            >
              Course Description <span className="text-red-400">*</span>
            </Label>
            <Input
              id="course-description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe what students will learn in this course..."
              className="border-none bg-gray-900 p-2.5 px-4 h-10 text-white placeholder:text-gray-400"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2.5">
              <Label
                htmlFor="course-price"
                className="text-base font-bold text-white"
              >
                Price (XLM) <span className="text-red-400">*</span>
              </Label>
              <Input
                id="course-price"
                type="number"
                step="0.01"
                min="0.01"
                value={formData.price || ""}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="99.99"
                className="border-none bg-gray-900 p-2.5 px-4 h-10 text-white placeholder:text-gray-400"
                required
              />
            </div>

            <div className="space-y-2.5">
              <Label
                htmlFor="course-category"
                className="text-base font-bold text-white"
              >
                Category
              </Label>
              <Input
                id="course-category"
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                placeholder="e.g. Programming, Design, Business"
                className="border-none bg-gray-900 p-2.5 px-4 h-10 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2.5">
              <Label
                htmlFor="course-level"
                className="text-base font-bold text-white"
              >
                Level
              </Label>
              <Input
                id="course-level"
                value={formData.level}
                onChange={(e) => handleInputChange("level", e.target.value)}
                placeholder="e.g. Beginner, Intermediate, Advanced"
                className="border-none bg-gray-900 p-2.5 px-4 h-10 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2.5">
              <Label
                htmlFor="course-duration"
                className="text-base font-bold text-white"
              >
                Duration
              </Label>
              <Input
                id="course-duration"
                value={formData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                placeholder="e.g. 4 weeks, 10 hours"
                className="border-none bg-gray-900 p-2.5 px-4 h-10 text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="border-t border-gray-400 pt-6 flex gap-5 justify-end">
            <DialogClose
              type="button"
              disabled={isLoading}
              className="border border-white p-3 text-base text-semibold px-2.5 py-[6px] rounded-md disabled:opacity-50"
            >
              Cancel
            </DialogClose>
            <PrimaryButton
              type="submit"
              disabled={isLoading}
              className="rounded-md font-semibold px-2.5 py-[6px] disabled:opacity-50"
            >
              {isLoading ? "Creating Course..." : "Create Course"}
            </PrimaryButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
