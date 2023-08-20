import {NextResponse} from "next/server";
import {get_user_data} from "@/data/functions/auth/auth";
import {pteroadmin, pterouser} from "@/data/functions/ptero/api";

export async function GET(req, {params}) {
    const id = params.id
    const dc_user = await get_user_data()
    if (await pterouser.is_admin(dc_user.id) === true) {
        const data = await pteroadmin.get_user(id)
        return NextResponse.json(data)
    }
}