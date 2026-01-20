import styles from './KanizsaTriangle.module.css'

export default function KanizsaTriangle() {
    return (
        <div className={styles.kanizsa}>
            <div className={styles.top}></div>
            <div className={styles.left}></div>
            <div className={styles.right}></div>
            <div className={styles.rightcircle}></div>
            <div className={styles.leftcircle}></div>
            <div className={styles.bottomcircle}></div>
        </div>
    )
}
