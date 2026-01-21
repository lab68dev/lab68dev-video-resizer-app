# Video Studio

A professional client-side video resizing tool designed for content creators. Resize videos for TikTok, Instagram Reels, YouTube Shorts, and other platforms directly in your browser without uploading files to a server.

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Support-yellow.svg)](https://buymeacoffee.com/lab68dev)

## Overview

Video Studio leverages WebAssembly (WASM) and FFmpeg to process videos locally on the user's device. This ensures maximum privacy and speed, as video files never leave the browser. The application includes a credit-based system for usage management.

## Features

- **Client-Side Processing:** All video resizing happens locally using FFmpeg.wasm.
- **Privacy Focused:** No video files are uploaded to any external server.
- **Multi-Platform Support:** Ready-to-use presets for:
  - Vertical (9:16) - TikTok, Reels, Shorts
  - Square (1:1) - Instagram Posts
  - Landscape (16:9) - YouTube
  - Portrait (4:5) - Instagram/Facebook
- **Smart Background Blur:** Option to fill empty space with a blurred version of the video.
- **Credit System:** Built-in usage tracking with a paywall feature for extended use.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS, Shadcn UI
- **Video Processing:** FFmpeg.wasm
- **Icons:** Lucide React

## Getting Started

1. Clone the repository.
2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Run the development server:

   ```bash
   pnpm dev
   ```

4. Open <http://localhost:3000> in your browser.

## Support

If you find this project useful, you can support its development:

<a href="https://buymeacoffee.com/lab68dev" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>

---
© 2026 Lab68dev
