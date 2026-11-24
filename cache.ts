type Entry<V> = { value: V; expiresAt: number };

export class TtlCache<V> {
  private readonly entries = new Map<string, Entry<V>>();

  constructor(private readonly ttlSeconds: number) {}

  set(key: string, value: V, now = Date.now()): void {
    this.entries.set(key, { value, expiresAt: now + this.ttlSeconds * 1000 });
  }

  get(key: string, now = Date.now()): V | undefined {
    const entry = this.entries.get(key);
    if (entry === undefined) return undefined;
    if (now >= entry.expiresAt) {
      this.entries.delete(key);
      return undefined;
    }
    return entry.value;
  }
}
