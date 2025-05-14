"use client"

import { motion } from "framer-motion"
import { User, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormData, UpdateFormDataFn } from "./types"

interface ContactStepProps {
  formData: FormData
  updateFormData: UpdateFormDataFn
}

export default function ContactStep({ formData, updateFormData }: ContactStepProps) {
  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
          <User className="h-5 w-5 text-blue-600 dark:text-blue-300" />
        </div>
        <h3 className="text-xl font-semibold">Your Contact Information</h3>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="fullName" className="text-base">
            Full Name
          </Label>
          <Input
            id="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) => updateFormData("fullName", e.target.value)}
            className="mt-2 bg-white dark:bg-gray-800"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-base">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={(e) => updateFormData("email", e.target.value)}
            className="mt-2 bg-white dark:bg-gray-800"
          />
        </div>

        <div>
          <Label htmlFor="phone" className="text-base">
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(XXX) XXX-XXXX"
            value={formData.phone.replace(/^(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3').replace(/^\($/, '').replace(/[^\d()\s-]/g, '')}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
              updateFormData("phone", digits);
            }}
            className="mt-2 bg-white dark:bg-gray-800"
          />
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl"
      >
        <div className="flex items-center space-x-3 mb-2">
          <Check className="h-5 w-5 text-green-500" />
          <p className="font-medium">Almost there!</p>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 pl-8">
          Submit your request to receive a detailed quote from our team. We'll contact you within 24 hours.
        </p>
      </motion.div>
    </motion.div>
  )
}
