"use client"
import styles from "./style.module.scss"
import {useEffect, useRef, useState} from "react";
import {AnimatePresence} from "framer-motion";
import {motion} from "framer-motion";

export default function UserComponent({avatar, name}) {
    const [isOpen, setIsOpen] = useState(false)
    const container = useRef(null)

    function handleDocumentClick(e) {
        if (container.current) {
            if (!container.current.contains(e.target)) {
                setIsOpen(false)
            }
        }
    }


    useEffect(() => {
        document.addEventListener("click", handleDocumentClick)
        return () => {
            document.removeEventListener("click", handleDocumentClick)
        }
    })

    return (
        <>
            <div className={styles.User}
                 onClick={() => {
                     setIsOpen(!isOpen)
                 }}
                 style={{backgroundImage: `url("${avatar}")`}}
            />
            <AnimatePresence>
                {
                    isOpen &&
                    <motion.div
                        initial={{
                            y: -10, opacity: 0
                        }}
                        animate={{
                            y: 0, opacity: 1
                        }}
                        exit={{
                            y: -10, opacity: 0
                        }}
                        transition={{
                            duration: .2, ease: "easeOut",
                        }}

                        ref={container} className={styles.PopupMenu}>
                        <div className={styles.List}>
                            <div className={`${styles.UserItem} ${styles.Item}`}>
                                <div className={styles.User} style={{backgroundImage: `url("${avatar}")`}}/>
                                <div className={styles.Info}>
                                    <div className={styles.Name}>{name}</div>
                                </div>
                            </div>
                            {/*<div className={styles.Item}>*/}
                            {/*    <span className={`material-icon ${styles.icon}`}> arrow_forward_ios</span>*/}
                            {/*    <div className={styles.Name}>owo</div>*/}
                            {/*</div>*/}
                            <hr/>
                            <a href={'/auth/logout'} className={styles.Item}>
                                <span className={`material-icon ${styles.icon}`}> logout</span>
                                <div className={styles.Name}>登出</div>
                            </a>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </>
    )
}