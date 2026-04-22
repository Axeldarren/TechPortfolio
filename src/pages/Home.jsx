import { useState, useEffect, useRef } from 'react';
import { useReveal, useMagnetic } from '../hooks';
import { allProjects, experiences, typeColors, typeLabels } from '../data';
import Marquee from '../components/Marquee';
import SectionLabel from '../components/SectionLabel';
import MagBtn from '../components/MagBtn';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';

function FeaturedProjectGrid({ goTo }) {
  const [selected, setSelected] = useState(null);
  const featured = allProjects.filter(p => p.featured);
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20 }} className="bento-grid">
        {featured.map((p, i) => (
          <ProjectCard key={p.id} project={p} delay={i + 1} large onOpen={() => setSelected(p)} />
        ))}
      </div>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}

export default function HomePage({ goTo }) {
  const [go, setGo] = useState(false);
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [orbOffset, setOrbOffset] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const m1 = useMagnetic(0.3);
  const m2 = useMagnetic(0.3);

  useEffect(() => { setTimeout(() => setGo(true), 80); }, []);
  useReveal();

  useEffect(() => {
    const el = heroRef.current; if (!el) return;
    let rafId;
    const onMove = e => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        setGlow({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
        setOrbOffset({ x: (e.clientX - window.innerWidth / 2) * 0.025, y: (e.clientY - window.innerHeight / 2) * 0.025 });
      });
    };
    el.addEventListener('mousemove', onMove);
    return () => { el.removeEventListener('mousemove', onMove); cancelAnimationFrame(rafId); };
  }, []);

  const words = ['Axel', 'Darren', 'Suryanto'];

  return (
    <div className="page-enter">
      {/* ── HERO ── */}
      <section
        ref={heroRef}
        style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', padding: '120px 32px 80px', position: 'relative', overflow: 'hidden' }}
      >
        <div className="hero-glow" style={{ background: `radial-gradient(600px circle at ${glow.x}% ${glow.y}%, oklch(0.65 0.16 30 / 0.07) 0%, transparent 70%)` }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div className="orb" style={{ width: 520, height: 520, background: 'var(--accent-dim)', top: '-8%', right: '-4%', transform: `translate(${-orbOffset.x * 0.6}px,${-orbOffset.y * 0.6}px)`, transition: 'transform .3s ease-out' }} />
          <div className="orb" style={{ width: 300, height: 300, background: 'var(--accent-dim2)', bottom: '12%', left: '-4%', opacity: .35, animationDelay: '-4s', transform: `translate(${orbOffset.x}px,${orbOffset.y}px)`, transition: 'transform .3s ease-out' }} />

          <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--accent)', letterSpacing: '0.12em', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 12, opacity: go ? 1 : 0, transition: 'opacity .8s .1s' }}>
            <span style={{ width: 40, height: 1, background: 'var(--accent)', display: 'inline-block' }} />
            FULL STACK ENGINEER · PROJECT MANAGER · JAKARTA, ID
          </div>

          <h1
            className={`word-anim ${go ? 'go' : ''}`}
            style={{ fontSize: 'clamp(52px,10vw,120px)', fontWeight: 800, lineHeight: .9, letterSpacing: '-.045em', marginBottom: 36 }}
          >
            {words.map((w, i) => (
              <span key={w} style={{ display: 'block', transitionDelay: `${.15 + i * .12}s` }}>
                {w === 'Darren' ? <span className="gradient-text">{w}</span> : w}
              </span>
            ))}
          </h1>

          <p style={{ fontSize: 'clamp(15px,2vw,18px)', color: 'var(--fg2)', maxWidth: 500, lineHeight: 1.72, marginBottom: 52, opacity: go ? 1 : 0, transform: go ? 'none' : 'translateY(20px)', transition: 'opacity .9s .55s, transform .9s cubic-bezier(0.16,1,0.3,1) .55s' }}>
            I build scalable backend systems and full-stack applications — blending engineering precision with strategic product thinking across 8+ internships.
          </p>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', opacity: go ? 1 : 0, transition: 'opacity .9s .7s' }}>
            <span ref={m1} style={{ display: 'inline-block' }}>
              <button
                onClick={() => goTo('projects')}
                style={{ background: 'var(--accent)', color: '#fff', border: 'none', padding: '14px 32px', borderRadius: 10, fontWeight: 600, fontSize: 15, cursor: 'none', fontFamily: 'var(--font)', transition: 'box-shadow .3s' }}
                onMouseEnter={e => { e.target.style.boxShadow = '0 8px 32px var(--accent-dim2)'; }}
                onMouseLeave={e => { e.target.style.boxShadow = 'none'; }}
              >View All Projects →</button>
            </span>
            <span ref={m2} style={{ display: 'inline-block' }}>
              <button
                onClick={() => goTo('experience')}
                style={{ background: 'transparent', color: 'var(--fg)', border: '1px solid var(--card-border)', padding: '14px 32px', borderRadius: 10, fontWeight: 500, fontSize: 15, cursor: 'none', fontFamily: 'var(--font)', transition: 'border-color .2s, color .2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--card-border)'; e.currentTarget.style.color = 'var(--fg)'; }}
              >My Experience</button>
            </span>
          </div>

          <div style={{ position: 'absolute', bottom: 40, left: 0, display: 'flex', alignItems: 'center', gap: 10, color: 'var(--fg3)', fontSize: 11, fontFamily: 'var(--mono)', letterSpacing: '0.1em', opacity: go ? 1 : 0, transition: 'opacity 1s 1s' }}>
            <div style={{ width: 1, height: 48, background: 'var(--fg3)' }} />SCROLL
          </div>

          <div style={{ position: 'absolute', right: '-2vw', top: '50%', transform: `translateY(-50%) translate(${-orbOffset.x * 0.4}px,${-orbOffset.y * 0.4}px)`, fontSize: 'clamp(160px,30vw,420px)', fontWeight: 800, color: 'var(--fg)', opacity: .03, letterSpacing: '-.05em', pointerEvents: 'none', userSelect: 'none', lineHeight: 1, transition: 'transform .4s ease-out' }}>01</div>
        </div>
      </section>

      <Marquee />

      {/* ── ABOUT SNIPPET ── */}
      <section style={{ padding: '100px 32px', background: 'var(--bg2)', borderBottom: '1px solid var(--card-border)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <SectionLabel label="02 / ABOUT" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, marginTop: 56, alignItems: 'start' }} className="about-grid">
            <div className="reveal from-left" style={{ position: 'relative' }}>
              <div style={{ aspectRatio: '4/3', background: 'var(--card)', borderRadius: 20, border: '1px solid var(--card-border)', overflow: 'hidden', position: 'relative' }}>
                <img src="/Axel_Photo.jpg" alt="Axel Darren Suryanto" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: 60, height: 4, background: 'var(--accent)' }} />
              </div>
              <div style={{ position: 'absolute', top: 20, right: -8, background: 'var(--accent)', color: '#fff', padding: '6px 14px', borderRadius: 8, fontSize: 11, fontFamily: 'var(--mono)', fontWeight: 500, letterSpacing: '.08em' }}>3+ yrs exp.</div>
            </div>

            <div>
              <h2 className="reveal reveal-delay-1" style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-.03em', marginBottom: 20 }}>Full Stack Developer<br />&amp; Project Manager</h2>
              <p className="reveal reveal-delay-2" style={{ color: 'var(--fg2)', lineHeight: 1.8, marginBottom: 16, fontSize: 15 }}>With 3+ years of experience, I build scalable web and mobile applications using React, Next.js, Flutter, Node.js, and PostgreSQL — from polished UIs to secure APIs on Google Cloud.</p>
              <p className="reveal reveal-delay-3" style={{ color: 'var(--fg2)', lineHeight: 1.8, marginBottom: 32, fontSize: 15 }}>Beyond engineering, I lead cross-functional teams as a technical Project Manager — shipping products from planning to production across 8+ internship roles.</p>
              <div className="reveal reveal-delay-4" style={{ display: 'flex', gap: 28, marginBottom: 32, flexWrap: 'wrap' }}>
                {[{ l: 'Based in', v: 'Jakarta, ID' }, { l: 'Experience', v: '8 Internships' }, { l: 'Open to', v: 'Full-time & Freelance' }].map(item => (
                  <div key={item.l}>
                    <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--fg3)', letterSpacing: '.08em', marginBottom: 3 }}>{item.l}</div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{item.v}</div>
                  </div>
                ))}
              </div>
              <div className="reveal reveal-delay-5" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <MagBtn accent onClick={() => goTo('contact')}>Get in Touch</MagBtn>
                <MagBtn href="https://drive.google.com/uc?export=download&id=12bWf8EbfKedqNg9uT3zcQuBiNl7T9_sv" target="_blank">Download CV</MagBtn>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      {/* ── FEATURED PROJECTS ── */}
      <section style={{ padding: '100px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <SectionLabel label="03 / FEATURED WORK" />
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 32, marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <h2 className="reveal" style={{ fontSize: 'clamp(26px,4vw,48px)', fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.05 }}>Selected<br />Projects</h2>
            <MagBtn onClick={() => goTo('projects')}>View All Projects →</MagBtn>
          </div>
          <FeaturedProjectGrid goTo={goTo} />
        </div>
      </section>

      <Marquee />

      {/* ── EXPERIENCE TEASER ── */}
      <section style={{ padding: '100px 32px', background: 'var(--bg2)', borderTop: '1px solid var(--card-border)', borderBottom: '1px solid var(--card-border)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <SectionLabel label="04 / EXPERIENCE" />
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 32, marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <h2 className="reveal" style={{ fontSize: 'clamp(26px,4vw,48px)', fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.05 }}>8 Roles Across<br />Tech &amp; Management</h2>
            <MagBtn onClick={() => goTo('experience')}>Full Timeline →</MagBtn>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
            {experiences.slice(0, 4).map((exp, i) => (
              <div key={exp.id} className={`reveal reveal-delay-${i + 1}`} style={{ background: 'var(--card)', borderRadius: 14, border: '1px solid var(--card-border)', padding: '22px 24px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: 3, height: '100%', background: typeColors[exp.type] || 'var(--accent)' }} />
                <div style={{ marginLeft: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 10, fontFamily: 'var(--mono)', padding: '2px 8px', borderRadius: 4, background: `${typeColors[exp.type] || 'var(--accent)'}22`, color: typeColors[exp.type] || 'var(--accent)', fontWeight: 500, letterSpacing: '.06em' }}>{typeLabels[exp.type] || 'Engineering'}</span>
                    {exp.current && <span style={{ fontSize: 10, fontFamily: 'var(--mono)', padding: '2px 8px', borderRadius: 4, background: 'var(--accent-dim)', color: 'var(--accent)', fontWeight: 500 }}>CURRENT</span>}
                  </div>
                  <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--fg3)', letterSpacing: '.06em', marginBottom: 4 }}>{exp.period}</div>
                  <h3 style={{ fontWeight: 700, fontSize: 15, letterSpacing: '-.01em', marginBottom: 3 }}>{exp.company}</h3>
                  <div style={{ fontSize: 13, color: 'var(--fg2)' }}>{exp.role}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <MagBtn accent onClick={() => goTo('experience')}>View All 8 Experiences →</MagBtn>
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ── */}
      <section style={{ padding: '100px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div className="reveal" style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: '.12em', marginBottom: 24 }}>05 / CONTACT</div>
          <h2 className="reveal reveal-delay-1" style={{ fontSize: 'clamp(32px,5vw,64px)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1, marginBottom: 20 }}>Let's Build <span className="gradient-text">Something</span></h2>
          <p className="reveal reveal-delay-2" style={{ color: 'var(--fg2)', lineHeight: 1.8, fontSize: 16, marginBottom: 40 }}>Have a project in mind, want to collaborate, or just want to say hi? My inbox is always open.</p>
          <div className="reveal reveal-delay-3" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <MagBtn accent onClick={() => goTo('contact')}>Send a Message</MagBtn>
            <MagBtn href="mailto:axeldarren.suryanto@gmail.com">axeldarren.suryanto@gmail.com</MagBtn>
          </div>
        </div>
      </section>
    </div>
  );
}
