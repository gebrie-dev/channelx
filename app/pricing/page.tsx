export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">Pricing</h1>
        <p className="text-muted-foreground mt-2">Simple plans to get you started. Upgrade any time.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border p-6 bg-background">
          <h3 className="text-xl font-semibold">Starter</h3>
          <p className="text-sm text-muted-foreground mt-1">For trying the platform</p>
          <div className="text-3xl font-bold mt-4">Free</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Browse marketplace</li>
            <li>Basic alerts</li>
            <li>Email support</li>
          </ul>
        </div>
        <div className="rounded-xl border p-6 bg-gradient-to-b from-emerald-50/50 to-transparent dark:from-emerald-900/10">
          <h3 className="text-xl font-semibold">Pro</h3>
          <p className="text-sm text-muted-foreground mt-1">For active buyers & sellers</p>
          <div className="text-3xl font-bold mt-4">$29<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Advanced filters</li>
            <li>Priority support</li>
            <li>Offer management</li>
          </ul>
        </div>
        <div className="rounded-xl border p-6 bg-background">
          <h3 className="text-xl font-semibold">Enterprise</h3>
          <p className="text-sm text-muted-foreground mt-1">For teams and agencies</p>
          <div className="text-3xl font-bold mt-4">Custom</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Dedicated manager</li>
            <li>SLAs & custom terms</li>
            <li>Onboarding & training</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
