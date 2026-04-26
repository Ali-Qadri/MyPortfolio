'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlitchText from '@/app/effects/GlitchText';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);

    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: scrolled ? '1.5rem clamp(1.5rem, 5vw, 4rem)' : '2.5rem clamp(1.5rem, 5vw, 4rem)',
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
      background: scrolled ? 'rgba(0,0,0,0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
    }}>
      {/* Left side: Logo */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
        <a href="/" style={{
          fontSize: '1.4rem',
          fontFamily: 'var(--font-heading)',
          color: '#fff',
          textDecoration: 'none',
          fontWeight: 400,
        }}>
          Ali Qadri <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', verticalAlign: 'middle', marginLeft: '0.5rem' }}>©</span>
        </a>
      </div>

      {/* Center: Detail (Desktop) */}
      {!scrolled && !isMobile && (
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
        }}>
          AVAILABLE FOR WORK
        </div>
      )}

      {/* Right side: Nav Links or Hamburger */}
      {isMobile ? (
        <button
          onClick={() => setMenuOpen(true)}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            cursor: 'pointer'
          }}
        >
          Menu
        </button>
      ) : (
        <div style={{ display: 'flex', gap: '3rem' }}>
          {[
            { label: 'Work', href: '#work' },
            { label: 'About', href: '#about' },
            { label: 'Experience', href: '#experience' },
          ].map(link => (
            <a key={link.label} href={link.href} style={{
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              transition: 'all 0.3s ease',
            }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && isMobile && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: '#0a0a0a',
              zIndex: 200,
              display: 'flex',
              flexDirection: 'column',
              padding: '2.5rem clamp(1.5rem, 5vw, 4rem)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <a href="/" onClick={() => setMenuOpen(false)} style={{
                fontSize: '1.4rem',
                fontFamily: 'var(--font-heading)',
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 400,
              }}>
                Ali Qadri <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', verticalAlign: 'middle', marginLeft: '0.5rem' }}>©</span>
              </a>
              <button
                onClick={() => setMenuOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>

            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '3rem',
              marginTop: '4rem'
            }}>
              {[
                { label: 'Work', href: '#work' },
                { label: 'About', href: '#about' },
                { label: 'Experience', href: '#experience' },
              ].map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: 'easeOut' }}
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '4rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 300,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{ paddingBottom: '2rem' }}
            >
              <a href="mailto:hello@aliqadri.com" style={{
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                textDecoration: 'none'
              }}>
                hello@aliqadri.com
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

