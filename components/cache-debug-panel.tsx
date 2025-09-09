"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCacheStats } from "@/hooks/use-tzkt-data-cached"
import { Trash2, RefreshCw, Database, TrendingUp } from "lucide-react"

export function CacheDebugPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const { size, hitRate, entries, clearCache } = useCacheStats()

  if (process.env.NODE_ENV === "production") {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button onClick={() => setIsOpen(true)} size="sm" variant="outline" className="bg-white shadow-lg">
          <Database className="h-4 w-4 mr-2" />
          Cache ({size})
        </Button>
      ) : (
        <Card className="w-96 max-h-96 overflow-hidden shadow-xl">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Cache Debug Panel</CardTitle>
              <Button onClick={() => setIsOpen(false)} size="sm" variant="ghost" className="h-6 w-6 p-0">
                ×
              </Button>
            </div>
            <CardDescription>Performance monitoring and cache management</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Statistiques générales */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{size}</div>
                <div className="text-xs text-muted-foreground">Entries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{(hitRate * 100).toFixed(1)}%</div>
                <div className="text-xs text-muted-foreground">Hit Rate</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button onClick={clearCache} size="sm" variant="destructive" className="flex-1">
                <Trash2 className="h-3 w-3 mr-1" />
                Clear Cache
              </Button>
              <Button onClick={() => window.location.reload()} size="sm" variant="outline" className="flex-1">
                <RefreshCw className="h-3 w-3 mr-1" />
                Reload
              </Button>
            </div>

            {/* Entrées du cache */}
            <div className="space-y-2 max-h-48 overflow-y-auto">
              <div className="text-sm font-medium flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                Cache Entries
              </div>
              {entries.length === 0 ? (
                <div className="text-xs text-muted-foreground text-center py-4">No cache entries</div>
              ) : (
                entries.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between text-xs p-2 bg-gray-50 rounded">
                    <div className="flex-1 truncate">
                      <div className="font-mono truncate">{entry.key}</div>
                      <div className="text-muted-foreground">
                        Age: {Math.round(entry.age / 1000)}s / TTL: {Math.round(entry.ttl / 1000)}s
                      </div>
                    </div>
                    <Badge variant={entry.age > entry.ttl ? "destructive" : "secondary"} className="ml-2">
                      {entry.age > entry.ttl ? "Expired" : "Valid"}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
