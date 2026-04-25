'use client';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import Footer from '@/app/components/Footer';

export default function NocodeLatCaseStudy() {
  const router = useRouter();

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', color: '#fff' }}>

      <div style={{ padding: '6rem 3rem 2rem 3rem' }}>
        <button
          onClick={() => router.back()}
          style={{ background: 'transparent', border: 'none', color: '#949494', fontFamily: 'var(--font-body)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', padding: 0 }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = '#444')}
        >
          ← Back
        </button>
      </div>

      <div style={{ padding: '4rem 3rem 6rem', borderBottom: '1px solid #1a1a1a' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', letterSpacing: '0.2em', color: '#949494', textTransform: 'uppercase', marginBottom: '2rem' }}>
          01 — Website Design & Community Growth
        </p>
        <h1 style={{ fontSize: 'clamp(4rem, 12vw, 11rem)', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 0.9, textTransform: 'uppercase', marginBottom: '3rem' }}>
          Website design concept for nocode lat
        </h1>
        <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap', marginTop: '3rem' }}>
          {[
            { label: 'Project Type', value: 'Landing Page' },
            { label: 'Tools', value: 'Figma' },
            { label: 'Role', value: 'Web Designer' },
            { label: 'Year', value: '2024' },
          ].map(item => (
            <div key={item.label}>
              <p style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: '#949494', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '6px' }}>{item.label}</p>
              <p style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#888' }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <ImageCarousel />

      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '6rem 3rem' }}>
        <ContentRow label="Introduction" content="Hey, I'm Ali Qadri — a web designer and developer with over 2 years of experience. I mostly build websites for consultant creators and small businesses. A friend reached out to help with his community, NoCode.Lat, which has over 400 members on Discord. The founder, Sebastian Bimbi, brought me on to help grow the community and increase its reach." />
        <ContentRow label="The Problem" content="The Discord community was pretty quiet and needed a spark. Even though there were 400+ members, there wasn't much talking going on. It needed a way to feel alive again." />
        <ContentRow label="The Goal" content="The main goal was to build brand awareness among no-code developers and get them into the NoCode.Lat community through a new website." />
        <ContentRow label="The Process" content={"After collecting all information and brand assets from Sebastian, I documented the full project scope in Figma and researched the target audience.\n\nI went through competitor websites, analyzed their content and design, and collected 10+ designs — spending a week studying them.\n\nAlongside the website work, I also improved their Discord community — adding important channels, roles, and bots to make it feel active and organized."} />
        <ContentRow label="Concepts" content="I designed multiple concepts for Sebastian to choose from — going fully from light mode to dark mode variations. The client loved the dark mode concepts and wanted to proceed with that direction." />
      </div>



      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '0 3rem 8rem' }}>
        <ContentRow label="Outcome" content="The client was happy with the dark mode direction and we proceeded with the final design. The website concept was built to attract no-code developers and funnel them into the Discord community." />
      </div>

      <Footer />
    </main>
  );
}

function ContentRow({ label, content }: { label: string; content: string }) {
  return (
    <div style={{ marginBottom: '4rem', display: 'grid', gridTemplateColumns: '160px 1fr', gap: '2rem' }}>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: '#949494', letterSpacing: '0.15em', textTransform: 'uppercase', paddingTop: '4px' }}>
        {label}
      </p>
      <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#888', whiteSpace: 'pre-line' }}>
        {content}
      </p>
    </div>
  );
}

function ImageCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - trackRef.current!.offsetLeft;
    scrollLeft.current = trackRef.current!.scrollLeft;
    trackRef.current!.style.cursor = 'grabbing';
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current!.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    trackRef.current!.scrollLeft = scrollLeft.current - walk;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = 'grab';
  };

  const images = [
    { src: '/nocodelat/nocode-1.png', label: 'Card UI Design' },
    { src: '/nocodelat/nocode-2.png', label: 'Variant Comparison' },
    { src: '/nocodelat/nocode-3.png', label: 'Final Dark Mode' },
    { src: '/nocodelat/nocode-4.png', label: 'Layouts 5, 6 & 7' },
  ];

  return (
    <div style={{ padding: '4rem 0', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a', marginBottom: '6rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', padding: '0 3rem' }}>
        <p style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: '#333', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Design Work
        </p>
        <p style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: '#949494', letterSpacing: '0.1em' }}>
          drag →
        </p>
      </div>
      <div
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{
          display: 'flex',
          gap: '1.5rem',
          overflowX: 'scroll',
          cursor: 'grab',
          scrollbarWidth: 'none',
          paddingLeft: '3rem',
          paddingRight: '3rem',
          paddingBottom: '1rem',
          userSelect: 'none',
        } as React.CSSProperties}
      >
        {images.map((img, i) => (
          <div key={i} style={{ flexShrink: 0, width: '480px' }}>
            <img
              src={img.src}
              alt={img.label}
              draggable={false}
              style={{
                width: '100%',
                display: 'block',
                borderRadius: '2px',
                filter: 'brightness(0.9)',
                transition: 'filter 0.3s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1)')}
              onMouseLeave={e => (e.currentTarget.style.filter = 'brightness(0.9)')}
            />
            <p style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: '#949494', letterSpacing: '0.1em', marginTop: '0.75rem' }}>
              {String(i + 1).padStart(2, '0')} — {img.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}