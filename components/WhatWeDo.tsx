'use client'

import { useInView } from '@/lib/animations'
import styles from './WhatWeDo.module.css'

const missions = [
  {
    icon: '🔬',
    title: 'Research & Innovation',
    description: "We explore the boundaries of what's possible in Web3, cryptography and decentralized systems. We innovate where others see barriers."
  },
  {
    icon: '🚀',
    title: 'Project Development & Collaborations',
    description: 'We build audited smart contracts and web applications that work under pressure. Our code is production-ready, secure and scalable.'
  },
]

const focusAreas = [
  { icon: '⛓️', title: 'Blockchain L1/L2', description: 'Optimized protocols and scalability layers' },
  { icon: '📝', title: 'Smart Contracts', description: 'Secure development and innovative patterns' },
  { icon: '🔒', title: 'Privacy & Anonymity', description: 'Privacy solutions and anonymous systems' },
  { icon: '🔍', title: 'Consulting & Auditing', description: 'Technical auditing and Web3 advisory' }
]

export default function WhatWeDo() {
  const { ref: sectionRef, isInView: sectionInView } = useInView()
  const { ref: gridRef, isInView: gridInView } = useInView()
  const { ref: focusRef, isInView: focusInView } = useInView()

  return (
    <section className={styles.section} id="what-we-do" ref={sectionRef}>
      {/* Background decoration */}
      <div className={styles.bgDecoration} />
      
      <div className={styles.container}>
        <div 
          className={styles.header}
          style={{
            opacity: sectionInView ? 1 : 0,
            transform: sectionInView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          <span className={styles.sectionLabel}>Our Expertise</span>
          <h2 className={styles.title}>What we do and how we do it</h2>
          <p className={styles.subtitle}>
            We combine technical excellence with innovative thinking to deliver 
            cutting-edge blockchain solutions.
          </p>
        </div>

        <div className={styles.missionGrid} ref={gridRef}>
          {missions.map((mission, index) => (
            <div 
              key={index} 
              className={styles.missionCard}
              style={{
                opacity: gridInView ? 1 : 0,
                transform: gridInView ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 150}ms`
              }}
            >
              <div className={styles.cardGlow} />
              <div className={styles.cardContent}>
                <div className={styles.iconWrapper}>
                  <span className={styles.icon}>{mission.icon}</span>
                </div>
                <h3>{mission.title}</h3>
                <p>{mission.description}</p>
                <div className={styles.cardArrow}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div 
          className={styles.focusAreas}
          ref={focusRef}
          style={{
            opacity: focusInView ? 1 : 0,
            transform: focusInView ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s'
          }}
        >
          <div className={styles.focusHeader}>
            <span className={styles.focusLabel}>Core Capabilities</span>
            <h3>Technologies We Master</h3>
          </div>
          
          <div className={styles.focusGrid}>
            {focusAreas.map((area, index) => (
              <div 
                key={index} 
                className={styles.focusItem}
                style={{
                  opacity: focusInView ? 1 : 0,
                  transform: focusInView ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${300 + index * 100}ms`
                }}
              >
                <div className={styles.focusIcon}>{area.icon}</div>
                <h4>{area.title}</h4>
                <p>{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
