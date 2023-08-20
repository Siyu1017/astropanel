"use client"
import styles from './page.module.scss'
import useSWR from "swr";
import {fetcher} from "@/data/functions/fetcher";
import Card from "@/data/components/Card";
import {publicRuntimeConfig} from "@/next.config";
import {motion} from "framer-motion";

export default function Admin() {
    const {data, error, isLoading} = useSWR('/api/user', fetcher)

    if (error) return <div>failed to load</div>
    if (isLoading) return <LoadingAdmin/>

    console.log(data)

    return (
        <>
            <section>
                <div className={styles.Title}>概觀</div>
                <div className={styles.PanelInfo}>
                    <Card className={styles.Card}>
                        <div className={styles.Title}>面板資訊</div>
                        目前正在運行 AstroPanel {publicRuntimeConfig?.version}
                    </Card>
                </div>
            </section>
            <section>
                <motion.div className={styles.Buttons}>
                    <a href={"https://discord.com/invite/hRueescnnN"} className={"button"}>Discord</a>
                    <a href={"https://github.com/tooty-1135/astropanel/"} className={"button"}>Github</a>
                </motion.div>
            </section>
        </>
    )
}

function LoadingAdmin() {

    return (
        <>
            <section>
                <div className={styles.Title}>概觀</div>
                <div className={styles.PanelInfo}>
                    <Card className={styles.Card}>
                        <div className={styles.Title}>面板資訊</div>
                        目前正在運行 AstroPanel {publicRuntimeConfig?.version}
                    </Card>
                </div>
            </section>
            <section>
                <motion.div className={styles.Buttons}>
                    <a href={"https://discord.com/invite/hRueescnnN"} className={"button"}>Discord</a>
                    <a href={"https://github.com/tooty-1135/astropanel/"} className={"button"}>Github</a>
                </motion.div>
            </section>
        </>
    )
}