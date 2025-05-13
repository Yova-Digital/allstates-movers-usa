"use client"

import { motion } from "framer-motion"
import { Truck } from "lucide-react"
import ZipCodeInput from "./ZipCodeInput"
import { FormData, Address, UpdateFormDataFn } from "./types"

interface LocationStepProps {
  formData: FormData
  updateFormData: UpdateFormDataFn
  lookupAddress: (zipCode: string, type: "from" | "to") => Promise<void>
  invalidFromZip: boolean
  invalidToZip: boolean
  lookingUpFrom: boolean
  lookingUpTo: boolean
}

export default function LocationStep({
  formData,
  updateFormData,
  lookupAddress,
  invalidFromZip,
  invalidToZip,
  lookingUpFrom,
  lookingUpTo
}: LocationStepProps) {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
          <Truck className="h-5 w-5 text-blue-600 dark:text-blue-300" />
        </div>
        <h3 className="text-xl font-semibold">Where are you moving?</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ZipCodeInput
          label="Moving From (Zip Code)"
          value={formData.fromZip}
          onChange={(zip) => updateFormData("fromZip", zip)}
          invalidZip={invalidFromZip}
          address={formData.fromAddress}
          type="from"
          lookingUp={lookingUpFrom}
          onLookup={(zip) => lookupAddress(zip, "from")}
        />

        <ZipCodeInput
          label="Moving To (Zip Code)"
          value={formData.toZip}
          onChange={(zip) => updateFormData("toZip", zip)}
          invalidZip={invalidToZip}
          address={formData.toAddress}
          type="to"
          lookingUp={lookingUpTo}
          onLookup={(zip) => lookupAddress(zip, "to")}
        />
      </div>
    </motion.div>
  )
}
