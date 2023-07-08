"use client"
import styles from './page.module.scss'
import {motion} from "framer-motion";
import Navbar from "@/data/components/Navbar";
import TextInput from "@/data/components/Input";
import SelectInput from "@/data/components/SelectInput";

const types = [
    {'value':'python', 'text':'Python'},
    {'value':'nodejs', 'text':'Node.JS'},
    {'value':'web', 'text':'WebHost'},
    {'value':'rust', 'text':'Rust'},
    {'value':'minecraft', 'text':'Minecraft'},
]

const nodes = [
    {'value':'1', 'text':'node1'},
    {'value':'2', 'text':'node2'},
    {'value':'3', 'text':'node3'},
]

export default function Dash() {

    return (
        <div className={styles.Container}>
            <div className={styles.Title}>創建伺服器</div>
            <div className={styles.Form}>
                <div className={styles.Title}>名稱:</div>
                <TextInput placeholder={'server'}></TextInput>
                <div className={styles.Title}>伺服器類型:</div>
                <SelectInput options={types}></SelectInput>
                <div className={styles.Title}>節點:</div>
                <SelectInput options={nodes}></SelectInput>
                <div placeholder={'us-1'} className={styles.Title}>CPU:(%)</div>
                <TextInput placeholder={'0 %'} type={'number'}></TextInput>
                <div className={styles.Title}>記憶體:(mb)</div>
                <TextInput placeholder={'0 mb'} type={'number'}></TextInput>
                <div className={styles.Title}>儲存空間:(mb)</div>
                <TextInput placeholder={'0 mb'} type={'number'}></TextInput>
                <div className={`button ${styles.Button}`}>建立</div>
            </div>
        </div>
    )
}
