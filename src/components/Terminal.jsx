import { useEffect, useState } from 'react';

// Terminal stays dark in both themes — colors are fixed, not tokenized
const C = {
  fg: '#e8e2da',
  key: '#8d857d',
  str: '#dd9a6e',
  punc: '#5e5852',
  green: '#7ec699',
};

const json = (key, val, color = C.str, comma = true) => ({
  segments: [
    { t: `  "${key}": `, c: C.key },
    { t: val, c: color },
    ...(comma ? [{ t: ',', c: C.punc }] : []),
  ],
});

const SCRIPT = [
  { cmd: 'whoami' },
  { out: [{ segments: [{ t: 'Axel Darren Suryanto — Full Stack Engineer & PM', c: C.fg }] }] },
  { cmd: 'cat profile.json' },
  {
    out: [
      { segments: [{ t: '{', c: C.punc }] },
      json('stack', '["React", "Next.js", "Node.js", "GCP"]'),
      json('also', '["Flutter", "PostgreSQL", "Prisma"]'),
      json('experience', '"8+ internships · 3+ yrs"'),
      json('leads', '"cross-functional teams as PM"'),
      json('based_in', '"Jakarta, ID (GMT+7)"'),
      json('status', '"OPEN TO WORK ✓"', C.green, false),
      { segments: [{ t: '}', c: C.punc }] },
    ],
  },
];

const allLines = SCRIPT.flatMap(step =>
  step.cmd
    ? [{ prompt: true, segments: [{ t: step.cmd, c: C.fg }] }]
    : step.out
);

export default function Terminal() {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLines([...allLines, { prompt: true, segments: [] }]);
      return;
    }

    let cancelled = false;
    const timeouts = [];
    const wait = ms => new Promise(r => timeouts.push(setTimeout(r, ms)));
    const local = [];
    const sync = () => { if (!cancelled) setLines([...local]); };

    (async () => {
      await wait(900); // let the hero entrance finish first
      for (const step of SCRIPT) {
        if (cancelled) return;
        if (step.cmd) {
          local.push({ prompt: true, segments: [{ t: '', c: C.fg }] });
          for (let i = 1; i <= step.cmd.length; i++) {
            if (cancelled) return;
            local[local.length - 1] = { prompt: true, segments: [{ t: step.cmd.slice(0, i), c: C.fg }] };
            sync();
            await wait(45 + Math.random() * 50);
          }
          await wait(300);
        } else {
          for (const line of step.out) {
            if (cancelled) return;
            local.push(line);
            sync();
            await wait(75);
          }
          await wait(400);
        }
      }
      local.push({ prompt: true, segments: [] });
      sync();
    })();

    return () => { cancelled = true; timeouts.forEach(clearTimeout); };
  }, []);

  const last = lines.length - 1;

  return (
    <div style={{
      background: '#131009', borderRadius: 14, overflow: 'hidden',
      border: '1px solid oklch(0.24 0.012 60)',
      boxShadow: '0 24px 80px oklch(0 0 0 / .35)',
      width: '100%',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '11px 15px', background: '#1a1611', borderBottom: '1px solid oklch(0.22 0.012 60)' }}>
        {['#ff5f57', '#febc2e', '#28c840'].map(c => (
          <span key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
        ))}
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#6b645d', marginLeft: 8 }}>axel@portfolio — zsh</span>
      </div>
      <div
        aria-label="Terminal showing profile: Axel Darren Suryanto, Full Stack Engineer and PM, open to work"
        style={{ padding: '18px 20px 22px', fontFamily: 'var(--mono)', fontSize: 12.5, lineHeight: 1.85, minHeight: 296 }}
      >
        {lines.map((line, i) => (
          <div key={i} style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {line.prompt && <span style={{ color: 'var(--accent)' }}>$ </span>}
            {line.segments.map((s, j) => <span key={j} style={{ color: s.c }}>{s.t}</span>)}
            {i === last && <span className="term-cursor" />}
          </div>
        ))}
      </div>
    </div>
  );
}
