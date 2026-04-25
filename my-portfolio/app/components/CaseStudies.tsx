'use client';
import { useRouter } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cubicBezier } from "framer-motion";

const studies = [
  {
    id: 'nocode-lat',
    number: '01',
    title: 'NoCode.Lat',
    type: 'Website Design & Community Growth',
    year: '2025',
    preview: '/nocodelat/nocode-preview.gif',
  },
  {
    id: 'linkedin-banner',
    number: '02',
    title: 'LinkedIn Banner',
    type: 'LinkedIn Banner Design',
    year: '2026',
    preview: '/rikbasi/rikbasi-preview.gif',
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
      requestAnimationFrame(animate);
    };
    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onMouseMove = (e: React.MouseEvent) => {
    target.current = { x: e.clientX + 24, y: e.clientY - 80 };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: cubicBezier(0.23, 1, 0.32, 1)
      }
    }
  };

  return (
    <section id="work" style={{
      padding: 'clamp(5rem, 15vw, 12rem) clamp(1.5rem, 5vw, 4rem)',
      width: '100%',
      maxWidth: '1440px',
      margin: '0 auto',
      background: '#000000',
    }}>

      {mounted && !isMobile && (
        <div ref={previewRef} style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 999,
          pointerEvents: 'none',
          opacity: visible ? 1 : 0,
          scale: visible ? 1 : 0.9,
          transition: 'opacity 0.4s ease, scale 0.4s ease',
          willChange: 'transform',
        }}>
          {activePreview && (
            <img src={activePreview} alt="preview" style={{
              width: '500px',
              height: 'auto',
              borderRadius: '2px',
              display: 'block',
              filter: 'grayscale(100%) contrast(1.1) brightness(0.9)',
              border: '1px solid var(--border)',
            }} />
          )}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '8rem' }}>
        <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-body)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2rem' }}>// Work</span>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        {studies.map((study) => (
          <motion.div
            key={study.id}
            variants={itemVariants}
            onClick={() => router.push(`/case-studies/${study.id}`)}
            onMouseMove={onMouseMove}
            onMouseEnter={() => { if (!isMobile) { setActivePreview(study.preview); setVisible(true); } }}
            onMouseLeave={() => setVisible(false)}
            style={{
              padding: 'clamp(3rem, 6vw, 6rem) 0',
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr auto' : '4rem 2fr 1fr auto',
              gap: '2rem',
              alignItems: 'center',
              cursor: 'pointer',
              borderTop: '1px solid var(--border)',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            {!isMobile && (
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                color: 'var(--accent)',
              }}>
                /{study.number}
              </span>
            )}

            <h2 style={{
              fontSize: 'clamp(3rem, 7vw, 8.5rem)',
              color: '#fff',
              lineHeight: 0.9,
              margin: 0,
              fontFamily: 'var(--font-heading)',
              fontWeight: 300,
              transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
            }}>
              {study.title}
            </h2>

            {!isMobile && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}>
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.4rem',
                  color: 'var(--text-secondary)',
                  fontStyle: 'italic',
                }}>
                  {study.type}
                </span>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                }}>
                  {study.year}
                </span>
              </div>
            )}

            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '2rem',
              color: 'var(--accent)',
            }}>
              →
            </span>
          </motion.div>
        ))}
        <div style={{ borderTop: '1px solid var(--border)' }} />
      </motion.div>
    </section>
  );
}