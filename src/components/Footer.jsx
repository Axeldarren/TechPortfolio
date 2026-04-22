export default function Footer({ goTo }) {
  const links = [['Experience', 'experience'], ['Projects', 'projects'], ['Contact', 'contact']];

  return (
    <footer style={{ borderTop: '1px solid var(--card-border)', padding: '28px 32px', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <button
          onClick={() => goTo('home')}
          style={{ background: 'none', border: 'none', cursor: 'none', fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--fg3)', padding: 0 }}
        >
          ADS / portfolio
        </button>

        <div style={{ display: 'flex', gap: 24 }}>
          {links.map(([l, p]) => (
            <button
              key={p}
              onClick={() => { goTo(p); window.scrollTo(0, 0); }}
              style={{ background: 'none', border: 'none', cursor: 'none', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--fg3)', padding: 0, letterSpacing: '.04em', transition: 'color .2s' }}
              onMouseEnter={e => { e.target.style.color = 'var(--accent)'; }}
              onMouseLeave={e => { e.target.style.color = 'var(--fg3)'; }}
            >
              {l}
            </button>
          ))}
        </div>

        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--fg3)' }}>© 2025 Axel Darren Suryanto</span>
      </div>
    </footer>
  );
}
