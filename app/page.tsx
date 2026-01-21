import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { PlatformPresets } from "@/components/platform-presets"
import { Footer } from "@/components/footer"
import VideoResizerWrapper from "@/components/video-resizer-wrapper";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <div id="resizer">
         <VideoResizerWrapper />
      </div>
      <HowItWorks />
      <PlatformPresets />
      <Footer />
    </main>
  );
}
