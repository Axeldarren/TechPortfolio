import { useState, useEffect } from 'react';
import { useReveal } from '../hooks';
import { allProjects, experiences, typeColors, typeLabels } from '../data';
import LogoTicker from '../components/LogoTicker';
import MagBtn from '../components/MagBtn';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import Terminal from '../components/Terminal';

const CV_URL = 'https://drive.google.com/uc?export=download&id=12bWf8EbfKedqNg9uT3zcQuBiNl7T9_sv';

function FeaturedProjectGrid() {
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

  useEffect(() => { setTimeout(() => setGo(true), 80); }, []);
  useReveal();

  return (
    <div className="page-enter">
      {/* ── HERO ── */}
      <section
        className="hero-section"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', padding: '120px 32px 80px', position: 'relative', overflow: 'hidden' }}
      >
        {/* Single subtle background accent — no orbs, no cursor-tracking glow */}
        <div className="orb" style={{ width: 600, height: 600, background: 'var(--accent-dim)', top: '-15%', right: '-10%' }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div className="hero-grid">
            {/* Left — identity & CTAs */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 26, opacity: go ? 1 : 0, transition: 'opacity .8s .1s' }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '6px 14px', borderRadius: 99,
                  background: 'oklch(0.7 0.17 150 / 0.1)', border: '1px solid oklch(0.7 0.17 150 / 0.25)',
                  fontSize: 12, fontWeight: 500,
                  color: 'oklch(0.58 0.13 150)',
                }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'currentColor', animation: 'pulse-dot 2s ease-in-out infinite' }} />
                  Open to work
                </span>
                <span style={{ fontSize: 13, color: 'var(--fg3)' }}>
                  Full Stack Engineer · Project Manager
                </span>
              </div>

              <h1
                className={`word-anim ${go ? 'go' : ''}`}
                style={{ fontSize: 'clamp(44px,7.5vw,84px)', fontWeight: 800, lineHeight: .95, letterSpacing: '-.04em', marginBottom: 28 }}
              >
                <span style={{ display: 'block', transitionDelay: '.15s' }}>Axel <span className="gradient-text">Darren</span></span>
                <span style={{ display: 'block', transitionDelay: '.27s' }}>Suryanto</span>
              </h1>

              <p style={{ fontSize: 'clamp(15px,2vw,17px)', color: 'var(--fg2)', maxWidth: 460, lineHeight: 1.72, marginBottom: 40, opacity: go ? 1 : 0, transform: go ? 'none' : 'translateY(20px)', transition: 'opacity .9s .5s, transform .9s cubic-bezier(0.16,1,0.3,1) .5s' }}>
                I build scalable backend systems and full-stack applications — blending engineering precision with strategic product thinking across 8+ internships.
              </p>

              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', opacity: go ? 1 : 0, transition: 'opacity .9s .65s' }}>
                <MagBtn accent onClick={() => goTo('projects')}>View Projects →</MagBtn>
                <MagBtn href={CV_URL} target="_blank">Download CV ↓</MagBtn>
              </div>
            </div>

            {/* Right — live terminal card */}
            <div style={{ opacity: go ? 1 : 0, transform: go ? 'none' : 'translateY(28px)', transition: 'opacity .9s .45s, transform .9s cubic-bezier(0.16,1,0.3,1) .45s' }}>
              <Terminal />
            </div>
          </div>
        </div>
      </section>

      <LogoTicker />

      {/* ── ABOUT ── */}
      <section style={{ padding: '120px 32px 100px', background: 'var(--bg2)', borderBottom: '1px solid var(--card-border)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }} className="about-grid">
            <div className="reveal from-left" style={{ position: 'relative' }}>
              <div style={{ aspectRatio: '4/3', background: 'var(--card)', borderRadius: 20, border: '1px solid var(--card-border)', overflow: 'hidden', position: 'relative' }}>
                <img src="/Axel_photos.webp" alt="Axel Darren Suryanto" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>

            <div>
              <h2 className="reveal" style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-.03em', marginBottom: 20 }}>Full Stack Developer<br />&amp; Project Manager</h2>
              <p className="reveal reveal-delay-1" style={{ color: 'var(--fg2)', lineHeight: 1.8, marginBottom: 16, fontSize: 15 }}>With 3+ years of experience, I build scalable web and mobile applications using React, Next.js, Flutter, Node.js, and PostgreSQL — from polished UIs to secure APIs on Google Cloud.</p>
              <p className="reveal reveal-delay-2" style={{ color: 'var(--fg2)', lineHeight: 1.8, marginBottom: 32, fontSize: 15 }}>Beyond engineering, I lead cross-functional teams as a technical Project Manager — shipping products from planning to production across multiple industries.</p>
              <div className="reveal reveal-delay-3" style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
                {[{ l: 'Based in', v: 'Jakarta, ID' }, { l: 'Experience', v: '8 Internships' }, { l: 'Open to', v: 'Full-time & Freelance' }].map(item => (
                  <div key={item.l}>
                    <div style={{ fontSize: 12, color: 'var(--fg3)', marginBottom: 3 }}>{item.l}</div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{item.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      <section style={{ padding: '80px 32px 100px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <h2 className="reveal" style={{ fontSize: 'clamp(26px,4vw,48px)', fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.05 }}>Selected<br />Projects</h2>
            <MagBtn onClick={() => goTo('projects')}>View All Projects →</MagBtn>
          </div>
          <FeaturedProjectGrid />
        </div>
      </section>

      {/* ── EXPERIENCE TEASER ── */}
      <section style={{ padding: '100px 32px 80px', background: 'var(--bg2)', borderTop: '1px solid var(--card-border)', borderBottom: '1px solid var(--card-border)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 48 }}>
            <h2 className="reveal" style={{ fontSize: 'clamp(26px,4vw,48px)', fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.05 }}>8 Roles Across<br />Tech &amp; Management</h2>
          </div>
          {/* Stacked list — no cards, just clean typography with accent borders */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {experiences.slice(0, 4).map((exp, i) => (
              <div
                key={exp.id}
                className={`reveal reveal-delay-${Math.min(i + 1, 4)}`}
                style={{
                  padding: '20px 0 20px 20px',
                  borderLeft: `2px solid ${typeColors[exp.type] || 'var(--accent)'}`,
                  borderBottom: '1px solid var(--card-border)',
                  display: 'grid', gridTemplateColumns: '140px 1fr auto', gap: 16, alignItems: 'center',
                }}
              >
                <span style={{ fontSize: 13, color: 'var(--fg3)' }}>{exp.period}</span>
                <div>
                  <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: '-.01em' }}>{exp.company}</span>
                  <span style={{ fontSize: 13, color: 'var(--fg2)', marginLeft: 12 }}>{exp.role}</span>
                </div>
                <span style={{ fontSize: 11, fontFamily: 'var(--mono)', padding: '2px 8px', borderRadius: 4, background: `${typeColors[exp.type] || 'var(--accent)'}15`, color: typeColors[exp.type] || 'var(--accent)', fontWeight: 500 }}>{typeLabels[exp.type] || 'Engineering'}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32 }}>
            <MagBtn accent onClick={() => goTo('experience')}>View Full Timeline →</MagBtn>
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ── */}
      <section style={{ padding: '140px 32px 120px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2 className="reveal" style={{ fontSize: 'clamp(32px,5vw,56px)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1, marginBottom: 20 }}>Let's build <span className="gradient-text">something</span></h2>
          <p className="reveal reveal-delay-1" style={{ color: 'var(--fg2)', lineHeight: 1.8, fontSize: 16, marginBottom: 40, maxWidth: 480 }}>Have a project in mind, want to collaborate, or just want to say hi? My inbox is always open.</p>
          <div className="reveal reveal-delay-2" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <MagBtn accent onClick={() => goTo('contact')}>Send a Message</MagBtn>
            <MagBtn href="mailto:axeldarren.suryanto@gmail.com">axeldarren.suryanto@gmail.com</MagBtn>
          </div>
        </div>
      </section>
    </div>
  );
}
