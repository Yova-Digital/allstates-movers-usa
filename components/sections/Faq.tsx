"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How far in advance should I book my move?",
    answer: (
      <div className="space-y-3">
        <h3 className="font-bold text-blue-600 text-xl mb-2">Express Delivery Options</h3>
        
        <p>Need it fast? We've got you covered.</p>
        <p>US50 Transport offers reliable express services for urgent moves and time-sensitive shipments.</p>
        
        <div>
          <p className="font-medium">Choose from:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Same-Day Delivery (local moves only)</li>
            <li>Next-Day Delivery (up to 500 miles)</li>
            <li>Priority Express Service (coast-to-coast within 2–3 days)</li>
          </ul>
        </div>
        
        <div>
          <p className="font-medium">Why choose Express?</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Guaranteed delivery windows</li>
            <li>Real-time tracking</li>
            <li>Dedicated express support team</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    question: "Do you provide packing services?",
    answer:
      "Yes, we offer comprehensive packing services. Our team can handle everything from partial packing of fragile items to full-service packing of your entire home. All packing materials are included in our packing service.",
  },
  {
    question: "How do you protect furniture during transport?",
    answer:
      "We use industry-leading protection methods including furniture blankets, plastic wrap, custom crating for valuable items, and secure loading techniques to ensure your furniture arrives in the same condition it left.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Cancellations made more than 7 days before your scheduled move date receive a full refund. Cancellations within 7 days may be subject to a cancellation fee. Please contact us as soon as possible if you need to cancel or reschedule.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Yes, US50 Transport is fully licensed and insured. We maintain all required federal and state licenses, including USDOT and MC numbers. We carry comprehensive cargo insurance, liability insurance, and workers' compensation.",
  },
  {
    question: "How do you handle delays due to weather or other circumstances?",
    answer:
      "We closely monitor weather conditions and plan accordingly. If delays are expected, we'll communicate with you promptly. In case of significant delays, we'll work with you to find the best solution and may offer compensation depending on the circumstances.",
  },
]

export default function Faq() {
  return (
    <section id="faq" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Find answers to common questions about our moving services
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-md"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <span className="text-left font-medium text-lg">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-2 text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
