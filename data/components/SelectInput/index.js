import styles from "./style.module.scss"

export default function SelectInput({ className, name, style, onChange, required, empty, options }) {
    return(
        <select onChange={onChange} className={`${styles.TextInput} ${className}`} name={name} style={style} required={required}>
            {empty&& <option value="" disabled selected>{empty}</option>}
            {options.map((e, i)=>{
                return <option value={e.value} key={i}>{e.text}</option>
            })}
        </select>
    )
}