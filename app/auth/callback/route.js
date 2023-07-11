'use server'
import React from 'react'
import {NextResponse} from "next/server";
import {auth_callback} from "@/data/functions/auth/auth";
import {redirect} from "next/navigation";

//這裡Discord已經給了代碼了，需要將它換成token，才能獲取使用者資料
export async function GET(req) {
    await auth_callback(req)
    return redirect('/dash')
}