import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { getBattleRound, routeColors } from '../data/mathFacts';
import { creatureData, creatureOrder } from '../data/creatures';
import PixelCreature from './PixelCreature';

const ROUNDS = 10;

export default function BattleScreen({ level, operation = 'multiply', playerName = '', onComplete, onBack }) {
  const [phase, setPhase] = useState('intro'); // intro, battle, result
  const [facts, setFacts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [shake, setShake] = useState(false);
  const [flash, setFlash] = useState('');
  const [speedStreak, setSpeedStreak] = useState(0);
  const [maxSpeedStreak, setMaxSpeedStreak] = useState(0);
  const [creatureHp, setCreatureHp] = useState(100);
  const [celebration, setCelebration] = useState(null); // 'rainbow' | 'sparkles' | 'confetti'
  const inputRef = useRef(null);
  const celebrationTypes = ['rainbow', 'sparkles', 'confetti'];

  const creatureId = creatureOrder[level - 1];
  const creature = creatureData[creatureId];
  const color = routeColors[level];

  useEffect(() => {
    setFacts(getBattleRound(level, operation, ROUNDS));
  }, [level, operation]);

  const startBattle = () => {
    setPhase('battle');
    setStartTime(Date.now());
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!input.trim() || phase !== 'battle') return;

    const fact = facts[currentIndex];
    const answer = parseInt(input, 10);
    const correct = answer === fact.answer;
    const elapsed = (Date.now() - startTime) / 1000;

    if (correct) {
      // Calculate damage based on speed
      let damage;
      if (elapsed < 2) damage = 15;
      else if (elapsed < 4) damage = 10;
      else if (elapsed < 6) damage = 7;
      else damage = 5;

      setCreatureHp(prev => Math.max(0, prev - damage));
      setFlash('correct');
      setCelebration(celebrationTypes[Math.floor(Math.random() * 3)]);
      setTimeout(() => setCelebration(null), 900);

      const newStreak = elapsed < 2 ? speedStreak + 1 : 0;
      setSpeedStreak(newStreak);
      setMaxSpeedStreak(prev => Math.max(prev, newStreak));

      setResults(prev => [...prev, {
        question: fact.question,
        userAnswer: answer,
        correctAnswer: fact.answer,
        correct: true,
        time: elapsed,
      }]);
    } else {
      setShake(true);
      setFlash('wrong');
      setSpeedStreak(0);
      setTimeout(() => setShake(false), 500);

      setResults(prev => [...prev, {
        question: fact.question,
        userAnswer: answer,
        correctAnswer: fact.answer,
        correct: false,
        time: elapsed,
      }]);
    }

    setTimeout(() => setFlash(''), 400);

    if (currentIndex + 1 >= facts.length) {
      setTimeout(() => setPhase('result'), 600);
    } else {
      setCurrentIndex(prev => prev + 1);
      setStartTime(Date.now());
    }
    setInput('');
  }, [input, phase, facts, currentIndex, startTime, speedStreak]);

  // Log battle results to Supabase
  useEffect(() => {
    if (phase !== 'result') return;
    const correctCount = results.filter(r => r.correct).length;
    const avgTime = results.length > 0
      ? +(results.reduce((s, r) => s + r.time, 0) / results.length).toFixed(1)
      : 0;
    const missed = results.filter(r => !r.correct).map(r => r.question);
    supabase.from('battle_results').insert({
      player_name: playerName || 'Anonymous',
      level,
      operation,
      correct: correctCount,
      total: ROUNDS,
      avg_speed: avgTime,
      won: correctCount >= 7,
      perfect: correctCount === ROUNDS,
      missed_facts: missed.join(', ') || null,
    }).then();
  }, [phase]);

  if (phase === 'intro') {
    return (
      <div className="battle-screen">
        <div className="battle-intro">
          <div className="battle-encounter" style={{ borderColor: color }}>
            <p className="encounter-text">A wild <strong style={{ color }}>{creature.name}</strong> appeared!</p>
            <div className="creature-bounce">
              <PixelCreature
                pixels={creature.pixels}
                palette={creature.palette}
                size={5}
              />
            </div>
            <p className="encounter-hint">
              Answer {ROUNDS} math facts to battle it!<br />
              <small>Faster answers deal more damage!</small>
            </p>
          </div>
          <button className="start-btn" style={{ background: color }} onClick={startBattle}>
            Let's Go!
          </button>
          <button className="back-link" onClick={onBack}>← Choose different route</button>
        </div>
      </div>
    );
  }

  if (phase === 'result') {
    const correctCount = results.filter(r => r.correct).length;
    const avgTime = results.length > 0
      ? (results.reduce((s, r) => s + r.time, 0) / results.length).toFixed(1)
      : 0;
    const won = correctCount >= 7;
    const perfect = correctCount === ROUNDS;
    const shiny = perfect && results.every(r => r.time < 3);

    // Calculate coins earned
    const coinsEarned = results.reduce((sum, r) => {
      if (!r.correct) return sum;
      if (r.time < 2) return sum + 5;
      if (r.time < 4) return sum + 3;
      return sum + 1;
    }, 0) + (perfect ? 10 : 0);

    return (
      <div className="battle-screen">
        <div className="battle-result">
          {won ? (
            <>
              <h2 className="result-title win">You caught {creature.name}!</h2>
              <div className="victory-scene">
                <div className="confetti-burst">
                  {[...Array(12)].map((_, i) => (
                    <span key={i} className={`confetti c${i}`} />
                  ))}
                </div>
                <div className={`creature-victory ${shiny ? 'shiny-glow' : ''}`}>
                  <PixelCreature
                    pixels={creature.pixels}
                    palette={shiny ? creature.shinyPalette : creature.palette}
                    size={6}
                  />
                  {shiny && <div className="shiny-label">★ SHINY ★</div>}
                </div>
                <div className="victory-sparkles">
                  <span className="sparkle s0">★</span>
                  <span className="sparkle s1">✦</span>
                  <span className="sparkle s2">★</span>
                  <span className="sparkle s3">✦</span>
                  <span className="sparkle s4">★</span>
                  <span className="sparkle s5">✦</span>
                </div>
              </div>
              <p className="gotcha-text">Gotcha!</p>
            </>
          ) : (
            <>
              <h2 className="result-title lose">{creature.name} got away...</h2>
              <div className="creature-flee">
                <PixelCreature
                  pixels={creature.pixels}
                  palette={creature.palette}
                  size={4}
                />
              </div>
              <p className="try-again-msg">Keep practicing! You need 7/{ROUNDS} correct to catch it.</p>
            </>
          )}

          <div className="battle-stats">
            <div className="stat-row">
              <span>Correct</span>
              <span className={correctCount >= 7 ? 'stat-good' : 'stat-bad'}>{correctCount}/{ROUNDS}</span>
            </div>
            <div className="stat-row">
              <span>Avg Speed</span>
              <span>{avgTime}s</span>
            </div>
            <div className="stat-row">
              <span>Coins Earned</span>
              <span className="stat-coins">+{coinsEarned} ✦</span>
            </div>
            {maxSpeedStreak >= 3 && (
              <div className="stat-row">
                <span>Speed Streak</span>
                <span className="stat-good">{maxSpeedStreak} 💨</span>
              </div>
            )}
          </div>

          <div className="battle-fact-review">
            <h3>Review</h3>
            {results.map((r, i) => (
              <div key={i} className={`review-row ${r.correct ? 'review-correct' : 'review-wrong'}`}>
                <span className="review-icon">{r.correct ? '✓' : '✗'}</span>
                <span className="review-question">{r.question} = {r.correctAnswer}</span>
                {!r.correct && <span className="review-yours">(you said {r.userAnswer})</span>}
                <span className="review-time">{r.time.toFixed(1)}s</span>
              </div>
            ))}
          </div>

          <div className="result-actions">
            <button
              className="start-btn"
              style={{ background: color }}
              onClick={() => onComplete({
                won,
                perfect,
                shiny,
                coinsEarned,
                correctCount,
                maxSpeedStreak,
                creatureId,
              })}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Battle phase
  const fact = facts[currentIndex];
  const hpPercent = Math.max(0, creatureHp);

  return (
    <div className={`battle-screen ${shake ? 'shake' : ''} ${flash}`}>
      <div className="battle-hud">
        <div className="hud-left">
          <span className="creature-battle-name" style={{ color }}>{creature.name}</span>
          <div className="hp-bar">
            <div className="hp-fill" style={{ width: `${hpPercent}%`, background: hpPercent > 50 ? '#2ecc71' : hpPercent > 25 ? '#f39c12' : '#e74c3c' }} />
          </div>
        </div>
        <div className="hud-right">
          <span className="battle-progress">{currentIndex + 1}/{ROUNDS}</span>
          {speedStreak >= 2 && (
            <span className="streak-badge">🔥 {speedStreak}x streak!</span>
          )}
        </div>
      </div>

      <div className="battle-arena">
        <div className={`battle-creature ${flash === 'correct' ? 'hit' : ''}`}>
          <PixelCreature
            pixels={creature.pixels}
            palette={creature.palette}
            size={5}
          />
        </div>
      </div>

      {/* Correct answer celebrations */}
      {celebration === 'rainbow' && (
        <div className="celeb-overlay celeb-rainbow">
          <div className="rainbow-arc" />
        </div>
      )}
      {celebration === 'sparkles' && (
        <div className="celeb-overlay celeb-sparkles">
          {[...Array(10)].map((_, i) => (
            <span key={i} className={`pixel-sparkle ps${i}`}>✦</span>
          ))}
        </div>
      )}
      {celebration === 'confetti' && (
        <div className="celeb-overlay celeb-confetti">
          {[...Array(16)].map((_, i) => (
            <span key={i} className={`pixel-confetti pc${i}`} />
          ))}
        </div>
      )}

      <div className="battle-question-area">
        <div className="question-display">
          <span className="question-text">{fact?.question} = ?</span>
        </div>

        <form onSubmit={handleSubmit} className="answer-form">
          <input
            ref={inputRef}
            type="number"
            inputMode="numeric"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="answer-input"
            placeholder="?"
            autoFocus
            autoComplete="off"
          />
          <button type="submit" className="answer-btn" style={{ background: color }}>
            GO!
          </button>
        </form>
      </div>
    </div>
  );
}
