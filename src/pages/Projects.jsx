import { useState } from 'react';
import { useReveal } from '../hooks';
import { allProjects } from '../data';
import SectionLabel from '../components/SectionLabel';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';

const tags = ['all', 'React', 'Next.js', 'Node.js', 'Python', 'AI', 'GCP', 'C++', 'Flutter'];

export default function ProjectsPage() {
  useReveal();
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');

  const visible = filter === 'all'
    ? allProjects
    : allProjects.filter(p => p.tags.some(t => t === filter || t.includes(filter)));

  return (
    <div className="page-enter" style={{ padding: '120px 32px 80px', maxWidth: 1100, margin: '0 auto' }}>
      <SectionLabel label="03 / PROJECTS" />

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 32, marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
        <h2 className="reveal" style={{ fontSize: 'clamp(28px,5vw,56px)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1 }}>All<br />Projects</h2>
        <a
          className="reveal reveal-delay-1"
          href="https://github.com/Axeldarren" target="_blank" rel="noopener noreferrer"
          style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: 13, fontWeight: 500, fontFamily: 'var(--mono)' }}
        >GitHub Profile ↗</a>
      </div>

      <div className="reveal reveal-delay-2" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 40 }}>
        {tags.map(t => (
          <button
            key={t} onClick={() => setFilter(t)}
            style={{
              padding: '6px 14px', borderRadius: 99, fontSize: 11, fontWeight: 500,
              cursor: 'none', fontFamily: 'var(--mono)', letterSpacing: '.04em',
              border: '1px solid',
              background: filter === t ? 'var(--accent)' : 'transparent',
              color: filter === t ? '#fff' : 'var(--fg2)',
              borderColor: filter === t ? 'var(--accent)' : 'var(--card-border)',
              transition: 'all .2s',
            }}
          >
            {t === 'all' ? 'All' : t}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }} className="bento-grid">
        {visible.map((p, i) => (
          <ProjectCard key={p.id} project={p} delay={Math.min(i + 1, 6)} large={p.featured} onOpen={() => setSelected(p)} />
        ))}
      </div>

      {visible.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--fg3)', fontFamily: 'var(--mono)', fontSize: 13 }}>
          No projects match this filter.
        </div>
      )}

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
