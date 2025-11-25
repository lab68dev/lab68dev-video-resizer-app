import Link from "next/link"

export function Hero() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-24 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
            Resize Videos for Any Platform.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground font-mono">Fast. Accurate. Built for creators.</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="#resizer"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-mono text-sm font-medium border border-primary hover:bg-primary/90 transition-colors"
            >
              Start Resizing
            </Link>
            <Link
              href="#presets"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-foreground font-mono text-sm font-medium border border-border hover:bg-secondary transition-colors"
            >
              View Presets
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
