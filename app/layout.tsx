import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import SiteChrome from '@/components/site-chrome'

export const metadata: Metadata = {
  title: 'Narrative Theory',
  description: 'A framework for seeing how the mind builds self, other, future, and world — and how energy states make those stories feel real.',
  openGraph: {
    title: 'Narrative Theory',
    description: 'How the mind builds self, other, future, and world.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700&family=Inter:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <SiteChrome>
          <Nav />
        </SiteChrome>
        <main className="flex-1">{children}</main>
        <SiteChrome>
          <Footer />
        </SiteChrome>
      </body>
    </html>
  )
}
