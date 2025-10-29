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
            src="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=2100&auto=format&fit=crop"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background/80" />
        </div>
        <div className="relative px-4">
          <div className="container mx-auto py-28 text-center">
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur">
              🚀 Secure Social Media Asset Trading
            </div>
            <h1 className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight text-white">
              Buy & Sell
              <span className="ml-2 inline-block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Social Media Accounts
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg md:text-xl text-white/80">
              The most secure marketplace for trading YouTube channels, Instagram accounts, TikTok profiles, and Telegram
              channels with escrow protection and verified ownership.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
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
              { name: "YouTube", icon: "🎥", color: "bg-red-100 text-red-800" },
              { name: "Instagram", icon: "📸", color: "bg-pink-100 text-pink-800" },
              { name: "TikTok", icon: "🎵", color: "bg-teal-100 text-teal-800" },
              { name: "Twitter/X", icon: "🐦", color: "bg-emerald-100 text-emerald-800" },
              { name: "Telegram", icon: "✈️", color: "bg-cyan-100 text-cyan-800" },
            ].map((platform) => (
              <Card key={platform.name} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{platform.icon}</div>
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
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Trading?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who trust ChannelX for secure social media account trading.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" variant="secondary">
                Create Account
              </Button>
            </Link>
            <Link href="/marketplace">
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                Explore Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </section>

      
    </div>
  )
}
