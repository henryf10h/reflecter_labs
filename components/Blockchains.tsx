import styles from './Blockchains.module.css'

const mainBlockchains = [
  { name: 'Starknet', available: true },
  { name: 'Ethereum', available: true }
]

const otherBlockchains = [
  { name: 'Polygon', available: false },
  { name: 'Arbitrum', available: false },
  { name: 'Optimism', available: false },
  { name: 'Base', available: false }
]

export default function Blockchains() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Multi-chain Web3 development</h2>
      <p className={styles.description}>
        We build on the blockchains driving innovation.
        Specialized in Starknet and EVM-compatible ecosystems.
      </p>

      {/* Main Blockchains */}
      <div className={styles.mainGrid}>
        {mainBlockchains.map((blockchain, index) => (
          <div key={index} className={styles.mainItem}>
            <div className={styles.name}>{blockchain.name}</div>
            <div className={styles.activeBadge}>Active</div>
          </div>
        ))}
      </div>

      {/* Other Blockchains */}
      <div className={styles.otherSection}>
        <h3 className={styles.otherTitle}>Coming Soon</h3>
        <div className={styles.otherGrid}>
          {otherBlockchains.map((blockchain, index) => (
            <div key={index} className={styles.otherItem}>
              <div className={styles.nameSmall}>{blockchain.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
