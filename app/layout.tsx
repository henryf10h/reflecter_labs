import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Reflecter Labs - Web3 Development & Blockchain Innovation | Smart Contracts & DeFi',
  description: 'Leading Web3 development lab specializing in smart contracts, blockchain solutions, and decentralized systems. Expert team building on Starknet, Ethereum, and EVM-compatible chains. Open-source contributors and hackathon winners.',
  keywords: [
    'Web3 Development',
    'Blockchain Development',
    'Smart Contracts',
    'Starknet Development',
    'Ethereum Development',
    'DeFi Solutions',
    'Decentralization',
    'Open Source Web3',
    'Crypto Development',
    'Layer 2 Solutions',
    'EVM Development',
    'Cairo Programming',
    'Solidity Development',
    'Web3 Consulting',
    'Blockchain Auditing',
    'dApp Development',
    'NFT Development',
    'Blockchain Security',
    'Web3 Innovation',
    'Cryptocurrency Solutions'
  ],
  authors: [{ name: 'Reflecter Labs', url: 'https://reflecterlabs.com' }],
  creator: 'Reflecter Labs',
  publisher: 'Reflecter Labs',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://reflecterlabs.com',
    title: 'Reflecter Labs - Web3 Development & Blockchain Innovation',
    description: 'Leading Web3 development lab specializing in smart contracts, blockchain solutions, and decentralized systems. Expert team building on Starknet, Ethereum, and EVM-compatible chains.',
    siteName: 'Reflecter Labs',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Reflecter Labs - Web3 Development & Blockchain Innovation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reflecter Labs - Web3 Development & Blockchain Innovation',
    description: 'Leading Web3 development lab building the decentralized future with smart contracts and innovative blockchain solutions.',
    creator: '@reflecterlabs',
    images: ['/og-image.png'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  alternates: {
    canonical: 'https://reflecterlabs.com',
  },
  category: 'Technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Reflecter Labs',
              url: 'https://reflecterlabs.com',
              logo: 'https://reflecterlabs.com/logoreflecter.png',
              description: 'Creative Web3 lab specialized in smart contracts, blockchain development, and decentralized systems.',
              sameAs: [
                'https://twitter.com/reflecterlabs',
                'https://t.me/reflecterlabs',
                'https://linkedin.com/company/reflecterlabslat',
                'https://www.instagram.com/reflectlabs.lat/',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'contact@reflecterlabs.com',
                contactType: 'Customer Service',
              },
              areaServed: 'Worldwide',
              knowsAbout: ['Web3', 'Blockchain', 'Smart Contracts', 'DeFi', 'Starknet', 'Ethereum'],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
