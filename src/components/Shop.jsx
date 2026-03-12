import { useState } from 'react';
import { shopItems, categories, categoryLabels } from '../data/shop';
import { starterCreature } from '../data/creatures';
import { pixelAccessories } from '../data/pixelAccessories';
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

export default function Shop({ gameState, onBuy, onEquip, onBack }) {
  const [activeCategory, setActiveCategory] = useState('hat');
  const [previewHat, setPreviewHat] = useState(null);
  const [previewAcc, setPreviewAcc] = useState(null);
  const [previewBg, setPreviewBg] = useState(null);
  const { coins, ownedItems, equippedItems } = gameState;

  const filteredItems = shopItems.filter(item => item.category === activeCategory);

  const equippedHat = shopItems.find(i => i.id === equippedItems.hat);
  const equippedAcc = shopItems.find(i => i.id === equippedItems.accessory);

  // Show preview hat/acc/bg if set, otherwise show equipped
  const displayHat = previewHat !== null ? shopItems.find(i => i.id === previewHat) : equippedHat;
  const displayAcc = previewAcc !== null ? shopItems.find(i => i.id === previewAcc) : equippedAcc;
  const displayBgId = previewBg !== null ? previewBg : equippedItems.background;

  const bgColors = {
    bg_meadow: 'linear-gradient(180deg, #87CEEB 0%, #90EE90 100%)',
    bg_space: 'linear-gradient(180deg, #0a0a2e 0%, #1a1a4e 50%, #2c2c6c 100%)',
    bg_beach: 'linear-gradient(180deg, #87CEEB 0%, #f4d03f 60%, #5dade2 100%)',
    bg_rainbow: 'linear-gradient(135deg, #ff6b6b 0%, #ffa94d 15%, #ffd43b 30%, #69db7c 45%, #4dabf7 60%, #7950f2 75%, #cc5de8 90%)',
  };

  return (
    <div className="shop-screen">
      <div className="screen-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h2>Shop</h2>
        <div className="coin-display">
          <span className="coin-gem">✦</span>
          <span className="coin-amount">{coins}</span>
        </div>
      </div>

      {/* Preview */}
      <div className="shop-preview">
        <div className="creature-showcase" style={{ width: 200, height: 220, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: displayBgId ? bgColors[displayBgId] : 'transparent', borderRadius: '1rem', transition: 'background 0.3s' }}>
          {displayHat && <PixelOverlay itemId={displayHat.id} className={`equipped-hat pixel-hat ${displayHat.id}`} />}
          <PixelCreature
            pixels={starterCreature.pixels}
            palette={starterCreature.palette}
            size={4}
            maxWidth={160}
          />
          {displayAcc && <PixelOverlay itemId={displayAcc.id} className={`equipped-acc pixel-acc acc-${displayAcc.id}`} />}
        </div>
      </div>

      {/* Category tabs */}
      <div className="shop-tabs">
        {categories.map(cat => (
          <button
            key={cat}
            className={`shop-tab ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => { setActiveCategory(cat); setPreviewHat(null); setPreviewAcc(null); setPreviewBg(null); }}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      {/* Items */}
      <div className="shop-items">
        {filteredItems.map(item => {
          const owned = ownedItems.includes(item.id);
          const equipped = equippedItems[item.category] === item.id;
          const canAfford = coins >= item.price;

          const isPreviewing = (item.category === 'hat' && previewHat === item.id) ||
            (item.category === 'accessory' && previewAcc === item.id) ||
            (item.category === 'background' && previewBg === item.id);

          const handlePreview = () => {
            if (item.category === 'hat') {
              setPreviewHat(previewHat === item.id ? null : item.id);
            } else if (item.category === 'accessory') {
              setPreviewAcc(previewAcc === item.id ? null : item.id);
            } else if (item.category === 'background') {
              setPreviewBg(previewBg === item.id ? null : item.id);
            }
          };

          return (
            <div key={item.id} className={`shop-item ${equipped ? 'equipped' : ''} ${isPreviewing ? 'previewing' : ''}`} onClick={handlePreview}>
              <span className="shop-item-emoji">{item.emoji}</span>
              <div className="shop-item-info">
                <span className="shop-item-name">{item.name}</span>
                {!owned && (
                  <span className={`shop-item-price ${canAfford ? '' : 'cant-afford'}`}>
                    ✦ {item.price}
                  </span>
                )}
              </div>
              <div className="shop-item-action">
                {equipped ? (
                  <button className="shop-btn unequip" onClick={() => onEquip(item.category, null)}>
                    Remove
                  </button>
                ) : owned ? (
                  <button className="shop-btn equip" onClick={() => onEquip(item.category, item.id)}>
                    Equip
                  </button>
                ) : (
                  <button
                    className="shop-btn buy"
                    disabled={!canAfford}
                    onClick={() => onBuy(item)}
                  >
                    Buy
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
