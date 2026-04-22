export default function Tag({ label, color }) {
  return (
    <span style={{
      fontSize: 11, fontFamily: 'var(--mono)', padding: '3px 9px', borderRadius: 4,
      background: color ? `${color}22` : 'var(--accent-dim)',
      color: color || 'var(--accent)', fontWeight: 500, letterSpacing: '0.04em',
    }}>
      {label}
    </span>
  );
}
