export function retryCount(requested: number): number {
  return Math.max(0, requested);
}

export function delayMs(attempt: number): number {
  return 100 * 2 ** attempt;
}

/** How long to wait before retrying, honouring the server's Retry-After header. */
export function retryAfterMs(header: string | null, attempt: number): number {
  if (header === null) return delayMs(attempt);
  return Number(header) * 1000;
}
