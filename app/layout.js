"use client"
import '@/data/style/globals.scss'
import {Inter} from 'next/font/google'
import {motion} from "framer-motion";
import {panel_info} from "@/data/functions/config/config";
import styles from "./layout.module.scss"

const inter = Inter({subsets: ['latin']})

export default function RootLayout({children}) {
    return (
        <html>
        <head>
            <title>{panel_info.name}</title>
            <link rel="icon" href="/favicon.ico" sizes="any"/>
        </head>
        <motion.body
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
            className={inter.className}>

            {children}

            <motion.iframe
                className={styles.BgVideo}
                initial={{filter: "brightness(0)"}}
                animate={{filter: "brightness(50%)"}}
                transition={{ease: "easeOut", duration: 2, delay: 3}}

                width="560" height="315"
                src="https://www.youtube.com/embed/lRTtMcx6rSM?controls=0&autoplay=1&mute=1&playsinline=1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
            ></motion.iframe>
        </motion.body>
        </html>
    )
}
