'use client';
import { useEffect, useState } from 'react';

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let start: number | null = null;
    const duration = 2200;

    const tick = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // Ease out — fast at start, slows near 100
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * 100));

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setCount(100);
        setTimeout(() => setLeaving(true), 300);
        setTimeout(() => setDone(true), 1100);
      }
    };

    requestAnimationFrame(tick);
  }, []);

  if (done) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0a0a0a',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: '2.5rem 3rem',
        transform: leaving ? 'translateY(-100%)' : 'translateY(0)',
        transition: leaving ? 'transform 0.9s cubic-bezier(0.76, 0, 0.24, 1)' : 'none',
      }}
    >
      {/* Counter */}
      <span
        style={{
          fontFamily: 'monospace',
          fontSize: 'clamp(5rem, 15vw, 12rem)',
          fontWeight: 700,
          color: '#fff',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          position: 'absolute',
          bottom: '2rem',
          left: '3rem',
          userSelect: 'none',
        }}
      >
        {count}
      </span>

      {/* Bottom right label */}
      <span
        style={{
          fontFamily: 'monospace',
          fontSize: '0.7rem',
          color: '#444',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          position: 'absolute',
          bottom: '2.8rem',
          right: '3rem',
        }}
      >
        Loading
      </span>

      {/* Progress line */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '2px',
          width: `${count}%`,
          background: '#fff',
          transition: 'width 0.05s linear',
        }}
      />
    </div>
  );
}