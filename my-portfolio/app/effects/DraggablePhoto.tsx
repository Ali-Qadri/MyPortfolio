'use client';
import { useEffect, useRef, useState } from 'react';

export default function DraggablePhoto() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 120 });
  const [size, setSize] = useState({ w: 260, h: 300 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shadow, setShadow] = useState({ x: 0, y: 8 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [rotation, setRotation] = useState(-4);
  const dragStart = useRef({ mx: 0, my: 0, px: 0, py: 0 });
  const resizeStart = useRef({ mx: 0, my: 0, w: 0, h: 0 });
  const lastPos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  // Set initial position after mount to avoid hydration mismatch
  useEffect(() => {
    setPos({ x: window.innerWidth - 380, y: 120 });
  }, []);

  // Floating idle animation
  useEffect(() => {
    let raf: number;
    const animate = (t: number) => {
      if (!isDragging && !isResizing && cardRef.current) {
        cardRef.current.style.marginTop = `${Math.sin(t / 1200) * 6}px`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isDragging, isResizing]);

  // Screen wrap
  useEffect(() => {
    const CARD_W = size.w + 20;
    const CARD_H = size.h + 80;

    let newX = pos.x;
    let newY = pos.y;

    if (pos.x > window.innerWidth) newX = -CARD_W;
    if (pos.x + CARD_W < 0) newX = window.innerWidth;
    if (pos.y > window.innerHeight) newY = -CARD_H;
    if (pos.y + CARD_H < 0) newY = window.innerHeight;

    if (newX !== pos.x || newY !== pos.y) {
      setPos({ x: newX, y: newY });
    }
  }, [pos, size]);

  // Drag
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
      velocity.current = {
        x: e.clientX - lastPos.current.x,
        y: e.clientY - lastPos.current.y,
      };
      lastPos.current = { x: e.clientX, y: e.clientY };
      setTilt({
        x: Math.max(-20, Math.min(20, velocity.current.y * 2)),
        y: Math.max(-20, Math.min(20, velocity.current.x * 2)),
      });
      setShadow({ x: -velocity.current.x * 0.5, y: 8 + Math.abs(velocity.current.y) });
      setRotation(-4 + velocity.current.x * 0.3);
      setPos({ x: dragStart.current.px + dx, y: dragStart.current.py + dy });
    };
    const onUp = () => {
      setIsDragging(false);
      setTilt({ x: 0, y: 0 });
      setShadow({ x: 0, y: 8 });
      setRotation(-4);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [isDragging]);

  // Resize
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
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [isResizing]);

  return (
    <div
      ref={cardRef}
      onMouseDown={onMouseDown}
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        zIndex: 50,
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        transform: `rotate(${rotation}deg) perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: isDragging
          ? 'transform 0.05s ease'
          : 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        filter: `drop-shadow(${shadow.x}px ${shadow.y}px ${isDragging ? 28 : 16}px rgba(0,0,0,0.55))`,
      }}
    >
      <div style={{
        background: '#f5f0eb',
        padding: '10px 10px 40px 10px',
        borderRadius: '2px',
        width: `${size.w}px`,
        position: 'relative',
      }}>
        <img
          src="/me.jpeg"
          alt="Syed Ali"
          draggable={false}
          style={{
            width: '100%',
            height: `${size.h}px`,
            objectFit: 'cover',
            objectPosition: 'center 15%',
            filter: 'grayscale(100%) contrast(1.2) brightness(0.9)',
            display: 'block',
          }}
        />
        <p style={{
          textAlign: 'center',
          fontFamily: 'monospace',
          fontSize: '11px',
          color: '#888',
          marginTop: '12px',
          letterSpacing: '0.1em',
          userSelect: 'none',
        }}>
          syed ali ✦
        </p>

        {/* Resize handle */}
        <div
          onMouseDown={onResizeDown}
          style={{
            position: 'absolute',
            bottom: '6px',
            right: '6px',
            width: '16px',
            height: '16px',
            cursor: 'se-resize',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <circle cx="8" cy="8" r="1.2" fill="#aaa" />
            <circle cx="4.5" cy="8" r="1.2" fill="#aaa" />
            <circle cx="8" cy="4.5" r="1.2" fill="#aaa" />
          </svg>
        </div>
      </div>
    </div>
  );
}