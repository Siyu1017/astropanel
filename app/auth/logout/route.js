import React from 'react'
import {logout} from "@/data/functions/auth/auth";
import {redirect} from "next/navigation";

export async function GET(req) {
    await logout()
    return redirect('/')
}