'use client';
import { useRouter } from 'next/navigation';

export default function NocodeLatCaseStudy() {
  const router = useRouter();

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', color: '#fff' }}>

      <div style={{ padding: '2rem 3rem' }}>
        <button
          onClick={() => router.back()}
          style={{ background: 'transparent', border: 'none', color: '#444', fontFamily: 'monospace', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', padding: 0 }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = '#444')}
        >
          ← Back
        </button>
      </div>

      <div style={{ padding: '4rem 3rem 6rem', borderBottom: '1px solid #1a1a1a' }}>
        <p style={{ fontFamily: 'monospace', fontSize: '0.7rem', letterSpacing: '0.2em', color: '#444', textTransform: 'uppercase', marginBottom: '2rem' }}>
          01 — Website Design & Community Growth
        </p>
        <h1 style={{ fontSize: 'clamp(4rem, 12vw, 11rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.9, textTransform: 'uppercase', marginBottom: '3rem' }}>
          NoCode<br />.Lat
        </h1>

        <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap', marginTop: '3rem' }}>
          {[
            { label: 'Project Type', value: 'Landing Page' },
            { label: 'Tools', value: 'Figma' },
            { label: 'Role', value: 'Web Designer' },
            { label: 'Year', value: '2024' },
          ].map(item => (
            <div key={item.label}>
              <p style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: '#333', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '6px' }}>{item.label}</p>
              <p style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#888' }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '6rem 3rem' }}>
        {[
          { label: 'Introduction', content: `Hey, I'm Ali Qadri — a web designer and developer with over 2 years of experience. I mostly build websites for consultant creators and small businesses. A friend reached out to help with his community, NoCode.Lat, which has over 400 members on Discord. The founder, Sebastian Bimbi, brought me on to help grow the community and increase its reach.` },
          { label: 'The Problem', content: `The Discord community was pretty quiet and needed a spark. Even though there were 400+ members, there wasn't much talking going on. It needed a way to feel alive again.` },
          { label: 'The Goal', content: `The main goal was to build brand awareness among no-code developers and get them to join the NoCode.Lat community through a new website.` },
          { label: 'The Process', content: `After collecting all information and brand assets from Sebastian, I documented the full project scope in Figma and researched the target audience.\n\nI went through competitor websites, analyzed their content and design, and collected 10+ designs — spending a week studying them. I used an HTML-to-design plugin to bring all the designs into Figma.\n\nAlongside the website work, I also improved their Discord community — adding important channels, roles, and bots to make it feel active and organized.` },
          { label: 'Concepts', content: `I designed multiple concepts for Sebastian to choose from — going fully from light mode to dark mode variations. The client loved the dark mode concepts and wanted to proceed with that direction.` },
        ].map((section, i) => (
          <div key={i} style={{ marginBottom: '5rem', display: 'grid', gridTemplateColumns: '160px 1fr', gap: '2rem' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: '#333', letterSpacing: '0.15em', textTransform: 'uppercase', paddingTop: '4px' }}>{section.label}</p>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#888', whiteSpace: 'pre-line' }}>{section.content}</p>
          </div>
        ))}
      </div>

    </main>
  );
}