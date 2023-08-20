"use client"
import styles from './page.module.scss'
import useSWR from "swr";
import {fetcher} from "@/data/functions/fetcher";
import CardButton, {LoadingCardButton} from "@/data/components/CardButton";

export default function Users() {
    const {data, error, isLoading} = useSWR('/api/users', fetcher)

    if (error) return <div>failed to load</div>
    if (isLoading) return <LoadingUsers/>

    console.log(data)

    return (
        <>
            <section>
                <div className={styles.Users}>
                    {data.length !== 0 ? data.map((e, i) => {
                        return <CardButton desc={`${e.dc_id}, ${e.ptero_id}, ${e.email}${e.admin ? ", 管理員" : ""}`}
                                           name={e.name} url={`/admin/users/${e.dc_id}`} key={i}/>
                    }) : <>什麼也沒有</>}
                </div>
            </section>
        </>
    )
}

function LoadingUsers() {

    return (
        <>
            <section>
                <div className={styles.Users}>
                    <LoadingCardButton/>
                    <LoadingCardButton/>
                    <LoadingCardButton/>
                    <LoadingCardButton/>
                    <LoadingCardButton/>
                    <LoadingCardButton/>
                    <LoadingCardButton/>
                </div>
            </section>
        </>
    )
}