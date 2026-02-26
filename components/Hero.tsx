'use client'

import { useEffect, useState } from 'react'
import styles from './Hero.module.css'
import KanizsaTriangle from './KanizsaTriangle'
import { AnimatedWords } from './AnimatedText'
import { useMouseParallax } from '@/lib/animations'

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const mousePosition = useMouseParallax(15)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className={styles.hero}>
      {/* Animated background gradient orbs */}
      <div className={styles.orbContainer}>
        <div 
          className={styles.orb1}
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
          }}
        />
        <div 
          className={styles.orb2}
          style={{
            transform: `translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px)`
          }}
        />
        <div 
          className={styles.orb3}
          style={{
            transform: `translate(${mousePosition.x * 0.2}px, ${-mousePosition.y * 0.2}px)`
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className={styles.gridPattern} />

      <div className={styles.container}>
        <div className={styles.contentLeft}>
          <div 
            className={styles.badge}
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s'
            }}
          >
            <span className={styles.badgeIcon}>🚀</span>
            <span>Building the Decentralized Future</span>
          </div>
          
          <h1 
            className={styles.title}
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s'
            }}
          >
            <AnimatedWords 
              text="WEB3 LAB" 
              wordClassName={styles.gradientWord}
              staggerDelay={150}
              delay={600}
            />
          </h1>
          
          <p 
            className={styles.description}
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s ease-out 0.8s'
            }}
          >
            We build audited smart contracts, innovative dApps, and cutting-edge blockchain solutions that push the boundaries of what&apos;s possible in Web3.
          </p>
          
          <div 
            className={styles.ctas}
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s ease-out 1s'
            }}
          >
            <a href="/start-project" className={styles.primaryCta}>
              <span>Start Projects & Collabs</span>
              <svg className={styles.ctaArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#achievements" className={styles.secondaryCta}>
              <span>View Our Work</span>
            </a>
          </div>

          {/* Stats row */}
          <div 
            className={styles.stats}
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s ease-out 1.2s'
            }}
          >
            <div className={styles.statItem}>
              <span className={styles.statNumber}>$40K+</span>
              <span className={styles.statLabel}>Grants Won</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statNumber}>4+</span>
              <span className={styles.statLabel}>Projects Built</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statNumber}>2</span>
              <span className={styles.statLabel}>Blockchains</span>
            </div>
          </div>
        </div>

        <div 
          className={styles.contentRight}
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'scale(1) rotate(0deg)' : 'scale(0.8) rotate(-5deg)',
            transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s'
          }}
        >
          <div 
            className={styles.animationWrapper}
            style={{
              transform: `translate(${mousePosition.x * -0.5}px, ${mousePosition.y * -0.5}px)`
            }}
          >
            <KanizsaTriangle />
          </div>
          
          {/* Floating elements */}
          <div className={styles.floatingElements}>
            <div className={`${styles.floatingBadge} ${styles.floatingBadge1}`}>
              <span>🔐</span>
              <span>Secure</span>
            </div>
            <div className={`${styles.floatingBadge} ${styles.floatingBadge2}`}>
              <span>⚡</span>
              <span>Fast</span>
            </div>
            <div className={`${styles.floatingBadge} ${styles.floatingBadge3}`}>
              <span>🛡️</span>
              <span>Audited</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className={styles.scrollIndicator}
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.8s ease-out 1.5s'
        }}
      >
        <div className={styles.scrollMouse}>
          <div className={styles.scrollWheel} />
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}
