'use client';
import { useEffect, useRef, useState } from 'react';

export default function DraggablePhoto() {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 120 });
  const [size, setSize] = useState({ w: 280, h: 340 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shadow, setShadow] = useState({ x: 0, y: 8 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [rotation, setRotation] = useState(-4);
  const dragStart = useRef({ mx: 0, my: 0, px: 0, py: 0 });
  const resizeStart = useRef({ mx: 0, my: 0, w: 0, h: 0 });
  const lastPos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (containerRef.current) {
      const w = containerRef.current.offsetWidth;
      setPos({ x: w - 380, y: 120 });
    }
  }, []);

  useEffect(() => {
    let raf: number;
    const animate = (t: number) => {
      if (!isDragging && !isResizing && cardRef.current) {
        cardRef.current.style.marginTop = Math.sin(t / 1200) * 6 + 'px';
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isDragging, isResizing]);

  useEffect(() => {
    if (!containerRef.current) return;
    const cw = containerRef.current.offsetWidth;
    const ch = containerRef.current.offsetHeight;
    const CARD_W = size.w + 20;
    const CARD_H = size.h + 80;
    let newX = pos.x;
    let newY = pos.y;
    if (pos.x > cw) newX = -CARD_W;
    if (pos.x + CARD_W < 0) newX = cw;
    if (pos.y > ch) newY = -CARD_H;
    if (pos.y + CARD_H < 0) newY = ch;
    if (newX !== pos.x || newY !== pos.y) setPos({ x: newX, y: newY });
  }, [pos, size]);

  const onMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    dragStart.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y };
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - dragStart.current.mx;
      const dy = e.clientY - dragStart.current.my;
      const vx = e.clientX - lastPos.current.x;
      const vy = e.clientY - lastPos.current.y;
      velocity.current = { x: vx, y: vy };
      lastPos.current = { x: e.clientX, y: e.clientY };
      const newX = dragStart.current.px + dx;
      const newY = dragStart.current.py + dy;
      if (cardRef.current) {
        const tX = Math.max(-20, Math.min(20, vy * 2));
        const tY = Math.max(-20, Math.min(20, vx * 2));
        const rot = -4 + vx * 0.3;
        const sX = -vx * 0.5;
        const sY = 8 + Math.abs(vy);
        cardRef.current.style.transform = `translate3d(${newX}px, ${newY}px, 0) rotate(${rot}deg) perspective(600px) rotateX(${tX}deg) rotateY(${tY}deg)`;
        cardRef.current.style.filter = `drop-shadow(${sX}px ${sY}px 28px rgba(0,0,0,0.55))`;
      }
    };
    const onUp = () => {
      setIsDragging(false);
      const dx = lastPos.current.x - dragStart.current.mx;
      const dy = lastPos.current.y - dragStart.current.my;
      setPos({ x: dragStart.current.px + dx, y: dragStart.current.py + dy });
      setTilt({ x: 0, y: 0 });
      setShadow({ x: 0, y: 8 });
      setRotation(-4);
      if (cardRef.current) {
        cardRef.current.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
        cardRef.current.style.transform = `translate3d(${dragStart.current.px + dx}px, ${dragStart.current.py + dy}px, 0) rotate(-4deg) perspective(600px) rotateX(0deg) rotateY(0deg)`;
        cardRef.current.style.filter = 'drop-shadow(0px 8px 16px rgba(0,0,0,0.55))';
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseup', onUp);
    if (cardRef.current) cardRef.current.style.transition = 'none';
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [isDragging]);

  const onResizeDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    resizeStart.current = { mx: e.clientX, my: e.clientY, w: size.w, h: size.h };
  };

  useEffect(() => {
    if (!isResizing) return;
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - resizeStart.current.mx;
      const dy = e.clientY - resizeStart.current.my;
      setSize({
        w: Math.max(160, Math.min(500, resizeStart.current.w + dx)),
        h: Math.max(180, Math.min(600, resizeStart.current.h + dy)),
      });
    };
    const onUp = () => setIsResizing(false);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [isResizing, size]);

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.5); }
        }
        @keyframes ping {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @media (max-width: 768px) {
          .hide-on-mobile { display: none !important; }
        }
      `}</style>
      <div ref={containerRef} className="hide-on-mobile" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10, overflow: 'hidden' }}>
        {mounted && (
          <div ref={cardRef} onMouseDown={onMouseDown} style={{ position: 'absolute', pointerEvents: 'all', cursor: isDragging ? 'grabbing' : 'grab', userSelect: 'none', transform: `translate3d(${pos.x}px, ${pos.y}px, 0) rotate(${rotation}deg) perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)', filter: `drop-shadow(${shadow.x}px ${shadow.y}px ${isDragging ? 28 : 16}px rgba(0,0,0,0.55))`, willChange: 'transform' }}>
            <div style={{ background: '#252525', border: '1px solid #2e2e2e', padding: '12px 12px 0 12px', borderRadius: '4px', width: size.w + 'px', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#444' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#333' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#222' }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#888', marginLeft: '6px', letterSpacing: '0.08em' }}>ali@portfolio</span>
              </div>
              <img src="/me.jpeg" alt="Syed Ali" draggable={false} style={{ width: '100%', height: size.h + 'px', objectFit: 'cover', objectPosition: 'center 15%', filter: 'grayscale(100%) contrast(1.2) brightness(0.9)', display: 'block', borderRadius: '2px' }} />
              <div style={{ padding: '12px 2px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 400, color: '#ccc', letterSpacing: '0.08em', margin: 0, userSelect: 'none' }}>Ali Qadri</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#666', letterSpacing: '0.06em', margin: '4px 0 0', userSelect: 'none' }}>Web Designer</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#1a1a1a', border: '1px solid #333', borderRadius: '999px', padding: '4px 10px' }}>
                  <div style={{ position: 'relative', width: '8px', height: '8px' }}>
                    <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#fff', animation: 'ping 1.5s ease-out infinite' }} />
                    <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#fff', animation: 'pulse 1.5s ease-in-out infinite' }} />
                  </div>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 400, color: '#fff', letterSpacing: '0.06em', userSelect: 'none', whiteSpace: 'nowrap' }}>Available</span>
                </div>
              </div>
              <div onMouseDown={onResizeDown} style={{ position: 'absolute', bottom: '6px', right: '6px', width: '18px', height: '18px', cursor: 'se-resize', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <circle cx="8" cy="8" r="1.5" fill="#555" />
                  <circle cx="4.5" cy="8" r="1.5" fill="#555" />
                  <circle cx="8" cy="4.5" r="1.5" fill="#555" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}