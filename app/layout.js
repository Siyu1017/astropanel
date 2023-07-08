"use client"
import '@/data/style/globals.scss'
import {Inter} from 'next/font/google'
import {motion} from "framer-motion";
import HoverTips from "@/data/components/HoverTips";

const inter = Inter({subsets: ['latin']})

export default function RootLayout({children}) {
    return (
        <html>
        <head>
            <title>Asteroid Host</title>
            <link rel="icon" href="/favicon.ico" sizes="any"/>
        </head>
        <motion.body
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
            className={inter.className}>

            {children}

            <HoverTips/>
        </motion.body>
        </html>
    )
}
