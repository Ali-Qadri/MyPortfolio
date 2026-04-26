'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity, useAnimationFrame } from 'framer-motion';

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      style={{
        padding: '8rem 0 4rem 0',
        width: '100%',
        background: '#000000',
        overflow: 'hidden'
      }}
    >
      {/* Marquee Header */}
      <div style={{ marginBottom: '8rem' }}>
        <Marquee baseVelocity={-2}>
          <h2 style={{
            fontSize: 'clamp(5rem, 15vw, 12rem)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 300,
            color: '#fff',
            textTransform: 'uppercase',
            marginRight: '3rem',
            lineHeight: 1
          }}>
            Let's work together <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>—</span> 
          </h2>
        </Marquee>
      </div>

      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 clamp(1.5rem, 5vw, 4rem)',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'flex-end',
          gap: '4rem',
          marginBottom: '8rem'
        }}>
          {/* Socials */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1rem' }}>Socials</p>
            {[
              { label: 'Instagram', href: '#' },
              { label: 'Behance', href: '#' },
              { label: 'Github', href: 'https://github.com/Ali-Qadri' },
              { label: 'LinkedIn', href: '#' },
            ].map((social, i) => (
              <motion.a 
                key={social.label}
                href={social.href}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                style={{
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.2rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-muted)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
              >
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>↗</span> {social.label}
              </motion.a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '2rem' }}>Send an inquiry</p>
            <motion.a 
              href="mailto:hello@aliqadri.com"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{
                fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                color: '#fff',
                textDecoration: 'none',
                fontFamily: 'var(--font-heading)',
                fontStyle: 'italic',
                fontWeight: 300,
                borderBottom: '1px solid var(--border)',
                paddingBottom: '0.5rem',
                display: 'inline-block',
                transition: 'border-color 0.3s ease, color 0.3s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--text-muted)';
                e.currentTarget.style.borderColor = 'var(--text-muted)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              hello@aliqadri.com
            </motion.a>
          </div>
        </div>

        {/* Credit Footer */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '1rem' : '0',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
        }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            © 2026 Ali Qadri / Portfolio
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            KHI // 24.8607° N, 67.0011° E
          </p>
        </div>
      </div>
    </motion.footer>
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