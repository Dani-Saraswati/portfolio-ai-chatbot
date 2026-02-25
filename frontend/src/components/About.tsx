import React from 'react';

export const About: React.FC = () => {
  return (
    <section id="about" style={{ backgroundColor: '#1F2937', color: 'white', padding: '64px 24px' }}>
      <div style={{ maxWidth: '1152px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>About Me</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          <div>
            <p style={{ color: '#D1D5DB', marginBottom: '24px', lineHeight: '1.6' }}>I'm a full-stack developer with 3+ years of experience building web applications that solve real problems.</p>
            <p style={{ color: '#D1D5DB', lineHeight: '1.6' }}>My journey started with passion for problem-solving and has evolved into building things people love.</p>
          </div>
          <div style={{ backgroundColor: '#374151', padding: '32px', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#3B82F6' }}>Quick Facts</h3>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ marginBottom: '12px', color: '#D1D5DB' }}>📍 San Francisco, CA</li>
              <li style={{ marginBottom: '12px', color: '#D1D5DB' }}>💼 Senior Frontend Developer</li>
              <li style={{ marginBottom: '12px', color: '#D1D5DB' }}>🎓 BS Computer Science</li>
              <li style={{ color: '#D1D5DB' }}>🚀 3+ years experience</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};