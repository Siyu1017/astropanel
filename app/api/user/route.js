import {NextResponse} from "next/server";
import {get_user_data} from "@/data/functions/auth/auth";
import {pteroserver, pterouser} from "@/data/functions/ptero/api";

export async function GET(req) {
    const dc_user = await get_user_data()
    const local_user = await pterouser.get_local(dc_user.id)
    const ptero_user = await pterouser.get(local_user.ptero_id)
    const servers = await pteroserver.get_by_u(local_user.ptero_id)
    const used_res = await pterouser.used_res(servers)

    const data = {
        dc: dc_user,
        ptero: ptero_user,
        local: local_user,
        servers: servers,
        used_res: used_res,
        admin: await pterouser.is_admin(dc_user.id)===true
    }

    return NextResponse.json(data)
}