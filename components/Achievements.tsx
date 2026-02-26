'use client'

import { useInView, useCountUp } from '@/lib/animations'
import styles from './Achievements.module.css'

const achievements = [
  {
    badge: 'Starknet Winter',
    title: 'feeOnTransfer Router',
    description: 'Advanced router implementation with fee-on-transfer token support for Starknet ecosystem.',
    grant: '$6,500',
    icon: '🏆'
  },
  {
    badge: 'Uniswap Hook Incubator',
    title: 'flaunch-lazy-lp',
    description: 'Takes creator rewards and generates yield by adding them as liquidity to a Uniswap pool. Uniswap Hook Incubator winner.',
    grant: '$5,000',
    icon: '🏆'
  },
  {
    badge: 'Starknet re{solve}',
    title: 'midatopay',
    description: 'Crypto payment system via QR focused on commerce. Fast, secure and accessible payments. Winner of the Starknet re{solve} Hackathon.',
    grant: '$28,000',
    icon: '🏆'
  },
  {
    badge: 'Zypherpunk Hackathon',
    title: 'treazury',
    description: 'Custody wallet with encrypted fund transfers. Privacy and security in every transaction. Zypherpunk Hackathon winner.',
    grant: '$1,000',
    icon: '🏆'
  }
]

// Calculate total grants
const totalGrants = achievements.reduce((sum, achievement) => {
  const amount = parseInt(achievement.grant.replace(/[$,]/g, ''))
  return sum + amount
}, 0)

function AnimatedCounter({ value }: { value: number }) {
  const { count, ref } = useCountUp(value, 2000)
  return <span ref={ref}>{count.toLocaleString()}</span>
}

export default function Achievements() {
  const { ref: headerRef, isInView: headerInView } = useInView()
  const { ref: bannerRef, isInView: bannerInView } = useInView()
  const { ref: gridRef, isInView: gridInView } = useInView()

  return (
    <section className={styles.section} id="achievements">
      {/* Background decorations */}
      <div className={styles.bgPattern} />
      <div className={styles.glow1} />
      <div className={styles.glow2} />
      
      <div className={styles.container}>
        {/* Total Banner */}
        <div 
          className={styles.totalBanner}
          ref={bannerRef}
          style={{
            opacity: bannerInView ? 1 : 0,
            transform: bannerInView ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          <div className={styles.bannerGlow} />
          <div className={styles.totalContent}>
            <span className={styles.totalLabel}>Total Grants Won</span>
            <span className={styles.totalAmount}>
              $<AnimatedCounter value={totalGrants} /> USD
            </span>
            <div className={styles.totalStats}>
              <span className={styles.stat}>
                <strong>{achievements.length}</strong> Winning Projects
              </span>
              <span className={styles.dot} />
              <span className={styles.stat}>
                <strong>Proven</strong> Track Record
              </span>
            </div>
          </div>
          <div className={styles.bannerDecoration}>
            <div className={styles.floatingIcon}>🏆</div>
          </div>
        </div>

        {/* Header */}
        <div 
          className={styles.header}
          ref={headerRef}
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s'
          }}
        >
          <span className={styles.label}>Recognition</span>
          <h2 className={styles.title}>Our Achievements</h2>
          <p className={styles.subtitle}>
            Award-winning projects that showcase our expertise in Web3 development and innovation.
          </p>
        </div>

        {/* Cards Grid */}
        <div className={styles.grid} ref={gridRef}>
          {achievements.map((achievement, index) => (
            <div 
              key={index} 
              className={styles.card}
              style={{
                opacity: gridInView ? 1 : 0,
                transform: gridInView ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 100}ms`
              }}
            >
              <div className={styles.cardGlow} />
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <span className={styles.badge}>{achievement.badge}</span>
                  <span className={styles.icon}>{achievement.icon}</span>
                </div>
                <h3 className={styles.cardTitle}>{achievement.title}</h3>
                <p className={styles.description}>{achievement.description}</p>
                <div className={styles.cardFooter}>
                  <div className={styles.grantBadge}>
                    <span className={styles.grantLabel}>Grant Awarded</span>
                    <span className={styles.grantValue}>{achievement.grant}</span>
                  </div>
                </div>
              </div>
              <div className={styles.cardShine} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
