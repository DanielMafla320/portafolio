"use client";

import { useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function About() {
  const { darkMode, language, isChanging, t, c, T } = useTheme();

  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-exp');
    const obs = new IntersectionObserver((entries, o) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          if (el.classList.contains('reveal-exp')) {
            const siblings = el.parentElement?.querySelectorAll('.reveal-exp');
            const idx = Array.from(siblings || []).indexOf(el);
            el.style.transitionDelay = `${idx * 120}ms`;
          }
          el.classList.add('active');
          o.unobserve(el);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => obs.observe(el));

    const imgWrap = document.querySelector('.about-img-wrap');
    const shimObs = new IntersectionObserver((entries, o) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.classList.add('shimmer-active');
          el.style.transform = 'scale(1.02)';
          o.unobserve(el);
        }
      });
    }, { threshold: 0.3 });
    if (imgWrap) shimObs.observe(imgWrap);

    return () => { obs.disconnect(); shimObs.disconnect(); };
  }, []);

  const skillCards = [
    { skills: ['Python', 'Java', 'JavaScript', 'HTML5', 'CSS3'] },
    { skills: ['Next.js', 'Tailwind CSS', 'TypeScript', 'React'] },
    { skills: ['Django', 'Next.js', 'API REST'] },
    { skills: ['Git & GitHub', 'Figma', 'VS Code', 'Postman'] },
  ];

  return (
    <section id="acerca" style={{ padding: '100px 0', position: 'relative', overflow: 'hidden', background: 'transparent', transition: T }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 24px',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 64, alignItems: 'start', position: 'relative',
      }}>

        {/* Imagen */}
        <div className="reveal reveal-d1">
          <div className="about-img-wrap">
            <img src="/foto mia traje.jpeg" alt="About" />
            <div style={{ position: 'absolute', inset: 0, background: c.aboutGrad, pointerEvents: 'none', transition: T }} />
            <div style={{ position: 'absolute', bottom: 24, left: 20, right: 20, display: 'flex', gap: 8, flexWrap: 'wrap', zIndex: 1 }}>
              {['Python', 'Java', 'Next.js', 'Django'].map(tag => (
                <span
                  key={tag}
                  style={{ background: c.tagBg, border: `1.5px solid ${c.tagBorder}`, borderRadius: 10, padding: '7px 13px', fontSize: 12, fontWeight: 700, color: c.tagColor, transition: T }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Texto y habilidades */}
        <div className="reveal reveal-d2">
          <div
            className={`pill fade-t ${isChanging ? 'lang-out' : 'lang-in'}`}
            style={{ background: c.pill.bg, border: `1px solid ${c.pill.border}`, color: c.pill.color, transition: T }}
          >
            {t.aboutPill}
          </div>

          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 50, fontWeight: 800, color: c.text, lineHeight: 1.08, marginBottom: 22, transition: T }}>
            <span className="grad-subtle">{t.aboutTitle}</span>
          </h2>

          <p key={language + 'p1'} className="fade-text" style={{ fontSize: 15, lineHeight: 1.85, color: c.textSoft, marginBottom: 14, transition: T }}>
            {t.aboutP1}
          </p>
          <p key={language + 'p2'} className="fade-text" style={{ fontSize: 15, lineHeight: 1.85, color: c.textSoft, marginBottom: 32, transition: T }}>
            {t.aboutP2}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {skillCards.map((card, i) => (
              <div
                key={i}
                className={`reveal reveal-d${i + 1}`}
                style={{
                  background: darkMode ? '#16162a' : '#ffffff',
                  border: `1.5px solid ${darkMode ? '#2a2a45' : '#e8e4fc'}`,
                  borderRadius: 18, padding: 18,
                  boxShadow: darkMode ? '0 2px 12px #00000030' : '0 2px 12px #7c3aed06',
                  transition: T,
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, color: '#7c3aed', letterSpacing: '0.09em', textTransform: 'uppercase', marginBottom: 12 }}>
                  <span className={`fade-t ${isChanging ? 'lang-out' : 'lang-in'}`}>{t.skillTitles[i]}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {card.skills.map(s => (
                    <span key={s} className="chip" style={{ background: c.chip.bg, border: `1px solid ${c.chip.border}`, color: c.chip.color, transition: T }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}