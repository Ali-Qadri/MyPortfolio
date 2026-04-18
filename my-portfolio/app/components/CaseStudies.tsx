'use client';
import { useRouter } from 'next/navigation';

const studies = [
  {
    id: 'nocode-lat',
    number: '01',
    title: 'NoCode.Lat',
    type: 'Website Design & Community Growth',
    year: '2024',
    tools: ['Figma'],
    color: '#1a1a1a',
    accent: '#ffffff',
  },
  {
    id: 'coming-soon',
    number: '02',
    title: 'LinkedIn Banner',
    type: 'Coming Soon',
    year: '—',
    tools: [],
    color: '#0f0f0f',
    accent: '#333',
  },
];

export default function CaseStudies() {
  const router = useRouter();

  return (
    <section style={{ padding: '8rem 3rem', width: '100%' }}>
      {/* Section label */}
      <p style={{
        fontFamily: 'monospace',
        fontSize: '0.7rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: '#444',
        marginBottom: '4rem',
      }}>
        Selected Work
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {studies.map((study, i) => (
          <div
            key={study.id}
            onClick={() => study.id !== 'coming-soon' && router.push(`/case-studies/${study.id}`)}
            style={{
              borderTop: '1px solid #1f1f1f',
              padding: '2.5rem 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: study.id !== 'coming-soon' ? 'pointer' : 'default',
              transition: 'all 0.3s ease',
              gap: '2rem',
            }}
            onMouseEnter={e => {
              if (study.id === 'coming-soon') return;
              (e.currentTarget as HTMLElement).style.paddingLeft = '1.5rem';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.paddingLeft = '0';
            }}
          >
            {/* Number */}
            <span style={{
              fontFamily: 'monospace',
              fontSize: '0.75rem',
              color: '#333',
              minWidth: '2rem',
            }}>
              {study.number}
            </span>

            {/* Title */}
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 5rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              color: study.id === 'coming-soon' ? '#222' : '#fff',
              flex: 1,
              lineHeight: 1,
              textTransform: 'uppercase',
            }}>
              {study.title}
            </h2>

            {/* Meta */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '4px',
              minWidth: '180px',
            }}>
              <span style={{
                fontFamily: 'monospace',
                fontSize: '0.7rem',
                color: '#444',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textAlign: 'right',
              }}>
                {study.type}
              </span>
              <span style={{
                fontFamily: 'monospace',
                fontSize: '0.65rem',
                color: '#333',
              }}>
                {study.year}
              </span>
            </div>

            {/* Arrow */}
            {study.id !== 'coming-soon' && (
              <span style={{
                fontSize: '1.2rem',
                color: '#333',
                transition: 'transform 0.3s ease, color 0.3s ease',
              }}>
                →
              </span>
            )}
          </div>
        ))}

        {/* Bottom border */}
        <div style={{ borderTop: '1px solid #1f1f1f' }} />
      </div>
    </section>
  );
}