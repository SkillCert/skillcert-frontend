"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  error?: string;
  variant?: "text" | "select";
  options?: { value: string; label: string }[];
  selectedValue?: string;
  onValueChange?: (value: string) => void;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      className,
      label,
      placeholder,
      error,
      variant = "text",
      options = [],
      selectedValue,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedOption, setSelectedOption] = React.useState(
      selectedValue || ""
    );

    const handleSelectChange = (value: string) => {
      setSelectedOption(value);
      onValueChange?.(value);
      setIsOpen(false);
    };

    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            className="text-base font-bold text-gray-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            style={{
              fontFamily: "Segoe UI",
              lineHeight: "100%",
              letterSpacing: "0%",
              verticalAlign: "middle",
            }}
          >
            {label}
          </label>
        )}

        <div className="relative">
          {variant === "text" ? (
            <input
              className={cn(
                "flex h-10 w-full rounded-md border-0 bg-[#111827] px-3 py-2 text-base text-[#9CA3AF] placeholder:text-[#9CA3AF]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0",
                "disabled:cursor-not-allowed disabled:opacity-50",
                error && "ring-2 ring-red-500",
                className
              )}
              style={{
                fontFamily: "Segoe UI",
                fontWeight: 400,
                lineHeight: "100%",
                letterSpacing: "0%",
                verticalAlign: "middle",
              }}
              placeholder={placeholder}
              ref={ref}
              {...props}
            />
          ) : (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  "flex h-10 w-full items-center justify-between rounded-md border-0 bg-[#111827] px-3 py-2 text-base text-[#9CA3AF]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  error && "ring-2 ring-red-500"
                )}
                style={{
                  fontFamily: "Segoe UI",
                  fontWeight: 400,
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                }}
              >
                <span
                  className={
                    selectedOption ? "text-[#9CA3AF]" : "text-[#9CA3AF]"
                  }
                >
                  {selectedOption || placeholder || "Seleccionar opción"}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-400 transition-transform duration-200" />
              </button>

              {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-[#111827] border border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
                  {options.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleSelectChange(option.value)}
                      className="w-full px-3 py-2 text-left text-base text-[#9CA3AF] hover:bg-gray-700 focus:bg-gray-700 focus:outline-none"
                      style={{
                        fontFamily: "Segoe UI",
                        fontWeight: 400,
                        lineHeight: "100%",
                        letterSpacing: "0%",
                        verticalAlign: "middle",
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export { InputField };
