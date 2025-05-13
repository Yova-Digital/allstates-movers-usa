"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ArrowLeft, Check, Truck, Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

export default function QuoteForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    pickupAddress: "",
    deliveryAddress: "",
    movingDate: "",
    moveSize: "",
    fullName: "",
    email: "",
    phone: "",
  })

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    // Show success message or redirect
    alert("Quote request submitted successfully! We'll contact you shortly.")
    // Reset form and step
    setFormData({
      pickupAddress: "",
      deliveryAddress: "",
      movingDate: "",
      moveSize: "",
      fullName: "",
      email: "",
      phone: "",
    })
    setStep(1)
  }

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  return (
    <section id="quote-form" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Your Free Moving Quote</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Tell us about your move and we'll provide you with a competitive quote
          </p>
        </motion.div>

        <Card className="max-w-3xl mx-auto border-none shadow-xl">
          <CardContent className="p-8">
            {/* Progress bar */}
            <div className="relative mb-10">
              <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full">
                <motion.div
                  className="h-1 bg-primary rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(step / 3) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <div className="flex justify-between mt-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                        step >= i
                          ? "bg-primary text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400",
                      )}
                    >
                      {step > i ? <Check className="h-5 w-5" /> : i}
                    </div>
                    <span className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                      {i === 1 ? "Locations" : i === 2 ? "Details" : "Contact"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-6">
                      <Truck className="h-6 w-6 text-primary" />
                      <h3 className="text-xl font-medium">Pickup & Delivery Locations</h3>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="pickupAddress" className="text-base">
                          Pickup Address
                        </Label>
                        <Input
                          id="pickupAddress"
                          placeholder="Enter pickup address"
                          value={formData.pickupAddress}
                          onChange={(e) => updateFormData("pickupAddress", e.target.value)}
                          required
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="deliveryAddress" className="text-base">
                          Delivery Address
                        </Label>
                        <Input
                          id="deliveryAddress"
                          placeholder="Enter delivery address"
                          value={formData.deliveryAddress}
                          onChange={(e) => updateFormData("deliveryAddress", e.target.value)}
                          required
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-6">
                      <Calendar className="h-6 w-6 text-primary" />
                      <h3 className="text-xl font-medium">Moving Details</h3>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="movingDate" className="text-base">
                          Moving Date
                        </Label>
                        <Input
                          id="movingDate"
                          type="date"
                          value={formData.movingDate}
                          onChange={(e) => updateFormData("movingDate", e.target.value)}
                          required
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="moveSize" className="text-base">
                          Move Size
                        </Label>
                        <Select value={formData.moveSize} onValueChange={(value) => updateFormData("moveSize", value)}>
                          <SelectTrigger id="moveSize" className="mt-2">
                            <SelectValue placeholder="Select move size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Small (1-2 rooms)</SelectItem>
                            <SelectItem value="medium">Medium (3-4 rooms)</SelectItem>
                            <SelectItem value="large">Large (5+ rooms)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-6">
                      <User className="h-6 w-6 text-primary" />
                      <h3 className="text-xl font-medium">Contact Information</h3>
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
                          required
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-base">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) => updateFormData("email", e.target.value)}
                          required
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-base">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={(e) => updateFormData("phone", e.target.value)}
                          required
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>

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
                  <Button type="button" onClick={nextStep} className="flex items-center space-x-2" size="lg">
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button type="submit" className="flex items-center space-x-2" size="lg">
                    Submit Request
                    <Check className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
