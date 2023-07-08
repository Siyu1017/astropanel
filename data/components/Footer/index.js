
import styles from "./style.module.scss"
import Link from "next/link";

export default function Footer() {
    return (
        <div className={styles.Container}>
            <div className={styles.Links}>
                <Link className={styles.link} href={"https://asteroid.tw"}>首頁</Link>
                <Link className={styles.link} href={"https://discord.gg/hRueescnnN"}>Discord</Link>
            </div>
            <div className={styles.About}>
                Asteroid
            </div>
            <a className={styles.Copyright} href={"https://asteroid.tw"}>
                <span className="material-icon">copyright</span>2023 Asteroid
            </a>
        </div>
    )
}