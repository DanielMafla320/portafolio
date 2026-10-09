"use client";

import { useTheme } from '@/context/ThemeContext';

export default function Testimonials() {
  const { language, t } = useTheme();

  return (
    <section id="testimonios" className="section section-anchor">
      <div className="wrap">
        <div className="section-heading section-heading-split">
          <div>
            <p className="section-kicker">{t.testiPill}</p>
            <h2 className="section-title">{t.testiTitle}{t.testiTitleGrad}<span className="heading-period">.</span></h2>
          </div>
          <p className="section-intro">{t.testiDesc}</p>
        </div>

        <div className="testimonials-grid">
          {t.testimonials.map((testimonial, index) => (
            <figure className={`testimonial${index === 0 ? ' testimonial-featured' : ''}`} key={testimonial.name}>
              <span className="testimonial-index">0{index + 1} / {language === 'es' ? 'NOTA' : 'NOTE'}</span>
              <blockquote>{testimonial.text}</blockquote>
              <figcaption>
                <span className="testimonial-initial" aria-hidden="true">{testimonial.name.charAt(0)}</span>
                <span><strong>{testimonial.name}</strong><small>{testimonial.role}</small></span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
