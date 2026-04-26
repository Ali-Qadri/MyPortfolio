'use client';
import { motion } from 'framer-motion';

export default function Playground() {
  return (
    <section id="playground" style={{
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
        style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}
      >
        <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-body)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2rem' }}>// Playground</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <h2 style={{
          fontSize: 'clamp(3rem, 6vw, 5rem)',
          color: '#fff',
          fontFamily: 'var(--font-heading)',
          fontWeight: 300,
          marginBottom: '1rem',
        }}>
          Web Designs Practice
        </h2>

        <p style={{
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-body)',
          fontSize: '1.1rem',
          maxWidth: '800px',
          marginBottom: '2rem',
          lineHeight: 1.6,
        }}>
          Explore my other designs! These are design exercises I practice in my free time to hone my skills, experiment with layouts, and stay creatively sharp.
        </p>

        <div style={{
          width: '100%',
          position: 'relative',
          paddingBottom: '56.25%', // 16:9 aspect ratio
          height: 0,
          overflow: 'hidden',
          borderRadius: '2px',
          border: '1px solid var(--border)',
          backgroundColor: '#111',
        }}>
          <iframe 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }} 
            src="https://embed.figma.com/design/PYPgPRi0SqGXt6kart75dG/Web-Designs-Practice?node-id=6-2&embed-host=share" 
            allowFullScreen
          ></iframe>
        </div>
      </motion.div>
    </section>
  );
}
