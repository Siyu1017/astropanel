"use client"
import '@/data/style/globals.scss'
import {Inter} from 'next/font/google'
import {motion} from "framer-motion";
import {panel_info} from "@/data/functions/config/config";

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
        </motion.body>
        </html>
    )
}
