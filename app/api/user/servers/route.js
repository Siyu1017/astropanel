import {NextResponse} from "next/server";
import {get_user_data} from "@/data/functions/auth/auth";
import {pteroserver, pterouser} from "@/data/functions/ptero/api";

export async function GET(req) {
    const dc_user = await get_user_data()
    const local_user = await pterouser.get_local(dc_user.id)

    const data = await pteroserver.get_by_u(local_user.ptero_id)

    return NextResponse.json(data)
}

export async function POST(req) {

    const req_data = await req.json()

    const data = await pteroserver.create({
        name: req_data.server_name,
        cpu: parseInt(req_data.cpu),
        disk: parseInt(req_data.disk),
        memory: parseInt(req_data.memory),
        node: parseInt(req_data.node),
        egg_id: parseInt(req_data.egg_id),
        docker_image: req_data.docker_image,
        startup:req_data.startup,
        environment:req_data.environment
    })

    // console.log(data)

    return NextResponse.json(data)
}