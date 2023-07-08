import styles from "./style.module.scss"


export default function TextInput({ className, name, placeholder, style, type, onChange }) {
    return(
        <input onChange={onChange} type={type==null?"text":type} placeholder={placeholder} className={`${styles.TextInput} ${className}`} name={name} style={style}/>
    )
}