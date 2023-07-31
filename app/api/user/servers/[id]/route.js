import {NextResponse} from "next/server";
import {get_user_data} from "@/data/functions/auth/auth";
import {pteroserver, pterouser} from "@/data/functions/ptero/api";

export async function GET(req, { params }) {
    const id = params.id

    const dc_user = await get_user_data()
    const local_user = await pterouser.get_local(dc_user.id)

    const data = (await pteroserver.get_by_id(id)).attributes

    console.log(data)

    if (data.user === local_user.ptero_id) {
        return NextResponse.json(data)
    }

    return NextResponse.json({'error': 'not your server'})
}


export async function DELETE(req, { params }) {
    const id = params.id

    const dc_user = await get_user_data()
    const local_user = await pterouser.get_local(dc_user.id)

    const data = (await pteroserver.get_by_id(id)).attributes

    console.log(data)

    if (data.user === local_user.ptero_id) {
        await pteroserver.delete(id)

        return NextResponse.json({ok:true})
    }

    return NextResponse.json({'error': 'not your server'})
}


export async function PATCH(req, { params }) {
    const id = params.id

    const dc_user = await get_user_data()
    const local_user = await pterouser.get_local(dc_user.id)

    const data = (await pteroserver.get_by_id(id)).attributes
    console.log(data)

    if (data.user === local_user.ptero_id) {
        const req_data = await req.json()
        const payload = {
            // "name": req_data.name,
            "allocation": parseInt(req_data.ore_data.allocation),
            "memory": parseInt(req_data.memory),
            "swap": 0,
            "disk": parseInt(req_data.disk),
            "io": 500,
            "cpu": parseInt(req_data.cpu),
            "threads": null,
            "feature_limits": req_data.ore_data.feature_limits
        }

        console.log(payload)
        await pteroserver.edit(id, payload)

        return NextResponse.json({ok:true})
    }

    return NextResponse.json({'error': 'not your server'})
}