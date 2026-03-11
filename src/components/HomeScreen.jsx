import PixelCreature from './PixelCreature';
import { starterCreature } from '../data/creatures';
import { shopItems } from '../data/shop';

export default function HomeScreen({ gameState, onNavigate }) {
  const { coins, caughtCreatures, badges, equippedItems } = gameState;

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
            <div className="equipped-hat">{equippedHat.emoji}</div>
          )}
          <div className="creature-bounce">
            <PixelCreature
              pixels={starterCreature.pixels}
              palette={starterCreature.palette}
              size={5}
            />
          </div>
          {equippedAcc && (
            <div className="equipped-acc">{equippedAcc.emoji}</div>
          )}
        </div>
        <p className="creature-name">Sparky</p>
        <p className="creature-subtitle">Your Partner</p>
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
    </div>
  );
}
