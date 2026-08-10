import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-24 border-t">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-12 grid gap-8 md:grid-cols-4 text-sm">
        <div className="md:col-span-2">
          <div className="font-display text-lg">Narrative Theory</div>
          <p className="mt-2 text-muted-foreground max-w-sm">
            A map of how mind becomes world. Theory, mode library, and a practical learning library
            for everyday life.
          </p>
        </div>
        <div className="space-y-2">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Read</div>
          <Link href="/program" className="block hover:underline">The Program</Link>
          <Link href="/theory" className="block hover:underline">Narrative Theory</Link>
          <Link href="/modes" className="block hover:underline">Mode Library</Link>
          <Link href="/life" className="block hover:underline">Life Instruction™</Link>
        </div>
        <div className="space-y-2">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Utilities</div>
          <Link href="/situation" className="block hover:underline">Bring a Situation</Link>
          <Link href="/studio" className="block hover:underline">Studio</Link>
          <Link href="/about" className="block hover:underline">About</Link>
        </div>
      </div>
      <div className="border-t">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-5 flex flex-col md:flex-row gap-2 justify-between text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Narrative Theory. Not therapy, diagnosis, or crisis support.</div>
          <div>Life Instruction™</div>
        </div>
      </div>
    </footer>
  )
}
