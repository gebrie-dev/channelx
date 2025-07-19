"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, TrendingUp, DollarSign, Users, Eye, MessageSquare, Settings, Bell, LogOut } from "lucide-react"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const stats = [
    { title: "Total Listings", value: "12", change: "+2 this month", icon: Users },
    { title: "Total Sales", value: "$24,500", change: "+15% from last month", icon: DollarSign },
    { title: "Active Buyers", value: "156", change: "+8 this week", icon: TrendingUp },
    { title: "Profile Views", value: "2,340", change: "+12% this week", icon: Eye },
  ]

  const recentListings = [
    {
      id: 1,
      platform: "YouTube",
      name: "Tech Reviews Channel",
      subscribers: "125K",
      price: "$5,500",
      status: "Active",
      views: 234,
    },
    {
      id: 2,
      platform: "Instagram",
      name: "@fashionista_daily",
      subscribers: "89K",
      price: "$3,200",
      status: "Pending",
      views: 156,
    },
    {
      id: 3,
      platform: "TikTok",
      name: "@dancemoves_pro",
      subscribers: "245K",
      price: "$7,800",
      status: "Sold",
      views: 445,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CX</span>
              </div>
              <span className="text-xl font-bold text-gray-900">ChannelX</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="sm">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-screen">
          <nav className="p-6">
            <div className="space-y-2">
              <Button
                variant={activeTab === "overview" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("overview")}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Overview
              </Button>
              <Button
                variant={activeTab === "listings" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("listings")}
              >
                <Users className="w-4 h-4 mr-2" />
                My Listings
              </Button>
              <Button
                variant={activeTab === "purchases" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("purchases")}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Purchases
              </Button>
              <Button
                variant={activeTab === "messages" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("messages")}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Messages
              </Button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Welcome Section */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Welcome back, John!</h1>
                  <p className="text-gray-600">Here's what's happening with your account today.</p>
                </div>
                <Link href="/dashboard/create-listing">
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Listing
                  </Button>
                </Link>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                          <p className="text-xs text-green-600">{stat.change}</p>
                        </div>
                        <stat.icon className="w-8 h-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Listings</CardTitle>
                    <CardDescription>Your latest account listings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentListings.map((listing) => (
                        <div key={listing.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <span className="text-blue-600 font-semibold text-sm">{listing.platform.charAt(0)}</span>
                            </div>
                            <div>
                              <p className="font-medium">{listing.name}</p>
                              <p className="text-sm text-gray-600">{listing.subscribers} followers</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{listing.price}</p>
                            <Badge
                              variant={
                                listing.status === "Active"
                                  ? "default"
                                  : listing.status === "Pending"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {listing.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common tasks and shortcuts</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link href="/dashboard/create-listing">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Plus className="w-4 h-4 mr-2" />
                        Create New Listing
                      </Button>
                    </Link>
                    <Link href="/marketplace">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Eye className="w-4 h-4 mr-2" />
                        Browse Marketplace
                      </Button>
                    </Link>
                    <Link href="/dashboard/analytics">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        View Analytics
                      </Button>
                    </Link>
                    <Link href="/dashboard/messages">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Check Messages
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "listings" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">My Listings</h1>
                <Link href="/dashboard/create-listing">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    New Listing
                  </Button>
                </Link>
              </div>

              <div className="grid gap-6">
                {recentListings.map((listing) => (
                  <Card key={listing.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-lg">{listing.platform.charAt(0)}</span>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{listing.name}</h3>
                            <p className="text-gray-600">
                              {listing.platform} • {listing.subscribers} followers
                            </p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-sm text-gray-500">
                                <Eye className="w-4 h-4 inline mr-1" />
                                {listing.views} views
                              </span>
                              <Badge
                                variant={
                                  listing.status === "Active"
                                    ? "default"
                                    : listing.status === "Pending"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {listing.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">{listing.price}</p>
                          <div className="flex space-x-2 mt-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
