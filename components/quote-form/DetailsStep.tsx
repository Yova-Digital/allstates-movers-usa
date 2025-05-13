"use client"

import { motion } from "framer-motion"
import { Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormData, UpdateFormDataFn } from "./types"

interface DetailsStepProps {
  formData: FormData
  updateFormData: UpdateFormDataFn
}

export default function DetailsStep({ formData, updateFormData }: DetailsStepProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getMoveSize = (size: string): string => {
    const sizes: Record<string, string> = {
      "studio": "Studio",
      "1bedroom": "1 Bedroom",
      "2bedroom": "2 Bedroom",
      "3bedroom": "3 Bedroom",
      "4bedroom": "4+ Bedroom",
      "office_small": "Small Office",
      "office_large": "Large Office",
      "other": "Other"
    }
    return sizes[size] || "Unknown"
  }

  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
          <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-300" />
        </div>
        <h3 className="text-xl font-semibold">When and what are you moving?</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Label htmlFor="movingDate" className="text-base">
            Moving Date
          </Label>
          <div className="relative">
            <Input
              id="movingDate"
              type="date"
              value={formData.movingDate}
              onChange={(e) => updateFormData("movingDate", e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="bg-white dark:bg-gray-800"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <Label htmlFor="deliveryDate" className="text-base">
            When You Need It Delivered
          </Label>
          <div className="relative">
            <Input
              id="deliveryDate"
              type="date"
              value={formData.deliveryDate}
              onChange={(e) => updateFormData("deliveryDate", e.target.value)}
              min={formData.movingDate || new Date().toISOString().split("T")[0]}
              className="bg-white dark:bg-gray-800"
            />
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="moveSize" className="text-base">
            Move Size
          </Label>
          <Select value={formData.moveSize} onValueChange={(value) => updateFormData("moveSize", value)}>
            <SelectTrigger id="moveSize" className="bg-white dark:bg-gray-800">
              <SelectValue placeholder="Select move size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="studio">Studio</SelectItem>
              <SelectItem value="1bedroom">1 Bedroom</SelectItem>
              <SelectItem value="2bedroom">2 Bedroom</SelectItem>
              <SelectItem value="3bedroom">3 Bedroom</SelectItem>
              <SelectItem value="4bedroom">4+ Bedroom</SelectItem>
              <SelectItem value="office_small">Small Office</SelectItem>
              <SelectItem value="office_large">Large Office</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {formData.movingDate && formData.moveSize && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-5 bg-blue-50 dark:bg-blue-900/20 rounded-xl"
        >
          <h4 className="text-base font-semibold mb-4 border-b border-blue-100 dark:border-blue-800/30 pb-2">Your Moving Details</h4>
          <div className="space-y-4">
            <div className="bg-white/70 dark:bg-gray-800/30 p-3 rounded-lg">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-300 mb-1">Pickup Date</p>
              <p className="text-base font-bold">
                {formatDate(formData.movingDate)}
              </p>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/30 p-3 rounded-lg">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-300 mb-1">Delivery Date</p>
              <p className="text-base font-bold">
                {formatDate(formData.deliveryDate)}
              </p>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/30 p-3 rounded-lg">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-300 mb-1">Move Size</p>
              <p className="text-base font-bold">
                {getMoveSize(formData.moveSize)}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
