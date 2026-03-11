// Renders a creature from pixel grid data
export default function PixelCreature({ pixels, palette, size = 4, maxWidth, className = '', style = {} }) {
  if (!pixels || !palette) return null;

  const rows = pixels.length;
  const cols = Math.max(...pixels.map(r => r.length));
  const w = cols * size;
  const h = rows * size;

  const rects = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < pixels[y].length; x++) {
      const ch = pixels[y][x];
      if (ch === '.') continue;
      const color = ch === '0' ? '#222222' : palette[ch] || '#FF00FF';
      rects.push(
        <rect
          key={`${x}-${y}`}
          x={x * size}
          y={y * size}
          width={size}
          height={size}
          fill={color}
        />
      );
    }
  }

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={`pixel-creature ${className}`}
      style={{
        imageRendering: 'pixelated',
        width: maxWidth || w * 3,
        height: 'auto',
        maxWidth: '100%',
        ...style,
      }}
    >
      {rects}
    </svg>
  );
}
