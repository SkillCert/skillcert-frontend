"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TeacherModal({ isOpen, onClose }: TeacherModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 text-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Close Button */}
          <div className="flex justify-end mb-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-slate-700"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Teacher Profile Section */}
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 bg-slate-400 rounded-full flex-shrink-0"></div>

            {/* Teacher Info */}
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-2">Teacher name</h2>
              <p className="text-xl text-slate-400 mb-4">Teacher occupation</p>
              <p className="text-slate-300 text-lg leading-relaxed">
                Teacher description Lorem ipsum dolor sit amet consectetur
                adipiscing elit, tincidunt habitant non volutpat gravida risus,
                phasellus nibh ornare fusce senectus conubia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
