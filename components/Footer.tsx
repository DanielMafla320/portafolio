"use client";

import { Mail, Phone, MapPin } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useTheme } from '@/context/ThemeContext';

export default function Footer() {
  const { darkMode, language, isChanging, t, c, T } = useTheme();

  return (
    <footer style={{ background: darkMode ? '#08080f' : '#ede9fe', borderTop: `1px solid ${c.border}`, padding: '60px 0 28px', transition: T }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, marginBottom: 48 }}>

          {/* Brand */}
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 14 }}>
              <span style={{ color: c.text, transition: T }}>Daniel </span>
              <span className="grad">Mafla</span>
            </div>
            <p key={language + 'fd'} className="fade-text" style={{ fontSize: 13, color: c.textMuted, lineHeight: 1.75, transition: T }}>
              {t.footerDesc}
            </p>
          </div>

          {/* Habilidades */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: c.text, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16, transition: T }}>
              <span className={`fade-t ${isChanging ? 'lang-out' : 'lang-in'}`}>{t.footerSkillsTitle}</span>
            </div>
            {t.footerSkills.map(s => (
              <div
                key={s}
                style={{ fontSize: 13, color: c.textMuted, marginBottom: 9, cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#7c3aed')}
                onMouseLeave={e => (e.currentTarget.style.color = c.textMuted)}
              >
                {s}
              </div>
            ))}
          </div>

          {/* Contacto */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: c.text, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16, transition: T }}>
              <span className={`fade-t ${isChanging ? 'lang-out' : 'lang-in'}`}>{t.footerContactTitle}</span>
            </div>
            {[
              { Icon: Mail,   v: 'danielmafla320@gmail.com' },
              { Icon: Phone,  v: '+57 300 136 2838' },
              { Icon: MapPin, v: 'Pasto, Colombia' },
            ].map(({ Icon, v }) => (
              <div
                key={v}
                style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: c.textMuted, marginBottom: 10, cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#7c3aed')}
                onMouseLeave={e => (e.currentTarget.style.color = c.textMuted)}
              >
                <Icon size={14} />{v}
              </div>
            ))}
          </div>

          {/* Redes */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: c.text, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10, transition: T }}>
              <span className={`fade-t ${isChanging ? 'lang-out' : 'lang-in'}`}>{t.footerFollowTitle}</span>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { href: 'https://github.com/DanielMafla320', Icon: FaGithub },
                { href: 'https://www.linkedin.com/in/daniel-mafla-782541317/?skipRedirect=true', Icon: FaLinkedin },
              ].map(({ href, Icon }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer">
                  <div className="social-btn" style={{ background: c.socialBtn.bg, border: `1px solid ${c.socialBtn.border}`, color: c.socialBtn.color, transition: T }}>
                    <Icon size={20} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: 24, textAlign: 'center', transition: T }}>
          <p key={language + 'fr'} className="fade-text" style={{ fontSize: 13, color: c.textMuted, transition: T }}>
            {t.footerRights}
          </p>
        </div>
      </div>
    </footer>
  );
}