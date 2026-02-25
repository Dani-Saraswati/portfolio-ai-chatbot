import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Skills } from '../components/Skills';
import { Projects } from '../components/Projects';
import { Resume } from '../components/Resume';
import { Chatbot } from '../components/Chatbot';

export const Home: React.FC = () => {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Resume />
      <Chatbot />
      
      <footer className="bg-gray-900 text-gray-400 text-center py-8 border-t border-gray-800">
        <p>&copy; 2026 Sarah Anderson. All rights reserved.</p>
      </footer>
    </div>
  );
};