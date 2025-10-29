import Link from "next/link"
import { Twitter, Instagram, Linkedin } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-5">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CX</span>
              </div>
              <span className="text-lg font-bold">ChannelX</span>
            </div>
            <p className="text-sm text-muted-foreground">A secure marketplace for buying and selling social channels.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Marketplace</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/marketplace">Browse Listings</Link></li>
              <li><Link href="/dashboard">Sell a Channel</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#">How it Works</Link></li>
              <li><Link href="#">Safety & Escrow</Link></li>
              <li><Link href="#">Valuation Guide</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#">About</Link></li>
              <li><Link href="#">Contact</Link></li>
              <li><Link href="#">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Follow</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a className="inline-flex items-center gap-2 hover:text-foreground" href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                  <Twitter className="w-4 h-4" /> Twitter
                </a>
              </li>
              <li>
                <a className="inline-flex items-center gap-2 hover:text-foreground" href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <Instagram className="w-4 h-4" /> Instagram
                </a>
              </li>
              <li>
                <a className="inline-flex items-center gap-2 hover:text-foreground" href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-xs text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} ChannelX. All rights reserved.</div>
          <div>
            Powered by <a className="font-medium hover:underline" href="https://gebrie.netlf.app" target="_blank" rel="noreferrer">gebrie.netlf.app</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
