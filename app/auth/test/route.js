'use server'
import React from 'react'
import {NextResponse} from "next/server";
import {pterouser} from "@/data/functions/ptero/api";

export async function GET(req) {
    const resp = await pterouser.create('liyoujun600@gmail.com', 'adadadad')
    console.log(resp)

    return NextResponse.json({resp})
}