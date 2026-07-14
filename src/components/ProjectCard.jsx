import { use3DTilt } from '../hooks';
import Tag from './Tag';

function ExtLink({ href, label, name }) {
  if (!href) return null;
  return (
    <a
      href={href} target="_blank" rel="noopener noreferrer"
      onClick={e => e.stopPropagation()}
      aria-label={name}
      style={{
        width: 34, height: 34, borderRadius: 7,
        border: '1px solid var(--card-border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        textDecoration: 'none', color: 'var(--fg2)', fontSize: 11,
        background: 'var(--bg2)', transition: 'border-color .2s, color .2s',
        fontFamily: 'var(--mono)', fontWeight: 500,
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--card-border)'; e.currentTarget.style.color = 'var(--fg2)'; }}
    >
      {label}
    </a>
  );
}

export default function ProjectCard({ project, delay, large, onOpen }) {
  const tilt = use3DTilt(7);
  return (
    <div
      ref={tilt}
      className={`reveal reveal-delay-${Math.min(delay, 6)} tilt-card`}
      onClick={onOpen}
      data-hover
      style={{
        background: 'var(--card)', borderRadius: 16,
        border: '1px solid var(--card-border)',
        overflow: 'hidden', cursor: 'pointer',
        display: 'flex', flexDirection: 'column',
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 20px 60px oklch(0 0 0/.13)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div style={{ height: large ? 220 : 170, overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .6s cubic-bezier(0.16,1,0.3,1)' }}
            onMouseEnter={e => { e.target.style.transform = 'scale(1.07)'; }}
            onMouseLeave={e => { e.target.style.transform = 'scale(1)'; }}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            background: 'linear-gradient(135deg, var(--bg2) 0%, var(--card) 100%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.35 }}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            <span style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--fg3)', letterSpacing: '.1em', opacity: 0.6 }}>NDA PROTECTED</span>
          </div>
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,transparent 45%,oklch(0 0 0/.4) 100%)' }} />
        {project.featured && (
          <div style={{
            position: 'absolute', top: 12, left: 12,
            background: 'var(--accent)', color: '#fff',
            padding: '3px 10px', borderRadius: 99, fontSize: 10,
            fontFamily: 'var(--mono)', fontWeight: 500, letterSpacing: '.06em',
          }}>FEATURED</div>
        )}
        <div style={{
          position: 'absolute', top: 12, right: 12,
          background: 'oklch(0 0 0/.5)', backdropFilter: 'blur(8px)',
          color: '#fff', padding: '4px 10px', borderRadius: 99,
          fontSize: 10, fontFamily: 'var(--mono)', letterSpacing: '.06em',
        }}>EXPLORE →</div>
      </div>

      <div style={{ padding: large ? '22px 26px 26px' : '18px 20px 22px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
          <div>
            <div style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--fg3)', letterSpacing: '.08em', marginBottom: 2 }}>{project.subtitle}</div>
            <h3 style={{ fontWeight: 700, fontSize: large ? 19 : 16, letterSpacing: '-.02em' }}>{project.title}</h3>
          </div>
          <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
            {project.demo && <ExtLink href={project.demo} label="↗" name={`${project.title} live demo`} />}
            {project.github && <ExtLink href={project.github} label="GH" name={`${project.title} on GitHub`} />}
          </div>
        </div>
        <p style={{ color: 'var(--fg2)', fontSize: 13, lineHeight: 1.65, flex: 1 }}>{project.description}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {project.tags.map(t => <Tag key={t} label={t} />)}
        </div>
      </div>
    </div>
  );
}
