/**
 * Cumulative portrait colour restoration based on total candles lit.
 * Spec (e3177): 0–100 → ~95% mono, 500 → a little colour, 2,000 → half,
 * 5,000–10,000 → fully colourful and vibrant.
 */
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function cumulativeGrayscale(candleCount: number): number {
  const count = Math.max(0, candleCount);

  if (count <= 100) return 95;
  if (count <= 500) {
    return lerp(95, 85, (count - 100) / (500 - 100));
  }
  if (count <= 2000) {
    return lerp(85, 50, (count - 500) / (2000 - 500));
  }
  if (count <= 10000) {
    return lerp(50, 0, (count - 2000) / (10000 - 2000));
  }
  return 0;
}

export function colourRestorationLabel(candleCount: number): string {
  const gray = cumulativeGrayscale(candleCount);
  if (gray >= 90) return "Portrait awaiting light";
  if (gray >= 65) return "Colour returning";
  if (gray >= 35) return "Half remembered in colour";
  if (gray > 0) return "Almost fully restored";
  return "Portrait fully restored";
}
