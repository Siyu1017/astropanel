import styles from "./style.module.scss"
import {useState} from "react";


export default function TextInputDefault({ className, name, placeholder, style, type, defaultValue, readonly, required, props }) {
    const [value, setValue] = useState(defaultValue);

    function handleChange(event) {
        event.preventDefault();
        setValue(event.target.value);
    }

    return(
        <input onChange={handleChange} type={type==null?"text":type} placeholder={placeholder} className={`${styles.TextInput} ${className}`} name={name} style={style} readOnly={readonly} required={required} value={value} {...props}/>
    )
}