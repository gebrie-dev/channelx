"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Upload, Shield, CheckCircle, AlertCircle } from "lucide-react"

export default function CreateListingPage() {
  const [step, setStep] = useState(1)
  const [platform, setPlatform] = useState("")
  const [listingData, setListingData] = useState({
    accountName: "",
    handle: "",
    followers: "",
    engagement: "",
    category: "",
    price: "",
    description: "",
    monetized: false,
    verified: false,
  })

  const platforms = [
    { id: "youtube", name: "YouTube", icon: "🎥", description: "Video content channel" },
    { id: "instagram", name: "Instagram", icon: "📸", description: "Photo & story content" },
    { id: "tiktok", name: "TikTok", icon: "🎵", description: "Short-form video content" },
    { id: "twitter", name: "Twitter/X", icon: "🐦", description: "Microblogging platform" },
    { id: "telegram", name: "Telegram", icon: "✈️", description: "Channel or group" },
  ]

  const categories = [
    "Technology",
    "Fashion",
    "Entertainment",
    "Finance",
    "News",
    "Gaming",
    "Food",
    "Travel",
    "Health",
    "Education",
    "Sports",
    "Music",
    "Art",
    "Business",
  ]

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">Create Listing</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  i <= step ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {i < step ? <CheckCircle className="w-5 h-5" /> : i}
              </div>
              {i < 4 && <div className={`w-16 h-1 mx-2 ${i < step ? "bg-blue-600" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 && "Select Platform"}
              {step === 2 && "Account Details"}
              {step === 3 && "Verification & Proof"}
              {step === 4 && "Review & Publish"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Choose the social media platform for your account"}
              {step === 2 && "Provide detailed information about your account"}
              {step === 3 && "Upload proof of ownership and verification"}
              {step === 4 && "Review your listing before publishing"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="grid md:grid-cols-2 gap-4">
                {platforms.map((p) => (
                  <div
                    key={p.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      platform === p.id ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setPlatform(p.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{p.icon}</div>
                      <div>
                        <h3 className="font-semibold">{p.name}</h3>
                        <p className="text-sm text-gray-600">{p.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="accountName">Account Name</Label>
                    <Input
                      id="accountName"
                      value={listingData.accountName}
                      onChange={(e) => setListingData({ ...listingData, accountName: e.target.value })}
                      placeholder="e.g., Tech Reviews Pro"
                    />
                  </div>
                  <div>
                    <Label htmlFor="handle">Handle/Username</Label>
                    <Input
                      id="handle"
                      value={listingData.handle}
                      onChange={(e) => setListingData({ ...listingData, handle: e.target.value })}
                      placeholder="e.g., @techreviewspro"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="followers">Followers/Subscribers</Label>
                    <Input
                      id="followers"
                      value={listingData.followers}
                      onChange={(e) => setListingData({ ...listingData, followers: e.target.value })}
                      placeholder="e.g., 125000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="engagement">Engagement Rate (%)</Label>
                    <Input
                      id="engagement"
                      value={listingData.engagement}
                      onChange={(e) => setListingData({ ...listingData, engagement: e.target.value })}
                      placeholder="e.g., 4.2"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={listingData.category}
                      onValueChange={(value) => setListingData({ ...listingData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat.toLowerCase()}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="price">Price (USD)</Label>
                    <Input
                      id="price"
                      value={listingData.price}
                      onChange={(e) => setListingData({ ...listingData, price: e.target.value })}
                      placeholder="e.g., 5500"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={listingData.description}
                    onChange={(e) => setListingData({ ...listingData, description: e.target.value })}
                    placeholder="Describe your account, its niche, audience demographics, and any special features..."
                    rows={4}
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="monetized"
                      checked={listingData.monetized}
                      onCheckedChange={(checked) => setListingData({ ...listingData, monetized: checked as boolean })}
                    />
                    <Label htmlFor="monetized">Account is monetized</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="verified"
                      checked={listingData.verified}
                      onCheckedChange={(checked) => setListingData({ ...listingData, verified: checked as boolean })}
                    />
                    <Label htmlFor="verified">Account is verified by platform</Label>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-blue-900">Ownership Verification Required</h3>
                      <p className="text-blue-800 text-sm mt-1">
                        To ensure authenticity, we require proof of ownership for all listings.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Upload Analytics Screenshot</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Upload a recent screenshot from your analytics dashboard (YouTube Studio, Instagram Insights,
                      etc.)
                    </p>
                    <Button variant="outline">Choose File</Button>
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">OAuth Verification</h3>
                    <p className="text-gray-600 text-sm mb-4">Connect your account directly for instant verification</p>
                    <Button className="bg-red-600 hover:bg-red-700">
                      Connect {platform === "youtube" ? "YouTube" : platform === "instagram" ? "Instagram" : "Account"}
                    </Button>
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Additional Proof (Optional)</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Upload any additional screenshots or documents that prove ownership
                    </p>
                    <Button variant="outline">Upload Files</Button>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-yellow-900">Verification Process</h3>
                      <p className="text-yellow-800 text-sm mt-1">
                        Our team will review your submission within 24-48 hours. You'll receive an email once approved.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-green-900">Ready to Publish</h3>
                      <p className="text-green-800 text-sm mt-1">
                        Review your listing details below and publish when ready.
                      </p>
                    </div>
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span className="text-2xl">{platforms.find((p) => p.id === platform)?.icon}</span>
                      <span>{listingData.accountName}</span>
                    </CardTitle>
                    <CardDescription>{listingData.handle}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-600">Followers:</span>
                        <p className="font-semibold">{Number(listingData.followers).toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Engagement:</span>
                        <p className="font-semibold">{listingData.engagement}%</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Category:</span>
                        <Badge variant="outline">{listingData.category}</Badge>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Price:</span>
                        <p className="font-semibold text-green-600">${Number(listingData.price).toLocaleString()}</p>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Description:</span>
                      <p className="mt-1">{listingData.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      {listingData.monetized && <Badge>Monetized</Badge>}
                      {listingData.verified && <Badge>Verified</Badge>}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="flex space-x-3 pt-6">
              {step > 1 && (
                <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
                  Back
                </Button>
              )}
              <Button
                onClick={step === 4 ? () => (window.location.href = "/dashboard") : handleNext}
                className="flex-1"
                disabled={step === 1 && !platform}
              >
                {step === 4 ? "Publish Listing" : "Continue"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
