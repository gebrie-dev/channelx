"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, User } from "lucide-react"

const nav = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/pricing", label: "Pricing" },
]

function Brand() {
  return (
    <Link href="/" className="inline-flex items-center gap-2">
      <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-sm">CX</span>
      </div>
      <span className="text-lg font-bold">ChannelX</span>
    </Link>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Brand />
            <nav className="hidden md:flex items-center gap-2">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger aria-label="Open marketplace menu" className="text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
                      Marketplace
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-2 p-4 md:w-[500px] lg:w-[700px] lg:grid-cols-3">
                        <Link href="/marketplace" className="block rounded-md p-3 hover:bg-accent focus-visible:ring-2 ring-offset-2 ring-primary/50">
                          <div className="text-sm font-medium">Browse All</div>
                          <p className="text-xs text-muted-foreground">Explore all verified listings.</p>
                        </Link>
                        <Link href={{ pathname: "/marketplace", query: { platform: "YouTube" } }} className="block rounded-md p-3 hover:bg-accent focus-visible:ring-2 ring-offset-2 ring-primary/50">
                          <div className="text-sm font-medium">YouTube</div>
                          <p className="text-xs text-muted-foreground">Channels with monetization and growth.</p>
                        </Link>
                        <Link href={{ pathname: "/marketplace", query: { platform: "Instagram" } }} className="block rounded-md p-3 hover:bg-accent focus-visible:ring-2 ring-offset-2 ring-primary/50">
                          <div className="text-sm font-medium">Instagram</div>
                          <p className="text-xs text-muted-foreground">Niche and influencer accounts.</p>
                        </Link>
                        <Link href={{ pathname: "/marketplace", query: { platform: "TikTok" } }} className="block rounded-md p-3 hover:bg-accent focus-visible:ring-2 ring-offset-2 ring-primary/50">
                          <div className="text-sm font-medium">TikTok</div>
                          <p className="text-xs text-muted-foreground">High engagement creators.</p>
                        </Link>
                        <Link href={{ pathname: "/marketplace", query: { platform: "Twitter" } }} className="block rounded-md p-3 hover:bg-accent focus-visible:ring-2 ring-offset-2 ring-primary/50">
                          <div className="text-sm font-medium">Twitter/X</div>
                          <p className="text-xs text-muted-foreground">Communities and news feeds.</p>
                        </Link>
                        <Link href={{ pathname: "/marketplace", query: { platform: "Telegram" } }} className="block rounded-md p-3 hover:bg-accent focus-visible:ring-2 ring-offset-2 ring-primary/50">
                          <div className="text-sm font-medium">Telegram</div>
                          <p className="text-xs text-muted-foreground">Groups and broadcast channels.</p>
                        </Link>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger aria-label="Open resources menu" className="text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">Resources</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-2 p-4 md:w-[420px]">
                        <Link href="#" className="block rounded-md p-3 hover:bg-accent focus-visible:ring-2 ring-offset-2 ring-primary/50">
                          <div className="text-sm font-medium">How it Works</div>
                          <p className="text-xs text-muted-foreground">Learn the buying & selling flow.</p>
                        </Link>
                        <Link href="#" className="block rounded-md p-3 hover:bg-accent focus-visible:ring-2 ring-offset-2 ring-primary/50">
                          <div className="text-sm font-medium">Safety & Escrow</div>
                          <p className="text-xs text-muted-foreground">Understand our protection model.</p>
                        </Link>
                        <Link href="#" className="block rounded-md p-3 hover:bg-accent focus-visible:ring-2 ring-offset-2 ring-primary/50">
                          <div className="text-sm font-medium">Valuation Guide</div>
                          <p className="text-xs text-muted-foreground">How to price social channels.</p>
                        </Link>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger aria-label="Open company menu" className="text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">Company</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-2 p-4 md:w-[380px]">
                        <Link href="#" className="block rounded-md p-3 hover:bg-accent focus-visible:ring-2 ring-offset-2 ring-primary/50">
                          <div className="text-sm font-medium">About</div>
                          <p className="text-xs text-muted-foreground">Our mission and values.</p>
                        </Link>
                        <Link href="#" className="block rounded-md p-3 hover:bg-accent focus-visible:ring-2 ring-offset-2 ring-primary/50">
                          <div className="text-sm font-medium">Contact</div>
                          <p className="text-xs text-muted-foreground">Get in touch with our team.</p>
                        </Link>
                        <Link href="#" className="block rounded-md p-3 hover:bg-accent focus-visible:ring-2 ring-offset-2 ring-primary/50">
                          <div className="text-sm font-medium">Careers</div>
                          <p className="text-xs text-muted-foreground">Join us and build the future.</p>
                        </Link>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <Link href="/pricing" className={(pathname?.startsWith("/pricing") ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground") + " text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-md px-1"}>
                Pricing
              </Link>
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <Link href="/auth/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Get Started</Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button aria-label="Open profile menu" variant="outline" size="icon" className="ml-1 focus-visible:ring-2 focus-visible:ring-primary/50">
                  <User className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button aria-label="Open navigation menu" variant="outline" size="icon" className="focus-visible:ring-2 focus-visible:ring-primary/50">
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col gap-4 mt-6">
                  {nav.map((n) => (
                    <Link key={n.href} href={n.href} className="text-base" >
                      {n.label}
                    </Link>
                  ))}
                  <Link href="/auth/login">
                    <Button variant="ghost" className="justify-start w-full">Login</Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button variant="outline" className="w-full">Dashboard</Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
