"use client"
import {AnimatePresence, LayoutGroup, motion} from "framer-motion";
import {useCallback, useState} from "react";
import styles from "./page.module.scss"

export default function App() {
    const [index, setIndex] = useState(false);

    const handleClose = useCallback(() => {
        setIndex(false);
    }, []);


    const [selectedId, setSelectedId] = useState(false)

    const items = [
        {'s': 'owo', 't': "owo"},
        {'s': 'www', 't': "www"},
        {'s': 'wsw', 't': "wsw"},
    ]

    return (
        <LayoutGroup>

            {items.map((e, i) => (
                <motion.div layoutId={e.t} onClick={() => setSelectedId(e.t)}>
                    <motion.h5>{e.s}</motion.h5>
                    <motion.h2>{e.t}</motion.h2>
                </motion.div>
            ))}

            <AnimatePresence>
                {selectedId && (
                    <motion.div layoutId={selectedId} className={styles.owo}>
                        <motion.h5>owo</motion.h5>
                        <motion.h2>uwu</motion.h2>
                        <motion.button onClick={() => setSelectedId(false)}>cl</motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </LayoutGroup>
    );
}