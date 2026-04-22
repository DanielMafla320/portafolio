"use client";

import { useTheme } from '@/context/ThemeContext';

export default function Experience() {
  const { darkMode, language, isChanging, t, c, T } = useTheme();

  return (
    <section id="experiencia" style={{ padding: '100px 0', position: 'relative', overflow: 'hidden', background: 'transparent', transition: T }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>

        <div style={{ textAlign: 'center', marginBottom: 60 }} className="reveal">
          <div
            className={`pill fade-t ${isChanging ? 'lang-out' : 'lang-in'}`}
            style={{ display: 'inline-flex', background: c.pill.bg, border: `1px solid ${c.pill.border}`, color: c.pill.color, transition: T }}
          >
            {t.expPill}
          </div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 50, fontWeight: 800, color: c.text, marginBottom: 10, transition: T }}>
            <span key={language + 'et'} className="fade-text">{t.expTitle}</span>
            <span className="grad-subtle">{t.expTitleGrad}</span>
          </h2>
          <p key={language + 'ed'} className="fade-text" style={{ color: c.textMuted, fontSize: 15, transition: T }}>
            {t.expDesc}
          </p>
        </div>

        <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative' }}>
          <div className="timeline-line" style={{ background: darkMode ? '#2a2a45' : '#e8e4fc', transition: T }} />

          {t.experience.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 28, marginBottom: 24, paddingLeft: 4 }}>
              {/* Dot */}
              <div style={{
                width: 26, height: 26, borderRadius: '50%',
                background: darkMode ? '#1e1e38' : '#ede9fe',
                border: '2px solid #7c3aed',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, marginTop: 6, zIndex: 1, transition: T,
                animation: 'pulseDot 2.4s ease-in-out infinite',
                animationDelay: `${i * 0.8}s`,
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#7c3aed' }} />
              </div>

              {/* Card */}
              <div
                className={`reveal reveal-d${i + 1}`}
                style={{
                  flex: 1,
                  background: darkMode ? '#16162a' : '#ffffff',
                  border: `1.5px solid ${darkMode ? '#2a2a45' : '#e8e4fc'}`,
                  borderRadius: 22,
                  boxShadow: darkMode ? '0 4px 32px #00000050' : '0 4px 24px #7c3aed08',
                  transition: T, padding: 24,
                  animation: `slideInLeft 0.55s cubic-bezier(0.22,1,0.36,1) both`,
                  animationDelay: `${0.1 + i * 0.15}s`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, color: '#7c3aed',
                    background: darkMode ? '#1e1e38' : '#ede9fe',
                    border: `1px solid ${darkMode ? '#3a3a60' : '#c4b5fd55'}`,
                    borderRadius: 8, padding: '4px 10px',
                    textTransform: 'uppercase', letterSpacing: '0.08em', transition: T,
                  }}>
                    {item.type}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: c.textMuted, transition: T }}>{item.date}</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: c.text, marginBottom: 4, transition: T }}>{item.title}</h3>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#7c3aed', marginBottom: 10 }}>{item.company}</div>
                <p key={language + 'exp' + i} className="fade-text" style={{ fontSize: 13, color: c.textMuted, lineHeight: 1.7, transition: T }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}