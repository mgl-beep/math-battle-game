// Generate multiplication OR division facts for a given number (1-10)

export function generateFacts(num, operation = 'multiply') {
  const facts = [];

  if (operation === 'multiply') {
    for (let i = 1; i <= 10; i++) {
      facts.push({
        question: `${num} × ${i}`,
        answer: num * i,
        type: 'multiply',
      });
      if (i !== num) {
        facts.push({
          question: `${i} × ${num}`,
          answer: i * num,
          type: 'multiply',
        });
      }
    }
  } else {
    // Division: (num × i) ÷ num = i, and (num × i) ÷ i = num
    for (let i = 1; i <= 10; i++) {
      facts.push({
        question: `${num * i} ÷ ${num}`,
        answer: i,
        type: 'divide',
      });
      if (i !== num && i !== 1) {
        facts.push({
          question: `${num * i} ÷ ${i}`,
          answer: num,
          type: 'divide',
        });
      }
    }
  }

  return facts;
}

// Get a random subset of facts for a battle round
export function getBattleRound(num, operation = 'multiply', count = 10) {
  const allFacts = generateFacts(num, operation);
  const shuffled = [...allFacts].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Route/world names
export const routeNames = {
  1: 'Pebble Path',
  2: 'Twinkling Trail',
  3: 'Clover Crossing',
  4: 'Windy Way',
  5: 'Rocky Ridge',
  6: 'Ember Trail',
  7: 'Coral Cove',
  8: 'Mossy Grove',
  9: 'Thunder Peak',
  10: 'Starlight Path',
};

export const routeColors = {
  1: '#FFAB91',
  2: '#D4AA00',
  3: '#A5D6A7',
  4: '#81D4FA',
  5: '#BCAAA4',
  6: '#FF8C42',
  7: '#64C8FF',
  8: '#7BC67E',
  9: '#D4A017',
  10: '#D59BF6',
};
