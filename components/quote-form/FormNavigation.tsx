"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react"

interface FormNavigationProps {
  step: number
  nextStep: () => void
  prevStep: () => void
  isStepComplete: (step: number) => boolean
  isSubmitting: boolean
}

export default function FormNavigation({
  step,
  nextStep,
  prevStep,
  isStepComplete,
  isSubmitting
}: FormNavigationProps) {
  return (
    <div className="flex justify-between mt-10">
      {step > 1 ? (
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          className="flex items-center space-x-2"
          size="lg"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      ) : (
        <div></div>
      )}

      {step < 3 ? (
        <Button
          type="button"
          onClick={nextStep}
          disabled={!isStepComplete(step)}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          size="lg"
        >
          Continue
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      ) : (
        <Button
          type="submit"
          disabled={isSubmitting || !isStepComplete(step)}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          size="lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Get Your Quote
              <Check className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      )}
    </div>
  )
}
