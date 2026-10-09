"use client";

import { ArrowUpRight } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useTheme } from '@/context/ThemeContext';

export default function Footer() {
  const { language, t } = useTheme();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-main">
          <a className="footer-brand" href="#inicio">Daniel Mafla<span>.</span></a>
          <p>{t.footerDesc}</p>
          <div className="footer-socials">
            <a href="https://github.com/DanielMafla320" target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)"><FaGithub size={18} aria-hidden="true" /></a>
            <a href="https://www.linkedin.com/in/daniel-mafla-782541317/?skipRedirect=true" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)"><FaLinkedin size={18} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {year} Daniel Mafla. {language === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}</p>
          <a href="#inicio">{language === 'es' ? 'Volver al inicio' : 'Back to top'}<ArrowUpRight size={14} aria-hidden="true" /></a>
          <span>{language === 'es' ? 'Diseñado y desarrollado por Daniel' : 'Designed and built by Daniel'}</span>
        </div>
      </div>
    </footer>
  );
}
