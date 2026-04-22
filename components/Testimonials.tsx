"use client";

import { useTheme } from '@/context/ThemeContext';

export default function Testimonials() {
  const { darkMode, language, isChanging, t, c, T } = useTheme();

  const cardBg     = darkMode ? '#16162a' : '#ffffff';
  const cardBorder = darkMode ? '#2a2a45'  : '#e8e4fc';

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
    const centerX = rect.width  / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / 35;
    const rotateY =  (x - centerX) / 35;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
    card.classList.add('hovering');
  };

  const resetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    card.classList.remove('hovering');
  };

  return (
    <section id="testimonios" style={{ padding: '100px 0', position: 'relative', overflow: 'hidden', background: 'transparent', transition: T }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>

        <div style={{ textAlign: 'center', marginBottom: 60 }} className="reveal">
          <div
            className={`pill fade-t ${isChanging ? 'lang-out' : 'lang-in'}`}
            style={{ display: 'inline-flex', background: c.pill.bg, border: `1px solid ${c.pill.border}`, color: c.pill.color, transition: T }}
          >
            {t.testiPill}
          </div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 50, fontWeight: 800, color: c.text, marginBottom: 10, transition: T }}>
            <span key={language + 'tt'} className="fade-text">{t.testiTitle}</span>
            <span className="grad">{t.testiTitleGrad}</span>
          </h2>
          <p key={language + 'td'} className="fade-text" style={{ color: c.textMuted, fontSize: 15, transition: T }}>
            {t.testiDesc}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 22, alignItems: 'stretch' }}>
          {t.testimonials.map((testi, i) => (
            <div
              key={i}
              className={`testimonial-card glass reveal reveal-d${i + 1}`}
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
              style={{
                borderRadius: 20, padding: 28,
                position: 'relative', overflow: 'hidden',
                background: cardBg, border: `1.5px solid ${cardBorder}`,
                transition: 'box-shadow 0.35s ease, border-color 0.35s ease',
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
                height: '100%', boxSizing: 'border-box',
              }}
            >
              <div className="testi-quote" style={{ color: darkMode ? '#2a2a45' : undefined }}>"</div>

              <div>
                <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
                  {[...Array(5)].map((_, j) => (
                    <span key={j} style={{ color: '#a855f7', fontSize: 14 }}>★</span>
                  ))}
                </div>
                <p key={language + 'tm' + i} className="fade-text" style={{ fontSize: 14, lineHeight: 1.8, color: c.textSoft, transition: T }}>
                  "{testi.text}"
                </p>
              </div>

              <div className="testi-author" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: c.text, transition: T }}>{testi.name}</div>
                  <div
                    key={language + 'tr' + i}
                    className={`fade-t ${isChanging ? 'lang-out' : 'lang-in'}`}
                    style={{ fontSize: 12, fontWeight: 600, color: '#7c3aed' }}
                  >
                    {testi.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}