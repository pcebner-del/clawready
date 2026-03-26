import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import AuthPaths from '@/components/AuthPaths'
import PainSection from '@/components/PainSection'
import FeaturesSection from '@/components/FeaturesSection'
import HowItWorks from '@/components/HowItWorks'
import Testimonial from '@/components/Testimonial'
import Pricing from '@/components/Pricing'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-[#050a14] min-h-screen">
      <Navbar />
      <Hero />
      <AuthPaths />
      <PainSection />
      <HowItWorks />
      <FeaturesSection />
      <Testimonial />
      <Pricing />
      <Footer />
    </main>
  )
}
