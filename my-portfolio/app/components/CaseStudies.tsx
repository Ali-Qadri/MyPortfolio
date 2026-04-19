'use client';
import { useRouter } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';

const studies = [
  {
    id: 'nocode-lat',
    number: '01',
    title: 'Designed website concepts for nocode.lat',
    type: 'Website Design & Community Growth',
    year: '2025',
    tools: ['Figma'],
    preview: '/nocodelat/nocode-preview.gif',
  },
  {
    id: 'coming-soon',
    number: '02',
    title: 'LinkedIn Banner',
    type: 'Coming Soon',
    year: '—',
    tools: [],
    preview: null,
  },
];

export default function CaseStudies() {
  const router = useRouter();
  const [activePreview, setActivePreview] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const current = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>();

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const animate = () => {
      current.current.x = lerp(current.current.x, target.current.x, 0.08);
      current.current.y = lerp(current.current.y, target.current.y, 0.08);
      if (previewRef.current) {
        previewRef.current.style.transform = `translate(${current.current.x}px, ${current.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current!);
  }, []);

  const onMouseMove = (e: React.MouseEvent) => {
    target.current = { x: e.clientX + 24, y: e.clientY - 80 };
  };

  const onMouseEnter = (preview: string) => {
    setActivePreview(preview);
    setTimeout(() => setVisible(true), 10);
  };

  const onMouseLeave = () => {
    setVisible(false);
    setTimeout(() => setActivePreview(null), 400);
  };

  return (
    <section id="work" style={{ padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 3rem)', width: '100%' }}>

      {/* Floating preview — desktop only */}
      {!isMobile && (
        <div
          ref={previewRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 999,
            pointerEvents: 'none',
            opacity: visible ? 1 : 0,
            scale: visible ? '1' : '0.92',
            transition: 'opacity 0.4s ease, scale 0.4s ease',
            willChange: 'transform',
          }}
        >
          {activePreview && (
            <img
              src={activePreview}
              alt="preview"
              style={{
                width: '320px',
                height: 'auto',
                borderRadius: '2px',
                display: 'block',
                filter: 'grayscale(20%)',
              }}
            />
          )}
        </div>
      )}

      <p style={{
        fontFamily: 'monospace',
        fontSize: '0.7rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: '#949494',
        marginBottom: '4rem',
      }}>
        Selected Work
      </p>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {studies.map((study) => (
          <div
            key={study.id}
            onClick={() => study.id !== 'coming-soon' && router.push(`/case-studies/${study.id}`)}
            onMouseMove={!isMobile ? onMouseMove : undefined}
            onMouseEnter={() => !isMobile && study.preview && onMouseEnter(study.preview)}
            onMouseLeave={() => !isMobile && study.preview && onMouseLeave()}
            style={{
              borderTop: '1px solid #1f1f1f',
              padding: 'clamp(1.5rem, 4vw, 2.5rem) 0',
              display: 'flex',
              alignItems: isMobile ? 'flex-start' : 'center',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'space-between',
              cursor: study.id !== 'coming-soon' ? 'pointer' : 'default',
              transition: 'padding-left 0.3s ease',
              gap: isMobile ? '0.75rem' : '2rem',
            }}
            onMouseOver={e => {
              if (study.id !== 'coming-soon' && !isMobile)
                (e.currentTarget as HTMLElement).style.paddingLeft = '1.5rem';
            }}
            onMouseOut={e => {
              if (!isMobile)
                (e.currentTarget as HTMLElement).style.paddingLeft = '0';
            }}
          >
            <span style={{
              fontFamily: 'monospace',
              fontSize: '0.75rem',
              color: '#949494',
              minWidth: '2rem',
            }}>
              {study.number}
            </span>

            <h2 style={{
              fontSize: 'clamp(1.5rem, 5vw, 5rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              color: study.id === 'coming-soon' ? '#222' : '#fff',
              flex: 1,
              lineHeight: 1,
              textTransform: 'uppercase',
            }}>
              {study.title}
            </h2>

            {!isMobile && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '4px',
                minWidth: '180px',
              }}>
                <span style={{
                  fontFamily: 'monospace',
                  fontSize: '0.7rem',
                  color: '#949494',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textAlign: 'right',
                }}>
                  {study.type}
                </span>
                <span style={{
                  fontFamily: 'monospace',
                  fontSize: '0.65rem',
                  color: '#949494',
                }}>
                  {study.year}
                </span>
              </div>
            )}

            {isMobile && (
              <span style={{
                fontFamily: 'monospace',
                fontSize: '0.65rem',
                color: '#444',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                {study.type} — {study.year}
              </span>
            )}

            {study.id !== 'coming-soon' && (
              <span style={{ fontSize: '1.2rem', color: '#949494' }}>→</span>
            )}
          </div>
        ))}
        <div style={{ borderTop: '1px solid #1f1f1f' }} />
      </div>
    </section>
  );
}