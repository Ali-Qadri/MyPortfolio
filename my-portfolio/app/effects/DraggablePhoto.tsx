'use client';
import { useEffect, useRef, useState } from 'react';

export default function DraggablePhoto() {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (containerRef.current) {
      const w = containerRef.current.offsetWidth;
      setPos({ x: w - 380, y: 120 });
    }
  }, []);

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
      `}</style>

      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 10,
          overflow: 'hidden',
        }}
      >
        <div
          ref={cardRef}
          onMouseDown={onMouseDown}
          style={{
            position: 'absolute',
            left: pos.x,
            top: pos.y,
            pointerEvents: 'all',
            cursor: isDragging ? 'grabbing' : 'grab',
            userSelect: 'none',
            transform: `rotate(${rotation}deg) perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: isDragging
              ? 'transform 0.05s ease'
              : 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
            filter: `drop-shadow(${shadow.x}px ${shadow.y}px ${isDragging ? 28 : 16}px rgba(0,0,0,0.55))`,
          }}
        >
          {/* Polaroid card */}
          <div style={{
            background: '#0d0d0d',
            border: '1px solid #1f1f1f',
            padding: '10px 10px 0 10px',
            borderRadius: '2px',
            width: `${size.w}px`,
            position: 'relative',
          }}>

            {/* Top bar — terminal style */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              marginBottom: '8px',
            }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#ff5f57' }} />
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#febc2e' }} />
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#28c840' }} />
              <span style={{
                fontFamily: 'monospace',
                fontSize: '9px',
                color: '#333',
                marginLeft: '4px',
                letterSpacing: '0.08em',
              }}>
                ali@portfolio
              </span>
            </div>

            {/* Image */}
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

            {/* Bottom info bar */}
            <div style={{
              padding: '10px 2px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              {/* Name + role */}
              <div>
                <p style={{
                  fontFamily: 'monospace',
                  fontSize: '10px',
                  color: '#888',
                  letterSpacing: '0.08em',
                  margin: 0,
                  userSelect: 'none',
                }}>
                  Ali Qadri
                </p>
                <p style={{
                  fontFamily: 'monospace',
                  fontSize: '9px',
                  color: '#444',
                  letterSpacing: '0.06em',
                  margin: '2px 0 0',
                  userSelect: 'none',
                }}>
                  Web Designer
                </p>
              </div>

              {/* Available for work badge */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                background: '#0a1a0a',
                border: '1px solid #1a3a1a',
                borderRadius: '999px',
                padding: '3px 8px',
              }}>
                {/* Blinking dot */}
                <div style={{ position: 'relative', width: '6px', height: '6px' }}>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    background: '#28c840',
                    animation: 'ping 1.5s ease-out infinite',
                  }} />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    background: '#28c840',
                    animation: 'pulse 1.5s ease-in-out infinite',
                  }} />
                </div>
                <span style={{
                  fontFamily: 'monospace',
                  fontSize: '8px',
                  color: '#28c840',
                  letterSpacing: '0.06em',
                  userSelect: 'none',
                  whiteSpace: 'nowrap',
                }}>
                  Available
                </span>
              </div>
            </div>

            {/* Resize handle */}
            <div
              onMouseDown={onResizeDown}
              style={{
                position: 'absolute',
                bottom: '6px',
                right: '6px',
                width: '14px',
                height: '14px',
                cursor: 'se-resize',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                <circle cx="8" cy="8" r="1.2" fill="#333" />
                <circle cx="4.5" cy="8" r="1.2" fill="#333" />
                <circle cx="8" cy="4.5" r="1.2" fill="#333" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}