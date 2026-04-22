import { useState, useEffect, useRef } from 'react';
import { typeColors, typeLabels } from '../data';

export default function ExpEntry({ exp, delay }) {
  const [open, setOpen] = useState(false);
  const dotRef = useRef(null);

  useEffect(() => {
    const el = dotRef.current; if (!el) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => {
            el.classList.add('popped');
            setTimeout(() => el.classList.add('active'), 200);
          }, delay * 60);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  const color = typeColors[exp.type] || 'var(--accent)';

  return (
    <div className={`reveal reveal-delay-${delay} from-left`} style={{ position: 'relative', marginBottom: 36 }}>
      <div
        ref={dotRef}
        className="timeline-dot"
        style={{ background: color, borderColor: 'var(--bg)' }}
      />
      <div
        data-hover
        style={{
          background: 'var(--card)', borderRadius: 14,
          border: '1px solid var(--card-border)', padding: '22px 26px',
          marginLeft: 16, transition: 'border-color .2s, box-shadow .3s, transform .2s',
          cursor: 'none',
        }}
        onClick={() => setOpen(v => !v)}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 40px oklch(0 0 0/.1)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
              <span style={{
                fontSize: 10, fontFamily: 'var(--mono)', padding: '2px 9px', borderRadius: 4,
                background: `${color}22`, color, fontWeight: 500, letterSpacing: '.06em',
              }}>
                {typeLabels[exp.type] || 'Engineering'}
              </span>
              {exp.current && (
                <span style={{
                  fontSize: 10, fontFamily: 'var(--mono)', padding: '2px 9px', borderRadius: 4,
                  background: 'var(--accent-dim)', color: 'var(--accent)', fontWeight: 500,
                  letterSpacing: '.04em', animation: 'pulse-dot 2s ease-in-out infinite',
                }}>● CURRENT</span>
              )}
            </div>
            <h3 style={{ fontWeight: 700, fontSize: 17, letterSpacing: '-.02em', marginBottom: 3 }}>{exp.company}</h3>
            <div style={{ fontWeight: 600, fontSize: 14, color, marginBottom: 4 }}>{exp.role}</div>
            <div style={{ fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--fg3)', letterSpacing: '.04em' }}>
              {exp.period} · {exp.location}
            </div>
          </div>
          <div style={{
            fontSize: 14, color: 'var(--fg3)',
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform .35s cubic-bezier(0.16,1,0.3,1)',
            flexShrink: 0, marginTop: 4,
            width: 28, height: 28, borderRadius: 8, background: 'var(--bg2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>↓</div>
        </div>

        <div style={{ overflow: 'hidden', maxHeight: open ? '700px' : '0', transition: 'max-height .45s cubic-bezier(0.16,1,0.3,1)' }}>
          <div style={{ paddingTop: 20, borderTop: '1px solid var(--card-border)', marginTop: 20 }}>
            <p style={{ fontSize: 13, color: 'var(--fg3)', fontStyle: 'italic', marginBottom: 16, lineHeight: 1.6 }}>{exp.about}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {exp.bullets.map((b, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: color, flexShrink: 0, marginTop: 7 }} />
                  <span style={{ fontSize: 14, color: 'var(--fg)', lineHeight: 1.65 }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
