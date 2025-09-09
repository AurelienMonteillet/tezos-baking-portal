// Système de cache intelligent pour optimiser les performances

export interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number // Time to live en millisecondes
  key: string
}

export interface CacheOptions {
  ttl?: number // Durée de vie par défaut (5 minutes)
  maxSize?: number // Taille maximale du cache
  persistToLocalStorage?: boolean // Persister dans localStorage
  staleWhileRevalidate?: boolean // Retourner des données périmées pendant la revalidation
}

class CacheManager {
  private cache = new Map<string, CacheEntry<any>>()
  private readonly defaultTTL = 5 * 60 * 1000 // 5 minutes
  private readonly maxSize = 100
  private readonly localStoragePrefix = "tzkt_cache_"

  // Obtenir une entrée du cache
  get<T>(key: string, options: CacheOptions = {}): T | null {
    const entry = this.cache.get(key)

    if (!entry) {
      // Essayer de récupérer depuis localStorage si activé
      if (options.persistToLocalStorage) {
        const stored = this.getFromLocalStorage<T>(key)
        if (stored && !this.isExpired(stored)) {
          this.cache.set(key, stored)
          return stored.data
        }
      }
      return null
    }

    // Vérifier si l'entrée est expirée
    if (this.isExpired(entry)) {
      if (options.staleWhileRevalidate) {
        // Retourner les données périmées mais marquer pour revalidation
        return entry.data
      }
      this.cache.delete(key)
      this.removeFromLocalStorage(key)
      return null
    }

    return entry.data
  }

  // Définir une entrée dans le cache
  set<T>(key: string, data: T, options: CacheOptions = {}): void {
    const ttl = options.ttl || this.defaultTTL
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl,
      key,
    }

    // Gérer la taille maximale du cache
    if (this.cache.size >= this.maxSize) {
      this.evictOldest()
    }

    this.cache.set(key, entry)

    // Persister dans localStorage si demandé
    if (options.persistToLocalStorage) {
      this.setToLocalStorage(key, entry)
    }
  }

  // Invalider une entrée spécifique
  invalidate(key: string): void {
    this.cache.delete(key)
    this.removeFromLocalStorage(key)
  }

  // Invalider toutes les entrées correspondant à un pattern
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

  // Vider tout le cache
  clear(): void {
    this.cache.clear()
    this.clearLocalStorage()
  }

  // Obtenir des statistiques du cache
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

  // Précharger des données
  async preload<T>(key: string, fetcher: () => Promise<T>, options: CacheOptions = {}): Promise<T> {
    const cached = this.get<T>(key, options)
    if (cached) {
      return cached
    }

    const data = await fetcher()
    this.set(key, data, options)
    return data
  }

  // Méthodes privées
  private isExpired(entry: CacheEntry<any>): boolean {
    return Date.now() - entry.timestamp > entry.ttl
  }

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
      // Ignore localStorage errors
    }
  }

  private hitCount = 0
  private missCount = 0

  private calculateHitRate(): number {
    const total = this.hitCount + this.missCount
    return total > 0 ? this.hitCount / total : 0
  }

  // Méthodes pour tracking des hits/miss
  recordHit(): void {
    this.hitCount++
  }

  recordMiss(): void {
    this.missCount++
  }
}

// Instance singleton du cache manager
export const cacheManager = new CacheManager()

// Stratégies de cache prédéfinies
export const CacheStrategies = {
  // Données réseau - cache long avec localStorage
  NETWORK_STATS: {
    ttl: 5 * 60 * 1000, // 5 minutes
    persistToLocalStorage: true,
    staleWhileRevalidate: true,
  },

  // Liste des bakers - cache moyen
  BAKERS_LIST: {
    ttl: 10 * 60 * 1000, // 10 minutes
    persistToLocalStorage: true,
    staleWhileRevalidate: true,
  },

  // Détails d'un baker - cache court
  BAKER_DETAILS: {
    ttl: 2 * 60 * 1000, // 2 minutes
    persistToLocalStorage: false,
    staleWhileRevalidate: true,
  },

  // Récompenses - cache long car données historiques
  BAKER_REWARDS: {
    ttl: 30 * 60 * 1000, // 30 minutes
    persistToLocalStorage: true,
    staleWhileRevalidate: false,
  },

  // Statistiques globales - cache très court
  GLOBAL_STATS: {
    ttl: 1 * 60 * 1000, // 1 minute
    persistToLocalStorage: false,
    staleWhileRevalidate: true,
  },
} as const

// Utilitaires pour générer des clés de cache
export const CacheKeys = {
  networkStats: () => "network_stats",
  currentCycle: () => "current_cycle",
  activeBakers: (limit: number) => `active_bakers_${limit}`,
  bakerDetails: (address: string) => `baker_details_${address}`,
  bakerRewards: (address: string, limit: number) => `baker_rewards_${address}_${limit}`,
  bakersStats: () => "bakers_stats",
  topBakers: (limit: number, sortBy: string) => `top_bakers_${limit}_${sortBy}`,
} as const
