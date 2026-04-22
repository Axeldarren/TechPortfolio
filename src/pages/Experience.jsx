import { useState, useEffect, useRef } from 'react';
import { useReveal } from '../hooks';
import { experiences, typeColors, typeLabels } from '../data';
import SectionLabel from '../components/SectionLabel';
import ExpEntry from '../components/ExpEntry';

export default function ExperiencePage() {
  useReveal();
  const [filter, setFilter] = useState('all');
  const [lineH, setLineH] = useState(0);
  const timelineRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const el = timelineRef.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const progress = Math.min(Math.max((window.innerHeight - r.top) / (r.height + window.innerHeight * 0.5), 0), 1);
      setLineH(progress * 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const dots = document.querySelectorAll('.timeline-dot');
    const fill = fillRef.current; if (!fill) return;
    dots.forEach(dot => {
      const dotTop = dot.getBoundingClientRect().top;
      const fillBottom = fill.getBoundingClientRect().bottom;
      if (fillBottom >= dotTop) { dot.classList.add('popped'); dot.classList.add('active'); }
    });
  }, [lineH]);

  const types = ['all', 'engineering', 'ai', 'cloud', 'management', 'qa'];
  const visible = filter === 'all' ? experiences : experiences.filter(e => e.type === filter);

  return (
    <div className="page-enter" style={{ padding: '120px 32px 80px', maxWidth: 1100, margin: '0 auto' }}>
      <SectionLabel label="02 / EXPERIENCE" />

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 32, marginBottom: 48, flexWrap: 'wrap', gap: 20 }}>
        <h2 className="reveal" style={{ fontSize: 'clamp(28px,5vw,56px)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.0 }}>Work<br />Timeline</h2>
        <div className="reveal reveal-delay-1" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {types.map(t => (
            <button
              key={t} onClick={() => setFilter(t)}
              style={{
                padding: '6px 14px', borderRadius: 99, fontSize: 11, fontWeight: 500,
                cursor: 'none', fontFamily: 'var(--mono)', letterSpacing: '.04em',
                border: '1px solid',
                background: filter === t ? (typeColors[t] || 'var(--accent)') : 'transparent',
                color: filter === t ? '#fff' : 'var(--fg2)',
                borderColor: filter === t ? (typeColors[t] || 'var(--accent)') : 'var(--card-border)',
                transition: 'all .2s',
              }}
            >
              {t === 'all' ? 'All' : typeLabels[t]}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="reveal reveal-delay-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 12, marginBottom: 64 }}>
        {[{ n: '8', l: 'Internships' }, { n: '3+', l: 'Years Exp.' }, { n: '40+', l: 'APIs Built' }, { n: '5', l: 'Languages' }, { n: '4', l: 'Industries' }].map(s => (
          <div key={s.l} style={{ background: 'var(--card)', borderRadius: 12, border: '1px solid var(--card-border)', padding: '20px 24px', textAlign: 'center' }}>
            <div className="gradient-text" style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-.03em', marginBottom: 4 }}>{s.n}</div>
            <div style={{ fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--fg3)', letterSpacing: '.06em' }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div ref={timelineRef} style={{ position: 'relative', paddingLeft: 48 }}>
        <div className="timeline-line" />
        <div ref={fillRef} className="timeline-line-fill" style={{ height: `${lineH}%` }} />
        {visible.map((exp, i) => (
          <ExpEntry key={exp.id} exp={exp} delay={Math.min(i + 1, 6)} />
        ))}
      </div>
    </div>
  );
}
