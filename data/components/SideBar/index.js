"use client"
import styles from "./style.module.scss"
import {motion} from "framer-motion";
import {usePathname} from "next/navigation";
import {MotionLink} from "@/data/components/MotionLink/MotionLink";
import {panel_info} from "@/data/functions/config/config";

export default function SideBar({items, active, fh, user, admin}) {
    const pathname = usePathname()


    // <UserComponent admin={data.admin}
    // name={user.global_name}
    // avatar={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`}/>

    return (<>
        <motion.div
            animate={active ? "open" : "closed"}
            variants={{
                open: {
                    left: "0", transition: {
                        duration: .1, delayChildren: .1, staggerChildren: 0.05, ease: "easeOut"
                    }
                }, closed: {
                    left: "calc(-1 * var(--sidebar-width))", transition: {
                        duration: .1, ease: "easeOut"
                    }
                }
            }}
            className={`${styles.SideBar} ${fh ? styles.fh : ""}`}>

            <div className={`${styles.UserItem} ${styles.Item}`}>
                <div className={styles.User}
                     style={{backgroundImage: `url("https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}")`}}/>
                <div className={styles.Info}>
                    <div className={styles.Name}>{user.global_name}</div>
                </div>
            </div>

            {items.map((e, i) => {
                return <MotionLink
                    href={e.href}
                    key={i}
                    whileTap={{scale: 0.97}}
                    whileHover={{scale: 1.03}}
                    variants={{
                        open: {
                            opacity: 1, y: 0,
                        }, closed: {opacity: 0, y: -20}
                    }}
                    className={styles.Item}>

                    <div style={{fill: pathname === e.href ? e.color : ""}} className={styles.Icon}>{e.icon}</div>
                    <div style={{color: pathname === e.href ? e.color : ''}}>{e.name}</div>
                </MotionLink>
            })}
            {admin && pathname.startsWith("/dash") &&
                <MotionLink
                    href={'/admin'}
                    whileTap={{scale: 0.97}}
                    whileHover={{scale: 1.03}}
                    variants={{
                        open: {
                            opacity: 1, y: 0,
                        }, closed: {opacity: 0, y: -20}
                    }}
                    className={styles.Item}>

                    <div className={styles.Icon}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                            <path
                                d="M690.882-270q25.883 0 44-19Q753-308 753-333.882q0-25.883-18.118-44-18.117-18.118-44-18.118Q665-396 646-377.882q-19 18.117-19 44Q627-308 646-289q19 19 44.882 19ZM689.5-145q33.5 0 60.5-14t46-40q-26-14-51.962-21-25.961-7-54-7-28.038 0-54.538 7-26.5 7-51.5 21 19 26 45.5 40t60 14ZM480-80q-138-32-229-156.5T160-522v-239l320-120 320 120v270q-14-7-30-12.5t-30-7.5v-208l-260-96-260 96v197q0 76 24.5 140T307-269.5q38 48.5 84 80.5t89 46q6 12 18 27t20 23q-9 5-19 7.5T480-80Zm212.5 0Q615-80 560-135.5T505-267q0-78.435 54.99-133.717Q614.98-456 693-456q77 0 132.5 55.283Q881-345.435 881-267q0 76-55.5 131.5T692.5-80ZM480-479Z"/>
                        </svg>
                    </div>
                    <div>管理員面板</div>
                </MotionLink>}
            {admin && pathname.startsWith("/admin") &&
                <MotionLink
                    href={'/dash'}
                    whileTap={{scale: 0.97}}
                    whileHover={{scale: 1.03}}
                    variants={{
                        open: {
                            opacity: 1, y: 0,
                        }, closed: {opacity: 0, y: -20}
                    }}
                    className={styles.Item}>

                    <div className={styles.Icon}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                            <path
                                d="M510-570v-270h330v270H510ZM120-450v-390h330v390H120Zm390 330v-390h330v390H510Zm-390 0v-270h330v270H120Zm60-390h210v-270H180v270Zm390 330h210v-270H570v270Zm0-450h210v-150H570v150ZM180-180h210v-150H180v150Zm210-330Zm180-120Zm0 180ZM390-330Z"/>
                        </svg>
                    </div>
                    <div>控制面板</div>
                </MotionLink>}

            <MotionLink
                href={'/logout'}
                whileTap={{scale: 0.97}}
                whileHover={{scale: 1.03}}
                variants={{
                    open: {
                        opacity: 1, y: 0,
                    }, closed: {opacity: 0, y: -20}
                }}
                className={`${styles.Item} ${styles.Logout}`}>

                <div className={styles.Icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                        <path
                            d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h299v60H180v600h299v60H180Zm486-185-43-43 102-102H360v-60h363L621-612l43-43 176 176-174 174Z"/>
                    </svg>
                </div>
                <div>登出</div>
            </MotionLink>
            <a href={panel_info.made_by_link} className={styles.MadeBy}>{panel_info.made_by}</a>
        </motion.div>
    </>)
}

export function SideBarLoading({items, active, fh}) {
    const pathname = usePathname()
    return (<>
        <motion.div
            animate={active ? "open" : "closed"}
            variants={{
                open: {
                    left: "0", transition: {
                        duration: .1, delayChildren: .1, staggerChildren: 0.05, ease: "easeOut"
                    }
                }, closed: {
                    left: "calc(-1 * var(--sidebar-width))", transition: {
                        duration: .1, ease: "easeOut"
                    }
                }
            }}
            className={`${styles.SideBar} ${fh ? styles.fh : ""}`}>

            <div className={`${styles.UserItem} ${styles.Item}`}>
                <div className={`${styles.User} loading`}/>
                <div className={styles.Info}>
                    <div className={`${styles.Name} loading`}></div>
                </div>
            </div>

            {items.map((e, i) => {
                return <MotionLink
                    href={e.href}
                    key={i}
                    whileTap={{scale: 0.97}}
                    whileHover={{scale: 1.03}}
                    variants={{
                        open: {
                            opacity: 1, y: 0,
                        }, closed: {opacity: 0, y: -20}
                    }}
                    className={styles.Item}>

                    <div style={{fill: pathname === e.href ? e.color : ""}} className={styles.Icon}>{e.icon}</div>
                    <div style={{color: pathname === e.href ? e.color : ''}}>{e.name}</div>
                </MotionLink>
            })}

            <MotionLink
                href={'/logout'}
                whileTap={{scale: 0.97}}
                whileHover={{scale: 1.03}}
                variants={{
                    open: {
                        opacity: 1, y: 0,
                    }, closed: {opacity: 0, y: -20}
                }}
                className={`${styles.Item} ${styles.Logout}`}>

                <div className={styles.Icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                        <path
                            d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h299v60H180v600h299v60H180Zm486-185-43-43 102-102H360v-60h363L621-612l43-43 176 176-174 174Z"/>
                    </svg>
                </div>
                <div>登出</div>
            </MotionLink>
            <a href={panel_info.made_by_link} className={styles.MadeBy}>{panel_info.made_by}</a>
        </motion.div>
    </>)
}