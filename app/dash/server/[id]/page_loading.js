"use client"
import styles from './page.module.scss'
import {motion} from "framer-motion";
import TextInput from "data/components/TextInput";

const loading = {
    opacity:.5
}

export default function LoadingServer() {
    return (
        <>
            <section style={loading}>
                <div className={styles.Title}>...</div>
                <div className={styles.SubTitle}>
                    <div className={styles.SubSubtitle}>
                        ID:...
                    </div>
                    <div className={styles.SubSubtitle}>
                        Created at:...
                    </div>
                    <div className={styles.SubSubtitle}>
                        Last update:...
                    </div>
                </div>
                <motion.div className={styles.Buttons}>
                        <div className={styles.Button}>...</div>
                        <div className={styles.Button}>...</div>
                </motion.div>
            </section>
            <section style={loading}>
                <div className={styles.Title}>編輯資料</div>
                <div className={styles.Form}>
                    <div className={styles.Title}>名稱:</div>
                    <TextInput placeholder={'...'} readonly={true}></TextInput>
                    <div className={styles.Title}>CPU:(%)</div>
                    <TextInput placeholder={'...'} readonly={true} type={'number'}></TextInput>
                    <div className={styles.Title}>記憶體:(mb)</div>
                    <TextInput placeholder={'...'} readonly={true} type={'number'}></TextInput>
                    <div className={styles.Title}>儲存空間:(mb)</div>
                    <TextInput placeholder={'...'} readonly={true} type={'number'}></TextInput>
                    <div className={`button ${styles.Button}`}>編輯</div>
                </div>
            </section>
        </>
    )
}
