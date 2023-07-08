"use client"
import styles from "./style.module.scss"
import {useState} from "react";
import {color, motion} from "framer-motion";
import {usePathname} from "next/navigation";
import MiniGuide from "@/data/components/MiniGuide";
import {MotionLink} from "@/data/components/MotionLink/MotionLink";

export default function SideBar({items}) {
    const pathname = usePathname()

    const [DrawerActive, setDrawerActive] = useState(false);

    function changeActive() {
        setDrawerActive(!DrawerActive)
    }

    function Active() {
        setDrawerActive(true)
    }

    function UnActive() {
        setDrawerActive(false)
    }

    return (<>
        <MiniGuide pathname={pathname} items={items} show={DrawerActive}/>
        <div onClick={UnActive} className={`${styles.SideBarBackground}  ${DrawerActive ? styles.active : ""}`}/>
        <motion.div
            animate={DrawerActive ? "open" : "closed"}
            variants={{
                open: {
                    left: "0", transition: {
                        duration: .1, delayChildren: .1, staggerChildren: 0.05, ease: "easeOut"
                    }
                }, closed: {
                    left: "calc(-1 * var(--app-drawer-width) + 50px)", transition: {
                        duration: .1, ease: "easeOut"
                    }
                }
            }}
            className={`${styles.SideBar}`}>
            <div onClick={changeActive} className={styles.activeBtn}>
                <motion.span
                    animate={DrawerActive ? "open" : "closed"}
                    variants={{
                        open: {rotate: 90}, closed: {rotate: 270}
                    }}
                    transition={{duration: 0.2}}
                    style={{originY: 0.55}}
                    className={`material-icon ${styles.arrowIcon}`}>expand_more
                </motion.span>
            </div>

            {items.map((e, i) => {
                return <MotionLink
                    href={e.href}
                    key={i}
                    whileTap={{scale: 0.97}}
                    whileHover={{scale: 1.03}}
                    variants={{open: {
                            opacity: 1, y: 0,
                        }, closed: {opacity: 0, y: -20}
                    }}
                    className={styles.Item}>

                    <div style={{fill: pathname === e.href ? e.color : ""}} className={styles.Icon}>{e.icon}</div>
                    <div style={{color: pathname === e.href ? e.color : ''}}>{e.name}</div>
                </MotionLink>
            })}
            {pathname}
        </motion.div>
    </>)
}