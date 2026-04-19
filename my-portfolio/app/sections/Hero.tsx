'use client';

export default function Hero() {
  return (
    <section style={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '6rem 1.5rem 3rem',
      textAlign: 'center',
    }}>
      <h1 style={{
        fontSize: 'clamp(3rem, 13vw, 14rem)',
        fontWeight: 900,
        lineHeight: 0.9,
        letterSpacing: '-0.04em',
        textTransform: 'uppercase',
        color: '#fff',
      }}>
        Hi, I am a<br />Web Designer
      </h1>

      <p style={{
        marginTop: '2.5rem',
        fontSize: 'clamp(0.7rem, 2.5vw, 0.85rem)',
        color: '#555',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        fontFamily: 'monospace',
        maxWidth: '400px',
        lineHeight: 1.8,
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