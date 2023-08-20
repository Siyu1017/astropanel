"use client"
import '@/data/style/globals.scss'
import SideBar, {SideBarLoading} from "@/data/components/SideBar";
import {MotionLink} from "@/data/components/MotionLink/MotionLink";
import useSWR from "swr";
import {panel_info} from "@/data/functions/config/config";
import {AccountContext} from "@/data/context/context";
import styles from './layout.module.scss'
import {useState} from "react";
import {useWindowSize} from "@/data/hooks/WindowSize/WindowSize";

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const pages = [
    {
        'name': "概觀",
        "color": "rgb(var(--op-1))",
        'href': '/admin',
        'icon': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path
                d="M220-180h150v-250h220v250h150v-390L480-765 220-570v390Zm-60 60v-480l320-240 320 240v480H530v-250H430v250H160Zm320-353Z"/>
        </svg>
    },
    {
        'name': "管理使用者",
        "color": "rgb(var(--op-2))",
        'href': '/admin/users',
        'icon': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path
                d="M480-481q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM160-160v-94q0-38 19-65t49-41q67-30 128.5-45T480-420q62 0 123 15.5t127.921 44.694q31.301 14.126 50.19 40.966Q800-292 800-254v94H160Zm60-60h520v-34q0-16-9.5-30.5T707-306q-64-31-117-42.5T480-360q-57 0-111 11.5T252-306q-14 7-23 21.5t-9 30.5v34Zm260-321q39 0 64.5-25.5T570-631q0-39-25.5-64.5T480-721q-39 0-64.5 25.5T390-631q0 39 25.5 64.5T480-541Zm0-90Zm0 411Z"/>
        </svg>
    },
    // {
    //     'name': "概觀",
    //     "color": "rgb(var(--op-2))",
    //     'href': '/admin',
    //     'icon': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
    //         <path d="M120-240v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z"/>
    //     </svg>
    // },
]

export default function DashLayout({children}) {
    const [DrawerActive, setDrawerActive] = useState(false);
    const size = useWindowSize();

    const {data, error, isLoading} = useSWR('/api/user', fetcher)

    if (error) return <div>failed to load</div>
    if (isLoading) return <DashLayoutLoading children={children}/>

    function toggleActive() {
        setDrawerActive(!DrawerActive)
    }

    return (
        <AccountContext.Provider value={data}>
            <div className={`${styles.Navbar}`}>
                <div className={styles.left}>
                    {size.width < 800 &&
                        <span className={`material-icon ${styles.MenuIcon}`} onClick={toggleActive}>menu</span>}

                    <MotionLink
                        animate={{
                            backgroundPosition: ["0", "-400%", "0"]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 30,
                            times: [0, 0.5, 1],
                            ease: "linear",
                        }}
                        className={styles.TopTitle}
                        href={'/admin'}
                    >
                        {panel_info.name}
                    </MotionLink>
                </div>
                <div className={styles.center}>
                    {/*<TextInput placeholder={"搜尋"} className={styles.content}></TextInput>*/}
                </div>
                <div className={styles.right}>
                    {/*<UserComponent admin={data.admin}*/}
                    {/*               name={user.global_name}*/}
                    {/*               avatar={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`}/>*/}
                </div>
            </div>
            <SideBar user={data.dc} admin={data.admin} items={pages} active={DrawerActive || size.width > 800}
                     fh={size.width < 800}/>

            <main className={`${styles.main} ${size.width > 800 ? styles.left : ""}`}>
                {children}
            </main>
        </AccountContext.Provider>
    )
}

function DashLayoutLoading({children}) {
    const size = useWindowSize();
    return (
        <AccountContext.Provider value={null}>
            <div className={`${styles.Navbar}`}>
                <div className={styles.left}>
                    <MotionLink
                        animate={{
                            backgroundPosition: ["0", "-400%", "0"]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 30,
                            times: [0, 0.5, 1],
                            ease: "linear",
                        }}
                        className={styles.TopTitle}
                        href={'/dash'}
                    >
                        {panel_info.name}
                    </MotionLink>
                </div>
                <div className={styles.center}>
                </div>
                <div className={styles.right}>
                </div>
            </div>
            <SideBarLoading items={pages} active={size.width > 800} fh={size.width < 800}/>

            <main className={`${styles.main} ${size.width > 800 ? styles.left : ""}`}>
                {children}
            </main>
        </AccountContext.Provider>
    )
}