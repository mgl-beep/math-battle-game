import { creatureData, creatureOrder, getEvolutionStage, getCreaturePalette, getCreatureDisplayName, evolutionStages } from '../data/creatures';
import PixelCreature from './PixelCreature';

export default function Collection({ gameState, onBack }) {
  const { caughtCreatures, shinyCreatures } = gameState;

  return (
    <div className="collection-screen">
      <div className="screen-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h2>My Collection</h2>
      </div>

      <p className="collection-count">{caughtCreatures.length} of 10 creatures caught</p>

      <div className="collection-grid">
        {creatureOrder.map(id => {
          const creature = creatureData[id];
          const caught = caughtCreatures.includes(id);
          const shiny = shinyCreatures.includes(id);
          const stage = getEvolutionStage(id, gameState);
          const palette = caught
            ? getCreaturePalette(creature, stage, shiny)
            : Object.fromEntries(Object.keys(creature.palette).map(k => [k, '#333']));
          const displayName = caught ? getCreatureDisplayName(creature, stage) : '???';

          return (
            <div key={id} className={`collection-card ${caught ? 'caught' : 'locked'} ${stage >= 3 ? 'ultimate' : stage >= 2 ? 'evolved' : ''}`}>
              <div className="collection-creature">
                <div className={`creature-evo-wrap ${stage >= 3 ? 'glow-ultimate' : stage >= 2 ? 'glow-evolved' : ''}`}>
                  <PixelCreature
                    pixels={creature.pixels}
                    palette={palette}
                    size={4}
                  />
                </div>
              </div>
              <div className="collection-info">
                <span className="collection-name">
                  {displayName}
                  {shiny && <span className="shiny-star"> ✨</span>}
                </span>
                <span className="collection-type">
                  {caught ? `${creature.type} • ×${creature.level}` : `×${creature.level}`}
                </span>
                {caught && (
                  <span className={`evo-stage stage-${stage}`}>
                    {evolutionStages[stage].label}
                  </span>
                )}
                {caught && stage < 3 && (
                  <span className="evo-next">
                    Next: {evolutionStages[stage + 1].requirement}
                  </span>
                )}
                {caught && <p className="collection-desc">{creature.description}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
