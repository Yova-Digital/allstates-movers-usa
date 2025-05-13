"use client"

import { motion } from "framer-motion"
import { ClipboardList, Truck, Calendar, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: ClipboardList,
    title: "Request a Quote",
    description: "Fill out our simple form with your moving details",
  },
  {
    icon: Calendar,
    title: "Schedule Your Move",
    description: "Choose a convenient date and time for your move",
  },
  {
    icon: Truck,
    title: "Professional Moving",
    description: "Our expert team handles your furniture with care",
  },
  {
    icon: CheckCircle,
    title: "Safe Delivery",
    description: "Your items arrive safely at your new location",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Our simple process makes moving furniture across the country easy and stress-free
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2" />

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className={`md:flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                      <step.icon className="h-10 w-10 text-primary mb-4 mx-auto md:mx-0 md:ml-auto" />
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                    </div>
                  </div>

                  <div className="hidden md:flex justify-center items-center md:w-0">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold z-10">
                      {index + 1}
                    </div>
                  </div>

                  <div className="md:w-1/2" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
