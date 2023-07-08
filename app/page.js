"use client"
import Image from 'next/image'
import styles from './page.module.scss'
import {motion} from "framer-motion";

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
                    Asteroid Host
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
                    <a href={'https://panel.asteroid.tw'} className={'button'}>控制面板</a>
                    <a href={'https://discord.gg/hRueescnnN'} className={'button'}>Discord</a>
                </motion.div>
            </div>
        </main>
    )
}
