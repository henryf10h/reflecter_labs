import styles from './Values.module.css'

const values = [
  {
    number: '01',
    title: 'Code is Law',
    description: 'Code is absolute truth. No excuses, no middle ground. Logic and execution are what matter.'
  },
  {
    number: '02',
    title: 'Open Source',
    description: 'We contribute to the ecosystem. Shared knowledge generates progress. We believe in radical transparency.'
  },
  {
    number: '03',
    title: 'No Status Quo',
    description: "We don't accept things as they are just because that's how they've always been. We question everything and seek better ways."
  },
  {
    number: '04',
    title: 'Capitalism',
    description: 'We believe in incentives, open markets and genuinely generated value. Meritocracy works when the rules are clear.'
  }
]

export default function Values() {
  return (
    <section className={styles.section} id="values">
      <h2 className="section-title">Our core values</h2>

      <div className={styles.grid}>
        {values.map((value, index) => (
          <div key={index} className={styles.card}>
            <h3>
              <span className={styles.number}>{value.number}.</span> {value.title}
            </h3>
            <p>{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
