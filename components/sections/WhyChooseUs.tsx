"use client"

import { motion } from "framer-motion"
import { Shield, Clock, Award, Truck, DollarSign, HeartHandshake } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Shield,
    title: "Fully Insured",
    description: "All your household goods are protected with comprehensive insurance coverage",
  },
  {
    icon: Clock,
    title: "On-Time Service",
    description: "We value your time with punctual pickups and deliveries across the country",
  },
  {
    icon: Award,
    title: "Experienced Team",
    description: "Our movers have years of expertise in handling all types of household goods safely",
  },
  {
    icon: Truck,
    title: "Nationwide Coverage",
    description: "We service all 50 states with our premium moving solutions for any distance",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description: "No hidden fees or surprise charges, just honest pricing for your peace of mind",
  },
  {
    icon: HeartHandshake,
    title: "White Glove Service",
    description: "Premium handling for everything from everyday items to precious heirlooms",
  },
]

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose US50 Transport</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            We've built our reputation on reliability, professionalism, and exceptional care for all your household belongings
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
