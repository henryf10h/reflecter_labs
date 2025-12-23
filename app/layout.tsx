import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Reflecter Labs - Web3 Development & Innovation',
  description: 'Creative web3 lab passionate about decentralization, open source and serving with products that bring value.',
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
