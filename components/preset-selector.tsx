"use client"

import type { Platform } from "./video-resizer"

interface PresetSelectorProps {
  selectedPlatform: Platform | null
  onPlatformSelect: (platform: Platform) => void
  disabled: boolean
}

const presets: { id: Platform; name: string; ratio: string }[] = [
  { id: "tiktok", name: "TikTok", ratio: "9:16" },
  { id: "reels", name: "Instagram Reels", ratio: "9:16" },
  { id: "youtube", name: "YouTube", ratio: "16:9" },
  { id: "shorts", name: "YouTube Shorts", ratio: "9:16" },
  { id: "x", name: "X / Twitter", ratio: "16:9" },
  { id: "facebook", name: "Facebook", ratio: "1:1" },
]

export function PresetSelector({ selectedPlatform, onPlatformSelect, disabled }: PresetSelectorProps) {
  return (
    <div className={disabled ? "opacity-50 pointer-events-none" : ""}>
      <label className="block font-mono text-sm text-muted-foreground mb-2">02 — Select Platform</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {presets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onPlatformSelect(preset.id)}
            className={`p-4 border text-left transition-colors ${
              selectedPlatform === preset.id
                ? "border-primary bg-primary/10"
                : "border-border hover:border-muted-foreground"
            }`}
          >
            <span className="block font-medium text-sm">{preset.name}</span>
            <span className="block font-mono text-xs text-muted-foreground mt-1">{preset.ratio}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
