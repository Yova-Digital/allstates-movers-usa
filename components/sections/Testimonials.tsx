"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
// Removed Avatar components

const testimonials = [
  {
    name: "Sarah M.",
    location: "Austin, TX",
    rating: 5,
    text: "Absolutely blown away by how smooth the whole process was! The team was punctual, super careful with our antique furniture, and incredibly friendly. It felt like we had friends helping us move—not just a company. 10/10!",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Michael Chen",
    location: "Texas to Washington",
    rating: 5,
    text: "I’ve used other moving companies before, but this one is different. Transparent pricing, zero damage, and the crew worked like a well-oiled machine. They made a stressful day feel like a breeze.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Lina H.",
    location: "Miami, FL",
    rating: 5,
    text: "From the first phone call to the final box being unloaded, the service was top-notch. They even helped me reassemble my bed and organize my living room! Highly recommended for anyone looking for a stress-free move.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "David Thompson",
    location: "Colorado to Virginia",
    rating: 5,
    text: "What stood out most was their respect and communication. I knew where my items were every step of the way, and they treated my home like it was their own. I’ll never use another company again.",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  return (
    <section id="testimonials" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Read testimonials from our satisfied customers across the country
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, x: -currentIndex * 100 + "%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="min-w-full px-4">
                  <Card className="border-none shadow-lg">
                    <CardContent className="p-8">
                      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                        <div className="flex-shrink-0">
                          <span className="flex items-center justify-center w-20 h-20 text-2xl font-bold rounded-full bg-primary/10 text-primary border-2 border-primary">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                              />
                            ))}
                          </div>

                          <p className="text-lg mb-4 italic">"{testimonial.text}"</p>

                          <div>
                            <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                            <p className="text-gray-600 dark:text-gray-400">{testimonial.location}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </motion.div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white dark:bg-gray-800 shadow-lg"
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white dark:bg-gray-800 shadow-lg"
            onClick={nextTestimonial}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentIndex === index
                    ? "bg-primary"
                    : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
