"use client";

import { FormEvent, useState } from 'react';
import { Check, LoaderCircle, Mail, MapPin, Phone, Send, X } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { useTheme } from '@/context/ThemeContext';
import { SendStatus } from '@/types';

const EMAILJS_SERVICE_ID = 'service_sbytjxj';
const EMAILJS_TEMPLATE_ID = 'template_ulhhlwb';
const EMAILJS_PUBLIC_KEY = '4o1gDlG0O3pRDalfm';

export default function Contact() {
  const { t } = useTheme();
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
        <div className="section-heading section-heading-split">
          <div>
            <p className="section-kicker">{t.contactPill}</p>
            <h2 className="section-title">{t.contactTitle}<span className="heading-period">.</span></h2>
          </div>
          <p className="section-intro">{t.contactDesc}</p>
        </div>

        <div className="contact-layout">
          <div className="contact-panel">
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

          <aside className="contact-aside">
            <div className="contact-panel contact-details">
              <p className="mono-label">{t.contactInfoTitle}</p>
              <p className="contact-aside-copy">{t.contactInfoDesc}</p>
              {contacts.map(({ icon: Icon, label, value, href }) => (
                <div className="contact-detail" key={label}>
                  <Icon size={17} aria-hidden="true" />
                  <div><span>{label}</span>{href ? <a href={href}>{value}</a> : <strong>{value}</strong>}</div>
                </div>
              ))}
            </div>
            <div className="contact-panel contact-socials">
              <p className="mono-label">{t.socialTitle}</p>
              <div className="social-links">
                <a href="https://github.com/DanielMafla320" target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)"><FaGithub size={18} aria-hidden="true" />GitHub</a>
                <a href="https://www.linkedin.com/in/daniel-mafla-782541317/?skipRedirect=true" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)"><FaLinkedin size={18} aria-hidden="true" />LinkedIn</a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
