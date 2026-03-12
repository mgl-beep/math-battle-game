import PixelCreature from './PixelCreature';
import { starterCreature } from '../data/creatures';
import { shopItems } from '../data/shop';
import { pixelAccessories } from '../data/pixelAccessories';

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

export default function HomeScreen({ gameState, onNavigate, onSwitchPlayer }) {
  const { coins, caughtCreatures, badges, equippedItems, playerName } = gameState;

  const equippedHat = shopItems.find(i => i.id === equippedItems.hat);
  const equippedAcc = shopItems.find(i => i.id === equippedItems.accessory);

  return (
    <div className="home-screen">
      <div className="home-header">
        <h1 className="game-title">Math Battle!</h1>
        <div className="coin-display">
          <span className="coin-gem">✦</span>
          <span className="coin-amount">{coins}</span>
        </div>
      </div>

      <div className="home-creature-area">
        <div className="creature-showcase">
          {equippedHat && (
            <PixelOverlay itemId={equippedHat.id} className="equipped-hat pixel-hat" />
          )}
          <div className="creature-bounce">
            <PixelCreature
              pixels={starterCreature.pixels}
              palette={starterCreature.palette}
              size={5}
            />
          </div>
          {equippedAcc && (
            <PixelOverlay itemId={equippedAcc.id} className={`equipped-acc pixel-acc acc-${equippedAcc.id}`} />
          )}
        </div>
        <p className="creature-name">Sparky</p>
        <p className="creature-subtitle">{playerName}'s Partner</p>
      </div>

      <div className="home-stats">
        <div className="stat-pill">
          <span>🎯</span> {caughtCreatures.length}/10 Caught
        </div>
        <div className="stat-pill">
          <span>🏅</span> {badges.length} Badges
        </div>
      </div>

      <div className="home-menu">
        <button className="menu-btn battle-btn" onClick={() => onNavigate('levelSelect')}>
          <span className="menu-icon">⚔️</span>
          <span className="menu-label">Battle!</span>
          <span className="menu-desc">Practice math facts</span>
        </button>

        <button className="menu-btn collection-btn" onClick={() => onNavigate('collection')}>
          <span className="menu-icon">📖</span>
          <span className="menu-label">Collection</span>
          <span className="menu-desc">{caughtCreatures.length} creatures</span>
        </button>

        <button className="menu-btn shop-btn" onClick={() => onNavigate('shop')}>
          <span className="menu-icon">🛍️</span>
          <span className="menu-label">Shop</span>
          <span className="menu-desc">Outfits & more</span>
        </button>

        <button className="menu-btn badges-btn" onClick={() => onNavigate('badges')}>
          <span className="menu-icon">🏆</span>
          <span className="menu-label">Badges</span>
          <span className="menu-desc">{badges.length} earned</span>
        </button>
      </div>

      <button className="switch-player-btn" onClick={onSwitchPlayer}>
        Switch Player ({playerName})
      </button>
    </div>
  );
}
