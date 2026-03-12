import { useState } from 'react';
import PixelCreature from './PixelCreature';
import { creatureData } from '../data/creatures';

// Puffkin base
const base = creatureData.puffkin;

// Stage 2 options — small additions to base Puffkin
const stage2Options = {
  a: {
    label: 'A) Tiny Horns',
    pixels: [
      '................',
      '..0...0000...0..',
      '..00001111000...',
      '...01111111110..',
      '..0111111111110.',
      '..0111111111110.',
      '..0WK01WK011110.',
      '..0WK01WK011110.',
      '..0111111111110.',
      '..01PP1111PP110.',
      '..0111133311100.',
      '...01111111110..',
      '....011111110...',
      '.....0.00.0.....',
      '................',
      '................',
    ],
  },
  b: {
    label: 'B) Little Wings',
    pixels: [
      '................',
      '......0000......',
      '....001111000...',
      '...01111111110..',
      '0.0111111111110.',
      '010111111111110.',
      '0.0WK01WK011100',
      '..0WK01WK011100',
      '..0111111111110.',
      '..01PP1111PP110.',
      '..0111133311100.',
      '...01111111110..',
      '....011111110...',
      '.....0.00.0.....',
      '................',
      '................',
    ],
  },
  c: {
    label: 'C) Crown',
    pixels: [
      '.....0.0.0......',
      '.....010100.....',
      '....001111000...',
      '...01111111110..',
      '..0111111111110.',
      '..0111111111110.',
      '..0WK01WK011110.',
      '..0WK01WK011110.',
      '..0111111111110.',
      '..01PP1111PP110.',
      '..0111133311100.',
      '...01111111110..',
      '....011111110...',
      '.....0.00.0.....',
      '................',
      '................',
    ],
  },
  d: {
    label: 'D) Fluffy Ears',
    pixels: [
      '................',
      '.00...0000..00..',
      '.010001111001.0.',
      '..001111111100..',
      '..0111111111110.',
      '..0111111111110.',
      '..0WK01WK011110.',
      '..0WK01WK011110.',
      '..0111111111110.',
      '..01PP1111PP110.',
      '..0111133311100.',
      '...01111111110..',
      '....011111110...',
      '.....0.00.0.....',
      '................',
      '................',
    ],
  },
};

// Stage 3 options — more dramatic changes
const stage3Options = {
  a: {
    label: 'A) Big Horns + Tail',
    pixels: [
      '.0............0.',
      '.00...0000...00.',
      '..00001111000...',
      '...01111111110..',
      '..0111111111110.',
      '..0111111111110.',
      '..0WK01WK011110.',
      '..0WK01WK011110.',
      '..0111111111110.',
      '..01PP1111PP110.',
      '..0111133311100.',
      '...01111111110..',
      '....0111111100..',
      '.....0.00.01.0..',
      '..........010...',
      '...........0....',
    ],
  },
  b: {
    label: 'B) Big Wings + Halo',
    pixels: [
      '.....022220.....',
      '......0000......',
      '....001111000...',
      '...01111111110..',
      '0.0111111111110.',
      '010111111111110.',
      '010WK01WK0111100',
      '0.0WK01WK0111100',
      '0.0111111111110.',
      '010111111111110.',
      '0.01PP1111PP110.',
      '..0111133311100.',
      '...01111111110..',
      '....011111110...',
      '.....0.00.0.....',
      '................',
    ],
  },
  c: {
    label: 'C) Royal Crown + Cape',
    pixels: [
      '....0.0.0.0.....',
      '....0101010.....',
      '....001111000...',
      '...01111111110..',
      '..0111111111110.',
      '..0111111111110.',
      '..0WK01WK011110.',
      '..0WK01WK011110.',
      '..0111111111110.',
      '..01PP1111PP110.',
      '..0111133311100.',
      '.001111111111000',
      '.021111111111120',
      '..011111111110..',
      '...0.0.00.0.0...',
      '................',
    ],
  },
  d: {
    label: 'D) Star Aura',
    pixels: [
      '..S....SS....S..',
      '......0000......',
      '..S.001111000...',
      '...01111111110..',
      '..0111111111110.',
      'S.0111111111110.',
      '..0WK01WK011110S',
      '..0WK01WK011110.',
      '..0111111111110.',
      'S.01PP1111PP110.',
      '..0111133311100S',
      '...01111111110..',
      '..S.011111110...',
      '.....0.00.0.....',
      '..S.........S...',
      '................',
    ],
  },
};

const starStyles = {
  a: {
    label: 'A) Cross (current)',
    css: {
      width: 6, height: 6,
      background: '#f1c40f',
      boxShadow: '0 -6px 0 #f1c40f, 0 6px 0 #f1c40f, -6px 0 0 #f1c40f, 6px 0 0 #f1c40f',
    },
  },
  b: {
    label: 'B) Tiny Dot',
    css: {
      width: 4, height: 4,
      background: '#f1c40f',
      boxShadow: 'none',
    },
  },
  c: {
    label: 'C) Diamond',
    css: {
      width: 6, height: 6,
      background: '#f1c40f',
      transform: 'rotate(45deg)',
      boxShadow: 'none',
    },
  },
  d: {
    label: 'D) Sparkle (4-pointed)',
    css: {
      width: 4, height: 4,
      background: '#f1c40f',
      boxShadow: '0 -4px 0 #f1c40f, 0 4px 0 #f1c40f, -4px 0 0 #f1c40f, 4px 0 0 #f1c40f, -2px -2px 0 #ffd700, 2px -2px 0 #ffd700, -2px 2px 0 #ffd700, 2px 2px 0 #ffd700',
    },
  },
  e: {
    label: 'E) 8-pointed Star',
    css: {
      width: 4, height: 4,
      background: '#fff',
      boxShadow: '0 -6px 0 #f1c40f, 0 6px 0 #f1c40f, -6px 0 0 #f1c40f, 6px 0 0 #f1c40f, -4px -4px 0 #f1c40f, 4px -4px 0 #f1c40f, -4px 4px 0 #f1c40f, 4px 4px 0 #f1c40f',
    },
  },
  f: {
    label: 'F) Twinkle',
    css: {
      width: 2, height: 2,
      background: '#fff',
      boxShadow: '0 -6px 0 #f1c40f, 0 -3px 0 #ffd700, 0 6px 0 #f1c40f, 0 3px 0 #ffd700, -6px 0 0 #f1c40f, -3px 0 0 #ffd700, 6px 0 0 #f1c40f, 3px 0 0 #ffd700',
    },
  },
};

// Ring positions for star preview
const ringPositions = [
  { top: '10%', left: '50%' },
  { top: '25%', right: '10%' },
  { top: '50%', right: '0%' },
  { bottom: '25%', right: '10%' },
  { bottom: '10%', left: '50%' },
  { bottom: '25%', left: '10%' },
  { top: '50%', left: '0%' },
  { top: '25%', left: '10%' },
];

export default function EvolutionPreview({ onBack }) {
  const [selected2, setSelected2] = useState(null);
  const [selected3, setSelected3] = useState(null);
  const [selectedStar, setSelectedStar] = useState(null);

  const stage2Palette = {};
  for (const [key, color] of Object.entries(base.palette)) {
    stage2Palette[key] = brightenHex(color, 20);
  }
  const stage3Palette = {};
  for (const [key, color] of Object.entries(base.palette)) {
    stage3Palette[key] = brightenHex(color, 40);
  }
  // Add S (star) color for stage 3 option D
  stage3Palette['S'] = '#FFD700';
  stage2Palette['S'] = '#FFD700';

  return (
    <div style={{ padding: '1rem', minHeight: '100vh' }}>
      <div className="screen-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h2>Evolution Preview</h2>
      </div>

      <h3 style={{ color: 'var(--text-dim)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0.5rem 0 0.5rem' }}>Star Styles</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.6rem', marginBottom: '1.5rem' }}>
        {Object.entries(starStyles).map(([key, opt]) => (
          <button key={key} onClick={() => setSelectedStar(key)} style={{
            background: selectedStar === key ? '#2c2c2c' : 'var(--bg-card)',
            border: `2px solid ${selectedStar === key ? '#f1c40f' : 'var(--border)'}`,
            borderRadius: 'var(--card-radius)',
            padding: '0.75rem 0.25rem',
            cursor: 'pointer',
            color: 'var(--text)',
            textAlign: 'center',
            position: 'relative',
            minHeight: 70,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}>
            <div style={{
              position: 'relative',
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {ringPositions.slice(0, 4).map((pos, pi) => (
                <span key={pi} style={{
                  position: 'absolute',
                  imageRendering: 'pixelated',
                  borderRadius: 0,
                  animation: `evo-orbit 3s linear infinite`,
                  animationDelay: `${pi * 0.75}s`,
                  ...pos,
                  ...opt.css,
                }} />
              ))}
            </div>
            <div style={{ fontSize: '0.65rem', fontWeight: 700 }}>{opt.label}</div>
          </button>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Base Puffkin</p>
        <PixelCreature pixels={base.pixels} palette={base.palette} size={4} />
      </div>

      <h3 style={{ color: 'var(--text-dim)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '1rem 0 0.5rem' }}>Stage 2 Options</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        {Object.entries(stage2Options).map(([key, opt]) => (
          <button key={key} onClick={() => setSelected2(key)} style={{
            background: selected2 === key ? 'var(--primary)' : 'var(--bg-card)',
            border: `2px solid ${selected2 === key ? 'var(--primary)' : 'var(--border)'}`,
            borderRadius: 'var(--card-radius)',
            padding: '0.75rem 0.5rem',
            cursor: 'pointer',
            color: selected2 === key ? 'white' : 'var(--text)',
            textAlign: 'center',
          }}>
            <PixelCreature pixels={opt.pixels} palette={stage2Palette} size={3} />
            <div style={{ fontSize: '0.8rem', fontWeight: 700, marginTop: '0.4rem' }}>{opt.label}</div>
          </button>
        ))}
      </div>

      <h3 style={{ color: 'var(--text-dim)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '1.5rem 0 0.5rem' }}>Stage 3 Options</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        {Object.entries(stage3Options).map(([key, opt]) => (
          <button key={key} onClick={() => setSelected3(key)} style={{
            background: selected3 === key ? 'var(--primary)' : 'var(--bg-card)',
            border: `2px solid ${selected3 === key ? 'var(--primary)' : 'var(--border)'}`,
            borderRadius: 'var(--card-radius)',
            padding: '0.75rem 0.5rem',
            cursor: 'pointer',
            color: selected3 === key ? 'white' : 'var(--text)',
            textAlign: 'center',
          }}>
            <PixelCreature pixels={opt.pixels} palette={stage3Palette} size={3} />
            <div style={{ fontSize: '0.8rem', fontWeight: 700, marginTop: '0.4rem' }}>{opt.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function brightenHex(hex, amount) {
  const r = Math.min(255, parseInt(hex.slice(1, 3), 16) + amount);
  const g = Math.min(255, parseInt(hex.slice(3, 5), 16) + amount);
  const b = Math.min(255, parseInt(hex.slice(5, 7), 16) + amount);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
