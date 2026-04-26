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
          <div style={{ position: 'relative', marginBottom: '4rem' }}>
            <motion.span style={{
              fontSize: 'clamp(8rem, 15vw, 15rem)',
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255, 255, 255, 0.05)',
              lineHeight: 1,
              position: 'absolute',
              top: '2rem',
              left: '0rem',
              zIndex: 0,
              y: yParallax1
            }}>01</motion.span>
            <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', position: 'relative', zIndex: 1, color: '#fff' }}>Education</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {resume.education.map((edu, i) => (
              <motion.div 
                key={i}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}
                transition={{ duration: 0.3 }}
                style={{ 
                  padding: '3rem 1.5rem', 
                  borderTop: '1px solid var(--border)',
                  borderBottom: i === resume.education.length - 1 ? '1px solid var(--border)' : 'none',
                  position: 'relative',
                  zIndex: 1
                }}
              >
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{edu.period}</p>
                <h3 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', margin: '0 0 0.5rem 0', color: '#fff', fontWeight: 400, lineHeight: 1.1 }}>{edu.degree}</h3>
                <p style={{ fontSize: '1.2rem', color: 'var(--accent)', fontStyle: 'italic', fontFamily: 'var(--font-heading)', margin: 0, marginTop: '1rem' }}>{edu.institution}</p>
              </motion.div>
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
          <div style={{ position: 'relative', marginBottom: '4rem' }}>
            <motion.span style={{
              fontSize: 'clamp(8rem, 15vw, 15rem)',
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255, 255, 255, 0.05)',
              lineHeight: 1,
              position: 'absolute',
              top: '2rem',
              left: '0rem',
              zIndex: 0,
              y: yParallax2
            }}>02</motion.span>
            <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', position: 'relative', zIndex: 1, color: '#fff' }}>Expertise</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '4rem' : '4rem', position: 'relative', zIndex: 1 }}>
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '2rem', letterSpacing: '0.1em' }}>Core Expertise</p>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {resume.skills.map((item, i) => (
                  <motion.div key={item} 
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', x: 10 }}
                    transition={{ duration: 0.3 }}
                    style={{ fontSize: '1.05rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem 1rem', borderTop: '1px solid var(--border)', borderBottom: i === resume.skills.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700 }}>/</span> <span style={{ color: '#fff' }}>{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '2rem', letterSpacing: '0.1em' }}>Technical Stack</p>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {resume.tools.map((item, i) => (
                  <motion.div key={item} 
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', x: 10 }}
                    transition={{ duration: 0.3 }}
                    style={{ fontSize: '1.05rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem 1rem', borderTop: '1px solid var(--border)', borderBottom: i === resume.tools.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700 }}>/</span> <span style={{ color: '#fff' }}>{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}