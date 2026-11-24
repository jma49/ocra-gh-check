export const MAX_BODY_BYTES = 1_048_576;
export const MAX_HEADERS = 64;
export const MAX_QUERY_PARAMS = 32;

export function withinBodyLimit(bytes: number): boolean {
  return bytes <= MAX_BODY_BYTES;
}

export function withinHeaderLimit(count: number): boolean {
  return count <= MAX_HEADERS;
}

export function withinQueryLimit(count: number): boolean {
  return count <= MAX_QUERY_PARAMS;
}
