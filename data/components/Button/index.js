"use client"
import styles from "./style.module.scss"
import {AnimatePresence, motion} from "framer-motion";

export default function Button({onClick, isLoading, children, className, props}) {
    return (
        <motion.button
            initial={"close"}
            whileHover={"open"}
            onClick={onClick&&!isLoading?onClick:undefined}
            // onClick={onClick&&!isLoading?onclick:undefined}
            className={`${styles.Container} ${className}`}
            {...props}>
            {children}

            <AnimatePresence>
                {isLoading &&
                    <motion.div
                        initial={{
                            y: "100%",
                            opacity: 0,
                        }}
                        animate={{
                            y: 0,
                            opacity: 1,
                        }}
                        exit={{
                            y: "100%",
                            opacity: 0,
                        }}

                        transition={{
                            duration: .1,
                        }}


                        className={styles.Buttons}>
                        <motion.div
                            style={{
                                transition: 'none'
                            }}

                            animate={{
                                rotate: 360,
                            }}

                            transition={{
                                repeat: Infinity,
                                ease: "linear",
                                duration: 1,
                            }}

                            className={styles.Button}>
                        </motion.div>
                    </motion.div>
                }
            </AnimatePresence>
        </motion.button>
    )
}