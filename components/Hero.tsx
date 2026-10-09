"use client";

import Image from 'next/image';
import { ArrowDownRight, ArrowRight, Download } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function Hero() {
  const { language, t } = useTheme();

  return (
    <section id="inicio" className="hero section-anchor">
      <div className="wrap hero-masthead" data-reveal="hero">
        <p className="eyebrow"><span className="eyebrow-mark" />{t.available}</p>
        <p className="hero-edition">{language === 'es' ? 'PORTAFOLIO PERSONAL' : 'PERSONAL PORTFOLIO'} <span>—</span> 2026</p>
        <p className="hero-location">PASTO, COLOMBIA</p>
      </div>

      <div className="wrap hero-composition">
        <div className="hero-stage" data-reveal="hero">
          <span className="hero-index" aria-hidden="true">01 / {language === 'es' ? 'INICIO' : 'HOME'}</span>
          <h1 className="hero-name">
            <span className="hero-name-first">Daniel</span>
            <span className="hero-name-last">Mafla<span className="heading-period">.</span></span>
          </h1>

          <figure className="hero-portrait">
            <div className="portrait-frame">
              <Image
                src="/foto mia traje.jpeg"
                alt={language === 'es' ? 'Retrato de Daniel Mafla con traje' : 'Portrait of Daniel Mafla wearing a suit'}
                fill
                priority
                sizes="(max-width: 520px) 60vw, (max-width: 780px) 30vw, 280px"
                className="portrait-image"
              />
            </div>
            <figcaption><span>FIG. 01</span>{language === 'es' ? 'Un retrato, Pasto' : 'A portrait, Pasto'}</figcaption>
          </figure>

          <div className="hero-intro">
            <p className="hero-role">{language === 'es' ? 'Estudiante de Ingeniería de Software' : 'Software Engineering Student'}</p>
            <p className="hero-description">{t.heroDesc}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#proyectos">
                {language === 'es' ? 'Explorar proyectos' : 'Explore projects'}<ArrowRight size={17} aria-hidden="true" />
              </a>
              <a className="button button-secondary" href="#contacto">
                {language === 'es' ? 'Contacto' : 'Contact'}<ArrowDownRight size={16} aria-hidden="true" />
              </a>
            </div>
            <a className="hero-cv-link" href="/cv.pdf" download><Download size={14} aria-hidden="true" />{t.downloadCV}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
