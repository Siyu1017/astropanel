"use client"
import styles from './page.module.scss'
import {motion} from "framer-motion";
import useSWR from "swr";
import {fetcher} from "@/data/functions/fetcher";
import CardButton, {LoadingCardButton} from "@/data/components/CardButton";
import {pterodactyl} from "@/data/functions/config/config";

export default function User({params}) {
    const id = params.id

    const {data, error, isLoading} = useSWR(`/api/users/${id}`, fetcher)

    if (error) return <div>failed to load</div>
    if (isLoading) return <LoadingUser/>

    console.log(data)

    return (
        <>
            <section>
                <div className={styles.Title}>{data.name}</div>
                <div className={styles.SubTitle}>
                    <div className={styles.SubSubtitle}>
                        PTERODACTYL ID:{data.ptero_id}
                    </div>
                    <div className={styles.SubSubtitle}>
                        DISCORD ID:{data.dc_id}
                    </div>

                    {data.admin && <div className={styles.SubSubtitle}>
                        管理員
                    </div>}
                </div>
                <div className={styles.Buttons}>
                    <CardButton name={"到管理面板"} desc={`${pterodactyl.url}admin/users/view/${data.ptero_id}`}
                                url={`${pterodactyl.url}admin/users/view/${data.ptero_id}`}/>
                    <CardButton name={"刪除使用者"} desc={`刪除此使用者 此操作不可復原!`}
                                url={`/dash/server/${id}/delete`}/>
                </div>
            </section>
        </>
    )
}

function LoadingUser() {
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
                </motion.div>
            </section>
        </>
    )
}
