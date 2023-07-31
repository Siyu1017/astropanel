"use client"
import styles from './page.module.scss'
import TextInput from "data/components/TextInput";
import useSWR from "swr";
import {fetcher} from "@/app/dash/add/page";
import LoadingDelete from "@/app/dash/delete/[id]/page_loading";
import {useState} from "react";
import Button from "@/data/components/Button";
import {redirect} from "next/navigation";

export default function Delete({ params }) {
    const [isSending, setSending] = useState(false)

    const {data, error, isLoading} = useSWR(`/api/user/servers/${params.id}`, fetcher)

    if (error) redirect('/dash')
    if (isLoading) return <LoadingDelete/>

    function submitForm(e) {
        e.preventDefault()
        if (isSending) return
        setSending(true)

        const http = new XMLHttpRequest();
        http.open('DELETE', `/api/user/servers/${params.id}`, true);

        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/json');

        http.onreadystatechange = async function () {//Call a function when the state changes.
            if (http.readyState === 4 && http.status === 200) {
                alert('伺服器刪除成功')
                setSending(false)
            }
        }
        http.send();
    }

    return (
        <div className={styles.Container}>
            <div className={styles.Title}>再次確認</div>
            <form onSubmit={submitForm} className={styles.Form}>
                <div className={styles.Title}>輸入 {data.identifier}</div>
                <TextInput placeholder={data.identifier} required={true} props={{pattern: data.identifier}}></TextInput>
                <div className={styles.Title}>輸入 confirm delete</div>
                <TextInput placeholder={'confirm delete'} required={true} props={{pattern: 'confirm delete'}}></TextInput>

                <Button isLoading={isSending} className={styles.Button} props={{type: 'submit'}}>確認刪除</Button>
            </form>
        </div>
    )
}
