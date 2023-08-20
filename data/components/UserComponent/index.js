"use client"
import styles from "./style.module.scss"
import {useEffect, useRef, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {usePathname} from "next/navigation";

export default function UserComponent({avatar, name, admin}) {
    const [isOpen, setIsOpen] = useState(false)
    const container = useRef(null)
    const pathname = usePathname()

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
                            {admin && pathname.startsWith("/dash") &&
                                <a href={'/admin'} className={styles.Item}>
                                    <span className={`material-icon ${styles.icon}`}> admin_panel_settings</span>
                                    <div className={styles.Name}>管理員面板</div>
                                </a>}
                            {pathname.startsWith("/admin") &&
                                <a href={'/dash'} className={styles.Item}>
                                    <span className={`material-icon ${styles.icon}`}> admin_panel_settings</span>
                                    <div className={styles.Name}>控制面板</div>
                                </a>}
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