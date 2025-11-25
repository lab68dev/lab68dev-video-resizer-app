"use client"

import { useState, useCallback } from "react"
import { UploadBox } from "./upload-box"
import { PresetSelector } from "./preset-selector"
import { ResolutionSelector } from "./resolution-selector"
import { ProcessPanel } from "./process-panel"
import { OutputPanel } from "./output-panel"

export type Platform = "tiktok" | "reels" | "youtube" | "shorts" | "x" | "facebook"
export type Resolution = "1080x1920" | "720x1280" | "1920x1080" | "1280x720" | "1080x1080"

export interface VideoFile {
  file: File
  name: string
  size: number
  duration: number
  previewUrl: string
}

export function VideoResizer() {
  const [videoFile, setVideoFile] = useState<VideoFile | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null)
  const [selectedResolution, setSelectedResolution] = useState<Resolution | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [outputUrl, setOutputUrl] = useState<string | null>(null)

  const handleFileSelect = useCallback((file: VideoFile) => {
    setVideoFile(file)
    setOutputUrl(null)
    setProgress(0)
  }, [])

  const handlePlatformSelect = useCallback((platform: Platform) => {
    setSelectedPlatform(platform)
    // Auto-select resolution based on platform
    const resolutionMap: Record<Platform, Resolution> = {
      tiktok: "1080x1920",
      reels: "1080x1920",
      youtube: "1920x1080",
      shorts: "1080x1920",
      x: "1280x720",
      facebook: "1080x1080",
    }
    setSelectedResolution(resolutionMap[platform])
  }, [])

  const handleProcess = useCallback(async () => {
    if (!videoFile || !selectedResolution) return

    setIsProcessing(true)
    setProgress(0)

    // Simulate processing with progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      setProgress(i)
    }

    // For demo purposes, use the original video as output
    setOutputUrl(videoFile.previewUrl)
    setIsProcessing(false)
  }, [videoFile, selectedResolution])

  const handleReset = useCallback(() => {
    setVideoFile(null)
    setSelectedPlatform(null)
    setSelectedResolution(null)
    setIsProcessing(false)
    setProgress(0)
    setOutputUrl(null)
  }, [])

  return (
    <section id="resizer" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Video Resizer Tool</h2>
        <p className="text-muted-foreground font-mono text-sm mb-12">Upload → Select preset → Download</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <UploadBox onFileSelect={handleFileSelect} currentFile={videoFile} />
            <PresetSelector
              selectedPlatform={selectedPlatform}
              onPlatformSelect={handlePlatformSelect}
              disabled={!videoFile}
            />
            <ResolutionSelector
              selectedResolution={selectedResolution}
              onResolutionSelect={setSelectedResolution}
              disabled={!selectedPlatform}
            />
          </div>

          <div className="space-y-6">
            <ProcessPanel
              videoFile={videoFile}
              selectedPlatform={selectedPlatform}
              selectedResolution={selectedResolution}
              isProcessing={isProcessing}
              progress={progress}
              onProcess={handleProcess}
            />
            {outputUrl && <OutputPanel outputUrl={outputUrl} resolution={selectedResolution!} onReset={handleReset} />}
          </div>
        </div>
      </div>
    </section>
  )
}
