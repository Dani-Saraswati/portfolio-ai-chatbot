import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Resume } from './components/Resume';
import { Chatbot } from './components/Chatbot';

function App() {
  return (
    <div style={{ backgroundColor: '#111827', color: 'white', minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Resume />
      <Chatbot />
      <footer style={{ backgroundColor: '#111827', color: '#9CA3AF', textAlign: 'center', padding: '32px', borderTop: '1px solid #1F2937' }}>
        <p>&copy; 2026 Sarah Anderson. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;