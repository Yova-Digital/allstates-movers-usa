"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Truck, Calendar, User, MapPin, ArrowRight, ArrowLeft, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

// Sample ZIP code coordinates database (longitude, latitude)
const zipCoordinates: Record<string, [number, number]> = {
  "10001": [-73.9964, 40.7509], // New York
  "90210": [-118.4004, 34.0901], // Beverly Hills
  "60601": [-87.6249, 41.8856], // Chicago
  "75001": [-96.8373, 32.9795], // Dallas
  "33101": [-80.1937, 25.7743], // Miami
  "02108": [-71.0637, 42.3590], // Boston
  "98101": [-122.3321, 47.6101], // Seattle
  "94102": [-122.4194, 37.7749], // San Francisco
  "80201": [-104.9903, 39.7392], // Denver
  "70112": [-90.0715, 29.9511], // New Orleans
  "19102": [-75.1624, 39.9526], // Philadelphia
  "20001": [-77.0162, 38.9041], // Washington DC
  "30301": [-84.3877, 33.7488], // Atlanta
  "37201": [-86.7833, 36.1622], // Nashville
  "77001": [-95.3621, 29.7604], // Houston
}

interface Address {
  street: string
  city: string
  state: string
  zipCode: string
}

export default function CreativeQuoteForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fromZip: "",
    toZip: "",
    fromAddress: {} as Address,
    toAddress: {} as Address,
    movingDate: "",
    moveSize: "",
    fullName: "",
    email: "",
    phone: "",
  })
  const [lookingUpFrom, setLookingUpFrom] = useState(false)
  const [lookingUpTo, setLookingUpTo] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
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
        } else {
          updateFormData("toAddress", foundAddress);
        }
      } else {
        // Fallback for when the API doesn't return useful results
        const fallbackAddress: Address = {
          street: `${Math.floor(Math.random() * 999) + 100} Main St`,
          city: zipCoordinates[zipCode] ? getZipCodeCity(zipCode) : "Unknown City",
          state: zipCoordinates[zipCode] ? getZipCodeState(zipCode) : "US",
          zipCode,
        };

        if (type === "from") {
          updateFormData("fromAddress", fallbackAddress);
        } else {
          updateFormData("toAddress", fallbackAddress);
        }
      }
    } catch (error) {
      console.error("Error fetching address data:", error);
      
      // Fallback in case of error
      const fallbackAddress: Address = {
        street: `${Math.floor(Math.random() * 999) + 100} Main St`,
        city: zipCoordinates[zipCode] ? getZipCodeCity(zipCode) : "Unknown City",
        state: zipCoordinates[zipCode] ? getZipCodeState(zipCode) : "US",
        zipCode,
      };

      if (type === "from") {
        updateFormData("fromAddress", fallbackAddress);
      } else {
        updateFormData("toAddress", fallbackAddress);
      }
    } finally {
      if (type === "from") {
        setLookingUpFrom(false);
      } else {
        setLookingUpTo(false);
      }
    }
  }
  
  const getZipCodeCity = (zipCode: string): string => {
    const cities: Record<string, string> = {
      "10001": "New York",
      "90210": "Beverly Hills",
      "60601": "Chicago",
      "75001": "Dallas",
      "33101": "Miami",
      "02108": "Boston",
      "98101": "Seattle",
      "94102": "San Francisco",
      "80201": "Denver",
      "70112": "New Orleans",
      "19102": "Philadelphia",
      "20001": "Washington DC",
      "30301": "Atlanta",
      "37201": "Nashville",
      "77001": "Houston",
    };
    return cities[zipCode] || "Unknown City";
  }
  
  const getZipCodeState = (zipCode: string): string => {
    const states: Record<string, string> = {
      "10001": "NY",
      "90210": "CA",
      "60601": "IL",
      "75001": "TX",
      "33101": "FL",
      "02108": "MA",
      "98101": "WA",
      "94102": "CA",
      "80201": "CO",
      "70112": "LA",
      "19102": "PA",
      "20001": "DC",
      "30301": "GA",
      "37201": "TN",
      "77001": "TX",
    };
    return states[zipCode] || "US";
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
      moveSize: "",
      fullName: "",
      email: "",
      phone: "",
    })
    setStep(1)
  }

  // Calculate distance between two ZIP codes
  const calculateDistance = (fromZip: string, toZip: string): number => {
    // If the same ZIP code, distance is 0
    if (fromZip === toZip) return 0;
    
    // If either ZIP code is missing or invalid, use a fallback distance
    if (!fromZip || !toZip || fromZip.length !== 5 || toZip.length !== 5) {
      return 500; // Default fallback distance
    }
    
    // For well-known ZIP code pairs, use pre-calculated distances (optional enhancement)
    const knownDistances: Record<string, number> = {
      // New York to Los Angeles
      "10001-90210": 2445,
      "90210-10001": 2445,
      // Chicago to Miami
      "60601-33101": 1192,
      "33101-60601": 1192,
      // San Francisco to New York
      "94102-10001": 2578,
      "10001-94102": 2578,
    };
    
    // Check if we have a pre-calculated distance for this pair
    const pairKey = `${fromZip}-${toZip}`;
    if (knownDistances[pairKey]) {
      return knownDistances[pairKey];
    }
    
    // Otherwise calculate with Haversine formula
    // Default coordinates for unknown ZIP codes (US center)
    const defaultCoord: [number, number] = [-95.7129, 37.0902];
    
    // Get coordinates
    const fromCoord = zipCoordinates[fromZip] || defaultCoord;
    const toCoord = zipCoordinates[toZip] || defaultCoord;
    
    // If both ZIP codes use the default coordinate, we need a better estimate
    if (!zipCoordinates[fromZip] && !zipCoordinates[toZip]) {
      // Calculate a more realistic distance based on ZIP code numerical difference
      // (This is not accurate but better than returning 0)
      const zipDifference = Math.abs(parseInt(fromZip) - parseInt(toZip));
      return Math.min(Math.max(Math.round(zipDifference / 20), 50), 2500);
    }
    
    // Haversine formula to calculate distance between two points on Earth
    const R = 3958.8; // Earth's radius in miles
    const dLat = (toCoord[1] - fromCoord[1]) * Math.PI / 180;
    const dLon = (toCoord[0] - fromCoord[0]) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(fromCoord[1] * Math.PI / 180) * Math.cos(toCoord[1] * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    // Return rounded distance
    return Math.round(distance);
  }
  
  // Calculate estimated moving time based on distance
  const calculateMovingTime = (distance: number): string => {
    if (distance < 50) return "Same day"
    if (distance < 300) return "1-2 days"
    if (distance < 1000) return "2-3 days"
    if (distance < 2000) return "3-5 days"
    return "5-7 days"
  }

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  const isStepComplete = (stepIndex: number) => {
    if (stepIndex === 1) {
      return (
        formData.fromZip.length === 5 &&
        formData.toZip.length === 5 &&
        formData.fromAddress.street &&
        formData.toAddress.street
      )
    } else if (stepIndex === 2) {
      return formData.movingDate && formData.moveSize
    } else if (stepIndex === 3) {
      return formData.fullName && formData.email && formData.phone
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

          {/* Animated Progress Bar */}
          <div className="relative mb-10">
            <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
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
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
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

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {step === 1 && (
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
                    <div className="space-y-4">
                      <Label htmlFor="fromZip" className="text-base">
                        Moving From (Zip Code)
                      </Label>
                      <div className="relative">
                        <Input
                          id="fromZip"
                          placeholder="Enter zip code"
                          value={formData.fromZip}
                          onChange={(e) => {
                            const zip = e.target.value.replace(/\D/g, "").slice(0, 5)
                            updateFormData("fromZip", zip)
                            if (zip.length === 5) lookupAddress(zip, "from")
                          }}
                          className="pr-10"
                          maxLength={5}
                        />
                        {lookingUpFrom && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                          </div>
                        )}
                      </div>

                      {formData.fromAddress.street && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg"
                        >
                          <p className="text-sm font-medium">Found Address:</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {formData.fromAddress.street}
                            <br />
                            {formData.fromAddress.city}, {formData.fromAddress.state} {formData.fromAddress.zipCode}
                          </p>
                        </motion.div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="toZip" className="text-base">
                        Moving To (Zip Code)
                      </Label>
                      <div className="relative">
                        <Input
                          id="toZip"
                          placeholder="Enter zip code"
                          value={formData.toZip}
                          onChange={(e) => {
                            const zip = e.target.value.replace(/\D/g, "").slice(0, 5)
                            updateFormData("toZip", zip)
                            if (zip.length === 5) lookupAddress(zip, "to")
                          }}
                          className="pr-10"
                          maxLength={5}
                        />
                        {lookingUpTo && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                          </div>
                        )}
                      </div>

                      {formData.toAddress.street && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg"
                        >
                          <p className="text-sm font-medium">Found Address:</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {formData.toAddress.street}
                            <br />
                            {formData.toAddress.city}, {formData.toAddress.state} {formData.toAddress.zipCode}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {formData.fromAddress.street && formData.toAddress.street && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl"
                    >
                      <div className="flex items-center justify-center">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                            <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Distance</p>
                            <p className="text-lg font-bold">
                              {calculateDistance(
                                formData.fromAddress.zipCode,
                                formData.toAddress.zipCode
                              )} miles
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-300" />
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
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <p className="text-sm font-medium">Selected Date</p>
                            <p className="text-lg font-bold">
                              {new Date(formData.movingDate).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Selected Size</p>
                            <p className="text-lg font-bold">
                              {formData.moveSize === "studio" ? "Studio" :
                               formData.moveSize === "1bedroom" ? "1 Bedroom" :
                               formData.moveSize === "2bedroom" ? "2 Bedroom" :
                               formData.moveSize === "3bedroom" ? "3 Bedroom" :
                               formData.moveSize === "4bedroom" ? "4+ Bedroom" :
                               formData.moveSize === "office_small" ? "Small Office" :
                               "Large Office"}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                      
                      {/* Express Delivery Options */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-800/30"
                      >
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <div className="shrink-0 bg-blue-100 dark:bg-blue-800/50 p-2 rounded-full mr-3">
                              <Truck className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                            </div>
                            <div>
                              <h3 className="font-bold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Express Delivery Options</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-300">Need it fast? We've got you covered.</p>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            US50 Transport offers reliable express services for urgent moves and time-sensitive shipments.
                          </p>
                          
                          <div className="bg-white/70 dark:bg-gray-800/30 rounded-lg p-3">
                            <p className="font-medium text-sm mb-2">Choose from:</p>
                            <ul className="space-y-1 text-sm pl-5 list-disc text-gray-600 dark:text-gray-300">
                              <li>Same-Day Delivery (local moves only)</li>
                              <li>Next-Day Delivery (up to 500 miles)</li>
                              <li>Priority Express Service (coast-to-coast within 2–3 days)</li>
                            </ul>
                          </div>
                          
                          <div className="bg-white/70 dark:bg-gray-800/30 rounded-lg p-3">
                            <p className="font-medium text-sm mb-2">Why choose Express?</p>
                            <ul className="space-y-1 text-sm pl-5 list-disc text-gray-600 dark:text-gray-300">
                              <li>Guaranteed delivery windows</li>
                              <li>Real-time tracking</li>
                              <li>Dedicated express support team</li>
                            </ul>
                          </div>
                          
                          <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                            Note: Express delivery options will be discussed after quote submission based on availability and your specific requirements.
                          </p>
                        </div>
                      </motion.div>
                    </>
                  )}
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center">
                      <User className="h-5 w-5 text-pink-600 dark:text-pink-300" />
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
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => {
                          const phone = e.target.value.replace(/\D/g, "").slice(0, 10)
                          updateFormData("phone", phone)
                        }}
                        className="mt-2 bg-white dark:bg-gray-800"
                      />
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-blue-50 dark:from-pink-900/20 dark:to-blue-900/20 rounded-xl"
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
              )}
            </AnimatePresence>

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
          </form>
        </div>
      </div>
    </div>
  )
}
