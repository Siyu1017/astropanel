"use client"
import styles from './page.module.scss'
import TextInput from "data/components/TextInput";

export default function LoadingDelete() {

    return (
        <div className={styles.Container}>
            <div className={styles.Title}>再次確認</div>
            <div className={styles.Form}>
                <div className={styles.Title}>...</div>
                <TextInput placeholder={'...'}></TextInput>
                <div className={styles.Title}>...</div>
                <TextInput placeholder={'...'}></TextInput>

                <div className={`button ${styles.Button}`}>...</div>
            </div>
        </div>
    )
}
