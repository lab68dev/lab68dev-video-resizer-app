"use client"

import type { VideoFile, Platform, Resolution } from "./video-resizer"
import { Loader2 } from "lucide-react"

interface ProcessPanelProps {
  videoFile: VideoFile | null
  selectedPlatform: Platform | null
  selectedResolution: Resolution | null
  isProcessing: boolean
  progress: number
  onProcess: () => void
}

export function ProcessPanel({
  videoFile,
  selectedPlatform,
  selectedResolution,
  isProcessing,
  progress,
  onProcess,
}: ProcessPanelProps) {
  const canProcess = videoFile && selectedPlatform && selectedResolution && !isProcessing

  return (
    <div className="border border-border p-6">
      <h3 className="font-bold mb-4">Processing Panel</h3>

      {videoFile && (
        <div className="mb-6">
          <div className="aspect-video bg-secondary relative overflow-hidden">
            <video src={videoFile.previewUrl} className="w-full h-full object-contain" muted playsInline />
          </div>
          <div className="mt-4 font-mono text-sm text-muted-foreground space-y-1">
            <p>
              <span className="text-foreground">File:</span> {videoFile.name}
            </p>
            {selectedPlatform && (
              <p>
                <span className="text-foreground">Platform:</span>{" "}
                <span className="text-primary">{selectedPlatform.toUpperCase()}</span>
              </p>
            )}
            {selectedResolution && (
              <p>
                <span className="text-foreground">Output:</span>{" "}
                <span className="text-primary">{selectedResolution.replace("x", " × ")}</span>
              </p>
            )}
          </div>
        </div>
      )}

      {isProcessing && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <span className="font-mono text-sm">Processing... {progress}%</span>
          </div>
          <div className="h-1 bg-secondary">
            <div className="h-full bg-primary transition-all duration-200" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      <button
        onClick={onProcess}
        disabled={!canProcess}
        className={`w-full py-4 font-mono text-sm font-medium border transition-colors ${
          canProcess
            ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
            : "bg-secondary text-muted-foreground border-border cursor-not-allowed"
        }`}
      >
        {isProcessing ? "Processing..." : "Process Video"}
      </button>
    </div>
  )
}
