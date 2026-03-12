import { useState, useCallback, useRef } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { useGameState } from './hooks/useGameState';
import { checkBadges, badgeDefinitions } from './data/badges';
import { creatureData, creatureOrder, starterCreature, getEvolutionStage, getCreaturePalette, getCreaturePixels, getCreatureDisplayName } from './data/creatures';
import PixelCreature from './components/PixelCreature';
import HomeScreen from './components/HomeScreen';
import LevelSelect from './components/LevelSelect';
import BattleScreen from './components/BattleScreen';
import Collection from './components/Collection';
import Shop from './components/Shop';
import BadgeWall from './components/BadgeWall';
import ThemeSwitcher from './components/ThemeSwitcher';
import CelebrationPreview from './components/CelebrationPreview';
import EvolutionPreview from './components/EvolutionPreview';
import './App.css';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [battleLevel, setBattleLevel] = useState(null);
  const [battleOperation, setBattleOperation] = useState('multiply');
  const [newBadges, setNewBadges] = useState([]);
  const [evolution, setEvolution] = useState(null); // { creatureId, oldStage, newStage }
  const [showPlayerPicker, setShowPlayerPicker] = useState(false);
  const game = useGameState();

  const navigate = useCallback((dest) => {
    setScreen(dest);
    setNewBadges([]);
  }, []);

  const handleSelectLevel = (level, operation) => {
    setBattleLevel(level);
    setBattleOperation(operation);
    setScreen('battle');
  };

  const handleBattleComplete = (result) => {
    // Check evolution stage BEFORE updating state
    const creatureId = creatureOrder[battleLevel - 1];
    const oldStage = getEvolutionStage(creatureId, game.state);

    game.addCoins(result.coinsEarned);
    game.recordBattle(result.won, result.perfect, result.maxSpeedStreak);

    if (result.won) {
      game.catchCreature(result.creatureId, result.shiny);
    }

    // Track per-level wins/perfects for evolution
    game.recordLevelBattle(battleLevel, result.won, result.perfect);

    // Build the state as it will be AFTER updates to check new evolution
    const updatedLevelStats = { ...game.state.levelStats };
    const ls = updatedLevelStats[battleLevel] || { wins: 0, perfects: 0 };
    updatedLevelStats[battleLevel] = {
      wins: ls.wins + (result.won ? 1 : 0),
      perfects: ls.perfects + (result.perfect ? 1 : 0),
    };

    const afterState = {
      ...game.state,
      coins: game.state.coins + result.coinsEarned,
      caughtCreatures: result.won && !game.state.caughtCreatures.includes(result.creatureId)
        ? [...game.state.caughtCreatures, result.creatureId]
        : game.state.caughtCreatures,
      shinyCreatures: result.shiny && !game.state.shinyCreatures.includes(result.creatureId)
        ? [...game.state.shinyCreatures, result.creatureId]
        : game.state.shinyCreatures,
      totalBattles: game.state.totalBattles + 1,
      perfectRounds: game.state.perfectRounds + (result.perfect ? 1 : 0),
      winStreak: result.won ? game.state.winStreak + 1 : 0,
      speedStreak: Math.max(game.state.speedStreak, result.maxSpeedStreak || 0),
      levelStats: updatedLevelStats,
    };

    const newStage = getEvolutionStage(creatureId, afterState);

    const earnedBadges = checkBadges(afterState);
    const brandNew = earnedBadges.filter(b => !game.state.badges.includes(b));

    brandNew.forEach(badgeId => game.addBadge(badgeId));
    if (brandNew.length > 0) {
      setNewBadges(brandNew);
    }

    // Show evolution screen if stage changed
    if (newStage > oldStage && newStage >= 2) {
      setEvolution({ creatureId, oldStage, newStage });
      setScreen('evolution');
    } else {
      setScreen('home');
    }
  };

  const handleBuy = (item) => {
    if (game.state.coins >= item.price && !game.state.ownedItems.includes(item.id)) {
      game.spendCoins(item.price);
      game.buyItem(item.id);
    }
  };

  const nameRef = useRef(null);
  const [nameInput, setNameInput] = useState('');

  const playerList = game.getPlayerList();

  // Auto-set a default player name to skip name entry (temporarily disabled)
  if (!game.state.playerName && !showPlayerPicker) {
    game.setPlayerName('Player');
  }

  if (showPlayerPicker) {
    const handlePickPlayer = (name) => {
      game.setPlayerName(name);
      setShowPlayerPicker(false);
    };
    return (
      <div className="app">
        <ThemeSwitcher />
        <div className="name-entry-screen">
          <div className="name-entry-card">
            {showPlayerPicker && (
              <button className="picker-close" onClick={() => setShowPlayerPicker(false)}>✕</button>
            )}
            <div className="name-entry-creature">
              <div className="creature-bounce">
                <PixelCreature
                  pixels={starterCreature.pixels}
                  palette={starterCreature.palette}
                  size={5}
                />
              </div>
            </div>
            <h1 className="name-entry-title">Math Battle!</h1>

            {playerList.length > 0 && (
              <div className="player-picker">
                <p className="player-picker-label">Who's playing?</p>
                <div className="player-list">
                  {playerList.map(name => (
                    <button key={name} className="player-btn" onClick={() => handlePickPlayer(name)}>
                      {name}
                    </button>
                  ))}
                </div>
                <div className="player-divider"><span>or add new player</span></div>
              </div>
            )}

            <form className="name-entry-form" onSubmit={(e) => {
              e.preventDefault();
              if (nameInput.trim()) handlePickPlayer(nameInput.trim());
            }}>
              <input
                ref={nameRef}
                type="text"
                className="name-entry-input"
                placeholder="Type your name..."
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                maxLength={20}
                autoFocus={playerList.length === 0}
              />
              <button type="submit" className="name-entry-btn" disabled={!nameInput.trim()}>
                Let's Go!
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <ThemeSwitcher />

      {screen === 'home' && (
        <HomeScreen
          gameState={game.state}
          onNavigate={navigate}
          onSwitchPlayer={() => setShowPlayerPicker(true)}
        />
      )}

      {screen === 'levelSelect' && (
        <LevelSelect
          gameState={game.state}
          onSelectLevel={handleSelectLevel}
          onBack={() => navigate('home')}
        />
      )}

      {screen === 'battle' && battleLevel && (
        <BattleScreen
          level={battleLevel}
          operation={battleOperation}
          playerName={game.state.playerName}
          onComplete={handleBattleComplete}
          onBack={() => navigate('levelSelect')}
        />
      )}

      {screen === 'collection' && (
        <Collection
          gameState={game.state}
          onBack={() => navigate('home')}
        />
      )}

      {screen === 'shop' && (
        <Shop
          gameState={game.state}
          onBuy={handleBuy}
          onEquip={game.equipItem}
          onBack={() => navigate('home')}
        />
      )}

      {screen === 'celebrations' && (
        <EvolutionPreview onBack={() => navigate('home')} />
      )}

      {screen === 'badges' && (
        <BadgeWall
          gameState={game.state}
          onBack={() => navigate('home')}
        />
      )}

      {screen === 'evolution' && evolution && (() => {
        const creature = creatureData[evolution.creatureId];
        const oldPalette = getCreaturePalette(creature, evolution.oldStage);
        const newPalette = getCreaturePalette(creature, evolution.newStage);
        const oldPixels = getCreaturePixels(creature, evolution.oldStage);
        const newPixels = getCreaturePixels(creature, evolution.newStage);
        const oldName = getCreatureDisplayName(creature, evolution.oldStage);
        const newName = getCreatureDisplayName(creature, evolution.newStage);
        const isUltimate = evolution.newStage >= 3;
        return (
          <div className="evolution-screen" onClick={() => { setEvolution(null); setScreen('home'); }}>
            <div className="evo-celebration">
              <h2 className="evo-title">{isUltimate ? 'Ultimate Evolution!' : 'Your creature evolved!'}</h2>
              <div className="evo-transform">
                <div className="evo-old">
                  <PixelCreature pixels={oldPixels} palette={oldPalette} size={4} />
                  <span className="evo-stage-label">{oldName}</span>
                </div>
                <div className="evo-arrow">→</div>
                <div className={`evo-new ${isUltimate ? 'glow-ultimate' : 'glow-evolved'}`}>
                  <PixelCreature pixels={newPixels} palette={newPalette} size={6} />
                  <span className="evo-stage-label">{newName}</span>
                </div>
              </div>
              <div className="evo-sparkle-ring">
                {[...Array(8)].map((_, i) => (
                  <span key={i} className={`evo-ring-star rs${i}`} />
                ))}
              </div>
              <p className="evo-tap-hint">Tap to continue</p>
            </div>
          </div>
        );
      })()}

      {newBadges.length > 0 && (
        <div className="badge-notification" onClick={() => setNewBadges([])}>
          <div className="badge-notif-content">
            <h3>New Badge{newBadges.length > 1 ? 's' : ''} Earned!</h3>
            <div className="badge-notif-icons">
              {newBadges.map(id => {
                const badge = badgeDefinitions.find(b => b.id === id);
                return badge ? <span key={id} className="notif-badge">{badge.icon} {badge.name}</span> : null;
              })}
            </div>
            <p className="notif-dismiss">Tap to dismiss</p>
          </div>
        </div>
      )}
      <Analytics />
    </div>
  );
}
