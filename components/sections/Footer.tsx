import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Truck, Phone, Mail, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex flex-col items-start space-y-3 mb-6">
              <Image src="/logo.png" alt="Logo" width={100} height={100} className="rounded-lg"/>
            </div>
            <p className="text-gray-400 mb-6">
              Premium furniture moving services across all 50 states. Professional, reliable, and secure transportation
              for your valuable possessions.
            </p>

            {/* Social Links */}

            {/* <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div> */}

          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#why-choose-us" className="text-gray-400 hover:text-white transition-colors">
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#gallery" className="text-gray-400 hover:text-white transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-gray-400 hover:text-white transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Residential Moving
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Commercial Moving
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Long Distance Moving
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Furniture Transportation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Packing Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Storage Solutions
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-blue-400">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="text-blue-500 h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">All over the US</span>
              </li>
              <li className="flex items-start">
                <Phone className="text-blue-500 h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-gray-300 font-medium">Phone :</span>
                  <Link href="tel:+14754145317" className="text-gray-400">(475) 414-5317</Link>
                  <Link href="tel:+18144313470" className="text-gray-400">(814) 431-3470</Link>
                </div>
              </li>
              <li className="flex items-start">
                <Mail className="text-blue-500 h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <Link href="mailto:Us50transportllc@gmail.com" className="text-gray-400">Us50transportllc@gmail.com</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} US50 Transport LLC. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
