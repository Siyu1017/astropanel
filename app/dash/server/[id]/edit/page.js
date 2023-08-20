"use client"
import styles from './page.module.scss'
import useSWR from "swr";
import {fetcher} from "@/data/functions/fetcher";
import Button from "@/data/components/Button";
import {useState} from "react";
import TextInputDefault from "@/data/components/TextInputDefault";
import TextInput from "@/data/components/TextInput";

export default function Edit({params}) {
    const id = params.id
    const [isSending, setSending] = useState(false)

    const {data, error, isLoading} = useSWR(`/api/user/servers/${id}`, fetcher)

    if (error) return <div>failed to load</div>
    if (isLoading) return <LoadingEdit/>

    console.log(data)

    function submitForm(e) {
        e.preventDefault()
        if (isSending) return
        setSending(true)

        let params = {}

        Array.from(e.target.elements).map(e => {
            e.name && (params[e.name] = e.value)
        })

        params['ore_data'] = data

        console.log(params)

        const http = new XMLHttpRequest();
        http.open('PATCH', `/api/user/servers/${id}`, true);

        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/json');

        http.onreadystatechange = function () {//Call a function when the state changes.
            if (http.readyState === 4 && http.status === 200) {
                alert('修改成功')
                setSending(false)
            }
        }
        console.log(params)
        http.send(JSON.stringify(params));
    }

    return (
        <>
            <section>
                <div className={styles.Title}>編輯資料</div>
                <form method={'post'} className={styles.Form} onSubmit={submitForm}>
                    <label className={styles.Title}>名稱:
                        <TextInputDefault name={'name'} placeholder={'server'} defaultValue={data.name} readonly
                                          required/>
                    </label>
                    <label className={styles.Title}>CPU:(%)
                        <TextInputDefault name={'cpu'} placeholder={'0 %'} type={'number'}
                                          defaultValue={data.limits.cpu} required/>
                    </label>
                    <label className={styles.Title}>記憶體:(mb)
                        <TextInputDefault name={'memory'} placeholder={'0 mb'} type={'number'}
                                          defaultValue={data.limits.memory} required/>
                    </label>
                    <label className={styles.Title}>儲存空間:(mb)
                        <TextInputDefault name={'disk'} placeholder={'0 mb'} type={'number'}
                                          defaultValue={data.limits.disk} required/>
                    </label>
                    <Button isLoading={isSending} className={styles.Button} props={{type: 'submit'}}>編輯</Button>
                </form>
            </section>
        </>
    )
}

function LoadingEdit() {
    return (
        <>
            <section>
                <div className={styles.Title}>編輯資料</div>
                <div className={styles.Form}>
                    <div style={{width: "15rem", height: "var(--title-size)"}}
                         className={`${styles.Title} loading`}></div>
                    <TextInput placeholder={'...'} readonly={true}></TextInput>
                    <div style={{width: "15rem", height: "var(--title-size)"}}
                         className={`${styles.Title} loading`}></div>
                    <TextInput placeholder={'...'} readonly={true} type={'number'}></TextInput>
                    <div style={{width: "15rem", height: "var(--title-size)"}}
                         className={`${styles.Title} loading`}></div>
                    <TextInput placeholder={'...'} readonly={true} type={'number'}></TextInput>
                    <div style={{width: "15rem", height: "var(--title-size)"}}
                         className={`${styles.Title} loading`}></div>
                    <TextInput placeholder={'...'} readonly={true} type={'number'}></TextInput>
                    <div className={`button ${styles.Button}`}>編輯</div>
                </div>
            </section>
        </>
    )
}
