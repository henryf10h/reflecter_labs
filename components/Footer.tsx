'use client'
import styles from './Footer.module.css'
import Image from 'next/image'
import { useState } from 'react'

export default function Footer() {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)

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

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <div className={styles.logo}>
              <Image
                src="/reflecterlogo.png"
                alt="Reflecter Labs"
                width={150}
                height={40}
                style={{ width: '150px', height: 'auto' }}
              />
            </div>
            <p>Building the decentralized future with creativity and rigor.</p>
          </div>

          <div className={styles.section}>
            <h4>Contact</h4>
            <p>
              <strong>Email:</strong><br />
              <a href="mailto:contact@reflecterlabs.xyz" className={styles.contactLink}>
                contact@reflecterlabs.xyz
              </a>
            </p>
            <p>
              <strong>WhatsApp:</strong><br />
              <a
                href="https://wa.me/5491173661972"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                +549 11 7366 1972
              </a>
            </p>
            <p>
              <strong>Telegram:</strong><br />
              <a
                href="https://t.me/reflecterlabs_bot"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                @reflecterlabs_bot
              </a>
            </p>
          </div>

          <div className={styles.section}>
            <h4>Follow us</h4>
            <div className={styles.socialLinks}>
              <a href="https://x.com/reflecterlabs" target="_blank" rel="noopener noreferrer">
                X
              </a>
              <a href="https://t.me/reflecterlabs" target="_blank" rel="noopener noreferrer">
                Telegram
              </a>
              <a href="https://www.tiktok.com/@reflecterlabs" target="_blank" rel="noopener noreferrer">
                Tiktok
              </a>
              <a href="https://linkedin.com/company/reflecterlabslat" target="_blank" rel="noopener noreferrer">
                Linkedin
              </a>
              <a href="https://www.instagram.com/reflectlabs.lat/" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </div>
          </div>

          <div className={styles.section}>
            <h4>Support Our Work</h4>
            <p className={styles.donationText}>
              Help us continue building open-source tools and innovative Web3 solutions.
            </p>

            <div className={styles.addressContainer}>
              <div className={styles.addressItem}>
                <span className={styles.addressLabel}>Address Starknet:</span>
                <div className={styles.addressBox}>
                  <span className={styles.addressShort}>{shortenAddress(starknetAddress)}</span>
                  <button
                    onClick={() => copyToClipboard(starknetAddress, 'starknet')}
                    className={styles.copyButton}
                    title="Copy Starknet address"
                  >
                    {copiedAddress === 'starknet' ? '✓' : '📋'}
                  </button>
                </div>
              </div>

              <div className={styles.addressItem}>
                <span className={styles.addressLabel}>Address Ethereum:</span>
                <div className={styles.addressBox}>
                  <span className={styles.addressShort}>{shortenAddress(ethereumAddress)}</span>
                  <button
                    onClick={() => copyToClipboard(ethereumAddress, 'ethereum')}
                    className={styles.copyButton}
                    title="Copy Ethereum address"
                  >
                    {copiedAddress === 'ethereum' ? '✓' : '📋'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          © {new Date().getFullYear()} Reflecter Labs. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
