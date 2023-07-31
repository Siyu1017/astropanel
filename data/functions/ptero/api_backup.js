// warn: 這些東西估計是廢了，我要重寫一個
import {promises as fs} from 'fs';
import path from 'path';
import {get_user_data} from "@/data/functions/auth/auth";
import fetch from "node-fetch";
import * as config from "../config/config";

//local
const usersDirectory = path.join('data', 'functions', 'ptero', 'data', 'users');

async function create_local_user(password) {
    const user = await get_user_data()
    const data = {
        "name": user.name,
        "dcid": user.id.toString(),
        "pteroid": await find_user(user.email),
        "email": user.email,
        "res": {
            "servers": 2,
            "cpus": 200,
            "memories": 4096,
            "disc": 5120
        }
    }
    //Read the json data file data.json
    const fileContents = await fs.writeFile(usersDirectory + `/${user.id}.json`, JSON.stringify(data));
    return fileContents
}

async function find_local_user(id) {
    //Read the json data file data.json
    try {
        const fileContents = JSON.parse(await fs.readFile(usersDirectory + `/${id}.json`));
        return fileContents
    } catch (e) {
        throw e
    }
}

async function get_local_user_data() {
    const user = await get_user_data()
    //Read the json data file data.json
    try {
        const fileContents = JSON.parse(await fs.readFile(usersDirectory + `/${user.id}.json`));
        return fileContents
    } catch (e) {
        await create_local_user()
    }
}


//pterodactyl

async function create_user(email, username, firstname, lastname, password) {
    /*
        const user_data = await get_user_data()
        console.log(user_data)
        const resp = await create_user(user_data.email, user_data.username)
        */

    const params = new URLSearchParams();
    params.append('email', email);
    params.append('username', username);
    params.append('first_name', firstname ? firstname : username);
    params.append('last_name', lastname ? lastname : username);
    params.append('password', password ? password : makeid(10));
    const resp = await fetch(`${config.pterodactyl.url}api/application/users`, {
        "method": "POST",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Bearer ${config.pterodactyl.key}`,
        },
        "body": params
    })
    const json = await resp.json()
    return json
}

async function find_user(email) {
    const data = await get_all_user()
    let uid = null

    data.data.map(
        (e) => {
            console.log(e.attributes.email)
            if (e.attributes.email === email) {
                uid = e.attributes.id
            }
        }
    )

    if (uid == null) {
        const user_data = await get_user_data()
        uid = await create_user(user_data.email, user_data.username).id
    }

    return uid
}

async function get_all_user() {
    const resp = await fetch(`${config.pterodactyl.url}api/application/users`, {
        method: 'get',
        headers: {
            "Authorization": `Bearer ${config.pterodactyl.key}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });
    return resp.json()
}

async function get_ptero_user_data(id) {
    const resp = await fetch(`${config.pterodactyl.url}api/application/users/${id}`, {
        method: 'get',
        headers: {
            "Authorization": `Bearer ${config.pterodactyl.key}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });
    return resp.json()
}

async function get_user_server() {

}

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    console.log(result)
    return result;
}

export {
    create_user,
    create_local_user,
    find_user,
    find_local_user,
    get_local_user_data,
    get_ptero_user_data
}