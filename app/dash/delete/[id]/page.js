"use client"
import styles from './page.module.scss'
import {motion} from "framer-motion";
import Navbar from "@/data/components/Navbar";
import TextInput from "@/data/components/Input";

export default function Delete({ params }) {

    return (
        <div className={styles.Container}>
            <div className={styles.Title}>再次確認</div>
            <div className={styles.Form}>
                <div className={styles.Title}>輸入 {params.id}</div>
                <TextInput placeholder={params.id}></TextInput>
                <div className={styles.Title}>輸入 confirm delete</div>
                <TextInput placeholder={'confirm delete'}></TextInput>

                <div className={`button ${styles.Button}`}>確認刪除</div>
            </div>
        </div>
    )
}
