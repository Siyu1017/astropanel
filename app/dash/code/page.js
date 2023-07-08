"use client"
import styles from './page.module.scss'
import {motion} from "framer-motion";
import Navbar from "@/data/components/Navbar";
import TextInput from "@/data/components/Input";

export default function Dash() {

    return (
        <div className={styles.Container}>
            <div className={styles.Title}>輸入代碼:</div>
            <TextInput></TextInput>
            <div className={`button ${styles.Button}`}>兌換</div>
        </div>
    )
}
