import styles from "./style.module.scss"

export default function TextInput({ className, name, placeholder, style, type, onChange, readonly, required, props }) {
    return(
        <input onChange={onChange} type={type==null?"text":type} placeholder={placeholder} className={`${styles.TextInput} ${className}`} name={name} style={style} readOnly={readonly} required={required} {...props}/>
    )
}