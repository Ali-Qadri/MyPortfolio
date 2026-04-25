'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const steps = [
  { number: '01', title: 'Discovery', description: 'Deep dive into your brand, audience, and project goals.' },
  { number: '02', title: 'Research', description: 'Competitor analysis and visual inspiration gathering.' },
  { number: '03', title: 'Concept', description: 'Interactive wireframes and structural design paths.' },
  { number: '04', title: 'Design', description: 'High-fidelity visuals tailored to your unique identity.' },
  { number: '05', title: 'Iteration', description: 'Refining the details based on real collaboration.' },
  { number: '06', title: 'Build', description: 'Clean, performance-optimized code execution.' },
  { number: '07', title: 'Launch', description: 'Final testing and seamless deployment to the world.' },
  { number: '08', title: 'Growth', description: 'Ongoing support and performance monitoring.' },
];

export default function Process() {
  const [isMobile, setIsMobile] = useState(false);
  const ref = require('react').useRef(null);
  const isInView = (require('framer-motion').useInView)(ref, { amount: 0.2, margin: "-100px" });

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const theme = {
    bg: isInView ? '#f5f5f5' : '#1a1a1a',
    text: isInView ? '#1a1a1a' : '#fff',
    border: isInView ? '#e5e5e5' : '#2e2e2e',
    muted: isInView ? '#888' : '#555',
    cardBg: isInView ? '#fff' : '#1a1a1a',
    number: isInView ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.03)',
    numberHover: isInView ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)',
  };

  return (
    <motion.section 
      ref={ref}
      id="process" 
      animate={{ backgroundColor: theme.bg }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      style={{
        padding: 'clamp(5rem, 10vw, 10rem) clamp(1.5rem, 5vw, 3rem)',
        borderTop: `1px solid ${theme.border}`,
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{ width: '100%' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 'clamp(3rem, 8vw, 5rem)',
        }}>
          <motion.h2 
            animate={{ color: theme.text }}
            style={{
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              fontFamily: 'Bebas Neue, sans-serif',
              textTransform: 'uppercase',
              lineHeight: 0.8,
              margin: 0,
            }}
          >
            The Process
          </motion.h2>
          <motion.p 
            animate={{ color: theme.muted }}
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            [ Ph-01 — Ph-08 ]
          </motion.p>
        </div>

        <motion.div 
          animate={{ background: theme.border }}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
            width: '100%',
            gap: '1px',
          }}
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              whileHover="hover"
              initial="initial"
              animate={{ backgroundColor: theme.cardBg, borderColor: theme.border }}
              style={{
                padding: '2.5rem',
                height: '320px',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                border: `0.5px solid ${theme.border}`,
              }}
            >
              {/* Massive background number */}
              <motion.span
                variants={{
                  initial: { y: '20%', opacity: 1, scale: 1 },
                  hover: { y: '0%', opacity: 1, scale: 1.1 }
                }}
                animate={{ color: isInView ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.03)' }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                style={{
                  position: 'absolute',
                  bottom: '-10%',
                  right: '-5%',
                  fontSize: '15rem',
                  fontFamily: 'Bebas Neue, sans-serif',
                  userSelect: 'none',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              >
                {step.number}
              </motion.span>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <motion.span 
                  animate={{ color: theme.muted }}
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.7rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                  }}
                >
                  Step {step.number}
                </motion.span>
                <motion.h3 
                  animate={{ color: theme.text }}
                  style={{
                    fontSize: '2rem',
                    fontFamily: 'Bebas Neue, sans-serif',
                    textTransform: 'uppercase',
                    marginTop: '0.5rem',
                    letterSpacing: '0.04em',
                  }}
                >
                  {step.title}
                </motion.h3>
              </div>

              <motion.p
                variants={{
                  initial: { y: 20, opacity: 0 },
                  hover: { y: 0, opacity: 1 }
                }}
                animate={{ color: isInView ? '#444' : '#888' }}
                transition={{ duration: 0.3 }}
                style={{
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                  maxWidth: '240px',
                  margin: 0,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {step.description}
              </motion.p>

              {/* Hover line effect */}
              <motion.div
                variants={{
                  initial: { width: 0 },
                  hover: { width: '100%' }
                }}
                animate={{ background: isInView ? '#000' : '#fff' }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  height: '2px',
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}