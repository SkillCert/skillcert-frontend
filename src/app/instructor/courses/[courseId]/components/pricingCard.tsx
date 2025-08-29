"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function PricingCard() {
  const [coursePrice, setCoursePrice] = useState("120")
  const usdToXlm = Number.parseFloat(coursePrice) * 28.757 || 0

  return (
    <div className="w-full max-w-md bg-slate-800/90 border border-slate-700 rounded-xl p-6 backdrop-blur-sm">
      <h2 className="text-xl font-semibold text-white mb-6">Pricing</h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="course-price" className="text-sm text-slate-300">
            Course Price (USD)
          </Label>
          <Input
            id="course-price"
            type="number"
            value={coursePrice}
            onChange={(e) => setCoursePrice(e.target.value)}
            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
            placeholder="Enter price"
          />
        </div>

        <div className="text-sm text-slate-400">{usdToXlm.toFixed(2)} XLM</div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-700">
        <div className="inline-flex items-center gap-2 bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full">
          <span>Fill (1164)</span>
          <span>•</span>
          <span>227 Hug</span>
        </div>
      </div>
    </div>
  )
}
