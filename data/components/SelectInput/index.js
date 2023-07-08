import styles from "./style.module.scss"

export default function SelectInput({ className, name, style, onChange, options }) {
    return(
        <select onChange={onChange} className={`${styles.TextInput} ${className}`} name={name} style={style}>
            {options.map((e)=>{
                return <option value={e.value}>{e.text}</option>
            })}
        </select>
    )
}