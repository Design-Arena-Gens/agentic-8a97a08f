import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pattern Maker Agent',
  description: 'AI-powered precise pattern generator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
