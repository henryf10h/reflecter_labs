import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>Creative web3 lab</h1>
        <p>
          Passionate about decentralization, open source and serving with products that bring value.
        </p>
      </div>
    </section>
  )
}
