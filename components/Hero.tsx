import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.badge}>🚀 Building the Decentralized Future</div>
        <h1>CREATIVE WEB3 LAB</h1>
        <p className={styles.subtitle}>
          Passionate about decentralization, open source and serving with products that bring value.
        </p>
        <p className={styles.description}>
          We build audited smart contracts, innovative dApps, and cutting-edge blockchain solutions that push the boundaries of what's possible in Web3.
        </p>
        <div className={styles.ctas}>
          <a href="/start-project" className={styles.primaryCta}>Start Projects & Collabs</a>
          <a href="#achievements" className={styles.secondaryCta}>View Our Work</a>
        </div>
      </div>
      <div className={styles.gradient}></div>
    </section>
  )
}
