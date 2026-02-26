'use client'

import { useInView } from '@/lib/animations'
import styles from './Values.module.css'

const values = [
  {
    number: '01',
    title: 'Code is Law',
    description: 'Code is absolute truth. No excuses, no middle ground. Logic and execution are what matter.',
    icon: '⚖️'
  },
  {
    number: '02',
    title: 'Open Source',
    description: 'We contribute to the ecosystem. Shared knowledge generates progress. We believe in radical transparency.',
    icon: '🌐'
  },
  {
    number: '03',
    title: 'No Status Quo',
    description: "We don't accept things as they are just because that's how they've always been. We question everything and seek better ways.",
    icon: '💡'
  },
  {
    number: '04',
    title: 'Capitalism',
    description: 'We believe in incentives, open markets and genuinely generated value. Meritocracy works when the rules are clear.',
    icon: '📈'
  }
]

export default function Values() {
  const { ref: headerRef, isInView: headerInView } = useInView()
  const { ref: gridRef, isInView: gridInView } = useInView()

  return (
    <section className={styles.section} id="values">
      {/* Decorative elements */}
      <div className={styles.decoration1} />
      <div className={styles.decoration2} />
      
      <div className={styles.container}>
        <div 
          className={styles.header}
          ref={headerRef}
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          <span className={styles.label}>Our Philosophy</span>
          <h2 className={styles.title}>Our core values</h2>
          <p className={styles.subtitle}>
            The principles that guide every line of code we write and every decision we make.
          </p>
        </div>

        <div className={styles.grid} ref={gridRef}>
          {values.map((value, index) => (
            <div 
              key={index} 
              className={styles.card}
              style={{
                opacity: gridInView ? 1 : 0,
                transform: gridInView ? 'translateY(0) rotateX(0)' : 'translateY(40px) rotateX(10deg)',
                transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 100}ms`
              }}
            >
              <div className={styles.cardInner}>
                <div className={styles.cardFront}>
                  <div className={styles.numberBadge}>
                    <span className={styles.number}>{value.number}</span>
                    <span className={styles.icon}>{value.icon}</span>
                  </div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                  <div className={styles.hoverHint}>
                    <span>Hover to explore</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </div>
                <div className={styles.cardBack}>
                  <div className={styles.backContent}>
                    <span className={styles.backIcon}>{value.icon}</span>
                    <h4>{value.title}</h4>
                    <div className={styles.backLine} />
                    <p>{value.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
