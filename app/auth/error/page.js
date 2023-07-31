import styles from './page.module.scss'
import * as ClientContent from './ClientContent'
import {get_user_data} from "@/data/functions/auth/auth";
import {pterouser} from "@/data/functions/ptero/api";
import {redirect} from "next/navigation";

export default async function Error() {

    //確認有登入了，檢查資料完整
    const user = await get_user_data()
    const status = await pterouser.find_error(user)
    console.log(status.ok)

    if (!status.ok) {
        return (
            <main className={styles.main}>
                <div className={styles.Hero}>
                    <ClientContent.Error type={status.msg} code={status.code}/>
                </div>
            </main>
        )
    } else {
        redirect('/dash');
        return (
            <main className={styles.main}>
                <div className={styles.Hero}>
                    <ClientContent.Normal/>
                </div>
            </main>
        )
    }
}
