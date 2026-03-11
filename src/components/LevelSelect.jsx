import { useState } from 'react';
import { creatureData, creatureOrder, getEvolutionStage, getCreaturePalette, getCreatureDisplayName } from '../data/creatures';
import { routeNames, routeColors } from '../data/mathFacts';
import PixelCreature from './PixelCreature';

export default function LevelSelect({ gameState, onSelectLevel, onBack }) {
  const [operation, setOperation] = useState('multiply');
  const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="level-select">
      <div className="screen-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h2>Choose Your Route</h2>
      </div>

      {/* Operation toggle */}
      <div className="operation-toggle">
        <button
          className={`op-btn ${operation === 'multiply' ? 'active' : ''}`}
          onClick={() => setOperation('multiply')}
        >
          <span className="op-icon">✕</span> Multiplication
        </button>
        <button
          className={`op-btn ${operation === 'divide' ? 'active' : ''}`}
          onClick={() => setOperation('divide')}
        >
          <span className="op-icon">÷</span> Division
        </button>
      </div>

      <div className="level-cards">
        {levels.map((num) => {
          const creatureId = creatureOrder[num - 1];
          const creature = creatureData[creatureId];
          const caught = gameState.caughtCreatures.includes(creatureId);
          const stage = getEvolutionStage(creatureId, gameState);
          const color = routeColors[num];
          const palette = caught
            ? getCreaturePalette(creature, stage)
            : Object.fromEntries(Object.keys(creature.palette).map(k => [k, '#555']));

          return (
            <button
              key={num}
              className="level-card"
              style={{ borderColor: color, '--accent': color }}
              onClick={() => onSelectLevel(num, operation)}
            >
              <div className="level-card-top" style={{ background: `${color}22` }}>
                <div className={`level-creature-preview ${caught ? '' : 'silhouette'} ${stage >= 3 ? 'glow-ultimate' : stage >= 2 ? 'glow-evolved' : ''}`}>
                  <PixelCreature
                    pixels={creature.pixels}
                    palette={palette}
                    size={3}
                  />
                </div>
              </div>
              <div className="level-card-info">
                <span className="level-number" style={{ color }}>
                  {operation === 'multiply' ? `×${num}` : `÷${num}`}
                </span>
                <span className="route-name">{routeNames[num]}</span>
                <span className="creature-name-small">
                  {caught ? getCreatureDisplayName(creature, stage) : '???'}
                </span>
                {caught && <span className="caught-badge">✓ Caught</span>}
                {stage >= 2 && <span className={`evo-badge stage-${stage}`}>{stage >= 3 ? '★ Ultimate' : '✦ Evolved'}</span>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
