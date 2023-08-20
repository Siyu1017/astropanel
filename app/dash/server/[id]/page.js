"use client"
import styles from './page.module.scss'
import {motion} from "framer-motion";
import useSWR from "swr";
import {fetcher} from "@/data/functions/fetcher";
import CardButton, {LoadingCardButton} from "@/data/components/CardButton";

export default function Server({params}) {
    const id = params.id

    const {data, error, isLoading} = useSWR(`/api/user/servers/${id}`, fetcher)

    if (error) return <div>failed to load</div>
    if (isLoading) return <LoadingServer/>

    console.log(data)

    return (
        <>
            <section>
                <div className={styles.Title}>{data.name}</div>
                <div className={styles.SubTitle}>
                    <div className={styles.SubSubtitle}>
                        ID:{data.identifier}
                    </div>
                    <div className={styles.SubSubtitle}>
                        Created at:{data.created_at}
                    </div>
                    <div className={styles.SubSubtitle}>
                        Last update:{data.updated_at}
                    </div>
                </div>
                <div className={styles.Buttons}>
                    <CardButton name={"到控制面板"} desc={data.url} url={data.url}/>
                    <CardButton name={"編輯伺服器資料"} desc={`編輯此伺服器可使用的資源`}
                                url={`/dash/server/${id}/edit`}/>
                    <CardButton name={"刪除伺服器"} desc={`刪除此伺服器 此操作不可復原!`}
                                url={`/dash/server/${id}/delete`}/>
                </div>
            </section>
        </>
    )
}

function LoadingServer() {
    return (
        <>
            <section>
                <div style={{width: "8rem", height: "var(--title-size)"}} className={`${styles.Title} loading`}></div>
                <div className={styles.SubTitle}>
                    <div style={{width: "5rem", height: "var(--sub-title-size)"}}
                         className={`${styles.SubSubtitle} loading`}></div>
                    <div style={{width: "10rem", height: "var(--sub-title-size)"}}
                         className={`${styles.SubSubtitle} loading`}></div>
                    <div style={{width: "15rem", height: "var(--sub-title-size)"}}
                         className={`${styles.SubSubtitle} loading`}></div>
                </div>
                <motion.div className={styles.Buttons}>
                    <LoadingCardButton/>
                    <LoadingCardButton/>
                    <LoadingCardButton/>
                </motion.div>
            </section>
        </>
    )
}
