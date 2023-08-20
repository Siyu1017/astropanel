import { NextResponse } from 'next/server'
// import {admins} from "@/data/functions/config/config";

export async function middleware(request) {
    if (request.nextUrl.pathname.startsWith('/dash') || request.nextUrl.pathname.startsWith('/admin')) {
        try {
            const access_token = request.cookies.get('access_token').value
            if (!access_token){
                throw 'not auth'
            }
        } catch (e) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }
    // if (request.nextUrl.pathname.startsWith('/admin')) {
    //     try {
    //         if (!admins.includes(dc_uid.toString())){
    //             throw 'not admin'
    //         }
    //     } catch (e) {
    //         return NextResponse.redirect(new URL('/login', request.url))
    //     }
    // }
}