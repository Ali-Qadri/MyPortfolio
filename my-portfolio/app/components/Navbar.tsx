import GlitchText from "@/app/effects/GlitchText"

export default function Navbar() {
  return (
    <nav className="w-full px-12 py-6 flex items-center justify-between">
      
      {/* Logo / Name */}
      <div className="text-lg font-semibold">
        Syed Ali
      </div>

      {/* Menu */}
      <div className="flex gap-8 text-sm text-gray-300">
        <a href="#" className="hover:text-white transition">
          <GlitchText>Home</GlitchText>
        </a>
        <a href="#" className="hover:text-white transition">
          <GlitchText>Case Studies</GlitchText>
        </a>
        <a href="#" className="hover:text-white transition">
          <GlitchText>Contact</GlitchText>
        </a>
      </div>

    </nav>
  )
}