import { MAX_BODY_BYTES } from "./limits.ts";

/** The bytes of a body that are read: never more than the limit, never fewer than none. */
export function clampBody(bytes: number): number {
  return Math.min(Math.max(bytes, 0), MAX_BODY_BYTES);
}
