"use client";

import Image from 'next/image';
import { ArrowUpRight, AudioLines, Clock3 } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const projectDetails = [
  { number: '01', image: '/reproductor xsound.png', tags: ['TypeScript', 'CSS'], href: 'https://reproductor-musica-delta.vercel.app/', status: 'published' },
  { number: '02', image: null, tags: ['TypeScript', 'CSS'], href: null, status: 'in-progress' },
] as const;

export default function Projects() {
  const { language, t } = useTheme();

  return (
    <section id="proyectos" className="section section-tinted section-anchor">
      <div className="wrap">
        <div className="section-heading section-heading-split" data-reveal>
          <div>
            <p className="section-kicker">{t.projectsPill}</p>
            <h2 className="section-title">{t.projectsTitle}<span className="heading-period">.</span></h2>
          </div>
          <p className="section-intro">{t.projectsDesc}</p>
        </div>

        <div className="projects-composition">
          {t.projects.map((project, index) => {
            const detail = projectDetails[index];
            const isPublished = detail.status === 'published';

            return (
              <article className={`project-entry${index === 0 ? ' project-entry-feature' : ' project-entry-secondary'}`} key={project.title} data-reveal>
                <div className={`project-art${detail.image ? '' : ' project-art-saborify'}`}>
                  {detail.image ? (
                    <Image src={detail.image} alt={language === 'es' ? `Captura del proyecto ${project.title}` : `${project.title} project screenshot`} fill sizes="(max-width: 760px) 100vw, (max-width: 1050px) 62vw, 700px" />
                  ) : (
                    <div className="saborify-mark" aria-hidden="true"><span>S</span><i /><i /><i /></div>
                  )}
                  <span className="project-number">{detail.number} / 02</span>
                  <span className="project-art-caption">{isPublished ? (language === 'es' ? 'REPRODUCTOR DE MÚSICA' : 'MUSIC PLAYER') : (language === 'es' ? 'RECETAS · INTELIGENCIA ARTIFICIAL' : 'RECIPES · ARTIFICIAL INTELLIGENCE')}</span>
                </div>

                <div className="project-content">
                  <div className="project-topline">
                    <p className="mono-label">{language === 'es' ? 'PROYECTO' : 'PROJECT'} / {detail.number}</p>
                    <span className={`project-status${isPublished ? '' : ' is-upcoming'}`}>
                      {isPublished ? <AudioLines size={14} aria-hidden="true" /> : <Clock3 size={14} aria-hidden="true" />}
                      {isPublished ? (language === 'es' ? 'Publicado' : 'Published') : (language === 'es' ? 'En desarrollo' : 'In development')}
                    </span>
                  </div>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.desc}</p>
                  <div className="project-bottomline">
                    <ul className="project-tags" aria-label={language === 'es' ? 'Tecnologías' : 'Technologies'}>
                      {detail.tags.map(tag => <li key={tag}>{tag}</li>)}
                    </ul>
                    {detail.href ? (
                      <a className="project-link-label" href={detail.href} target="_blank" rel="noopener noreferrer" aria-label={`${project.title}, ${t.projectCta}; ${language === 'es' ? 'se abre en una pestaña nueva' : 'opens in a new tab'}`}>
                        <span>{t.projectCta}</span><ArrowUpRight size={16} aria-hidden="true" />
                      </a>
                    ) : (
                      <span className="project-link-muted">{t.projectSoon}</span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
