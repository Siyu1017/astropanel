import styles from "./style.module.scss"

export default function StatsCard({name, used, max, unit, children}) {
    return (
        <div className={styles.StatusCard}>
            <div className={styles.Info}>
                <div className={styles.Name}>{name}</div>
                <div className={styles.Used}>{used}/{max} {unit}</div>
                <div className={styles.Icon}>
                    {children}
                </div>
            </div>
            <div style={{width:`${parseInt(used)/parseInt(max)*100}%`}} className={styles.Bar}></div>
        </div>
    )
}