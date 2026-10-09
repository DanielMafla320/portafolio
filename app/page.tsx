"use client";

import { useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Testimonials from '@/components/Testimonials';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

function PortfolioContent() {
  const { language } = useTheme();
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const sections = document.querySelectorAll<HTMLElement>('main section[id]');
    const revealTargets = document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-reveal="hero"])');
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: '-25% 0px -60% 0px', threshold: [0, 0.15, 0.4, 0.7] });

    sections.forEach(section => observer.observe(section));
    const revealObserver = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    revealTargets.forEach(target => revealObserver.observe(target));

    return () => {
      observer.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="site-shell">
      <a className="skip-link" href="#contenido">{language === 'es' ? 'Saltar al contenido' : 'Skip to content'}</a>
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />
      <main id="contenido">
        <Hero />
        <About />
        <Projects />
        <Testimonials />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return <ThemeProvider><PortfolioContent /></ThemeProvider>;
}
