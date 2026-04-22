export default function SectionLabel({ label }) {
  return (
    <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
      <span style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--accent)', letterSpacing: '0.12em' }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: 'var(--card-border)' }} />
    </div>
  );
}
