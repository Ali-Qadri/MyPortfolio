'use client';
import { useEffect, useState } from 'react';

export default function AboutMe() {
  const [isMobile, setIsMobile] = useState(false);
  const [typed, setTyped] = useState(0);

  const lines = [
    { key: 'name', label: 'name', value: 'Ali Qadri' },
    { key: 'role', label: 'role', value: 'Web Designer & Developer' },
    { key: 'experience', label: 'experience', value: '2+ years' },
    { key: 'location', label: 'location', value: 'Karachi, Pakistan' },
    { key: 'email', label: 'email', value: 'designwithsyed@gmail.com' },
    { key: 'github', label: 'github', value: 'github.com/Ali-Qadri' },
    { key: 'skills', label: 'skills', value: '[ Figma, Framer, WordPress, Custom Code, AI Apps ]' },
    { key: 'projects', label: 'projects', value: '10+ completed' },
    { key: 'clients', label: 'clients', value: '3+ happy clients' },
    { key: 'status', label: 'status', value: 'Available for work ✦' },
  ];

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Stagger reveal lines one by one
  useEffect(() => {
    if (typed >= lines.length) return;
    const timeout = setTimeout(() => setTyped(t => t + 1), 120);
    return () => clearTimeout(timeout);
  }, [typed]);

  return (
    <section id="about" style={{
      padding: 'clamp(5rem, 10vw, 10rem) clamp(1.5rem, 5vw, 3rem)',
      borderTop: '1px solid #1a1a1a',
    }}>

      {/* Section label */}
      <p style={{
        fontFamily: 'monospace',
        fontSize: '0.7rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: '#444',
        marginBottom: 'clamp(3rem, 8vw, 5rem)',
      }}>
        About
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? '3rem' : '8rem',
        alignItems: 'start',
      }}>

        {/* Left — big statement */}
        <div>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            textTransform: 'uppercase',
            color: '#fff',
            marginBottom: '2rem',
          }}>
            Designer.<br />
            Developer.<br />
            Problem<br />
            Solver.
          </h2>

          <p style={{
            fontSize: '0.95rem',
            lineHeight: 1.9,
            color: '#555',
            maxWidth: '380px',
            marginBottom: '2.5rem',
          }}>
            I turn problems into pixels. 2+ years building websites,
            web apps, and digital experiences that actually work —
            for creators, businesses, and communities.
          </p>

          
           <a href="mailto:designwithsyed@gmail.com"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'monospace',
              fontSize: '0.7rem',
              color: '#444',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderBottom: '1px solid #222',
              paddingBottom: '4px',
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = '#fff';
              (e.currentTarget as HTMLElement).style.borderColor = '#fff';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = '#444';
              (e.currentTarget as HTMLElement).style.borderColor = '#222';
            }}
          >
            Get in touch →
          </a>
        </div>

        {/* Right — terminal */}
        <div style={{
          background: '#0d0d0d',
          border: '1px solid #1f1f1f',
          borderRadius: '6px',
          overflow: 'hidden',
        }}>

          {/* Terminal top bar */}
          <div style={{
            padding: '0.75rem 1rem',
            borderBottom: '1px solid #1a1a1a',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
            <span style={{
              fontFamily: 'monospace',
              fontSize: '0.65rem',
              color: '#333',
              marginLeft: '0.5rem',
              letterSpacing: '0.1em',
            }}>
              ali@portfolio ~ %
            </span>
          </div>

          {/* Terminal body */}
          <div style={{ padding: '1.5rem' }}>

            {/* Command line */}
            <p style={{
              fontFamily: 'monospace',
              fontSize: '0.8rem',
              color: '#555',
              marginBottom: '1.25rem',
              letterSpacing: '0.05em',
            }}>
              <span style={{ color: '#28c840' }}>→</span> cat about.json
            </p>

            {/* Opening brace */}
            <p style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#555', marginBottom: '0.5rem' }}>
              {'{'}
            </p>

            {/* Lines */}
            {lines.map((line, i) => (
              <div
                key={line.key}
                style={{
                  opacity: i < typed ? 1 : 0,
                  transform: i < typed ? 'translateY(0)' : 'translateY(4px)',
                  transition: 'opacity 0.3s ease, transform 0.3s ease',
                  display: 'flex',
                  gap: '0.5rem',
                  marginBottom: '0.5rem',
                  paddingLeft: '1rem',
                  flexWrap: 'wrap',
                }}
              >
                <span style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: '#4a9eff' }}>
                  "{line.label}":
                </span>
                <span style={{
                  fontFamily: 'monospace',
                  fontSize: '0.78rem',
                  color: line.key === 'status' ? '#28c840' :
                    line.key === 'email' || line.key === 'github' ? '#ff9f43' : '#e2b96a',
                }}>
                  {line.key === 'skills' ? line.value : `"${line.value}"`}
                  {i < lines.length - 1 ? ',' : ''}
                </span>
              </div>
            ))}

            {/* Closing brace + cursor */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '0.5rem' }}>
              <p style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#555' }}>
                {'}'}
              </p>
              {typed >= lines.length && (
                <span style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '14px',
                  background: '#fff',
                  animation: 'blink 1s step-end infinite',
                  marginLeft: '4px',
                }} />
              )}
            </div>

            {/* GitHub link */}
            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #1a1a1a' }}>
              <p style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#555', marginBottom: '0.5rem' }}>
                <span style={{ color: '#28c840' }}>→</span> open github
              </p>
              
               <a href="https://github.com/Ali-Qadri"
                target="_blank"
                rel="noreferrer"
                style={{
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  color: '#4a9eff',
                  textDecoration: 'none',
                  letterSpacing: '0.05em',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = '#4a9eff')}
              >
                github.com/Ali-Qadri ↗
              </a>
            </div>

          </div>
        </div>
      </div>

      { /* Blink animation */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

    </section>
  );
}