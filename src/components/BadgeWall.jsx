import { badgeDefinitions } from '../data/badges';

export default function BadgeWall({ gameState, onBack }) {
  const { badges } = gameState;

  return (
    <div className="badge-screen">
      <div className="screen-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h2>Badge Wall</h2>
      </div>

      <p className="badge-count">{badges.length} of {badgeDefinitions.length} badges earned</p>

      <div className="badge-grid">
        {badgeDefinitions.map(badge => {
          const earned = badges.includes(badge.id);

          return (
            <div key={badge.id} className={`badge-card ${earned ? 'earned' : 'locked'}`}>
              <span className="badge-icon">{earned ? badge.icon : '🔒'}</span>
              <span className="badge-name">{badge.name}</span>
              <span className="badge-desc">{badge.description}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
