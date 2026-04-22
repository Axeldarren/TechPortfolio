const items = [
  'Full Stack Development', 'Backend Engineering', 'Project Management',
  'Google Cloud', 'React & Next.js', 'Node.js', 'PostgreSQL',
  'Agile & Scrum', 'Flutter', 'AI / LLM',
];

export default function Marquee() {
  return (
    <div style={{
      overflow: 'hidden',
      borderTop: '1px solid var(--card-border)',
      borderBottom: '1px solid var(--card-border)',
      background: 'var(--bg2)',
      padding: '12px 0',
    }}>
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: 24, paddingRight: 40,
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em',
            color: 'var(--fg3)', whiteSpace: 'nowrap', fontWeight: 500,
          }}>
            <span style={{ color: 'var(--accent)', fontSize: 8 }}>◆</span>
            {item.toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  );
}
