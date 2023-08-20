import fetch from "node-fetch";
import * as config from "@/data/functions/config/config";
import {admins, default_limit} from "@/data/functions/config/config";
import {promises as fs} from "fs";
import path from "path";
import {get_user_data} from "@/data/functions/auth/auth";

const usersDirectory = path.join('data', 'functions', 'ptero', 'data', 'users');

let busy = []

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
    const params = new URLSearchParams(props);
    console.log(params)

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

async function patch_request(url, props) {
    const params = new URLSearchParams();

    Object.entries(props).map(e => {
        const [name, value] = e
        params.append(name, value.toString());
    })

    console.log(`${config.pterodactyl.url}${url}`)
    const resp = await fetch(`${config.pterodactyl.url}${url}`, {
        "method": "PATCH",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Bearer ${config.pterodactyl.key}`,
        },
        "body": params
    })
    return resp.json()
}

async function delete_request(url) {
    console.log(`${config.pterodactyl.url}${url}`)
    const resp = await fetch(`${config.pterodactyl.url}${url}`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${config.pterodactyl.key}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });
}

function make_id(length) {
    let result = '';
    const characters = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    console.log(result)
    return result;
}

const pterouser = {
    used_res: async function (servers) {
        let used_res = {
            servers: 0,
            cpus: 0,
            memories: 0,
            disks: 0
        }

        servers.map((e) => {
            used_res.servers += 1
            used_res.cpus += e.limits.cpu
            used_res.memories += e.limits.memory
            used_res.disks += e.limits.disk
        })

        return used_res
    },
    get_all: async function () {
        return await get_request(`api/application/users`)
    },
    get: async function (uid) {
        const data = await get_request(`api/application/users/${uid}`)

        return data.attributes
    },
    get_by_email: async function (email) {
        const data = await get_request(`api/application/users?filter[email]=${email}`)

        if (data.meta.pagination.total !== 0) {
            return data.data[0].attributes
        }

        return null
    },
    get_local: async function (dc_uid) {
        try {
            return JSON.parse(await fs.readFile(usersDirectory + `/${dc_uid}.json`, {encoding: 'utf8'}))
        } catch (e) {
            return 'err'
        }
    },
    create: async function (email, username, password, firstname, lastname) {
        const json = {
            email: email,
            username: username,
            first_name: firstname ? firstname : username,
            last_name: lastname ? lastname : username,
            password: password,
        }

        return await post_request('api/application/users', json)
    },
    create_local: async function ({email, username, id}) {
        const data = {
            "name": username,
            "dc_id": id.toString(),
            "ptero_id": (await pterouser.get_by_email(email)).id,
            "email": email,
            "res": {
                "servers": default_limit.servers,
                "cpus": default_limit.cpus,
                "memories": default_limit.memories,
                "disk": default_limit.disk
            },
            "pass": make_id(10)
        }

        await fs.writeFile(usersDirectory + `/${id}.json`, JSON.stringify(data));
        return data
    },
    reset_pwd: async function (user) {
        let data = JSON.parse(await fs.readFile(usersDirectory + `/${user.id}.json`, {encoding: 'utf8'}));

        data.pass = make_id(10)

        await fs.writeFile(usersDirectory + `/${user.id}.json`, JSON.stringify(data));

        return await patch_request('api/application/users', {"password": data.pass})
    },
    find_error: async function (user) {
        try {
            const data = await fs.readFile(usersDirectory + `/${user.id}.json`, {encoding: 'utf8'});
            try {
                const json = JSON.parse(data)

                try {
                    const keys = [
                        "name",
                        "dc_id",
                        "ptero_id",
                        "email",
                        "res",
                        "pass"
                    ]
                    keys.map((e) => {
                        if (!json.hasOwnProperty(e)) {
                            throw {name: 'no-key', code: e}
                        }
                    })

                    const keys_res = [
                        'servers',
                        'cpus',
                        'memories',
                        'disk',
                    ]

                    keys_res.map((e) => {
                        if (!json.res.hasOwnProperty(e)) {
                            throw {name: 'no-key', code: e}
                        }
                    })

                } catch (e) {
                    if (e.name === 'no-key') {
                        return {ok: false, msg: "data-incomplete", code: e.code}
                    } else {
                        return {ok: false, msg: "data-unknown", code: e.name}
                    }
                }

                const data2 = await get_request(`api/application/users?filter[email]=${user.email}`)
                if (data2.meta.pagination.total === 0) {
                    await this.create(user.email, user.username, json.pass)
                    return await this.find_error(user)
                }

            } catch (e) {
                if (e.name === 'SyntaxError') {
                    return {ok: false, msg: "json-syntax-error"}
                } else {
                    return {ok: false, msg: "json-unknown", code: e.name}
                }
            }
        } catch (err) {
            if (err.code === 'ENOENT') {
                // file does not exist
                await this.create_local({email: user.email, username: user.username, id: user.id})
                return await this.find_error(user)
            } else {
                return {ok: false, msg: "file-unknown", code: err.code}
            }
        }
        return {ok: true}
    },
    is_admin: async function (dc_uid) {
        return admins.includes(dc_uid.toString()) === true
    },
};

const pteroserver = {
    get_all: async function () {
        return await get_request(`api/application/servers`)
    },
    get_by_u: async function (uid) {
        const data = await get_request(`api/application/servers`)
        const servers = []
        data.data.map((e) => {
            if (e.attributes.user === uid) {
                e.attributes.url = `${config.pterodactyl.url}server/${e.attributes.identifier}`
                servers.push(e.attributes)
            }
        })
        return servers
    },
    get_by_id: async function (id) {
        const data = await get_request(`api/application/servers/${id}`)
        data.attributes.url = `${config.pterodactyl.url}server/${data.attributes.identifier}`
        return data
    },
    create: async function ({name, cpu, disk, memory, node, egg_id, docker_image, startup, environment}) {
        const user = await pterouser.get_local((await get_user_data()).id)
        const servers = await pteroserver.get_by_u(user.ptero_id)
        const used_res = await pterouser.used_res(servers)
        const res = user.res

        if (cpu > res.cpus - used_res.cpus) return {ok: false, msg: "no_enough_cpu"}
        if (memory > res.memories - used_res.memories) return {ok: false, msg: "no_enough_memory"}
        if (disk > res.disk - used_res.disks) return {ok: false, msg: "no_enough_disk"}
        if (res.servers - used_res.servers <= 0) return {ok: false, msg: "no_enough_servers"}

        let port

        for (let i = 1; true; i++) {
            console.log(i)
            const ports = await get_request(`api/application/nodes/${node}/allocations?page=${i}`)

            for (const e of ports.data) {
                if (!e.attributes.assigned) {
                    port = e.attributes.id
                    console.log(e.attributes.id)
                    break
                }
            }

            if (port) {
                break
            }

            if (!ports.meta.pagination.links.next) {
                break
            }
        }

        const payload = {
            "name": name,
            "user": user.ptero_id,
            "egg": egg_id,
            "docker_image": docker_image,
            "startup": startup,
            "environment": environment,
            "limits": {
                "memory": memory,
                "swap": 0,
                "disk": disk,
                "io": 500,
                "cpu": cpu
            },
            "feature_limits": {
                "databases": config.feature_limits.databases,
                "backups": config.feature_limits.backups
            },
            "allocation": {
                "default": port
            }
        }

        // const data = await post_request('api/application/servers', payload)

        const data = await (await fetch(`${config.pterodactyl.url}api/application/servers`, {
            "method": "POST",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${config.pterodactyl.key}`,
            },
            "body": JSON.stringify(payload)
        })).json()

        console.log(data)

        return {ok: true, data: data}
    },
    edit: async function (id, params) {
        await fetch(`${config.pterodactyl.url}api/application/servers/${id}/build`, {
            "method": "PATCH",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${config.pterodactyl.key}`,
            },
            "body": JSON.stringify(params)
        })
    },
    delete: async function (id) {
        await delete_request(`api/application/servers/${id}`)
        return true
    },
    get_eggs: async function () {
        return JSON.parse(await fs.readFile(path.join('data', 'functions', 'config') + `/eggs.json`, {encoding: 'utf8'}))
    },
};

const pteroadmin = {
    get_users: async function () {
        const users = []
        for (const filename of await fs.readdir(usersDirectory)) {
            const data = JSON.parse(await fs.readFile(usersDirectory + `/${filename}`, {encoding: 'utf8'}))
            users.push({
                name: data.name,
                email: data.email,
                dc_id: data.dc_id,
                ptero_id: data.ptero_id,
                admin: await pterouser.is_admin(data.dc_id)
            })
        }
        return users
    },
    get_user: async function (dc_id) {
        const data = JSON.parse(await fs.readFile(usersDirectory + `/${dc_id}.json`, {encoding: 'utf8'}))
        return {
            name: data.name,
            email: data.email,
            dc_id: data.dc_id,
            ptero_id: data.ptero_id,
            admin: await pterouser.is_admin(data.dc_id)
        }
    },
};


export {
    pterouser,
    pteroserver,
    pteroadmin,
}