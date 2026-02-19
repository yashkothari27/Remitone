import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/home/HeroSection'
import TrustIndicators from '@/components/home/TrustIndicators'
import FeaturesSection from '@/components/home/FeaturesSection'
import HowItWorks from '@/components/home/HowItWorks'
import CorridorsPreview from '@/components/home/CorridorsPreview'
import AppPromotion from '@/components/home/AppPromotion'
import Testimonials from '@/components/home/Testimonials'
import CTASection from '@/components/home/CTASection'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <TrustIndicators />
      <FeaturesSection />
      <CorridorsPreview />
      <HowItWorks />
      <AppPromotion />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  )
}
