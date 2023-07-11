import styles from "./style.module.scss"

export default function StatsCard({name, used, max, unit, children}) {
    return (
        <div className={styles.StatusCard}>
            <div className={styles.stats}>
                <div className={styles.Name}>{name}</div>
                <div className={styles.Used}>{used}/{max} {unit}</div>
            </div>
            <div className={styles.Icon}>
                {children}
            </div>
        </div>
    )
}