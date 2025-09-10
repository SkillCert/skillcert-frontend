"use client";
import React from 'react';
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { PrimaryButton } from "@/components/ui/primaryButton";
import { Clock, BookOpen, Users, Star, Check } from 'lucide-react';

export default function ResumeModal() {
  const stats = [
    {
      icon: Clock,
      value: '12 Weeks',
      label: 'Duration',
      color: 'text-pink-400'
    },
    {
      icon: BookOpen,
      value: '45',
      label: 'Total Lessons',
      color: 'text-pink-400'
    },
    {
      icon: Users,
      value: '1250',
      label: 'Total Students',
      color: 'text-pink-400'
    },
    {
      icon: Star,
      value: '4.8',
      label: 'Rating',
      color: 'text-pink-400'
    }
  ];

  const learningOutcomes = [
    'Lorem ipsum dolor sit amet, consectetur.',
    'Lorem ipsum dolor sit amet, consectetur.',
    'Lorem ipsum dolor sit amet, consectetur.',
    'Lorem ipsum dolor sit amet, consectetur.',
    'Lorem ipsum dolor sit amet, consectetur.',
    'Lorem ipsum dolor sit amet, consectetur.'
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <PrimaryButton size="md">Preview Course</PrimaryButton>
      </DialogTrigger>
      <DialogContent className="max-w-6xl w-[1500px] h-[70vh] overflow-y-auto bg-slate-900 text-white border-slate-700">
        <div className="p-4">
          <div className="flex flex-col items-center gap-4 mb-6">
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                  <div className="flex items-center mb-2">
                    <div className={`p-2 rounded-lg bg-slate-700 ${stat.color}`}>
                      <IconComponent size={20} />
                    </div>
                  </div>
                  <div className={`text-xl font-bold mb-1 ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-6">
            <h3 className="text-xl font-bold mb-6 text-white">
              what you will learn
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {learningOutcomes.map((outcome, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center mt-0.5">
                    <Check size={12} className="text-white" />
                  </div>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    {outcome}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
