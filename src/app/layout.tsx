import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'QMG Admin Panel',
  description: 'QuranMentorGlobal Admin Dashboard',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-gray-50 text-ink">{children}</body>
    </html>
  )
}
