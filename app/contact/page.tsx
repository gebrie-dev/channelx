export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">Contact</h1>
        <p className="text-muted-foreground mt-2">We'd love to hear from you.</p>
      </div>
      <div className="rounded-xl border p-6 max-w-xl mx-auto">
        <div className="space-y-2 text-sm text-muted-foreground">
          <div>Email: support@channelx.app</div>
          <div>Twitter: @channelx</div>
        </div>
      </div>
    </div>
  )
}
