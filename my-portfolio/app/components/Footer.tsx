'use client';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid #1a1a1a',
      padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 3rem) clamp(2rem, 4vw, 3rem)',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Top row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 'clamp(3rem, 8vw, 6rem)',
        flexWrap: 'wrap',
        gap: '2rem',
      }}>

        {/* Left — label */}
        <p style={{
          fontFamily: 'monospace',
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#444',
        }}>
          Get In Touch
        </p>

        {/* Right — available badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          border: '1px solid #1a3a1a',
          background: '#0a1a0a',
          borderRadius: '999px',
          padding: '5px 14px',
        }}>
          <div style={{ position: 'relative', width: '7px', height: '7px' }}>
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
            }} />
          </div>
          <span style={{
            fontFamily: 'monospace',
            fontSize: '0.7rem',
            color: '#28c840',
            letterSpacing: '0.1em',
          }}>
            Available for work
          </span>
        </div>
      </div>

      {/* Big email CTA */}
      
        <a href="mailto:designwithsyed@gmail.com"
        style={{
          display: 'block',
          fontSize: 'clamp(1.5rem, 5vw, 3.5rem)',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          color: '#333',
          textDecoration: 'none',
          textTransform: 'lowercase',
          marginBottom: 'clamp(4rem, 10vw, 8rem)',
          transition: 'color 0.3s ease',
          lineHeight: 1,
        }}
        onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
        onMouseLeave={e => (e.currentTarget.style.color = '#333')}
      >
        designwithsyed@gmail.com →
      </a>

      {/* Big name */}
      <div style={{ position: 'relative' }}>
        <h2 style={{
          fontSize: 'clamp(4rem, 18vw, 18rem)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          lineHeight: 0.85,
          textTransform: 'uppercase',
          color: 'transparent',
          WebkitTextStroke: '1px #1f1f1f',
          userSelect: 'none',
          margin: 0,
          transition: 'all 0.4s ease',
        }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.WebkitTextStroke = '1px #333';
            (e.currentTarget as HTMLElement).style.color = 'transparent';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.WebkitTextStroke = '1px #1f1f1f';
          }}
        >
          Ali<br />Qadri
        </h2>
      </div>

      {/* Bottom bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 'clamp(2rem, 4vw, 3rem)',
        paddingTop: '2rem',
        borderTop: '1px solid #1a1a1a',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>

        {/* Left — copyright */}
        <p style={{
          fontFamily: 'monospace',
          fontSize: '0.65rem',
          color: '#333',
          letterSpacing: '0.1em',
        }}>
          © {new Date().getFullYear()} Ali Qadri — All rights reserved
        </p>

        {/* Right — links */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {[
            { label: 'GitHub', href: 'https://github.com/Ali-Qadri' },
            { label: 'Email', href: 'mailto:designwithsyed@gmail.com' },
          ].map(link => (
            
             <a key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
              style={{
                fontFamily: 'monospace',
                fontSize: '0.65rem',
                color: '#333',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#333')}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Ping animation */}
      <style>{`
        @keyframes ping {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.5); opacity: 0; }
        }
      `}</style>

    </footer>
  );
}