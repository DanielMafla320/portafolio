"use client";

import { useTheme } from '@/context/ThemeContext';

const projectMeta = [
  { img: '/reproductor xsound.png', tags: ['Typescript', 'CSS'], link: 'https://reproductor-musica-delta.vercel.app/', comingSoon: false },
  { img: 'https://images.unsplash.com/photo-1661246627162-feb0269e0c07?w=600&q=80', tags: ['TypeScript', 'CSS'], comingSoon: true },
];

export default function Projects() {
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
    <section id="proyectos" style={{ padding: '100px 0', position: 'relative', overflow: 'hidden', background: 'transparent', transition: T }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>

        <div style={{ textAlign: 'center', marginBottom: 60 }} className="reveal">
          <div
            className={`pill fade-t ${isChanging ? 'lang-out' : 'lang-in'}`}
            style={{ display: 'inline-flex', background: c.pill.bg, border: `1px solid ${c.pill.border}`, color: c.pill.color, transition: T }}
          >
            {t.projectsPill}
          </div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 50, fontWeight: 800, color: c.text, marginBottom: 10, transition: T }}>
            <span className="grad">{t.projectsTitle}</span>
          </h2>
          <p key={language + 'pd'} className="fade-text" style={{ color: c.textMuted, fontSize: 15, transition: T }}>
            {t.projectsDesc}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 22 }}>
          {t.projects.map((p, i) => {
            const meta = projectMeta[i];
            return (
              <div
                key={i}
                className={`proj-card glass reveal reveal-d${i + 1}`}
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
                onClick={() => { if (!meta.comingSoon && meta.link) window.open(meta.link, '_blank'); }}
                style={{ cursor: meta.comingSoon ? 'not-allowed' : 'pointer', background: cardBg, border: `1.5px solid ${cardBorder}`, transition: T }}
              >
                <div className="proj-card-img">
                  <img src={meta.img} alt={p.title} />
                  <div className="proj-card-overlay">
                    <span className="proj-card-overlay-text">→ {meta.comingSoon ? t.projectSoon : t.projectCta}</span>
                  </div>
                </div>
                <div style={{ padding: '20px 22px 22px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: c.text, transition: T }}>{p.title}</h3>
                    <span className="proj-live-dot">Live</span>
                  </div>
                  <p key={language + 'proj' + i} className="fade-text" style={{ fontSize: 13, color: c.textMuted, lineHeight: 1.65, marginBottom: 16, transition: T }}>
                    {p.desc}
                  </p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {meta.tags.map(tag => (
                      <span key={tag} className="proj-tag" style={{ background: c.badge.bg, border: `1px solid ${c.badge.border}`, color: c.badge.color, transition: T }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}