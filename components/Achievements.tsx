import styles from './Achievements.module.css'

const achievements = [
  {
    badge: 'Starknet Winter',
    title: 'feeOnTransfer Router',
    description: 'Router enabling swaps with fee on transfer and rebase tokens. Winner of the Starknet Winter Hackathon.'
  },
  {
    badge: 'Uniswap Hook Incubator',
    title: 'flaunch-lazy-lp',
    description: 'Takes creator rewards and generates yield by adding them as liquidity to a Uniswap pool. Uniswap Hook Incubator winner.'
  },
  {
    badge: 'Starknet re{solve}',
    title: 'midatopay',
    description: 'Crypto payment system via QR focused on commerce. Fast, secure and accessible payments. Winner of the Starknet re{solve} Hackathon.'
  },
  {
    badge: 'Zypherpunk Hackathon',
    title: 'treazury',
    description: 'Custody wallet with encrypted fund transfers. Privacy and security in every transaction. Zypherpunk Hackathon winner.'
  }
]

export default function Achievements() {
  return (
    <section className={styles.section} id="achievements">
      <h2 className="section-title">Our achievements</h2>

      <div className={styles.grid}>
        {achievements.map((achievement, index) => (
          <div key={index} className={styles.card}>
            <span className={styles.badge}>{achievement.badge}</span>
            <h3>{achievement.title}</h3>
            <p>{achievement.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
