export const badgeDefinitions = [
  // Per-level badges
  { id: 'master_1', name: '1s Master', description: 'Catch the Puffkin', icon: '🐣', condition: (s) => s.caughtCreatures.includes('puffkin') },
  { id: 'master_2', name: '2s Master', description: 'Catch the Twinklet', icon: '✨', condition: (s) => s.caughtCreatures.includes('twinklet') },
  { id: 'master_3', name: '3s Master', description: 'Catch the Cloverkit', icon: '🍀', condition: (s) => s.caughtCreatures.includes('cloverkit') },
  { id: 'master_4', name: '4s Master', description: 'Catch the Breezy', icon: '💨', condition: (s) => s.caughtCreatures.includes('breezy') },
  { id: 'master_5', name: '5s Master', description: 'Catch the Rockling', icon: '🪨', condition: (s) => s.caughtCreatures.includes('rockling') },
  { id: 'master_6', name: '6s Master', description: 'Catch the Flamander', icon: '🔥', condition: (s) => s.caughtCreatures.includes('flamander') },
  { id: 'master_7', name: '7s Master', description: 'Catch the Bubblefish', icon: '💧', condition: (s) => s.caughtCreatures.includes('bubblefish') },
  { id: 'master_8', name: '8s Master', description: 'Catch the Sproutlet', icon: '🌿', condition: (s) => s.caughtCreatures.includes('sproutlet') },
  { id: 'master_9', name: '9s Master', description: 'Catch the Zapbun', icon: '⚡', condition: (s) => s.caughtCreatures.includes('zapbun') },
  { id: 'master_10', name: '10s Master', description: 'Catch the Cosmopuff', icon: '🌟', condition: (s) => s.caughtCreatures.includes('cosmopuff') },

  // Achievement badges
  { id: 'speed_demon', name: 'Speed Demon', description: 'Answer 5 in a row under 2 seconds', icon: '🏎️', condition: (s) => s.speedStreak >= 5 },
  { id: 'perfect_round', name: 'Perfect Round', description: 'Get 10/10 in a battle', icon: '💯', condition: (s) => s.perfectRounds > 0 },
  { id: 'half_collector', name: 'Half Collection', description: 'Catch 5 creatures', icon: '📦', condition: (s) => s.caughtCreatures.length >= 5 },
  { id: 'collector', name: 'Full Collection', description: 'Catch all 10 creatures', icon: '🏆', condition: (s) => s.caughtCreatures.length >= 10 },
  { id: 'shiny_hunter', name: 'Shiny Hunter', description: 'Catch a shiny creature', icon: '💎', condition: (s) => s.shinyCreatures.length > 0 },
  { id: 'shopaholic', name: 'Fashionista', description: 'Buy 5 items from the shop', icon: '👗', condition: (s) => s.ownedItems.length >= 5 },
  { id: 'streak_3', name: 'On a Roll', description: 'Win 3 battles in a row', icon: '🎯', condition: (s) => s.winStreak >= 3 },
  { id: 'battles_10', name: 'Veteran', description: 'Complete 10 battles', icon: '⚔️', condition: (s) => s.totalBattles >= 10 },
  { id: 'battles_25', name: 'Champion', description: 'Complete 25 battles', icon: '👑', condition: (s) => s.totalBattles >= 25 },
];

export function checkBadges(state) {
  return badgeDefinitions
    .filter(badge => badge.condition(state))
    .map(badge => badge.id);
}
