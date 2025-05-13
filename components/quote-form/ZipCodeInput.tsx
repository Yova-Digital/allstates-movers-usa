"use client"

import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { MapPin, Loader2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Address } from "./types"

interface ZipCodeInputProps {
  label: string
  value: string
  onChange: (zip: string) => void
  invalidZip: boolean
  address: Address
  type: "from" | "to"
  lookingUp: boolean
  onLookup: (zipCode: string) => void
}

export default function ZipCodeInput({
  label,
  value,
  onChange,
  invalidZip,
  address,
  type,
  lookingUp,
  onLookup
}: ZipCodeInputProps) {
  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const zip = e.target.value.replace(/\D/g, "").slice(0, 5)
    onChange(zip)
    if (zip.length === 5) {
      onLookup(zip)
    }
  }

  return (
    <div className="space-y-4">
      <Label htmlFor={`${type}Zip`} className="text-base">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={`${type}Zip`}
          placeholder="Enter zip code"
          value={value}
          onChange={handleZipChange}
          className={`pr-10 ${invalidZip ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : ''}`}
          maxLength={5}
        />
        {lookingUp && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
          </div>
        )}
      </div>

      {invalidZip ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="bg-red-50 dark:bg-red-900/30 p-3 rounded-lg"
        >
          <p className="text-sm font-medium text-red-600 dark:text-red-400">Invalid ZIP Code:</p>
          <p className="text-sm text-red-600 dark:text-red-400">
            The ZIP code you entered doesn't appear to be valid. Please enter a valid ZIP code.
          </p>
        </motion.div>
      ) : address.city ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg shadow-sm border border-blue-100 dark:border-blue-800/30"
        >
          <div className="flex items-center mb-2">
            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center mr-2">
              <MapPin className="h-3 w-3 text-white" />
            </div>
            <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">Location Found</p>
          </div>
          <div className="ml-7 text-sm">
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="font-medium text-gray-700 dark:text-gray-300 w-16">City:</span>
                <span className="text-gray-800 dark:text-gray-200 font-semibold">{address.city}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-700 dark:text-gray-300 w-16">State:</span>
                <span className="text-gray-800 dark:text-gray-200 font-semibold">{address.state}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </div>
  )
}
