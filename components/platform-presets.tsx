const platforms = [
  { name: "TikTok", resolution: "1080×1920", ratio: "9:16" },
  { name: "Instagram Reels", resolution: "1080×1920", ratio: "9:16" },
  { name: "YouTube", resolution: "1920×1080", ratio: "16:9" },
  { name: "Shorts", resolution: "1080×1920", ratio: "9:16" },
  { name: "X Video", resolution: "1280×720", ratio: "16:9" },
  { name: "Facebook Video", resolution: "1080×1080", ratio: "1:1" },
]

export function PlatformPresets() {
  return (
    <section id="presets" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Supported Platforms</h2>
        <p className="text-muted-foreground font-mono text-sm mb-12">
          Optimized presets for all major social media platforms
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="bg-background p-6 border border-border hover:border-primary transition-colors group"
            >
              <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">{platform.name}</h3>
              <div className="flex items-center gap-4 font-mono text-sm">
                <span className="text-muted-foreground">{platform.resolution}</span>
                <span className="text-primary">{platform.ratio}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
