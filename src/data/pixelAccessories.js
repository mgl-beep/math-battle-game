// Pixel art overlays for equipped accessories
// Each item has a small pixel grid, palette, and positioning hints

export const pixelAccessories = {
  // === HATS (positioned above the head) ===
  hat_cap: {
    pixels: [
      '....11111.....',
      '..1111111111..',
      '.11111111111..',
      '22222222222222',
    ],
    palette: { '1': '#e74c3c', '2': '#c0392b' },
  },
  hat_wizard: {
    pixels: [
      '.....1.....',
      '....111....',
      '....121....',
      '...11111...',
      '..1111111..',
      '.111111111.',
      '22222222222',
    ],
    palette: { '1': '#9b59b6', '2': '#f1c40f' },
  },
  hat_crown: {
    pixels: [
      '.1...1...1.',
      '.11.111.11.',
      '.11111111..',
      '11111111111',
      '22212121222',
    ],
    palette: { '1': '#f1c40f', '2': '#e67e22' },
  },
  hat_flower: {
    pixels: [
      '.1..3..1..3..1.',
      '121.121.121.121',
      '22222222222222.',
      '.2222222222222.',
    ],
    palette: { '1': '#ff69b4', '2': '#4caf50', '3': '#ffffff' },
  },
  hat_party: {
    pixels: [
      '....31....',
      '....11....',
      '...1221...',
      '..112211..',
      '.11122111.',
      '1111111111',
      '3333333333',
    ],
    palette: { '1': '#2ecc71', '2': '#f1c40f', '3': '#e74c3c' },
  },

  // === ACCESSORIES (positioned on body) ===
  acc_glasses: {
    pixels: [
      '111.111',
      '121.121',
      '111.111',
    ],
    palette: { '1': '#222', '2': '#5dade2' },
  },
  acc_bow: {
    pixels: [
      '11.1.11',
      '1111111',
      '.11111.',
      '..111..',
    ],
    palette: { '1': '#e91e63' },
  },
  acc_star: {
    pixels: [
      '..1..',
      '.111.',
      '11211',
      '.111.',
      '..1..',
    ],
    palette: { '1': '#f39c12', '2': '#fff176' },
  },
  acc_scarf: {
    pixels: [
      '11111111',
      '22222222',
      '33333333',
      '.......1',
      '.......2',
    ],
    palette: { '1': '#e74c3c', '2': '#f39c12', '3': '#2ecc71' },
  },
  acc_wings: {
    pixels: [
      '1......1',
      '11....11',
      '211..112',
      '211..112',
      '11....11',
      '1......1',
    ],
    palette: { '1': '#85c1e9', '2': '#d4efff' },
  },
};
