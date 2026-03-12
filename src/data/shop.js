// Outfit items for the player's starter creature
export const shopItems = [
  // Hats
  { id: 'hat_cap', name: 'Baseball Cap', category: 'hat', price: 20, emoji: '🧢', color: '#e74c3c' },
  { id: 'hat_wizard', name: 'Wizard Hat', category: 'hat', price: 50, emoji: '🧙', color: '#9b59b6' },
  { id: 'hat_crown', name: 'Golden Crown', category: 'hat', price: 100, emoji: '👑', color: '#f1c40f' },
  { id: 'hat_flower', name: 'Flower Crown', category: 'hat', price: 30, emoji: '🌸', color: '#e91e63' },
  { id: 'hat_party', name: 'Top Hat', category: 'hat', price: 40, emoji: '🎩', color: '#2c2c2c' },

  // Accessories
  { id: 'acc_glasses', name: 'Cool Glasses', category: 'accessory', price: 25, emoji: '😎', color: '#34495e' },
  { id: 'acc_bow', name: 'Cute Bow', category: 'accessory', price: 15, emoji: '🎀', color: '#e91e63' },
  { id: 'acc_star', name: 'Star Badge', category: 'accessory', price: 35, emoji: '⭐', color: '#f39c12' },
  { id: 'acc_scarf', name: 'Rainbow Scarf', category: 'accessory', price: 45, emoji: '🌈', color: '#e74c3c' },
  { id: 'acc_wings', name: 'Sparkle Wings', category: 'accessory', price: 80, emoji: '✨', color: '#3498db' },

  // Backgrounds
  { id: 'bg_meadow', name: 'Sunny Meadow', category: 'background', price: 60, emoji: '🌻', color: '#27ae60' },
  { id: 'bg_space', name: 'Outer Space', category: 'background', price: 75, emoji: '🚀', color: '#2c3e50' },
  { id: 'bg_beach', name: 'Tropical Beach', category: 'background', price: 60, emoji: '🏖️', color: '#f39c12' },
  { id: 'bg_rainbow', name: 'Rainbow Land', category: 'background', price: 90, emoji: '🌈', color: '#9b59b6' },
];

export const categories = ['hat', 'accessory', 'background'];

export const categoryLabels = {
  hat: 'Hats',
  accessory: 'Accessories',
  background: 'Backgrounds',
};
