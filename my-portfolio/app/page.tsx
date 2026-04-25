import Hero from "@/app/sections/Hero"
import AboutMe from "@/app/components/AboutMe"
import Experience from "@/app/components/Experience"
import CaseStudies from "@/app/components/CaseStudies"
import Footer from "@/app/components/Footer"

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutMe />
      <Experience />
      <CaseStudies />
      <Footer />
    </main>
  )
}