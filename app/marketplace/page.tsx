"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Heart, Eye, Users, TrendingUp, Star, Shield } from "lucide-react"

export default function MarketplacePage() {
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [selectedPlatform, setSelectedPlatform] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const accounts = [
    {
      id: 1,
      platform: "YouTube",
      name: "Tech Reviews Pro",
      handle: "@techreviewspro",
      subscribers: "125K",
      price: 5500,
      engagement: "4.2%",
      category: "Technology",
      verified: true,
      featured: true,
      image: "/placeholder.svg?height=80&width=80",
      seller: {
        name: "John Smith",
        rating: 4.9,
        sales: 23,
      },
    },
    {
      id: 2,
      platform: "Instagram",
      name: "Fashion Daily",
      handle: "@fashionista_daily",
      subscribers: "89K",
      price: 3200,
      engagement: "6.8%",
      category: "Fashion",
      verified: true,
      featured: false,
      image: "/placeholder.svg?height=80&width=80",
      seller: {
        name: "Sarah Johnson",
        rating: 4.8,
        sales: 15,
      },
    },
    {
      id: 3,
      platform: "TikTok",
      name: "Dance Moves Pro",
      handle: "@dancemoves_pro",
      subscribers: "245K",
      price: 7800,
      engagement: "8.5%",
      category: "Entertainment",
      verified: true,
      featured: true,
      image: "/placeholder.svg?height=80&width=80",
      seller: {
        name: "Mike Chen",
        rating: 5.0,
        sales: 31,
      },
    },
    {
      id: 4,
      platform: "Twitter",
      name: "Crypto Insights",
      handle: "@cryptoinsights",
      subscribers: "67K",
      price: 4200,
      engagement: "3.9%",
      category: "Finance",
      verified: false,
      featured: false,
      image: "/placeholder.svg?height=80&width=80",
      seller: {
        name: "Alex Rivera",
        rating: 4.7,
        sales: 8,
      },
    },
    {
      id: 5,
      platform: "Telegram",
      name: "News Channel",
      handle: "Breaking News 24/7",
      subscribers: "156K",
      price: 6500,
      engagement: "12.3%",
      category: "News",
      verified: true,
      featured: false,
      image: "/placeholder.svg?height=80&width=80",
      seller: {
        name: "Emma Wilson",
        rating: 4.9,
        sales: 19,
      },
    },
  ]

  const platformIcons = {
    YouTube: "🎥",
    Instagram: "📸",
    TikTok: "🎵",
    Twitter: "🐦",
    Telegram: "✈️",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CX</span>
              </div>
              <span className="text-xl font-bold text-gray-900">ChannelX</span>
            </Link>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">Marketplace</span>
          </div>
          <div className="flex items-center space-x-3">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

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
                    <Input placeholder="Search accounts..." className="pl-10" />
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
                      <SelectItem value="youtube">YouTube</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                      <SelectItem value="twitter">Twitter</SelectItem>
                      <SelectItem value="telegram">Telegram</SelectItem>
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
              <p className="text-gray-600">{accounts.length} accounts found</p>
            </div>

            {/* Account Grid */}
            <div className="grid gap-6">
              {accounts.map((account) => (
                <Card key={account.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <Avatar className="w-20 h-20">
                            <AvatarImage src={account.image || "/placeholder.svg"} />
                            <AvatarFallback>
                              {platformIcons[account.platform as keyof typeof platformIcons]}
                            </AvatarFallback>
                          </Avatar>
                          {account.verified && (
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                              <Shield className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-xl font-semibold">{account.name}</h3>
                            {account.featured && (
                              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500">Featured</Badge>
                            )}
                          </div>
                          <p className="text-gray-600 mb-2">{account.handle}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {account.subscribers} followers
                            </span>
                            <span className="flex items-center">
                              <TrendingUp className="w-4 h-4 mr-1" />
                              {account.engagement} engagement
                            </span>
                            <Badge variant="outline">{account.category}</Badge>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className="text-xs">
                                  {account.seller.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-gray-600">{account.seller.name}</span>
                              <div className="flex items-center">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span className="text-xs text-gray-500 ml-1">
                                  {account.seller.rating} ({account.seller.sales} sales)
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-green-600 mb-2">${account.price.toLocaleString()}</div>
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
