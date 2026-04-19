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
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? '0.6rem 2rem' : '1.5rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
        background: scrolled ? 'rgba(10, 10, 10, 0.6)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <div style={{
        fontSize: scrolled ? '0.85rem' : '1rem',
        fontWeight: 600,
        color: '#fff',
        letterSpacing: '0.02em',
        transition: 'font-size 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
      }}>
        Syed Ali
      </div>

      <div style={{ display: 'flex', gap: '2rem' }}>
        {[
          { label: 'Home', href: '/' },
          { label: 'Case Studies', href: '/#work' },
          { label: 'Contact', href: '/#contact' },
        ].map(link => (
          
            <a key={link.label}
            href={link.href}
            style={{
              color: '#9ca3af',
              textDecoration: 'none',
              fontSize: scrolled ? '0.75rem' : '0.85rem',
              fontFamily: 'monospace',
              letterSpacing: '0.05em',
              transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
          >
            <GlitchText>{link.label}</GlitchText>
          </a>
        ))}
      </div>
    </nav>
  );
}