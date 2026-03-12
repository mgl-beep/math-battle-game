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

        <h3 style={{ margin: '0.5rem 0 0', color: 'var(--text-dim)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Pixel Rain Styles</h3>
        <button className="start-btn" style={{ background: '#9b59b6', width: '100%' }}
          onClick={() => trigger('rain-fast')}>
          A) Fast Tiny Rain
        </button>
        <button className="start-btn" style={{ background: '#3498db', width: '100%' }}
          onClick={() => trigger('rain-gentle')}>
          B) Gentle Shower
        </button>
        <button className="start-btn" style={{ background: '#e74c3c', width: '100%' }}
          onClick={() => trigger('rain-heavy')}>
          C) Heavy Downpour
        </button>
        <button className="start-btn" style={{ background: '#2ecc71', width: '100%' }}
          onClick={() => trigger('rain-sparkle')}>
          D) Sparkle Rain
        </button>
        <button className="start-btn" style={{ background: '#f39c12', color: '#333', width: '100%' }}
          onClick={() => trigger('rain-wave')}>
          E) Wave Rain
        </button>

        <h3 style={{ margin: '0.5rem 0 0', color: 'var(--text-dim)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Rainbows</h3>
        <button className="start-btn" style={{ background: '#e74c3c', width: '100%' }}
          onClick={() => trigger('rainbow-arcs')}>
          Pixel Arcs
        </button>

        <h3 style={{ margin: '0.5rem 0 0', color: 'var(--text-dim)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Sparkles</h3>
        <button className="start-btn" style={{ background: '#f1c40f', color: '#333', width: '100%' }}
          onClick={() => trigger('sparkle-cross')}>
          Pixel Cross Stars
        </button>
        <button className="start-btn" style={{ background: '#e91e63', width: '100%' }}
          onClick={() => trigger('sparkle-twinkle')}>
          Twinkle Scatter
        </button>
        <button className="start-btn" style={{ background: '#3498db', width: '100%' }}
          onClick={() => trigger('sparkle-rise')}>
          Rising Bubbles
        </button>
        <button className="start-btn" style={{ background: '#2ecc71', width: '100%' }}
          onClick={() => trigger('sparkle-firework')}>
          Pixel Fireworks
        </button>
      </div>

      {/* === Rain A: Fast tiny — straight down, quick, lots of dots === */}
      {active === 'rain-fast' && (
        <div key={`ra-${key}`} className="celeb-overlay">
          {[...Array(30)].map((_, i) => (
            <span key={i} className={`pixel-rain-dot prd${i}`} />
          ))}
        </div>
      )}

      {/* === Rain B: Gentle shower — slower, slight drift, mixed sizes === */}
      {active === 'rain-gentle' && (
        <div key={`rb-${key}`} className="celeb-overlay">
          {[...Array(20)].map((_, i) => {
            const sizes = [4,6,3,5,7,4,6,3,5,4,7,3,6,5,4,3,6,5,7,4];
            const lefts = [3,10,18,24,31,38,44,51,57,63,69,75,81,87,93,7,15,22,35,48];
            const durs = [1.8,2.2,1.6,2.0,2.4,1.7,2.1,1.9,2.3,1.8,2.0,1.6,2.2,1.9,2.1,1.7,2.3,2.0,1.8,2.4];
            const delays = [0,0.1,0.2,0.05,0.15,0.25,0.08,0.18,0.12,0.22,0.3,0.02,0.14,0.24,0.06,0.16,0.28,0.04,0.2,0.1];
            const drifts = [8,-10,12,-6,10,-8,14,-12,6,-10,8,-14,10,-6,12,-8,6,-12,10,-8];
            return (
              <span key={i} style={{
                position: 'absolute',
                width: sizes[i], height: sizes[i],
                background: COLORS[i % COLORS.length],
                imageRendering: 'pixelated',
                borderRadius: 0,
                left: `${lefts[i]}%`,
                top: -10,
                animation: `rain-gentle-fall ${durs[i]}s ease-in forwards`,
                animationDelay: `${delays[i]}s`,
                '--drift': `${drifts[i]}px`,
              }} />
            );
          })}
        </div>
      )}

      {/* === Rain C: Heavy downpour — dense, fast, streaky === */}
      {active === 'rain-heavy' && (
        <div key={`rc-${key}`} className="celeb-overlay">
          {[...Array(40)].map((_, i) => {
            const lefts = [2,5,8,11,14,17,20,23,26,29,32,35,38,41,44,47,50,53,56,59,62,65,68,71,74,77,80,83,86,89,92,95,4,13,22,31,40,49,58,67];
            const durs = [0.4,0.5,0.35,0.45,0.55,0.4,0.5,0.35,0.45,0.3,0.5,0.4,0.55,0.35,0.45,0.5,0.4,0.35,0.5,0.45,0.4,0.55,0.35,0.45,0.5,0.4,0.35,0.55,0.45,0.5,0.4,0.35,0.5,0.45,0.4,0.55,0.35,0.45,0.5,0.4];
            const delays = [0,0.05,0.1,0.02,0.08,0.12,0.03,0.15,0.06,0.18,0.01,0.09,0.14,0.04,0.11,0.07,0.16,0.02,0.13,0.08,0.19,0.05,0.1,0.15,0.03,0.12,0.07,0.17,0.04,0.14,0.09,0.06,0.2,0.11,0.16,0.01,0.13,0.08,0.18,0.05];
            return (
              <span key={i} style={{
                position: 'absolute',
                width: 3, height: 8,
                background: COLORS[i % COLORS.length],
                imageRendering: 'pixelated',
                borderRadius: 0,
                left: `${lefts[i % lefts.length]}%`,
                top: -12,
                opacity: 0.9,
                animation: `confetti-rain ${durs[i % durs.length]}s linear forwards`,
                animationDelay: `${delays[i % delays.length]}s`,
              }} />
            );
          })}
        </div>
      )}

      {/* === Rain D: Sparkle rain — dots that twinkle as they fall === */}
      {active === 'rain-sparkle' && (
        <div key={`rd-${key}`} className="celeb-overlay">
          {[...Array(24)].map((_, i) => {
            const lefts = [4,12,20,28,36,44,52,60,68,76,84,92,8,16,24,32,40,48,56,64,72,80,88,96];
            const durs = [1.2,1.5,1.0,1.3,1.6,1.1,1.4,1.2,1.5,1.0,1.3,1.1,1.4,1.6,1.2,1.0,1.5,1.3,1.1,1.4,1.6,1.2,1.0,1.5];
            const delays = [0,0.08,0.16,0.04,0.12,0.2,0.06,0.14,0.22,0.02,0.1,0.18,0.24,0.05,0.13,0.21,0.07,0.15,0.23,0.03,0.11,0.19,0.01,0.09];
            return (
              <span key={i} style={{
                position: 'absolute',
                width: 5, height: 5,
                background: COLORS[i % COLORS.length],
                imageRendering: 'pixelated',
                borderRadius: 0,
                left: `${lefts[i]}%`,
                top: -10,
                animation: `rain-sparkle-fall ${durs[i]}s ease-in forwards`,
                animationDelay: `${delays[i]}s`,
              }} />
            );
          })}
        </div>
      )}

      {/* === Rain E: Wave rain — cascading left to right === */}
      {active === 'rain-wave' && (
        <div key={`re-${key}`} className="celeb-overlay">
          {[...Array(24)].map((_, i) => {
            const col = i % 12;
            const row = Math.floor(i / 12);
            return (
              <span key={i} style={{
                position: 'absolute',
                width: 5, height: 5,
                background: COLORS[i % COLORS.length],
                imageRendering: 'pixelated',
                borderRadius: 0,
                left: `${5 + col * 8}%`,
                top: -10,
                animation: `confetti-rain ${0.8 + row * 0.3}s linear forwards`,
                animationDelay: `${col * 0.06 + row * 0.4}s`,
              }} />
            );
          })}
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

      {/* === Sparkle: Pixel Cross Stars === */}
      {active === 'sparkle-cross' && (
        <div key={`sa-${key}`} className="celeb-overlay celeb-sparkles">
          {[...Array(10)].map((_, i) => (
            <span key={i} className={`pixel-star ps${i}`} />
          ))}
        </div>
      )}

      {/* === Sparkle: Twinkle Scatter === */}
      {active === 'sparkle-twinkle' && (
        <div key={`sb-${key}`} className="celeb-overlay">
          {[...Array(16)].map((_, i) => (
            <span key={i} className={`twinkle-dot td${i}`} />
          ))}
        </div>
      )}

      {/* === Sparkle: Rising Bubbles === */}
      {active === 'sparkle-rise' && (
        <div key={`sc-${key}`} className="celeb-overlay">
          {[...Array(12)].map((_, i) => (
            <span key={i} className={`rising-dot rd${i}`} />
          ))}
        </div>
      )}

      {/* === Sparkle: Pixel Fireworks === */}
      {active === 'sparkle-firework' && (
        <div key={`sd-${key}`} className="celeb-overlay">
          {[...Array(24)].map((_, i) => (
            <span key={i} className={`fw-dot fw${i}`} />
          ))}
        </div>
      )}
    </div>
  );
}
