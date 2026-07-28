import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import './globals.css'

const _plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const _inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Cashora — Satu POS untuk Semua Skala Bisnis',
  description:
    'Platform POS modern dengan mode offline, tanpa biaya per cabang, dan keamanan perbankan. Cocok untuk UMKM, restoran, retail, dan korporasi Indonesia.',
  keywords: ['POS', 'UMKM', 'kasir', 'restoran', 'retail', 'QRIS', 'Indonesia'],
  authors: [{ name: 'Cashora' }],
  openGraph: {
    title: 'Cashora — Satu POS untuk Semua Skala Bisnis',
    description:
      'Platform POS modern dengan mode offline, tanpa biaya per cabang, dan keamanan perbankan.',
    siteName: 'Cashora',
    locale: 'id_ID',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0A2540',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className="bg-background scroll-smooth">
      <body className={`antialiased ${_plusJakartaSans.variable} ${_inter.variable} font-body`}>
        {children}
      </body>
    </html>
  )
}
