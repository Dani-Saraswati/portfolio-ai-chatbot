import React, { useState, useEffect } from 'react';
import { resumeAPI } from '../utils/api';

export const Skills: React.FC = () => {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    resumeAPI.getSkills().then(data => {
      setSkills(data.skills);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ backgroundColor: '#111827', color: 'white', padding: '64px 24px', textAlign: 'center' }}>Loading...</div>;

  return (
    <section id="skills" style={{ backgroundColor: '#111827', color: 'white', padding: '64px 24px' }}>
      <div style={{ maxWidth: '1152px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '48px', textAlign: 'center' }}>Skills</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          {skills.map((group, i) => (
            <div key={i} style={{ backgroundColor: '#1F2937', padding: '24px', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#3B82F6', marginBottom: '16px' }}>{group.category}</h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {group.items.map((item: string, j: number) => (
                  <li key={j} style={{ color: '#D1D5DB', marginBottom: '8px' }}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};