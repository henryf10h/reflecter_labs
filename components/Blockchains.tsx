'use client'

import Image from 'next/image'
import { useInView } from '@/lib/animations'
import styles from './Blockchains.module.css'

const mainBlockchains = [
  { name: 'Ethereum', logo: '/images/networking/ethereum.png', available: true },
  { name: 'Starknet', logo: '/images/networking/starknet.png', available: true }
]


export default function Blockchains() {
  const { ref: headerRef, isInView: headerInView } = useInView()
  const { ref: mainRef, isInView: mainInView } = useInView()

  return (
    <section className={styles.section}>
      {/* Background effects */}
      <div className={styles.bgGradient} />
      <div className={styles.gridPattern} />
      
      <div className={styles.container}>
        <div 
          className={styles.header}
          ref={headerRef}
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          <span className={styles.label}>Ecosystem</span>
          <h2 className={styles.title}>Multi-chain Web3 development</h2>
          <p className={styles.description}>
            We build on the blockchains driving innovation.
            Specialized in Starknet and EVM-compatible ecosystems.
          </p>
        </div>

        {/* Active Networks */}
        <div 
          className={styles.mainSection}
          ref={mainRef}
        >
          <h3 
            className={styles.sectionLabel}
            style={{
              opacity: mainInView ? 1 : 0,
              transform: mainInView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease 0.1s'
            }}
          >
            <span className={styles.activeIndicator} />
            Active Networks
          </h3>
          
          <div className={styles.mainGrid}>
            {mainBlockchains.map((blockchain, index) => {
              const urls: Record<string, string> = {
                'Ethereum': 'https://ethereum.org',
                'Starknet': 'https://www.starknet.io'
              }
              const url = urls[blockchain.name]
              
              return (
              <button
                key={index} 
                className={styles.logoCard}
                onClick={() => window.open(url, '_blank')}
                style={{
                  opacity: mainInView ? 1 : 0,
                  transform: mainInView ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
                  transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${200 + index * 150}ms`
                }}
              >
                <div className={styles.cardGlow} />
                <div className={styles.logoWrapper}>
                  <Image
                    src={blockchain.logo}
                    alt={`${blockchain.name} logo`}
                    width={200}
                    height={200}
                    className={styles.mainLogo}
                  />
                </div>
                <div className={styles.blockchainInfo}>
                  <h4>{blockchain.name}</h4>
                  <span className={styles.statusBadge}>Live</span>
                </div>
                <div className={styles.hoverEffect}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            )})
            }
          </div>
        </div>

      </div>
    </section>
  )
}
