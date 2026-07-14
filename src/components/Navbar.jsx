import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useMagnetic } from '../hooks';

function ThemeToggle({ theme, toggle }) {
  return (
    <button
      onClick={toggle}
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        padding: 10, margin: -10, display: 'flex',
      }}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <span style={{
        background: 'var(--card)', border: '1px solid var(--card-border)',
        borderRadius: 99, width: 44, height: 24,
        position: 'relative', display: 'flex', alignItems: 'center', padding: 2,
      }}>
        <span style={{
          width: 18, height: 18, borderRadius: '50%',
          background: theme === 'dark' ? 'var(--accent)' : 'var(--fg)',
          transform: theme === 'dark' ? 'translateX(20px)' : 'translateX(0)',
          transition: 'transform .4s cubic-bezier(0.34,1.56,0.64,1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: theme === 'dark' ? '#fff' : 'var(--bg)',
        }}>
          {theme === 'dark' ? <Moon size={11} /> : <Sun size={11} />}
        </span>
      </span>
    </button>
  );
}

function HamburgerIcon({ open }) {
  const lineStyle = (y, rot, ty) => ({
    position: 'absolute', left: 2, width: 18, height: 2, borderRadius: 1,
    background: 'currentColor',
    transition: 'transform .35s cubic-bezier(0.16,1,0.3,1), opacity .2s',
    transformOrigin: 'center',
    transform: open
      ? `translateY(${ty}px) rotate(${rot}deg)`
      : `translateY(${y}px) rotate(0deg)`,
  });
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" style={{ position: 'relative', display: 'block' }}>
      <foreignObject x="0" y="0" width="22" height="22">
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ position: 'relative', width: 22, height: 22 }}>
          <span style={lineStyle(5, 45, 10)} />
          <span style={{ ...lineStyle(10, 0, 10), opacity: open ? 0 : 1 }} />
          <span style={lineStyle(15, -45, 10)} />
        </div>
      </foreignObject>
    </svg>
  );
}

function NavLink({ label, active, onClick }) {
  const ref = useMagnetic(0.18);
  return (
    <span ref={ref} style={{ display: 'inline-block' }}>
      <button
        onClick={onClick}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: 13, fontWeight: 500,
          color: active ? 'var(--accent)' : 'var(--fg2)',
          transition: 'color .2s', fontFamily: 'var(--font)',
          padding: '4px 0', position: 'relative',
        }}
      >
        {label}
        <span style={{
          position: 'absolute', bottom: -2, left: 0,
          width: active ? '100%' : '0%', height: 1,
          background: 'var(--accent)',
          transition: 'width .3s cubic-bezier(0.16,1,0.3,1)',
        }} />
      </button>
    </span>
  );
}

export default function Navbar({ page, theme, toggleTheme, goTo }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const nav = [['Home', 'home'], ['Experience', 'experience'], ['Projects', 'projects'], ['Contact', 'contact']];
  const go = p => { goTo(p); setMenuOpen(false); };

  return (
    <>
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? '12px 0' : '20px 0',
      background: scrolled ? 'var(--nav-bg)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--card-border)' : '1px solid transparent',
      transition: 'all .4s cubic-bezier(0.16,1,0.3,1)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={() => go('home')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, padding: 0 }}
        >
          <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--accent)', fontWeight: 500 }}>ADS</span>
          <span style={{ fontSize: 12, color: 'var(--fg3)' }}>/ portfolio</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="desktop-nav">
          {nav.map(([label, p]) => (
            <NavLink key={p} label={label} active={page === p} onClick={() => go(p)} />
          ))}
          <ThemeToggle theme={theme} toggle={toggleTheme} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }} className="mobile-nav">
          <ThemeToggle theme={theme} toggle={toggleTheme} />
          <button
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fg)',
              width: 44, height: 44, margin: '-10px -10px -10px 0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </div>
    </nav>

      {/* Outside <nav>: its backdrop-filter would otherwise become the containing
          block for this fixed overlay, clipping the menu to the navbar strip. */}
      <div style={{
        position: 'fixed', inset: 0, background: 'var(--bg)', zIndex: 99,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28,
        opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'auto' : 'none',
        visibility: menuOpen ? 'visible' : 'hidden',
        transition: 'opacity .3s, visibility .3s',
      }}>
        {nav.map(([label, p], i) => (
          <button
            key={p} onClick={() => go(p)}
            tabIndex={menuOpen ? 0 : -1}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 28, fontWeight: 700, padding: '8px 24px',
              color: page === p ? 'var(--accent)' : 'var(--fg)',
              fontFamily: 'var(--font)',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'none' : 'translateY(16px)',
              transition: menuOpen
                ? `opacity .4s ${.08 + i * .06}s, transform .4s cubic-bezier(0.16,1,0.3,1) ${.08 + i * .06}s`
                : 'opacity .2s, transform .2s',
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </>
  );
}
