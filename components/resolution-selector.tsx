"use client"

import type { Resolution } from "./video-resizer"

interface ResolutionSelectorProps {
  selectedResolution: Resolution | null
  onResolutionSelect: (resolution: Resolution) => void
  disabled: boolean
}

const resolutions: { id: Resolution; label: string }[] = [
  { id: "1080x1920", label: "1080 × 1920" },
  { id: "720x1280", label: "720 × 1280" },
  { id: "1920x1080", label: "1920 × 1080" },
  { id: "1280x720", label: "1280 × 720" },
  { id: "1080x1080", label: "1080 × 1080" },
]

export function ResolutionSelector({ selectedResolution, onResolutionSelect, disabled }: ResolutionSelectorProps) {
  return (
    <div className={disabled ? "opacity-50 pointer-events-none" : ""}>
      <label className="block font-mono text-sm text-muted-foreground mb-2">03 — Choose Resolution</label>
      <div className="flex flex-wrap gap-2">
        {resolutions.map((res) => (
          <button
            key={res.id}
            onClick={() => onResolutionSelect(res.id)}
            className={`px-4 py-2 border font-mono text-sm transition-colors ${
              selectedResolution === res.id
                ? "border-primary bg-primary/10 text-primary"
                : "border-border hover:border-muted-foreground"
            }`}
          >
            {res.label}
          </button>
        ))}
      </div>
    </div>
  )
}
