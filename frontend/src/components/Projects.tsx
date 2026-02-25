import React, { useState, useEffect } from 'react';
import { resumeAPI } from '../utils/api';

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    resumeAPI.getProjects().then(data => {
      setProjects(data.projects);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ backgroundColor: '#1F2937', color: 'white', padding: '64px 24px', textAlign: 'center' }}>Loading...</div>;

  return (
    <section id="projects" style={{ backgroundColor: '#1F2937', color: 'white', padding: '64px 24px' }}>
      <div style={{ maxWidth: '1152px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '48px', textAlign: 'center' }}>Projects</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          {projects.map((proj, i) => (
            <div key={i} style={{ backgroundColor: '#374151', padding: '24px', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px' }}>{proj.name}</h3>
              <p style={{ color: '#D1D5DB', marginBottom: '16px' }}>{proj.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                {proj.technologies.map((tech: string, j: number) => (
                  <span key={j} style={{ backgroundColor: '#4B5563', padding: '6px 12px', borderRadius: '4px', fontSize: '14px' }}>{tech}</span>
                ))}
              </div>
              <a href={proj.link} style={{ color: '#3B82F6', textDecoration: 'none', cursor: 'pointer' }}>View Project →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};