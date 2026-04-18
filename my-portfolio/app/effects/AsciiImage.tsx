'use client';
import { useEffect, useRef } from 'react';

const ASCII_CHARS = '@#S%?*+;:,. ';
const FONT_SIZE = 10;
const REVEAL_RADIUS = 120;

export default function AsciiImage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -999, y: -999 });
  const imageData = useRef<ImageData | null>(null);
  const imgSize = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      loadImage();
    };

    const loadImage = () => {
      const img = new Image();
      img.src = '/me.jpeg';
      img.onload = () => {
        // Offscreen canvas to sample pixels
        const off = document.createElement('canvas');
        off.width = canvas.width;
        off.height = canvas.height;
        const offCtx = off.getContext('2d')!;

        // Cover fit
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const sw = img.width * scale;
        const sh = img.height * scale;
        const sx = (canvas.width - sw) / 2;
        const sy = (canvas.height - sh) / 2;

        offCtx.drawImage(img, sx, sy, sw, sh);
        imageData.current = offCtx.getImageData(0, 0, canvas.width, canvas.height);
        imgSize.current = { w: canvas.width, h: canvas.height };
      };
    };

    const getBrightness = (x: number, y: number): number => {
      if (!imageData.current) return 0;
      const { w } = imgSize.current;
      const i = (Math.floor(y) * w + Math.floor(x)) * 4;
      const d = imageData.current.data;
      return (d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114) / 255;
    };

    const getColor = (x: number, y: number): string => {
      if (!imageData.current) return '#fff';
      const { w } = imgSize.current;
      const i = (Math.floor(y) * w + Math.floor(x)) * 4;
      const d = imageData.current.data;
      return `rgb(${d[i]},${d[i + 1]},${d[i + 2]})`;
    };

    const draw = () => {
      if (!imageData.current) { requestAnimationFrame(draw); return; }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${FONT_SIZE}px monospace`;
      ctx.textBaseline = 'top';

      const cols = Math.floor(canvas.width / (FONT_SIZE * 0.6));
      const rows = Math.floor(canvas.height / FONT_SIZE);
      const cw = canvas.width / cols;
      const ch = canvas.height / rows;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const px = col * cw + cw / 2;
          const py = row * ch + ch / 2;

          const dx = px - mouse.current.x;
          const dy = py - mouse.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const brightness = getBrightness(px, py);
          const charIndex = Math.floor((1 - brightness) * (ASCII_CHARS.length - 1));
          const char = ASCII_CHARS[charIndex];

          if (dist < REVEAL_RADIUS) {
            // Inside reveal zone — show real image color
            const fade = dist / REVEAL_RADIUS;
            ctx.globalAlpha = 1;
            ctx.fillStyle = getColor(px, py);
            ctx.fillText(char, col * cw, row * ch);

            // Soft edge blend back to white ascii
            if (fade > 0.75) {
              ctx.globalAlpha = (fade - 0.75) / 0.25;
              ctx.fillStyle = '#ffffff22';
              ctx.fillText(char, col * cw, row * ch);
            }
          } else {
            // Outside — white dim ASCII
            ctx.globalAlpha = 0.18 + brightness * 0.25;
            ctx.fillStyle = '#ffffff';
            ctx.fillText(char, col * cw, row * ch);
          }
        }
      }

      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onLeave = () => {
      mouse.current = { x: -999, y: -999 };
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);
    requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        width: '100%',
        height: '100vh',
        cursor: 'none',
      }}
    />
  );
}