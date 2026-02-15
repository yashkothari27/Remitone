import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/home/HeroSection'
import FeaturesSection from '@/components/home/FeaturesSection'
import HowItWorks from '@/components/home/HowItWorks'
import TrustIndicators from '@/components/home/TrustIndicators'
import CorridorsPreview from '@/components/home/CorridorsPreview'
import AppPromotion from '@/components/home/AppPromotion'
import CTASection from '@/components/home/CTASection'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <TrustIndicators />
      <FeaturesSection />
      <CorridorsPreview />
      <HowItWorks />
      <AppPromotion />
      <CTASection />
      <Footer />
    </main>
  )
}
