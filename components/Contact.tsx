"use client";

import { FormEvent, useState } from 'react';
import { ArrowUpRight, Check, LoaderCircle, Mail, MapPin, Phone, Send, X } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { useTheme } from '@/context/ThemeContext';
import { SendStatus } from '@/types';

const EMAILJS_SERVICE_ID = 'service_sbytjxj';
const EMAILJS_TEMPLATE_ID = 'template_ulhhlwb';
const EMAILJS_PUBLIC_KEY = '4o1gDlG0O3pRDalfm';

export default function Contact() {
  const { language, t } = useTheme();
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [sendStatus, setSendStatus] = useState<SendStatus>('idle');

  const handleSend = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSendStatus('sending');
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: formName,
        from_email: formEmail,
        message: formMessage,
      }, EMAILJS_PUBLIC_KEY);
      setSendStatus('success');
      setFormName('');
      setFormEmail('');
      setFormMessage('');
      window.setTimeout(() => setSendStatus('idle'), 5000);
    } catch {
      setSendStatus('error');
      window.setTimeout(() => setSendStatus('idle'), 5000);
    }
  };

  const contacts = [
    { icon: Mail, label: t.contactLabels[0], value: 'danielmafla320@gmail.com', href: 'mailto:danielmafla320@gmail.com' },
    { icon: Phone, label: t.contactLabels[1], value: '+57 300 136 2838', href: 'tel:+573001362838' },
    { icon: MapPin, label: t.contactLabels[2], value: 'Pasto, Colombia', href: null },
  ];

  return (
    <section id="contacto" className="section section-contact section-anchor">
      <div className="wrap">
        <header className="contact-heading" data-reveal>
          <p className="section-kicker">{t.contactPill}</p>
          <h2 className="contact-display">{t.contactTitle}<span className="heading-period">.</span></h2>
          <p className="contact-lead">{t.contactDesc}</p>
        </header>

        <div className="contact-layout">
          <div className="contact-form-column" data-reveal>
            <p className="mono-label">{language === 'es' ? 'MENSAJE DIRECTO' : 'DIRECT MESSAGE'}</p>
            <h3>{t.contactFormTitle}</h3>
            <form className="contact-form" onSubmit={handleSend}>
              <label htmlFor="contact-name">{t.contactName}</label>
              <input id="contact-name" name="name" autoComplete="name" type="text" placeholder={t.contactNamePH} value={formName} onChange={event => setFormName(event.target.value)} required disabled={sendStatus === 'sending'} />

              <label htmlFor="contact-email">{t.contactEmail}</label>
              <input id="contact-email" name="email" autoComplete="email" type="email" placeholder={t.contactEmailPH} value={formEmail} onChange={event => setFormEmail(event.target.value)} required disabled={sendStatus === 'sending'} />

              <label htmlFor="contact-message">{t.contactMsg}</label>
              <textarea id="contact-message" name="message" rows={5} placeholder={t.contactMsgPH} value={formMessage} onChange={event => setFormMessage(event.target.value)} required disabled={sendStatus === 'sending'} />

              <button className={`button button-primary contact-submit status-${sendStatus}`} type="submit" disabled={sendStatus === 'sending'}>
                {sendStatus === 'sending' ? <LoaderCircle size={17} className="spin" aria-hidden="true" /> : null}
                {sendStatus === 'success' ? <Check size={17} aria-hidden="true" /> : null}
                {sendStatus === 'error' ? <X size={17} aria-hidden="true" /> : null}
                {sendStatus === 'idle' ? <><Send size={16} aria-hidden="true" />{t.contactSend}</> : null}
                {sendStatus === 'sending' ? t.sendingText : null}
                {sendStatus === 'success' ? t.successText : null}
                {sendStatus === 'error' ? t.errorText : null}
              </button>
              <p className="form-status" aria-live="polite" role="status">
                {sendStatus === 'success' ? t.successSub : sendStatus === 'error' ? t.errorSub : ''}
              </p>
            </form>
          </div>

          <aside className="contact-aside" data-reveal>
            <div className="contact-methods">
              <h3 className="mono-label">{t.contactInfoTitle}</h3>
              <p className="contact-aside-copy">{t.contactInfoDesc}</p>
              {contacts.map(({ icon: Icon, label, value, href }, index) => (
                <div className="contact-detail" key={label}>
                  <span className="contact-detail-index">0{index + 1}</span>
                  <Icon size={16} aria-hidden="true" />
                  <div><span>{label}</span>{href ? <a href={href}>{value}</a> : <strong>{value}</strong>}</div>
                </div>
              ))}
            </div>
            <div className="contact-socials">
              <h3 className="mono-label">{t.socialTitle}</h3>
              <div className="social-links">
                <a href="https://github.com/DanielMafla320" target="_blank" rel="noopener noreferrer" aria-label={language === 'es' ? 'GitHub, abre en una pestaña nueva' : 'GitHub, opens in a new tab'}><FaGithub size={17} aria-hidden="true" />GitHub<ArrowUpRight size={13} aria-hidden="true" /></a>
                <a href="https://www.linkedin.com/in/daniel-mafla-782541317/?skipRedirect=true" target="_blank" rel="noopener noreferrer" aria-label={language === 'es' ? 'LinkedIn, abre en una pestaña nueva' : 'LinkedIn, opens in a new tab'}><FaLinkedin size={17} aria-hidden="true" />LinkedIn<ArrowUpRight size={13} aria-hidden="true" /></a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
