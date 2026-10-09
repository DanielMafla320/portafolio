"use client";

import Image from 'next/image';
import { ArrowUpRight, AudioLines, Clock3 } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const projectDetails = [
  { number: '01', image: '/reproductor xsound.png', tags: ['TypeScript', 'CSS'], href: 'https://reproductor-musica-delta.vercel.app/', status: 'live' },
  { number: '02', image: null, tags: ['TypeScript', 'CSS'], href: null, status: 'upcoming' },
] as const;

export default function Projects() {
  const { language, t } = useTheme();

  return (
    <section id="proyectos" className="section section-tinted section-anchor">
      <div className="wrap">
        <div className="section-heading section-heading-split">
          <div>
            <p className="section-kicker">{t.projectsPill}</p>
            <h2 className="section-title">{t.projectsTitle}<span className="heading-period">.</span></h2>
          </div>
          <p className="section-intro">{t.projectsDesc}</p>
        </div>

        <div className="projects-list">
          {t.projects.map((project, index) => {
            const detail = projectDetails[index];
            const content = (
              <>
                <div className={`project-art${detail.image ? '' : ' project-art-saborify'}`}>
                  {detail.image ? (
                    <Image src={detail.image} alt={language === 'es' ? `Vista del proyecto ${project.title}` : `${project.title} project preview`} fill sizes="(max-width: 760px) 100vw, 48vw" />
                  ) : (
                    <div className="saborify-mark" aria-hidden="true"><span>S</span><i /><i /><i /></div>
                  )}
                  <span className="project-number">{detail.number}</span>
                  <span className="project-art-caption">{detail.status === 'live' ? 'MUSIC PLAYER' : 'AI · RECIPES'}</span>
                </div>
                <div className="project-content">
                  <div className="project-topline">
                    <p className="mono-label">PROJECT / {detail.number}</p>
                    <span className={`project-status${detail.status === 'upcoming' ? ' is-upcoming' : ''}`}>
                      {detail.status === 'live' ? <AudioLines size={14} aria-hidden="true" /> : <Clock3 size={14} aria-hidden="true" />}
                      {detail.status === 'live' ? (language === 'es' ? 'Publicado' : 'Live') : t.projectSoon}
                    </span>
                  </div>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.desc}</p>
                  <div className="project-bottomline">
                    <ul className="project-tags" aria-label={language === 'es' ? 'Tecnologías' : 'Technologies'}>
                      {detail.tags.map(tag => <li key={tag}>{tag}</li>)}
                    </ul>
                    {detail.href ? (
                      <span className="project-link-label">{t.projectCta}<ArrowUpRight size={16} aria-hidden="true" /></span>
                    ) : (
                      <span className="project-link-label project-link-muted">{language === 'es' ? 'En desarrollo' : 'In development'}</span>
                    )}
                  </div>
                </div>
              </>
            );

            return detail.href ? (
              <a className="project-row" href={detail.href} key={project.title} target="_blank" rel="noreferrer noopener" aria-label={`${project.title} — ${t.projectCta} (opens in a new tab)`}>
                {content}
              </a>
            ) : (
              <article className="project-row is-not-link" key={project.title} aria-label={`${project.title} — ${t.projectSoon}`}>
                {content}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
