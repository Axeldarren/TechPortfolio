import { useState } from 'react';
import { Mail, MapPin, MessageCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useReveal } from '../hooks';
import { useToast } from '../hooks/use-toast';
import SectionLabel from '../components/SectionLabel';
import MagBtn from '../components/MagBtn';

export default function ContactPage() {
  useReveal();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  const submit = async e => {
    e.preventDefault();

    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    const history = JSON.parse(localStorage.getItem('portfolio-email-history') || '[]');
    const recentSubmissions = history.filter(time => now - time < oneDay);

    if (recentSubmissions.length >= 3) {
      toast({
        title: "Rate limit reached",
        description: "You've sent 3 messages today. Please try back tomorrow or email me directly.",
        variant: "destructive",
      });
      return;
    }

    setSending(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          reply_to: form.email,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      recentSubmissions.push(now);
      localStorage.setItem('portfolio-email-history', JSON.stringify(recentSubmissions));

      toast({
        title: "Message sent!",
        description: "Thanks for reaching out, I'll get back to you soon.",
      });
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('FAILED...', err);
      toast({
        title: "Couldn't send message",
        description: "Please try again later or email me directly.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const inputStyle = {
    // 16px minimum — smaller font-size makes iOS Safari zoom in on focus
    width: '100%', padding: '12px 16px', borderRadius: 8, fontSize: 16,
    border: '1px solid var(--card-border)', background: 'var(--bg)',
    color: 'var(--fg)', fontFamily: 'var(--font)', outline: 'none',
    transition: 'border-color .2s',
  };

  const contacts = [
    { icon: Mail, label: 'Email', val: 'axeldarren.suryanto@gmail.com', href: 'mailto:axeldarren.suryanto@gmail.com' },
    { icon: MapPin, label: 'Location', val: 'Jakarta, Indonesia', href: null },
    { icon: MessageCircle, label: 'WhatsApp', val: '+62 859-3379-5235', href: 'https://wa.me/6285933795235' },
  ];

  const socials = [
    { l: 'LinkedIn', h: 'https://www.linkedin.com/in/axelsuryanto/' },
    { l: 'GitHub', h: 'https://github.com/Axeldarren' },
    { l: 'Instagram', h: 'https://www.instagram.com/axel_suryanto/' },
  ];

  return (
    <div className="page-enter" style={{ padding: '120px 32px 80px', maxWidth: 1100, margin: '0 auto' }}>
      <SectionLabel label="04 / CONTACT" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, marginTop: 64, alignItems: 'start' }} className="contact-grid">
        {/* Left column */}
        <div>
          <h1 className="reveal" style={{ fontSize: 'clamp(28px,5vw,56px)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1, marginBottom: 24 }}>
            Let's Build<br /><span className="gradient-text">Something</span>
          </h1>
          <p className="reveal reveal-delay-1" style={{ color: 'var(--fg2)', lineHeight: 1.8, fontSize: 16, marginBottom: 48 }}>
            Have a project in mind, want to collaborate, or just want to say hi? My inbox is always open.
          </p>

          <div className="reveal reveal-delay-2" style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 48 }}>
            {contacts.map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--accent-dim)', border: '1px solid var(--accent-dim2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', flexShrink: 0 }} aria-hidden="true"><item.icon size={18} /></div>
                <div>
                  <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--fg3)', letterSpacing: '.08em', marginBottom: 2 }}>{item.label}</div>
                  {item.href
                    ? <a href={item.href} style={{ color: 'var(--fg)', textDecoration: 'none', fontWeight: 500, fontSize: 14, transition: 'color .2s' }} onMouseEnter={e => { e.target.style.color = 'var(--accent)'; }} onMouseLeave={e => { e.target.style.color = 'var(--fg)'; }}>{item.val}</a>
                    : <span style={{ fontWeight: 500, fontSize: 14 }}>{item.val}</span>
                  }
                </div>
              </div>
            ))}
          </div>

          <div className="reveal reveal-delay-3" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {socials.map(s => (
              <a
                key={s.l} href={s.h} target="_blank" rel="noopener noreferrer"
                style={{ padding: '8px 16px', borderRadius: 8, fontSize: 12, fontFamily: 'var(--mono)', fontWeight: 500, textDecoration: 'none', border: '1px solid var(--card-border)', color: 'var(--fg2)', transition: 'all .2s', letterSpacing: '.04em' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-dim)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--card-border)'; e.currentTarget.style.color = 'var(--fg2)'; e.currentTarget.style.background = 'transparent'; }}
              >{s.l} ↗</a>
            ))}
          </div>
        </div>

        {/* Contact form */}
        <div className="reveal reveal-delay-2" style={{ background: 'var(--card)', borderRadius: 16, border: '1px solid var(--card-border)', padding: 40 }}>
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[{ id: 'name', label: 'Your Name', type: 'text', ph: 'Alex Johnson' }, { id: 'email', label: 'Email Address', type: 'email', ph: 'alex@example.com' }].map(f => (
              <div key={f.id}>
                <label style={{ display: 'block', fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--fg3)', letterSpacing: '.08em', marginBottom: 8 }}>{f.label.toUpperCase()}</label>
                <input
                  type={f.type} required placeholder={f.ph}
                  value={form[f.id]} onChange={e => setForm(v => ({ ...v, [f.id]: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = 'var(--accent)'; }}
                  onBlur={e => { e.target.style.borderColor = 'var(--card-border)'; }}
                />
              </div>
            ))}
            <div>
              <label style={{ display: 'block', fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--fg3)', letterSpacing: '.08em', marginBottom: 8 }}>MESSAGE</label>
              <textarea
                required rows={5} placeholder="Hi Axel, I'd love to discuss..."
                value={form.message} onChange={e => setForm(v => ({ ...v, message: e.target.value }))}
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={e => { e.target.style.borderColor = 'var(--accent)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--card-border)'; }}
              />
            </div>
            <button
              type="submit" disabled={sending}
              style={{ background: 'var(--accent)', color: '#fff', border: 'none', padding: 14, borderRadius: 10, fontWeight: 600, fontSize: 15, cursor: 'none', opacity: sending ? .7 : 1, fontFamily: 'var(--font)', transition: 'box-shadow .3s, transform .2s' }}
              onMouseEnter={e => { e.target.style.boxShadow = '0 8px 32px var(--accent-dim2)'; e.target.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.target.style.boxShadow = 'none'; e.target.style.transform = 'none'; }}
            >
              {sending ? 'Sending message...' : 'Send Message →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
