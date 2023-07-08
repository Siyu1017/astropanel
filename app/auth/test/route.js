'use server'
import React from 'react'
import {NextResponse} from "next/server";
import fetch from "node-fetch";
import {create_user} from "@/public/ptero/api";
import {get_user_data} from "@/public/auth/auth";

export async function GET(req) {
    // const resp = await create_local_user()
    // return NextResponse.json({resp})

    const user_data = await get_user_data()
    const resp = await create_user(user_data.email, user_data.username)
    console.log(resp)

    return NextResponse.json({resp})
}