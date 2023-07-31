"use client"
import styles from './page.module.scss'
import StatsCard from "data/components/StatsCard";
import ServerLink from "@/data/components/ServerLink";
import TextInput from "data/components/TextInput";
import Button from "@/data/components/Button";

const loading = {
    opacity:.5
}

export default function LoadingDash() {

    return (
        <>
            <section style={loading}>
                <div className={styles.Title}>資源</div>
                <div className={styles.Stats}>
                    <StatsCard name={'---'} used={"-"} max={"-"} unit={'-'}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                            <path xmlns="http://www.w3.org/2000/svg"
                                  d="M207.858-432Q188-432 174-446.142q-14-14.141-14-34Q160-500 174.142-514q14.141-14 34-14Q228-528 242-513.858q14 14.141 14 34Q256-460 241.858-446q-14.141 14-34 14Zm272 0Q460-432 446-446.142q-14-14.141-14-34Q432-500 446.142-514q14.141-14 34-14Q500-528 514-513.858q14 14.141 14 34Q528-460 513.858-446q-14.141 14-34 14Zm272 0Q732-432 718-446.142q-14-14.141-14-34Q704-500 718.142-514q14.141-14 34-14Q772-528 786-513.858q14 14.141 14 34Q800-460 785.858-446q-14.141 14-34 14Z"/>
                        </svg>
                    </StatsCard>
                    <StatsCard name={'---'} used={"-"} max={"-"} unit={'-'}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                            <path xmlns="http://www.w3.org/2000/svg"
                                  d="M207.858-432Q188-432 174-446.142q-14-14.141-14-34Q160-500 174.142-514q14.141-14 34-14Q228-528 242-513.858q14 14.141 14 34Q256-460 241.858-446q-14.141 14-34 14Zm272 0Q460-432 446-446.142q-14-14.141-14-34Q432-500 446.142-514q14.141-14 34-14Q500-528 514-513.858q14 14.141 14 34Q528-460 513.858-446q-14.141 14-34 14Zm272 0Q732-432 718-446.142q-14-14.141-14-34Q704-500 718.142-514q14.141-14 34-14Q772-528 786-513.858q14 14.141 14 34Q800-460 785.858-446q-14.141 14-34 14Z"/>
                        </svg>
                    </StatsCard>
                    <StatsCard name={'---'} used={"-"} max={"-"} unit={'-'}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                            <path xmlns="http://www.w3.org/2000/svg"
                                  d="M207.858-432Q188-432 174-446.142q-14-14.141-14-34Q160-500 174.142-514q14.141-14 34-14Q228-528 242-513.858q14 14.141 14 34Q256-460 241.858-446q-14.141 14-34 14Zm272 0Q460-432 446-446.142q-14-14.141-14-34Q432-500 446.142-514q14.141-14 34-14Q500-528 514-513.858q14 14.141 14 34Q528-460 513.858-446q-14.141 14-34 14Zm272 0Q732-432 718-446.142q-14-14.141-14-34Q704-500 718.142-514q14.141-14 34-14Q772-528 786-513.858q14 14.141 14 34Q800-460 785.858-446q-14.141 14-34 14Z"/>
                        </svg>
                    </StatsCard>
                    <StatsCard name={'---'} used={"-"} max={"-"} unit={'-'}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                            <path xmlns="http://www.w3.org/2000/svg"
                                  d="M207.858-432Q188-432 174-446.142q-14-14.141-14-34Q160-500 174.142-514q14.141-14 34-14Q228-528 242-513.858q14 14.141 14 34Q256-460 241.858-446q-14.141 14-34 14Zm272 0Q460-432 446-446.142q-14-14.141-14-34Q432-500 446.142-514q14.141-14 34-14Q500-528 514-513.858q14 14.141 14 34Q528-460 513.858-446q-14.141 14-34 14Zm272 0Q732-432 718-446.142q-14-14.141-14-34Q704-500 718.142-514q14.141-14 34-14Q772-528 786-513.858q14 14.141 14 34Q800-460 785.858-446q-14.141 14-34 14Z"/>
                        </svg>
                    </StatsCard>
                </div>
            </section>

            <section style={loading}>
                <div className={styles.Title}>所有伺服器</div>
                <div className={styles.Servers}>
                    <ServerLink name={"..."} id={"..."} url={"#"}/>
                    <ServerLink name={"..."} id={"..."} url={"#"}/>
                    <ServerLink name={"..."} id={"..."} url={"#"}/>
                </div>
            </section>

            <section style={loading}>
                <div className={styles.Title}>使用者</div>
                <div className={styles.User}>
                    <TextInput readonly={true} placeholder={'...'}/>
                    <TextInput readonly={true} placeholder={'...'}/>
                    <Button className={`button ${styles.Button}`}>重設密碼</Button>
                </div>
            </section>
        </>
    )
}
