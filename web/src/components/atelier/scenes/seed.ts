/** Deterministic 0–1 value. Safe to call during render. */
export function seed(index: number, salt = 1) {
  const value = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453123;
  return value - Math.floor(value);
}
