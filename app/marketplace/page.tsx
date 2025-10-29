"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Heart, Eye, Users, TrendingUp, Star, Shield, AlertTriangle } from "lucide-react"

export default function MarketplacePage() {
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [selectedPlatform, setSelectedPlatform] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [searchText, setSearchText] = useState("")

  const [items, setItems] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Build query string for API
  const query = useMemo(() => {
    const params = new URLSearchParams()
    if (searchText) params.set("search", searchText)
    if (selectedPlatform) params.set("platform", selectedPlatform)
    if (priceRange?.length === 2) {
      params.set("minPrice", String(priceRange[0]))
      params.set("maxPrice", String(priceRange[1]))
    }
    if (sortBy) params.set("sort", sortBy)
    params.set("limit", "20")
    return params.toString()
  }, [searchText, selectedPlatform, priceRange, sortBy])

  // Debounced fetch
  useEffect(() => {
    let alive = true
    setLoading(true)
    setError(null)
    const t = setTimeout(() => {
      fetch(`/api/channels?${query}`)
        .then(async (r) => {
          if (!r.ok) throw new Error((await r.json())?.detail || "Failed to load")
          return r.json()
        })
        .then((data) => {
          if (!alive) return
          setItems(data.items)
          setTotal(data.total)
        })
        .catch((e) => alive && setError(e.message))
        .finally(() => alive && setLoading(false))
    }, 300)
    return () => {
      alive = false
      clearTimeout(t)
    }
  }, [query])

  const platformIcons = {
    YouTube: "🎥",
    Instagram: "📸",
    TikTok: "🎵",
    Twitter: "🐦",
    Telegram: "✈️",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className="w-80 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search accounts..."
                      className="pl-10"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </div>
                </div>

                {/* Platform Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Platform</label>
                  <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Platforms</SelectItem>
                      <SelectItem value="YouTube">YouTube</SelectItem>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="TikTok">TikTok</SelectItem>
                      <SelectItem value="Twitter">Twitter</SelectItem>
                      <SelectItem value="Telegram">Telegram</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <Slider value={priceRange} onValueChange={setPriceRange} max={10000} step={100} className="mt-2" />
                </div>

                {/* Category */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="fashion">Fashion</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="news">News</SelectItem>
                      <SelectItem value="gaming">Gaming</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Followers Range */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Minimum Followers</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1k">1K+</SelectItem>
                      <SelectItem value="10k">10K+</SelectItem>
                      <SelectItem value="50k">50K+</SelectItem>
                      <SelectItem value="100k">100K+</SelectItem>
                      <SelectItem value="500k">500K+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Verification */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Account Status</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Verified accounts only</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Monetized accounts</span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Social Media Marketplace</h1>
                <p className="text-gray-600">Discover and purchase established social media accounts</p>
              </div>
              <div className="flex items-center space-x-3">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="followers">Most Followers</SelectItem>
                    <SelectItem value="engagement">Best Engagement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">{loading ? "Loading..." : `${total} accounts found`}</p>
            </div>

            {/* Error state */}
            {error && (
              <div className="mb-6 flex items-center gap-2 text-red-600">
                <AlertTriangle className="w-4 h-4" />
                <span>{error}</span>
                <Button variant="outline" size="sm" className="ml-2" onClick={() => setSearchText((v) => v)}>
                  Retry
                </Button>
              </div>
            )}

            {/* Loading skeletons */}
            {loading && (
              <div className="grid gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-6 w-1/3 bg-gray-200 rounded mb-4" />
                      <div className="h-4 w-1/2 bg-gray-200 rounded mb-2" />
                      <div className="h-4 w-1/4 bg-gray-200 rounded" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Empty state */}
            {!loading && !error && items.length === 0 && (
              <Card className="p-10 text-center">
                <p className="text-gray-600">No channels match your filters.</p>
              </Card>
            )}

            {/* Account Grid */}
            {!loading && !error && items.length > 0 && (
              <div className="grid gap-6">
                {items.map((account: any) => (
                  <Card key={account.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="relative">
                            <Avatar className="w-20 h-20">
                              <AvatarImage src={account.media?.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {platformIcons[account.platform as keyof typeof platformIcons]}
                              </AvatarFallback>
                            </Avatar>
                            {account.verification && (
                              <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                <Shield className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="text-xl font-semibold">{account.name}</h3>
                            </div>
                            <p className="text-gray-600 mb-2">{account.handle}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                              <span className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                {account.subscribers.toLocaleString()} followers
                              </span>
                              <span className="flex items-center">
                                <TrendingUp className="w-4 h-4 mr-1" />
                                {account.growthRate}% growth
                              </span>
                              {account.niche && <Badge variant="outline">{account.niche}</Badge>}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-green-600 mb-2">${account.askingPrice.toLocaleString()}</div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Heart className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Link href={`/marketplace/${account.id}`}>
                              <Button size="sm">View Details</Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline">Load More Accounts</Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
