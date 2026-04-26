'use client';
import { useRouter } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';
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
          02 — LinkedIn Banner Design
        </p>
        <h1 style={{ fontSize: 'clamp(4rem, 12vw, 11rem)', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 0.9, textTransform: 'uppercase', marginBottom: '3rem' }}>
          Linkedin Banner<br />For Rik Basi
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
        <ContentRow label="Introduction" content="Hey, I’m Ali, a web designer and developer. I mostly work with creators and small teams to design clean, simple websites that actually make sense. I worked with a biotech marketer who wanted to improve how they present their work online. Their goal was to build a stronger personal brand and attract the right kind of clients through a focused website." />
        <ContentRow label="The Problem" content="The LinkedIn profile didn’t have a strong first impression. There was no clear visual identity, and the message wasn’t obvious at a glance. Anyone visiting the profile wouldn’t immediately understand what they do or who they help. It needed clarity and a more structured presentation." />
        <ContentRow label="The Goal" content="The goal was to design a banner that clearly communicates their role, niche, and value. All within a simple layout. It also needed to feel clean, professional, and aligned with the biotech space." />
        <ContentRow label="The Process" content={"I started by understanding their work and how they position themselves. Then I looked at other strong LinkedIn profiles, especially in biotech and consulting, to see how they communicate visually. After that, I explored different layout ideas, focusing on strong headlines, minimal text, and proper spacing. The idea was to make the message clear within a few seconds, without overloading the design. I kept the design simple, balanced, and easy to read so it works well across different screen sizes."} />
        <ContentRow label="Concepts" content="The final banner made the profile feel more clear and professional. Now, when someone visits the profile, they can quickly understand what the person does and who they help. It creates a stronger first impression and supports their personal brand in a simple, effective way." />
      </div>



      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '0 3rem 8rem' }}>
        <ContentRow label="Outcome" content="The client was happy with the dark mode direction and we proceeded with the final design. The website concept was built to attract no-code developers and funnel them into the Discord community." />
      </div>

      <Footer />
    </main>
  );
}

function ContentRow({ label, content }: { label: string; content: string }) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div style={{ marginBottom: '4rem', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '160px 1fr', gap: isMobile ? '0.5rem' : '2rem' }}>
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

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
    { src: '/rikbasi/1.png', label: 'Concept 1' },
    { src: '/rikbasi/2.png', label: 'Concept 2' },
    { src: '/rikbasi/3.png', label: 'Concept 3' },

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
          <div key={i} style={{ flexShrink: 0, width: isMobile ? '80vw' : '480px' }}>
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