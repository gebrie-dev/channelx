export default function HowItWorksPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">How It Works</h1>
        <p className="text-muted-foreground mt-2">From listing to ownership transfer, the process is streamlined and secure.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border p-6">
          <div className="text-emerald-600 font-bold mb-1">1</div>
          <h3 className="font-semibold">List or Browse</h3>
          <p className="text-sm text-muted-foreground mt-2">Create a verified listing or search with advanced filters.</p>
        </div>
        <div className="rounded-xl border p-6">
          <div className="text-emerald-600 font-bold mb-1">2</div>
          <h3 className="font-semibold">Secure Escrow</h3>
          <p className="text-sm text-muted-foreground mt-2">Funds are held in escrow until the account is transferred.</p>
        </div>
        <div className="rounded-xl border p-6">
          <div className="text-emerald-600 font-bold mb-1">3</div>
          <h3 className="font-semibold">Transfer & Release</h3>
          <p className="text-sm text-muted-foreground mt-2">Ownership is verified, then funds are released to the seller.</p>
        </div>
      </div>
    </div>
  )
}
