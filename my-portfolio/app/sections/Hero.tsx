'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const bioText = "I'm a versatile designer who partners with founders to turn ideas into real products. I focus on clear interfaces, sharp decisions, and fast execution.";
  const words = bioText.split(" ");

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
        <h1 style={{
          position: 'absolute',
          top: '50%',
          left: '5%',
          transform: 'translateY(-50%)',
          fontSize: 'clamp(5rem, 18vw, 22rem)',
          lineHeight: 0.8,
          zIndex: 1,
          color: 'var(--text-primary)',
          letterSpacing: '-0.02em',
          pointerEvents: 'none',
        }}>
          Ali Qadri
        </h1>

        <div style={{
          position: 'absolute',
          bottom: '4rem',
          right: '5%',
          textAlign: 'right',
          zIndex: 2,
        }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem',
            color: 'var(--text-primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '0.5rem'
          }}>
            // Web Designer
          </p>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem',
            color: 'var(--text-primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}>
            Creative Director
          </p>
        </div>
      </div>

      {/* Sticky Scroll Section */}
      <div ref={containerRef} style={{ height: '150vh', position: 'relative' }}>
        <div style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          padding: '0 clamp(1.5rem, 5vw, 4rem)',
        }}>
           <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)',
            gap: '4rem',
            alignItems: 'end',
            width: '100%',
          }}>
            <div>
              <p style={{ 
                color: 'var(--accent)', 
                fontFamily: 'var(--font-mono)', 
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
                fontWeight: 500,
                display: 'flex',
                flexWrap: 'wrap',
              }}>
                {words.map((word, i) => {
                  const start = i / words.length;
                  const end = start + 1 / words.length;
                  return (
                    <Word key={i} progress={scrollYProgress} range={[start, end]}>
                      {word}
                    </Word>
                  );
                })}
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
                Bringing your vision to life quickly and efficiently—whether it's branding, apps, or websites—I've got it covered, delivering smooth and effective solutions from start to finish.
              </p>
              <button 
                onClick={() => router.push('#work')}
                style={{
                  padding: '1.2rem 3rem',
                  border: '1px solid var(--border)',
                  borderRadius: '100px',
                  color: '#fff',
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  background: 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.color = '#000';
                  e.currentTarget.style.borderColor = '#fff';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
              >
                See my work
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}


function Word({ children, progress, range }: { children: string, progress: any, range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.1, 1]);
  return (
    <span style={{ position: 'relative', marginRight: '0.35em', display: 'inline-block' }}>
      <motion.span style={{ opacity }}>
        {children}
      </motion.span>
    </span>
  );
}