"use client";

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
    <section id="acerca" className="section section-anchor about-section">
      <div className="wrap about-editorial">
        <header className="about-heading" data-reveal>
          <p className="section-kicker">{t.aboutPill}</p>
          <h2 className="section-title">{t.aboutTitle}<span className="heading-period">.</span></h2>
        </header>

        <figure className="about-art" data-reveal aria-hidden="true">
          <svg className="about-artwork" viewBox="0 0 600 560" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="art-plane" d="M93 435 209 135 466 102 522 345 378 473 173 500Z" />
            <path className="art-contour" d="M81 446C144 358 151 257 230 183c59-56 133-76 198-46 58 26 86 79 71 129-12 41-49 69-89 72-37 3-68-18-75-49-6-25 7-49 28-63" />
            <path className="art-ribbon-under" d="M109 456c58-92 75-194 146-266 58-58 136-82 203-52 66 29 100 91 81 151-14 47-57 80-105 82-45 2-82-24-90-61-7-29 7-58 32-74" />
            <path className="art-ribbon" d="M109 456c58-92 75-194 146-266 58-58 136-82 203-52 66 29 100 91 81 151-14 47-57 80-105 82-45 2-82-24-90-61-7-29 7-58 32-74" />
            <path className="art-fold" d="m209 135 58 55m199-88-31 91m87 152-98-6M173 500l-7-66" />
            <path className="art-datum" d="M65 480h126m254-359h91M470 414v82" />
            <path className="art-detail" d="M446 454h42m-21-21v42" />
          </svg>
          <figcaption className="about-art-caption">
            <span>02 / {language === 'es' ? 'PERFIL' : 'PROFILE'}</span>
            <span>PASTO, COLOMBIA</span>
          </figcaption>
        </figure>

        <div className="about-copy" data-reveal>
          <p className={`body-copy${isChanging ? ' is-changing' : ''}`}>{t.aboutP1}</p>
          <p className={`body-copy${isChanging ? ' is-changing' : ''}`}>{t.aboutP2}</p>
        </div>

        <section className="about-skills" aria-labelledby="about-skills-title">
          <header className="skills-heading" data-reveal>
            <p className="skills-overline">{language === 'es' ? 'HABILIDADES' : 'SKILLS'}</p>
            <h3 id="about-skills-title">{language === 'es' ? 'Tecnologías' : 'Technologies'}<span className="heading-period">.</span></h3>
          </header>

          <div className="skills-list">
            {skillCards.map((card, index) => (
              <div className="skill-row" key={t.skillTitles[index]} data-reveal>
                <span className="skill-index" aria-hidden="true">0{index + 1}</span>
                <h4>{t.skillTitles[index]}</h4>
                <ul className="skill-list">
                  {card.skills.map(skill => <li key={skill}>{skill}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
