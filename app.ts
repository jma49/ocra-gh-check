export function retryCount(requested: number): number {
  return Math.max(0, requested);
}

export function delayMs(attempt: number): number {
  return 100 * 2 ** attempt;
}
