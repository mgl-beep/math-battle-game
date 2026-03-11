import { useState, useEffect } from 'react';

export const themes = [
  { id: 'default', name: 'Midnight (Current)', emoji: '🌙' },
  { id: 'candy', name: 'Candy Pop', emoji: '🍬' },
  { id: 'pastel', name: 'Pastel Dream', emoji: '☁️' },
  { id: 'retro', name: 'Retro Arcade', emoji: '🕹️' },
  { id: 'storybook', name: 'Storybook', emoji: '📖' },
  { id: 'ocean', name: 'Ocean Breeze', emoji: '🌊' },
  { id: 'forest', name: 'Enchanted Forest', emoji: '🌿' },
  { id: 'sunset', name: 'Sunset Glow', emoji: '🌅' },
  { id: 'galaxy', name: 'Galaxy Sparkle', emoji: '🌌' },
  { id: 'crayon', name: 'Crayon Box', emoji: '🖍️' },
  { id: 'sakura', name: 'Sakura Garden', emoji: '🌸' },
];

export default function ThemeSwitcher() {
  const [currentIndex, setCurrentIndex] = useState(2); // Default to Pastel Dream
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themes[currentIndex].id);
  }, [currentIndex]);

  const selectTheme = (index) => {
    setCurrentIndex(index);
    setOpen(false);
  };

  return (
    <>
      <button className="theme-toggle-btn" onClick={() => setOpen(!open)}>
        🎨 {themes[currentIndex].emoji}
      </button>

      {open && (
        <div className="theme-panel-overlay" onClick={() => setOpen(false)}>
          <div className="theme-panel" onClick={e => e.stopPropagation()}>
            <h3 className="theme-panel-title">Choose a Theme</h3>
            <p className="theme-panel-subtitle">Pick your favorite look!</p>
            <div className="theme-grid">
              {themes.map((theme, i) => (
                <button
                  key={theme.id}
                  className={`theme-option ${i === currentIndex ? 'active' : ''}`}
                  onClick={() => selectTheme(i)}
                >
                  <span className="theme-emoji">{theme.emoji}</span>
                  <span className="theme-name">{theme.name}</span>
                  {i === currentIndex && <span className="theme-check">✓</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
