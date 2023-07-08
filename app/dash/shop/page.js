"use client"
import styles from './page.module.scss'
import {AnimatePresence, motion} from "framer-motion";
import Navbar from "@/data/components/Navbar";
import TextInput from "@/data/components/Input";

export default function Dash() {

    return (
        <div className={styles.Container}>
            <div className={styles.Title}>Coming Soon!</div>
        </div>
    )
}
