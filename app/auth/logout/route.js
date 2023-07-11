'use server'
import React from 'react'
import {get_user_data, logout} from "@/data/functions/auth/auth";
import {redirect} from "next/navigation";

export async function GET(req) {
    const data = await logout()
    return redirect('/')
}