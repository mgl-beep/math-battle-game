import { useState } from 'react';
import { shopItems, categories, categoryLabels } from '../data/shop';
import { starterCreature } from '../data/creatures';
import PixelCreature from './PixelCreature';

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
          {equippedHat && <div className="equipped-hat small">{equippedHat.emoji}</div>}
          <PixelCreature
            pixels={starterCreature.pixels}
            palette={starterCreature.palette}
            size={4}
          />
          {equippedAcc && <div className="equipped-acc small">{equippedAcc.emoji}</div>}
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
