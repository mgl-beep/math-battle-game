import { useState, useCallback } from 'react';

const PLAYERS_KEY = 'math-battle-players';   // { [name]: gameState }
const ACTIVE_KEY = 'math-battle-active';     // current player name

const defaultState = {
  playerName: '',
  coins: 0,
  caughtCreatures: [],
  shinyCreatures: [],
  ownedItems: [],
  equippedItems: { hat: null, accessory: null, background: null },
  badges: [],
  totalBattles: 0,
  perfectRounds: 0,
  winStreak: 0,
  speedStreak: 0,
  levelStats: {},
};

function loadPlayers() {
  try {
    const saved = localStorage.getItem(PLAYERS_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch { return {}; }
}

function savePlayers(players) {
  try { localStorage.setItem(PLAYERS_KEY, JSON.stringify(players)); } catch {}
}

function getActivePlayer() {
  try { return localStorage.getItem(ACTIVE_KEY) || ''; } catch { return ''; }
}

function setActivePlayer(name) {
  try { localStorage.setItem(ACTIVE_KEY, name); } catch {}
}

// Migrate old single-save format
function migrateOldSave() {
  try {
    const old = localStorage.getItem('math-battle-save');
    if (old) {
      const data = JSON.parse(old);
      if (data.playerName) {
        const players = loadPlayers();
        if (!players[data.playerName]) {
          players[data.playerName] = data;
          savePlayers(players);
          setActivePlayer(data.playerName);
        }
      }
      localStorage.removeItem('math-battle-save');
    }
  } catch {}
}

function loadState() {
  migrateOldSave();
  const active = getActivePlayer();
  if (!active) return { ...defaultState };
  const players = loadPlayers();
  return players[active] ? { ...defaultState, ...players[active] } : { ...defaultState };
}

function saveState(state) {
  if (!state.playerName) return;
  const players = loadPlayers();
  players[state.playerName] = state;
  savePlayers(players);
}

export function useGameState() {
  const [state, setState] = useState(loadState);

  const update = useCallback((updater) => {
    setState(prev => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      saveState(next);
      return next;
    });
  }, []);

  const setPlayerName = useCallback((name) => {
    setActivePlayer(name);
    const players = loadPlayers();
    if (players[name]) {
      // Existing player — load their save
      const existing = { ...defaultState, ...players[name] };
      setState(existing);
    } else {
      // New player — fresh state
      const fresh = { ...defaultState, playerName: name };
      players[name] = fresh;
      savePlayers(players);
      setState(fresh);
    }
  }, []);

  const getPlayerList = useCallback(() => {
    return Object.keys(loadPlayers());
  }, []);

  const switchPlayer = useCallback(() => {
    setActivePlayer('');
    setState({ ...defaultState });
  }, []);

  const addCoins = useCallback((amount) => {
    update(prev => ({ ...prev, coins: prev.coins + amount }));
  }, [update]);

  const spendCoins = useCallback((amount) => {
    update(prev => {
      if (prev.coins < amount) return prev;
      return { ...prev, coins: prev.coins - amount };
    });
  }, [update]);

  const catchCreature = useCallback((creatureId, isShiny = false) => {
    update(prev => {
      const caught = prev.caughtCreatures.includes(creatureId)
        ? prev.caughtCreatures
        : [...prev.caughtCreatures, creatureId];
      const shiny = isShiny && !prev.shinyCreatures.includes(creatureId)
        ? [...prev.shinyCreatures, creatureId]
        : prev.shinyCreatures;
      return { ...prev, caughtCreatures: caught, shinyCreatures: shiny };
    });
  }, [update]);

  const recordLevelBattle = useCallback((level, won, perfect) => {
    update(prev => {
      const stats = { ...prev.levelStats };
      const current = stats[level] || { wins: 0, perfects: 0 };
      stats[level] = {
        wins: current.wins + (won ? 1 : 0),
        perfects: current.perfects + (perfect ? 1 : 0),
      };
      return { ...prev, levelStats: stats };
    });
  }, [update]);

  const buyItem = useCallback((itemId) => {
    update(prev => {
      if (prev.ownedItems.includes(itemId)) return prev;
      return { ...prev, ownedItems: [...prev.ownedItems, itemId] };
    });
  }, [update]);

  const equipItem = useCallback((category, itemId) => {
    update(prev => ({
      ...prev,
      equippedItems: { ...prev.equippedItems, [category]: itemId },
    }));
  }, [update]);

  const recordBattle = useCallback((won, perfect, speedStreak) => {
    update(prev => ({
      ...prev,
      totalBattles: prev.totalBattles + 1,
      perfectRounds: prev.perfectRounds + (perfect ? 1 : 0),
      winStreak: won ? prev.winStreak + 1 : 0,
      speedStreak: Math.max(prev.speedStreak, speedStreak || 0),
    }));
  }, [update]);

  const addBadge = useCallback((badgeId) => {
    update(prev => {
      if (prev.badges.includes(badgeId)) return prev;
      return { ...prev, badges: [...prev.badges, badgeId] };
    });
  }, [update]);

  const resetGame = useCallback(() => {
    const fresh = { ...defaultState };
    saveState(fresh);
    setState(fresh);
  }, []);

  return {
    state,
    setPlayerName,
    getPlayerList,
    switchPlayer,
    addCoins,
    spendCoins,
    catchCreature,
    recordLevelBattle,
    buyItem,
    equipItem,
    recordBattle,
    addBadge,
    resetGame,
    update,
  };
}
