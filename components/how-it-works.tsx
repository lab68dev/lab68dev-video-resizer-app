import { Upload, Monitor, Settings, Download } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Upload video",
    description: "Drag and drop or select your video file (MP4, MOV, WebM)",
    icon: Upload,
  },
  {
    number: "02",
    title: "Select platform",
    description: "Choose your target platform: TikTok, Reels, Shorts, YouTube, X",
    icon: Monitor,
  },
  {
    number: "03",
    title: "Choose resolution",
    description: "Pick the optimal resolution for your selected platform",
    icon: Settings,
  },
  {
    number: "04",
    title: "Export instantly",
    description: "Download your resized video ready for upload",
    icon: Download,
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {steps.map((step) => (
            <div key={step.number} className="bg-background p-6 md:p-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="font-mono text-primary text-sm">{step.number}</span>
                <step.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <h3 className="font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground font-mono">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
