import { creatureData, creatureOrder } from '../data/creatures';
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

          return (
            <div key={id} className={`collection-card ${caught ? 'caught' : 'locked'}`}>
              <div className="collection-creature">
                {caught ? (
                  <PixelCreature
                    pixels={creature.pixels}
                    palette={shiny ? creature.shinyPalette : creature.palette}
                    size={4}
                  />
                ) : (
                  <PixelCreature
                    pixels={creature.pixels}
                    palette={Object.fromEntries(
                      Object.keys(creature.palette).map(k => [k, '#333'])
                    )}
                    size={4}
                  />
                )}
              </div>
              <div className="collection-info">
                <span className="collection-name">
                  {caught ? creature.name : '???'}
                  {shiny && <span className="shiny-star"> ✨</span>}
                </span>
                <span className="collection-type">
                  {caught ? `${creature.type} • ×${creature.level}` : `×${creature.level}`}
                </span>
                {caught && <p className="collection-desc">{creature.description}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
