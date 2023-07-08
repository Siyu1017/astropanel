import styles from './style.module.scss'
import {motion} from "framer-motion";
import {useState} from "react";

export default function Collapse({title, children, classNameIn, props}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            onClick={() => setIsOpen(!isOpen)}
            className={styles.Collapse}
            {...props}>
            <div className={styles.Title}>{title}</div>
            <motion.div
                variants={{
                    open: {
                        height:"",
                        transition: {
                            duration: 0.7,
                        }
                    },
                    closed: {
                        height:0,
                        transition: {
                            duration: 0.7
                        }
                    }
                }}
                animate={isOpen ? "open" : "closed"}
                className={`${styles.Children} ${classNameIn}`}>
                {children}
            </motion.div>
        </div>
    )
}