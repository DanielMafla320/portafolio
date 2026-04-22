"use client";

import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function Hero() {
  const { darkMode, isChanging, t, c, T } = useTheme();
  const [text, setText]           = useState('');
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => setDownloading(false), 600);
  };

  useEffect(() => {
    const words = ['Software Engineering Student', 'Frontend Developer', 'Backend Developer', 'Problem Solver'];
    let wordIndex = 0, charIndex = 0, isDeleting = false;
    const type = () => {
      const w = words[wordIndex];
      if (isDeleting) { setText(w.substring(0, charIndex - 1)); charIndex--; }
      else            { setText(w.substring(0, charIndex + 1)); charIndex++; }
      if (!isDeleting && charIndex === w.length) setTimeout(() => (isDeleting = true), 1500);
      else if (isDeleting && charIndex === 0)    { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; }
    };
    const iv = setInterval(type, isDeleting ? 40 : 80);
    return () => clearInterval(iv);
  }, []);

  return (
    <section id="inicio" style={{ padding: '110px 0', position: 'relative', overflow: 'hidden', background: 'transparent', transition: T }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 24px',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 80, alignItems: 'center', position: 'relative',
      }}>
        {/* Texto */}
        <div>
          <div
            className={`pill fade-t ${isChanging ? 'lang-out' : 'lang-in'}`}
            style={{ background: c.pill.bg, border: `1px solid ${c.pill.border}`, color: c.pill.color, transition: T }}
          >
            {t.available}
          </div>

          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(42px, 8vw, 76px)', fontWeight: 800, lineHeight: 1, color: c.text, marginBottom: 16, transition: T }}>
            Daniel<br /><span className="grad">Mafla</span>
          </h1>

          <h2 style={{ fontSize: 20, fontWeight: 600, color: darkMode ? '#a78bfa' : '#7c3aed', marginBottom: 24, transition: T }}>
            {text}<span className="cursor">|</span>
          </h2>

          <p
            key={`hero-desc`}
            className="fade-text"
            style={{ fontSize: 15, lineHeight: 1.85, color: c.textSoft, marginBottom: 36, maxWidth: 460, transition: T }}
          >
            {t.heroDesc}
          </p>

          <a href="/cv.pdf" download onClick={handleDownload}>
            <button className={`btn-primary ${downloading ? 'download-anim' : ''}`}>
              <Download size={18} />
              <span className={`fade-t ${isChanging ? 'lang-out' : 'lang-in'}`}>{t.downloadCV}</span>
            </button>
          </a>
        </div>

        {/* Foto */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative' }}>
            <div
              className="profile-img"
              style={{
                width: 340, height: 340, borderRadius: '50%', padding: 3,
                background: 'linear-gradient(135deg, #7c3aed, #a855f7, #c084fc)',
                boxShadow: darkMode
                  ? '0 0 80px #7c3aed45, 0 0 140px #a855f730'
                  : '0 0 80px #7c3aed25, 0 0 140px #a855f715',
                animation: 'float 4s ease-in-out infinite',
              }}
            >
              <div
                className="img-inner"
                style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', background: darkMode ? '#1e1e38' : '#ede9fe' }}
              >
                <img src="/foto mia traje.jpeg" alt="Daniel Mafla" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>

            <div style={{
              position: 'absolute', bottom: 10, right: -24,
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
              borderRadius: 16, padding: '10px 18px',
              boxShadow: '0 8px 32px #7c3aed33',
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                <span className={`fade-t ${isChanging ? 'lang-out' : 'lang-in'}`}>{t.softEng}</span>
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>
                <span className={`fade-t ${isChanging ? 'lang-out' : 'lang-in'}`}>{t.inProgress}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}