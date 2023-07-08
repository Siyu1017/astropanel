"use client"
import styles from './page.module.scss'
import {motion} from "framer-motion";
import Navbar from "@/data/components/Navbar";
import TextInput from "@/data/components/Input";

export default function Dash() {

    return (
        <div className={styles.Container}>
            <div className={styles.Title}>創建伺服器</div>
            <div className={styles.Form}>
                <div className={styles.Title}>名稱:</div>
                <TextInput placeholder={'server'}></TextInput>
                <div className={styles.Title}>伺服器類型:</div>
                <TextInput></TextInput>
                <div className={styles.Title}>節點:</div>
                <TextInput></TextInput>
                <div placeholder={'us-1'} className={styles.Title}>CPU:(%)</div>
                <TextInput placeholder={'0 %'} type={'number'}></TextInput>
                <div className={styles.Title}>記憶體:(mb)</div>
                <TextInput placeholder={'0 mb'} type={'number'}></TextInput>
                <div className={styles.Title}>儲存空間:(mb)</div>
                <TextInput placeholder={'0 mb'} type={'number'}></TextInput>
                <div className={`button ${styles.Button}`}>建立</div>
            </div>
        </div>
    )
}
