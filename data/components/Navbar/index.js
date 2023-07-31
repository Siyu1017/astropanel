"use client"
import styles from "./style.module.scss"
import {useState} from "react";
import TextInput from "data/components/TextInput";

export default function Navbar() {
  const [CenterFill, setCenterFill] = useState(false)

  return (
    <div className={`${styles.Navbar} ${CenterFill?styles.centerFill:''}`}>
      <div className={styles.left}></div>
      <div className={styles.center}>
        <TextInput placeholder={"搜尋"} className={styles.content}></TextInput>
        <div onClick={() => setCenterFill(!CenterFill)} className={`material-icon ${styles.searchBtn}`}>{CenterFill?<>close</>:<>search</>}</div>
      </div>
      <div className={styles.right}></div>
    </div>
  )
}