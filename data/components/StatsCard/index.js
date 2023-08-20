import styles from "./style.module.scss"
import Card from "@/data/components/Card";

export default function StatsCard({name, used, max, unit, loading, children}) {
    return (
        <Card className={styles.StatusCard}>
            <div className={styles.Info}>
                <div className={`${styles.Name} ${loading?"loading":""}`}>{name}</div>
                <div className={`${styles.Used} ${loading?"loading":""}`}>{used}/{max} {unit}</div>
                <div className={`${styles.Icon} ${loading?"loading":""}`}>
                    {children}
                </div>
            </div>
            <div style={{width:`${parseInt(used)/parseInt(max)*100}%`}} className={styles.Bar}></div>
        </Card>
    )
}

export function LoadingStatsCard() {
    return (
        <Card className={styles.StatusCard}>
            <div className={styles.Info}>
                <div className={`${styles.Name} loading`}></div>
                <div className={`${styles.Used} loading`}></div>
                <div className={`${styles.Icon} loading`}></div>
            </div>
            <div style={{width:`100%`, background:'none'}} className={`${styles.Bar} loading`}></div>
        </Card>
    )
}