'use client';
import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const current = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };

      // Move dot instantly using transform to avoid layout reflow
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    // Detect hoverable elements with a more efficient check
    const onMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (
        el.tagName === 'A' ||
        el.tagName === 'BUTTON' ||
        el.closest('a') ||
        el.closest('button') ||
        el.style.cursor === 'pointer' ||
        el.closest('[data-cursor="pointer"]')
      ) {
        setIsHovering(true);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (
        el.tagName === 'A' ||
        el.tagName === 'BUTTON' ||
        el.closest('a') ||
        el.closest('button')
      ) {
        setIsHovering(false);
      }
    };

    let raf: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      current.current.x = lerp(current.current.x, target.current.x, 0.15);
      current.current.y = lerp(current.current.y, target.current.y, 0.15);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
    };
  }, [isMobile]);

  if (!mounted || isMobile) return null;

  return (
    <>
      <style>{`
        * { cursor: none !important; }
      `}</style>

      {/* Dot — follows cursor instantly */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isClicking ? '6px' : '8px',
          height: isClicking ? '6px' : '8px',
          background: '#fff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          transition: 'width 0.15s ease, height 0.15s ease',
          mixBlendMode: 'difference',
        }}
      />

      {/* Ring — follows with lag */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovering ? '60px' : isClicking ? '28px' : '36px',
          height: isHovering ? '60px' : isClicking ? '28px' : '36px',
          border: '1px solid rgba(255,255,255,0.6)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          transition: 'width 0.3s cubic-bezier(0.23, 1, 0.32, 1), height 0.3s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.3s ease',
          mixBlendMode: 'difference',
          borderColor: isHovering ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
        }}
      />
    </>
  );
}