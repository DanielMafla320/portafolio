"use client";

import { useState, useEffect, useRef } from 'react';
import { Globe, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface NavbarProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
}

export default function Navbar({ activeSection, scrollToSection }: NavbarProps) {
  const { darkMode, toggleDark, language, changeLanguage, isChanging, t, c, T } = useTheme();
  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
        setShowNav(true);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 50,
      transform: showNav ? 'translateY(0)' : 'translateY(-100%)',
      transition: 'transform 0.35s ease',
      background: c.navBg,
      backdropFilter: 'blur(20px)',
      borderBottom: `1px solid ${c.border}`,
      boxShadow: darkMode ? '0 1px 20px #00000040' : '0 1px 20px #7c3aed08',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 24px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 64,
      }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800 }}>
          <span style={{ color: c.text, transition: T }}>Daniel </span>
          <span className="grad">Mafla</span>
        </div>

        <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {['inicio', 'acerca', 'proyectos', 'testimonios', 'experiencia', 'contacto'].map(s => (
            <button
              key={s}
              className={`nav-btn ${activeSection === s ? 'active' : ''}`}
              onClick={() => scrollToSection(s)}
            >
              {t.nav[s as keyof typeof t.nav]}
            </button>
          ))}

          <button
            onClick={toggleDark}
            title={darkMode ? 'Modo claro' : 'Modo oscuro'}
            style={{
              marginLeft: 10, width: 38, height: 38, borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              border: `1px solid ${darkMode ? '#3a3a60' : '#2a2a45'}`,
              background: darkMode ? '#1e1e38' : '#1a1a2e',
              transition: T,
            }}
          >
            <span style={{ display: 'flex', transition: 'transform 0.5s ease', transform: darkMode ? 'rotate(180deg)' : 'rotate(0deg)' }}>
              {darkMode
                ? <Sun size={16} style={{ color: '#fbbf24' }} />
                : <Moon size={16} style={{ color: '#f0eeff' }} />
              }
            </span>
          </button>

          <button
            onClick={changeLanguage}
            title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            style={{
              marginLeft: 8, display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 12px', borderRadius: 12, cursor: 'pointer', fontWeight: 600,
              background: c.langBtn.bg, border: `1px solid ${c.langBtn.border}`,
              color: c.langBtn.color, transition: T, fontSize: 13,
            }}
          >
            <Globe size={15} style={{ color: '#7c3aed' }} />
            <span className={`lang-label ${isChanging ? 'lang-out' : 'lang-in'}`}>
              {language === 'es' ? 'EN' : 'ES'}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}