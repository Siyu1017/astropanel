"use client"
import styles from './page.module.scss'
import {motion} from "framer-motion";
import TextInput from "@/data/components/Input";
import {MotionLink} from "@/data/components/MotionLink/MotionLink";

export default function Dash({params}) {

    const id = params.id

    const buttons = [
        {'name': '面板', 'type': 'local', 'href': `delete/${id}`},
        {'name': '刪除', 'type': 'local', 'href': `delete/${id}`},
    ]

    return (
        <>
            <section>
                <div className={styles.Title}>{'ServerName'}</div>
                <div className={styles.SubTitle}>ID:{id} {'CreateAt'}</div>
                <motion.div
                    className={styles.Buttons}>
                    {buttons && buttons.map((e, i) => {
                        return <MotionLink
                            whileHover={{scale:1.03}}
                            href={`/dash/${e.href}`}
                            className={styles.Button}
                            key={i}>
                            {e.name}
                        </MotionLink>
                    })}
                </motion.div>
            </section>
            <section>
                <div className={styles.Title}>編輯資料</div>
                <div className={styles.Form}>
                    <div className={styles.Title}>名稱:</div>
                    <TextInput placeholder={'server'}></TextInput>
                    <div placeholder={'us-1'} className={styles.Title}>CPU:(%)</div>
                    <TextInput placeholder={'0 %'} type={'number'}></TextInput>
                    <div className={styles.Title}>記憶體:(mb)</div>
                    <TextInput placeholder={'0 mb'} type={'number'}></TextInput>
                    <div className={styles.Title}>儲存空間:(mb)</div>
                    <TextInput placeholder={'0 mb'} type={'number'}></TextInput>
                    <div className={`button ${styles.Button}`}>編輯</div>
                </div>
            </section>
        </>
    )
}
