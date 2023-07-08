import '@/data/style/globals.scss'
import styles from './layout.module.scss'
import SideBar from "@/data/components/SideBar";
import {MotionLink} from "@/data/components/MotionLink/MotionLink";
import {get_user_data} from "@/public/auth/auth";
import UserComponent from "data/components/UserComponent";

const pages = [
    {
        'name': "概觀",
        "color": "rgb(var(--op-1))",
        'href': '/dash',
        'icon': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path
                d="M220-180h150v-250h220v250h150v-390L480-765 220-570v390Zm-60 60v-480l320-240 320 240v480H530v-250H430v250H160Zm320-353Z"/>
        </svg>
    },
    {
        'name': "新增伺服器",
        "color": "rgb(var(--op-2))",
        'href': '/dash/add',
        'icon': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path
                d="M286.882-717Q266-717 251.5-702.382q-14.5 14.617-14.5 35.5Q237-646 251.618-631.5q14.617 14.5 35.5 14.5Q308-617 322.5-631.618q14.5-14.617 14.5-35.5Q337-688 322.382-702.5q-14.617-14.5-35.5-14.5Zm0 414Q266-303 251.5-288.382q-14.5 14.617-14.5 35.5Q237-232 251.618-217.5q14.617 14.5 35.5 14.5Q308-203 322.5-217.618q14.5-14.617 14.5-35.5Q337-274 322.382-288.5q-14.617-14.5-35.5-14.5ZM154-839h651q16 0 25.5 9.5t9.5 25.813V-535q0 17.425-9.5 29.212Q821-494 805-494H154q-15 0-24.5-11.788Q120-517.575 120-535v-268.687q0-16.313 9.5-25.813T154-839Zm26 60v225h600v-225H180Zm-26 353h647q15 0 27 12.5t12 28.527V-121q0 20-12 30.5T801-80H159q-16 0-27.5-10.5T120-121v-263.973q0-16.027 9.5-28.527T154-426Zm26 60v226h600v-226H180Zm0-413v225-225Zm0 413v226-226Z"/>
        </svg>
    },
    {
        'name': "資源商店",
        "color": "rgb(var(--op-3))",
        'href': '/dash/shop',
        'icon': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path
                d="M286.788-81Q257-81 236-102.212q-21-21.213-21-51Q215-183 236.212-204q21.213-21 51-21Q317-225 338-203.788q21 21.213 21 51Q359-123 337.788-102q-21.213 21-51 21Zm400 0Q657-81 636-102.212q-21-21.213-21-51Q615-183 636.212-204q21.213-21 51-21Q717-225 738-203.788q21 21.213 21 51Q759-123 737.788-102q-21.213 21-51 21ZM235-741l110 228h288l125-228H235Zm-30-60h589.074q22.964 0 34.945 21Q841-759 829-738L694-495q-11 19-28.559 30.5Q647.881-453 627-453H324l-56 104h491v60H277q-42 0-60.5-28t.5-63l64-118-152-322H51v-60h117l37 79Zm140 288h288-288Z"/>
        </svg>
    },
    {
        'name': "兌換代碼",
        "color": "rgb(var(--op-4))",
        'href': '/dash/code',
        'icon': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path d="M600-160v-60h140v-520H600v-60h200v640H600Zm-440 0v-640h200v60H220v520h140v60H160Z"/>
        </svg>
    },
]

export default async function DashLayout({children}) {
    // const user = await get_user_data()
    const user = {
        id: '881312396784840744',
        username: 'asteroid_owo',
        global_name: 'Asteroid',
        avatar: '54910436c024eb7f1f5e09b4c1e75f05',
        discriminator: '0',
        public_flags: 4194368,
        flags: 4194368,
        banner: null,
        banner_color: '#88c9f9',
        accent_color: 8964601,
        locale: 'en-US',
        mfa_enabled: false,
        premium_type: 0,
        avatar_decoration: null,
        email: 'liyoujun600@gmail.com',
        verified: true
    }

    return (
        <>
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
                        href={'/'}
                    >
                        Asteroid Host
                    </MotionLink>
                </div>
                <div className={styles.center}>
                    {/*<TextInput placeholder={"搜尋"} className={styles.content}></TextInput>*/}
                </div>
                <div className={styles.right}>
                    <UserComponent name={user.global_name}
                                   avatar={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`}/>
                </div>
            </div>
            <SideBar items={pages}/>

            <main className={styles.main}>
                {children}
            </main>
        </>
    )
}
