'use server'
import { cookies } from 'next/headers'
import React from 'react'
import fetch from 'node-fetch';
import {NextResponse} from "next/server";
import * as config from '@/public/auth/config';
import {get_user_data, logout} from "@/public/auth/auth";
import {redirect} from "next/navigation";

export async function GET(req) {
    const data = await logout()
    return redirect('/')
}