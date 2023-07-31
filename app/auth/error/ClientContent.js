"use client"
import styles from './page.module.scss'
import {motion} from "framer-motion";
import {panel_info} from "@/data/functions/config/config";

export function Error({type, code}) {
    return (
        <>
            <motion.div
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
            >
                {panel_info.name}
            </motion.div>
            <motion.div
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1
                }}
                transition={{
                    duration: 1,
                    ease: "easeOut",
                }}
                className={styles.Title}>
                ❌ {type}
            </motion.div>
            <motion.div
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1
                }}
                transition={{
                    duration: 1,
                    ease: "easeOut",
                }}
                className={styles.Details}>
                📄 {code?code:'no code'}
            </motion.div>
            <motion.div
                // initial={{
                //     height: 0
                // }}
                // animate={{
                //     height: ""
                // }}
                // transition={{
                //     duration: 1,
                //     ease: "easeOut",
                //     delay: 1
                // }}
                className={styles.Buttons}
            >
                <a href={panel_info.discord} className={'button'}>請將這個畫面截圖下來並回報給我們</a>
                <a href={'/'} className={'button'}>或是回到首頁</a>
            </motion.div>
        </>
    )
}

export function Normal() {
    return (
        <>
            <motion.div
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
            >
                {panel_info.name}
            </motion.div>
            <motion.div
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1
                }}
                transition={{
                    duration: 1,
                    ease: "easeOut",
                }}
                className={styles.Title}>
                登入成功
            </motion.div>
            <motion.div
                // initial={{
                //     height: 0
                // }}
                // animate={{
                //     height: ""
                // }}
                // transition={{
                //     duration: 1,
                //     ease: "easeOut",
                //     delay: 1
                // }}
                className={styles.Buttons}
            >
                <a href={'/dash'} className={'button'}>若沒有自動重新導向請按這</a>
            </motion.div>
        </>
    )
}