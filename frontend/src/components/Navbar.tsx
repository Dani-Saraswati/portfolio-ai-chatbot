import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <nav style={{ backgroundColor: '#111827', color: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.3)', position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid #1F2937' }}>
      <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3B82F6' }}>Sarah Anderson</div>
        <ul style={{ display: 'flex', gap: '32px', listStyle: 'none', margin: 0, padding: 0 }}>
          <li><a href="#home" style={{ color: 'white', textDecoration: 'none', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.color = '#3B82F6'} onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>Home</a></li>
          <li><a href="#about" style={{ color: 'white', textDecoration: 'none', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.color = '#3B82F6'} onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>About</a></li>
          <li><a href="#skills" style={{ color: 'white', textDecoration: 'none', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.color = '#3B82F6'} onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>Skills</a></li>
          <li><a href="#projects" style={{ color: 'white', textDecoration: 'none', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.color = '#3B82F6'} onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>Projects</a></li>
          <li><a href="#chat" style={{ color: 'white', textDecoration: 'none', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.color = '#3B82F6'} onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>Chat</a></li>
        </ul>
      </div>
    </nav>
  );
};