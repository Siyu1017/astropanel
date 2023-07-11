import * as config from "@/data/functions/auth/config";
import {cookies} from "next/headers";

async function auth_callback(req) {
    //拿到discord傳回的code
    const {searchParams} = new URL(req.url)
    const code = searchParams.get('code')

    //這邊要做成網址的get形式，Discord只支持這種
    const params = new URLSearchParams();
    params.append('client_id', config.discord.client_id);
    params.append('client_secret', config.discord.client_secret);
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', config.discord.redirect_uri);
    params.append('scope', 'guilds identify email');
    const response = await fetch('https://discord.com/api/v10/oauth2/token', {
        method: 'post',
        body: params,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });

    const data = await response.json();

    cookies().set('access_token', data.access_token)
    cookies().set('refresh_token', data.refresh_token)

    return data
}

async function get_user_data() {
    try {
        const access_token = cookies().get('access_token').value
        const response = await fetch('https://discordapp.com/api/users/@me', {
            method: 'get',
            headers: {Authorization: `Bearer ${access_token}`}
        });
        return await response.json()
    } catch (e) {
        throw e
        //return undefined
    }
}

async function logout() {
    //刪除所有cookie
    cookies().set({
        name: 'access_token',
        value: '',
        expires: 0,
        path: '/',
    })
    cookies().set({
        name: 'refresh_token',
        value: '',
        expires: 0,
        path: '/',
    })
}

function get_login_link(){
    return `https://discordapp.com/api/oauth2/authorize?client_id=${config.discord.client_id}&redirect_uri=${config.discord.redirect_uri}&response_type=code&scope=guilds%20identify%20email`
}

async function is_authed() {
    try {
        const access_token = cookies().get('access_token').value
        if (!access_token){
            throw 'not auth'
        }
    } catch (e) {
        return false
    }
    return true
}

export {
    auth_callback,
    get_user_data,
    get_login_link,
    logout,
    is_authed
}