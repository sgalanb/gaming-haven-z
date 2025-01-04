import { Header } from '@/components/Header'
import { Toaster } from '@/components/ui/Sonner'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Gaming Haven Z - The Letterboxd of Games',
  description:
    'Search through a vast library of games, track your collection, and never lose sight of what you love. Start exploring now!',
  openGraph: {
    title: 'Gaming Haven Z - The Letterboxd of Games',
    description:
      'Search through a vast library of games, track your collection, and never lose sight of what you love. Start exploring now!',
    siteName: 'Gaming Haven Z',
    url: 'https://gaminghaven.com',
  },
  twitter: {
    title: 'Gaming Haven Z - The Letterboxd of Games',
    description:
      'Search through a vast library of games, track your collection, and never lose sight of what you love. Start exploring now!',
    site: '@gaminghavenz',
    creator: '@gaminghavenz',
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.className}`}>
      <body className="bg-white antialiased selection:bg-palette-violet-900 selection:text-white">
        <div className="flex min-h-screen w-full flex-col items-center justify-start">
          <Header />
          {children}
        </div>
        <Toaster position="bottom-center" offset={40} richColors />
      </body>
    </html>
  )
}
