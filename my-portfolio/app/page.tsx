import Hero from "@/app/sections/Hero"
import Navbar from "@/app/components/Navbar"
import PhotoReveal from '@/app/effects/DraggablePhoto';
import CaseStudies from '@/app/components/CaseStudies';

export default function Home() {
  return (
    <main>
      <Navbar />
      <PhotoReveal />
      <Hero />
      
      <CaseStudies />
    </main>
  )
}