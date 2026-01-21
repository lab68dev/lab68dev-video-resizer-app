import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/images/lab68dev_logo.png"
              alt="Lab68dev Logo"
              width={80}
              height={30}
              className="h-8 w-auto opacity-60"
            />
          </div>
          <p className="font-mono text-sm text-muted-foreground">© 2026 Lab68dev — Tools for Creators.</p>
        </div>
      </div>
    </footer>
  )
}
