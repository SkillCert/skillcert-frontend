'use client';

import { useState } from 'react';
import { Info } from 'lucide-react';
import Image from 'next/image';
import CourseHeader from "../../components/courseHeader";


interface Objective {
  id: string;
  text: string;
}

interface Prerequisite {
  id: string;
  text: string;
}

export default function Details() {
  const [objectives, setObjectives] = useState<Objective[]>([
    { id: '1', text: 'Build modern React applications from scratch' },
    { id: '2', text: 'Master React hooks and state management' },
    { id: '3', text: 'Implement routing with React Router' },
  ]);

  const [prerequisites, setPrerequisites] = useState<Prerequisite[]>([
    { id: '1', text: 'Basic JavaScript knowledge' },
    { id: '2', text: 'HTML and CSS fundamentals' },
    { id: '3', text: 'Understanding of ES6+ features' },
  ]);

  const [newObjective, setNewObjective] = useState('');
  const [newPrerequisite, setNewPrerequisite] = useState('');

  const addObjective = () => {
    if (newObjective.trim()) {
      setObjectives([...objectives, { id: Date.now().toString(), text: newObjective.trim() }]);
      setNewObjective('');
    }
  };

  const removeObjective = (id: string) => {
    setObjectives(objectives.filter(obj => obj.id !== id));
  };

  const addPrerequisite = () => {
    if (newPrerequisite.trim()) {
      setPrerequisites([...prerequisites, { id: Date.now().toString(), text: newPrerequisite.trim() }]);
      setNewPrerequisite('');
    }
  };

  const removePrerequisite = (id: string) => {
    setPrerequisites(prerequisites.filter(prereq => prereq.id !== id));
  };

  return (
    <div className="space-y-4">
      {/* Course Header */}
      <CourseHeader />

      {/* Learning Objectives Section */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-3xl font-semibold text-white mb-2">Learning objectives</h3>
            <p className="text-gray-400 text-xs">
              What will students achieve after completing this course?
            </p>
          </div>
          <button
            onClick={addObjective}
            className="flex items-center gap-2.5 w-[135px] h-[45px] px-4 py-3 border border-gray-300 text-white rounded-xl hover:bg-white hover:text-gray-900 transition-colors text-base whitespace-nowrap"
          >
            Add Objective
          </button>
        </div>

        {/* Objectives list */}
        <div className="space-y-3">
          {objectives.map((objective) => (
            <div
              key={objective.id}
              className="flex items-center justify-between w-[1064px] h-[45px] px-6 py-3 rounded-lg border border-gray-800"
            >
              <div className="flex items-center gap-5">
                <Image
                  src="/checkmark.png"
                  alt="Check"
                  width={20}
                  height={20}
                  className="filter brightness-0 saturate-100 invert-[0.85] sepia-[0.5] saturate-[2.5] hue-rotate-[320deg]"
                />
                <span className="text-white">{objective.text}</span>
              </div>
              <button
                onClick={() => removeObjective(objective.id)}
                className="hover:opacity-70 transition-opacity"
              >
                <Image src="/remove.png" alt="Remove" width={16} height={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Prerequisites Section */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-3xl font-semibold text-white mb-2">Prerequisites</h3>
            <p className="text-gray-400 text-xs">
              What should students know before taking this course?
            </p>
          </div>
          <button
            onClick={addPrerequisite}
            className="flex items-center gap-2.5 w-[160px] h-[45px] px-4 py-3 border border-gray-300 text-white rounded-xl hover:bg-white hover:text-gray-900 transition-colors text-base whitespace-nowrap"
          >
            Add Prerequisite
          </button>
        </div>

        {/* Prerequisites list */}
        <div className="space-y-3">
          {prerequisites.map((prerequisite) => (
            <div
              key={prerequisite.id}
              className="flex items-center justify-between w-[1064px] h-[45px] px-6 py-3 rounded-lg border border-gray-800"
            >
              <div className="flex items-center gap-5">
                <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                  <Info className="text-white" size={12} />
                </div>
                <span className="text-white">{prerequisite.text}</span>
              </div>
              <button
                onClick={() => removePrerequisite(prerequisite.id)}
                className="hover:opacity-70 transition-opacity"
              >
                <Image src="/remove.png" alt="Remove" width={16} height={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 