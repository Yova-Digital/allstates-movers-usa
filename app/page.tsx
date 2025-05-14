import WhyChooseUs from "@/components/sections/WhyChooseUs"
import HowItWorks from "@/components/sections/HowItWorks"
import Gallery from "@/components/sections/Gallery"
import Testimonials from "@/components/sections/Testimonials"
import Faq from "@/components/sections/Faq"
import Contact from "@/components/sections/Contact"
import Footer from "@/components/sections/Footer"
import Preloader from "@/components/Preloader"
import CreativeQuoteForm from "@/components/CreativeQuoteForm"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Preloader />

      <section className="relative min-h-screen pt-20 pb-24 flex items-center">

        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 dark:from-black/80 dark:to-black/60 z-10" />
          <img
            src="https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?q=80&w=3218&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Moving truck on the road"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="flex space-x-4 mb-6">
                <div className="border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                  USDOT 4378213
                </div>
                <div className="border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                  MC-1715829
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
                Moving Your Home{" "}
                <span className="text-blue-500">
                  With Excellence
                </span>
                Across America
              </h1>

              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl">
                Premium household goods moving service with exceptional care and nationwide coverage. From delicate heirlooms to everyday essentials, we transport your life's treasures safely to your new beginning.
              </p>
            </div>

            <CreativeQuoteForm />
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <HowItWorks />
      <Gallery />
      <Testimonials />
      <Faq />
      <Contact />
      <Footer />
    </main>
  )
}
