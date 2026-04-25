'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity, useAnimationFrame } from 'framer-motion';

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer style={{
      padding: 'clamp(5rem, 15vw, 12rem) clamp(1.5rem, 5vw, 4rem) 6rem',
      maxWidth: '1440px',
      margin: '0 auto',
      width: '100%',
      background: '#000000',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '8rem' }}>
        <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2rem' }}>// Contact</span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '4rem',
        alignItems: 'start',
      }}>
        {/* Social Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '1rem',
        }}>
          {[
            { label: 'Instagram', icon: '📸', href: '#' },
            { label: 'Behance', icon: '🎨', href: '#' },
            { label: 'Github', icon: '💻', href: 'https://github.com/Ali-Qadri' },
            { label: 'LinkedIn', icon: '👔', href: '#' },
          ].map(social => (
            <a 
              key={social.label}
              href={social.href}
              style={{
                background: '#080808',
                border: '1px solid var(--border)',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '240px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#111';
                e.currentTarget.style.borderColor = 'var(--accent)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#080808';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              <span style={{ fontSize: '1.5rem', opacity: 0.5 }}>{social.icon}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>/</span>
                <span style={{ 
                  fontFamily: 'var(--font-body)', 
                  fontSize: '1rem', 
                  color: 'var(--text-primary)',
                  fontWeight: 500
                }}>{social.label}</span>
              </div>
            </a>
          ))}
        </div>

        {/* Contact Info */}
        <div style={{ padding: '1rem' }}>
          <h2 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
            maxWidth: '600px', 
            marginBottom: '6rem',
            lineHeight: 1.1,
            color: '#fff',
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
          }}>
            Have a project in mind?<br /> 
            <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-heading)', color: 'var(--accent)', fontWeight: 400 }}>Let's build it together.</span>
          </h2>

          <div>
             <p style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '0.7rem', 
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              marginBottom: '2rem'
            }}>Send an inquiry</p>
            <a href="mailto:hello@aliqadri.com" style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: '#fff',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              fontFamily: 'var(--font-heading)',
              fontStyle: 'italic',
              transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateX(20px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'none'}
            >
              hello@aliqadri.com
              <span style={{ fontSize: '2rem', color: 'var(--accent)', transition: 'transform 0.3s' }}>→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Credit Footer */}
      <div style={{
        marginTop: '12rem',
        paddingTop: '3rem',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          © 2026 Ali Qadri / Portfolio
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          KHI // 24.8607° N, 67.0011° E
        </p>
      </div>
    </footer>
  );
}

function Marquee({ children, baseVelocity = 100 }: { children: React.ReactNode; baseVelocity: number }) {
  const baseX = useRef(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(velocityFactor, (v) => {
    return `${baseX.current}%`;
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((t, delta) => {
    let moveBy = baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      moveBy += velocityFactor.get() * moveBy;
    } else {
      moveBy += velocityFactor.get() * moveBy;
    }

    baseX.current += moveBy;

    if (baseX.current <= -100) {
      baseX.current = 0;
    } else if (baseX.current >= 0) {
      baseX.current = -100;
    }

    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(${baseX.current}%)`;
    }
  });

  return (
    <div style={{
      overflow: 'hidden',
      letterSpacing: '-2px',
      lineHeight: 0.8,
      margin: 0,
      whiteSpace: 'nowrap',
      display: 'flex',
      flexWrap: 'nowrap',
    }}>
      <motion.div 
        ref={containerRef}
        style={{ 
          display: 'flex',
          whiteSpace: 'nowrap',
          flexWrap: 'nowrap'
        }}
      >
        {children}
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
}