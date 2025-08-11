"use client"
import { JSX, useState } from "react"
import {
  BookOpen,
  Eye,
  Pencil,
  Trash2,
  Plus,
  ChevronLeft,
  GripVertical, // Import the GripVertical icon
} from "lucide-react"

// Lesson type definition
type Lesson = {
  id: number
  name: string
  description: string
  icon: JSX.Element
}

// Initial lessons data for mock
const initialLessons: Lesson[] = [
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
  const [lessons, setLessons] = useState(initialLessons)
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null)
  const [editName, setEditName] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [showEditModal, setShowEditModal] = useState(false)

  const [showAddModal, setShowAddModal] = useState(false)
  const [addName, setAddName] = useState("")
  const [addDescription, setAddDescription] = useState("")

  // State to keep track of the item being dragged
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  function handleDelete(id: number) {
    setLessons(lessons.filter((lesson) => lesson.id !== id))
  }

  function handleEdit(lesson: Lesson) {
    setEditingLesson(lesson)
    setEditName(lesson.name)
    setEditDescription(lesson.description)
    setShowEditModal(true)
  }

  function handleEditSave() {
    if (editingLesson !== null) {
      setLessons(
        lessons.map((lesson) =>
          lesson.id === editingLesson.id
            ? { ...lesson, name: editName, description: editDescription }
            : lesson
        )
      )
      setShowEditModal(false)
      setEditingLesson(null)
    }
  }

  function handleEditCancel() {
    setShowEditModal(false)
    setEditingLesson(null)
  }

  function handleAddLesson() {
    setShowAddModal(true)
    setAddName("")
    setAddDescription("")
  }

  function handleAddSave() {
    if (addName.trim() !== "") {
      const newLesson: Lesson = {
        id: lessons.length > 0 ? Math.max(...lessons.map((l) => l.id)) + 1 : 1,
        name: addName,
        description: addDescription,
        icon: <BookOpen className="w-7 h-7 text-purple-400" />,
      }
      setLessons([...lessons, newLesson])
      setShowAddModal(false)
      setAddName("")
      setAddDescription("")
    }
  }

  function handleAddCancel() {
    setShowAddModal(false)
    setAddName("")
    setAddDescription("")
  }

  // Function to handle the drop event and reorder the lessons
  function handleDrop(targetIndex: number) {
    if (draggedIndex === null) return

    const newLessons = [...lessons]
    const draggedItem = newLessons[draggedIndex]

    // Remove the dragged item from its original position
    newLessons.splice(draggedIndex, 1)
    // Insert the dragged item at the new (target) position
    newLessons.splice(targetIndex, 0, draggedItem)

    // Update the state with the new order and reset the dragged index
    setLessons(newLessons)
    setDraggedIndex(null)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-8 lg:p-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <ChevronLeft className="w-5 h-5 text-purple-400" />
          <button className="text-purple-400 text-sm font-medium hover:underline p-0 bg-transparent border-none">
            Back to Course
          </button>
        </div>
        <div className="flex flex-col items-start">
          <span className="text-gray-400 text-xs mb-1">Course name</span>
          <h1 className="text-3xl font-bold text-white leading-tight">
            Module name
          </h1>
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
          className="w-full bg-gray-800 text-white rounded-lg p-4 min-h-[80px] border-none focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Describe your module..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <hr className="border-gray-700 mt-6" />
      </div>

      {/* Lessons Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        <h2 className="text-2xl font-bold text-white">Lessons</h2>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
          type="button"
          onClick={handleAddLesson}
        >
          <Plus className="w-5 h-5" />
          Add Lesson
        </button>
      </div>

      {/* Lessons List */}
      <div className="space-y-5">
        {lessons.map((lesson, index) => (
          <div
            key={lesson.id}
            draggable
            onDragStart={() => setDraggedIndex(index)}
            onDragOver={(e) => e.preventDefault()} // Necessary to allow dropping
            onDrop={() => handleDrop(index)}
            onDragEnd={() => setDraggedIndex(null)}
            className={`flex flex-col md:flex-row md:items-center justify-between gap-5 bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700 transition-opacity ${
              draggedIndex === index ? "opacity-50" : "opacity-100"
            }`}
          >
            <div className="flex items-center gap-5">
              <GripVertical className="h-5 w-5 text-gray-400 cursor-grab hidden sm:block" />
              <div>{lesson.icon}</div>
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
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                className="flex items-center justify-center gap-2 bg-slate-900 border border-white text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                type="button"
                aria-label="Preview"
              >
                <Eye className="w-5 h-5 text-white" />
                Preview
              </button>
              <button
                className="flex items-center justify-center gap-2 bg-slate-900 border border-white text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                type="button"
                aria-label="Edit"
                onClick={() => handleEdit(lesson)}
              >
                <Pencil className="w-5 h-5 text-white" />
                Edit
              </button>
              <button
                className="flex items-center justify-center gap-2 bg-slate-900 border border-white text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                type="button"
                aria-label="Delete"
                onClick={() => handleDelete(lesson.id)}
              >
                <Trash2 className="w-5 h-5 text-white" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-slate-900 rounded-lg p-8 w-full max-w-md border border-gray-700">
            <h3 className="text-xl font-bold mb-4 text-white">Edit Lesson</h3>
            <label className="block text-sm font-semibold mb-2 text-white">
              Lesson Name
            </label>
            <input
              type="text"
              className="w-full bg-[#151a23] text-white rounded-lg p-2 mb-4 border-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <label className="block text-sm font-semibold mb-2 text-white">
              Description
            </label>
            <textarea
              className="w-full bg-[#151a23] text-white rounded-lg p-2 mb-4 border-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg"
                type="button"
                onClick={handleEditCancel}
              >
                Cancel
              </button>
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold"
                type="button"
                onClick={handleEditSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Lesson Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-slate-900 rounded-lg p-8 w-full max-w-md border border-gray-700">
            <h3 className="text-xl font-bold mb-4 text-white">Add Lesson</h3>
            <label className="block text-sm font-semibold mb-2 text-white">
              Lesson Name
            </label>
            <input
              type="text"
              aria-label="Lesson Name"
              className="w-full bg-[#151a23] text-white rounded-lg p-2 mb-4 border-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={addName}
              onChange={(e) => setAddName(e.target.value)}
            />
            <label className="block text-sm font-semibold mb-2 text-white">
              Description
            </label>
            <textarea
              aria-label="Description"
              className="w-full bg-[#151a23] text-white rounded-lg p-2 mb-4 border-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={addDescription}
              onChange={(e) => setAddDescription(e.target.value)}
            />
            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg"
                type="button"
                onClick={handleAddCancel}
              >
                Cancel
              </button>
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold"
                type="button"
                onClick={handleAddSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
