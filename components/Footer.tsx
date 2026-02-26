'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useInView } from '@/lib/animations'
import styles from './Footer.module.css'

export default function Footer() {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)
  const { ref, isInView } = useInView()

  const starknetAddress = '0x040033d6A1F5E78a127898fB39F9B583a2D904B7275D4be21663Eca8Fa915951'
  const ethereumAddress = '0xc4eAb635B40bF49907375c3C7bd2495e3fDe79df'

  const copyToClipboard = (address: string, type: string) => {
    navigator.clipboard.writeText(address)
    setCopiedAddress(type)
    setTimeout(() => setCopiedAddress(null), 2000)
  }

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const socialLinks = [
    { name: 'X', url: 'https://x.com/reflecterlabs', icon: '𝕏' },
    { name: 'Telegram', url: 'https://t.me/reflecterlabs', icon: '✈️' },
    { name: 'Tiktok', url: 'https://www.tiktok.com/@reflecterlabs', icon: '🎵' },
    { name: 'Linkedin', url: 'https://linkedin.com/company/reflecterlabslat', icon: '💼' },
    { name: 'Instagram', url: 'https://www.instagram.com/reflectlabs.lat/', icon: '📷' },
  ]

  return (
    <footer className={styles.footer} ref={ref}>
      <div className={styles.bgDecoration} />
      
      <div className={styles.container}>
        <div 
          className={styles.content}
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          {/* Brand Section */}
          <div className={styles.section}>
            <div className={styles.logo}>
              <Image
                src="/logoreflecter.png"
                alt="Reflecter Labs"
                width={150}
                height={40}
                style={{ width: '150px', height: 'auto' }}
              />
            </div>
            <p className={styles.tagline}>
              Building the decentralized future with creativity and rigor.
            </p>
            <div className={styles.location}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Latin America</span>
            </div>
          </div>

          {/* Contact Section */}
          <div className={styles.section}>
            <h4>Contact</h4>
            <ul className={styles.contactList}>
              <li>
                <a href="mailto:hello@reflecterlabs.xyz" className={styles.contactLink}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  hello@reflecterlabs.xyz
                </a>
              </li>
              <li>
                <a href="https://wa.me/5491173661972" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="https://t.me/reflecterlabs_bot" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  Telegram Bot
                </a>
              </li>
            </ul>
          </div>

          {/* Social Section */}
          <div className={styles.section}>
            <h4>Follow Us</h4>
            <div className={styles.socialGrid}>
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  title={link.name}
                >
                  <span className={styles.socialIcon}>{link.icon}</span>
                  <span className={styles.socialName}>{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Support Section */}
          <div className={styles.section}>
            <h4>Support Our Work</h4>
            <p className={styles.donationText}>
              Help us continue building open-source tools and innovative Web3 solutions.
            </p>

            <div className={styles.addressContainer}>
              <div className={styles.addressItem}>
                <span className={styles.addressLabel}>Starknet</span>
                <div className={styles.addressBox}>
                  <span className={styles.addressShort}>{shortenAddress(starknetAddress)}</span>
                  <button
                    onClick={() => copyToClipboard(starknetAddress, 'starknet')}
                    className={`${styles.copyButton} ${copiedAddress === 'starknet' ? styles.copied : ''}`}
                    title="Copy Starknet address"
                  >
                    {copiedAddress === 'starknet' ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className={styles.addressItem}>
                <span className={styles.addressLabel}>Ethereum</span>
                <div className={styles.addressBox}>
                  <span className={styles.addressShort}>{shortenAddress(ethereumAddress)}</span>
                  <button
                    onClick={() => copyToClipboard(ethereumAddress, 'ethereum')}
                    className={`${styles.copyButton} ${copiedAddress === 'ethereum' ? styles.copied : ''}`}
                    title="Copy Ethereum address"
                  >
                    {copiedAddress === 'ethereum' ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className={styles.bottom}
          style={{
            opacity: isInView ? 1 : 0,
            transition: 'opacity 0.8s ease 0.3s'
          }}
        >
          <div className={styles.bottomContent}>
            <p>© {new Date().getFullYear()} Reflecter Labs. All rights reserved.</p>
            <div className={styles.bottomLinks}>
              <a href="/start-project">Start a Project</a>
              <span className={styles.divider} />
              <a href="#contact">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
