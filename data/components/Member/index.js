"use client"
import styles from "./style.module.scss"
import {motion} from "framer-motion";

export default function Member({avatar, name, join_date, uname, props, about, children, className}) {
    return (
        <motion.div
            className={`${className} ${styles.Container}`} {...props}>
            <img src={avatar} alt={name} className={styles.Avatar}></img>
            <div className={styles.About}>
                <div className={styles.Name}>
                    {name}
                </div>
                <div className={styles.UName}>{uname}</div>
                {about?<><hr/><div className={styles.AboutMe}>{children}</div></>:''}
            </div>
        </motion.div>
    )
}