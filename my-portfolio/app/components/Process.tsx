'use client';
import { useEffect, useRef, useState } from 'react';

const steps = [
  { number: '01', title: 'Discovery', description: 'Understanding the client\'s goals, audience and problems. First call, first questions, first instincts.' },
  { number: '02', title: 'Documentation', description: 'Writing everything down in Figma — brand assets, research notes, references and project scope.' },
  { number: '03', title: 'Research', description: 'Studying competitors, target audience and collecting 10+ design inspirations. One week minimum.' },
  { number: '04', title: 'AI Exploration', description: 'Using AI tools to explore concepts, generate ideas and dramatically speed up the creative process.' },
  { number: '05', title: 'Concept', description: 'Brainstorming directions, wireframing and sketching layouts. Multiple paths before committing to one.' },
  { number: '06', title: 'Design', description: 'Building full designs and concepts in Figma. Dark and light variants. Every detail considered.' },
  { number: '07', title: 'Feedback', description: 'Presenting to client, collecting feedback and iterating. The process lives here, not in perfection.' },
  { number: '08', title: 'Deliver', description: 'Handing off final files, assets and documentation. Clean, organised, ready to use.' },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / sectionHeight));
      const step = Math.floor(progress * steps.length);
      setActiveStep(Math.min(step, steps.length - 1));
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      style={{ height: isMobile ? 'auto' : `${steps.length * 60}vh`, position: 'relative', borderTop: '1px solid #1a1a1a' }}
    >
      <div style={{
        position: isMobile ? 'relative' : 'sticky',
        top: 0,
        height: isMobile ? 'auto' : '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(1rem, 2vw, 2rem) clamp(1.5rem, 5vw, 3rem)',
        overflow: 'hidden',
      }}>

        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div>
            <p style={{
              fontFamily: 'monospace',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#444',
              marginBottom: '0.5rem',
            }}>
              Process
            </p>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 4vw, 3rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              color: '#fff',
              textTransform: 'uppercase',
              margin: 0,
            }}>
              How I Work
            </h2>
          </div>

          <div style={{
            border: '2px solid #ff000033',
            padding: '0.4rem 1rem',
            transform: 'rotate(-2deg)',
          }}>
            <p style={{
              fontFamily: 'monospace',
              fontSize: '0.65rem',
              color: '#ff000066',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              margin: 0,
            }}>
              Classified
            </p>
          </div>
        </div>

        {/* Document */}
        <div style={{
          border: '1px solid #1f1f1f',
          background: '#0d0d0d',
          padding: 'clamp(1rem, 2vw, 2rem)',
          width: '100%',
        }}>

          {/* Document header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid #1a1a1a',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}>
            <p style={{ fontFamily: 'monospace', fontSize: '0.6rem', color: '#333', letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0 }}>
              Document: ALI-QADRI-PROCESS-v1.0
            </p>
            <p style={{ fontFamily: 'monospace', fontSize: '0.6rem', color: '#333', letterSpacing: '0.1em', margin: 0 }}>
              {new Date().getFullYear()} — CONFIDENTIAL
            </p>
          </div>

          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {steps.map((step, i) => {
              const isRevealed = i <= activeStep;
              const isCompleted = i < activeStep;
              const isActive = i === activeStep;

              return (
                <div
                  key={step.number}
                  style={{
                    padding: '0.6rem 0',
                    borderBottom: '1px solid #111',
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '2rem 1fr' : '2.5rem 160px 1fr',
                    gap: isMobile ? '0.75rem' : '2rem',
                    alignItems: 'center',
                    transition: 'opacity 0.3s ease',
                    opacity: isRevealed ? 1 : 0.3,
                  }}
                >
                  {/* Number */}
                  <span style={{
                    fontFamily: 'monospace',
                    fontSize: '0.65rem',
                    color: isActive ? '#fff' : isCompleted ? '#333' : '#222',
                    transition: 'color 0.3s ease',
                  }}>
                    {step.number}
                  </span>

                  {/* Title with strikethrough */}
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <span style={{
                      fontFamily: 'monospace',
                      fontSize: isMobile ? '0.8rem' : '0.9rem',
                      fontWeight: 700,
                      color: isActive ? '#fff' : isCompleted ? '#333' : '#1a1a1a',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      transition: 'color 0.4s ease',
                      position: 'relative',
                      display: 'inline-block',
                    }}>
                      {step.title}
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        height: '1.5px',
                        background: '#444',
                        width: isCompleted ? '100%' : '0%',
                        transition: 'width 0.5s cubic-bezier(0.76, 0, 0.24, 1)',
                        transform: 'translateY(-50%)',
                      }} />
                    </span>
                  </div>

                  {/* Description */}
                  <div style={{ position: 'relative' }}>
                    {!isRevealed && (
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {step.description.split(' ').map((_, wi) => (
                          <div
                            key={wi}
                            style={{
                              height: '10px',
                              width: `${40 + (wi * 13) % 40}px`,
                              background: '#1a1a1a',
                              borderRadius: '2px',
                            }}
                          />
                        ))}
                      </div>
                    )}
                    {isRevealed && (
                      <p style={{
                        fontFamily: 'monospace',
                        fontSize: isMobile ? '0.7rem' : '0.75rem',
                        color: isActive ? '#888' : '#333',
                        lineHeight: 1.6,
                        letterSpacing: '0.02em',
                        transition: 'color 0.3s ease',
                        textDecoration: isCompleted ? 'line-through' : 'none',
                        textDecorationColor: '#333',
                        margin: 0,
                      }}>
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Document footer */}
          <div style={{
            marginTop: '1.5rem',
            paddingTop: '1rem',
            borderTop: '1px solid #1a1a1a',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}>
            <p style={{ fontFamily: 'monospace', fontSize: '0.6rem', color: '#222', letterSpacing: '0.1em', margin: 0 }}>
              AUTHORIZED: ALI QADRI — WEB DESIGNER
            </p>
            <p style={{ fontFamily: 'monospace', fontSize: '0.6rem', color: '#222', letterSpacing: '0.1em', margin: 0 }}>
              {activeStep + 1}/{steps.length} STEPS REVEALED
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}