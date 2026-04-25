'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Hero() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Magnetic Button Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
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
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: '#000000',
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '5%',
          transform: 'translateY(-50%)',
          overflow: 'hidden', // The Mask
          zIndex: 1,
        }}>
          <motion.h1
            initial={{ y: "100%" }}
            animate={mounted ? { y: 0 } : { y: "100%" }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 9rem)',
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
        </div>

        <div style={{
          position: 'absolute',
          bottom: '4rem',
          right: '5%',
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
      <div style={{ padding: 'clamp(5rem, 15vw, 12rem) clamp(1.5rem, 5vw, 4rem)', background: '#000' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)',
          gap: '4rem',
          alignItems: 'end',
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
        }}>
          <div>
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
              fontSize: 'clamp(2.5rem, 4.5vw, 5rem)',
              lineHeight: 1.1,
              color: '#fff',
              maxWidth: '950px',
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
            }}>
              {bioText}
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ paddingBottom: '2rem' }}
          >
            <p style={{
              fontSize: '1.2rem',
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
              maxWidth: '420px',
              marginBottom: '4rem',
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
    </section>
  );
}