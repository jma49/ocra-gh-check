export function retryCount(requested: number): number {
  return Math.max(0, requested);
}

export function delayMs(attempt: number): number {
  return 100 * 2 ** attempt;
}

/** How long to wait before retrying, honouring the server's Retry-After header. */
export function retryAfterMs(header: string | null, attempt: number, now = Date.now()): number {
  if (header === null || header.trim() === "") return delayMs(attempt);
  const seconds = Number(header);
  if (Number.isFinite(seconds) && seconds >= 0) return seconds * 1000;
  const at = Date.parse(header);
  if (Number.isFinite(at)) return Math.max(0, at - now);
  return delayMs(attempt);
}

/** The longest wait a retry may ask for, whatever the server says. */
export function cappedDelayMs(header: string | null, attempt: number, capMs = 30_000): number {
  return Math.min(capMs, retryAfterMs(header, attempt));
}
