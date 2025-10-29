export default function SafetyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">Safety & Escrow</h1>
        <p className="text-muted-foreground mt-2">Your transactions are protected by a secure escrow workflow and verification.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border p-6">
          <h3 className="font-semibold">Verification</h3>
          <p className="text-sm text-muted-foreground mt-2">OAuth checks and document verification reduce risk.</p>
        </div>
        <div className="rounded-xl border p-6">
          <h3 className="font-semibold">Dispute Handling</h3>
          <p className="text-sm text-muted-foreground mt-2">Clear steps to resolve issues quickly with minimal friction.</p>
        </div>
      </div>
    </div>
  )
}
