'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';
import ContactPopup from '@/app/components/ContactPopup';

export default function Hero() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Magnetic Button Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const mouseX2 = useMotionValue(0);
  const mouseY2 = useMotionValue(0);
  const x2 = useSpring(mouseX2, springConfig);
  const y2 = useSpring(mouseY2, springConfig);

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 300]);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    mouseX.set((clientX - centerX) * 0.4);
    mouseY.set((clientY - centerY) * 0.6);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleMouseMove2 = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    mouseX2.set((clientX - centerX) * 0.4);
    mouseY2.set((clientY - centerY) * 0.6);
  };

  const handleMouseLeave2 = () => {
    mouseX2.set(0);
    mouseY2.set(0);
  };

  const bioText = "I do nothing fancy. Just clean design and smooth experience.";

  return (
    <section
      style={{
        width: '100%',
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}
    >
      {/* Visual Header */}
      <div style={{
        width: '100%',
        height: '75vh',
        position: 'relative',
        overflow: 'hidden',
        background: '#000000',
      }}>
        <motion.div style={{
          position: 'absolute',
          top: isMobile ? '8%' : '10%',
          left: 'clamp(1.5rem, 5vw, 4rem)',
          transform: 'translateY(0)', 
          overflow: 'hidden', // The Mask
          zIndex: 1,
          y: yParallax
        }}>
          <motion.h1
            initial={{ y: "100%" }}
            animate={mounted ? { y: 0 } : { y: "100%" }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
            style={{
              fontSize: 'clamp(3.5rem, 10vw, 9rem)',
              lineHeight: 1,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              pointerEvents: 'none',
              margin: 0,
              paddingBottom: '0.15em'
            }}
          >
            A designer who ships.
          </motion.h1>
          <div style={{ overflow: 'hidden', marginTop: '1.5rem', paddingLeft: '1rem', paddingBottom: '2rem', paddingTop: '1rem' }}>
            <motion.button
              onClick={() => setIsPopupOpen(true)}
              onMouseMove={handleMouseMove2}
              onMouseLeave={handleMouseLeave2}
              initial={{ y: "100%" }}
              animate={mounted ? { y: 0 } : { y: "100%" }}
              transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay: 0.4 }}
              style={{
                x: x2, y: y2,
                padding: '1.2rem 3rem',
                border: '1px solid var(--border)',
                borderRadius: '100px',
                color: '#fff',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                background: 'transparent',
                cursor: 'pointer',
                transition: 'background 0.4s, color 0.4s, border-color 0.4s',
                display: 'inline-block'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.color = '#000';
                e.currentTarget.style.borderColor = '#fff';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              Let's Talk
            </motion.button>
          </div>
        </motion.div>

        <div style={{
          position: 'absolute',
          bottom: '4rem',
          right: 'clamp(1.5rem, 5vw, 4rem)',
          textAlign: 'right',
          zIndex: 2,
        }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            color: 'var(--text-primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '0.5rem'
          }}>
            // Web Designer
          </p>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            color: 'var(--text-primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}>
            Developer
          </p>
        </div>
      </div>

      {/* Intro Section (Previously Sticky) */}
      <div style={{ padding: 'clamp(3rem, 10vw, 12rem) clamp(1.5rem, 5vw, 4rem)', background: '#000' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1.2fr) minmax(0, 0.8fr)',
          gap: isMobile ? '2rem' : '4rem',
          alignItems: 'end',
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <p style={{
              color: 'var(--accent)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              marginBottom: '3rem',
              letterSpacing: '0.2rem'
            }}>
              // Intro
            </p>
            <h2 style={{
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              lineHeight: 1.1,
              color: '#fff',
              maxWidth: '950px',
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
            }}>
              {bioText}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
            style={{ paddingBottom: '2rem' }}
          >
            <p style={{
              fontSize: '1.2rem',
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
              maxWidth: '420px',
              marginBottom: isMobile ? '2rem' : '4rem',
            }}>
              I am a web designer and developer focused on creating clean and responsive websites.
            </p>
            <motion.button
              onClick={() => router.push('#work')}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                x, y,
                padding: '1.2rem 3rem',
                border: '1px solid var(--border)',
                borderRadius: '100px',
                color: '#fff',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                background: 'transparent',
                cursor: 'pointer',
                transition: 'background 0.4s, color 0.4s, border-color 0.4s',
                display: 'inline-block'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.color = '#000';
                e.currentTarget.style.borderColor = '#fff';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              See my work
            </motion.button>
          </motion.div>
        </div>
      </div>

      <ContactPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </section>
  );
}