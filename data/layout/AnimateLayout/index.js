"use client"
import { motion } from "framer-motion";

export default function AnimateLayout({children}) {
  return (
    <motion.main
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.main>
  )
}
