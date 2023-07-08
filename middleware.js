import { NextResponse } from 'next/server'

export async function middleware(request) {
    if (request.nextUrl.pathname.startsWith('/dash')) {
        try {
            const access_token = request.cookies.get('access_token').value
            if (!access_token){
                throw 'not auth'
            }
        } catch (e) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }
}