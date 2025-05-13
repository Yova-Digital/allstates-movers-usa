"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

export default function Hero() {
  const router = useRouter()

  const scrollToQuoteForm = () => {
    document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 dark:from-black/80 dark:to-black/60 z-10" />
        <img
          src="/placeholder.svg?height=1080&width=1920"
          alt="Moving truck on the road"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <div className="flex space-x-4 mb-6">
              <Badge variant="outline" className="border-white/20 bg-white/10 backdrop-blur-sm">
                USDOT: 1234567
              </Badge>
              <Badge variant="outline" className="border-white/20 bg-white/10 backdrop-blur-sm">
                MC: 987654
              </Badge>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              Moving Your Furniture <span className="text-primary">With Care</span> Across America
            </h1>

            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl">
              Premium furniture moving services with white-glove handling and nationwide coverage. Your possessions
              deserve the best.
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="text-base" onClick={scrollToQuoteForm}>
                Get a Quote
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="text-base border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
