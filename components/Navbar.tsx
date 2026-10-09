"use client";

import { useEffect, useState } from 'react';
import { Globe, Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface NavbarProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
}

const sections = ['inicio', 'acerca', 'proyectos', 'testimonios', 'experiencia', 'contacto'] as const;

export default function Navbar({ activeSection, scrollToSection }: NavbarProps) {
  const { darkMode, toggleDark, language, changeLanguage, isChanging, t } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  const navigate = (id: string) => {
    scrollToSection(id);
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <nav className="nav-wrap wrap" aria-label={language === 'es' ? 'Navegación principal' : 'Main navigation'}>
        <a className="brand" href="#inicio" onClick={() => navigate('inicio')} aria-label={language === 'es' ? 'Daniel Mafla, inicio' : 'Daniel Mafla, home'}>
          DM<span className="brand-period">.</span>
        </a>

        <div className="nav-links" aria-label={language === 'es' ? 'Secciones' : 'Sections'}>
          {sections.map((section, index) => (
            <button
              key={section}
              className={`nav-link${activeSection === section ? ' is-active' : ''}`}
              type="button"
              aria-current={activeSection === section ? 'location' : undefined}
              onClick={() => navigate(section)}
            >
              <span className="nav-index">0{index + 1}</span>
              {t.nav[section]}
            </button>
          ))}
        </div>

        <div className="nav-tools">
          <button className={`icon-button language-button${isChanging ? ' is-changing' : ''}`} type="button" onClick={changeLanguage} aria-label={language === 'es' ? 'Switch language to English' : 'Cambiar idioma a español'}>
            <Globe size={16} aria-hidden="true" />
            <span>{language === 'es' ? 'EN' : 'ES'}</span>
          </button>
          <button className="icon-button theme-button" type="button" onClick={toggleDark} aria-label={darkMode ? (language === 'es' ? 'Activar modo claro' : 'Switch to light theme') : (language === 'es' ? 'Activar modo oscuro' : 'Switch to dark theme')}>
            <span className="theme-icon-stack" aria-hidden="true">
              <Moon className="theme-icon-moon" size={17} />
              <Sun className="theme-icon-sun" size={17} />
            </span>
          </button>
          <button className="icon-button menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? (language === 'es' ? 'Cerrar menú' : 'Close menu') : (language === 'es' ? 'Abrir menú' : 'Open menu')} onClick={() => setMenuOpen(open => !open)}>
            {menuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <div id="mobile-menu" className={`mobile-menu${menuOpen ? ' is-open' : ''}`} hidden={!menuOpen}>
        <div className="mobile-menu-inner wrap">
          {sections.map((section, index) => (
            <button key={section} className="mobile-nav-link" type="button" onClick={() => navigate(section)}>
              <span className="nav-index">0{index + 1}</span>{t.nav[section]}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
