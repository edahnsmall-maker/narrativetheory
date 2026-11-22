import type { Metadata } from 'next'
import Link from 'next/link'
import { ContactForm } from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact — Edahn Small',
  description: 'Get in touch with Edahn Small. Free 15-minute phone consultation.',
}

// Copy is from the contact page on Edahn's old site (edahnsmall.com/contact-wells), typos fixed.
export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-14 md:py-20 grid gap-12 md:grid-cols-[1fr_1.3fr]">
      <div>
        <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-3">Contact</div>
        <h1 className="font-display text-5xl md:text-6xl leading-[1] tracking-tight">Say hi.</h1>
        <p className="mt-6 text-lg leading-relaxed text-foreground/85">
          I offer a free 15 minute phone consultation. Please fill out the form to get started. I reply promptly.
        </p>
        <div className="mt-10 space-y-3 text-[15px]">
          <a href="https://askedahn.com" className="block underline underline-offset-4 hover:text-foreground text-muted-foreground">
            Ask Edahn, the column →
          </a>
          <Link href="/about" className="block underline underline-offset-4 hover:text-foreground text-muted-foreground">
            About me →
          </Link>
        </div>
        <p className="mt-10 text-sm text-muted-foreground leading-relaxed max-w-sm">
          This form isn’t for emergencies. If you’re in crisis, call or text 988 (in the US) or your local emergency number.
        </p>
      </div>
      <ContactForm />
    </div>
  )
}
