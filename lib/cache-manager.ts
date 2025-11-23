/**
 * Smart caching system to optimize performance and reduce API calls
 * 
 * This cache manager implements several strategies:
 * - In-memory caching with TTL (Time To Live)
 * - Optional localStorage persistence for data durability across sessions
 * - Stale-while-revalidate pattern for better UX
 * - Automatic cache eviction based on size and age
 */

/**
 * Represents a single cache entry with metadata
 */
export interface CacheEntry<T> {
  data: T              // The cached data
  timestamp: number    // When the data was cached (milliseconds)
  ttl: number         // Time to live in milliseconds
  key: string         // Cache key identifier
}

/**
 * Configuration options for cache behavior
 */
export interface CacheOptions {
  ttl?: number                      // Time to live in milliseconds (default: 5 minutes)
  maxSize?: number                  // Maximum number of cache entries
  persistToLocalStorage?: boolean   // Whether to persist cache in localStorage
  staleWhileRevalidate?: boolean   // Return stale data while revalidating in background
}

/**
 * CacheManager class - Handles all caching operations
 * 
 * Features:
 * - In-memory Map-based storage for fast access
 * - Optional localStorage persistence
 * - Automatic cache eviction when size limit is reached
 * - Hit/miss tracking for performance monitoring
 */
class CacheManager {
  private cache = new Map<string, CacheEntry<any>>()
  private readonly defaultTTL = 5 * 60 * 1000 // 5 minutes default TTL
  private readonly maxSize = 100                // Maximum cache entries
  private readonly localStoragePrefix = "tzkt_cache_"

  /**
   * Retrieve data from cache
   * @param key - Unique cache key
   * @param options - Cache configuration options
   * @returns Cached data or null if not found/expired
   */
  get<T>(key: string, options: CacheOptions = {}): T | null {
    const entry = this.cache.get(key)

    if (!entry) {
      // Try to retrieve from localStorage if persistence is enabled
      if (options.persistToLocalStorage) {
        const stored = this.getFromLocalStorage<T>(key)
        if (stored && !this.isExpired(stored)) {
          this.cache.set(key, stored)
          return stored.data
        }
      }
      return null
    }

    // Check if entry has expired
    if (this.isExpired(entry)) {
      if (options.staleWhileRevalidate) {
        // Return stale data but mark for background revalidation
        return entry.data
      }
      this.cache.delete(key)
      this.removeFromLocalStorage(key)
      return null
    }

    return entry.data
  }

  /**
   * Store data in cache
   * @param key - Unique cache key
   * @param data - Data to cache
   * @param options - Cache configuration options
   */
  set<T>(key: string, data: T, options: CacheOptions = {}): void {
    const ttl = options.ttl || this.defaultTTL
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl,
      key,
    }

    // Handle maximum cache size by evicting oldest entry if needed
    if (this.cache.size >= this.maxSize) {
      this.evictOldest()
    }

    this.cache.set(key, entry)

    // Persist to localStorage if requested
    if (options.persistToLocalStorage) {
      this.setToLocalStorage(key, entry)
    }
  }

  /**
   * Invalidate a specific cache entry
   * @param key - Cache key to invalidate
   */
  invalidate(key: string): void {
    this.cache.delete(key)
    this.removeFromLocalStorage(key)
  }

  /**
   * Invalidate all cache entries matching a pattern
   * @param pattern - Regular expression pattern to match keys
   */
  invalidatePattern(pattern: string): void {
    const regex = new RegExp(pattern)
    const keysToDelete: string[] = []

    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        keysToDelete.push(key)
      }
    }

    keysToDelete.forEach((key) => {
      this.cache.delete(key)
      this.removeFromLocalStorage(key)
    })
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache.clear()
    this.clearLocalStorage()
  }

  /**
   * Get cache statistics for monitoring
   * @returns Object containing cache size, hit rate, and entry details
   */
  getStats(): {
    size: number
    hitRate: number
    entries: Array<{ key: string; age: number; ttl: number }>
  } {
    const entries = Array.from(this.cache.entries()).map(([key, entry]) => ({
      key,
      age: Date.now() - entry.timestamp,
      ttl: entry.ttl,
    }))

    return {
      size: this.cache.size,
      hitRate: this.calculateHitRate(),
      entries,
    }
  }

  /**
   * Preload data into cache with a fetcher function
   * @param key - Cache key
   * @param fetcher - Async function to fetch data if not in cache
   * @param options - Cache configuration options
   * @returns The cached or freshly fetched data
   */
  async preload<T>(key: string, fetcher: () => Promise<T>, options: CacheOptions = {}): Promise<T> {
    const cached = this.get<T>(key, options)
    if (cached) {
      return cached
    }

    const data = await fetcher()
    this.set(key, data, options)
    return data
  }

  // ============ Private Methods ============

  /**
   * Check if a cache entry has expired
   */
  private isExpired(entry: CacheEntry<any>): boolean {
    return Date.now() - entry.timestamp > entry.ttl
  }

  /**
   * Evict the oldest cache entry to make room for new entries
   */
  private evictOldest(): void {
    let oldestKey = ""
    let oldestTime = Date.now()

    for (const [key, entry] of this.cache.entries()) {
      if (entry.timestamp < oldestTime) {
        oldestTime = entry.timestamp
        oldestKey = key
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey)
      this.removeFromLocalStorage(oldestKey)
    }
  }

  private getFromLocalStorage<T>(key: string): CacheEntry<T> | null {
    try {
      const stored = localStorage.getItem(this.localStoragePrefix + key)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  }

  private setToLocalStorage<T>(key: string, entry: CacheEntry<T>): void {
    try {
      localStorage.setItem(this.localStoragePrefix + key, JSON.stringify(entry))
    } catch {
      // Ignore localStorage errors (quota exceeded, etc.)
    }
  }

  private removeFromLocalStorage(key: string): void {
    try {
      localStorage.removeItem(this.localStoragePrefix + key)
    } catch {
      // Ignore localStorage errors
    }
  }

  private clearLocalStorage(): void {
    try {
      const keys = Object.keys(localStorage)
      keys.forEach((key) => {
        if (key.startsWith(this.localStoragePrefix)) {
          localStorage.removeItem(key)
        }
      })
    } catch {
      // Ignore localStorage errors (not available in some contexts)
    }
  }

  // Performance tracking
  private hitCount = 0
  private missCount = 0

  /**
   * Calculate cache hit rate for monitoring
   * @returns Hit rate as a decimal (0-1)
   */
  private calculateHitRate(): number {
    const total = this.hitCount + this.missCount
    return total > 0 ? this.hitCount / total : 0
  }

  /**
   * Record a cache hit (data found in cache)
   */
  recordHit(): void {
    this.hitCount++
  }

  /**
   * Record a cache miss (data not found in cache)
   */
  recordMiss(): void {
    this.missCount++
  }
}

/**
 * Singleton instance of the cache manager
 * Use this instance throughout the application for consistent caching
 */
export const cacheManager = new CacheManager()

/**
 * Predefined caching strategies optimized for different data types
 * 
 * Each strategy defines:
 * - TTL: How long data stays fresh
 * - persistToLocalStorage: Whether to survive page reloads
 * - staleWhileRevalidate: Whether to show old data while fetching new
 */
export const CacheStrategies = {
  /**
   * Network statistics - Medium cache with localStorage persistence
   * Used for: Network-wide stats that change moderately
   */
  NETWORK_STATS: {
    ttl: 5 * 60 * 1000, // 5 minutes
    persistToLocalStorage: true,
    staleWhileRevalidate: true,
  },

  /**
   * Bakers list - Long cache with localStorage persistence
   * Used for: List of active bakers (changes slowly)
   */
  BAKERS_LIST: {
    ttl: 10 * 60 * 1000, // 10 minutes
    persistToLocalStorage: true,
    staleWhileRevalidate: true,
  },

  /**
   * Baker details - Short cache, no persistence
   * Used for: Individual baker data that changes frequently
   */
  BAKER_DETAILS: {
    ttl: 2 * 60 * 1000, // 2 minutes
    persistToLocalStorage: false,
    staleWhileRevalidate: true,
  },

  /**
   * Baker rewards - Long cache with persistence
   * Used for: Historical reward data (rarely changes)
   */
  BAKER_REWARDS: {
    ttl: 30 * 60 * 1000, // 30 minutes
    persistToLocalStorage: true,
    staleWhileRevalidate: false,
  },

  /**
   * Global stats - Very short cache, no persistence
   * Used for: Aggregated statistics that update frequently
   */
  GLOBAL_STATS: {
    ttl: 1 * 60 * 1000, // 1 minute
    persistToLocalStorage: false,
    staleWhileRevalidate: true,
  },
} as const

/**
 * Utility functions to generate consistent cache keys
 * Using these ensures cache keys are standardized across the app
 */
export const CacheKeys = {
  networkStats: () => "network_stats",
  currentCycle: () => "current_cycle",
  activeBakers: (limit: number) => `active_bakers_${limit}`,
  bakerDetails: (address: string) => `baker_details_${address}`,
  bakerRewards: (address: string, limit: number) => `baker_rewards_${address}_${limit}`,
  bakersStats: () => "bakers_stats",
  topBakers: (limit: number, sortBy: string) => `top_bakers_${limit}_${sortBy}`,
} as const
