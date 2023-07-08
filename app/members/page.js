"use client"
import styles from './page.module.scss'
import {AnimatePresence, LayoutGroup, motion} from "framer-motion";
import Footer from "@/data/components/Footer";
import Member from "@/data/components/Member";
import {useState} from "react";

const members = [
    {
        "title": "擁有者",
        "members": [
            {"avatar": "/avatars/asteroid.png", "name": "Asteroid", "uname": "asteroid_owo", "about": <>Asteroid，又名AD，象徵著創造力、冒險和夢想。就像一顆彗星劃過黑暗的夜空，它的存在也將為人們帶來希望和啟發。<br/>🪐　.　　   .˚ 　.　 ✦˚　　 　　.　　˚<br/>. ✦　　˚　.🌍　　　. ✦ 　　　.<br/>. ✦　    。　˚　.         　　　. ✦ 　　　.</>},
            {"avatar": "/avatars/phdassice.gif", "name": "博士助理_YT", "uname": "phdassice", "about": <>歡迎加入Jetta商城<br/>能幫您搞定代購事務</>},
        ]
    },
    {
        "title": "管理員",
        "members": [
            {"avatar": "/avatars/allenmc_tw.png", "name": "allen", "uname": "allenmc_tw", "about": <>allenpixel 伺服器創辦者<br/>allenpixel 活動主導者<br/>allenpixel 程式員<br/>allenpixel 網站創辦者</>},
            {"avatar": "/avatars/nekotw.png", "name": "Neko no akuma", "uname": "nekotw", "about": <a href={'https://mycard.lol/card/800008078032502785'}>https://mycard.lol/card/800008078032502785</a>},
        ]
    },
    {
        "title": "翻譯",
        "members": [
            {"avatar": "/avatars/octikcok.png", "name": "octikcok", "uname": "octikcok", "about": <>我的DC群https://discord.gg/qb9gFxHmSV<br/>**個人身分組：<br/>🟢全端工程師<br/><br/>我一定很惹人厭吧...<br/>有我在的地方就有爭吵 那...我還是不說話好了</>},
            {
                "avatar": "/avatars/xiaolong._.0418.png",
                "name": "小龍Xiaolong",
                "uname": "xiaolong._.0418",
                "about": <>淺月物語棒棒的minecarft伺服器<br/>HimSevrer超好的託管<br/><br/>我的身分組:<br/>🟠｜擁有者 🟡｜小龍Xiaolong</>
            },
        ]
    },
    {
        "title": "IT 技術支援 合作夥伴 ......",
        "members": [
            {"avatar": "/avatars/wei3c.png", "name": "WEI3C", "uname": "wei3c", "about": <>自介：網站 WEI3C網站創作者<br/>YouTubeWei科技X生活 創作者<br/>IG：WEIC<br/>WEI3C創作者合作主辦方<br/>WEI3C創作者認證主辦方<br/>Asteroid Host   IT<br/>代架網站<br/>小龍蝦-遊戲網站<br/>阿吧玩遊戲-網站<br/>allenpixel v2（網站協作）                                                                                                                                                                                             經歷過DDoS攻擊耗時3小時救回</>},
        ]
    }
]

export default function Home() {

    const [index, setIndex] = useState({'null': null});

    return (<main className={styles.main}>
        <div className={styles.Hero}>
            <motion.iframe
                initial={{filter: "brightness(0)"}}
                animate={{filter: "brightness(50%)"}}
                transition={{ease: "easeOut", duration: 2, delay: 3}}

                width="560" height="315"
                src="https://www.youtube.com/embed/lRTtMcx6rSM?controls=0&autoplay=1&mute=1&playsinline=1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
            ></motion.iframe>

            <motion.div
                initial={{
                    width: 0, opacity: 0
                }}
                animate={{
                    width: "", opacity: 1
                }}
                transition={{
                    duration: 2, ease: "easeOut",
                }}
                className={styles.Title}>
                Asteroid Host 團隊
            </motion.div>

        </div>


        <LayoutGroup>
            {members.map((e, i) => {
                return (<motion.div className={styles.Members} key={i}>
                    <div className={styles.Title}>{e.title}</div>
                    <div className={styles.Members}>
                        {e.members.map((el, ind) => {
                            return <Member avatar={el.avatar} name={el.name} uname={el.uname} key={ind}
                                           props={{
                                               layoutId: el.uname,
                                               onClick: () => setIndex({...el, 'lid': el.uname})
                                           }}>{el.about}</Member>
                        })}
                    </div>
                </motion.div>)
            })}

            <AnimatePresence>
                {index.null !== null && (<>
                    <motion.div
                        variants={{
                            hidden: {
                                backdropFilter: "blur(0)",
                                transition: {
                                    duration: 0.16
                                }
                            },
                            visible: {
                                backdropFilter: "blur(10px)",
                                transition: {
                                    delay: 0.04,
                                    duration: 0.2
                                }
                            }
                        }}
                        initial="hidden"
                        exit="hidden"
                        animate="visible"
                        onClick={() => setIndex({'null': null})}
                        className={styles.c}>

                        <Member className={styles.popup} avatar={index.avatar} name={index.name} uname={index.uname} about={true}
                                props={{
                                    key: "modal",
                                    layoutId: index.lid,
                                }}>{index.about}</Member>
                    </motion.div>
                </>)}
            </AnimatePresence>
        </LayoutGroup>

        <Footer/>
    </main>)
}
