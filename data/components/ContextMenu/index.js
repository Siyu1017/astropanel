"use client"
import styles from "./style.module.scss"
import {useEffect, useRef} from "react";

const ContextMenuButton = [
  {
    type: "button",
    name: "複製",
    function: {
      type: "execCommand",
      cmd: "copy"
    },
    icon: "content_copy",
    hotkey: "Ctrl + C"
  },
  {type: "ClipLine"},
  {
    type: "button",
    name: "剪下",
    function: {
      type: "execCommand",
      cmd: "cut"
    },
    icon: "cut",
    hotkey: "Ctrl + X"
  },
  {
    type: "button",
    name: "貼上",
    function: {
      type: "execCommand",
      cmd: "paste"
    },
    icon: "content_paste",
    hotkey: "Ctrl + V"
  },
]

function mapButton(e, i) {
  if (e.type === "button") {
    let onClick

    if (e.function.type === "execCommand") {
      onClick = () => document.execCommand(e.function.cmd)
    } else {
      onClick = e.function.cmd
    }
    
    return <button onMouseDown={onClick} hover-tips={e.name} key={i}>
      <span className={`material-icon ${styles.icon}`}>{e.icon}</span>
      <div hover-tips={"!parent"} className={styles["name"]}>{e.name}</div>
      <div hover-tips={"!parent"} className={styles["hotkey"]}>{e.hotkey || ""}</div>
    </button>
  } else if (e.type === "ClipLine") {
    return <div className={styles["ClipLine"]}></div>
  }
}

export default function ContextMenu(props) {
  const menuRef = useRef(null);
  useEffect(() => {
    // https://codepen.io/ryanmorr/pen/JdOvYR
    function showMenu(x, y) {
      menuRef.current.style.left = x + 'px';
      menuRef.current.style.top = y + 'px';
      menuRef.current.classList.add(styles.show);
    }

    function hideMenu() {
      menuRef.current.classList.remove(styles.show);
    }

    function onContextMenu(e) {
      e.preventDefault();
      showMenu(e.pageX, e.pageY);
      document.addEventListener('mousedown', onMouseDown, false);
    }

    function onMouseDown() {
      hideMenu();
      document.removeEventListener('mousedown', onMouseDown);
    }

    document.addEventListener('contextmenu', onContextMenu, false);

    document.addEventListener("keydown", ({key}) => {
      if (key === "Escape") {
        onMouseDown()
      }
    })
  })

  return (
    <>
      <div ref={menuRef} id={styles["menu"]}>
        {ContextMenuButton.map(mapButton)}
        {props.otherButton ? <div className={styles["ClipLine"]}></div> : ""}
        {props.otherButton ? props.otherButton.map(mapButton) : ""}
      </div>
    </>
  )
}