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
          <button className={styles.ctaButton}>Contact</button>
        </nav>
      </div>
    </header>
  )
}
