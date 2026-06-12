import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Tag from './Tag';
import MagBtn from './MagBtn';

export default function ProjectModal({ project, onClose }) {
  const [mounted, setMounted] = useState(false);
  const open = !!project;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <>
      <div className={`modal-backdrop ${open ? 'open' : ''}`} onClick={onClose} />
      <div className={`modal-panel ${open ? 'open' : ''}`}>
        {project && (
          <>
            <div style={{ height: 260, position: 'relative', flexShrink: 0 }}>
              <img
                src={project.image} alt={project.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,transparent 20%,var(--bg) 100%)' }} />
              <button
                onClick={onClose}
                aria-label="Close project details"
                style={{
                  position: 'absolute', top: 16, right: 16,
                  width: 44, height: 44, borderRadius: '50%',
                  border: '1.5px solid rgba(255,255,255,.3)',
                  background: 'oklch(0 0 0/.45)', backdropFilter: 'blur(8px)',
                  color: '#fff', fontSize: 18, cursor: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >×</button>
            </div>

            <div style={{ padding: '0 32px 48px', marginTop: -20 }}>
              <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--accent)', letterSpacing: '.1em', marginBottom: 6 }}>
                {project.subtitle}
              </div>
              <h2 style={{ fontSize: 'clamp(24px,4vw,36px)', fontWeight: 800, letterSpacing: '-.03em', marginBottom: 18 }}>
                {project.title}
              </h2>
              <p style={{ color: 'var(--fg2)', lineHeight: 1.8, fontSize: 15, marginBottom: 28 }}>{project.fullDesc}</p>

              <div style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--fg3)', letterSpacing: '.1em', marginBottom: 14 }}>KEY FEATURES</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {project.features.map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
                      <span style={{ fontSize: 14, color: 'var(--fg)', lineHeight: 1.5 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 32 }}>
                <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--fg3)', letterSpacing: '.1em', marginBottom: 12 }}>TECH STACK</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  {project.tags.map(t => <Tag key={t} label={t} />)}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {project.demo && <MagBtn accent href={project.demo} target="_blank">View Live Demo ↗</MagBtn>}
                <MagBtn href={project.github} target="_blank">View on GitHub</MagBtn>
              </div>
            </div>
          </>
        )}
      </div>
    </>,
    document.body
  );
}
