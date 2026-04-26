'use client';
import { useEffect, useState } from 'react';
import { motion, cubicBezier, Variants } from "framer-motion";

const experiences = [
  {
    role: 'Web Designer',
    company: 'NoCodeLat',
    location: 'Remote',
    period: 'Oct — Dec 2025',
    details: [
      'Designed a complete design system for the company.',
      'Made an interactive website prototype + smart animations.',
      'Revamped their entire discord server setting.',
      'Designed 12+ variants of the website design for better choices.'
    ]
  },
  {
    role: 'Visual Designer',
    company: 'Freelancing',
    location: 'Global',
    period: 'Jan 2022 — Present',
    details: [
      'Designed social media creatives, banners, and marketing visuals.',
      'Maintained visual consistency across posts by following brand guidelines.',
      'Delivered designs using tools like Figma and Adobe tools.',
      'Managed social media accounts, including content planning and basic engagement.'
    ]
  }
];

export default function Experience() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: cubicBezier(0.23, 1, 0.32, 1), }
    }
  };

  return (
    <section id="experience" style={{
      padding: 'clamp(5rem, 15vw, 12rem) clamp(1.5rem, 5vw, 4rem)',
      maxWidth: '1440px',
      margin: '0 auto',
      background: '#000000',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '8rem' }}>
        <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2rem' }}>// Experience</span>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '4rem' : '8rem' }}
      >
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1.5fr',
              gap: '4rem',
              position: 'relative'
            }}
          >
            {/* Number Background */}
            {!isMobile && (
              <span style={{
                position: 'absolute',
                top: '-3rem',
                left: '-1rem',
                fontSize: '10rem',
                fontFamily: 'var(--font-body)',
                color: 'transparent',
                WebkitTextStroke: '1px var(--border)',
                zIndex: 0,
              }}>0{i + 3}</span>
            )}

            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', marginBottom: '1.5rem' }}>{exp.period}</p>
              <h3 style={{ fontSize: '3rem', margin: 0, color: '#fff', fontWeight: 400, lineHeight: 1.1 }}>{exp.role}</h3>
              <p style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.5rem',
                color: 'var(--text-secondary)',
                fontStyle: 'italic',
                marginTop: '1rem'
              }}>
                {exp.company}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative', zIndex: 1, justifyContent: 'center' }}>
              {exp.details.map((detail, index) => (
                <div key={index} style={{
                  fontSize: '1.1rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                  display: 'flex',
                  gap: '1.5rem'
                }}>
                  <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>/</span>
                  {detail}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
