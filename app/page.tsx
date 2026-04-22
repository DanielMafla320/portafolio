"use client";

import { useState } from 'react';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import Navbar       from '@/components/Navbar';
import Hero         from '@/components/Hero';
import About        from '@/components/About';
import Projects     from '@/components/Projects';
import Testimonials from '@/components/Testimonials';
import Experience   from '@/components/Experience';
import Contact      from '@/components/Contact';
import Footer       from '@/components/Footer';

function PortfolioContent() {
  const { darkMode, c, T } = useTheme();
  const [activeSection, setActiveSection] = useState<string>('inicio');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const pageBg: React.CSSProperties = {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    backgroundColor: darkMode ? '#0b0b16' : '#f5f3ff',
    backgroundImage: darkMode ? `
      radial-gradient(ellipse 70% 55% at 15% 8%,  rgba(109,40,217,0.40) 0%, transparent 65%),
      radial-gradient(ellipse 55% 45% at 88% 18%,  rgba(139,92,246,0.25) 0%, transparent 60%),
      radial-gradient(ellipse 50% 40% at 75% 85%,  rgba(168,85,247,0.30) 0%, transparent 60%),
      radial-gradient(ellipse 40% 35% at 10% 80%,  rgba(91,33,182,0.22) 0%, transparent 55%)
    ` : `
      radial-gradient(ellipse 65% 50% at 12% 6%,   rgba(139,92,246,0.55) 0%, transparent 65%),
      radial-gradient(ellipse 50% 40% at 90% 15%,  rgba(167,139,250,0.50) 0%, transparent 58%),
      radial-gradient(ellipse 55% 45% at 78% 88%,  rgba(139,92,246,0.45) 0%, transparent 60%),
      radial-gradient(ellipse 38% 32% at 8%  82%,  rgba(196,181,253,0.55) 0%, transparent 55%)
    `,
    minHeight: '100vh',
    color: c.text,
    transition: T,
    overflowX: 'hidden',
  };

  return (
    <div style={pageBg}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulseDot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(124,58,237,0.55); }
          50%       { box-shadow: 0 0 0 7px rgba(124,58,237,0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />
      <Hero />
      <About />
      <Projects />
      <Testimonials />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  );
}