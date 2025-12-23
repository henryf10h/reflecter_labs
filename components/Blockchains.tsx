import styles from './Blockchains.module.css'

const blockchains = [
  { logo: '⚙️', name: 'Starknet' },
  { logo: '◆', name: 'Ethereum' },
  { logo: '△', name: 'Polygon' },
  { logo: '◇', name: 'Arbitrum' },
  { logo: '◈', name: 'Optimism' },
  { logo: '☆', name: 'Base' }
]

export default function Blockchains() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Multi-chain Web3 development</h2>
      <p className={styles.description}>
        We build on the blockchains driving innovation. 
        Specialized in Starknet and EVM-compatible ecosystems.
      </p>

      <div className={styles.grid}>
        {blockchains.map((blockchain, index) => (
          <div key={index} className={styles.item}>
            <div className={styles.logo}>{blockchain.logo}</div>
            <div className={styles.name}>{blockchain.name}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
