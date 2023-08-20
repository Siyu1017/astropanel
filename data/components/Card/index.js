import styles from "./style.module.scss"

export default function Card({className, children}) {
    return (
        <div className={`${styles.Card} ${className}`}>
            {children}
        </div>
    )
}