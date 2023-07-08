import styles from "./style.module.scss"
import {motion} from "framer-motion";
import {MotionLink} from "@/data/components/MotionLink/MotionLink";

export default function MiniGuide({items, pathname, show}) {
    return (
        <motion.div className={`${styles.MiniGuide} ${show ? styles.hide : ""}`}>
            {items.map((e, i) => {
                return <MotionLink
                    href={e.href}
                    key={i}
                    whileTap={{scale: 0.97}}
                    whileHover={"hover"}
                    variants={{
                        hover: {
                            scale: 1.03,
                        },
                        open: {
                            opacity: 1,
                            x: 0,
                            transition: {type: "spring", stiffness: 300, damping: 24}
                        },
                        closed: {opacity: 0, x: 20}
                    }}
                    className={''}>
                    <div style={{fill: pathname === e.href ? e.color : "", outline: pathname === e.href ? `${e.color} solid 2px` : ""}} className={styles.Icon}>{e.icon}</div>
                </MotionLink>
            })}
        </motion.div>
    )
}