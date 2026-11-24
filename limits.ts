export const MAX_BODY_BYTES = 1_048_576;

export function withinBodyLimit(bytes: number): boolean {
  return bytes <= MAX_BODY_BYTES;
}
