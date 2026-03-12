import { creatureData, creatureOrder, getEvolutionStage, getCreaturePalette, getCreatureDisplayName } from '../data/creatures';
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

      <div className="coll-list">
        {creatureOrder.map(id => {
          const creature = creatureData[id];
          const caught = caughtCreatures.includes(id);
          const shiny = shinyCreatures.includes(id);
          const stage = getEvolutionStage(id, gameState);
          const palette = caught
            ? getCreaturePalette(creature, stage, shiny)
            : Object.fromEntries(Object.keys(creature.palette).map(k => [k, '#333']));

          return (
            <div key={id} className={`coll-list-card ${caught ? 'caught' : 'locked'} ${stage >= 3 ? 'ultimate' : stage >= 2 ? 'evolved' : ''}`}>
              <div className={`coll-list-creature ${stage >= 3 ? 'glow-ultimate' : stage >= 2 ? 'glow-evolved' : ''}`}>
                <PixelCreature pixels={creature.pixels} palette={palette} size={5} />
              </div>
              <div className="coll-list-info">
                <span className="coll-list-name">
                  {caught ? getCreatureDisplayName(creature, stage) : '???'}
                  {shiny && <span className="shiny-star"> ✨</span>}
                </span>
                <span className="coll-list-type">×{creature.level}</span>
                {caught && (
                  <>
                    <div className="coll-list-evo-bar">
                      <div className="evo-bar-track">
                        <div className={`evo-bar-fill stage-${stage}`} style={{ width: `${(stage / 3) * 100}%` }} />
                      </div>
                    </div>
                    <span className="evo-hint">
                      {stage === 0 ? 'Catch it!' : stage === 1 ? 'Win 3 battles to evolve!' : stage === 2 ? '2 perfect rounds for ultimate!' : '★ Fully evolved!'}
                    </span>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
