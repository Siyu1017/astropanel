'use server'
import { cookies } from 'next/headers'
import React from 'react'
import fetch from 'node-fetch';
import {NextResponse} from "next/server";
import * as config from '@/public/auth/config';
import {get_user_data} from "@/public/auth/auth";

export async function GET(req) {
    const data = await get_user_data()

    return NextResponse.json({data})

}