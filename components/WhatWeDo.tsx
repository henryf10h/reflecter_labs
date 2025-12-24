import styles from './WhatWeDo.module.css'

const missions = [
  {
    title: 'Smart Contracts & Project Development',
    description: 'We build audited smart contracts and web applications that work under pressure. Our code is production-ready, secure and scalable.'
  },
  {
    title: 'Research & Innovation',
    description: "We explore the boundaries of what's possible in Web3, cryptography and decentralized systems. We innovate where others see barriers."
  }
]

const focusAreas = [
  { title: 'Blockchain L1/L2', description: 'Optimized protocols and scalability layers' },
  { title: 'Smart Contracts', description: 'Secure development and innovative patterns' },
  { title: 'Privacy & Anonymity', description: 'Privacy solutions and anonymous systems' },
  { title: 'Consulting & Auditing', description: 'Technical auditing and Web3 advisory' }
]

export default function WhatWeDo() {
  return (
    <section className={styles.section} id="what-we-do">
      <h2 className="section-title">What we do and how we do it</h2>

      <div className={styles.missionGrid}>
        {missions.map((mission, index) => (
          <div key={index} className={styles.missionCard}>
            <h3>{mission.title}</h3>
            <p>{mission.description}</p>
          </div>
        ))}
      </div>

      <div className={styles.focusAreas}>
        {focusAreas.map((area, index) => (
          <div key={index} className={styles.focusItem}>
            <h4>{area.title}</h4>
            <p>{area.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
