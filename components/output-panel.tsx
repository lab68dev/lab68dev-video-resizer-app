"use client"

import { Download, RefreshCw } from "lucide-react"
import type { Resolution } from "./video-resizer"

interface OutputPanelProps {
  outputUrl: string
  resolution: Resolution
  onReset: () => void
}

export function OutputPanel({ outputUrl, resolution, onReset }: OutputPanelProps) {
  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = outputUrl
    link.download = `resized-video-${resolution}.mp4`
    link.click()
  }

  return (
    <div className="border border-primary p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-primary">Output Ready</h3>
        <span className="font-mono text-xs text-muted-foreground">{resolution.replace("x", " × ")}</span>
      </div>

      <div className="aspect-video bg-secondary relative overflow-hidden mb-6">
        <video src={outputUrl} className="w-full h-full object-contain" controls playsInline />
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleDownload}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground font-mono text-sm font-medium border border-primary hover:bg-primary/90 transition-colors"
        >
          <Download className="h-4 w-4" />
          Download
        </button>
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 px-4 py-3 border border-border font-mono text-sm hover:border-muted-foreground transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Reset
        </button>
      </div>
    </div>
  )
}
