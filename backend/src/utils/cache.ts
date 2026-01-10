import NodeCache from 'node-cache';
import { config } from '../config/index.js';

class CacheManager {
  private cache: NodeCache;

  constructor() {
    this.cache = new NodeCache({ 
      stdTTL: config.cache.ttl,
      checkperiod: 600,
    });
  }

  get<T>(key: string): T | undefined {
    return this.cache.get<T>(key);
  }

  set<T>(key: string, value: T, ttl?:  number): boolean {
    return this.cache. set(key, value, ttl || config.cache.ttl);
  }

  has(key:  string): boolean {
    return this.cache.has(key);
  }

  delete(key:  string): number {
    return this.cache. del(key);
  }

  flush(): void {
    this.cache.flushAll();
  }

  getStats() {
    return this.cache. getStats();
  }

  getKeys(): string[] {
    return this. cache.keys();
  }
}

export default new CacheManager();