import Image from 'next/image'
import styles from './Blockchains.module.css'

const mainBlockchains = [
  { name: 'Ethereum', logo: '/images/networking/ethereum.png', available: true },
  { name: 'Starknet', logo: '/images/networking/starknet.png', available: true }
]

const otherBlockchains = [
  { name: 'Polygon', logo: '/images/networking/polygon.png', available: false },
  { name: 'Arbitrum', logo: '/images/networking/arbitrum.png', available: false },
  { name: 'Optimism', logo: '/images/networking/optimism.png', available: false },
  { name: 'Base', logo: '/images/networking/base.png', available: false },
  { name: 'Stellar', logo: '/images/networking/stellar.png', available: false },
]

export default function Blockchains() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Multi-chain Web3 development</h2>
      <p className={styles.description}>
        We build on the blockchains driving innovation.
        Specialized in Starknet and EVM-compatible ecosystems.
      </p>

      {/* Active Networks Title */}
      <h3 className={styles.activeTitle}>Active Networks</h3>

      {/* Main Blockchains - Just Logos */}
      <div className={styles.mainGrid}>
        {mainBlockchains.map((blockchain, index) => (
          <div key={index} className={styles.logoWrapper}>
            <Image
              src={blockchain.logo}
              alt={`${blockchain.name} logo`}
              width={280}
              height={280}
              className={styles.mainLogo}
            />
          </div>
        ))}
      </div>

      {/* Coming Soon - Infinite Scroll */}
      <div className={styles.otherSection}>
        <h3 className={styles.otherTitle}>Coming Soon</h3>
        <div className={styles.carouselContainer}>
          <div className={styles.carouselTrack}>
            {/* Duplicate items for seamless infinite scroll */}
            {[...otherBlockchains, ...otherBlockchains, ...otherBlockchains].map((blockchain, index) => (
              <div key={index} className={styles.carouselItem}>
                <Image
                  src={blockchain.logo}
                  alt={`${blockchain.name} logo`}
                  width={280}
                  height={280}
                  className={styles.carouselLogo}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
