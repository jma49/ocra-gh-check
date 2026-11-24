export const MAX_ATTEMPTS = 5;

export function shouldRetry(attempt: number): boolean {
  return attempt < MAX_ATTEMPTS;
}
