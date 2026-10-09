"use client";

import Image from 'next/image';
import { ArrowDownRight, ArrowRight, Download } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function Hero() {
  const { language, t } = useTheme();

  return (
    <section id="inicio" className="hero section-anchor">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-mark" />{t.available}</p>
          <h1>Daniel<br /><span className="serif-word">Mafla</span><span className="heading-period">.</span></h1>
          <p className="hero-role">{language === 'es' ? 'Estudiante de Ingeniería de Software' : 'Software Engineering Student'}</p>
          <p className="hero-description">{t.heroDesc}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#proyectos">
              {language === 'es' ? 'Explorar proyectos' : 'Explore projects'}<ArrowRight size={17} aria-hidden="true" />
            </a>
            <a className="button button-secondary" href="/cv.pdf" download>
              <Download size={16} aria-hidden="true" />{t.downloadCV}
            </a>
          </div>
          <a className="hero-contact-link" href="#contacto">
            {language === 'es' ? 'Hablemos de una idea' : 'Let’s talk about an idea'}<ArrowDownRight size={15} aria-hidden="true" />
          </a>
        </div>

        <div className="hero-visual" aria-label={language === 'es' ? 'Retrato de Daniel Mafla' : 'Portrait of Daniel Mafla'}>
          <div className="portrait-frame">
            <Image
              src="/foto mia traje.jpeg"
              alt={language === 'es' ? 'Daniel Mafla con traje' : 'Daniel Mafla wearing a suit'}
              fill
              priority
              sizes="(max-width: 760px) 72vw, 390px"
              className="portrait-image"
            />
          </div>
          <span className="portrait-index">FIG. 01 / DANIEL M.</span>
          <span className="portrait-caption">Pasto, Colombia <span>—</span> {t.inProgress}</span>
          <span className="hero-orbit" aria-hidden="true">DM<span>✳</span></span>
        </div>
      </div>
      <div className="hero-bottomline wrap" aria-hidden="true"><span>{language === 'es' ? 'PORTAFOLIO' : 'PORTFOLIO'} 2026</span><span>{language === 'es' ? 'INGENIERÍA · CREATIVIDAD · CÓDIGO' : 'ENGINEERING · CREATIVITY · CODE'}</span></div>
    </section>
  );
}
