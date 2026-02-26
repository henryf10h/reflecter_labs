'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './Header.module.css'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Add background when scrolled
      setIsScrolled(currentScrollY > 50)
      
      // Hide/show on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header 
        className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${isVisible ? styles.visible : styles.hidden}`}
      >
        <div className={styles.container}>
          <a href="/" className={styles.logo}>
            <Image
              src="/logoreflecter.png"
              alt="Reflecter Labs"
              width={150}
              height={40}
              style={{ width: '150px', height: 'auto' }}
            />
          </a>
          
          <nav className={styles.nav}>
            <a href="#what-we-do" className={styles.navLink} onClick={(e) => scrollToSection(e, 'what-we-do')}>
              <span className={styles.navLinkText}>What We Do</span>
              <span className={styles.navLinkUnderline} />
            </a>
            <a href="#values" className={styles.navLink} onClick={(e) => scrollToSection(e, 'values')}>
              <span className={styles.navLinkText}>Values</span>
              <span className={styles.navLinkUnderline} />
            </a>
            <a href="#achievements" className={styles.navLink} onClick={(e) => scrollToSection(e, 'achievements')}>
              <span className={styles.navLinkText}>Achievements</span>
              <span className={styles.navLinkUnderline} />
            </a>
            <a href="#roadmap" className={styles.navLink} onClick={(e) => scrollToSection(e, 'roadmap')}>
              <span className={styles.navLinkText}>Our Journey</span>
              <span className={styles.navLinkUnderline} />
            </a>
            <a href="/start-project" className={styles.navLink}>
              <span className={styles.navLinkText}>Start Project</span>
              <span className={styles.navLinkUnderline} />
            </a>
          </nav>

          <div className={styles.ctaWrapper}>
            <a href="#contact" className={styles.ctaButton} onClick={(e) => scrollToSection(e, 'contact')}>
              <span>Contact</span>
              <svg className={styles.ctaIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`${styles.mobileMenuBtn} ${isMobileMenuOpen ? styles.active : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
        <nav className={styles.mobileNav}>
          <a href="#what-we-do" className={styles.mobileNavLink} onClick={(e) => scrollToSection(e, 'what-we-do')}>
            What We Do
          </a>
          <a href="#values" className={styles.mobileNavLink} onClick={(e) => scrollToSection(e, 'values')}>
            Values
          </a>
          <a href="#achievements" className={styles.mobileNavLink} onClick={(e) => scrollToSection(e, 'achievements')}>
            Achievements
          </a>
          <a href="#roadmap" className={styles.mobileNavLink} onClick={(e) => scrollToSection(e, 'roadmap')}>
            Our Journey
          </a>
          <a href="/start-project" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
            Start Project
          </a>
          <a href="#contact" className={styles.mobileCta} onClick={(e) => scrollToSection(e, 'contact')}>
            Contact Us
          </a>
        </nav>
      </div>
    </>
  )
}
