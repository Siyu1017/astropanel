import React from 'react'
import {auth_callback, get_user_data} from "@/data/functions/auth/auth";
import {redirect} from "next/navigation";
import {pterouser} from "@/data/functions/ptero/api";

//這裡Discord已經給了代碼了，需要將它換成token，才能獲取使用者資料
export async function GET(req) {
    await auth_callback(req)

    //確認有登入了，檢查資料完整
    const user = await get_user_data()
    const status = await pterouser.find_error(user)
    console.log(status.ok)
    if (!status.ok) {
        return redirect('/auth/error')
    }

    return redirect('/dash')
}