import { useState } from 'react';

const RAINBOW_COLORS = ['#e74c3c','#f39c12','#f1c40f','#2ecc71','#3498db','#9b59b6'];

export default function CelebrationPreview({ onBack }) {
  const [active, setActive] = useState(null);

  const trigger = (type) => {
    setActive(null);
    setTimeout(() => setActive(type), 50);
  };

  return (
    <div className="celebration-preview">
      <div className="screen-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h2>Celebration Preview</h2>
      </div>
      <p style={{ textAlign: 'center', color: 'var(--text-dim)', marginBottom: '1.5rem' }}>
        Tap a button to preview each animation
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="start-btn" style={{ background: '#e74c3c' }} onClick={() => trigger('rainbow')}>
          Rainbow
        </button>
        <button className="start-btn" style={{ background: '#f1c40f', color: '#333' }} onClick={() => trigger('sparkles')}>
          Stars
        </button>
        <button className="start-btn" style={{ background: '#3498db' }} onClick={() => trigger('confetti')}>
          Confetti
        </button>
        <button className="start-btn" style={{ background: '#9b59b6' }} onClick={() => trigger('all')}>
          All 3
        </button>
      </div>

      {(active === 'rainbow' || active === 'all') && (
        <div className="celeb-overlay celeb-rainbow">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`pixel-rainbow pr${i}`}>
              {RAINBOW_COLORS.map((c, j) => (
                <span key={j} className="px-arc" style={{ background: c, bottom: `${j * 4}px` }} />
              ))}
            </div>
          ))}
        </div>
      )}
      {(active === 'sparkles' || active === 'all') && (
        <div className="celeb-overlay celeb-sparkles">
          {[...Array(10)].map((_, i) => (
            <span key={i} className={`pixel-star ps${i}`} />
          ))}
        </div>
      )}
      {(active === 'confetti' || active === 'all') && (
        <div className="celeb-overlay celeb-confetti">
          {[...Array(16)].map((_, i) => (
            <span key={i} className={`pixel-confetti pc${i}`} />
          ))}
        </div>
      )}
    </div>
  );
}
