import styles from './Hero.module.css'
import KanizsaTriangle from './KanizsaTriangle'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.contentLeft}>
          <div className={styles.badge}>🚀 Building the Decentralized Future</div>
          <h1>WEB3 LAB</h1>
          <p className={styles.description}>
            We build audited smart contracts, innovative dApps, and cutting-edge blockchain solutions that push the boundaries of what's possible in Web3.
          </p>
          <div className={styles.ctas}>
            <a href="/start-project" className={styles.primaryCta}>Start Projects & Collabs</a>
            <a href="#achievements" className={styles.secondaryCta}>View Our Work</a>
          </div>
        </div>

        <div className={styles.contentRight}>
          <div className={styles.animationWrapper}>
            <KanizsaTriangle />
          </div>
        </div>
      </div>
      <div className={styles.gradient}></div>
    </section>
  )
}
