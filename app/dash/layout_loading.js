"use client"
import styles from './layout.module.scss'
import {MotionLink} from "@/data/components/MotionLink/MotionLink";
import {panel_info} from "@/data/functions/config/config";

export default function DashLayoutLoading() {
    return (
        <div className={`${styles.Navbar}`}>
            <div className={styles.left}>
                <MotionLink
                    animate={{
                        backgroundPosition: ["0", "-400%", "0"]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 30,
                        times: [0, 0.5, 1],
                        ease: "linear",
                    }}
                    className={styles.TopTitle}
                    href={'/'}
                >
                    {panel_info.name}
                </MotionLink>
            </div>
        </div>
    )
}
