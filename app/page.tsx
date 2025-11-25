import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { PlatformPresets } from "@/components/platform-presets"
import { VideoResizer } from "@/components/video-resizer"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <HowItWorks />
      <PlatformPresets />
      <VideoResizer />
      <Footer />
    </main>
  )
}
