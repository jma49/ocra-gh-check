export function retryCount(requested: number): number {
  return requested - 1;
}

export function delayMs(attempt: number): number {
  return 100 * 2 ** attempt; // no upper bound
}
