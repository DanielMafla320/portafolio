"use client";
 
import { useState, useEffect, useRef } from 'react';
import { Download, Mail, Phone, MapPin, Send, Globe, Sun, Moon, CheckCircle, XCircle, Loader } from 'lucide-react';
import { FaGithub, FaLinkedin } from "react-icons/fa";
import emailjs from '@emailjs/browser';
 

const EMAILJS_SERVICE_ID  = 'service_sbytjxj';
const EMAILJS_TEMPLATE_ID = 'template_ulhhlwb';
const EMAILJS_PUBLIC_KEY  = '4o1gDlG0O3pRDalfm';

 
type SendStatus = 'idle' | 'sending' | 'success' | 'error';
 
export default function App() {
  const [activeSection, setActiveSection] = useState<string>('inicio');
  const [text, setText] = useState("");
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [isChanging, setIsChanging] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [downloading, setDownloading] = useState(false);
 
  const [formName, setFormName]       = useState('');
  const [formEmail, setFormEmail]     = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [sendStatus, setSendStatus]   = useState<SendStatus>('idle');
  const formRef = useRef<HTMLDivElement>(null);
 
  const toggleDark = () => setDarkMode(prev => !prev);
 
  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => setDownloading(false), 600);
  };
 
  const handleSend = async () => {
    if (!formName.trim() || !formEmail.trim() || !formMessage.trim()) return;
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
  
 
  const c = darkMode ? {
    bg: '#0b0b16', bgAlt: '#0b0b16', surface: '#13131f',
    border: '#2a2a45', borderLight: '#1e1e38',
    text: '#f0eeff', textMuted: '#9090b0', textSoft: '#7070a0',
    pill:       { bg: '#1e1e38', border: '#3a3a60', color: '#c4b5fd' },
    chip:       { bg: '#1e1e38', border: '#3a3a60', color: '#a78bfa' },
    card:       { bg: '#16162a', border: '#2a2a45' },
    navBg: '#0b0b16dd', footer: '#08080f',
    badge:      { bg: '#1e1e38', border: '#3a3a60', color: '#a78bfa' },
    skillCard:  { bg: '#16162a', border: '#2a2a45' },
    contactInput: { bg: '#13131f', border: '#2a2a45' },
    timelineLine: '#2a2a45',
    aboutGrad: 'linear-gradient(to top, #0b0b16f0 0%, transparent 55%)',
    tagBg: '#1e1e38', tagColor: '#a78bfa', tagBorder: '#3a3a60',
    socialBtn:  { bg: '#1e1e38', border: '#3a3a60', color: '#a78bfa' },
    langBtn:    { bg: '#1e1e38', border: '#3a3a60', color: '#a78bfa' },
    iconCircle: '#1e1e38', dotNode: '#1e1e38',
    expBadge:   { bg: '#1e1e38', border: '#3a3a60' },
    blobOpacity: 0.22, sectionDivider: 'transparent',
  } : {
    bg: '#f5f3ff', bgAlt: '#f5f3ff', surface: '#ffffff',
    border: '#e8e4fc', borderLight: '#f0eeff',
    text: '#1a1a2e', textMuted: '#9090b0', textSoft: '#6868a0',
    pill:       { bg: '#ede9fe', border: '#c4b5fd55', color: '#7c3aed' },
    chip:       { bg: '#f5f3ff', border: '#e8e4fc',   color: '#7c3aed' },
    card:       { bg: '#ffffff', border: '#e8e4fc' },
    navBg: '#f5f3ffdd', footer: '#f0eeff',
    badge:      { bg: '#ede9fe', border: '#c4b5fd55', color: '#7c3aed' },
    skillCard:  { bg: '#ffffff', border: '#e8e4fc' },
    contactInput: { bg: '#f9f8ff', border: '#e8e4fc' },
    timelineLine: '#e8e4fc',
    aboutGrad: 'linear-gradient(to top, #f5f3fff0 0%, transparent 55%)',
    tagBg: '#f5f3ffee', tagColor: '#7c3aed', tagBorder: '#a855f755',
    socialBtn:  { bg: '#ede9fe', border: '#c4b5fd55', color: '#7c3aed' },
    langBtn:    { bg: '#ede9fe', border: '#c4b5fd55', color: '#7c3aed' },
    iconCircle: '#ede9fe', dotNode: '#ede9fe',
    expBadge:   { bg: '#ede9fe', border: '#c4b5fd55' },
    blobOpacity: 1, sectionDivider: '#e8e4fc',
  };
 
  const changeLanguage = () => {
    setIsChanging(true);
    setTimeout(() => { setLanguage(prev => prev === 'es' ? 'en' : 'es'); setIsChanging(false); }, 250);
  };
 
  const translations = {
    es: {
      available: '✦ Disponible para proyectos',
      heroDesc: 'Estudiante apasionado por el aprendizaje continuo y los retos técnicos. Me motiva explorar nuevas tecnologías y desarrollar soluciones que generen impacto real.',
      downloadCV: 'Descargar CV',
      inProgress: 'En curso 🎓', softEng: 'Ing. Software',
      aboutPill: '✦ Sobre mí', aboutTitle: 'Acerca de mí',
      aboutP1: 'Soy estudiante de Ingeniería de Software apasionado por la tecnología y el desarrollo de soluciones innovadoras. Me motiva entender a fondo cómo funcionan los sistemas y enfrentar desafíos que me permitan crecer constantemente como desarrollador, creando software con impacto real.',
      aboutP2: 'Me caracterizo por ser una persona sociable y colaborativa, con facilidad para el trabajo en equipo. También tengo afinidad por la edición de video y la creación de contenido digital, lo que aporta un enfoque creativo a mi perfil como desarrollador.',
      skillTitles: ['Lenguajes', 'Frontend', 'Backend', 'Herramientas'],
      projectsPill: '✦ Portafolio', projectsTitle: 'Mis Proyectos',
      projectsDesc: 'Proyectos desarrollados aplicando mis conocimientos...',
      projectCta: 'Ver proyecto', projectSoon: 'Próximamente',
      projects: [
        { title: 'XSOUND', desc: 'Reproductor de música de manera local o online' },
        { title: 'Saborify', desc: 'Aplicación que te ayuda a cocinar y te recomienda recetas dependiendo tus necesidades' },
      ],
      testiPill: '✦ Testimonios', testiTitle: 'Lo que ', testiTitleGrad: 'dicen',
      testiDesc: 'Lo que dicen mis compañeros y colaboradores',
      testimonials: [
        {
          text: 'Daniel tiene una forma muy clara de explicar conceptos complejos. Siempre está dispuesto a ayudar y se nota mucho su interés por el aprendizaje continuo.',
          name: 'Adrian Figueroa',
          role: 'Estudiante de Ing. Electrónica',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
        },
        {
          text: 'He trabajado con Daniel en varios proyectos universitarios y siempre sorprende con sus diseños en Figma. Tiene buen ojo para la interfaz y se esfuerza mucho por hacer las cosas bien desde el principio.',
          name: 'Juan Ortega',
          role: 'Estudiante de Ing. de Sistemas',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
        },
        {
          text: 'Daniel es de esas personas que llega preparada a cada clase y cuando hay que resolver un problema en equipo siempre propone ideas concretas. Su disciplina para estudiar se nota en los resultados.',
          name: 'Daniel Camilo Hernández',
          role: 'Estudiante de Ing. de Sistemas',
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80',
        },
      ],
      expPill: '✦ Trayectoria', expTitle: 'Experiencia ', expTitleGrad: 'académica',
      expDesc: 'Mi trayectoria profesional y formación académica',
      experience: [
        { type: 'Académica', date: '2024 - Presente', title: 'Ingeniería de Software', company: 'Universidad — En curso', desc: 'Formación en desarrollo de software, estructuras de datos, algoritmos, bases de datos y arquitectura de sistemas. Participación activa en proyectos académicos.' },
        { type: 'Académica', date: '2024', title: 'Bootcamp en programación con Python', company: 'TalentoTech', desc: 'Formación en fundamentos de programación utilizando Python, incluyendo lógica de programación, estructuras de control, funciones y resolución de problemas.' },
        { type: 'Académica', date: '2022', title: 'Técnico en mantenimiento de equipos de cómputo', company: 'Sena', desc: 'Técnico en mantenimiento de equipos de cómputo con conocimientos en diagnóstico de hardware y software, instalación de sistemas operativos, ensamblaje de equipos, solución de fallas y soporte técnico.' },
      ],
      contactPill: '✦ Contacto', contactTitle: 'Hablemos juntos',
      contactDesc: '¿Tienes un proyecto en mente? Escríbeme',
      contactFormTitle: 'Envíame un mensaje',
      contactName: 'Nombre completo', contactNamePH: 'Tu nombre',
      contactEmail: 'Email', contactEmailPH: 'tu@email.com',
      contactMsg: 'Mensaje', contactMsgPH: 'Cuéntame sobre tu proyecto...',
      contactSend: 'Enviar mensaje',
      sendingText: 'Enviando...', successText: '¡Mensaje enviado!', errorText: 'Error al enviar',
      successSub: 'Te responderé pronto 👋', errorSub: 'Inténtalo de nuevo',
      contactInfoTitle: 'Información de contacto',
      contactInfoDesc: 'Puedes escribirme por cualquiera de estos medios.',
      contactLabels: ['Email', 'Teléfono', 'Ubicación'],
      socialTitle: 'Redes sociales',
      footerDesc: 'Estudiante de Ingeniería de Software apasionado por construir soluciones tecnológicas de impacto.',
      footerSkillsTitle: 'Habilidades',
      footerSkills: ['Desarrollo Web', 'Backend Python & Java', 'Frontend con Next.js', 'Bases de Datos'],
      footerContactTitle: 'Contacto', footerFollowTitle: 'Sígueme',
      footerRights: '© 2026 Daniel Mafla. Todos los derechos reservados.',
      nav: { inicio: 'Inicio', acerca: 'Acerca', proyectos: 'Proyectos', testimonios: 'Testimonios', experiencia: 'Experiencia', contacto: 'Contacto' },
    },
    en: {
      available: '✦ Available for projects',
      heroDesc: 'Student passionate about continuous learning and technical challenges. I enjoy exploring new technologies and building impactful solutions.',
      downloadCV: 'Download CV',
      inProgress: 'In progress 🎓', softEng: 'Soft. Eng.',
      aboutPill: '✦ About me', aboutTitle: 'About me',
      aboutP1: 'I am a Software Engineering student passionate about technology and developing innovative solutions. I am motivated to deeply understand how systems work and face challenges that allow me to constantly grow as a developer, creating software with real impact.',
      aboutP2: 'I am a sociable and collaborative person, with ease for teamwork. I also have an affinity for video editing and digital content creation, which brings a creative approach to my developer profile.',
      skillTitles: ['Languages', 'Frontend', 'Backend', 'Tools'],
      projectsPill: '✦ Portfolio', projectsTitle: 'My Projects',
      projectsDesc: 'Projects developed applying my knowledge...',
      projectCta: 'View project', projectSoon: 'Coming soon',
      projects: [
        { title: 'XSOUND', desc: 'Local or online music player' },
        { title: 'Saborify', desc: 'App that helps you cook and recommends recipes based on your needs' },
      ],
      testiPill: '✦ Testimonials', testiTitle: 'What they ', testiTitleGrad: 'say',
      testiDesc: 'What my peers and collaborators say',
      testimonials: [
        {
          text: 'Daniel has a very clear way of explaining complex concepts. He is always willing to help and his interest in continuous learning is very evident.',
          name: 'Adrian Figueroa',
          role: 'Electronics Engineering Student',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
        },
        {
          text: "I've worked with Daniel on several university projects and he always impresses with his Figma designs. He has a good eye for interfaces and puts real effort into getting things right from the start.",
          name: 'Juan Ortega',
          role: 'Systems Engineering Student',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
        },
        {
          text: 'Daniel is one of those people who comes prepared to every class. When there is a problem to solve as a team, he always brings concrete ideas. His dedication to studying clearly shows in his results.',
          name: 'Daniel Camilo Hernández',
          role: 'Systems Engineering Student',
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80',
        },
      ],
      expPill: '✦ Journey', expTitle: 'Academic ', expTitleGrad: 'experience',
      expDesc: 'My professional journey and academic background',
      experience: [
        { type: 'Academic', date: '2024 - Present', title: 'Software Engineering', company: 'University — In progress', desc: 'Training in software development, data structures, algorithms, databases, and systems architecture. Active participation in academic projects.' },
        { type: 'Academic', date: '2024', title: 'Python Programming Bootcamp', company: 'TalentoTech', desc: 'Training in programming fundamentals using Python, including programming logic, control structures, functions, and problem solving.' },
        { type: 'Academic', date: '2022', title: 'Computer Equipment Maintenance Technician', company: 'Sena', desc: 'Technician in computer equipment maintenance with knowledge in hardware and software diagnostics, OS installation, equipment assembly, fault resolution, and technical support.' },
      ],
      contactPill: '✦ Contact', contactTitle: "Let's talk",
      contactDesc: 'Do you have a project in mind? Contact me',
      contactFormTitle: 'Send me a message',
      contactName: 'Full name', contactNamePH: 'Your name',
      contactEmail: 'Email', contactEmailPH: 'you@email.com',
      contactMsg: 'Message', contactMsgPH: 'Tell me about your project...',
      contactSend: 'Send message',
      sendingText: 'Sending...', successText: 'Message sent!', errorText: 'Send failed',
      successSub: "I'll reply soon 👋", errorSub: 'Please try again',
      contactInfoTitle: 'Contact information',
      contactInfoDesc: 'You can reach me through any of these channels.',
      contactLabels: ['Email', 'Phone', 'Location'],
      socialTitle: 'Social media',
      footerDesc: 'Software Engineering student passionate about building impactful tech solutions.',
      footerSkillsTitle: 'Skills',
      footerSkills: ['Web Development', 'Backend Python & Java', 'Frontend with Next.js', 'Databases'],
      footerContactTitle: 'Contact', footerFollowTitle: 'Follow me',
      footerRights: '© 2026 Daniel Mafla. All rights reserved.',
      nav: { inicio: 'Home', acerca: 'About', proyectos: 'Projects', testimonios: 'Testimonials', experiencia: 'Experience', contacto: 'Contact' },
    },
  };
 
  const t = translations[language];
 
  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
    const centerX = rect.width  / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / 35;
    const rotateY =  (x - centerX) / 35;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    card.classList.add('hovering');
  };

  const resetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    card.classList.remove('hovering');
  };
 
  useEffect(() => {
    const words = ["Software Engineering Student", "Frontend Developer", "Backend Developer", "Problem Solver"];
    let wordIndex = 0, charIndex = 0, isDeleting = false;
    const type = () => {
      const w = words[wordIndex];
      if (isDeleting) { setText(w.substring(0, charIndex - 1)); charIndex--; }
      else { setText(w.substring(0, charIndex + 1)); charIndex++; }
      if (!isDeleting && charIndex === w.length) setTimeout(() => (isDeleting = true), 1500);
      else if (isDeleting && charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; }
    };
    const iv = setInterval(type, isDeleting ? 40 : 80);
    return () => clearInterval(iv);
  }, []);
 
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-exp');
    const obs = new IntersectionObserver((entries, o) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          if (el.classList.contains('reveal-exp')) {
            const siblings = el.parentElement?.querySelectorAll('.reveal-exp');
            const idx = Array.from(siblings || []).indexOf(el);
            el.style.transitionDelay = `${idx * 120}ms`;
          }
          el.classList.add('active');
          o.unobserve(el);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => obs.observe(el));
    const imgWrap = document.querySelector('.about-img-wrap');
    const shimObs = new IntersectionObserver((entries, o) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.classList.add('shimmer-active');
          el.style.transform = 'scale(1.02)';
          o.unobserve(el);
        }
      });
    }, { threshold: 0.3 });
    if (imgWrap) shimObs.observe(imgWrap);
    return () => { obs.disconnect(); shimObs.disconnect(); };
  }, []);
 
  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
 
  const projectMeta = [
    { img: '/reproductor xsound.png', tags: ['Typescript', 'CSS'], link: 'https://reproductor-musica-delta.vercel.app/', comingSoon: false },
    { img: 'https://images.unsplash.com/photo-1661246627162-feb0269e0c07?w=600&q=80', tags: ['TypeScript', 'CSS'], comingSoon: true },
  ];
 
  const T = 'all 0.4s ease';
  const cardBg     = darkMode ? '#16162a' : '#ffffff';
  const cardBorder = darkMode ? '#2a2a45'  : '#e8e4fc';
 
  const cardStyle: React.CSSProperties = {
    background: cardBg, border: `1.5px solid ${cardBorder}`, borderRadius: 22,
    boxShadow: darkMode ? '0 4px 32px #00000050' : '0 4px 24px #7c3aed08', transition: T,
  };
 
  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 16px', borderRadius: 12, fontSize: 14,
    background: c.contactInput.bg, border: `1.5px solid ${c.contactInput.border}`,
    color: c.text, outline: 'none', fontFamily: "'Plus Jakarta Sans', sans-serif",
    transition: T, boxSizing: 'border-box' as const, display: 'block',
  };
 
  const pageBg: React.CSSProperties = {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    backgroundColor: darkMode ? '#0b0b16' : '#f5f3ff',
    backgroundImage: darkMode ? `
      radial-gradient(ellipse 70% 55% at 15% 8%,  rgba(109,40,217,0.40) 0%, transparent 65%),
      radial-gradient(ellipse 55% 45% at 88% 18%,  rgba(139,92,246,0.25) 0%, transparent 60%),
      radial-gradient(ellipse 50% 40% at 75% 85%,  rgba(168,85,247,0.30) 0%, transparent 60%),
      radial-gradient(ellipse 40% 35% at 10% 80%,  rgba(91,33,182,0.22) 0%, transparent 55%)
    ` : `
      radial-gradient(ellipse 65% 50% at 12% 6%,   rgba(139,92,246,0.55) 0%, transparent 65%),
      radial-gradient(ellipse 50% 40% at 90% 15%,  rgba(167,139,250,0.50) 0%, transparent 58%),
      radial-gradient(ellipse 55% 45% at 78% 88%,  rgba(139,92,246,0.45) 0%, transparent 60%),
      radial-gradient(ellipse 38% 32% at 8%  82%,  rgba(196,181,253,0.55) 0%, transparent 55%)
    `,
    minHeight: '100vh', color: c.text, transition: T, overflowX: 'hidden',
  };
 
  const sendBtnContent = () => {
    if (sendStatus === 'sending') return <><Loader size={17} style={{ animation: 'spin 1s linear infinite' }} /><span>{t.sendingText}</span></>;
    if (sendStatus === 'success') return <><CheckCircle size={17} /><span>{t.successText}</span></>;
    if (sendStatus === 'error')   return <><XCircle size={17} /><span>{t.errorText}</span></>;
    return <><Send size={17} /><span className={`fade-t ${isChanging ? 'lang-out' : 'lang-in'}`}>{t.contactSend}</span></>;
  };
 
  const sendBtnBg =
    sendStatus === 'success' ? 'linear-gradient(135deg, #16a34a, #22c55e)' :
    sendStatus === 'error'   ? 'linear-gradient(135deg, #dc2626, #ef4444)' :
    'linear-gradient(135deg, #7c3aed, #a855f7)';
 
  const isFormEmpty = !formName.trim() || !formEmail.trim() || !formMessage.trim();
 
  return (
    <div style={pageBg}>
 
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulseDot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(124,58,237,0.55); }
          50%       { box-shadow: 0 0 0 7px rgba(124,58,237,0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
 
      {/* NAVBAR */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: c.navBg, backdropFilter: 'blur(20px)', borderBottom: `1px solid ${c.border}`, boxShadow: darkMode ? '0 1px 20px #00000040' : '0 1px 20px #7c3aed08', transition: T }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 64 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800 }}>
            <span style={{ color: c.text, transition: T }}>Daniel </span><span className="grad">Mafla</span>
          </div>
          <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {['inicio', 'acerca', 'proyectos', 'testimonios', 'experiencia', 'contacto'].map(s => (
              <button key={s} className={`nav-btn ${activeSection === s ? 'active' : ''}`} onClick={() => scrollToSection(s)}>
                {t.nav[s as keyof typeof t.nav]}
              </button>
            ))}
            <button onClick={toggleDark} title={darkMode ? 'Modo claro' : 'Modo oscuro'} style={{ marginLeft: 10, width: 38, height: 38, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: `1px solid ${darkMode ? '#3a3a60' : '#2a2a45'}`, background: darkMode ? '#1e1e38' : '#1a1a2e', transition: T }}>
              <span style={{ display: 'flex', transition: 'transform 0.5s ease', transform: darkMode ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                {darkMode ? <Sun size={16} style={{ color: '#fbbf24' }} /> : <Moon size={16} style={{ color: '#f0eeff' }} />}
              </span>
            </button>
            <button onClick={changeLanguage} title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'} style={{ marginLeft: 8, display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 12, cursor: 'pointer', fontWeight: 600, background: c.langBtn.bg, border: `1px solid ${c.langBtn.border}`, color: c.langBtn.color, transition: T, fontSize: 13 }}>
              <Globe size={15} style={{ color: '#7c3aed' }} />
              <span className={`lang-label ${isChanging ? 'lang-out' : 'lang-in'}`}>{language === 'es' ? 'EN' : 'ES'}</span>
            </button>
          </div>
        </div>
      </nav>
 
      {/* ── HERO ── */}
      <section id="inicio" style={{ padding: '110px 0', position: 'relative', overflow: 'hidden', background: 'transparent', transition: T }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 80, alignItems: 'center', position: 'relative' }}>
          <div>
            <div className={`pill fade-t ${isChanging ? 'lang-out' : 'lang-in'}`} style={{ background: c.pill.bg, border: `1px solid ${c.pill.border}`, color: c.pill.color, transition: T }}>{t.available}</div>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(42px, 8vw, 76px)', fontWeight: 800, lineHeight: 1, color: c.text, marginBottom: 16, transition: T }}>Daniel<br /><span className="grad">Mafla</span></h1>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: darkMode ? '#a78bfa' : '#7c3aed', marginBottom: 24, transition: T }}>{text}<span className="cursor">|</span></h2>
            <p key={language} className="fade-text" style={{ fontSize: 15, lineHeight: 1.85, color: c.textSoft, marginBottom: 36, maxWidth: 460, transition: T }}>{t.heroDesc}</p>
            <a href="/cv.pdf" download onClick={handleDownload}>
              <button className={`btn-primary ${downloading ? 'download-anim' : ''}`}>
                <Download size={18} />
                <span className={`fade-t ${isChanging ? 'lang-out' : 'lang-in'}`}>{t.downloadCV}</span>
              </button>
            </a>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative' }}>
              <div className="profile-img" style={{ width: 340, height: 340, borderRadius: '50%', padding: 3, background: 'linear-gradient(135deg, #7c3aed, #a855f7, #c084fc)', boxShadow: darkMode ? '0 0 80px #7c3aed45, 0 0 140px #a855f730' : '0 0 80px #7c3aed25, 0 0 140px #a855f715', animation: 'float 4s ease-in-out infinite' }}>
                <div className="img-inner" style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', background: darkMode ? '#1e1e38' : '#ede9fe' }}>
                  <img src="/foto mia traje.jpeg" alt="Daniel Mafla" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: 10, right: -24, background: 'linear-gradient(135deg, #7c3aed, #a855f7)', borderRadius: 16, padding: '10px 18px', boxShadow: '0 8px 32px #7c3aed33' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  <span className={`fade-t ${isChanging ? 'lang-out' : 'lang-in'}`}>{t.softEng}</span>
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>
                  <span className={`fade-t ${isChanging ? 'lang-out' : 'lang-in'}`}>{t.inProgress}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* ── ACERCA ── */}
      <section id="acerca" style={{ padding: '100px 0', position: 'relative', overflow: 'hidden', background: 'transparent', transition: T }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 64, alignItems: 'start', position: 'relative' }}>
          <div className="reveal reveal-d1">
            <div className="about-img-wrap">
              <img src="/foto mia traje.jpeg" alt="About" />
              <div style={{ position: 'absolute', inset: 0, background: c.aboutGrad, pointerEvents: 'none', transition: T }} />
              <div style={{ position: 'absolute', bottom: 24, left: 20, right: 20, display: 'flex', gap: 8, flexWrap: 'wrap', zIndex: 1 }}>
                {['Python', 'Java', 'Next.js', 'Django'].map(tag => (
                  <span key={tag} style={{ background: c.tagBg, border: `1.5px solid ${c.tagBorder}`, borderRadius: 10, padding: '7px 13px', fontSize: 12, fontWeight: 700, color: c.tagColor, transition: T }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="reveal reveal-d2">
            <div className={`pill fade-t ${isChanging ? 'lang-out' : 'lang-in'}`} style={{ background: c.pill.bg, border: `1px solid ${c.pill.border}`, color: c.pill.color, transition: T }}>{t.aboutPill}</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 50, fontWeight: 800, color: c.text, lineHeight: 1.08, marginBottom: 22, transition: T }}><span className="grad-subtle">{t.aboutTitle}</span></h2>
            <p key={language + 'p1'} className="fade-text" style={{ fontSize: 15, lineHeight: 1.85, color: c.textSoft, marginBottom: 14, transition: T }}>{t.aboutP1}</p>
            <p key={language + 'p2'} className="fade-text" style={{ fontSize: 15, lineHeight: 1.85, color: c.textSoft, marginBottom: 32, transition: T }}>{t.aboutP2}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                { skills: ['Python', 'Java', 'JavaScript', 'HTML5', 'CSS3'] },
                { skills: ['Next.js', 'Tailwind CSS', 'TypeScript', 'React'] },
                { skills: ['Django', 'Next.js', 'API REST'] },
                { skills: ['Git & GitHub', 'Figma', 'VS Code', 'Postman'] },
              ].map((card, i) => (
                <div key={i} className={`reveal reveal-d${i + 1}`} style={{ background: darkMode ? '#16162a' : '#ffffff', border: `1.5px solid ${darkMode ? '#2a2a45' : '#e8e4fc'}`, borderRadius: 18, padding: 18, boxShadow: darkMode ? '0 2px 12px #00000030' : '0 2px 12px #7c3aed06', transition: T }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#7c3aed', letterSpacing: '0.09em', textTransform: 'uppercase', marginBottom: 12 }}>
                    <span className={`fade-t ${isChanging ? 'lang-out' : 'lang-in'}`}>{t.skillTitles[i]}</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {card.skills.map(s => <span key={s} className="chip" style={{ background: c.chip.bg, border: `1px solid ${c.chip.border}`, color: c.chip.color, transition: T }}>{s}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
 
      {/* ── PROYECTOS ── */}
      <section id="proyectos" style={{ padding: '100px 0', position: 'relative', overflow: 'hidden', background: 'transparent', transition: T }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }} className="reveal">
            <div className={`pill fade-t ${isChanging ? 'lang-out' : 'lang-in'}`} style={{ display: 'inline-flex', background: c.pill.bg, border: `1px solid ${c.pill.border}`, color: c.pill.color, transition: T }}>{t.projectsPill}</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 50, fontWeight: 800, color: c.text, marginBottom: 10, transition: T }}><span className="grad">{t.projectsTitle}</span></h2>
            <p key={language + 'pd'} className="fade-text" style={{ color: c.textMuted, fontSize: 15, transition: T }}>{t.projectsDesc}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 22 }}>
            {t.projects.map((p, i) => {
              const meta = projectMeta[i];
              return (
                <div key={i} className={`proj-card glass reveal reveal-d${i + 1}`}
                  onClick={() => { if (!meta.comingSoon && meta.link) window.open(meta.link, '_blank'); }}
                  style={{ cursor: meta.comingSoon ? 'not-allowed' : 'pointer', background: cardBg, border: `1.5px solid ${cardBorder}`, transition: T }}>
                  <div className="proj-card-img">
                    <img src={meta.img} alt={p.title} />
                    <div className="proj-card-overlay"><span className="proj-card-overlay-text">→ {meta.comingSoon ? t.projectSoon : t.projectCta}</span></div>
                  </div>
                  <div style={{ padding: '20px 22px 22px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 700, color: c.text, transition: T }}>{p.title}</h3>
                      <span className="proj-live-dot">Live</span>
                    </div>
                    <p key={language + 'proj' + i} className="fade-text" style={{ fontSize: 13, color: c.textMuted, lineHeight: 1.65, marginBottom: 16, transition: T }}>{p.desc}</p>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {meta.tags.map(tag => <span key={tag} className="proj-tag" style={{ background: c.badge.bg, border: `1px solid ${c.badge.border}`, color: c.badge.color, transition: T }}>{tag}</span>)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
 
      {/* ── TESTIMONIOS ── */}
      <section id="testimonios" style={{ padding: '100px 0', position: 'relative', overflow: 'hidden', background: 'transparent', transition: T }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }} className="reveal">
            <div className={`pill fade-t ${isChanging ? 'lang-out' : 'lang-in'}`} style={{ display: 'inline-flex', background: c.pill.bg, border: `1px solid ${c.pill.border}`, color: c.pill.color, transition: T }}>{t.testiPill}</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 50, fontWeight: 800, color: c.text, marginBottom: 10, transition: T }}>
              <span key={language + 'tt'} className="fade-text">{t.testiTitle}</span><span className="grad">{t.testiTitleGrad}</span>
            </h2>
            <p key={language + 'td'} className="fade-text" style={{ color: c.textMuted, fontSize: 15, transition: T }}>{t.testiDesc}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 22, alignItems: 'stretch' }}>
            {t.testimonials.map((testi, i) => (
              <div
                key={i}
                className={`testimonial-card glass reveal reveal-d${i + 1}`}
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
                style={{
                  borderRadius: 20,
                  padding: 28,
                  position: 'relative',
                  overflow: 'hidden',
                  background: cardBg,
                  border: `1.5px solid ${cardBorder}`,
                  transition: 'box-shadow 0.35s ease, border-color 0.35s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  height: '100%',
                  boxSizing: 'border-box',
                }}
              >
                <div className="testi-quote" style={{ color: darkMode ? '#2a2a45' : undefined }}>"</div>

                {/* bloque superior: estrellas + texto */}
                <div>
                  <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
                    {[...Array(5)].map((_, j) => <span key={j} style={{ color: '#a855f7', fontSize: 14 }}>★</span>)}
                  </div>
                  <p key={language + 'tm' + i} className="fade-text" style={{ fontSize: 14, lineHeight: 1.8, color: c.textSoft, transition: T }}>"{testi.text}"</p>
                </div>

                {/* bloque inferior: autor — clase testi-author para que el CSS lo pegue al fondo */}
                <div className="testi-author" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: '50%', overflow: 'hidden', border: `2px solid ${darkMode ? '#4a4a80' : '#c4b5fd66'}`, flexShrink: 0 }}>
                    <img src={testi.avatar} alt={testi.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: c.text, transition: T }}>{testi.name}</div>
                    <div key={language + 'tr' + i} className={`fade-t ${isChanging ? 'lang-out' : 'lang-in'}`} style={{ fontSize: 12, fontWeight: 600, color: '#7c3aed' }}>{testi.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── EXPERIENCIA ── */}
      <section id="experiencia" style={{ padding: '100px 0', position: 'relative', overflow: 'hidden', background: 'transparent', transition: T }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }} className="reveal">
            <div className={`pill fade-t ${isChanging ? 'lang-out' : 'lang-in'}`} style={{ display: 'inline-flex', background: c.pill.bg, border: `1px solid ${c.pill.border}`, color: c.pill.color, transition: T }}>{t.expPill}</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 50, fontWeight: 800, color: c.text, marginBottom: 10, transition: T }}>
              <span key={language + 'et'} className="fade-text">{t.expTitle}</span><span className="grad-subtle">{t.expTitleGrad}</span>
            </h2>
            <p key={language + 'ed'} className="fade-text" style={{ color: c.textMuted, fontSize: 15, transition: T }}>{t.expDesc}</p>
          </div>
          <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative' }}>
            <div className="timeline-line" style={{ background: darkMode ? '#2a2a45' : '#e8e4fc', transition: T }} />
            {t.experience.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 28, marginBottom: 24, paddingLeft: 4 }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: darkMode ? '#1e1e38' : '#ede9fe', border: '2px solid #7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 6, zIndex: 1, transition: T, animation: 'pulseDot 2.4s ease-in-out infinite', animationDelay: `${i * 0.8}s` }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#7c3aed' }} />
                </div>
                <div className={`reveal reveal-d${i + 1}`} style={{ flex: 1, background: darkMode ? '#16162a' : '#ffffff', border: `1.5px solid ${darkMode ? '#2a2a45' : '#e8e4fc'}`, borderRadius: 22, boxShadow: darkMode ? '0 4px 32px #00000050' : '0 4px 24px #7c3aed08', transition: T, padding: 24, animation: `slideInLeft 0.55s cubic-bezier(0.22,1,0.36,1) both`, animationDelay: `${0.1 + i * 0.15}s` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#7c3aed', background: darkMode ? '#1e1e38' : '#ede9fe', border: `1px solid ${darkMode ? '#3a3a60' : '#c4b5fd55'}`, borderRadius: 8, padding: '4px 10px', textTransform: 'uppercase', letterSpacing: '0.08em', transition: T }}>{item.type}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: c.textMuted, transition: T }}>{item.date}</span>
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: c.text, marginBottom: 4, transition: T }}>{item.title}</h3>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#7c3aed', marginBottom: 10 }}>{item.company}</div>
                  <p key={language + 'exp' + i} className="fade-text" style={{ fontSize: 13, color: c.textMuted, lineHeight: 1.7, transition: T }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── CONTACTO ── */}
      <section id="contacto" style={{ padding: '100px 0', position: 'relative', overflow: 'hidden', background: 'transparent', transition: T }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }} className="reveal">
            <div className={`pill fade-t ${isChanging ? 'lang-out' : 'lang-in'}`} style={{ display: 'inline-flex', background: c.pill.bg, border: `1px solid ${c.pill.border}`, color: c.pill.color, transition: T }}>{t.contactPill}</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 50, fontWeight: 800, color: c.text, marginBottom: 10, transition: T }}><span className="grad">{t.contactTitle}</span></h2>
            <p key={language + 'cd'} className="fade-text" style={{ color: c.textMuted, fontSize: 15, transition: T }}>{t.contactDesc}</p>
          </div>
 
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28 }}>
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
              <input style={{ ...inputStyle, marginBottom: 18 }} type="text" placeholder={t.contactNamePH}
                value={formName} onChange={e => setFormName(e.target.value)} disabled={sendStatus === 'sending'} />
              <label style={{ color: c.textMuted, display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 600 }}>{t.contactEmail}</label>
              <input style={{ ...inputStyle, marginBottom: 18 }} type="email" placeholder={t.contactEmailPH}
                value={formEmail} onChange={e => setFormEmail(e.target.value)} disabled={sendStatus === 'sending'} />
              <label style={{ color: c.textMuted, display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 600 }}>
                <span className={`fade-t ${isChanging ? 'lang-out' : 'lang-in'}`}>{t.contactMsg}</span>
              </label>
              <textarea style={{ ...inputStyle, resize: 'vertical', marginBottom: 22 }} placeholder={t.contactMsgPH} rows={5}
                value={formMessage} onChange={e => setFormMessage(e.target.value)} disabled={sendStatus === 'sending'} />
              <button onClick={handleSend} disabled={sendStatus === 'sending' || isFormEmpty}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '14px 28px',
                  borderRadius: 14, border: 'none',
                  background: isFormEmpty ? (darkMode ? '#2a2a45' : '#e8e4fc') : sendBtnBg,
                  color: isFormEmpty ? c.textMuted : '#fff',
                  fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700,
                  cursor: isFormEmpty || sendStatus === 'sending' ? 'not-allowed' : 'pointer',
                  transition: 'all 0.35s ease',
                  boxShadow: isFormEmpty ? 'none' : '0 6px 24px #7c3aed33',
                  opacity: sendStatus === 'sending' ? 0.85 : 1,
                  width: '100%', justifyContent: 'center',
                }}>
                {sendBtnContent()}
              </button>
            </div>
 
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              <div className="reveal reveal-d2" style={{ ...cardStyle, padding: 28 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: c.text, marginBottom: 6, transition: T }}>
                  <span className={`fade-t ${isChanging ? 'lang-out' : 'lang-in'}`}>{t.contactInfoTitle}</span>
                </h3>
                <p key={language + 'cid'} className="fade-text" style={{ fontSize: 13, color: c.textMuted, marginBottom: 24, transition: T }}>{t.contactInfoDesc}</p>
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
 
      {/* ── FOOTER ── */}
      <footer style={{ background: darkMode ? '#08080f' : '#ede9fe', borderTop: `1px solid ${c.border}`, padding: '60px 0 28px', transition: T }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, marginBottom: 48 }}>
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 14 }}>
                <span style={{ color: c.text, transition: T }}>Daniel </span><span className="grad">Mafla</span>
              </div>
              <p key={language + 'fd'} className="fade-text" style={{ fontSize: 13, color: c.textMuted, lineHeight: 1.75, transition: T }}>{t.footerDesc}</p>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: c.text, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16, transition: T }}>
                <span className={`fade-t ${isChanging ? 'lang-out' : 'lang-in'}`}>{t.footerSkillsTitle}</span>
              </div>
              {t.footerSkills.map(s => (
                <div key={s} style={{ fontSize: 13, color: c.textMuted, marginBottom: 9, cursor: 'pointer', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#7c3aed')}
                  onMouseLeave={e => (e.currentTarget.style.color = c.textMuted)}>{s}</div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: c.text, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16, transition: T }}>
                <span className={`fade-t ${isChanging ? 'lang-out' : 'lang-in'}`}>{t.footerContactTitle}</span>
              </div>
              {[{ Icon: Mail, v: 'danielmafla320@gmail.com' }, { Icon: Phone, v: '+57 300 136 2838' }, { Icon: MapPin, v: 'Pasto, Colombia' }].map(({ Icon, v }) => (
                <div key={v} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: c.textMuted, marginBottom: 10, cursor: 'pointer', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#7c3aed')}
                  onMouseLeave={e => (e.currentTarget.style.color = c.textMuted)}>
                  <Icon size={14} />{v}
                </div>
              ))}
            </div>
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
          <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: 24, textAlign: 'center', transition: T }}>
            <p key={language + 'fr'} className="fade-text" style={{ fontSize: 13, color: c.textMuted, transition: T }}>{t.footerRights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}