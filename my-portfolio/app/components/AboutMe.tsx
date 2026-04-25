'use client';

export default function AboutMe() {
  const resume = {
    education: [
      { degree: 'Bachelors in Computer Science', institution: 'Iqra University', period: '2023 - 2027' },
      { degree: 'Diploma in IT', institution: 'Aptech Pakistan', period: '2021 - 2024' }
    ],
    skills: ['Communication', 'Programming Basics', 'Motion Design (Framer)', 'Problem Solving'],
    tools: ['Framer', 'Wordpress', 'Figma', "Wix", "Vibecoding"]
  };

  return (
    <section id="about" style={{
      padding: 'clamp(5rem, 15vw, 12rem) clamp(1.5rem, 5vw, 4rem)',
      maxWidth: '1440px',
      margin: '0 auto',
      background: '#000000',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '8rem' }}>
        <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2rem' }}>// Education</span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '12rem',
      }}>
        {/* Left Column: Education */}
        <div>
          <div style={{ position: 'relative', marginBottom: '6rem' }}>
            <span style={{
              fontSize: 'clamp(8rem, 15vw, 15rem)',
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              color: 'transparent',
              WebkitTextStroke: '1px var(--border)',
              lineHeight: 1,
              position: 'absolute',
              top: '-6rem',
              left: '-2rem',
              zIndex: 0,
            }}>01</span>
            <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', position: 'relative', zIndex: 1, color: '#fff' }}>Education</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {resume.education.map((edu, i) => (
              <div key={i}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', marginBottom: '1rem' }}>{edu.period}</p>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '0.75rem', color: '#fff', fontWeight: 400 }}>{edu.degree}</h3>
                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontStyle: 'italic', fontFamily: 'var(--font-heading)' }}>{edu.institution}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Expertise & Skills */}
        <div>
          <div style={{ position: 'relative', marginBottom: '6rem' }}>
            <span style={{
              fontSize: 'clamp(8rem, 15vw, 15rem)',
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              color: 'transparent',
              WebkitTextStroke: '1px var(--border)',
              lineHeight: 1,
              position: 'absolute',
              top: '-6rem',
              left: '-2rem',
              zIndex: 0,
            }}>02</span>
            <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', position: 'relative', zIndex: 1, color: '#fff' }}>Expertise</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '2rem', letterSpacing: '0.1em' }}>Core Expertise</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {resume.skills.map(item => (
                  <div key={item} style={{ fontSize: '1.1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ color: 'var(--accent)' }}>/</span> {item}
                  </div>
                ))}
              </div>
            </div>



            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '2rem', letterSpacing: '0.1em' }}>Technical Stack</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {resume.tools.map(item => (
                  <div key={item} style={{ fontSize: '1.1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ color: 'var(--accent)' }}>/</span> {item}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}