import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Hero from '@/components/home/hero'
import FeaturesGrid from '@/components/home/features-grid'
import ValueProps from '@/components/home/value-props'
import Testimonials from '@/components/home/testimonials'
import CtaBanner from '@/components/home/cta-banner'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturesGrid />
        <ValueProps />
        <Testimonials />
        <CtaBanner />
      </main>
      <Footer />
    </>
  )
}
