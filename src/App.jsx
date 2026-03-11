import { useState, useCallback } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { useGameState } from './hooks/useGameState';
import { checkBadges, badgeDefinitions } from './data/badges';
import HomeScreen from './components/HomeScreen';
import LevelSelect from './components/LevelSelect';
import BattleScreen from './components/BattleScreen';
import Collection from './components/Collection';
import Shop from './components/Shop';
import BadgeWall from './components/BadgeWall';
import ThemeSwitcher from './components/ThemeSwitcher';
import './App.css';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [battleLevel, setBattleLevel] = useState(null);
  const [battleOperation, setBattleOperation] = useState('multiply');
  const [newBadges, setNewBadges] = useState([]);
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
    game.addCoins(result.coinsEarned);
    game.recordBattle(result.won, result.perfect, result.maxSpeedStreak);

    if (result.won) {
      game.catchCreature(result.creatureId, result.shiny);
    }

    // Track per-level wins/perfects for evolution
    game.recordLevelBattle(battleLevel, result.won, result.perfect);

    const currentState = {
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
    };

    const earnedBadges = checkBadges(currentState);
    const brandNew = earnedBadges.filter(b => !game.state.badges.includes(b));

    brandNew.forEach(badgeId => game.addBadge(badgeId));
    if (brandNew.length > 0) {
      setNewBadges(brandNew);
    }

    setScreen('home');
  };

  const handleBuy = (item) => {
    if (game.state.coins >= item.price && !game.state.ownedItems.includes(item.id)) {
      game.spendCoins(item.price);
      game.buyItem(item.id);
    }
  };

  return (
    <div className="app">
      <ThemeSwitcher />

      {screen === 'home' && (
        <HomeScreen
          gameState={game.state}
          onNavigate={navigate}
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

      {screen === 'badges' && (
        <BadgeWall
          gameState={game.state}
          onBack={() => navigate('home')}
        />
      )}

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
