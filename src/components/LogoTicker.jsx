import React from 'react';

const logos = [
  {
    name: 'PT Transpacific Finance',
    lightSrc: '/logos/transpacific-light.png',
    darkSrc: '/logos/transpacific-dark.png',
    height: 48
  },
  {
    name: 'Bangkit Academy',
    lightSrc: '/logos/bangkit-light.png',
    darkSrc: '/logos/bangkit-dark.png',
    height: 56
  },
  {
    name: 'TEDx Sampoerna University',
    imgSrc: '/logos/tedx-light.png',
    height: 42
  },
  {
    name: 'Connextion',
    svg: (
      <svg viewBox="0 0 135 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: 34, width: 'auto' }}>
        <circle cx="7" cy="15" r="3" fill="var(--accent)" />
        <circle cx="19" cy="7" r="3" fill="currentColor" />
        <circle cx="19" cy="23" r="3" fill="currentColor" />
        <line x1="7" y1="15" x2="19" y2="7" stroke="var(--fg3)" strokeWidth="1.5" />
        <line x1="7" y1="15" x2="19" y2="23" stroke="var(--fg3)" strokeWidth="1.5" />
        <line x1="19" y1="7" x2="19" y2="23" stroke="var(--accent)" strokeWidth="1.5" />
        <text x="32" y="20" fontFamily="var(--font-sans, system-ui, -apple-system, sans-serif)" fontWeight="800" fontSize="13" letterSpacing="0.8" fill="currentColor">CONNEXTION</text>
      </svg>
    )
  },
  {
    name: 'PT SPIL',
    imgSrc: '/logos/spil.png',
    height: 52
  },
  {
    name: 'GDSC',
    imgSrc: '/logos/gdsc.png',
    height: 46
  }
];

export default function LogoTicker() {
  return (
    <div style={{
      width: '100%',
      padding: '48px 32px',
      background: 'var(--bg)',
      borderBottom: '1px solid var(--card-border)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style>{`
        .logo-ticker-container {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 40px;
        }
        @media (max-width: 900px) {
          .logo-ticker-container {
            flex-direction: column;
            align-items: flex-start;
            gap: 24px;
          }
          .logo-ticker-divider {
            display: none;
          }
        }
        .logo-ticker-info {
          flex-shrink: 0;
        }
        .logo-ticker-divider {
          width: 1px;
          height: 48px;
          background: var(--card-border);
          flex-shrink: 0;
        }
        .logo-ticker-grid {
          flex-grow: 1;
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 24px;
          align-items: center;
          justify-items: center;
          width: 100%;
        }
        @media (max-width: 1100px) {
          .logo-ticker-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 32px 24px;
          }
        }
        @media (max-width: 600px) {
          .logo-ticker-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
        }
        .logo-item-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.3s ease;
        }
        .logo-img-light {
          display: block;
        }
        .logo-img-dark {
          display: none;
        }
        [data-theme='dark'] .logo-img-light {
          display: none;
        }
        [data-theme='dark'] .logo-img-dark {
          display: block;
        }
        
        /* Light mode default: subtle grayscale */
        .logo-item-wrapper img,
        .logo-item-wrapper svg {
          filter: grayscale(1) brightness(0.85);
          opacity: 0.55;
          transition: filter 0.3s ease, opacity 0.3s ease;
        }
        
        /* Dark mode default: completely monochromatic white logos */
        [data-theme='dark'] .logo-item-wrapper img,
        [data-theme='dark'] .logo-item-wrapper svg {
          filter: brightness(0) invert(1);
          opacity: 0.5;
        }
        
        /* Hover state: reveal full colors in light mode */
        .logo-item-wrapper:hover img,
        .logo-item-wrapper:hover svg {
          opacity: 1 !important;
          filter: none !important;
        }
        
        /* Hover state: reveal full colors on hover in dark mode (default) */
        [data-theme='dark'] .logo-item-wrapper:hover img,
        [data-theme='dark'] .logo-item-wrapper:hover svg {
          opacity: 1 !important;
          filter: none !important;
        }

        /* Hover state: stay white but light up to bright white in dark mode (only TEDx and Transpacific) */
        [data-theme='dark'] .logo-item-wrapper.logo-keep-white:hover img {
          filter: brightness(0) invert(1) !important;
          opacity: 1 !important;
        }
      `}</style>

      <div className="logo-ticker-container">
        <div className="logo-ticker-info">
          <div style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'var(--font-sans, system-ui, sans-serif)', color: 'var(--fg)', lineHeight: 1 }}>
            Worked With
          </div>
          <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--fg3)', marginTop: 4, letterSpacing: '0.05em' }}>
            COMPANIES &amp; PROGRAMS
          </div>
        </div>

        <div className="logo-ticker-divider" />

        <div className="logo-ticker-grid">
          {logos.map((logo, i) => {
            const keepWhite = logo.name === 'TEDx Sampoerna University';
            const logoClass = keepWhite ? 'logo-keep-white' : '';
            return (
              <div 
                key={i} 
                title={logo.name}
                className={`logo-item-wrapper ${logoClass}`}
              >
                {logo.lightSrc && logo.darkSrc ? (
                  <>
                    <img 
                      src={logo.lightSrc} 
                      alt={logo.name} 
                      className="logo-img-light"
                      style={{ height: logo.height, width: 'auto' }} 
                    />
                    <img 
                      src={logo.darkSrc} 
                      alt={logo.name} 
                      className="logo-img-dark"
                      style={{ height: logo.height, width: 'auto' }} 
                    />
                  </>
                ) : logo.imgSrc ? (
                  <img 
                    src={logo.imgSrc} 
                    alt={logo.name} 
                    style={{ height: logo.height, width: 'auto' }} 
                  />
                ) : (
                  logo.svg
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
