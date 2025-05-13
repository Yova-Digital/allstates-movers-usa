"use client"

import { motion } from "framer-motion"
import { MapPin, Calendar, User, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepsProgressBarProps {
  step: number
  setStep: (step: number) => void
}

export default function StepsProgressBar({ step, setStep }: StepsProgressBarProps) {
  return (
    <div className="relative mb-10">
      <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-blue-500 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${(step / 3) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      <div className="flex justify-between mt-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center relative">
            <motion.div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-colors z-10",
                step >= i
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400",
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => i < step && setStep(i)}
            >
              {step > i ? (
                <Check className="h-6 w-6" />
              ) : i === 1 ? (
                <MapPin className="h-6 w-6" />
              ) : i === 2 ? (
                <Calendar className="h-6 w-6" />
              ) : (
                <User className="h-6 w-6" />
              )}
            </motion.div>
            <span className="text-sm mt-2 font-medium">
              {i === 1 ? "Location" : i === 2 ? "Details" : "Contact"}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
