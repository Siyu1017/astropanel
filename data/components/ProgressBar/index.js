import styles from "./style.module.scss"

export default function ({ style, innerStyle, progress }) {

  return (
    <div style={style} className={styles.ProgressBar}>
      <div style={{...innerStyle, width:`${progress==null?50:progress}%`}} className={`${styles.ProgressInner} ${progress==null?styles.Indeterminate:''}`}></div>
    </div>
  )
}