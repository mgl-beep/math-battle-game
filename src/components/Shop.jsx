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
  const { coins, ownedItems, equippedItems } = gameState;

  const filteredItems = shopItems.filter(item => item.category === activeCategory);

  const equippedHat = shopItems.find(i => i.id === equippedItems.hat);
  const equippedAcc = shopItems.find(i => i.id === equippedItems.accessory);

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
        <div className="creature-showcase small">
          {equippedHat && <PixelOverlay itemId={equippedHat.id} className="equipped-hat pixel-hat small" />}
          <PixelCreature
            pixels={starterCreature.pixels}
            palette={starterCreature.palette}
            size={4}
          />
          {equippedAcc && <PixelOverlay itemId={equippedAcc.id} className={`equipped-acc pixel-acc small acc-${equippedAcc.id}`} />}
        </div>
      </div>

      {/* Category tabs */}
      <div className="shop-tabs">
        {categories.map(cat => (
          <button
            key={cat}
            className={`shop-tab ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
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

          return (
            <div key={item.id} className={`shop-item ${equipped ? 'equipped' : ''}`}>
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
