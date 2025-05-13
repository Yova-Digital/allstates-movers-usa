"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

import StepsProgressBar from "./StepsProgressBar"
import LocationStep from "./LocationStep"
import DetailsStep from "./DetailsStep"
import ContactStep from "./ContactStep"
import FormNavigation from "./FormNavigation"
import { FormData, Address } from "./types"
import { getZipCodeCity, getZipCodeState, zipCoordinates } from "./zipCodeService"

export default function CreativeQuoteForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    fromZip: "",
    toZip: "",
    fromAddress: {} as Address,
    toAddress: {} as Address,
    movingDate: "",
    deliveryDate: "",
    moveSize: "",
    fullName: "",
    email: "",
    phone: "",
  })
  const [lookingUpFrom, setLookingUpFrom] = useState(false)
  const [lookingUpTo, setLookingUpTo] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [invalidFromZip, setInvalidFromZip] = useState(false)
  const [invalidToZip, setInvalidToZip] = useState(false)
  const { toast } = useToast()

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const lookupAddress = async (zipCode: string, type: "from" | "to") => {
    if (zipCode.length !== 5) return

    if (type === "from") {
      setLookingUpFrom(true)
    } else {
      setLookingUpTo(true)
    }

    try {
      const apiKey = "d2c3aa30-2fb0-11f0-895b-85719009b69c";
      
      const response = await fetch(
        `https://app.zipcodebase.com/api/v1/search?apikey=${apiKey}&codes=${zipCode}&country=us`
      );
      const data = await response.json();

      if (data.results && data.results[zipCode] && data.results[zipCode].length > 0) {
        const locationData = data.results[zipCode][0];
        const city = locationData.city || "";
        const state = locationData.state || "";
        
        const streetNames = [
          "Main St", "Oak St", "Maple Ave", "Washington St", "Park Ave",
          "Elm St", "Lake Dr", "River Rd", "Highland Ave", "Cedar Ln",
          "Sunset Dr", "Lincoln Ave", "Jefferson St", "Madison Ave", "Franklin St"
        ];
        
        const randomStreetName = streetNames[Math.floor(Math.random() * streetNames.length)];
        const streetNumber = Math.floor(Math.random() * 999) + 100;
        const street = `${streetNumber} ${randomStreetName}`;
        
        const foundAddress: Address = {
          street,
          city,
          state,
          zipCode,
        };

        if (type === "from") {
          updateFormData("fromAddress", foundAddress);
          setInvalidFromZip(false);
        } else {
          updateFormData("toAddress", foundAddress);
          setInvalidToZip(false);
        }
      } else if (zipCoordinates[zipCode]) {
        // Fallback for when the API doesn't return useful results but we know the ZIP code
        const fallbackAddress: Address = {
          street: `${Math.floor(Math.random() * 999) + 100} Main St`,
          city: getZipCodeCity(zipCode),
          state: getZipCodeState(zipCode),
          zipCode,
        };

        if (type === "from") {
          updateFormData("fromAddress", fallbackAddress);
          setInvalidFromZip(false);
        } else {
          updateFormData("toAddress", fallbackAddress);
          setInvalidToZip(false);
        }
      } else {
        // Unknown ZIP code
        if (type === "from") {
          setInvalidFromZip(true);
        } else {
          setInvalidToZip(true);
        }
      }
    } catch (error) {
      console.error("Error fetching address data:", error);
      
      if (zipCoordinates[zipCode]) {
        // Fallback in case of error but we know the ZIP code
        const fallbackAddress: Address = {
          street: `${Math.floor(Math.random() * 999) + 100} Main St`,
          city: getZipCodeCity(zipCode),
          state: getZipCodeState(zipCode),
          zipCode,
        };

        if (type === "from") {
          updateFormData("fromAddress", fallbackAddress);
          setInvalidFromZip(false);
        } else {
          updateFormData("toAddress", fallbackAddress);
          setInvalidToZip(false);
        }
      } else {
        // Unknown ZIP code
        if (type === "from") {
          setInvalidFromZip(true);
        } else {
          setInvalidToZip(true);
        }
      }
    } finally {
      if (type === "from") {
        setLookingUpFrom(false);
      } else {
        setLookingUpTo(false);
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Success
    toast({
      title: "Quote request submitted!",
      description: "We'll get back to you with a detailed quote within 24 hours.",
    })

    setIsSubmitting(false)
    // Reset form
    setFormData({
      fromZip: "",
      toZip: "",
      fromAddress: {} as Address,
      toAddress: {} as Address,
      movingDate: "",
      deliveryDate: "",
      moveSize: "",
      fullName: "",
      email: "",
      phone: "",
    })
    setStep(1)
  }

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  const isStepComplete = (stepIndex: number): boolean => {
    if (stepIndex === 1) {
      return !!(
        formData.fromZip.length === 5 &&
        formData.toZip.length === 5 &&
        !!formData.fromAddress.city &&
        !!formData.toAddress.city &&
        !invalidFromZip &&
        !invalidToZip
      )
    } else if (stepIndex === 2) {
      return !!(
        !!formData.movingDate && 
        !!formData.deliveryDate && 
        !!formData.moveSize
      )
    } else if (stepIndex === 3) {
      return !!(
        !!formData.fullName && 
        !!formData.email && 
        !!formData.phone
      )
    }
    return false
  }

  return (
    <div className="relative z-10 max-w-4xl mx-auto">
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2 text-center">Get Your Free Moving Quote</h2>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Tell us about your move and we'll provide a competitive quote
            </p>
          </div>

          <StepsProgressBar step={step} setStep={setStep} />

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <LocationStep 
                  formData={formData}
                  updateFormData={updateFormData}
                  lookupAddress={lookupAddress}
                  invalidFromZip={invalidFromZip}
                  invalidToZip={invalidToZip}
                  lookingUpFrom={lookingUpFrom}
                  lookingUpTo={lookingUpTo}
                />
              )}

              {step === 2 && (
                <DetailsStep 
                  formData={formData}
                  updateFormData={updateFormData}
                />
              )}

              {step === 3 && (
                <ContactStep 
                  formData={formData}
                  updateFormData={updateFormData}
                />
              )}
            </AnimatePresence>

            <FormNavigation 
              step={step}
              nextStep={nextStep}
              prevStep={prevStep}
              isStepComplete={isStepComplete}
              isSubmitting={isSubmitting}
            />
          </form>
        </div>
      </div>
    </div>
  )
}
