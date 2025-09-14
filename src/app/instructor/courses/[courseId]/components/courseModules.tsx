"use client";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GripVertical, Edit, Trash2, Plus, BookOpen } from "lucide-react";

interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessonCount: number;
  order: number;
}

interface CourseModulesProps {
  modules?: CourseModule[];
  onAddModule?: () => void;
  onEditModule?: (moduleId: string) => void;
  onDeleteModule?: (moduleId: string) => void;
  onReorderModules?: (modules: CourseModule[]) => void;
}

const defaultModules: CourseModule[] = [
  {
    id: "1",
    title: "Introduction to React Hooks",
    description:
      "Brief description of the module and the content expected to learn.",
    lessonCount: 4,
    order: 1,
  },
  {
    id: "2",
    title: "State Management with Redux",
    description:
      "Brief description of the module and the content expected to learn.",
    lessonCount: 4,
    order: 2,
  },
  {
    id: "3",
    title: "Advanced Patterns",
    description:
      "Brief description of the module and the content expected to learn.",
    lessonCount: 4,
    order: 3,
  },
];

export default function CourseModules({
  modules: initialModules = defaultModules,
  onAddModule,
  onEditModule,
  onDeleteModule,
  onReorderModules,
}: CourseModulesProps) {
  const [modules, setModules] = useState<CourseModule[]>(initialModules);
  const [draggedModule, setDraggedModule] = useState<CourseModule | null>(null);

  const handleDragStart = (e: React.DragEvent, module: CourseModule) => {
    setDraggedModule(module);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetModule: CourseModule) => {
    e.preventDefault();

    if (!draggedModule || draggedModule.id === targetModule.id) {
      setDraggedModule(null);
      return;
    }

    const newModules = [...modules];
    const draggedIndex = newModules.findIndex((m) => m.id === draggedModule.id);
    const targetIndex = newModules.findIndex((m) => m.id === targetModule.id);

    newModules.splice(draggedIndex, 1);
    newModules.splice(targetIndex, 0, draggedModule);

    const reorderedModules = newModules.map((module, index) => ({
      ...module,
      order: index + 1,
    }));

    setModules(reorderedModules);
    onReorderModules?.(reorderedModules);
    setDraggedModule(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-white">
          Course Modules
        </h2>
        <Button
          onClick={onAddModule}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <Plus className="w-4 h-4" />
          Add Module
        </Button>
      </div>

      <div className="space-y-4">
        {modules.map((module) => (
          <Card
            key={module.id}
            className="bg-gray-900 border-gray-400 p-3 sm:p-4 rounded-lg transition-all duration-200 hover:bg-slate-800/70"
            draggable
            onDragStart={(e) => handleDragStart(e, module)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, module)}
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-300 mt-1">
                <GripVertical className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>

              <div className="flex-shrink-0 mt-1">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-900 to-pink-900 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                  {module.order}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="block md:hidden space-y-3">
                  <div>
                    <h3 className="text-white font-medium text-base leading-tight mb-2">
                      {module.title}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-400 text-sm mb-2">
                      <BookOpen className="w-4 h-4 flex-shrink-0" />
                      <span>{module.lessonCount} lessons</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {module.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditModule?.(module.id)}
                      className="bg-gray-950 border-gray-100 text-white text-sm px-3 py-2 
             hover:bg-gray-800 hover:border-gray-200 hover:text-gray-100 
             transition-colors duration-200"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDeleteModule?.(module.id)}
                      className="bg-gray-950 border-gray-100 text-white text-sm px-3 py-2 
             hover:bg-red-600 hover:border-red-500 hover:text-white 
             transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>

                <div className="hidden md:block lg:hidden">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium text-lg mb-2 leading-tight">
                        {module.title}
                      </h3>
                      <div className="flex items-center gap-1 text-slate-400 text-sm mb-3">
                        <BookOpen className="w-4 h-4 flex-shrink-0" />
                        <span>{module.lessonCount} lessons</span>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {module.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 mt-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEditModule?.(module.id)}
                        className="bg-gray-950 border-gray-100 text-white text-sm px-3 py-2 
             hover:bg-gray-800 hover:border-gray-200 hover:text-gray-100 
             transition-colors duration-200"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDeleteModule?.(module.id)}
                        className="bg-gray-950 border-gray-100 text-white text-sm px-3 py-2 
             hover:bg-red-600 hover:border-red-500 hover:text-white 
             transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="hidden lg:grid grid-cols-[280px_1fr_auto] gap-6 items-start">
                  <div className="min-w-0">
                    <h3 className="text-white font-medium text-lg mb-2 leading-tight">
                      {module.title}
                    </h3>
                    <div className="flex items-center gap-1 text-slate-400 text-sm">
                      <BookOpen className="w-4 h-4 flex-shrink-0" />
                      <span>{module.lessonCount} lessons</span>
                    </div>
                  </div>

                  <div className="min-w-0">
                    <p className="text-slate-400 text-sm leading-relaxed mt-1">
                      {module.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 mt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditModule?.(module.id)}
                      className="bg-gray-950 border-gray-100 text-white text-sm px-3 py-2 
             hover:bg-gray-800 hover:border-gray-200 hover:text-gray-100 
             transition-colors duration-200"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDeleteModule?.(module.id)}
                      className="bg-gray-950 border-gray-100 text-white text-sm px-3 py-2 
             hover:bg-red-600 hover:border-red-500 hover:text-white 
             transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {modules.length === 0 && (
        <Card className="bg-slate-800/30 border-slate-700 border-dashed p-8 sm:p-12 text-center">
          <div className="text-gray-100 mb-4">
            <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 opacity-50 " />
            <h3 className="text-base sm:text-lg font-medium mb-2">
              No modules yet
            </h3>
            <p className="text-sm">
              Get started by adding your first course module.
            </p>
          </div>
          <Button
            onClick={onAddModule}
            className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Module
          </Button>
        </Card>
      )}
    </div>
  );
}
