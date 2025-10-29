export default function ValuationPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">Valuation Guide</h1>
        <p className="text-muted-foreground mt-2">Understand pricing factors: niche, engagement, growth, and monetization.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border p-6">
          <h3 className="font-semibold">Key Metrics</h3>
          <p className="text-sm text-muted-foreground mt-2">Followers, engagement rate, CPM history, audience geo.</p>
        </div>
        <div className="rounded-xl border p-6">
          <h3 className="font-semibold">Benchmarks</h3>
          <p className="text-sm text-muted-foreground mt-2">Market comps and recent sales to guide fair offers.</p>
        </div>
      </div>
    </div>
  )
}
