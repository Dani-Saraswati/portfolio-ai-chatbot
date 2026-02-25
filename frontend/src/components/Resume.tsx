import React, { useState, useEffect } from 'react';
import { resumeAPI } from '../utils/api';

export const Resume: React.FC = () => {
  const [resume, setResume] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    resumeAPI.getResume().then(data => {
      setResume(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const downloadResume = () => {
    if (!resume) return;
    
    const resumeText = `SARAH ANDERSON
${resume.email} | ${resume.phone} | ${resume.location}

PROFESSIONAL SUMMARY
${resume.summary}

SKILLS
${resume.skills.map((group: any) => `${group.category}: ${group.items.join(', ')}`).join('\n')}

EXPERIENCE
${resume.experiences.map((exp: any) => `${exp.position}
${exp.company} | ${exp.duration}
${exp.description}`).join('\n\n')}

EDUCATION
${resume.education.map((edu: any) => `${edu.degree}
${edu.school} | ${edu.year}`).join('\n\n')}

PROJECTS
${resume.projects.map((proj: any) => `${proj.name}
${proj.description}
Technologies: ${proj.technologies.join(', ')}`).join('\n\n')}`;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(resumeText));
    element.setAttribute('download', 'Sarah_Anderson_Resume.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (loading) return <div style={{ backgroundColor: '#111827', color: 'white', padding: '64px 24px', textAlign: 'center' }}>Loading...</div>;

  return (
    <section id="resume" style={{ backgroundColor: '#111827', color: 'white', padding: '64px 24px' }}>
      <div style={{ maxWidth: '896px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '48px', textAlign: 'center' }}>Resume</h2>
        
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#3B82F6', marginBottom: '24px' }}>Experience</h3>
          {resume.experiences.map((exp: any, i: number) => (
            <div key={i} style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: i === resume.experiences.length - 1 ? 'none' : '1px solid #374151' }}>
              <h4 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>{exp.position}</h4>
              <p style={{ color: '#9CA3AF', marginBottom: '8px' }}>{exp.company} | {exp.duration}</p>
              <p style={{ color: '#D1D5DB' }}>{exp.description}</p>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#3B82F6', marginBottom: '24px' }}>Education</h3>
          {resume.education.map((edu: any, i: number) => (
            <div key={i} style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: i === resume.education.length - 1 ? 'none' : '1px solid #374151' }}>
              <h4 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' }}>{edu.degree}</h4>
              <p style={{ color: '#9CA3AF' }}>{edu.school} | {edu.year}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button 
            onClick={downloadResume}
            style={{ 
              backgroundColor: '#3B82F6', 
              color: 'white', 
              padding: '12px 32px', 
              borderRadius: '8px', 
              border: 'none', 
              fontWeight: 'bold', 
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563EB'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3B82F6'}
          >
            📥 Download PDF Resume
          </button>
        </div>
      </div>
    </section>
  );
};