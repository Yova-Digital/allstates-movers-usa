"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const images = [
  {
    src: "https://images.unsplash.com/photo-1657049199023-87fb439d47c5?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Moving Homes, Offices, and Everything In Between — With Care Across America Professional movers carefully wrapping and transporting household goods.",
  },
  {
    src: "https://images.unsplash.com/photo-1633155565182-16c06ed45ec5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8TW92aW5nJTIwdHJ1Y2slMjBiZWluZyUyMGxvYWRlZCUyMHdpdGglMjBmdXJuaXR1cmV8ZW58MHx8MHx8fDA%3D",
    alt: "From Boxes to Beds — We Load It All with Care. Our expert movers ensure every household item is packed, loaded, and protected for the journey ahead.",
  },
  {
    src: "https://images.unsplash.com/photo-1645526816819-f4c8cdaf47fc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fEZ1cm5pdHVyZSUyMGJlaW5nJTIwZGVsaXZlcmVkJTIwdG8lMjBhJTIwbmV3JTIwaG9tZXxlbnwwfHwwfHx8MA%3D%3D",
    alt: "Welcome Home — Delivered With Care. We don’t just move furniture. We deliver comfort, memories, and a fresh start.",
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1682141929497-97402f35d45e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fEZ1cm5pdHVyZSUyMHNhZmVseSUyMHNlY3VyZWQlMjBpbiUyMG1vdmluZyUyMHRydWNrfGVufDB8fDB8fHww",
    alt: "Team of professional movers",
  },
  {
    src: "https://images.unsplash.com/photo-1614359835514-92f8ba196357?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8RnVybml0dXJlJTIwc2FmZWx5JTIwc2VjdXJlZCUyMGluJTIwbW92aW5nJTIwdHJ1Y2t8ZW58MHx8MHx8fDA%3D",
    alt: "Your home safely secured in moving truck",
  },
]

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [width, setWidth] = useState(0)
  const carousel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  return (
    <section id="gallery" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Gallery</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">See our professional moving team in action</p>
        </motion.div>

        <div className="relative">
          <motion.div ref={carousel} className="overflow-hidden cursor-grab" whileTap={{ cursor: "grabbing" }}>
            <motion.div
              className="flex"
              drag="x"
              dragConstraints={{ right: 0, left: -width }}
              initial={{ x: 0 }}
              animate={{ x: -currentIndex * (carousel.current?.offsetWidth || 0) }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  className="min-w-full px-4"
                  initial={{ opacity: 0.5, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative aspect-video overflow-hidden rounded-2xl shadow-xl">
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <p className="mt-4 text-center text-gray-600 dark:text-gray-400">{image.alt}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 z-10"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 z-10"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          <div className="flex justify-center mt-6 space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentIndex === index
                    ? "bg-primary"
                    : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
