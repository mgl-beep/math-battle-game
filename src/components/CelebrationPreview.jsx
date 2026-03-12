import { useState, useCallback } from 'react';

const COLORS = ['#f1c40f','#e74c3c','#3498db','#2ecc71','#9b59b6','#f39c12','#e91e63','#1abc9c','#ff6f00','#7c4dff','#00bcd4','#4caf50','#ff9800'];
const RAINBOW = ['#e74c3c','#f39c12','#f1c40f','#2ecc71','#3498db','#9b59b6'];

export default function CelebrationPreview({ onBack }) {
  const [active, setActive] = useState(null);
  const [key, setKey] = useState(0);

  const trigger = useCallback((type) => {
    setActive(null);
    setKey(k => k + 1);
    setTimeout(() => setActive(type), 50);
  }, []);

  return (
    <div className="celebration-preview" style={{ padding: '1rem', minHeight: '100vh' }}>
      <div className="screen-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h2>All Celebrations</h2>
      </div>
      <p style={{ textAlign: 'center', color: 'var(--text-dim)', margin: '0.5rem 0 1rem' }}>
        Tap any to preview
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: 400, margin: '0 auto' }}>

        <h3 style={{ margin: '0.5rem 0 0', color: 'var(--text-dim)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Confetti</h3>
        <button className="start-btn" style={{ background: '#9b59b6', width: '100%' }}
          onClick={() => trigger('confetti-rain')}>
          Pixel Rain
        </button>

        <h3 style={{ margin: '0.5rem 0 0', color: 'var(--text-dim)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Rainbows</h3>
        <button className="start-btn" style={{ background: '#e74c3c', width: '100%' }}
          onClick={() => trigger('rainbow-arcs')}>
          Pixel Arcs
        </button>
        <h3 style={{ margin: '0.5rem 0 0', color: 'var(--text-dim)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Sparkles</h3>
        <button className="start-btn" style={{ background: '#f1c40f', color: '#333', width: '100%' }}
          onClick={() => trigger('sparkle-cross')}>
          A) Pixel Cross Stars
        </button>
        <button className="start-btn" style={{ background: '#e74c3c', width: '100%' }}
          onClick={() => trigger('sparkle-twinkle')}>
          B) Twinkle Scatter
        </button>
        <button className="start-btn" style={{ background: '#3498db', width: '100%' }}
          onClick={() => trigger('sparkle-rise')}>
          C) Rising Bubbles
        </button>
        <button className="start-btn" style={{ background: '#2ecc71', width: '100%' }}
          onClick={() => trigger('sparkle-firework')}>
          D) Pixel Fireworks
        </button>
      </div>

      {/* === Confetti: Pixel Rain === */}
      {active === 'confetti-rain' && (
        <div key={`cr-${key}`} className="celeb-overlay celeb-confetti">
          {[...Array(16)].map((_, i) => (
            <span key={i} className={`pixel-confetti pc${i}`} />
          ))}
        </div>
      )}

      {/* === Rainbow: Pixel Arcs === */}
      {active === 'rainbow-arcs' && (
        <div key={`ra-${key}`} className="celeb-overlay celeb-rainbow">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`pixel-rainbow pr${i}`}>
              {RAINBOW.map((c, j) => (
                <span key={j} className="px-arc" style={{ background: c, bottom: `${j * 4}px` }} />
              ))}
            </div>
          ))}
        </div>
      )}

      {/* === Sparkle A: Pixel Cross Stars === */}
      {active === 'sparkle-cross' && (
        <div key={`sa-${key}`} className="celeb-overlay celeb-sparkles">
          {[...Array(10)].map((_, i) => (
            <span key={i} className={`pixel-star ps${i}`} />
          ))}
        </div>
      )}

      {/* === Sparkle B: Twinkle Scatter === */}
      {active === 'sparkle-twinkle' && (
        <div key={`sb-${key}`} className="celeb-overlay">
          {[...Array(16)].map((_, i) => (
            <span key={i} style={{
              position: 'absolute',
              width: 6, height: 6,
              background: COLORS[i % COLORS.length],
              imageRendering: 'pixelated',
              borderRadius: 0,
              left: `${5 + (i * 6.2) % 90}%`,
              top: `${10 + (i * 17.3) % 60}%`,
              animation: `sparkle-twinkle 0.7s ease-out forwards`,
              animationDelay: `${i * 0.06}s`,
            }} />
          ))}
        </div>
      )}

      {/* === Sparkle C: Rising Bubbles === */}
      {active === 'sparkle-rise' && (
        <div key={`sc-${key}`} className="celeb-overlay">
          {[...Array(12)].map((_, i) => {
            const sizes = [5, 8, 6, 10, 7, 5, 9, 6, 8, 5, 7, 10];
            return (
              <span key={i} style={{
                position: 'absolute',
                width: sizes[i], height: sizes[i],
                background: COLORS[i % COLORS.length],
                imageRendering: 'pixelated',
                borderRadius: 0,
                left: `${10 + (i * 7.5)}%`,
                bottom: -10,
                animation: `sparkle-rise ${1 + (i % 3) * 0.3}s ease-out forwards`,
                animationDelay: `${i * 0.08}s`,
                '--drift': `${((i % 5) - 2) * 15}px`,
              }} />
            );
          })}
        </div>
      )}

      {/* === Sparkle D: Pixel Fireworks === */}
      {active === 'sparkle-firework' && (
        <div key={`sd-${key}`} className="celeb-overlay">
          {[
            { x: '25%', y: '35%', delay: 0 },
            { x: '70%', y: '25%', delay: 0.2 },
            { x: '50%', y: '45%', delay: 0.4 },
          ].map((origin, oi) => (
            [...Array(8)].map((_, i) => {
              const angle = (i / 8) * 360;
              const dists = [55, 70, 45, 65, 50, 75, 60, 55];
              return (
                <span key={`${oi}-${i}`} style={{
                  position: 'absolute',
                  width: 6, height: 6,
                  background: COLORS[(oi * 3 + i) % COLORS.length],
                  imageRendering: 'pixelated',
                  borderRadius: 0,
                  left: origin.x, top: origin.y,
                  animation: `sparkle-firework 0.8s ease-out forwards`,
                  animationDelay: `${origin.delay + i * 0.02}s`,
                  '--fx': `${Math.cos(angle * Math.PI / 180) * dists[i]}px`,
                  '--fy': `${Math.sin(angle * Math.PI / 180) * dists[i]}px`,
                }} />
              );
            })
          ))}
        </div>
      )}
    </div>
  );
}
