"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/lab68dev-logo.png"
              alt="Lab68dev Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#resizer"
              className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Upload
            </Link>
            <Link
              href="#presets"
              className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Presets
            </Link>
            <Link
              href="#how-it-works"
              className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
          </nav>

          <button className="md:hidden p-2 border border-border" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-border flex flex-col gap-4">
            <Link href="#resizer" className="font-mono text-sm text-muted-foreground hover:text-foreground">
              Upload
            </Link>
            <Link href="#presets" className="font-mono text-sm text-muted-foreground hover:text-foreground">
              Presets
            </Link>
            <Link href="#how-it-works" className="font-mono text-sm text-muted-foreground hover:text-foreground">
              About
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
