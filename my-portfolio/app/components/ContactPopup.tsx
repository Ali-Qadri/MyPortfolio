'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactPopup({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);



    try {
      const response = await fetch('https://formsubmit.co/ajax/designwithsyed@gmail.com', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          onClose();
          setStatus('idle');
          form.reset();
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(5px)',
              zIndex: 9999,
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95, x: '-50%', y: '-50%' }}
            animate={{ opacity: 1, y: '-50%', scale: 1, x: '-50%' }}
            exit={{ opacity: 0, scale: 0.95, y: '-40%', x: '-50%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              width: '90%',
              maxWidth: '500px',
              background: '#0a0a0a',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '3rem',
              zIndex: 10000,
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2.5rem',
                color: '#fff',
                fontWeight: 300,
                margin: 0,
                lineHeight: 1
              }}>
                Let's talk
              </h3>
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                ✕
              </button>
            </div>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  padding: '3rem 0',
                  textAlign: 'center',
                  color: 'var(--accent)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.2rem',
                }}
              >
                Message sent successfully! <br/> I'll get back to you soon.
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_subject" value="New Portfolio Inquiry!" />
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    style={{
                      background: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                      padding: '0.5rem 0',
                      color: '#fff',
                      fontFamily: 'var(--font-body)',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    style={{
                      background: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                      padding: '0.5rem 0',
                      color: '#fff',
                      fontFamily: 'var(--font-body)',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                      padding: '0.5rem 0',
                      color: '#fff',
                      fontFamily: 'var(--font-body)',
                      fontSize: '1rem',
                      outline: 'none',
                      resize: 'none',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                  />
                </div>

                {status === 'error' && (
                  <p style={{ color: 'red', fontSize: '0.8rem', fontFamily: 'var(--font-body)' }}>
                    Something went wrong. Please try again.
                  </p>
                )}



                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  style={{
                    marginTop: '1rem',
                    padding: '1rem 2rem',
                    background: '#fff',
                    color: '#000',
                    border: 'none',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    cursor: status === 'submitting' ? 'wait' : 'pointer',
                    transition: 'background 0.3s ease, color 0.3s ease',
                    opacity: status === 'submitting' ? 0.7 : 1
                  }}
                  onMouseEnter={e => {
                    if (status !== 'submitting') {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#fff';
                      e.currentTarget.style.boxShadow = 'inset 0 0 0 1px #fff';
                    }
                  }}
                  onMouseLeave={e => {
                    if (status !== 'submitting') {
                      e.currentTarget.style.background = '#fff';
                      e.currentTarget.style.color = '#000';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
