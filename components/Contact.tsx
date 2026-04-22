"use client";

import { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, XCircle, Loader } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { useTheme } from '@/context/ThemeContext';
import { SendStatus } from '@/types';

const EMAILJS_SERVICE_ID  = 'service_sbytjxj';
const EMAILJS_TEMPLATE_ID = 'template_ulhhlwb';
const EMAILJS_PUBLIC_KEY  = '4o1gDlG0O3pRDalfm';

export default function Contact() {
  const { darkMode, language, isChanging, t, c, T } = useTheme();

  const [formName,    setFormName]    = useState('');
  const [formEmail,   setFormEmail]   = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [sendStatus,  setSendStatus]  = useState<SendStatus>('idle');
  const formRef = useRef<HTMLDivElement>(null);

  const isFormEmpty = !formName.trim() || !formEmail.trim() || !formMessage.trim();

  const handleSend = async () => {
    if (isFormEmpty) return;
    setSendStatus('sending');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { from_name: formName, from_email: formEmail, message: formMessage },
        EMAILJS_PUBLIC_KEY,
      );
      setSendStatus('success');
      setFormName('');
      setFormEmail('');
      setFormMessage('');
      setTimeout(() => setSendStatus('idle'), 4000);
    } catch {
      setSendStatus('error');
      setTimeout(() => setSendStatus('idle'), 4000);
    }
  };

  const sendBtnContent = () => {
    if (sendStatus === 'sending') return <><Loader size={17} style={{ animation: 'spin 1s linear infinite' }} /><span>{t.sendingText}</span></>;
    if (sendStatus === 'success') return <><CheckCircle size={17} /><span>{t.successText}</span></>;
    if (sendStatus === 'error')   return <><XCircle size={17} /><span>{t.errorText}</span></>;
    return (
      <>
        <Send size={17} />
        <span className={`fade-t ${isChanging ? 'lang-out' : 'lang-in'}`}>{t.contactSend}</span>
      </>
    );
  };

  const sendBtnBg =
    sendStatus === 'success' ? 'linear-gradient(135deg, #16a34a, #22c55e)' :
    sendStatus === 'error'   ? 'linear-gradient(135deg, #dc2626, #ef4444)' :
    'linear-gradient(135deg, #7c3aed, #a855f7)';

  const cardStyle: React.CSSProperties = {
    background: darkMode ? '#16162a' : '#ffffff',
    border: `1.5px solid ${darkMode ? '#2a2a45' : '#e8e4fc'}`,
    borderRadius: 22,
    boxShadow: darkMode ? '0 4px 32px #00000050' : '0 4px 24px #7c3aed08',
    transition: T,
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 16px', borderRadius: 12, fontSize: 14,
    background: c.contactInput.bg, border: `1.5px solid ${c.contactInput.border}`,
    color: c.text, outline: 'none', fontFamily: "'Plus Jakarta Sans', sans-serif",
    transition: T, boxSizing: 'border-box', display: 'block',
  };

  return (
    <section id="contacto" style={{ padding: '100px 0', position: 'relative', overflow: 'hidden', background: 'transparent', transition: T }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>

        <div style={{ textAlign: 'center', marginBottom: 60 }} className="reveal">
          <div
            className={`pill fade-t ${isChanging ? 'lang-out' : 'lang-in'}`}
            style={{ display: 'inline-flex', background: c.pill.bg, border: `1px solid ${c.pill.border}`, color: c.pill.color, transition: T }}
          >
            {t.contactPill}
          </div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 50, fontWeight: 800, color: c.text, marginBottom: 10, transition: T }}>
            <span className="grad">{t.contactTitle}</span>
          </h2>
          <p key={language + 'cd'} className="fade-text" style={{ color: c.textMuted, fontSize: 15, transition: T }}>
            {t.contactDesc}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28 }}>

          {/* Formulario */}
          <div ref={formRef} className="reveal reveal-d1" style={{ ...cardStyle, padding: 36, position: 'relative', overflow: 'hidden' }}>

            {sendStatus === 'success' && (
              <div style={{ position: 'absolute', inset: 0, zIndex: 10, borderRadius: 22, background: darkMode ? 'rgba(11,11,22,0.97)' : 'rgba(255,255,255,0.97)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, animation: 'fadeInUp 0.4s ease' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #16a34a, #22c55e)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 32px #22c55e55' }}>
                  <CheckCircle size={32} color="#fff" />
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, color: c.text }}>{t.successText}</div>
                <div style={{ fontSize: 14, color: c.textMuted }}>{t.successSub}</div>
              </div>
            )}

            {sendStatus === 'error' && (
              <div style={{ position: 'absolute', inset: 0, zIndex: 10, borderRadius: 22, background: darkMode ? 'rgba(11,11,22,0.97)' : 'rgba(255,255,255,0.97)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, animation: 'fadeInUp 0.4s ease' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #dc2626, #ef4444)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 32px #ef444455' }}>
                  <XCircle size={32} color="#fff" />
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, color: c.text }}>{t.errorText}</div>
                <div style={{ fontSize: 14, color: c.textMuted }}>{t.errorSub}</div>
              </div>
            )}

            <h3 style={{ fontSize: 22, fontWeight: 700, color: c.text, marginBottom: 28, transition: T }}>
              <span className={`fade-t ${isChanging ? 'lang-out' : 'lang-in'}`}>{t.contactFormTitle}</span>
            </h3>

            <label style={{ color: c.textMuted, display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 600 }}>
              <span className={`fade-t ${isChanging ? 'lang-out' : 'lang-in'}`}>{t.contactName}</span>
            </label>
            <input
              style={{ ...inputStyle, marginBottom: 18 }}
              type="text" placeholder={t.contactNamePH}
              value={formName} onChange={e => setFormName(e.target.value)}
              disabled={sendStatus === 'sending'}
            />

            <label style={{ color: c.textMuted, display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 600 }}>
              {t.contactEmail}
            </label>
            <input
              style={{ ...inputStyle, marginBottom: 18 }}
              type="email" placeholder={t.contactEmailPH}
              value={formEmail} onChange={e => setFormEmail(e.target.value)}
              disabled={sendStatus === 'sending'}
            />

            <label style={{ color: c.textMuted, display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 600 }}>
              <span className={`fade-t ${isChanging ? 'lang-out' : 'lang-in'}`}>{t.contactMsg}</span>
            </label>
            <textarea
              style={{ ...inputStyle, resize: 'vertical', marginBottom: 22 }}
              placeholder={t.contactMsgPH} rows={5}
              value={formMessage} onChange={e => setFormMessage(e.target.value)}
              disabled={sendStatus === 'sending'}
            />

            <button
              onClick={handleSend}
              disabled={sendStatus === 'sending' || isFormEmpty}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '14px 28px', borderRadius: 14, border: 'none',
                background: isFormEmpty ? (darkMode ? '#2a2a45' : '#e8e4fc') : sendBtnBg,
                color: isFormEmpty ? c.textMuted : '#fff',
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700,
                cursor: isFormEmpty || sendStatus === 'sending' ? 'not-allowed' : 'pointer',
                transition: 'all 0.35s ease',
                boxShadow: isFormEmpty ? 'none' : '0 6px 24px #7c3aed33',
                opacity: sendStatus === 'sending' ? 0.85 : 1,
                width: '100%', justifyContent: 'center',
              }}
            >
              {sendBtnContent()}
            </button>
          </div>

          {/* Info + Redes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

            {/* Información de contacto */}
            <div className="reveal reveal-d2" style={{ ...cardStyle, padding: 28 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: c.text, marginBottom: 6, transition: T }}>
                <span className={`fade-t ${isChanging ? 'lang-out' : 'lang-in'}`}>{t.contactInfoTitle}</span>
              </h3>
              <p key={language + 'cid'} className="fade-text" style={{ fontSize: 13, color: c.textMuted, marginBottom: 24, transition: T }}>
                {t.contactInfoDesc}
              </p>
              {[
                { Icon: Mail,   value: 'danielmafla320@gmail.com' },
                { Icon: Phone,  value: '+57 300 136 2838' },
                { Icon: MapPin, value: 'Pasto, Colombia' },
              ].map(({ Icon, value }, idx, arr) => (
                <div key={value} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: idx < arr.length - 1 ? `1px solid ${c.borderLight}` : 'none', transition: T }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: c.iconCircle, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: T }}>
                    <Icon size={18} style={{ color: '#7c3aed' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: c.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', transition: T }}>
                      <span className={`fade-t ${isChanging ? 'lang-out' : 'lang-in'}`}>{t.contactLabels[idx]}</span>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: c.text, transition: T }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Redes sociales */}
            <div className="reveal reveal-d3" style={{ ...cardStyle, padding: 28 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: c.text, marginBottom: 18, transition: T }}>
                <span className={`fade-t ${isChanging ? 'lang-out' : 'lang-in'}`}>{t.socialTitle}</span>
              </h3>
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
        </div>
      </div>
    </section>
  );
}