"use client"

import type React from "react"

import { useCallback, useRef, useState } from "react"
import { Upload } from "lucide-react"
import type { VideoFile } from "./video-resizer"

interface UploadBoxProps {
  onFileSelect: (file: VideoFile) => void
  currentFile: VideoFile | null
}

export function UploadBox({ onFileSelect, currentFile }: UploadBoxProps) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const processFile = useCallback(
    async (file: File) => {
      const previewUrl = URL.createObjectURL(file)

      // Get video duration
      const video = document.createElement("video")
      video.preload = "metadata"
      video.src = previewUrl

      const duration = await new Promise<number>((resolve) => {
        video.onloadedmetadata = () => resolve(video.duration)
      })

      onFileSelect({
        file,
        name: file.name,
        size: file.size,
        duration,
        previewUrl,
      })
    },
    [onFileSelect],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file && file.type.startsWith("video/")) {
        processFile(file)
      }
    },
    [processFile],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        processFile(file)
      }
    },
    [processFile],
  )

  const formatFileSize = (bytes: number) => {
    if (bytes >= 1073741824) return (bytes / 1073741824).toFixed(2) + " GB"
    if (bytes >= 1048576) return (bytes / 1048576).toFixed(2) + " MB"
    return (bytes / 1024).toFixed(2) + " KB"
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div>
      <label className="block font-mono text-sm text-muted-foreground mb-2">01 — Upload Video</label>
      <div
        className={`border border-border p-8 transition-colors cursor-pointer ${
          isDragging ? "border-primary bg-primary/5" : "hover:border-muted-foreground"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="video/mp4,video/mov,video/webm,video/quicktime"
          onChange={handleFileChange}
          className="hidden"
        />

        {currentFile ? (
          <div className="flex items-start gap-4">
            <div className="relative w-24 h-16 bg-secondary flex items-center justify-center">
              <video src={currentFile.previewUrl} className="w-full h-full object-cover" muted />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-mono text-sm truncate">{currentFile.name}</p>
              <div className="flex gap-4 mt-1 font-mono text-xs text-muted-foreground">
                <span>{formatFileSize(currentFile.size)}</span>
                <span>{formatDuration(currentFile.duration)}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
            <p className="font-mono text-sm text-muted-foreground mb-2">Drag and drop video here</p>
            <p className="font-mono text-xs text-muted-foreground">MP4, MOV, WebM supported</p>
          </div>
        )}
      </div>
    </div>
  )
}
