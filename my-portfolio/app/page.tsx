import Hero from "@/app/sections/Hero"
import AboutMe from "@/app/components/AboutMe"
import Experience from "@/app/components/Experience"
import CaseStudies from "@/app/components/CaseStudies"
import Playground from "@/app/components/Playground"
import Footer from "@/app/components/Footer"

export default function Home() {
  return (
    <main>
      <Hero />
      <CaseStudies />
      <Playground />
      <AboutMe />
      <Experience />
      <Footer />
    </main>
  )
}