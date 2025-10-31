import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, CheckCircle } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">

      <section className="relative">
        <div className="absolute inset-0">
          <img
          src="data:image/jpeg;base64,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"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background/80" />
        </div>
        <div className="relative px-4">
          <div className="container mx-auto py-20 md:py-24 text-center">
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur">
              🚀 Secure Social Media Asset Trading
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Buy & Sell
              <span className="ml-2 inline-block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Social Media Accounts
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-white/80">
              The most secure marketplace for trading YouTube channels, Instagram accounts, TikTok profiles, and Telegram
              channels with escrow protection and verified ownership.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="shadow-lg shadow-emerald-500/20 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                >
                  Start Selling
                </Button>
              </Link>
              <Link href="/marketplace">
                <Button size="lg" variant="outline" className="backdrop-blur bg-white/10 text-white border-white/30 hover:bg-white/20">
                  Browse Marketplace
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Platforms */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Supported Platforms</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { name: "YouTube", iconSrc: "https://cdn.simpleicons.org/youtube/ff0000", color: "bg-red-100 text-red-800" },
              { name: "Instagram", iconSrc: "https://cdn.simpleicons.org/instagram/E4405F", color: "bg-pink-100 text-pink-800" },
              { name: "TikTok", iconSrc: "https://cdn.simpleicons.org/tiktok/000000", color: "bg-teal-100 text-teal-800" },
              { name: "Twitter/X", iconSrc: "https://cdn.simpleicons.org/x/111827", color: "bg-emerald-100 text-emerald-800" },
              { name: "Telegram", iconSrc: "https://cdn.simpleicons.org/telegram/229ED9", color: "bg-cyan-100 text-cyan-800" },
            ].map((platform) => (
              <Card key={platform.name} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-3 flex items-center justify-center">
                    <img src={platform.iconSrc} alt={`${platform.name} icon`} className="h-9 w-9" />
                  </div>
                  <Badge className={platform.color}>{platform.name}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose ChannelX?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="w-12 h-12 text-emerald-600 mb-4" />
                <CardTitle>Secure Escrow System</CardTitle>
                <CardDescription>
                  Your money is protected with our secure escrow system until ownership transfer is confirmed.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CheckCircle className="w-12 h-12 text-emerald-600 mb-4" />
                <CardTitle>Verified Ownership</CardTitle>
                <CardDescription>
                  All accounts are verified through OAuth API integration and proof of ownership documentation.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="w-12 h-12 text-teal-600 mb-4" />
                <CardTitle>KYC Verification</CardTitle>
                <CardDescription>
                  Identity verification for all users ensures a safe and trustworthy trading environment.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">10K+</div>
              <div className="text-gray-600">Accounts Traded</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">$2M+</div>
              <div className="text-gray-600">Transaction Volume</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-teal-600 mb-2">5K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-600 mb-2">99.9%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">List Your Account</h3>
              <p className="text-gray-600">Verify ownership and create a detailed listing with analytics and proof.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-teal-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Transaction</h3>
              <p className="text-gray-600">Buyer pays into escrow, ensuring both parties are protected.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-cyan-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Transfer & Release</h3>
              <p className="text-gray-600">Complete ownership transfer and funds are released to seller.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="mx-auto max-w-5xl rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-10 md:p-14 text-white shadow-2xl">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">Ready to Start Trading?</h2>
              <p className="text-lg md:text-xl opacity-90 mb-8">
                Join thousands of users who trust ChannelX for secure social media account trading.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/signup">
                  <Button size="lg" variant="secondary" className="text-emerald-700">
                    Create Account
                  </Button>
                </Link>
                <Link href="/marketplace">
                  <Button size="lg" variant="outline" className="text-white border-white/80 hover:bg-white hover:text-emerald-700">
                    Explore Marketplace
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  )
}
