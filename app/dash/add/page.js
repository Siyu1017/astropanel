"use client"
import styles from './page.module.scss'
import TextInput from "data/components/TextInput";
import SelectInput from "@/data/components/SelectInput";
import {useState} from "react";
import Button from "@/data/components/Button";
import useSWR from "swr";
import {redirect} from "next/navigation";
import {nodes} from "@/data/functions/config/config";

export const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Dash() {

    const [isSending, setSending] = useState(false)
    const [dockerImages, setDockerImages] = useState([])

    const {data, error, isLoading} = useSWR('/api/eggs', fetcher)

    if (error) return <div>failed to load</div>
    if (isLoading) return <div/>

    console.log(data)

    const types = []
    data.map((e) => {
        types.push({value: e.egg_id, text: e.name})
    })

    function select_docker_image(evt) {
        const di = []
        for (const egg of data) {
            if (egg.egg_id === parseInt(evt.target.value)) {
                for (const dockerImage of egg.docker_images) {
                    di.push({value: dockerImage, text: dockerImage})
                }
                break
            }
        }
        setDockerImages([...di])
    }

    function submitForm(e) {
        e.preventDefault()
        if (isSending) return
        setSending(true)

        let params = {}

        Array.from(e.target.elements).map(e => {
            e.name && (params[e.name] = e.value)
        })

        console.log(params)

        for (const egg of data) {
            if (egg.egg_id === parseInt(params.egg_id)) {

                console.log(egg)
                params['startup'] = egg.startup

                params['environment'] = {}

                egg.environment.map((e)=>{
                    params['environment'][e.name] = e.default
                })

                break
            }
        }

        const http = new XMLHttpRequest();
        http.open('POST', '/api/user/servers', true);

        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/json');

        http.onreadystatechange = function () {//Call a function when the state changes.
            if (http.readyState === 4 && http.status === 200) {
                const resp = JSON.parse(http.responseText)
                console.log(resp);
                if (resp.ok) {
                    alert(`伺服器 ${resp.data.attributes.name} 建立成功: /dash/server/${resp.data.attributes.id}`)
                    redirect(`/dash/server/${resp.data.attributes.id}`)
                } else {
                    alert(`伺服器建立失敗: ${resp.msg}`)
                }
                setSending(false)
            }
        }
        console.log(params)
        http.send(JSON.stringify(params));
    }

    return (
        <div className={styles.Container}>
            <section>
                <div className={styles.Title}>創建伺服器</div>
                <form method={'post'} className={styles.Form} onSubmit={submitForm}>
                    <label className={styles.Title}>名稱:
                        <TextInput name={'server_name'} placeholder={'server'} required/>
                    </label>
                    <label className={styles.Title}>伺服器類型:
                        <SelectInput name={'egg_id'} options={types} onChange={select_docker_image}
                                     empty={"選擇一個"} required/>
                    </label>
                    <label className={styles.Title}>Docker 映像
                        <SelectInput name={'docker_image'} options={dockerImages} empty={"選擇一個"} required/>
                    </label>
                    <label className={styles.Title}>節點:
                        <SelectInput name={'node'} options={nodes.map(e=>({value:e.id, text:e.name}))} required/>
                    </label>
                    <label className={styles.Title}>CPU:(%)
                        <TextInput name={'cpu'} placeholder={'0 %'} type={'number'} required/>
                    </label>
                    <label className={styles.Title}>記憶體:(mb)
                        <TextInput name={'memory'} placeholder={'0 mb'} type={'number'} required/>
                    </label>
                    <label className={styles.Title}>儲存空間:(mb)
                        <TextInput name={'disk'} placeholder={'0 mb'} type={'number'} required/>
                    </label>
                    <Button isLoading={isSending} className={styles.Button} props={{type: 'submit'}}>建立</Button>
                </form>
            </section>
        </div>
    )
}
