import { useState, useCallback } from 'react';

const STORAGE_KEY = 'math-battle-save';

const defaultState = {
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

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...defaultState, ...JSON.parse(saved) };
    }
  } catch (e) {
    // ignore
  }
  return { ...defaultState };
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // ignore
  }
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
    addCoins,
    spendCoins,
    catchCreature,
    buyItem,
    equipItem,
    recordBattle,
    addBadge,
    resetGame,
    update,
  };
}
