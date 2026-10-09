"use client";

import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';

const skillCards = [
  { skills: ['Python', 'Java', 'JavaScript', 'HTML5', 'CSS3'] },
  { skills: ['Next.js', 'Tailwind CSS', 'TypeScript', 'React'] },
  { skills: ['Django', 'Java', 'API REST'] },
  { skills: ['Git & GitHub', 'Figma', 'VS Code', 'Postman'] },
];

export default function About() {
  const { language, isChanging, t } = useTheme();

  return (
    <section id="acerca" className="section section-anchor">
      <div className="wrap about-grid">
        <div className="about-portrait" data-reveal>
          <Image src="/foto mia traje.jpeg" alt={language === 'es' ? 'Retrato de Daniel Mafla' : 'Portrait of Daniel Mafla'} fill sizes="(max-width: 760px) 100vw, 440px" />
          <span className="about-image-note">DANIEL MAFLA <span>·</span> 2026</span>
        </div>

        <div className="about-copy" data-reveal>
          <p className="section-kicker">{t.aboutPill}</p>
          <h2 className="section-title">{t.aboutTitle}<span className="heading-period">.</span></h2>
          <p className={`body-copy${isChanging ? ' is-changing' : ''}`}>{t.aboutP1}</p>
          <p className={`body-copy${isChanging ? ' is-changing' : ''}`}>{t.aboutP2}</p>

          <div className="skills-list">
            {skillCards.map((card, index) => (
              <div className="skill-row" key={t.skillTitles[index]}>
                <span className="skill-index">0{index + 1}</span>
                <h3>{t.skillTitles[index]}</h3>
                <ul className="skill-list">
                  {card.skills.map(skill => <li key={skill}>{skill}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
