'use server'
import React from 'react'
import {NextResponse} from "next/server";
import {pteroserver, pterouser} from "@/data/functions/ptero/api";

export async function GET(req) {
    const resp = await pteroserver.get_all()
    console.log(resp)

    return NextResponse.json({resp})
}