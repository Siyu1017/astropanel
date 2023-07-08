"use client"

import {useEffect, useRef, useState} from "react"
import styles from "./style.module.scss"

export default function HoverTips() {
    const [tipsText, setTipsText] = useState("owo")
    const [hasMoreTips, setHasMoreTips] = useState(false)

    const tips = useRef(null)
    const tipsInner = useRef(null)
    const tipsMore = useRef(null)

    useEffect(() => {
        document.addEventListener('mousemove', HandleMouseMove);
        document.addEventListener('keydown', keyEvent);
        document.addEventListener('keyup', keyEvent);
    }, [])

    function keyEvent(event) {
        tips.current.classList.toggle(styles.noupdate, event.ctrlKey)
    }

    function HandleMouseMove(e) {
        try {
            const tipsEl = tips.current;
            if (!tipsEl.classList.contains(styles.noupdate)) {
                let hoverElement = document.elementFromPoint(e.clientX, e.clientY);
                const tipsEl = tips.current;
                if (hoverElement.hasAttribute('hover-tips')) {
                    while (hoverElement.getAttribute("hover-tips") === '!parent') {
                        hoverElement = hoverElement.parentNode;
                    }
                    setTipsText(hoverElement.getAttribute("hover-tips"));

                    const firstChild = hoverElement.firstElementChild;
                    if (firstChild) {
                        if (firstChild.tagName.toLowerCase() === "tips") {
                            setHasMoreTips(true)
                            tipsMore.current.innerHTML = firstChild.innerHTML;
                        } else {
                            setHasMoreTips(false)
                        }
                    } else {
                        setHasMoreTips(false)
                    }

                    tipsEl.classList.add(styles.active)

                    tipsEl.style.width = tipsInner.current.offsetWidth + 20 + 'px';
                    tipsEl.style.height = tipsInner.current.offsetHeight + 20 + 'px';

                    tipsEl.style.left = `${e.clientX + 20}px`;

                    tipsEl.style.top = `${e.clientY + 20}px`;

                    // tipsEl.style.transform = `${window.innerWidth - e.clientX < tipsEl.offsetWidth?"translateX(calc(-100%-20px))":""},
                    //                           ${window.innerHeight - e.clientY < tipsEl.offsetHeight?"translateY(calc(-100%-20px))":""}`
                    tipsEl.style.transform = `translate(${window.innerWidth - e.clientX < tipsEl.offsetWidth ? "calc(-100% - 40px)" : "0"},
                                  ${window.innerHeight - e.clientY < tipsEl.offsetHeight ? "calc(-100% - 40px)" : "0"})`
                    //tipsEl.style.transform = "translate(calc(-100% - 20px), -100%)"
                } else {
                    tipsEl.classList.remove(styles.active)

                    tipsEl.style.width = "";
                    tipsEl.style.height = "";
                }
            }
        } finally {

        }
    }


    return (<>
        <div ref={tips} id={styles["HoverTips"]}>
            <div ref={tipsInner} id={styles["TipsInner"]}>
                <p className={styles.title}>{tipsText}</p>
                <div ref={tipsMore} id={styles["tipsMore"]} className={hasMoreTips ? styles.active : ""}></div>
            </div>
        </div>
    </>)
}