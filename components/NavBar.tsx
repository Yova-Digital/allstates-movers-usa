"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Truck } from "lucide-react"
import { ModeToggle } from "./ModeToggle"
import { cn } from "@/lib/utils"

const headerLinks = [
  { title: "Why Choose Us", href: "#why-choose-us" },
  { title: "How It Works", href: "#how-it-works" },
  { title: "Gallery", href: "#gallery" },
  { title: "Testimonials", href: "#testimonials" },
  { title: "FAQ", href: "#faq" },
  { title: "Contact", href: "#contact" },
]


export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    if (isOpen) setIsOpen(false)
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        isScrolled 
          ? "bg-white/90 dark:bg-gray-950/90 backdrop-blur-md shadow-md" 
          : "dark:bg-gray-950/70 backdrop-blur-sm shadow-sm",
      )}
    >
      <div className={cn("container mx-auto px-4 sm:px-6 lg:px-8 ", isScrolled ? "text-black container mx-auto px-4 sm:px-6 lg:px-8 dark:text-white" : "text-white container mx-auto px-4 sm:px-6 lg:px-8 dark:text-white")}>
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">

            <Link href="/" className="flex items-center space-x-2">
              <Truck className="h-8 w-8" />
              <span className="text-xl font-bold">Allstates Movers </span>
            </Link>
            
          </div>

          <div className="hidden md:block">
            <nav>

              <ul className="flex items-center space-x-8">
                {headerLinks.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium hover:text-primary transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>

            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <ModeToggle />


            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden backdrop-blur-md bg-gray-950/70 shadow-lg border-t border-gray-200/20 border-gray-800/20 text-white">
          <nav className="px-4 pt-3 pb-4 space-y-1">
            <ul className="space-y-2">

              {headerLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="block px-4 py-3 text-base font-medium hover:bg-gray-800/50 rounded-xl w-full text-left transition-all duration-200 border border-transparent hover:border-gray-700/50"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}

            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}
