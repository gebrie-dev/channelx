"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  MessageSquare,
  Settings,
} from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const stats = [
    { title: "Total Users", value: "12,543", change: "+8.2%", icon: Users },
    { title: "Total Revenue", value: "$245,670", change: "+15.3%", icon: DollarSign },
    { title: "Active Listings", value: "1,234", change: "+5.7%", icon: TrendingUp },
    { title: "Pending Disputes", value: "23", change: "-12.5%", icon: AlertTriangle },
  ]

  const pendingListings = [
    {
      id: 1,
      platform: "YouTube",
      name: "Gaming Channel Pro",
      seller: "John Smith",
      price: "$8,500",
      submitted: "2 hours ago",
      status: "pending",
    },
    {
      id: 2,
      platform: "Instagram",
      name: "@lifestyle_blogger",
      seller: "Sarah Johnson",
      price: "$4,200",
      submitted: "5 hours ago",
      status: "pending",
    },
    {
      id: 3,
      platform: "TikTok",
      name: "Dance Moves",
      seller: "Mike Chen",
      price: "$6,800",
      submitted: "1 day ago",
      status: "under_review",
    },
  ]

  const disputes = [
    {
      id: 1,
      buyer: "Alice Brown",
      seller: "Bob Wilson",
      account: "Tech Reviews Channel",
      amount: "$5,500",
      reason: "Account access not provided",
      status: "open",
      created: "3 hours ago",
    },
    {
      id: 2,
      buyer: "Charlie Davis",
      seller: "Emma White",
      account: "@fashion_daily",
      amount: "$3,200",
      reason: "Follower count mismatch",
      status: "investigating",
      created: "1 day ago",
    },
  ]

  const recentTransactions = [
    {
      id: 1,
      buyer: "Alex Rivera",
      seller: "Jordan Lee",
      account: "Crypto Insights",
      amount: "$4,200",
      commission: "$630",
      status: "completed",
      date: "2 hours ago",
    },
    {
      id: 2,
      buyer: "Taylor Swift",
      seller: "Morgan Freeman",
      account: "News Channel 24/7",
      amount: "$6,500",
      commission: "$975",
      status: "escrow",
      date: "5 hours ago",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CX</span>
              </div>
              <span className="text-xl font-bold text-gray-900">ChannelX Admin</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="listings">Listings</TabsTrigger>
            <TabsTrigger value="disputes">Disputes</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className={`text-xs ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                          {stat.change} from last month
                        </p>
                      </div>
                      <stat.icon className="w-8 h-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Actions</CardTitle>
                  <CardDescription>Items requiring immediate attention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      <div>
                        <p className="font-medium">3 listings awaiting approval</p>
                        <p className="text-sm text-gray-600">Review required</p>
                      </div>
                    </div>
                    <Button size="sm">Review</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="font-medium">2 active disputes</p>
                        <p className="text-sm text-gray-600">Requires resolution</p>
                      </div>
                    </div>
                    <Button size="sm" variant="destructive">
                      Resolve
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">5 escrow releases pending</p>
                        <p className="text-sm text-gray-600">Awaiting confirmation</p>
                      </div>
                    </div>
                    <Button size="sm">Process</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest platform activity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-sm">New user registration: john.doe@email.com</p>
                    <span className="text-xs text-gray-500 ml-auto">5 min ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <p className="text-sm">Listing approved: Tech Reviews Channel</p>
                    <span className="text-xs text-gray-500 ml-auto">12 min ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <p className="text-sm">Dispute opened: @fashion_daily</p>
                    <span className="text-xs text-gray-500 ml-auto">1 hour ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <p className="text-sm">Transaction completed: $4,200</p>
                    <span className="text-xs text-gray-500 ml-auto">2 hours ago</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="listings" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Listing Management</h2>
              <div className="flex space-x-2">
                <Input placeholder="Search listings..." className="w-64" />
                <Button variant="outline">Filter</Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Pending Approvals</CardTitle>
                <CardDescription>Listings awaiting admin review</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingListings.map((listing) => (
                    <div key={listing.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">{listing.platform.charAt(0)}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold">{listing.name}</h3>
                          <p className="text-sm text-gray-600">by {listing.seller}</p>
                          <p className="text-xs text-gray-500">Submitted {listing.submitted}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold text-green-600">{listing.price}</span>
                        <Badge variant={listing.status === "pending" ? "secondary" : "outline"}>
                          {listing.status.replace("_", " ")}
                        </Badge>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="disputes" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Dispute Resolution</h2>
              <Button>View All Disputes</Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Active Disputes</CardTitle>
                <CardDescription>Disputes requiring admin intervention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {disputes.map((dispute) => (
                    <div key={dispute.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{dispute.account}</h3>
                          <p className="text-sm text-gray-600">
                            {dispute.buyer} vs {dispute.seller}
                          </p>
                          <p className="text-xs text-gray-500">Created {dispute.created}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-semibold text-red-600">{dispute.amount}</span>
                          <Badge variant={dispute.status === "open" ? "destructive" : "secondary"} className="ml-2">
                            {dispute.status}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">
                        <strong>Reason:</strong> {dispute.reason}
                      </p>
                      <div className="flex space-x-2">
                        <Button size="sm">View Details</Button>
                        <Button size="sm" variant="outline">
                          Contact Buyer
                        </Button>
                        <Button size="sm" variant="outline">
                          Contact Seller
                        </Button>
                        <Button size="sm" variant="destructive">
                          Resolve
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Transaction Management</h2>
              <div className="flex space-x-2">
                <Input placeholder="Search transactions..." className="w-64" />
                <Button variant="outline">Export</Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest platform transactions and escrow status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{transaction.account}</h3>
                          <p className="text-sm text-gray-600">
                            {transaction.buyer} → {transaction.seller}
                          </p>
                          <p className="text-xs text-gray-500">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{transaction.amount}</p>
                        <p className="text-sm text-gray-600">Commission: {transaction.commission}</p>
                        <Badge variant={transaction.status === "completed" ? "default" : "secondary"}>
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
