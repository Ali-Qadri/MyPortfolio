'use client';
import { useEffect, useState } from 'react';
import GlitchText from '@/app/effects/GlitchText';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
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
      {!scrolled && (
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
        }}>
          Visual Designer & Art Director
        </div>
      )}

      {/* Right side: Nav Links */}
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
    </nav>
  );
}
