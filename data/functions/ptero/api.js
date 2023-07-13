import fetch from "node-fetch";
import * as config from "./data/config";

async function get_request(url) {
    console.log(`${config.pterodactyl.url}${url}`)
    const resp = await fetch(`${config.pterodactyl.url}${url}`, {
        method: 'get',
        headers: {
            "Authorization": `Bearer ${config.pterodactyl.key}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });
    return resp.json()
}

async function post_request(url, props) {
    const params = new URLSearchParams();

    Object.entries(props).map(e => {
        const [name, value] = e
        params.append(name, value.toString());
    })

    console.log(`${config.pterodactyl.url}${url}`)
    const resp = await fetch(`${config.pterodactyl.url}${url}`, {
        "method": "POST",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Bearer ${config.pterodactyl.key}`,
        },
        "body": params
    })
    return resp.json()
}

const pterouser = {
    get_all: async function () {
        return await get_request(`api/application/users`)
    },
    get: async function (email) {
        const data = await pterouser.get_all()
        let user = null

        data.data.map(
            (e) => {
                console.log(e.attributes.email)
                if (e.attributes.email === email) {
                    user = e.attributes
                }
            }
        )

        return user
    },
    create: async function (email, username, firstname, lastname, password) {
        const json = {
            email: email,
            username: username,
            first_name: firstname ? firstname : username,
            last_name: lastname ? lastname : username,
            password: password ? password : makeid(10),
        }

        return await post_request('api/application/users', json)

    }
};

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
    pterouser
}