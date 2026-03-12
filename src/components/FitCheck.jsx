import { starterCreature } from '../data/creatures';
import { pixelAccessories } from '../data/pixelAccessories';
import { shopItems } from '../data/shop';
import PixelCreature from './PixelCreature';

function PixelOverlay({ itemId, className }) {
  const data = pixelAccessories[itemId];
  if (!data) return null;
  const rows = data.pixels.length;
  const cols = Math.max(...data.pixels.map(r => r.length));
  const s = 3;
  const rects = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < data.pixels[y].length; x++) {
      const ch = data.pixels[y][x];
      if (ch === '.') continue;
      rects.push(
        <rect key={`${x}-${y}`} x={x * s} y={y * s} width={s} height={s}
          fill={ch === '0' ? '#222' : data.palette[ch] || '#f0f'} />
      );
    }
  }
  return (
    <svg viewBox={`0 0 ${cols * s} ${rows * s}`} className={className}
      style={{ imageRendering: 'pixelated' }}>
      {rects}
    </svg>
  );
}

function CreatureWithItem({ itemId, category }) {
  const isHat = category === 'hat';
  return (
    <div className="creature-showcase" style={{ width: 200, height: 220, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {isHat && <PixelOverlay itemId={itemId} className={`equipped-hat pixel-hat ${itemId}`} />}
      <PixelCreature
        pixels={starterCreature.pixels}
        palette={starterCreature.palette}
        size={4}
        maxWidth={160}
      />
      {!isHat && <PixelOverlay itemId={itemId} className={`equipped-acc pixel-acc acc-${itemId}`} />}
    </div>
  );
}

export default function FitCheck({ onBack }) {
  const hats = shopItems.filter(i => i.category === 'hat');
  const accessories = shopItems.filter(i => i.category === 'accessory');

  return (
    <div className="fit-check-screen">
      <div className="screen-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h2>Fit Check</h2>
      </div>

      <h3 style={{ textAlign: 'center', margin: '1rem 0 0.5rem' }}>Hats</h3>
      <div className="fit-check-grid">
        {hats.map(hat => (
          <div key={hat.id} className="fit-check-item">
            <CreatureWithItem itemId={hat.id} category="hat" />
            <p className="fit-check-label">{hat.name}</p>
          </div>
        ))}
      </div>

      <h3 style={{ textAlign: 'center', margin: '1.5rem 0 0.5rem' }}>Accessories</h3>
      <div className="fit-check-grid">
        {accessories.map(acc => (
          <div key={acc.id} className="fit-check-item">
            <CreatureWithItem itemId={acc.id} category="accessory" />
            <p className="fit-check-label">{acc.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
