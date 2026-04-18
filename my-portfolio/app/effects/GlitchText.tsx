'use client';
import { useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&';
const rand = () => CHARS[Math.floor(Math.random() * CHARS.length)];

export default function GlitchText({ children }: { children: string }) {
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const letters = children.split('');

  // Only count non-space letters for ref indexing
  const letterIndices: number[] = [];
  letters.forEach((ch, i) => {
    if (ch !== ' ') letterIndices.push(i);
  });

  const scramble = () => {
    letterIndices.forEach((charIndex, refIndex) => {
      const ch = letters[charIndex];
      const span = spanRefs.current[refIndex];
      if (!span) return;

      let start: number | null = null;
      const delay = refIndex * 15;
      const resolveAt = 20 + refIndex * 20;

      const tick = (ts: number) => {
        if (!start) start = ts;
        const elapsed = ts - start - delay;
        if (elapsed < 0) { requestAnimationFrame(tick); return; }
        if (elapsed < resolveAt) {
          span.textContent = rand();
          requestAnimationFrame(tick);
        } else {
          span.textContent = ch;
        }
      };

      requestAnimationFrame(tick);
    });
  };

  let refIndex = 0;

  return (
    <span onMouseEnter={scramble} style={{ cursor: 'pointer' }}>
      {letters.map((ch, i) =>
        ch === ' '
          ? <span key={i}>&nbsp;</span>
          : (
            <span key={i} ref={el => { spanRefs.current[refIndex++] = el; }}>
              {ch}
            </span>
          )
      )}
    </span>
  );
}