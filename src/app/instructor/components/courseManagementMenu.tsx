'use client';

import React, { useState } from 'react';

interface MenuItem {
  id: string;
  label: string;
  isSelected?: boolean;
}

interface CourseManagementMenuProps {
  onMenuItemClick?: (itemId: string) => void;
}

export default function CourseManagementMenu({ onMenuItemClick }: CourseManagementMenuProps) {
  const [selectedItem, setSelectedItem] = useState('basic-info');

  const menuItems: MenuItem[] = [
    { id: 'basic-info', label: 'Basic information', isSelected: true },
    { id: 'media-thumbnail', label: 'Media & Thumbnail' },
    { id: 'course-details', label: 'Course Details' },
    { id: 'pricing-settings', label: 'Pricing & Settings' }
  ];

  const handleItemClick = (itemId: string) => {
    setSelectedItem(itemId);
    onMenuItemClick?.(itemId);
  };

  return (
    <div className="bg-[#111827] rounded-lg shadow-lg p-5 max-w-sm border border-[#1F2937]">
      <div className="space-y-2">
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className={`
              px-4 py-3 rounded cursor-pointer transition-colors duration-200
              ${selectedItem === item.id 
                ? 'bg-[#1F2937] text-white text-base font-medium border border-[#1F2937]' 
                : 'text-white hover:bg-[#1F2937]'
              }
            `}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}