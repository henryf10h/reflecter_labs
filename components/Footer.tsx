import styles from './Footer.module.css'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <div className={styles.logo}>
              <Image 
                src="/reflecterlogo.png" 
                alt="Reflecter Labs" 
                width={150} 
                height={40}
                style={{ width: '150px', height: 'auto' }}
              />
            </div>
            <p>Building the decentralized future with creativity and rigor.</p>
          </div>
          <div className={styles.section}>
            <h4>Contact</h4>
            <p>
              <strong>Email:</strong><br />
              hello@reflecterlabs.com
            </p>
          </div>
          <div className={styles.section}>
            <h4>Follow us</h4>
            <div className={styles.socialLinks}>
              <a href="https://twitter.com/reflecterlabs" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
              <a href="https://t.me/reflecterlabs" target="_blank" rel="noopener noreferrer">
                Telegram
              </a>
              <a href="https://tiktok.com/reflecterlabs" target="_blank" rel="noopener noreferrer">
                Tiktok
              </a>
              <a href="https://linkedin.com/reflecterlabs" target="_blank" rel="noopener noreferrer">
                Linkedin
              </a>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          © {new Date().getFullYear()} Reflecter Labs. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
