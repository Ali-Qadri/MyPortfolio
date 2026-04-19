import Hero from "@/app/sections/Hero"
import Navbar from "@/app/components/Navbar"
import PhotoReveal from '@/app/effects/DraggablePhoto';
import CaseStudies from '@/app/components/CaseStudies';
import Aboutme from '@/app/components/AboutMe';
import Process from '@/app/components/Process';
import Footer from '@/app/components/Footer';

export default function Home() {
  return (
    <main>
      <div style={{ position: 'relative' }}>
      
      <PhotoReveal />
      <Hero />
      </div>
      <CaseStudies />
      <Aboutme />
      <Process />
      <Footer />
    </main>
  )
}