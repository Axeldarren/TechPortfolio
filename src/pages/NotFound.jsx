import MagBtn from '../components/MagBtn';
import { useReveal } from '../hooks';

export default function NotFound({ goTo }) {
  useReveal();
  return (
    <div className="page-enter" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 32px 80px', textAlign: 'center' }}>
      <div className="reveal" style={{ fontSize: 'clamp(80px,20vw,200px)', fontWeight: 800, letterSpacing: '-.06em', lineHeight: 0.85, marginBottom: 16 }}>
        <span className="gradient-text">404</span>
      </div>
      <h1 className="reveal reveal-delay-1" style={{ fontSize: 'clamp(20px,3vw,32px)', fontWeight: 700, letterSpacing: '-.02em', marginBottom: 12 }}>
        Page not found
      </h1>
      <p className="reveal reveal-delay-2" style={{ color: 'var(--fg2)', fontSize: 15, lineHeight: 1.7, maxWidth: 400, marginBottom: 40 }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="reveal reveal-delay-3">
        <MagBtn accent onClick={() => goTo('home')}>Back to Home →</MagBtn>
      </div>
    </div>
  );
}