"use client";

import type React from "react";

import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline";
}

const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ children, size = "md", variant = "solid", className, ...props }, ref) => {
    const sizeClasses = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    const variantClasses = {
      solid:
        "bg-purple-500 hover:bg-purple-600 text-white shadow-lg hover:shadow-xl",
      outline:
        "border-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "rounded-full font-medium transition-all duration-200 ease-in-out",
          "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "active:scale-95",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

PrimaryButton.displayName = "PrimaryButton";

export default function Component() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Primary Button Component
        </h2>

        <div className="flex justify-center">
          <PrimaryButton>Button</PrimaryButton>
        </div>

        <div className="flex gap-4 justify-center items-center">
          <PrimaryButton size="sm">Small</PrimaryButton>
          <PrimaryButton size="md">Medium</PrimaryButton>
          <PrimaryButton size="lg">Large</PrimaryButton>
        </div>

        <div className="flex gap-4 justify-center items-center">
          <PrimaryButton variant="solid">Solid</PrimaryButton>
          <PrimaryButton variant="outline">Outline</PrimaryButton>
        </div>

        <div className="flex gap-4 justify-center items-center">
          <PrimaryButton onClick={() => alert("Button clicked!")}>
            Click Me
          </PrimaryButton>
          <PrimaryButton disabled>Disabled</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export { PrimaryButton };
