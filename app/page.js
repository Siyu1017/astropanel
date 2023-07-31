"use client"
import styles from './page.module.scss'
import {motion} from "framer-motion";
import {panel_info, pterodactyl} from "@/data/functions/config/config";

export default function Home() {

    return (
        <main className={styles.main}>
            <div className={styles.Hero}>
                <motion.div
                    animate={{
                        backgroundPosition: ["0", "-400%", "0"]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 30,
                        times: [0,0.5,1],
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
                    歡迎
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
                    <a href={'/login'} className={'button'}>登入</a>
                    <a href={pterodactyl.url} className={'button'}>控制面板</a>
                    <a href={panel_info.discord} className={'button'}>Discord</a>
                </motion.div>
            </div>
        </main>
    )
}
