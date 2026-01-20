import styles from './Header.module.css'
import Image from 'next/image'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image
            src="/logoreflecter.png"
            alt="Reflecter Labs"
            width={150}
            height={40}
            style={{ width: '150px', height: 'auto' }}
          />
        </div>
        <nav className={styles.nav}>
          <a href="#what-we-do" className={styles.navLink}>What We Do</a>
          <a href="#values" className={styles.navLink}>Values</a>
          <a href="#achievements" className={styles.navLink}>Achievements</a>
          <a href="#roadmap" className={styles.navLink}>Our Journey</a>
        </nav>
        <div className={styles.ctaWrapper}>
          <a href="#contact" className={styles.ctaButton}>Contact</a>
        </div>
      </div>
    </header>
  )
}
