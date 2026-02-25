import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section id="home" style={{ background: 'linear-gradient(to bottom right, #111827, #1F2937)', color: 'white', padding: '128px 24px' }}>
      <div style={{ maxWidth: '1152px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '60px', fontWeight: 'bold', marginBottom: '24px' }}>Hi, I'm <span style={{ color: '#3B82F6' }}>Sarah Anderson</span></h1>
        <p style={{ fontSize: '24px', color: '#D1D5DB', marginBottom: '32px' }}>Full-Stack Developer | React & Python</p>
        <p style={{ color: '#9CA3AF', marginBottom: '48px' }}>I build beautiful web apps and scalable backend systems.</p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#projects" style={{ backgroundColor: '#3B82F6', color: 'white', padding: '12px 32px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', cursor: 'pointer', display: 'inline-block', transition: 'all 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563EB'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3B82F6'}>View My Work</a>
          <a href="#resume" style={{ border: '2px solid #3B82F6', color: '#3B82F6', padding: '12px 32px', borderRadius: '8px', backgroundColor: 'transparent', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'none', display: 'inline-block', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#3B82F6'; e.currentTarget.style.color = 'white'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#3B82F6'; }}>Download Resume</a>
        </div>
      </div>
    </section>
  );
};