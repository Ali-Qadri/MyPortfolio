'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, cubicBezier, Variants, useScroll, useTransform } from "framer-motion";

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

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [50, -150]);

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
    <section ref={sectionRef} id="experience" style={{
      padding: 'clamp(3rem, 10vw, 12rem) clamp(1.5rem, 5vw, 4rem)',
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
        <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2rem' }}>// Experience</span>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1.5fr',
              gap: '4rem',
              position: 'relative',
              padding: isMobile ? '3rem 1rem' : '5rem 2rem',
              borderTop: '1px solid var(--border)',
              borderBottom: i === experiences.length - 1 ? '1px solid var(--border)' : 'none',
              marginLeft: isMobile ? '0' : '-2rem',
              marginRight: isMobile ? '0' : '-2rem',
            }}
          >
            {/* Number Background */}
            {!isMobile && (
              <motion.span style={{
                position: 'absolute',
                top: '2rem',
                left: '0rem',
                fontSize: '12rem',
                fontFamily: 'var(--font-body)',
                color: 'transparent',
                WebkitTextStroke: '1px rgba(255, 255, 255, 0.05)',
                zIndex: 0,
                y: yParallax
              }}>0{i + 3}</motion.span>
            )}

            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{exp.period}</p>
              <h3 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', margin: 0, color: '#fff', fontWeight: 400, lineHeight: 1 }}>{exp.role}</h3>
              <p style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.5rem',
                color: 'var(--accent)',
                fontStyle: 'italic',
                marginTop: '1.5rem',
                marginBottom: 0
              }}>
                {exp.company}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', zIndex: 1, justifyContent: 'center', maxWidth: '600px' }}>
              {exp.details.map((detail, index) => {
                const keywords = ['12\\+ variants', 'Figma', 'Adobe', 'design system', 'smart animations', 'visual consistency'];
                let formattedDetail = detail;
                keywords.forEach(kw => {
                  formattedDetail = formattedDetail.replace(new RegExp(`(${kw})`, 'gi'), '<span style="color: #fff; font-weight: 500;">$1</span>');
                });

                return (
                  <div key={index} style={{
                    fontSize: '1.05rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.6,
                    display: 'flex',
                    gap: '1rem'
                  }}>
                    <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700 }}>/</span>
                    <span dangerouslySetInnerHTML={{ __html: formattedDetail }} />
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
