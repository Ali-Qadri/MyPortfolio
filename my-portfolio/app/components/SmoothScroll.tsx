'use client';
import { useEffect } from 'react';

export default function SmoothScroll() {
  useEffect(() => {
    let current = 0;
    let target = 0;
    let raf: number;
    const ease = 0.08; // lower = slower/dreamier, higher = snappier

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      target += e.deltaY;
      target = Math.max(0, Math.min(target, document.body.scrollHeight - window.innerHeight));
    };

    const animate = () => {
      current += (target - current) * ease;
      window.scrollTo(0, current);
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('wheel', onWheel);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}