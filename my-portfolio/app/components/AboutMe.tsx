'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AboutMe() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const yParallax1 = useTransform(scrollYProgress, [0, 1], [50, -100]);
  const yParallax2 = useTransform(scrollYProgress, [0, 1], [100, -150]);

  const resume = {
    education: [
      { degree: 'Bachelors in Computer Science', institution: 'Iqra University', period: '2023 - 2027' },
      { degree: 'Diploma in IT', institution: 'Aptech Pakistan', period: '2021 - 2024' }
    ],
    skills: ['Communication', 'Programming Basics', 'Motion Design (Framer)', 'Problem Solving'],
    tools: ['Framer', 'Wordpress', 'Figma', "Wix", "Vibecoding"],
  };

  return (
    <section ref={sectionRef} id="about" style={{
      padding: 'clamp(5rem, 15vw, 12rem) clamp(1.5rem, 5vw, 4rem)',
      maxWidth: '1440px',
      margin: '0 auto',
      background: '#000000',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.5 }}
        style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '8rem' }}
      >
        <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2rem' }}>// Education</span>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: isMobile ? '6rem' : '12rem',
      }}>
        {/* Left Column: Education */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.15 }}
        >
          <div style={{ position: 'relative', marginBottom: '6rem' }}>
            <motion.span style={{
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
              y: yParallax1
            }}>01</motion.span>
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
        </motion.div>

        {/* Right Column: Expertise & Skills */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.15 }}
        >
          <div style={{ position: 'relative', marginBottom: '6rem' }}>
            <motion.span style={{
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
              y: yParallax2
            }}>02</motion.span>
            <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', position: 'relative', zIndex: 1, color: '#fff' }}>Expertise</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '2rem' : '4rem' }}>
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
        </motion.div>
      </div>
    </section>
  );
}