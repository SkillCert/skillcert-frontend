import { GripVertical, Eye, Pencil, Trash2 } from "lucide-react";

interface Lesson {
    id: number;
    name: string;
    description: string;
    icon: React.ReactElement;
}

interface LessonsProps {
    lesson: Lesson;
    index: number;
    draggedIndex: number | null;
    setDraggedIndex: (index: number | null) => void;
    handleDrop: (index: number) => void;
    handleEdit: (lesson: Lesson) => void;
    handleDelete: (id: string | number) => void;
}

export default function Lessons({
    lesson,
    index,
    draggedIndex,
    setDraggedIndex,
    handleDrop,
    handleEdit,
    handleDelete,
}: LessonsProps) {
    return (
        <div
            key={lesson.id}
            draggable
            onDragStart={() => setDraggedIndex(index)}
            onDragOver={(e) => e.preventDefault()} // allow dropping
            onDrop={() => handleDrop(index)}
            onDragEnd={() => setDraggedIndex(null)}
            className={`flex flex-col md:flex-row md:items-center justify-between gap-5 bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700 transition-opacity ${draggedIndex === index ? "opacity-50" : "opacity-100"
                }`}
        >
            <div className="flex items-center gap-5">
                <GripVertical className="h-5 w-5 text-gray-400 cursor-grab hidden sm:block" />
                <div>{lesson.icon}</div>
                <div>
                    <div className="font-bold text-lg text-white">{lesson.name}</div>
                    <div className="text-gray-400 text-sm">{lesson.description}</div>
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
    );
}
