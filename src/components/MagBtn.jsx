import { useMagnetic } from '../hooks';

export default function MagBtn({ href, onClick, accent, children, target }) {
  const ref = useMagnetic(0.25);
  const base = {
    background: accent ? 'var(--accent)' : 'transparent',
    color: accent ? '#fff' : 'var(--fg)',
    textDecoration: 'none', padding: '12px 28px', borderRadius: 10,
    fontWeight: 600, fontSize: 14, display: 'inline-block',
    border: '1px solid', borderColor: accent ? 'var(--accent)' : 'var(--card-border)',
    transition: 'all .25s, box-shadow .3s', cursor: 'none',
  };
  const onEnter = e => {
    if (accent) { e.currentTarget.style.boxShadow = '0 8px 32px var(--accent-dim2)'; }
    else { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }
  };
  const onLeave = e => {
    e.currentTarget.style.boxShadow = 'none';
    e.currentTarget.style.transform = '';
    if (!accent) { e.currentTarget.style.borderColor = 'var(--card-border)'; e.currentTarget.style.color = 'var(--fg)'; }
  };
  const onDown = e => { e.currentTarget.style.transform = 'scale(0.97) translateY(1px)'; };
  const onUp = e => { e.currentTarget.style.transform = ''; };

  return (
    <span ref={ref} style={{ display: 'inline-block' }}>
      {href
        ? <a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined} style={base} onMouseEnter={onEnter} onMouseLeave={onLeave} onMouseDown={onDown} onMouseUp={onUp}>{children}</a>
        : <button onClick={onClick} style={{ ...base, fontFamily: 'var(--font)' }} onMouseEnter={onEnter} onMouseLeave={onLeave} onMouseDown={onDown} onMouseUp={onUp}>{children}</button>
      }
    </span>
  );
}
