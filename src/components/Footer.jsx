import { Linkedin, Github, Instagram } from 'lucide-react';

export default function Footer({ goTo }) {
  const links = [['Experience', 'experience'], ['Projects', 'projects'], ['Contact', 'contact']];
  const socials = [
    { l: 'LinkedIn', h: 'https://www.linkedin.com/in/axelsuryanto/', icon: Linkedin },
    { l: 'GitHub', h: 'https://github.com/Axeldarren', icon: Github },
    { l: 'Instagram', h: 'https://www.instagram.com/axel_suryanto/', icon: Instagram },
  ];

  return (
    <footer style={{ borderTop: '1px solid var(--card-border)', padding: '40px 32px 28px', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
          <button
            onClick={() => goTo('home')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--fg3)', padding: 0 }}
          >
            ADS / portfolio
          </button>

          <div style={{ display: 'flex', gap: 24 }}>
            {links.map(([l, p]) => (
              <button
                key={p}
                onClick={() => { goTo(p); window.scrollTo(0, 0); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--fg3)', padding: '12px 4px', letterSpacing: '.04em', transition: 'color .2s' }}
                onMouseEnter={e => { e.target.style.color = 'var(--accent)'; }}
                onMouseLeave={e => { e.target.style.color = 'var(--fg3)'; }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'var(--card-border)', marginBottom: 20 }} />

        {/* Bottom row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--fg3)' }}>
            © {new Date().getFullYear()} Axel Darren Suryanto
          </span>

          <div style={{ display: 'flex', gap: 16 }}>
            {socials.map(s => {
              const Icon = s.icon;
              return (
                <a
                  key={s.l}
                  href={s.h}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.l}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--fg3)', textDecoration: 'none', transition: 'color .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--fg3)'; }}
                >
                  <Icon size={14} strokeWidth={1.5} />
                  {s.l}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

