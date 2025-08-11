"use client"
import { useState } from "react"
import { BookOpen, Eye, Pencil, Trash2, Plus } from "lucide-react"

const mockLessons = [
  {
    id: 1,
    name: "Lesson Name",
    description: "In this lesson the student will learn about ...",
    icon: <BookOpen className="w-7 h-7 text-purple-400" />,
  },
  {
    id: 2,
    name: "Lesson Name",
    description: "In this lesson the student will learn about ...",
    icon: <BookOpen className="w-7 h-7 text-purple-400" />,
  },
  {
    id: 3,
    name: "Lesson Name",
    description: "In this lesson the student will learn about ...",
    icon: <BookOpen className="w-7 h-7 text-purple-400" />,
  },
  {
    id: 4,
    name: "Lesson Name",
    description: "In this lesson the student will learn about ...",
    icon: <BookOpen className="w-7 h-7 text-purple-400" />,
  },
]

export default function ModuleManagement() {
  const [description, setDescription] = useState("")

  return (
    <div className="min-h-screen bg-[#151a23] text-white px-12 py-8">
      {/* Header */}
      <div className="mb-8">
        <button className="text-purple-400 text-sm font-medium mb-2 hover:underline">
          &lt; Back to Course
        </button>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-xs">Course name</span>
          <h1 className="text-3xl font-bold text-white">Module name</h1>
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <label
          htmlFor="module-description"
          className="block text-lg font-semibold mb-2 text-white"
        >
          Description
        </label>
        <textarea
          id="module-description"
          aria-label="Describe your module"
          className="w-full bg-[#23263a] text-white rounded-lg p-4 min-h-[80px] border-none focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Describe your module..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <hr className="border-gray-700 mt-6" />
      </div>

      {/* Lessons Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">Lessons</h2>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
          type="button"
        >
          <Plus className="w-5 h-5" />
          Add Lesson
        </button>
      </div>

      {/* Lessons List */}
      <div className="space-y-5">
        {mockLessons.map((lesson) => (
          <div
            key={lesson.id}
            className="flex items-center justify-between bg-[#23263a] rounded-lg px-6 py-5 border border-gray-700"
          >
            <div className="flex items-center gap-5">
              {/* Drag Handle */}
              <div className="flex flex-col gap-1 mr-2">
                <span className="block w-1 h-1 bg-gray-400 rounded-full"></span>
                <span className="block w-1 h-1 bg-gray-400 rounded-full"></span>
                <span className="block w-1 h-1 bg-gray-400 rounded-full"></span>
              </div>
              {/* Icon */}
              <div>{lesson.icon}</div>
              {/* Lesson Info */}
              <div>
                <div className="font-bold text-lg text-white">
                  {lesson.name}
                </div>
                <div className="text-gray-400 text-sm">
                  {lesson.description}
                </div>
              </div>
            </div>
            {/* Actions */}
            <div className="flex gap-3">
              <button
                className="flex items-center gap-2 bg-[#23263a] border border-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                type="button"
                aria-label="Preview"
              >
                <Eye className="w-5 h-5 text-purple-400" />
                Preview
              </button>
              <button
                className="flex items-center gap-2 bg-[#23263a] border border-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                type="button"
                aria-label="Edit"
              >
                <Pencil className="w-5 h-5 text-purple-400" />
                Edit
              </button>
              <button
                className="flex items-center gap-2 bg-[#23263a] border border-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                type="button"
                aria-label="Delete"
              >
                <Trash2 className="w-5 h-5 text-purple-400" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
