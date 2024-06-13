export function randomizeArray(input: unknown[]): unknown[] {
  const copy = [...input];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i  + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}