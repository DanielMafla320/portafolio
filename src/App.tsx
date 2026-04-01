import { useState } from 'react';
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Send,
} from 'lucide-react';

import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";




export default function App() {
  const [activeSection, setActiveSection] = useState<string>('inicio');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: '#fafafa', minHeight: '100vh', color: '#1a1a2e' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        /* Fondos con textura de puntos */
        .bg-dots {
          background-color: #fafafa;
          background-image: radial-gradient(circle, #7c3aed18 1px, transparent 1px);
          background-size: 30px 30px;
        }
        .bg-dots-alt {
          background-color: #f4f3ff;
          background-image: radial-gradient(circle, #7c3aed12 1px, transparent 1px);
          background-size: 30px 30px;
        }

        /* Gradiente principal morado */
        .grad { background: linear-gradient(135deg, #7c3aed, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .grad-subtle { background: linear-gradient(135deg, #6d28d9, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

        /* Blob decorativo */
        .blob { position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.10; pointer-events: none; }

        /* Pill etiqueta de sección */
        .pill {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 6px 14px; border-radius: 999px;
          background: #7c3aed14; border: 1px solid #7c3aed33; color: #7c3aed;
          margin-bottom: 18px;
        }

        /* Navbar */
        .nav-btn {
          background: none; border: none;
          font-size: 14px; font-weight: 600; color: #9090b0;
          padding: 8px 14px; border-radius: 10px;
          cursor: pointer; transition: all 0.2s;
          font-family: 'Plus Jakarta Sans', sans-serif;
          text-transform: capitalize;
        }
        .nav-btn:hover { color: #1a1a2e; background: #7c3aed08; }
        .nav-btn.active { color: #7c3aed; background: #7c3aed12; }

        /* Botón primario */
        .btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: white; font-weight: 700; font-size: 15px;
          padding: 14px 28px; border-radius: 14px; border: none;
          cursor: pointer; transition: all 0.25s;
          box-shadow: 0 8px 32px #7c3aed30;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 42px #7c3aed44; }

        .btn-send {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          width: 100%;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: white; font-weight: 700; font-size: 15px;
          padding: 14px 28px; border-radius: 14px; border: none;
          cursor: pointer; transition: all 0.25s;
          box-shadow: 0 8px 28px #7c3aed30;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .btn-send:hover { transform: translateY(-2px); box-shadow: 0 14px 42px #7c3aed44; }

        /* Card base */
        .card {
          background: #ffffff;
          border: 1px solid #e8e4fc;
          border-radius: 20px;
          transition: all 0.3s;
          box-shadow: 0 2px 12px #7c3aed08;
        }
        .card:hover {
          border-color: #a855f755;
          transform: translateY(-4px);
          box-shadow: 0 20px 50px #7c3aed14;
        }

        /* Chip de skill */
        .chip {
          font-size: 13px; font-weight: 600;
          padding: 6px 12px; border-radius: 10px;
          background: #ede9fe; color: #6d28d9;
          border: 1px solid #c4b5fd44;
        }

        /* Tag de proyecto */
        .proj-tag {
          font-size: 10px; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase;
          padding: 4px 10px; border-radius: 8px;
          background: #ede9fe; color: #7c3aed; border: 1px solid #c4b5fd55;
        }

        /* Inputs */
        .form-label { display: block; font-size: 12px; font-weight: 700; color: #9090b0; margin-bottom: 6px; letter-spacing: 0.04em; text-transform: uppercase; }
        .form-input {
          width: 100%; background: #f8f7ff; border: 1.5px solid #e8e4fc;
          border-radius: 12px; padding: 12px 16px;
          color: #1a1a2e; font-size: 14px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          outline: none; transition: all 0.2s; display: block;
        }
        .form-input:focus { border-color: #7c3aed88; background: #f3f0ff; box-shadow: 0 0 0 3px #7c3aed18; }
        .form-input::placeholder { color: #c4c4da; }

        /* Social */
        .social-btn {
          width: 44px; height: 44px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.25s;
          background: #f4f3ff; border: 1.5px solid #e8e4fc; color: #a0a0c0;
        }
        .social-btn:hover {
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          border-color: transparent; color: white;
          transform: translateY(-3px); box-shadow: 0 10px 28px #7c3aed33;
        }

        /* Testimonial quote */
        .testi-quote {
          position: absolute; top: -10px; right: 18px;
          font-size: 120px; font-weight: 900;
          font-family: Georgia, serif; line-height: 1;
          color: #7c3aed; opacity: 0.06; pointer-events: none;
        }

        /* Timeline */
        .timeline-line {
          position: absolute; left: 12px; top: 26px; bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, #7c3aed, #a855f744);
        }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: '#fafafaee', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid #e8e4fc',
        boxShadow: '0 1px 20px #7c3aed08',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 64 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800 }}>
            <span style={{ color: '#1a1a2e' }}>Daniel </span>
            <span className="grad">Mafla</span>
          </div>
          <div style={{ display: 'flex', gap: 2 }}>
            {['inicio','acerca','proyectos','testimonios','experiencia','contacto'].map(s => (
              <button key={s} className={`nav-btn ${activeSection === s ? 'active' : ''}`} onClick={() => scrollToSection(s)}>{s}</button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="inicio" className="bg-dots" style={{ padding: '110px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="blob" style={{ width: 600, height: 600, background: '#7c3aed', top: -200, left: -150 }} />
        <div className="blob" style={{ width: 350, height: 350, background: '#a855f7', bottom: -80, right: 60 }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', position: 'relative' }}>
          <div>
            <div className="pill">✦ Disponible para proyectos</div>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 76, fontWeight: 800, lineHeight: 1, color: '#1a1a2e', marginBottom: 16 }}>
              Daniel<br /><span className="grad">Mafla</span>
            </h1>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: '#9090b0', marginBottom: 24 }}>
              Software Engineering Student
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: '#6868a0', marginBottom: 36, maxWidth: 460 }}>
              Estudiante apasionado por el aprendizaje continuo y los retos técnicos.
              Me motiva explorar nuevas tecnologías y desarrollar soluciones que generen impacto real.
              Siempre buscando el siguiente desafío que me lleve al siguiente nivel.
            </p>
            <button className="btn-primary">
              <Download size={18} /> Descargar CV
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                width: 340, height: 340, borderRadius: '50%', padding: 3,
                background: 'linear-gradient(135deg, #7c3aed, #a855f7, #c084fc)',
                boxShadow: '0 0 80px #7c3aed25, 0 0 140px #a855f715',
              }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', background: '#ede9fe' }}>
                  <img src="https://via.placeholder.com/300" alt="Daniel Mafla" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
              <div style={{
                position: 'absolute', bottom: 10, right: -24,
                background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                borderRadius: 16, padding: '10px 18px',
                boxShadow: '0 8px 32px #7c3aed33',
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Ing. Software</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>En curso 🎓</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ACERCA ── */}
      <section id="acerca" className="bg-dots-alt" style={{ padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="blob" style={{ width: 400, height: 400, background: '#7c3aed', top: -80, right: -80 }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start', position: 'relative' }}>
          <div>
            <div style={{ borderRadius: 24, overflow: 'hidden', height: 540, position: 'relative', background: '#ede9fe' }}>
              <img src="" alt="About" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #f4f3fff0 0%, transparent 55%)' }} />
              <div style={{ position: 'absolute', bottom: 24, left: 20, right: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['Python', 'Java', 'Next.js', 'Django'].map(t => (
                  <span key={t} style={{ background: '#fafafaee', border: '1.5px solid #a855f755', borderRadius: 10, padding: '7px 13px', fontSize: 12, fontWeight: 700, color: '#7c3aed' }}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="pill">✦ Sobre mí</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 50, fontWeight: 800, color: '#1a1a2e', lineHeight: 1.08, marginBottom: 22 }}>
              Acerca <br />de <span className="grad-subtle">mí</span>
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: '#6868a0', marginBottom: 14 }}>
              Soy estudiante de Ingeniería de Software con una gran curiosidad por aprender y explorar 
              nuevas áreas de la tecnología. Me apasiona entender cómo funcionan las cosas por dentro 
              y encontrar formas creativas de resolver problemas a través del código.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: '#6868a0', marginBottom: 32 }}>Soy una persona sociable, disfruto conocer gente y trabajar en equipo. Además, me interesa la edición de video y el contenido digital, lo que complementa mi perfil con un enfoque creativo</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                { title: 'Lenguajes', skills: ['Python', 'Java', 'HTML5', 'CSS3'] },
                { title: 'Frontend', skills: ['Next.js', 'Tailwind CSS', 'TypeScript'] },
                { title: 'Backend', skills: ['SQL', 'Django', 'API REST'] },
                { title: 'Herramientas', skills: ['Git & GitHub', 'VS Code', 'Postman'] },
              ].map(card => (
                <div key={card.title} style={{ background: '#ffffff', border: '1.5px solid #e8e4fc', borderRadius: 18, padding: 18, boxShadow: '0 2px 12px #7c3aed06' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#7c3aed', letterSpacing: '0.09em', textTransform: 'uppercase', marginBottom: 12 }}>{card.title}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {card.skills.map(s => <span key={s} className="chip">{s}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROYECTOS ── */}
      <section id="proyectos" className="bg-dots" style={{ padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="blob" style={{ width: 450, height: 450, background: '#7c3aed', bottom: -100, left: -100 }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div className="pill" style={{ display: 'inline-flex' }}>✦ Portafolio</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 50, fontWeight: 800, color: '#1a1a2e', marginBottom: 10 }}>
              Mis <span className="grad">Proyectos</span>
            </h2>
            <p style={{ color: '#9090b0', fontSize: 15 }}>Proyectos desarrollados aplicando mis conocimientos en programación y desarrollo web.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}>
            {[
              { img: '/reproductor xsound.png', title: 'XSOUND', desc: 'Reproductor de musica de manera local o online', tags: ['Typescript',"CSS"] },
              { img: 'https://images.unsplash.com/photo-1661246627162-feb0269e0c07?w=600&q=80', title: 'Saborify', desc: 'Aplicación que te ayuda a cocinar y te recomienda recetas dependiendo tus necesidades', tags: ['TypeScript', 'Css'] },
              
            ].map((p, i) => (
              <div key={i} className="card">
                <div style={{ height: 185, overflow: 'hidden', position: 'relative', borderRadius: '20px 20px 0 0' }}>
                  <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #ffffffdd, transparent 60%)' }} />
                </div>
                <div style={{ padding: 20 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ fontSize: 13, color: '#8080aa', lineHeight: 1.65, marginBottom: 14 }}>{p.desc}</p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {p.tags.map(t => <span key={t} className="proj-tag">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ── */}
      <section id="testimonios" className="bg-dots-alt" style={{ padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="blob" style={{ width: 350, height: 350, background: '#a855f7', top: -60, right: 100 }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div className="pill" style={{ display: 'inline-flex' }}>✦ Testimonios</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 50, fontWeight: 800, color: '#1a1a2e', marginBottom: 10 }}>
              Lo que <span className="grad">dicen</span>
            </h2>
            <p style={{ color: '#9090b0', fontSize: 15 }}>Lo que dicen mis compañeros y colaboradores</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}>
            {[
              { text: 'Daniel es un desarrollador muy dedicado. Su capacidad para aprender rápido y aplicar lo aprendido en proyectos reales lo hace un colaborador valioso en cualquier equipo.', name: 'Ana Martínez', role: 'Profesora de Ingeniería de Software', avatar: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=100&q=80' },
              { text: 'Trabajar con Daniel fue una experiencia muy positiva. Su entusiasmo por la tecnología y su compromiso con cada tarea hacen que los proyectos siempre salgan adelante.', name: 'Carlos Ruiz', role: 'Compañero de proyecto universitario', avatar: 'https://images.unsplash.com/photo-1723537742563-15c3d351dbf2?w=100&q=80' },
              { text: 'Daniel tiene una gran curiosidad intelectual y siempre está buscando nuevas formas de mejorar. Es el tipo de estudiante que marca la diferencia en un equipo.', name: 'Laura Fernández', role: 'Mentora de desarrollo web', avatar: 'https://images.unsplash.com/photo-1610387694365-19fafcc86d86?w=100&q=80' },
            ].map((t, i) => (
              <div key={i} style={{ background: '#ffffff', border: '1.5px solid #e8e4fc', borderRadius: 20, padding: 28, position: 'relative', overflow: 'hidden', boxShadow: '0 2px 16px #7c3aed08' }}>
                <div className="testi-quote">"</div>
                <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
                  {[...Array(5)].map((_, j) => <span key={j} style={{ color: '#a855f7', fontSize: 14 }}>★</span>)}
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: '#6868a0', marginBottom: 22 }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: '50%', overflow: 'hidden', border: '2px solid #c4b5fd66', flexShrink: 0 }}>
                    <img src={t.avatar} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a2e' }}>{t.name}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#7c3aed' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCIA ── */}
      <section id="experiencia" className="bg-dots" style={{ padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="blob" style={{ width: 380, height: 380, background: '#7c3aed', bottom: -60, right: -40 }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div className="pill" style={{ display: 'inline-flex' }}>✦ Trayectoria</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 50, fontWeight: 800, color: '#1a1a2e', marginBottom: 10 }}>
              Experiencia <span className="grad-subtle">académica</span>
            </h2>
            <p style={{ color: '#9090b0', fontSize: 15 }}>Mi trayectoria profesional y formación académica</p>
          </div>
          <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative' }}>
            <div className="timeline-line" />
            {[
              { type: 'Académica', date: '2022 - Presente', title: 'Ingeniería de Software', company: 'Universidad — En curso', desc: 'Formación en desarrollo de software, estructuras de datos, algoritmos, bases de datos y arquitectura de sistemas. Participación activa en proyectos académicos.' },
              { type: 'Laboral', date: '2024', title: 'Proyecto Freelance – Aplicación Web', company: 'Proyecto independiente', desc: 'Desarrollo de una aplicación web usando Next.js y Python. Funcionalidades CRUD, autenticación de usuarios e integración con base de datos.' },
              { type: 'Académica', date: '2023', title: 'Curso de Desarrollo Web Full Stack', company: 'Formación complementaria', desc: 'Aprendizaje de HTML, CSS, JavaScript, React y Node.js. Construcción de proyectos reales como parte del proceso de aprendizaje.' },
              { type: 'Académica', date: '2022', title: 'Fundamentos de Programación', company: 'Universidad', desc: 'Introducción a la programación orientada a objetos con Java y Python. Desarrollo de lógica computacional y resolución de problemas.' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 28, marginBottom: 24, paddingLeft: 4 }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#ede9fe', border: '2px solid #7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 6, zIndex: 1 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#7c3aed' }} />
                </div>
                <div style={{ flex: 1, background: '#ffffff', border: '1.5px solid #e8e4fc', borderRadius: 18, padding: 24, boxShadow: '0 2px 12px #7c3aed06' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#7c3aed', background: '#ede9fe', border: '1px solid #c4b5fd55', borderRadius: 8, padding: '4px 10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{item.type}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#9090b0' }}>{item.date}</span>
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', marginBottom: 4 }}>{item.title}</h3>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#7c3aed', marginBottom: 10 }}>{item.company}</div>
                  <p style={{ fontSize: 13, color: '#8080aa', lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACTO ── */}
      <section id="contacto" className="bg-dots-alt" style={{ padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="blob" style={{ width: 420, height: 420, background: '#7c3aed', bottom: -100, left: -80 }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div className="pill" style={{ display: 'inline-flex' }}>✦ Contacto</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 50, fontWeight: 800, color: '#1a1a2e', marginBottom: 10 }}>
              Hablemos <span className="grad">juntos</span>
            </h2>
            <p style={{ color: '#9090b0', fontSize: 15 }}>¿Tienes un proyecto en mente? Escríbeme</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
            <div style={{ background: '#ffffff', border: '1.5px solid #e8e4fc', borderRadius: 22, padding: 36, boxShadow: '0 4px 24px #7c3aed08' }}>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a2e', marginBottom: 28 }}>Envíame un mensaje</h3>
              <label className="form-label">Nombre completo</label>
              <input className="form-input" type="text" placeholder="Tu nombre" style={{ marginBottom: 18 }} />
              <label className="form-label">Email</label>
              <input className="form-input" type="email" placeholder="tu@email.com" style={{ marginBottom: 18 }} />
              <label className="form-label">Mensaje</label>
              <textarea className="form-input" placeholder="Cuéntame sobre tu proyecto..." rows={5} style={{ resize: 'vertical', marginBottom: 22 }} />
              <button className="btn-send"><Send size={17} /> Enviar mensaje</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              <div style={{ background: '#ffffff', border: '1.5px solid #e8e4fc', borderRadius: 22, padding: 28, boxShadow: '0 4px 24px #7c3aed08' }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1a1a2e', marginBottom: 6 }}>Información de contacto</h3>
                <p style={{ fontSize: 13, color: '#9090b0', marginBottom: 24 }}>Puedes escribirme por cualquiera de estos medios.</p>
                {[
                  { Icon: Mail, label: 'Email', value: 'danielmafla320@gmail.com' },
                  { Icon: Phone, label: 'Teléfono', value: '+57 300 136 2838' },
                  { Icon: MapPin, label: 'Ubicación', value: 'Pasto, Colombia' },
                ].map(({ Icon, label, value }, idx, arr) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: idx < arr.length - 1 ? '1px solid #f0eeff' : 'none' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={18} style={{ color: '#7c3aed' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#9090b0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a2e' }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background: '#ffffff', border: '1.5px solid #e8e4fc', borderRadius: 22, padding: 28, boxShadow: '0 4px 24px #7c3aed08' }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1a1a2e', marginBottom: 18 }}>Redes sociales</h3>
                <div style={{ display: 'flex', gap: 12 }}>
                  <a href="https://github.com/DanielMafla320" target="_blank" rel="noopener noreferrer">
                    <div className="social-btn">
                      <FaGithub size={20} />
                    </div>
                  </a>

                  <a href="https://www.linkedin.com/in/daniel-mafla-782541317/?skipRedirect=true" target="_blank" rel="noopener noreferrer">
                    <div className="social-btn">
                      <FaLinkedin size={20} />
                    </div>
                  </a>

                  <a href="https://www.instagram.com/daniel_mafla05/?hl=es" target="_blank" rel="noopener noreferrer">
                    <div className="social-btn">
                      <FaInstagram size={20} />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#f0eeff', borderTop: '1px solid #e8e4fc', padding: '60px 0 28px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40, marginBottom: 48 }}>
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 14 }}>
                <span style={{ color: '#1a1a2e' }}>Daniel </span><span className="grad">Mafla</span>
              </div>
              <p style={{ fontSize: 13, color: '#9090b0', lineHeight: 1.75 }}>
                Estudiante de Ingeniería de Software apasionado por construir soluciones tecnológicas de impacto.
              </p>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#1a1a2e', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Habilidades</div>
              {['Desarrollo Web', 'Backend Python & Java', 'Frontend con Next.js', 'Bases de Datos'].map(s => (
                <div key={s} style={{ fontSize: 13, color: '#9090b0', marginBottom: 9, cursor: 'pointer', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#7c3aed')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#9090b0')}>{s}</div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#1a1a2e', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Contacto</div>
              {[{ Icon: Mail, v: 'danielmafla320@gmail.com' }, { Icon: Phone, v: '+57 300 136 2838' }, { Icon: MapPin, v: 'Pasto, Colombia' }].map(({ Icon, v }) => (
                <div key={v} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#9090b0', marginBottom: 10, cursor: 'pointer', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#7c3aed')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#9090b0')}>
                  <Icon size={14} />{v}
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#1a1a2e', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Sígueme</div>
              <div style={{ display: 'flex', gap: 12 }}>
                  <a href="https://github.com/DanielMafla320" target="_blank" rel="noopener noreferrer">
                    <div className="social-btn">
                      <FaGithub size={20} />
                    </div>
                  </a>

                  <a href="https://www.linkedin.com/in/daniel-mafla-782541317/?skipRedirect=true" target="_blank" rel="noopener noreferrer">
                    <div className="social-btn">
                      <FaLinkedin size={20} />
                    </div>
                  </a>

                  <a href="https://www.instagram.com/daniel_mafla05/?hl=es" target="_blank" rel="noopener noreferrer">
                    <div className="social-btn">
                      <FaInstagram size={20} />
                    </div>
                  </a>
                </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #e0dcf8', paddingTop: 24, textAlign: 'center' }}>
            <p style={{ fontSize: 13, color: '#b0b0cc' }}>© 2026 Daniel Mafla. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

