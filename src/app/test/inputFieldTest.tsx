"use client"

import { InputField } from "@/components/ui/inputField"

export default function InputFieldTest() {
  const options = [
    { value: "option1", label: "Opción 1" },
    { value: "option2", label: "Opción 2" },
    { value: "option3", label: "Opción 3" },
    { value: "option4", label: "Opción 4" }
  ]

  return (
    <div className="min-h-screen bg-gray-800 p-8">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-white mb-8">Test InputField Component</h1>
        
        <InputField 
          label="Field name" 
          placeholder="Place holder" 
          variant="text"
        />
        
        <InputField 
          label="Field name" 
          placeholder="Seleccionar opción" 
          variant="select"
          options={options}
          onValueChange={() => {/* Value selected */}}
        />
      </div>
    </div>
  )
}
