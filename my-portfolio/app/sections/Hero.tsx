'use client';

export default function Hero() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center px-6 text-center">

      <h1
        style={{
          fontSize: 'clamp(4rem, 13vw, 14rem)',
          fontWeight: 900,
          lineHeight: 0.9,
          letterSpacing: '-0.04em',
          textTransform: 'uppercase',
          color: '#fff',
        }}
      >
        Hi, I am a<br />Web Designer
      </h1>

      <p style={{
        marginTop: '2.5rem',
        fontSize: '0.85rem',
        color: '#555',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        fontFamily: 'monospace',
        maxWidth: '400px',
      }}>
        Specialized in clean & modern websites —
        2 years in the industry
      </p>

      <button
        style={{
          marginTop: '3rem',
          padding: '0.75rem 2.5rem',
          border: '1px solid #333',
          background: 'transparent',
          color: '#fff',
          fontSize: '0.75rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          fontFamily: 'monospace',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => {
          (e.target as HTMLElement).style.background = '#fff';
          (e.target as HTMLElement).style.color = '#000';
        }}
        onMouseLeave={e => {
          (e.target as HTMLElement).style.background = 'transparent';
          (e.target as HTMLElement).style.color = '#fff';
        }}
      >
        View Work
      </button>

    </section>
  );
}