interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

class AppCache {
  private memoryCache = new Map<string, CacheItem<any>>();
  private readonly memoryCacheLimit = 50;

  constructor() {
    // Clean up expired items every minute
    setInterval(() => this.cleanup(), 60000);
  }

  async set<T>(key: string, data: T, ttl: number = 24 * 60 * 60 * 1000): Promise<void> {
    try {
      // Store in memory cache
      this.memoryCache.set(key, {
        data,
        timestamp: Date.now(),
        ttl,
      });

      // Keep memory cache size in check
      if (this.memoryCache.size > this.memoryCacheLimit) {
        const firstKey = this.memoryCache.keys().next().value;
        if (firstKey) {
          this.memoryCache.delete(firstKey);
        }
      }

      // Also store in localStorage for persistence
      try {
        localStorage.setItem(`cache-${key}`, JSON.stringify({
          data,
          timestamp: Date.now(),
          ttl,
        }));
      } catch (localStorageError) {
        console.warn('Failed to cache in localStorage:', localStorageError);
      }
    } catch (error) {
      console.warn('Cache set failed:', error);
    }
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      // First check memory cache
      const memoryItem = this.memoryCache.get(key);
      if (memoryItem && !this.isExpired(memoryItem)) {
        return memoryItem.data;
      }

      // Check localStorage
      const stored = localStorage.getItem(`cache-${key}`);
      if (stored) {
        const item: CacheItem<T> = JSON.parse(stored);

        if (!this.isExpired(item)) {
          // Move to memory cache for faster access
          this.memoryCache.set(key, item);
          return item.data;
        } else {
          // Remove expired item
          localStorage.removeItem(`cache-${key}`);
        }
      }
    } catch (error) {
      console.warn('Cache get failed:', error);
    }

    return null;
  }

  async remove(key: string): Promise<void> {
    try {
      this.memoryCache.delete(key);
      localStorage.removeItem(`cache-${key}`);
    } catch (error) {
      console.warn('Cache remove failed:', error);
    }
  }

  async clear(): Promise<void> {
    try {
      this.memoryCache.clear();

      // Remove all cache items from localStorage
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('cache-')) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Cache clear failed:', error);
    }
  }

  async has(key: string): Promise<boolean> {
    const item = await this.get(key);
    return item !== null;
  }

  private isExpired(item: CacheItem<any>): boolean {
    return Date.now() - item.timestamp > item.ttl;
  }

  private cleanup(): void {
    // Clean memory cache
    for (const [key, item] of this.memoryCache.entries()) {
      if (this.isExpired(item)) {
        this.memoryCache.delete(key);
      }
    }

    // Clean localStorage (limited to avoid performance issues)
    try {
      const keysToRemove: string[] = [];

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('cache-')) {
          try {
            const stored = localStorage.getItem(key);
            if (stored) {
              const item: CacheItem<any> = JSON.parse(stored);
              if (this.isExpired(item)) {
                keysToRemove.push(key);
              }
            }
          } catch {
            // If we can't parse, remove it
            keysToRemove.push(key);
          }
        }

        // Limit cleanup to avoid blocking
        if (keysToRemove.length > 10) break;
      }

      keysToRemove.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.warn('Cache cleanup failed:', error);
    }
  }
}

export const appCache = new AppCache();
