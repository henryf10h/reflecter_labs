import styles from './Achievements.module.css'

const achievements = [
  {
    badge: 'Starknet Winter',
    title: 'feeOnTransfer Router',
    description: 'Advanced router implementation with fee-on-transfer token support for Starknet ecosystem.',
    grant: '$6,500'
  },
  {
    badge: 'Uniswap Hook Incubator',
    title: 'flaunch-lazy-lp',
    description: 'Takes creator rewards and generates yield by adding them as liquidity to a Uniswap pool. Uniswap Hook Incubator winner.',
    grant: '$5,000'
  },
  {
    badge: 'Starknet re{solve}',
    title: 'midatopay',
    description: 'Crypto payment system via QR focused on commerce. Fast, secure and accessible payments. Winner of the Starknet re{solve} Hackathon.',
    grant: '$28,000'
  },
  {
    badge: 'Zypherpunk Hackathon',
    title: 'treazury',
    description: 'Custody wallet with encrypted fund transfers. Privacy and security in every transaction. Zypherpunk Hackathon winner.',
    grant: '$1,000'
  }
]

// Calculate total grants
const totalGrants = achievements.reduce((sum, achievement) => {
  const amount = parseInt(achievement.grant.replace(/[$,]/g, ''))
  return sum + amount
}, 0)

export default function Achievements() {
  return (
    <section className={styles.section} id="achievements">
      <div className={styles.totalBanner}>
        <div className={styles.totalContent}>
          <span className={styles.totalLabel}>Total Grants Won</span>
          <span className={styles.totalAmount}>${totalGrants.toLocaleString()} USD</span>
          <span className={styles.totalSubtext}>4 Winning Projects • Proven Track Record</span>
        </div>
      </div>

      <h2 className="section-title">Our Achievements</h2>
      <p className={styles.subtitle}>
        Award-winning projects that showcase our expertise in Web3 development and innovation.
      </p>

      <div className={styles.grid}>
        {achievements.map((achievement, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.badge}>{achievement.badge}</div>
            <h3 className={styles.cardTitle}>{achievement.title}</h3>
            <p className={styles.description}>{achievement.description}</p>
            <div className={styles.grantAmount}>
              <span className={styles.grantLabel}>Grant:</span>
              <span className={styles.grantValue}>{achievement.grant} USD</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
