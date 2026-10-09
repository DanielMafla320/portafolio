"use client";

import { useTheme } from '@/context/ThemeContext';

export default function Experience() {
  const { t } = useTheme();

  return (
    <section id="experiencia" className="section section-tinted section-anchor">
      <div className="wrap">
        <div className="section-heading section-heading-split" data-reveal>
          <div>
            <p className="section-kicker">{t.expPill}</p>
            <h2 className="section-title">{t.expTitle}{t.expTitleGrad}<span className="heading-period">.</span></h2>
          </div>
          <p className="section-intro">{t.expDesc}</p>
        </div>

        <ol className="experience-list">
          {t.experience.map((item, index) => (
            <li className="experience-item" key={`${item.date}-${item.title}`} data-reveal>
              <span className="experience-index">0{index + 1}</span>
              <article className="experience-entry">
                <div className="experience-meta"><span>{item.type}</span><time>{item.date}</time></div>
                <h3>{item.title}</h3>
                <p className="experience-company">{item.company}</p>
                <p className="experience-description">{item.desc}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
