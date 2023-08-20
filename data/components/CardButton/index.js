"use client"
import styles from "./style.module.scss"
import {useRouter} from "next/navigation";
import {useRef} from "react";
import Link from "next/link";

export default function CardButton({name, url, buttons, desc}) {
    const router = useRouter()
    const parentRef = useRef(null)

    function handleClick(e) {
        if (e.target === parentRef.current) {
            router.push(url)
        }
    }

    return (
        <div
            ref={parentRef}
            onClick={handleClick}
            className={`${styles.ServerLink}`}>
            <div className={styles.Title}>
                <div className={styles.Name}>{name}</div>
                <div className={styles.Desc}>{desc}</div>
            </div>
            <div className={styles.Buttons}>
                {buttons && buttons.map((e, i) => {
                    return <Link key={i} className={styles.Button} href={e.href}>{e.name}</Link>
                })}
            </div>
            <span className={`material-icon ${styles.Arrow}`}> arrow_forward_ios</span>
        </div>
    )
}

export function LoadingCardButton() {
    return (
        <div
            className={`${styles.ServerLink}`}>
            <div className={styles.Title}>
                <div style={{width: "5rem", height: "1.4rem"}} className={`${styles.Name} loading`}></div>
                <div style={{width: "15rem", height: ".7rem"}} className={`${styles.Desc} loading`}></div>
            </div>
            <div className={styles.Buttons}>
                <div style={{width: "5rem", height: "2rem"}} className={`${styles.Button} loading`}></div>
            </div>
            <span className={`material-icon ${styles.Arrow}`}> arrow_forward_ios</span>
        </div>
    )
}